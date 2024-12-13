const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/UserController');

// POST route for logging in
router.post('/login', loginUser);

module.exports = router;
