const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');
const auth = require('../middleware/auth');

// @route   POST /api/votes
// @desc    Submit a vote
// @access  Private
router.post('/', auth, voteController.submitVote);

// @route   GET /api/votes/my-votes
// @desc    Get user's votes
// @access  Private
router.get('/my-votes', auth, voteController.getUserVotes);

// @route   GET /api/votes/check/:electionId
// @desc    Check if user has voted in a specific election
// @access  Private
router.get('/check/:electionId', auth, voteController.checkVoteStatus);

// @route   GET /api/votes/results/:electionId
// @desc    Get election results
// @access  Public
router.get('/results/:electionId', voteController.getElectionResults);

module.exports = router;
