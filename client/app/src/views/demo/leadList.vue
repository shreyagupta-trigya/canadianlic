<template>
    <div class="overflow-auto">
      <!-- Pagination component -->
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
  
      <p class="mt-3">Current Page: {{ currentPage }}</p>
  
      <!-- Table component -->
      <b-table
        id="my-table"
        :items="paginatedItems"
        :per-page="perPage"
        :current-page="currentPage"
        small
      ></b-table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        perPage: 3, // Items per page
        currentPage: 1, // Default current page
        items: [] // Array to store fetched data
      };
    },
    computed: {
      // Total number of rows (computed from the items array)
      rows() {
        return this.items.length;
      },
      // Get items for the current page
      paginatedItems() {
        const start = (this.currentPage - 1) * this.perPage;
        const end = start + this.perPage;
        return this.items.slice(start, end);
      }
    },
    mounted() {
      // Fetch data when component is mounted
      this.fetchData();
    },
    methods: {
      async fetchData() {
        try {
          const response = await fetch("http://localhost:3000/server/lead/api/v1/get-leads");
          if (response.ok) {
            const data = await response.json();
            this.items = data; // Assuming the API returns an array of lead items
          } else {
            console.error("Error fetching data:", response.status);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }
    }
  };
  </script>
  