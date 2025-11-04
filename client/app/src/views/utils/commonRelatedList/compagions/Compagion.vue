<template>
  <div>
    <CampaignDrawer :is-open="isDrawerOpen" :speed="500" @close="closeDrawer" />
    <div class="row">
      <div class="d-flex justify-content-between align-items-center">
        <div class="search-container-div col-lg-10 col-md-10 col-sm-12">
          <div class="search-container">
            <input class="search-input" type="search" placeholder="Search" aria-label="Search">
            <i class="fas fa-search" aria-hidden="true" ></i>
          </div>
        </div>

        <div class="button">
          <button class="btn companagion-button px-2 py-1 mt-3" @click="toggleDrawer">Add New</button>
        </div>

        <!-- <button class = "btn btn-danger" >tets</button> -->
      </div>
      <div class="border  overflow: scroll custom-scroll px-0">
        <table class="table table-striped custom-scroll">
          <thead>
            <tr>
              <td scope="col"> <input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value="">
              </td>
              <td scope="col" class="color fw-semibold">Type</td>
              <td scope="col" class="color fw-semibold"> Status</td>
              <td scope="col" class="color fw-semibold">Start Date</td>
              <td scope="col" class="color fw-semibold"> End Date</td>
              <td scope="col" class="color fw-semibold"> Expected Revenue</td>
              <td scope="col" class="color fw-semibold"> Campaign Subject</td>
              <td scope="col" class="color fw-semibold"> Sender Name</td>
              <td scope="col" class="color fw-semibold"> Sender Address</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row"><input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value=""></td>
              <td>Google </td>
              <td class="truncate">(ON)#3 Performance Max-Super Visa-2024-2:30PM-11 cjdssbkjmkmjgkjregjre ggkjghjgh</td>
              <td>@mdo</td>
              <td>end date</td>
              <td>revenue</td>
              <td>subject</td>
              <td>name</td>
              <td>address</td>
              <td style="border-top: 1px solid #e9e5e5;"></td>
            </tr>
            <tr>
              <th scope="row"><input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value=""></th>
              <td>Google</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>

            </tr>
            <tr>
              <td scope="row"><input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value=""></td>
              <td colspan="2">Google</td>
              <td>start date</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td scope="row"><input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value=""></td>
              <td>Google </td>
              <td class="truncate">(ON)#3 Performance Max-Super Visa-2024-2:30PM-11</td>
              <td>@mdo</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td scope="row"><input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value=""></td>
              <td>Google </td>
              <td class="truncate">(ON)#3 Performance Max-Super Visa-2024-2:30PM-11</td>
              <td>@mdo</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
import CampaignDrawer from './CampaignDrawer.vue';
export default {
  data() {
    return {
      isPopupOpen: reactive(false),
      isDrawerOpen: false
    }
  },
  components: {
    CampaignDrawer
  },
  methods: {
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
      console.log("I am clicked ", this.isDrawerOpen)
    },
    closeDrawer() {
      this.isDrawerOpen = false;
    },
    changeMessage() {
      this.message = 'You have clicked the button!';
    },
    openPopup() {
      this.isPopupOpen = !this.isPopupOpen
    }
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
  /* position: relative; */
  top: 55%;
  right: 20px;
  /* transform: translateY(-50%); */
  color: #666;
  margin-left: -20px;
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
