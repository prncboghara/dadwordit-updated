# SEO Audit Report — Dadword IT (Version 2)
**Date:** August 10, 2026  
**Audited URL:** https://www.dadwordit.com/  
**Previous report:** [SEO-AUDIT-REPORT.md](./SEO-AUDIT-REPORT.md) (v1)  
**Overall SEO Health Score:** **78/100** *(was 61/100 in v1 — **+17**)*

---

## Executive Summary

Version 2 reflects a strong round of technical SEO fixes now live in production. Canonicals are correct on homepage, blogs, portfolio case studies, and legal pages; portfolio pages no longer steal `/our-work`’s identity; FAQ schema matches on-page Q&A; fake `aggregateRating` is gone; dynamic sitemap now covers **30 URLs** (11 blogs + 8 portfolios + static pages); OG URLs use the www host; geo tags correctly say Rajkot (`IN-GJ`); `coming-soon.html` / `error.html` are `noindex`; security headers and 30-day static caching are live; oversized result images are now WebP (~25–49 KB). Desktop Lighthouse Performance improved from **84 → 94** (LCP **3.2s → 1.0s**). Remaining gaps are mostly **mobile CWV** (Perf **65**, LCP ~6.3s), **title/meta polish**, **content depth** on commercial hubs, **richer schema** (`Organization` / `BreadcrumbList` / filled `ItemList`), and **off-page authority** — not crawl/index plumbing.

---

## What Improved Since v1 ✅

| Area | v1 | v2 (live) |
|------|----|-----------|
| Homepage canonical | Missing | `https://www.dadwordit.com/` |
| Portfolio SEO | Shared Our Work title + wrong canonical | Unique title/meta/canonical + `SoftwareApplication`/`CreativeWork` |
| Blog post SEO | No canonical, no schema, non-www `og:url` | www canonical + `BlogPosting` + Twitter cards |
| Sitemap | 11 static URLs, stale Dec 2025 | Dynamic **30 URLs**, `lastmod` 2026-08-10 |
| FAQ schema | Out of sync with page | Exact match (8 Q&As) |
| AggregateRating | 5★ / 20 reviews (unverifiable) | Removed |
| Contact schema URL | `/get-quote` (404) | `/contact-us` |
| OG host consistency | Mixed apex / www | Standardized to www + `logo.webp` |
| Hreflang | Fake multi-locale → same URLs; blog fallback to `/` | `en` + `x-default` only, page-correct |
| Geo meta | Incorrect `US-CA` | `IN-GJ` / Rajkot |
| Career SEO | About copy + AboutPage schema | Career-specific title/meta + `WebPage` |
| Template leftovers | Indexable template meta | `noindex, nofollow` + branded titles |
| Result images | PNG up to **~6.1 MB** | WebP **~25–49 KB** |
| Static caching | `max-age=0` | `max-age=2592000, immutable` |
| Security headers | Missing | HSTS + `nosniff` + Referrer-Policy |
| Compression middleware | Absent | Express `compression` (gzip confirmed on HTML GET) |
| Service schema | Generic “web design” | Portals / Shopify / SaaS / AI offers |
| Greeteat copy | Duplicated M-Wise text | Unique description (live) |
| Desktop CWV | Perf 84 / LCP 3.2s | **Perf 94 / LCP 1.0s** |

---

## Critical Issues (Fix Immediately 🔴)

| Issue | Page/Location | Impact | Recommended Fix |
|-------|--------------|--------|----------------|
| Mobile Core Web Vitals still failing | Homepage (mobile Lighthouse) | High — ranking & UX on mobile | Perf **65**, LCP **~6.3s**, FCP **~3.8s**. Cut render-blocking Google Fonts + Font Awesome (~2.3–2.5s savings), inline critical CSS, defer non-critical JS, convert remaining large PNGs (`customer-story*.png` ~148 KB) to WebP/`srcset` |
| Text compression inconsistently applied for some audits | HTML/CSS via Apache front-door | High for mobile weight | Gzip works on HTML GET, but Lighthouse still reports **~322 KiB** savings. Enable Apache `mod_deflate`/`mod_brotli` (or ensure proxy forwards compressed bodies for all text types including CSS) so every client gets compression |

> No remaining *indexation blockers* comparable to v1’s wrong portfolio canonicals. Mobile speed is the new top critical.

---

## High Priority (Fix Within 2 Weeks 🟠)

| Issue | Page/Location | Impact | Recommended Fix |
|-------|--------------|--------|----------------|
| Title tags still outside ideal length | Home ~64–68; Services ~72–76; Portfolio case study titles often >70; Blog index **17** chars | Medium-High | Trim home/services to 50–60; expand Blog to e.g. “Web Portals, Shopify & SaaS Insights \| Dadword IT Blog” |
| Homepage meta description still **190** chars | `/` | Medium | Rewrite to 150–160 with CTA (“Book a call”) |
| Thin commercial hub | `/our-work` ~**267** words | Medium | Add intro + process + outcomes + FAQs; strengthen keyword H2s |
| `ItemList` schema empty | `/our-work` | Medium | Populate `itemListElement` with each portfolio URL/name |
| Missing sitewide schemas | Global | Medium | Add `Organization` + `WebSite` (optional `SearchAction`) on home; `BreadcrumbList` on inner pages |
| Weak social share image | All pages use logo.webp | Medium | Create 1200×630 OG/Twitter card; reference it sitewide |
| HTTP→HTTPS still 2 hops | `http://dadwordit.com` → apex HTTPS → www | Medium | Apache/server rule: single 301 from HTTP apex → `https://www…` |
| No public phone in NAP/schema | LocalBusiness | Medium | Add phone or keep omitted intentionally (currently absent — OK if none public) |
| CLS slightly over threshold (desktop) | Home CLS **0.107** | Medium | Reserve space for fonts/hero badges/images (`width`/`height`, font-display already OK) |
| Blog CMS images still PNG | e.g. post OG from `cms.dadwordit.com/...png` | Medium | Serve WebP from Strapi; absolute https OK |

---

## Medium Priority (Fix Within 1 Month 🟡)

| Issue | Page/Location | Impact | Recommended Fix |
|-------|--------------|--------|----------------|
| Blog index meta **165** chars; FAQ meta **131**; Contact **137** | Those pages | Low-Medium | Tune to 150–160 with intent + CTA |
| Career meta **162** chars | `/career` | Low | Trim 1–2 words |
| Let’s Talk / Contact keyword overlap | `/lets-talk` vs `/contact-us` | Low-Medium | Differentiate: booking vs general inquiry in titles/H1s |
| Blog slug quality | `zero0trust`, periods in slugs | Low | Clean slugs + 301 when safe |
| Preloader on every page | `#dw-preloader` | Low-Medium | Remove or first-visit only — helps perceived LCP |
| Content clusters still weak | Blog | Medium | Pillars for Shopify Apps, Web Portals, SaaS MVP; link posts → services → case studies |
| E-E-A-T author bios | Blog posts | Medium | Author photo, bio, LinkedIn on `BlogPosting` |
| Off-page authority gap | Domain-wide | High long-term | Clutch/GBP, Shopify partner citations, client “Built by” links, Customer Story PR |
| Local SEO completeness | Rajkot | Medium | Claim/optimize Google Business Profile; consistent NAP |
| `/services` naming | `/service` singular | Low | Optional future 301 to plural if keyword tests warrant |

---

## Quick Wins (Easy Fixes ✅)

- Shorten homepage + services titles to ≤60 characters  
- Rewrite homepage meta to ≤160 characters with a CTA  
- Expand Blog index title beyond “Blog \| Dadword IT”  
- Fill `ItemList.itemListElement` for `/our-work`  
- Convert `customer-story.png` / dashboard PNG → WebP  
- Add one branded 1200×630 OG image  
- Self-host / subset Font Awesome icons (biggest mobile render-block win)  
- Confirm GSC sitemap fetch for dynamic `/sitemap.xml` (30 URLs)  
- Collapse HTTP apex redirect to one hop in Apache  
- Add `BreadcrumbList` JSON-LD on inner templates  

---

## Detailed Findings

### Technical SEO

#### Crawlability
| Check | Status | Notes |
|-------|--------|-------|
| `robots.txt` | ✅ | Allows `/`; points to sitemap |
| `sitemap.xml` | ✅ Improved | Dynamic route; **30 URLs** (11 blog + 8 portfolio + 11 static); fresh `lastmod` |
| GSC submission | ❓ | Re-submit/validate coverage after this deploy |

#### Indexability
| Check | Status | Notes |
|-------|--------|-------|
| Canonicals | ✅ | Home, services, portfolio, blogs, legal verified live |
| `noindex` junk pages | ✅ | `coming-soon.html`, `error.html` |
| Duplicate portfolio SEO | ✅ Fixed | Unique titles/canonicals live |

#### Page Speed & Core Web Vitals (Lighthouse 11.6 — Aug 10, 2026)

| Metric | Desktop (preset) | Mobile | v1 Desktop* | Target |
|--------|------------------|--------|-------------|--------|
| Performance | **94** | **65** | 84 | ≥90 |
| SEO | **100** | **100** | 100 | 100 |
| Accessibility | **93** | — | 93 | ≥90 |
| Best Practices | **100** | — | 100 | 100 |
| LCP | **1.0 s** ✅ | **~6.3 s** ❌ | 3.2 s | ≤2.5 s |
| CLS | **0.107** ⚠️ | **0** ✅ | 0.113 | ≤0.1 |
| TBT | 0 ms | ~30 ms | Good | Good |
| FCP | 0.8 s | 3.8 s | 2.2 s | ≤1.8 s |
| Speed Index | 1.2 s | 6.2 s | 5.2 s | ≤3.4 s |
| TTFB | ~70–120 ms | ~120 ms | ~130 ms | Good |

\*v1 desktop run was without `--preset=desktop`; v2 desktop uses the official desktop preset for a fair “fast network” benchmark. Mobile remains the bottleneck.

**Top mobile opportunities:** render-blocking CSS/fonts (~2.5s), text compression consistency (~322 KiB), responsive/next-gen images (~100–200 KiB).

#### Mobile-friendliness
- ✅ Viewport meta on app pages  
- ✅ Responsive layout  
- ❌ Mobile LCP fails CWV thresholds  

#### HTTPS & SSL
- ✅ HTTPS + www preferred  
- ✅ HSTS enabled in production  
- ✅ `X-Content-Type-Options: nosniff`, `Referrer-Policy`  
- ⚠️ `http://dadwordit.com` still **2 redirects**  
- ⚠️ Cert expiry still **Oct 1, 2026** — ensure auto-renew  

#### Structured Data
| Page | Schema | Status |
|------|--------|--------|
| Home | `LocalBusiness` + OfferCatalog | ✅ Cleaner (no fake ratings; no empty telephone) |
| About | `AboutPage` | ✅ |
| Service | `Service` + real offers | ✅ Improved |
| Our Work | `ItemList` | ⚠️ Empty list items |
| Portfolio | `SoftwareApplication` / `CreativeWork` | ✅ New |
| Blog index | `Blog` | ⚠️ `blogPost` still `[]` |
| Blog post | `BlogPosting` | ✅ New |
| FAQ | `FAQPage` | ✅ Synced |
| Contact / Let’s Talk | `ContactPage` | ✅ URL fixed |
| Career | `WebPage` | ✅ Fixed |

**Still missing:** `Organization`, `WebSite`, `BreadcrumbList`, `JobPosting` (if hiring), real `Review` markup.

#### Hreflang
- ✅ Simplified to `en` + `x-default`  
- ✅ Points at correct page canonicals (including blogs/portfolio)  

#### Redirects & Broken Links
| URL | Result |
|-----|--------|
| `https://dadwordit.com/` | 301 → www (1 hop) ✅ |
| `http://dadwordit.com/` | Still **2 hops** ⚠️ |
| `/get-quote` | 404 (no longer referenced in schema) |
| Portfolio / blog samples | 200 ✅ |

#### URL Structure
- ✅ Clean paths unchanged  
- ✅ Dynamic sitemap discovers all portfolio + blog slugs  

---

### On-Page SEO

#### Per-page breakdown (top pages)

##### 1. Homepage — `/`
| Element | Finding |
|---------|---------|
| Title | ~64–68 chars — slightly long |
| Meta | **190 chars** — still truncates |
| H1 | ✅ Keyword-aligned |
| Canonical / OG | ✅ www |
| Schema | ✅ LocalBusiness cleaned |
| Content | ~1,150 words — strong |
| Images | Result shots now WebP; dashboard PNG remains |

##### 2. Services — `/service`
| Element | Finding |
|---------|---------|
| Title | ~72–76 chars — trim |
| Meta | 154 ✅ |
| Canonical / OG / schema | ✅ Improved offers |
| Content | ~534 words — deepen with proof + FAQs |

##### 3. Our Work — `/our-work`
| Element | Finding |
|---------|---------|
| Title | 38 chars — expand with Shopify/portals |
| Content | **~267 words** — still thin |
| Schema | ItemList without elements |

##### 4. Portfolio detail — e.g. `/portfolio/customer-story`
| Element | Finding |
|---------|---------|
| Title | Unique case-study title ✅ (can shorten) |
| Canonical | Points to itself ✅ |
| Schema | `SoftwareApplication` ✅ |
| Content | ~680+ words ✅ |

##### 5. Blog post — e.g. `/blog/saas-mvp-mistakes-to-avoid`
| Element | Finding |
|---------|---------|
| Title / meta | Strong CMS SEO ✅ |
| Canonical / BlogPosting / Twitter | ✅ Fixed |
| Content | ~1,260 words ✅ |
| OG image | CMS PNG — convert to WebP when possible |

##### Career / FAQ / Contact
- Career title/meta/schema fixed ✅ (~758 words now)  
- FAQ schema matches UI ✅  
- Contact schema URL fixed ✅  

#### Keyword cannibalization
- ✅ Portfolio vs Our Work conflict **resolved**  
- ⚠️ Contact vs Let’s Talk still overlapping intent — differentiate copy  

#### Internal linking
- Sitemap + unique URLs greatly improve discovery  
- Still expand homepage → more case studies / cluster posts  
- Ensure every blog post links to `/service` + 1 relevant `/portfolio/*`  

#### Image optimization
| Asset | Size | Status |
|-------|------|--------|
| `mustdulce.webp` | ~49 KB | ✅ (was ~6.1 MB PNG) |
| `edenqr.webp` | ~26 KB | ✅ |
| `thepsycle.webp` | ~25 KB | ✅ |
| `customer-story.png` | ~148 KB | ⚠️ Convert to WebP |
| Alts | Present on audited pages | ✅ |

---

### Off-Page SEO

Unchanged vs v1 in substance (no Ahrefs/Moz API connected):

| Factor | Assessment |
|--------|------------|
| Est. DA/DR | Still early-stage (approx. low teens or below) |
| Best assets | `customersstory.com`, Shopify App Store, client sites, social `sameAs` |
| Priority link plays | GBP/Clutch, partner directories, guest posts, “Built by Dadword IT”, app launch PR |

Toxic-link risk: still no evidence of spam networks from public crawl.

---

### Content SEO

| Area | Status |
|------|--------|
| Content gaps | Still need cost/guide/landing pages for Shopify app, portals, SaaS MVP |
| Snippet opportunities | FAQ + MVP post are strong foundations — add summary boxes |
| Publish cadence | ~11 posts; aim 2–4 SEO posts/month in clusters |
| E-E-A-T | About/career improved; add named author bios + reviews markup |

---

### Local SEO

| Check | Status |
|-------|--------|
| Geo meta | ✅ Fixed to Rajkot / `IN-GJ` |
| LocalBusiness | ✅ Present; phone intentionally omitted |
| GBP / citations | ❓ Still claim & align NAP |

---

### Competitor Comparison

| Factor | Dadword IT (v2) | Webkul | Bacancy | VT Labs / Softices-class |
|--------|-----------------|--------|---------|--------------------------|
| Technical on-page | **Much improved** | Strong | Strong | Strong |
| Desktop speed | **Excellent (94)** | Typically good | Varies | Often strong |
| Mobile speed | Weak (65) | Usually optimized | Varies | Often stronger |
| Content depth | Still light vs giants | Very deep | Deep | Medium–deep |
| Authority / links | Early | High | High | Medium–High |
| Differentiator | AI-enhanced boutique + own Shopify app | Scale / marketplace apps | Staff aug breadth | Shopify craft |

---

## Score Breakdown (how 78 was derived)

| Pillar | Weight | v1 | v2 | Notes |
|--------|--------|----|----|-------|
| Technical / crawl / index | 30% | 18 | **27** | Canonicals, sitemap, schema, headers fixed |
| On-page | 25% | 16 | **20** | Titles/metas & thin hubs remain |
| CWV / UX | 20% | 12 | **14** | Desktop great; mobile still fails |
| Content depth / strategy | 15% | 8 | **9** | Slightly better case studies; clusters pending |
| Off-page / local | 10% | 7 | **8** | Geo fixed; authority unchanged |
| **Total** | 100% | **61** | **78** | |

---

## 90-Day SEO Action Plan

### Month 1 — Foundation *(mostly done — finish mobile)*
- [x] Portfolio unique SEO + canonicals  
- [x] Blog canonical + BlogPosting + Twitter  
- [x] Homepage canonical; FAQ sync; remove fake ratings  
- [x] Dynamic sitemap with blogs + portfolios  
- [x] WebP for heavy result images; static cache; security headers  
- [ ] Kill mobile LCP: fonts/FA/critical CSS + remaining PNG→WebP  
- [ ] Enable reliable Apache-level gzip/brotli for CSS/JS/HTML  
- [ ] Single-hop HTTP→www redirect  
- [ ] Trim home/services titles + home meta description  
- [ ] Submit/validate sitemap in GSC; monitor coverage  

### Month 2 — Growth
- [ ] Expand `/our-work` content + fill ItemList schema  
- [ ] Add `Organization` / `WebSite` / `BreadcrumbList`  
- [ ] Ship 3 money pages: Shopify App Dev, Web Portals, SaaS MVP  
- [ ] OG 1200×630 image; cluster internal linking  
- [ ] Author bios + differentiate Contact vs Let’s Talk  
- [ ] Claim GBP + Clutch; add reviews (then optional AggregateRating)  

### Month 3 — Authority
- [ ] PR + backlinks around Customer Story app  
- [ ] Guest posts / partner citations (2–4)  
- [ ] Cost/guide content for snippets  
- [ ] Client “Built by” links  
- [ ] Re-audit: target mobile Perf ≥ 90, LCP ≤ 2.5s, score ≥ 88  

---

## Target Keywords to Rank #1 For

| Keyword | Search Volume | Difficulty | Current Rank | Target Rank |
|---------|--------------|------------|-------------|------------|
| Shopify app development agency | 320–800 /mo | Medium-High | Not in top 20 (est.) | Top 3 |
| custom Shopify app development | 500–1.2k /mo | Medium-High | Not in top 20 (est.) | Top 5 |
| custom web portal development | 200–500 /mo | Medium | Not in top 20 (est.) | #1 |
| SaaS product development agency | 200–600 /mo | Medium | Not in top 20 (est.) | Top 5 |
| AI-enhanced web development agency | 50–150 /mo | Low-Medium | Not in top 20 (est.) | #1 |
| Shopify customer segmentation app | 50–200 /mo | Low | Case study now indexable ✅ | #1 |
| B2B client portal development | 100–300 /mo | Medium | Not in top 20 (est.) | #1 |
| SaaS MVP mistakes | 100–300 /mo | Low-Medium | Matching post + schema ✅ | #1 |
| Dadword IT | Branded | Low | #1 (expected) | Defend |

---

## Appendix A — Evidence Snapshot (v2)

| Source | Result |
|--------|--------|
| Live crawl | August 10, 2026 (post-fix deploy) |
| Sitemap | 30 URLs via `/sitemap.xml` route |
| Lighthouse desktop | Perf **94** / SEO **100** / LCP **1.0s** |
| Lighthouse mobile | Perf **65** / SEO **100** / LCP **~6.3s** |
| Compression | Gzip magic bytes confirmed on HTML GET; LH still flags savings |
| Code hotspots remaining | `views/partials/head.ejs` (fonts/FA), image pipeline, Apache redirect/compress, `seo/config.js` titles/metas, `/our-work` content |

## Appendix B — Remaining Highest-Impact Fixes

1. **Mobile LCP** — subset/self-host fonts & icons; critical CSS; defer JS.  
2. **Apache compression + one-hop redirects** — don’t rely only on Express behind proxy.  
3. **Title/meta polish** — home, services, blog index.  
4. **`ItemList` + Organization/Breadcrumb schema**.  
5. **Content hubs** — `/our-work` + 3 service landing pages.  
6. **Off-page** — citations, reviews, Customer Story PR.  

---

*Report generated by SEO Audit Agent — Version 2*  
*Methods: live HTTP crawl after deploy, HTML/schema verification, dynamic sitemap inspection, Lighthouse 11.6 (`--preset=desktop` + mobile), image weight sampling, comparison against v1 findings. Off-page metrics remain estimates pending Ahrefs/Moz/GSC access.*
