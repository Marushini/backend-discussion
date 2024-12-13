const express = require('express');
const cors = require('cors');
const { loginUser, registerUser } = require('../controllers/UserController'); // Correctly import the functions

const router = express.Router();

// Apply CORS to all routes in this file
router.use(cors({
  origin: ['http://localhost:5173', 'https://frontend-discussion.vercel.app'], // Allowed origins
  methods: ['GET', 'POST'], // Allowed methods
}));

// Define routes
router.post('/login', loginUser); // Use the imported loginUser function
router.post('/register', registerUser); // Use the imported registerUser function

module.exports = router;
