const Comment = require('../models/comment.model');

const createComment = async (req, res) => {
    try {
        const { textComment, userId, postId } = req.body;
        const comment = new Comment({ textComment, userId, postId });
        await comment.save();
        res.status(201).json({ message: 'Comment created successfully', comment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create comment' });
    }
};

module.exports = { createComment };