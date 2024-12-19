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
  },
  { timestamps: true }
);

module.exports = mongoose.model('Discussion', DiscussionSchema);
