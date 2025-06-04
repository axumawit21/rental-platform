const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getMe, updateProfile, uploadPhoto } = require('../controllers/profile');

// Apply protect middleware to all routes
router.use(protect);

// Get current user's profile
router.get('/me', getMe);

// Update current user's profile
router.put('/me', updateProfile);

// Upload user photo
router.put('/me/photo', uploadPhoto);

module.exports = router;
