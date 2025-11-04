<!-- Loader.vue -->

<template>
    <div class="loader" v-if="loading">
      <div class="loading-wave">
        <div class="loading-bar"></div>
        <div class="loading-bar"></div>
        <div class="loading-bar"></div>
        <div class="loading-bar"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Loader",
    props: {
      loading: {
        type: Boolean,
        default: false,
      },
    },
  };
  </script>
  
  <style scoped>
  .loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .spinner {
    /* Loader animation styles go here */
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .loading-wave {
    width: 300px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  
  .loading-bar {
    width: 20px;
    height: 10px;
    margin: 0 5px;
    background-color: #3498db;
    border-radius: 5px;
    animation: loading-wave-animation 1s ease-in-out infinite;
  }
  
  .loading-bar:nth-child(2) {
    animation-delay: 0.1s;
  }
  
  .loading-bar:nth-child(3) {
    animation-delay: 0.2s;
  }
  
  .loading-bar:nth-child(4) {
    animation-delay: 0.3s;
  }
  
  @keyframes loading-wave-animation {
    0% {
      height: 10px;
    }
  
    50% {
      height: 50px;
    }
  
    100% {
      height: 10px;
    }
  }
  
  </style>
  