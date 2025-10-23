const mongoose = require('mongoose');

const issueSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    locationType: { type: String, required: true, enum: ['Urban', 'Rural'] },
    category: { type: String, required: true },
    imageUrl: { type: String },
    repairedImageUrl: { type: String },
    status: { type: String, required: true, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    notes: { type: String },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

const Issue = mongoose.model('Issue', issueSchema);
module.exports = Issue;
