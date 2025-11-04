<template>
  <div>
    <Drawer :is-open="isDrawerOpen" :speed="500" @close="closeDrawer" @search-results="handleSearchResults" />
    <LeadColumnManageDrawer :is-open="isColumnManageDrawerOpen" :columns="tableHeaders"
      :visible-columns="visibleColumns" @toggle-column="handleToggleColumnChange"
      @update-columns="handleVisibleColumnsUpdate" @close="closeColumnManageDrawer" />

    <div class="container-fluid ps-0 pe-2 bg-white" style="min-height: 90vh" ref="desktopRef" v-if="isDesktop"
      id="style-3">
      <div class="container-fluid ps-0 pe-2 bg-white" style="min-height: 90vh" ref="desktopRef" v-if="isDesktop">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <!-- Header Section -->
              <div class="pb-0 mt-3 pe-2">
                <div class="d-flex justify-content-end align-items-center">
                  <div class="col-md-4 col-sm-12 mt-2 mr-3" style="
                      position: absolute;
                      left: 15px;
                      width: 12rem;
                      border: 2px solid 184e88;
                      border-radius: 10px;
                      top: -1px;
                    ">
                    <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                      aria-expanded="false">
                      <div class="select-box ">
                        <select @change="handleTableListView" v-model="selectedTableLayout" id="choices-state"
                          class="multisteps-form__select form-control choices__input custom-btn btn "
                          name="choices-state" tabindex="-1" data-choice="active" defaultValue="all" disabled>

                          <!-- <option value="all">
                            All
                          </option> -->
                          <option value="Client">
                            Client
                          </option>
                          <option value="advisorLead">Advisor Lead</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-center">
                    <div class="row justify-content-center mx-0 gap-1">
                      <button @click="toggleDrawer" type="button" class="btn search-btn-list"
                        :class="{ 'active-reset': isFiltered }" :title="isFiltered
                          ? 'Filters applied — click to reset'
                          : 'Search'
                          ">
                        <span class="fa fa-search cursor-pointer"></span>
                      </button>
                    </div>
                    <div class="row justify-content-center mx-0 gap-1">
                      <div class="row justify-content-center mx-1">
                        <button @click="resetLeadList" type="button" class="btn search-btn-list mb-0"
                          :class="{ 'active-reset': isFiltered }" :title="isFiltered
                            ? 'Filters applied — click to reset'
                            : 'No filters to reset'
                            ">
                          <span class="fa fa-refresh cursor-pointer"></span>
                        </button>
                      </div>
                    </div>
                    <div class="dropdown">
                      <button class="mb-0 btn new-btn-list btn-sm dropdown-toggle" type="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        New
                      </button>
                          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenu2">
                        <li v-if="this.selectedTableLayout === 'Client'">
                          <router-link :to="`/leads-form`" :class="{ dnone: !showAndHideState.addButton }">
                            <button class="dropdown-item" type="button">
                              <a target="_blank">+  Client Lead</a>
                            </button>
                          </router-link>
                        </li>
                        <li v-if="this.selectedTableLayout === 'advisorLead'">
                          <router-link :to="`/leads-advisor-form`">
                            <button class="dropdown-item" type="button">
                              <a target="_blank"> + Advisor Leads</a>
                            </button>
                          </router-link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="dropdown mx-1" :class="{
                    dnone:
                      !showAndHideState?.import && !showAndHideState?.export,
                  }">
                    <button class="btn ellipsis-btn-list" data-bs-toggle="dropdown" aria-expanded="false"
                      id="dropdownMenuButton1">
                      <p class="fs-6 mb-0 cursor-pointer m-0 text-bold fs-5 fw-bold fa fa-ellipsis"></p>
                    </button>

                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                      <li v-if="selectedLeads.length > 0">
                        <a class="dropdown-item" @click="deleteSelectedRecords"
                          :class="{ dnone: !showAndHideState.export }">Delete All</a>
                      </li>
                      <!-- <li>
                        <button  class="dropdown-item" type="button">
                          <a target="_blank"> Export Clients</a>
                        </button>
                      </li>
                      <li>
                        <button @click="downloadFile('advisor')" class="dropdown-item" type="button">
                          <a target="_blank"> Export Advisors</a>
                        </button>
                      </li> -->
                      <li>
                        <button @click="downloadFile('sample')" class="dropdown-item" type="button">
                          <a target="_blank"> Export sample</a>
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button" @click="openMassUpdatePopup">
                          Mass Update
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button" @click="openMassEmailPopup">
                          Mass Email
                        </button>
                      </li>
                      <!-- <button @click="deleteSelectedRecords" title="Delete All" class="btn ellipsis-btn-list" style="cursor:pointer" >
                    <p class="fs-6 mb-0 text-bold fs-5 fw-bold fa fa-trash"> </p>             
                  </button> -->
                    </ul>
                  </div>
                  <!-- Dropdown Button -->
                  <div class="dropdown dropstart">
                    <button class="btn btn-light border px-2 py-1" type="button" data-bs-toggle="dropdown"
                      aria-expanded="false">
                      <i class="bi bi-sliders no-hover"></i>
                    </button>
                    <ul class="dropdown-menu shadow-sm" style="min-width: 180px;">
                      <li>
                        <a class="dropdown-item no-hover" @click="toggleColumnManageDrawer">Manage Columns</a>
                      </li>
                      <!-- <li>
                        <a class="dropdown-item no-hover">Reset Column Size</a>
                      </li>
                      <li>
                        <a class="dropdown-item no-hover">Clip Text</a>
                      </li> -->
                    </ul>
                  </div>


                </div>
              </div>
              <!-- Header Section ends -->
              <div class="card-body px-2 pt-0 pb-2">
                <div class="scrollable-container table-responsive pb-0">
                  <div v-if="isResizing" class="ghost-line" :style="{ left: ghostLineX + 'px' }"></div>
                  <MassUpdateModal :isOpen="showMassUpdate" :fields="tableHeaders" @close="closeMassUpdatePopup"
                    @update-mass="handleMassUpdate" />
                  <MassUpdateEmailModal :isOpen="showMassEmail" :fields="tableHeaders"
                    :selected-email-leads="selectedEmailLeads" :selected-ids="selectedLeads" :templates="emailTemplates"
                    @close="closeMassEmailPopup" @send-mass-email="handleMassEmail" />

                  <table class="resizable-table table align-items-center mb-0">
                    <thead class="thead-light bottom-border-light">
                      <tr>
                        <!-- Checkbox Column -->
                        <th class="ps-1 pe-0" style="width: 80px; position: relative">
                          <div class="d-flex justify-content-center">
                            <input id="selectAll" class="form-check-input" type="checkbox"
                              :checked="selectedLeads.length && selectedLeads.length === leads.length"
                              @change="toggleSelectAll($event)" />
                          </div>
                          <div class="resizer" @mousedown="startResize($event, 0)"></div>
                        </th>


                        <!-- All other columns -->
                        <th v-for="(header, index) in visibleColumns" :key="index"
                          class="px-auto text-uppercase text-xxs text-start" style="position: relative"
                          :style="{ width: columnWidths[index] + 'px' }">
                          <!-- <div class="">
                            <a>{{ header }}</a>
                          </div> -->
                          <div class="d-flex align-items-center justify-content-between pe-2">
                            <a>{{ header }}</a>

                            <!-- Sort Icons -->

                            <div class="dropdown">
                              <i class="bi bi-list dropdown-toggle fs-5 p-1 rounded-circle cursor-pointer icon-transition icon-hover"
                                role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              </i>

                              <ul class="dropdown-menu shadow" style="min-width: 180px;">
                                <li>
                                  <a class="dropdown-item d-flex align-items-center gap-4 p-0"
                                    @click="toggleSort(header)" style="cursor:pointer;">
                                    <i v-if="sortOrder === 'asc'" class="bi bi-arrow-up no-hover"></i>
                                    <i v-else class="bi bi-arrow-down no-hover"></i>
                                    <span v-if="sortColumn === header">
                                      <span v-if="sortOrder === 'asc'" class="text-small">Asc</span>
                                      <span v-else class="text-small">Des</span>
                                    </span>
                                    <span v-else class="text-small">Asc</span>
                                  </a>
                                </li>
                                <!-- <li>
                                  <a class="dropdown-item d-flex align-items-center gap-4 p-0">
                                    <i class="bi bi-x-lg no-hover"></i> Unsort
                                  </a>
                                </li>

                                <li>
                                  <a class="dropdown-item d-flex align-items-center gap-4 p-0">
                                    <i class="bi bi-funnel no-hover"></i> Filter by
                                  </a>
                                </li> -->
                              </ul>
                            </div>
                          </div>
                          <div v-if="index !== tableHeaders.length - 1" class="resizer"
                            @mousedown="startResize($event, index)"></div>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr v-for="(item, index) in paginatedLeads" :key="index" class="bottom-border-light">
                        <td>
                          <div class="ps-3">
                            <div class="my-auto form-check">
                              <input id="customCheck1" class="form-check-input" type="checkbox" v-model="selectedLeads"
                                :value="item.ROWID" />
                            </div>
                          </div>
                        </td>
                        <td v-if="isVisible('Action')" class="text-sm dropdown-cell">
                          <div class="d-flex justify-content-center align-items-center gap-2">
                            <router-link :to="{
                              path: `/leads-details/${item.ROWID}`,
                              query: {
                                phoneNumber: item.ROWID,
                                layout: item.layoutName,
                              },
                            }" :class="{
                              disable: !showAndHideState.previewButton,
                            }">
                              <a href="#" data-bs-toggle="tooltip" data-bs-original-title="View details"><i
                                  class="fas fa-eye blue-color" aria-hidden="true"></i></a>
                            </router-link>
                            <div class="dropdown list-ellipsis-drop">
                              <i class="fa-solid fa-ellipsis blue-color dropdown-toggle" data-bs-toggle="dropdown"
                                aria-expanded="false"></i>

                              <ul class="dropdown-menu dropdown-menu-start" aria-labelledby="dropdownMenu2">
                                <li v-if="item.layoutName === 'Client'">
                                  <button class="dropdown-item" type="button" data-bs-toggle="tooltip"
                                    data-bs-original-title="Edit" aria-hidden="true">
                                    <router-link :to="'/leads-form/' + item.ROWID" :class="{
                                      disable: !showAndHideState.editButton,
                                    }">
                                      Edit
                                    </router-link>
                                  </button>
                                </li>
                                <li v-else>
                                  <button class="dropdown-item" type="button" data-bs-toggle="tooltip"
                                    data-bs-original-title="Edit" aria-hidden="true">
                                    <router-link :to="'/leads-advisor-form/' + item.ROWID" :class="{
                                      disable: !showAndHideState.editButton,
                                    }">
                                      Edit
                                    </router-link>
                                  </button>
                                </li>
                                <li>
                                  <button @click="confirmDelete(item.ROWID)" :class="{
                                    disable: !showAndHideState.deleteButton,
                                  }" class="dropdown-item" type="button">
                                    Delete
                                  </button>
                                </li>
                                <li>
                                  <button class="dropdown-item" type="button">
                                    <router-link :to="'/lead-convert-deal/' + item.ROWID" class="">
                                      Convert To Deal
                                    </router-link>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </td>

                        <td v-if="isVisible('Created Time *')" class="ps-1">{{ formatCreatedDateTime(item.CREATEDTIME)
                          }}</td>
                        <td v-if="isVisible('Layout')" class="px-auto">
                          <span class="badge-style layout-badge" :class="{
                            'client-layout': item.layoutName?.toLowerCase() === 'client',
                            'advisor-layout': item.layoutName?.toLowerCase() !== 'client'
                          }">
                            <strong>{{ item.layoutName }}</strong>
                          </span>
                        </td>

                        <td v-if="isVisible('Insurance Lead Name All')" class="ps-1 lead-name-wrap">
                          <router-link :to="`/leads-details/${item.ROWID}`">
                            {{ `${item.firstName} ${item.lastName}` }}
                          </router-link>
                        </td>
                        <td v-if="isVisible('Insurance Lead Status')" class="ps-1">
                          <span class="badge-style ellipsis-badge" :title="item.insuranceLeadStatus" :style="{
                            backgroundColor: getColorinsuranceLeadStatus(
                              item?.insuranceLeadStatus
                            ),
                            color: item.insuranceLeadStatusColor === '#fdd835' ? 'black' : 'white'
                          }">
                            {{ item.insuranceLeadStatus || "N/A" }}
                          </span>
                        </td>
                        <td v-if="isVisible('Lead Status Stage')" class="ps-1">
                          <span class="badge-style ellipsis-badge" :title="item.leadStatusStage" :style="{
                            backgroundColor: getColorLeadStatusStage(
                              item.leadStatusStage
                            ),
                            color: item.insuranceLeadStatusColor === '#fdd835' ? 'black' : 'white'
                          }">
                            {{ item.leadStatusStage || "N/A" }}
                          </span>
                        </td>
                        <td v-if="isVisible('Mobile')" class="ps-1">{{ item.mobile }}</td>
                        <td v-if="isVisible('Insurance Lead Source')" class="ps-1">{{ item.insuranceLeadSource }}</td>
                        <td v-if="isVisible('Assigned Advisor')" class="ps-1">{{ item.advisorfullName }}</td>
                        <td v-if="isVisible('Email')" class="ps-1">
                          <router-link :to="`/leads-details/${item.ROWID}`">
                            {{ item.email }}
                          </router-link>
                        </td>
                        <td v-if="isVisible('Services Requested')" class="ps-1">{{ item.servicesRequested }}</td>
                        <td v-if="isVisible('GCLID')" class="ps-1">{{ item.gclid }}</td>
                        <td v-if="isVisible('First Page Visited')" class="ps-1">{{ item.firstPageVisited }}</td>
                        <td v-if="isVisible('Modified Time')" class="ps-1">{{ item.MODIFIEDTIME }}</td>
                        <td v-if="isVisible('Total Interaction Time')" class="ps-1">{{ item.totalInteractionTime }}</td>
                        <td v-if="isVisible('Phone Number')" class="ps-1">{{ item.phoneNumber }}</td>
                        <td v-if="isVisible('User Full Name')" class="ps-1">{{ item.UserfullName }}</td>
                        <td v-if="isVisible('Ad Campaign')" class="ps-1">{{ item.adCampaign }}</td>
                        <td v-if="isVisible('Facebook Ad')" class="ps-1">{{ item.facebookAd }}</td>
                        <td v-if="isVisible('First Name')" class="ps-1">{{ item.firstName }}</td>
                        <td v-if="isVisible('Last Name')" class="ps-1">{{ item.lastName }}</td>
                        <td v-if="isVisible('Keyword Data')" class="ps-1">{{ item.keywordData }}</td>
                        <td v-if="isVisible('Submit Page URL')" class="ps-1">{{ item.submitPageURL }}</td>
                        <td v-if="isVisible('LP URL Data')" class="ps-1">{{ item.lpUrlData }}</td>
                        <td v-if="isVisible('GCLID Data')" class="ps-1">{{ item.gclidData }}</td>
                        <td v-if="isVisible('Ad Network')" class="ps-1">{{ item.adNetwork }}</td>
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
      </div>
      <div ref="mobileRef" v-if="!isDesktop">
        <div style="
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: end;
            background-color: white;
            padding-right: 10px;
            border-bottom: 1px solid;
          ">
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
                  <router-link :to="`/leads-form`" :class="{ dnone: !showAndHideState.addButton }">
                    <button class="dropdown-item" type="button">
                      <a target="_blank">+ Client</a>
                    </button>
                  </router-link>
                </li>
                <li>
                  <router-link :to="`/leads-advisor-form`">
                    <button class="dropdown-item" type="button">
                      <a target="_blank"> + Advisor Leads</a>
                    </button>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Loader :loading="isLoading"></Loader>
        <div ref="scrollableDiv" class="scrollable-container" id="style-3" style="min-height: 30vh">
          <div class="leadCard mt-0 mb-0" style="z-index: 1; border-bottom: 1px solid"
            v-for="(item, index) in paginatedLeads" :key="index">
            <div class="parent col-12">
              <div class="start col-9" style="padding-left: 15px; padding-top: 15px">
                <table>
                  <tr>
                    <td>
                      <strong>{{
                        `${item.firstName} ${item.lastName}`
                        }}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <i class="fas fa-circle" style="color: red; font-size: 10px"></i>{{ item.leadStatusStage }}
                    </td>
                  </tr>
                  <tr>
                    <td>{{ item.mobile }}</td>
                  </tr>
                  <tr>
                    <td>{{ item.insuranceLeadSource }}</td>
                  </tr>
                </table>
              </div>
              <div class="end col-3 mt-4" style="vertical-align: center">
                <router-link :to="`/leads-details/` + item.ROWID">
                  <img src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                    alt="Circular Image" class="circle-img" style="height: 56px; width: 59px" />
                </router-link>
              </div>
            </div>

            <!-- <div>
    <hr style="border:1px solid black;">
  </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import { putUrl } from "../../boot/axios";
import router from "../../router/index.js";
import { verifyUser } from "../../verifyUser/verifyUser.js";
import { validateLeadListData } from "./utils/validation.js";
import MassUpdateModal from "./MassUpdateModal.vue";
import MassUpdateEmailModal from "./MassUpdateEmailModal.vue";
import moment from "moment";
import {
  getInsuranceLeadStatusColor,
  getStatusColor,
} from "../utils/util-js/statusColorMap.js";
import { reactive, ref } from "vue";
import Swal from "sweetalert2";
import Loader from "../utils/Loader.vue";
import Drawer from "./LeadDrawer.vue";
import LeadColumnManageDrawer from "./LeadColumnManageDrawer.vue";
// import {formatDateAndTime} from "../utils/util-js/dateFinder";
import { onMounted, onBeforeUnmount } from "vue";
import { h } from "vue";

export default {
  props: {
    type: {
      type: String,
      default: 'Client'
    }
  },
  components: {
    Loader,
    Drawer,
    LeadColumnManageDrawer,
    MassUpdateModal,
    MassUpdateEmailModal
  },

  data() {
    const selectedTableLayout = "Client";
    const popOverAlertMessage = ref("");
    // const leads = reactive([]);
    const startPage = ref(1);
    const isLoading = ref(false);
    const showSearchDetail = ref(false);
    const showAndHideState = ref({
      deleteButton: false,
      editButton: false,
      previewButton: false,
      import: false,
      export: false,
      addButton: false,
    });
    return {
      isDrawerOpen: false,
      isColumnManageDrawerOpen: false,
      isLoading,
      searchPayloadFlag: false,
      showSearchDetail,
      popOverAlertMessage,
      showMassUpdate: false,
      showMassEmail: false,
      leads: [],

      startPage,
      totalItems: 0,
      currentPage: 1,
      itemsPerPage: 30,

      showAndHideState,
      selectedLeads: [],
      selectedEmailLeads: [],
      isDesktop: false,
      showMobileNav: true,
      hiddenColumns: [],
      tableHeaders: [
        "Action",
        "Created Time *",
        "Layout",
        "Insurance Lead Name All",
        "Insurance Lead Status",
        "Lead Status Stage",
        "Mobile",
        "Insurance Lead Source",
        "Assigned Advisor",
        "Email",
        "Services Requested",
        "GCLID",
        "First Page Visited",
        "Last Activity Time",
        "Total Interaction Time (mins)",
        "Phone",
        "Created By",
        "Ad Campaign Name",
        "FaceBook Ad",
        "First Name",
        "Last Name All",
        "Keyword",
        "Submit Page URL",
        "LP URL Data",
        "GCLID Data",
        "Ad Network",
      ],
      visibleColumns: [],
      columnWidths: [],
      // initialColumnWidths: [93, 100, 230, 150, 280, 240, 220, 200, 200],
      initialColumnWidths: {
        'Action': 120,
        'Created Time *': 190,
        'Layout': 153,
        'Insurance Lead Name All': 270,
        'Insurance Lead Status': 260,
        'Lead Status Stage': 240,
        'Mobile': 240,
        'Insurance Lead Source': 220,
        'Assigned Advisor': 200,
        'Email': 200,
        'Services Requested': 200,
        'GCLID': 200,
        'First Page Visited': 200,
        'Last Activity Time': 200,
        'Total Interaction Time (mins)': 200,
        'Phone': 200,
        'Created By': 200,
        'Ad Campaign Name': 200,
        'FaceBook Ad': 200,
        'First Name': 200,
        'Last Name All': 200,
        'Keyword': 200,
        'Submit Page URL': 200,
        'LP URL Data': 200,
        'GCLID Data': 200,
        'Ad Network': 200
      },
      headerFieldMap: {
        "Created Time *": "CREATEDTIME",
        "Layout": "layoutName",
        "Insurance Lead Name All": "firstName", // or combine firstName + lastName
        "Insurance Lead Status": "insuranceLeadStatus",
        "Lead Status Stage": "leadStatusStage",
        "Mobile": "mobile",
        "Insurance Lead Source": "insuranceLeadSource",
        "Assigned Advisor": "advisorfullName",
        "Email": "email",
        "Services Requested": "servicesRequested",
        "GCLID": "gclid",
        "First Page Visited": "firstPageVisited",
        "Last Activity Time": "MODIFIEDTIME",
        "Total Interaction Time (mins)": "totalInteractionTime",
        "Phone": "phoneNumber",
        "Created By": "UserfullName",
        "Ad Campaign Name": "adCampaign",
        "FaceBook Ad": "facebookAd",
        "First Name": "firstName",
        "Last Name All": "lastName",
        "Keyword": "keywordData",
        "Submit Page URL": "submitPageURL",
        "LP URL Data": "lpUrlData",
        "GCLID Data": "gclidData",
        "Ad Network": "adNetwork"
      },
      sortColumn: null,
      sortOrder: 'asc', // or 'desc'
      ghostLineX: 0,
      resizingColumnIndex: null,
      startX: 0,
      startWidth: 0,
      isResizing: false,
      tableLeftOffset: 0,
      selectedTableLayout
    };
  },
  setup() {
    // Step 1: Reactive variable to hold scroll position
    const scrollPosition = ref(0);

    // Step 2: Ref to the scrollable div
    const scrollableDiv = ref(null);

    // Step 3: Function to update the scroll position
    const updateScrollPosition = () => {
      // This will get the scroll position of the specific div
      if (scrollableDiv.value) {
        scrollPosition.value = scrollableDiv.value.scrollTop;
        console.log(scrollPosition.value);
      }
    };

    // Step 4: Add scroll event listener when component is mounted
    onMounted(() => {
      if (scrollableDiv.value) {
        scrollableDiv.value.addEventListener("scroll", updateScrollPosition);
      }
    });

    // Step 5: Remove scroll event listener when component is unmounted
    onBeforeUnmount(() => {
      if (scrollableDiv.value) {
        scrollableDiv.value.removeEventListener("scroll", updateScrollPosition);
      }
    });

    // Return scrollPosition so it can be displayed in the template
    return { scrollPosition, scrollableDiv };
  },

  watch: {
    selectedLeads: {
      handler(newIds) {
        const idSet = new Set(newIds);
        this.selectedEmailLeads = this.leads
          .filter(l => idSet.has(l.ROWID))
          .map(l => ({
            id: l.ROWID,
            name: `${l.firstName} ${l.lastName}`,
            email: l.email
          }));
        console.log('Updated Selected Email Leads:', this.selectedEmailLeads);
      },
      deep: true
    },
    type: {
      immediate: true,
      handler(newType) {
        this.selectedTableLayout = newType || 'Client';
        this.handleTableListView();
      }
    }
  },

  // async beforeMount() {
  //   this.isLoading = true;
  //   this.showAndHideState = (await validateLeadListData()).showAndHideState;
  //   await this.fetchLeads();
  //   this.leads = (
  //     await validateLeadListData({
  //       page: this.currentPage,
  //       limit: 30,
  //     })
  //   ).flattenedLead;
  //   this.originalLead = this.leads;
  //   this.isLoading = false;
  //   const verified = await verifyUser();
  //   if (!verified) {
  //     router.push("/signin");
  //   }
  // },

  created() {
    this.selectedTableLayout = this.type || 'Client';
    this.visibleColumns = [...this.tableHeaders];
    this.handleTableListView();

    // const customWidths = [...this.initialColumnWidths];
    // this.initialColumnWidths = [];

    // for (let i = 0; i <= this.tableHeaders.length; i++) {
    //   this.initialColumnWidths.push(customWidths[i] ?? 200);
    // }
    this.columnWidths = this.visibleColumns.map(label => {
      return this.initialColumnWidths[label] || 200;
    });

    // Copy to columnWidths
    // this.columnWidths = [...this.initialColumnWidths];
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
      if (typeof this.totalItems === "number" && !isNaN(this.totalItems)) {
        return Math.ceil(this.totalItems / this.itemsPerPage);
      } else {
        return 0;
      }
    },

    pages() {
      return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    },

    // paginatedLeads() {
    //   return this.leads;
    // },
    paginatedLeads() {
      let sortedLeads = [...this.leads];

      if (this.sortColumn) {
        const field = this.headerFieldMap[this.sortColumn] || this.sortColumn;

        sortedLeads.sort((a, b) => {
          let valA = a[field] || '';
          let valB = b[field] || '';

          // Special handling for time fields
          if (field.toLowerCase().includes('time')) {
            valA = new Date(valA);
            valB = new Date(valB);
          }

          if (this.sortOrder === 'asc') {
            return valA > valB ? 1 : valA < valB ? -1 : 0;
          } else {
            return valA < valB ? 1 : valA > valB ? -1 : 0;
          }
        });
      }

      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;

      return sortedLeads
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
  async mounted() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
    const verified = await verifyUser();
    if (!verified) {
      router.push("/signin");
      return;
    }

    this.isLoading = true;
    await this.getLeadCount(); //  first get count
    await this.fetchLeads(); //  then get leads of page 1
    this.isLoading = false;

    // console.log('totalItems:', this.totalItems);
    // console.log('totalPages:', this.totalPages);
    // console.log('visiblePages:', this.visiblePages);

  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize);
  },

  methods: {
    async fetchLeads() {
      try {
        this.isLoading = true;
        const { flattenedLead, showAndHideState } = await validateLeadListData({
          page: this.currentPage,
          limit: this.itemsPerPage,
          search: this.selectedTableLayout === 'Client' ? [{ field: 'layout', operation: 'is', value: 'Client' }] : this.selectedTableLayout === 'advisorLead' ? [{ field: 'layout', operation: 'is', value: " Advisor Leads" }] : []
        });
        this.leads = flattenedLead;
        this.showAndHideState = showAndHideState;

      } catch (err) {
        console.error("Error fetching leads", err);
      } finally {
        this.isLoading = false;
        this.searchPayloadFlag = false
      }
    },

    async getLeadCount() {
      try {
        const response = await axios.get(
          `${putUrl}canadianlicapi/lead/api/v2/get-lead-count`
        );

        this.totalItems = parseInt(response.data.count);
      } catch (error) {
        console.log(error);
      }
    },
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
    },
    closeDrawer() {
      this.isDrawerOpen = false;
    },
    toggleColumnManageDrawer() {
      this.isColumnManageDrawerOpen = !this.isColumnManageDrawerOpen;
      // alert("Column Manage Drawer Toggled");  
    },
    closeColumnManageDrawer() {
      this.isColumnManageDrawerOpen = false;
    },
    handleVisibleColumnsUpdate(newVisibleColumns) {
      this.visibleColumns = newVisibleColumns;

      this.columnWidths = newVisibleColumns.map(label => {
        return this.initialColumnWidths[label] || 200;
      });


      console.log("✅ Updated visible columns:", this.visibleColumns);
      console.log("📏 Synced column widths:", this.columnWidths);

      // Optional: also update hiddenColumns checkbox state
      this.hiddenColumns = this.tableHeaders.map((label, index) => ({
        label,
        index,
        checked: newVisibleColumns.includes(label)
      }));
    },


    isVisible(colLabel) {
      return this.visibleColumns.includes(colLabel) && this.tableHeaders.includes(colLabel);
    },
    handleToggleColumnChange({ index, label, checked }) {
      const existingIndex = this.hiddenColumns.findIndex(c => c.label === label);

      if (existingIndex !== -1) {
        // 🔁 Already exists — update the existing entry
        this.hiddenColumns[existingIndex] = { label, index, checked };
      } else {
        //  New entry — push into array
        this.hiddenColumns.push({ label, index, checked });
      }

      console.log(" Updated hiddenColumns:", this.hiddenColumns, this.columnWidths, this.initialColumnWidths
      );
    },

    async handleSearchResults(filteredLeads) {
      this.searchPayloadFlag = true;
      this.isLoading = true;
      this.currentPage = 1;

      const payload = {
        page: this.currentPage,
        limit: 300,
        search: filteredLeads,
      };

      try {
        const response = await validateLeadListData(payload);

        if (!response || !response.flattenedLead || response.flattenedLead.length === 0) {
          Swal.fire({
            icon: "info",
            title: "No Records Found",
            text: "No matching leads found with your current filters.",
            timer: 2500,
            showConfirmButton: false,
          });
          this.searchPayloadFlag = false
        } else {
          this.leads = response.flattenedLead;
          this.totalItems = response.flattenedLead.length;
          this.itemsPerPage = response.flattenedLead.length;

          Swal.fire({
            icon: "success",
            title: "Results Fetched",
            text: `${response.flattenedLead.length} result(s) found.`,
            timer: 2000,
            showConfirmButton: false,
          });
        }

        this.closeDrawer();

      } catch (error) {
        console.error("Error during lead search:", error);
        Swal.fire({
          icon: "error",
          title: "Search Failed",
          text: "Something went wrong while fetching search results.",
        });
      } finally {
        this.isLoading = false;
      }
    },


    async resetLeadList() {
      // console.log("Resetting leads list...");
      this.isLoading = true;
      // this.selectedTableLayout = "Client"; // Reset to default layout 
      this.currentPage = 1;
      this.itemsPerPage = 30;
      this.columnWidths = { ...this.initialColumnWidths };
      this.sortColumn = null; // <-- Reset sorting column
      this.sortOrder = 'asc';
      await this.fetchLeads();
      await this.getLeadCount();
      this.searchPayloadFlag = false;
      this.isLoading = false;
    },


    getColorinsuranceLeadStatus(status) {
      return getInsuranceLeadStatusColor(status);
    },

    getColorLeadStatusStage(status) {
      return getStatusColor(status);
    },

    // In LeadsList.vue methods
    async handleTableListView() {

      let search = [];
      if (this.selectedTableLayout === 'Client') {
        search = [{ field: 'layout', operation: 'is', value: 'Client' }];
      } else if (this.selectedTableLayout === 'advisorLead') {
        search = [{ field: 'layout', operation: 'is', value: " Advisor Leads" }];
      }

      const payload = {
        page: this.currentPage,
        limit: this.itemsPerPage,
        search
      };

      try {
        this.isLoading = true;
        const response = await validateLeadListData(payload);
        if (response && response.flattenedLead) {
          this.leads = response.flattenedLead;
          this.totalItems = this.leads.length;
          this.showAndHideState = response.showAndHideState;
        }
      } catch (error) {
        console.error('Error fetching leads:', error);
        this.leads = [];
        this.totalItems = 0;
      } finally {
        this.isLoading = false;
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

    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        await this.fetchLeads();
      }
    },

    async nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        await this.fetchLeads();
      }
    },

    async gotoPage(pageNumber) {
      this.currentPage = pageNumber;
      await this.fetchLeads();
    },

    async goTOFirstPage() {
      this.currentPage = 1;
      await this.fetchLeads();
    },

    async goTOLastPage() {
      this.currentPage = this.totalPages;
      await this.fetchLeads();
    },
    async updateItemsPerPage(size) {
      this.itemsPerPage = size;
      this.currentPage = 1;
      await this.fetchLeads();
    },

    toggleSelectAll(event) {
      if (event.target.checked) {
        this.selectedLeads = this.leads.map((lead) => lead.ROWID);
        console.log("selectedleads: " + this.selectedLeads);
      } else {
        this.selectedLeads = [];
      }
    },
    isSelected(id) {
      return this.selectedLeads.includes(id);
    },
    showSearchDetails() {
      let item = document.querySelector(".message-details");
      item.style.transform = this.showSearchDetail
        ? "translateX(0)"
        : "translateX(100%)";
      this.showSearchDetail = !this.showSearchDetail;
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
          // Call your function here when the user clicks "Ok"
          this.deleteLead(id);
        }
      });
    },
    async deleteSelectedRecords() {
      if (confirm("Are you sure you want to delete the selected records?")) {
        let idArray = [];
        for (let value of this.selectedLeads) {
          idArray.push(value);
        }
        console.log({ idArray });

        this.deleteLead(idArray);
        this.selectedLeads = [];
        this.showSearchDetails();
      }
    },
    async deleteLead(id) {
      this.isLoading = true;
      console.log(id);
      try {
        // Send a request to delete the lead
        const response = await axios.delete(
          `${putUrl}canadianlicapi/lead/api/v2/delete-lead/${id}`
        );
        console.log(response.data.message);

        // Remove the deleted lead from the local data
        this.leads = this.leads.filter((lead) => lead.ROWID !== id);

        Swal.fire({
          title: "<strong>Lead Deleted Successfully</strong>",
          icon: "success",
        });

        // Optionally, re-fetch the list of leads if needed
        // await this.handleTableListView();

        // Navigate away after ensuring the list is updated
        setTimeout(() => {
          this.isLoading = false;
          router.push("/leads-list");
        }, 500); // Adjust delay if needed
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error deleting lead",
          icon: "error",
        });
        this.isLoading = false;
      }
    },
    async downloadFile(type) {
      this.isLoading = true;
      try {
        const response = await axios.post(
          `${putUrl}canadianlicapi/lead/api/v2/download-file`,
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
    async dynamicRouter(type, id) {
      return type === "Client"
        ? `/leads-form/${id}`
        : `/leads-advisor-form/${id}`;
    },

    checkScreenSize() {
      this.isDesktop = window.innerWidth >= 500;
    },
    startResize(event, columnIndex) {
      this.isResizing = true;
      this.resizingColumnIndex = columnIndex;
      this.startX = event.pageX;
      this.startWidth = this.columnWidths[columnIndex];
console.log("start start width",this.startWidth)
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
        console.log("moved",moved);
        const newWidth = this.startWidth + moved;
console.log("newWidth",newWidth);
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
    },

    openMassUpdatePopup() {
      
      this.showMassUpdate = true;
    },
    closeMassUpdatePopup() {
      this.showMassUpdate = false;
    },
    async handleMassUpdate({ field, value }) {
      this.isLoading = true;
      try {
        if (!this.selectedLeads.length) {
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
        await this.fetchLeads();
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
    handleMassEmail({ from, leads }) {
      console.log("Sending mass email...", from);
      axios.post('/send-mass-email', {
        from,
        leads // array of { id, name, email }
      }).then(() => {
        Swal.fire({ icon: "success", title: "Emails sent!" });
      }).catch(() => {
        Swal.fire({ icon: "error", title: "Failed to send emails" });
      });
    },
    formatCreatedDateTime(dateTime) {
      if (!dateTime) return "N/A";
      return moment(dateTime).format("DD-MM-YYYY   hh:mm A");
    },
  },

};
</script>

<style scoped>
.table-responsive {
  font-size: var(--crm-font-regular) !important;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 500 !important;
}



.dropdown-cell {
  overflow: visible !important;
  /* position: relative !important; */
  z-index: 2;
}

i {
  padding: 0.5rem;
}

i:hover {
  background-color: #dce0e4;
  border-radius: 50%;
}

/* Hover effect for table rows */
tbody tr:hover {
  /* background-color: #eef0fff0; */
  background-color: #dcdfec;

}

.avatar-container {
  display: flex;
  align-items: center;
}

.swal2-styled.swal2-confirm {
  background-color: #e9c874 !important;
  background-image: none !important;
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

.bottom-right-text {
  position: fixed;
  bottom: 10px;
  right: 20px;
  z-index: 1000;
  background-color: white;
  padding: 5px 10px;
  border-radius: 5px;
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

/* Icon hover effect */
.icon-hover:hover {
  background-color: #f0f0f0;
  /* halka gray */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

/* Jab dropdown open ho tab bhi shadow dikhe */
.dropdown-toggle.show.icon-hover {
  background-color: #f0f0f0;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.dropdow .message-details {
  z-index: 9999;
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

/* lead list in mobile */
/* Add your styles here */
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

/* Webkit Scrollbar Styles */
.scrollable-container::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: #f5f5f5;
}

.scrollable-container::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 5px;
}

.scrollable-container::-webkit-scrollbar-thumb {
  background-color: #b0b0b0;
  border-radius: 10px;
  border: 2px solid #f0f0f0;
  /* smooth edge */
  cursor: grab
}

.scrollable-container::-webkit-scrollbar-thumb:hover {
  background-color: #909090;
}


.scrollable-container {
  scroll-behavior: smooth;
}

.lead-name-wrap {
  white-space: normal !important;
  word-break: break-word;
  overflow-wrap: break-word;
  max-width: 180px;
  /* ya jitna chhota rakhna ho */
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

/* resize */

.scrollable-container {
  height: calc(100vh - 190px);
  overflow-x: auto;
  overflow-y: auto;
  width: 100%;
  background-color: white;
  max-width: 100%;
}

.scrollable-container {
  position: relative;
  /* min-width: fit-content; */
  display: block;
}


.resizable-table {
  width: 100%;
  min-width: 1000px;
  border-spacing: 0;
  table-layout: fixed;
}

.no-hover:hover {
  background-color: transparent !important;
}

/* @media (max-width: 768px) {
  .resizable-table {
    min-width: 600px;
    font-size: 13px;
  }


} */



@media (max-width: 768px) {
  .scrollable-container::after {
    display: block;
  }
}


/* Shared styles for all table cells */
/* .resizable-table th, */
.resizable-table td {
  border-bottom: 1px solid #ddd;
  border-left: none;
  border-right: none;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: none;
}

/* Specific styles for table headers */
.resizable-table th {
  /* padding: 4px 7px; */
  min-width: 150px;
  width: 150px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  vertical-align: middle;
}

/* Specific styles for table body cells */
.resizable-table td {
  /* padding: 5px 8px; */
  min-width: 150px;
  width: 150px;
  /* font-size: 13px; */
  vertical-align: middle;
}


/* .th-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 8px;
  position: relative;
} */

.resizer {
  width: 5px;
  cursor: col-resize;
  height: 100%;
  position: absolute;
  right: -2px;
  top: 0;
  z-index: 1;
}

.resizer:hover {
  background: #d4d4d4;
}

.ghost-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  height: 100%;
  background-color: #d3d3d3;
  z-index: 9999;
  pointer-events: none;
  transition: left 0.05s ease-out;
}




.active-reset {
  background-color: #184e88 !important;
  color: white !important;
  /* border: 1px solid #184e88 !important; */
}

.search-btn-list {
  transition: all 0.3s ease;
}

.badge-style {
  color: white;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  display: inline-block;
  white-space: nowrap;
}

.ellipsis-badge {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  width: auto;
  /*allows it to shrink/expand */
}

.layout-badge {
  border-radius: 999px;
  padding: 2px 10px;
  display: inline-block;
  font-size: 14px;
  font-weight: 300;
  text-transform: capitalize;
  white-space: nowrap;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  width: auto;
}

.client-layout {
  background-color: rgba(160, 32, 240, 0.7);
  /* Purple */
}

.advisor-layout {
  background-color: rgba(229, 32, 32, 0.6);
  /* Green */
}

.dropdown-item.active-record {
  font-weight: bold;
  background-color: #f0f0f0 !important;
  color: black !important;

}

/* Remove default Bootstrap caret */
.dropdown-toggle::after {
  display: none !important;
}


.dropdown-item.active-record::after {
  content: "✔️";
  position: absolute;
  right: 6px;
  font-size: 10px;
}

.dropdown .bi:hover {
  background-color: #e0e0e0;
}

.dropdown-menu a.dropdown-item {
  font-size: 14px;
}

.dropdown-menu a.dropdown-item i {
  width: 18px;
  text-align: center;
}


@media (max-width: 768px) {
  .responsive-pagination {
    position: static !important;
    /* Overrides fixed */
    margin-top: 20px;
  }

  .pagination {
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .resizable-table {
    font-size: 13px;
    min-width: 500px;
  }
}

/* resize */
</style>
