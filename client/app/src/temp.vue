<script>
import { SidebarMenu } from 'vue-sidebar-menu';
import { putUrl } from "../../boot/axios";
import { verifyUser } from "../../verifyUser/verifyUser";
import { reactive } from 'vue';
// import { json } from 'express';
// import router from "../../router/index.js";
const menuObject ={
              dashboard:{ href: '/dashboard', title: 'Dashboard', icon: 'fas fa-tachometer-alt' },
              contact:{ href: '/contactlist', title: 'Contacts', icon: 'fas fa-id-badge' },
              partner:{ href: '/insurancepartnerlist', title: 'Partners', icon: 'fas fa-hands-helping'},
              refferel:{ href: '/refferallist', title: 'Refferals', icon: 'fas fa-project-diagram' },
              advisor:{ href: '/advisorslist', title: 'Advisors', icon: 'fas fa-people-arrows' },
              location:{ href: '/locationlist', title: 'Locations', icon: 'fas fa-map-signs' },
              policy:{ href: '/policylistins', title: 'Policies', icon: 'fas fa-seedling' },
              offering:{ href: '/offering-list', title: 'Offerings', icon: 'fas fa-dolly' },
              profile:{ href: '/profile', title: 'Profile', icon: 'fas fa-user-cog' },
              users:{ href: '/userslist', title: 'Users', icon: 'fas fa-users-cog'},
              userRole:{ href: '/users-role-list', title: 'Users Roles', icon: 'fas fa-users-cog'},
              userPermissions:{ href: '/users-permission', title: 'permissions', icon: 'fas fa-users-cog'}
            }
export default {
  components: {
    SidebarMenu
  },

  data() {
    return reactive({
      menu: [
      { href: '/dashboard', title: 'Dashboard', icon: 'fas fa-tachometer-alt' }
      ],
      array: [],
      verified: false
    });
  },

  async beforeMount() {
    this.verified = await verifyUser()
    if (!this.verified) {
      // router.push('/signin')
    }
    this.fetchDataFromServer();
  },

  mounted() {
    this.removeEle('.vsm--toggle-btn');
  },

  methods: {
    removeEle(cName) {
      const ele = document.querySelector(cName);
      if (ele) {
        ele.parentNode.removeChild(ele);
      }
    },

    // Fetching user data from the server to check user role
    async fetchDataFromServer() {
      try {
        const userEmail = localStorage.getItem('userEmail');
        const response = await fetch(`${putUrl}usersFunction/app/get-auth-data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userEmail: userEmail })
        });
        const data = await response.json();
        console.log(data)
        // save data in local storage
        localStorage.setItem('permissions', data.response[0].appUsersRole.permmisions)
        localStorage.setItem('userId', data.response[0].userData.ROWID)
        localStorage.setItem('roleId', data.response[0].userData.role)
        console.log(data.success, this.verified)
        // check in verified or not
        if (data.success && this.verified) {
         
          // console.log("data.response[0].appUsersRole.permmisions",data.response[0].appUsersRole.permmisions)
          const permissionsArray = JSON.parse(data.response[0].appUsersRole.permmisions);
                   console.log(permissionsArray)
          if (Array.isArray(permissionsArray)) {
            
          permissionsArray.forEach((item)=>{
            if (item.module_access === true) {
               this.menu.push(menuObject[item.moduleName])
            }
          })
          } else {
            console.error('permissionsArray is not an array.');
          }      
          this.menu.push({ href: '/users-permission', title: 'Role', icon: 'fas fa-users-cog'},{ href: '/users-role-list', title: 'Permissions', icon: 'fas fa-users-cog'},{ href: '/profile', title: 'Profile', icon: 'fas fa-user-cog' })
        } else {
          this.menu = [
            {
              href: '/signin',
              title: 'Sign In',
              icon: 'fas fa-sign-in-alt'
            },
          ];
          console.log(data.message);
          // router.push('/signin')
        }
      } catch (error) {
        console.log('Error fetching data from server:', error);
      }
    }
  }
}
</script>