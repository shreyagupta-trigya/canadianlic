<template>
    <!-- Wrapper -->
    <div id="wrapper">
      <!-- Sidebar -->
      <div   
       @mouseenter="sidebarOpen = true"          
       @mouseleave="!defaultSidebarOpen ? sidebarOpen = false : sidebarOpen = true"
       id="sidebar-wrapper" class="mx-2" style="height: 87vh;" :style="{ width: sidebarOpen ? '200px' : '34px' }">
       <div class="d-flex justify-content-between align-items-center py-2 border-bottom ">
          <i :class="sidebarOpen ? 'fa fa-chevron-left' : 'fa fa-chevron-right'" class="fa fa-chevron-left m-2 fs-5 " style="color:black; cursor:pointer !important" @click="setDefaultSidenavOpen"></i>
       </div>
     
        <ul class="sidebar-nav nav-pills nav-stacked" id="menu">
          <!-- Sidebar Items -->
          <li v-for="(item, index) in menuItems" :key="index" :class="{ active: item.active, 'current-nav': $route.path === item.href }" >
            <router-link v-if="!item.submenu" :to="item.href" >
              <a>
                {{ item.label }}
              </a>
            </router-link>
            <a class="d-flex align-items-center justify-content-between" v-else  @click.prevent="toggleSubMenu(index)">
              <span class="mx-2 " @click="toggleSubMenu(index)">
               
                <span class="mx-2">
                   {{ item.label }}
                </span>
             </span>
             <i :class="item.active ? 'fa fa-chevron-down' : 'fa fa-chevron-right'" class="fa fa-chevron-down m-2 fs-7  " style="color:black; cursor:pointer !important" ></i>
       
            </a>
            <ul class="nav-pills nav-stacked " :class="sidebarOpen ?'':'ps-0' " style="list-style-type: none;" v-show="item.active">
              <li v-for="(subItem, subIndex) in item.submenu" :class="{'current-nav': $route.path === subItem.href }" :key="subIndex">
                <router-link class="" :to="subItem.href">
                  <a class="">
                    {{ subItem.label }}
                  </a>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- Sidebar -->
    </div>
    <!-- Wrapper -->
  </template>
  
   
  <script>

export default {
  data() {
    return {
      sidebarOpen: false,
      defaultSidebarOpen: false,
      menuItems: [
        {
          label: 'Dashboard',
          active: false,
          href: '/dashboard'
        },
        {
          href: '/sales',
          label: 'Sales',
          active: false,
          submenu: [
            { href: '/leads-list', label: 'Leads', icon: 'fas fa-hands-helping' },
            { href: '/deals-list', label: 'Deals', icon: 'fa fa-cubes' }
          ]
        },
        {
          label: 'Contacts',
          icon: 'fa fa-users',
          active: false,
          submenu: [
            { href: '/advisorslist', label: 'Advisor',  },
            { href: '/contactlist', label: 'Clients', }
          ]
        },
        // Add more menu items as needed
      ]
    };
  },
  methods: {
    setDefaultSidenavOpen() {
      this.defaultSidebarOpen = !this.defaultSidebarOpen;
      this.sidebarOpen = !this.sidebarOpen;
    },
    toggleSubMenu(index) {
      this.menuItems.forEach((item, idx) => {
        if (idx === index) {
          item.active = !item.active;
        } else {
          item.active = false;
        }
      });
    }
    // Add more methods as needed
  },
  mounted() {
    // Initialization logic if needed
  }
};
</script>

   
   <style scoped>
    /* Toggle Styles */
    .current-nav {
     background-color: #D8EEFE; 
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
  
  .sidebar-nav > .sidebar-brand {
     height: 65px;
     font-size: 18px;
     line-height: 60px;
  }
  
  .sidebar-nav > .sidebar-brand a {
     color: #323338;
  }
  
  .sidebar-nav > .sidebar-brand a:hover {
     color: #323338;
     background: none;
  }
  
  .no-margin {
     margin: 0;
  }
  #wrapper {
     }
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
   #wrapper::-webkit-scrollbar{
     display: none;
   }
   #sidebar-wrapper::-webkit-scrollbar{
     display: none;
   }
   /* #sidebar-wrapper:hover{
    width:200px !important;
   } */
   </style>
   