const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS setup
const allowedOrigins = [
    'http://localhost:5173',
    'https://frontend-discussion.vercel.app',
    'https://frontend-discussion-bxif0i0jt-marushinis-projects.vercel.app',
    'https://frontend-discussion.vercel.app/discussion',
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
};

app.use(cors(corsOptions)); // Enable CORS

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    console.error('MongoDB URI is not defined. Please set the MONGO_URI environment variable.');
    process.exit(1);
}

mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    });

// Basic route to test server
app.get('/', (req, res) => {
    res.send('Backend server is running');
});

// User routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Discussion routes
const discussionRoutes = require('./routes/discussionRoutes');
app.use('/api', discussionRoutes);

// Catch-all for undefined routes (404 error)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
