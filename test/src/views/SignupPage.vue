<template>
  <div class="signup-container d-flex vh-100">
    <div class="left-container d-flex flex-column align-items-center justify-content-center w-50">
      <img src="@/assets/Online Book Library.png" alt="Online Book Library" class="logo mb-3">
      <div class="signup-form w-75">
        <p class="tagline mb-4">Dive into a magical journey!</p>
        <h1 class="mb-4">Sign Up</h1>
        <form @submit.prevent="performSignup">
          <input v-model="name" type="text" placeholder="Enter your full name" required class="form-control mb-2">
          <input v-model="email" type="email" placeholder="Enter your email" required class="form-control mb-2">
          <input v-model="password" type="password" placeholder="Enter your password" required class="form-control mb-2">
          <input v-model="confirmpassword" type="password" placeholder="Confirm your password" required class="form-control mb-2">
          <button type="submit" class="btn btn-success w-100 mb-2">Sign Up</button>
          <p class="text-center">Already have an account? <router-link to="/">Login here</router-link></p>
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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js';
import Swal from 'sweetalert2';
import { collection, addDoc } from "firebase/firestore";
import db from '../firebase.js';

export default {
  name: 'SignupPage',
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const confirmpassword = ref('');

    const store = useStore();
    const router = useRouter();

    const performSignup = async () => {
      // Custom validation
      if (password.value.length < 6) {
        Swal.fire('Error', 'Password must be at least 6 characters long', 'error');
        return;
      }
      if (password.value !== confirmpassword.value) {
        Swal.fire('Error', 'Passwords do not match', 'error');
        return;
      }

      // Additional email validation (if needed)
      if (!email.value.includes('@') || !email.value.includes('.')) {
        Swal.fire('Error', 'Please enter a valid email address', 'error');
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        // Add user to Firestore
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: name.value,
          email: email.value
        });

        router.push('/login');
        Swal.fire('Success', 'Signup successful. Please login.', 'success');
      } catch (error) {
        Swal.fire('Error', 'Signup failed. Please try again.', 'error');
      }
    };

    return {
      name,
      email,
      password,
      confirmpassword,
      performSignup
    };
  }
};
</script>

<style scoped>
.signup-container {
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
  padding: 0 !important;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.51); /* 41% opacity to make the total opacity 59% */
  z-index: 1;
}

.signup-form {
  width: 100%;
  max-width: 320px;
  margin-top: -120px;
  z-index: 2; /* Ensure the form is above the overlay */
}

.signup-form h1 {
  margin-top: -15px;
  font-weight: bold;
  font-size: large;
  text-decoration: underline;
  color: #28a745;
}

.overlay-text {
  top: 43%;
  right: 0;
  position: absolute;
  width: 100% !important;
  color: white;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 0;
  margin: 0 !important;
  z-index: 2; /* Ensure the text is above the overlay */
}

.logo {
  margin-top: -80px;
  max-height: 430px;
  margin-bottom: 10px;
  z-index: 2; /* Ensure the logo is above the overlay */
}

.tagline {
  margin-top: -30px;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  color: #067e2a;
  text-align: center;
  font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
  z-index: 2; /* Ensure the tagline is above the overlay */
}

input, button {
  width: 100%;
}

button {
  background-color: #28a745;
  color: white;
  border: none;
}

button:hover {
  background-color: #218838;
}

a {
  color: #28a745;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
