const Post = require('../models/Post.model');
const mongoose = require('mongoose');

const createPost = async (req, res) => {
    try {
        const { content, author } = req.body;
        const post = new Post({ content, author });
        await post.save();
        res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create post' });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username');
        res.status(200).json({ posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
}

const likePost = async (req, res) => {
    try {
        const { postId, userId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid postId or userId' });
        }
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        post.likes = post.likes || [];
        const alreadyLiked = post.likes.some((id) => id.toString() === userId);
        if (!alreadyLiked) {
            post.likes.push(userId);
            await post.save();
        }
        res.status(200).json({ message: 'Post liked successfully', post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to like post' });
    }
};

const commentOnPost = async (req, res) => {
    try {
        const { postId, userId, text } = req.body;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        post.comments.push({ user: userId, text });
        await post.save();
        res.status(200).json({ message: 'Comment added successfully', post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add comment' });
    }
};

module.exports = { createPost, getAllPosts, likePost, commentOnPost };