<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
    <main class="flex-1 max-w-5xl mx-auto w-full py-8 px-4 sm:px-6">
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">List Your Property</h1>
        <p class="text-gray-600 max-w-2xl mx-auto">Fill out the form below to list your property for rent. All fields marked with <span class="text-red-500">*</span> are required.</p>
      </div>

      <!-- Contact Information -->
      <section class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8 transition-all hover:shadow-md">
        <div class="bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-4">
          <h2 class="text-xl font-semibold text-white flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Contact Information
          </h2>
        </div>
        <div class="p-6">
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Left Column -->
            <div class="space-y-5">
              <!-- Full Name -->
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name <span class="text-red-500">*</span></label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input 
                    v-model="fullName" 
                    type="text" 
                    placeholder="John Doe" 
                    class="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 transition duration-150"
                    required
                  />
                </div>
              </div>
              
              <!-- Phone Number -->
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number <span class="text-red-500">*</span></label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input 
                    v-model="phone" 
                    type="tel" 
                    placeholder="+251 9XX XXX XXX" 
                    class="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 transition duration-150"
                    required
                  />
                </div>
              </div>
              
              <!-- Email -->
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input 
                    v-model="email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    class="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 transition duration-150"
                  />
                </div>
              </div>
            </div>
            
            <!-- Right Column -->
            <div class="space-y-5">
              <!-- Facebook -->
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">Facebook Username</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fab fa-facebook text-blue-600"></i>
                  </div>
                  <input 
                    v-model="facebook" 
                    type="text" 
                    placeholder="username" 
                    class="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 transition duration-150"
                  />
                </div>
              </div>
              
              <!-- Telegram -->
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">Telegram Username</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fab fa-telegram text-blue-400"></i>
                  </div>
                  <input 
                    v-model="telegram" 
                    type="text" 
                    placeholder="@username" 
                    class="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 transition duration-150"
                  />
                </div>
              </div>
              
              <!-- WhatsApp -->
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fab fa-whatsapp text-green-500"></i>
                  </div>
                  <input 
                    v-model="whatsapp" 
                    type="tel" 
                    placeholder="+251 9XX XXX XXX" 
                    class="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 transition duration-150"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Property Information -->
      <section class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8 transition-all hover:shadow-md">
        <div class="bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-4">
          <h2 class="text-xl font-semibold text-white flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Property Details
          </h2>
        </div>
        <div class="p-6">
          <p class="text-sm text-gray-500 mb-6">Please provide detailed information about your property to attract potential renters.</p>
          <div class="space-y-6">
            <div>
              <div class="flex justify-between items-center mb-1">
                <label class="block text-sm font-medium text-gray-700">
                  Property Title <span class="text-red-500">*</span>
                </label>
                <span class="text-xs text-gray-500" :class="{ 'text-red-500': form.title && form.title.length > 100 }">
                  {{ form.title ? form.title.length : 0 }}/100
                </span>
              </div>
              <div class="relative">
                <input 
                  v-model="form.title" 
                  type="text" 
                  maxlength="100"
                  required 
                  class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 transition duration-150 pl-10"
                  placeholder="Beautiful 3 Bedroom Apartment in Bole"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Address -->
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Street Address <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <input 
                  v-model="form.address.street" 
                  type="text" 
                  required 
                  class="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 transition duration-150" 
                  placeholder="e.g., Adha"
                />
              </div>
            </div>

            <!-- Location Details -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  City <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.address.city" 
                  type="text" 
                  required 
                  class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 transition duration-150" 
                  placeholder="e.g., Mekelle"
                />
              </div>
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  State/Region <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.address.state" 
                  type="text" 
                  required 
                  class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 transition duration-150" 
                  placeholder="e.g., Tigray"
                />
              </div>
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.address.zipCode" 
                  type="text" 
                  required 
                  class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 transition duration-150" 
                  placeholder="e.g., 1000"
                />
              </div>
            </div>

            <!-- Property Type -->
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Property Type <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <select 
                  v-model="form.propertyType" 
                  required 
                  class="appearance-none pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 transition duration-150 py-3 pr-8"
                >
                  <option value="">Select property type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Condo">Condo</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Studio">Studio</option>
                  <option value="Penthouse">Penthouse</option>
                </select>
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Price -->
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Monthly Rent (ETB) <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <input 
                  v-model="form.price" 
                  type="number" 
                  min="0" 
                  required 
                  class="pl-10 pr-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 transition duration-150 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                  placeholder="e.g., 15000"
                />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 text-sm"></span>
                </div>
              </div>
              <div v-if="form.price" class="text-sm text-emerald-600 font-medium mt-1">
                {{ formatPrice(form.price) }} ETB/month
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-6">
            <!-- Property Details -->
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 class="text-sm font-medium text-gray-700 mb-3">Property Details</h3>
              <div class="grid grid-cols-2 gap-4">
                <!-- Bedrooms -->
                <div class="relative">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Bedrooms
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <input 
                      v-model.number="form.bedrooms" 
                      type="number" 
                      min="0" 
                      class="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 transition duration-150" 
                      placeholder="0"
                    />
                  </div>
                </div>

                <!-- Bathrooms -->
                <div class="relative">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Bathrooms
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                    </div>
                    <input 
                      v-model.number="form.bathrooms" 
                      type="number" 
                      min="0" 
                      step="0.5" 
                      class="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 transition duration-150" 
                      placeholder="0"
                    />
                  </div>
                </div>

                <!-- Area -->
                <div class="relative">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Area (sqm)
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </div>
                    <input 
                      v-model.number="form.area" 
                      type="number" 
                      min="0" 
                      class="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 transition duration-150" 
                      placeholder="e.g., 120"
                    />
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span class="text-gray-500 text-sm">m²</span>
                    </div>
                  </div>
                </div>

                <!-- Floor -->
                <div class="relative">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Floor
                  </label>
                  <div class="relative">
                    <input 
                      v-model.number="form.floor" 
                      type="number" 
                      min="0" 
                      class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 transition duration-150" 
                      placeholder="e.g., 2"
                    />
                  </div>
                </div>
              </div>
          </div>
        </div>  
        <!-- Images and Map -->
        <div class="grid md:grid-cols-2 gap-8 mt-8">
          <div>
            <label class="block mb-2 font-medium">
              <span class="text-red-500">*</span> Property Images
              <span class="text-sm text-gray-500 font-normal">(At least 1 image required)</span>
            </label>
            
            <!-- Image Upload Area -->
            <div v-if="previews.length === 0">
              <div 
                @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @drop.prevent="handleDrop"
                @click="$refs.fileInput.click()"
                :class="{ 'border-2 border-blue-500 bg-blue-50': isDragging }"
                class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer transition-colors hover:border-blue-400 hover:bg-blue-50"
              >
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  @change="handleImageUpload" 
                  class="hidden" 
                  id="image-upload"
                  ref="fileInput"
                />
                <div class="max-w-md mx-auto p-4 text-center">
                  <div class="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-cloud-upload-alt text-blue-500 text-2xl"></i>
                  </div>
                  <h3 class="text-lg font-medium text-gray-700 mb-1">
                    {{ isDragging ? 'Drop your images here' : 'Drag & drop your images here' }}
                  </h3>
                  <p class="text-sm text-gray-500 mb-4">
                    or <label for="image-upload" class="text-blue-600 font-medium cursor-pointer hover:underline">browse files</label>
                  </p>
                  <p class="text-xs text-gray-400">
                    Supports JPG, JPEG, PNG (max 5MB per image)
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Image Previews -->
            <div v-else class="mt-6">
              <h4 class="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <i class="fas fa-images mr-2 text-blue-500"></i>
                {{ previews.length }} {{ previews.length === 1 ? 'Image' : 'Images' }} Selected
                <span class="ml-auto text-xs text-gray-500">
                  ({{ 10 - previews.length }} slots remaining)
                </span>
              </h4>
              
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <div 
                  v-for="(preview, index) in previews" 
                  :key="index" 
                  class="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
                >
                  <!-- Always visible remove button -->
                  <button 
                    @click.stop="removeImage(index)"
                    class="absolute top-2 right-2 z-10 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-100 hover:bg-red-600 transition-colors duration-200"
                    :title="'Remove image ' + (index + 1)"
                  >
                    <i class="fas fa-times text-xs"></i>
                  </button>
                  
                  <img 
                    :src="preview" 
                    class="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105" 
                    :alt="`Property image ${index + 1}`"
                  />
                  
                  <!-- Hover overlay with remove button (kept for larger screens) -->
                  <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center md:hidden">
                    <button 
                      @click.stop="removeImage(index)"
                      class="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                      :title="'Remove image ' + (index + 1)"
                    >
                      <i class="fas fa-trash-alt text-sm"></i>
                    </button>
                  </div>
                  
                  <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <p class="text-white text-xs truncate">
                      {{ images[index].name || `Image ${index + 1}` }}
                    </p>
                    <p class="text-white/80 text-[10px] mt-0.5">
                      {{ formatFileSize(images[index].size) }}
                    </p>
                  </div>
                </div>
                
                <!-- Add more images button -->
                <div 
                  v-if="previews.length < 10"
                  @click="triggerFileInput"
                  class="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <i class="fas fa-plus text-gray-400 text-xl mb-2"></i>
                  <span class="text-xs text-gray-500 font-medium">Add more</span>
                </div>
                <!-- Hidden file input for 'Add more' -->
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  @change="handleImageUpload" 
                  class="hidden" 
                  ref="fileInputAddMore"
                />
              </div>
              
              <div class="mt-3 text-xs text-gray-500 flex items-start">
                <i class="fas fa-info-circle mr-1.5 mt-0.5"></i>
                <span>You can upload up to 10 images. First image will be used as the cover.</span>
              </div>
            </div>
          </div>  
          <!-- Property Description -->
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-gray-900">Property Description</h3>
              <span class="text-sm text-gray-500">{{ form.description ? form.description.length : 0 }}/2000</span>
            </div>
            <p class="text-sm text-gray-500 mb-4">
              Write a detailed description of your property. Include information about the neighborhood, 
              nearby amenities, and what makes your property special.
            </p>
            <div class="mt-1">
              <textarea
                v-model="form.description"
                rows="6"
                maxlength="2000"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
                placeholder="Describe your property in detail..."
              ></textarea>
            </div>
            <div class="mt-2 flex justify-between text-sm text-gray-500">
              <p class="text-xs">Be descriptive to attract more renters</p>
              <p class="text-xs">{{ 2000 - (form.description ? form.description.length : 0) }} characters remaining</p>
            </div>
          </div>

          <!-- Property Features -->
          <div class="space-y-6">
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Property Features</h3>
              <p class="text-sm text-gray-500 mb-6">Select all the features and amenities your property offers.</p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Feature: Furnished -->
                <div class="relative flex items-start group">
                  <div class="flex items-center h-5">
                    <input 
                      id="isFurnished" 
                      v-model="form.features.isFurnished" 
                      type="checkbox" 
                      class="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded transition-all duration-200"
                    />
                  </div>
                  <div class="ml-3">
                    <label for="isFurnished" class="block text-sm font-medium text-gray-700">Fully Furnished</label>
                    <p class="text-xs text-gray-500">Includes furniture and appliances</p>
                  </div>
                </div>

                <!-- Feature: Pets Allowed -->
                <div class="relative flex items-start group">
                  <div class="flex items-center h-5">
                    <input 
                      id="petsAllowed" 
                      v-model="form.features.petsAllowed" 
                      type="checkbox" 
                      class="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded transition-all duration-200"
                    />
                  </div>
                  <div class="ml-3">
                    <label for="petsAllowed" class="block text-sm font-medium text-gray-700">Pets Allowed</label>
                    <p class="text-xs text-gray-500">Pet-friendly property</p>
                  </div>
                </div>

                <!-- Feature: Parking -->
                <div class="relative flex items-start group">
                  <div class="flex items-center h-5">
                    <input 
                      id="hasParking" 
                      v-model="form.features.parking" 
                      type="checkbox" 
                      class="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded transition-all duration-200"
                    />
                  </div>
                  <div class="ml-3">
                    <label for="hasParking" class="block text-sm font-medium text-gray-700">Parking Space</label>
                    <p class="text-xs text-gray-500">Dedicated parking available</p>
                  </div>
                </div>

                <!-- Feature: Security -->
                <div class="relative flex items-start group">
                  <div class="flex items-center h-5">
                    <input 
                      id="hasSecurity" 
                      v-model="form.features.security" 
                      type="checkbox" 
                      class="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded transition-all duration-200"
                    />
                  </div>
                  <div class="ml-3">
                    <label for="hasSecurity" class="block text-sm font-medium text-gray-700">24/7 Security</label>
                    <p class="text-xs text-gray-500">Round-the-clock security</p>
                  </div>
                </div>

                <!-- Feature: WiFi -->
                <div class="relative flex items-start group">
                  <div class="flex items-center h-5">
                    <input 
                      id="hasWifi" 
                      v-model="form.features.wifi" 
                      type="checkbox" 
                      class="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded transition-all duration-200"
                    />
                  </div>
                  <div class="ml-3">
                    <label for="hasWifi" class="block text-sm font-medium text-gray-700">High-Speed WiFi</label>
                    <p class="text-xs text-gray-500">Fast internet connection</p>
                  </div>
                </div>

                <!-- Feature: Air Conditioning -->
                <div class="relative flex items-start group">
                  <div class="flex items-center h-5">
                    <input 
                      id="hasAirConditioning" 
                      v-model="form.features.airConditioning" 
                      type="checkbox" 
                      class="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded transition-all duration-200"
                    />
                  </div>
                  <div class="ml-3">
                    <label for="hasAirConditioning" class="block text-sm font-medium text-gray-700">Air Conditioning</label>
                    <p class="text-xs text-gray-500">Cooling system available</p>
                  </div>
                </div>

                <!-- Feature: Balcony -->
                <div class="relative flex items-start group">
                  <div class="flex items-center h-5">
                    <input 
                      id="hasBalcony" 
                      v-model="form.features.balcony" 
                      type="checkbox" 
                      class="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded transition-all duration-200"
                    />
                  </div>
                  <div class="ml-3">
                    <label for="hasBalcony" class="block text-sm font-medium text-gray-700">Balcony</label>
                    <p class="text-xs text-gray-500">Outdoor space available</p>
                  </div>
                </div>

                <!-- Parking Spots -->
                <div class="relative flex items-start group">
                  <div class="w-full">
                    <label for="parkingSpots" class="block text-sm font-medium text-gray-700 mb-1">Parking Spots</label>
                    <div class="mt-1">
                      <input 
                        type="number" 
                        id="parkingSpots"
                        v-model.number="form.features.parkingSpots" 
                        min="0"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                        placeholder="Number of parking spots"
                      />
                    </div>
                  </div>
                </div>

                <!-- Year Built -->
                <div class="relative flex items-start group">
                  <div class="w-full">
                    <label for="yearBuilt" class="block text-sm font-medium text-gray-700 mb-1">Year Built</label>
                    <div class="mt-1">
                      <input 
                        type="number" 
                        id="yearBuilt"
                        v-model.number="form.features.yearBuilt" 
                        :max="new Date().getFullYear()"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                        placeholder="Year of construction"
                      />
                    </div>
                  </div>
                </div>

                <!-- Floor -->
                <div class="relative flex items-start group">
                  <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Floor</label>
                    <div class="flex items-center space-x-2">
                      <input 
                        type="number" 
                        v-model.number="form.features.floor" 
                        min="0" 
                        class="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                        placeholder="Floor"
                      />
                      <span class="text-gray-500 text-sm">of</span>
                      <input 
                        type="number" 
                        v-model.number="form.features.totalFloors" 
                        min="1" 
                        class="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                        placeholder="Total"
                      />
                    </div>
                  </div>
                </div>

                <!-- Available From -->
                <div class="relative flex items-start group">
                  <div class="w-full">
                    <label for="availableFrom" class="block text-sm font-medium text-gray-700 mb-1">Available From</label>
                    <div class="mt-1">
                      <input 
                        type="date" 
                        id="availableFrom"
                        v-model="form.availableFrom" 
                        :min="new Date().toISOString().split('T')[0]" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </section>

      <!-- Success/Error Messages -->
      <div v-if="successMessage" class="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          {{ successMessage }}
        </div>
      </div>
      
      <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="whitespace-pre-line">{{ errorMessage }}</span>
        </div>
      </div>

      <div class="mt-8 space-y-4">
        <!-- Progress Bar -->
        <div v-if="uploadProgress > 0 && uploadProgress < 100" class="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            class="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
            :style="{ width: `${uploadProgress}%` }"
          ></div>
        </div>
        
        <div class="flex flex-col sm:flex-row justify-end gap-4">
          <button 
            type="button"
            @click="router.push('/')" 
            :disabled="isLoading"
            class="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          
          <button 
            type="button"
            @click="handleSubmit"
            :disabled="isLoading || !isFormValid"
            class="relative bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-600 active:from-blue-800 active:to-blue-700 transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed flex items-center justify-center min-w-[180px] overflow-hidden"
          >
            <span v-if="isLoading" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span class="relative z-10">{{ uploadProgress > 0 ? 'Uploading...' : 'Processing...' }}</span>
            </span>
            <span v-else class="relative z-10">Publish Listing</span>
            <!-- Active state overlay -->
            <span class="absolute inset-0 bg-black opacity-0 active:opacity-10 transition-opacity"></span>
          </button>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t mt-auto">
      <div class="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-8 text-gray-600">
        <div>
          <div class="font-bold text-gray-800 mb-2">HAY</div>
          <div class="mb-2">Subscribe to stay informed with the latest insights and updates—delivered straight to your inbox.</div>
          <form class="flex">
            <input type="email" placeholder="Enter your email" class="flex-1 border border-gray-300 rounded-l px-3 py-2" />
            <button class="bg-blue-600 text-white px-4 py-2 rounded-r">Subscribe</button>
          </form>
        </div>
        <div>
          <div class="font-bold mb-2">Quick Links</div>
          <ul class="space-y-1">
            <li><RouterLink to="/properties" class="hover:text-blue-600">Browse Properties</RouterLink></li>
            <li><RouterLink to="/add-listing" class="hover:text-blue-600">List Your Property</RouterLink></li>
            <li><RouterLink to="/how" class="hover:text-blue-600">How it Works</RouterLink></li>
            <li><RouterLink to="/faq" class="hover:text-blue-600">FAQ</RouterLink></li>
          </ul>
        </div>
        <div>
          <div class="font-bold mb-2">Contact & Social Media</div>
          <div class="mb-2">098856661<br/>hay@gmail.com</div>
          <div class="flex space-x-3">
            <a href="#" class="hover:text-blue-600"><i class="fab fa-facebook"></i></a>
          </div>
        </div>
      </div>
      <div class="text-center text-xs text-gray-400 py-4 border-t">© 2025 HAY. All rights reserved. <RouterLink to="/privacy" class="hover:text-blue-600">Privacy Policy</RouterLink></div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import api from '@/api/axios';

const router = useRouter();
const authStore = useAuthStore();

// Form state
const isLoading = ref(false);
const uploadProgress = ref(0);
const errorMessage = ref('');
const successMessage = ref('');
const images = ref([]);
const previews = ref([]);
const uploadErrors = ref([]);
const isDragging = ref(false);
const fileInput = ref(null);

// Refs
const fileInputAddMore = ref(null);

// Check if user is authenticated
onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login?redirect=/add-listing');
  }
});

// Initial form state
const initialFormState = {
  // Personal Info
  fullName: authStore.user?.name || '',
  phone: authStore.user?.phone || '',
  email: authStore.user?.email || '',
  facebook: '',
  telegram: '',
  whatsapp: '',
  
  // Property Info
  title: '',
  description: '',
  propertyType: '',
  price: '',
  bedrooms: 1,
  bathrooms: 1,
  area: '',
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Ethiopia'
  },
  features: {
    furnished: false,
    petsAllowed: false,
    parking: false,
    security: false,
    wifi: false,
    airConditioning: false,
    balcony: false,
    parkingSpots: 0,
    yearBuilt: '',
    floor: 1,
    totalFloors: 1
  },
  availableFrom: new Date().toISOString().split('T')[0] // Today's date
};

// Form fields with validation
const form = ref({ ...initialFormState });

// Individual refs for owner information
const fullName = ref(authStore.user?.name || '');
const email = ref(authStore.user?.email || '');
const phone = ref(authStore.user?.phone || '');
const telegram = ref(authStore.user?.telegram || '');
const facebook = ref('');
const whatsapp = ref('');

// Handle image upload
const handleImageUpload = (event) => {
  const files = Array.from(event.target.files);
  if (!files.length) return;
  
  // Clear previous errors
  errorMessage.value = '';
  
  // Filter out files that are too large
  const validFiles = files.filter(file => {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      errorMessage.value = `Some images exceed the 5MB size limit and were not added.`;
      return false;
    }
    return true;
  });
  
  // Limit to 10 images total
  const remainingSlots = 10 - images.value.length;
  if (validFiles.length > remainingSlots) {
    errorMessage.value = `You can only upload up to 10 images. ${remainingSlots} slots remaining.`;
    validFiles.splice(remainingSlots);
  }
  
  // Add new files to the images array
  images.value.push(...validFiles);
  
  // Create previews for new images
  validFiles.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      previews.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  });
  
  // Reset the file input to allow re-uploading the same file
  event.target.value = '';
};

// Trigger file input for 'Add more' button
const triggerFileInput = () => {
  // Use the appropriate file input based on whether we're adding the first image or more
  const input = previews.value.length > 0 
    ? fileInputAddMore.value 
    : fileInput.value;
  if (input) {
    input.click();
  }
};

// Format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Handle drag over
const handleDragOver = (e) => {
  e.preventDefault();
  isDragging.value = true;
};

// Handle drop
const handleDrop = (e) => {
  e.preventDefault();
  isDragging.value = false;
  
  const files = Array.from(e.dataTransfer.files);
  if (files.length > 0) {
    handleImageUpload({ target: { files } });
  }
};

// Remove image
const removeImage = (index) => {
  previews.value.splice(index, 1);
  images.value.splice(index, 1);
};

// Form validation
const isFormValid = computed(() => {
  return (
    form.value.title &&
    form.value.propertyType &&
    form.value.price &&
    form.value.address.city &&
    form.value.address.street &&
    images.value.length >= 1
  );
});

// Handle form submission
const handleSubmit = async () => {
  if (!isFormValid.value) {
    errorMessage.value = 'Please fill in all required fields and upload at least one image.';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';
  successMessage.value = '';
  uploadErrors.value = [];

  try {
    // First, upload images
    const imageUrls = [];
    uploadProgress.value = 0;
    
    // Get the current token from the auth store
    const token = authStore.token || localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No authentication token found. Please log in again.');
    }
    
    if (images.value.length === 0) {
      throw new Error('Please select at least one image to upload');
    }
    
    try {
      const formData = new FormData();
      
      // Append all images to the FormData object with the field name 'images'
      images.value.forEach((image, index) => {
        formData.append('images', image);
        console.log(`Adding image ${index + 1}:`, image.name, 'Size:', image.size, 'Type:', image.type);
      });
      
      console.log('Uploading', images.value.length, 'images with token:', token ? 'Token exists' : 'No token');
      
      const uploadResponse = await api.post('/properties/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          uploadProgress.value = Math.min(progress, 90); // Cap at 90% for upload
        }
      });
      
      console.log('Upload response:', uploadResponse.data);
      
      if (uploadResponse.data?.data?.urls?.length) {
        imageUrls.push(...uploadResponse.data.data.urls);
      } else {
        throw new Error('No image URLs returned from server');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      const errorMsg = error.response?.data?.message || 
                     error.message || 
                     error.response?.data?.error?.message || 
                     'Something went wrong!';
      console.error('Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      uploadErrors.value.push(`Error uploading images: ${errorMsg}`);
      
      // If we have upload errors, don't proceed with creating the property
      if (uploadErrors.value.length > 0) {
        throw new Error('Failed to upload images');
      }
    }

    // If there were upload errors but we have some images, continue with a warning
    if (uploadErrors.value.length > 0 && imageUrls.length === 0) {
      throw new Error('Failed to upload any images. Please try again.');
    }

    // Prepare property data with owner information from the form
    const propertyData = {
      title: form.value.title,
      description: form.value.description,
      propertyType: form.value.propertyType,
      price: Number(form.value.price),
      bedrooms: Number(form.value.bedrooms),
      bathrooms: Number(form.value.bathrooms),
      area: Number(form.value.area),
      address: {
        street: form.value.address.street,
        city: form.value.address.city,
        state: form.value.address.state,
        zipCode: form.value.address.zipCode,
        country: 'Ethiopia'
      },
      images: imageUrls,
      // Owner information from form
      ownerName: fullName.value,
      ownerEmail: email.value,
      ownerPhone: phone.value,
      // Social media from form
      ownerTelegram: telegram.value,
      ownerFacebook: facebook.value,
      ownerWhatsapp: whatsapp.value,
      // Contact information for queries
      contactPhone: phone.value,
      contactEmail: email.value,
      availableFrom: new Date(form.value.availableFrom),
      // Map features
      features: {
        isFurnished: form.value.features?.isFurnished || false,
        petsAllowed: form.value.features?.petsAllowed || false,
        parkingSpots: Number(form.value.features?.parkingSpots) || 0,
        yearBuilt: form.value.features?.yearBuilt ? Number(form.value.features.yearBuilt) : null,
        floor: Number(form.value.features?.floor) || 1,
        totalFloors: Number(form.value.features?.totalFloors) || 1
      }
    };

    // Create the property listing
    uploadProgress.value = 95;
    const response = await api.post('/properties', propertyData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    
    uploadProgress.value = 100;
    successMessage.value = 'Property listed successfully!';
    
    // Reset form
    form.value = { ...initialFormState };
    images.value = [];
    previews.value = [];
    
    // Redirect to the property detail page after a short delay
    setTimeout(() => {
      router.push(`/properties/${response.data.data._id}`);
    }, 1500);
    
  } catch (error) {
    console.error('Error creating property:', error);
    let errorMsg = error.response?.data?.message || 'Failed to create property. Please try again.';
    
    // Add validation errors if they exist
    if (error.response?.data?.errors) {
      const validationErrors = Object.values(error.response.data.errors)
        .map(err => Array.isArray(err) ? err.join(', ') : err)
        .join('\n');
      errorMsg += `\n\n${validationErrors}`;
    }
    
    // Add upload errors if they exist
    if (uploadErrors.value.length > 0) {
      errorMsg += '\n\nUpload issues:\n' + uploadErrors.value.join('\n');
    }
    
    errorMessage.value = errorMsg;
  } finally {
    isLoading.value = false;
    uploadProgress.value = 0;
  }
};

// Format price for display
const formatPrice = (value) => {
  if (!value) return '';
  return new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency: 'ETB',
    minimumFractionDigits: 0
  }).format(value);
};
</script>

<style scoped>
/* Custom checkbox styling */
input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 1.5px solid #d1d5db;
  border-radius: 0.375rem;
  width: 1.25rem;
  height: 1.25rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  background-color: white;
  flex-shrink: 0;
}

input[type="checkbox"]:checked {
  background-color: #059669;
  border-color: #059669;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 75% 75%;
}

/* Hover and focus states */
input[type="checkbox"]:hover {
  border-color: #9ca3af;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

input[type="checkbox"]:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
}

/* Form input styles */
input[type="text"],
input[type="number"],
input[type="tel"],
input[type="email"],
input[type="date"],
input[type="password"],
textarea,
select {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.65rem 1rem;
  padding-left: 2.75rem; /* Add left padding for icons */
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  width: 100%;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #1f2937;
  background-color: #fff;
}

/* Remove left padding when there's no icon */
input:not([class*="pl-"]),
input[class*="pl-0"] {
  padding-left: 1rem;
}

/* Position icons properly */
.relative .absolute {
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
  left: 0.75rem;
}

/* Adjust icon size and color */
.relative .absolute svg {
  width: 1.25rem;
  height: 1.25rem;
  color: #9ca3af;
}

/* Adjust height for textarea */
textarea {
  min-height: 120px;
  resize: vertical;
}

input[type="text"]:focus,
input[type="number"]:focus,
input[type="tel"]:focus,
input[type="email"]:focus,
input[type="date"]:focus,
textarea:focus,
select:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
  outline: none;
}

/* Feature card hover effect */
.feature-card {
  transition: all 0.2s ease-in-out;
  border-radius: 0.75rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
}

.feature-card:hover {
  border-color: #10b981;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  transform: translateY(-2px);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>
