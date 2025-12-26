const express = require('express');
const router = express.Router();
const electionController = require('../controllers/electionController');
const auth = require('../middleware/auth');

// @route   GET /api/elections
// @desc    Get all elections
// @access  Public
router.get('/', electionController.getAllElections);

// @route   GET /api/elections/:id
// @desc    Get election by ID
// @access  Public
router.get('/:id', electionController.getElectionById);

// @route   POST /api/elections
// @desc    Create new election
// @access  Private (should be admin only in production)
router.post('/', auth, electionController.createElection);

// @route   PUT /api/elections/:id
// @desc    Update election
// @access  Private (should be admin only in production)
router.put('/:id', auth, electionController.updateElection);

// @route   DELETE /api/elections/:id
// @desc    Delete election
// @access  Private (should be admin only in production)
router.delete('/:id', auth, electionController.deleteElection);

module.exports = router;
