<template>
  <main class="mt-0 siginPage">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <!-- Sign Up Form -->
            <div class="mx-auto col-xl-6 col-lg-6 col-md-6 d-flex flex-column">
              <div class="card card-plain w-100 my-auto mt-6 mx-auto">
                <div class="p-0 card-header text-start">
                  <h4 class="font-weight-bolder">Sign Up</h4>
                  <p class="mb-0">Enter your email and password to Sign Up</p>
                </div>
                <div class="">
                  <form role="form" class="form-container">
                    <div class="form-group">
                      <label for="userName">Name</label>
                      <input type="text" class="form-control" id="userName" v-model="formData.userName" placeholder="Name" />
                    </div>
                    <div class="form-group">
                      <label for="userEmail">Email</label>
                      <input type="email" class="form-control" id="userEmail" v-model="formData.userEmail" placeholder="Email" />
                      <div class="error-message" v-if="oldUser">User already exists!</div>
                    </div>
                    <div class="form-group">
                      <label for="userPassword">Password</label>
                      <input type="password" class="form-control" id="userPassword" v-model="formData.userPassword" placeholder="Password" @input="checkPasswordLength" />
                      <div class="error-message" v-if="passwordLengthInvalid && formData.userPassword.length > 0">Password too short!</div>
                    </div>
                    <div class="form-check mt-3">
                      <input type="checkbox" class="form-check-input" id="agreeTerms" v-model="formData.agreeTerms" :disabled="passwordLengthInvalid" />
                      <label class="form-check-label mb-0 mt-1" for="agreeTerms">I agree to the <a href="#" class="text-dark font-weight-bolder">Terms and Conditions</a></label>
                    </div>
                    <div class="text-center mt-3">
                      <argon-button class="" variant="gradient" :disabled="!isCheckboxChecked" fullWidth size="lg" @keyPress.enter="submitFormData" @click.prevent="submitFormData">Sign Up</argon-button>
                    </div>
                  </form>
                </div>
                <p class="text-sm mt-3 mx-auto">
                  Already have an account?
                  <a href="#/signin" class="text-dark font-weight-bolder">Sign In</a>
                </p>
              </div>
            </div>

            <!-- Image Carousel -->
            <div class="my-auto text-center col-xl-6 col-lg-6 col-md-6  h-75 pe-0  mx-lg-0">
              <div id="carouselExampleAutoplaying" class="carousel slide m-2 p-2" data-bs-ride="carousel">
                <div class="carousel-inner" style="border-radius: 1rem;">
                  <div class="carousel-item active">
                    <img style="border-radius: 1rem;" src="/images/family-and-child-with-piggybank-white-background.png" class="d-block w-100" alt="/images/">
                  </div>
                  <div class="carousel-item">
                    <img style="border-radius: 1rem;" src="/images/father-droping-child-to-school.png" class="d-block w-100" alt="/images/">
                  </div>
                  <div class="carousel-item">
                    <img style="border-radius: 1rem;" src="/images/happy-family-protection-white-background.png" class="d-block w-100" alt="/images/">
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>


<script>
import { reactive, computed, ref } from "vue";
import axios from "axios";
import router from "../../router/index";
import Swal from 'sweetalert2';
import { putUrl } from "../../boot/axios";
import ArgonButton from "@/components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "User Signup",
  components: {
    ArgonButton
  },
  setup() {
    const formData = reactive({
      userName: "",
      userEmail: "",
      userPassword: "",
      agreeTerms: false,
      oldUser: false
    });
    const oldUser = ref(false);

    const submitFormData = async () => {
      try {
        // Store email in local storage
        localStorage.setItem('userEmail', formData.userEmail);
        sessionStorage.setItem('userEmail', formData.userEmail);

        // Signup request
        const response = await axios.post(`${putUrl}usersFunction/app/signup`, {
          userName: formData.userName,
          userEmail: formData.userEmail,
          userPassword: formData.userPassword
        });

        // Redirect to OTP verification page after successful signup
        if (response.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Verify Email OTP',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            router.push("/verify-otp");
          });
        } else if (response.data.existingUser) {
          oldUser.value = true
        }

      } catch (error) {
        console.error("Error submitting form:", error);
        Swal.fire({
          icon: 'error',
          title: 'Internal server error !',
          text: error,
          timer: 2000,
          showConfirmButton: false
        })
      }
    };

    const isCheckboxChecked = computed(() => {
      return formData.agreeTerms;
    });

    const passwordLengthInvalid = computed(() => {
      return formData.userPassword.length < 8;
    });

    const checkPasswordLength = () => {
      // No need to do anything here, as it's being handled by computed property passwordLengthInvalid
    };

    return {
      formData,
      submitFormData,
      isCheckboxChecked,
      passwordLengthInvalid,
      checkPasswordLength,
      oldUser
    };
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
};
</script>

<style scoped>
#userPassword,
#userName,
#userEmail,
#userName {
  padding: 1.3rem !important;
}

#userPassword::-ms-input-placeholder {
  font-size: 1rem !important;
}

#userName::-ms-input-placeholder {
  font-size: 1rem !important;
}

#userEmail::-ms-input-placeholder {
  font-size: 1rem !important;
}

#userPassword::placeholder {
  font-size: 1rem !important;
}

#userName::placeholder {
  font-size: 1rem !important;
}

#userEmail::placeholder {
  font-size: 1rem !important;
}

.form-container {
  
  padding: 0;
  max-width: 500px;
  /* Adjust as needed */
}

.form-group {
  margin-bottom: 0rem;
}

.form-control {
  border-radius: 0.375rem;
  /* Consistent border radius */
  border: 1px solid #ced4da;
  /* Border color */
  padding:0.75rem;
}

.form-control:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25);
}

.error-message {
  color: #dc3545;
  /* Bootstrap red color for errors */
  font-size: 0.875rem;
  /* Slightly smaller text for errors */
  margin-top: 0.5rem;
}

.form-check {
  margin-bottom: 1rem;
}

.form-check-input {
  margin-right: 0.5rem;
}

.form-check-label a {
  color: #007bff;
  /* Bootstrap primary color for links */
}

.btn.custom-btn {
  background-color: #28a745;
  /* Green color for the button */
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  /* Padding inside the button */
  font-size: 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease-in-out;
}

.btn.custom-btn:hover {
  background-color: #218838;
  /* Darker green on hover */
}

.btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.otp-verification-div {
  margin-top: -17rem !important;
}


/* Mobile Styles */
@media (max-width: 600px) {
  .form-container {
    width: 100% !important;
    
    
  }
  .form-group {
    margin-bottom: 0.1rem; /* Reduced space between form fields */
  }
  
  .container{
    display:flex;
    justify-content: center;
    align-items: center;
  }
  .mx-auto {
    max-width: 100% !important;
  }

  .page-header {
    min-height: 100% !important;
  }

  .carousel-inner  {
    display:none;
  }

  .card {
    width: 100% !important;
    
     }
}
/* Tablet to Small Desktop */
@media (min-width: 601px) and (max-width: 991px) {
  .form-container {
    width: 100%;
    max-width: 450px;
  }

  .carousel-inner img {
    max-height: 250px;
  }
  .card{
    width:100%;
  }
  .form-control{
    width:100%;
  }
}
</style>
