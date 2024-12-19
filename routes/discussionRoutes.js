const express = require('express');
const cors = require('cors');
const { getAllDiscussions, createDiscussion, likeDiscussion, dislikeDiscussion, addReply } = require('../controllers/discussionController');

const router = express.Router();

// Apply CORS to all routes in this file
router.use(cors({
  origin: ['http://localhost:5173', 'https://frontend-discussion.vercel.app'], // Allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
}));

// Define routes for discussions
router.get('/discussions', getAllDiscussions); // Get all discussions
router.post('/discussion', createDiscussion); // Create a new discussion

// Like and dislike routes
router.post('/discussion/:id/like', likeDiscussion); // Like a discussion
router.post('/discussion/:id/dislike', dislikeDiscussion); // Dislike a discussion

// Add a reply to a discussion
router.post('/discussion/reply', addReply); // This route will handle adding replies

module.exports = router;
