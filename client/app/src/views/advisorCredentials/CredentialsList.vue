<template>
  <div class="container-fluid ps-0 pe-2 bg-white"  style="height: 90vh" ref="desktopRef" v-if="isDesktop">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <!-- Header Section -->
          <div class="pb-0 mt-3 pe-2">
            <div class="d-flex justify-content-end align-items-center">
              <div class="d-flex align-items-center ">
                <div class="row justify-content-center mx-1">
                  <button @click="showSearchDetails" type="button" class="btn search-btn-list">
                    <span class="fa fa-search cursor-pointer"></span>
                  </button>
                </div>
                <div class="row justify-content-center mx-1 gap-4">
            <button class=" btn search-btn-list" @click="resetAdvisorCredential">
              Reset
            </button>

          </div>
                <button @click="toggleDrawer" class="btn new-btn-list btn-sm">+ New</button>
              </div>
              <div class="dropdown mx-1" :class="{ dnone: !showAndHideState?.import && !showAndHideState?.export}">
                <button class="btn ellipsis-btn-list" data-bs-toggle="dropdown" aria-expanded="false" id="dropdownMenuButton1">
                  <p class="fs-6 mb-0 cursor-pointer m-0 text-bold fs-5 fw-bold fa fa-ellipsis-v"></p>
                </button>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                  <li><a class="dropdown-item" href="#" :class="{ dnone: !showAndHideState.import}">Import</a></li>
                  <li><a class="dropdown-item" href="#" :class="{ dnone: !showAndHideState.export}">Export</a></li>
                  <li><a class="dropdown-item" href="#" @click="deleteSelectedRecords" >Delete Selected</a></li>
                </ul>
              </div>
               <!-- <button @click="deleteSelectedRecords" class="btn btn-danger" :disabled="selectedAdvisor.length === 0">
                Delete Selected
              </button> -->
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
                          <input id="selectAll" class="form-check-input" type="checkbox" @change="toggleSelectAll($event)" />
                        </div>
                      </div>
                    </th>
                    <th class="px-auto text-uppercase text-secondary text-xxs font-weight-bolder text-start opacity-7 table-list-font">
                      <a href="#">Action</a>
                    </th>
                    <th class="px-auto text-uppercase text-secondary text-xxs font-weight-bolder text-start opacity-7 table-list-font">
                      <a href="#">Contracted Advisor Listing</a>
                    </th>
                    <th class="px-auto text-uppercase text-secondary text-xxs font-weight-bolder text-start opacity-7 table-list-font">
                      <a href="#">Insurance Partner Listing</a>
                    </th>
                    <th class="px-auto text-uppercase text-secondary text-xxs font-weight-bolder text-start opacity-7 table-list-font">
                      <a href="#">Advisor Credentials Owner</a>
                    </th>                    
                    <th class="px-auto text-uppercase text-secondary text-xxs font-weight-bolder text-start opacity-7 table-list-font">
                      <a href="#">Modified Time</a>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in paginatedAdvior" :key="index" class="bottom-border-light">
                    <td>
                      <div class="d-flex">
                          <div class="my-auto form-check">
                            <input id="customCheck1" class="form-check-input" type="checkbox" v-model="selectedAdvisor" :value="item.ROWID" />
                          </div>
                        </div>
                  </td>
                    <td class="text-sm">
                      <router-link :to="`/credentials-details`">
                        <a href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Preview product">
                          <i class="fas fa-eye blue-color" aria-hidden="true"></i>
                        </a>
                      </router-link>
                     
                      <!-- <button > -->
                        <a @click="updateAdvisor(item)" href="javascript:;" class="mx-1" data-bs-toggle="tooltip" data-bs-original-title="Edit product">
                          <i class="fas fa-user-edit blue-color" aria-hidden="true"></i>
                        </a>
                      <!-- </button> -->
                      <a @click="deleteProduct(item.ROWID)" href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Delete product">
                        <i class="fas fa-trash blue-color" aria-hidden="true"></i>
                      </a>
                    </td>

                    
                    <td class="text-xs font-weight-bold ps-4">{{ item.contractedAdvisorListing }}</td>
                    <td class="text-xs font-weight-bold ps-4">{{ item.insurancePartnerListing }}</td>
                    <td class="text-xs font-weight-bold ps-4">{{ item.advisorCredentialsOwner }}</td>
                    <td class="text-xs font-weight-bold ps-4">{{ item.MODIFIEDTIME }}</td>
                  </tr>
                </tbody>
              </table>             
            </div>           
          </div>
        </div>
        <Loader :loading="isLoading"></Loader>
        <div class="total-count">
  <p v-if="isLoading"><strong>Loading Total Advisors...</strong></p>
  <p v-else><strong>Total Credential Advisors: {{ totalItems }}</strong></p>
</div>

        <div class="text-start">
          <div class="text-center">
            <!-- Custom pagination -->
            <div class="text-center pagination justify-content-center">
              <nav aria-label="Page navigation">
                <ul class="pagination">
                  <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">Prev</a>
                  </li>
                  <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
                    <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
                  </li>
                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">Next</a>
                  </li>
                </ul>
              </nav>
            </div>
            <!-- Pagination code here -->
             <!-- Search Drawer Start -->
             <div class="message-details d-flex flex-column" :class="{ open: showSearchDetail }" style="height: 100%;">
        <!-- Drawer Header -->
        <div class="text-start px-2 pt-2">
          <i class="fa fa-arrow-right cursor-pointer" @click="showSearchDetails"></i>
        </div>

        <!-- Drawer Body -->
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

        <!-- Sticky Footer -->
        <div class="drawer-footer-buttons d-flex justify-content-center gap-3 bg-white border-top">
          <button class="btn btn-info px-4" @click="searchAdvisorCredential">Search</button>
          <button class="btn btn-danger px-4" @click="resetAdvisorCredential">Reset</button>
        </div>
      </div>
<!-- Search Drawer End -->

          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- for mobile view -->
  <div ref="mobileRef" v-if="!isDesktop">
    <div style="width:100%;height:60px;display: flex;align-items: center;justify-content:end;background-color: white;padding-right:10px; border-bottom:1px solid ;">     
          <div class="d-flex align-items-center justify-content-between pt-2">
                <div class="row justify-content-center mx-1">
                  <button @click="showSearchDetails" type="button" class="btn search-btn-list">
                    <span class="fa fa-search cursor-pointer"></span>
                  </button>
                </div>
                <button @click="toggleDrawer" class="btn new-btn-list btn-sm">+ New</button>
              </div>
        </div>
        <div ref="scrollableDiv" class="scrollable-container" id="style-3" style="min-height:30vh;">
     
     <div class="advisorCard " style="z-index: 1; border-bottom:1px solid ; " v-for="(item, index) in paginatedAdvior" :key="index" >
   
       

       <div class="parent col-12">
   <div class="start col-9" style="padding-left:15px; padding-top:15px;">
     <table >
       <tr>
         <td><strong>{{ item.advisorCredentialsOwner }}</strong></td>
       </tr>
       <tr>
         <td><i class="fas fa-circle" style="color: red; font-size: 10px;"></i>{{ item.contractedAdvisorListing }}</td>
       </tr>
       <tr>
         <td>{{ item.insurancePartnerListing }}</td>
       </tr>
       <tr>
         <td>{{ item.MODIFIEDTIME }}</td>
       </tr>
     </table>
   </div>
   <div class="end col-3 mt-4" style="vertical-align: center;">
    <router-link :to="`/credentials-details`">
     <img src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" alt="Circular Image" class="circle-img" style="height:56px; width:59px;">
    </router-link>
   </div>
 </div>

 <!-- <div>
 <hr style="border:1px solid black;">
</div> -->
</div>

  
   </div>
  
   
  </div>
  <!-- Drawer Component -->
  <Loader :loading="isLoading"></Loader>
  <transition name="drawer">
    <div v-show="showDrawer" class="drawer">
      <div class="drawer-content">
        <div>
          <button @click="toggleDrawer" class="btn-close"></button>
        </div>
        <!-- Your form content here -->
        <form class="multisteps-form__form"  >
          <h5 class="font-weight-bolder">Create Advisor Credentials</h5>
          <div class="multisteps-form__content">
            <div class="row">
              <div class="mt-0 col-lg-12 col-12 w-100">
                <label>Contracted Advisor Listing<span class="text-danger">*</span></label>
                <select class="form-select" id="contctOwener" v-model="newAdvisor.contractedAdvisorListing">
                <option value="" disabled selected class="text-muted"> Owner</option>
                <option v-for="(contactData, index) in contctOwener" :key="index" :value="contactData.ROWID">
                  {{ contactData.firstName }}
                </option>
              </select>  
              </div>
              <div class="mt-0 col-lg-12 col-12">
                <label>Advisor Credentials Owner</label>
                <select class="form-select" id="insuranceLeadOwner" v-model="newAdvisor.advisorCredentialsOwner">
                  <option value="" disabled selected class="text-muted"> Advisor Credentials Owner</option>
                  <option v-for="(userData, index) in insuranceLeadOwner" :key="index" :value="userData.ROWID">
                    {{ userData.firstName }}
                  </option>
                </select>  
              </div>
          
            <div class="mt-0 col-lg-12 col-12">
                <label>User ID</label>
                <input v-model="newAdvisor.userId" type="text" class="form-control form-control-default" />
              </div>
              <div class="mt-0 col-lg-12 col-12">
                <label>Insurance Partner Listing<span class="text-danger">*</span></label>
                <select class="form-select" id="ipOwnerOptions" v-model="newAdvisor.insurancePartnerListing">
                  <option value="" disabled selected class="text-muted"> Owner</option>
                  <option v-for="(ipData, index) in ipOwnerOptions" :key="index" :value="ipData.ROWID">
                    {{ ipData.partnerName }}
                  </option>
                </select>             
            </div>
              <div class="mt-0 col-lg-12 mb-3 col-12">
                <label>MGA</label>
                <select v-model="newAdvisor.mga" class="form-select" id="mga">
                  <option value="" disabled selected class="text-muted">Select</option>
                  <option >-None-</option>
                  <option >Punjab Insurance</option>
                  <option >Om Financial</option>
                  <option >Canadian L.I.C. Inc</option>
                  <!-- Add options here dynamically -->
                </select>              
            </div>           
          </div>
          </div>        
          <div class="d-flex justify-content-center">
                <button v-if="!id" class="btn mb-3 ms-2 bg-gradient-dark btn-md null null js-btn-next" type="button"
                  @click.prevent="handleSubmitForm">
                  Submit
                </button>
                <button v-else class="btn mb-0 ms-2 bg-gradient-dark btn-md null null js-btn-next" type="button"
                  @click.prevent="handleUpdateForm">
                  update
                </button>
          </div>
        </form>
        <!-- your form content end -->
      </div>
    </div>
  </transition>
 
</template>

<script>
import axios from 'axios';
 import { ref } from 'vue';
import { putUrl } from "../../boot/axios";
import Swal from 'sweetalert2';
import Loader from "../utils/Loader.vue";
import router from "../../router/index";
import { stringComponent,dateComponent,numberComponent } from '../../contants/searchPickList';
export default {
  components: {
    Loader
  },
  

  data() {
    let isLoading = ref(false);
    const totalItems = ref(0);
    return {
      ipOwnerOptions : ref([]),
      insuranceLeadOwner: ref([]),
      orignalInsuranceLeadOwner:ref([]),
      contctOwener: ref([]),
      isLoading,
      totalItems,
      paginatedAdvior: [],
      showSearchDetail: false,
      showDrawer: false,
      showAndHideState: {
        import: true,
        export: true
      },
      newAdvisor: {
        mga: '',
        userId: '',
        contractedAdvisorListing: '',
        advisorCredentialsOwner: '',
        insurancePartnerListing: '',
      },
      currentPage: 1,
      totalPages: 1,
      limit: 20,
      selectedAdvisor:[],
      isDesktop:false,
      form: {
  contractedAdvisorListing: '',
  insurancePartnerListing: '',
  advisorCredentialsOwner: '',
  createdTime: '',
  modifiedTime: ''
},
operationForm: {
  contractedAdvisorListing: 'is',
  insurancePartnerListing: 'is',
  advisorCredentialsOwner: 'is',
  createdTime: 'is',
  modifiedTime: 'is'
},
fieldChecks: {
  contractedAdvisorListing: false,
  insurancePartnerListing: false,
  advisorCredentialsOwner: false,
  createdTime: false,
  modifiedTime: false
},
inputVisibility: {},
betweenFields: {},
allFields: [
  { label: 'Contracted Advisor Listing', model: 'contractedAdvisorListing', placeholder: 'Advisor Name', type: 'text' },
  { label: 'Insurance Partner Listing', model: 'insurancePartnerListing', placeholder: 'Insurance Partner Name', type: 'text' },
  { label: 'Advisor Credentials Owner', model: 'advisorCredentialsOwner', placeholder: 'Advisor Owner', type: 'text' },
  { label: 'Created Time', model: 'createdTime', placeholder: 'Created Time', type: 'date' },
  { label: 'Modified Time', model: 'modifiedTime', placeholder: 'Modified Time', type: 'date' }
]

    };
  },
  methods: {
    toggleDrawer() {
      this.showDrawer = !this.showDrawer;
    },
    async getallusers() {
      try {
        const response = await axios.get(`${putUrl}uatServerFunction/api/v1/getAllAdvisor`);
        console.log("responseeeee ===>", response);
        this.insuranceLeadOwner = response.data.map((item) => item.advisors );
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async getAllContact() {
      try {
        const contactResponse = await axios.get(`${putUrl}uatServerFunction/api/v1/getAllContact`);
        console.log("ccccccresponse ===>", contactResponse);
        this.contctOwener = contactResponse.data.map((item) => item.contacts);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async getAdvisorCredentials() {
      console.log("getAdvisorCredentials called");
    },

   
  async getAdvisorCredentialsCount() {
    this.isLoading = true;
    try {
      const response = await axios.get(`${putUrl}canadianlicapi/advisor/card/api/v2/get-advisor-credential-count`);
      this.totalItems = response.data.count; //
      // console.log("Total Advisors:", this.totalItems);
      this.isLoading = false;
    } catch (error) {
      console.error('Error fetching advisor credentials count:', error);
      this.isLoading = false;
    }
  },
 
    
    async getIpPartner() {
      try {
        const ipResponse = await axios.get(`${putUrl}uatServerFunction/api/v1/getAllInsurencePartner`);
        console.log("ipResponse===>", ipResponse)
        this.ipOwnerOptions = ipResponse.data.map((item) => item.insurencePartner);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    
    showSearchDetails() {
      this.showSearchDetail = !this.showSearchDetail;
    },
    toggleSelectAll(event) {
      if (event.target.checked) {
        this.selectedAdvisor = this.paginatedAdvior.map(lead => lead.ROWID);
        console.log("selectedAdvisor: " + this.selectedAdvisor);
      } else {
        this.selectedAdvisor = [];
      }
    },
    async deleteSelectedRecords() {
        if (confirm("Are you sure you want to delete the selected records?")) {           
            let idArray =[];
            for(let value of this.selectedAdvisor){
                idArray.push(value)
            }
            console.log({idArray})

            this.deleteProduct(idArray);          
            this.selectedAdvisor = [];
            this.showSearchDetails();
        }
      },
    deleteProduct(rowId) {
      console.log(`Deleting product with ROWID: ${rowId}`);
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
          this.deleteAdvior(rowId);
        }
      });      
    },
    
    async deleteAdvior(rowId) {
      this.isLoading = true;
      try {
        const response = await axios.delete(`${putUrl}uatServerFunction/api/v1/delete-advisor-credential/${rowId}`);
        this.isLoading = false;
        console.log(response.data.message);
        Swal.fire({
          title: "<strong>Advior Deleted Successfully</strong>",
          icon: "success",
        });
        this.fetchAdvisorCredentials();
      } catch (error) {
        console.error(error);
        this.isLoading = false;
      }
    },
    async handleSubmitForm() {  
      console.log('this.newAdvisor', this.newAdvisor);
      try {
        const response = await axios.put(`${putUrl}canadianlicapi/advisor/card/api/v2/addadvisor-credential`, this.newAdvisor);
        this.isLoading = false;
        console.log(response.data);
        Swal.fire({
          timer: 2000,
          title: "<strong>Advisor Created Successfully</strong>",
          icon: "success",
        });
        this.toggleDrawer();
        this.resetForm();
        setTimeout(() => {
          router.push("/credential-list");
        }, 3000);
      } catch (error) {
        Swal.fire({
          title: error.message,
          icon: "error",
        });
      }
    },
    async handleUpdateForm(event) {
      event.preventDefault();
       const advisorData = { ...this.newAdvisor };
      try {
        const updateRespo = await axios.post(`${putUrl}canadianlicapi/advisor/card/api/v2/update-advisor-cedential/${this.id}`, advisorData);
        this.isLoading = false;
        console.log('Advisor updated successfully', updateRespo.data);
        this.toggleDrawer();
        this.resetForm();
        Swal.fire({
          timer: 2000,
          title: "<strong>Advisor update Successfully</strong>",
          icon: "success",
        });
        this.fetchAdvisorCredentials();
        setTimeout(() => {
          router.push("/credential-list");
        }, 3000);
      } catch (error) {
        Swal.fire({
          title: error.message,
          icon: "error",
        });
        console.error('Error updating advisor:', error);
      }
    },
    async fetchAdvisorCredentials() {
      this.isLoading = true;
      try {
        const response = await axios.post(`${putUrl}canadianlicapi/advisor/card/api/v2/getall-advisor-credential`, {
          params: {
            limit: this.limit,
            offset: (this.currentPage - 1) * this.limit
          }
        });
        this.paginatedAdvior = response.data.data;
        this.orignalInsuranceLeadOwner = this.paginatedAdvior
        this.totalPages = Math.ceil(response.data.totalCount / this.limit);
        this.isLoading = false;
      } catch (error) {
        console.error('Error:', error);
        this.isLoading = false;
      }
    },
    goToPage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
      this.fetchAdvisorCredentials();
    },
    async updateAdvisor(advisor) {     
      this.toggleDrawer();
      this.id = advisor.ROWID;      
      try {
        const response = await axios.get(`${putUrl}uatServerFunction/api/v1/get-all-advisor-credential-by-id`, {
          params: {
            id: this.id
          }
        });
        if (response.data.length > 0) {
          this.newAdvisor = response.data[0].advisorCredential;
        } else {
          console.warn('No advisor data found.');
          this.newAdvisor = {};
        }
      } catch (error) {
        console.error('Error:', error);
        this.isLoading = false;
      }
    },
 
    resetForm() {
      this.id = null;
      this.newAdvisor = {
        mga: '',
        userId: '',
        contractedAdvisorListing: '',
        advisorCredentialsOwner: '',
        insurancePartnerListing: '',
      };
    },
    checkScreenSize(){
      this.isDesktop = window.innerWidth >= 500;
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
resetAdvisorCredential() {
  for (const key in this.form) {
    this.form[key] = '';
    this.form[`${key}From`] = '';
    this.form[`${key}To`] = '';
  }

  for (const key in this.fieldChecks) {
    this.fieldChecks[key] = false;
  }

  for (const key in this.operationForm) {
    this.operationForm[key] = 'is'; // default to 'is'
  }

  this.inputVisibility = {};
  this.betweenFields = {};

  this.showSearchDetail = false; // close drawer
  console.log('Resetting advisor list...');
  this.fetchAdvisorCredentials(); // re-fetch original list
  this.currentPage = 1;
},
async searchAdvisorCredential() {
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
          value
        });
      }
    }

    const payload = {
      page: '1',
      limit: '10',
      search: searchFields
    };

    console.log('Searching with payload:', payload);

    const response = await fetch('http://localhost:3000/server/canadianlicapi/advisor/card/api/v2/getall-advisor-credential', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log(data,"data")
    this.paginatedAdvior = data?.data || [];
    this.totalPages = Math.ceil((data?.totalCount || 0) / this.limit);
    this.showSearchDetail = false;

    if (this.paginatedAdvior.length === 0) {
      Swal.fire({
        title: "No results found",
        icon: "info",
        confirmButtonColor: "#E9C874"
      });
    }

  } catch (error) {
    console.error('Error while searching advisor credentials:', error);
  }
},
handleOperationChange(fieldName, operation) {
  this.betweenFields[fieldName] = false;
  this.inputVisibility[fieldName] = false;

  if (operation === 'between') {
    this.betweenFields[fieldName] = true;
  } else if (operation) {
    this.inputVisibility[fieldName] = true;
  }
}




 
  },
  mounted() {    
    this.fetchAdvisorCredentials();
    this.getallusers();
    this.getIpPartner();
    this.getAllContact();
    this.getAdvisorCredentials();
    this.getAdvisorCredentialsCount();
    this.checkScreenSize();
    window.addEventListener("resize",this.checkScreenSize);
  },
  beforeUnmount(){
      window.removeEventListener("resize",this.checkScreenSize)
    },
};

</script>
<style scoped>
.multisteps-form__form {
  position: inherit;
}
.btn-close {
  box-sizing: content-box;
  width: 1.5em !important;
  height: 1.5em;
}
.container-fluid {
  background-color: #f8f9fa;
}

.card {
  margin-top: 1rem;
}

.search-btn-list {
  margin-right: 1rem;
}

.new-btn-list {
  color: white;
}

.ellipsis-btn-list {
  color: white;
}

.table-responsive {
  overflow-x: auto;
}

.table-list-font {
  font-size: 0.75rem;
}

.bottom-border-light {
  border-bottom: 1px solid #e3e6f0;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 640px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.drawer-content {
  padding: 1rem;
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
.btn-close {
  background-color: red;
  color: white;
float: right;
  position: relative;
}
.dnone {
  display: none;
}

.text-start {
  text-align: start;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.3s ease;
}

.drawer-enter,
.drawer-leave-to {
  transform: translateX(100%);
}
/* advisor list in mobile */
/* Add your styles here */
.tophead {
    background-color: white;
    padding-top: 20px;
    padding-bottom: 10px;
}

.advisor-mobile-container {
    height: 80vh;
    overflow-y: scroll;
}

.advisorCard {
    background-color: white;
}

.advisor-heading {
    font-size: 16px;
    color: #8b8b8b;
    font-family: sans-serif;
}

.advisor-desc {
    font-size: 16px;
    color: #312867;
    font-family: sans-serif;
}

.advisor-table {
    width: 100%;
    border-collapse: collapse;
}

.advisor-table td {
    width: 50%;
    border: 1px solid #abaaaa;
}

.advisor-check-in-btn {
    border: 2px solid #184e88;
    color: #312867;
    width: 100%;
    border-radius: 10px;
    padding: 5px;
}

.advisor-check-out-btn {
    border: 2px solid #184e88;
    color: #312867;
    width: 100%;
    border-radius: 10px;
    padding: 5px;

  }
  .parent {
  display: flex;        /* Use Flexbox */
  justify-content: space-between; /* Align items to the start and end */
  width: 100%;           /* Ensure it takes full width of the parent container */
}
.circle-img {
            width: 150px;          /* Set width */
            height: 150px;         /* Set height */
            border-radius: 50%;    /* This makes it circular */
            object-fit: cover;     /* Ensures the image covers the area without distortion */
        }

@media (max-width:500px){
  .drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
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

.message-details form {
  text-align: start;
}

</style>
