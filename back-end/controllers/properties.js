const ErrorResponse = require('../utils/errorResponse');
const Property = require('../models/Property');
const path = require('path');
const fs = require('fs');

// @desc    Get recent properties
// @route   GET /api/properties/recent
// @route   GET /api/properties
// @access  Public
exports.getRecentProperties = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 6; // Default to 6 recent properties
    
    const properties = await Property.find({ isAvailable: true })
      .sort('-createdAt')
      .limit(limit)
      .populate('user', 'name')
      .select('-description -amenities');

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all properties with filtering, sorting, and pagination
// @route   GET /api/properties
// @access  Public
exports.getProperties = async (req, res, next) => {
  try {
    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    let query = Property.find(JSON.parse(queryStr)).populate({
      path: 'user',
      select: 'name email phone telegram profileImage'
    });

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Property.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const properties = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    // Transform the response to include owner information at the root level
    const transformedProperties = properties.map(property => {
      const propertyObj = property.toObject();
      
      // Always use the owner information from the property document
      propertyObj.owner = {
        name: propertyObj.ownerName || '',
        email: propertyObj.ownerEmail || '',
        phone: propertyObj.ownerPhone || '',
        telegram: propertyObj.ownerTelegram || '',
        facebook: propertyObj.ownerFacebook || '',
        whatsapp: propertyObj.ownerWhatsapp || ''
      };
      
      // Remove the individual fields to avoid duplication
      const fieldsToRemove = ['ownerName', 'ownerEmail', 'ownerPhone', 'ownerTelegram', 'ownerFacebook', 'ownerWhatsapp'];
      fieldsToRemove.forEach(field => delete propertyObj[field]);
      
      return propertyObj;
    });

    res.status(200).json({
      success: true,
      count: transformedProperties.length,
      pagination,
      data: transformedProperties
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
exports.getProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id).populate({
      path: 'user',
      select: 'name email phone telegram profileImage'
    });

    if (!property) {
      return next(
        new ErrorResponse(`Property not found with id of ${req.params.id}`, 404)
      );
    }

    // Convert to object to modify
    const propertyObj = property.toObject();
    
    // Always use the owner information from the property document
    propertyObj.owner = {
      name: propertyObj.ownerName || '',
      email: propertyObj.ownerEmail || '',
      phone: propertyObj.ownerPhone || '',
      telegram: propertyObj.ownerTelegram || '',
      facebook: propertyObj.ownerFacebook || '',
      whatsapp: propertyObj.ownerWhatsapp || ''
    };
    
    // Remove the individual fields to avoid duplication
    const fieldsToRemove = ['ownerName', 'ownerEmail', 'ownerPhone', 'ownerTelegram', 'ownerFacebook', 'ownerWhatsapp'];
    fieldsToRemove.forEach(field => delete propertyObj[field]);

    res.status(200).json({
      success: true,
      data: propertyObj
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Upload property images
// @route   POST /api/properties/upload
// @access  Private
exports.uploadPropertyImages = async (req, res, next) => {
  console.log('Upload request received. Files:', req.files);
  
  try {
    if (!req.files || !req.files.images || (Array.isArray(req.files.images) && req.files.images.length === 0)) {
      console.error('No files in request or files not in expected format');
      return next(new ErrorResponse('Please upload at least one image', 400));
    }

    // Convert single file to array for consistent processing
    const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
      
    console.log(`Processing ${files.length} file(s)`);

    // Validate file types and sizes
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    for (const file of files) {
      if (!validMimeTypes.includes(file.mimetype)) {
        return next(new ErrorResponse(`Invalid file type: ${file.name}. Only JPG, JPEG, PNG are allowed.`, 400));
      }
      if (file.size > maxSize) {
        return next(new ErrorResponse(`File too large: ${file.name}. Max size is 5MB.`, 400));
      }
    }

    // Create uploads directory if it doesn't exist
    const uploadPath = path.join(__dirname, '../public/uploads/properties');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Process and save files
    const savedFiles = [];
    
    for (const file of files) {
      try {
        console.log(`Processing file: ${file.name} (${file.size} bytes, ${file.mimetype})`);
        
        // Generate a unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExt = path.extname(file.name);
        const filename = `property-${uniqueSuffix}${fileExt}`;
        const filePath = path.join(uploadPath, filename);
        
        // Move the file to the upload directory
        await file.mv(filePath);
        
        console.log(`File saved to: ${filePath}`);
        
        const fileUrl = `/uploads/properties/${filename}`;
        
        savedFiles.push({
          name: file.name,
          path: fileUrl,
          size: file.size,
          type: file.mimetype
        });
      } catch (fileError) {
        console.error(`Error processing file:`, fileError);
        // Clean up the file if it was partially saved
        if (file && file.tempFilePath && fs.existsSync(file.tempFilePath)) {
          fs.unlinkSync(file.tempFilePath);
        }
        throw new Error(`Failed to process file: ${fileError.message}`);
      }
    }

    res.status(200).json({
      success: true,
      data: {
        urls: savedFiles.map(file => file.path)
      }
    });
  } catch (err) {
    console.error('Error uploading images:', err);
    next(new ErrorResponse(err.message || 'Error uploading images', 500));
  }
};

// @desc    Create new property
// @route   POST /api/properties
// @access  Private
exports.createProperty = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    // Parse features object if it's a string
    if (typeof req.body.features === 'string') {
      try {
        req.body.features = JSON.parse(req.body.features);
      } catch (err) {
        console.error('Error parsing features:', err);
        return next(new ErrorResponse('Invalid features format', 400));
      }
    }

    // Parse address if it's a string
    if (typeof req.body.address === 'string') {
      try {
        req.body.address = JSON.parse(req.body.address);
      } catch (err) {
        console.error('Error parsing address:', err);
        return next(new ErrorResponse('Invalid address format', 400));
      }
    }

    // Create the property with the provided data
    const property = await Property.create({
      ...req.body,
      // Ensure these fields are properly set
      isAvailable: true,
      views: 0,
      lastViewed: Date.now(),
      // Map features to the correct schema fields
      isFurnished: req.body.features?.isFurnished || false,
      petsAllowed: req.body.features?.petsAllowed || false,
      parkingSpots: req.body.features?.parkingSpots || 0,
      yearBuilt: req.body.features?.yearBuilt || null,
      floor: req.body.features?.floor || 1,
      totalFloors: req.body.features?.totalFloors || 1
    });

    // Populate user data in the response
    await property.populate('user', 'name email phone');

    res.status(201).json({
      success: true,
      data: property
    });
  } catch (err) {
    console.error('Error creating property:', err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return next(new ErrorResponse(messages.join(', '), 400));
    }
    next(new ErrorResponse('Server error', 500));
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private
exports.updateProperty = async (req, res, next) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return next(
        new ErrorResponse(`Property not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is property owner or admin
    if (property.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this property`,
          401
        )
      );
    }


    // Parse features object if it's a string
    if (req.body.features) {
      if (typeof req.body.features === 'string') {
        try {
          req.body.features = JSON.parse(req.body.features);
        } catch (err) {
          console.error('Error parsing features:', err);
          return next(new ErrorResponse('Invalid features format', 400));
        }
      }

      // Map features to the correct schema fields
      req.body = {
        ...req.body,
        isFurnished: req.body.features.isFurnished || property.isFurnished,
        petsAllowed: req.body.features.petsAllowed || property.petsAllowed,
        parkingSpots: req.body.features.parkingSpots || property.parkingSpots,
        yearBuilt: req.body.features.yearBuilt || property.yearBuilt,
        floor: req.body.features.floor || property.floor,
        totalFloors: req.body.features.totalFloors || property.totalFloors
      };
    }

    // Parse address if it's a string
    if (req.body.address && typeof req.body.address === 'string') {
      try {
        req.body.address = JSON.parse(req.body.address);
      } catch (err) {
        console.error('Error parsing address:', err);
        return next(new ErrorResponse('Invalid address format', 400));
      }
    }

    // Handle image updates
    if (req.body.imagesToDelete && Array.isArray(req.body.imagesToDelete)) {
      // Delete the specified images
      req.body.imagesToDelete.forEach(imagePath => {
        const fullPath = path.join(__dirname, '../public', imagePath);
        if (fs.existsSync(fullPath)) {
          fs.unlink(fullPath, err => {
            if (err) console.error(`Error deleting file ${fullPath}:`, err);
          });
        }
      });
      
      // Remove deleted images from the images array
      req.body.images = property.images.filter(
        img => !req.body.imagesToDelete.includes(img)
      );
      delete req.body.imagesToDelete; // Remove from req.body as it's not part of the schema
    }

    // Update the property
    property = await Property.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      {
        new: true,
        runValidators: true
      }
    ).populate('user', 'name email phone');

    if (!property) {
      return next(
        new ErrorResponse(`Property not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: property
    });
  } catch (err) {
    console.error('Error updating property:', err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return next(new ErrorResponse(messages.join(', '), 400));
    }
    next(new ErrorResponse('Server error', 500));
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private
exports.deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return next(
        new ErrorResponse(`Property not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is property owner or admin
    if (property.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this property`,
          401
        )
      );
    }

    // Delete associated images
    if (property.images && property.images.length > 0) {
      property.images.forEach(imagePath => {
        const fullPath = path.join(__dirname, '../public', imagePath);
        if (fs.existsSync(fullPath)) {
          fs.unlink(fullPath, err => {
            if (err) console.error(`Error deleting file ${fullPath}:`, err);
          });
        }
      });
    }

    await property.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.error('Error deleting property:', err);
    next(new ErrorResponse('Server error', 500));
  }
};

// @desc    Increment property views
// @route   PUT /api/properties/:id/views
// @access  Public
exports.incrementViews = async (req, res, next) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 }, lastViewed: Date.now() },
      { new: true, runValidators: true }
    );

    if (!property) {
      return next(
        new ErrorResponse(`Property not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: property
    });
  } catch (err) {
    console.error('Error incrementing property views:', err);
    next(new ErrorResponse('Server error', 500));
  }
};
