<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Property Title and Info -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div class="flex justify-between items-start mb-2">
          <h1 class="text-3xl font-bold text-gray-900">{{ property.title || 'Property' }}</h1>
          <router-link to="/properties" class="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
            Back to Listings
          </router-link>
        </div>
        <div class="flex items-center text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{{ property.address?.street }}, {{ property.address?.city }}, {{ property.address?.state }}</span>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Images and Similar Listings -->
        <div class="lg:col-span-2">
          <!-- Main Image -->
          <div class="bg-gray-200 rounded-lg overflow-hidden h-96 mb-4">
            <img 
              v-if="mainImage" 
              :src="mainImage" 
              :alt="property.title" 
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          
          <!-- Thumbnails -->
          <div v-if="property.images && property.images.length > 0" class="grid grid-cols-4 gap-3">
            <div 
              v-for="(image, index) in property.images.slice(0, 4)" 
              :key="index"
              @click="mainImage = getImageUrl(image)"
              class="cursor-pointer h-20 bg-gray-200 rounded-md overflow-hidden hover:ring-2 hover:ring-blue-500"
              :class="{ 'ring-2 ring-blue-500': mainImage === getImageUrl(image) }"
            >
              <img 
                :src="getImageUrl(image)" 
                :alt="`Property image ${index + 1}`" 
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div v-else class="h-20 flex items-center justify-center text-gray-500">
            No images available
          </div>

          <!-- Similar Listings -->
          <div class="mt-12">
            <h3 class="text-xl font-semibold mb-6 pb-2 border-b border-gray-200">Similar Listings</h3>
            <div v-if="similarListings.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="listing in similarListings" :key="listing._id || listing.id" class="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <router-link :to="`/properties/${listing.id}`" class="block">
                  <div class="h-40 bg-gray-200 relative">
                    <img 
                      :src="getImageUrl(listing.images?.[0])" 
                      :alt="listing.title"
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div class="absolute bottom-2 right-2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
                      {{ formatPrice(listing.price) }}
                    </div>
                  </div>
                  <div class="p-4">
                    <h4 class="font-medium text-gray-900 mb-1">{{ listing.title }}</h4>
                    <div class="flex items-center text-sm text-gray-600">
                      <span>{{ listing.address?.street }}</span>
                      <span class="mx-1">,</span>
                      <span>{{ listing.address?.city }}</span>
                      <span class="mx-1">,</span>
                      <span>{{ listing.address?.state }}</span>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
            <div v-else class="text-gray-500 py-4 text-center">
              No similar listings found
            </div>
          </div>
        </div>

        <!-- Right Column - Property Details and Owner -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Property Details -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl">
            <!-- Header with Price Tag -->
            <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <div class="flex justify-between items-center">
                <h3 class="text-xl font-bold text-white">Property Details</h3>
                <span class="bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-3 py-1 rounded-full">
                  {{ property.type || 'For Rent' }}
                </span>
              </div>
              <div class="mt-2">
                <div class="text-2xl font-bold text-white">{{ formatPrice(property.price) }}<span class="text-blue-100 text-base font-medium">/month</span></div>
                <div class="text-blue-100 text-sm">{{ property.availableFrom ? `Available from ${formatDate(property.availableFrom)}` : 'Available Now' }}</div>
              </div>
            </div>
            
            <!-- Main Details -->
            <div class="p-6">
              <!-- Key Features -->
              <div class="grid grid-cols-3 gap-4 mb-6 text-center">
                <div class="p-3 bg-blue-50 rounded-lg">
                  <div class="text-2xl font-bold text-blue-700">{{ property.bedrooms || '0' }}</div>
                  <div class="text-xs text-gray-500 mt-1">BEDROOMS</div>
                </div>
                <div class="p-3 bg-blue-50 rounded-lg">
                  <div class="text-2xl font-bold text-blue-700">{{ property.bathrooms || '0' }}</div>
                  <div class="text-xs text-gray-500 mt-1">BATHROOMS</div>
                </div>
                <div class="p-3 bg-blue-50 rounded-lg">
                  <div class="text-2xl font-bold text-blue-700">{{ property.area || 'N/A' }}</div>
                  <div class="text-xs text-gray-500 mt-1">SQ FT</div>
                </div>
              </div>
              
              <!-- Additional Details -->
              <div class="space-y-4">
                <div class="flex items-center">
                  <div class="bg-blue-100 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <div class="text-sm text-gray-500">Property Type</div>
                    <div class="font-medium">{{ property.propertyType || 'Apartment' }}</div>
                  </div>
                </div>
                
                <div class="flex items-center">
                  <div class="bg-blue-100 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div class="text-sm text-gray-500">Location</div>
                    <div class="font-medium">{{ property.address?.street }}, {{ property.address?.city }}, {{ property.address?.state }}</div>
                  </div>
                </div>
                
                <div class="flex items-center">
                  <div class="bg-blue-100 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div class="text-sm text-gray-500">Available From</div>
                    <div class="font-medium">{{ property.availableFrom ? formatDate(property.availableFrom) : 'Immediate' }}</div>
                  </div>
                </div>
              </div>
              
              <!-- Action Buttons -->
              <div class="mt-6 space-y-3">
                <a 
                  :href="`https://www.google.com/maps?q=${property.address?.lat},${property.address?.lng}`" 
                  target="_blank" 
                  class="w-full flex items-center justify-center bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 py-2.5 px-4 rounded-lg font-medium transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  View on Map
                </a>
                <!-- <button 
                  @click="$emit('scheduleTour')" 
                  class="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Schedule a Tour
                </button> -->
              </div>
              

            </div>
          </div>

          <!-- Owner Information -->
          <div class="bg-white rounded-lg p-4 border border-gray-200">
            <h3 class="text-lg font-medium text-gray-800 mb-3">Contact Owner</h3>
            
            <div class="space-y-3">
              <!-- Phone -->
              <div v-if="property.owner?.phone || property.ownerPhone" class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <a :href="'tel:' + (property.owner?.phone || property.ownerPhone)" class="text-blue-600 hover:underline">
                    {{ property.owner?.phone || property.ownerPhone }}
                  </a>
                </div>
              </div>

              <!-- Email -->
              <div v-if="property.owner?.email || property.ownerEmail" class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <a :href="'mailto:' + (property.owner?.email || property.ownerEmail)" class="text-blue-600 hover:underline">
                    {{ property.owner?.email || property.ownerEmail }}
                  </a>
                </div>
              </div>

              <!-- Social Media -->
              <div v-if="property.owner?.whatsapp || property.ownerWhatsapp || property.owner?.telegram || property.ownerTelegram || property.owner?.facebook || property.ownerFacebook" class="pt-2">
                <div class="space-y-2">
                  <!-- WhatsApp -->
                  <div v-if="property.owner?.whatsapp || property.ownerWhatsapp" class="flex items-center">
                    <a :href="'https://wa.me/' + (property.owner?.whatsapp || property.ownerWhatsapp)" 
                       target="_blank"
                       class="flex items-center text-gray-700 hover:text-green-500">
                      <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.5 14.4l-2.2 1.1c-.5.2-.8 0-1-.1l-.3-.3c-.3-.3-.5-.5-.9-.3-1 .3-1.9.6-3 .5-2.5-.1-4.5-2.1-4.7-4.5-.1-1.2.3-2.3.9-3.2.2-.4.1-.6-.1-.9l-.2-.3c-.2-.3-.3-.5-.1-1l1.1-2.2c.3-.5.2-.8 0-1.1l-1.1-1.7c-.3-.5-.3-.8-.2-1.1.1-.3.5-.5 1-.5h2.2c.4 0 .7 0 1 .2l.1.1c.3.2.5.5.6.8.2.5.5 1 .6 1.5.3 1.3 1.3 2.3 2.5 2.7.5.2.9.4 1.4.5.3.1.6 0 .8-.3l.1-.1c.2-.3.5-.5.9-.6l2.1-.2c.4 0 .8.2 1 .5.2.3.3.6.3.9l-.3 2.2c-.1.8-.5 1.1-1 1.3z"></path>
                      </svg>
                      <span>{{ property.owner?.whatsapp || property.ownerWhatsapp }}</span>
                    </a>
                  </div>

                  <!-- Telegram -->
                  <div v-if="property.owner?.telegram || property.ownerTelegram" class="flex items-center">
                    <a :href="'https://t.me/' + (property.owner?.telegram || property.ownerTelegram)" 
                       target="_blank"
                       class="flex items-center text-gray-700 hover:text-blue-500">
                      <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.72-.41.89-.84.91-.56.03-.84-.36-1.3-.7-.72-.53-1.12-.86-1.82-1.38-.7-.52-.14-.8.09-1.26.09-.14 1.68-1.53 1.71-1.66.03-.13.06-.27-.03-.38s-.35-.04-.5-.02c-.21.03-3.57 2.29-5.05 3.22-.47.3-.9.44-1.29.45-.42.01-1.21-.24-1.8-.44-.73-.25-1.3-.38-1.25-.8.03-.26.35-.53 1.01-.76 1.12-.4 3.19-1.22 4.45-1.8 2.1-.96 2.38-1.13 2.65-1.16.57-.07.92.04 1.19.08.48.07 1.02.13 1.16.41.14.27.1.7-.21 1.4z"></path>
                      </svg>
                      <span>{{ property.owner?.telegram || property.ownerTelegram }}</span>
                    </a>
                  </div>

                  <!-- Facebook -->
                  <div v-if="property.owner?.facebook || property.ownerFacebook" class="flex items-center">
                    <a :href="'https://facebook.com/' + (property.owner?.facebook || property.ownerFacebook)" 
                       target="_blank"
                       class="flex items-center text-gray-700 hover:text-blue-600">
                      <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                      </svg>
                      <span>{{ property.owner?.facebook || property.ownerFacebook }}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Property Description -->
          <div class="bg-white rounded-lg p-6 border border-gray-200">
            <h3 class="text-lg font-medium text-gray-800 mb-4">Property Description</h3>
            <div class="prose max-w-none text-gray-600">
              <p v-if="property.description" class="whitespace-pre-line">{{ property.description }}</p>
              <p v-else class="text-gray-500 italic">No description available for this property.</p>
              
              <!-- Additional Details -->
              <div v-if="property.amenities && property.amenities.length > 0" class="mt-4">
                <h4 class="font-medium text-gray-800 mb-2">Amenities:</h4>
                <div class="flex flex-wrap gap-2">
                  <span v-for="(amenity, index) in property.amenities" :key="index" 
                        class="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                    {{ amenity }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const property = ref({});
const similarListings = ref([]);
const loading = ref(true);
const error = ref(null);
const mainImage = ref('');
const showContactForm = ref(false);

// Fetch property details
const fetchProperty = async () => {
  try {
    loading.value = true;
    const [propertyRes, similarRes] = await Promise.all([
      axios.get(`http://localhost:9000/api/properties/${route.params.id}`),
      axios.get('http://localhost:9000/api/properties')
    ]);
    
    // Log the property data to check its structure
    console.log('Full property data:', propertyRes.data);
    console.log('Property data:', propertyRes.data.data);
    
    // Check if owner data is in the expected location
    if (propertyRes.data.data.owner) {
      console.log('Owner data:', propertyRes.data.data.owner);
    } else {
      console.log('No owner data found in property.owner');
      // Check if owner data is at the root level
      if (propertyRes.data.data.ownerName || propertyRes.data.data.ownerEmail || propertyRes.data.data.ownerPhone) {
        console.log('Owner data found at root level');
      }
    }
    
    // Assign the property data
    property.value = propertyRes.data.data;
    
    // Set main image if available
    if (property.value.images && property.value.images.length > 0) {
      mainImage.value = getImageUrl(property.value.images[0]);
    }
    
    // Simplified similar listings filter for testing
    if (similarRes.data?.data) {
      const currentPrice = property.value.price || 0;
      const currentStreet = property.value.address?.street?.toLowerCase() || '';
      
      console.log('=== DEBUG: SIMILAR LISTINGS FILTER ===');
      console.log('Current Property:', {
        id: property.value.id,
        title: property.value.title,
        price: currentPrice,
        street: currentStreet
      });
      
      // First, log all properties to see what we're working with
      console.log('All Properties from API:');
      similarRes.data.data.forEach(p => {
        console.log(`- ID: ${p.id}, Title: ${p.title}, Price: ${p.price}, Street: ${p.address?.street || 'N/A'}`);
      });
      
      // First, try to find exact matches (same street and exact price)
      similarListings.value = similarRes.data.data.filter(p => {
        // Skip current property by comparing _id if available, otherwise compare title and street
        if ((p._id && p._id === property.value._id) || 
            (!p._id && p.title === property.value.title && p.address?.street === property.value.address?.street)) {
          return false;
        }
        
        const otherStreet = (p.address?.street || '').toLowerCase().trim();
        const priceMatch = p.price === currentPrice;
        const streetMatch = otherStreet === currentStreet.toLowerCase().trim();
        
        console.log(`\nChecking Property ${p._id || 'no-id'}:`);
        console.log(`- Title: "${p.title}"`);
        console.log(`- Street: "${otherStreet}" vs "${currentStreet}" -> ${streetMatch ? 'MATCH' : 'NO MATCH'}`);
        console.log(`- Price: ${p.price} vs ${currentPrice} -> ${priceMatch ? 'MATCH' : 'NO MATCH'}`);
        
        return streetMatch && priceMatch;
      });
      
      console.log('\nExact Matches:', similarListings.value);
      
      // If no exact matches, try with price range
      if (similarListings.value.length === 0) {
        const PRICE_RANGE = 5000;
        console.log('\nNo exact matches, trying with price range...');
        
        similarListings.value = similarRes.data.data.filter(p => {
          // Skip current property
          if ((p._id && p._id === property.value._id) || 
              (!p._id && p.title === property.value.title && p.address?.street === property.value.address?.street)) {
            return false;
          }
          
          const otherStreet = (p.address?.street || '').toLowerCase().trim();
          const priceInRange = Math.abs(p.price - currentPrice) <= PRICE_RANGE;
          const streetMatch = otherStreet === currentStreet.toLowerCase().trim();
          
          console.log(`\nChecking Property ${p._id || 'no-id'} (with range):`);
          console.log(`- Title: "${p.title}"`);
          console.log(`- Street: "${otherStreet}" vs "${currentStreet}" -> ${streetMatch ? 'MATCH' : 'NO MATCH'}`);
          console.log(`- Price: ${p.price} vs ${currentPrice}±${PRICE_RANGE} -> ${priceInRange ? 'IN RANGE' : 'OUT OF RANGE'}`);
          
          return streetMatch && priceInRange;
        });
        
        console.log('\nMatches with Price Range:', similarListings.value);
      }
      
      // If still no matches, just show any properties on the same street
      if (similarListings.value.length === 0) {
        console.log('\nNo price matches, showing any properties on the same street...');
        
        similarListings.value = similarRes.data.data.filter(p => {
          // Skip current property
          if ((p._id && p._id === property.value._id) || 
              (!p._id && p.title === property.value.title && p.address?.street === property.value.address?.street)) {
            return false;
          }
          
          const otherStreet = (p.address?.street || '').toLowerCase().trim();
          const streetMatch = otherStreet === currentStreet.toLowerCase().trim();
          
          console.log(`\nChecking Property ${p._id || 'no-id'} (street only):`);
          console.log(`- Title: "${p.title}"`);
          console.log(`- Street: "${otherStreet}" vs "${currentStreet}" -> ${streetMatch ? 'MATCH' : 'NO MATCH'}`);
          
          return streetMatch;
        });
        
        console.log('\nSame Street Matches:', similarListings.value);
      }
      
      // Sort by price proximity to current property
      similarListings.value = similarListings.value
        .sort((a, b) => Math.abs(a.price - currentPrice) - Math.abs(b.price - currentPrice))
        .slice(0, 3); // Limit to 3 results
    }
  } catch (err) {
    console.error('Error fetching property:', err);
    error.value = 'Failed to load property details. Please try again later.';
  } finally {
    loading.value = false;
  }
};

// Helper function to get image URL
const getImageUrl = (image) => {
  if (!image) return '';
  const path = typeof image === 'string' ? image : image.path;
  if (path.startsWith('http')) return path;
  return `http://localhost:9000${path}`;
};

// Format price
const formatPrice = (price) => {
  if (!price) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price);
};

// Format date
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Fetch property when component mounts
onMounted(() => {
  if (route.params.id) {
    fetchProperty();
  } else {
    error.value = 'No property ID provided';
    loading.value = false;
  }
});
</script>

<style scoped>
/* Add any custom styles here */
</style>