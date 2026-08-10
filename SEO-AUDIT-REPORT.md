# SEO Audit Report — Dadword IT
**Date:** August 10, 2026  
**Audited URL:** https://www.dadwordit.com/  
**Overall SEO Health Score:** 61/100

---

## Executive Summary

Dadword IT has a solid SEO foundation: HTTPS is correctly enforced to `www`, `robots.txt` and `sitemap.xml` are live, every key page has a unique H1 and viewport meta, Lighthouse SEO scores **100/100**, and homepage LocalBusiness schema plus FAQPage markup are present. The biggest ranking blockers are **incorrect/missing canonicals** (especially portfolio pages that all canonicalize to `/our-work`), an **incomplete sitemap** (no blog posts or case studies), **mobile Core Web Vitals failure** (LCP ~6.0s, Performance 65), and **uncompressed multi‑MB PNG assets** (one homepage image is ~6.1 MB). Off-page authority appears early-stage versus established Shopify agencies (Webkul, Bacancy, Softices-class competitors). Fixing canonicals, sitemap coverage, image compression, and gzip alone should produce the fastest organic gains.

---

## Critical Issues (Fix Immediately 🔴)

| Issue | Page/Location | Impact | Recommended Fix |
|-------|--------------|--------|----------------|
| Portfolio detail pages share listing SEO + wrong canonical | All `/portfolio/*` (e.g. `/portfolio/customer-story`) use `SEO_CONFIG.our_work`; title = “Web Development Portfolio \| Dadword IT”; **canonical → `https://www.dadwordit.com/our-work`** | High — Google consolidates case studies under `/our-work`; individual projects won’t rank | In `routes/public.js` `/portfolio/:slug`, generate unique `title`, `meta.description`, `canonical` (`/portfolio/{slug}`), OG tags, and `CreativeWork`/`SoftwareApplication` schema from the project object |
| Blog posts missing canonical + Article schema | `/blog/:slug` sets `canonical: null`, `schema: null`, `twitter: null`; `og.url` uses non-www | High — duplicate www/non-www signals; weak rich-result eligibility | Set `canonical` + `og.url` to `https://www.dadwordit.com/blog/{slug}`; add `Article`/`BlogPosting` JSON-LD; restore Twitter cards |
| Homepage missing canonical | `/` — `SEO_CONFIG.index` has no `canonical`; live HTML has none | High — www vs apex ambiguity on the money page | Add `canonical: "https://www.dadwordit.com/"` and pass it into `head.ejs` from `index.ejs` |
| Sitemap omits all ranking content URLs | `public/sitemap.xml` lists only 11 static pages; **0 of 11 blog posts** and **0 of 8 portfolio pages** | High — slow discovery of best content | Dynamically generate sitemap from portfolio JSON + Strapi blog slugs; update `lastmod` on publish |
| Oversized homepage images crushing LCP | `/images/result/mustdulce.png` **~6.1 MB**; `edenqr.png` **~1.6 MB**; `thepsycle.png` **~1.6 MB** | High — mobile LCP **6.0s**, Performance **65** | Convert to compressed WebP/AVIF (target &lt;150 KB each), add width/height, lazy-load below fold, use responsive `srcset` |
| No HTTP compression (gzip/brotli) | HTML/CSS responses lack `Content-Encoding`; Lighthouse: **~322 KiB** savings | High — slows TTFB-to-render globally | Enable `mod_deflate` / Brotli in Apache (or Express `compression` middleware) for text assets |
| Misleading `AggregateRating` in LocalBusiness schema | Homepage JSON-LD: `ratingValue: "5"`, `reviewCount: "20"` with empty `telephone` | High — risk of rich-result rejection / spam flags if ratings aren’t visible & verifiable | Remove aggregateRating until reviews are on-page with `Review` markup, or sync from a real review source (Clutch/Google) |
| FAQ schema does not match visible FAQs | `/faq` — schema still says “IT agency / web design templates…”; page asks about portals, Shopify, AI-enhanced delivery | High — FAQ rich results can be invalidated | Regenerate FAQ JSON-LD from the same Q&A content rendered in `faq.ejs` |

---

## High Priority (Fix Within 2 Weeks 🟠)

| Issue | Page/Location | Impact | Recommended Fix |
|-------|--------------|--------|----------------|
| Broken schema URL `/get-quote` (404) | Contact schema `url`: `https://www.dadwordit.com/get-quote` | Medium-High | Change to `/contact-us` |
| Career page wrong meta + wrong schema type | Title “Career \| Dadword IT” (19 chars); description copied from About; schema `@type: AboutPage` pointing at `/about` | Medium-High | Write career-specific title/description; use `WebPage` or `JobPosting` schema |
| OG tags point every page to homepage / inconsistent hosts | Most pages: `og:url` = `https://dadwordit.com` (apex); images mix `logo.png` (apex) vs `logo.webp` (www) | Medium-High | Always use `https://www.dadwordit.com{path}` and one OG image (≥1200×630 social card, not just logo) |
| Hreflang points all locales to the same English URL | `head.ejs` emits `en-us`, `en-ca`, `en-gb`, `de-de` → identical URLs; when canonical missing, hreflang collapses to homepage | Medium-High | Either remove hreflang until true localized pages exist, or keep only `x-default` + `en` |
| Geo meta contradicts business location | `geo.region: US-CA` while address is Rajkot, IN; geo.position is Rajkot | Medium | Align geo tags with NAP; target US/CA via `areaServed` in schema (already present) instead of fake geo.region |
| HTTP→HTTPS redirect chain (2 hops) | `http://dadwordit.com` → `https://dadwordit.com` → `https://www.dadwordit.com` | Medium | Single-hop 301 from both apex HTTP/HTTPS directly to www HTTPS |
| Static cache `max-age=0` | CSS/images serve `Cache-Control: public, max-age=0` | Medium | Set long cache + hashed filenames for `/css`, `/js`, `/images` (e.g. 30–365 days) |
| Thin / weak commercial pages | `/our-work` ~267 words; `/lets-talk` ~225; `/career` ~289 | Medium | Expand portfolio intros, process/outcomes, FAQ blocks, and internal links to service keywords |
| Indexable template leftovers | `/coming-soon.html`, `/error.html` return 200 with template meta (“Creative Agency… rajesh-doot”) | Medium | `noindex` or remove from public; prefer Express 404 only |
| Privacy / Terms missing canonical | Both live pages have no canonical | Medium | Add www canonicals in `SEO_CONFIG` |

---

## Medium Priority (Fix Within 1 Month 🟡)

| Issue | Page/Location | Impact | Recommended Fix |
|-------|--------------|--------|----------------|
| Title tags too long / too short | Home 68 chars; Services 76; Blog 17; Career 19; Portfolio listing 38 | Medium | Trim home/services to 50–60; expand Blog/Career with primary keywords |
| Meta descriptions over/under ideal | Home **190** chars; Blog **165**; Contact **137**; FAQ **131** | Medium | Rewrite to 150–160 with CTA + primary keyword |
| Service schema still generic “web design” | `/service` JSON-LD doesn’t match portal/Shopify/SaaS positioning | Medium | Mirror homepage OfferCatalog (portals, Shopify apps, SaaS, AI-enhanced) |
| Empty `telephone` in LocalBusiness | Homepage schema | Medium | Add real phone or remove the property |
| Duplicate/wrong portfolio copy | Greeteat description in `portfolio-config.json` copies M-Wise text | Medium | Unique case-study copy per project (problem → solution → outcome) |
| Blog slug quality | e.g. `deepseek-vs.-chatgpt-...`, `how-ai-zero0trust-...` | Low-Medium | Prefer clean hyphens; 301 old slugs if changed |
| Render-blocking CSS/fonts | Google Fonts + Font Awesome + `dadword.css`; mobile ~2.3s savings | Medium | Self-host critical fonts, subset FA icons, inline critical CSS |
| Unused JS ~205 KiB | Lighthouse | Medium | Audit third-party / unused scripts; defer non-critical JS |
| Preloader on every page | `#dw-preloader` | Low-Medium | Remove or delay only for first visit — can hurt LCP perception |
| Blog/content not clustered | 11 posts, mostly 2025 trend pieces; weak service-pillar linking | Medium | Build pillar pages (Shopify Apps, Web Portals, SaaS MVP) and link posts into clusters |
| LocalBusiness vs Organization | Agency serves global markets from India | Low-Medium | Keep LocalBusiness for Rajkot office; add separate `Organization` + `ProfessionalService` if needed |

---

## Quick Wins (Easy Fixes ✅)

- Add homepage canonical: `https://www.dadwordit.com/`
- Fix contact schema URL from `/get-quote` → `/contact-us`
- Remove or replace fake `aggregateRating` until reviews are published on-page
- Sync FAQ JSON-LD with the 8 real questions on `/faq`
- Compress `mustdulce.png`, `edenqr.png`, `thepsycle.png` to WebP (&lt;150 KB)
- Enable Apache gzip/brotli (one config change)
- Update sitemap `lastmod` from `2025-12-03` to current dates; append blog + portfolio URLs
- Fix Career meta description (stop reusing About copy)
- Set all `og:image` / `og:url` to the `www` host
- Add `noindex` to `coming-soon.html` and `error.html`
- Pass `canonical` into homepage `include('partials/head', …)`
- Shorten homepage title to ~55–60 characters
- Add phone number to NAP + schema (or remove empty telephone field)
- Fix Greeteat case-study description duplicate

---

## Detailed Findings

### Technical SEO

#### Crawlability
| Check | Status | Notes |
|-------|--------|-------|
| `robots.txt` | ✅ Pass | Live at `/robots.txt`; `Allow: /`; sitemap declared |
| `sitemap.xml` | ⚠️ Partial | Valid XML, but only 11 URLs; stale `lastmod` (2025-12-03); missing blogs & portfolios |
| GSC submission | ❓ Unknown | Confirm sitemap submitted in Google Search Console (not verifiable from public crawl) |

#### Indexability
| Check | Status | Notes |
|-------|--------|-------|
| `noindex` | ✅ None on key pages | Good |
| Canonicals | 🔴 Broken/missing | Missing on `/`, blogs, legal; **wrong** on portfolio details |
| Duplicate signals | 🔴 | Portfolio H1 unique but title/canonical duplicate listing; www/non-www OG inconsistency |

#### Page Speed & Core Web Vitals (Lighthouse 11.6, Aug 10 2026)

| Metric | Desktop | Mobile | Target |
|--------|---------|--------|--------|
| Performance score | **84** | **65** | ≥90 |
| SEO score | **100** | **100** | 100 |
| Accessibility | **93** | — | ≥90 |
| Best Practices | **100** | — | ≥90 |
| LCP | 3.2 s | **6.0 s** | ≤2.5 s |
| CLS | 0.113 | 0 | ≤0.1 |
| TBT / FID proxy | 0 ms / 50 ms | 20 ms | Good |
| FCP | 2.2 s | 3.8 s | ≤1.8 s |
| Speed Index | 5.2 s | 6.2 s | ≤3.4 s |
| TTFB (doc) | ~130 ms | — | Good |
| Text compression | ❌ Missing (~322 KiB) | ❌ | Enable |
| Image savings | ~131 KiB size + ~107 KiB format (plus multi‑MB outliers not fully captured) | — | Compress |

**Primary CWV blockers:** uncompressed responses, render-blocking CSS/fonts, and multi‑megabyte PNGs in the customer-story / results section.

#### Mobile-friendliness
- ✅ `viewport` meta present on all app pages
- ✅ Responsive layout via Bootstrap grid + `dadword.css`
- ⚠️ Mobile performance is the weak point (LCP), not layout breakage

#### HTTPS & SSL
- ✅ HTTPS live; Let’s Encrypt cert valid **Jul 3, 2026 → Oct 1, 2026** (renew before expiry)
- ✅ No mixed-content `http://` resources found on crawled pages
- ⚠️ Apex → www is correct, but HTTP apex takes **2 redirects**
- ⚠️ Missing security headers: no `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, etc. (Best Practices still scored 100 in this run, but headers strengthen trust)

#### Structured Data
| Page | Schema present | Quality |
|------|----------------|---------|
| Home | `LocalBusiness` + OfferCatalog + sameAs | Strong positioning; **fix rating + empty phone** |
| About | `AboutPage` | OK |
| Service | `Service` | Outdated vs current offer |
| Our Work | `ItemList` | Incomplete (no `itemListElement`) |
| Portfolio detail | Reuses listing `ItemList` | ❌ Wrong |
| Blog index | `Blog` with empty `blogPost` | Weak |
| Blog post | None | ❌ Missing Article |
| FAQ | `FAQPage` | ❌ Out of sync with UI |
| Contact | `ContactPage` | ❌ `/get-quote` 404 |
| Career | `AboutPage` | ❌ Wrong type |

**Missing high-value schemas:** `Organization`, `WebSite`+`SearchAction`, `BreadcrumbList`, `Article`/`BlogPosting`, per-project `CreativeWork`, `JobPosting` (if hiring).

#### Hreflang
- Implemented for `en-us`, `en-ca`, `en-gb`, `de-de`, `x-default`
- ❌ Not a multilingual site — all point to the same English URL
- ❌ When `canonical` is missing (homepage/blogs), hreflang path falls back to homepage (`pagePath = ''`) — **blog hreflang incorrectly points to `/`**

#### Redirects & Broken Links
| URL | Result |
|-----|--------|
| `http://dadwordit.com/` | 301 → `https://dadwordit.com/` → 301 → `https://www.dadwordit.com/` (2 hops) |
| `https://dadwordit.com/` | 301 → www (1 hop) ✅ |
| `/get-quote` | **404** (referenced in schema) |
| Blog & portfolio samples | 200 OK |
| `/coming-soon.html`, `/error.html` | 200 (should not be indexed) |

#### URL Structure
- ✅ Clean, readable paths: `/service`, `/our-work`, `/portfolio/{slug}`, `/blog/{slug}`
- ⚠️ Prefer `/services` (plural) long-term with 301 if you rebrand URLs
- ⚠️ Some blog slugs are noisy (`zero0trust`, embedded periods)

---

### On-Page SEO

#### Per-page breakdown (top pages)

##### 1. Homepage — `/`
| Element | Finding |
|---------|---------|
| Title | “Dadword IT — Web Portals, Shopify Apps & SaaS Development Agency” — **68 chars** (slightly long) |
| Meta description | **190 chars** — will truncate; strong keywords but no sharp CTA |
| H1 | “We build web portals and Shopify products that scale.” — ✅ one H1, keyword-aligned |
| Canonical | ❌ Missing |
| Content | ~1,150 words — healthy |
| Images | Alts present; several result images extremely heavy |
| Schema | LocalBusiness — good base |
| Keywords in first 100 words | ✅ web portals, Shopify, US/Canada/Europe |

##### 2. Services — `/service`
| Element | Finding |
|---------|---------|
| Title | 76 chars — trim |
| Meta | 154 chars — ✅ |
| H1 | “Build Scalable Products with Expert Engineering” — good, slightly light on “Shopify/portal” |
| Canonical | ✅ |
| Content | ~534 words — OK; deepen with pricing bands, process, FAQs, case-study links |
| Schema | Generic — update |

##### 3. Our Work — `/our-work`
| Element | Finding |
|---------|---------|
| Title | 38 chars — expand with “Shopify Apps & Web Portals” |
| Meta | 148 chars — OK but generic |
| H1 | Brand-voice, not keyword-led |
| Content | **~267 words** — thin for a commercial hub |
| Internal links | Good to `/portfolio/*` |

##### 4. Blog — `/blog`
| Element | Finding |
|---------|---------|
| Title | “Blog \| Dadword IT” — too short / weak |
| Meta | 165 chars — slight over |
| H1 | Soft branding |
| Posts | 11 live URLs; none in sitemap |
| Single posts | Strong titles/descriptions from CMS, but missing canonical/schema/Twitter |

##### 5. About — `/about`
| Element | Finding |
|---------|---------|
| Title/Meta | Solid length & uniqueness |
| H1 | Brand-led (“Boutique. Senior-led. AI-augmented.”) |
| Content | ~553 words — good E-E-A-T base; add named author bios / credentials |
| OG image host | Non-www PNG |

##### Bonus: Portfolio detail (critical)
- **H1 unique** (project title) but **title/description/canonical identical to listing** → classic cannibalization / consolidation issue.

#### Keyword usage & cannibalization
| Risk | Detail |
|------|--------|
| Portfolio cannibalization | All case studies compete with `/our-work` via shared title + wrong canonical |
| Contact vs Let’s Talk | Overlap on “schedule a call / contact agency” — differentiate intents (form vs booking) |
| Generic “web development agency” | Multiple pages still use old template phrasing vs newer portal/Shopify positioning |

#### Internal linking
- ✅ Header/footer cover core pages
- ⚠️ Homepage only deep-links **2** blog posts + **1** portfolio (`customer-story`)
- ⚠️ Most portfolio pages rely on `/our-work` hub — ensure every case study links to `/service` + related posts
- ⚠️ Blog index links use relative `href="<%= blog.slug %>"` pattern — verify absolute `/blog/{slug}` in production (live crawl showed correct `/blog/...` paths)
- Orphans for SEO purposes: portfolio + blog URLs **not in sitemap** = discovery orphans even if linked

#### Image optimization
| Asset | Size | Issue |
|-------|------|-------|
| `mustdulce.png` | ~6.1 MB | Critical — convert + compress |
| `edenqr.png` | ~1.6 MB | Critical |
| `thepsycle.png` | ~1.6 MB | Critical |
| Client logos | Mostly SVG — ✅ |
| Alts | Present on audited pages — ✅ |
| Next-gen | Partial WebP usage; large PNGs remain |

#### Content quality
- Homepage & About: solid depth
- Thin: Our Work, Let’s Talk, Career
- Duplicate: Greeteat vs M-Wise portfolio description in config
- Readability: generally clear, short paragraphs — good for skimming; add scannable H2 keyword sections on commercial pages

---

### Off-Page SEO

> Ahrefs/SEMrush/Moz APIs were not connected in this environment. Figures below are **directional estimates** based on site age, content footprint, and competitive context. Validate in Ahrefs/Moz/GSC.

| Factor | Assessment |
|--------|------------|
| Domain age / brand | Emerging boutique agency (~2020–2024 branding; footer claims 2020–present) |
| Estimated Domain Authority / DR | Likely **low (approx. DA/DR 5–15)** until link acquisition scales |
| Referring domains | Likely limited; primary assets: own product **customersstory.com**, social profiles, Shopify App Store listing |
| Backlink quality | Product/app store + client sites are the highest-leverage opportunities |
| Toxic links | No evidence of a PBN footprint from public crawl; monitor in GSC/Ahrefs |
| Anchor text | Expect branded (“Dadword IT”) dominant — healthy if true |
| Social / sameAs | Facebook, Instagram, X, LinkedIn declared in schema |

**Competitor backlink gap (qualitative):** Webkul, Bacancy, and similar India-based Shopify/app agencies typically hold hundreds–thousands of referring domains via directories, guest posts, marketplace listings, and documentation. Gap priorities for Dadword IT:
1. Shopify App Store + partner directory citations  
2. Clutch / GoodFirms / DesignRush profiles with NAP consistency  
3. Guest posts on SaaS/Shopify engineering blogs  
4. Case-study PR around Customer Story app milestones  
5. Client websites (“Built by Dadword IT”) footer/credits  

---

### Content SEO

#### Content gaps vs competitors
Competitors typically rank for / publish:
- “Shopify app development company [country]”
- “Custom Shopify app cost”
- “Hire React/Next.js developers for SaaS”
- “B2B customer portal development”
- “Hydrogen / headless Shopify”
- Comparison posts, implementation checklists, migration guides

Dadword blog skews toward broad 2025 AI/tech trend pieces — useful for topical freshness, weaker for **commercial intent**.

#### Featured snippet opportunities
Target question pages / FAQ expansions for:
- How long does Shopify app development take?
- Custom web portal vs SaaS — what’s the difference?
- MVP mistakes for SaaS startups (you already have a strong post — add summary box + schema)
- How much does a custom Shopify app cost?
- What is AI-enhanced development (already on FAQ — expand into a pillar)

#### Blog / content strategy
| Signal | Current | Recommendation |
|--------|---------|----------------|
| Volume | ~11 posts | 2–4 SEO posts/month |
| Clusters | Weak | Pillars: Shopify Apps, Web Portals, SaaS Engineering, AI Delivery |
| Internal links | Sparse from home | Every post → 1 pillar + 1 service + 1 case study |
| CMS SEO | Meta title/desc used | Add canonical, OG www, Article schema in `routes/public.js` |

#### E-E-A-T
| Signal | Status |
|--------|--------|
| Author bios on posts | Partial (`authorName`); add bio, photo, LinkedIn |
| Credentials / team page | About is brand-led; add named engineers |
| Trust (address, email) | ✅ Rajkot address + contact@dadwordit.com |
| Phone | ❌ Empty in schema; confirm public number |
| Citations / case outcomes | Good outcome blurbs; add metrics + client quotes with schema `Review` |
| Own product proof | ✅ Customer Story app — lean into this for Experience |

---

### Local SEO (Applicable — Rajkot office, global clients)

| Check | Status | Action |
|-------|--------|--------|
| Google Business Profile | ❓ Not verified in this audit | Claim/optimize GBP for Rajkot IT/web agency |
| NAP consistency | Address in schema + contact page; phone missing | One phone everywhere |
| Local schema | LocalBusiness present | Fix phone + ratings; keep geo coords |
| Geo meta | Incorrect US-CA label | Fix or remove |
| Citations | Unknown | Clutch, GoodFirms, Justdial/India directories if targeting local; US directories only if you have US entity |

---

### Competitor Comparison

Primary keyword set: *Shopify app development agency*, *custom web portal development*, *SaaS product engineering agency*.

| Factor | Dadword IT | Competitor 1: Webkul | Competitor 2: Bacancy Technology | Competitor 3: VT Labs / Softices-class Shopify shops |
|--------|------------|----------------------|----------------------------------|-----------------------------------------------------|
| Positioning | Boutique senior-led portals + Shopify apps + SaaS | Large Shopify app/marketplace catalog | Broad hire-dev / ecommerce services | Specialized Shopify/headless agencies |
| Est. domain authority | Low | High | High | Medium–High |
| Est. backlink depth | Early | Very deep (apps, docs, directories) | Deep (content + hire pages) | Medium–deep |
| Content depth | Thin commercial + 11 blogs | Massive resource/product content | Large service + blog footprint | Strong case studies / engineering content |
| Page speed (home) | Desktop 84 / Mobile 65 | Typically optimized marketing sites | Varies | Often strong CWV focus |
| Differentiator to lean into | AI-enhanced senior delivery + own Shopify app | Scale / marketplace apps | Bench strength / staff aug | Pure Shopify craft |

**Their typical top pages:** service money pages, “hire Shopify developers”, app/product landing pages, and comparison/cost guides — exactly where Dadword should build dedicated landing pages beyond a single `/service`.

---

## 90-Day SEO Action Plan

### Month 1 — Foundation
- [ ] Fix portfolio detail SEO (unique title, meta, canonical, schema) in `routes/public.js`
- [ ] Add canonicals for homepage, blog posts, privacy, terms
- [ ] Align FAQ schema with live FAQ content; fix Contact schema URL
- [ ] Remove unverifiable `aggregateRating` (or publish real reviews)
- [ ] Enable gzip/brotli + long-cache static assets
- [ ] Compress oversized PNGs → WebP/AVIF; fix LCP on mobile
- [ ] Expand `sitemap.xml` to include all `/blog/*` and `/portfolio/*`; submit in GSC
- [ ] Collapse HTTP redirects to a single hop to www
- [ ] `noindex`/remove `coming-soon.html` & `error.html`
- [ ] Verify Search Console + Bing Webmaster; fix coverage errors

### Month 2 — Growth
- [ ] Rewrite titles/metas for Blog, Career, Our Work, Home (length + CTA)
- [ ] Publish 3 service landing pages: Shopify App Dev, Web Portals, SaaS MVP
- [ ] Expand `/our-work` and each case study with outcomes, stack, and CTA links
- [ ] Build topic clusters; retrofit internal links across 11 existing posts
- [ ] Add `Article`, `BreadcrumbList`, `Organization`, `WebSite` schema
- [ ] Create proper OG share image (1200×630) and standardize www URLs
- [ ] Claim/optimize Clutch + Google Business Profile; add phone to NAP
- [ ] Remove misleading hreflang or launch real locale pages

### Month 3 — Authority
- [ ] Digital PR around Customer Story app (launches, install milestones, Shopify community)
- [ ] Guest posts / partner blogs in Shopify + SaaS niches (2–4 placements)
- [ ] Collect and mark up client reviews (`Review` / real AggregateRating)
- [ ] Publish cost/guide content aimed at snippets (“Shopify app development cost 2026”)
- [ ] Earn “Built by” links from client sites
- [ ] Refresh stale posts; update stats and `lastmod`
- [ ] Re-run Lighthouse + GSC; target mobile Performance ≥ 90, LCP ≤ 2.5s

---

## Target Keywords to Rank #1 For

> Volumes/difficulty are **estimates** for US/global English commercial intent (validate in Ahrefs/SEMrush/Keyword Planner). Current ranks assumed unranked / page 10+ unless branded.

| Keyword | Search Volume | Difficulty | Current Rank | Target Rank |
|---------|--------------|------------|-------------|------------|
| Shopify app development agency | 320–800 /mo | Medium-High | Not in top 20 (est.) | Top 3 |
| custom Shopify app development | 500–1.2k /mo | Medium-High | Not in top 20 (est.) | Top 5 |
| custom web portal development | 200–500 /mo | Medium | Not in top 20 (est.) | #1 |
| SaaS product development agency | 200–600 /mo | Medium | Not in top 20 (est.) | Top 5 |
| AI-enhanced web development agency | 50–150 /mo | Low-Medium | Not in top 20 (est.) | #1 |
| Shopify customer segmentation app | 50–200 /mo | Low | Product/site dependent | #1 (via Customer Story + case study) |
| hire Next.js developers for SaaS | 150–400 /mo | Medium | Not in top 20 (est.) | Top 5 |
| B2B client portal development | 100–300 /mo | Medium | Not in top 20 (est.) | #1 |
| Dadword IT | Branded low | Low | #1 (expected) | Defend #1 |
| SaaS MVP mistakes | 100–300 /mo | Low-Medium | Has matching post — push to Top 3 with schema + links | #1 |

---

## Appendix A — Evidence Snapshot

| Source | Result |
|--------|--------|
| Live crawl date | August 10, 2026 |
| Server | Apache/2.4.64 (Ubuntu) + Express |
| Analytics | GA4 `G-P7BTHRMZPD` present |
| Lighthouse | Desktop Perf 84 / SEO 100; Mobile Perf 65 / SEO 100 |
| SSL | Let’s Encrypt; expires Oct 1, 2026 |
| Code hotspots | `seo/config.js`, `views/partials/head.ejs`, `routes/public.js`, `public/sitemap.xml` |

## Appendix B — Highest-Impact Code Fixes (reference)

1. **`routes/public.js` → `/portfolio/:slug`** — stop spreading `SEO_CONFIG.our_work`; build per-project SEO.  
2. **`routes/public.js` → `/blog/:slug`** — set www canonical, Article schema, Twitter, www `og.url`.  
3. **`seo/config.js` → `index`** — add canonical; fix/remove aggregateRating; add telephone or omit.  
4. **`seo/config.js` → `customer_faq`** — regenerate `mainEntity` from live FAQ copy.  
5. **`views/partials/head.ejs`** — don’t emit multi-locale hreflang without real alternates; fix fallback when canonical missing.  
6. **`public/sitemap.xml`** — automate inclusion of blogs + portfolios.  
7. **Apache/Express** — enable compression + cache headers.

---

*Report generated by SEO Audit Agent*  
*Methods: live HTTP crawl, HTML/source analysis of key templates (`seo/config.js`, `head.ejs`, routes), Lighthouse 11.6 (desktop + mobile), SSL inspection, image weight sampling. Off-page metrics are estimated pending Ahrefs/Moz/GSC access.*
