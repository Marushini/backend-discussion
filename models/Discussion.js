const mongoose = require('mongoose');

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
      type: String,
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
    replies: [{  // Array to store replies for each discussion
      replyText: { type: String, required: true }, // The text of the reply
      repliedBy: { type: String, required: true }, // Username or ID of the person replying
      createdAt: { type: Date, default: Date.now }, // Date when the reply was created
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Discussion', DiscussionSchema);
