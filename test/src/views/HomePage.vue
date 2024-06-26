<template>

      <div class="navigation-buttons">
        <router-link to="/login" class="button">Login</router-link>
        <router-link to="/signup" class="button">Signup</router-link>
      </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage'
  }
  </script>
  
  <style scoped>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
  }
  
  .button {
    margin: 10px;
    padding: 10px 20px;
    background-color: #42b983; /* Vue green color; adjust as needed */
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .button:hover {
    background-color: #333;
  }
  </style>
  