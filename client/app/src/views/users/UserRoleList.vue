<template>
  <div class="card me-2" style="min-height: 90vh;">
    <!-- Header Section -->
    <div class="pb-0 mt-3 pe-2">
      <div class="d-flex justify-content-end align-items-center">
        <div class="d-flex align-items-center">
          <div class="row justify-content-center mx-1">
            <!-- <button @click="showSearchDetails" type="button" class="btn search-btn-list"><span
                class="fa fa-search cursor-pointer"></span>
            </button> -->

          </div>
          <router-link :to="`/user-role`" class="mx-1">
            <button class="mb-0 btn new-btn-list btn-sm">+ New</button>
          </router-link>
        </div>
        <div class="dropdown mx-1">
          <button class="btn ellipsis-btn-list " data-bs-toggle="dropdown" aria-expanded="false"
            id="dropdownMenuButton1">
            <p class=" fs-6 mb-0 cursor-pointer m-0 text-bold fs-5 fw-bold fa fa-ellipsis-v"></p>
          </button>
        </div>
      </div>
    </div>
    <!-- Header Section ends -->

    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th>
                <div class="d-flex">
                  <div class="my-auto form-check px-2" style="margin-left: 10px">
                    <input id="customCheck1" class="form-check-input" type="checkbox" />
                  </div>
                </div>
              </th>
              <th
                class="text-uppercase text-secondary thead-color text-lg font-weight-bolder opacity-7 table-list-font ">
                Actions
              </th>
             
              <th
                class="text-uppercase text-secondary thead-color text-lg font-weight-bolder opacity-7 table-list-font">
                Role
              </th>
              <th
                class="text-uppercase text-secondary thead-color text-lg font-weight-bolder opacity-7 table-list-font">
                Description
              </th>                
              <th
                class="text-uppercase text-secondary thead-color text-lg font-weight-bolder opacity-7 table-list-font">
                Created By
              </th>                
              <th
                class="text-uppercase text-secondary thead-color text-lg font-weight-bolder opacity-7 table-list-font">
                Created At
              </th>                
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in paginatedUsers" :key="index" router-link :to="'/user-role/' + user.appUsersRole.ROWID">
              <td class="align-middle th-align-middle">
                <div class="form-check">
                  <input :id="'customCheck' + index" class="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>                 
                <router-link :to="'/user-role/' + user.appUsersRole.ROWID">
                  <a href="javascript:;" class="mx-1" data-bs-toggle="tooltip" data-bs-original-title="Edit product"><i
                      class="fas fa-user-edit blue-color" aria-hidden="true"></i></a>
                </router-link>
                <a @click="confirmDelete({ id: user.appUsersRole.ROWID})" href="javascript:;"
                  data-bs-toggle="tooltip" data-bs-original-title="Delete product"><i class="fas fa-trash blue-color"
                    aria-hidden="true"></i></a>
              </td>
              <td>
                <p class="text-xs font-weight-bold blue-color mb-0">{{ user.appUsersRole.roleName }}</p>
               
              </td>
              <td class="align-middle  text-sm">
                <p class="text-xs font-weight-bold blue-color mb-0">{{ user.appUsersRole.description }}</p>
              </td>                
              <td class="align-middle  text-sm">
                <p class="text-xs font-weight-bold blue-color mb-0">{{ user.userData.firstName }} {{ user.userData.lastName }}</p>
              </td>                
              <td class="align-middle  text-sm">
                <p class="text-xs font-weight-bold blue-color mb-0">{{ user.appUsersRole.CREATEDTIME }}</p>
              </td>                
            </tr>
          </tbody>
        </table>
      </div>      
    </div>
  </div>
  <Loader :loading="isLoading"></Loader>
  <div class="text-center">
    <!-- Custom pagination -->
    <nav class="fixed-bottom" aria-label="Pagination">
          <ul class="pagination justify-content-center">
            <!-- Previous page button -->
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="javascript:;" @click="goTOFirstPage"><i
                  class="fs-4 fas fa-angle-double-left"></i></a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="javascript:;" @click="prevPage"><i class="fs-5 fas fa-angle-left"></i></a>
            </li>

            <!-- Page numbers -->
            <template v-if="totalPages <= 3">
              <li class="page-item rounded-circle color-table-list" v-for="page in pages" :key="page"
                :class="{ active: currentPage === page }">
                <a class="page-link" href="javascript:;" @click="gotoPage(page)">{{ page }}</a>
              </li>
            </template>
            <template v-else>
              <li class="page-item rounded-circle text-white" v-for="index in 3" :key="index"
                :class="{ active: currentPage === startPage + index - 1 }">
                <a class="page-link" href="javascript:;" @click="gotoPage(startPage + index - 1)">{{ startPage + index -
                  1 }}</a>
              </li>
            </template>

            <!-- Next page button -->
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" href="javascript:;" @click="nextPage"><i class="fs-5 fas fa-angle-right"></i></a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" href="javascript:;" @click="goTOLastPage"><i
                  class=" fs-4 fas fa-angle-double-right"></i></a>

            </li>
          </ul>
        </nav>
  </div>
</template>

<script>
import axios from "axios";
import { putUrl } from "../../boot/axios";
import { verifyUser } from "../../verifyUser/verifyUser.js";
import router from "../../router/index.js";
import Loader from "../utils/Loader.vue";
import { ref } from "vue";
import Swal from "sweetalert2";
const statusList = { Active: "Active", Inactive: "Inactive" };
export default {
  components: {
    Loader,
  },
  data() {
    const isLoading = ref(false);
    return {
      statusList,
      isLoading,
      users: [],
      currentPage: 1,
      itemsPerPage: 100,
      showSearchDetail: true
    };
  },

  computed: {
    // Calculate the total number of pages
    totalPages() {
      return Math.ceil(this.users.length / this.itemsPerPage);
    },
    // Slice the users array to return the current page's data
    paginatedUsers() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      console.log(this.users.slice(startIndex, endIndex));
      return this.users.slice(startIndex, endIndex);
    },
    // Generate an array of page numbers for pagination buttons
    pages() {
      return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    },
    // Generate pagination info text
    paginationInfo() {
      const totalItems = this.offerings.length;
      const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
      const endItem = Math.min(startItem + this.itemsPerPage - 1, totalItems);
      return `Showing ${startItem} to ${endItem} of ${totalItems} entries`;
    },
  },
  async beforeMount() {
    const verify = await verifyUser();
    if (!verify) {
      router.push("/signin");
    }
  },
  methods: {
    showSearchDetails() {
      let item = document.querySelector(".message-details")
      item.style.transform = this.showSearchDetail ? 'translateX(0)' : 'translateX(100%)';
      this.showSearchDetail = !this.showSearchDetail
    },
    goTOFirstPage() {
      this.currentPage = 1;
    },
    goTOLastPage() {
      this.currentPage = this.totalPages;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    gotoPage(pageNumber) {
      this.currentPage = pageNumber;
    },

    // Function to fetch all products
    async getAllUsersRole() {
      this.isLoading = true;
      try {
        const response = await axios.get(`${putUrl}usersFunction/getAllUsersRole`);
        this.isLoading = false;
        console.log("response",response);
        this.users = response.data;
      //   this.users = response.data.map((item) => item.appUsersRole);
      } catch (error) {
        console.error(error);
      }
    },
    // Function to delete a product
    async confirmDelete(id) {
      console.log(id);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        iconColor: "red",
        showCancelButton: true,
        confirmButtonColor: "#E9C874",
        cancelButtonColor: "red",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteUser(id);
        }
      });
    },
    async deleteUser(id) {
      // console.log(id);
      this.isLoading = true;
      try {
        await axios.post(`${putUrl}usersFunction/deleteUserRole/${id.id}`);
        this.isLoading = false;
        Swal.fire({
          title: "<strong>User Role List Deleted Successfully</strong>",
          icon: "success",
        }); 
        const index = this.users.findIndex((users) => users.ROWID === id.id);
        if (index !== -1) {
          this.users.splice(index, 1);
        }
      } catch (error) {
        console.error(error);
      }
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
    },
   
   
  },

  mounted() {
    this.getAllUsersRole();
  },
};
</script>
<style scoped>
tbody tr:hover {
  background-color: #fff5ee;
}

.avatar-container {
  display: flex;
  align-items: center;
}

.swal2-styled.swal2-confirm {
  background-color: #E9C874 !important;
  background-image: none !important;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #8AAEE0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;

  font-weight: bold;
  color: #fff;

  margin-right: 8px;
}

i {
  padding: 0.5rem;
}

i:hover {
  background-color: #dce0e4;
  border-radius: 50%;
}

.th-align-middle {
  padding: 0.75rem 1rem !important;
}

.btn {
  margin-bottom: 0px;
}

.custom-scroll {
  max-height: calc(100vh - 160px);
  /* Adjust this value as needed */
  overflow-y: auto;
}

/* Hide scrollbar for WebKit browsers */
.custom-scroll::-webkit-scrollbar {
  display: none;
}

.no-scroll {
  overflow: hidden;
}

nav a {
  padding: 10px;
}

/* Pagination styles */
.pagination .page-item {
  cursor: pointer;
  background-color: transparent;
}

.pagination .page-link {
  color: #6c757d;
  /* Change link color */
  background-color: transparent;
  border: none;
  font-weight: 800;
}

.pagination .page-link:hover {
  color: #495057;
  /* Change link color on hover */
}

.pagination .page-link:focus {
  box-shadow: none;
}

.pagination .page-item.disabled .page-link {
  color: #6c757d;
  /* Change disabled link color */
  pointer-events: none;
}

.pagination .page-item.active .page-link {
  background-color: #8AAEE0;
  /* Change active page background color */
  border-color: #8AAEE0;
  /* Change active page border color */
}

.pagination .page-item.active .page-link:hover {
  background-color: #8AAEE0;
  /* Change active page background color on hover */
  border-color: #8AAEE0;
  /* Change active page border color on hover */
}

input:focus {
  border-color: var(--blue-color) !important;
}

.message-details {
  z-index: 6;
  position: fixed;
  height: 74vh;
  right: 0;
  bottom: 0;
  width: 20%;
  background-color: #fefefe;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%);
  overflow-y: auto;
}

.message-details-content {
  padding: 20px;
}

@media (max-width: 600px) {
  .message-details {
    width: 70%;

  }

}

@media (min-width: 601px) and (max-width: 900px) {
  .message-details {
    width: 40%; 
    height: 84vh;
  }
}

</style>
