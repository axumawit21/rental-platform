import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(JSON.parse(localStorage.getItem('user')) || null);
  const token = ref(localStorage.getItem('token') || null);
  const isAuthenticated = computed(() => !!token.value);

  // Actions
  function setAuth(userData, authToken) {
    if (userData && authToken) {
      user.value = userData;
      token.value = authToken;
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', authToken);
    } else {
      // Clear everything on logout
      user.value = null;
      token.value = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }

  function logout() {
    setAuth(null, null);
  }

  // Initialize from localStorage on store creation
  function initialize() {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      user.value = JSON.parse(storedUser);
      token.value = storedToken;
    }
  }

  // Initialize the store
  initialize();

  return { 
    // State
    user,
    token,
    isAuthenticated,
    
    // Actions
    setAuth,
    logout 
  };
});
