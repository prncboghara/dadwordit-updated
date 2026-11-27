const express = require('express');
const axios = require('axios');
const moment = require('moment');
const showdown = require('showdown');

// The page title is the only <h1>. Shift the article's headings so its top level
// becomes <h2> and no heading levels are skipped.
function normalizeHeadings(html) {
    const levels = [...new Set([...html.matchAll(/<h([1-6])[\s>]/gi)].map(m => Number(m[1])))].sort();
    if (!levels.length) return html;
    // Map the levels used (e.g. 1,3,4) onto consecutive levels from h2, then walk the
    // headings in order so none goes more than one level deeper than the one before.
    const map = Object.fromEntries(levels.map((lvl, i) => [lvl, Math.min(6, 2 + i)]));
    let prev = 1;
    const stack = [];
    return html.replace(/<(\/?)h([1-6])(?=[\s>])/gi, (m, slash, n) => {
        if (slash) return `</h${stack.pop() || map[n]}`;
        const level = Math.min(map[n], prev + 1);
        prev = level;
        stack.push(level);
        return `<h${level}`;
    });
}

const getRecentBlogs = async () => {
    try {
        const TOKEN = process.env.STRAPI_TOKEN;
        const STRAPI_URL = process.env.STRAPI_URL;
        const API_PATH = `${STRAPI_URL}/api/articles?populate[author]=true&populate[main_image]=true&populate[category]=true&fields=title,slug,publishedAt,documentId&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=3`;

        const response = await axios.get(API_PATH, {
            headers: { Authorization: `Bearer ${TOKEN}` }
        });

        return response.data.data.map(blog => ({
            id: blog.id,
            name: blog.title,
            created: moment(blog.publishedAt).format('MMM DD, YYYY'),
            featuredImage: `${STRAPI_URL}${blog.main_image.url}`,
            url: `/blog/${blog.slug}`
        }));

    } catch (error) {
        return []
    }
};

// const getTags = async () => {
//     try {
//         const HUBSPOT_API_URL = "https://api.hubapi.com/cms/v3/blogs/tags";
//         const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

//         const response = await axios.get(HUBSPOT_API_URL, { headers: { Authorization: `Bearer ${HUBSPOT_API_KEY}` } });
//         return response.data.results;
//     } catch (error) {
//         console.log('error', error)
//         return []
//     }
// }

const getBlogs = async () => {
    try {
        
        // get blogs
        const TOKEN = process.env.STRAPI_TOKEN;
        const STRAPI_URL = process.env.STRAPI_URL;
        const API_PATH = `${STRAPI_URL}/api/articles?populate[author]=true&populate[cover]=true&populate[category]=true&populate[main_image]=true&fields=title,slug,publishedAt,documentId&sort=publishedAt:desc`;

        const response = await axios.get(API_PATH, {
            headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
        });

        return response.data.data.map(blog => ({
            id: blog.id,
            name: blog.title,
            created: moment(blog.publishedAt).format('MMM DD, YYYY'),
            featuredImage: `${STRAPI_URL}${blog.main_image.url}`,
            authorName: blog?.author?.name,
            // metaDescription: blog.metaDescription,
            // tags: blog.tagIds.map(tagId => {
            //     return tags.find(tag => tag.id === tagId.toString()); // Ensure ID is in string format
            // }),
            slug: `/blog/${blog.slug}`
        }));
    } catch (error) {
        return []
    }
};

const getBlog = async (slug) => {
    try {
        const TOKEN = process.env.STRAPI_TOKEN;
        const STRAPI_URL = process.env.STRAPI_URL;
        const API_PATH = `${STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`;

        const response = await axios.get(API_PATH, {
            headers: { Authorization: `Bearer ${TOKEN}` },
        });

        let converter = new showdown.Converter();
        converter.setOption('tables', true);
        return response.data.data.map(blog => ({
            id: blog.id,
            name: blog.title,
            authorName: blog.author.name,
            created: moment(blog.publishedAt).format('MMM DD, YYYY'),
            publishedAt: blog.publishedAt,
            main_image: `${STRAPI_URL}${blog.main_image.url}`,
            cover: `${STRAPI_URL}${blog.cover.url}`,
            slug: blog.slug,
            content: normalizeHeadings(converter.makeHtml(blog.content)),
            comments: [],
            blogUrl: `https://www.dadwordit.com/blog/${blog.slug}`,
            seo: blog.blocks.find(b => b.__component === 'shared.seo')
        }));

    } catch (error) {
        console.log("error", error)
        return []
    }
};

// const getComments = async (id) => {
//     try {
//         const HUBSPOT_API_URL = `https://api.hubapi.com/comments/v3/comments/?contentId=${id}`;
//         const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

//         const response = await axios.get(HUBSPOT_API_URL, {
//             headers: { Authorization: `Bearer ${HUBSPOT_API_KEY}` },
//         });

//         return response.data.objects.map(c => ({
//             createdAt: moment(c.createdAt).format('MMM DD, YYYY'),
//             userName: c.userName,
//             userEmail: c.userEmail,
//             comment: c.comment
//         }));

//     } catch (error) {
//         console.log("error", error)
//         return []
//     }
// };

// const postComment = async (req, res) => {
//     const { id, title, userEmail, userName, comment } = req.body;

//     try {
//         const response = await axios.post('https://api.hubapi.com/comments/v3/comments', {
//             contentId: id,
//             collectionId: id,
//             contentTitle: title,
//             userEmail: userEmail,
//             userName: userName,
//             comment: comment
//         }, {
//             headers: {
//                 Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
//                 'Content-Type': 'application/json',
//             },
//         });
//         response.data.createdAt = moment(response.data.createdAt).format('MMM DD, YYYY'),
//         res.status(200).json(response.data);
//     } catch (error) {
//         console.error('Error adding comment:', error.response?.data || error.message);
//         res.status(500).json({ error: 'Failed to add comment' });
//     }

// };



module.exports = { getRecentBlogs, getBlogs, getBlog }