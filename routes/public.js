const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const SEO_CONFIG = require('../seo/config')

const { getRecentBlogs, getBlogs, getBlog } = require('../controllers/blog')

const SITE = 'https://www.dadwordit.com';
const LOGO = `${SITE}/images/logo.webp`;
const dataDir = path.join(__dirname, '../data');

function getData(filename) {
    return JSON.parse(fs.readFileSync(path.join(dataDir, filename), 'utf8'));
}

function trimMeta(text, max = 160) {
    if (!text) return '';
    const cleaned = String(text).replace(/\s+/g, ' ').trim();
    if (cleaned.length <= max) return cleaned;
    return cleaned.slice(0, max - 1).trimEnd() + '…';
}

function absoluteUrl(url) {
    if (!url) return LOGO;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `${SITE}${url.startsWith('/') ? url : `/${url}`}`;
}

function buildPortfolioSeo(project, slug) {
    const description = trimMeta(
        project.description ||
        project.outcome ||
        `${project.title} — case study by Dadword IT.`
    );
    const image = absoluteUrl(project.portfolioImg || project.desktopImage || project.images?.[0]);
    const pageUrl = `${SITE}/portfolio/${slug}`;
    const isApp = Array.isArray(project.tags) &&
        project.tags.some(tag => /shopify app|product|saas/i.test(tag));

    const schema = {
        "@context": "https://schema.org",
        "@type": isApp ? "SoftwareApplication" : "CreativeWork",
        "name": project.title,
        "description": description,
        "url": pageUrl,
        "image": image,
        "author": {
            "@type": "Organization",
            "name": "Dadword IT",
            "url": SITE
        }
    };

    if (isApp) {
        schema.applicationCategory = "BusinessApplication";
        schema.operatingSystem = "Web";
    }

    return {
        title: `${project.title} | Case Study | Dadword IT`,
        meta: {
            description,
            keywords: Array.isArray(project.tags) ? project.tags.join(', ') : 'web development case study',
            author: 'Dadword IT'
        },
        og: {
            title: project.title,
            description,
            image,
            url: pageUrl,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: project.title,
            description,
            image
        },
        schema,
        canonical: pageUrl
    };
}

router.get('/', async (req, res) => {
    let recent_blogs = await getRecentBlogs()
    res.render('index', {
        recent_blogs: recent_blogs,
        portfolioItems: getData('portfolio-config.json').portfolioItems,
        testimonials: getData('testimonial-config.json').testimonials,
        caseStudies: getData('case-studies-config.json').caseStudies,
        clients: getData('client-config.json').clients,
        ...SEO_CONFIG.index,
        trackingId: process.env.G_TRACKING_ID
    });
});

router.get('/portfolio/:slug', async (req, res) => {
    const slug = req.params.slug;
    let recent_blogs = await getRecentBlogs()
    const project = getData('portfolio-config.json').portfolioItems.find(
        item => item.slug === slug
    );

    if (!project) {
        return res.status(404).render('404');
    }

    res.render('portfolio-detail', {
        project,
        ...buildPortfolioSeo(project, slug),
        trackingId: process.env.G_TRACKING_ID,
        recent_blogs: recent_blogs,
    });
});


router.get('/about', async (req, res) => {
    let recent_blogs = await getRecentBlogs()
    res.render('about', {
        recent_blogs: recent_blogs,
        ...SEO_CONFIG.about,
        trackingId: process.env.G_TRACKING_ID
    });
});

router.get('/service', async (req, res) => {
    let recent_blogs = await getRecentBlogs()
    res.render('service', {
        recent_blogs: recent_blogs,
        ...SEO_CONFIG.service,
        trackingId: process.env.G_TRACKING_ID
    });
});

router.get('/our-work', async (req, res) => {
    let recent_blogs = await getRecentBlogs()
    res.render('our-work', {
        recent_blogs: recent_blogs,
        portfolioItems: getData('portfolio-config.json').portfolioItems,
        ...SEO_CONFIG.our_work,
        trackingId: process.env.G_TRACKING_ID
    });
});

router.get('/blog', async (req, res) => {
    let recent_blogs = await getRecentBlogs()
    const blogs = await getBlogs()
    res.render('blog', {
        recent_blogs: recent_blogs,
        ...SEO_CONFIG.blog,
        blogs: blogs,
        trackingId: process.env.G_TRACKING_ID
    });
});

router.get('/blog/:slug', async (req, res) => {
    let recent_blogs = await getRecentBlogs()
    const blog = await getBlog(`${req.params.slug}`);
    if (blog && blog.length) {
        const _blog = blog[0]
        const pageUrl = `${SITE}/blog/${req.params.slug}`;
        const metaTitle = _blog.seo?.metaTitle || _blog.name;
        const metaDescription = _blog.seo?.metaDescription || '';
        const image = _blog.main_image || LOGO;

        res.render('blog-single', {
            recent_blogs: recent_blogs,
            blog: _blog,
            trackingId: process.env.G_TRACKING_ID,
            title: `${metaTitle} | Dadword IT`,
            meta: {
                description: metaDescription,
                author: _blog.authorName
            },
            og: {
                title: metaTitle,
                description: metaDescription,
                image,
                url: pageUrl,
                type: 'article'
            },
            twitter: {
                card: 'summary_large_image',
                title: metaTitle,
                description: metaDescription,
                image
            },
            schema: {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": metaTitle,
                "description": metaDescription,
                "image": image,
                "datePublished": _blog.publishedAt || undefined,
                "author": {
                    "@type": "Person",
                    "name": _blog.authorName || 'Dadword IT'
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Dadword IT",
                    "logo": {
                        "@type": "ImageObject",
                        "url": LOGO
                    }
                },
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": pageUrl
                }
            },
            canonical: pageUrl
        });
    } else {
        res.status(404).render('blog-single', {
            blog: null,
            recent_blogs: recent_blogs,
            trackingId: process.env.G_TRACKING_ID,
            title: 'Article Not Found | Dadword IT',
            meta: { description: '' },
            og: null, twitter: null, schema: null, canonical: null
        });
    }
});

router.get('/career', async (req, res) => {
    let recent_blogs = await getRecentBlogs()
    res.render('career', {
        recent_blogs: recent_blogs,
        ...SEO_CONFIG.career,
        trackingId: process.env.G_TRACKING_ID
    });
});

router.get('/lets-talk', async (req, res) => {
    let recent_blogs = await getRecentBlogs()
    res.render('lets-talk', {
        recent_blogs: recent_blogs,
        ...SEO_CONFIG.lets_talk,
        trackingId: process.env.G_TRACKING_ID
    });
});

router.get('/contact-us', async (req, res) => {
    let recent_blogs = await getRecentBlogs()
    res.render('contact-us', {
        recent_blogs: recent_blogs,
        ...SEO_CONFIG.contact_us,
        trackingId: process.env.G_TRACKING_ID
    });
});

router.get('/faq', async (req, res) => {
    let recent_blogs = await getRecentBlogs()
    res.render('faq', {
        recent_blogs: recent_blogs,
        ...SEO_CONFIG.customer_faq,
        trackingId: process.env.G_TRACKING_ID
    });
});

router.get('/privacy-policy', async (req, res) => {
    let recent_blogs = await getRecentBlogs()
    res.render('privacy-policy', {
        recent_blogs: recent_blogs,
        ...SEO_CONFIG.privacy_policy,
        trackingId: process.env.G_TRACKING_ID
    });
});

router.get('/terms-and-conditions', async (req, res) => {
    let recent_blogs = await getRecentBlogs()
    res.render('terms-and-conditions', {
        recent_blogs: recent_blogs,
        ...SEO_CONFIG.terms_and_condition,
        trackingId: process.env.G_TRACKING_ID
    });
});

router.get('/sitemap.xml', async (req, res) => {
    const lastmod = new Date().toISOString().split('T')[0];
    const staticPaths = [
        '/',
        '/about',
        '/service',
        '/our-work',
        '/blog',
        '/career',
        '/lets-talk',
        '/contact-us',
        '/faq',
        '/privacy-policy',
        '/terms-and-conditions'
    ];

    const portfolioPaths = getData('portfolio-config.json').portfolioItems.map(
        item => `/portfolio/${item.slug}`
    );

    let blogPaths = [];
    try {
        const blogs = await getBlogs();
        blogPaths = (blogs || []).map(blog => {
            const slug = blog.slug || '';
            if (slug.startsWith('/blog/')) return slug;
            if (slug.startsWith('/')) return `/blog${slug}`;
            return `/blog/${slug}`;
        }).filter(Boolean);
    } catch (e) {
        blogPaths = [];
    }

    const urls = [...staticPaths, ...portfolioPaths, ...blogPaths];
    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(loc => `  <url>
    <loc>${SITE}${loc === '/' ? '/' : loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`).join('\n')}
</urlset>
`;

    res.type('application/xml').send(body);
});

module.exports = router;
