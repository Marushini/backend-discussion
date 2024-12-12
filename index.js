// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // For loading environment variables from .env file

// Initialize the app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Get the MongoDB URI from the environment variable
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Backend server is running');
});

// Your routes can be added here, for example:
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Specify the port your app will listen on
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
