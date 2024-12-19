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
        const discussion = new Discussion({ title, description, createdBy, likeCount: 0, dislikeCount: 0, replies: [] });
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

// Add a reply to a discussion
const addReply = async (req, res) => {
    const { replyText, repliedBy } = req.body; // Receive reply text and user who replied
    const discussionId = req.params.id; // Extract discussion ID from URL parameter

    try {
        const discussion = await Discussion.findById(discussionId);
        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found' });
        }

        const reply = {
            replyText,
            repliedBy,
            createdAt: new Date(),  // Optional: MongoDB automatically sets createdAt
        };

        // Push reply to the discussion's replies array
        discussion.replies.push(reply);

        // Save the updated discussion
        const updatedDiscussion = await discussion.save();

        res.status(200).json({
            message: 'Reply added successfully',
            discussion: updatedDiscussion,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllDiscussions,
    createDiscussion,
    likeDiscussion,
    dislikeDiscussion,
    addReply,  // Export the addReply function
};
