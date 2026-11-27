const express = require('express');
const axios = require('axios');
const { quoteFromSelections } = require('../controllers/quote');

const router = express.Router();

/*
 * POST /api/contact
 * Receives the contact form, checks it, and forwards it to the n8n webhook.
 * The webhook URL and key live in the environment, never in browser code:
 *   CONTACT_WEBHOOK_URL  (defaults to the n8n contact-us webhook)
 *   CONTACT_WEBHOOK_KEY  (required)
 */
const WEBHOOK_URL = process.env.CONTACT_WEBHOOK_URL || 'https://n8n.dadwordit.com/webhook/contact-us';

const LIMITS = { fullName: 120, email: 160, company: 160, phone: 40, projectType: 80, budget: 40, description: 5000 };

// Where the lead came from (optional; set by the browser from UTM tags, referrer and landing page).
const SOURCE_LIMITS = {
    utmSource: 100, utmMedium: 100, utmCampaign: 150, utmTerm: 150, utmContent: 150,
    clickId: 300, referrer: 500, landingPage: 500, formPage: 200
};

// One-line summary for the inbox / CRM, e.g. "google / cpc (shopify-apps)" or "Referral: clutch.co" or "Direct".
function summarizeSource(s) {
    if (s.utmSource || s.utmMedium) {
        return [s.utmSource || '?', s.utmMedium || '?'].join(' / ') + (s.utmCampaign ? ` (${s.utmCampaign})` : '');
    }
    if (s.clickId) return 'Paid click: ' + s.clickId.split(':')[0];
    if (s.referrer) {
        let host = s.referrer;
        try { host = new URL(s.referrer).host.replace(/^www\./, ''); } catch (e) {}
        if (/(^|\.)(google|bing|duckduckgo|yahoo|ecosia|baidu|yandex)\./.test(host)) return 'Organic search: ' + host;
        return 'Referral: ' + host;
    }
    return 'Direct';
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Simple in-memory rate limit: 5 submissions per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter(t => now - t < WINDOW_MS);
    recent.push(now);
    hits.set(ip, recent);
    return recent.length > MAX_PER_WINDOW;
}

// Drop stale entries so the map can't grow forever.
setInterval(() => {
    const now = Date.now();
    for (const [ip, times] of hits) {
        if (!times.some(t => now - t < WINDOW_MS)) hits.delete(ip);
    }
}, WINDOW_MS).unref();

function clean(value, max) {
    return String(value == null ? '' : value).trim().slice(0, max);
}

router.post('/api/contact', express.urlencoded({ extended: false, limit: '20kb' }), async (req, res) => {
    const body = req.body || {};

    // Honeypot: real visitors never see or fill this field. Pretend success so bots move on.
    if (clean(body.website, 200)) {
        return res.json({ ok: true });
    }

    if (rateLimited(req.ip)) {
        return res.status(429).json({ ok: false, error: 'Too many messages. Please try again in a few minutes or email contact@dadwordit.com.' });
    }

    const lead = {};
    for (const [field, max] of Object.entries(LIMITS)) lead[field] = clean(body[field], max);

    if (!lead.fullName || !lead.email || !lead.projectType || !lead.description) {
        return res.status(400).json({ ok: false, error: 'Please fill in your name, email, project type and project details.' });
    }
    if (!EMAIL_RE.test(lead.email)) {
        return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
    }

    for (const [field, max] of Object.entries(SOURCE_LIMITS)) lead[field] = clean(body[field], max);
    lead.leadSource = summarizeSource(lead);

    // From /get-a-quote: turn the selections into a readable request plus an internal
    // price estimate for the team. Prices are worked out here, never in the browser.
    try {
        const quote = quoteFromSelections({
            type: clean(body.quoteType, 40),
            features: clean(body.quoteFeatures, 400),
            design: clean(body.quoteDesign, 40),
            timeline: clean(body.quoteTimeline, 40)
        });
        lead.quoteRequest = quote ? quote.quoteRequest : '';
        lead.internalEstimate = quote ? quote.internalEstimate : '';
    } catch (err) {
        console.error('[contact] quote estimate failed:', err.message);
        lead.quoteRequest = '';
        lead.internalEstimate = '';
    }

    const key = process.env.CONTACT_WEBHOOK_KEY;
    if (!key) {
        console.error('[contact] CONTACT_WEBHOOK_KEY is not set; cannot forward lead');
        return res.status(500).json({ ok: false, error: 'Something went wrong. Please email us at contact@dadwordit.com.' });
    }

    try {
        await axios.post(WEBHOOK_URL, new URLSearchParams(lead).toString(), {
            headers: { 'X-API-KEY': key, 'Content-Type': 'application/x-www-form-urlencoded' },
            timeout: 10000
        });
        return res.json({ ok: true });
    } catch (err) {
        console.error('[contact] webhook failed:', err.response ? err.response.status : err.message);
        return res.status(502).json({ ok: false, error: 'Something went wrong. Please email us at contact@dadwordit.com.' });
    }
});

module.exports = router;
