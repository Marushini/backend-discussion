const express = require('express');
const cors = require('cors');
const { getAllDiscussions, createDiscussion } = require('../controllers/discussionController');

const router = express.Router();

// Apply CORS to all routes in this file
router.use(cors({
  origin: ['http://localhost:5173', 'https://frontend-discussion.vercel.app'], // Allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
}));

// Define routes
router.get('/discussions', getAllDiscussions);
router.post('/discussion', createDiscussion);

module.exports = router;
