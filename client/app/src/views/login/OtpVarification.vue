<template>
  <div class=" top-0 position-sticky z-index-sticky">
    <main class="main-content mt-0">
      <!-- Page Header -->
      <div class="page-header align-items-start min-vh-50 pt-5 pb-11 mt-1 border-radius-lg"
        style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg'); background-position: top;">
        <span class="mask bg-gradient-dark opacity-6"></span>      
      </div>

      <!-- OTP Verification Form -->
      <div class="px-1">
        <div class="row otp-verification-div justify-content-center">
          <div class="col-xl-5 col-lg-6 col-md-8 col-sm-12 mx-auto">
            <div class="card z-index-0">
              <div class=" text-center pt-4">
                <h5 class="mb-0">User Verification</h5>
              </div>
              <div class="px-3 pb-3">
                <form role="form">
                  <!-- Email Input -->
                  <div class="row mt-3">
                    <div class="col-md-9 margin">
                      <input type="email" class="form-control" :disabled="emailVerified" v-model="email"
                        placeholder="Email" />
                    </div>
                    <div class="col-md-3 d-flex justify-content-center">
                      <button @click.prevent="sendEmailOTP" :disabled="emailVerified || emailSending"
                        class="btn custom-btn py-1 px-4">
                        <template v-if="!emailSending">
                          Send
                        </template>
                        <template v-else>
                          {{ emailCountdown }}
                        </template>
                      </button>
                    </div>
                  </div>
                  <div class="mx-2" style="height: 1.2rem;">
                    <small v-if="emailOTPSent" :class="className">{{ emailVerifiedText }}</small>
                  </div>
                  <!-- Email OTP Input -->
                  <div class="row mt-3">
                    <div class="col-md-9 margin">
                      <input type="password" class="form-control" :disabled="emailVerified" v-model="emailOTP"
                        placeholder="Enter Email OTP" />
                    </div>
                    <div class="col-md-3 d-flex justify-content-center">
                      <button @click.prevent="verifyEmailOTP" :disabled="emailVerified"
                        class="btn custom-btn py-1">Verify</button>
                    </div>
                  </div>

                  <!-- Phone Input -->
                  <div class="row mt-3">
                    <div class="col-md-9 margin">
                      <input type="text" class="form-control" :disabled="!emailVerified" v-model="phone"
                        placeholder="Phone" />
                    </div>
                    <div class="col-md-3 d-flex justify-content-center">
                      <button @click.prevent="sendPhoneOTP" :disabled="!emailVerified || phoneSending"
                        class="btn custom-btn py-1 px-4">
                        <template v-if="!phoneSending">
                          Send
                        </template>
                        <template v-else>
                          {{ phoneCountdown }}
                        </template>
                      </button>
                    </div>
                  </div>
                  <div class="mx-2" style="height: 1.2rem;">
                    <small v-if="phoneOTPSent" :class="className">{{ phoneVerifiedText }}</small>
                  </div>


                  <!-- Phone OTP Input -->
                  <div class="row mt-3">
                    <div class="col-md-9 margin">
                      <input type="password" class="form-control" :disabled="!emailVerified" v-model="phoneOTP"
                        placeholder="Enter OTP" />
                    </div>
                    <div class="col-md-3 d-flex justify-content-center">
                      <button @click.prevent="verifyPhoneOTP" :disabled="!emailVerified"
                        class="btn custom-btn py-1">Verify</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- Include Footer Component -->
    <app-footer />
  </div>
</template>

<script>
import AppFooter from "@/examples/PageLayout/Footer.vue";
import Swal from 'sweetalert2';
import { putUrl } from "../../boot/axios";
import router from "../../router/index.js";
const body = document.getElementsByTagName("body")[0];
export default {
  name: "User Verificationn",
  components: {
    AppFooter
  },
  data() {
    return {
      email: "",
      emailOTP: "",
      phone: "",
      phoneOTP: "",
      emailVerified: false,
      emailSending: false,
      emailCountdown: 30,
      phoneSending: false,
      phoneCountdown: 30,
      emailOTPSent: false,
      phoneOTPSent: false,
      emailVerifiedText: "",
      phoneVerifiedText: "",
      className: 'text-danger'
    };
  },
  mounted() {
    // Retrieve userEmail from sessionStorage
    const userEmail = sessionStorage.getItem('userEmail');
    console.log("Data",userEmail);

    // Set userEmail to the email data property
    if (userEmail) {
      this.email = userEmail;
      if (!this.emailOTPSent) {
        // Call sendEmailOTP() only if OTP hasn't been sent before
        this.sendEmailOTP();
        // Set the flag to true after sending OTP
        this.emailOTPSent = true;
      }
    }


  },
  methods: {
    // send email otp
    async sendEmailOTP() {
      try {
        this.emailSending = true;
        const intervalId = setInterval(() => {
          this.emailCountdown--;
          if (this.emailCountdown === 0) {
            clearInterval(intervalId);
            this.emailSending = false;
            this.emailCountdown = 30;
          }
        }, 1000);

        const response = await fetch(`${putUrl}usersFunction/app/send-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userEmail: this.email })
        });
        const data = await response.json();
        if (response.ok) {
          this.emailOTPSent = true
          this.emailVerifiedText= "OTP sent to your email !"
        } else {
          throw new Error(data.message || 'Failed to send email OTP');
          
        }
      } catch (error) {
        console.error("Error sending email OTP:", error);
        this.emailVerifiedText= "Internal server error !"
        
      }
    },

    // send verification email otp
    async verifyEmailOTP() {
      try {
        const response = await fetch(`${putUrl}usersFunction/app/verify-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userEmail: this.email, userOTP: this.emailOTP })
        });
        const data = await response.json();
        if (response.ok) {
          this.phoneVerifiedText= "OTP sent ! please enter here",
          this.emailVerifiedText = "Verified"
          this.className = "text-success";
          this.emailVerified = true;
          await this.fetchDataFromServer()
          sessionStorage.removeItem('userEmail');
        } else {
          throw new Error(data.message || 'Failed to verify email OTP');
        }
      } catch (error) {
        console.error("Error verifying email OTP:", error);
        this.emailVerifiedText = "Invalid otp retry"

      }
    },

    // send phone otp
    async sendPhoneOTP() {
      try {
        this.phoneOTPSent = true
        this.phoneSending = true;
        const intervalId = setInterval(() => {
          this.phoneCountdown--;
          if (this.phoneCountdown === 0) {
            clearInterval(intervalId);
            this.phoneSending = false;
            this.phoneCountdown = 30;
          }
        }, 1000);

        const response = await fetch(`${putUrl}usersFunction/app/phone-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ phoneNumber: this.phone }) // Make sure this is correct
        });
        const data = await response.json();

        if (data.ok) {
          this.phoneVerifiedText = "OTP sent, please enter here"
        } else {
          throw new Error(data.message || 'Failed to send phone OTP');
        }
      } catch (error) {
        console.error("Error sending phone OTP:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Failed to send phone OTP',
          timer: 2000,
          confirmButtonText: 'OK'
        });
      }
    },
    // verify otp
    async verifyPhoneOTP() {
      try {
        const response = await fetch(`${putUrl}usersFunction/app/verify-phone-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ phoneNumber: this.phone, otpCode: this.phoneOTP, userEmail: this.email })
        });
        const data = await response.json();
        if (response.ok) {
          this.phoneOTPSent = false
          this.phoneVerifiedText = "Verified"
          this.className = "text-success";
          Swal.fire({
            icon: 'success',
            title: 'Phone OTP Verified',
            text: 'Phone OTP has been verified successfully.',
            timer: 2000,
            confirmButtonText: 'OK'
          })
          sessionStorage.removeItem('userPhone');
          this.fetchUserDataFromServer()
          router.push("/dashboard");
        } else {
          throw new Error(data.message || 'Failed to verify phone OTP');
        }
      } catch (error) {
        console.error("Error verifying phone OTP:", error);
        this.phoneVerifiedText = "Invalid, please try again"
      }
    },
      // Fetching user data from the server to check user role
      async fetchUserDataFromServer() {
      try {      
        const response = await fetch(`${putUrl}usersFunction/app/get-auth-data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userEmail: this.email })
        });
        const data = await response.json();
        console.log(data)
        // save data in local storage
        localStorage.setItem('permissions', data.response[0].appUsersRole.permmisions)
        localStorage.setItem('userId', data.response[0].userData.ROWID)
        
        localStorage.setItem('userName', data.response[0].userData.firstName + ' ' + data.response[0].userData.lastName)

      } catch (error) {
        console.log('Error fetching data from server:', error);
      }
    },

    async fetchDataFromServer() {
      try {
        const userEmail = sessionStorage.getItem('userEmail');
        const response = await fetch(`${putUrl}usersFunction/app/getuserdata`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userEmail: userEmail })
        });
        const data = await response.json();

        if (data.success) {

          this.phone = data.data.userData.phone;

          // Do whatever you want with the user data here
        } else {
          // User not found or error handling
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching data from server:', error);
      }
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
};
</script>
<style scoped>
.otp-verification-div{
    margin-top: -17rem  !important;
  }
@media (max-width:600px){
  .margin{
    margin-bottom: 1rem !important;
  }
  .otp-verification-div{
    margin-top: -16rem  !important;
  }
}
@media (min-width: 601px) and (max-width: 991px){
  .otp-verification-div{
    margin-top: -21rem  !important;
  }
}
</style>