const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const {
  getProperties,
  getRecentProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  uploadPropertyImages,
  incrementViews
} = require('../controllers/properties');
const { protect } = require('../middleware/auth');

// Public routes
router.route('/recent').get(getRecentProperties);
router.route('/').get(getProperties);
router.route('/:id').get(getProperty);
router.route('/:id/views').put(incrementViews);

// Protected routes
router.use(protect);

// Image upload route
router.post('/upload', uploadPropertyImages);

// Property routes
router.route('/').post(createProperty);
router.route('/:id').put(updateProperty).delete(deleteProperty);

module.exports = router;
