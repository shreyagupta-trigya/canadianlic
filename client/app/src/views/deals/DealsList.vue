<template>
  <Drawer :updateNotes="this.updateNotes" :is-open="isDrawerOpen" :speed="500" @close="closeDrawer"
    @search-results="handleSearchResults"></Drawer>
  <div class="container-fluid ps-0 pe-2 bg-white" style="min-height: 90vh" ref="desktopRef" v-if="isDesktop">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <!-- Header Section -->
          <div class="pb-0 mt-3 pe-2">
            <!-- <div v-if="deals.length === 0" class="text-center py-5">
                            <h3>No Data Found</h3>
                        </div> -->
            <div class="d-flex justify-content-end align-items-center">
              <div class="d-flex align-items-center">
                <div class="row justify-content-center mx-1">
                  <button @click="toggleDrawer" type="button" class="btn search-btn-list"
                        :class="{ 'active-reset': isFiltered }" :title="isFiltered
                          ? 'Filters applied — click to reset'
                          : 'Search'
                          ">
                    <span class="fa fa-search cursor-pointer"></span>
                  </button>
                </div>
                <div class="row justify-content-center mx-1 gap-4">
                  <button @click="resetDealist"  type="button" class="btn search-btn-list mb-0"
                          :class="{ 'active-reset': isFiltered }" :title="isFiltered
                            ? 'Filters applied — click to reset'
                            : 'No filters to reset'
                            ">
                    <span class="fa fa-refresh cursor-pointer"></span>
                  </button>

                </div>
                <div class="dropdown">
                  <button class="mb-0 btn new-btn-list btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    New
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenu2">
                    <li>
                      <router-link :to="`/deals-form`" :class="{ dnone: !showAndHideState.addButton }">
                        <button class="dropdown-item" type="button">
                          <a target="_blank">+ Deal Form</a>
                        </button>
                      </router-link>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">
                        <router-link :to="`/life-insurance`">
                          <a target="_blank">+ Life/Critical Insurance</a>
                        </router-link>
                      </button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">
                        <router-link :to="`/Rrsp-form`">
                          <a target="_blank">+ RRSP/RESP/TFSA</a>
                        </router-link>
                      </button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">
                        <router-link :to="`/Supervisa-form`">
                          <a target="_blank">+ SuperVisa / Visitor Insurance</a>
                        </router-link>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="dropdown mx-1" :class="{
                dnone: !showAndHideState?.import && !showAndHideState?.export,
              }">
                <button class="btn ellipsis-btn-list" data-bs-toggle="dropdown" aria-expanded="false"
                  id="dropdownMenuButton1">
                  <p class="fs-6 mb-0 cursor-pointer m-0 text-bold fs-5 fw-bold fa fa-ellipsis-v"></p>
                </button>

                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <a class="dropdown-item" href="#" :class="{ dnone: !showAndHideState.import }">Import</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" :class="{ dnone: !showAndHideState.export }">
                      <button class="dropdown-item" type="button" @click="downloadFile('standard')">
                        Export Deal
                      </button>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" :class="{ dnone: !showAndHideState.export }">
                      <button class="dropdown-item" type="button" @click="downloadFile('lifeInsurence')">
                        Export Insurence
                      </button>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" :class="{ dnone: !showAndHideState.export }">
                      <button class="dropdown-item" type="button" @click="downloadFile('rrsp')">
                        Export RRSP
                      </button>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" :class="{ dnone: !showAndHideState.export }">
                      <button class="dropdown-item" type="button" @click="downloadFile('visa')">
                        Export Visa
                      </button>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" @click="deleteSelectedRecords" href="#">Delete All</a>
                  </li>
                </ul>
              </div>
              <!-- <button @click="deleteSelectedRecords" data-bs-toggle="tooltip" data-bs-title="Delete All" class="cursor-pointer btn ellipsis-btn-list" >
                                <p class="fs-6 mb-0 text-bold fs-5 fw-bold fa fa-trash"> </p>
                            </button> -->
              <!-- <button @click="deleteSelectedRecords" class="btn ellipsis-btn-list" style="cursor:pointer" :disabled="selecteddeals.length === 0">
                <p class="fs-6 mb-0 text-bold fs-5 fw-bold fa fa-trash"> </p>
              </button> -->
            </div>
          </div>
          <!-- Header Section ends -->

          <div class="card-body px-2 pt-0 pb-2">
            <div class="scrollable-container table-responsive pb-0">
              <div v-if="isResizing" class="ghost-line" :style="{ left: ghostLineX + 'px' }"></div>
              <table class="resizable-table  table align-items-center mb-0" style="width: 100vw">
                <thead class="thead-light bottom-border-light" style="width: 100vw">
                  <tr>
                    <th class="px-1" style="width: 60px; position: relative;">
                      <div class="d-flex justify-content-center align-items-center" style="height: 100%;">
                        <div class="my-auto form-check pe-0">
                          <input id="selectAll" class="form-check-input" type="checkbox"
                            @change="toggleSelectAll($event)" />
                        </div>
                      </div>
                      <div class="resizer" @mousedown="startResize($event, 0)"></div>
                    </th>

                    <th v-for="(header, index) in tableHeaders" :key="index"
                      class="px-auto text-uppercase text-xxs text-start" style="position: relative"
                      :style="{ width: columnWidths[index + 1] + 'px' }">
                      <div class="th-content">
                        <a>{{ header }}</a>
                      </div>
                      <div v-if="index !== tableHeaders.length - 1" class="resizer"
                        @mousedown="startResize($event, index + 1)"></div>

                    </th>
                    <!-- <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Action</a>
                    </th>
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">deal Created On</a>
                    </th>
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Deal Name</a>
                    </th>
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Stage </a>
                    </th>
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Layout</a>
                    </th>
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Location Name</a>
                    </th>
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Contact Name</a>
                    </th>
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Deal Owner</a>
                    </th>
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Insurance deal</a>
                    </th>
                    <th data-sortable="" class="px-auto text-uppercase text-xxs text-start">
                      <a href="#">Insurance deal Lookup</a>
                    </th> -->
                  </tr>
                </thead>
                <tbody class="">
                  <tr v-for="(item, index) in paginatedDeals" :key="index" class="bottom-border-light cursor-pointer">
                    <td>
                      <div class="d-flex justify-content-center align-items-center">
                        <div class="my-auto form-check">
                          <input id="customCheck1" class="form-check-input" type="checkbox" v-model="selectedDeals"
                            :value="item.ROWID" />
                        </div>
                      </div>
                    </td>
                    <td class="text-sm dropdown-cell">
                      <div class="d-flex justify-content-center align-items-center gap-2">
                        <router-link :to="{
                          path: `/deals-datails/${item.ROWID}`,
                          query: { phoneNumber: item.ROWID }
                        }" :class="{ disable: !showAndHideState.previewButton }">
                          <a href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Preview product"><i
                              class="fas cursor-pointer fa-eye blue-color" aria-hidden="true"></i></a>
                        </router-link>
                        <div class="dropdown list-ellipsis-drop">
                          <i class="fa-solid fa-ellipsis blue-color dropdown-toggle" data-bs-toggle="dropdown"
                            aria-expanded="false"></i>
                          <ul class="dropdown-menu dropdown-menu-start" aria-labelledby="dropdownMenu2">
                            <li>
                              <router-link :to="`/deals-form/${item.ROWID}`" :class="{
                                disable: !showAndHideState.editButton,
                              }">
                                <button class="dropdown-item" type="button">
                                  Edit
                                </button>
                              </router-link>
                            </li>
                            <li>
                              <button @click="confirmDelete(item.ROWID)" :class="{
                                disable: !showAndHideState.deleteButton,
                              }" class="dropdown-item" type="button">
                                Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                    <td class="ps-4">{{ item.CREATEDTIME }}</td>
                    <td class="ps-4">{{ item.dealName }}</td>
                    <td class="ps-4">{{ item.stage }}</td>
                    <td class="ps-4">{{ item.layout }}</td>
                    <td class="ps-4">{{ item.locationName }}</td>
                    <td class="ps-4">{{ item.contactsfullName }}</td>
                    <td class="ps-4">{{ item.dealOwnerfullName }}</td>
                    <td class="ps-4">{{ item.dealName }}</td>
                    <td class="ps-4">{{ item.dealName }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Loader :loading="isLoading"></Loader>
            <div class="pagination-container">
              <div class="total-count">
                <p><strong>Total Deals: {{ totalItems }}</strong></p>

              </div>
            </div>

            <div class="text-center">
              <!-- Custom pagination -->
              <nav class="fixed-bottom responsive-pagination" aria-label="Pagination">
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
                  <!-- <template v-if="totalPages <= 3">
                    <li class="page-item rounded-circle color-table-list" v-for="page in pages" :key="page"
                      :class="{ active: currentPage === page }">
                      <a class="page-link" href="javascript:;" @click="gotoPage(page)">{{ page }}</a>
                    </li>
                  </template>
                  <template v-else>
                    <li class="page-item rounded-circle text-white" v-for="index in 3" :key="index"
                      :class="{ active: currentPage === startPage + index - 1 }">
                      <a class="page-link" href="javascript:;" @click="gotoPage(startPage + index - 1)">{{ startPage +
                        index - 1 }}</a>
                    </li>
                  </template> -->
                  <li v-for="page in visiblePages" :key="page" class="page-item rounded-circle"
                          :class="{ active: currentPage === page }">
                          <a class="page-link" href="javascript:;" @click="gotoPage(page)">
                            {{ page }}
                          </a>
                        </li>


                  <!-- Next page button -->
                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="javascript:;" @click="nextPage"><i
                        class="fs-5 fas fa-angle-right"></i></a>
                  </li>
                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="javascript:;" @click="goTOLastPage"><i
                        class="fs-4 fas fa-angle-double-right"></i></a>
                  </li>

                  <li class="page-item d-flex justify-content-end">
                    <div class="bottom-right-text">
                      <p class="mb-0">
                      <div class="d-flex justify-content-end ms-2">
                        <ul class="dropdown ms-2">
                          <button class="btn btn-outline btn-sm dropdown-toggle" type="button"
                            data-bs-toggle="dropdown">
                            {{ itemsPerPage }} Records Per Page
                          </button>
                          <ul class="dropdown-menu dropdown-menu-end">
                            <li v-for="size in [10, 20, 30, 40, 50, 100]" :key="size">
                              <a class="dropdown-item d-flex justify-content-between align-items-center"
                                :class="{ 'active-record': itemsPerPage === size }" href="javascript:;"
                                @click="updateItemsPerPage(size)">
                                {{ size }} Records Per Page
                              </a>
                            </li>
                          </ul>
                        </ul>
                      </div>
                      </p>
                    </div>

                  </li>
                </ul>
              </nav>
            </div>
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
                <router-link :to="`/deals-form`" :class="{ dnone: !showAndHideState.addButton }">
                  <a target="_blank">+ Deal Form</a>
                </router-link>
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button">
                <router-link :to="`/life-insurance`">
                  <a target="_blank"> + Life/Critical Insurance</a>
                </router-link>
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button">
                <router-link :to="`/Rrsp-form`">
                  <a target="_blank"> + RRSP/RESP/TFSA</a>
                </router-link>
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button">
                <router-link :to="`/Supervisa-form`">
                  <a target="_blank"> + SuperVisa/Visitor Insurance</a>
                </router-link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Loader :loading="isLoading"></Loader>
    <div ref="scrollableDiv" style=" background: lightgray; overflow-y: scroll;">

      <div class="dealCard mt-0 mb-0" style="z-index: 1; border-bottom:1px solid ; "
        v-for="(item, index) in paginatedDeals" :key="index">



        <div class="parent col-12">
          <div class="start col-9" style="padding-left:15px; padding-top:15px;">
            <table>
              <tr>
                <td><strong>{{ `${item.dealName} ` }}</strong></td>
              </tr>
              <tr>
                <td><i class="fas fa-circle" style="color: red; font-size: 10px;"></i>{{ item.stage }}</td>
              </tr>
              <tr>
                <td>{{ item.layout }}</td>
              </tr>
              <tr>
                <td>{{ item.locationName }}</td>
              </tr>
            </table>
          </div>
          <div class="end col-3 mt-4" style="vertical-align: center;">
            <router-link :to="`/deals-datails/${item.ROWID}`">
              <img src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                alt="Circular Image" class="circle-img" style="height:44px; width:50px;">
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
import router from "../../router/index.js";
import { verifyUser } from "../../verifyUser/verifyUser.js";
import { validatedeadListData } from "./utils/validation.js";
import { reactive, ref } from "vue";
import Swal from "sweetalert2";
import Loader from "../utils/Loader.vue";
import Drawer from "./dealDrawer/Drawer.vue";


export default {
  components: {
    Loader,
    Drawer,
  },
  data() {
    const isLoading = ref(true);
    // const deals = reactive([]);
    const showAndHideState = ref({
      deleteButton: false,
      editButton: false,
      previewButton: false,
      import: false,
      export: false,
      addButton: false,
    });
   
    return {
      showAndHideState,
      isLoading,
      totalItems :0,
      deals: [],
      originalDeals: [],
      showSearchDetail: true,
      searchPayloadFlag: false,
      currentPage: 1,
      itemsPerPage: 10,
      selectedDeals: [],
      isDrawerOpen: false,
      isDesktop: false,
      showMobileNav: true,
      tableHeaders: [
        "Action",
        "Created Time",
        "Deal Name",
        "Stage",
        "Layout",
        "Location Name",
        "Contact Name",
        "Deal Owner",
        "Insurance Deal",
        "Insurance Lookup"
      ],
      columnWidths: [],
      initialColumnWidths: [],
      ghostLineX: 0,
      resizingColumnIndex: null,
      startX: 0,
      startWidth: 0,
      isResizing: false,
      tableLeftOffset: 0,
    };
  },
  computed: {

    visiblePages() {
      const pages = [];
      const total = this.totalPages;
      const current = this.currentPage;

      if (total <= 5) {
        for (let i = 1; i <= total; i++) pages.push(i);
      } else {
        if (current <= 3) {
          pages.push(1, 2, 3, "...", total);
        } else if (current >= total - 2) {
          pages.push(1, "...", total - 2, total - 1, total);
        } else {
          pages.push(1, "...", current - 1, current, current + 1, "...", total);
        }
      }

      return pages;
    },

    totalPages() {
      if (typeof this.deals.length === "number" && !isNaN(this.deals.length)) {
        return Math.ceil(this.totalItems / this.itemsPerPage);
      } else {
        return 0; // Return 0 if deals length is not valid
      }
    },
    paginatedDeals() {
    return this.deals
    },
    pages() {
      return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    },


    paginationInfo() {
      const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
      const endItem = Math.min(
        startItem + this.itemsPerPage - 1,
        this.totalItems
      );
      return `Showing ${startItem} to ${endItem} of ${this.totalItems} entries`;
    },

    isFiltered() {
      if (this.searchPayloadFlag) {
        return true
      } else {
        return false
      }
    },
  },
  created() {
    const customWidths = [80, 100, 190, 120, 220, 220, 220, 200, 200]; // First N columns custom
    this.initialColumnWidths = [];

    for (let i = 0; i <= this.tableHeaders.length; i++) {
      this.initialColumnWidths.push(customWidths[i] ?? 200);
    }

    // Copy to columnWidths
    this.columnWidths = [...this.initialColumnWidths];
  },
 

  async mounted() {
  this.checkScreenSize();
  window.addEventListener("resize", this.checkScreenSize);

  const verified = await verifyUser();
  if (!verified) {
    router.push("/signin");
    return;
  }

  this.isLoading = true;
  await this.getDealsCount(); // Get total count first
  await this.fetchDeals();    // Then get deals for first page
  this.isLoading = false;
},

beforeUnmount() {
  window.removeEventListener("resize", this.checkScreenSize);
},

  methods: {

    showSearchDetails() {
      let item = document.querySelector(".message-details");
      item.style.transform = this.showSearchDetail
        ? "translateX(0)"
        : "translateX(100%)";
      this.showSearchDetail = !this.showSearchDetail;
    },
    flattenSearchResultData(response) {
      if (!Array.isArray(response)) {
        console.error("Invalid response format in flattenSearchResultData");
        return [];
      }

      return response.map(item => ({
        ...item.deals,
        dealOwnerfullName: '',    // Because search response doesn't have userData
        contactsfullName: '',     // No contacts info
        locationName: '',         // No location info
        leadName: '',             // No leads info
      }));
    },

    async resetDealist() {
  this.isLoading = true;
  this.currentPage = 1;
  this.itemsPerPage = 10;
  this.columnWidths = [...this.initialColumnWidths];
  this.searchPayloadFlag = false;

  await this.getDealsCount();   
  await this.fetchDeals();      

  this.isLoading = false;
},


   async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        await this.fetchDeals();
      }
    },

    async nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        await this.fetchDeals();
      }
    },

    async gotoPage(pageNumber) {
      this.currentPage = pageNumber;
      await this.fetchDeals();
    },
    async goTOFirstPage() {
      this.currentPage = 1;
      await this.fetchDeals();
    },
    async goTOLastPage() {
      this.currentPage = this.totalPages;
    },
    async changePage(pageNumber) {
      this.currentPage = pageNumber;
      await this.fetchDeals();
    },
    
    toggleSelectAll(event) {
      if (event.target.checked) {
        this.selectedDeals = this.deals.map((deal) => deal.ROWID);
        //   console.log("ids", this.selectedDeals)
      } else {
        this.selectedDeals = [];
      }
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
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteDeal(id);
        }
      });
    },
    async deleteSelectedRecords() {
      if (confirm("Are you sure you want to delete the selected records?")) {
        // const ids = this.selectedDeals.join(',');
        // const dataToSend = JSON.stringify({ids });
        // console.log("dataToSend",dataToSend);
        let idArray = [];
        for (let value of this.selectedDeals) {
          // console.log({value})
          idArray.push(value);
        }
        console.log({ idArray });

        this.deleteDeal(idArray);
        this.selectedDeals = [];
        this.showSearchDetails();
      }
    },
    async deleteDeal(id) {
      this.isLoading = true;
      try {
        // Send a request to delete the deals
        // console.log("ids=>>", id)
        const response = await axios.delete(
          `${putUrl}deals/api/v1/delete-deal/${id}`
        );
        this.isLoading = false;
        // Remove the deleted deals from the local data
        this.deals = this.deals.filter((deals) => deals.ROWID !== id);
        console.log(response.data.message);
        Swal.fire({
          title: "<strong>Deal Deleted Successfully</strong>",
          icon: "success",
        });
        this.showSearchDetails();
      } catch (error) {
        console.error(error);
        console.error("Error deleting deal:", error);
        this.isLoading = false;

        // Redirect to the list view or handle the error appropriately
        Swal.fire({
          title: "<strong>Error Deleting Deal</strong>",
          text:
            "An error occurred while trying to delete the deal. Redirecting to list view.",
          icon: "error",
        }).then(() => {
          this.$router.push("/deals-list");
        });
      }
    },
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
    },
    closeDrawer() {
      this.isDrawerOpen = false;
    },
    async downloadFile(type) {
      this.isLoading = true;
      try {
        const response = await axios.post(
          `${putUrl}deals/api/v1/download-files`,
          {
            type,
          }
        );
        console.log(response.data);
        const blob = new Blob([response.data], {
          type: "text/csv",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${type}.csv`;
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
    async getDealsCount() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${putUrl}canadianlicapi/deal/api/v2/get-deals-count`);
        this.totalItems = response?.data?.count;
        // console.log("Deals Count: ", this.totalItems);
      } catch (error) {
        console.error("Error fetching deals count", error);
      } finally {
        this.isLoading = false
      }
    },



    async updateItemsPerPage(size) {
      this.itemsPerPage = size;
      this.currentPage = 1;
      await this.fetchDeals();
    },

    async fetchDeals() {
      this.isLoading = true;
      try {

        const { flattenedLead, showAndHideState } = await validatedeadListData({
          page: this.currentPage,
          limit: this.itemsPerPage
        });
        this.deals = flattenedLead;
        this.showAndHideState = showAndHideState;
      } catch (error) {
        console.error('Error fetching deals:', error);
      } finally {
        this.isLoading = false;
        this.searchPayloadFlag = false
      }
    },

    async handleSearchResults(filteredDeals) {
  this.searchPayloadFlag = true;
  this.isLoading = true;
  this.currentPage = 1;

  const payload = {
    page: this.currentPage,
    limit: 10,
    search: filteredDeals
  };

  try {
    const response = await validatedeadListData(payload);

    if (!response || !response.flattenedLead || response.flattenedLead.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No Records Found",
        text: "No matching deals found with your current filters.",
        timer: 2500,
        showConfirmButton: false,
      });

      this.searchPayloadFlag = false;
    } else {
      this.deals = response.flattenedLead;
      this.totalItems = response.flattenedLead.length;
      this.itemsPerPage = response.flattenedLead.length;

      Swal.fire({
        icon: "success",
        title: "Results Fetched",
        text: `${response.flattenedLead.length} deal(s) found.`,
        timer: 2000,
        showConfirmButton: false,
      });
    }

    this.closeDrawer();

  } catch (error) {
    console.error("Error during deal search:", error);

    Swal.fire({
      icon: "error",
      title: "Search Failed",
      text: "Something went wrong while fetching deals.",
    });

    this.searchPayloadFlag = false;
  } finally {
    this.isLoading = false;
  }
}
,

    startResize(event, columnIndex) {
      this.isResizing = true;
      this.resizingColumnIndex = columnIndex;
      this.startX = event.pageX;
      this.startWidth = this.columnWidths[columnIndex];

      const tableWrapper = document.querySelector('.scrollable-container');
      const scrollLeft = tableWrapper?.scrollLeft || 0;
      const offsetLeft = tableWrapper?.getBoundingClientRect().left || 0;

      this.tableLeftOffset = offsetLeft;
      this.ghostLineX = event.pageX - offsetLeft + scrollLeft;

      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', this.onDragging);
      document.addEventListener('mouseup', this.stopResize);
    },

    onDragging(event) {
      if (this.isResizing) {
        const tableWrapper = document.querySelector('.scrollable-container');
        const scrollLeft = tableWrapper?.scrollLeft || 0;
        const offsetLeft = tableWrapper?.getBoundingClientRect().left || 0;

        const moved = event.pageX - this.startX;
        const newWidth = this.startWidth + moved;

        //ghost-line moves normally until it hits 60px limit
        if (newWidth >= 60) {
          this.ghostLineX = event.pageX - offsetLeft + scrollLeft;
        } else {
          // snap ghost line at 60px
          this.ghostLineX = this.startX - offsetLeft + scrollLeft + (60 - this.startWidth);
        }
      }
    },


    stopResize(event) {
      if (this.isResizing && this.resizingColumnIndex !== null) {
        const moved = event.pageX - this.startX;
        const newWidth = this.startWidth + moved;
        const finalWidth = Math.max(60, newWidth);
        this.columnWidths[this.resizingColumnIndex] = finalWidth;
      }

      this.isResizing = false;
      this.ghostLineX = 0;
      this.resizingColumnIndex = null;

      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', this.onDragging);
      document.removeEventListener('mouseup', this.stopResize);
    }

  },
};
</script>

<style scoped>
i {
  padding: 0.5rem;
  cursor: pointer !important;
}

i:hover {
  background-color: #dce0e4;
  border-radius: 50%;
}

/* Hover effect for table rows */
/* tbody tr:hover {
  background-color: #fff5ee;
} */

.avatar-container {
  display: flex;
  align-items: center;
}

.swal2-styled.swal2-confirm {
  background-color: #e9c874 !important;
  background-image: none !important;
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

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #8aaee0;
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

th a {
  font-size: 15px !important;
}

td {
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
  background-color: #8aaee0;
  /* Change active page background color */
  border-color: #8aaee0;
  /* Change active page border color */
}

.pagination .page-item.active .page-link:hover {
  background-color: #8aaee0;
  /* Change active page background color on hover */
  border-color: #8aaee0;
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

/* deal list in mobile */
/* Add your styles here */
.tophead {
  background-color: white;
  padding-top: 20px;
  padding-bottom: 10px;
}

.deal-mobile-container {
  height: 80vh;
  overflow-y: scroll;
}

.dealCard {
  background-color: white;
}

.deal-heading {
  font-size: 16px;
  color: #8b8b8b;
  font-family: sans-serif;
}

.deal-desc {
  font-size: 16px;
  color: #312867;
  font-family: sans-serif;
}

.deal-table {
  width: 100%;
  border-collapse: collapse;
}

.deal-table td {
  width: 50%;
  border: 1px solid #abaaaa;
}

.deal-check-in-btn {
  border: 2px solid #184e88;
  color: #312867;
  width: 100%;
  border-radius: 10px;
  padding: 5px;
}

.deal-check-out-btn {
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

.deal-create-btn {
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

/* My Changes */

.dropdown-cell {
  overflow: visible !important;
  /* position: relative !important; */
  z-index: 2;
}

/* Custom scrollbar styles */

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
