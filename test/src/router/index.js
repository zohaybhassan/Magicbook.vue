import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import LoginPage from '../views/LoginPage.vue';
import SignupPage from '../views/SignupPage.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import HomePage from '../views/Home.vue'; // Import the Home component

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
  {
    path: '/admin',
    name: 'Admin',
    component: AdminDashboard,
    meta: { requiresAuth: true }  // Requires user to be authenticated
  },
  {
    path: '/home', // Add the Home route
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true }  // Requires user to be authenticated
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  const currentUser = store.getters.currentUser;

  if (isAuthenticated) {
    if (to.path === '/signup') {
      next('/admin'); // Redirect to admin page if authenticated
    } else if (to.path === '/logout') {
      store.dispatch('logout').then(() => {
        next('/login'); // Redirect to login page after logout
      });
    } else if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  } else {
    if (to.matched.some(record => record.meta.requiresUnauth) && isAuthenticated) {
      next('/admin'); // Redirect to admin page if authenticated and trying to access a signup page
    } else {
      next();
    }
  }
});

export default router;
