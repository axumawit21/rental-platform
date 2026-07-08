<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      <div class="md:flex md:items-center md:justify-between mb-6">
        <div class="flex-1 min-w-0">
          <h2 class="text-2xl font-bold text-gray-900">
            Profile Settings
          </h2>
        </div>
      </div>

      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-8 py-5 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">
            Personal Information
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Update your personal details and contact information
          </p>
        </div>
        
        <div class="px-8 py-6">
          <form @submit.prevent="handleUpdateProfile" class="space-y-6">
            <!-- Name -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
              <div class="mt-1">
                <input
                  type="text"
                  id="name"
                  v-model="form.name"
                  class="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                />
              </div>
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <div class="mt-1">
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  class="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm bg-gray-50 text-gray-500"
                  disabled
                />
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Contact support to change your email address.
              </p>
            </div>

            <!-- Phone -->
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
              <div class="mt-1">
                <input
                  type="tel"
                  id="phone"
                  v-model="form.phone"
                  class="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                  placeholder="+251XXXXXXXXX"
                />
              </div>
            </div>

            <!-- Bio -->
            <div>
              <label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
              <div class="mt-1">
                <textarea
                  id="bio"
                  v-model="form.bio"
                  rows="3"
                  class="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>
            </div>

            <!-- Profile Photo -->
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Profile Photo
              </label>
              <div class="flex items-start space-x-8">
                <div class="flex-shrink-0">
                  <span class="h-16 w-16 rounded-full overflow-hidden bg-gray-100 block">
                    <img
                      v-if="form.photoUrl"
                      class="h-full w-full object-cover"
                      :src="form.photoUrl"
                      alt="Profile"
                    />
                    <svg
                      v-else
                      class="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                </div>
                <div class="space-y-3">
                  <button
                    type="button"
                    class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    @click="triggerFileUpload"
                  >
                    Change photo
                  </button>
                  <p class="text-xs text-gray-500">JPG, GIF or PNG. Max 1MB.</p>
                  <input
                    type="file"
                    ref="fileInput"
                    class="hidden"
                    accept="image/*"
                    @change="handleFileUpload"
                  />
                </div>
              </div>
            </div>

            <!-- Change Password Section -->
            <div class="pt-6 border-t border-gray-200 mt-6">
              <h3 class="text-lg font-medium text-gray-900">Change Password</h3>
              <p class="mt-2 text-sm text-gray-500 mb-4">
                Leave these fields empty if you don't want to change your password
              </p>
              <div class="space-y-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <label for="current-password" class="block text-sm font-medium text-gray-700">Current Password</label>
                  <div class="mt-1">
                    <input
                      type="password"
                      id="current-password"
                      v-model="form.currentPassword"
                      class="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label for="new-password" class="block text-sm font-medium text-gray-700">New Password</label>
                  <div class="mt-1">
                    <input
                      type="password"
                      id="new-password"
                      v-model="form.newPassword"
                      class="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <div class="mt-1">
                    <input
                      type="password"
                      id="confirm-password"
                      v-model="form.confirmPassword"
                      class="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Save Button -->
            <div class="pt-5 border-t border-gray-200">
              <div class="flex justify-end space-x-3">
                <button
                  type="button"
                  class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  @click="resetForm"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  :disabled="isLoading"
                  class="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="isLoading" class="inline-flex items-center">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                  <span v-else>Save Changes</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';
import { getProfile, updateProfile, uploadProfilePhoto } from '../api/profile';

const authStore = useAuthStore();
const fileInput = ref(null);
const isLoading = ref(false);

const form = ref({
  name: '',
  email: '',
  phone: '',
  bio: '',
  photoUrl: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const router = useRouter();

// Load user data
onMounted(async () => {
  await loadUserData();
});

const loadUserData = async () => {
  try {
    const response = await getProfile();
    const userData = response.data;
    
    form.value = {
      ...form.value,
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      bio: userData.bio || '',
      photoUrl: userData.photo ? `http://localhost:9000/uploads/users/${userData.photo}` : ''
    };
  } catch (error) {
    console.error('Failed to load user data:', error);
  }
};

const triggerFileUpload = () => {
  fileInput.value.click();
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Simple client-side preview
  const reader = new FileReader();
  reader.onload = (e) => {
    form.value.photoUrl = e.target.result;
  };
  reader.readAsDataURL(file);
  
  // Upload the file to the server
  try {
    await uploadProfilePhoto(file);
    // Reload user data to get the updated photo URL
    await loadUserData();
  } catch (error) {
    console.error('Failed to upload profile photo:', error);
    alert(error.response?.data?.message || 'Failed to upload profile photo');
  }
};

const handleUpdateProfile = async () => {
  try {
    isLoading.value = true;
    
    // Basic validation
    if (form.value.newPassword && form.value.newPassword !== form.value.confirmPassword) {
      throw new Error('New passwords do not match');
    }
    
    // Prepare update data
    const updateData = {
      name: form.value.name,
      phone: form.value.phone,
      bio: form.value.bio
    };
    
    // Add password fields if new password is provided
    if (form.value.newPassword) {
      if (!form.value.currentPassword) {
        throw new Error('Please enter your current password to change your password');
      }
      updateData.currentPassword = form.value.currentPassword;
      updateData.newPassword = form.value.newPassword;
    }
    
    // Send single update request
    await updateProfile(updateData);
    
    // Reload user data
    await loadUserData();
    
    // Show success message
    alert('Profile updated successfully!');
    
    // Reset password fields
    form.value.currentPassword = '';
    form.value.newPassword = '';
    form.value.confirmPassword = '';
    
  } catch (error) {
    console.error('Error updating profile:', error);
    alert(error.response?.data?.message || error.message || 'Failed to update profile');
  } finally {
    isLoading.value = false;
  }
};

const resetForm = () => {
  loadUserData();
  form.value.currentPassword = '';
  form.value.newPassword = '';
  form.value.confirmPassword = '';
};
</script>
