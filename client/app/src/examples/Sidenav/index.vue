<template>
  <div
    v-show="this.$store.state.layout === 'default'"
    class="height-200 position-absolute w-100"
    :class="`${this.$store.state.darkMode ? 'bg-transparent' : 'dashboard-background'}`" />
  <aside   class="overflow-auto sidenav navbar navbar-vertical navbar-expand-xs "
    :class="`${
      this.$store.state.isRTL ? 'me-3 rotate-caret fixed-end' : 'fixed-start ' } 
    ${ this.$store.state.layout === 'landing' ? 'bg-transparent shadow-none' : ' '} ${this.$store.state.sidebarType}`"
    id="sidenav-main">
 
   <div class="sidenav-header">
      <i
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true"
        id="iconSidenav"
      ></i>
    <router-link class="m-0 navbar-brand" to="/"> 
        <img
          :src="
            this.$store.state.darkMode ||
            this.$store.state.sidebarType === 'bg-default'
              ? logoWhite
              : logo
          "
          class="navbar-brand-img h-100"
          alt="main_logo"
        />
        <span class="ms-2 font-weight-bold me-2">Canadian L.I.C </span>
      </router-link>
    </div>
     <hr class="mt-0 horizontal dark" />
    <sidenav-list :cardBg="custom_class" class="pt-1" />

  </aside>
</template>
<script>
import SidenavList from "./SidenavList.vue";
import logo from "@/assets/img/CLIC-Red-Logo .png";
import logoWhite from "@/assets/img/logo-ct.png";

export default {
  name: "index",
  components: {
    SidenavList
  },
  data() {
    return {
      logo,
      logoWhite,
      navbarExpanded: true,
    };
  },
  props: ["custom_class", "layout"],
  methods: {
    toggleSidebarWidth() {
      // Toggle navbar width between 18% and 1.5%
      this.navbarExpanded = !this.navbarExpanded;
      const navbar = document.querySelector('.navbar-expand-xs');
      navbar.style.width = this.navbarExpanded ? '18%' : '1.3%';
      // navbar.style.backgroundColor = this.navbarExpanded ? '#fff' : 'red';

    }
  }
};
</script>

<style>
aside{
  margin-top:3.7rem;
  border-top-right-radius: 5px;
  border:1px solid #cfe2ff;
  box-sizing: border-box;
  margin-left:0.5rem !important;
  
 
}
.dashboard-background{
  background-color: #D8EEFE;
}
.chevron{
position:absolute;
right:0;
}
::-webkit-scrollbar {
  display: none;
}

</style>