const mongoose = require('mongoose');
const slugify = require('slugify');

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  propertyType: {
    type: String,
    required: [true, 'Please specify property type'],
    enum: [
      'Apartment',
      'House',
      'Villa',
      'Condo',
      'Townhouse',
      'Studio',
      'Loft',
      'Other'
    ]
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  bedrooms: {
    type: Number,
    required: [true, 'Please specify number of bedrooms'],
    min: [0, 'Bedrooms cannot be negative']
  },
  bathrooms: {
    type: Number,
    required: [true, 'Please specify number of bathrooms'],
    min: [0, 'Bathrooms cannot be negative']
  },
  area: {
    type: Number,
    required: [true, 'Please specify the area in square feet'],
    min: [0, 'Area cannot be negative']
  },
  // Owner Information
  ownerName: {
    type: String,
    required: [true, 'Owner name is required']
  },
  ownerEmail: {
    type: String,
    required: [true, 'Owner email is required'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  ownerPhone: {
    type: String,
    required: [true, 'Owner phone number is required']
  },
  ownerTelegram: {
    type: String,
    default: ''
  },
  ownerFacebook: {
    type: String,
    default: ''
  },
  ownerWhatsapp: {
    type: String,
    default: ''
  },
  address: {
    street: {
      type: String,
      required: [true, 'Please add a street address']
    },
    city: {
      type: String,
      required: [true, 'Please add a city']
    },
    state: {
      type: String,
      required: [true, 'Please add a state']
    },
    zipCode: {
      type: String,
      required: [true, 'Please add a zip code']
    },
    country: {
      type: String,
      required: [true, 'Please add a country'],
      default: 'USA'
    }
  },
  amenities: {
    type: [String],
    default: []
  },
  images: [{
    name: String,
    path: {
      type: String,
      required: true
    },
    size: Number,
    type: String
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  slug: String,
  contactPhone: {
    type: String,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number with country code']
  },
  contactEmail: {
    type: String,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
  },
  featured: {
    type: Boolean,
    default: false
  },
  featuredUntil: {
    type: Date
  },
  views: {
    type: Number,
    default: 0
  },
  lastViewed: {
    type: Date
  },
  availableFrom: {
    type: Date,
    default: Date.now
  },
  leaseTerm: {
    type: String,
    enum: ['monthly', 'quarterly', 'yearly', 'flexible'],
    default: 'monthly'
  },
  securityDeposit: {
    type: Number,
    default: 0
  },
  isFurnished: {
    type: Boolean,
    default: false
  },
  petsAllowed: {
    type: Boolean,
    default: false
  },
  parkingSpots: {
    type: Number,
    default: 0
  },
  yearBuilt: {
    type: Number,
    min: [1800, 'Year built must be after 1800'],
    max: [new Date().getFullYear() + 1, 'Year built cannot be in the future']
  },
  floor: {
    type: Number,
    min: [0, 'Floor cannot be negative']
  },
  totalFloors: {
    type: Number,
    min: [1, 'Total floors must be at least 1']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create slug from the name
PropertySchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true, strict: true });
  this.updatedAt = Date.now();
  next();
});

// Cascade delete properties when a user is deleted
PropertySchema.pre('remove', async function(next) {
  console.log(`Property being removed: ${this._id}`);
  // Add any cleanup logic here if needed
  next();
});

// Static method to get properties by user
PropertySchema.statics.getPropertiesByUser = async function(userId) {
  return await this.find({ user: userId });
};

// Static method to get featured properties
PropertySchema.statics.getFeatured = async function() {
  return await this.find({ 
    featured: true,
    featuredUntil: { $gte: Date.now() }
  }).sort('-createdAt');
};

// Static method to get properties with pagination
PropertySchema.statics.getPaginated = async function(query, page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  const [properties, total] = await Promise.all([
    this.find(query)
      .skip(skip)
      .limit(limit)
      .sort('-createdAt')
      .populate('user', 'name email phone'),
    this.countDocuments(query)
  ]);
  
  const totalPages = Math.ceil(total / limit);
  
  return {
    properties,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    }
  };
};

// Method to increment view count
PropertySchema.methods.incrementViews = async function() {
  this.views += 1;
  this.lastViewed = Date.now();
  return await this.save();
};

// Create text index for search
PropertySchema.index({
  title: 'text',
  description: 'text',
  'address.street': 'text',
  'address.city': 'text',
  'address.state': 'text',
  'address.country': 'text'
});

module.exports = mongoose.model('Property', PropertySchema);
