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

// Add a reply to a discussion post
const addReply = async (req, res) => {
    const { postId, replyText, username } = req.body;

    try {
        const discussion = await Discussion.findById(postId);
        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found' });
        }

        // Add the new reply to the replies array
        discussion.replies.push({
            username,
            replyText,
        });

        await discussion.save(); // Save the updated discussion post
        res.status(200).json({ message: 'Reply added successfully', discussion });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllDiscussions,
    createDiscussion,
    likeDiscussion,
    dislikeDiscussion,
    addReply, // Export the addReply function
};
