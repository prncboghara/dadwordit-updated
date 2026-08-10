const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const SEO_CONFIG = require('../seo/config')

const { getRecentBlogs, getBlogs, getBlog, postComment } = require('../controllers/blog')

const dataDir = path.join(__dirname, '../data');

function getData(filename) {
    return JSON.parse(fs.readFileSync(path.join(dataDir, filename), 'utf8'));
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
        ...SEO_CONFIG.our_work,
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
    if (blog) {
        const _blog = blog[0]
        res.render('blog-single', {
            recent_blogs: recent_blogs,
            blog: _blog,
            trackingId: process.env.G_TRACKING_ID,
            title: `${_blog.seo.metaTitle} | Dadword IT`,
            meta: {
                description: _blog.seo.metaDescription,
                author: _blog.authorName
            },
            og: {
                title: _blog.seo.metaTitle,
                description: _blog.seo.metaDescription,
                image: _blog.main_image,
                url: `https://dadwordit.com/blog/${req.params.slug}`,
                type: 'website'
            },
            twitter: null,
            schema: null,
            canonical: null
        });
    } else {
        res.render('blog-single', {
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

// router.post('/add-comment', postComment);

module.exports = router;