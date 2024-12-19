const Discussion = require('../models/Discussion');

// Get all discussions
const getAllDiscussions = async (req, res) => {
    try {
        const discussions = await Discussion.find();
        res.status(200).json(discussions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new discussion
const createDiscussion = async (req, res) => {
    const { title, description, createdBy } = req.body;

    try {
        const discussion = new Discussion({ title, description, createdBy, likeCount: 0, dislikeCount: 0 });
        const savedDiscussion = await discussion.save();
        res.status(201).json({
            message: 'Discussion created successfully',
            discussion: savedDiscussion,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Like a discussion
const likeDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found' });
        }

        discussion.likeCount += 1;  // Increment like count
        const updatedDiscussion = await discussion.save();

        res.status(200).json(updatedDiscussion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Dislike a discussion
const dislikeDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found' });
        }

        discussion.dislikeCount += 1;  // Increment dislike count
        const updatedDiscussion = await discussion.save();

        res.status(200).json(updatedDiscussion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllDiscussions,
    createDiscussion,
    likeDiscussion,
    dislikeDiscussion,
};
