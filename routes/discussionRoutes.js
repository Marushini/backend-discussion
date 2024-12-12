const express = require('express');
const { getAllDiscussions, createDiscussion } = require('../controllers/discussionController');
const router = express.Router();

// Routes
router.get('/', getAllDiscussions);
router.post('/', createDiscussion);

module.exports = router;

