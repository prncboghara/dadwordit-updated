const express = require('express');
const axios = require('axios');
const moment = require('moment');

const getRecentBlogs = async () => {
    try {
        const HUBSPOT_API_URL = "https://api.hubapi.com/cms/v3/blogs/posts";
        const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

        const response = await axios.get(HUBSPOT_API_URL, {
            headers: { Authorization: `Bearer ${HUBSPOT_API_KEY}` },
            params: {
                limit: 3, // Fetch the latest 3 blogs
                offset: 0, // Optional, set to 0 for the first page of results
                state: 'PUBLISHED'
            }
        });

        return response.data.results.map(blog => ({
            id: blog.id,
            name: blog.name,
            created: moment(blog.created).format('MMM DD, YYYY'),
            featuredImage: blog.featuredImage,
            url: blog.slug
        }));

    } catch (error) {
        return []
    }
};

const getTags = async () => {
    try {
        const HUBSPOT_API_URL = "https://api.hubapi.com/cms/v3/blogs/tags";
        const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

        const response = await axios.get(HUBSPOT_API_URL, { headers: { Authorization: `Bearer ${HUBSPOT_API_KEY}` } });
        return response.data.results;
    } catch (error) {
        console.log('error', error)
        return []
    }
}

const getBlogs = async () => {
    try {
        const tags = await getTags()
        // get blogs
        const HUBSPOT_API_URL = "https://api.hubapi.com/cms/v3/blogs/posts";
        const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

        const response = await axios.get(HUBSPOT_API_URL, {
            headers: { Authorization: `Bearer ${HUBSPOT_API_KEY}` },
        });

        return response.data.results.map(blog => ({
            id: blog.id,
            name: blog.name,
            created: moment(blog.created).format('MMM DD, YYYY'),
            featuredImage: blog.featuredImage,
            authorName: blog.authorName,
            metaDescription: blog.metaDescription,
            tags: blog.tagIds.map(tagId => {
                return tags.find(tag => tag.id === tagId.toString()); // Ensure ID is in string format
            }),
            slug: blog.slug
        }));
    } catch (error) {
        console.log('error', error)
        return []
    }
};

const getBlog = async (slug) => {
    try {
        const HUBSPOT_API_URL = `https://api.hubapi.com/cms/v3/blogs/posts?slug=${slug}`;
        const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

        const response = await axios.get(HUBSPOT_API_URL, {
            headers: { Authorization: `Bearer ${HUBSPOT_API_KEY}` },
        });

        const comments = await getComments(response.data.results[0].id)

        return response.data.results.map(blog => ({
            id: blog.id,
            name: blog.name,
            authorName: blog.authorName,
            state: blog.state,
            created: moment(blog.created).format('MMM DD, YYYY'),
            featuredImage: blog.featuredImage,
            slug: blog.slug,
            postBody: blog.postBody,
            metaDescription: blog.metaDescription,
            comments: comments,
            blogUrl:blog.url
        }));

    } catch (error) {
        console.log("error", error)
        return []
    }
};

const getComments = async (id) => {
    try {
        const HUBSPOT_API_URL = `https://api.hubapi.com/comments/v3/comments/?contentId=${id}`;
        const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

        const response = await axios.get(HUBSPOT_API_URL, {
            headers: { Authorization: `Bearer ${HUBSPOT_API_KEY}` },
        });

        return response.data.objects.map(c => ({
            createdAt: moment(c.createdAt).format('MMM DD, YYYY'),
            userName: c.userName,
            userEmail: c.userEmail,
            comment: c.comment
        }));

    } catch (error) {
        console.log("error", error)
        return []
    }
};

const postComment = async (req, res) => {
    const { id, title, userEmail, userName, comment } = req.body;

    try {
        const response = await axios.post('https://api.hubapi.com/comments/v3/comments', {
            contentId: id,
            collectionId: id,
            contentTitle: title,
            userEmail: userEmail,
            userName: userName,
            comment: comment
        }, {
            headers: {
                Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });
        response.data.createdAt = moment(response.data.createdAt).format('MMM DD, YYYY'),
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error adding comment:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to add comment' });
    }

};



module.exports = { getRecentBlogs, getBlogs, getTags, getBlog, postComment }