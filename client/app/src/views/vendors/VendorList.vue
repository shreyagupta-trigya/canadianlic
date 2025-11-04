<template>
  <div class="container-fluid ps-0 pe-2 bg-white" style="min-height: 90vh" ref="desktopRef" v-if="isDesktop">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <!-- Header Section -->
          <div class="pb-0 mt-3 pe-2">
            <div class="d-flex justify-content-end align-items-center">
              <div class="d-flex align-items-center">
                <div class="row justify-content-center mx-1">
                  <button @click="showSearchDetails" type="button" class="btn search-btn-list mb-0"><span
                      class="fa fa-search cursor-pointer"></span></button>
                </div>
                <div class="row justify-content-center mx-1">
                  <button @click="resetVendor" type="button" class="btn search-btn-list mb-0"><span
                      class="fa fa-refresh cursor-pointer"></span></button>
                </div>
               
                <router-link :to="`/vendors-form`" class="mx-1">
                  <button class="mb-0 btn new-btn-list btn-sm ">+ New</button>
                </router-link>
              </div>
              <div class="dropdown mx-1" :class="{ dnone: !showAndHideState?.import && !showAndHideState?.export }">
                <button class="btn ellipsis-btn-list " data-bs-toggle="dropdown" aria-expanded="false"
                  id="dropdownMenuButton1">
                  <p class=" fs-6 mb-0 cursor-pointer m-0 text-bold fs-5 fw-bold fa fa-ellipsis-v"></p>
                </button>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                  <li><a class="dropdown-item" href="#" :class="{ dnone: !showAndHideState.import }">Import</a></li>
                  <li><a class="dropdown-item" href="#" :class="{ dnone: !showAndHideState.export }">Export</a></li>
                </ul>
              </div>
            </div>
          </div>
          <!-- Header Section ends -->
          <div class="card-body px-2 pt-0 pb-2">
            <div class="table-responsive pb-0">
              <table class="table align-items-center mb-0" style="width: 100vw;">
                <thead class="thead-light bottom-border-light" style="width: 100vw;">
                  <tr>
                    <th class="px-0">
                      <div class="d-flex">
                        <div class="my-auto form-check" style="margin-left: 10px">
                          <input id="customCheck1" class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </th>
                    <th class="px-auto text-uppercase text-xxs text-start"><a href="#">Action</a></th>
                    <th class="px-auto text-uppercase text-xxs text-start"><a href="#">Vendor Name</a></th>
                    <th class="px-auto text-uppercase text-xxs text-start"><a href="#">Vendor Type</a></th>
                    <th class="px-auto text-uppercase text-xxs text-start"><a href="#">Email</a></th>
                    <th class="px-auto text-uppercase text-xxs text-start "><a href="#">Vendor Owner</a></th>
                    <th class="px-auto text-uppercase text-xxs text-start"><a href="#">Vendor Status</a></th>
                    <th class="px-auto text-uppercase text-xxs text-start"><a href="#">Created Time</a></th>
                    <th class="px-auto text-uppercase text-xxs text-start"><a href="#">Modified Time</a></th>
                  </tr>
                </thead>
                <tbody class="">
                  <tr v-for="(item, index) in paginatedVendors" :key="index" class="bottom-border-light">
                    <td>
                      <div class="d-flex">
                        <div class="my-auto form-check">
                          <input id="customCheck1" class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </td>
                    <td class="text-sm">
                      <router-link :to="`/Vendor-datails/${item.ROWID}`">
                        <a href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Preview product"><i
                            class="fas fa-eye blue-color" aria-hidden="true"></i></a>
                      </router-link>
                      <router-link :to="'/vendors-form'">
                        <a href="javascript:;" class="mx-1" data-bs-toggle="tooltip"
                          data-bs-original-title="Edit product"><i class="fas fa-user-edit blue-color"
                            aria-hidden="true"></i></a>
                      </router-link>
                      <a @click="deleteVendor(item.ROWID)" href="javascript:;" data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"><i class="fas fa-trash blue-color"
                          aria-hidden="true"></i></a>
                    </td>
                    <td class="text-xs ps-4">{{ item.userFirstName }}</td>
                    <td class="text-xs ps-4">{{ item.contactFirstName }}</td>
                    <td class="text-xs ps-4">{{ item.email }}</td>
                    <td class="text-xs ps-4">{{ item.contactLastName }}</td>
                    <td class="text-xs ps-4">{{ item.vendorStatus }}</td>
                    <td class="text-xs ps-4">{{ item.createdTime }}</td>
                    <td class="text-xs ps-4">{{ item.modifiedTime }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Loader :loading="isLoading"></Loader>
            <div class="pagination-container">
              <div class="total-count">
                <p><strong>Total Vendor: {{ totalItems }}</strong></p>

              </div>
            </div>
            <!-- Pagination -->
            <div class="text-center">
              <ul class="pagination">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <a class="page-link" href="javascript:;" @click="goToPage(currentPage - 1)">Previous</a>
                </li>
                <li v-for="page in pageNumbers" :key="page" class="page-item" :class="{ active: currentPage === page }">
                  <a class="page-link" href="javascript:;" @click="goToPage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                  <a class="page-link" href="javascript:;" @click="goToPage(currentPage + 1)">Next</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="vendor-drawer p-1 d-flex flex-column" :class="{ 'is-open': showSearchDetail }">
          <div class="drawer-header text-start px-3 pt-2">
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
            <button class="btn btn-info px-4" @click="searchVendors">Search</button>
            <button class="btn btn-danger px-4" @click="resetFilters">Reset</button>
          </div>
        </div>

      </div>
    </div>
  </div>
  <div ref="mobileRef" v-if="!isDesktop">
    <div
      style="width:100%;height:60px;display: flex;align-items: center;justify-content:end;background-color: white;padding-right:10px; border-bottom: 1px solid;">
      <div class="d-flex align-items-center justify-content-between">
        <div class="row justify-content-center mx-1 mt-3">
          <button @click="toggleDrawer" type="button" class="btn search-btn-list">
            <span class="fa fa-search cursor-pointer"></span>
          </button>
        </div>
        <div class="dropdown">
          <router-link to="/vendors-form">
            <router-link :to="`/vendors-form`" class="mx-1">
              <button class="mb-0 btn new-btn-list btn-sm ">+ New</button>
            </router-link>
          </router-link>

        </div>
      </div>
    </div>
    <Loader :loading="isLoading"></Loader>
    <div ref="scrollableDiv" class="scrollable-container" id="style-3" style="min-height:30vh;">

      <div class="vendorCard" v-for="(item, index) in paginatedVendors" :key="index" style="border-bottom: 1px solid;">



        <div class="parent col-12">
          <div class="start col-9" style="padding-left:15px; padding-top:15px;">
            <table>
              <tr>
                <td><strong>{{ item.userFirstName }}</strong></td>
              </tr>
              <tr>
                <td><i class="fas fa-circle" style="color: red; font-size: 10px;"></i>{{ item.vendorStatus }}</td>
              </tr>
              <tr>
                <td>{{ item.email }}</td>
              </tr>
              <tr>
                <td>{{ item.contactFirstName }} {{ item.contactLastName }}</td>
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
import axios from 'axios';
import { putUrl } from "../../boot/axios";
import { stringComponent, dateComponent, numberComponent } from '../../contants/searchPickList';
export default {
  data() {
    return {
      paginatedVendors: [],
      showSearchDetail: false,
      showAndHideState: {
        import: false,
        export: false,
        deleteButton: false,
        editButton: false,
        previewButton: false,
        addButton: false,
      },
      form: {
        name: '',
        vendorType: '',
        email: '',
        owner: '',
        status: '',
        modifiedTime: '',
        createdTime: ''
      },
      operationForm: {
        name: 'is',
        vendorType: 'is',
        email: 'is',
        owner: 'is',
        status: 'is',
        modifiedTime: 'is',
        createdTime: 'is'
      },
      fieldChecks: {
        name: false,
        vendorType: false,
        email: false,
        owner: false,
        status: false,
        modifiedTime: false,
        createdTime: false
      },
      inputVisibility: {},
      betweenFields: {},
      allFields: [
        { label: 'Vendor Name', model: 'name', placeholder: 'Vendor Name', type: 'text' },
        { label: 'Vendor Type', model: 'vendorType', placeholder: 'Vendor Type', type: 'text' },
        { label: 'Email', model: 'email', placeholder: 'Email Address', type: 'email' },
        { label: 'Vendor Owner', model: 'owner', placeholder: 'Owner', type: 'text' },
        { label: 'Vendor Status', model: 'status', placeholder: 'Status', type: 'text' },
        { label: 'Modified Time', model: 'modifiedTime', placeholder: 'Modified Time', type: 'date' },
        { label: 'Created Time', model: 'createdTime', placeholder: 'Created Time', type: 'date' }
      ],

      currentPage: 1,
      totalItems: 0,
      totalPages: 1,
      limit: 20,
      isLoading: false,
      isDesktop: false,
    };

  },
  computed: {
    // Generate page numbers for pagination
    pageNumbers() {
      const pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
      return pages;
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
      for (const key in this.form) {
        this.form[key] = '';
        this.form[key + 'From'] = '';
        this.form[key + 'To'] = '';
      }

      for (const key in this.fieldChecks) {
        this.fieldChecks[key] = false;
      }

      for (const key in this.operationForm) {
        this.operationForm[key] = 'is'; // default vendor operation
      }

      this.inputVisibility = {};
      this.betweenFields = {};
    },
    async searchVendors() {
      try {
        const searchFields = [];

        for (const field of this.allFields) {
          if (this.fieldChecks[field.model]) {
            let value = '';

            if (this.operationForm[field.model] === 'between') {
              const from = this.form[`${field.model}From`];
              const to = this.form[`${field.model}To`];

              if (from && to) {
                value = [
                  from.replace('T', ' ') + ':00:000',
                  to.replace('T', ' ') + ':00:000'
                ];
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
          limit: '300',
          search: searchFields
        };

        this.getVendorList(payload)
        this.showSearchDetail = false;
        if (this.paginatedVendors?.length === 0) {
      Swal.fire({
        title: "No results found",
        icon: "info",
        confirmButtonColor: "#E9C874"
      });
    }
      } catch (error) {
        console.error('Error while searching vendors:', error);
      }
    },
    handleOperationChange(fieldName, operation) {
      this.betweenFields[fieldName] = false;
      this.inputVisibility[fieldName] = false;

      if (operation === "between") {
        this.betweenFields[fieldName] = true;
      } else if (operation) {
        this.inputVisibility[fieldName] = true;
      }
    },
    resetVendor() {
      this.getVendorList();
    },


    checkScreenSize() {
      this.isDesktop = window.innerWidth >= 500;
    },
    async vendorCount() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${putUrl}canadianlicapi/finance/vendor/api/v2/count-vendor`);
        this.totalItems = response?.data?.count;
        // console.log("Deals Count: ", this.totalItems);
      } catch (error) {
        console.error("Error fetching deals count", error);
      } finally {
        this.isLoading = false
      }
    },
    showSearchDetails() {
      this.showSearchDetail = !this.showSearchDetail
    },


    // Handle vendor deletion
    deleteVendor(vendorId) {
      if (confirm("Are you sure you want to delete this vendor?")) {
        console.log("Deleting vendor with ID: ", vendorId);
        // Add delete logic here
      }
    },

    // Fetch vendor list data with pagination
    async getVendorList(payload = {}) {
      this.isLoading = true;
      try {
        const response = await axios.post(`${putUrl}canadianlicapi/finance/vendor/api/v2/get-vendor`, payload, {
          params: {
            limit: this.limit,
            offset: (this.currentPage - 1) * this.limit,
          }
        });

        // Handle the API 
        console.log("response.data.vendor", response.data.vendor);
        if (response.data.vendor && response.data.vendor) {
          this.paginatedVendors = response.data.vendor;
          this.totalPages = Math.ceil(response.data.totalCount / this.limit);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error('Error fetching vendor list:', error);
      } finally {
        this.isLoading = false;
      }
    },

    // Handle page change
    goToPage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
      this.getVendorList();
    }
  },
  // async beforeMount(){
  //   this.isLoading=true;
  //   this.getVendorList();
  //   this.isLoading=false;
  // } ,

  mounted() {
    this.getVendorList();
    this.checkScreenSize();
    this.vendorCount();
    window.addEventListener('resize', this.checkScreenSize);

  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize)
  },

  // beforeUnmount(){
  //     window.removeEventListener("resize",this.checkScreenSize)
  //   },


};
</script>
<style>
/*mobile view*/
.tophead {
  background-color: white;
  padding-top: 20px;
  padding-bottom: 10px;
}

.vendor-mobile-container {
  height: 80vh;
  overflow-y: scroll;
}

.vendorCard {
  background-color: white;
}

.vendor-heading {
  font-size: 16px;
  color: #8b8b8b;
  font-family: sans-serif;
}

.vendor-desc {
  font-size: 16px;
  color: #312867;
  font-family: sans-serif;
}

.vendor-table {
  width: 100%;
  border-collapse: collapse;
}

.vendor-table td {
  width: 50%;
  border: 1px solid #abaaaa;
}

.vendor-check-in-btn {
  border: 2px solid #184e88;
  color: #312867;
  width: 100%;
  border-radius: 10px;
  padding: 5px;
}

.vendor-check-out-btn {
  border: 2px solid #184e88;
  color: #312867;
  width: 100%;
  border-radius: 10px;
  padding: 5px;
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

/* #f5f5f5' */
.selected-tab {
  color: #ff176b;
  border-bottom: 1px solid #184e88;
  border: none;
  text-decoration: underline;
  text-underline-offset: 10px;
  background-color: transparent;
}

.vendor-create-btn {
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

.vendor-drawer {
  z-index: 9999;
  position: fixed;
  top: 0;
  right: 0;
  width: 24%;
  height: 100vh;
  background-color: #fefefe;
  box-shadow: -2px 0 6px rgba(0, 0, 0, 0.2);
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
}

.vendor-drawer.is-open {
  transform: translateX(0);
}


@media (max-width: 768px) {
  .vendor-drawer {
    width: 80% !important;
  }
}

@media (max-width: 500px) {
  .vendor-drawer {
    width: 100% !important;
  }
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
</style>
