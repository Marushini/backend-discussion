const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // For hashing the password

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,  // Ensures unique usernames
      trim: true,    // Trims any extra spaces from the username
      minlength: 3,  // Example: set a minimum length for the username
      maxlength: 30, // Example: set a maximum length for the username
    },
    password: {
      type: String,
      required: true,
      minlength: 6,  // Set minimum length for the password
    },
  },
  { timestamps: true }
);

// Pre-save hook for hashing the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash password if it's modified

  try {
    const salt = await bcrypt.genSalt(10);  // Generate a salt with 10 rounds
    this.password = await bcrypt.hash(this.password, salt);  // Hash the password
    next();
  } catch (error) {
    next(error);  // Pass any errors to the next middleware
  }
});

module.exports = mongoose.model('User', userSchema);
