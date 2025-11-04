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
        <form class="mb-8 multisteps-form__form" name="productForm">
          <div
            class="p-3 bg-white card multisteps-form__panel border-radius-xl js-active position-relative"
            data-animation="FadeIn"
          >
            <h5 class="font-weight-bolder">Product Information</h5>
            <div class="multisteps-form__content">
              <div class="mt-3 row">
                <div class="col-12 col-sm-6">
                  <label>Name</label>
                  <input
                    v-model="formData.name"
                    class="multisteps-form__input form-control"
                    type="text"
                    placeholder="Name"
                  />
                </div>
                <div class="mt-3 col-12 col-sm-6 mt-sm-0">
                  <label>Weight</label>
                  <input
                    v-model="formData.weight"
                    class="multisteps-form__input form-control"
                    type="text"
                    placeholder="Weight"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
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

                <div class="mt-4 col-sm-6 mt-sm-0">
                  <label class="mt-4">Category</label>
                  <select
                    v-model="formData.category"
                    id="choices-category"
                    class="form-control"
                    name="choices-category"
                  >
                    <option value="Clothing">Clothing</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Others">Others</option>
                    <option value="Real Estate">Real Estate</option>
                  </select>

                  <label class="mt-4">Sizes</label>
                  <select
                    v-model="formData.sizes"
                    id="choices-sizes"
                    class="form-control"
                    name="choices-sizes"
                  >
                    <option value="Extra Large">Extra Large</option>
                    <option value="Extra Small">Extra Small</option>
                    <option value="Large">Large</option>
                    <option value="Medium">Medium</option>
                    <option value="Small">Small</option>
                  </select>
                </div>
              </div>
              <div class="mt-4 button-row d-flex col-12">
                <button
                  class="btn mb-0 bg-gradient-dark btn-md null null mb-0 ms-auto js-btn-next"
                  type="button"
                  title="Next"
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
            <h5 class="font-weight-bolder">Product Images</h5>
            <div class="multisteps-form__content">
              <div class="mt-3 row">
                <div class="col-12 text-center">
                  <!-- Center-aligning the content -->

                  <!-- Dropzone container with file input field -->
                  <form
                    id="dropzone"
                    action="/file-upload"
                    class="dropzone dz-clickable"
                  >
                    <!-- Center-aligning the input field -->
                    <div class="d-flex justify-content-center">
                      <input type="file" name="file" multiple />
                    </div>
                  </form>
                </div>
              </div>
              <div class="mt-4 button-row d-flex col-12">
                <button
                  class="btn mb-0 bg-gradient-secondary btn-md null null mb-0 js-btn-prev"
                  title="Prev"
                >
                  Prev
                </button>
                <button
                  class="btn mb-0 bg-gradient-dark btn-md null null mb-0 ms-auto js-btn-next"
                  type="button"
                  title="Next"
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
            <h5 class="font-weight-bolder">Socials</h5>
            <div class="multisteps-form__content">
              <div class="mt-3 row">
                <div class="col-12">
                  <label>Shoppify Handle</label>
                  <div class="form-group multisteps-form__input">
                    <div class="">
                      <!----><input
                        v-model="formData.shopifyHandle"
                        id=""
                        type="text"
                        class="form-control form-control-default"
                        name=""
                        placeholder=""
                        isrequired="false"
                      /><!---->
                    </div>
                  </div>
                </div>
                <div class="mt-3 col-12">
                  <label>Facebook Account</label>
                  <div class="form-group multisteps-form__input">
                    <div class="">
                      <!----><input
                        v-model="formData.facebookAccount"
                        id=""
                        type="text"
                        class="form-control form-control-default"
                        name=""
                        placeholder="https://..."
                        isrequired="false"
                      /><!---->
                    </div>
                  </div>
                </div>
                <div class="mt-3 col-12">
                  <label>Instagram Account</label>
                  <div class="form-group multisteps-form__input">
                    <div class="">
                      <!----><input
                        v-model="formData.instagramAccount"
                        id=""
                        type="text"
                        class="form-control form-control-default"
                        name=""
                        placeholder="https://..."
                        isrequired="false"
                      /><!---->
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="mt-4 button-row d-flex col-12">
                  <button
                    class="btn mb-0 bg-gradient-secondary btn-md null null mb-0 js-btn-prev"
                    title="Prev"
                  >
                    Prev</button
                  ><button
                    class="btn mb-0 bg-gradient-dark btn-md null null mb-0 ms-auto js-btn-next"
                    type="button"
                    title="Next"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="p-3 bg-white card multisteps-form__panel border-radius-xl"
            data-animation="FadeIn"
          >
            <h5 class="font-weight-bolder">Pricing</h5>
            <div class="mt-3 multisteps-form__content">
              <div class="row">
                <div class="col-3">
                  <label>Price</label
                  ><input
                    v-model="formData.price"
                    class="multisteps-form__input form-control"
                    type="text"
                    placeholder="99.00"
                  />
                </div>
                <div class="col-4">
                  <label for="currencyDropdown">Currency</label>
                  <select
                    class="form-select"
                    id="currencyDropdown"
                    v-model="formData.currency">
                    <option value="BTC">BTC</option>
                    <option value="CNY">CNY</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="INR">INR</option>
                    <option value="USD" selected>USD</option>
                  </select>
                </div>

                <div class="col-5">
                  <label>SKU</label
                  ><input
                
                    v-model="formData.sku"
                    class="multisteps-form__input form-control"
                    type="text"
                    placeholder="71283476591"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <label class="mt-4 form-label">Tags</label>
                  <select
                    id="choices-tags"
                    class="form-control"
                    name="choices-tags"
                    multiple
                    v-model="formData.tags"
                  >
                    <option value="Choice 1">In Stock</option>
                    <option value="Two">Out of Stock</option>
                    <option value="Choice 4">Black Friday</option>
                    <option value="One" disabled>Expired</option>
                    <option value="Choice 2">Out of Stock</option>
                    <option value="Choice 3">Sale</option>
                  </select>
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
                  Update
                </button>
                <PopupComponent :message="popupMessage" v-if="popupMessage" ></PopupComponent>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
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
import { onBeforeMount,onMounted, reactive ,ref} from "vue";

import PopupComponent from "./components/PopupComponent.vue";
import { putUrl } from "../boot/axios";
import {verifyUser } from "../verifyUser/verifyUser.js";
import router from "../router/index.js";



export default {
  components: {
    PopupComponent,
  
  },
  props: ["id"],
  setup(props) {

    const popupMessage = ref("");

    const handleSubmitForm = async () => {
      console.log("clicked");
      console.log("Route Parameter:", props.id);
      await axios
        .post(
          `${putUrl}ProductFunction/updateproduct/${props.id}`,
          {
            name: formData.name,
            weight: formData.weight,
            description: formData.description,
            category: formData.category,
            sizes: formData.sizes,
            shopifyHandle: formData.shopifyHandle,
            facebookAccount: formData.facebookAccount,
            instagramAccount: formData.instagramAccount,
            price: formData.price,
            currency: formData.currency,
            sku: formData.sku,
            tags: formData.tags,
          }
        )
        .then((res) => {
          popupMessage.value = res.data.message;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
          popupMessage.value = "An error occurred while updating the form.";
        });
    };
    const formData = reactive({
      name: "",
      weight: "",
      description: "",
      category: "",
      sizes: "",
      image: "",
      shopifyHandle: "",
      facebookAccount: "",
      instagramAccount: "",
      price: "",
      currency: "",
      sku: "",
      tags: "",
    });

    const getSingleProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/server/ProductFunction/getsingleproduct/${props.id}`
        );
        const data = await response.json();

        if (data.length > 0) {
          Object.assign(formData, data[0].productData);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    onBeforeMount(async () => {
  const verify = await verifyUser();
  if (!verify){
    router.push("/signin")
  }});
    onMounted(() => {
      getSingleProduct();
      initializeForm();
    });

    const initializeForm = () => {
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
        button.addEventListener("click", () => goToStep(currentStep + 1));
      });

      const prevButtons = document.querySelectorAll(".js-btn-prev");
      prevButtons.forEach((button) => {
        button.addEventListener("click", () => goToStep(currentStep - 1));
      });

      updateProgress();
      adjustFormPanelPadding();
    };

    return {
      formData,
      handleSubmitForm,
      popupMessage
    };
  },
  // methods: {
  //   submitForm() {
  //     console.log("Form submitted");
  //     // console.log("Route Parameter (props.id):", this.id);
  //   },
  // },
};
</script>
