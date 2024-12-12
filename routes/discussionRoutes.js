const express = require('express');
const router = express.Router();
const Discussion = require('../models/Discussion');

// Post a new discussion
router.post('/discussion', async (req, res) => {
    const { title, description, createdBy } = req.body;

    try {
        const newDiscussion = new Discussion({ title, description, createdBy });
        await newDiscussion.save();
        res.status(201).json({ message: 'Discussion created successfully', discussion: newDiscussion });
    } catch (err) {
        res.status(500).json({ error: 'Error creating discussion', details: err });
    }
});

// Get all discussions
router.get('/discussions', async (req, res) => {
    try {
        const discussions = await Discussion.find();
        res.status(200).json(discussions);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching discussions', details: err });
    }
});

module.exports = router;
