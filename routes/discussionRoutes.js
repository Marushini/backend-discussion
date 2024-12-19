const express = require('express');
const cors = require('cors');
const {
  getAllDiscussions,
  createDiscussion,
  likeDiscussion,
  dislikeDiscussion,
  addReply
} = require('../controllers/discussionController');

const router = express.Router();

// Apply CORS to all routes in this file
router.use(cors({
  origin: ['http://localhost:5173', 'https://vercel.live/toolbar/session', 'https://frontend-discussion.vercel.app'], // Allowed origins
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
