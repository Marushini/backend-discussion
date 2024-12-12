const express = require('express');
const router = express.Router();
const { getAllDiscussions, createDiscussion } = require('../controllers/discussionController');

// Post a new discussion
router.post('/discussion', createDiscussion);

// Get all discussions
router.get('/discussions', getAllDiscussions);

module.exports = router;
