<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
    <!-- Enhanced Filters Section -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Find Your Perfect Property</h2>
      <div class="space-y-6">
        <!-- Main Search -->
        <div class="flex flex-col sm:flex-row gap-4 items-end">
          <div class="flex-1 w-full">
            <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Search Properties</label>
            <div class="relative rounded-lg shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
              <input
                id="search"
                type="text"
                v-model="searchQuery"
                placeholder="Search by title, location, or keywords..."
                class="focus:ring-2 focus:ring-green-500 focus:border-transparent block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 text-sm transition-all duration-200"
                @keyup.enter="searchProperties"
              />
            </div>
          </div>
          <button
            @click="searchProperties"
            class="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            Search
          </button>
        </div>

        <!-- Filter Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Property Type -->
          <div class="relative group">
            <label for="property-type" class="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <select
                id="property-type"
                v-model="selectedType"
                class="appearance-none block w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 text-sm transition-all duration-200 cursor-pointer hover:border-emerald-300"
              >
                <option value="">All Property Types</option>
                <option v-for="type in propertyTypes" :key="type" :value="type">
                  {{ type }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Bedrooms -->
          <div class="relative group">
            <label for="bedrooms" class="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <select
                id="bedrooms"
                v-model="selectedBedrooms"
                class="appearance-none block w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 text-sm transition-all duration-200 cursor-pointer hover:border-emerald-300"
              >
                <option value="">Any Bedrooms</option>
                <option value="0">Studio</option>
                <option v-for="n in 5" :key="n" :value="n">
                  {{ n }} {{ n === 1 ? 'Bedroom' : 'Bedrooms' }}
                </option>
                <option value="6">6+ Bedrooms</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Location -->
          <div class="relative group">
            <label for="location" class="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input
                id="location"
                type="text"
                v-model="selectedLocation"
                list="location-list"
                placeholder="Any location"
                class="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 placeholder-gray-400 text-sm transition-all duration-200 hover:border-emerald-300"
              />
              <datalist id="location-list">
                <option v-for="location in locations" :key="location" :value="location" />
              </datalist>
            </div>
          </div>

          <!-- Max Price -->
          <div class="relative group">
            <label for="max-price" class="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <input
                id="max-price"
                type="number"
                v-model.number="maxPrice"
                placeholder="No max"
                min="0"
                class="block w-full pl-10 pr-20 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 placeholder-gray-400 text-sm transition-all duration-200 hover:border-emerald-300"
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-2">
                <select
                  v-model="currency"
                  class="h-full py-0 pl-2 pr-8 border-transparent bg-transparent text-gray-500 text-sm rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option>USD</option>
                  <option>ETB</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Active Filters -->
        <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 pt-2">
          <span 
            v-if="selectedType" 
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
          >
            Type: {{ selectedType }}
            <button @click="selectedType = ''" class="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500">
              <span class="sr-only">Remove filter</span>
              <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
              </svg>
            </button>
          </span>
          <span 
            v-if="selectedBedrooms" 
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
          >
            {{ selectedBedrooms === '6' ? '6+' : selectedBedrooms === '0' ? 'Studio' : selectedBedrooms + '+' }} Bedrooms
            <button @click="selectedBedrooms = ''" class="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-500">
              <span class="sr-only">Remove filter</span>
              <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
              </svg>
            </button>
          </span>
          <span 
            v-if="selectedLocation" 
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
          >
            Location: {{ selectedLocation }}
            <button @click="selectedLocation = ''" class="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-purple-400 hover:bg-purple-200 hover:text-purple-500">
              <span class="sr-only">Remove filter</span>
              <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
              </svg>
            </button>
          </span>
          <span 
            v-if="maxPrice" 
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
          >
            Max: ${{ maxPrice.toLocaleString() }}
            <button @click="maxPrice = ''" class="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-yellow-400 hover:bg-yellow-200 hover:text-yellow-500">
              <span class="sr-only">Remove filter</span>
              <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
              </svg>
            </button>
          </span>
          <button 
            v-if="hasActiveFilters" 
            @click="clearAllFilters" 
            class="text-xs text-gray-500 hover:text-gray-700 flex items-center"
          >
            Clear all filters
          </button>
        </div>
      </div>
    </div>

    <!-- Properties Grid -->
    <div v-if="isLoading" class="text-center py-12">
      <p>Loading properties...</p>
    </div>
    <div v-else-if="error" class="text-center py-12 text-red-500">
      <p>{{ error }}</p>
      <div class="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors text-center">
        View Details
      </div>
    </div>
    <div v-else-if="filteredProperties.length === 0" class="text-center py-12">
      <p>No properties found matching your criteria.</p>
    </div>
    <div v-else class="relative">
      <!-- All properties in a single grid -->
      <div class="bg-white rounded-lg shadow-md p-4">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Available Properties</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="property in filteredProperties"
            :key="property._id || property.id"
            class="cursor-pointer hover:shadow-lg transition-shadow duration-200"
            @click="viewPropertyDetails(property)"
          >
            <div class="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
              <img
                v-if="property.images && property.images.length > 0"
                :src="getImageUrl(property.images[0])"
                :alt="property.title"
                class="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                @error="handleImageError($event, property)"
              />
              <div v-else class="text-gray-500 text-center p-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="text-sm">No Image Available</span>
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-md font-medium text-gray-900 truncate">{{ property.title }}</h3>
              <p class="mt-1 text-sm text-gray-500 truncate">{{ property.location }}</p>
              <div class="mt-2">
                <div class="text-lg font-bold text-blue-600">${{ property.price }}/month</div>
                <div class="mt-2 flex flex-wrap gap-2">
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                    {{ property.bedrooms }} beds
                  </span>
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                    {{ property.bathrooms }} baths
                  </span>
                  <span v-if="property.sqft" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                    {{ property.sqft }} sqft
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/axios'

const router = useRouter()
const properties = ref([])
const isLoading = ref(true)
const error = ref(null)

// Fetch properties from the API
const fetchProperties = async () => {
  try {
    isLoading.value = true
    const response = await api.get('/properties')
    properties.value = response.data.data.map(property => ({
      ...property,
      // Use the first image as the main image, or a placeholder if no images
      image: property.images && property.images.length > 0 
        ? getImageUrl(property.images[0])
        : 'https://via.placeholder.com/400x300?text=No+Image',
      // Create a location string from the address
      location: property.address ? 
        `${property.address.street}, ${property.address.city}` : 'Location not specified',
      // Map area to sqft for compatibility with the template
      sqft: property.area || 0
    }))
  } catch (err) {
    console.error('Error fetching properties:', err)
    error.value = 'Failed to load properties. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

// Fetch properties when the component mounts
onMounted(() => {
  fetchProperties()
})

const locations = computed(() => {
  // Extract unique cities from properties
  const cities = new Set()
  properties.value.forEach(property => {
    if (property.address?.city) {
      cities.add(property.address.city)
    }
  })
  return Array.from(cities).sort()
})

// Property types for the dropdown
const propertyTypes = [
  'Apartment',
  'House',
  'Villa',
  'Condo',
  'Townhouse',
  'Studio',
  'Loft',
  'Other'
]

// Filter controls
const searchQuery = ref('')
const selectedType = ref('')
const selectedBedrooms = ref('')
const selectedLocation = ref('')
const maxPrice = ref('')

// Get first 6 properties
const firstSixProperties = computed(() => {
  return filteredProperties.value.slice(0, 6);
});

// Get remaining properties (after the first 6)
const remainingProperties = computed(() => {
  return filteredProperties.value.slice(6);
});

// Computed property to filter properties based on search and filters
const filteredProperties = computed(() => {
  return properties.value.filter(property => {
    const searchLower = searchQuery.value.toLowerCase()
    const matchesSearch = 
      property.title.toLowerCase().includes(searchLower) ||
      (property.description && property.description.toLowerCase().includes(searchLower))
      
    const matchesType = !selectedType.value || 
      (property.propertyType && property.propertyType === selectedType.value)
      
    const matchesBedrooms = !selectedBedrooms.value || 
      (property.bedrooms && property.bedrooms >= parseInt(selectedBedrooms.value))
      
    const matchesLocation = !selectedLocation.value || 
      (property.address?.city && property.address.city.toLowerCase().includes(selectedLocation.value.toLowerCase()))
      
    const matchesPrice = !maxPrice.value || 
      (property.price && property.price <= parseInt(maxPrice.value))
      
    return matchesSearch && matchesType && matchesBedrooms && matchesLocation && matchesPrice
  })
})

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return selectedType.value !== '' || 
         selectedBedrooms.value !== '' || 
         selectedLocation.value !== '' || 
         maxPrice.value !== ''
})

// Clear all filters
const clearAllFilters = () => {
  selectedType.value = ''
  selectedBedrooms.value = ''
  selectedLocation.value = ''
  maxPrice.value = ''
}

// Methods
const searchProperties = () => {
  // Trigger reactivity
  const temp = searchQuery.value
  searchQuery.value = ''
  searchQuery.value = temp
}

const viewPropertyDetails = (property) => {
  if (property._id) {
    router.push(`/properties/${property._id}`)
  } else {
    console.error('Property ID is missing')
  }
}

// Helper function to get the full image URL
const getImageUrl = (image) => {
  if (!image) return '';
  // Handle both string paths and image objects
  const path = typeof image === 'string' ? image : image.path;
  if (path.startsWith('http')) return path;
  return `http://localhost:9000${path}`;
};

// Handle image loading errors - show placeholder instead of hiding
const handleImageError = (event, property) => {
  const imgElement = event.target;
  if (imgElement) {
    imgElement.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="%23e2e8f0" width="400" height="300"/><text x="200" y="140" text-anchor="middle" fill="%2394a3b8" font-family="Arial" font-size="16">No Image Available</text><path d="M180 170 L200 190 L220 175 L240 200 L160 200 Z" fill="%2394a3b8" opacity="0.5"/><circle cx="185" cy="155" r="8" fill="%2394a3b8" opacity="0.5"/></svg>');
    imgElement.style.objectFit = 'cover';
    imgElement.onerror = null;
  }
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
