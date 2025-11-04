<template>
  <div class="drawer-main-div card">
    <div class="drawer" :class="{ 'is-open': isOpen, 'is-visible': isVisible }">
      <div
        class="drawer__overlay"
        :style="{ transitionDuration: `${speed}ms` }"
      ></div>
      <div
        class="drawer__content"
        v-click-away="closeDrawer"
        :style="{
          maxWidth: maxWidth,
          transitionDuration: `${speed}ms`,
          backgroundColor: backgroundColor,
        }"
      >
        <div class="px-3 py-1">
          <i @click="closeDrawer" class="fa fa-arrow-right cursor-pointer"></i>
        </div>
        <!-- Lead Drawer -->
        <div class="message-details p-1 flex-grow-1">
          <h4 class="mx-3">{{selectedButton === 'Update'? 'Update Remote Assist' : 'Add Remote Assist'}}</h4>
          <form class="card-body pt-1">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-0">
                  <label for="name">Remote Assist Name</label>
                  <input
                    v-model="formData.name"
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Remote Assist Name"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-0">
                  <label for="exchangeRate">Exchange Rate</label>
                  <input
                    v-model="formData.exchangeRate"
                    type="number"
                    class="form-control"
                    id="exchangeRate"
                    placeholder="Exchange Rate"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-0">
                  <label for="sessionType">Session Type</label>
                  <select
                    v-model="formData.sessionType"
                    class="form-control"
                    id="sessionType"
                  >
                    <option value="" disabled>Select Session Type</option>
                    <option value="None">None</option>
                    <option value="Remote Support">Remote Support</option>
                    <option value="Screen Share">Screen Share</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-0">
                  <label for="dateAndTime">Date and Time</label>
                  <input
                    v-model="formData.dateAndTime"
                    type="datetime-local"
                    class="form-control"
                    id="dateAndTime"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-0">
                  <label for="leadId">Lead</label>
                  <select
                    v-model="formData.leadId"
                    class="form-control"
                    id="leadId"
                  >
                    <option
                      v-for="(leads, index) in leads"
                      :key="index"
                      :value="leads.ROWID"
                    >
                      {{ leads.name }}
                    </option>
                    <!-- <option value="" disabled>Select leadId</option>
                    <option value="leadId 1">leadId 1</option>
                    <option value="leadId 2">leadId 2</option>
                    <option value="leadId 3">leadId 3</option> -->
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-0">
                  <label for="sessionId">Session ID</label>
                  <input
                    v-model="formData.sessionId"
                    type="text"
                    class="form-control"
                    id="sessionId"
                    placeholder="Session ID"
                  />
                </div>
              </div>
            </div>

            <!-- Fourth row: Timezone List and Remote Assist Owner -->
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-0">
                  <label for="timezoneList">Timezone List</label>
                  <input
                    v-model="formData.timezoneList"
                    type="text"
                    class="form-control"
                    id="timezoneList"
                    placeholder="Timezone List"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-0">
                  <label for="owner">Remote Assist Owner</label>
                  <select
                    v-model="formData.owner"
                    class="form-control"
                    id="owner"
                  >
                    <option
                      v-for="(owners, index) in users"
                      :key="index"
                      :value="owners.ROWID"
                    >
                      {{ owners.name }}
                    </option>
                    <!-- <option value="" disabled>Select Owner</option>
                    <option value="Owner 1">Owner 1</option>
                    <option value="Owner 2">Owner 2</option>
                    <option value="Owner 3">Owner 3</option> -->
                  </select>
                </div>
              </div>
            </div>

            <!-- Fifth row: Currency and Contact -->
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-0">
                  <label for="currency">Currency</label>
                  <select
                    v-model="formData.currency"
                    class="form-control"
                    id="currency"
                  >
                    <option value="" disabled>Currency</option>
                    <option value="CAD">CAD</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-0">
                  <label for="contactId">Contact</label>
                  <select
                    v-model="formData.contactId"
                    class="form-control"
                    id="owner"
                  >
                    <option
                      v-for="(contacts, index) in contacts"
                      :key="index"
                      :value="contacts.ROWID"
                    >
                      {{ contacts.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Sixth row: Digest and Schedule ID -->
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-0">
                  <label for="digest">Digest</label>
                  <input
                    v-model="formData.digest"
                    type="text"
                    class="form-control"
                    id="digest"
                    placeholder="Digest"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-0">
                  <label for="scheduleId">Schedule ID</label>
                  <input
                    v-model="formData.scheduleId"
                    type="text"
                    class="form-control"
                    id="scheduleId"
                    placeholder="Schedule ID"
                  />
                </div>
              </div>
            </div>

            <!-- Seventh row: Reminder and Description -->
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-0">
                  <label for="reminder">Reminder</label>
                  <select
                    v-model="formData.reminder"
                    class="form-control"
                    id="reminder"
                  >
                    <option value="None">None</option>
                    <option value="No reminders">No reminders</option>
                    <option value="5 minutes before">5 minutes before</option>
                    <option value="10 minutes before">10 minutes before</option>
                    <option value="15 minutes before">15 minutes before</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-0">
                  <label for="description">Description</label>
                  <textarea
                    v-model="formData.description"
                    class="form-control"
                    id="description"
                    placeholder="Description"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Eighth row: On Demand Session (Single full width row) -->
            <div class="row">
              <div class="col-md-12">
                <div
                  class="form-group mb-0 d-flex justify-content-start gap-2 align-items-center"
                >
                  <label for="onDemandSession"> On Demand Session </label>
                  <input
                    v-model="formData.onDemandSession"
                    type="checkbox"
                    id="onDemandSession"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <!-- Buttons at the bottom -->
        <div class="row text-center d-flex justify-space-around mt-5" >
          <div class="col">
            <button v-if="selectedButton === 'Submit'" @click="submitForm"
              class="add-btn btn me-2" style="background-color: lightseagreen; text-decoration-color:white;">Save</button>
          <button class="btn btn-danger me-2" @click="closeDrawer">Close</button>
          <button v-if="selectedButton === 'Update'" @click=" handleUpdate"
          class="add-btn btn me-2" style="background-color: lightseagreen; text-decoration-color:white;">Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { directive } from "vue3-click-away";
import axios from "axios";
import Swal from "sweetalert2";
import { putUrl } from "../../../../boot/axios.js";
import router from "../../../../router/index.js";
import { useRoute } from "vue-router";

export default {
  name: "Drawer",
  directives: {
    ClickAway: directive,
  },
  props: {
    updateData: {
      type: Function,
    },
    updateNotes: {
      type: Function,
    },
    updateRemoteAssist:{
      type: Function,
    },
    fetchAdvisorCredentials:{
      type: Function,
    },
    addNotes: {
      type: Function,
    },
    selectedButton: {
      type: String,
    },
    isOpen: {
      type: Boolean,
      required: false,
      default: false,
    },
    maxWidth: {
      type: String,
      required: false,
      default: "60% !important",
    },
    speed: {
      type: Number,
      required: false,
      default: 300,
    },
    backgroundColor: {
      type: String,
      required: false,
      default: "#fafafa",
    },
  },
  data() {
    const route = useRoute();
    return {
      route,
      isVisible: false,
      isTransitioning: false,
      users: [],
      leads: [],
      contacts: [],
      formData: {
        name: "",
        exchangeRate: null,
        sessionType: "",
        dateAndTime: "",
        leadId: "",
        sessionId: "",
        timezoneList: "",
        owner: "",
        currency: "",
        description: "",
        contactId: "",
        digest: "",
        scheduleId: "",
        onDemandSession: false,
        reminder: "None",
      },
      paginatedAdvior : [],
    };
  },
  watch: {
    isOpen(val) {
      this.isTransitioning = true;
      if (val) {
        this.toggleBackgroundScrolling(true);
        this.isVisible = true;
      } else {
        this.toggleBackgroundScrolling(false);
        setTimeout(() => (this.isVisible = false), this.speed);
      }
      setTimeout(() => (this.isTransitioning = false), this.speed);
    },
    updateData(value) {
      if (value !== null) {
        this.formData.name = value.name || "";
        this.formData.exchangeRate = value.exchangeRate || null;
        this.formData.sessionType = value.sessionType || "";
        this.formData.dateAndTime = value.dateAndTime || "";
        this.formData.leadId = value.leadId || "";
        this.formData.sessionId = value.sessionId || "";
        this.formData.timezoneList = value.timezoneList || "";
        this.formData.owner = value.owner || "";
        this.formData.currency = value.currency || "";
        this.formData.description = value.description || "";
        this.formData.contactId = value.contactId || "";
        this.formData.digest = value.digest || "";
        this.formData.scheduleId = value.scheduleId || "";
        this.formData.onDemandSession = value.onDemandSession || false;
        this.formData.reminder = value.reminder || "None";
      }
    },
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get(
          `${putUrl}canadianlicapi/utils/api/v2/get-users`
        );
        console.log("<<==response==>", response);
        return response.data?.users;
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    },
    async handleUpdate  () {
      try {
        const res = await this.updateRemoteAssist(this.formData);
        console.log({res})
        if (res.data.success) {
          this.formData.name = '';
      
          this.closeDrawer();
        }
      } catch (error) {
        console.error('Error updating note:', error);
      }
    },
    async fetchLead() {
      try {
        const response = await axios.get(
          `${putUrl}canadianlicapi/utils/api/v2/get-lead-data`
        );
        console.log("<<==response==>", response);
        return response.data?.leads;
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    },
    async fetchContact() {
      try {
        const response = await axios.get(
          `${putUrl}canadianlicapi/utils/api/v2/get-contacts`
        );
        console.log("<<==response==>", response);
        return response.data?.contacts;
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    },
    closeDrawer() {
      if (!this.isTransitioning) {
        this.$emit("close");
      }
    },
    toggleBackgroundScrolling(enable) {
      const body = document.querySelector("body");
      body.style.overflow = enable ? "hidden" : null;
    },
    async submitForm() {
      
      try {
        const res = await  this.create(this.formData);
        console.log("respone Assist",res);
        if (res.data.success) {
          this.formData.name='';
        }
      } catch (error) {
        console.error('Error saving Remote Assist:', error);
      }
      // Handle form submission logic here
      console.log("Form submitted", this.formData);
      // Close drawer after submission
      this.closeDrawer();
    },
      
      async create(data) {
            
            console.log("notes here",data);
            this.isLoading = true;
            try {
                
              
             const res= await axios.post(`${putUrl}canadianlicapi/remote-assist/api/v2/create-remote-access`,data,
              {
                      headers: {
                          "Content-Type": "application/json"
                      },
                  }
            );
               
              if(res.data.success){
                this.fetchAdvisorCredentials();
              }
                
               
                this.closeDrawer();
                Swal.fire({
                timer: 2000,
                title: "<strong>Remote Access Created Successfully</strong>",
                icon: "success",
              });
              setTimeout(() => {
                router.push(`/leads-details/${this.$route.params.id}`);
              }, 3000);
              
            
                this.isLoading = false;
                
            } catch (error) {
                this.isLoading = false;
                console.log(error);
                
                
            }
        },
  },
  async created() {
    this.users = await this.fetchUsers();
    
    this.leads = await this.fetchLead();
    this.contacts = await this.fetchContact();
    // if (this.route.params.id) {
    //   await this.fetchInitialData(this.route.params.id);
    //   console.log("this.apiData", this.apiData);
    // }
    this.isDataLoaded = false;
  },
  mounted() {
    this.isVisible = this.isOpen;
  },
};
</script>

<style lang="scss" scoped>
.drawer {
  visibility: hidden;

  &.is-visible {
    visibility: visible;
  }

  &.is-open {
    .drawer__overlay {
      opacity: 0.5;
    }

    .drawer__content {
      max-width: 30rem !important;
      transform: translateX(0);
    }
  }

  &__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 200;
    opacity: 0;
    transition-property: opacity;
    background-color: #000000;
    user-select: none;
  }

  &__content {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 9999;
    overflow: auto;
    transition-property: transform;
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    box-shadow: 0 2px 6px #777;
  }
}

.drawer-main-div {
  background-color: #fff;
}
</style>
