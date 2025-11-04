<template>
  <div class="container-fluid py-5">
    <div class="row">
      <div class="col-12">
        <div class="multisteps-form">
          <div class="row">
            <div class="col-12 col-lg-12 mx-auto mb-4">
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
        <form class="mb-8 multisteps-form__form" name="productForm">
          <div
            class="p-3 bg-white card multisteps-form__panel border-radius-xl js-active position-relative"
            data-animation="FadeIn"
          >
            <h5 class="font-weight-bolder">Offering Information</h5>
            <div class="multisteps-form__content">
              <div class="col-12 row">
                <div class="col-6 col-sm-6 mt-3 mt-sm-0">
                  <label>Contact Owner</label>
                  <div
                    class="choices"
                    data-type="select-one"
                    tabindex="0"
                    role="listbox"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div class="select-box">
                      <select
                        required
                        v-model="formData.offeringOwner"
                        id="choices-state"
                        class="multisteps-form__select form-control choices__input"
                        name="choices-state"
                        tabindex="-1"
                        data-choice="active"
                      >
                        <option value="">Select</option>
                        <option
                          v-for="(userData, index) in contactOwnerOptions"
                          :key="index"
                          :value="userData.ROWID"
                        >
                          {{ userData.firstName }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 mt-sm-0">
                  <label>Offering Name</label>
                  <input
                    v-model="formData.offeringName"
                    class="multisteps-form__input form-control"
                    type="text"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-6 col-sm-6 mt-3">
                  <label>Offering Category</label>
                  <div
                    class="choices"
                    data-type="select-one"
                    tabindex="0"
                    role="listbox"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div class="select-box">
                      <select
                        v-model="formData.offeringCategory"
                        required
                        id="choices-state"
                        class="multisteps-form__select form-control choices__input"
                        name="choices-state"
                        tabindex="-1"
                        data-choice="active"
                      >
                        <option
                          v-for="(option, index) in insuranceOptions"
                          :key="index"
                          :value="option"
                        >
                          {{ option }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="mt-4 col-sm-6 mt-sm-0">
                  <label class="mt-4">Cancellation Charge Type</label>
                  <select
                    v-model="formData.cancellationChargeType"
                    id="choices-sizes"
                    class="form-control"
                    name="choices-sizes"
                  >
                    <option value="">Select</option>
                    <option value="Day Wise">Day Wise</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>

                <div class="col-12 col-sm-6 mt-4">
                  <div class="form-check checkbox-lg">
                    <input
                      v-model="formData.offeringActive"
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="checkbox-20"
                    />
                    <label class="form-check-label" for="checkbox-20"
                      >Offering Active</label
                    >
                  </div>
                </div>
              </div>
              <div class="button-row d-flex justify-content-center mt-2 gap-4">
                <button
                  class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next"
                  type="button"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <div
            class="p-3 bg-white card multisteps-form__panel border-radius-xl"
            data-animation="FadeIn"
          >
            <h5 class="font-weight-bolder">Offering Information</h5>
            <div class="multisteps-form__content">
              <div class="mt-3 row">
                <div class="mt-3 col-4">
                  <label>Insurance Partner Name</label>
                  <input
                    v-model="formData.insurancePartnerName"
                    class="multisteps-form__input form-control"
                    type="text"
                  />
                </div>
                <div class="mt-3 col-4">
                  <label>Product FYC %</label>
                  <div class="form-group multisteps-form__input">
                    <div class="">
                      <!----><input
                        v-model="formData.productFYCPercent"
                        type="text"
                        class="form-control form-control-default"
                        placeholder=""
                        isrequired="false"
                      /><!---->
                    </div>
                  </div>
                </div>
                <div class="mt-3 col-4">
                  <label>Corporate Bonus %</label>
                  <div class="form-group multisteps-form__input">
                    <div class="">
                      <!----><input
                        v-model="formData.corporateBonusPercent"
                        type="text"
                        class="form-control form-control-default"
                        isrequired="false"
                      /><!---->
                    </div>
                  </div>
                </div>
                <div class="mt-3 col-4">
                  <label class="mt-4">Insurance Partner Name</label>
                  <select
                    v-model="formData.offeringCategory"
                    id="choices-category"
                    class="form-control"
                    name="choices-category"
                  >
                    <option value="">Select</option>
                    <option value="Partner 1">Partner 1</option>
                    <option value="Partner 2">Partner 2</option>
                    <option value="Partner 3">Partner 3</option>
                    <option value="Partner 4">Partner 4</option>
                    <option value="Partner 5">Partner 5</option>
                    <option value="Partner 6">Partner 6</option>
                  </select>
                </div>
                <div class="mt-3 col-4">
                  <label class="mt-4">Offering Type</label>
                  <select
                    v-model="formData.offeringType"
                    id="choices-sizes"
                    class="form-control"
                    name="choices-sizes"
                  >
                    <option value="">Select</option>
                    <option value="Team Life">Team Life</option>
                    <option value="Term Universal Life">
                      Term Universal Life
                    </option>
                    <option value="Permananent Universal LIfe">
                      Permananent Universal LIfe
                    </option>
                    <option value="Whole Life">Whole Life</option>
                    <option value="Participating Whole Life">
                      Participating Whole Life
                    </option>
                    <option value="Non Medical">Non Medical</option>
                    <option value="Travel">Travel</option>
                    <option value="Super Visa">Super Visa</option>
                    <option value="Health & Dental">Health & Dental</option>
                    <option value="Critical Illness">Critical Illness</option>
                    <option value="Disability-Accidental">
                      Disability-Accidental
                    </option>
                    <option value="Disability-illness">
                      Disability-illness
                    </option>
                    <option value="Visitor">Visitor</option>
                    <option value="Business Insurance">
                      Business Insurance
                    </option>
                    <option value="Mutual Funds">Mutual Funds</option>
                    <option value="TFSA">TFSA</option>
                    <option value="Combination Of Hybrid Insurance">
                      Combination Of Hybrid Insurance
                    </option>
                    <option value="Seg Funds">Seg Funds</option>
                    <option value="Annuities">Annuities</option>
                    <option value="RRSP">RRSP</option>
                    <option value="RESP">RESP</option>
                    <option value="GIC">GIC</option>
                    <option value="Saving Account">Saving Account</option>
                    <option value="Pension Account">Pension Account</option>
                    <option value="Pension Plan ">Pension Plan</option>
                    <option value="RIF">RIF</option>
                    <option value="GIA">GIA</option>
                    <option value="Permanent/T100">Permanent/T100</option>
                    <option value="Hospital Expenses">Hospital Expenses</option>
                    <option value="Accidental Benefits">
                      Accidental Benefits
                    </option>
                    <option value="Rent Insurance">Rent Insurance</option>
                    <option value="Mortage Insurance">Mortage Insurance</option>
                    <option value="Loan Protection">Loan Protection</option>
                    <option value="Credit Protection">Credit Protection</option>
                    <option value="Group Life">Group Life</option>
                    <option value="Group Disability">Group Disability</option>
                    <option value="Group Accidental Benefits">
                      Group Accidental Benefits
                    </option>
                    <option value="Group Health & Dental">
                      Group Health & Dental
                    </option>
                    <option value="Group Health & Dental">
                      Group Health & Dental
                    </option>
                    <option value="Group travel">Group travel</option>
                    <option value="Group Eye Care">Group Eye Care</option>
                    <option value="Group Critical Illness">
                      Group Critical Illness
                    </option>
                    <option value="Group Flexible Plan">
                      Group Flexible Plan
                    </option>
                    <option value="International Student">
                      International Student
                    </option>
                    <option value="Not Found">Not Found</option>
                  </select>
                </div>
              </div>
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
          </div>
          <div
            class="p-3 bg-white card multisteps-form__panel border-radius-xl"
            data-animation="FadeIn"
          >
            <h5 class="font-weight-bolder">Description Information</h5>
            <div class="mt-3 multisteps-form__content">
              <div class="col-sm-12">
                <label class="mt-4">Description</label>
                <p class="text-xs form-text text-muted ms-1 d-inline">
                  (optional)
                </p>
                <textarea
                  v-model="formData.description"
                  class="form-control"
                  id="description"
                  rows="4"
                ></textarea>
              </div>

              <div class="button-row d-flex justify-content-center mt-2 gap-4">
                <button
                  class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev"
                  type="button"
                >
                  Prev
                </button>
                <button
                 v-if="!id"
                 @click.prevent="handleSubmitForm"
                  class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next"
                  type="button"
                >
                  submit
                </button>
                <button
                v-else
                @click.prevent="handleUpdateForm"
                  class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next"
                  type="button"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <Loader :loading="isLoading"></Loader>
</template>
<style>
.multisteps-form__panel {
  position: relative !important;
  display: none !important;
  transition: padding 0.3s ease;
  /* Add transition for smoother padding change */
  padding-bottom: 0;
  /* Initially set padding bottom to 0 */
}

.multisteps-form__panel.js-active {
  display: block !important;
}

.select-box select {
  display: content !important;
  border: 1px solid #e0e3e7 !important;
  border-radius: 10px;
}
</style>
<!-- JavaScript code for stepper functionality -->
<script>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import Swal from "sweetalert2";
import { putUrl } from "../../boot/axios";
import Loader from "./Loader.vue";
import router from "../../router/index.js";
export default {
  components: {
    Loader,
  },
  props: ["id"],
  setup(props) {
    let isLoading = ref(false);
    const formData = reactive({
      offeringOwner: "",
      offeringCategory: "",
      offeringType: "",
      description: "",
      productFYCPercent: "",
      corporateBonusPercent: "",
      cancellationChargeType: "",
      offeringName: "",
      insurancePartnerName: "",
      offeringActive: "",
    });
    let contactOwnerOptions = ref([]);
    const handleSubmitForm = async () => {
      console.log(props.id);
      try {
        const response = await axios
          .put(`${putUrl}ProductFunction/createoffering`, {
            offeringOwner: formData.offeringOwner,
            offeringCategory: formData.offeringCategory,
            offeringType: formData.offeringType,
            description: formData.description,
            productFYCPercent: formData.productFYCPercent,
            corporateBonusPercent: formData.corporateBonusPercent,
            cancellationChargeType: formData.cancellationChargeType,
            offeringName: formData.offeringName,
            insurancePartnerName: formData.insurancePartnerName,
            offeringActive: formData.offeringActive,
          })
          .then((res) => {
            Swal.fire({
              title: "<strong>Offering Created Successfully</strong>",
              icon: "success",
           
            }).then(()=>{
              router.push("/offering-list")
            })
            
            console.log(res.data);
          })
          .catch((err) => {
            Swal.fire({
              title: "<strong>Error While Creating Offerings</strong>",
              icon: "error",
              timer: 2000,
            }).then(()=>{
              router.push("/offering-list")
            })
            
            console.log(err);
          });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const handleUpdateForm = async () => {
      console.log(formData);
      const res = await axios
        .post(`${putUrl}productFunction/updateproduct/${props.id}`, formData)
        .then(() => {
          Swal.fire({
            title: "<strong>Offering Updated Successfully</strong>",
            icon: "success",
            timer: 2000,
          }).then(()=>{
            router.push("/offering-list")
          })
       
        });
      console.log(res);
    };

    onMounted(() => {
      const progressButtons = document.querySelectorAll(
        ".multisteps-form__progress-btn"
      );
      const formPanels = document.querySelectorAll(".multisteps-form__panel");

      let currentStep = 0;

      const updateProgress = () => {
        progressButtons.forEach((button, index) => {
          button.classList.toggle("js-active", index <= currentStep);
        });
      };

      const goToStep = (stepIndex) => {
        if (stepIndex >= 0 && stepIndex < formPanels.length) {
          formPanels[currentStep].classList.remove("js-active");
          currentStep = stepIndex;
          formPanels[currentStep].classList.add("js-active");
          updateProgress();
          adjustFormPanelPadding();
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

      const getallusers = async () => {
        const response = await axios.get(`${putUrl}contact/getusers/`);
        console.log(response.data);
        contactOwnerOptions.value = response.data.map((item) => item.userData);
        console.log("final array ", contactOwnerOptions);
      };

      if (props.id) {
        const getoffering = async () => {
          isLoading.value = true;
          const res = await axios.get(
            `${putUrl}productFunction/getsingleproduct/${props.id}`
          );
          isLoading.value = false;
          console.log("This is the array ", res.data[0].offering);

          Object.assign(formData, res.data[0].offering);
        };
        getoffering();
      }

      getallusers();

      updateProgress();
      adjustFormPanelPadding();
    });
    const insuranceOptions = [
      "-None-",
      "Life Insurance",
      "Living Benefits",
      "Health & Dental Insurance",
      "Travel Insurance",
      "Investments",
      "Hybrid Insurance",
      "Loan Protection",
      "Group Insurance",
    ];

    return {
      insuranceOptions,
      handleUpdateForm,
      contactOwnerOptions,
      handleSubmitForm,
      formData,
      isLoading,
    };
  },
};
</script>
