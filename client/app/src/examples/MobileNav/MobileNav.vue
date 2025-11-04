
<template>
  <div className="card d-flex align-items-center justify-content-center fixed-box nav-position rounded-pill table-responsive-sm " style=" height:11vh; background-color:white; width:100%;  margin-bottom:0px; border:1px solid #184e88;  padding:0px;position:fixed;bottom:0px ">
<div className="table-responsive">
  <table class="p-4" style="width:100%;overflow-x: scroll;">
        <tr style="height: 80px;">
          <!-- Sales start -->
            <td v-if="activeTab === 'sales'">
                <div class="iconn-div">  
                    <div style="background-color: #184e88; height: 26px; align-content: center; border-radius: 10px; color: white; margin-left: 10px;">
                    <span class="ml-2 p-3" @click="handleTopBar">Sales</span>               
              </div>
                </div>
                <div
      v-if="showTopBar"
      class="position-absolute bottom-100 start-0 d-flex rounded-top-4 bg-white w-100 p-3"
      style="box-shadow: 2px -2px 10px rgba(0, 0, 0, 0.2); overflow-x: scroll;"
    >
    <router-link to="/leads-list">
  <div class="tab bar-tab" @click="handleTopBar"><b>Leads</b></div>
</router-link>
<router-link to="/deals-list">
  <div class="tab bar-tab" @click="handleTopBar"><b>Deals</b></div>
</router-link>
    </div>
            </td>
            <td v-else style=" color: rgb(187, 184, 184);">
              <div class="icon-div">
                <i class="fa-solid fa-cart-shopping fa-xl icon" @click="toggleTab('sales')"></i>
            </div>          
           </td>
            <!-- Sales end -->
            <!-- Contacts start -->
            <td  v-if="activeTab === 'contact'">
                <div class="iconn-div">  
                    <div style="background-color: #184e88; height: 30px; align-content: center; border-radius: 10px; color: white; ">
                    <span class="p-3"  @click="handleTopBar"> Contacts</span>               
                    </div>
                </div>
             
                <div   v-if="showTopBar" class="position-absolute bottom-100 start-0 d-flex  rounded-top-4 bg-white w-100 p-3" 
                style="box-shadow: 2px -2px 10px rgba(0, 0, 0, 0.2);overflow-x: scroll;">
                <router-link to="/advisorslist">
                <div class="tab ps-3 pe-3 bar-tab "  @click="handleTopBar"><b>Advisor</b></div>
                </router-link>
                <router-link to="/contactlist">
                <div class="tab ps-3 pe-3 bar-tab "  @click="handleTopBar"><b>Clients</b></div>
             </router-link>
              </div>
            </td>
            <td v-else style=" color: rgb(187, 184, 184)" >
                <div class="icon-div">
                <i class="fa-solid fa-users fa-xl icon" @click="toggleTab('contact')"></i>
                </div>
            </td>
              <!-- Contacts end -->
              <!-- Policy starts -->

            <td  v-if="activeTab === 'policy'">
              <router-link to="/policylistins" style="color:white">
                <div class="iconn-div">
                  <router-link to="/policylistins" style="color:white">
                    <div style="background-color: #184e88; height: 30px; align-content: center; border-radius: 10px; color: white; ">
                      <span class="ml-2 p-3" style=""> Policy</span>                 
              </div> 
              </router-link>
            </div>
          </router-link>

            </td>
            <td v-else style=" color: rgb(187, 184, 184)" >
              <router-link to="/policylistins">
                <div class="icon-div">
                <i class="fa-solid fa-seedling fa-xl icon" @click="toggleTab('policy')"></i>
                </div>
            </router-link>
            </td>
              <!-- Policy end -->
              <!-- Finance start -->
            <td  v-if="activeTab === 'Finance'">
                <div class="iconn-div"> 
                    <div style="background-color: #184e88; height: 30px; align-content: center; border-radius: 10px; color: white; ">
                    <span class="ml-2 p-3"  @click="handleTopBar"> Finance</span>               
              </div>
             </div>
              
             <div   v-if="showTopBar" class="position-absolute bottom-100 start-0 d-flex  rounded-top-4 bg-white w-100 p-3 " 
             style="box-shadow: 2px -2px 10px rgba(0, 0, 0, 0.2);overflow-x: scroll;">
             <router-link to="/insurancepartnerlist">
              <div class="tab p-2  bar-tab "  @click="handleTopBar"> <b>Partners</b></div>
             </router-link>
             <router-link to="/partners-contacts-list">
              <div class="tab p-2  bar-tab "  @click="handleTopBar"><b>Contact</b></div>
             </router-link>
             <router-link to="/Vendors-list">
              <div class="tab p-2  bar-tab "  @click="handleTopBar"><b>Vendors</b></div>
             </router-link>
             <router-link to="/refferallist">
              <div class="tab p-2  bar-tab "  @click="handleTopBar"><b>Referrals</b></div>
             </router-link>
             <router-link to="/refferallt">
              <div class="tab p-2  bar-tab "  @click="handleTopBar"><b>Referrals</b></div>
             </router-link>
             <router-link to="/refferaist">
              <div class="tab p-2  bar-tab " @click="handleTopBar"><b>Referrals</b></div>
             </router-link>

              </div>
            </td>
            <td v-else style=" color: rgb(187, 184, 184)" >
              <!-- <router-link to="/sales"> -->
                <div class="icon-div">

                <i class="fa-solid fa-coins fa-xl icon" @click="toggleTab('Finance')"></i>
            <!-- </router-link> -->
             </div>
            </td>
            <!-- Finance end -->
             <!-- Offerings start -->
            <td  v-if="activeTab === 'Offerings'">
                <div class="iconn-div">  
                  <router-link to="/offering-list">
                    <div style="background-color: #184e88; height: 30px; align-content: center; border-radius: 10px; color: white; ">
                    <span class="ml-2 p-3 pt-2" > Offerings</span>               
              </div>
              </router-link>
                </div>            
            </td>
            <td v-else style=" color: rgb(187, 184, 184)" >
              <router-link to="/offering-list">
                <div class="icon-div">              
                <i class="fa-solid fa-gift fa-xl icon" @click="toggleTab('Offerings')"></i>
                </div>
              </router-link>
              </td>
            <!-- Offering end -->
            <!-- locations start -->
            <td  v-if="activeTab === 'location'">
                <div class="iconn-div">  
                  <router-link to="/locationlist">
                    <div style="background-color: #184e88; height: 30px; align-content: center; border-radius: 10px; color: white; ">
                    <span class="ml-2 p-3 pt-2" >Locations</span>               
                   </div>
                 </router-link>
                </div>
            </td>
            <td v-else style=" color: rgb(187, 184, 184)" >
              <router-link to="/locationlist">
                <div class="icon-div">
                <i class="fa-solid fa-map-signs fa-xl icon" @click="toggleTab('location')"></i>
              </div>
              </router-link>
            
            </td>
            <!-- locations end -->
              <!-- advisor credential start -->
            <td  v-if="activeTab === 'advisor'">
                <div class="iconn-div">  
                  <router-link to="/credential-list">
                    <div style="background-color: #184e88; height: 30px; align-content: center; border-radius: 10px; color: white; ">
                    <span class="ml-2 p-3 pt-2" >credential</span>               
                   </div>
                 </router-link>
                </div>
            </td>
            <td v-else style=" color: rgb(187, 184, 184)" >
              <router-link to="/credential-list">
                <div class="icon-div">
               <i class="fa-solid fa-key fa-xl icon" @click="toggleTab('advisor')"></i>
              </div>
            </router-link> 
           
            </td>
            <!-- advisor credential end -->
           <!-- locations start -->
           <td  v-if="activeTab === ''">
                <div class="iconn-div">  
                  <router-link to="/locationlist">
                    <div style="background-color: #184e88; height: 30px; align-content: center; border-radius: 10px; color: white; ">
                    <span class="ml-2 p-3 pt-2" >Locations</span>               
                   </div>
                 </router-link>
                </div>
            </td>
            <td v-else style=" color: rgb(187, 184, 184)" >
              <router-link to="/locationlist">
                <div class="icon-div">
                <i class="fa-solid fa-map-signs fa-xl icon" @click="toggleTab('location')"></i>
              </div>
              </router-link>
            
            </td>
            <!-- locations end -->
          
           
        </tr>
       </table>
</div>
      </div>
    </template>

    <script>
    import {ref,watch} from 'vue';
    import { useRoute } from 'vue-router';
export default{
    name:'MobileNav',
    data(){
        return{
            activeTab:null, //track to active null
            showTopBar:true,
        }
    },
    setup(){
        const route=useRoute();
        const currentPath= ref(route.path);
        watch(()=>route.path,(newPath)=>{
            currentPath.value=newPath;
        });

        return{
            currentPath,
        }
    },
    methods:{
        toggleTab(tab) {
      // Toggle the clicked tab by checking if it is already active
      if (this.activeTab === tab) {
        this.activeTab = '/dashboard'; 
        this.showTopBar=true; // Close the tab if it is already open
      } else {
        this.activeTab = tab; 
        this.showTopBar=true;  // Open the clicked tab
      }
    },
    handleTopBar(){
      setTimeout(() => {
        this.showTopBar=!this.showTopBar;
      }, 500);
    }
},
};

</script>
    <style scoped>
   .box{ 
    background-color: #184e88;
    color:white; 
   }
   .icon-div{
    width: 46px;
    height: 85px;
    display: flex;
    justify-content: center;
    align-items: center
   }
   .iconn-div{
    width: 100%;
    height: 85px;
    display: flex;
   
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
   }
   .icon{
    color:#184e88;
   }
   .bar-tab{
    height: 30px; 
    align-content: center;
    color: #184e88;
     vertical-align: middle;
     margin:3px;
     text-align: center;
     padding-inline: 7px;
     
   }
   .bar-tab:hover{
    background-color:#DEDEDE ;
    border-radius: 10px;
   }
   .pt{
    padding-top: 9px;
   }
  /* lead list in mobile  */
/* Add your styles here */
.tophead {
    background-color: white;
    padding-top: 20px;
    padding-bottom: 10px;
}

.lead-mobile-container {
    height: 80vh;
    overflow-y: scroll;
}

.leadCard {
    background-color: white;
}

.lead-heading {
    font-size: 16px;
    color: #8b8b8b;
    font-family: sans-serif;
}

.lead-desc {
    font-size: 16px;
    color: #312867;
    font-family: sans-serif;
}

.lead-table {
    width: 100%;
    border-collapse: collapse;
}

.lead-table td {
    width: 50%;
    border: 1px solid #abaaaa;
}

.lead-check-in-btn {
    border: 2px solid #184e88;
    color: #312867;
    width: 100%;
    border-radius: 10px;
    padding: 5px;
}

.lead-check-out-btn {
    border: 2px solid #184e88;
    color: #312867;
    width: 100%;
    border-radius: 10px;
    padding: 5px;
}

/* #f5f5f5' */
.selected-tab {
    color: #ff176b;
    border-bottom: 1px solid #184e88;
    border: none;
    text-decoration: underline;
    text-underline-offset: 10px;
    background-color: transparent;
}

.lead-create-btn {
    position: fixed;
    bottom: 25%;
    left: 83%;
    /* height: 50px; */
    padding: 10px 10px;
    border-radius: 100%;
    background-color: #ff176b !important;
}

.create-btn:hover {
    box-shadow: 0 0 20px rgba(255, 23, 107, 0.8);
    /* Glowing effect */
}
    </style>