<template>
  <Drawer :is-open="isDrawerOpen" :speed="500" @close="closeDrawer" @search-results="handleSearchResults"></Drawer>
  <AdvisorColumnManagerDrawer :is-open="isColumnManageDrawerOpen" :columns="allColumns" :visible-columns="tableHeaders"
    @toggle-column="handleToggleColumnChange" @update-columns="handleVisibleColumnsUpdate"
    @close="closeColumnManageDrawer" />

  <!-- Mass Update Modal -->
  <MassUpdatePolicyModel :isOpen="showMassUpdate" :fields="massUpdateFields" :selected-ids="selectedAdvisors"
    @close="closeMassUpdatePopup" @mass-update="handleMassUpdate" />

  <!-- Mass Email Modal -->
  <MassUpdatePolicyEmail :isOpen="showMassEmail" :fields="emailFields" :selected-ids="selectedAdvisors"
    :selected-email-contacts="selectedEmailContacts" :templates="emailTemplates" @close="closeMassEmailPopup"
    @send-mass-email="handleMassEmail" />

  <div class="container-fluid no-scroll ps-0 pe-2" style="height: 90vh" ref="desktopRef" v-if="isDesktop">
    <div class="card pb-5">
      <div class="pt-0">
        <div class="row">
          <div class="col-lg-6 col-7">
            <p class="text-sm mb-0">
              {{ desc }}
            </p>
          </div>
          <!-- Header Section -->
          <div class="pb-0 mt-3 pe-3">
            <div class="d-flex justify-content-between align-items-center">
              <button class=" px-2 py-2 ms-2  border btn">
                Selected :{{ selectedAdvisors.length }}
              </button>

              <div class="d-flex align-items-center">
                <div style="position: relative">
                  <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static"
                    aria-expanded="false" style="border: 1px solid">
                    Quick Actions
                  </button>

                  <ul class="dropdown-menu dropdown-menu-start dropdown-menu-lg-start" style="
                border: 1px solid;
                max-height: 250px;
                position: absolute;
                top: 21px;
                left: 0px;
                width: 300px;
                overflow: hidden;
              ">
                    <!-- Search Bar (Fixed on Top) -->
                    <div class="search-container-div" style="padding: 10px">
                      <div class="search-container">
                        <input class="search-input" type="search" v-model="searchQuery" placeholder="Search"
                          aria-label="Search" style="width: 100%; padding: 5px" />
                      </div>
                    </div>

                    <!-- Scrollable List of Filtered Items -->
                    <div class="dropdown-items-container" style="max-height: 200px; overflow-y: auto">
                      <li v-for="(item, index) in filteredItems" :key="index">
                        <button class="dropdown-item" type="button" @click="handleItemClick(item)">
                          {{ capitalize(item) }}
                        </button>
                      </li>
                    </div>
                  </ul>
                </div>
                <div class="row justify-content-center mx-1">
                  <button @click="toggleDrawer()" type="button" class="btn search-btn-list"
                    :class="{ 'active-reset': isFiltered }" :title="isFiltered
                      ? 'Filters applied — click to reset'
                      : 'Search'
                      "><span class="fa fa-search cursor-pointer"></span></button>
                </div>
                <div class="row justify-content-center mx-1 gap-4">
                  <button class=" btn search-btn-list" @click="resetAdvisorlist" :class="{ 'active-reset': isFiltered }"
                    :title="isFiltered
                      ? 'Filters applied — click to reset'
                      : 'No filters to reset'
                      ">
                    <span class="fa fa-refresh cursor-pointer"></span>
                  </button>

                </div>
                <router-link :to="`/advisor`" class="mx-1">
                  <button class="mb-0 btn new-btn-list btn-sm">+ New</button>
                </router-link>

                <div class="dropdown mx-1" :class="{ dnone: !showAndHideState.import && !showAndHideState.export }">
                  <button class="btn ellipsis-btn-list " data-bs-toggle="dropdown" aria-expanded="false"
                    id="dropdownMenuButton1">
                    <p class=" fs-6 mb-0 cursor-pointer m-0 text-bold fs-5 fw-bold fa fa-ellipsis-v"></p>
                  </button>

                  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="#" @click="deleteSelectedRecords"
                        v-if="selectedAdvisors.length > 0">Delete Selected</a></li>
                    <li><a class="dropdown-item" href="#">Import</a></li>
                    <li><a href="#"><button class="dropdown-item" type="button" @click="downloadFile()"> Export
                        </button></a></li>

                    <li>
                      <button class="dropdown-item" type="button" @click="openMassUpdatePopup"
                        :disabled="selectedAdvisors.length === 0">
                        Mass Update
                      </button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button" @click="openMassEmailPopup"
                        :disabled="selectedAdvisors.length === 0">
                        Mass Email
                      </button>
                    </li>
                  </ul>
                </div>
                <div class="dropdown dropstart">
                  <button class="btn btn-light border px-2 py-1" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="bi bi-sliders no-hover"></i>
                  </button>
                  <ul class="dropdown-menu shadow-sm" style="min-width: 180px;">
                    <li>
                      <a class="dropdown-item no-hover" @click="toggleColumnManageDrawer">Manage Columns</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- Header Section ends -->
        </div>
      </div>
      <div class="card-body px-2 pt-0 pb-2">
        <div class="scrollable-container table-responsive pt-0">
          <div v-if="isResizing" class="ghost-line" :style="{ left: ghostLineX + 'px' }"></div>
          <table class="resizable-table  table align-items-center mb-0 pt-0">
            <thead>
              <tr>
                <th class="px-1" style="width: 40px; position: relative;">
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
                  <div class="d-flex align-items-center justify-content-between pe-2">
                    <a>{{ header }}</a>
                    <div class="dropdown">
                      <i class="bi bi-list fs-5 p-1 rounded-circle cursor-pointer icon-transition icon-hover"
                        role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      </i>
                      <ul class="dropdown-menu shadow" style="min-width: 180px;">
                        <li>
                          <a class="dropdown-item d-flex align-items-center gap-4 p-0" @click="toggleSort(header)"
                            style="cursor:pointer;">
                            <i v-if="sortColumn === header && sortOrder === 'asc'"
                              class="bi bi-arrow-up text-primary"></i>
                            <i v-else-if="sortColumn === header && sortOrder === 'desc'"
                              class="bi bi-arrow-down text-primary"></i>
                            <i v-else class="bi bi-arrow-up"></i>
                            <span class="text-small">
                              <span v-if="sortColumn === header && sortOrder === 'asc'">Asc</span>
                              <span v-else-if="sortColumn === header && sortOrder === 'desc'">Desc</span>
                              <span v-else>Asc</span>
                            </span>
                          </a>
                        </li>
                        <li v-if="sortColumn === header">
                          <a class="dropdown-item d-flex align-items-center gap-4 p-0" @click="clearSort"
                            style="cursor:pointer;">
                            <i class="bi bi-x-circle"></i>
                            <span class="text-small">Clear Sort</span>
                          </a>
                        </li>
                      </ul>
                    </div>

                  </div>
                  <div v-if="index !== tableHeaders.length - 1" class="resizer"
                    @mousedown="startResize($event, index + 1)"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(advisor, index) in paginatedAdvisors" :key="index" class="bottom-border-light px-2"
                @click="navigateToDetail(advisor.ROWID)" style="cursor: pointer;">
                <td>
                  <div class="d-flex justify-content-center align-items-center">
                    <div class="my-auto form-check">
                      <input id="customCheck1" class="form-check-input" type="checkbox" v-model="selectedAdvisors"
                        :value="advisor.ROWID" @click.stop/>
                    </div>
                  </div>
                </td>

                <!-- Actions Column -->
                <td v-if="isColumnVisible('Actions')" class="text-sm dropdown-cell">
                  <div class="d-flex align-items-center">
                    <router-link :to="`/detailView/` + advisor.ROWID"
                      :class="{ disable: !showAndHideState.previewButton }" tag="a" href="javascript:;"
                      data-bs-toggle="tooltip" data-bs-original-title="Preview product">
                      <i class="fas fa-eye blue-color" aria-hidden="true"></i>
                    </router-link>
                    <div class="dropdown list-ellipsis-drop" @click.stop>
                      <i class="fa-solid fa-ellipsis blue-color dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="false"></i>
                      <ul class="dropdown-menu dropdown-menu-start" aria-labelledby="dropdownMenu2">
                        <li>
                          <router-link :to="'/advisor/' + advisor.ROWID"
                            :class="{ disable: !showAndHideState.editButton }">
                            <button class="dropdown-item" type="button"> Edit </button>
                          </router-link>
                        </li>
                        <li>
                          <button @click="deleteProduct(advisor.ROWID)"
                            :class="{ disable: !showAndHideState.deleteButton }" class="dropdown-item" type="button">
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </td>

                <!-- ID Number Column -->
                <td v-if="isColumnVisible('ID Number')" class="ps-4">
                  <span class="text-xs ">{{
                    advisor?.idNumber || 'N/A'
                  }}</span>
                </td>

                <!-- Advisor Status Column -->
                <td v-if="isColumnVisible('Advisor Status')" class="ps-4">
                  <span class="text-xs ">{{
                    advisor?.status || 'N/A'
                  }}</span>
                </td>

                <!-- Name Column -->
                <td v-if="isColumnVisible('Name')" class="ps-4">
                  <div class="avatar-container">
                    <div class="avatar">
                      {{ advisor.firstName?.charAt(0).toUpperCase() + advisor.lastName?.charAt(0).toUpperCase() }}
                    </div>
                    <span class="text-xs ellipsis-badge">
                      {{ advisor?.firstName + " " + advisor?.lastName }}
                    </span>
                  </div>
                </td>

                <!-- Email Column -->
                <td v-if="isColumnVisible('Email')" class="ps-4" style="max-height: 2rem">
                  <span class="text-xs ">{{
                    advisor?.email || 'N/A'
                  }}</span>
                </td>

                <!-- Phone Column -->
                <td v-if="isColumnVisible('Phone')" class="ps-4">
                  <span class="text-xs ">{{
                    advisor?.mobile || 'N/A'
                  }}</span>
                </td>

                <!-- Module Column -->
                <td v-if="isColumnVisible('Module')" class="ps-4">
                  <span class="text-xs ">{{
                    advisor?.location || "Advisor"
                  }}</span>
                </td>

                <!-- Advisor's Date of Birth Column -->
                <td v-if="isColumnVisible('Advisor Date of Birth')" class="ps-4">
                  <span class="text-xs ">{{
                    formatDate(advisor?.advDob) || 'N/A' }}</span>
                </td>

                <!-- Advisor's Date of Hire Column -->
                <td v-if="isColumnVisible('Advisor Date of Hire')" class="ps-4">
                  <span class="text-xs ">{{
                    formatDate(advisor?.advDoh) || 'N/A'
                  }}</span>
                </td>

                <!-- Advisor's Cessation Date Column -->
                <td v-if="isColumnVisible('Advisor Cessation Date')" class="ps-4">
                  <span class="text-xs ">{{
                    formatDate(advisor?.advCessD) || 'N/A'
                  }}</span>
                </td>

                <!-- Advisor's E&O Policy Number Column -->
                <td v-if="isColumnVisible('Advisor E&O Policy Number')" class="ps-4">
                  <span class="text-xs ">{{
                    advisor?.advEOPolNum || 'N/A'
                  }}</span>
                </td>

                <!-- Advisor's Licence Number Column -->
                <td v-if="isColumnVisible('Advisor Licence Number')" class="ps-4">
                  <span class="text-xs ">{{
                    advisor?.advLicNum || 'N/A'
                  }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Custom pagination -->
        <div class="pagination-container">
          <div class="total-count">
            <p><strong>Total Advisor: {{ totalItems }}</strong></p>
            <p v-if="sortColumn" class="text-sm text-muted">
              Sorted by: {{ sortColumn }} ({{ sortOrder === 'asc' ? 'Ascending' : 'Descending' }})
            </p>
          </div>
          <!-- Custom pagination -->
          <nav class="fixed-bottom responsive-pagination" aria-label="Pagination">
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
              <li v-for="page in visiblePages" :key="page" class="page-item rounded-circle"
                :class="{ active: currentPage === page }">
                <a class="page-link" href="javascript:;" @click="gotoPage(page)">
                  {{ page }}
                </a>
              </li>

              <!-- Next page button -->
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="javascript:;" @click="nextPage"><i class="fs-5 fas fa-angle-right"></i></a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="javascript:;" @click="goTOLastPage"><i
                    class=" fs-4 fas fa-angle-double-right"></i></a>
              </li>
              <li class="page-item d-flex justify-content-end">
                <div class="bottom-right-text">
                  <p class="mb-0">
                  <div class="d-flex justify-content-end ms-2">
                    <ul class="dropdown ms-2">
                      <button class="btn btn-outline btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
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
      <Loader :loading="isLoading"></Loader>
    </div>
  </div>
  <div ref="mobileRef" v-if="!isDesktop">
    <div
      style="width:100%;height:60px;display: flex;align-items: center;justify-content:end;background-color: white;padding-right:10px; border-bottom:1px solid ; ">
      <div class="d-flex align-items-center justify-content-between">
        <div class="row justify-content-center mx-1">
          <button @click="toggleDrawer()" type="button" class="btn search-btn-list"><span
              class="fa fa-search cursor-pointer"></span></button>
        </div>
        <router-link :to="`/advisor`" class="mx-1">
          <button class="mb-0 btn new-btn-list btn-sm">+ New</button>
        </router-link>
      </div>
    </div>
    <Loader :loading="isLoading"></Loader>
    <div ref="scrollableDiv" class="scrollable-container" id="style-3" style="min-height:30vh;">

      <div class="advisorCard " style="z-index: 1; border-bottom:1px solid ; "
        v-for="(advisor, index) in paginatedAdvisors" :key="index">

        <div class="parent col-12">
          <div class="start col-9" style="padding-left:15px; padding-top:15px;">
            <table>
              <tr v-if="advisor?.idNumber">
                <td>ID: {{ advisor?.idNumber }}</td>
              </tr>
              <tr v-if="advisor?.status">
                <td>Status: {{ advisor?.status }}</td>
              </tr>
              <tr>
                <td><strong> {{ advisor?.firstName + " " + advisor?.lastName }}</strong></td>
              </tr>
              <tr>
                <td><i class="fas fa-circle" style="color: red; font-size: 10px;"></i>{{
                  advisor?.mobile || 'N/A'
                }}</td>
              </tr>
              <tr>
                <td>{{
                  advisor?.email || 'N/A'
                }}</td>
              </tr>
              <!-- Mobile view additional fields -->
              <tr v-if="advisor?.advDob">
                <td>DOB: {{ formatDate(advisor?.advDob) }}</td>
              </tr>
              <tr v-if="advisor?.advDoh">
                <td>DOH: {{ formatDate(advisor?.advDoh) }}</td>
              </tr>
              <tr v-if="advisor?.advCessD">
                <td>Cessation: {{ formatDate(advisor?.advCessD) }}</td>
              </tr>
              <tr v-if="advisor?.advEOPolNum">
                <td>E&O Policy: {{ advisor?.advEOPolNum }}</td>
              </tr>
              <tr v-if="advisor?.advLicNum">
                <td>Licence: {{ advisor?.advLicNum }}</td>
              </tr>
            </table>
          </div>
          <div class="end col-3 mt-4" style="vertical-align: center;">
            <router-link :to="`/detailView/` + advisor.ROWID">
              <img src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                alt="Circular Image" class="circle-img" style="height:56px; width:59px;">
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { putUrl } from "../../boot/axios";
import Swal from 'sweetalert2';
import Loader from "../utils/Loader.vue";
import { ref } from "vue";
import { verifyUser } from "../../verifyUser/verifyUser";
import router from "../../router/index";
import { validateAdvisorListData } from "./utils/validation";
import Drawer from "./drawer/Drawer.vue";
import AdvisorColumnManagerDrawer from "./advisorComponent/AdvisorColumnManagerDrawer.vue";
import MassUpdatePolicyModel from "../Policies/Policy/MassUpdatePolicyModel.vue";
import MassUpdatePolicyEmail from "../Policies/Policy/MassUpdatePolicyEmail.vue";

export default {
  name: "project-card",
  components: {
    Loader,
    AdvisorColumnManagerDrawer,
    MassUpdatePolicyEmail,
    MassUpdatePolicyModel,
    Drawer
  },
  data() {
    const isLoading = ref(false);
    const showAndHideState = ref({
      deleteButton: false,
      editButton: false,
      previewButton: false,
      import: false,
      export: false,
      addButton: false,
    })
    return {
      isLoading,
      advisors: [],
      originalAdvisors: [],
      currentPage: 1,
      searchPayloadFlag: false,
      isColumnManageDrawerOpen: false,
      itemsPerPage: 30,
      showMassEmail: false,
      showMassUpdate: false,
      totalItems: 0,
      isEllipsisChecked: true,
      showSearchDetail: true,
      showAndHideState,
      selectedAdvisors: [],
      isDrawerOpen: false,
      isDesktop: false,
      sortColumn: '',
      sortOrder: 'asc',
      // All available columns - Updated with all requested fields
      allColumns: [
        "Actions",
        "ID Number",
        "Advisor Status",
        "Name",
        "Email",
        "Phone",
        "Module",
        "Advisor Date of Birth",
        "Advisor Date of Hire",
        "Advisor Cessation Date",
        "Advisor E&O Policy Number",
        "Advisor Licence Number"
      ],

      // Currently visible columns - Updated with all requested fields
      tableHeaders: [
        "Actions",
        "ID Number",
        "Advisor Status",
        "Name",
        "Email",
        "Phone",
        "Module",
        "Advisor Date of Birth",
        "Advisor Date of Hire",
        "Advisor Cessation Date",
        "Advisor E&O Policy Number",
        "Advisor Licence Number"
      ],

      // Column width mapping for consistent sizing
      columnWidthMap: {
        'Actions': 120,
        'ID Number': 150,
        'Advisor Status': 180,
        'Name': 150,
        'Email': 150,
        'Phone': 130,
        'Module': 140,
        "Advisor Date of Birth": 280,
        "Advisor Date of Hire": 280,
        "Advisor Cessation Date": 280,
        "Advisor E&O Policy Number": 300,
        "Advisor Licence Number": 300
      },

      // Mass Update Fields - Updated with all requested fields
      massUpdateFields: [
        { label: "First Name", value: "firstName", type: "text" },
        { label: "Last Name", value: "lastName", type: "text" },
        { label: "Email", value: "email", type: "email" },
        { label: "Phone", value: "mobile", type: "text" },
        { label: "Location", value: "location", type: "text" },
        { label: "Status", value: "status", type: "select", options: ["Active", "Inactive", "Pending"] },
        { label: "ID Number", value: "idNumber", type: "text" },
        { label: "Advisor Status", value: "advStatus", type: "text" },
        { label: "Advisor Date of Birth", value: "advDob", type: "date" },
        { label: "Advisor Date of Hire", value: "advDoh", type: "date" },
        { label: "Advisor Cessation Date", value: "advCessD", type: "date" },
        { label: "Advisor E&O Policy Number", value: "advEOPolNum", type: "text" },
        { label: "Advisor Licence Number", value: "advLicNum", type: "text" }
      ],

      // Email Fields
      emailFields: [
        { label: "Email", value: "email", type: "email" },
        { label: "First Name", value: "firstName", type: "text" },
        { label: "Last Name", value: "lastName", type: "text" }
      ],

      // Email Templates
      emailTemplates: [
        { id: 1, name: "Welcome Email", subject: "Welcome to Our Platform", body: "Dear {firstName}, welcome to our platform!" },
        { id: 2, name: "Update Notification", subject: "Important Update", body: "Hello {firstName}, we have an important update for you." },
        { id: 3, name: "Newsletter", subject: "Monthly Newsletter", body: "Hi {firstName}, check out our latest newsletter!" }
      ],

      selectedEmailContacts: [],
      columnWidths: [],
      initialColumnWidths: [],
      ghostLineX: 0,
      resizingColumnIndex: null,
      startX: 0,
      startWidth: 0,
      isResizing: false,
      tableLeftOffset: 0,
      items: [
        "update offering and client",
        "format all phone number",
        "update commission info",
        "effective date reminder",
        "renewal date reminder",
        "update contact in policy",
        "confirm update life policy sta",
        "send to LDA",
        "sv quote email by bot",
        "send policy cancellation email",
        "update refund for visitor",
        "SV mon calculation company wise",
        "send policy start update date email",
        "update CLV in contacts",
        "send email for age barcket",
        "send card details email",
      ],
      searchQuery: "",
      hiddenColumns: [],
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
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },

    sortedAdvisors() {
      if (!this.sortColumn) {
        return this.advisors;
      }

      const sorted = [...this.advisors];

      sorted.sort((a, b) => {
        let aValue = this.getSortValue(a, this.sortColumn);
        let bValue = this.getSortValue(b, this.sortColumn);

        // Handle null/undefined values
        if (aValue === null || aValue === undefined) aValue = '';
        if (bValue === null || bValue === undefined) bValue = '';

        // Convert to string for case-insensitive comparison
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();

        if (this.sortOrder === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });

      return sorted;
    },

    paginatedAdvisors() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.sortedAdvisors.slice(startIndex, endIndex);
    },

    pages() {
      return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    },
    filteredItems() {
      return this.items.filter((item) =>
        item.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
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
    this.initializeColumnWidths();
    this.loadColumnPreferences();
  },

  methods: {
    // Helper method to format dates
    formatDate(date) {
      if (!date) return 'N/A';
      try {
        return new Date(date).toLocaleDateString();
      } catch (error) {
        return date;
      }
    },

    getSortValue(advisor, column) {
      switch (column) {
        case 'Name':
          return `${advisor.firstName || ''} ${advisor.lastName || ''}`.trim();
        case 'Email':
          return advisor.email;
        case 'Phone':
          return advisor.mobile;
        case 'Module':
          return advisor.location || 'Advisor';
        case 'ID Number':
          return advisor.idNumber || '';
        case 'Advisor Status':
          return advisor.status || '';
        case "Advisor Date of Birth":
          return advisor.advDob || '';
        case "Advisor Date of Hire":
          return advisor.advDoh || '';
        case "Advisor Cessation Date":
          return advisor.advCessD || '';
        case "Advisor E&O Policy Number":
          return advisor.advEOPolNum || '';
        case "Advisor Licence Number":
          return advisor.advLicNum || '';
        case 'Actions':
          return ''; // Actions column shouldn't be sorted
        default:
          return advisor[column] || '';
      }
    },

    // Toggle sorting for a column
    toggleSort(column) {
      if (this.sortColumn === column) {
        // Toggle order if same column
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        // New column, default to ascending
        this.sortColumn = column;
        this.sortOrder = 'asc';
      }
    },

    // Clear sorting
    clearSort() {
      this.sortColumn = '';
      this.sortOrder = 'asc';
    },

    // Initialize column widths using the width map
    initializeColumnWidths() {
      this.columnWidths = [40]; // Checkbox column width

      this.tableHeaders.forEach(header => {
        this.columnWidths.push(this.columnWidthMap[header] || 120);
      });

      this.initialColumnWidths = [...this.columnWidths];
    },

    // Load column preferences from localStorage
    loadColumnPreferences() {
      const savedColumns = localStorage.getItem('advisorTableColumns');
      if (savedColumns) {
        this.tableHeaders = JSON.parse(savedColumns);
        this.initializeColumnWidths();
      }
    },

    // Save column preferences to localStorage
    saveColumnPreferences() {
      localStorage.setItem('advisorTableColumns', JSON.stringify(this.tableHeaders));
    },

    // Check if a column is visible
    isColumnVisible(columnName) {
      return this.tableHeaders.includes(columnName);
    },

    // Mass Update Methods
    openMassUpdatePopup() {
      if (this.selectedAdvisors.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'No Advisors Selected',
          text: 'Please select at least one advisor to perform mass update.',
          timer: 3000,
          showConfirmButton: false
        });
        return;
      }
      this.showMassUpdate = true;
    },

    closeMassUpdatePopup() {
      this.showMassUpdate = false;
    },

    async handleMassUpdate(updateData) {
      try {
        this.isLoading = true;

        const payload = {
          advisorIds: this.selectedAdvisors,
          updates: updateData
        };

        const response = await axios.post(
          `${putUrl}advisorFunction/api/v1/mass-update-advisors`,
          payload
        );

        if (response.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Mass Update Successful',
            text: `Successfully updated ${this.selectedAdvisors.length} advisor(s)`,
            timer: 3000,
            showConfirmButton: false
          });

          // Refresh the advisor list
          await this.fetchAdvisors();
          this.closeMassUpdatePopup();
        } else {
          throw new Error(response.data.message || 'Update failed');
        }
      } catch (error) {
        console.error('Mass update error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: error.response?.data?.message || 'Failed to update advisors. Please try again.',
        });
      } finally {
        this.isLoading = false;
      }
    },

    // Mass Email Methods
    openMassEmailPopup() {
      if (this.selectedAdvisors.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'No Advisors Selected',
          text: 'Please select at least one advisor to send mass email.',
          timer: 3000,
          showConfirmButton: false
        });
        return;
      }

      // Prepare email contacts from selected advisors
      this.selectedEmailContacts = this.advisors
        .filter(advisor => this.selectedAdvisors.includes(advisor.ROWID))
        .map(advisor => ({
          id: advisor.ROWID,
          email: advisor.email,
          firstName: advisor.firstName,
          lastName: advisor.lastName,
          name: `${advisor.firstName} ${advisor.lastName}`
        }));

      this.showMassEmail = true;
    },

    closeMassEmailPopup() {
      this.showMassEmail = false;
      this.selectedEmailContacts = [];
    },

    async handleMassEmail(emailData) {
      try {
        this.isLoading = true;

        const payload = {
          advisorIds: this.selectedAdvisors,
          emailData: {
            subject: emailData.subject,
            body: emailData.body,
            templateId: emailData.templateId,
            cc: emailData.cc || [],
            bcc: emailData.bcc || []
          }
        };

        const response = await axios.post(
          `${putUrl}advisorFunction/api/v1/send-mass-email`,
          payload
        );

        if (response.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Emails Sent Successfully',
            text: `Successfully sent emails to ${this.selectedAdvisors.length} advisor(s)`,
            timer: 3000,
            showConfirmButton: false
          });

          this.closeMassEmailPopup();
        } else {
          throw new Error(response.data.message || 'Email sending failed');
        }
      } catch (error) {
        console.error('Mass email error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Email Sending Failed',
          text: error.response?.data?.message || 'Failed to send emails. Please try again.',
        });
      } finally {
        this.isLoading = false;
      }
    },

    capitalize(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },

    showSearchDetails() {
      let item = document.querySelector(".message-details")
      item.style.transform = this.showSearchDetail ? 'translateX(0)' : 'translateX(100%)';
      this.showSearchDetail = !this.showSearchDetail
    },

    async getAdvisorListCount() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${putUrl}canadianlicapi/contact/api/v2/get-contact-advisor-count`);
        this.totalItems = response?.data?.count;
        console.log("Advisors Count: ", this.totalItems);
      } catch (error) {
        console.error("Error fetching contact advisor count", error);
      } finally {
        this.isLoading = false
      }
    },

    async fetchAdvisors() {
      this.isLoading = true;
      try {
        const [showHide, advisorList] = await validateAdvisorListData({
          page: this.currentPage,
          limit: this.itemsPerPage
        });
        this.showAndHideState = showHide;
        this.advisors = advisorList;
        this.totalItems = advisorList.length; // Update total items based on fetched data
      } catch (error) {
        console.error('Error fetching advisors:', error);
      } finally {
        this.isLoading = false;
        this.searchPayloadFlag = false
      }
    },

    async resetAdvisorlist() {
      this.isLoading = true;
      this.currentPage = 1;
      this.itemsPerPage = 10;
      this.columnWidths = [...this.initialColumnWidths];
      this.searchPayloadFlag = false;
      this.selectedAdvisors = [];
      this.sortColumn = '';
      this.sortOrder = 'asc';

      await this.getAdvisorListCount();
      await this.fetchAdvisors();

      this.isLoading = false;
      this.isDrawerOpen = false;
    },

    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        // No need to fetch advisors again since we're doing client-side pagination
      }
    },

    async nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        // No need to fetch advisors again since we're doing client-side pagination
      }
    },

    async gotoPage(page) {
      this.currentPage = page;
      // No need to fetch advisors again since we're doing client-side pagination
    },

    async toggleSelectAll(event) {
      if (event.target.checked) {
        this.selectedAdvisors = this.paginatedAdvisors.map(advisor => advisor.ROWID);
        console.log("selectedAdvisors: " + this.selectedAdvisors);
      } else {
        this.selectedAdvisors = [];
      }
    },

    async deleteSelectedRecords() {
      if (this.selectedAdvisors.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'No Selection',
          text: 'Please select at least one advisor to delete.',
          timer: 3000,
          showConfirmButton: false
        });
        return;
      }

      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `You are about to delete ${this.selectedAdvisors.length} advisor(s). This action cannot be undone.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete them!',
        cancelButtonText: 'Cancel'
      });

      if (result.isConfirmed) {
        try {
          this.isLoading = true;
          const response = await axios.post(
            `${putUrl}advisorFunction/api/v1/delete-multiple-advisors`,
            { advisorIds: this.selectedAdvisors }
          );

          if (response.data.success) {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: `Successfully deleted ${this.selectedAdvisors.length} advisor(s)`,
              timer: 3000,
              showConfirmButton: false
            });

            // Refresh the list
            await this.fetchAdvisors();
            this.selectedAdvisors = [];
          }
        } catch (error) {
          console.error('Delete error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Delete Failed',
            text: 'Failed to delete selected advisors. Please try again.',
          });
        } finally {
          this.isLoading = false;
        }
      }
    },

    async handleSearchResults(filteredAdvisors) {
      this.searchPayloadFlag = true;
      this.isLoading = true;
      this.currentPage = 1;

      const payload = {
        page: this.currentPage,
        limit: 300,
        search: filteredAdvisors,
      };

      try {
        const [showHide, advisorList] = await validateAdvisorListData(payload);

        if (!advisorList || advisorList.length === 0) {
          Swal.fire({
            icon: "info",
            title: "No Records Found",
            text: "No advisors match your current filters.",
            timer: 2500,
            showConfirmButton: false,
          });

          this.searchPayloadFlag = false;
        } else {
          this.advisors = advisorList;
          this.totalItems = advisorList.length;
          this.itemsPerPage = advisorList.length;
          this.showAndHideState = showHide;

          Swal.fire({
            icon: "success",
            title: "Results Fetched",
            text: `${advisorList.length} advisor(s) found.`,
            timer: 2000,
            showConfirmButton: false,
          });
        }

        this.closeDrawer();

      } catch (error) {
        console.error("Error during advisor search:", error);
        Swal.fire({
          icon: "error",
          title: "Search Failed",
          text: "Something went wrong while fetching advisors.",
        });
        this.searchPayloadFlag = false;
      } finally {
        this.isLoading = false;
      }
    },

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

        if (newWidth >= 30) {
          this.ghostLineX = event.pageX - offsetLeft + scrollLeft;
        } else {
          this.ghostLineX = this.startX - offsetLeft + scrollLeft + (30 - this.startWidth);
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
    },

    async deleteProduct(id) {
      try {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: 'You are about to delete this advisor. This action cannot be undone.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'red',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
          await axios.delete(
            `${putUrl}advisorFunction/api/v1/deleteadvisor/${id}`
          );

          // Remove from local array
          const index = this.advisors.findIndex(
            (advisor) => advisor.ROWID === id
          );
          if (index !== -1) {
            this.advisors.splice(index, 1);
          }

          // Remove from selected if present
          this.selectedAdvisors = this.selectedAdvisors.filter(advisorId => advisorId !== id);

          Swal.fire("Deleted!", "The advisor has been deleted.", "success");
        }
      } catch (error) {
        console.log(error);
        Swal.fire("Error!", "Failed to delete the advisor.", "error");
      }
    },

    // Column Management Methods
    toggleColumnManageDrawer() {
      this.isColumnManageDrawerOpen = !this.isColumnManageDrawerOpen;
    },

    closeColumnManageDrawer() {
      this.isColumnManageDrawerOpen = false;
    },

    handleToggleColumnChange({ label, checked }) {
      if (checked) {
        // Add column if checked
        if (!this.tableHeaders.includes(label)) {
          this.tableHeaders.push(label);
        }
      } else {
        // Remove column if unchecked
        this.tableHeaders = this.tableHeaders.filter(col => col !== label);
      }

      this.initializeColumnWidths();
      this.saveColumnPreferences();
    },

    handleVisibleColumnsUpdate(newVisibleColumns) {
      this.tableHeaders = newVisibleColumns;
      this.initializeColumnWidths();
      this.saveColumnPreferences();
    },

    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
    },

    closeDrawer() {
      this.isDrawerOpen = false;
    },

    navigateToDetail(rowId) {
      this.$router.push(`/detailView/${rowId}`);
    },


    async downloadFile() {
      try {
        const response = await axios.post(`${putUrl}advisorFunction/api/v1/download-files`);
        const csvContent = response.data;
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `advisors_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading file:", error);
        Swal.fire({
          icon: "error",
          title: "Download Failed",
          text: "Failed to download the file. Please try again.",
        });
      }
    },

    checkScreenSize() {
      this.isDesktop = window.innerWidth >= 500;
    },

    async updateItemsPerPage(size) {
      this.itemsPerPage = size;
      this.currentPage = 1;
      // No need to fetch advisors again since we're doing client-side pagination
    },

    handleItemClick(item) {
      console.log('Quick action clicked:', item);
      // Implement quick action functionality here
      Swal.fire({
        icon: 'info',
        title: 'Quick Action',
        text: `Action "${item}" would be performed here`,
        timer: 2000,
        showConfirmButton: false
      });
    },

    goTOFirstPage() {
      if (this.currentPage > 1) {
        this.currentPage = 1;
      }
    },

    goTOLastPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage = this.totalPages;
      }
    }
  },

  mounted: async function () {
    this.isLoading = true

    try {
      this.checkScreenSize();
      window.addEventListener("resize", this.checkScreenSize);

      const verified = await verifyUser();
      if (!verified) {
        router.push("/signin");
        return;
      }
      await this.fetchAdvisors();
      await this.getAdvisorListCount();

    } catch (error) {
      console.error("Initialization failed:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Load Data",
        text: "Something went wrong while loading the page.",
      });
    } finally {
      this.isLoading = false;
    }
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize)
  },

  props: {
    th1: {
      type: String,
      default: "Actions",
    },
    th2: {
      type: String,
      default: "Name",
    },
    th3: {
      type: String,
      default: "Email",
    },
    th4: {
      type: String,
      default: "Phone",
    },
    th5: {
      type: String,
      default: "Module",
    },
    desc: {
      type: String,
      // default: "Advisor Management"
    }
  },
};
</script>

<style scoped>
/* Your existing styles remain the same */
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

i {
  padding: 0.5rem;
}

i:hover {
  background-color: #dce0e4;
  border-radius: 50%;
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
  overflow-y: auto;
}

.custom-scroll::-webkit-scrollbar {
  display: none;
}

.no-scroll {
  overflow: hidden;
}

nav a {
  padding: 10px;
}

.pagination .page-item {
  cursor: pointer;
  background-color: transparent;
}

.pagination .page-link {
  color: #6c757d;
  background-color: transparent;
  border: none;
  font-weight: 800;
}

.pagination .page-link:hover {
  color: #495057;
}

.pagination .page-link:focus {
  box-shadow: none;
}

.pagination .page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
}

.pagination .page-item.active .page-link {
  background-color: #8AAEE0;
  border-color: #8AAEE0;
}

.pagination .page-item.active .page-link:hover {
  background-color: #8AAEE0;
  border-color: #8AAEE0;
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

.email-column {
  max-width: 160px;
  word-wrap: break-word;
  display: block;
}

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
  border-radius: 1010px;
  padding: 5px;
}

.parent {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.circle-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

@media (min-width: 601px) and (max-width: 900px) {
  .message-details {
    width: 40%;
    height: 84vh;
  }
}

/* Resizer styles */
.resizer {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 5px;
  background: transparent;
  cursor: col-resize;
  user-select: none;
  z-index: 1;
}

.resizer:hover {
  background: #8AAEE0;
}

.ghost-line {
  position: absolute;
  top: 0;
  width: 2px;
  height: 100%;
  background: #8AAEE0;
  pointer-events: none;
  z-index: 1000;
}

.dnone {
  display: none !important;
}

.disable {
  pointer-events: none;
  opacity: 0.5;
}

/* Disabled state for buttons */
.dropdown-item:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #f8f9fa;
}

/* Sorting styles */
.text-primary {
  color: #8AAEE0 !important;
}

.bi-arrow-up,
.bi-arrow-down {
  font-weight: bold;
}
</style>