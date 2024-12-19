const mongoose = require('mongoose');

// Define the reply schema
const replySchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    createdAt: { type: Date, default: Date.now },
  }
);

// Define the main discussion schema
const DiscussionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User who created the discussion
      ref: 'User',
      required: true,
    },
    likeCount: {
      type: Number,
      default: 0, // Initialize like count to 0
    },
    dislikeCount: {
      type: Number,
      default: 0, // Initialize dislike count to 0
    },
    replies: [replySchema], // Add replies array
  },
  { timestamps: true }
);

module.exports = mongoose.model('Discussion', DiscussionSchema);
