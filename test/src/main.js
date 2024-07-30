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


import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB0S8--Jd_4ROu43-liKRWlWaaSunZ-j_Y",
    authDomain: "magic-world-76947.firebaseapp.com",
    projectId: "magic-world-76947", 
    storageBucket: "magic-world-76947.appspot.com",
    messagingSenderId: "1015784520868",
    appId: "1:1015784520868:web:ed6826cc85823db3793a31",
    measurementId: "G-6P1KM1W6P6"
  };
// Dispatch autoLogin action to restore user data before mounting the app
// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export const auth = getAuth(appFirebase); // Export the auth instance
export const db = getFirestore(appFirebase); // Export the Firestore instance

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
