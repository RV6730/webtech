const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');
const auth = require('../middleware/auth');

// @route   GET /api/candidates
// @desc    Get all candidates
// @access  Public
router.get('/', candidateController.getAllCandidates);

// @route   GET /api/candidates/:id
// @desc    Get candidate by ID
// @access  Public
router.get('/:id', candidateController.getCandidateById);

// @route   POST /api/candidates
// @desc    Create new candidate
// @access  Private (should be admin only in production)
router.post('/', auth, candidateController.createCandidate);

// @route   PUT /api/candidates/:id
// @desc    Update candidate
// @access  Private (should be admin only in production)
router.put('/:id', auth, candidateController.updateCandidate);

// @route   DELETE /api/candidates/:id
// @desc    Delete candidate
// @access  Private (should be admin only in production)
router.delete('/:id', auth, candidateController.deleteCandidate);

module.exports = router;
