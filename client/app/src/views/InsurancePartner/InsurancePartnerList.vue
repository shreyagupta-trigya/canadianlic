<template>
  <div class="card  me-2" style="min-height: 90vh;" ref="desktopRef" v-if="isDesktop">
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
            <button class=" btn search-btn-list" @click="resetInsurancePartner">
              Reset
            </button>

          </div>
          <router-link :to="`/insurancepartnerform`" class="mx-1" :class="{ dnone: !showAndHideState.addButton }">
            <button class="mb-0 btn new-btn-list btn-sm">+ New</button>
          </router-link>
        </div>
        <div class="dropdown mx-1" :class="{ dnone: !showAndHideState.import && !showAndHideState.export }">
          <button class="btn ellipsis-btn-list " data-bs-toggle="dropdown" aria-expanded="false"
            id="dropdownMenuButton1">
            <p class=" fs-6 mb-0 cursor-pointer m-0 text-bold fs-5 fw-bold fa fa-ellipsis-v"></p>
          </button>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" href="#" :class="{ dnone: !showAndHideState.import }">Import</a></li>
            <li><a class="dropdown-item" href="#" :class="{ dnone: !showAndHideState.export }"> <button
                  class="dropdown-item" type="button" @click="downloadFile()"> Exports</button></a></li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Header Section ends -->
    <!-- Body Section -->
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th class="px-2">
                <div class="d-flex">
                  <div class="my-auto form-check" style="margin-left: 10px">
                    <input id="customCheck1" class="form-check-input" type="checkbox" />
                  </div>
                </div>
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Actions
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Insurance Partner Name
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Email
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Phone
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Website
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Insurance Contact Owner
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Iterate over contacts -->
            <tr v-for="(insurancePartner, index) in paginatedInsurancePartner" :key="index"
              class="bottom-border-light px-2">
              <td class="align-middle th-align-middle">
                <div class="form-check">
                  <input :id="'customCheck' + index" class="form-check-input" type="checkbox" />
                </div>
              </td>
              <td class="text-sm">
                <!-- Actions -->
                <div class="d-flex align-items-center">
                  <router-link :to="'/Partnerdetailsview/' + insurancePartner.insurancePartner?.ROWID"
                    :class="{ disable: !showAndHideState.previewButton }">
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
                          <router-link :to="'/insurancepartnerform/' + insurancePartner.insurancePartner?.ROWID"
                            :class="{ disable: !showAndHideState.editButton }">
                            <a class="mx-1" data-bs-toggle="tooltip" data-bs-original-title="Edit product">
                              Edit
                            </a>
                          </router-link>
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button" data-bs-toggle="tooltip"
                          data-bs-original-title="Edit" aria-hidden="true">
                          <a href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Delete product"
                            @click="confirmDelete(insurancePartner.insurancePartner?.ROWID)"
                            :class="{ disable: !showAndHideState.deleteButton }">
                            Delete
                          </a>
                        </button>
                      </li>

                    </ul>
                  </div>
                </div>
              </td>
              <td class="text-sm ">
                <span class="ps-4">{{
                  insurancePartner.insurencePartner?.partnerName

                }}</span>
              </td>
              <td class="text-sm">
                <span class="ps-4">{{
                  insurancePartner.insurancePartner?.email
                }}</span>
              </td>
              <td class="text-sm">
                <span class="ps-4">{{
                  insurancePartner.insurancePartner?.phone
                }}</span>
              </td>
              <td class="text-sm">
                <span class="ps-4">{{
                  insurancePartner.insurancePartner?.website
                }}</span>
              </td>
              <td class="text-sm">
                <span class="ps-4">{{
                  insurancePartner.userData?.firstName + " " + insurancePartner.userData?.lastName
                }}</span>
              </td>
              <!-- Other columns -->
              <!-- Add other columns as needed -->
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination-container">
        <div class="total-count">
          <p><strong>Total Insurance Partners: {{ totalItems }}</strong></p>
        </div>
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
      <!-- ListviewSearchBar starts -->

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
                <input type="datetime-local" class="form-control" v-model="form[`${field.model}To`]" placeholder="To" />
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
          <button class="btn btn-info px-4" @click="searchInsPartner">Search</button>
          <button class="btn btn-danger px-4" @click="resetFilters">Reset</button>
        </div>

      </div>
      <!-- ListviewSearchBar starts ends-->
    </div>
  </div>
  <div ref="mobileRef" v-if="!isDesktop">
    <div
      style="width:100%;height:60px;display: flex;align-items: center;justify-content:end;background-color: white;padding-right:10px; border-bottom: 1px solid">
      <div class="d-flex align-items-center justify-content-between">
        <div class="row justify-content-center mx-1">
          <button @click="toggleDrawer" type="button" class="btn search-btn-list">
            <span class="fa fa-search cursor-pointer"></span>
          </button>
        </div>
        <div class="dropdown">
          <button class="mb-0 btn new-btn-list btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            New
          </button>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenu2">
            <li>
              <button class="dropdown-item" type="button">
                <router-link :to="`/partner-contact-form`">
                  <a target="_blank"> + Partner Contact Form</a>
                </router-link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Loader :loading="isLoading"></Loader>
    <div ref="scrollableDiv" class="scrollable-container" id="style-3" style="min-height:30vh;">

      <div class="leadCard " style="z-index: 1; border-bottom:1px solid ; "
        v-for="(insurancePartner, index) in paginatedInsurancePartner" :key="index">



        <div class="parent col-12">
          <div class="start col-9" style="padding-left:15px; padding-top:15px;">
            <table>
              <tr>
                <td><strong>{{
                  insurancePartner.insurancePartner?.partnerName
                }}</strong></td>
              </tr>
              <tr>
                <td><i class="fas fa-circle" style="color: red; font-size: 10px;"></i>{{
                  insurancePartner.insurancePartner?.email
                }}</td>
              </tr>
              <tr>
                <td>{{
                  insurancePartner.insurancePartner?.phone
                }}</td>
              </tr>
              <tr>
                <td>{{
                  insurancePartner.insurancePartner?.website
                }}</td>
              </tr>
            </table>
          </div>
          <div class="end col-3 mt-4" style="vertical-align: center;">
            <img src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
              alt="Circular Image" class="circle-img" style="height:56px; width:59px;">

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
import router from "../../router/index.js";
import { verifyUser } from "../../verifyUser/verifyUser.js";
import { numberComponent, stringComponent, dateComponent } from "../../contants/searchPickList.js";
import { reactive, ref } from "vue";
import Swal from "sweetalert2";
// import Loader from "../utils/Loader.vue"
import { validatePartnerListData } from "./utils/validation.js";
export default {

  components: {
    // Loader
  },
  data() {
    const popOverAlertMessage = ref("");
    const insurancepartner = reactive([]);
    const originalInsurancepartner = reactive([])
    const startPage = ref(1);
    const isLoading = ref(true);
    const showAndHideState = ref({
      deleteButton: false,
      editButton: false,
      previewButton: false,
      import: false,
      export: false,
      addButton: false,

    })
    const users = ref([]);
    return {
      users,
      isLoading,
      popOverAlertMessage,
      startPage,
      totalItems: 0,
      insurancepartner,
      originalInsurancepartner,
      currentPage: 1,
      itemsPerPage: 100,
      showSearchDetail: false,
      showAndHideState,
      isDesktop: false,

      form: {
        insurancePartnerName: "",
        email: "",
        phone: "",
        website: "",
        insuranceContactOwner: "",
      },

      fieldChecks: {
        insurancePartnerName: false,
        email: false,
        phone: false,
        website: false,
        insuranceContactOwner: false,
      },

      operationForm: {
        insurancePartnerName: "is",
        email: "is",
        phone: "is",
        website: "is",
        insuranceContactOwner: "is",
      },

      allFields: [
        { label: "Insurance Partner Name", model: "insurancePartnerName", placeholder: "Insurance Partner Name", type: "text" },
        { label: "Email", model: "email", placeholder: "Email", type: "email" },
        { label: "Phone", model: "phone", placeholder: "Phone", type: "number" },
        { label: "Website", model: "website", placeholder: "Website", type: "text" },
        { label: "Insurance Contact Owner", model: "insuranceContactOwner", placeholder: "Contact Owner", type: "text" },
      ],

      inputVisibility: {},
      betweenFields: {},

    };
  },


  async beforeMount() {
    // this.isLoading = true;
    [this.showAndHideState, this.insurancepartner] = await validatePartnerListData();

    // this.isLoading = false;
    const verified = await verifyUser();
    if (!verified) {
      router.push("/signin");
    }
  },

  computed: {
    totalPages() {
      if (
        typeof this.insurancepartner.length === "number" &&
        !isNaN(this.insurancepartner.length)
      ) {
        return Math.ceil(this.insurancepartner.length / this.itemsPerPage);
      } else {
        return 0; // Return 0 if contacts length is not valid
      }
    },
    paginatedInsurancePartner() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.insurancepartner.slice(startIndex, endIndex);
    },
    pages() {
      return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    },
    paginationInfo() {
      const totalItems = this.insurancepartner.length;
      const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
      const endItem = Math.min(startItem + this.itemsPerPage - 1, totalItems);
      return `Showing ${startItem} to ${endItem} of ${totalItems} entries`;
    },
  },
  mounted() {
    this.checkScreenSize();
    this.countInsurancePartner();
    window.addEventListener("resize", this.checkScreenSize)
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize)
  },
  methods: {
    resetFilters() {
      // Reset form values
      for (const key in this.form) {
        this.form[key] = '';
        this.form[key + 'From'] = '';
        this.form[key + 'To'] = '';
      }

      // Reset field toggles
      for (const key in this.fieldChecks) {
        this.fieldChecks[key] = false;
      }

      // Reset operation selectors
      for (const key in this.operationForm) {
        this.operationForm[key] = 'is';
      }

      // Reset visibility tracking
      this.inputVisibility = {};
      this.betweenFields = {};
    },
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
    async searchInsPartner() {
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
        this.showSearchDetail = false;
        const payload = {
          page: this.currentPage,
          limit: '10',
          search: searchFields
        };

        [this.showAndHideState, this.insurancepartner] = await validatePartnerListData(payload);


      } catch (error) {
        console.error('Error while searching inspart:', error);
      }
    },
    async resetInsurancePartner() {
      [this.showAndHideState, this.insurancepartner] = await validatePartnerListData();
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
      let item = document.querySelector(".message-details")
      item.style.transform = this.showSearchDetail ? 'translateX(0)' : 'translateX(100%)';
      this.showSearchDetail = !this.showSearchDetail
    },
    checkScreenSize() {
      this.isDesktop = window.innerWidth >= 500;
    },

    async countInsurancePartner() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${putUrl}canadianlicapi/finance/inspartner/api/v2/count-insurance-partner`);
        this.totalItems = response?.data?.count;
        // console.log("Deals Count: ", this.totalItems);
      } catch (error) {
        console.error("Error fetching deals count", error);
      } finally {
        this.isLoading = false
      }
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

    goTOFirstPage() {
      this.currentPage = 1;
    },

    goTOLastPage() {
      this.currentPage = this.totalPages;
    },

    async confirmDelete(id) {
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
          this.deleteContact(id);
        }
      });
    },

    async deleteContact(id) {
      this.isLoading = true;
      // console.log(id);
      try {
        // Send a request to delete the contact
        const response = await axios.delete(
          `${putUrl}insurancePartner/api/v1/deletepartner/${id}`
        );
        this.isLoading = false;
        // Remove the deleted contact from the local data
        this.insurancepartner = this.insurancepartner.filter((insurancepartner) => insurancepartner.ROWID !== id);
        console.log(response.data.message);
        Swal.fire({
          title: "<strong>Insurance Partner Deleted Successfully</strong>",
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
    async downloadFile() {
      this.isLoading = true;
      try {
        const response = await axios.post(
          `${putUrl}insurancePartner/api/v1/download-files`
        );
        // console.log(response.data);
        const blob = new Blob([response.data], {
          type: "text/csv",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `insPartner.csv`;
        document.body.appendChild(link);
        link.click();
        this.isLoading = false;
      } catch (error) {
        console.error(error);
      }
    }
  },
};
</script>

<style scoped>
i {
  padding: 0.5rem;
}

th {
  font-size: 15px !important;
  /* color:#223b62 !important; */
}

td span {
  font-size: 15px !important;
}

i:hover {
  background-color: #dce0e4;
  border-radius: 50%;
}

/* Hover effect for table rows */
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

.message-details-content {
  padding: 20px;
}

.tophead {
  background-color: white;
  padding-top: 20px;
  padding-bottom: 10px;
}

.lead-mobile-container {
  height: 80vh;
  overflow-y: scroll;
}

.leadCard {
  background-color: white;
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

.lead-heading {
  font-size: 16px;
  color: #8b8b8b;
  font-family: sans-serif;
}

.lead-desc {
  font-size: 16px;
  color: #312867;
  font-family: sans-serif;
}

.lead-table {
  width: 100%;
  border-collapse: collapse;
}

.lead-table td {
  width: 50%;
  border: 1px solid #abaaaa;
}

.lead-check-in-btn {
  border: 2px solid #184e88;
  color: #312867;
  width: 100%;
  border-radius: 10px;
  padding: 5px;
}

.lead-check-out-btn {
  border: 2px solid #184e88;
  color: #312867;
  width: 100%;
  border-radius: 10px;
  padding: 5px;
}

/* #f5f5f5' */
.selected-tab {
  color: #ff176b;
  border-bottom: 1px solid #184e88;
  border: none;
  text-decoration: underline;
  text-underline-offset: 10px;
  background-color: transparent;
}

.lead-create-btn {
  position: fixed;
  bottom: 25%;
  left: 83%;
  /* height: 50px; */
  padding: 10px 10px;
  border-radius: 100%;
  background-color: #ff176b !important;
}

.create-btn:hover {
  box-shadow: 0 0 20px rgba(255, 23, 107, 0.8);
  /* Glowing effect */
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
