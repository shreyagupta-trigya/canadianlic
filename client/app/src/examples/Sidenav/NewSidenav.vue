<template>
  <div id="wrapper">
    <div id="sidebar-wrapper" class="mx-2 d-none d-sm-block" style="height: 100vh;"
      :style="{ width: $store.state.isSidebarOpen ? '200px' : '34px' }">
      <div class="d-flex justify-content-between align-items-center py-2 border-bottom">
        <img style="height: 50px; width: 150px" :src="logo" />
      </div>

      <ul class="sidebar-nav nav-pills nav-stacked" id="menu">
        <li v-for="(item, index) in menuItems" :key="index">
          <!-- Simple Link -->
          <router-link v-if="!item.submenu" :to="item.href"
            :class="{ 'current-nav-parent-link': isRouteActive(item.href) }">
            <a>
              <span class="mx-2"><i :class="item.icon"></i></span>
              {{ item.label }}
            </a>
          </router-link>

          <!-- Parent with Submenu -->
          <template v-else>
            <a class="d-flex align-items-center justify-content-between"
              :class="{ 'current-nav-parent-link': isSubMenuActive(item.submenu) }"
              @click.prevent="toggleSubMenu(index)">
              <span class="mx-2">
                <i :class="item.icon"></i>
                <span class="mx-2">{{ item.label }}</span>
              </span>
              <i :class="item.active ? 'fa fa-chevron-down' : 'fa fa-chevron-right'" class="fa fa-chevron-down m-2 fs-7"
                style="color: black; cursor: pointer !important"></i>
            </a>

            <!-- Recursive submenu rendering -->
            <ul v-if="item.submenu && item.submenu.length" class="nav-pills nav-stacked"
              :class="$store.state.isSidebarOpen ? '' : 'ps-0'" style="list-style-type: none;" v-show="item.active">
              <template v-for="(subItem, subIndex) in item.submenu" :key="subIndex">
                <!-- Subitem with deeper submenu -->
                <li v-if="subItem.submenu && subItem.submenu.length">
                  <a class="d-flex align-items-center justify-content-between"
                    :class="{ 'current-nav-parent-link': isSubMenuActive(subItem.submenu) }"
                    @click.prevent="toggleNestedSubMenu(item, subIndex)">
                    <span class="mx-2">
                      <i :class="subItem.icon"></i>
                      <span class="mx-2">{{ subItem.label }}</span>
                    </span>
                    <i :class="subItem.active ? 'fa fa-chevron-down' : 'fa fa-chevron-right'"
                      class="fa fa-chevron-down m-2 fs-7" style="color: black; cursor: pointer !important"></i>
                  </a>

                  <ul class="nav flex-column ms-4" style="list-style-type: none;" v-show="subItem.active">
                    <li v-for="(child, childIndex) in subItem.submenu" :key="childIndex"
                      :class="{ 'current-nav': $route.path === child.href }">
                      <router-link :to="child.href" class="d-flex align-items-center">
                        <span class="mx-2"><i :class="child.icon"></i></span>
                        <span class="mx-2">{{ child.label }}</span>
                      </router-link>
                    </li>
                  </ul>
                </li>

                <!-- Normal submenu link -->
                <li v-else :class="{ 'current-nav': $route.path === subItem.href }">
                  <router-link :to="subItem.href" class="d-flex align-items-center">
                    <span class="mx-2"><i :class="subItem.icon"></i></span>
                    <span class="mx-2">{{ subItem.label }}</span>
                  </router-link>
                </li>
              </template>
            </ul>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>



<script>
import logo from "@/assets/img/CLIC-Red-Logo .png";
export default {
  data() {
    return {
      logo,
      // sidebarOpen: true,
      // defaultSidebarOpen:true,       
      menuItems: [
        {
          label: 'Dashboard',
          icon: 'fa fa-dashboard ',
          active: false,
          href: '/dashboard'
        },
        {
          href: '/sales',
          label: 'Sales',
          icon: 'fa fa-shopping-cart',
          active: false,
          submenu: [
            {
              href: '/leads-list', label: 'Leads', icon: 'fas fa-hands-helping ',
              submenu: [

                {
                  href: '/leads-list/Client',
                  label: 'Client',
                  icon: 'fa fa-user'
                },
                {
                  href: '/leads-list/advisorLead',
                  label: 'Advisor',
                  icon: 'fa fa-user-tie'
                },
              ]
            },
            { href: '/deals-list', label: 'Deals', icon: 'fa fa-cubes ' }
          ]
        },
        {
          label: 'Contacts',
          icon: 'fa fa-users ',
          active: false,
          submenu: [
            { href: '/advisorslist', label: 'Advisor', icon: 'fa fa-braille' },
            { href: '/contactlist', label: 'Clients', icon: 'fa fa-user-circle' }
          ]
        },
        { label: 'Policies', href: '/policylistins', icon: 'fas fa-seedling', active: false, },
        {
          label: 'Finance', href: '/finance', icon: 'fa fa-coins me-1',
          active: false,
          submenu: [
            { href: '/insurancepartnerlist', label: 'Ins. Partners', icon: 'fa fa-th-list' },
            { href: '/partners-contacts-list', label: "Partner''s Contact'", icon: 'fa fa-podcast' },
            { href: '/Vendors-list', label: "Vendor", icon: 'fa fa-crosshairs' },
            { href: '/refferallist', label: "Referrals", icon: 'fas fa-users-cog' }
          ]
        },
        { href: '/offering-list', label: 'Offerings', icon: 'fa fa-gift' },
        { href: '/locationlist', label: 'Locations', icon: 'fa fa-map-signs' },
        { href: '/religionslist', label: 'Religions', icon: 'fa fa-synagogue' },
        { href: '/credential-list', label: 'Advisor Credentials', icon: 'fa fa-key' }
      ]
    };
  },
  methods: {


    isSubMenuActive(submenu) {
      return submenu.some(item =>
        this.isRouteActive(item?.href) ||
        (item.submenu && this.isSubMenuActive(item?.submenu))
      )
    },

    toggleNestedSubMenu(parentItem, subIndex) {
      const sub = parentItem.submenu[subIndex]
      sub.active = !sub.active
    },
    toggleToggled2() {
      this.$el.querySelector('#wrapper').classList.toggle('toggled-2');
      this.$el.querySelectorAll('#menu ul').forEach(ul => ul.style.display = 'none');
    },
    // toggleSidebar() {
    //   this.sidebarOpen = !this.sidebarOpen;
    // },
    toggleSubMenu(index) {
      this.menuItems.forEach((item, idx) => {
        if (idx === index) {
          item.active = !item.active;
        } else {
          item.active = false;
        }
      });
    },
    // NEW: Check if current route matches the item
    isRouteActive(href) {
      return this.$route.path === href;
    },

    //  NEW: Check if any submenu matches current route
    // isSubMenuActive(submenu) {
    //   return submenu?.some(sub => this.isRouteActive(sub.href)) ?? false;
    // }
  },

  mounted() {
    // You can perform any additional initialization here
  },
  // New: Auto-highlight parent & submenu on page load
  created() {
    this.menuItems.forEach(item => {
      if (item.href && this.isRouteActive(item.href)) {
        item.active = true;
      }
      if (item.submenu && this.isSubMenuActive(item.submenu)) {
        item.active = true;
      }
    });
  },
};
</script>

<style scoped>
/* Toggle Styles */
/* NEW: Submenu active (light green) */

.current-nav {
  background-color: rgba(203, 202, 218, 0.807);
}

/* NEW: Parent active (light blue) */
.current-nav-parent-link {
  background-color: #E1EFF0;
  color: #000 !important;
}

.nav-pills>li>a {
  border-radius: 0;
}

#wrapper {
  padding-left: 0;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
  overflow: hidden;
}

#wrapper.toggled {
  padding-left: -200px;
  overflow: hidden;
}

#sidebar-wrapper {

  height: 100%;
  overflow-y: auto;
  background: #fff;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

#wrapper.toggled #sidebar-wrapper {
  width: 200px;
}

#page-content-wrapper {
  padding: 15px;
  width: 100%;
  overflow-x: hidden;
}

.xyz {
  min-width: 360px;
}

#wrapper.toggled #page-content-wrapper {

  margin-right: 0px;
}

.fixed-brand {
  width: auto;
}

/* Sidebar Styles */

.sidebar-nav {
  top: 0;
  width: 200px;
  margin: 0;
  padding: 0;
  list-style: none;
  margin-top: 2px;
}

.sidebar-nav li {
  line-height: 40px;
}

.sidebar-nav li a {
  display: block;
  text-decoration: none;
  color: #323338;
}

.sidebar-nav li a:hover {
  text-decoration: none;
  color: #323338;
  background: #DCDFEC;
}

.sidebar-nav li a:active,
.sidebar-nav li a:focus {
  text-decoration: none;
}

.sidebar-nav>.sidebar-brand {
  height: 65px;
  font-size: 18px;
  line-height: 60px;
}

.sidebar-nav>.sidebar-brand a {
  color: #323338;
}

.sidebar-nav>.sidebar-brand a:hover {
  color: #323338;
  background: none;
}

.no-margin {
  margin: 0;
}

#wrapper {}

.fixed-brand {
  width: 200px;
}

#wrapper.toggled {
  padding-left: 0;
}

#sidebar-wrapper {
  width: 200px;
}

#wrapper.toggled #sidebar-wrapper {
  width: 200px;
}

#wrapper.toggled-2 #sidebar-wrapper {
  width: 50px;
}

#wrapper.toggled-2 #sidebar-wrapper:hover {
  width: 200px;
}

#page-content-wrapper {
  padding: 20px;

  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

#wrapper.toggled #page-content-wrapper {

  margin-right: 0;
  padding-left: 200px;
}

#wrapper.toggled-2 #page-content-wrapper {

  margin-right: 0;
  margin-left: -200px;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
  width: auto;
}

#wrapper::-webkit-scrollbar {
  display: none;
}

#sidebar-wrapper::-webkit-scrollbar {
  display: none;
}

/* #sidebar-wrapper:hover{
   width:200px !important;
  } */
</style>