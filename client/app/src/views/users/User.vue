<template>
  <div class="container-fluid pe-2 ps-0">
    <div class="row">
      <div class="col-12">
        <div class="multisteps-form">
          <div class="row">
            <div class="col-12 mx-auto mb-2">
              <div class="card">
                <div class="card-body">
                  <div class="multisteps-form__progress">
                    <button
                      class="multisteps-form__progress-btn js-active position-relative formstep-text-color"
                      type="button"
                      title="Step 1"
                    >
                      <span>Info</span>
                    </button>
                    <button
                      class="multisteps-form__progress-btn formstep-text-color"
                      type="button"
                      title="Step 2"
                    >
                      Address
                    </button>
                    <button
                      class="multisteps-form__progress-btn formstep-text-color"
                      type="button"
                      title="Step 3"
                    >
                      Social Media
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
        <form class="multisteps-form_from" @change="handleValidateForm">
          <div
            class="card multisteps-form__panel p-3 border-radius-xl bg-white js-active position-relative"
            data-animation="FadeIn"
          >
            <h5 class="font-weight-bolder mb-0">User</h5>
            <p class="mb-0 text-sm">Mandatory informations</p>
            <div class="multisteps-form__content">
              <div class="row mt-3">
                <div class="col-12 col-sm-6">
                  <label>First Name</label>
                  <div class="form-group multisteps-form__input">
                    <div class="">
                      <input
                        v-model="formData.firstName"
                        id="firstname"
                        type="text"
                        class="form-control form-control-default"
                        name=""
                        placeholder="First Name"
                        isrequired="false"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                  <label
                    >Last Name
                    <span  class="text-danger input-error-font-size"
                      >*</span
                    ></label
                  >
                  <div class="form-group multisteps-form__input">
                    <div class="">
                      <input
                      :class="{highlight:errors.lastName}"
                        v-model="formData.lastName"
                        id="lastname"
                        type="text"
                        class="form-control form-control-default"
                        name=""
                        placeholder="Last Name"
                        isrequired="true"
                      />
                    </div>
                    <span v-if="errors.lastName" class="error input-error-font-size">{{
                      errors.lastName
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-sm-6">
                  <label>Phone</label>
                  <div class="form-group multisteps-form__input">
                    <div class="">
                      <input
                        v-model="formData.phone"
                        id="Phone"
                        type="number"
                        class="form-control form-control-default"
                        name=""
                        placeholder="phone"
                        isrequired="true"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                  <label
                    >Email Address
                    <span class="text-danger input-error-font-size"
                      >*</span
                    ></label
                  >
                  <div class="form-group multisteps-form__input">
                    <div class="">
                      <input
                      :class="{highlight:errors.email}"
                    
                        v-model="formData.email"
                        id="email"
                        type="email"
                        class="form-control form-control-default"
                        name=""
                        placeholder="email"
                        isrequired="true"
                        autocomplete="off"
                      />
                    </div>
                    <span v-if="errors.email" class="error input-error-font-size">{{
                      errors.email
                    }}</span>
                  </div>
                </div>
                <div class="col-6 col-sm-6 mt-3 mt-sm-0">
                  <label
                    >Permission
                    <span class="text-danger">*</span></label
                  >
                  <div
                  :class="{highlight:errors.role}"
                  
                    class="choices"
                    data-type="select-one"
                    tabindex="0"
                    role="listbox"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div class="select-box">
                      <select
                        v-model="formData.role"
                        id="choices-state"
                        class="multisteps-form__select form-control choices__input"
                        name="choices-state"
                        tabindex="-1"
                        data-choice="active"
                      >
                        <option
                          v-for="(option, index) in userRole"
                          :key="index.ROWID"
                          :value="option.ROWID"
                        >
                          {{ option.roleName }}
                        </option>
                      </select>
                      <span v-if="errors.role" class="error input-error-font-size">{{
                        errors.role
                      }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-sm-6 mt-3 mt-sm-0">
                  <label
                    >Role
                    <span class="text-danger">*</span></label
                  >
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
                        v-model="formData.userRole"
                        id="choices-state"
                        class="multisteps-form__select form-control choices__input"
                        name="choices-state"
                        tabindex="-1"
                        data-choice="active"
                      >
                        <option
                          v-for="(option, index) in userPermission"
                          :key="index.id"
                          :value="option.id"
                        >
                          {{ option.title }}
                        </option>
                      </select>
                     
                    </div>
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
          <!-- 2nd form -->
          <div
            class="card multisteps-form__panel p-3 border-radius-xl bg-white"
            data-animation="FadeIn"
          >
            <h5 class="font-weight-bolder">Address</h5>
            <div class="multisteps-form__content">
              <div class="row mt-3">
                <div class="col">
                  <label>Address 1</label>
                  <div class="form-group multisteps-form__input">
                    <div class="">
                      <input
                        v-model="formData.address1"
                        id="address-line"
                        type="text"
                        class="form-control form-control-default"
                        name=""
                        placeholder="Address 1"
                        isrequired="false"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label>Address 2</label>
                  <div class="form-group multisteps-form__input">
                    <div class="">
                      <input
                        v-model="formData.address2"
                        id="address-line2"
                        type="text"
                        class="form-control form-control-default"
                        name=""
                        placeholder="Address 2"
                        isrequired="false"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-sm-6">
                  <label>City</label>
                  <div class="form-group multisteps-form__input">
                    <div class="">
                      <input
                        v-model="formData.city"
                        id="city"
                        type="text"
                        class="form-control form-control-default"
                        name=""
                        placeholder="City"
                        isrequired="false"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-6 col-sm-3 mt-3 mt-sm-0">
                  <label>State</label>
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
                        v-model="formData.state"
                        id="choices-state"
                        class="multisteps-form__select form-control choices__input"
                        name="choices-state"
                        tabindex="-1"
                        data-choice="active"
                      >
                        <option value="">Options</option>
                        <option value="">State 1</option>
                        <option value="">State 2</option>
                        <option value="">State 3</option>
                      </select>
                      <div class="choices__list choices__list--single">
                        <div
                          class="choices__item choices__item--selectable"
                          data-item=""
                          data-id="1"
                          data-value=""
                          data-custom-properties="null"
                          aria-selected="true"
                        ></div>
                      </div>
                    </div>
                    <div
                      class="choices__list choices__list--dropdown"
                      aria-expanded="false"
                    >
                      <div class="choices__list" role="listbox">
                        <div
                          id="choices--choices-state-item-choice-1"
                          class="choices__item choices__item--choice is-selected choices__item--selectable is-highlighted"
                          role="option"
                          data-choice=""
                          data-id="1"
                          data-value=""
                          data-select-text="Press to select"
                          data-choice-selectable=""
                          aria-selected="true"
                        ></div>

                        <div
                          id="choices--choices-state-item-choice-2"
                          class="choices__item choices__item--choice choices__item--selectable"
                          role="option"
                          data-choice=""
                          data-id="2"
                          data-value="1"
                          data-select-text="Press to select"
                          data-choice-selectable=""
                        >
                          State 1
                        </div>

                        <div
                          id="choices--choices-state-item-choice-3"
                          class="choices__item choices__item--choice choices__item--selectable"
                          role="option"
                          data-choice=""
                          data-id="3"
                          data-value="2"
                          data-select-text="Press to select"
                          data-choice-selectable=""
                        >
                          State 2
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-sm-3 mt-3 mt-sm-0">
                  <label
                    >Zip
                    <span  class="text-danger">*</span></label
                  >
                  <div class="form-group multisteps-form__input">
                    <div class="">
                      <input
                      :class="{highlight:errors.zip}"
                        v-model="formData.zip"
                        id="zipcode"
                        type="text"
                        class="form-control form-control-default"
                        name=""
                        placeholder="Zip"
                        isrequired="true"
                      />
                      <span v-if="errors.zip" class="error input-error-font-size">{{
                        errors.zip
                      }}</span>
                    </div>
                  </div>
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
          <!-- 3rd form -->
          <div
            class="card multisteps-form__panel p-3 border-radius-xl bg-white"
            data-animation="FadeIn"
          >
            <h5 class="font-weight-bolder">Socials</h5>
            <div class="multisteps-form__content">
              <div class="row mt-3">
                <div class="col-12">
                  <label>Twitter Handle</label>
                  <input
                    v-model="formData.twitterHandle"
                    class="multisteps-form__input form-control"
                    type="text"
                    placeholder="Twitter"
                  />
                </div>
                <div class="col-12 mt-3">
                  <label>Facebook Account</label>
                  <input
                    v-model="formData.facebookAccount"
                    class="multisteps-form__input form-control"
                    type="text"
                    placeholder="https://..."
                  />
                </div>
                <div class="col-12 mt-3">
                  <label>Instagram Account</label>
                  <input
                    v-model="formData.instagramAccount"
                    class="multisteps-form__input form-control"
                    type="text"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <h5 class="font-weight-bolder mt-4 mb-0">Profile</h5>
              <div class="multisteps-form__content mt-4">
                <div class="row">
                  <div class="col-12">
                    <label>Public Email</label>
                    <div class="form-group multisteps-form__input">
                      <div class="">
                        <input
                          v-model="formData.publicEmail"
                          id=""
                          type="text"
                          class="form-control form-control-default"
                          name=""
                          placeholder="Use an address you don't use frequently."
                          isrequired="false"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group multisteps-form__textarea mt-0">
                      <label for="bio">Bio </label>
                      <textarea
                        v-model="formData.bio"
                        id="bio"
                        class="form-control"
                        rows="5"
                        placeholder="Say a few words about who you are or what you're working on."
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div
                  class="button-row d-flex justify-content-center mt-2 gap-4"
                >
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
                    Submit
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
          </div>
        </form>
      </div>
    </div>
    <Loader :loading="isLoading"></Loader>
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
</style>

<!-- JavaScript code for stepper functionality -->
// Import necessary modules
<script>
import axios from "axios";
import { onBeforeMount, onMounted, reactive, ref } from "vue";
// import PopupComponent from "./components/PopupComponent.vue";
import { putUrl } from "../../boot/axios";
import { verifyUser } from "../../verifyUser/verifyUser.js";
import router from "../../router/index.js";
import Loader from "../utils/Loader.vue";
import Swal from "sweetalert2";
import { getAllUserRoles,getRoles } from "./utils/Api.js";

export default {
  props: ["id"],
  components: {
    // PopupComponent,
    Loader,
  },
  setup(props) {
    // Define reactive data
    let currentStep = 0;
    const formData = reactive({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      twitterHandle: "",
      facebookAccount: "",
      instagramAccount: "",
      publicEmail: "",
      bio: "",
      role: "",
    });
    const errors = reactive({
      lastName: "",
      email: "",
      role: "",
      zip: "",
    });

    const validateForm = () => {
      if (currentStep == 0) {
        if (formData.lastName === "") {
          errors.lastName = "required";
        } else {
          errors.lastName = "";
        }

        if (formData.email === "") {
          errors.email = "required";
        } else {
          if(validateEmail(formData.email)){
            errors.email = "";
          }
           else{
            errors.email = "invalid email";
           }
        }
        if (formData.role === "") {
          errors.role = "required";
          

        } else {
          errors.role = "";
        }
      } else if (currentStep == 1) {
        if (formData.zip === "") {
        
          errors.zip = "required";
        } else {
          if(validateZipCode(formData.zip)){
            errors.zip = "";
          }
          else{
            errors.zip = "Invalid Zip Code";
          }
          
        }
      }

      console.log(errors);
    };

    const validateZipCode=(zip)=>{
    // Regular expression to match a string of 5 digits
    var zipRegex = /^\d{6}$/;
    return zipRegex.test(zip);
}
function validateEmail(email) {
    // Regular expression for basic email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
    const hasErrors = () => {
      return Object.values(errors).some((error) => error);
    };

    let isLoading = ref(false);
    const userRole = ref([]);
    const userPermission = ref([]);
    // const popupMessage = ref("");

    // Function to submit form data
    const submitform = async () => {
      isLoading.value = true;
      console.log(formData);
      try {
        const response = await axios.put(`${putUrl}usersFunction/createuser`, {
          firstName: formData.firstName,
          email: formData.email,
          lastName: formData.lastName,
          phone: formData.phone,
          address1: formData.address1,
          address2: formData.address2,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          twitterHandle: formData.twitterHandle,
          facebookAccount: formData.facebookAccount,
          publicEmail: formData.publicEmail,
          instagramAccount: formData.instagramAccount,
          bio: formData.bio,
          role: formData.role,
          roleId: formData.roleId,
          userRole: formData.userRole,
        });
        isLoading.value = false;
        console.log(response.data);
        setTimeout(() => {
          Swal.fire({
            title: "<strong>User Created Successfully</strong>",
            icon: "success",
          });
        }, 1000);
        router.push("/userslist");
      } catch (error) {
        Swal.fire({
          title: "<strong>Error While Creating User</strong>",
          icon: "error",
        });
        console.log(error);
      }
    };

    // Function to handle form submission
    const handleSubmitForm = () => {
      submitform();
    };
    const handleUpdateForm = async () => {
      isLoading.value = true;
      const updateResponse = await axios.post(
        `${putUrl}usersFunction/updateuser/${props.id}`,
        formData
      );
      isLoading.value = false;
      console.log(updateResponse);
      Swal.fire({
        title: "<strong>User Updated Successfully</strong>",
        icon: "success",
        timer: 1000,
      });
      setTimeout(() => {
        router.push("/userslist");
      }, 2000);
    };
    // set users Options Data
    const setUsersRoleData= async ()=>{
      console.log("thiis is inside set users");
      const userOptions=await getAllUserRoles();
      userRole.value=userOptions;
      // userRole.value=userOptions.map((item)=>item.roleName);
      // console.log("user Role Data ", userRole.value);
      // console.log(userOptions);
     }

     const setUsersRole = async () => {
      const roledetails = await getRoles();
      let roleOptions;
      try {
        roleOptions = JSON.parse(roledetails[0]?.roleDetails || "[]");
      } catch (error) {
        console.error("Error parsing roleDetails:", error.message);
        return;
      }
      if (!Array.isArray(roleOptions)) {
        console.error("Invalid roleOptions data:", roleOptions);
        return;
      }
      const extractRoles = (rolesArray) => {
        let roles = [];
        const traverse = (node) => {
          roles.push({ title: node.title, id: node.id });
          if (node.children && node.children.length > 0) {
            node.children.forEach(traverse);
          }
        };
        //************ Start traversal from each top-level node ***************
        rolesArray.forEach(traverse);
        return roles;
      };
      const userPermissionOption = extractRoles(roleOptions);
      console.log("<======= Extracted User Role Data =========>", userPermissionOption);
      // Example: Assign this data to a state or use it for a dropdown
      userPermission.value = userPermissionOption;
    };
    onBeforeMount(async () => {
      const verify = await verifyUser();
      if (!verify) {
        router.push("/signin");
      }
    });
    // Function to set up stepper functionality
    onMounted(() => {
  
      setUsersRole();
      setUsersRoleData();
      const progressButtons = document.querySelectorAll(
        ".multisteps-form__progress-btn"
      );
      const formPanels = document.querySelectorAll(".multisteps-form__panel");

      // Function to update the progress indicators
      const updateProgress = () => {
        progressButtons.forEach((button, index) => {
          button.classList.toggle("js-active", index <= currentStep);
        });
      };

      // Function to navigate to a specific step
      const goToStep = (stepIndex) => {
        validateForm();
        if (!hasErrors()) {
          if (stepIndex >= 0 && stepIndex < formPanels.length) {
            formPanels[currentStep].classList.remove("js-active");
            currentStep = stepIndex;
            formPanels[currentStep].classList.add("js-active");
            updateProgress();
            adjustFormPanelPadding();
          }
        }
      };

      // Function to adjust the padding of the form panels
      const adjustFormPanelPadding = () => {
        formPanels.forEach((panel) => {
          panel.style.paddingBottom =
            currentStep === formPanels.length - 1 ? "0" : "";
        });
      };

      // Event listeners for next and previous buttons
      const nextButtons = document.querySelectorAll(".js-btn-next");
      nextButtons.forEach((button) => {
        button.addEventListener("click", () => goToStep(currentStep + 1));
      });

      const prevButtons = document.querySelectorAll(".js-btn-prev");
      prevButtons.forEach((button) => {
        button.addEventListener("click", () => goToStep(currentStep - 1));
      });

      const getAllStates = async () => {
        // const states = await axios.get(
        //   "https://countriesnow.space/api/v0.1/countries/population/cities"
        // );
        // console.log(states.data);

        if (props.id) {
          isLoading.value = true;
          const response = await axios.get(
            `${putUrl}usersFunction/getsingleuser/${props.id}`
          );
          isLoading.value = false;
          console.log(response.data.data[0].userData);

          Object.assign(formData, response.data.data[0].userData);
        }
      };
      getAllStates();

      // Event listeners for progress buttons to go to specific steps
      progressButtons.forEach((button, index) => {
        button.addEventListener("click", () => goToStep(index));
      });

      // Call updateProgress initially to set the progress indicators
      updateProgress();
      // Adjust form panel padding initially
      adjustFormPanelPadding();
    });

    return {
      isLoading,
      handleUpdateForm,
      userRole,
      userPermission,
      formData,
      handleSubmitForm,
      errors,
    };
  },

};
</script>
