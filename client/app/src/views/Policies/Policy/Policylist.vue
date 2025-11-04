<template>
  <Drawer :updateNotes="this.updateNotes" :is-open="isDrawerOpen" :speed="500" @close="closeDrawer"
    @search-results="handleSearchResults"></Drawer>
  <PolicyColumnManageDrawer :is-open="isColumnManageDrawerOpen" :columns="tableHeaders"
    :visible-columns="visibleColumns" @toggle-column="handleToggleColumnChange"
    @update-columns="handleVisibleColumnsUpdate" @close="closeColumnManageDrawer" />
  <div class="card me-2" style="min-height: 90vh" ref="desktopRef" v-if="isDesktop">
    <!-- Header Section -->
    <div class="pb-0 mt-3 pe-2">
      <div class="d-flex justify-content-end align-items-center">
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
                <input class="search-input" type="search" v-model="searchQuery" placeholder="Search" aria-label="Search"
                  style="width: 100%; padding: 5px" />
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
        <div>

        </div>
        <div class="col-md-4 col-sm-12 mt-2 mr-3 d-flex gap-2 "
          style="position: absolute; left: 15px; width: 20rem; border: 2px solid 184e88; border-radius: 10px; top: -1px">
          <button class=" px-2 py-0  border btn">
            Selected : {{ selectedPolicies.length }}
          </button>
          <div class="choices w-50" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
            aria-expanded="false">
            <div class="select-box ">
              <select @change="handleTableListView" v-model="selectedTableLayout" id="choices-state"
                class="multisteps-form__select form-control choices__input custom-btn btn " name="choices-state"
                tabindex="-1" data-choice="active">
                <option value="all">
                  All
                </option>
                <option value="policies">
                  Policies
                </option>
                <option value="investments">Investments</option>
              </select>
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <div class="row justify-content-center mx-1">
            <button @click="toggleDrawer()" type="button" class="btn search-btn-list"><span
                class="fa fa-search cursor-pointer"></span>
            </button>
          </div>
          <div class="row justify-content-center mx-1">
            <button @click="resetPolicyt" type="button" class="btn search-btn-list mb-0"><span
                class="fa fa-refresh cursor-pointer"></span></button>
          </div>
          <div class="dropdown">
            <button class="mb-0 btn new-btn-list btn-sm dropdown-toggle " type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              New
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenu2">
              <li><button class="dropdown-item" type="button">
                  <router-link :to="`/policyformins`">
                    <a target="_blank">+ New Policy</a>
                  </router-link>
                </button></li>
              <li><button class="dropdown-item" type="button">
                  <router-link :to="`/investmentform`">
                    <a target="_blank">+ New Investment</a>
                  </router-link>
                </button></li>
            </ul>
          </div>
        </div>
        <div class="dropdown mx-1">
          <button class="btn ellipsis-btn-list " data-bs-toggle="dropdown" aria-expanded="false"
            id="dropdownMenuButton1">
            <p class=" fs-6 mb-0 cursor-pointer m-0 text-bold fs-5 fw-bold fa fa-ellipsis-v"></p>
          </button>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
            <li v-if="selectedPolicies.length > 0">
              <a class="dropdown-item" @click="deleteSelectedRecords">Delete All</a>
            </li>
            <li><a class="dropdown-item" href="#">Import</a></li>
            <li><a href="#"><button class="dropdown-item" type="button" @click="downloadFile('lifePolicy')"> Export
                  Policy</button></a></li>
            <li><a href="#"><button class="dropdown-item" type="button" @click="downloadFile('rrsp')"> Export
                  RRSP</button></a></li>
            <li><a href="#"><button class="dropdown-item" type="button" @click="downloadFile('tfsa')"> Export
                  TFSA</button></a></li>
            <li><a href="#"><button class="dropdown-item" type="button" @click="downloadFile('resp')"> Export
                  RESP</button></a></li>
            <li><a href="#"><button class="dropdown-item" type="button" @click="downloadFile('visa')"> Export
                  Visa</button></a></li>
            <li><button class="dropdown-item" type="button" @click="openMassUpdatePopup">
                Mass Update
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button" @click="openMassEmailPopup">
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
    <!-- Body Section -->

    <div class="card-body px-0 pt-0">
      <div class=" scrollable-container table-responsive p-0">
        <div v-if="isResizing" class="ghost-line" :style="{ left: ghostLineX + 'px' }"></div>
        <MassUpdatePolicyModel :isOpen="showMassUpdate" :fields="tableHeaders" @close="closeMassUpdatePopup" />
        <MassUpdatePolicyEmail :isOpen="showMassEmail" :fields="visibleColumns.map(col => col.label)"
          :selected-email-contacts="selectedEmailContacts" :selected-ids="selectedLeads" :templates="emailTemplates"
          @close="closeMassEmailPopup" @send-mass-email="handleMassEmail" />

        <table class="resizable-table table align-items-center justify-content-center mb-0">
          <thead v-if="selectedTableLayout === 'all'">
            <!-- <tr>
              <th>
                <div class="d-flex">
                  <div class="my-auto form-check px-2" style="margin-left: 10px">
                      <input id="selectAll" class="form-check-input" type="checkbox"
                        @change="toggleSelectAll($event)" />
                  </div>
                </div>
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Actions
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Created Time
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Application Submitted On
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Policy Name
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Client
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Client Mobile
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Policy Type
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Policy Status
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Premium Frequency
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Insurance Company Account
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Advisor Commission Amount
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Policy Premium (Read i)
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Email
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Policy Start Date
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Policy Renewal Date
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Policy Owner
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Policy Number
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Policy Advisor
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                How Many Days Left?
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Issued By
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Early Return/ Application Cancelled
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Modified Time
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Location
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Layout
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Confirmation Policy Start?
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Policy Month
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Advisor Payout
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Product FYC %
              </th>

              <th class="px-auto text-uppercase text-xxs text-start">
                Advisor Bonus % of FYC
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Insured 1 Date of Birth
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Reasons for Policy being Declined
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Beneficiary 1 Date of Birth
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Send To Bot Result
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Cancellation / Amendment Requested for?
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Whatsapp
              </th>

            </tr> -->
            <tr>
              <!-- <th>
                <div class="d-flex">
                  <div class="my-auto form-check px-2" style="margin-left: 10px">
                      <input id="selectAll" class="form-check-input" type="checkbox"
                        @change="toggleSelectAll($event)" />
                  </div>
                </div>
              </th> -->
              <th class="ps-1 pe-0" style="width: 80px; position: relative">
                <div class="d-flex justify-content-center">
                  <input id="selectAll" class="form-check-input" type="checkbox" @change="toggleSelectAll($event)" />
                </div>
                <div class="resizer" @mousedown="startResize($event, 0)"></div>
              </th>
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
                        <a class="dropdown-item d-flex align-items-center gap-4 p-0" @click="toggleSort(header)"
                          style="cursor:pointer;">
                          <i v-if="sortOrder === 'asc'" class="bi bi-arrow-up no-hover"></i>
                          <i v-else class="bi bi-arrow-down no-hover"></i>
                          <span v-if="sortColumn === header">
                            <span v-if="sortOrder === 'asc'" class="text-small">Asc</span>
                            <span v-else class="text-small">Des</span>
                          </span>
                          <span v-else class="text-small">Asc</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div v-if="index !== tableHeaders.length - 1" class="resizer" @mousedown="startResize($event, index)">
                </div>
              </th>
            </tr>
          </thead>
          <thead v-if="selectedTableLayout === 'policies'">
            <tr>
              <th class="ps-1 pe-0" style="width: 80px; position: relative">
                <div class="d-flex justify-content-center">
                  <input id="selectAll" class="form-check-input" type="checkbox" @change="toggleSelectAll($event)" />
                </div>
                <div class="resizer" @mousedown="startResize($event, 0)"></div>
              </th>
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
                        <a class="dropdown-item d-flex align-items-center gap-4 p-0" @click="toggleSort(header)"
                          style="cursor:pointer;">
                          <i v-if="sortOrder === 'asc'" class="bi bi-arrow-up no-hover"></i>
                          <i v-else class="bi bi-arrow-down no-hover"></i>
                          <span v-if="sortColumn === header">
                            <span v-if="sortOrder === 'asc'" class="text-small">Asc</span>
                            <span v-else class="text-small">Des</span>
                          </span>
                          <span v-else class="text-small">Asc</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div v-if="index !== tableHeaders.length - 1" class="resizer" @mousedown="startResize($event, index)">
                </div>
              </th>
              <!-- <th>
                <div class="d-flex">
                  <div class="my-auto d-flex justify-content-center px-2" >
                    <input id="customCheck1" class="form-check-input" type="checkbox" />
                  </div>
                </div>
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Actions
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Layout
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Policy Number
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Policy Owner
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Coverage Amount
              </th>

              <th class="px-auto text-uppercase text-xxs text-start">
                Policy Premium
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Client Mobile
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                client
              </th> -->

            </tr>
          </thead>
          <thead v-if="selectedTableLayout === 'investments'">
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
                Layout
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Investment Name
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Client Mobile
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Client Address
              </th>

              <th class="px-auto text-uppercase text-xxs text-start">
                Contract Name
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Investment
              </th>
              <th class="px-auto text-uppercase text-xxs text-start">
                Frequency
              </th>

              <th class="px-auto text-uppercase text-xxs text-start">
                Corporate Commision
              </th>

            </tr>
          </thead>
          <tbody>
            <!-- Iterate over Policies -->
            <tr v-show="selectedTableLayout === 'all'" v-for="(policy, index) in paginatedPolicies" :key="index"
              class="bottom-border-light px-2">
              {{ console.log('Policy Data:', policy) }}

              <td class="align-middle py-1 ">
                <div class="form-check d-flex justify-content-center">
                  <input :id="'customCheck' + index" class="form-check-input" type="checkbox" v-model="selectedPolicies"
                    :value="policy.ROWID" />
                </div>
              </td>
              <td class="text-sm dropdown-cell" v-if="isVisible('Action')">
                <!-- Actions -->
                <div class="d-flex align-items-center">
                  <router-link :to="`/policies-details/${policy.ROWID}`">
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
                          <router-link v-show="selectedTableLayout !== 'all'"
                            :to="`${selectedTableLayout === 'policies' ? '/policyformins/' : '/investmentform/'}` + policy.ROWID">
                            <a class="mx-1" data-bs-toggle="tooltip" data-bs-original-title="Edit product">
                              Edit
                            </a>
                          </router-link>
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button" data-bs-toggle="tooltip"
                          data-bs-original-title="Edit" aria-hidden="true">
                          <router-link v-show="selectedTableLayout === 'all'"
                            :to="`${policy.layout === 'RRSP' || policy.layout === 'RESP' || policy.layout === 'TFSA' ? '/investmentform/' : '/policyformins/'}` + policy.ROWID">
                            <a class="mx-1" data-bs-toggle="tooltip" data-bs-original-title="Edit product">
                              Edit
                            </a>
                          </router-link>
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button" data-bs-toggle="tooltip"
                          data-bs-original-title="Edit" aria-hidden="true">
                          <a v-show="selectedTableLayout === 'policies'" href="javascript:;" data-bs-toggle="tooltip"
                            data-bs-original-title="Delete product" @click="confirmDeletePolicy(policy.ROWID)">
                            Delete
                          </a>
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button" data-bs-toggle="tooltip"
                          data-bs-original-title="Edit" aria-hidden="true">
                          <a v-show="selectedTableLayout === 'investments'" href="javascript:;" data-bs-toggle="tooltip"
                            data-bs-original-title="Delete product" @click="confirmInvestmentDelete(policy.ROWID)">
                            Delete
                          </a>
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button" data-bs-toggle="tooltip"
                          data-bs-original-title="Edit" aria-hidden="true">
                          <a v-show="selectedTableLayout === 'all'" href="javascript:;" data-bs-toggle="tooltip"
                            data-bs-original-title="Delete product"
                            @click="deleteByCondition(policy.ROWID, policy.layout)">
                            Delete
                          </a>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
              <td class="ps-4" v-if="isVisible('Created Time *')">
                {{ policy.CREATEDTIME }}
              </td>
              <td class="ps-4" v-if="isVisible('Application Submitted On')">
                {{ policy.applicationSubmittedOn }}
              </td>
              <td class="ps-4" v-if="isVisible('Policy Name')">
                {{ policy.policyName }}
              </td>
              <!-- <td class="ps-4" v-if="isVisible('Client')">
                {{ policy.clinetName }}
              </td> -->
              <td class="ps-4" v-if="isVisible('Client')">
                <router-link :to="'/contactview/'+ policy.clinetROWID"
                  style="color: blue; text-decoration: none; cursor: pointer;">
                  {{ policy.clinetName }}
                </router-link>
              </td>

              <td class="ps-4" v-if="isVisible('Client Mobile')">
                {{ policy.clientMobile }}
              </td>
              <td class="ps-4" v-if="isVisible('Policy Type')">
                {{ policy.policyType }}
              </td>
              <td class="ps-4" v-if="isVisible('Policy Status')">
                {{ policy.policyStatus }}
              </td>
              <td class="ps-4" v-if="isVisible('Premium Frequency')">
                {{ policy.premiumFrequency }}
              </td>
              <td class="ps-4" v-if="isVisible('Insurance Company Account')">
                {{ policy.insuranceCompanyAccount }}
              </td>
              <td class="ps-4" v-if="isVisible('Advisor Commision Amount')">

              </td>
              <td class="ps-4" v-if="isVisible('Policy Premium (Read I)')">

              </td>
              <td class="ps-4" v-if="isVisible('Email')">

              </td>
              <td class="ps-4" v-if="isVisible('Policy Start Date')">

              </td>
              <td class="ps-4" v-if="isVisible('Policy Renewal Date')">

              </td>
              <td class="ps-4" v-if="isVisible('Policy Owner')">
                {{ policy.ownerName }}
              </td>
              <td class="ps-4" v-if="isVisible('Policy Number')">
                {{ policy.policyNumber }}
              </td>
              <td class="ps-4" v-if="isVisible('Policy Advisor')">

              </td>
              <td class="ps-4" v-if="isVisible('How Many Days Left')">

              </td>
              <td class="ps-4" v-if="isVisible('Issued By')">
                {{ policy.issuedBy }}
              </td>
              <td class="ps-4" v-if="isVisible('Early Return')">
                {{ policy.earlyReturnApplicationCancelled }}
              </td>
              <td class="ps-4" v-if="isVisible('Modified Time')">
                {{ policy.MODIFIEDTIME }}
              </td>

              <td class="ps-4" v-if="isVisible('Location')">
                {{ policy.location }}
              </td>
              <td class="ps-4" v-if="isVisible('Layout')">
                {{ policy.layout }}
              </td>
              <td class="ps-4" v-if="isVisible('Confirmation Policy Start?')">
                {{ policy.confirmationPolicyStart }}
              </td>
              <td class="ps-4" v-if="isVisible('Policy Month')">
                {{ policy.policyMonth }}
              </td>
              <td class="ps-4" v-if="isVisible('Advisor Payout')">

              </td>
              <td class="ps-4" v-if="isVisible('Product FYC%')">
                {{ policy.productFycPercent }}
              </td>
              <td class="ps-4" v-if="isVisible('Advisor Bonus% of FYC')">
                {{ policy.advisorBonusOfFyc }}
              </td>

              <td class="ps-4" v-if="isVisible('Insured 1 Date of Birth')">

              </td>
              <td class="ps-4" v-if="isVisible('Reason for Policy Being Declined')">

              </td>
              <td class="ps-4" v-if="isVisible('Beneficiary 1 Date of Birth')">

              </td>
              <td class="ps-4" v-if="isVisible('Send to BOT Result')">

              </td>
              <td class="ps-4" v-if="isVisible('Cancellation')">

              </td>
              <td class="ps-4" v-if="isVisible('Whatsapp')">
                {{ policy.whatsapp }}
              </td>
              <!-- Add other columns as needed -->
            </tr>
            <tr v-show="selectedTableLayout === 'policies'" v-for="(policy, index) in paginatedPolicies" :key="index"
              class="bottom-border-light px-2">
              <td class="align-middle th-align-middle">
                <div class="form-check">
                  <input :id="'customCheck' + index" class="form-check-input" type="checkbox"  v-model="selectedPolicies"   :value="policy.ROWID"  />
                </div>
              </td>
              <td class="ps-4 ">
                <!-- Actions -->
                <div class="d-flex align-items-center">
                  <router-link :to="`/policies-details`">
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
                          <router-link v-show="selectedTableLayout !== 'all'"
                            :to="`${selectedTableLayout === 'policies' ? '/policyformins/' : '/investmentform/'}` + policy.ROWID">
                            <a class="mx-1" data-bs-toggle="tooltip" data-bs-original-title="Edit product">
                              Edit
                            </a>
                          </router-link>
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button" data-bs-toggle="tooltip"
                          data-bs-original-title="Edit" aria-hidden="true">
                          <router-link v-show="selectedTableLayout === 'all'"
                            :to="`${policy.layout === 'RRSP' || policy.layout === 'RESP' || policy.layout === 'TFSA' ? '/investmentform/' : '/policyformins/'}` + policy.ROWID">
                            <a class="mx-3" data-bs-toggle="tooltip" data-bs-original-title="Edit product">
                              Edit
                            </a>
                          </router-link>
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button" data-bs-toggle="tooltip"
                          data-bs-original-title="Edit" aria-hidden="true">
                          <a v-show="selectedTableLayout === 'policies'" href="javascript:;" data-bs-toggle="tooltip"
                            data-bs-original-title="Delete product" @click="confirmDeletePolicy(policy.ROWID)">
                            Delete
                          </a>
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button" data-bs-toggle="tooltip"
                          data-bs-original-title="Edit" aria-hidden="true">
                          <a v-show="selectedTableLayout === 'investments'" href="javascript:;" data-bs-toggle="tooltip"
                            data-bs-original-title="Delete product" @click="confirmInvestmentDelete(policy.ROWID)">
                            Delete
                          </a>
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button" data-bs-toggle="tooltip"
                          data-bs-original-title="Edit" aria-hidden="true">
                          <a v-show="selectedTableLayout === 'all'" href="javascript:;" data-bs-toggle="tooltip"
                            data-bs-original-title="Delete product"
                            @click="deleteByCondition(policy.ROWID, policy.layout)">
                            <i class="fas fa-trash text-secondary blue-color" aria-hidden="true"></i>
                          </a>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
              <td class="ps-4 ">
                <div class="avatar-container">
                  <span class="text-xs ">{{
                    policy.layout
                  }}</span>
                </div>
              </td>
              <td class="ps-4 ">
                <div class="avatar-container">
                  <span class="text-xs "> {{ policy.policyNumber }}</span>
                </div>
              </td>
              <td class="ps-4 ">
                <div class="avatar-container">
                  <!-- <div class="avatar">{{ contact.initials }}</div> -->
                  <span class="text-xs ">{{
                    policy.ownerName
                  }}</span>
                </div>
              </td>
              <td class="ps-4 ">
                <div class="avatar-container">
                  <!-- <div class="avatar">{{ contact.initials }}</div> -->
                  <span class="text-xs ">{{
                    policy.coverageAmount
                  }}</span>
                </div>
              </td>

              <!-- Other columns -->

              <td class="ps-4 ">
                <div class="avatar-container">
                  <span class="text-xs ">{{
                    policy.policyPremium
                  }}</span>
                </div>
              </td>
              <td class="ps-4 ">
                <div class="avatar-container">
                  <span class="text-xs ">{{
                    policy.clientMobile
                  }}</span>
                </div>
              </td>

              <td class="ps-4 ">
                <span class="text-xs ">{{
                  policy.firstName
                }}</span>
              </td>

              <!-- Add other columns as needed -->
            </tr>
            <tr v-show="selectedTableLayout === 'investments'" v-for="(policy, index) in paginatedPolicies" :key="index"
              class="bottom-border-light px-2">
              <td class="align-middle th-align-middle">
                <div class="form-check">
                  <input :id="'customCheck' + index" class="form-check-input" type="checkbox" />
                </div>
              </td>
              <td class="ps-4 ">
                <!-- Actions -->
                <div class="d-flex align-items-center">
                  <router-link :to="`/policies-details`">
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
                          <router-link v-show="selectedTableLayout !== 'all'"
                            :to="`${selectedTableLayout === 'policies' ? '/policyformins/' : '/investmentform/'}` + policy.ROWID">
                            <a class="mx-1" data-bs-toggle="tooltip" data-bs-original-title="Edit product">
                              Edit
                            </a>
                          </router-link>
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button" data-bs-toggle="tooltip"
                          data-bs-original-title="Edit" aria-hidden="true">
                          <router-link v-show="selectedTableLayout === 'all'"
                            :to="`${policy.layout === 'RRSP' || policy.layout === 'RESP' || policy.layout === 'TFSA' ? '/investmentform/' : '/policyformins/'}` + policy.ROWID">
                            <a class="mx-1" data-bs-toggle="tooltip" data-bs-original-title="Edit product">
                              Edit
                            </a>
                          </router-link>
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button" data-bs-toggle="tooltip"
                          data-bs-original-title="Edit" aria-hidden="true">
                          <a v-show="selectedTableLayout === 'policies'" href="javascript:;" data-bs-toggle="tooltip"
                            data-bs-original-title="Delete product" @click="confirmDeletePolicy(policy.ROWID)">
                            delete
                          </a>
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button" data-bs-toggle="tooltip"
                          data-bs-original-title="Edit" aria-hidden="true">
                          <a v-show="selectedTableLayout === 'investments'" href="javascript:;" data-bs-toggle="tooltip"
                            data-bs-original-title="Delete product" @click="confirmInvestmentDelete(policy.ROWID)">
                            Delete
                          </a>
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button" data-bs-toggle="tooltip"
                          data-bs-original-title="Edit" aria-hidden="true">
                          <a v-show="selectedTableLayout === 'all'" href="javascript:;" data-bs-toggle="tooltip"
                            data-bs-original-title="Delete product"
                            @click="deleteByCondition(policy.ROWID, policy.layout)">
                            Delete
                          </a>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

              </td>
              <td class="ps-4 ">
                <div class="avatar-container">
                  <span class="text-xs ">{{
                    policy.layout
                  }}</span>
                </div>
              </td>
              <td class="ps-4 ">
                <div class="avatar-container">
                  <span class="text-xs ">{{ policy.policyName }}</span>
                </div>
              </td>
              <td class="ps-4 ">
                <div class="avatar-container">
                  <!-- <div class="avatar">{{ contact.initials }}</div> -->
                  <span class="text-xs ">{{
                    policy.clientMobile
                  }}</span>
                </div>
              </td>
              <td class="ps-4 ">
                <div class="avatar-container">
                  <!-- <div class="avatar">{{ contact.initials }}</div> -->
                  <span class="text-xs ">{{
                    policy.clientAddress
                  }}</span>
                </div>
              </td>

              <!-- Other columns -->

              <td class="ps-4 ">
                <div class="avatar-container">
                  <span class="text-xs ">{{
                    policy.contractName
                  }}</span>
                </div>
              </td>
              <td class="ps-4 ">
                <div class="avatar-container">
                  <span class="text-xs ">{{
                    policy.policyPremium
                  }}</span>
                </div>
              </td>

              <td class="ps-4 ">
                <span class="text-xs ">{{
                  policy.frequency
                }}</span>
              </td>
              <td class="ps-4 ">
                <span class="text-xs ">{{
                  policy.bonus
                }}</span>
              </td>


              <!-- Add other columns as needed -->
            </tr>
          </tbody>
        </table>
      </div>
      <Loader :loading="isLoading"></Loader>
      <div class="pagination-container">
        <div class="total-count">
          <p><strong>Total Policy: {{ totalItems }}</strong></p>
        </div>
        <!-- Custom pagination -->
        <div class="pagination-wrapper ">
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
              <template v-if="totalPages <= 3">
                <li class="page-item rounded-circle color-table-list" v-for="page in pages" :key="page"
                  :class="{ active: currentPage === page }">
                  <a class="page-link" href="javascript:;" @click="gotoPage(page)">{{ page }}</a>
                </li>
              </template>
              <template v-else>
                <li class="page-item rounded-circle text-white" v-for="index in 3" :key="index"
                  :class="{ active: currentPage === startPage + index - 1 }">
                  <a class="page-link" href="javascript:;" @click="gotoPage(startPage + index - 1)">{{ startPage + index
                    -
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
              <!-- dynamic record based on page size -->
              <li class="page-item d-flex justify-content-end">
                <div class="bottom-right-text">
                  <p class="mb-0">
                  <div class="d-flex justify-content-end ms-2">
                    <div class="dropdown ms-2">
                      <button class="btn btn-outline btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        {{ itemsPerPage }} Records Per Page
                      </button>
                      <ul class="dropdown-menu dropdown-menu-end">
                        <li v-for="size in [5, 20, 30]" :key="size">
                          <a class="dropdown-item d-flex justify-content-between align-items-center"
                            :class="{ 'active-record': itemsPerPage === size }" href="javascript:;"
                            @click.prevent="updateItemsPerPage(size)">
                            {{ size }} Records Per Page
                          </a>
                        </li>
                      </ul>
                    </div>

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
  <!-- for mobile view -->
  <div ref="mobileRef" v-if="!isDesktop">
    <div
      style="width:100%;height:80px;display: flex;align-items: center;justify-content:end;background-color: white;padding-right:10px; border-bottom:1px solid ;">

      <div class="d-flex align-items-center justify-content-between">
        <div class="col-md-4 col-sm-12 mt-5 mr-3 "
          style="position: absolute; left: 15px; width: 5rem; border: 2px solid 184e88; border-radius: 10px; top: 31px">
          <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
            aria-expanded="false">
            <div class="select-box " style="border:1px solid;border-radius:0.5rem">
              <select @change="handleTableListView" v-model="selectedTableLayout" id="choices-state"
                class="multisteps-form__select form-control choices__input custom-btn btn text-truncate"
                name="choices-state" tabindex="-1" data-choice="active">
                <option value="all" style="font-size: 12px;">
                  All
                </option>
                <option value="policies" style="font-size: 12px;">
                  Policies
                </option>
                <option value="investments" style="font-size: 12px;"> Investments</option>
              </select>
            </div>
          </div>
        </div>

        <div class="row justify-content-center mx-1">
          <button @click="toggleDrawer()" type="button" class="btn search-btn-list">
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
                <router-link :to="`/policyformins`">
                  <a target="_blank">+ Policy</a>
                </router-link>
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button">
                <router-link :to="`/investmentform`">
                  <a target="_blank"> + Investment</a>
                </router-link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <Loader :loading="isLoading"></Loader>
    <div ref="scrollableDiv" class="scrollable-container" id="style-3" style="min-height:30vh;">

      <div class="policyCard " style="z-index: 1; border-bottom:1px solid ; "
        v-for="(policy, index) in paginatedPolicies" :key="index">



        <div class="parent col-12">
          <div class="start col-9" style="padding-left:15px; padding-top:15px;">
            <table>
              <tr>
                <td><strong>{{ policy.policyName }}</strong></td>
              </tr>
              <tr>
                <td><i class="fas fa-circle" style="color: red; font-size: 10px;"></i>{{ policy.policyStatus }}</td>
              </tr>
              <tr>
                <td>{{ policy.clientMobile }}</td>
              </tr>
              <tr>
                <td>{{ policy.policyType }}</td>
              </tr>
            </table>
          </div>
          <div class="end col-3 mt-4" style="vertical-align: center;">
            <router-link :to="`/policies-details/${policy.ROWID}`">
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
import { putUrl } from "../../../boot/axios.js";
import router from "../../../router/index.js";
import { verifyUser } from "../../../verifyUser/verifyUser.js";
import { reactive, ref } from "vue";
import Swal from "sweetalert2";
import Loader from "../../utils/Loader.vue";
import { getAllPolicy, getAllInvestments, getAllInvestmentAndPolicy } from "../utils/Api.js";
import { findNameByIdUsers } from "../utils/utils.js";
import Drawer from "./policyDrawer/Drawer.vue";
import PolicyColumnManageDrawer from "./PolicyColumnManageDrawer.vue";
import MassUpdatePolicyModel from "./MassUpdatePolicyModel.vue";
import MassUpdatePolicyEmail from "./MassUpdatePolicyEmail.vue";
export default {
  components: {
    Loader,
    Drawer,
    PolicyColumnManageDrawer,
    MassUpdatePolicyModel,
    MassUpdatePolicyEmail
  },
  data() {
    let ownerName;
    const popOverAlertMessage = ref("");
    const Policies = reactive([]);
    const originalPolicies = reactive([]);
    const startPage = ref(1);
    const isLoading = ref(false);
    const selectedTableLayout = "all";

    return {
      ownerName,
      isLoading,
      popOverAlertMessage,
      startPage,
      Policies,
      originalPolicies,
      totalItems: 0,
      currentPage: 1,
      itemsPerPage: 30,
      findNameByIdUsers,
      showSearchDetail: true,
      isColumnManageDrawerOpen: false,
      selectedTableLayout,
      isDrawerOpen: false,
      showMassUpdate: false,
      sortColumn: null,
      showMassEmail: false,
      sortOrder: 'asc', // or 'desc'
      isResizing: false,
      ghostLineX: 0,
      resizingColumnIndex: null,
      startX: 0,
      startWidth: 0,
      isResizing: false,
      tableLeftOffset: 0,
      isDesktop: false,
      selectedPolicies: [],
      tableHeaders: [
        "Action",
        "Created Time *",
        "Application Submitted On",
        "Policy Name",
        "Client",
        "Client Mobile",
        "Policy Type",
        "Policy Status",
        "Premium Frequency",
        "Insurance Company Account",
        "Advisor Commision Amount",
        "Policy Premium (Read I)",
        "Email",
        "Policy Start Date",
        "Policy Renewal Date",
        "Policy Owner",
        "Policy Number",
        "Policy Advisor",
        "How Many Days Left",
        "Issued By",
        "Early Return",
        "Modified Time",
        "Location",
        "Layout",
        "Confirmation Policy Start?",
        "Policy Month",
        "Advisor Payout",
        "Product FYC%",
        "Advisor Bonus% of FYC",
        "Insured 1 Date of Birth",
        "Reason for Policy Being Declined",
        "Beneficiary 1 Date of Birth",
        "Send to BOT Result",
        "Cancellation",
        "Whatsapp",
      ],
      policytableHeaders: [
        "Action",
        "Layout",
        "Policy Number",
        "Policy Owner",
        "Policy Premium (Read I)",
        "Client",
        "Client Mobile",
      ],

      visibleColumns: [],
      columnWidths: [],

      // initialColumnWidths: [93, 100, 230, 150, 280, 240, 220, 200, 200],
      initialColumnWidths: {
        'Action': 120,
        'Created Time *': 190,
        'Application Submitted On': 275,
        'Policy Name': 270,
        'Client': 260,
        'Client Mobile': 240,
        'Policy Type': 240,
        'Policy Status': 220,
        'Premium Frequency': 225,
        'Insurance Company Account': 295,
        'Advisor Commision Amount': 280,
        'Policy Premium (Read I)': 240,
        'Email': 200,
        'Policy Start Date': 200,
        'Policy Renewal Date': 230,
        'Policy Owner': 200,
        'Policy Number': 200,
        'Policy Advisor': 200,
        'How Many Days Left': 220,
        "Issued By": 200,
        "Early Return": 200,
        "Modified Time": 200,
        "Location": 200,
        "Layout": 200,
        "Confirmation Policy Start?": 285,
        "Policy Month": 200,
        "Advisor Payout": 200,
        "Product FYC%": 200,
        "Advisor Bonus% of FYC": 245,
        "Insured 1 Date of Birth": 245,
        "Reason for Policy Being Declined": 335,
        "Beneficiary 1 Date of Birth": 335,
        "Send to BOT Result": 250,
        "Cancellation": 200,
        "Whatsapp": 200,
      },
      headerFieldMap: {
        "Created Time *": "CREATEDTIME",
        "Application Submitted On": "applicationSubmittedOn",
        "Policy Name": "policyName",
        "Client": "clinetName",
        "Client Mobile": "clientMobile",
        "Policy Type": "policyType",
        "Policy Status": "",
        "Premium Frequency": "premiumFrequency",
        "Insurance Company Account": "insuranceCompanyAccount",
        "Advisor Commision Amount": "",
        "Policy Premium (Read I)": "",
        "Email": "",
        "Policy Start Date": "",
        "Policy Renewal Date": "",
        "Policy Owner": "ownerName",
        "Policy Number": "policyNumber",
        "Policy Advisor": "",
        "How Many Days Left": "",
        "Issued By": "issuedBy",
        "Early Return": "earlyReturnApplicationCancelled",
        "Modified Time": "MODIFIEDTIME",
        "Location": "location",
        "Layout": "layout",
        "Confirmation Policy Start?": "confirmationPolicyStart",
        "Policy Month": "policyMonth",
        "Advisor Payout": "",
        "Product FYC%": "productFycPercent",
        "Advisor Bonus% of FYC": "advisorBonusOfFyc",
        "Insured 1 Date of Birth": "",
        "Reason for Policy Being Declined": "",
        "Beneficiary 1 Date of Birth": "",
        "Send to BOT Result": "",
        "Cancellation": "",
        "Whatsapp": "whatsapp",

      },
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
      // The search query entered by the user
      searchQuery: "",

    };
  },

  async beforeMount() {
    const verified = await verifyUser();
    if (!verified) {
      router.push("/signin");
    }
  },
  created() {

    // this.visibleColumns = [...this.tableHeaders];
    this.handleTableListView();
    this.columnWidths = this.visibleColumns.map(label => {
      return this.initialColumnWidths[label] || 200;
    });
  },

  computed: {
    totalPages() {
      if (
        typeof this.Policies.length === "number" &&
        !isNaN(this.Policies.length)
      ) {
        return Math.ceil(this.Policies.length / this.itemsPerPage);
      } else {
        return 0; // Return 0 if Policies length is not valid
      }

    },
    // Computed property to filter the items based on the search query
    filteredItems() {
      return this.items.filter((item) =>
        item.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    // paginatedPolicies() {
    //   let sortedPolicies = [...this.Policies];

    //   if (this.sortColumn) {
    //     const field = this.headerFieldMap[this.sortColumn] || this.sortColumn;

    //     sortedPolicies.sort((a, b) => {
    //       let valA = a[field] || '';
    //       let valB = b[field] || '';

    //       // Special handling for time fields
    //       if (field.toLowerCase().includes('time')) {
    //         valA = new Date(valA);
    //         valB = new Date(valB);
    //       }

    //       if (this.sortOrder === 'asc') {
    //         return valA > valB ? 1 : valA < valB ? -1 : 0;
    //       } else {
    //         return valA < valB ? 1 : valA > valB ? -1 : 0;
    //       }
    //     });
    //   }

    //   const start = (this.currentPage - 1) * this.itemsPerPage;
    //   const end = start + this.itemsPerPage;

    //   return sortedPolicies

    // },
    paginatedPolicies() {
      let sortedPolicies = [...this.Policies];

      if (this.sortColumn) {
        const field = this.headerFieldMap[this.sortColumn] || this.sortColumn;

        sortedPolicies.sort((a, b) => {
          let valA = a[field] || '';
          let valB = b[field] || '';

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

      return sortedPolicies.slice(start, end);
    },

    // paginatedPolicies() {
    //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    //   const endIndex = startIndex + this.itemsPerPage;
    //   return this.Policies.slice(startIndex, endIndex);

    // },
    pages() {
      return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    },
    paginationInfo() {
      const totalItems = this.Policies.length;
      const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
      const endItem = Math.min(startItem + this.itemsPerPage - 1, totalItems);
      return `Showing ${startItem} to ${endItem} of ${totalItems} entries`;
    },

  },
  mounted() {
    this.checkScreenSize();
    this.countPolicy();
    window.addEventListener("resize", this.checkScreenSize)
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize)
  },
  methods: {
    capitalize(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    async handleSearchResults(policyPayload) {
      console.log('Filtered policy from Drawer:', policyPayload);
      this.isLoading = true;

      try {
        await this.setAllInvestmentAndPolicyList(policyPayload);
      } catch (error) {
        console.error("Error fetching policies:", error);

        // Optional: if the error is from axios
        const errorMsg =
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong while loading policies.";

        // SweetAlert or your preferred method
        Swal.fire("Error", errorMsg, "error");
      } finally {
        this.isLoading = false;
        this.currentPage = 1;
        this.closeDrawer();
      }
    },

    resetPolicyt() {
      this.setAllInvestmentAndPolicyList();          // Page 1 pe wapas
    },
    showSearchDetails() {
      // let item = document.querySelector(".message-details");
      // item.style.transform = this.showSearchDetail
      //   ? "translateX(0)"
      //   : "translateX(100%)";
      this.showSearchDetail = !this.showSearchDetail;
    },
    async setOwner() {
      this.ownerName = await findNameByIdUsers();
    },
    async setPolicyList() {
      this.isLoading = true;
      this.Policies = await getAllPolicy();
      this.isLoading = false;
    },
    async setInvestmentList() {
      this.isLoading = true;
      this.Policies = await getAllInvestments();
      this.isLoading = false;
    },
    async setAllInvestmentAndPolicyList(policyPayload) {
      this.isLoading = true;
      this.Policies = await getAllInvestmentAndPolicy(policyPayload);
      this.isLoading = false;

    },

    async handleTableListView() {
      console.log("Table view has been changed");

      console.log("This is table layout", this.selectedTableLayout);
      if (this.selectedTableLayout === 'all') {
        this.setAllInvestmentAndPolicyList();
        this.visibleColumns = [...this.tableHeaders];
        console.log("this.visibleColumns", this.visibleColumns)

      }
      else if (this.selectedTableLayout === 'policies') {
        this.setPolicyList();
        this.visibleColumns = [...this.policytableHeaders];
        console.log("this.visibleColumns", this.visibleColumns)
      }
      else {
        this.setInvestmentList();
        // this.visibleColumns = [...this.investmentTableHeaders];

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
    // --------------
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
    // Mass Update
    openMassUpdatePopup() {

      this.showMassUpdate = true;
    },
    closeMassUpdatePopup() {
      this.showMassUpdate = false;
    },
    // mass email
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

    // resize column
    checkScreenSize() {
      this.isDesktop = window.innerWidth >= 500;
    },
    startResize(event, columnIndex) {
      this.isResizing = true;
      this.resizingColumnIndex = columnIndex;
      this.startX = event.pageX;
      this.startWidth = this.columnWidths[columnIndex];
      console.log("start start width", this.startWidth)

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
        console.log("isResizing nhi ho rhi")

        const tableWrapper = document.querySelector('.scrollable-container');
        const scrollLeft = tableWrapper?.scrollLeft || 0;
        const offsetLeft = tableWrapper?.getBoundingClientRect().left || 0;

        const moved = event.pageX - this.startX;
        console.log("moved", moved);

        const newWidth = this.startWidth + moved;
        console.log("newWidth", newWidth);
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

    // sorting

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
    async updateItemsPerPage(size) {
      this.itemsPerPage = size;
      this.currentPage = 1;
    },
    async toggleSelectAll(event) {
      if (event.target.checked) {
        this.selectedPolicies = this.Policies.map(policy => policy.ROWID);
        console.log("selectedPolicies: " + this.selectedPolicies);
      } else {
        this.selectedPolicies = [];
      }
    },
    async confirmInvestmentDelete(id) {
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
          this.deleteInvestment(id);
        }
      });
    },
    async deleteSelectedRecords() {
      if (confirm("Are you sure you want to delete the selected records?")) {
        let idArray = [];
        for (let value of this.selectedPolicies) {
          idArray.push(value);
        }
        console.log({ idArray });

        this.deletePolicy(idArray);
        this.selectedPolicies = [];
        this.showSearchDetails();
      }
    },
    async confirmDeletePolicy(id) {
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
          this.deletePolicy(id);
        }
      });
    },

    async deleteInvestment(id) {
      try {
        // Send a request to delete the contact
        const response = await axios.delete(
          `${putUrl}investment/api/v1/deleteinvestment/${id}`

        );
        console.log(response)
        this.isLoading = false;
        // Remove the deleted contact from the local data
        this.Policies = this.Policies.filter((policy) => policy.ROWID !== id);
        Swal.fire({
          title: "<strong>investment Deleted Successfully</strong>",
          icon: "success",
        });
        this.$forceUpdate();
      } catch (error) {
        Swal.fire({
          title: "<strong>Error Occured While Deleteing investment</strong>",
          icon: "error",
        });
        console.error(error);
      }
    },
    async deletePolicy(id) {
      this.isLoading = true;
      console.log(id);
      try {
        // Send a request to delete the contact
        const response = await axios.delete(
          `${putUrl}Policy/api/v1/deletepolicy/${id}`

        );
        console.log(response)
        this.isLoading = false;
        // Remove the deleted contact from the local data
        this.Policies = this.Policies.filter((policy) => policy.ROWID !== id);
        Swal.fire({
          title: "<strong>Policy Deleted Successfully</strong>",
          icon: "success",
        });
        this.$forceUpdate();
      } catch (error) {
        Swal.fire({
          title: "<strong>Error Occured While Deleteing Policy</strong>",
          icon: "error",
        });
        console.error(error);
      }
    },

    async deleteByCondition(id, layout) {
      if (layout === 'RRSP' || layout === 'RESP' || layout === 'TFSA') {
        await this.confirmInvestmentDelete(id);
      }
      else {
        await this.confirmDeletePolicy(id);
      }

    },

    changePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    exportToExcel() {
      const header = Object.keys(this.Policies[0]).join(",");
      const csvContent = this.Policies.map((contact) =>
        Object.values(contact).join(",")
      ).join("\n");
      const csvData = header + "\n" + csvContent;

      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "Policies.csv");
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
    async downloadFile(type) {
      try {
        const body = {
          type: type
        };
        const sampleFile = await axios.post(`${putUrl}Policy/api/v2/download-files`, body);
        const csvContent = sampleFile.data;
        // Send the CSV file for download
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${type}.csv`;
        link.click();
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    },

    checkScreenSize() {
      this.isDesktop = window.innerWidth >= 500;
    },
    async countPolicy() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${putUrl}canadianlicapi/policy/api/v2/count-policy`
        );
        this.totalItems = response.data.count;
      } catch (error) {
        console.error("Error fetching policy count", error);
      } finally {
        this.isLoading = false;
      }
    }
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

th {
  font-size: 15px !important;
  color: #223b62 !important;
}

td span {
  font-size: 15px !important;
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
  height: 76vh;
  right: 0;
  bottom: 0;
  width: 30%;
  background-color: #fefefe;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%);
  overflow-y: auto;
}

.message-details-content {
  padding: 20px;
}

/* policy list in mobile */
/* Add your styles here */
.tophead {
  background-color: white;
  padding-top: 20px;
  padding-bottom: 10px;
}

.policy-mobile-container {
  height: 80vh;
  overflow-y: scroll;
}

.policyCard {
  background-color: white;
}

.policy-heading {
  font-size: 16px;
  color: #8b8b8b;
  font-family: sans-serif;
}

.policy-desc {
  font-size: 16px;
  color: #312867;
  font-family: sans-serif;
}

.policy-table {
  width: 100%;
  border-collapse: collapse;
}

.policy-table td {
  width: 50%;
  border: 1px solid #abaaaa;
}

.policy-check-in-btn {
  border: 2px solid #184e88;
  color: #312867;
  width: 100%;
  border-radius: 10px;
  padding: 5px;
}

.policy-check-out-btn {
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

.policy-create-btn {
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



/* resize css */
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

/*  */
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
  font-size: 15px;
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

@media (max-width: 768px) {
  .scrollable-container::after {
    display: block;
  }
}

/* Specific styles for table body cells */
.resizable-table td {
  /* padding: 5px 8px; */
  min-width: 150px;
  width: 150px;
  vertical-align: middle;
}

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

.dropdown-cell {
  overflow: visible !important;
  /* position: relative !important; */
  z-index: 2;
}

/*  */
@media (max-width: 600px) {
  .message-details {
    width: 100%;
  }
}

@media (max-width: 900px) {
  .message-details {
    width: 100%;
  }
}
</style>
