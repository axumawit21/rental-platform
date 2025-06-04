const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update current user profile
// @route   PUT /api/users/me
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    // Extract fields that are allowed to be updated
    const { name, phone, bio, currentPassword, newPassword } = req.body;
    
    let user = await User.findById(req.user.id);
    
    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }

    // Update basic profile fields
    const updateFields = {};
    if (name) updateFields.name = name;
    if (phone) updateFields.phone = phone;
    if (bio !== undefined) updateFields.bio = bio;

    // Handle password change if currentPassword and newPassword are provided
    if (currentPassword && newPassword) {
      // Check if current password is correct
      const isMatch = await user.matchPassword(currentPassword);
      if (!isMatch) {
        return next(new ErrorResponse('Current password is incorrect', 400));
      }
      
      // Set new password
      user.password = newPassword;
      await user.save();
    }

    // Update user with new fields
    user = await User.findByIdAndUpdate(
      req.user.id,
      updateFields,
      {
        new: true,
        runValidators: true
      }
    ).select('-password');

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Upload user photo
// @route   PUT /api/users/me/photo
// @access  Private
exports.uploadPhoto = async (req, res, next) => {
  try {
    if (!req.files) {
      return next(new ErrorResponse('Please upload a file', 400));
    }

    const file = req.files.file;

    // Make sure the file is a photo
    if (!file.mimetype.startsWith('image')) {
      return next(new ErrorResponse('Please upload an image file', 400));
    }

    // Check file size
    const maxSize = process.env.MAX_FILE_UPLOAD || 1000000; // 1MB default
    if (file.size > maxSize) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${maxSize / 1000}KB`,
          400
        )
      );
    }

    // Create custom filename
    file.name = `photo_${req.user.id}${path.parse(file.name).ext}`;

    // Create uploads directory if it doesn't exist
    const uploadPath = path.join(process.cwd(), 'public', 'uploads', 'users');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Save file to server
    file.mv(`${uploadPath}/${file.name}`, async (err) => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse('Problem with file upload', 500));
      }

      // Update user's photo field with full URL
      const photoUrl = `/uploads/users/${file.name}`;
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { 
          photo: file.name,
          photoUrl: photoUrl
        },
        {
          new: true,
          runValidators: true
        }
      ).select('-password');

      // Return user with full photo URL
      const userResponse = user.toObject();
      userResponse.photoUrl = photoUrl;

      res.status(200).json({
        success: true,
        data: userResponse
      });
    });
  } catch (err) {
    next(err);
  }
};
