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
        const discussion = new Discussion({ title, description, createdBy });
        const savedDiscussion = await discussion.save();
        res.status(201).json({
            message: 'Discussion created successfully',
            discussion: savedDiscussion,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllDiscussions,
    createDiscussion,
};
