// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './assets/main.css';
import './assets/tailwind.css';
import 'sweetalert2/dist/sweetalert2.min.css'; // Import SweetAlert2 CSS


// Dispatch autoLogin action to restore user data before mounting the app
store.dispatch('autoLogin');

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');

// Dispatch autoLogin action to restore user data before mounting the app
store.dispatch('autoLogin');
