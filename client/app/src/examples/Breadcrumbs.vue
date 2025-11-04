<template>
  <nav aria-label="breadcrumb">
    <ol
      class="px-0 pt-1 pb-0 mb-0 bg-transparent breadcrumb"
      :class="`${this.$store.state.isRTL ? '' : ' me-sm-6'} ${this.$store.state.isNavFixed ? 'text-dark' : 'text-white' }`"
    >
     
    </ol>
    <h6 class="mb-2 font-weight-bolder title" :class="this.$store.state.isNavFixed ? 'text-dark' : 'text-white'">
      {{ currentPage }}
    </h6>
  </nav>
</template>
<style>
  .title{
    font-size: 25PX;
  }
  @media (max-width:500px){
    .title{
    font-size: 24PX;
  }
  }
</style>
<script>
export default {
  name: "breadcrumbs",
  props: {
    currentPage: {
      required: true
    },
    textWhite: {
      type: String
    }
  }
};
</script>
