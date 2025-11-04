<template>
  <div class="container-fluid ps-0 pe-2">
    <div class="row">
      <div class="col-12">
        <div class="multisteps-form">
          <div class="row">
            <div class="col-12 mx-auto mb-2">
              <div class="card">
                <div class="card-body">
                  <div class="multisteps-form__progress">
                    <button
                      class="multisteps-form__progress-btn js-active position-relative"
                      type="button"
                      title="Step 1"
                    >
                      <span>Step 1</span>
                    </button>
                    <button
                      class="multisteps-form__progress-btn"
                      type="button"
                      title="Step 2"
                    >
                      Step 2
                    </button>
                    <button
                      class="multisteps-form__progress-btn"
                      type="button"
                      title="Step 3"
                    >
                      Step 3
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-lg-12 m-auto">
        <!-- Froms -->
        <form class="multisteps-form_from">
          <div
            class="card multisteps-form__panel p-3 border-radius-xl bg-white js-active position-relative"
            data-animation="FadeIn"
          >
            <Loader :loading="isLoading"></Loader>
            <!-- <h5 class="main-heading mb-0">Create Referral</h5> -->
            <h5 class="main-heading mb-0">Referral informations</h5>
            <div class="multisteps-form__content">
              <div class="row mt-1">
                <div class="col-lg-4 col-sm-6">
                  <label class="my-0 mt-2"
                    >First Name
                    <span class="text-danger input-error-font-size"
                      >*</span
                    ></label
                  >
                  <div class="form-group multisteps-form__input mb-0">
                    <div class="">
                      <input
                        :class="{ highlight: errors.firstName }"
                        v-model="formData.firstName"
                        id="firstName"
                        type="text"
                        class="form-control form-control-default"
                        placeholder="First Name"
                        isrequired="false"
                        autocomplete="off"
                      />
                      <span
                        v-if="errors.firstName"
                        class="error input-error-font-size"
                        >{{ errors.firstName }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-sm-6 mt-3 mt-sm-0">
                  <label class="my-0 mt-2"
                    >Referred By
                    </label
                  >
                  <div class="form-group multisteps-form__input mb-0">
                    <div class="">
                      <input
                        :class="{ highlight: errors.referredBy }"
                        v-model="formData.referredBy"
                        id="referredBy"
                        type="text"
                        class="form-control form-control-default"
                        placeholder="Referred By"
                        isrequired="false"
                        autocomplete="off"
                      />
                      <span
                        v-if="errors.referredBy"
                        class="error input-error-font-size"
                        >{{ errors.referredBy }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                  <label class="my-0 mt-2"
                    >Email<span class="text-danger input-error-font-size"
                      >*</span
                    ></label
                  >
                  <div class="form-group multisteps-form__input mb-1">
                    <div class="">
                      <input
                        :class="{ highlight: errors.email }"
                        v-model="formData.email"
                        id="referralname"
                        type="text"
                        class="form-control form-control-default"
                        placeholder="Email"
                        isrequired="false"
                        autocomplete="off"
                      />
                      <span
                        v-if="errors.email"
                        class="error input-error-font-size"
                        >{{ errors.email }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mt-1">
                <div class="col-lg-4 col-sm-6 mt-3 mt-sm-0">
                  <label class="my-0 mt-2">Cell </label>
                  <div class="form-group multisteps-form__input mb-0">
                    <div class="">
                      <input
                        v-model="formData.phone"
                        id="phone"
                        type="text"
                        class="form-control form-control-default"
                        placeholder="call"
                        isrequired="false"
                        autocomplete="off"
                      />
                      <span
                        v-if="errors.phone"
                        class="error input-error-font-size"
                        >{{ errors.phone }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                  <label class="my-0 mt-2"
                    >Referral Owner
                    <span class="text-danger input-error-font-size"
                      >*</span
                    ></label
                  >
                  <div class="form-group multisteps-form__input mb-0">
                    <div
                      class="select-box"
                      :class="{ highlight: errors.referralOwner }"
                    >
                      <select
                        v-model="formData.referralOwner"
                        @click.prevent="getRefUsers"
                        id="choices-state"
                        class="multisteps-form__select form-control choices__input mb-0"
                        name="choices-state"
                        tabindex="-1"
                        data-choice="active"
                      >
                        <option
                          v-for="option in referralOwnerOption"
                          :key="option.ROWID"
                          :value="option.ROWID"
                        >
                          {{
                            (option.firstName ? option.firstName + " " : "") +
                            (option.lastName ? option.lastName : "")
                          }}
                        </option>
                      </select>
                    </div>
                    <span
                      v-if="errors.referralOwner"
                      class="error input-error-font-size"
                      >{{ errors.referralOwner }}</span
                    >
                  </div>
                </div>
                <div class="col-lg-4 col-sm-6 mt-sm-0">
                  <label class="my-0 mt-2">Currency</label>
                  <div class="form-group multisteps-form__input mb-0">
                    <div class="">
                      <input
                        v-model="formData.currency"
                        id="currency"
                        type="txt"
                        class="form-control form-control-default"
                        placeholder="Currency"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-4 col-sm-6 mt-sm-0">
                  <label class="my-0 mt-2">Exchange Rate</label>
                  <div class="form-group multisteps-form__input mb-0">
                    <div class="">
                      <input
                        v-model="formData.exchangeRate"
                        id="ExchangeRate"
                        type="number"
                        class="form-control form-control-default"
                        placeholder="Exchange Rage"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-12 col-sm-6 mt-4">
                    <div class="form-check checkbox-lg">
                      <input
                        v-model="formData.EmailOptOut"
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="checkbox-20"
                      />
                      <label  class="form-check-label my-0" for="checkbox-20"
                        >Email Opt Out</label
                      >
                    </div>
                  </div> 
              </div>
              <div class="row">           

              </div>
              <div class="button-row d-flex justify-content-center mt-2">
                <button
                  class="btn mb-0 bg-gradient-dark btn-md null null mb-0 js-btn-next"
                  type="button"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <!-- 2nd form -->
          <div
            class="card multisteps-form__panel p-3 border-radius-xl bg-white"
            data-animation="FadeIn"
          >
            <h5 class="main-heading mb-0 mt-4">Referral Scoreboard</h5>
            <div style="width: 100%; overflow: scroll">
              <table class="table border table-responsive">
                <thead class="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Actions</th>
                    <th>Referral Level</th>
                    <th>Referrals till Date - Life</th>
                    <th>Referrals till Date - Living Benefits</th>
                    <th>Referrals till Date - Travel</th>
                    <th>Referrals till Date - Health & Dental</th>
                    <th>Referral Payout till Date - Life</th>
                    <th>Referral Payout till Date - Living Benefits</th>
                    <th>Referral Payout till Date - Travel</th>
                    <th>Referral Payout till Date - Health & Dental</th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">
                  <tr
                    v-for="(
                      parent, index
                    ) in formData.numberOfReferralScoreGridData"
                    :key="index"
                  >
                    <td class="m-auto">{{ index + 1 }}</td>
                    <td>
                      <a
                        @click.prevent="
                          deleteReferralCardRow(index, parent.ROWID)
                        "
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                        ><i
                          class="fas fa-trash text-secondary"
                          aria-hidden="true"
                        ></i
                      ></a>
                    </td>
                    <td>
                <input v-model="parent.ReferralLevel" type="text" class="form-control form-control-default" autocomplete="off">
              </td>
              <td>
                <input v-model="parent.ReferraltilldateLife" type="date" class="form-control form-control-default" autocomplete="off">
              </td>
              <td>
                <input v-model="parent.ReferralstillDateLivingBenefits" type="date" class="form-control form-control-default" autocomplete="off">
              </td>
              <td>
                <input v-model="parent.ReferralstillDateTravel" type="date" class="form-control form-control-default" autocomplete="off">
              </td>
              <td>
                <input v-model="parent.ReferralstillDateHealthDental" type="date" class="form-control form-control-default" autocomplete="off">
              </td>
              <td>
                <input v-model="parent.ReferralPayouttillDateLife" type="date" class="form-control form-control-default" autocomplete="off">
              </td>
              <td>
                <input v-model="parent.ReferralPayouttillDateLivingBenefits" type="date" class="form-control form-control-default" autocomplete="off">
              </td>
              <td>
                <input v-model="parent.ReferralPayouttillTravel" type="date" class="form-control form-control-default" autocomplete="off">
              </td>
              <td>
                <input v-model="parent.ReferralPayouttillDateHealthDental" type="date" class="form-control form-control-default" autocomplete="off" >
              </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              class="btn mb-0 bg-gradient-dark btn-md null null"
              type="button"
              @click.prevent="addRowToReferralScoreCard"
            >
              Add Row
            </button>
            <div class="button-row d-flex justify-content-center mt-2 gap-4">
              <button
                class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev"
                type="button"
              >
                Prev
              </button>
              <button
                class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next"
                type="button"
              >
                Next
              </button>
            </div>
          </div>
          <!-- 3rd form -->
          <div
            class="card multisteps-form__panel p-3 border-radius-xl bg-white"
            data-animation="FadeIn"
          >
            <h4>Address Information</h4>
            <div class="multisteps-form__content">
              <div class="row mt-3">
                <div class="col-lg-4">
                  <label class="my-0 mt-2">Street Name</label>
                  <input
                    v-model="formData.street"
                    class="multisteps-form__input form-control"
                    type="text"
                    placeholder="Street Name"
                  />
                </div>
                <div class="col-lg-4">
                  <label class="my-0 mt-2">Postal Code</label>
                  <input
                    v-model="formData.postalCode"
                    class="multisteps-form__input form-control"
                    type="number"
                    placeholder="postalCode"
                  />
                </div>
                <div class="col-lg-4 mt-1">
                  <label class="my-0 mt-2">House or Apt Number</label>
                  <input
                    v-model="formData.houseNumber"
                    class="multisteps-form__input form-control"
                    type="number"
                    placeholder="House or Apt Number"
                  />
                </div>
                <div class="col-lg-4 mt-1">
                  <label class="my-0 mt-2">Province</label>
                  <input
                    v-model="formData.province"
                    class="multisteps-form__input form-control"
                    type="text"
                    placeholder="Province"
                  />
                </div>
                <div class="col-lg-4 mt-1">
                  <label class="my-0 mt-2"
                    >City <span class="text-danger">*</span>
                  </label>
                  <input
                    :class="{ highlight: errors.city }"
                    v-model="formData.city"
                    class="multisteps-form__input form-control"
                    type="text"
                    placeholder="City"
                  />
                  <span
                    v-if="errors.referralPayout"
                    class="error input-error-font-size"
                    >{{ errors.referralPayout }}</span
                  >
                </div>
                <div class="col-lg-4 mt-1">
                  <label class="my-0 mt-2"
                    >Country <span class="text-danger">*</span>
                  </label>
                  <input
                    :class="{ highlight: errors.Country }"
                    v-model="formData.Country"
                    class="multisteps-form__input form-control"
                    type="text"
                    placeholder="Country"
                  />
                  <span
                    v-if="errors.Country"
                    class="error input-error-font-size"
                    >{{ errors.Country }}</span
                  >
                </div>
              </div>
              <!-- <div class="button-row d-flex mt-4">
                    <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" type="button">Prev</button>
                    <button class="btn mb-0 bg-gradient-dark btn-md null null ms-auto js-btn-next" type="button">Next</button>
                </div> -->
              <div class="button-row d-flex justify-content-center mt-4 gap-4 space">
                <button
                  class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev"
                  type="button"
                >
                  Prev
                </button>
                <button
                  v-if="!id"
                  type="submit"
                  @click.prevent="handleSubmitForm"
                  class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next"
                >
                  Submit
                </button>
                <button
                v-if="id"
                  @click.prevent="handleUpdateForm"
                  type="submit"
                  class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          <!-- 4 form -->
        </form>
      </div>
    </div>
  </div>
</template>
<style>
.multisteps-form__panel {
  position: relative !important;
  display: none !important;
  transition: padding 0.3s ease; /* Add transition for smoother padding change */
  padding-bottom: 0; /* Initially set padding bottom to 0 */
}
.multisteps-form__panel.js-active {
  display: block !important;
}
.select-box select {
  display: content !important;
  border: 1px solid #e0e3e7 !important;
  border-radius: 10px;
}
select {
  height: 2.5rem !important;
}
.error {
  color: red;
  position: absolute;
}
.input-error-font-size {
  font-size: 12px;
}

.highlight {
  border: 1px solid red !important;
  border-radius: 10px;
}
@media screen and (max-width:500px) {
  .space{
    margin-bottom:150px;
  }
}
</style>

<!-- JavaScript code for stepper functionality -->
<script>
import { onBeforeMount, onMounted, reactive, ref, toRefs, watch } from "vue";
import axios from "axios";
// import Swal from "sweetalert2";
import { putUrl } from "../../boot/axios";
import { verifyUser } from "../../verifyUser/verifyUser.js";
import router from "../../router/index.js";
import Loader from "../utils/Loader.vue";
import {referralPayoutOptions,productCategoryOptions,referralLevelOptions,annualReferralSlabOptions} from "./utils/data.js"

export default {
  components:{
Loader
  },
  props: ["id"],


  setup(props) {
     console.log(props);
    let isLoading=ref(false);
    let currentStep = 0;
    const formData = reactive({
      referralName: "",
      lastName: "",
      EmailOptOut:"",
      phone: "",
      email: "",
      referralOwner: "",
      referredByClient: "",
      referredByOther: "",
      layout: "",
      referralLeads:"",
      exchangeRate: "",
      currency: "",
      annualReferralSlab: "",
      referredBy:"",
      leads:"",
      year: "",
      firstPolicyIssueDate: "",
      referralPayout: "",
      productCategoryReffered: "",
      client: "",
      street:"",
      Country:"",
      houseNumber:"",
      postalCode:"",
      city:"",
      province:"",
      ReferralLevel:"",
      ReferralstillDateTravel:"",
      ReferralPayouttillDateHealthDental:"",
      ReferraltilldateLife:"",
      ReferralstillDateLivingBenefits:"",
      ReferralstillDateHealthDental:"",
      ReferralPayouttillDateLivingBenefits:"",
      ReferralPayouttillTravel:"",
      ReferralPayouttillDateLife:"",
      numberOfReferralScoreGrid: 0,
      numberOfReferralScoreGridData: [],
      newReferralScoreGridData: [],
      deletedReferralScoreGridData: [],
    });
    const errors=reactive({
      referralName: "",
      referralOwner: "",
      referredByClient: "",
      referralPayout:"",
      referredByOther: "",
      referralLeads:""

    });

    const formValidation=()=>{
      // if(currentStep==0){
      //   if(formData.referralName==""){
      //     errors.referralName="required";
      //   }
      //   else{
      //     errors.referralName="";
      //   }
      //   if(formData.lastName==""){
      //     errors.lastName="required";
      //   }
      //   else{
      //     errors.lastName="";
      //   }
      //   if(formData.email==""){
      //     errors.email="required";
      //   }
      //   else{
      //     errors.email="";
      //   }
      //   if(formData.referralOwner==""){
      //     errors.referralOwner="required";
      //   }
      //   else{
      //     errors.referralOwner="";
      //   }
      //   if(formData.referredByClient==""){
      //     errors.referredByClient="required";
      //   }
      //   else{
      //     errors.referredByClient="";
      //   }
      //   if(formData.referredByOther==""){
      //     errors.referredByOther="required";
      //   }
      //   else{
      //     errors.referredByOther="";
      //   }
      // }else if (currentStep==2){
      //   if(formData.referralPayout==""){
      //     errors.referralPayout="required";
      //   }
      //   else{
      //     if(isNumeric(formData.referralPayout)){
      //       errors.referralPayout="";
      //     }
      //     else{
      //       errors.referralPayout="Please enter a valid payout";
      //     }
      //   }
      // }
    }
    const hasErrors = () => {
      return Object.values(errors).some((error) => error);
    };

//     function isNumeric(s) {
//   return /^[0-9]+$/.test(s);
// }
    const formDataRefs = toRefs(formData);

  
    
    const handleSubmitForm=async ()=>{
      isLoading.value = true;
      const requestData = {};


      for (const key in formDataRefs) {
        if (Array.isArray(formDataRefs[key].value)) {
          // If the property is an array, convert it to an array of objects
          requestData[key] = formDataRefs[key].value.map((item) => ({
            ...item,
          }));
        } else {
          // Otherwise, directly assign the value
          requestData[key] = formDataRefs[key].value;
        }
      }
      console.log("this is formData before submit", requestData);
          await axios.put(
            `${putUrl}referralFunction/createreferral`,
            {
              name: formData.referralName,
              email: formData.email,
              phone: formData.phone,
              lastName: formData.lastName,
              referralOwner: formData.referralOwner,
              referredByClient: formData.referredByClient,
              referredByOther: formData.referredByOther,
              layout: formData.layout,
              exchangeRate: formData.exchangeRate,
              currency: formData.currency,
              annualReferralSlab: formData.annualReferralSlab,
              referralLevel: formData.referralLevel,
              year: formData.year,
              date: formData.firstPolicyIssueDate,
              client: formData.client,
              referralPayout: formData.referralPayout,
              productCategoryReffered: formData.productCategoryReffered,
              numberOfReferralScoreGridData: formData.numberOfReferralScoreGridData,
            }
          );
          isLoading.value = false;
          }
    const handleUpdateForm=async ()=>{
      const requestData = {};

       isLoading.value=true;
      for (const key in formDataRefs) {
        if (Array.isArray(formDataRefs[key].value)) {
          // If the property is an array, convert it to an array of objects
          requestData[key] = formDataRefs[key].value.map((item) => ({
            ...item,
          }));
        } else {
          // Otherwise, directly assign the value
          requestData[key] = formDataRefs[key].value;
        }
      }

     await axios.post(
            `${putUrl}referralFunction/update-referral/${props?.id}`,
            {
              name: formData.referralName,
              email: formData.email,
              phone: formData.phone,
              lastName: formData.lastName,
              referralOwner: formData.referralOwner,
              referredByClient: formData.referredByClient,
              referredByOther: formData.referredByOther,
              layout: formData.layout,
              exchangeRate: formData.exchangeRate,
              currency: formData.currency,
              annualReferralSlab: formData.annualReferralSlab,
              referralLevel: formData.referralLevel,
              year: formData.year,
              date: formData.firstPolicyIssueDate,
              client: formData.client,
              referralPayout: formData.referralPayout,
              productCategoryReffered: formData.productCategoryReffered,
              numberOfReferralScoreGridData: formData.numberOfReferralScoreGridData,
              newReferralScoreGridData: formData.newReferralScoreGridData,
              deletedReferralScoreGridData: formData.deletedReferralScoreGridData,
            }
      );
      isLoading.value=false;
          
    }

    const getRefferalData = async () => {
        isLoading.value = true;
        await axios
        .get(`${putUrl}referralFunction/getsinglereferral/${props.id}`)
        .then((response) => {
           Object.assign(formData,response.data.mainFormData);
           Object.assign(formData.numberOfReferralScoreGridData,response.data.subReferralFormData);
           isLoading.value = false;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
       
    };


    const getAllUsers = async () => {
      try {
        const response = await axios.get(`${putUrl}referralFunction/getusers`);
        const { usersData, contactsData } = response.data;
        referralOwnerOption.value = usersData.map((item) => item);
        referralByOthersOption.value = contactsData.map((item) => item);
        referralByClientOption.value = contactsData.map((item) => item);
        // console.log("ref conatact=>",referralByOthersOption.value);
      } catch (error) {
        console.error("Error fetching referral users:", error);
      }
    };





    onBeforeMount(async () => {
      const verify = await verifyUser();
      if (!verify) {
        router.push("/signin");
      }
    });
    onMounted(() => {

      if(props.id){
        getRefferalData();
      }
   
      const progressButtons = document.querySelectorAll(
        ".multisteps-form__progress-btn"
      );
      const formPanels = document.querySelectorAll(".multisteps-form__panel");


      const updateProgress = () => {
        progressButtons.forEach((button, index) => {
          button.classList.toggle("js-active", index <= currentStep);
        });
      };

      const goToStep = (stepIndex) => {
        formValidation();

      if(!hasErrors()){
        if (stepIndex >= 0 && stepIndex < formPanels.length) {
          formPanels[currentStep].classList.remove("js-active");
          currentStep = stepIndex;
          formPanels[currentStep].classList.add("js-active");
          updateProgress();
          adjustFormPanelPadding();
        }
      }
      };

      const adjustFormPanelPadding = () => {
        formPanels.forEach((panel) => {
          panel.style.paddingBottom =
            currentStep === formPanels.length - 1 ? "0" : "";
        });
      };

      const nextButtons = document.querySelectorAll(".js-btn-next");
      nextButtons.forEach((button) => {
        button.addEventListener("click", () => {
          goToStep(currentStep + 1);
        });
      });

      const prevButtons = document.querySelectorAll(".js-btn-prev");
      prevButtons.forEach((button) => {
        button.addEventListener("click", () => {
          goToStep(currentStep - 1);
        });
      });

      const progressIndicatorButtons = document.querySelectorAll(
        ".multisteps-form__progress-btn"
      );
      progressIndicatorButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
          goToStep(index);
        });
      });

      getAllUsers();
     
      updateProgress();
      adjustFormPanelPadding();
    });

    console.log("ids", `${props.id}`);
   
    let referralOwnerOption = ref([]);
    let referralByOthersOption = ref([]);
    let referralByClientOption = ref([]);
   
      const updateReferralCardData = () => {
      const count = parseInt(formData.numberOfReferralScoreGrid);
      const currentCount = formData.numberOfReferralScoreGridData.length;

      // Add new entries if the count increases
      if (count > currentCount) {
        const additionalCount = count - currentCount;
        const additionalData = Array.from({ length: additionalCount }, () => ({
          annualReferralSlab: "",
          referralLevel: "",
          productCategory: "",
          payoutCategory: "",
        }));
        formData.numberOfReferralScoreGridData = formData.numberOfReferralScoreGridData.concat(
          additionalData
        );
      if(props.id){
        formData.newReferralScoreGridData=formData.newReferralScoreGridData.concat(additionalData);
      }
      }
      // Remove entries if the count decreases
      else if (count < currentCount) {
        formData.numberOfReferralScoreGridData = formData.numberOfReferralScoreGridData.slice(
          0,
          count
        );
      }
    };

    const addRowToReferralScoreCard = () => {
      // console.log(formData.newEmergencyContactCreated);
      formData.numberOfReferralScoreGrid = formData.numberOfReferralScoreGridData.length;
      formData.numberOfReferralScoreGrid = formData.numberOfReferralScoreGrid + 1;
      updateReferralCardData();
    };
      const deleteReferralCardRow = (i, rowID) => {
  console.log(i);
  console.log(rowID); // Log the row identifier to verify correctness

  const rowIndex = formData.numberOfReferralScoreGridData.findIndex(
    (row) => row.ROWID === rowID
  );
  if (rowIndex !== -1) {
    // Move the deleted row to deletedReferralScoreGridData
    formData.deletedReferralScoreGridData.push(
      formData.numberOfReferralScoreGridData[rowIndex]
    );

    // Delete the row from numberOfReferralScoreGridData
    formData.numberOfReferralScoreGridData.splice(rowIndex, 1);

    // Recalculate the number of rows in numberOfReferralScoreGridData
    formData.numberOfReferralScoreGridDataLength =
      formData.numberOfReferralScoreGridData.length;

    console.log(
      "This is deleted referral grid contact",
      formData.deletedReferralScoreGridData
    );
  }
      };


    watch(formData.numberOfReferralScoreGrid, updateReferralCardData);




    return {
      isLoading,
      referralPayoutOptions,
      productCategoryOptions,
      referralLevelOptions,
      annualReferralSlabOptions,
      errors,
    
      confirm: ref(false),
     
      cancelConfirmation: ref(false),
      referralOwnerOption,
      referralByClientOption,
      referralByOthersOption,



      handleSubmitForm,
      handleUpdateForm,
      formData,
      addRowToReferralScoreCard,
      deleteReferralCardRow,
    }
  }
}
</script>