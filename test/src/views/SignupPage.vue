<template>
  <div class="signup-container d-flex vh-100">
    <div class="left-container d-flex flex-column align-items-center justify-content-center w-50">
      <img src="@/assets/Online Book Library.png" alt="Online Book Library" class="logo mb-3">
      <div class="signup-form w-75">
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
      <div class="overlay-text text-center">Welcome to MagicBook</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SignupPage',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmpassword: ''
    };
  },
  methods: {
    ...mapActions(['registerUser']),
    async performSignup() {
      try {
        const success = await this.registerUser({ name: this.name, email: this.email, password: this.password, confirmpassword: this.confirmpassword });
        if (success) {
          alert('Signup successful. Please login.');
          this.$router.push('/login');
        } else {
          alert('Signup failed. Please try again.');
        }
      } catch (error) {
        console.error('Signup error:', error);
        alert('An error occurred. Please try again.');
      }
    }
  }
}
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
  padding: 0px !important;
}

.signup-form {
  width: 100%;
  max-width: 320px;
  margin-top: -120px; 
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
  margin-top: -120px;
  max-height: 430px;
  margin-bottom: 10px; 
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

router-link {
  color: #28a745;
  text-decoration: none;
}

router-link:hover {
  text-decoration: underline;
}
</style>
