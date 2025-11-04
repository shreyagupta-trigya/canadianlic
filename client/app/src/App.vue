<template>
  <div>
    <div
      v-show="this.$store.state.layout === 'landing'"
      class="landing-bg h-100 bg-gradient-primary position-fixed w-100"
    ></div>
    <!-- <sidenav
      :custom_class="this.$store.state.mcolor"
      :class="[
        this.$store.state.isTransparent,
        this.$store.state.isRTL ? 'fixed-end' : 'fixed-start'
      ]"
      v-if="this.$store.state.showSidenav"/> -->
    <div class="d-flex">
      <div class="custom-sidebar">
        <NewSidenav v-if="this.$store.state.showSidenav" />
      </div>
      <div class="main-page-card" style="overflow: hidden; min-height: 87vh;">
        <div>
          <main
            class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
          >
            <!-- nav -->
            <navbar
              :class="[navClasses]"
              :textWhite="
                this.$store.state.isAbsolute ? 'text-white opacity-8' : 'text-white'
              "
              :minNav="navbarMinimize"
              v-if="this.$store.state.showNavbar"
            />
            <router-view />
            <MobileNav
              class="d-block d-sm-block d-lg-none d-md-none"
              v-if="this.$store.state.showNavbar"
            />
            <!-- <app-footer v-show="this.$store.state.showFooter" /> -->
            <!-- <configurator
              :toggle="toggleConfigurator"
              :class="[
                this.$store.state.showConfig ? 'show' : '',
                this.$store.state.hideConfigButton ? 'd-none' : ''
              ]"
            /> -->
          </main>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import Sidenav from "./examples/Sidenav";
// import Configurator from "@/examples/Configurator.vue";
import Navbar from "@/examples/Navbars/Navbar.vue";
import NewSidenav from "./examples/Sidenav/NewSidenav.vue";
// import AppFooter from "@/examples/Footer.vue";
import { mapMutations } from "vuex";
import MobileNav from "./examples/MobileNav/MobileNav.vue";

export default {
  name: "App",
  components: {
    // Sidenav,
    NewSidenav,
    // Configurator,
    Navbar,
    MobileNav
    // AppFooter
  },
  methods: {
    ...mapMutations(["toggleConfigurator", "navbarMinimize"])
  },
  computed: {
    navClasses() {
      return {
        "position-sticky bg-white left-auto top-2 z-index-sticky":
          this.$store.state.isNavFixed && !this.$store.state.darkMode,
        "position-sticky bg-default left-auto top-2 z-index-sticky":
          this.$store.state.isNavFixed && this.$store.state.darkMode,
        "position-absolute px-4 mx-0 w-100 z-index-2": this.$store.state
          .isAbsolute,
        "px-0 mx-4": !this.$store.state.isAbsolute
      };
    }
  },
  beforeMount() {
    this.$store.state.isTransparent = "bg-transparent";
  }
};
</script>

<style scoped>

.main-page-card{
  width: 100%;
}
.main-content{
  overflow: scroll;
}
.main-content::-webkit-scrollbar{
  display: none !important;
}
</style>
