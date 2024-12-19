const express = require('express');
const cors = require('cors');
const { loginUser, registerUser } = require('../controllers/UserController'); // Import functions

const router = express.Router();

// CORS options configuration
const corsOptions = {
    origin: ['http://localhost:5173', 'https://frontend-discussion.vercel.app'],
    methods: ['GET', 'POST'],
};

// Apply CORS middleware to all routes
router.use(cors(corsOptions));

// Handle preflight requests for CORS
router.options('*', cors(corsOptions));

// Define routes
router.post('/login', loginUser); // Login user route
router.post('/register', registerUser); // Register user route

module.exports = router;
