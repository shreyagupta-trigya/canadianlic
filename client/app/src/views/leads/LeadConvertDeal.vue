<template>
  <div class="page-container">
    <Loader :loading="isDataLoaded"></Loader>
    <div class="form-wrapper q-pa-md" v-if="!isDataLoaded">
      <form class="q-gutter-md" @submit.prevent="onConvert" @reset="confirm = true">
        <!-- Create New Contact -->
        <div class="row q-mb-md">
          <div class="col-12 col-sm-12 col-md-2 q-pr-xl lbl-style">
            <label style="text-align: right" v-if="formData.layoutName == 'Client'">Create New Client</label>
            <label style="text-align: right" v-else>Create New Advisor</label>
          </div>
          <div class="col-12 col-sm-12 col-md-3">
            <input type="text" v-model="formData.name" class="form-control" disabled />
          </div>
        </div>
        <div class="row" v-if="formData.showContact">
          <div class="col-12 col-sm-12 col-md-3 q-pl-xl q-ml-md"></div>
          <div class="col-12 col-sm-12 col-md-9 q-pl-xl q-ml-md">
            <div>
              <label>
                <input type="checkbox" v-model="formData.existContact" />
                {{ formData.contactLbl }}
              </label>
              <span>Duplication Email ID not allowed</span>
            </div>
          </div>
        </div>
        <div class="row" v-if="formData.showAccount">
          <div class="col-12 col-sm-12 col-md-11 q-pl-xl q-ml-md">
            <div>
              <label>
                <input type="checkbox" v-model="formData.existAccount" />
                {{ formData.accountLbl }}
              </label>
            </div>
          </div>
        </div>
        <!-- Create a new Deal -->
        <div class="row">
          <div class="col-12 col-sm-12 col-md-11 q-pl-xl q-ml-md">
            <div>
              <label>
                <input type="checkbox" v-model="formData.isChecked" />
                Create a new Deal for this Account.
              </label>
            </div>
          </div>
        </div>
        <div v-if="formData.isChecked">
          <div class="row q-mb-md">
            <div class="col-12 col-sm-12 col-md-2 q-pr-xl lbl-style">
              <label style="text-align: right">Deal Name</label>
            </div>
            <div class="col-12 col-sm-12 col-md-3">
              <input type="text" v-model="formData.dealName" class="form-control" />
            </div>
          </div>
          <div class="row q-mb-md">
            <div class="col-12 col-sm-12 col-md-2 q-pr-xl lbl-style">
              <label style="text-align: right">Amount</label>
            </div>
            <div class="col-12 col-sm-12 col-md-3">
              <input type="text" v-model="formData.amount" class="form-control" />
            </div>
          </div>
          <div class="row q-mb-md">
            <div class="col-12 col-sm-12 col-md-2 q-pr-xl lbl-style">
              <label style="text-align: right">Closing Date</label>
            </div>
            <div class="col-12 col-sm-12 col-md-3">
              <input type="date" v-model="formData.closeDate" class="form-control" />
            </div>
          </div>
          <div class="row q-mb-md">
            <div class="col-12 col-sm-12 col-md-2 q-pr-xl lbl-style">
              <label style="text-align: right">Stage</label>
            </div>
            <div class="col-12 col-sm-12 col-md-3">
              <select v-model="formData.stage" class="form-select">
                <option v-for="option in stageOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
                <option value="-None-">-None-</option>
              </select>


            </div>
          </div>
          <div class="row q-mb-md">
            <div class="col-12 col-sm-12 col-md-2 q-pr-xl lbl-style">
              <label style="text-align: right">Campaign Source</label>
            </div>
            <div class="col-12 col-sm-12 col-md-3">
              <input type="text" v-model="formData.campaignSource" class="form-control" />
            </div>
          </div>
          <div class="row q-mb-md">
            <div class="col-12 col-sm-12 col-md-2 q-pr-xl lbl-style">
              <label style="text-align: right">Contact Role</label>
            </div>
            <div class="col-12 col-sm-12 col-md-3">
              <select v-model="formData.layout" class="form-select">
                <option v-for="option in contactRoleOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>
          <div class="row q-mb-md" v-if="formData.layoutName != 'new'">
            <div class="col-12 col-sm-12 col-md-2 q-pr-xl lbl-style">
              <label style="text-align: right">Layout</label>
            </div>
            <div class="col-12 col-sm-12 col-md-3">
              <select class="form-select" id="layoutOptions" v-model="formData.layoutName">
                <option v-for="option in layoutOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Owner of the New Records -->
        <!-- <div class="row q-mb-md">
          <div class="col-12 col-sm-12 col-md-2 q-pr-xl lbl-style">
            <label style="text-align: right">Owner of the New Records</label>
          </div>
          <div class="col-12 col-sm-12 col-md-3">
            <select class="form-select" id="ownerOption" v-model="formData.owner">
              <option value="" disabled selected class="text-muted">
                Select Owner
              </option>
              <option v-for="(userData, index) in ownerOption" :key="index" :value="userData.ROWID">
                {{ userData.firstName }}
              </option>
            </select>
          </div>
        </div> -->
        <!--  Fixed structure -->
        <div class="row q-mb-md">
          <div class="col-12 col-sm-12 col-md-2 q-pr-xl lbl-style">
            <label style="text-align: right">Owner of the New Records</label>
          </div>
          <div class="col-12 col-sm-12 col-md-3">
            <!-- <multiselect v-model="formData.owner" :options="filteredOwnerOptions" :custom-label="customLabel"
              :track-by="'ROWID'" :label="'firstName'" :value="'ROWID'" placeholder="Select Owner" :searchable="true"
              :internal-search="false" @search-change="ownerSearch = $event">

              <template #option="{ option }">
                <div class="d-flex align-items-center gap-2">
                  <span class="status-dot" :class="getStatusColor(option.status)"></span>
                  <span>{{ option.firstName }}</span>
                </div>
              </template>

              <template #singleLabel="{ option }">
                <div class="d-flex align-items-center gap-2">
                  <span class="status-dot" :class="getStatusColor(option.status)"></span>
                  <span>{{ option.firstName }}</span>
                </div>
              </template>
            </multiselect> -->
          </div>
        </div>

        <!-- Confirmation Btn -->
        <div class="form-footer">
          <button type="submit" class="btn btn-primary me-4">Convert</button>
          <button type="reset" class="btn btn-primary">Cancel</button>
        </div>

        <!-- Reset Confirmation POP-->
        <div v-if="confirm">
          <div class="modal-overlay">
            <div class="modal">
              <div class="modal-header">
                <span>Are you sure to <b>Cancel Conversion</b> the values?</span>
              </div>
              <div class="modal-actions">
                <button @click="onCancel" class="btn btn-primary p-2 marginRight">
                  Confirm
                </button>
                <button @click="confirm = false" class="btn btn-primary p-2 ms-4">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { reactive } from "vue";
import axios from "axios";
import { putUrl } from "../../boot/axios";
import router from "../../router/index";
import Loader from "../utils/Loader.vue";
// import Multiselect from '@vueform/multiselect'
// import '@vueform/multiselect/themes/default.css'


export default {
  props: ["id"],
  components: {
    Loader,
    // Multiselect
  },
  async created() {
    this.isDataLoaded = true;
    await this.getAllLeads();
    await this.getallusers();
    this.isDataLoaded = false;
    // this.layout = this.$route.query.layout;
    // console.log("t,this.layout===>", this.layout);

  },
  data() {
    const formData = reactive({
      firstName: "",
      lastName: "",
      name: "",
      showContact: false,
      existContact: false,
      contactLbl: "",
      accountname: "",
      showAccount: false,
      existAccount: false,
      accountLbl: "",
      isChecked: false,
      dealName: "",
      amount: "",
      closeDate: "",
      stage: "",
      campaignSource: "",
      contactrole: "",
      owner: "",
      layoutName: "",
      leadLayoutName: "",
    });

    return {
      layout: "",
      formData,
      isDataLoaded: false,
      stageOptions: [
        { value: "Qualification", label: "Qualification" },
        { value: "Needs Analysis", label: "Needs Analysis" },
        { value: "Value Proposition", label: "Value Proposition" },
        { value: "Id. Decision Makers", label: "Id. Decision Makers" },
        { value: "Proposal/Price Quote", label: "Proposal/Price Quote" },
        { value: "Negotiation/Review", label: "Negotiation/Review" },
        { value: "Closed Won", label: "Closed Won" },
        { value: "Closed Lost", label: "Closed Lost" },
        {
          value: "Closed Lost to Competition",
          label: "Closed Lost to Competition",
        },
      ],
      layoutOptions: [
        { value: "Deal Form", label: "Deal Form" },
        { value: "Life/Critical Insurance", label: "Life/Critical Insurance" },
        { value: "RRSP/RESP/TFSA", label: "RRSP/RESP/TFSA" },
        {
          value: "SuperVisa / Visitor Insurance",
          label: "SuperVisa / Visitor Insurance",
        },
      ],
      contactRoleOptions: [
        { value: "Developer/Evaluator", label: "Developer/Evaluator" },
        { value: "Decision Maker", label: "Decision Maker" },
        { value: "Purchasing", label: "Purchasing" },
        { value: "Executive Sponsor", label: "Executive Sponsor" },
        { value: "Engineering Lead", label: "Engineering Lead" },
        { value: "Economic Decision Maker", label: "Economic Decision Maker" },
        { value: "Product Management", label: "Product Management" },
      ],
      ownerOption: [],
      ownerSearch: "",
      confirm: false,
    };
  },
  computed: {
    filteredOwnerOptions() {
      return this.ownerOption.filter((user) =>
        user.firstName?.toLowerCase().includes(this.ownerSearch.toLowerCase())
      );
    },


  },

  methods: {
    async onConvert() {
      this.isDataLoaded = true;
      const payload = { ...this.formData };

      //If owner is an object, convert it to just ROWID
      if (typeof payload.owner === 'object' && payload.owner?.ROWID) {
        payload.owner = payload.owner.ROWID;
      }
      // console.log("Form submitted", payload);
      // handle form submission
      await axios
        .post(
          `${putUrl}lead/api/v1/lead-convert/${this.id}`,
          payload
        )
        .then((data) => {
          console.log(data);
        })
        .then(() => {
          Swal.fire({
            timer: 2000,
            title: "<strong>Lead converted Successfully</strong>",
            icon: "success",
          });
          setTimeout(() => {
            router.push("/leads-list");
          }, 3000);
        })
        .catch((error) => {
          Swal.fire({
            title: error.message,
            icon: "error",
          });
        });
      this.isDataLoaded = false;
    },
    testQuery() {
      // handle test query
    },
    onCancel() {
      // handle cancel confirmation
      this.confirm = false;
    },
    async getAllLeads() {
      console.log(this.id);
      try {
        const response = await axios.get(
          `${putUrl}uatServerFunction/api/v1/getLeadById/${this.id}`
        );
        console.log("response", response.data.data.leadResult);
        const leadData = response.data.data.leadResult[0].leads;
        this.formData = { ...leadData, name: leadData.firstName + " " + leadData.lastName, dealName: leadData.firstName + " " + leadData.lastName, leadLayoutName: leadData.layoutName };
        console.log("formData clients===>", this.formData.layoutName);
      } catch (error) {
        console.log(error);
      }
    },
    async getallusers() {
      try {
        const response = await axios.get(
          `${putUrl}uatServerFunction/api/v1/getAllUsers`
        );
        const allUsers = response.data.map((item) => item.userData);

        // Sort: ACTIVE users first, then rest
        allUsers.sort((a, b) => {
          const aStatus = a.status?.toUpperCase() === 'ACTIVE' ? 0 : 1;
          const bStatus = b.status?.toUpperCase() === 'ACTIVE' ? 0 : 1;
          return aStatus - bStatus;
        });

        this.ownerOption = allUsers;

        const currentUserId = localStorage.getItem("userId");
        if (currentUserId && !this.formData.owner) {
          const defaultOwner = allUsers.find(user => user.ROWID === currentUserId);
          if (defaultOwner) {
            this.formData.owner = defaultOwner;
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    customLabel(option) {
      return option?.firstName || 'Unknown';
    },
    getStatusColor(status) {
      const s = status?.toUpperCase();
      if (s === 'ACTIVE') return 'status-green';
      if (s === 'DISABLED') return 'status-red';
      if (s === 'CLOSED') return 'status-gray';
      return 'status-yellow';
    }

  },
};
</script>

<style scoped>
.marginRight {
  margin-right: 20px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.modal-header {
  margin-bottom: 20px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.status-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 6px;
}

.status-green {
  background-color: #91D28D;
}

.status-red {
  background-color: #F44336;
}

.status-gray {
  background-color: #BDBDBD;
}

.status-yellow {
  background-color: #FFEB3B;
}

.multiselect__content-wrapper {
  max-height: 240px;
  overflow-y: auto;
  padding: 4px 0;
}

.multiselect {
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.multiselect__single {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  min-height: 40px;
}

.multiselect__option--highlight {
  background: #2c3e50 !important;
  color: white;
}

.multiselect__option--selected {
  font-weight: bold;
  background-color: #2c3e50 !important;
  color: #fff;
}

.multiselect__option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  min-height: 40px;
  font-size: 14px;
}

.form-footer {
  position: sticky;
  bottom: 0;
  background: white;
  padding: 16px 0;
  text-align: center;
  border-top: 1px solid #ccc;
  z-index: 10;
}

.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f7f8fa;
}

.form-wrapper {
  flex: 1;
  padding-bottom: 0;
  /* remove any extra padding */
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #ffffff;
  padding: 16px 0;
  text-align: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  z-index: 100;
}
</style>
