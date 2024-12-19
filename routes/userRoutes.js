const express = require('express');
const router = express.Router();

// Import the necessary controller functions
const { register, login } = require('../controllers/UserController');  // Ensure the path is correct

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

module.exports = router;
