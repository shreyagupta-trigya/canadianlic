<template>
  <nav class="navbar navbar-main navbar-expand-lg p-0 shadow-none border-radius-xl" :class="this.$store.state.isRTL ? 'top-0 position-sticky z-index-sticky' : ''
    " v-bind="$attrs" id="navbarBlur" data-scroll="true">
    <div class="p-0 m-0 container-fluid d-flex align-items-center justify-content-between">

      <!-- Sidebar Toggle Button at Start -->
      <a @click="toggleSidebarClick" class="d-flex align-items-center justify-content-center p-1 mb-2 cursor-pointer"
        style="width: 42px; height: 42px;">
        <i :class="$store.state.isSidebarOpen ? 'fa fa-bars' : 'fa fa-chevron-left'" class="fs-5"></i>
      </a>

      <breadcrumbs :currentPage="currentRouteName" class="text-whit" textWhite="text-white" />

      <div class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        :class="this.$store.state.isRTL ? 'px-0' : 'me-sm-4'" id="navbar">
        <div class="pe-md-3 d-flex align-items-center" :class="this.$store.state.isRTL ? 'me-md-auto' : 'ms-md-auto'">
          <div class="input-group search-bar-div">
            <span class="input-group-text text-body">
              <i class="fas fa-search" aria-hidden="true"></i>
            </span>
            <input type="text" class="form-control" :placeholder="this.$store.state.isRTL ? 'أكتب هنا...' : 'Type here...'
              " />
          </div>
        </div>
        <ul class="navbar-nav justify-content-end  ">
          <!-- <li @click="logout()" class="nav-item d-flex align-items-center p-2">            
            <i :class="[SignInSignUpBtn ==='Log Out' ? 'fa fa-power-off text-danger fs-7 cursor-pointer' :'fs-6 fa fa-user text-whit']" title="Log Out"></i> 
              <span class="d-sm-inline d-none ps-2 text-sm text-whit fw-4 text-bold nav-link text-whit cursor-pointer" >{{ SignInSignUpBtn  }}</span>           
          </li> -->
          <li class="nav-item d-xl-none d-flex align-items-center">
            <a href="#" @click="toggleSidebar" class="p-0 nav-link text-whit" id="iconNavbarSidenav">
              <div class="sidenav-toggler-inner ">
                <router-link to="/dashboard">
                  <i class=" fa fa-home fs-6 "></i>
                </router-link>
              </div>
            </a>
          </li>


          <li class=" nav-item d-flex align-items-center">
            <router-link to="/setting">
              <a class="p-2 nav-link text-whit">
                <i class="cursor-pointer fa fas fa-cog fixed-plugin-button-nav"></i>
              </a>
            </router-link>
          </li>
          <li class="nav-item dropdown d-flex align-items-center relative"
            :class="this.$store.state.isRTL ? 'ps-2' : 'pe-2'">
            <a href="#" class="p-0 nav-link text-whit" :class="[showMenu ? 'show' : '']" id="dropdownMenuButton"
              data-bs-toggle="dropdown" aria-expanded="false" @click="showMenu = !showMenu">
              <i class=" cursor-pointer fa fa-bell"></i>
              <ul class="px-2 py-3 dropdown-menu dropdown-menu-end  absolute " style="right:-10px"
                :class="showMenu ? 'show' : ''" aria-labelledby="dropdownMenuButton">
                <li class="mb-2">
                  <a class="dropdown-item border-radius-md" href="javascript:;">
                    <div class="py-1 d-flex">
                      <div class="my-auto">
                        <img src="../../assets/img/team-2.jpg" class="avatar avatar-sm me-3" alt="user image" />
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-1 text-sm font-weight-normal">
                          <span class="font-weight-bold">New message</span> from
                          Laur
                        </h6>
                        <p class="mb-0 text-xs text-secondary">
                          <i class="fa fa-clock me-1"></i>
                          13 minutes ago
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li class="mb-2">
                  <a class="dropdown-item border-radius-md" href="javascript:;">
                    <div class="py-1 d-flex">
                      <div class="my-auto">
                        <img src="../../assets/img/small-logos/logo-spotify.svg"
                          class="avatar avatar-sm bg-gradient-dark me-3" alt="logo spotify" />
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-1 text-sm font-weight-normal">
                          <span class="font-weight-bold">New album</span> by
                          Travis Scott
                        </h6>
                        <p class="mb-0 text-xs text-secondary">
                          <i class="fa fa-clock me-1"></i>
                          1 day
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item border-radius-md" href="javascript:;">
                    <div class="py-1 d-flex">
                      <div class="my-auto avatar avatar-sm bg-gradient-secondary me-3">
                        <svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1"
                          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                          <title>credit-card</title>
                          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF" fill-rule="nonzero">
                              <g transform="translate(1716.000000, 291.000000)">
                                <g transform="translate(453.000000, 454.000000)">
                                  <path class="color-background"
                                    d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
                                    opacity="0.593633743" />
                                  <path class="color-background"
                                    d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z" />
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-1 text-sm font-weight-normal">
                          Payment successfully completed
                        </h6>
                        <p class="mb-0 text-xs text-secondary">
                          <i class="fa fa-clock me-1"></i>
                          2 days
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </a>
          </li>
          <li @click="logout()" class="nav-item d-flex align-items-center p-2">
            <span class="d-sm-inline d-none text-sm text-white fw-4 text-bold nav-link cursor-pointer">

              {{ userName?.length > 10 ? userName.slice(0, 10) + '...' : userName || "" }}
            </span>

            <i :class="[SignInSignUpBtn === 'Log Out' ? 'fa fa-power-off text-danger fs-7 cursor-pointer' : 'fs-6 fa fa-user text-whit']"
              title="Log Out"></i>
            <span class="d-sm-inline d-none ps-2 text-sm text-whit fw-4 text-bold nav-link text-whit cursor-pointer">{{
              SignInSignUpBtn }}</span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import Breadcrumbs from "../Breadcrumbs.vue";
import { mapMutations, mapActions } from "vuex";
import { verifyUser } from "../../verifyUser/verifyUser.js";
import router from "../../router/index.js"
import { useStore } from 'vuex';
const store = useStore();
export default {
  name: "navbar",
  data() {
    return {
      showMenu: false,
      SignInSignUpBtn: "SignIn",
      linkSignInSignUp: '/signin',
      userName: '',
    };
  },
  props: ["minNav", "textWhite"],
  created() {
    this.minNav;
  },
  async beforeMount() {
    const verified = await verifyUser();
    if (!verified) {
      this.SignInSignUpBtn = "SignIn";
      this.linkSignInSignUp = '/signin';

    }
    else {

      this.SignInSignUpBtn = "Log Out";
      this.userName = localStorage.getItem('userName') || '';
    }

  },
  methods: {
    logout() {

      if (this.SignInSignUpBtn === "Log Out") {
        localStorage.removeItem('userEmail');
        sessionStorage.removeItem('userEmail')
        localStorage.clear();
        sessionStorage.clear();
        router.push('/signin')
      }
      else {
        router.push('/signin')
      }
    },
    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),
    ...mapActions(["toggleSidebarColor"]),
    ...mapMutations(["toggleSidebar"]),

    // toggleSidebar() {
    //   this.toggleSidebarColor("bg-white");
    //   this.navbarMinimize();
    // },

    toggleSidebarClick() {
      this.toggleSidebar();
      if (this.$store.state.isSidebarOpen) {
        console.log("Open");
      } else {
        console.log("Collapsed");
      }

    }
  },
  components: {
    Breadcrumbs
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  }
};
</script>
<style scoped>
@media (max-width: 900px) {
  .search-bar-div {
    display: none;
  }
}
</style>
