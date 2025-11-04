<template>
  <div class=" container-fluid ps-0 pe-2" style="min-height: 90vh" ref="desktopRef" v-if="isDesktop">
    <div class="row">
      <div class="col-12">
        <div class="card">

          <!-- Header Section -->
          <div class="pb-0 mt-3 pe-2">
            <div class="d-flex justify-content-end align-items-center">
              <div class="d-flex align-items-center">
                <div class="row justify-content-center mx-1">
                  <button @click="showSearchDetails" type="button" class="btn search-btn-list"><span
                      class="fa fa-search cursor-pointer"></span>
                  </button>
                </div>
                <div class="row justify-content-center mx-1 gap-4">
                      <button class=" btn search-btn-list" @click="resetOffering">
                        Reset
                      </button>

                    </div>
                <router-link :to="`/products`" class="mx-1">
                  <button class="mb-0 btn new-btn-list btn-sm">+ New</button>
                </router-link>
              </div>
              <div class="dropdown mx-1">
                <button class="btn ellipsis-btn-list " data-bs-toggle="dropdown" aria-expanded="false"
                  id="dropdownMenuButton1">
                  <p class=" fs-6 mb-0 cursor-pointer m-0 text-bold fs-5 fw-bold fa fa-ellipsis-v"></p>
                </button>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                  <li><a class="dropdown-item" href="#">Import</a></li>
                  <li><a class="dropdown-item" href="#"> <button class="dropdown-item" type="button"
                        @click="downloadFile()"> Exports</button></a></li>
                </ul>
              </div>
            </div>
          </div>
          <!-- Header Section ends -->
          <div class="card-body px-0 pt-0 " style="min-height: 81vh;">
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
                    <th class="px-auto text-uppercase text-xxs text-start">
                      Actions
                    </th>
                    <th class="px-auto text-uppercase text-xxs text-start">
                      Offering Name
                    </th>
                    <th class="px-auto text-uppercase text-xxs text-start">
                      Offering Active
                    </th>
                    <!-- <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
               Offeriing Owner
              </th> -->
                    <th class="px-auto text-uppercase text-xxs text-start">
                      Offering Category
                    </th>

                    <th class="px-auto text-uppercase text-xxs text-start">
                      Offering Type
                    </th>
                    <th class="px-auto text-uppercase text-xxs text-start">
                      Insurance Partner Name
                    </th>
                    <!-- <th
                   class="px-auto text-uppercase text-xxs text-start">
                   Added Date time
                    </th> -->
                  </tr>
                </thead>
                <tbody>
                  <!-- Iterate over contacts -->
                  <tr v-for="(offerings, index) in paginatedUsers" :key="index" class="bottom-border-light px-2">
                    <td class="align-middle th-align-middle">
                      <div class="form-check">
                        <input :id="'customCheck' + index" class="form-check-input blue-color" type="checkbox" />
                      </div>
                    </td>
                    <td class="text-sm">
                      <!-- Actions -->
                      <div class="d-flex align-items-center">
                        <router-link :to="'/offering-details/' + offerings.offering?.ROWID">
                          <a href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Preview product">
                            <i class="fas fa-eye blue-color" aria-hidden="true"></i>
                          </a>
                        </router-link>
                        <div class="dropdown list-ellipsis-drop">
                          <i class="fa-solid fa-ellipsis blue-color dropdown-toggle" data-bs-toggle="dropdown"
                            aria-expanded="false"></i>

                          <ul class="dropdown-menu dropdown-menu-start" aria-labelledby="dropdownMenu2">
                            <li>
                              <button class="dropdown-item" type="button" data-bs-toggle="tooltip"
                                data-bs-original-title="Edit" aria-hidden="true">
                                <router-link :to="'/products/' + offerings.offering?.ROWID">
                                  <a class="mx-1" data-bs-toggle="tooltip" data-bs-original-title="Edit product">
                                    Edit
                                  </a>
                                </router-link>
                              </button>
                            </li>
                            <li>
                              <button class="dropdown-item" type="button" data-bs-toggle="tooltip"
                                data-bs-original-title="Delete" aria-hidden="true">
                                <a href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Delete product"
                                  @click="confirmDelete(offerings.offering?.ROWID)">
                                  Delete
                                </a>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                    <td class="text-sm">
                      <div class="avatar-container">
                        <span class="text-xs font-weight-bold">{{
                          offerings.offering?.offeringName
                        }}</span>
                      </div>
                    </td>
                    <!-- <td class="text-sm">
                <div class="avatar-container">
                  <span class="text-xs font-weight-bold">{{
                offerings.offeringOwner
                  }}</span>
                </div>
              </td> -->
                    <td>
                      {{
                        offerings.offering?.offeringActive
                      }}
                    </td>
                    <td class="text-sm">
                      <div class="avatar-container">
                        <!-- <div class="avatar">{{ contact.initials }}</div> -->
                        <span class="text-xs font-weight-bold">{{
                          offerings.offering?.offeringCategory
                        }}</span>
                      </div>
                    </td>

                    <td class="text-sm">
                      <div class="avatar-container">
                        <!-- <div class="avatar">{{ contact.initials }}</div> -->
                        <span class="text-xs font-weight-bold">{{
                          offerings.offering?.insurancePartnerName
                        }}</span>
                      </div>
                    </td>
                    <td class="text-sm">
                      <span class="text-xs font-weight-bold">{{
                        offerings.offering?.offeringType
                      }}</span>
                    </td>
                    <!-- <td class="text-sm">
                      <div class="avatar-container">
                        <span class="text-xs font-weight-bold">{{
                          offerings.offering?.MODIFIEDTIME
                        }}</span>
                      </div>
                    </td> -->
                  </tr>
                </tbody>
              </table>
            </div>
            <Loader :loading="isLoading"></Loader>
            <div class="pagination-container">
              <div class="total-count mb-3">
                <p><strong>Total Offerings: {{ totalItems }}</strong></p>

              </div>
            </div>
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
                    <a class="page-link" href="javascript:;" @click="prevPage"><i
                        class="fs-5 fas fa-angle-left"></i></a>
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
                      <a class="page-link" href="javascript:;" @click="gotoPage(startPage + index - 1)">{{ startPage +
                        index -
                        1 }}</a>
                    </li>
                  </template>

                  <!-- Next page button -->
                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="javascript:;" @click="nextPage"><i
                        class="fs-5 fas fa-angle-right"></i></a>
                  </li>
                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="javascript:;" @click="goTOLastPage"><i
                        class=" fs-4 fas fa-angle-double-right"></i></a>

                  </li>
                </ul>
              </nav>
            </div>
            <!-- ListviewSearchBar starts -->
            <!-- Updated Drawer Section -->
            <div class="px-3 py-1"><i @click="closeDrawer" class="fa fa-arrow-right cursor-pointer"></i></div>
            <div class="message-details d-flex flex-column" :class="{ open: showSearchDetail }" style="height: 100%;">
              <div class="text-start px-2 pt-2">
                <i class="fa fa-arrow-right cursor-pointer" @click="showSearchDetails"></i>
              </div>

              <div style="overflow-y: auto; max-height: calc(100vh - 130px);" class="px-3 pt-1">

                <div v-for="field in allFields" :key="field.model" class="form-group mb-2">
                  <div class="d-flex align-items-center gap-2 mb-0">

                    <!-- <input class="form-check-input my-auto" type="checkbox" v-model="fieldChecks[field.model]" /> -->
                    <input type="checkbox" class="form-check-input" v-model="fieldChecks[field.model]" @change="() => {
                      if (fieldChecks[field.model]) {
                        const operations = getOperationOptions(field);
                        operationForm[field.model] = operations[0]?.value || '';
                      } else {
                        operationForm[field.model] = '';
                      }
                    }" />
                    <label>{{ field.label }}</label>
                  </div>



                  <div v-if="fieldChecks[field.model]" class="mt-0">


                    <select v-model="operationForm[field.model]" class="form-select mb-1"
                      @change="handleOperationChange(field.model, $event.target.value)">
                      <option v-for="option in getOperationOptions(field)" :key="option.value" :value="option.value">
                        {{ option.label }}
                      </option>
                    </select>


                    <!-- First Priority: BETWEEN Selected => 2 fields -->
                    <div v-if="betweenFields[field.model]" class="d-flex flex-column gap-2">
                      <input type="datetime-local" class="form-control" v-model="form[`${field.model}From`]"
                        placeholder="From" />
                      <input type="datetime-local" class="form-control" v-model="form[`${field.model}To`]"
                        placeholder="To" />
                    </div>

                    <!-- PICKLIST or ARRAY input -->
                    <select
                      v-else-if="(field.type === 'array' || field.type === 'picklist') && (fieldChecks[field.model] || inputVisibility[field.model])"
                      v-model="form[field.model]" class="form-select">
                      <option v-for="option in field.options || []" :key="option" :value="option">
                        {{ option }}
                      </option>
                    </select>

                    <!-- Otherwise: Single input if Checkbox ticked OR Operation selected -->
                    <input v-else-if="fieldChecks[field.model] || inputVisibility[field.model]"
                      :type="field.type === 'date' ? 'datetime-local' : field.type" class="form-control"
                      v-model="form[field.model]" :placeholder="field.placeholder" />

                  </div>
                </div>

              </div>

              <!-- Footer Buttons -->
              <div class="drawer-footer-buttons d-flex justify-content-center gap-3 bg-white border-top">
                <button class="btn btn-info px-4" @click="searchOffering">Search</button>
                <button class="btn btn-danger px-4" @click="resetFilters">Reset</button>
              </div>

            </div>


            <!-- ListviewSearchBar starts ends-->
          </div>
        </div>
        <!-- <div class="pagination">
          <div class="pagination-info">{{ paginationInfo }}</div>
          <div class="pagination-buttons">
            <button
              v-for="pageNumber in pages"
              :key="pageNumber"
              @click="changePage(pageNumber)"
              class="page-number"
              :class="{ active: currentPage === pageNumber }"
            >
              {{ pageNumber }}
            </button>
          </div>
        </div> -->
      </div>
    </div>
  </div>
  <!-- for mobile view -->
  <div ref="mobileRef" v-if="!isDesktop">
    <div
      style="width:100%;height:80px;display: flex;align-items: center;justify-content:end;background-color: white;padding-right:10px; border-bottom:1px solid;">
      <div class="d-flex align-items-center justify-content-between">
        <div class="row justify-content-center mx-1">
          <button @click="showSearchDetails" type="button" class="btn search-btn-list">
            <span class="fa fa-search cursor-pointer" @click="showSearchDetails"></span>
          </button>
        </div>
        <router-link to="/products" class="mx-1">
          <button class="mb-0 btn new-btn-list btn-sm">+ New</button>
        </router-link>
      </div>
    </div>
    <Loader :loading="isLoading"></Loader>
    <div ref="scrollableDiv" style="height:69vh; background: lightgray; overflow-y: scroll;">



      <div class="offeringCard " style="z-index: 1; border-bottom:1px solid ; "
        v-for="(offerings, index) in paginatedUsers" :key="index">



        <div class="parent col-12">
          <div class="start col-9" style="padding-left:15px; padding-top:15px;">
            <table>
              <tr>
                <td><strong>{{
                  offerings.offering?.offeringName
                }}</strong></td>
              </tr>
              <tr>
                <td><i class="fas fa-circle" style="color: red; font-size: 10px;"></i> {{
                  offerings.offering?.offeringActive
                }}</td>
              </tr>
              <tr>
                <td>{{
                  offerings.offering?.offeringCategory
                }}</td>
              </tr>
              <tr>
                <td>{{
                  offerings.offering?.insurancePartnerName
                }}</td>
              </tr>
            </table>
          </div>
          <div class="end col-3 mt-4" style="vertical-align: center;">
            <router-link :to="'/offering-details/' + offerings.offering?.ROWID">
              <img src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                alt="Circular Image" class="circle-img" style="height:56px; width:59px;">
            </router-link>
          </div>
        </div>

        <!-- <div>
 <hr style="border:1px solid black;">
</div> -->
      </div>
    </div>


  </div>
</template>

<script>
import axios from "axios";
import { putUrl } from "../../boot/axios";
import { verifyUser } from "../../verifyUser/verifyUser.js";
import router from "../../router/index.js";
import { validatePartnerListData } from "./utils/validation.js";
import Loader from "../utils/Loader.vue"
import { ref } from "vue"
import { stringComponent, dateComponent, numberComponent } from "../../contants/searchPickList.js";
import Swal from "sweetalert2";
export default {
  components: {
    Loader
  },
  data() {
    const isLoading = ref(false);
    const totalItems = ref(0);
    return {

      isLoading,
      offerings: [],
      orignalOffering: [],
      currentPage: 1,
      itemsPerPage: 10,
      totalItems,
      showSearchDetail: false,
      isDesktop: false,

      form: {
        name: '',
        offeringActive: '',
        offeringCategory: '',
        offeringType: '',
        insurancePartnerName: ''
      },
      operationForm: {
        name: '',
        offeringActive: '',
        offeringCategory: '',
        offeringType: '',
        insurancePartnerName: ''
      },
      fieldChecks: {
        name: false,
        offeringActive: false,
        offeringCategory: false,
        offeringType: false,
        insurancePartnerName: false
      },
      inputVisibility: {},
      betweenFields: {},
      allFields: [
        { label: 'Offering Name', model: 'name', placeholder: 'Offering Name', type: 'text' },
        { label: 'Offering Active', model: 'offeringActive', placeholder: 'Offering Active', type: 'text' },
        { label: 'Offering Category', model: 'offeringCategory', placeholder: 'Offering Category', type: 'text' },
        { label: 'Offering Type', model: 'offeringType', placeholder: 'Offering Type', type: 'text' },
        { label: 'Insurance Partner Name', model: 'insurancePartnerName', placeholder: 'Insurance Partner Name', type: 'text' }
      ],


    };
  },

  computed: {
    // Calculate the total number of pages
    totalPages() {
      return Math.ceil(this.offerings.length / this.itemsPerPage);
    },
    // Slice the users array to return the current page's data
    paginatedUsers() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      console.log(this.offerings.slice(startIndex, endIndex));
      return this.offerings.slice(startIndex, endIndex);

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
  mounted() {
    this.checkScreenSize();
    this.countOffering()
    window.addEventListener("resize", this.checkScreenSize)
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize)
  },
  async beforeMount() {
    this.isLoading = true;
    [this.showAndHideState, this.offerings] = await validatePartnerListData();
     this.orignalOffering = this.offerings
    this.isLoading = false;
    const verify = await verifyUser();
    if (!verify) {
      router.push("/signin")
    }
  },
  methods: {
    getOperationOptions(field) {
      if (['text', 'email', 'picklist', 'array'].includes(field.type)) {
        return stringComponent;
      } else if (field.type === 'date') {
        return dateComponent;
      } else if (field.type === 'number') {
        return numberComponent;
      } else {
        return stringComponent;
      }
    },
    resetFilters() {
      //  fields reset
      for (const key in this.form) {
        this.form[key] = '';
        this.form[key + 'From'] = '';
        this.form[key + 'To'] = '';
      }

      // checkboxes reset
      for (const key in this.fieldChecks) {
        this.fieldChecks[key] = false;
      }

      // operation select reset
      for (const key in this.operationForm) {
        this.operationForm[key] = '';
      }

      // input field visibility reset
      this.inputVisibility = {};
      this.betweenFields = {};
    },
    async searchOffering() {
      console.log("click")
      try {
        const searchFields = [];

        for (const field of this.allFields) {
          if (this.fieldChecks[field.model]) {
            let value = '';

            if (this.operationForm[field.model] === 'between') {
              const from = this.form[`${field.model}From`];
              const to = this.form[`${field.model}To`];

              if (from && to) {
                value = [from.replace('T', ' ') + ':00:000', to.replace('T', ' ') + ':00:000'];
              }
            } else {
              value = this.form[field.model] || '';
            }

            searchFields.push({
              field: field.model,
              operation: this.operationForm[field.model] || 'is',
              value: value
            });
          }
        }

        const payload = {
          page: '1',
          limit: '10',
          search: searchFields
        };

        console.log('Searching with payload:', payload);
        const response = await fetch(`${putUrl}productfunction/getallofferings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        const offeringData = data || [];
  
      if(offeringData?.length>0){
        this.offerings = offeringData
      }
      this.showSearchDetail = false;

      } catch (error) {
        console.error('Error while searching offerings:', error);
      }
    },
    resetOffering() {
      console.log('Resetting offering list...');
      this.offerings = [...this.orignalOffering];  // Shallow copy, taaki reactive rahe
      this.currentPage = 1;       
                // Page 1 pe wapas
    },

    handleOperationChange(fieldName, operation) {
      // Reset dono visibility flags
      this.betweenFields[fieldName] = false;
      this.inputVisibility[fieldName] = false;

      if (operation === "between") {
        this.betweenFields[fieldName] = true;
      } else if (operation) {
        this.inputVisibility[fieldName] = true;
      }
    },


    showSearchDetails() {
      this.showSearchDetail = !this.showSearchDetail;
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
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {

          // Call your function here when the user clicks "Ok"
          this.deleteProduct(id);
          Swal.fire({
            text: "Policy Deleted Successfully",
            icon: "success",
            timer: 1000
          });
        }
      });
    },
    async deleteProduct(id) {
      this.isLoading = true;
      try {
        await axios.delete(
          `${putUrl}ProductFunction/deleteoffering/${id}`
        );
        Swal.fire({
          title: "<strong>Policy Deleted Successfully</strong>",
          icon: "success",
        });
        this.isLoading = false;
        // Remove the deleted product from the users array
        const index = this.offerings.findIndex((offerings) => offerings.ROWID === id);
        if (index !== -1) {
          // Remove the product from the users array
          this.offerings.splice(index, 1);
        }
        // router.push("/offering-list");
      } catch (error) {
        console.error(error);
      }

      console.log("clicked", id);
    },

    // Function to change the current page
    changePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    // Function to format date
    formatDate(date) {
      // Implement date formatting logic if needed
      return date;
    },
    // Function to export table data to Excel
    exportToExcel() {
      const header = Object.keys(this.users[0]).join(",");
      const csvContent = this.users
        .map((user) => Object.values(user).join(","))
        .join("\n");
      const csvData = header + "\n" + csvContent;

      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "users.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    async downloadFile() {
      this.isLoading = true;
      try {
        const response = await axios.post(
          `${putUrl}ProductFunction/download-files`
        );
        console.log(response.data);
        const blob = new Blob([response.data], {
          type: "text/csv",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Offerings.csv`;
        document.body.appendChild(link);
        link.click();
        this.isLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
    checkScreenSize() {
      this.isDesktop = window.innerWidth >= 500;
    },
    async countOffering() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${putUrl}canadianlicapi/offering/api/v2/count-offering`);
        this.totalItems = response?.data?.count;
        this.isLoading = false
        // console.log("Offers Count: ", this.totalItems);
      } catch (error) {
        console.error("Error fetching offers count", error);
      } finally {
        this.isLoading = false
      }
    }
  }
};
</script>

<style scoped>
/* Hover effect for table rows */
i {
  padding: 0.5rem;
}

i:hover {
  background-color: #dce0e4;
  border-radius: 50%;
}

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

.th-align-middle {
  padding: 0.75rem 1rem !important;
}

th {
  font-size: 15px !important;
  color: #223b62 !important;
}

td span {
  font-size: 15px !important;
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

.drawer-footer-buttons {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  background-color: white;
  z-index: 100;
  border-top: 1px solid #dee2e6;
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

.list-ellipsis-drop .dropdown-toggle::after {
  display: inline-block;
  margin-left: 0.255em;
  vertical-align: 0.255em;
  content: "";
  border-top: 0.3em solid;
  border-right: 0.3em solid transparent;
  border-bottom: 0;
  border-left: 0.3em solid transparent;
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
  z-index: 9999;
  position: fixed;
  top: 0;
  right: 0;
  width: 24%;
  height: 100vh;
  background-color: #fff;
  box-shadow: -2px 0 6px rgba(0, 0, 0, 0.2);
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
}

.message-details.open {
  transform: translateX(0);
}

/* Scrollable body */
.drawer-body {
  flex-grow: 1;
  overflow-y: auto;
}

/* Footer button sticky */
.drawer-footer {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 1rem;
  position: sticky;
  bottom: 0;
  background: white;
  z-index: 2;
}

/* Mobile responsive */
@media (max-width: 600px) {
  .message-details {
    width: 70%;
  }
}

@media (min-width: 601px) and (max-width: 900px) {
  .message-details {
    width: 40%;
  }
}

/* Button width adjustment */
.w-45 {
  width: 45%;
}



/* offering list in mobile */
/* Add your styles here */
.tophead {
  background-color: white;
  padding-top: 20px;
  padding-bottom: 10px;
}

.offering-mobile-container {
  height: 80vh;
  overflow-y: scroll;
}

.offeringCard {
  background-color: white;
}

.offering-heading {
  font-size: 16px;
  color: #8b8b8b;
  font-family: sans-serif;
}

.offering-desc {
  font-size: 16px;
  color: #312867;
  font-family: sans-serif;
}

.offering-table {
  width: 100%;
  border-collapse: collapse;
}

.offering-table td {
  width: 50%;
  border: 1px solid #abaaaa;
}

.offering-check-in-btn {
  border: 2px solid #184e88;
  color: #312867;
  width: 100%;
  border-radius: 10px;
  padding: 5px;
}

.offering-check-out-btn {
  border: 2px solid #184e88;
  color: #312867;
  width: 100%;
  border-radius: 10px;
  padding: 5px;
}

.parent {
  display: flex;
  /* Use Flexbox */
  justify-content: space-between;
  /* Align items to the start and end */
  width: 100%;
  /* Ensure it takes full width of the parent container */
}

.circle-img {
  width: 150px;
  /* Set width */
  height: 150px;
  /* Set height */
  border-radius: 50%;
  /* This makes it circular */
  object-fit: cover;
  /* Ensures the image covers the area without distortion */
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

.table.align-items-center td,
.table.align-items-center th,
.table.align-items-center td span {
  text-align: -webkit-center;
}
</style>