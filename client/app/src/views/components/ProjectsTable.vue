<template>
  <div class="card mb-4">
    <!-- Header Section -->
    <div class="card-header pb-0">
      <div class="pb-0 card-header">
        <div class="d-lg-flex">
          <div>
            <h5 class="mb-0">All Contacts</h5>
          </div>
          <div class="my-auto ms-auto mt-lg-0">
            <div class="my-auto ms-auto">
              <!-- Add New Contact Button -->
              <router-link :to="`/contact`">
                <a class="mb-0 btn bg-gradient-success btn-sm">+ New Contact</a>
              </router-link>
              <!-- Import Button -->
              <button
                type="button"
                class="mx-1 mb-0 btn btn-outline-success btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#importModal"
              >
                Import
              </button>
              <!-- Import Modal -->
              <div
                id="importModal"
                class="modal fade"
                tabindex="-1"
                aria-hidden="true"
              >
                <div class="modal-dialog mt-lg-10">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 id="ModalLabel" class="modal-title">Import CSV</h5>
                      <i class="fas fa-upload ms-3" aria-hidden="true"></i>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <p>You can browse your computer for a file.</p>
                      <input
                        type="text"
                        placeholder="Browse file..."
                        class="mb-3 form-control"
                      />
                      <div class="form-check">
                        <input
                          id="importCheck"
                          class="form-check-input"
                          type="checkbox"
                          value=""
                        />
                        <label class="custom-control-label" for="importCheck"
                          >I accept the terms and conditions</label
                        >
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn bg-gradient-secondary btn-sm"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn bg-gradient-success btn-sm"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Export Button -->
              <button
                class="mt-1 mb-0 btn btn-outline-success btn-sm export mt-sm-0"
                data-type="csv"
                type="button"
                @click="exportToExcel"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Body Section -->
    <div class="card-body px-0 pt-0 pb-2 mt-4">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th>
                <div class="d-flex">
                  <div class="my-auto form-check" style="margin-left: -6px">
                    <input
                      id="customCheck1"
                      class="form-check-input"
                      type="checkbox"
                    />
                  </div>
                </div>
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Actions
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Created Time
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Lead Converted On
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Lead Created On
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
              >
                Deal Stage Tracking
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
              >
                Contact Name
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
              >
                Mobile
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
              >
                Service Availed Options
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Iterate over contacts -->
            <tr
              v-for="(contact, index) in paginatedContacts"
              :key="index"
              class="bottom-border-light px-2"
            >
              <td class="align-middle th-align-middle">
                <div class="form-check">
                  <input
                    :id="'customCheck' + index"
                    class="form-check-input"
                    type="checkbox"
                  />
                </div>
              </td>
              <td class="text-sm">
                <!-- Actions -->
                <a
                  href="javascript:;"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="Preview product"
                >
                  <i class="fas fa-eye text-secondary" aria-hidden="true"></i>
                </a>
                <router-link :to="'/contact/' + contact.ROWID">
                  <a
                    class="mx-3"
                    data-bs-toggle="tooltip"
                    data-bs-original-title="Edit product"
                  >
                    <i
                      class="fas fa-user-edit text-secondary"
                      aria-hidden="true"
                    ></i>
                  </a>
                </router-link>

                <a
                  href="javascript:;"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="Delete product"
                  @click="confirmDelete(contact.ROWID)"
                >
                  <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                </a>
              </td>
              <td class="text-sm">
                <div class="avatar-container">
                  <span class="text-xs font-weight-bold">{{
                    contact.CREATEDTIME
                  }}</span>
                </div>
              </td>
              <td class="text-sm">
                <div class="avatar-container">
                  <!-- <div class="avatar">{{ contact.initials }}</div> -->
                  <span class="text-xs font-weight-bold">{{
                    contact.leadConvertedOn
                  }}</span>
                </div>
              </td>
              <td class="text-sm">
                <div class="avatar-container">
                  <!-- <div class="avatar">{{ contact.initials }}</div> -->
                  <span class="text-xs font-weight-bold">{{
                    contact.leadCreatedOn
                  }}</span>
                </div>
              </td>
              <td class="text-sm">
                <div class="avatar-container">
                  <!-- <div class="avatar">{{ contact.initials }}</div> -->
                  <span class="text-xs font-weight-bold">{{
                    contact.dealStageTracking
                  }}</span>
                </div>
              </td>
              <td class="text-sm">
                <div class="avatar-container">
                  <div class="avatar">
                    {{
                      contact.firstName.charAt(0) + contact.lastName.charAt(0)
                    }}
                  </div>
                  <span class="text-xs font-weight-bold">{{
                    contact.firstName + " " + contact.lastName
                  }}</span>
                </div>
              </td>

              <!-- Other columns -->

              <td class="text-sm">
                <div class="avatar-container">
                  <span class="text-xs font-weight-bold">{{
                    contact.mobile
                  }}</span>
                </div>
              </td>
              <td class="text-sm">
                <span class="text-xs font-weight-bold">{{
                  contact.serviceAvailedOptions
                }}</span>
              </td>

              <!-- Add other columns as needed -->
            </tr>
          </tbody>
        </table>
      </div>
      <Loader :loading="isLoading"></Loader>
      <div class="text-center">
        <!-- Custom pagination -->
        <nav class="fixed-bottom" aria-label="Pagination">
          <ul class="pagination justify-content-end">
            <!-- Previous page button -->
            <li class="page-item px-3" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="javascript:;" @click="prevPage"
                >Previous</a
              >
            </li>

            <!-- Page numbers -->
            <template v-if="totalPages <= 3">
              <li
                class="page-item rounded-circle"
                v-for="page in pages"
                :key="page"
                :class="{ active: currentPage === page }"
              >
                <a
                  class="page-link"
                  href="javascript:;"
                  @click="gotoPage(page)"
                  >{{ page }}</a
                >
              </li>
            </template>
            <template v-else>
              <li
                class="page-item rounded-circle text-white"
                v-for="index in 3"
                :key="index"
                :class="{ active: currentPage === startPage + index - 1 }"
              >
                <a
                  class="page-link"
                  href="javascript:;"
                  @click="gotoPage(startPage + index - 1)"
                  >{{ startPage + index - 1 }}</a
                >
              </li>
            </template>

            <!-- Next page button -->
            <li
              class="page-item"
              :class="{ disabled: currentPage === totalPages }"
            >
              <a class="page-link" href="javascript:;" @click="nextPage"
                >Next</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { putUrl } from "../../boot/axios";
import router from "../../router/index.js";
import { verifyUser } from "../../verifyUser/verifyUser.js";
import { reactive, ref } from "vue";
import Swal from "sweetalert2";
import Loader from "./Loader.vue"
export default {
  components:{
    Loader
  },
  data() {
    const popOverAlertMessage = ref("");
    const contacts = reactive([]);
    const startPage = ref(1);
    const isLoading=ref(true);
    return {
      isLoading,
      popOverAlertMessage,
      startPage,
      contacts,
      currentPage: 1,
      itemsPerPage: 2000,
    };
  },

  async beforeMount() {
    const verified = await verifyUser();
    if (!verified) {
      router.push("/signin");
    }
  },
  created() {
    this.getAllContacts();
  },
  computed: {
    totalPages() {
      if (
        typeof this.contacts.length === "number" &&
        !isNaN(this.contacts.length)
      ) {
        return Math.ceil(this.contacts.length / this.itemsPerPage);
      } else {
        return 0; // Return 0 if contacts length is not valid
      }
    },
    paginatedContacts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.contacts.slice(startIndex, endIndex);
    },
    pages() {
      return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    },
    paginationInfo() {
      const totalItems = this.contacts.length;
      const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
      const endItem = Math.min(startItem + this.itemsPerPage - 1, totalItems);
      return `Showing ${startItem} to ${endItem} of ${totalItems} entries`;
    },
  },
  methods: {
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
    async getAllContacts() {
      this.isLoading=true;
      try {
        const response = await axios.get(`${putUrl}contact/getcontact`);

        // Extract the 'contacts' and 'contactSubDetails' properties from each item in the response data
        const flattenedContacts = response.data.contactData.map((item) => {
          // Merge the contacts and contactSubDetails objects into a single object
          return {
            ...item.contactSubDetails,
            ...item.contacts,
          };
        });
        this.isLoading=false;

        // Set the flattened contacts array to the component data
        this.contacts = flattenedContacts;

        console.log(this.contacts);
      } catch (error) {
        console.error(error);
      }
    },

    async confirmDelete(id) {
      Swal.fire({
        title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  iconColor:"red",
  showCancelButton: true,
  confirmButtonColor: "#E9C874",
  cancelButtonColor: "red",
  confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          
          // Call your function here when the user clicks "Ok"
          this.deleteContact(id);
        }
      });
    },

    async deleteContact(id) {
      this.isLoading=true;
      console.log(id);
      try {
        // Send a request to delete the contact
        const response = await axios.delete(
          `${putUrl}contact/deletecontact/${id}`
        );
        this.isLoading=false;
        // Remove the deleted contact from the local data
        this.contacts = this.contacts.filter((contact) => contact.ROWID !== id);
        console.log(response.data.message);
        Swal.fire({
            title: "<strong>Contact Deleted Successfully</strong>",
            icon: "success",
          });
        this.$forceUpdate();
      } catch (error) {
        console.error(error);
      }
    },

    changePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    exportToExcel() {
      const header = Object.keys(this.contacts[0]).join(",");
      const csvContent = this.contacts
        .map((contact) => Object.values(contact).join(","))
        .join("\n");
      const csvData = header + "\n" + csvContent;

      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "contacts.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
  },
};
</script>

<style scoped>
/* Hover effect for table rows */
tbody tr:hover {
  background-color: #fff5ee;
}


.avatar-container {
  display: flex;
  align-items: center;
}

.swal2-styled.swal2-confirm {
  background-color: #E9C874!important;
  background-image: none !important;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ffb6c1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;

  font-weight: bold;
  color: #fff;

  margin-right: 8px;
}

.th-align-middle {
  padding: 0.75rem 1rem !important;
}

.btn {
  margin-bottom: 0px;
}
.custom-scroll {
  max-height: calc(100vh - 160px); /* Adjust this value as needed */
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
  color: #6c757d; /* Change link color */
  background-color: transparent;
  border: none;
}

.pagination .page-link:hover {
  color: #495057; /* Change link color on hover */
}

.pagination .page-link:focus {
  box-shadow: none;
}

.pagination .page-item.disabled .page-link {
  color: #6c757d; /* Change disabled link color */
  pointer-events: none;
}

.pagination .page-item.active .page-link {
  background-color: #dc3545; /* Change active page background color */
  border-color: #dc3545; /* Change active page border color */
}

.pagination .page-item.active .page-link:hover {
  background-color: #c82333; /* Change active page background color on hover */
  border-color: #bd2130; /* Change active page border color on hover */
}
</style>
