const asyncHandler = require('express-async-handler');
const Issue = require('../models/issueModel');

// @desc    Get all issues (for employees)
// @route   GET /api/issues
// @access  Private/Employee
const getIssues = asyncHandler(async (req, res) => {
    const issues = await Issue.find({}).populate('reportedBy', 'name email').sort({ createdAt: -1 });
    res.json(issues);
});

// @desc    Get issues for the logged-in user
// @route   GET /api/issues/myissues
// @access  Private
const getIssuesByUser = asyncHandler(async (req, res) => {
    const issues = await Issue.find({ reportedBy: req.user._id }).sort({ createdAt: -1 });
    res.json(issues);
});

// @desc    Create a new issue
// @route   POST /api/issues
// @access  Private
const createIssue = asyncHandler(async (req, res) => {
    const { title, description, location, locationType, category, imageUrl } = req.body;

    const issue = new Issue({
        title,
        description,
        location,
        locationType,
        category,
        imageUrl,
        reportedBy: req.user._id,
    });

    const createdIssue = await issue.save();
    res.status(201).json(createdIssue);
});

// @desc    Update an issue (status, notes, etc.)
// @route   PUT /api/issues/:id
// @access  Private/Employee
const updateIssue = asyncHandler(async (req, res) => {
    const { status, notes, repairedImageUrl } = req.body;

    const issue = await Issue.findById(req.params.id);

    if (issue) {
        issue.status = status || issue.status;
        issue.notes = notes !== undefined ? notes : issue.notes;
        issue.repairedImageUrl = repairedImageUrl !== undefined ? repairedImageUrl : issue.repairedImageUrl;

        const updatedIssue = await issue.save();
        res.json(updatedIssue);
    } else {
        res.status(404);
        throw new Error('Issue not found');
    }
});

module.exports = { getIssues, getIssuesByUser, createIssue, updateIssue };
