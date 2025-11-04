<template>
   
  <div> 
    <RemoteAssistDrawer  :is-open="isDrawerOpen" :updateData="this.updateData" :fetchAdvisorCredentials="this.fetchAdvisorCredentials" :updateRemoteAssist="this.updateRemoteAssist" :selectedButton="this.selectedButton" :speed="500" @close="closeDrawer" />
    <div class="row">
      <div class="d-flex justify-content-between align-items-center">
        <div class="search-container-div col-lg-10 col-md-10 col-sm-12">
          <div class="search-container">
            <input class="search-input" type="search" placeholder="Search" aria-label="Search">
            <i class="fas fa-search" aria-hidden="true"></i>
          </div>
        </div>
        <div class="button">
          <button class="btn companagion-button px-2 py-1 mt-2" @click="toggleDrawer(),switchButton('Submit')">Add New</button>
        </div>
      </div>
      <!-- <iframe width="100%" height="150px" src="https://assist.canadianlic.com/login/embed-remote-support.jsp" frameborder="0"></iframe> -->
      <div class="border  overflow: scroll custom-scroll">
        <table class="table table-striped custom-scroll">
          <thead>
            <tr >
              <td scope="col"> <input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value="">
              </td>
              <td scope="col" class="color fw-semibold">Action</td>
              <td scope="col" class="color fw-semibold">Remote Assist Name</td>
              <td scope="col" class="color fw-semibold">Currency</td>
              <td scope="col" class="color fw-semibold">Contact</td>
              <td scope="col" class="color fw-semibold">Session ID</td>
              <td scope="col" class="color fw-semibold">Schedule ID</td>
              <td scope="col" class="color fw-semibold">Reminder</td>
              <td scope="col" class="color fw-semibold">Date and Time</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(assist, index) in paginatedAdvior" :key="index" >
              
              <td scope="col"> <input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value="">
              </td>
              <td class="text-sm">
                <!-- Dropdown for Edit and Delete -->
                <div class="dropdown list-ellipsis-drop" style="margin-left: 10px;">
                  <i class="fa-solid fa-ellipsis blue-color dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></i>

                  <ul class="dropdown-menu dropdown-menu-start" aria-labelledby="dropdownMenu2">
                    <!-- Edit Button -->
                    <li>
                      <router-link :to="`/leads-details/${assist.rowId}`">
                        <button class="dropdown-item" type="button" data-bs-toggle="tooltip"
                          data-bs-original-title="Edit" aria-hidden="true" @click="toggleDrawer(), switchButton('Update',assist.name,
                          assist.owner,assist.exchangeRate,assist.currency,assist.sessionType,assist.description,assist.reminder,assist.leadId,assist.contactId,assist.sessionId,assist.digest,assist.onDemandSession,assist.scheduleId,assist.timezonelist,assist.id)">
                          Edit
                        </button>
                      </router-link>
                    </li>

                    <!-- Delete Button -->
                    <li>
                      <button @click="confirmDelete(assist.rowId)"
                        :class="dropdown-item"
                        type="button" style="border:none; background-color:white;" data-bs-toggle="tooltip"
                          data-bs-original-title="Delete" aria-hidden="true" >
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </td> 
              <td>{{assist.name}}</td>
              <td>{{assist.currency}}</td>
              <td>{{assist.contactsName}}</td>
              <td>{{assist.sessionId}}</td>
              <td>{{assist.scheduleId}}</td>
              <td>{{assist.reminder}}</td>
              <td>{{"2024-11-12"}}</td>
            </tr>           
          </tbody>
        </table>
      </div>
    </div>
  </div>
  
</template>

<!-- script start- -->
<script>
import { reactive } from 'vue';
import RemoteAssistDrawer from './RemoteAssistDrawer.vue';
import { putUrl } from '../../../../boot/axios';
import axios from 'axios';
import Swal from "sweetalert2";
import router from "../../../../router/index.js";
export default {
  data() {
    return {
      updateData: null,
      isDrawerOpen: false,
      isPopupOpen: reactive(false),
      paginatedAdvior: [],
      selectedRows: [],
      currentPage: 1,
      limit: 10,
      selectedButton: reactive(''),
      remoteAssistId:reactive(''),
      
    }
  },
  props: ["id"],
  components: {
    RemoteAssistDrawer
  },
  methods: {
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
    },
    closeDrawer() {
      this.isDrawerOpen = false;
    },
    changeMessage() {
      this.message = 'You have clicked the button!';
    },
    openPopup() {
      this.isPopupOpen = !this.isPopupOpen
    },
    async fetchAdvisorCredentials() {
      this.isLoading = true;
      try {
        const response = await axios.post(`${putUrl}canadianlicapi/remote-assist/api/v2/getall-remote-access`, {
          params: {
            limit: this.limit,
            offset: (this.currentPage - 1) * this.limit
          }
        });
        console.log("<==Response=>", response);
        const accessData = response.data.accessResp;

    console.log("<==Pagination data=>", accessData);

    // Set the paginated data to the component's state
    this.paginatedAdvior = accessData;
        // this.totalPages = Math.ceil(response.data.totalCount / this.limit);
        // this.isLoading = false;
      } catch (error) {
        console.error('Error:', error);
        this.isLoading = false;
      }
    },
    
    switchButton(button, name, owner,exchangeRate,currency,sessionType,description,reminder,leadId,contactId,sessionId,digest,onDemandSession,scheduleId,timezonelist,id) {
            this.selectedButton = button;
            if (button === "Update") {
                this.updateData = {
                  name,
                  owner,exchangeRate,currency,sessionType,description,reminder,
                  leadId,contactId,sessionId,digest,onDemandSession,scheduleId,timezonelist,
                    id
                }
          // this.remoteAssistId=id;

            }
        },
        async confirmDelete(id) {
            this.isLoading = true;
            //const ROWID = id;
            if (confirm('Are you sure you want to delete this data ?')) {
                try {
                    const response = await axios.post(`${putUrl}canadianlicapi/remote-assist/api/v2/delete-remote-access/${id}`);
                   
                    if(response.data.success){
                      this.fetchAdvisorCredentials();
                    }
                    Swal.fire({
                timer: 2000,
                title: "<strong>Remote Access Deleted Successfully</strong>",
                icon: "success",
              });
              setTimeout(() => {
                router.push(`/leads-details/${this.$route.params.id}`);
              }, 3000);
                    this.isLoading = false;
                   // this.noteList = this.noteList.filter((note) => note.id !== ROWID);
                    return response;
                } catch (error) {
                    this.isLoading = false;
                    console.log(error);
                }
            } else {
                this.isLoading = false;
                return 0;
            }
        },
    async updateRemoteAssist(data) {
            this.isLoading = true;
            console.log({data})
            console.log("id"+this.id);

            const remoteAssistData={
              name: data.name ,
        owner: data.owner ,
       // exchangeRate: data?.exchangeRate ?? '',
       exchangeRate: data.exchangeRate ,

        currency: data.currency,
        sessionType: data.sessionType  ,
        description: data.description  ,
        // dateAndTime: data.dateAndTime  ,
        reminder: data.reminder  ,
        leadId: data.leadId  ,
        contactId: data.contactId  ,
        sessionId: data.sessionId  ,
        digest: data.digest  ,
        onDemandSession: data.onDemandSession  ,
        scheduleId: data.scheduleId  ,
        timezonelist: data.timezonelist  
            }
            try {
                const response = await axios.put(`${putUrl}canadianlicapi/remote-assist/api/v2/update-remote-access/${this.id}`,remoteAssistData);
                console.log('update0',{response})
                // const indexToUpdate = this.noteList.findIndex(note => note.id === this.noteID);
                // this.noteList[indexToUpdate].noteTitle = data.noteTitle;
                // this.noteList[indexToUpdate].description = data.noteText;
                if(response.data.success){
                  this.fetchAdvisorCredentials();
                }
                Swal.fire({
                timer: 2000,
                title: "<strong>Remote Access Updated Successfully</strong>",
                icon: "success",
              });
              setTimeout(() => {
                router.push(`/leads-details/${this.$route.params.id}`);
              }, 3000);
                this.isLoading = false;
                console.log('update',{response})
                return response;
            } catch (error) {
                this.isLoading = false;
                console.log(error);
            }
        },
  },
  mounted(){
    this.fetchAdvisorCredentials();
  }

}
</script>
<!-- script ends here  -->

<!-- style starts here -->
<style scoped>
.search-container {
  position: relative;
  display: inline-block;
}

.search-input {
  padding: 10px 40px 10px 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 250px;
  transition: border-color 0.3s ease-in-out;
}

.search-input:focus {
  outline: none;
  border-color: #8fd3f4;
}

.fa-search {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: #666;
}

.color {
  color: #323338;
}

.compagion-checkbox {
  height: 15px;
  width: 15px
}

.border {
  border: 1px solid #dee2e6 !important;
  border-radius: 5px !important;
  scrollbar-width: none;
  overflow: scroll;
  padding-left: 0px !important;
  padding-right: 0px !important;
}

.table {
  font-size: 14px;
  color: #323338 !important;
}


td {
  cursor: pointer;
}

th {
  padding: 1rem 0.5rem !important;
  cursor: pointer;
}

.table-responsive {
  overflow-x: auto;
}

.btn {
  margin-bottom: 1rem;
  letter-spacing: -0.025rem;
  text-transform: none;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.companagion-button {
  background-color: var(white) !important;
  color: var(--blue-color) !important;
  border: 1px solid var(--blue-color) !important;
  border-radius: 5px !important;
}

.companagion-button:hover {
  background-color: var(--blue-color) !important;
  border-radius: 7px;
  color: white !important;
  letter-spacing: -0.025rem;
  font-weight: 550;
  box-shadow: 2px 2px 2px 2px #e0e0e3;
}

.truncate {
  max-width: 210px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<!-- style ends here -->