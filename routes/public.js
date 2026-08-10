const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const SEO_CONFIG = require('../seo/config');
const { SITE, LOGO, withBreadcrumb } = require('../seo/schema');

const { getRecentBlogs, getBlogs, getBlog } = require('../controllers/blog');

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

function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function blogPath(slug) {
    if (!slug) return '';
    if (slug.startsWith('/blog/')) return slug;
    if (slug.startsWith('/')) return `/blog${slug}`;
    return `/blog/${slug}`;
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
        '@context': 'https://schema.org',
        '@type': isApp ? 'SoftwareApplication' : 'CreativeWork',
        name: project.title,
        description,
        url: pageUrl,
        image,
        author: {
            '@type': 'Organization',
            name: 'Dadword IT',
            url: SITE
        }
    };

    if (isApp) {
        schema.applicationCategory = 'BusinessApplication';
        schema.operatingSystem = 'Web';
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
        schema: withBreadcrumb(schema, [
            { name: 'Home', url: `${SITE}/` },
            { name: 'Our Work', url: `${SITE}/our-work` },
            { name: project.sortTitle || project.title, url: pageUrl }
        ]),
        canonical: pageUrl
    };
}

const OUR_WORK_FAQ_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What kinds of projects are in the Dadword IT portfolio?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Our portfolio includes Shopify apps, custom B2B web portals, and SaaS products. Each case study covers the problem, stack, and measurable outcome.'
            }
        },
        {
            '@type': 'Question',
            name: 'Do you build custom Shopify apps or only themes?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'We specialise in custom Shopify apps and theme extensions — for example Customer Story, our Shopify customer segmentation and storytelling app — not template reskins.'
            }
        },
        {
            '@type': 'Question',
            name: 'Can I see more detail on a specific case study?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Open any project card on this page to read the full case study, including goals, architecture, and results.'
            }
        },
        {
            '@type': 'Question',
            name: 'How do I start a similar project with Dadword IT?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Send a project inquiry via Contact Us, or book a free 30-minute strategy call on Let\'s Talk. We will assess fit and outline next steps.'
            }
        }
    ]
};

router.get('/', async (req, res) => {
    let recent_blogs = await getRecentBlogs();
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
    let recent_blogs = await getRecentBlogs();
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
    let recent_blogs = await getRecentBlogs();
    const seo = deepClone(SEO_CONFIG.about);
    seo.schema = withBreadcrumb(seo.schema, [
        { name: 'Home', url: `${SITE}/` },
        { name: 'About', url: `${SITE}/about` }
    ]);
    res.render('about', {
        recent_blogs: recent_blogs,
        ...seo,
        trackingId: process.env.G_TRACKING_ID
    });
});

router.get('/service', async (req, res) => {
    let recent_blogs = await getRecentBlogs();
    const seo = deepClone(SEO_CONFIG.service);
    seo.schema = withBreadcrumb(seo.schema, [
        { name: 'Home', url: `${SITE}/` },
        { name: 'Services', url: `${SITE}/service` }
    ]);
    res.render('service', {
        recent_blogs: recent_blogs,
        ...seo,
        trackingId: process.env.G_TRACKING_ID
    });
});

router.get('/our-work', async (req, res) => {
    let recent_blogs = await getRecentBlogs();
    const portfolioItems = getData('portfolio-config.json').portfolioItems;
    const seo = deepClone(SEO_CONFIG.our_work);
    seo.schema.itemListElement = portfolioItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.sortTitle || item.title,
        url: `${SITE}/portfolio/${item.slug}`
    }));
    seo.schema = withBreadcrumb(seo.schema, [
        { name: 'Home', url: `${SITE}/` },
        { name: 'Our Work', url: `${SITE}/our-work` }
    ]).concat([OUR_WORK_FAQ_SCHEMA]);
    res.render('our-work', {
        recent_blogs: recent_blogs,
        portfolioItems,
        ...seo,
        trackingId: process.env.G_TRACKING_ID
    });
});

router.get('/blog', async (req, res) => {
    let recent_blogs = await getRecentBlogs();
    const blogs = await getBlogs();
    const seo = deepClone(SEO_CONFIG.blog);
    seo.schema.blogPost = (blogs || []).slice(0, 20).map(blog => {
        const slugPath = blogPath(blog.slug || blog.url || '');
        return {
            '@type': 'BlogPosting',
            headline: blog.name || blog.title,
            url: slugPath ? `${SITE}${slugPath}` : undefined,
            datePublished: blog.publishedAt || blog.created || undefined,
            author: {
                '@type': 'Person',
                name: blog.authorName || 'Dadword IT'
            }
        };
    }).filter(post => post.url);
    seo.schema = withBreadcrumb(seo.schema, [
        { name: 'Home', url: `${SITE}/` },
        { name: 'Blog', url: `${SITE}/blog` }
    ]);
    res.render('blog', {
        recent_blogs: recent_blogs,
        ...seo,
        blogs: blogs,
        trackingId: process.env.G_TRACKING_ID
    });
});

router.get('/blog/:slug', async (req, res) => {
    let recent_blogs = await getRecentBlogs();
    const blog = await getBlog(`${req.params.slug}`);
    if (blog && blog.length) {
        const _blog = blog[0];
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
            schema: withBreadcrumb({
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: metaTitle,
                description: metaDescription,
                image,
                datePublished: _blog.publishedAt || undefined,
                author: {
                    '@type': 'Person',
                    name: _blog.authorName || 'Dadword IT'
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'Dadword IT',
                    logo: {
                        '@type': 'ImageObject',
                        url: LOGO
                    }
                },
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': pageUrl
                }
            }, [
                { name: 'Home', url: `${SITE}/` },
                { name: 'Blog', url: `${SITE}/blog` },
                { name: metaTitle, url: pageUrl }
            ]),
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
    let recent_blogs = await getRecentBlogs();
    const seo = deepClone(SEO_CONFIG.career);
    seo.schema = withBreadcrumb(seo.schema, [
        { name: 'Home', url: `${SITE}/` },
        { name: 'Careers', url: `${SITE}/career` }
    ]);
    res.render('career', {
        recent_blogs: recent_blogs,
        ...seo,
        trackingId: process.env.G_TRACKING_ID
    });
});

router.get('/lets-talk', async (req, res) => {
    let recent_blogs = await getRecentBlogs();
    const seo = deepClone(SEO_CONFIG.lets_talk);
    seo.schema = withBreadcrumb(seo.schema, [
        { name: 'Home', url: `${SITE}/` },
        { name: 'Book a Call', url: `${SITE}/lets-talk` }
    ]);
    res.render('lets-talk', {
        recent_blogs: recent_blogs,
        ...seo,
        trackingId: process.env.G_TRACKING_ID
    });
});

router.get('/contact-us', async (req, res) => {
    let recent_blogs = await getRecentBlogs();
    const seo = deepClone(SEO_CONFIG.contact_us);
    seo.schema = withBreadcrumb(seo.schema, [
        { name: 'Home', url: `${SITE}/` },
        { name: 'Contact', url: `${SITE}/contact-us` }
    ]);
    res.render('contact-us', {
        recent_blogs: recent_blogs,
        ...seo,
        trackingId: process.env.G_TRACKING_ID
    });
});

router.get('/faq', async (req, res) => {
    let recent_blogs = await getRecentBlogs();
    const seo = deepClone(SEO_CONFIG.customer_faq);
    seo.schema = withBreadcrumb(seo.schema, [
        { name: 'Home', url: `${SITE}/` },
        { name: 'FAQ', url: `${SITE}/faq` }
    ]);
    res.render('faq', {
        recent_blogs: recent_blogs,
        ...seo,
        trackingId: process.env.G_TRACKING_ID
    });
});

router.get('/privacy-policy', async (req, res) => {
    let recent_blogs = await getRecentBlogs();
    const seo = deepClone(SEO_CONFIG.privacy_policy);
    seo.schema = withBreadcrumb(null, [
        { name: 'Home', url: `${SITE}/` },
        { name: 'Privacy Policy', url: `${SITE}/privacy-policy` }
    ]);
    res.render('privacy-policy', {
        recent_blogs: recent_blogs,
        ...seo,
        trackingId: process.env.G_TRACKING_ID
    });
});

router.get('/terms-and-conditions', async (req, res) => {
    let recent_blogs = await getRecentBlogs();
    const seo = deepClone(SEO_CONFIG.terms_and_condition);
    seo.schema = withBreadcrumb(null, [
        { name: 'Home', url: `${SITE}/` },
        { name: 'Terms', url: `${SITE}/terms-and-conditions` }
    ]);
    res.render('terms-and-conditions', {
        recent_blogs: recent_blogs,
        ...seo,
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
        blogPaths = (blogs || []).map(blog => blogPath(blog.slug || '')).filter(Boolean);
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
