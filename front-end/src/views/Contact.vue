<template>
    <div class="about-page">
      <div class="about-content">
        <h1 class="text-4xl font-bold mb-8">About Our Rental Platform</h1>
        
        <div class="about-section mb-12">
          <h2 class="text-2xl font-semibold mb-4">Our Mission</h2>
          <p class="text-lg text-gray-700">
            At our rental platform, we're dedicated to making property rental simple, secure, and efficient for both landlords and tenants.
          </p>
        </div>
        
        <div class="about-section">
          <h2 class="text-2xl font-semibold mb-4">Why Choose Us</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="feature p-6 bg-white rounded-lg shadow-md">
              <h3 class="text-xl font-semibold mb-2">Trust & Security</h3>
              <p class="text-gray-600">Verified listings and secure payment processing</p>
            </div>
            <div class="feature p-6 bg-white rounded-lg shadow-md">
              <h3 class="text-xl font-semibold mb-2">Easy Management</h3>
              <p class="text-gray-600">Streamlined property management tools</p>
            </div>
            <div class="feature p-6 bg-white rounded-lg shadow-md">
              <h3 class="text-xl font-semibold mb-2">24/7 Support</h3>
              <p class="text-gray-600">Dedicated customer support team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  
  onMounted(() => {
    // Add any initialization code here
  })
  </script>
  
  <style scoped>
  .about-page {
    padding: 4rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .about-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .feature {
    transition: transform 0.3s ease;
  }
  
  .feature:hover {
    transform: translateY(-5px);
  }
  </style>