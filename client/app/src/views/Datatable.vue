<template>
  <div class="user-list">
    <table class="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Office</th>
          <th>Age</th>
          <th>Start Date</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in paginatedUsers" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.position }}</td>
          <td>{{ user.office }}</td>
          <td>{{ user.age }}</td>
          <td>{{ formatDate(user.startDate) }}</td>
          <td>{{ user.salary }}</td>
        </tr>
        <tr v-for="user in paginatedUsers" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.position }}</td>
          <td>{{ user.office }}</td>
          <td>{{ user.age }}</td>
          <td>{{ formatDate(user.startDate) }}</td>
          <td>{{ user.salary }}</td>
        </tr>
        <tr v-for="user in paginatedUsers" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.position }}</td>
          <td>{{ user.office }}</td>
          <td>{{ user.age }}</td>
          <td>{{ formatDate(user.startDate) }}</td>
          <td>{{ user.salary }}</td>
        </tr>
        <tr v-for="user in paginatedUsers" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.position }}</td>
          <td>{{ user.office }}</td>
          <td>{{ user.age }}</td>
          <td>{{ formatDate(user.startDate) }}</td>
          <td>{{ user.salary }}</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <div class="pagination-info">{{ paginationInfo }}</div>
      <div class="pagination-buttons">
        <button v-for="pageNumber in pages" :key="pageNumber" @click="changePage(pageNumber)" class="page-number"
          :class="{ active: currentPage === pageNumber }">{{ pageNumber }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { verifyUser } from "../verifyUser/verifyUser.js";
import router from "../router/index.js";
export default {

  data() {
    return {
      users: [
        { id: 1, name: 'John', position: 'Developer', office: 'Good', age: 'john@example.com', startDate: '2024-02-20', salary: 'https://via.placeholder.com/50' },
        { id: 2, name: 'Alice', position: 'Designer', office: 'Excellent', age: 'alice@example.com', startDate: '2024-01-20', salary: 'https://via.placeholder.com/50' },
        { id: 3, name: 'Bob', position: 'Manager', office: 'Average', age: 'bob@example.com', startDate: '2024-02-22', salary: 'https://via.placeholder.com/50' }
      ],
      pageSize: 2,
      currentPage: 1
    };
  },
  computed: {
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.users.slice(start, end);
    },
    pageCount() {
      return Math.ceil(this.users.length / this.pageSize);
    },
    pages() {
      const pagesArray = [];
      for (let i = 1; i <= this.pageCount; i++) {
        pagesArray.push(i);
      }
      return pagesArray;
    },
    paginationInfo() {
      const start = (this.currentPage - 1) * this.pageSize + 1;
      const end = Math.min(start + this.pageSize - 1, this.users.length);
      return `Showing ${start}-${end} of ${this.users.length} entries`;
    }
  },
  async beforeMount() {
    const verify = await verifyUser();
    if (!verify) {
      router.push("/signin")
    }
  },
  methods: {
    changePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    }
  }
};
</script>

<style scoped>
.user-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-table {
  width: 80%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 12px;
  height: auto;
  text-align: center;
}

th,
td {

  padding: 8px;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

td:last-child,
th:last-child {
  border-right: none;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
}

.pagination-info {
  padding: 10px;
  flex-grow: 1;
}

.pagination-buttons {
  display: flex;
}

.page-number {
  cursor: pointer;
  margin: 0 5px;
  background-color: #efefef;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.active {
  background-color: #d70807;
  color: #000;
}
</style>