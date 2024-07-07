const express = require('express');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/createComment', auth, async (req, res) => {
    try {
        const { product, rating, images, text } = req.body;
        const user = req.user._id;

        const comment = new Comment({
            product,
            user,
            rating,
            images,
            text
        });

        await comment.save();

        res.status(201).json({ message: 'Comment created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create comment' });
    }
});

router.get('/:commentId', auth, async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comment' });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const commentId = req.params.id;
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        await comment.remove();

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete comment' });
    }
});

module.exports = router;
