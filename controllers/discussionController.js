const Discussion = require('../models/Discussion');

// Get all discussions
const getAllDiscussions = async (req, res) => {
    try {
        const discussions = await Discussion.find();
        res.status(200).json(discussions);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching discussions: ' + err.message });
    }
};

// Create a new discussion
const createDiscussion = async (req, res) => {
    const { title, description, createdBy } = req.body;

    // Add basic validation
    if (!title || !description || !createdBy) {
        return res.status(400).json({ message: 'Title, description, and createdBy are required' });
    }

    try {
        const discussion = new Discussion({ title, description, createdBy, likeCount: 0, dislikeCount: 0, replies: [] });
        const savedDiscussion = await discussion.save();
        res.status(201).json({
            message: 'Discussion created successfully',
            discussion: savedDiscussion,
        });
    } catch (err) {
        res.status(500).json({ error: 'Error creating discussion: ' + err.message });
    }
};

// Like a discussion
const likeDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findByIdAndUpdate(
            req.params.id,
            { $inc: { likeCount: 1 } },  // Increment likeCount atomically
            { new: true }  // Return the updated document
        );
        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found' });
        }

        res.status(200).json(discussion);
    } catch (err) {
        res.status(500).json({ error: 'Error liking discussion: ' + err.message });
    }
};

// Dislike a discussion
const dislikeDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findByIdAndUpdate(
            req.params.id,
            { $inc: { dislikeCount: 1 } },  // Increment dislikeCount atomically
            { new: true }  // Return the updated document
        );
        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found' });
        }

        res.status(200).json(discussion);
    } catch (err) {
        res.status(500).json({ error: 'Error disliking discussion: ' + err.message });
    }
};

// Add a reply to a discussion
const addReply = async (req, res) => {
    const { replyText, repliedBy } = req.body;  // Receive reply text and user who replied
    const discussionId = req.params.id;  // Extract discussion ID from URL parameter

    // Validate reply data
    if (!replyText || !repliedBy) {
        return res.status(400).json({ message: 'Reply text and repliedBy are required' });
    }

    try {
        const discussion = await Discussion.findById(discussionId);
        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found' });
        }

        const reply = {
            replyText,
            repliedBy,
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
        res.status(500).json({ error: 'Error adding reply: ' + err.message });
    }
};

module.exports = {
    getAllDiscussions,
    createDiscussion,
    likeDiscussion,
    dislikeDiscussion,
    addReply,
};
