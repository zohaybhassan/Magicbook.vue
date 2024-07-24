<template>
  <div class="login-container d-flex vh-100">
    <div class="left-container d-flex flex-column align-items-center justify-content-center w-50">
      <img src="@/assets/Online Book Library.png" alt="Online Book Library" class="logo mb-3">
      <p class="tagline mb-4">Dive into a magical journey!</p>
      <div class="login-form w-75">
        <h1 class="mb-4">Login</h1>
        <form @submit.prevent="performLogin">
          <input v-model="email" type="email" placeholder="Email" required class="form-control mb-2">
          <div class="position-relative">
            <input 
              v-model="password" 
              type="password" 
              placeholder="Password" 
              required 
              class="form-control mb-2"
              @keydown="checkCapsLock"
              @keyup="checkCapsLock"
              ref="passwordInput"
            >
            <div v-if="capsLockActive" class="caps-lock-warning">
              <span>Caps Lock is ON</span>
            </div>
          </div>
          <button type="submit" class="btn btn-primary w-100 mb-2">Login</button>
          <p class="text-center">Don't have an account? <router-link to="/signup">Sign up here</router-link></p>
        </form>
      </div>
    </div>
    <div class="right-container position-relative">
      <div class="background-overlay"></div>
      <div class="overlay-text text-center">Welcome to MagicBook</div> 
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js';
import Swal from 'sweetalert2';

const ADMIN_EMAIL = 'admin@example.com'; // Admin email
const ADMIN_PASSWORD = 'admin123'; // Admin password

export default {
  name: 'LoginPage',
  setup() {
    const email = ref('');
    const password = ref('');
    const capsLockActive = ref(false);
    const store = useStore();
    const router = useRouter();

    const checkCapsLock = (event) => {
      // Check if Caps Lock is active
      capsLockActive.value = event.getModifierState('CapsLock');
    };

    const performLogin = async () => {
      try {
        if (email.value === ADMIN_EMAIL && password.value === ADMIN_PASSWORD) {
          await signInWithEmailAndPassword(auth, email.value, password.value);
          router.push('/admin');
          Swal.fire('Success', 'Login successful! \n Welcome to Magic World!', 'success');
        } else {
          Swal.fire('Error', 'Invalid credentials or an error occurred.', 'error');
        }
      } catch (error) {
        console.error('Login error:', error);
        Swal.fire('Error', 'Invalid credentials or an error occurred.', 'error');
      }
    };

    return {
      email,
      password,
      capsLockActive,
      checkCapsLock,
      performLogin
    };
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  height: 100vh;
}

.left-container, .right-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.right-container {
  background-image: url('@/assets/ffml.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  padding: 0px !important;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.51); /* 41% opacity to make the total opacity 59% */
}

.login-form {
  width: 100%;
  max-width: 320px;
  z-index: 2; /* Ensure the form is above the overlay */
  position: relative;
}

.login-form h1 {
  margin-top: -10px;
  font-weight: bold;
  font-size: large;
  text-decoration: underline;
  color: #0056b3;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay-text {
  top: 43%;
  right: 0%;
  position: absolute;
  width: 100% !important;
  color: white;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 0px;
  margin: 0px !important;
}

.logo {
  margin-top: -80px;
  max-height: 430px;
  margin-bottom: 10px;
}

.tagline {
  margin-top: -150px;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  color: #08197a;
  text-align: center;
  font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
}

input, button {
  width: 100%;
}

button {
  background-color: #0056b3;
  color: white;
  border: none;
}

button:hover {
  background-color: #003580;
}

a {
  color: #0056b3;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.caps-lock-warning {
  position: absolute;
  right: -40%; /* Adjust this value to position the warning correctly */
  top: 50%;
  transform: translateY(-50%);
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  z-index: 3; /* Ensure it is above other elements */
}
</style>
