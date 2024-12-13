const mongoose = require('mongoose');
   

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
