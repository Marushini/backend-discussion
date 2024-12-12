const mongoose = require('mongoose');

// Define the schema for a discussion
const DiscussionSchema = new mongoose.Schema({
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
}, { timestamps: true });

module.exports = mongoose.model('Discussion', DiscussionSchema);
