<template>
  <div class="container-fluid ps-0 pe-2" style="min-height: 90vh;" ref="desktopRef" v-if="isDesktop">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <!-- Header Section -->
          <div class="pb-0 mt-3 pe-2">
            <div class="d-flex justify-content-end align-items-center">
              <div class="col-md-4 col-sm-12 mt-2 mr-3 "
                style="position: absolute; left: 15px; width: 12rem; border: 2px solid 184e88; border-radius: 10px; top: -1px">
                <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                  aria-expanded="false">
                  <div class="select-box ">
                    <select id="choices-state"
                      class="multisteps-form__select form-control choices__input custom-btn btn " name="choices-state"
                      tabindex="-1" data-choice="active">

                      <option value="all">
                        All
                      </option>
                      <option value="policies">
                        Ref payable
                      </option>
                      <option value="investments">Ref Receivable</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="d-flex align-items-center">
                <div class="row justify-content-center mx-1">
                  <button @click="showSearchDetails" type="button" class="btn search-btn-list"><span
                      class="fa fa-search cursor-pointer"></span></button>
                </div>
                <div class="row justify-content-center mx-1">
                  <button @click="resetRefferal" type="button" class="btn search-btn-list mb-0"><span
                      class="fa fa-refresh cursor-pointer"></span></button>
                </div>
                <div class="dropdown">
                  <button class="mb-0 btn new-btn-list btn-sm dropdown-toggle " type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    New
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenu2">
                    <li><button class="dropdown-item" type="button">
                        <router-link :to="`/refferal`">
                          <a target="_blank">Ref Payable</a>
                        </router-link>
                      </button></li>
                    <li><button class="dropdown-item" type="button">
                        <router-link :to="`/ref-reg`">
                          <a target="_blank">Ref Receivable</a>
                        </router-link>
                      </button></li>
                  </ul>
                </div>
              </div>
              <div class="dropdown mx-1" :class="{ dnone: !showAndHideState.import && !showAndHideState.export }">
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
                      <a href="#">Referral Name</a>
                    </th>
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Year</a>
                    </th>
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Email</a>
                    </th>
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Client</a>
                    </th>
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Referral Owner</a>
                    </th>
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Referral Level</a>
                    </th>
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Refferal Payout</a>
                    </th>
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Created Time</a>
                    </th>
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Modified Time</a>
                    </th>
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Layout</a>
                    </th>


                  </tr>
                </thead>
                <tbody class="">
                  <tr v-for="(item, index) in paginatedReferrals" :key="index" class="bottom-border-light">
                    <td>
                      <div class="d-flex">
                        <div class="my-auto form-check">
                          <input id="customCheck1" class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </td>
                    <td class="text-sm">
                      <div class="d-flex align-items-center">
                        <router-link :to="`/Refferalsdetailsview/` + item.referralData?.ROWID"
                          :class="{ disable: !showAndHideState.previewButton }">
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
                                <router-link :to="'/refferal/' + item.referralData?.ROWID"
                                  :class="{ disable: !showAndHideState.editButton }">
                                  <a href="javascript:;" class="mx-1" data-bs-toggle="tooltip"
                                    data-bs-original-title="Edit product">Edit</a>
                                </router-link>
                              </button>
                            </li>
                            <li>
                              <button class="dropdown-item" type="button" data-bs-toggle="tooltip"
                                data-bs-original-title="Edit" aria-hidden="true">
                                <a @click="deleteProduct(item.referralData?.ROWID)"
                                  :class="{ disable: !showAndHideState.deleteButton }" href="javascript:;"
                                  data-bs-toggle="tooltip" data-bs-original-title="Delete product">Delete</a>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                    <td class="text-sm">{{ item.referralData?.referralName }}</td>
                    <td class="text-sm">{{ item.referralData?.year }}</td>
                    <td class="text-sm">{{ item.referralData?.email }}</td>
                    <td class="text-sm">{{ item.referralData?.client }}</td>
                    <td class="text-sm">{{ item.userData?.firstName + " " + item.userData?.lastName }}</td>
                    <td class="text-sm">{{ item.referralData?.referralPayout }}</td>
                    <td class="text-sm">D</td>
                    <td class="text-sm">{{ item.referralData?.CREATEDTIME }}</td>
                    <td class="text-sm">{{ item.referralData?.MODIFIEDTIME }}</td>
                    <td class="text-sm">{{ item.referralData?.layout }}</td>
                  </tr>
                </tbody>
              </table>
              <Loader :loading="isLoading"></Loader>
              <div class="pagination-container">
                <div class="total-count">
                  <p><strong>Total Referal: {{ totalItems }}</strong></p>

                </div>
              </div>
            </div>
            <div class="message-details p-1 d-flex flex-column" :class="{ 'is-open': showSearchDetail }">
              <div class="text-start px-3 pt-2">
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
                <button class="btn btn-info px-4" @click="searchReferrals">Search</button>
                <button class="btn btn-danger px-4" @click="resetFilters">Reset</button>
              </div>
            </div>

            >
            <!-- ListviewSearchBar starts ends-->
          </div>
        </div>
        <div class="text-start">
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
                    <a class="page-link" href="javascript:;" @click="gotoPage(startPage + index - 1)">{{ startPage +
                      index -
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
        </div>
      </div>
    </div>
  </div>
  <div ref="mobileRef" v-if="!isDesktop">
    <div
      style="width:100%;height:60px;display: flex;align-items: center;justify-content:end;background-color: white;padding-right:10px; border-bottom:1px solid ;">
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
                <router-link :to="`/refferal`">
                  <a target="_blank"> + Ref Payable</a>

                </router-link>

              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button">
                <router-link :to="`/ref-reg`">
                  <a target="_blank"> + Ref Recievable</a>

                </router-link>

              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Loader :loading="isLoading"></Loader>
    <div ref="scrollableDiv" class="scrollable-container" id="style-3" style="min-height:30vh;">

      <div class="refferalCard " style="z-index: 1; border-bottom:1px solid ; "
        v-for="(item, index) in paginatedReferrals" :key="index">



        <div class="parent col-12">
          <div class="start col-9" style="padding-left:15px; padding-top:15px;">
            <table>
              <tr>
                <td><strong>{{ item.referralData?.referralName }}</strong></td>
              </tr>
              <tr>
                <td><i class="fas fa-circle" style="color: red; font-size: 10px;"></i>{{ item.referralData?.layout }}
                </td>
              </tr>
              <tr>
                <td>{{ item.referralData?.client }}</td>
              </tr>
              <tr>
                <td>{{ item.referralData?.email }}</td>
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
import router from "../../router/index.js"
import { verifyUser } from "../../verifyUser/verifyUser.js";
import Swal from 'sweetalert2';
import Loader from "../utils/Loader.vue"
import { ref } from "vue"
import { validateReferralListData } from "./utils/validation.js";
import { stringComponent, dateComponent, numberComponent } from "../../contants/searchPickList.js";
export default {
  components: {
    Loader
  },
  data() {
    const startPage = ref(1);
    let isLoading = ref(false)

    const showAndHideState = ref({
      deleteButton: false,
      editButton: false,
      previewButton: false,
      import: false,
      export: false,
      addButton: false,

    })
    return {
      startPage,
      isLoading,
      referrals: [],
      currentPage: 1,
      totalItems: 0,
      itemsPerPage: 40,
      showSearchDetail: true,
      showAndHideState,
      isDesktop: false,
      form: {
        referralName: '',
        year: '',
        email: '',
        client: '',
        referralOwner: '',
        referralLevel: '',
        referralPayout: '',
        modifiedTime: '',
        createdTime: '',
        layout: ''
      },
      operationForm: {
        referralName: 'is',
        year: 'is',
        email: 'is',
        client: 'is',
        referralOwner: 'is',
        referralLevel: 'is',
        referralPayout: 'is',
        modifiedTime: 'is',
        createdTime: 'is',
        layout: 'is'
      },
      fieldChecks: {
        referralName: false,
        year: false,
        email: false,
        client: false,
        referralOwner: false,
        referralLevel: false,
        referralPayout: false,
        modifiedTime: false,
        createdTime: false,
        layout: false
      },
      inputVisibility: {},
      betweenFields: {},
      allFields: [
        { label: 'Referral Name', model: 'referralName', type: 'text', placeholder: 'Referral Name' },
        { label: 'Year', model: 'year', type: 'text', placeholder: 'Year' },
        { label: 'Email', model: 'email', type: 'email', placeholder: 'Email' },
        { label: 'Client', model: 'client', type: 'text', placeholder: 'Client' },
        { label: 'Referral Owner', model: 'referralOwner', type: 'text', placeholder: 'Referral Owner' },
        { label: 'Referral Level', model: 'referralLevel', type: 'text', placeholder: 'Referral Level' },
        { label: 'Referral Payout', model: 'referralPayout', type: 'text', placeholder: 'Referral Payout' },
        { label: 'Modified Time', model: 'modifiedTime', type: 'date', placeholder: 'Modified Time' },
        { label: 'Created Time', model: 'createdTime', type: 'date', placeholder: 'Created Time' },
        { label: 'Layout', model: 'layout', type: 'text', placeholder: 'Layout' }
      ],

    };
  },
  async beforeMount() {
     
    this.isLoading = true;
    [this.showAndHideState, this.referrals] = await validateReferralListData();
    this.isLoading = false;
    const verify = await verifyUser();
    if (!verify) {
      router.push("/signin")
    }
  },

  computed: {

    totalPages() {
      if (
        typeof this.referrals.length === "number" &&
        !isNaN(this.referrals.length)
      ) {
        return Math.ceil(this.referrals.length / this.itemsPerPage);
      } else {
        return 0; // Return 0 if contacts length is not valid
      }
    },
    paginatedReferrals() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.referrals.slice(startIndex, endIndex);
    },
    pages() {
      return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    },
    paginationInfo() {
      const totalItems = this.referrals.length;
      const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
      const endItem = Math.min(startItem + this.itemsPerPage - 1, totalItems);
      return `Showing ${startItem} to ${endItem} of ${totalItems} entries`;
    },
  },
  mounted() {
    this.checkScreenSize();
    this.countReferal();
    window.addEventListener("resize", this.checkScreenSize)
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize)
  },

  methods: {
    showSearchDetails() {
      let item = document.querySelector(".message-details")
      item.style.transform = this.showSearchDetail ? 'translateX(0)' : 'translateX(100%)';
      this.showSearchDetail = !this.showSearchDetail
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
    handleOperationChange(fieldName, operation) {
      this.betweenFields[fieldName] = false;
      this.inputVisibility[fieldName] = false;

      if (operation === 'between') {
        this.betweenFields[fieldName] = true;
      } else if (operation) {
        this.inputVisibility[fieldName] = true;
      }
    },
    resetFilters() {
      for (const key in this.form) {
        this.form[key] = '';
        this.form[key + 'From'] = '';
        this.form[key + 'To'] = '';
      }

      for (const key in this.operationForm) {
        this.operationForm[key] = 'is';
      }

      for (const key in this.fieldChecks) {
        this.fieldChecks[key] = false;
      }

      this.inputVisibility = {};
      this.betweenFields = {};
    },
    async searchReferrals() {
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
          limit: '300',
          search: searchFields
        };
        this.isLoading = true;
        [this.showAndHideState, this.referrals] = await validateReferralListData(payload);
        this.showSearchDetail = false;
        this.isLoading = false;
        const verify = await verifyUser();
        if (!verify) {
          router.push("/signin")
        }
        if (this.referrals?.length === 0) {
          Swal.fire({
            title: "No results found",
            icon: "info",
            confirmButtonColor: "#E9C874"
          });
        }
      } catch (error) {
        console.error('Error searching referrals:', error);
      }
    },
    async resetRefferal(){
           
    this.isLoading = true;
    [this.showAndHideState, this.referrals] = await validateReferralListData();
    this.isLoading = false;
    const verify = await verifyUser();
    if (!verify) {
      router.push("/signin")
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
    async deleteProduct(id) {
      try {
        // Show confirmation popup
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: 'You are about to delete this product. This action cannot be undone.',
          icon: 'error',
          showCancelButton: true,
          confirmButtonColor: 'red',
          cancelButtonColor: 'green',
          confirmButtonText: 'Yes, delete it!',

          cancelButtonText: 'Cancel'
        });

        // Check if user confirms deletion
        if (result.isConfirmed) {
          // User confirmed deletion, proceed with delete request
          await axios.delete(`${putUrl}referralFunction/deletereferral/${id}`);
          // Remove the deleted product from the users array
          const index = this.referrals.findIndex(user => user.referralData.ROWID === id);
          if (index !== -1) {
            // Remove the product from the users array
            this.referrals.splice(index, 1);
          }
          // Show success message
          Swal.fire('Deleted!', 'The product has been deleted.', 'success');
        }
      } catch (error) {
        console.error(error);
        // Show error message
        Swal.fire('Error!', 'Failed to delete the product.', 'error');
      }

      console.log('clicked', id);
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
      const header = Object.keys(this.referrals[0]).join(",");
      const csvContent = this.referrals
        .map((user) => Object.values(user.referralData).join(","))
        .join("\n");
      const csvData = header + "\n" + csvContent;
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "referrals.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    checkScreenSize() {
      this.isDesktop = window.innerWidth >= 500;
    },
    async countReferal() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${putUrl}canadianlicapi/finance/refferal/api/v2/count-referral`);
        this.totalItems = response?.data?.count;
        // console.log("Deals Count: ", this.totalItems);
      } catch (error) {
        console.error("Error fetching deals count", error);
      } finally {
        this.isLoading = false
      }
    }
  },
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

th {
  font-size: 15px !important;
}

td span {
  font-size: 15px !important;
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


/* Mobile view */
@media (max-width: 768px) {
  .message-details {
    width: 100%;
    height: 80vh;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  }
}



.drawer-footer {
  padding: 1rem;
  background-color: #fff;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: center;
  gap: 5px;
  position: sticky;
  bottom: 0;
  z-index: 2;
}



/*mobile view*/
.tophead {
  background-color: white;
  padding-top: 20px;
  padding-bottom: 10px;
}

.refferal-mobile-container {
  height: 80vh;
  overflow-y: scroll;
}

.refferalCard {
  background-color: white;
}

.refferal-heading {
  font-size: 16px;
  color: #8b8b8b;
  font-family: sans-serif;
}

.refferal-desc {
  font-size: 16px;
  color: #312867;
  font-family: sans-serif;
}

.refferal-table {
  width: 100%;
  border-collapse: collapse;
}

.refferal-table td {
  width: 50%;
  border: 1px solid #abaaaa;
}

.refferal-check-in-btn {
  border: 2px solid #184e88;
  color: #312867;
  width: 100%;
  border-radius: 10px;
  padding: 5px;
}

.refferal-check-out-btn {
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

.refferal-create-btn {
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


@media (min-width: 601px) and (max-width: 900px) {
  .message-details {
    width: 40%;
    height: 84vh;
  }
}
</style>