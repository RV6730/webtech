const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', authLimiter, [
  body('fullname').notEmpty().withMessage('Full name is required'),
  body('sen').notEmpty().withMessage('SEN number is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('phonenumber').matches(/^[0-9]{10}$/).withMessage('Please provide a valid 10-digit phone number'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
], authController.register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', authLimiter, [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
], authController.login);

// @route   GET /api/auth/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, authController.getProfile);

module.exports = router;
