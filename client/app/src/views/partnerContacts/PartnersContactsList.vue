<template>

  <div class="container-fluid ps-0 pe-2 bg-white" style="min-height: 90vh;" ref="desktopRef" v-if="isDesktop">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <!-- Header Section -->
          <div class="pb-0 mt-3 pe-2">
            <div class="d-flex justify-content-end align-items-center">
              <div class="d-flex align-items-center">
                <div class="row justify-content-center mx-1">
                  <button @click="showSearchDetails" type="button" class="btn search-btn-list">
                    <span class="fa fa-search cursor-pointer"></span>
                  </button>
                </div>
                <div class="row justify-content-center mx-1 gap-4">
                  <button class=" btn search-btn-list" @click="resetPartnerContacts">
                    Reset
                  </button>

                </div>
                <router-link :to="`/partner-contact-form`" class="mx-1">
                  <button class="mb-0 btn new-btn-list btn-sm">+ New</button>
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

          <div class=" card-body px-2 pt-0 pb-2">
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
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Action</a>
                    </th>
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Partner Contact Name</a>
                    </th>
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Email</a>
                    </th>
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Partner Contact Owner</a>
                    </th>
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Parent Partner</a>
                    </th>
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Address</a>
                    </th>
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Created Time</a>
                    </th>
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Modified Time</a>
                    </th>
                  </tr>
                </thead>
                <tbody class="">
                  <tr v-for="(item, index) in paginatedLeads" :key="index" class="bottom-border-light">
                    <td>
                      <div class="d-flex">
                        <div class="my-auto form-check">
                          <input id="customCheck1" class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </td>
                    <td class="text-sm">
                      <div class="d-flex align-items-center">
                        <router-link :to="`/partners-contacts-details`">
                          <a href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Preview product"><i
                              class="fas fa-eye blue-color" aria-hidden="true"></i></a>
                        </router-link>
                        <div class="dropdown list-ellipsis-drop">
                          <i class="fa-solid fa-ellipsis blue-color dropdown-toggle" data-bs-toggle="dropdown"
                            aria-expanded="false"></i>

                          <ul class="dropdown-menu dropdown-menu-start" aria-labelledby="dropdownMenu2">
                            <li>
                              <button class="dropdown-item" type="button" data-bs-toggle="tooltip"
                                data-bs-original-title="Edit" aria-hidden="true">
                                <router-link :to="'/partner-contact-form'">
                                  <a href="javascript:;" class="mx-1" data-bs-toggle="tooltip"
                                    data-bs-original-title="Edit product">
                                    Edit
                                  </a>
                                </router-link>
                              </button>
                            </li>
                            <li>
                              <button class="dropdown-item" type="button" data-bs-toggle="tooltip"
                                data-bs-original-title="Delete" aria-hidden="true">
                                <a @click="deleteProduct(item.ROWID)" href="javascript:;" data-bs-toggle="tooltip"
                                  data-bs-original-title="Delete product">
                                  Delete
                                </a>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                    <td class="text-xs  ps-4">{{ item.leadName }}</td>
                    <td class="text-xs  ps-4">{{ item.email }}</td>
                    <td class="text-xs  ps-4">{{ item.leadOwner }}</td>
                    <td class="text-xs  ps-4">{{ item.parentPartner }}</td>
                    <td class="text-xs  ps-4">{{ item.ADDRESS }}</td>
                    <td class="text-xs  ps-4">{{ item.createdTime }}</td>
                    <td class="text-xs  ps-4">{{ item.modifiedTime }}</td>
                  </tr>
                </tbody>

              </table>
            </div>
            <Loader :loading="isLoading"></Loader>
            <div class="pagination-container">
              <div class="total-count">
                <p><strong>Total Partner Contact: {{ totalItems }}</strong></p>

              </div>
            </div>
            <!-- ListviewSearchBar starts -->
            <!-- Search Drawer with Scrollable Form and Fixed Buttons -->
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
        <div class="text-start">
          <div class="text-center">
            <!-- Custom pagination -->
            <!-- Pagination code here -->
          </div>
        </div>
      </div>
    </div>
  </div>

  <div ref="mobileRef" v-if="!isDesktop">

    <div
      style="width:100%;height:80px;display: flex;align-items: center;justify-content:end;background-color: white;padding-right:10px; border-bottom: 1px solid;">
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

      <div class="leadCard  " v-for="(item, index) in paginatedLeads" :key="index" style="border-bottom: 1px solid;">



        <div class="parent col-12">
          <div class="start col-9" style="padding-left:15px; padding-top:15px;">
            <table>
              <tr>
                <td><strong>{{ item.leadName }}</strong></td>
              </tr>
              <tr>
                <td><i class="fas fa-circle" style="color: red; font-size: 10px;"></i>{{ item.leadOwner }}</td>
              </tr>
              <tr>
                <td>{{ item.email }}</td>
              </tr>
              <tr>
                <td>{{ item.parentPartner }}</td>
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
import { stringComponent, numberComponent, dateComponent } from '../../contants/searchPickList';
import axios from 'axios';
import { putUrl } from '../../boot/axios';
export default {
  data() {

    return {
      form: {
        partnerContactName: '',
        email: '',
        partnerContactOwner: '',
        parentPartner: '',
        address: '',
        modifiedTime: '',
        createdTime: ''
      },

      operationForm: {
        partnerContactName: 'is',
        email: 'is',
        partnerContactOwner: 'is',
        parentPartner: 'is',
        address: 'is',
        modifiedTime: 'is',
        createdTime: 'is'
      },

      fieldChecks: {
        partnerContactName: false,
        email: false,
        partnerContactOwner: false,
        parentPartner: false,
        address: false,
        modifiedTime: false,
        createdTime: false
      },

      allFields: [
        { label: 'Partner Contact Name', model: 'partnerContactName', placeholder: 'Contact Name', type: 'text' },
        { label: 'Email', model: 'email', placeholder: 'Email Address', type: 'email' },
        { label: 'Contact Owner', model: 'partnerContactOwner', placeholder: 'Contact Owner', type: 'text' },
        { label: 'Parent Partner', model: 'parentPartner', placeholder: 'Parent Partner', type: 'text' },
        { label: 'Address', model: 'address', placeholder: 'Address', type: 'text' },
        { label: 'Modified Time', model: 'modifiedTime', placeholder: 'Modified Date/Time', type: 'date' },
        { label: 'Created Time', model: 'createdTime', placeholder: 'Created Date/Time', type: 'date' }
      ],

      inputVisibility: {},
      betweenFields: {},

      paginatedLeads: [
        { ROWID: 1, leadName: "Name 1", leadType: "Type 1", email: "email1@example.com", leadOwner: "Owner 1", parentPartner: "Parent 1", ADDRESS: "Address", createdTime: "2022-05-01", modifiedTime: "2022-05-02" },
        { ROWID: 2, leadName: "Name 2", leadType: "Type 2", email: "email2@example.com", leadOwner: "Owner 2", parentPartner: "Parent 2", ADDRESS: "Address", createdTime: "2023-05-01", modifiedTime: "2023-05-02" },
        { ROWID: 3, leadName: "Name 3", leadType: "Type 3", email: "email3@example.com", leadOwner: "Owner 3", parentPartner: "Parent 3", ADDRESS: "Address", createdTime: "2024-05-01", modifiedTime: "2024-05-02" },
        { ROWID: 4, leadName: "Name 4", leadType: "Type 4", email: "email4@example.com", leadOwner: "Owner 4", parentPartner: "Parent 4", ADDRESS: "Address", createdTime: "2025-05-01", modifiedTime: "2025-05-02" },
        { ROWID: 5, leadName: "Name 5", leadType: "Type 5", email: "email5@example.com", leadOwner: "Owner 5", parentPartner: "Parent 5", ADDRESS: "Address", createdTime: "2026-05-01", modifiedTime: "2026-05-02" },
      ],
      showSearchDetail: false,
      totalItems: 0,
      showAndHideState: {
        deleteButton: false,
        editButton: false,
        previewButton: false,
        import: false,
        export: false,
        addButton: false,


      },
      isDesktop: false,

    };
  },
  mounted() {

    this.checkScreenSize();
    this.partenerContactCount();
    window.addEventListener("resize", this.checkScreenSize)
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize)
  },
  methods: {
    showSearchDetails() {
      this.showSearchDetail = !this.showSearchDetail;
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
    async searchPartnercontacts() {
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

        //   console.log('Searching with payload:', payload);
        //   const response = await fetch(`${putUrl}productfunction/getallofferings`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(payload),
        //   });

        //   const data = await response.json();
        //   const offeringData = data || [];

        // if(offeringData?.length>0){
        //   this.offerings = offeringData
        // }
        this.showSearchDetail = false;

      } catch (error) {
        console.error('Error while searching partner contacts:', error);
      }
    },
    resetPartnerContacts() {
      console.log('Resetting offering list...');
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


    deleteProduct() {
      // Implement method logic
    }, checkScreenSize() {
      this.isDesktop = window.innerWidth >= 500;
    },
    async partenerContactCount() {
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
    }
    // Add other methods as needed
  },

};
</script>



<style scoped>
i {
  padding: 0.5rem;
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

.th-align-middle {
  padding: 0.75rem 1rem !important;
}

.btn {
  margin-bottom: 0px;
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

th a {
  font-size: 15px !important;
}

td {
  font-size: 15px !important;
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


/*mobile view*/
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
</style>