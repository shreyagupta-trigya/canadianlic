<template>
  <div class="container-fluid py-5">
    <div class="row">
      <div class="col-12">
        <div class="multisteps-form">
          <div class="row">
            <div class="col-12 col-lg-8 mx-auto mb-4">
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
                    <button
                      class="multisteps-form__progress-btn"
                      type="button"
                      title="Step 4"
                    >
                      Step 4
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
      <div class="col-12 col-lg-8 m-auto">
        <!-- Froms -->
        <form class="multisteps-form_from">
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
                        id="firstname"
                        type="text"
                        class="form-control form-control-default"
                        name=""
                        placeholder="First Name"
                        isrequired="false"
                        autocomplete="off"
                      /><!---->
                    </div>
                  </div>
                </div>
                <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                  <label>Last Name</label>
                  <div class="form-group multisteps-form__input">
                    <div class="">
                      <input
                        id="lastname"
                        type="text"
                        class="form-control form-control-default"
                        name=""
                        placeholder="Last Name"
                        isrequired="false"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-sm-6">
                  <label>Phone</label>
                  <div class="form-group multisteps-form__input">
                    <div class="">
                      <input
                        id="Phone"
                        type="number"
                        class="form-control form-control-default"
                        name=""
                        placeholder="phone"
                        isrequired="false"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                  <label>Email Address</label>
                  <div class="form-group multisteps-form__input">
                    <div class="">
                      <input
                        id="email"
                        type="email"
                        class="form-control form-control-default"
                        name=""
                        placeholder="email"
                        isrequired="false"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="button-row d-flex mt-2">
                <button
                  class="btn mb-0 bg-gradient-dark btn-md null null ms-auto mb-0 js-btn-next"
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
                  <label>Zip</label>
                  <div class="form-group multisteps-form__input">
                    <div class="">
                      <input
                        id="zipcode"
                        type="text"
                        class="form-control form-control-default"
                        name=""
                        placeholder="Zip"
                        isrequired="false"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="button-row d-flex mt-2">
                <button
                  class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev"
                  type="button"
                >
                  Prev
                </button>
                <button
                  class="btn mb-0 bg-gradient-dark btn-md null null ms-auto js-btn-next"
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
                    class="multisteps-form__input form-control"
                    type="text"
                    placeholder="Twitter"
                  />
                </div>
                <div class="col-12 mt-3">
                  <label>Facebook Account</label>
                  <input
                    class="multisteps-form__input form-control"
                    type="text"
                    placeholder="https://..."
                  />
                </div>
                <div class="col-12 mt-3">
                  <label>Instagram Account</label>
                  <input
                    class="multisteps-form__input form-control"
                    type="text"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div class="button-row d-flex mt-4">
                <button
                  class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev"
                  type="button"
                >
                  Prev
                </button>
                <button
                  class="btn mb-0 bg-gradient-dark btn-md null null ms-auto js-btn-next"
                  type="button"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <!-- 4 form -->
          <div
            class="card multisteps-form__panel p-3 border-radius-xl bg-white"
            data-animation="FadeIn"
          >
            <h5 class="font-weight-bolder mb-0">Profile</h5>
            <div class="multisteps-form__content mt-4">
              <div class="row">
                <div class="col-12">
                  <label>Public Email</label>
                  <div class="form-group multisteps-form__input">
                    <div class="">
                      <input
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
                      id="bio"
                      class="form-control"
                      rows="5"
                      placeholder="Say a few words about who you are or what you're working on."
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="button-row d-flex mt-4">
                <button
                  class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev"
                  type="button"
                >
                  Prev
                </button>
                <button
                  class="btn mb-0 bg-gradient-dark btn-md null null ms-auto"
                  type="button"
                  @click.prevent="handleSubmitForm"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
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
<script>
import { onMounted } from "vue";
export default {
  setup() {
   
    const handleSubmitForm=()=>{
        console.log("button clicked");
    }

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

      // Call updateProgress initially to set the progress indicators
      updateProgress();
      // Adjust form panel padding initially
      adjustFormPanelPadding();
    });
    return{
        handleSubmitForm
    }
  },
};
</script>
