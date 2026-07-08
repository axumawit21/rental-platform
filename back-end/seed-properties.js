const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const User = require('./models/User');
const Property = require('./models/Property');

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/rental-platform';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Get or create user
    let user = await User.findOne({ email: 'admin@rental.com' });
    if (!user) {
      user = await User.create({
        name: 'Admin User',
        email: 'admin@rental.com',
        password: 'password123',
        phone: '+251 911 123 456',
        role: 'admin'
      });
    }

    // Clear existing
    await Property.deleteMany({});
    console.log('Cleared existing properties');

    // Get images for the properties list page
    const propertiesDir = path.join(__dirname, 'public', 'uploads', 'properties');
    let propertiesFiles = [];
    if (fs.existsSync(propertiesDir)) {
      propertiesFiles = fs.readdirSync(propertiesDir).filter(f => {
        return ['.jpg', '.jpeg', '.png'].includes(path.extname(f).toLowerCase());
      });
    }

    // Get images for the details page
    const detailsDir = path.join(__dirname, 'public', 'uploads', 'details');
    let detailsFiles = [];
    if (fs.existsSync(detailsDir)) {
      detailsFiles = fs.readdirSync(detailsDir).filter(f => {
        return ['.jpg', '.jpeg', '.png'].includes(path.extname(f).toLowerCase());
      });
    }

    console.log(`Found ${propertiesFiles.length} images for properties list.`);
    console.log(`Found ${detailsFiles.length} images for details part.`);

    if (propertiesFiles.length === 0) {
      console.log('No valid properties images found. Exiting.');
      process.exit(0);
    }

    // Property templates
    const properties = [
      { title: 'Modern Apartment in Bole', type: 'Apartment', city: 'Addis Ababa', state: 'Addis Ababa', street: 'Bole Road', price: 15000, beds: 2, baths: 1, area: 85 },
      { title: 'Spacious House in Bahir Dar', type: 'House', city: 'Bahir Dar', state: 'Amhara', street: 'Tana Ave', price: 22000, beds: 4, baths: 2, area: 180 },
      { title: 'Luxury Villa in Hawassa', type: 'Villa', city: 'Hawassa', state: 'Sidama', street: 'Lake View Rd', price: 30000, beds: 5, baths: 3, area: 250 },
      { title: 'Elegant Condo in Mekelle', type: 'Condo', city: 'Mekelle', state: 'Tigray', street: 'Alula Aba Nega St', price: 12000, beds: 2, baths: 1, area: 75 },
      { title: 'Charming Townhouse in Dire Dawa', type: 'Townhouse', city: 'Dire Dawa', state: 'Dire Dawa', street: 'Kezira Rd', price: 18000, beds: 3, baths: 2, area: 120 },
      { title: 'Cozy Studio in Kazanchis', type: 'Studio', city: 'Addis Ababa', state: 'Addis Ababa', street: 'Kazanchis Blvd', price: 8000, beds: 1, baths: 1, area: 45 },
      { title: 'Family House in Gondar', type: 'House', city: 'Gondar', state: 'Amhara', street: 'Fasilides Sq', price: 16000, beds: 3, baths: 2, area: 140 },
      { title: 'Premium Apartment in CMC', type: 'Apartment', city: 'Addis Ababa', state: 'Addis Ababa', street: 'CMC Road', price: 20000, beds: 3, baths: 2, area: 110 },
      { title: 'Sunny Condo in Jimma', type: 'Condo', city: 'Jimma', state: 'Oromia', street: 'Main St', price: 10000, beds: 2, baths: 1, area: 70 },
      { title: 'Grand Villa in Adama', type: 'Villa', city: 'Adama', state: 'Oromia', street: 'Rift Valley Rd', price: 28000, beds: 4, baths: 3, area: 200 },
      { title: 'Riverside House in Bahir Dar', type: 'House', city: 'Bahir Dar', state: 'Amhara', street: 'Abay River Rd', price: 25000, beds: 4, baths: 3, area: 210 },
      { title: 'Piazza Loft in Addis Ababa', type: 'Apartment', city: 'Addis Ababa', state: 'Addis Ababa', street: 'Piazza', price: 13000, beds: 1, baths: 1, area: 60 },
      { title: 'Suburban Villa in Bishoftu', type: 'Villa', city: 'Bishoftu', state: 'Oromia', street: 'Lake View', price: 35000, beds: 5, baths: 4, area: 300 },
      { title: 'Downtown Condo in Dire Dawa', type: 'Condo', city: 'Dire Dawa', state: 'Dire Dawa', street: 'Downtown', price: 11000, beds: 2, baths: 1, area: 80 },
      { title: 'Quiet Townhouse in Hawassa', type: 'Townhouse', city: 'Hawassa', state: 'Sidama', street: 'Quiet St', price: 17000, beds: 3, baths: 2, area: 130 }
    ];

    const descriptions = [
      'Spacious and modern property with large windows and natural lighting. Features a fully equipped kitchen, elegant living spaces, and premium finishes.',
      'Beautifully renovated property in a prime location. Walking distance to shops, restaurants, and public transportation.',
      'Luxurious property with stunning views. Includes modern amenities, 24/7 security, backup generator, and ample parking.',
      'Cozy and well-maintained property perfect for families. Features a private garden and secure compound.',
      'Contemporary design with open floor plan. High ceilings, marble floors, and state-of-the-art appliances.',
    ];

    let count = 0;
    for (let i = 0; i < properties.length; i++) {
      const p = properties[i];
      const images = [];

      // Add 1 image from the 'properties' folder (for the main listing card)
      if (propertiesFiles.length > 0) {
        const propImg = propertiesFiles[i % propertiesFiles.length];
        images.push(`/uploads/properties/${propImg}`);
      }

      // Add 2 images from the 'details' folder (for the thumbnails in details view)
      if (detailsFiles.length > 0) {
        const detailImg1 = detailsFiles[(i * 2) % detailsFiles.length];
        images.push(`/uploads/details/${detailImg1}`);
        
        if (detailsFiles.length > 1) {
          const detailImg2 = detailsFiles[(i * 2 + 1) % detailsFiles.length];
          images.push(`/uploads/details/${detailImg2}`);
        }
      }

      await Property.create({
        title: p.title,
        description: descriptions[i % descriptions.length],
        propertyType: p.type,
        price: p.price,
        bedrooms: p.beds,
        bathrooms: p.baths,
        area: p.area,
        ownerName: user.name,
        ownerEmail: user.email,
        ownerPhone: user.phone,
        address: { street: p.street, city: p.city, state: p.state, zipCode: '1000', country: 'Ethiopia' },
        images: images,
        user: user._id,
        isAvailable: true,
        featured: i < 5,
        views: Math.floor(Math.random() * 200),
        yearBuilt: 2020,
        floor: 1,
        totalFloors: 5,
        isFurnished: true,
        petsAllowed: true
      });
      count++;
    }

    console.log(`\nDone! Created ${count} properties linking images from both folders.`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

seedData();
