/*
 * Quote builder (/get-a-quote).
 * Prices live in data/quote-config.json and stay on the server: the page only
 * gets labels and ids, and the internal estimate is added to the lead for the
 * team to see in n8n. Visitors never see a price.
 */
const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '../data/quote-config.json');

// Read on each call so price edits apply without a restart (same as other data files).
function loadConfig() {
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
}

// What the browser may see: no prices, factors or weeks.
function publicConfig(cfg = loadConfig()) {
    return {
        projects: cfg.projects.map(p => ({
            id: p.id,
            formValue: p.formValue,
            label: p.label,
            blurb: p.blurb,
            baseLabel: p.baseLabel,
            features: p.features.map(f => ({ id: f.id, label: f.label, hint: f.hint }))
        })),
        design: cfg.design.map(d => ({ id: d.id, label: d.label, hint: d.hint })),
        timeline: cfg.timeline.map(t => ({ id: t.id, label: t.label, hint: t.hint })),
        faq: cfg.faq
    };
}

const money = n => '$' + Math.round(n).toLocaleString('en-US');
const round500 = n => Math.round(n / 500) * 500;

/*
 * Build the lead's quote fields from the visitor's selections.
 * Unknown ids are ignored, so a tampered request can't inject text.
 * Returns null when no valid project type was sent (an ordinary contact form).
 */
function quoteFromSelections({ type, features, design, timeline }, cfg = loadConfig()) {
    const project = cfg.projects.find(p => p.id === type);
    if (!project) return null;

    const wanted = new Set(String(features || '').split(',').map(s => s.trim()));
    const picked = project.features.filter(f => wanted.has(f.id));
    const d = cfg.design.find(x => x.id === design) || cfg.design[0];
    const t = cfg.timeline.find(x => x.id === timeline) || cfg.timeline[0];

    let low = project.base.low, high = project.base.high, weeks = project.base.weeks;
    picked.forEach(f => { low += f.low; high += f.high; weeks += f.weeks; });
    const factor = d.factor * t.factor;
    low = round500(low * factor);
    high = round500(high * factor);
    weeks = (weeks + d.weeks) * t.weeksFactor;
    const wLow = Math.max(1, Math.round(weeks));
    const wHigh = Math.max(wLow + 1, Math.ceil(weeks * 1.3));

    const featureText = picked.length ? picked.map(f => f.label).join(', ') : 'core features only';
    return {
        quoteRequest: `${project.label}: ${featureText}. ${d.label}, ${t.label.toLowerCase()} timeline.`,
        internalEstimate: `${money(low)}–${money(high)}, ${wLow}–${wHigh} weeks (internal, not shown to the visitor)`
    };
}

module.exports = { loadConfig, publicConfig, quoteFromSelections };
