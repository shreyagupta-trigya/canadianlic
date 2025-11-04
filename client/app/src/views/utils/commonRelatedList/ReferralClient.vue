<template>
    <div class="app-container">
      <h1>{{ title }}</h1>
      <p>{{ message }}</p>
      <button @click="changeMessage">Click Me</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: 'Welcome to Vue.js!',
        message: 'Hello, this is a sample message.'
      }
    },
    methods: {
      changeMessage() {
        this.message = 'You have clicked the button!';
      }
    }
  }
  </script>
  
  <style scoped>
  .app-container {
    text-align: center;
    margin-top: 50px;
  }
  
  h1 {
    color: #42b983;
  }
  
  button {
    background-color: #42b983;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
  }
  
  button:hover {
    background-color: #369870;
  }
  </style>
  