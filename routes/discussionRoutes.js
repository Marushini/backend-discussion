const express = require('express');
const cors = require('cors');
const { getAllDiscussions, createDiscussion } = require('../controllers/discussionController');
const { likeDiscussion, dislikeDiscussion } = require('../controllers/discussionController'); // Import the like and dislike controllers
const { addReply } = require('../controllers/discussionController'); // Import the addReply controller

const router = express.Router();

// Apply CORS to all routes in this file
router.use(cors({
  origin: ['http://localhost:5173', 'https://frontend-discussion.vercel.app'], // Allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
}));

// Define routes
router.get('/discussions', getAllDiscussions);
router.post('/discussion', createDiscussion);

// Like and dislike routes
router.post('/discussion/:id/like', likeDiscussion);
router.post('/discussion/:id/dislike', dislikeDiscussion);

// Reply route: Adds a reply to a specific discussion
router.post('/discussion/:id/reply', addReply);

module.exports = router;
