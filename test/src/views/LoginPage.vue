<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required>
        <input v-model="password" type="password" placeholder="Password" required>
        <button type="submit">Login</button>
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
      login() {
        axios.get(`http://localhost:3000/users?email=${this.email}&password=${this.password}`)
        .then(response => {
          if (response.data.length > 0) {
            this.$router.push('/home');
          } else {
            alert('Invalid credentials');
          }
        })
        .catch(error => {
          console.error('Login error:', error);
        });
      }
    }
  }
  </script>
  