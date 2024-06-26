<template>
    <div>
      <h1>Signup</h1>
      <form @submit.prevent="signup">
        <input v-model="email" type="email" placeholder="Email" required>
        <input v-model="password" type="password" placeholder="Password" required>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      signup() {
        axios.post('http://localhost:3000/users', {
          email: this.email,
          password: this.password
        })
        .then(response => {
          console.log('User created:', response.data);
          this.$router.push('/login');
        })
        .catch(error => {
          console.error('Error signing up:', error);
        });
      }
    }
  }
  </script>
  