<template>
  <div class="reset-password container top-0 position-sticky z-index-sticky" >
    <div class="row">
      <div class="col-12">
      </div>
    </div>
  </div>
  <main class="main-content mt-0">
    <div class="page-header align-items-start min-vh-50  mx-3 border-radius-lg"
      style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg'); background-position: top;">
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center mt-1">
          <div class="col-lg-5 text-center mx-auto">         
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-lg-n11 mt-md-n11 mt-n10 justify-content-center">
        <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div class="card z-index-0">            
            <div class="card-body">
              <form role="form">                
                <div class="form-group">
                  <label for="newPassword">New Password</label>
                  <input type="password" class="form-control" id="newPassword" v-model="formData.newPassword"
                    placeholder="Enter New Password" @blur="showPasswordLength" />
                    <div style="height: 1.2rem;">
                  <small v-if="!passwordLengthValid && formData.newPassword.length > 0" class="text-danger">Password should be at least 8 characters.</small>
                </div>
                </div>             
                                
                <div class="form-group">
                  <label for="confirmPassword">Confirm Password</label>
                  <input type="password" class="form-control " id="confirmPassword" v-model="formData.confirmPassword"
                    placeholder="Confirm Password" @focus="showPasswordMatch" />
                  <div style="height: 1.2rem;">
                    <small v-if="!passwordsMatch && confirmPasswordFocused && formData.confirmPassword.length > 0" class="text-danger">Passwords do not match</small>
                  </div>
                </div>
                <div class="text-center">
                  <button @click.prevent="verifyOTP" :disabled="!passwordLengthValid || !passwordsMatch" class="btn custom-btn py-2 ">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <app-footer />
</template>

<script>
import AppFooter from "@/examples/PageLayout/Footer.vue";
import { reactive, ref, watch} from "vue";
import axios from "axios";
import router from "../../router/index";
import Swal from 'sweetalert2';
import { putUrl } from "../../boot/axios";
import {verifyUser } from "../../verifyUser/verifyUser.js";
const body = document.getElementsByTagName("body")[0];
export default {
  name: "Reset Password",
  components: {
    AppFooter
  },
  async  beforeMount (){    
  const verify = await verifyUser();
  if (!verify){
    router.push("/signin")
    
  }
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

  setup() {
    const formData = reactive({
      userEmail: "",
      userOTP: "",
      newPassword: "",
      confirmPassword: ""
    });

    const passwordsMatch = ref(true);
    const confirmPasswordFocused = ref(false);
    const passwordLengthValid = ref(true);
  
    const verifyOTP = async () => {
      if (!passwordsMatch.value || !passwordLengthValid.value) return;
      try {
        if (formData.newPassword !== formData.confirmPassword) {
          passwordsMatch.value = false;
          return;
        } else {
          passwordsMatch.value = true;
        }
        if (formData.newPassword.length < 8) {
          passwordLengthValid.value = false;
          return;
        } else {
          passwordLengthValid.value = true;
        }

        const userEmail = sessionStorage.getItem('userEmail');
        const userPassword = sessionStorage.getItem('userPassword');
        const response = await axios.post(`${putUrl}usersFunction/app/resetpassword`, {
          userEmail: userEmail,
          userOTP: userPassword,
          userPassword: formData.newPassword
        });

        if (response.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Redirecting to signin page...',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            router.push("/verify-otp");
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Invalid OTP',
            timer: 2000,
            showConfirmButton: false
          });
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
      }
    };

    const showPasswordMatch = () => {
      confirmPasswordFocused.value = true;

      if (confirmPasswordFocused.value) {
        passwordsMatch.value = formData.newPassword === formData.confirmPassword;
      }
    };

    const showPasswordLength = () => {
      if (formData.newPassword.length < 8) {
        passwordLengthValid.value = false;
      } else {
        passwordLengthValid.value = true;
      }
    };

    // Watch for changes in the formData object to hide error messages when requirements are met
    watch(formData, () => {
      passwordsMatch.value = true;
      passwordLengthValid.value = true;
    });

    return {
      formData,
      verifyOTP,
      passwordsMatch,
      confirmPasswordFocused,
      passwordLengthValid,
      showPasswordMatch,
      showPasswordLength
    };
  }
};
</script>
<style scoped>
@media screen and (max-width:600px) {
  
  .reset-password{
 margin-top: -9rem;
}

}
@media (min-width:601px) and (max-width:900px) {
  
  .reset-password{
 margin-top: -20rem;
 }

}
</style>