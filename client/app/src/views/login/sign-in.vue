<template>
  <main class="mt-0 siginPage">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
              <div class="card card-plain">
                <div class="p-0 card-header text-start">
                  <h4 class="font-weight-bolder">Sign In</h4>
                  <p class="mb-0">Enter your email and password to sign in</p>
                </div>
                <div class="" style="height: 1.2rem;">
                  <small v-if="invalid" class="text-danger">{{ signInText }}</small>
                </div>
                <div class="">
                  <form role="form">
                    <div class="mb-1 mt-2">
                      <input type="email" @input="setSignInText()" placeholder="Email" id="signinEmail" class="form-control"
                        v-model="formData.userEmail" />
                    </div>
                    <div class="mb-1 mt-3">
                      <input type="password" @input="setSignInText()" placeholder="Password" id="signinPassword"
                        class="form-control" v-model="formData.userPassword" />
                    </div>
                   <div class="text-center mt-3">
                      <argon-button class="" variant="gradient"  fullWidth size="lg"
                        @click.prevent="signIn">Sign in</argon-button>
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2 mt-4">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <a href="#/signup" class="text-dark font-weight-bolder">Sign up</a>
                  </p>
                </div>
              </div>
            </div>
            <div class=" top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column">
              <div id="carouselExampleAutoplaying" class="carousel slide m-2 p-2" data-bs-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item">
                    <img style="border-radius: 1rem;" src="/app/images/family-and-child-with-piggybank-white-background.png" class="d-block w-100" alt="/images/">
                  </div>
                  <div class="carousel-item active">
                    <img src="/app/images/login_pic1.jpg" class="d-block w-100" alt="/images/">
                  </div>
                  <div class="carousel-item">
                    <img src="/app/images/happy-family-protection-white-background.png" class="d-block w-100" alt="/images/">
                  </div>
                  <div class="carousel-item">
                    <img style="border-radius: 1rem;" src="/app/images/login_pic4.jpg" class="d-block w-100" alt="/images/">
                  </div>
                  <div class="carousel-item">
                    <img src="/app/images/login_pic2.jpg" class="d-block w-100" alt="/images">
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
                  data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
                  data-bs-slide="next">
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
import Swal from 'sweetalert2';
import ArgonButton from "@/components/ArgonButton.vue";
import router from "../../router/index";
import { putUrl } from "../../boot/axios";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  components: {
    ArgonButton,
  },
  data() {
    return {
      formData: {
        userEmail: "",
        userPassword: ""
      },
      loginError: false,
      signInText: "",
      invalid: false
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

  methods: {

    setSignInText() {
      this.signInText = ""
    },
    async signIn() {
      try {
        // Retrieve email and password from formData
        const userEmail = this.formData.userEmail;
        const userPassword = this.formData.userPassword;

        // Store email in local storage
        localStorage.setItem('userEmail', userEmail);
        sessionStorage.setItem('userEmail', userEmail);
        // Make a POST request to the API for sign-in
        const response = await fetch(`${putUrl}usersFunction/app/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userEmail: userEmail,
            userPassword: userPassword
          })
        });

        // Parse response JSON
        const responseData = await response.json();

        if (responseData.success && !responseData.isFirstLogin) {
          Swal.fire({
            icon: 'success',
            title: 'Welcome!',
            text: 'Redirecting to dashboard...',
            timer: 2000, // milliseconds
            showConfirmButton: false
          }).then(() => {
            this.fetchDataFromServer().then(() => {
              router.push("/dashboard");
            }).catch((error) => {
              console.log("Fetch function error", error.message)
            })

          });
          this.loginError = false;
        }

        if (responseData.success && responseData.isFirstLogin) {

          sessionStorage.setItem('userPassword', userPassword);
          Swal.fire({
            icon: 'success',
            title: 'Fisrt Time Login!',
            text: 'Kindly reset password',
            timer: 2000, // milliseconds
            showConfirmButton: false
          }).then(() => {
            router.push("/reset-password");
          });
          this.loginError = false;
        }
        if (!responseData.success) {
          this.signInText = "Invalid email or password !"
          this.loginError = true;
          this.invalid = true


        }
      } catch (error) {
        console.error("Error signing in:", error);
        this.signInText = "Internal server error !";
        this.invalid = true;
      }
    },
    // Fetching user data from the server to check user role
    async fetchDataFromServer() {
      try {
        const userEmail = this.formData.userEmail;
        const response = await fetch(`${putUrl}usersFunction/app/get-auth-data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userEmail: userEmail })
        });
        const data = await response.json();
        console.log("ssssssssss=>",data)
        // save data in local storage
        localStorage.setItem('permissions', data.response[0].appUsersRole.permmisions)
        localStorage.setItem('userId', data.response[0].userData.ROWID)
        localStorage.setItem('roleId', data.response[0].userData.role)

        localStorage.setItem('userName', data.response[0].userData.firstName + ' ' + data.response[0].userData.lastName)

      } catch (error) {
        console.log('Error fetching data from server:', error);
      }
    }
  }


};
</script>

<style scoped>

#signinEmail,#signinPassword{
    padding:  1.3rem !important;
} 
#signinEmail::-ms-input-placeholder {
  font-size: 1rem !important;
}
#signinPassword::-ms-input-placeholder {
  font-size: 1rem !important;
}
#signinEmail::placeholder {
  font-size: 1rem !important;
}

#signinPassword::placeholder {
  font-size: 1rem !important;
}
</style>