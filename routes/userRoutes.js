const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { loginUser, registerUser } = require('../controllers/UserController'); // Import functions
const User = require('../models/User'); // Import the User model

const router = express.Router();

// Fetch CORS origins from environment variables
const corsOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [];

// CORS options configuration
const corsOptions = {
    origin: corsOrigins,
    methods: ['GET', 'POST'],
};

// Apply CORS middleware to all routes
router.use(cors(corsOptions));

// Handle preflight requests for CORS
router.options('*', cors(corsOptions));

// JWT Authentication Middleware
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming token is sent as "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify token with secret
        req.user = decoded; // Add user info to request object
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// Register User
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user with the hashed password
        const newUser = new User({
            username,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login User
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare the input password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Example protected route (use authenticateUser middleware)
router.get('/protected', authenticateUser, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
