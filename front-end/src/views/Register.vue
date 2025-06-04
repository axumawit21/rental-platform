<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create your account
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleRegister">
          <div v-if="errorMessage" class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.293-10.707a1 1 0 011.414 0L10 8.586l.879-.879a1 1 0 111.414 1.414L11.414 10l.879.879a1 1 0 01-1.414 1.414L10 11.414l-.879.879a1 1 0 01-1.414-1.414L8.586 10l-.879-.879a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">
                  {{ errorMessage }}
                </h3>
              </div>
            </div>
          </div>

          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
            <div class="mt-1">
              <input
                id="name"
                v-model="name"
                type="text"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <div class="mt-1">
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
            <div class="mt-1">
              <input
                id="phone"
                v-model="phone"
                type="tel"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="+251XXXXXXXXX"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="mt-1">
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div class="mt-1">
              <input
                id="confirm-password"
                v-model="confirmPassword"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="text-sm">
              <RouterLink to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
                Already have an account? Sign in
              </RouterLink>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '../store/auth';
import api from '../api/axios';

const router = useRouter();
const authStore = useAuthStore();

const name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const handleRegister = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    // Basic validation
    if (!name.value || !email.value || !password.value || !confirmPassword.value) {
      throw new Error('Please fill in all fields');
    }

    if (password.value !== confirmPassword.value) {
      throw new Error('Passwords do not match');
    }

    if (password.value.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    try {
      // Make API call to register user
      const response = await api.post('/auth/register', {
        name: name.value,
        email: email.value,
        phone: phone.value,
        password: password.value,
        role: 'user' // Default role
      });

      const { success, token, user } = response.data;

      if (!success || !token || !user) {
        throw new Error('Registration failed. Please try again.');
      }

      // Store the token in localStorage
      localStorage.setItem('token', token);
      
      // Update auth store with the newly registered user
      authStore.setAuth({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || 'user'
      }, token);

      // Redirect to home page
      router.push('/home');
    } catch (error) {
      console.error('Registration error:', {
        message: error.message,
        response: {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers
        },
        request: error.request,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
          data: error.config?.data
        }
      });
      
      // Handle specific error cases
      if (error.response?.data?.error?.includes('duplicate key error') || 
          (error.response?.data?.message?.includes('already exists') || 
           error.response?.data?.message?.includes('already registered'))) {
        errorMessage.value = 'This email is already registered. Please use a different email or log in.';
      } else if (error.response?.data?.message) {
        errorMessage.value = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage.value = error.response.data.error;
      } else if (error.message) {
        errorMessage.value = error.message;
      } else {
        errorMessage.value = 'Registration failed. Please check your details and try again.';
      }
      
      return; // Prevent the error from being thrown again
    }
  } catch (error) {
    // This outer catch is just a fallback and shouldn't be reached if inner catch works properly
    console.error('Unexpected registration error:', error);
    errorMessage.value = 'An unexpected error occurred. Please try again later.';
  } finally {
    isLoading.value = false;
  }
};
</script>