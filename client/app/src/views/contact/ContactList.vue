<template>
  <Drawer :is-open="isDrawerOpen" :speed="500" @close="closeDrawer" @search-results="handleSearchResults"
    :isLoading="isLoading">
  </Drawer>
  <ContactColumnManageDrawer :is-open="isColumnManageDrawerOpen" :columns="visibleColumns.map(col => col.label)"
    :visible-columns="visibleColumns.filter(col => col.visible).map(col => col.label)"
    @update-columns="handleUpdateVisibleColumns" @close="closeColumnManageDrawer" />
  <div class="card no-scroll me-2" style="min-height: 90vh;" ref="desktopRef" v-if="isDesktop">
    <!-- Header Section -->
    <div class="pb-0 mt-3 pe-2">
      <div class="d-flex justify-content-end align-items-center">
        <div class="d-flex align-items-center">
          <div class="row justify-content-center mx-1">
            <button @click="toggleDrawer()" type="button" class="btn search-btn-list"><span
                class="fa fa-search cursor-pointer"></span>
            </button>

          </div>
          <div class="row justify-content-center mx-1 gap-4">
            <button class=" btn search-btn-list" @click="resetLeadList">
              <span class="fa fa-refresh cursor-pointer"></span>
            </button>

          </div>
          <router-link :to="`/contact`" class="mx-1" :class="{ dnone: !showAndHideState.addButton }">
            <button class="mb-0 btn new-btn-list btn-sm">+ New</button>
          </router-link>
        </div>
        <div class="dropdown mx-1" :class="{ dnone: !showAndHideState.import && !showAndHideState.export }">
          <button class="btn ellipsis-btn-list " data-bs-toggle="dropdown" aria-expanded="false"
            id="dropdownMenuButton1">
            <p class=" fs-6 mb-0 cursor-pointer m-0 text-bold fs-5 fw-bold fa fa-ellipsis-v"></p>
          </button>

          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
            <li :style="{ display: selectedContacts.length === 0 ? 'none' : 'block' }" @click="deleteSelectedRecords"><a
                class="dropdown-item" href="#" :class="{ dnone: !showAndHideState.import }"> Delete Selected</a></li>
            <li><a class="dropdown-item" href="#" :class="{ dnone: !showAndHideState.import }">Import</a></li>
            <li><a class="dropdown-item p-0" href="#" :class="{ dnone: !showAndHideState.export }"><button
                  class="dropdown-item" type="button" @click="downloadFile()">Export</button></a></li>
            <li>
              <button class="dropdown-item" type="button" @click="openMassUpdatePopup">
                Mass Update
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button" @click="
                ">
                Mass Email
              </button>
            </li>
          </ul>
        </div>

        <!-- Dropdown Button -->
        <div class="dropdown dropstart">
          <button class="btn btn-light border px-2 py-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
    <!-- Header Section ends -->
    <!-- Body Section -->
    <div class="card-body px-2 pt-0 pb-2">
      <div class="scrollable-container table-responsive pb-0">
        <div v-if="isResizing" class="ghost-line" :style="{ left: ghostLineX + 'px' }"></div>
        <MassUpdateModal :isOpen="showMassUpdate" @close="closeMassUpdatePopup"
          :fields="visibleColumns.filter(col => col.label !== 'Action').map(col => col.label)"
          @update-mass="handleMassUpdate" />
        <MassUpdateEmailModal :isOpen="showMassEmail" :fields="visibleColumns.map(col => col.label)"
          :selected-email-contacts="selectedEmailContacts" :selected-ids="selectedLeads" :templates="emailTemplates"
          @close="closeMassEmailPopup" @send-mass-email="handleMassEmail" />

        <!-- Contact List Table (Dynamic Columns) -->
        <table class="resizable-table table align-items-center mb-0">
          <thead class="thead-light bottom-border-light">
            <tr>
              <!-- Checkbox Column -->
              <th class="ps-1 pe-0" style="width: 80px; position: relative">
                <div class="d-flex justify-content-center">
                  <input id="selectAll" class="form-check-input" type="checkbox"
                    :checked="selectedContacts.length && selectedContacts.length === paginatedContacts.length"
                    @change="toggleSelectAll($event)" />
                  <!-- <div class="resizer" @mousedown="startResize($event, 0)"></div> -->
                </div>
              </th>
              <!-- Dynamic Columns -->
              <th v-for="(col, index) in visibleColumns.filter(col => col.visible)" :key="col.key"
                class="px-auto text-uppercase text-xxs text-start" style="position: relative"
                :style="{ width: columnWidths[index] + 'px' }">
                <div class="d-flex align-items-center justify-content-between pe-2">
                  <a>{{ col.label }}</a>
                  <!-- Sort Icons -->
                  <div class="dropdown">
                    <i class="bi bi-list dropdown-toggle fs-5 p-1 rounded-circle cursor-pointer icon-transition icon-hover"
                      role="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                    <ul class="dropdown-menu shadow" style="min-width: 180px;">
                      <li>
                        <a class="dropdown-item d-flex align-items-center gap-4 p-0" @click="toggleSort(col.key)"
                          style="cursor:pointer;">
                          <i v-if="sortOrder === 'asc'" class="bi bi-arrow-up no-hover"></i>
                          <i v-else class="bi bi-arrow-down no-hover"></i>
                          <span v-if="sortColumn === col.key">
                            <span v-if="sortOrder === 'asc'" class="text-small">Asc</span>
                            <span v-else class="text-small">Des</span>
                          </span>
                          <span v-else class="text-small">Asc</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div v-if="index !== visibleColumns.filter(col => col.visible).length - 1" class="resizer"
                  @mousedown="startResize($event, index)">
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(contact, index) in paginatedContacts" :key="index" class="bottom-border-light px-2">
              <!-- Checkbox -->
              <td>
                <div class="d-flex">
                  <div class="my-auto form-check">
                    <input id="customCheck1" class="form-check-input" type="checkbox" v-model="selectedContacts"
                      :value="contact.contactROWID" />
                  </div>
                </div>
              </td>

              <!-- Actions -->
              <td v-if="isVisible('Action')" class="ps-0 text-sm dropdown-cell">
                <div class="d-flex align-items-start ml-4">
                  <router-link :to="'/contactview/' + contact.contactROWID"
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
                        <router-link :to="'/contact/' + contact.contactROWID"
                          :class="{ disable: !showAndHideState.editButton }">
                          <button class="dropdown-item" type="button"> Edit </button>
                        </router-link>
                      </li>
                      <li>
                        <button @click="confirmDelete(contact.contactROWID)"
                          :class="{ disable: !showAndHideState.deleteButton }" class="dropdown-item" type="button">
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </td>

              <td v-if="isVisible('Lead Converted On')" class="ps-0">
                {{ contact.leadConvertedOn }}
              </td>

              <td v-if="isVisible('Created Time')" class="ps-0">
                {{ formatCreatedDateTime(contact.CREATEDTIME) }}
              </td>

              <td v-if="isVisible('Lead Created On')" class="ps-0">
                {{ contact.leadCreatedOn }}
              </td>

              <td v-if="isVisible('Deal Stage Tracking')" class="ps-0">
                {{ contact.dealStageTracking }}
              </td>

              <td v-if="isVisible('Contact Name')" class="ps-0">
                <div class="avatar-container">
                  <div class="avatar">
                    {{ (contact.firstName ?? '').slice(0, 2) }}
                  </div>
                  <span>
                    {{ (contact.firstName ?? '') + ' ' + (contact.lastName ?? '') }}
                  </span>
                </div>
              </td>

              <td v-if="isVisible('Mobile')" class="ps-0">
                {{ contact.mobile }}
              </td>

              <td v-if="isVisible('Email')" class="ps-0">
                {{ contact.email }}
              </td>

              <td v-if="isVisible('Service Availed Options')" class="ps-0">
                {{ contact.serviceAvailedOptions }}
              </td>

              <td v-if="isVisible('Insurance Leads Source')" class="ps-0">
                {{ contact.insuranceLeadsSource }}
              </td>

              <td v-if="isVisible('Assign Advisor')" class="ps-0">
                {{ contact.advisorModuleName }}
              </td>

              <td v-if="isVisible('CLV Corporate Commission')" class="ps-0">
                {{ contact.clvCorporateCommission }}
              </td>

              <td v-if="isVisible('CLV Advisor Commission')" class="ps-0">
                {{ contact.clvAdvisorCommission }}
              </td>

              <td v-if="isVisible('Last CLV Corporate')" class="ps-0">
                {{ contact.lastCLVCorporate }}
              </td>

              <td v-if="isVisible('Last CLV Advisor')" class="ps-0">
                {{ contact.lastCLVAdvisor }}
              </td>

              <td v-if="isVisible('Phone')" class="ps-0">
                {{ contact.phoneNumber }}
              </td>

              <td v-if="isVisible('Contact Owner')" class="ps-0">
                {{ contact.UserfullName }}
              </td>

              <td v-if="isVisible('Mailing Street')" class="ps-0">
                {{ contact.mailingStreet }}
              </td>

              <td v-if="isVisible('Mailing City')" class="ps-0">
                {{ contact.mailingCity }}
              </td>

              <td v-if="isVisible('Mailing Zip')" class="ps-0">
                {{ contact.mailingZip }}
              </td>

              <td v-if="isVisible('Relationship Status')" class="ps-0">
                {{ contact.relationshipStatus }}
              </td>

              <td v-if="isVisible('Emergency Contact')" class="ps-0">
                {{ contact.emergencyContact }}
              </td>

              <td v-if="isVisible('Emergency Contact Email')" class="ps-0">
                {{ contact.emergencyContactEmail }}
              </td>

              <td v-if="isVisible('Emergency Contact Phone')" class="ps-0">
                {{ contact.emergencyContactPhone }}
              </td>

              <td v-if="isVisible('Emergency Contact Relationship')" class="ps-0">
                {{ contact.emergencyContactRelationship }}
              </td>

              <td v-if="isVisible('Preferred Contact Method')" class="ps-0">
                {{ contact.preferredContactMethod }}
              </td>

              <td v-if="isVisible('Date of Birth')" class="ps-0">
                {{ contact.dateOfBirth }}
              </td>

              <td v-if="isVisible('New Service Requested')" class="ps-0">
                {{ contact.newServiceRequested }}
              </td>

              <td v-if="isVisible('GCLID')" class="ps-0">
                {{ contact.gclid }}
              </td>
            </tr>
          </tbody>


        </table>
      </div>
      <Loader :loading="isLoading"></Loader>
      <div class="pagination-container">
        <div class="total-count">
          <p>
            <strong>Total Leads: {{ totalItems }}</strong>
          </p>
        </div>

        <div class="pagination-wrapper ">
          <nav class="fixed-bottom responsive-pagination" aria-label="Pagination">
            <ul class="pagination justify-content-center">
              <!-- Previous page button -->
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="javascript:;" @click="goTOFirstPage">
                  <i class="fs-4 fas fa-angle-double-left"></i>
                </a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="javascript:;" @click="prevPage">
                  <i class="fs-5 fas fa-angle-left"></i>
                </a>
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
                <a class="page-link" href="javascript:;" @click="nextPage">
                  <i class="fs-5 fas fa-angle-right"></i>
                </a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="javascript:;" @click="goTOLastPage">
                  <i class="fs-4 fas fa-angle-double-right"></i>
                </a>
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
        <router-link :to="`/contact`" class="mx-1" :class="{ dnone: !showAndHideState.addButton }">
          <button class="mb-0 btn new-btn-list btn-sm">+ New</button>
        </router-link>
      </div>
    </div>
    <Loader :loading="isLoading"></Loader>
    <div class="contactCard  " style="z-index: 1; border-bottom:1px solid ; "
      v-for="(contact, index) in paginatedContacts" :key="index">



      <div class="parent col-12">
        <div class="start col-9" style="padding-left:15px; padding-top:15px;">
          <table>
            <tr>
              <td><strong> {{
                contact.firstName + " " + contact.lastName
              }}</strong></td>
            </tr>
            <tr>
              <td><i class="fas fa-circle" style="color: red; font-size: 10px;"></i>{{
                contact.mobile
              }}</td>
            </tr>
            <tr>
              <td>{{
                contact.email
              }}</td>
            </tr>
            <tr>
              <td>{{ contact.insuranceLeadsSource }}</td>
            </tr>
          </table>
        </div>
        <div class="end col-3 mt-4" style="vertical-align: center;">
          <router-link :to="'/contactview/' + contact.contactROWID">
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
</template>

<script>
import axios from "axios";
import { putUrl } from "../../boot/axios";
import router from "../../router/index.js";
import { verifyUser } from "../../verifyUser/verifyUser.js";
import { validateContactListData } from "./utils/validation.js";
import { reactive, ref } from "vue";
import Swal from "sweetalert2";
import Loader from "../utils/Loader.vue";
import Drawer from "./contractDrawer/Drawer.vue";
import MassUpdateModal from "./MassUpdateModal.vue";
import MassUpdateEmailModal from "./MassUpdateEmailModal.vue";
import ContactColumnManageDrawer from "./ContactColumnManageDrawer.vue";
import moment from "moment";
export default {
  components: {
    Loader,
    Drawer,
    MassUpdateModal,
    MassUpdateEmailModal,
    ContactColumnManageDrawer
  },
  data() {
    const popOverAlertMessage = ref("");
    const contacts = reactive([]);
    const originalContacts = reactive([]);
    const startPage = ref(1);
    const isLoading = ref(false);
    const showSearchDetail = ref(true)
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
      showSearchDetail,
      popOverAlertMessage,
      startPage,
      contacts,
      searchPayloadFlag: false,
      totalItems: 0,
      currentPage: 1,
      itemsPerPage: 30,
      showAndHideState,
      selectedContacts: [],
      isDrawerOpen: false,
      isDesktop: false,
      sortColumn: null,
      sortOrder: 'asc',
      isColumnManageDrawerOpen: false,
      tableHeaders: [
        "Actions",
        "Name",
        "Email",
        "Phone",
        "Module"
      ],
      visibleColumns: [
        { label: "Action", key: "actions", visible: true },
        { label: "Lead Converted On", key: "leadConvertedOn", visible: true },
        { label: "Created Time", key: "CREATEDTIME", visible: true },
        { label: "Lead Created On", key: "leadCreatedOn", visible: true },
        { label: "Deal Stage Tracking", key: "dealStageTracking", visible: true },
        {
          label: "Contact Name", key: "contactName", visible: true,
          compute: c => `${c.firstName ?? ''} ${c.lastName ?? ''}`.trim()
        },
        { label: "Mobile", key: "mobile", visible: true },
        { label: "Email", key: "email", visible: true },
        { label: "Service Availed Options", key: "serviceAvailedOptions", visible: true },
        { label: "Insurance Leads Source", key: "insuranceLeadsSource", visible: true },
        { label: "Assign Advisor", key: "advisorModuleName", visible: true },
        { label: "CLV Corporate Commission", key: "clvCorporateCommission", visible: true },
        { label: "CLV Advisor Commission", key: "clvAdvisorCommission", visible: true },
        { label: "Last CLV Corporate", key: "lastCLVCorporate", visible: true },
        { label: "Last CLV Advisor", key: "lastCLVAdvisor", visible: true },
        { label: "Phone", key: "phoneNumber", visible: true },
        { label: "Contact Owner", key: "UserfullName", visible: true },
        { label: "Mailing Street", key: "mailingStreet", visible: true },
        { label: "Mailing City", key: "mailingCity", visible: true },
        { label: "Mailing Zip", key: "mailingZip", visible: true },
        { label: "Relationship Status", key: "relationshipStatus", visible: true },
        { label: "Emergency Contact", key: "emergencyContact", visible: true },
        { label: "Emergency Contact Email", key: "emergencyContactEmail", visible: true },
        { label: "Emergency Contact Phone", key: "emergencyContactPhone", visible: true },
        { label: "Emergency Contact Relationship", key: "emergencyContactRelationship", visible: true },
        { label: "Preferred Contact Method", key: "preferredContactMethod", visible: true },
        { label: "Date of Birth", key: "dateOfBirth", visible: true },
        { label: "New Service Requested", key: "newServiceRequested", visible: true },
        { label: "GCLID", key: "gclid", visible: true }
      ],
      sortColumn: null,
      sortOrder: 'asc',
      // Use this in your data() for ContactList.vue

      initialColumnWidths: {
        'Action': 120,
        'Lead Converted On': 220,
        'Created Time': 210,
        'Lead Created On': 240,
        'Deal Stage Tracking': 250,
        'Contact Name': 180,
        'Mobile': 140,
        'Email': 150,
        'Service Availed Options': 300,
        'Insurance Leads Source': 300,
        'Assign Advisor': 280,
        'CLV Corporate Commission': 280,
        'CLV Advisor Commission': 280,
        'Last CLV Corporate': 280,
        'Last CLV Advisor': 280,
        'Phone': 140,
      },
      headerFieldMap: {
        'Lead Converted On': 'leadConvertedOn',
        'Created Time': 'CREATEDTIME',
        'Lead Created On': 'leadCreatedOn',
        'Deal Stage Tracking': 'dealStageTracking',
        'Contact Name': 'contactName',
        'Mobile': 'mobile',
        'Email': 'email',
        'Service Availed Options': 'serviceAvailedOptions',
        'Insurance Leads Source': 'insuranceLeadsSource',
        'Assign Advisor': 'advisorModuleName',
        'CLV Corporate Commission': 'clvCorporateCommission',
        'CLV Advisor Commission': 'clvAdvisorCommission',
        'Last CLV Corporate': 'lastCLVCorporate',
        'Last CLV Advisor': 'lastCLVAdvisor',
        'Phone': 'phoneNumber',
        'Contact Owner': 'UserfullName',
        'Mailing Street': 'mailingStreet',
        'Mailing City': 'mailingCity',
        'Mailing Zip': 'mailingZip',
        'Relationship Status': 'relationshipStatus',
        'Emergency Contact': 'emergencyContact',
        'Emergency Contact Email': 'emergencyContactEmail',
        'Emergency Contact Phone': 'emergencyContactPhone',
        'Emergency Contact Relationship': 'emergencyContactRelationship',
        'Preferred Contact Method': 'preferredContactMethod',
        'Date of Birth': 'dateOfBirth',
        'New Service Requested': 'newServiceRequested',
        'GCLID': 'gclid'
      },
      ghostLineX: 0,
      resizingColumnIndex: null,
      startX: 0,
      startWidth: 0,
      isResizing: false,
      tableLeftOffset: 0,
      // Mass Update & Mass Email
      showMassUpdate: false,
      showMassEmail: false,
      selectedLeads: [],
      selectedEmailContacts: [],
      emailTemplates: [],
    };
  },

  async beforeMount() {
    this.isLoading = true;
    this.showAndHideState = (await validateContactListData()).showAndHideState;
    this.contacts = (await validateContactListData()).flattenedContacts;
    this.originalContacts = (await validateContactListData()).flattenedContacts;

    const verified = await verifyUser();
    if (!verified) {
      router.push("/signin");
    } else {
      this.isLoading = false;
    }
    this.isLoading = false;
  },
  computed: {
    sortedContacts() {
      let sorted = [...this.contacts];
      if (!this.sortColumn) return sorted;

      const col = this.visibleColumns.find(c => c.key === this.sortColumn);
      if (!col) return sorted;

      sorted.sort((a, b) => {
        let valA = col.compute ? col.compute(a) : a[col.key] ?? '';
        let valB = col.compute ? col.compute(b) : b[col.key] ?? '';

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        return this.sortOrder === 'asc'
          ? valA > valB ? 1 : valA < valB ? -1 : 0
          : valA < valB ? 1 : valA > valB ? -1 : 0;
      });

      return sorted;
    },
    selectedEmailContacts() {
      // Map selectedContacts (IDs) to full contact objects
      return this.contacts
        .filter(c => this.selectedContacts.includes(c?.ROWID))
        .map(c => ({
          id: c?.ROWID,
          name: `${c?.firstName ?? ''} ${c?.lastName ?? ''}`.trim(),
          email: c?.email
        }));
    },

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
    // paginatedContacts() {
    //   return this.contacts
    // },
    paginatedContacts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      console.log(this.sortedContacts.slice(start, end), "---paginatedContacts---")
      return this.sortedContacts.slice(start, end);
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
    this.columnWidths = this.visibleColumns.map(col => {
      return this.initialColumnWidths[col.label] || 350;
    });

  },
  mounted() {
    this.checkScreenSize();
    this.getContactClientCount();
    window.addEventListener("resize", this.checkScreenSize)
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize)
  },
  methods: {
    // Mass Update & Mass Email Methods
    openMassUpdatePopup() {
      this.showMassUpdate = true;
    },
    closeMassUpdatePopup() {
      this.showMassUpdate = false;
    },
    async handleMassUpdate({ field, value }) {
      this.isLoading = true;
      try {
        if (!this.selectedContacts?.length) {
          Swal.fire({ icon: "warning", text: "Please select at least one row." });
          return;
        }
        const payload = {
          field,
          value,
          ids: this.selectedLeads.length ? this.selectedLeads : []
        };
        const response = await axios.post(
          `${putUrl}canadianlicapi/lead/api/v2/mass-update`,
          payload
        );
        Swal.fire({
          icon: "success",
          title: "Mass Update Successful",
          text: response.data?.message || "Leads updated successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        await this.fetchContacts();
        this.closeMassUpdatePopup();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Mass Update Failed",
          text: error.response?.data?.message || "Something went wrong.",
        });
      } finally {
        this.isLoading = false;
      }
    },
    openMassEmailPopup() {
      this.showMassEmail = true;
    },
    closeMassEmailPopup() {
      this.showMassEmail = false;
    },
    handleMassEmail({ from, contactData }) {
      axios.post('/send-mass-email', {
        contactData
      }).then(() => {
        Swal.fire({ icon: "success", title: "Emails sent!" });
      }).catch(() => {
        Swal.fire({ icon: "error", title: "Failed to send emails" });
      });
    },
    async handleSearchResults(searchFields) {
      console.log('Filtered Leads from Drawer:', searchFields);
      this.isLoading = true;

      try {
        if (Array.isArray(searchFields)) {
          const payload = {
            page: this.currentPage,
            limit: '300',
            search: searchFields
          };
          this.isLoading = true;
          const result = await validateContactListData(payload);
          if (result && result.flattenedContacts) {
            this.contacts = result.flattenedContacts;
          } else {
            console.warn('Unexpected response format:', result);
            this.contacts = [];
            Swal.fire("No results", "No contacts matched your search", "info");
          }
        } else {
          throw new Error("Search data format invalid");
        }
      } catch (error) {
        console.error('Error while fetching contacts:', error);
        Swal.fire("Search Failed", error?.response?.data?.message || "Something went wrong. Please try again.", "error");
        this.contacts = [];
      } finally {
        this.isLoading = false;
        this.closeDrawer();
      }
    },
    toggleSort(header) {
      if (this.sortColumn === header) {
        // Toggle order
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        // New column, default to asc
        this.sortColumn = header;
        this.sortOrder = 'asc';
      }
    },
    async fetchContacts() {
      try {
        this.isLoading = true;
        const payload = {
          page: this.currentPage,
          limit: this.itemsPerPage,
        };
        const result = await validateContactListData(payload);
        if (result && result.flattenedContacts) {
          this.contacts = result.flattenedContacts;
        } else {
          this.contacts = [];
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
        this.contacts = [];
      } finally {
        this.isLoading = false;
      }
    },
    formatCreatedDateTime(dateTime) {
      if (!dateTime) return "N/A";
      return moment(dateTime).format("DD-MM-YYYY   hh:mm A");
    },
    async resetLeadList() {
      this.isLoading = true;
      this.currentPage = 1;
      this.itemsPerPage = 10;
      this.columnWidths = this.visibleColumns.map(col => this.initialColumnWidths[col.label] || 350); // <-- FIXED
      this.searchPayloadFlag = false;

      await this.getContactClientCount();
      await this.fetchContacts();

      this.isLoading = false;
    },

    showSearchDetails() {
      let item = document.querySelector(".message-details")
      item.style.transform = this.showSearchDetail ? 'translateX(0)' : 'translateX(100%)';
      this.showSearchDetail = !this.showSearchDetail
    },
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        await this.fetchContacts();
      }
    },
    async nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        await this.fetchContacts();
      }
    },
    async gotoPage(pageNumber) {
      this.currentPage = pageNumber;
      await this.fetchContacts();
    },
    async goTOFirstPage() {
      this.currentPage = 1;
      await this.fetchContacts();
    },
    async goTOLastPage() {
      this.currentPage = this.totalPages;
      await this.fetchContacts();
    },
    toggleSelectAll(event) {
      if (event.target.checked) {
        this.selectedContacts = this.contacts.map(items => items.ROWID);
        //   console.log("ids", this.contacts)
      } else {
        this.selectedContacts = [];
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
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {

          // Call your function here when the user clicks "Ok"
          this.deleteContact(id);
        }
      });
    },
    async deleteSelectedRecords() {
      if (confirm("Are you sure you want to delete the selected records?")) {
        // const ids = this.selectedDeals.join(',');
        // const dataToSend = JSON.stringify({ids });
        // console.log("dataToSend",dataToSend);
        let idArray = [];
        for (let value of this.selectedContacts) {
          console.log("seleted vuale ==>", value)
          idArray.push(value)
        }
        console.log({ idArray })

        this.deleteContact(idArray);
        this.contacts = [];
        this.showSearchDetails();
      }
    },
    async deleteContact(id) {
      this.isLoading = true;
      console.log(id);
      try {
        // Send a request to delete the contact
        const response = await axios.delete(
          `${putUrl}contact/api/v1/deletecontact/${id}`
        );
        this.isLoading = false;
        // Remove the deleted contact from the local data
        this.contacts = this.contacts.filter((contact) => contact.ROWID !== id);
        console.log(response.data.message);
        Swal.fire({
          title: "<strong>Contact Deleted Successfully</strong>",
          icon: "success",
        });
        // this.$forceUpdate();
      } catch (error) {
        this.isLoading = false;
        console.error(error);
        // Display an error message using Swal.fire
        Swal.fire({
          title: "<strong>Error Deleting Contact</strong>",
          text: error.response && error.response.data ? error.response.data.message : "An error occurred while deleting the contact.",
          icon: "error",
        });
      }
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    exportToExcel() {
      const header = Object.keys(this.contacts[0]).join(",");
      const csvContent = this.contacts.map((contact) => Object.values(contact).join(",")).join("\n");
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
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
    },
    closeDrawer() {
      this.isDrawerOpen = false;
    },
    async downloadFile() {
      try {
        const sampleFile = await axios.post(`${putUrl}contact/api/v1/download-files`);
        const csvContent = sampleFile.data;
        // Send the CSV file for download
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `contacts.csv`;
        link.click();
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    },
    checkScreenSize() {
      this.isDesktop = window.innerWidth >= 500;
    },
    async getContactClientCount() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${putUrl}canadianlicapi/contact/client/api/v2/get-contact-client-count`);
        this.totalItems = response?.data?.count;
        // console.log("Deals Count: ", this.totalItems);
      } catch (error) {
        console.error("Error fetching deals count", error);
      } finally {
        this.isLoading = false
      }
    },
    startResize(event, columnIndex) {
      this.isResizing = true;
      this.resizingColumnIndex = columnIndex;
      this.startX = event.clientX;
      this.startWidth = this.columnWidths[columnIndex];

      const tableWrapper = document.querySelector('.scrollable-container');
      const scrollLeft = tableWrapper ? tableWrapper.scrollLeft : 0;
      const offsetLeft = tableWrapper ? tableWrapper.getBoundingClientRect().left : 0;

      this.tableLeftOffset = offsetLeft;
      // Use clientX for more accurate positioning relative to the container
      this.ghostLineX = event.clientX - offsetLeft + scrollLeft;

      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', this.onDragging);
      document.addEventListener('mouseup', this.stopResize);
    },

    onDragging(event) {
      if (this.isResizing) {
        const tableWrapper = document.querySelector('.scrollable-container');
        const scrollLeft = tableWrapper ? tableWrapper.scrollLeft : 0;
        const offsetLeft = tableWrapper ? tableWrapper.getBoundingClientRect().left : 0;

        const moved = event.clientX - this.startX;
        const newWidth = this.startWidth + moved;

        // ghost-line moves normally until it hits 60px limit
        if (newWidth >= 60) {
          this.ghostLineX = event.clientX - offsetLeft + scrollLeft;
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
    },

    toggleColumnManageDrawer() {
      this.isColumnManageDrawerOpen = !this.isColumnManageDrawerOpen;
      // alert("Column Manage Drawer Toggled");  
    },
    closeColumnManageDrawer() {
      this.isColumnManageDrawerOpen = false;
    },
    closeColumnManageDrawer() {
      this.isColumnManageDrawerOpen = false;
    },
    handleUpdateVisibleColumns(updatedLabels) {
      this.visibleColumns = this.visibleColumns.map(col => ({
        ...col,
        visible: updatedLabels.includes(col.label)
      }));

      console.log(this.visibleColumns, "Visible Columns")
    },
    isVisible(colLabel) {
      return this.visibleColumns.some(col => col.label === colLabel && col.visible);
    }

  },
};
</script>

<style scoped>
.btn-outline-primary:hover {
  background-color: null,
}

input:focus {
  border-color: var(--blue-color) !important;
}

.text-size {
  font-size: 15px !important;
}

.custom-scroll {
  overflow-y: auto;
  max-height: calc(100vh - 200px);
}


i {
  padding: 0.5rem;
}

i:hover {
  background-color: #dce0e4;
  border-radius: 50%;
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




/* Hover effect for table rows */
tbody tr:hover {
  background-color: #fff5ee;
}

th a {
  font-size: 15px !important;
}

td {
  font-size: 15px !important;
}

td span {
  font-size: 15px !important;
}

.avatar-container {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.avatar-container>span {
  flex: 1 1 0;
  min-width: 0;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  max-width: 100%;
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

.pagination .page-link:hover {
  color: #495057;
  /* Change link color on hover */
}

.pagination .page-link:focus {
  box-shadow: none;
}

/* Remove default Bootstrap caret */
.dropdown-toggle::after {
  display: none !important;
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
  z-index: 6;
  position: fixed;
  height: 72vh;
  right: 0;
  bottom: 1rem;
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

/* lead list in mobile */
/* Add your styles here */
.tophead {
  background-color: white;
  padding-top: 20px;
  padding-bottom: 10px;
}

.contact-mobile-container {
  height: 80vh;
  overflow-y: scroll;
}

.contactCard {
  background-color: white;
}

.contact-heading {
  font-size: 16px;
  color: #8b8b8b;
  font-family: sans-serif;
}

.contact-desc {
  font-size: 16px;
  color: #312867;
  font-family: sans-serif;
}

.contact-table {
  width: 100%;
  border-collapse: collapse;
}

.contact-table td {
  width: 50%;
  border: 1px solid #abaaaa;
}

.contact-table td p {
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
}

.contact-check-in-btn {
  border: 2px solid #184e88;
  color: #312867;
  width: 100%;
  border-radius: 10px;
  padding: 5px;
}



.resizable-table th>span {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  max-width: 100%;
}

.contact-check-out-btn {
  border: 2px solid #184e88;
  color: #312867;
  width: 100%;
  border-radius: 10px;
  padding: 5px;
}

.email-column {
  max-width: 160px;
  word-wrap: break-word;
  display: block;
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

@media (max-width: 600px) {
  .message-details {
    width: 70%;

  }

}

@media (min-width: 601px) and (max-width: 900px) {
  .message-details {
    width: 40%;
    height: 82vh;
  }
}

.table.align-items-center td,
.table.align-items-center th,
.table.align-items-center td span {
  text-align: -webkit-center;
}
</style>
