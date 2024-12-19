// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS package
require('dotenv').config(); // Load environment variables from .env file

// Initialize the Express app
const app = express();

// Middleware to enable CORS (allow frontend to make requests)

const allowedOrigins = [
    'https://frontend-discussion.vercel.app', 
    'http://localhost:5173',
    'https://frontend-discussion.vercel.app/discussion',
    'https://frontend-discussion-bxif0i0jt-marushinis-projects.vercel.app'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow request if the origin is in the list
        } else {
            callback(new Error('Not allowed by CORS')); // Block other origins
        }
    },
    methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
    credentials: true, // Include cookies in cross-origin requests
};

app.use(cors(corsOptions)); // Enable CORS with the specified options

// Middleware to parse JSON bodies
app.use(express.json());

// Debug: Log MongoDB URI for troubleshooting
console.log('MongoDB URI:', process.env.MONGO_URI);

// MongoDB URI from the environment variables
const mongoURI = process.env.MONGO_URI;

// Check if the MongoDB URI is defined
if (!mongoURI) {
    console.error('MongoDB URI is not defined. Please set the MONGO_URI environment variable.');
    process.exit(1); // Exit the process with an error
}

// Connect to MongoDB using Mongoose
mongoose
    .connect(mongoURI, {
        useNewUrlParser: true, // These options are fine for Mongoose 5.x
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit the process on connection failure
    });

// Define a basic route for testing
app.get('/', (req, res) => {
    res.send('Backend server is running');
});

// Add user routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Add discussion routes
const discussionRoutes = require('./routes/discussionRoutes'); // Make sure the path is correct
app.use('/api', discussionRoutes); // Prefix the discussion routes with /api

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
