<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav class="bg-white shadow-md sticky top-0 z-50 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20">
          <div class="flex items-center">
            <!-- Logo -->
            <router-link to="/home" class="flex-shrink-0 flex items-center">
              <div class="h-10 w-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <span class="text-white font-bold text-xl">RP</span>
              </div>
              <span class="ml-3 text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Rental Platform
              </span>
            </router-link>
            
            <!-- Primary Navigation -->
            <div class="hidden md:ml-10 md:flex md:items-center md:space-x-1">
              <router-link 
                v-for="item in navigation" 
                :key="item.name" 
                :to="item.href" 
                class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200"
                :class="{ 'text-green-600': $route.path === item.href }"
              >
                {{ item.name }}
              </router-link>
              <router-link 
                v-if="isAuthenticated"
                to="/add-listing" 
                class="ml-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-md hover:from-green-600 hover:to-emerald-600 active:from-green-700 active:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 flex items-center"
                :class="{'bg-green-600': $route.path === '/add-listing'}"
              >
                <span class="text-base mr-1">+</span> 
                <span class="text-white">Add Listing</span>
              </router-link>
            </div>
          </div>

          <!-- Right Navigation -->
          <div v-if="!isAuthenticated" class="hidden md:flex items-center space-x-3">
            <router-link 
              to="/login" 
              class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors duration-200"
            >
              Log in
            </router-link>
            <router-link 
              to="/register" 
              class="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-md hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Sign up
            </router-link>
          </div>

          <!-- User Profile Dropdown -->
          <div v-else class="hidden md:flex md:items-center md:ml-6">
            <div class="relative">
              <button 
                @click="toggleProfileDropdown"
                class="flex items-center space-x-2 max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                :class="{ 'ring-2 ring-offset-2 ring-green-500': showProfileDropdown }"
              >
                <div class="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-semibold text-lg shadow-md">
                  {{ userInitial }}
                </div>
                <span class="hidden md:block text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {{ authStore.user.name || 'Account' }}
                </span>
                <svg 
                  class="w-5 h-5 text-gray-400 group-hover:text-gray-500" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                  :class="{ 'transform rotate-180': showProfileDropdown }"
                >
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              
              <!-- Dropdown Menu -->
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div 
                  v-if="showProfileDropdown" 
                  class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                >
                  <div class="py-1">
                    <div class="px-4 py-3 border-b border-gray-100">
                      <p class="text-sm font-medium text-gray-900">{{ authStore.user.name || 'User' }}</p>
                      <p class="text-xs text-gray-500 truncate">{{ authStore.user.email || '' }}</p>
                    </div>
                    <router-link 
                      to="/profile" 
                      class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-b border-gray-100"
                      @click="showProfileDropdown = false"
                    >
                      <div class="flex items-center">
                        <svg class="mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Your Profile</span>
                      </div>
                    </router-link>
                    <router-link 
                      to="/profile/settings" 
                      class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-b border-gray-100"
                      @click="showProfileDropdown = false"
                    >
                      <div class="flex items-center">
                        <svg class="mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Settings</span>
                      </div>
                    </router-link>
                    <button 
                      @click="handleLogout" 
                      class="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <svg class="mr-3 h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="-mr-2 flex items-center md:hidden">
            <button 
              @click="isMenuOpen = !isMenuOpen"
              type="button" 
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <!-- Icon when menu is closed -->
              <svg 
                class="h-6 w-6" 
                :class="{ 'hidden': isMenuOpen, 'block': !isMenuOpen }" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <!-- Icon when menu is open -->
              <svg 
                class="h-6 w-6" 
                :class="{ 'hidden': !isMenuOpen, 'block': isMenuOpen }" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <!-- Mobile menu -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div v-show="isMenuOpen" class="md:hidden">
          <div class="pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg mx-2">
            <!-- Navigation Links -->
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600 border-b border-gray-100"
              :class="{ 'bg-green-50 text-green-600': $route.path === item.href }"
              @click="isMenuOpen = false"
            >
              {{ item.name }}
            </router-link>

            <!-- Add Listing Button (for authenticated users) -->
            <router-link
              v-if="isAuthenticated"
              to="/add-listing"
              class="block px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-colors duration-200"
              @click="isMenuOpen = false"
            >
              + Add Listing
            </router-link>
          </div>

          <!-- Auth Buttons or User Menu -->
          <div v-if="!isAuthenticated" class="pt-4 pb-3 border-t border-gray-200 bg-white rounded-b-lg mx-2">
            <div class="px-5 space-y-2">
              <router-link
                to="/login"
                class="block w-full px-4 py-2 text-base font-medium text-center text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md"
                @click="isMenuOpen = false"
              >
                Log in
              </router-link>
              <router-link
                to="/register"
                class="block w-full px-4 py-2 text-base font-medium text-center text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-md shadow-sm"
                @click="isMenuOpen = false"
              >
                Sign up
              </router-link>
            </div>
          </div>

          <!-- User Menu (for authenticated users) -->
          <div v-else class="pt-4 pb-3 border-t border-gray-200 bg-white rounded-b-lg mx-2">
            <div class="flex items-center px-5 pb-3">
              <div class="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-semibold text-lg mr-3">
                {{ userInitial }}
              </div>
              <div>
                <div class="text-base font-medium text-gray-800">{{ authStore.user.name || 'User' }}</div>
                <div class="text-sm font-medium text-gray-500">{{ authStore.user.email || '' }}</div>
              </div>
            </div>
            <div class="mt-3 space-y-1">
              <router-link
                to="/profile"
                class="block px-5 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600"
                @click="isMenuOpen = false"
              >
                Your Profile
              </router-link>
              <router-link
                to="/profile/settings"
                class="block px-5 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600"
                @click="isMenuOpen = false"
              >
                Settings
              </router-link>
              <button
                @click="handleLogout"
                class="block w-full text-left px-5 py-2 text-base font-medium text-red-600 hover:bg-red-50"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </transition>
    </nav>

    <!-- Main Content -->
    <main class="min-h-screen">
      <router-view></router-view>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white">
      <div class="max-w-6xl mx-auto px-4 py-10">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">About Us</h3>
            <p class="text-gray-400">Your trusted platform for finding the perfect rental property.</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><router-link to="/home" class="text-gray-400 hover:text-white">Home</router-link></li>
              <li><router-link to="/properties" class="text-gray-400 hover:text-white">Properties</router-link></li>
              <li><router-link to="/how" class="text-gray-400 hover:text-white">How It Works</router-link></li>
              <!-- <li><router-link to="/about" class="text-gray-400 hover:text-white">About</router-link></li> -->
              <li><router-link to="/contact" class="text-gray-400 hover:text-white">Contact us</router-link></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Contact Us</h3>
            <p class="text-gray-400">Email: info@rentalplatform.com</p>
            <p class="text-gray-400">Phone: (123) 456-7890</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Newsletter</h3>
            <p class="text-gray-400 mb-2">Subscribe to our newsletter for updates</p>
            <div class="flex">
              <input type="email" placeholder="Your email" class="px-4 py-2 rounded-l-lg focus:outline-none text-gray-800 w-full">
              <button class="bg-green-500 hover:bg-green-600 text-white px-4 rounded-r-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Rental Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from './store/auth';

// Navigation items
const navigation = [
  { name: 'Home', href: '/home' },
  { name: 'Properties', href: '/properties' },
  { name: 'How It Works', href: '/how' },
  // { name: 'About Us', href: '/about' },
  { name: 'Contact us', href: '/contact' },
];

const router = useRouter();
const authStore = useAuthStore();
const isMenuOpen = ref(false);
const showProfileDropdown = ref(false);
const isInitialized = ref(false);

// Computed properties
const isAuthenticated = computed(() => {
  // Check both the store and localStorage to ensure consistency
  const hasToken = !!localStorage.getItem('token');
  return authStore.isAuthenticated || hasToken;
});

const userInitial = computed(() => {
  if (authStore.user?.name) {
    return authStore.user.name.charAt(0).toUpperCase();
  }
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      return user.name ? user.name.charAt(0).toUpperCase() : 'U';
    } catch (e) {
      return 'U';
    }
  }
  return 'U';
});

// Toggle mobile menu
const toggleMenu = () => {
  const menu = document.querySelector('.mobile-menu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
};

// Toggle profile dropdown
const toggleProfileDropdown = () => {
  showProfileDropdown.value = !showProfileDropdown.value;
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  const dropdown = document.querySelector('.relative');
  if (dropdown && !dropdown.contains(event.target)) {
    showProfileDropdown.value = false;
  }
};

// Logout function
const handleLogout = () => {
  authStore.logout();
  showProfileDropdown.value = false;
  router.push('/login');
};

// Initialize on mount
onMounted(async () => {
  // Initialize auth state from localStorage
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  
  if (token && storedUser) {
    try {
      const user = JSON.parse(storedUser);
      authStore.setAuth(user, token);
    } catch (e) {
      console.error('Failed to parse user data from localStorage:', e);
    }
  }
  
  isInitialized.value = true;
  
  // Mobile menu toggle functionality
  const btn = document.querySelector('.mobile-menu-button');
  if (btn) {
    btn.addEventListener('click', toggleMenu);
  }
  
  // Add click outside listener for profile dropdown
  document.addEventListener('click', handleClickOutside);
});

// Clean up event listener
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style>
/* Add any custom styles here */
.router-link-active {
  color: #10B981; /* green-500 */
  border-bottom: 2px solid #10B981;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Animation for page transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.15s;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>