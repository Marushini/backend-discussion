const express = require('express');
const router = express.Router();

// Example route for registering a user
router.post('/register', (req, res) => {
    // Logic for user registration
    res.send('User registered successfully');
});

// Example route for getting all users
router.get('/', (req, res) => {
    res.send('List of users');
});

module.exports = router;
