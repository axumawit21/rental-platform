import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
// import About from '../views/About.vue';
import How from '../views/How.vue';
import Contact from '../views/Contact.vue';
import Properties from '../views/Properties.vue';
import AddListing from '../views/AddListing.vue';
import Details from '../views/Details.vue';
import ProfileSettings from '../views/ProfileSettings.vue';

const routes = [  
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/properties',
    name: 'properties',
    component: Properties,
  },
  {
    path: '/how',
    name: 'how',
    component: How,
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: About,
  // },
  {
    path: '/contact',
    name: 'contact',
    component: Contact,
  },
  {
    path: '/add-listing',
    name: 'add-listing',
    component: AddListing,
    meta: { requiresAuth: true }
  },
  {
    path: '/properties/:id',
    name: 'property-details',
    component: Details,
    props: true
  },
  {
    path: '/profile/settings',
    name: 'profile-settings',
    component: ProfileSettings,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  console.log('Navigation from:', from.path, 'to:', to.path);
  const authStore = useAuthStore();
  
  console.log('Auth state - isAuthenticated:', authStore.isAuthenticated);
  console.log('Route meta:', to.meta);
  
  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log('Route requires authentication');
    if (!authStore.isAuthenticated) {
      console.log('User not authenticated, redirecting to login');
      // Redirect to login if not authenticated
      next({ name: 'login', query: { redirect: to.fullPath } });
    } else {
      console.log('User authenticated, proceeding to route');
      next();
    }
  } 
  // Check if the route is for guests only
  else if (to.matched.some(record => record.meta.requiresGuest)) {
    console.log('Route is for guests only');
    if (authStore.isAuthenticated) {
      console.log('User is authenticated, redirecting to home');
      // Redirect to home if already logged in
      next({ name: 'home' });
    } else {
      console.log('User is guest, proceeding to route');
      next();
    }
  } 
  else {
    console.log('No auth requirements, proceeding to route');
    next();
  }
});

export default router
