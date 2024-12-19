const mongoose = require('mongoose');

// Define the reply schema to be used in the Post schema
const replySchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: { 
    type: String,
    required: true,
  },
  // Optional: Array to store posts created by the user
  posts: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post'  // Reference to Post model
  }],
  // Optional: Array to store replies made by the user
  replies: [{
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, // Reference to the Post being replied to
    content: { type: String }, // The reply content
  }],
}, { timestamps: true });

// Define the post schema
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likeCount: { type: Number, default: 0 },
  dislikeCount: { type: Number, default: 0 },
  replies: [replySchema],  // Store replies in an array of reply documents
  createdAt: { type: Date, default: Date.now },
});

// Create models
const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

module.exports = { User, Post };
