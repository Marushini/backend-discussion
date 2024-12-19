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
      type: mongoose.Schema.Types.ObjectId,  // Reference to User model
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
    replies: [{  // Array to store replies for each discussion
      replyText: { 
        type: String, 
        required: true, 
        trim: true,  // Trim spaces from replies
      },
      repliedBy: { 
        type: mongoose.Schema.Types.ObjectId,  // Reference to User model
        ref: 'User',
        required: true, 
      },
      createdAt: { 
        type: Date, 
        default: Date.now, 
      },
    }],
  },
  { timestamps: true }  // Automatically adds createdAt and updatedAt to discussion
);

// You can optionally add custom methods or virtuals here for additional functionality

module.exports = mongoose.model('Discussion', DiscussionSchema);
