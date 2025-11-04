<template>
  <div>
    <h2>Deal Ownership</h2>
    <input v-model="formData.owner" placeholder="Enter Owner Name" />
    <button @click="nextStep">Next</button>
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
