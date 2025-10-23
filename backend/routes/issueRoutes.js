const express = require('express');
const router = express.Router();
const { getIssues, createIssue, updateIssue, getIssuesByUser } = require('../controllers/issueController');
const { protect, employee } = require('../middleware/authMiddleware');

// For employees to get all issues
router.route('/').get(protect, employee, getIssues);

// For users to create an issue
router.route('/').post(protect, createIssue);

// For users to get their own reported issues
router.route('/myissues').get(protect, getIssuesByUser);

// For employees to update an issue's status, notes, etc.
router.route('/:id').put(protect, employee, updateIssue);


module.exports = router;
