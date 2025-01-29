const express = require('express');
const app = express();
const { getRecentBlogs, getBlogs, getBlog, postComment } = require('./controllers/blog')
const SEO_CONFIG = require('./seo/config')
const fs = require('fs');
const path = require('path');

// Serve static files from the "public" directory
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());

app.use((req, res, next) => {
    const host = req.headers.host;

    // Redirect from non-www to www
    if (!host.startsWith('www.') && process.env.NODE_ENV === 'production') {
        res.redirect(301, `https://www.${host}${req.originalUrl}`);
    } else {
        next();
    }
});

const portfolioConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/portfolio-config.json'), 'utf8'));
const testimonialConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/testimonial-config.json'), 'utf8'));
const clientConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/client-config.json'), 'utf8'));

// routes of dadword it
app.get('/', async (req, res) => {
    let recent_blogs = await getRecentBlogs()
    res.render('index', { 
        recent_blogs: recent_blogs,
        portfolioItems: portfolioConfig.portfolioItems,
        testimonials: testimonialConfig.testimonials,
        clients: clientConfig.clients,
        ...SEO_CONFIG.index,
        trackingId: process.env.G_TRACKING_ID
    });
});

app.get('/about', async (req, res) => {
    let recent_blogs = await getRecentBlogs()
    res.render('about', { 
        recent_blogs: recent_blogs,
        ...SEO_CONFIG.about,
        trackingId: process.env.G_TRACKING_ID
    });
});

app.get('/service', async (req, res) => {
    let recent_blogs = await getRecentBlogs()
    res.render('about', { 
        recent_blogs: recent_blogs,
        ...SEO_CONFIG.service,
        trackingId: process.env.G_TRACKING_ID
    });
});

app.get('/our-work', async (req, res) => {
    let recent_blogs = await getRecentBlogs()
    res.render('our-work', { 
        recent_blogs: recent_blogs,
        portfolioItems: portfolioConfig.portfolioItems,
        ...SEO_CONFIG.our_work,
        trackingId: process.env.G_TRACKING_ID
    });
});

app.get('/blog', async (req, res) => {
    let recent_blogs = await getRecentBlogs()
    const blogs = await getBlogs()
    res.render('blog', { 
        recent_blogs: recent_blogs,
        ...SEO_CONFIG.blog,
        blogs: blogs,
        trackingId: process.env.G_TRACKING_ID
    });
});

app.get('/blog/:slug', async (req, res) => {
    let recent_blogs = await getRecentBlogs()
    const blog = await getBlog(`blog/${req.params.slug}`);
    res.render('blog-single', { 
        recent_blogs: recent_blogs,
        blog: blog[0],
        trackingId: process.env.G_TRACKING_ID,
        title: `${blog[0].name} | Dadword IT`,
        meta: {
            description: blog[0].metaDescription,
            author: blog[0].authorName
        },
        og: {
            title: blog[0].name,
            description: blog[0].metaDescription,
            image: blog[0].featuredImage,
            url: `https://dadwordit.com/blog/${req.params.slug}`,
            type: 'website'
        },
        twitter: null,
        schema: null,
        canonical: null
    });
});

app.get('/career', async (req, res) => {
    let recent_blogs = await getRecentBlogs()
    res.render('career', { 
        recent_blogs: recent_blogs,
        ...SEO_CONFIG.career,
        trackingId: process.env.G_TRACKING_ID
    });
});

app.get('/lets-talk', async (req, res) => {
    let recent_blogs = await getRecentBlogs()
    res.render('lets-talk', { 
        recent_blogs: recent_blogs,
        ...SEO_CONFIG.lets_talk,
        trackingId: process.env.G_TRACKING_ID
    });
});

app.get('/contact-us', async (req, res) => {
    let recent_blogs = await getRecentBlogs()
    res.render('contact-us', { 
        recent_blogs: recent_blogs,
        ...SEO_CONFIG.contact_us,
        trackingId: process.env.G_TRACKING_ID
    });
});

app.get('/faq', async (req, res) => {
    let recent_blogs = await getRecentBlogs()
    res.render('faq', { 
        recent_blogs: recent_blogs,
        ...SEO_CONFIG.customer_faq,
        trackingId: process.env.G_TRACKING_ID
    });
});

app.get('/privacy-policy', async (req, res) => {
    let recent_blogs = await getRecentBlogs()
    res.render('privacy-policy', { 
        recent_blogs: recent_blogs,
        ...SEO_CONFIG.privacy_policy,
        trackingId: process.env.G_TRACKING_ID
    });
});

app.get('/terms-and-conditions', async (req, res) => {
    let recent_blogs = await getRecentBlogs()
    res.render('terms-and-conditions', { 
        recent_blogs: recent_blogs,
        ...SEO_CONFIG.terms_and_condition,
        trackingId: process.env.G_TRACKING_ID
    });
});

// post request
app.post('/add-comment', postComment);

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
