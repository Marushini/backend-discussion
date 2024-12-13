const express = require('express');
const cors = require('cors');
const { loginUser, registerUser } = require('../controllers/UserController'); // Import functions

const router = express.Router();

// Apply CORS to all routes in this file
const corsOptions = {
    origin: ['http://localhost:5173', 'https://frontend-discussion.vercel.app'],
    methods: ['GET', 'POST'],
};

router.use(cors(corsOptions));

// Handle preflight requests
router.options('*', cors(corsOptions));

// Define routes
router.post('/login', loginUser); // Use the imported loginUser function
router.post('/register', registerUser); // Use the imported registerUser function

module.exports = router;
