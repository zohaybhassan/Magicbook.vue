import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';  
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import SignupPage from '../views/SignupPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/login'  // Redirect root to the login page
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { requiresUnauth: true }  // Only accessible if not authenticated
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupPage,
    meta: { requiresUnauth: true }  // Only accessible if not authenticated
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guards to check authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // Redirect to login page if not authenticated and trying to access a restricted page
    next('/login');
  } else if (to.matched.some(record => record.meta.requiresUnauth) && isAuthenticated) {
    // Redirect to home page if authenticated and trying to access login or signup
    next('/home');
  } else {
    next();  // proceed to route
  }
});

export default router;