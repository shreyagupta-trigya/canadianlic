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
              <h5 class="font-weight-bolder mb-0">Ticket</h5>
             
              <div class="multisteps-form__content">
                <div class="row mt-3">
                <div class="col-12 col-sm-6">
                  <label>Subject</label>
                  <div class="form-group multisteps-form__input">
                    <div class="">
                      <input
                        v-model="formData.subject"
                        id="firstname"
                        type="text"
                        class="form-control form-control-default"
                        name=""
                        isrequired="false"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                  <label>Reference Number</label>
                  <div class="form-group multisteps-form__input">
                    <div class="">
                      <input
                        v-model="formData.referenceNumber"
                        id="lastname"
                        type="text"
                        class="form-control form-control-default"
                        name=""
                        isrequired="false"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6 col-sm-6 mt-3 mt-sm-0">
                  <label>Category</label>
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
                        v-model="formData.category"
                        id="choices-state"
                        class="multisteps-form__select form-control choices__input"
                        name="choices-state"
                        tabindex="-1"
                        data-choice="active"
                      >
                        <option
                          v-for="(option, index) in userRole"
                          :key="index"
                          :value="option"
                        >
                          {{ option }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="col-6 col-sm-6 mt-3 mt-sm-0">
                  <label>Status</label>
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
                        v-model="formData.status"
                        id="choices-state"
                        class="multisteps-form__select form-control choices__input"
                        name="choices-state"
                        tabindex="-1"
                        data-choice="active"
                      >
                        <option
                          v-for="(option, index) in userRole"
                          :key="index"
                          :value="option"
                        >
                          {{ option }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-sm-6 mt-4 mt-sm-0">
                  <label>Priority</label>
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
                        v-model="formData.priority"
                        id="choices-state"
                        class="multisteps-form__select form-control choices__input"
                        name="choices-state"
                        tabindex="-1"
                        data-choice="active"
                      >
                        <option
                          v-for="(option, index) in userRole"
                          :key="index"
                          :value="option"
                        >
                          {{ option }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-sm-6 mt-4 mt-sm-0">
                  <label>Tag</label>
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
                        v-model="formData.tag"
                        id="choices-state"
                        class="multisteps-form__select form-control choices__input"
                        name="choices-state"
                        tabindex="-1"
                        data-choice="active"
                      >
                        <option
                          v-for="(option, index) in userRole"
                          :key="index"
                          :value="option"
                        >
                          {{ option }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-sm-6 mt-4 mt-sm-0">
                  <label>Product</label>
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
                        v-model="formData.product"
                        id="choices-state"
                        class="multisteps-form__select form-control choices__input"
                        name="choices-state"
                        tabindex="-1"
                        data-choice="active"
                      >
                        <option
                          v-for="(option, index) in userRole"
                          :key="index"
                          :value="option"
                        >
                          {{ option }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-sm-6 mt-4 mt-sm-0">
                  <label>Type</label>
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
                        v-model="formData.type"
                        id="choices-state"
                        class="multisteps-form__select form-control choices__input"
                        name="choices-state"
                        tabindex="-1"
                        data-choice="active"
                      >
                        <option
                          v-for="(option, index) in userRole"
                          :key="index"
                          :value="option"
                        >
                          {{ option }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-sm-6">
                  <label>Due Date</label>
                  <div class="form-group multisteps-form__input">
                    <div class="">
                      <input
                        v-model="formData.dueDate"
                        id="firstname"
                        type="date"
                        class="form-control form-control-default"
                        name=""
                        isrequired="false"
                        autocomplete="off"
                      />
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
              <h5 class="font-weight-bolder">Contact Associated</h5>
              <div class="multisteps-form__content">
                <div class="row mt-3">
                  <div class="col-6">
                    <label>Contact</label>
                    <div class="form-group multisteps-form__input">
                      <div class="">
                        <input
                          v-model="formData.contact"
                          id="address-line"
                          type="text"
                          class="form-control form-control-default"
                          name=""
                       
                          isrequired="false"
                          autocomplete="off"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <label>Ticket Owner</label>
                    <div class="form-group multisteps-form__input">
                      <div class="">
                        <input
                          v-model="formData.ticketOwner"
                          id="address-line2"
                          type="text"
                          class="form-control form-control-default"
                          name=""
                       
                          isrequired="false"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                    <div class="col-12">
                  <div class="form-group multisteps-form__textarea mt-0">
                    <label for="bio">Description</label>
                    <textarea
                      v-model="formData.description"
                      id="bio"
                      class="form-control"
                      rows="5"
                      placeholder="Say a few words about who you are or what you're working on."
                    ></textarea>
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
                class="btn mb-0 bg-gradient-dark btn-md null null"
                type="button"
              >Submit
              </button>
            </div>
              </div>
            </div>
            <!-- 3rd form
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
            </div> -->
         
          </form>
        </div>
      </div>
      <Loader :loading="isLoading"></Loader>
    </div>
  </template>
  <!-- <style>
      .multisteps-form__panel {
          position: relative !important; 
          display: none !important;
          transition: padding 0.3s ease; /* Add transition for smoother padding change */
          padding-bottom: 0; /* Initially set padding bottom to 0 */
      }
      .multisteps-form__panel.js-active{
          display: block !important;
      }
      .select-box select{
          display: content !important;
          border: 1px solid #e0e3e7 !important;
          border-radius: 10px;
      }
      
      </style> -->
  
  <!-- JavaScript code for stepper functionality -->
  <!-- // Import necessary modules -->
  <script>
  import axios from "axios";
  import { onBeforeMount, onMounted, reactive, ref } from "vue";
  // import PopupComponent from "./components/PopupComponent.vue";
  import { putUrl } from "../../boot/axios";
  import { verifyUser } from "../../verifyUser/verifyUser.js";
  import router from "../../router/index.js";
  import Loader from "../components/Loader.vue";
  import Swal from "sweetalert2";
  
  export default {
    props: ["id"],
    components: {
      // PopupComponent,
      Loader,
    },
    setup(props) {
      // Define reactive data
      const formData = reactive({
     subject:"",
     referenceNumber:"",
     category:"",
     status:"",
     priority:"",
     tag:"",
     product:"",
     type:"",
     dueDate:"",
     contact:"",
     ticketOwner:"",
     description:"",

      });
      let isLoading = ref(false);
      const userRole = ref(["superAdmin", "admin", "advisor","contact"]);
      // const popupMessage = ref("");
  
      // Function to submit form data
      const submitform = async () => {
        isLoading.value=true;
        console.log(formData);
        try {
          const response = await axios.put(`${putUrl}/ticket/createticket`,formData);
          isLoading.value = false;
          console.log(response.data);
      setTimeout(()=>{
        Swal.fire({
              title: "<strong>Ticket Created Successfully</strong>",
              icon: "success",
            });
      },1000)
            router.push("/userslist");
        } catch (error) {
          Swal.fire({
              title: "<strong>Error While Creating Ticket</strong>",
              icon: "error",
            });
          console.log(error);
        }
      };
  
      // Function to handle form submission
      const handleSubmitForm = () => {
        submitform();
      };
      const handleUpdateForm =async () => {
        isLoading.value=true;
         const updateResponse=await axios.post(`${putUrl}usersFunction/updateuser/${props.id}`,formData);
         isLoading.value=false;
         console.log(updateResponse);
         Swal.fire({
             title: "<strong>User Updated Successfully</strong>",
             icon: "success",
             timer:1000,
           });
           setTimeout(()=>{
            router.push("/userslist");
           },2000)
           
      
      }
      onBeforeMount(async () => {
        const verify = await verifyUser();
        if (!verify) {
          router.push("/signin");
        }
      });
      // Function to set up stepper functionality
      onMounted(() => {
        const progressButtons = document.querySelectorAll(
          ".multisteps-form__progress-btn"
        );
        const formPanels = document.querySelectorAll(".multisteps-form__panel");
  
        let currentStep = 0;
  
        // Function to update the progress indicators
        const updateProgress = () => {
          progressButtons.forEach((button, index) => {
            button.classList.toggle("js-active", index <= currentStep);
          });
        };
  
        // Function to navigate to a specific step
        const goToStep = (stepIndex) => {
          if (stepIndex >= 0 && stepIndex < formPanels.length) {
            formPanels[currentStep].classList.remove("js-active");
            currentStep = stepIndex;
            formPanels[currentStep].classList.add("js-active");
            updateProgress();
            adjustFormPanelPadding();
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
            isLoading.value=true;
            const response = await axios.get(
              `${putUrl}usersFunction/getsingleuser/${props.id}`
            );
            isLoading.value = false;
            console.log(response.data.data[0].userData);
           
            Object.assign(formData,response.data.data[0].userData);
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
        formData,
        handleSubmitForm,
       
      };
    },
  };
  </script>
  