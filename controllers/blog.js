const express = require('express');
const axios = require('axios');
const moment = require('moment');
const showdown = require('showdown');

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
            main_image: `${STRAPI_URL}${blog.main_image.url}`,
            cover: `${STRAPI_URL}${blog.cover.url}`,
            slug: blog.slug,
            content: converter.makeHtml(blog.content),
            comments: [],
            blogUrl: `https://dadwordit.com/blog/${blog.slug}`,
            seo: blog.blocks.find(b => b.__component === 'shared.seo')
            // state: blog.state,
            // metaDescription: blog.metaDescription,
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