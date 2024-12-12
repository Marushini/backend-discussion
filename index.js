// Import required modules
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Initialize the Express app
const app = express();

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
        useNewUrlParser: true,  // These options are fine for Mongoose 5.x
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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
