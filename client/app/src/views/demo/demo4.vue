<template>
    <div>
      <h2>Policy Tracking</h2>
      <input v-model="formData.policy" placeholder="Enter Policy Info" />
      <button @click="nextStep">Submit</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      data: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {
        formData: { ...this.data },
      };
    },
    methods: {
      nextStep() {
        this.$emit('next', this.formData);
      },
    },
  };
  </script>
  
  <style>
  /* Add any required styles here */
  </style>
  