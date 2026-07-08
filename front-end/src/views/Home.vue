<template>
  <div class="bg-gray-50 min-h-screen flex flex-col">
    <!-- Hero Section -->
    <section class="relative bg-cover bg-center h-[400px] flex items-center justify-center" :style="{ backgroundImage: `url(${houseImage})` }">
      <div class="relative z-10 text-center text-white w-full px-4">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          {{ authStore.isAuthenticated ? `Welcome back, ${userName}!` : 'Welcome to your home' }}
        </h1>
        <p class="mb-6 max-w-2xl mx-auto">
          {{ authStore.isAuthenticated 
            ? 'Ready to find your next rental? Browse our latest properties or add your own listing.'
            : 'Find your perfect rental property today. Sign up or log in to save your favorite listings and more.'
          }}
        </p>
        <!-- Search Bar -->
        <form class="bg-white bg-opacity-90 rounded-xl shadow-lg flex flex-wrap items-center justify-center gap-3 p-6 max-w-4xl mx-auto">
          <!-- Property Type -->
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <select 
              v-model="propertyType"
              @change="applyFilters"
              class="pl-10 pr-8 py-3 w-48 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="" selected>Property Type</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
            </select>
          </div>

          <!-- Bedrooms -->
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <select 
              v-model="bedrooms"
              @change="applyFilters"
              class="pl-10 pr-8 py-3 w-40 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="" selected>Bedrooms</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
            </select>
          </div>

          <!-- Location -->
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <select 
              v-model="location"
              @change="applyFilters"
              class="pl-10 pr-8 py-3 w-48 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="" selected>Location</option>
              <option value="Addis Ababa">Addis Ababa</option>
              <option value="Dire Dawa">Dire Dawa</option>
              <option value="Bahir Dar">Bahir Dar</option>
              <option value="Mekelle">Mekelle</option>
              <option value="Hawassa">Hawassa</option>
              <option value="Gondar">Gondar</option>
              <option value="Jimma">Jimma</option>
            </select>
          </div>

          <!-- Price -->
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <input
              type="number"
              min="0"
              step="100"
              placeholder="Max Price"
              class="pl-10 pr-4 py-3 w-40 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              v-model="maxPrice"
              @input="applyFilters"
              @focus="maxPrice === '' ? maxPrice = '' : null"
            />
          </div>

          <!-- Search Button -->
          <button 
            type="submit" 
            class="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md hover:shadow-lg transition-all duration-200 flex items-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            Search
          </button>
        </form>
      </div>
    </section>

    <!-- Recent Listings Carousel -->
    <section class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-8 text-center">Recent Listing</h2>
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="error" class="text-center py-8 text-red-500">
          {{ error }}
        </div>
        <div v-else-if="recentListings.length === 0" class="text-center py-8 text-gray-500">
          No recent listings available.
        </div>
        <div v-else>
          <!-- Current slide items in grid -->
          <!-- Debug Info: Total Slides: {{ totalSlides }}, Current Slide: {{ currentSlide }} -->
          <div class="relative px-16">
            <button 
              @click="prevSlide"
              class="absolute left-0 top-1/2 transform -translate-y-1/2 z-50 bg-green-500 text-white rounded-full p-4 shadow-xl border-2 border-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              :class="{ 'opacity-0': recentListings.length < 6 }"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="property in currentSlideListings" :key="property._id" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div class="relative h-48 overflow-hidden">
                <div class="w-full h-full bg-gray-200 flex items-center justify-center">
                  <img 
                    v-if="property.images && property.images.length > 0"
                    :src="getImageUrl(property.images[0])" 
                    :alt="property.title" 
                    class="w-full h-full object-cover"
                    @error="handleImageError($event, property)"
                  />
                  <div v-else class="text-gray-500 text-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span class="text-sm">No Image Available</span>
                  </div>
                </div>
                <div v-if="property.featured" class="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">
                  Featured
                </div>
                <div class="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                  {{ property.propertyType || 'Property' }}
                </div>
              </div>
              <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                  <h3 class="font-bold text-lg text-gray-800">{{ property.title || 'No Title' }}</h3>
                  <span class="text-blue-600 font-semibold">{{ formatPrice(property.price) }}<span class="text-xs text-gray-500">/mo</span></span>
                </div>
                <div class="flex items-center text-sm text-gray-600 mb-2">
                  <span class="flex items-center mr-4">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    {{ property.bedrooms }} {{ property.bedrooms === 1 ? 'Bed' : 'Beds' }}
                  </span>
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    {{ property.bathrooms }} {{ property.bathrooms === 1 ? 'Bath' : 'Baths' }}
                  </span>
                  <span class="ml-auto">{{ property.area }} sqft</span>
                </div>
                <div class="flex items-center text-sm text-gray-500 mb-3">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {{ property.address?.city || 'N/A' }}, {{ property.address?.state || 'N/A' }}
                </div>
                <RouterLink 
                  :to="`/properties/${property._id}`" 
                  class="block w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded transition"
                >
                  View Details
                </RouterLink>
              </div>
              </div>
            </div>
            
            <button 
              @click="nextSlide"
              class="absolute right-0 top-1/2 transform -translate-y-1/2 z-50 bg-green-500 text-white rounded-full p-4 shadow-xl border-2 border-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-white"
              :class="{ 'opacity-0': recentListings.length < 6 }"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <!-- Carousel Dots -->
        <div v-if="showCarouselDots" class="flex justify-center mt-8 space-x-3">
          <button 
            v-for="i in totalSlides" 
            :key="i" 
            @click="goToSlide(i - 1)"
            class="w-3 h-3 rounded-full focus:outline-none transition-all duration-300"
            :class="i - 1 === currentSlide ? 'bg-blue-600 w-6' : 'bg-gray-300 hover:bg-blue-400'"
            :aria-label="`Go to slide ${i}`"
          ></button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 class="text-xl font-bold mb-2 text-gray-800">Discover Everything You Need to Rent Smarter</h3>
            <p class="text-gray-600">We tailor our platform to help you as a renter, landlord, or property manager. Find the perfect home or the right tenant. Make renting a frictionless, secure process: search, chat, and close with trust.</p>
          </div>
          <div class="grid grid-cols-2 gap-6">
            <div class="flex items-start space-x-3">
              <span class="text-blue-600 text-2xl">🔍</span>
              <div>
                <div class="font-semibold">Easy Property Search</div>
                <div class="text-sm text-gray-500">Find your dream home with just a few clicks. Search by location, price, and more!</div>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <span class="text-blue-600 text-2xl">🗺️</span>
              <div>
                <div class="font-semibold">Integrated Maps</div>
                <div class="text-sm text-gray-500">View properties on maps. Visualize the neighborhood, proximity to schools, and localities.</div>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <span class="text-blue-600 text-2xl">👥</span>
              <div>
                <div class="font-semibold">Tenant & Landlord Support</div>
                <div class="text-sm text-gray-500">Get dedicated support for every step. Secure chat, document upload, and more.</div>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <span class="text-blue-600 text-2xl">⚙️</span>
              <div>
                <div class="font-semibold">Advanced Filters</div>
                <div class="text-sm text-gray-500">Find your perfect match—filter by features, price, bedrooms, and amenities.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white border-t mt-auto">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <div class="text-center text-sm text-gray-500">
          &copy; 2025 Rental Platform. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import houseImage from '@/assets/house.jpg';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import axios from 'axios';

const authStore = useAuthStore();
const userName = computed(() => authStore.user?.name?.split(' ')[0] || 'User');

// Filter states
const propertyType = ref('');
const bedrooms = ref('');
const location = ref('');
const maxPrice = ref('');

// Listings
const recentListings = ref([]);
const filteredListings = ref([]);
const loading = ref(true);
const error = ref(null);
const currentSlide = ref(0);
const itemsPerPage = 6; // Number of items to show per slide
const showArrowsMinItems = 6;

// Computed properties for split listings
const firstSixListings = computed(() => {
  return filteredListings.value.slice(0, 6);
});

const remainingListings = computed(() => {
  return filteredListings.value.slice(6);
});

// Computed properties
const totalSlides = computed(() => {
  const total = Math.ceil(recentListings.value.length / itemsPerPage);
  console.log('Total Slides:', total, 'Listings:', recentListings.value.length, 'Show Arrows:', recentListings.value.length >= showArrowsMinItems);
  return total;
});

const currentSlideListings = computed(() => {
  const start = currentSlide.value * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredListings.value.length > 0 
    ? filteredListings.value.slice(start, end)
    : recentListings.value.slice(start, end);
});

const showCarouselDots = computed(() => {
  const items = filteredListings.value.length > 0 ? filteredListings.value : recentListings.value;
  return items.length > itemsPerPage;
});

// Methods
const goToSlide = (index) => {
  currentSlide.value = index;
};

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % totalSlides.value;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + totalSlides.value) % totalSlides.value;
};

// Apply filters
const applyFilters = () => {
  filteredListings.value = recentListings.value.filter(property => {
    // Filter by property type
    if (propertyType.value && property.propertyType !== propertyType.value) {
      return false;
    }
    
    // Filter by bedrooms
    if (bedrooms.value) {
      if (bedrooms.value === '4' && property.bedrooms < 4) {
        return false;
      } else if (bedrooms.value !== '4' && property.bedrooms !== parseInt(bedrooms.value)) {
        return false;
      }
    }
    
    // Filter by location
    if (location.value) {
      const propertyLocation = property.address?.city?.toLowerCase() || '';
      if (!propertyLocation.includes(location.value.toLowerCase())) {
        return false;
      }
    }
    
    // Filter by max price
    if (maxPrice.value && property.price > parseInt(maxPrice.value)) {
      return false;
    }
    
    return true;
  });
};

// Reset all filters
const resetFilters = () => {
  propertyType.value = '';
  bedrooms.value = '';
  location.value = '';
  maxPrice.value = '';
  applyFilters();
};

// Fetch recent listings
const fetchRecentListings = async () => {
  try {
    loading.value = true;
    const response = await axios.get('http://localhost:9000/api/properties/recent', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: true
    });
    
    if (response.data && response.data.data) {
      recentListings.value = response.data.data;
      filteredListings.value = [...recentListings.value];
    } else {
      throw new Error('Invalid response format');
    }
  } catch (err) {
    console.error('Error fetching recent listings:', err);
    error.value = 'Failed to load recent listings. Please check your connection and try again.';
    
    // Log more details about the error
    if (err.response) {
      console.error('Response error:', err.response.status, err.response.data);
    } else if (err.request) {
      console.error('No response received:', err.request);
    } else {
      console.error('Request setup error:', err.message);
    }
  } finally {
    loading.value = false;
  }
};

// Format price
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency: 'ETB',
    minimumFractionDigits: 0
  }).format(price);
};

// Helper function to get the full image URL
const getImageUrl = (image) => {
  if (!image) return '';
  // Handle both string paths and image objects
  const path = typeof image === 'string' ? image : image.path;
  if (path.startsWith('http')) return path;
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000';
  return `${baseUrl}${path}`;
};

// Handle image loading errors - show placeholder instead of hiding
const handleImageError = (event, property) => {
  const imgElement = event.target;
  if (imgElement) {
    // Replace with a nice placeholder SVG
    imgElement.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="%23e2e8f0" width="400" height="300"/><text x="200" y="140" text-anchor="middle" fill="%2394a3b8" font-family="Arial" font-size="16">No Image Available</text><path d="M180 170 L200 190 L220 175 L240 200 L160 200 Z" fill="%2394a3b8" opacity="0.5"/><circle cx="185" cy="155" r="8" fill="%2394a3b8" opacity="0.5"/></svg>');
    imgElement.style.objectFit = 'cover';
    // Prevent infinite error loop
    imgElement.onerror = null;
  }
};

// Fetch listings when component mounts
onMounted(() => {
  fetchRecentListings();
});
</script>
