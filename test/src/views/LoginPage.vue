<template>
  <div class="login-container d-flex vh-100">
    <div class="left-container d-flex flex-column align-items-center justify-content-center w-50">
      <img src="@/assets/Online Book Library.png" alt="Online Book Library" class="logo mb-3">
      <div class="login-form w-75">
        <h1 class="mb-4">Login</h1>
        <form @submit.prevent="login">
          <input v-model="email" type="email" placeholder="Email" required class="form-control mb-2">
          <input v-model="password" type="password" placeholder="Password" required class="form-control mb-2">
          <button type="submit" class="btn btn-primary  w-100 mb-2">Login</button>
          <p class="text-center">Don't have an account? <router-link to="/signup">Sign up here</router-link></p>
        </form>
      </div>
    </div>
    <div class="right-container position-relative">
      <div class="overlay-text text-center">Welcome to MagicBook</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      console.log('Attempting to login with', this.email, this.password);
      // Add your authentication logic here
    }
  }
}
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
.login-form {
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
  background-color: #0056b3;
  color: white;
  border: none;
}

button:hover {
  background-color: #003580;
}

router-link {
  color: #0056b3;
  text-decoration: none;
}

router-link:hover {
  text-decoration: underline;
}
</style>
