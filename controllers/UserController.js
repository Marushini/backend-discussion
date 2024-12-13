// controllers/userController.js
const User = require('../models/User'); // Example: replace with your actual User model
const bcrypt = require('bcryptjs'); // Example, if you're using bcrypt

// Login function
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Assuming a JWT token generation here
    const token = 'your-jwt-token'; // Replace with your actual JWT token logic
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Register function
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.create({ username, password }); // You might need to hash the password before saving
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { loginUser, registerUser };
