<template>
  <!-- table start -->
  <div class="d-flex justify-content-between align-items-center">
    <div class="search-container-div col-lg-10 col-md-10 col-sm-12">
      <div class="search-container">
        <input class="search-input" type="search" placeholder="Search" aria-label="Search">
        <i class="fas fa-search" aria-hidden="true"></i>
      </div>
    </div>
    <div class="button">
      <router-link :to="{ path: '/leads-form', query: { leadId: leadId } }">
        <button class="btn companagion-button px-2 py-1 mt-3" >Add New</button>
      </router-link>
    </div>
  </div>

  <!-- pop up start -->
  <div class="card" :style="{ width: '50%', padding: '20px' }" v-if="isPopupOpen">
    <div class="header d-flex justify-content-between">
      <div>
        <h4>Create Insurance</h4>
      </div>
      <div>
        <i class="fa-solid fa-x" @click="openPopup" style="cursor: pointer"></i>
      </div>
    </div>
    <div class="upper d-flex" :style="{ alignItems: 'center' }">

      <div>Layout</div>
      <div :style="{ width: '120px', marginLeft: '10px' }">
        <select class="form-select" id="exampleSelect">
          <option selected>Standard</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
      </div>

    </div>
    <table class="table-row-spacing">
      <tr>
        <td :style="{ textAlign: 'right', paddingRight: '10px' }">FirstName</td>
        <td> <input type="text" class="form-control"> </td>
      </tr>
      <tr>
        <td :style="{ textAlign: 'right', paddingRight: '10px' }" class="row-spacing">LastName</td>
        <td> <input type="text" class="form-control"> </td>
      </tr>
      <tr>
        <td :style="{ textAlign: 'right', paddingRight: '10px' }">Email</td>
        <td> <input type="email" class="form-control"> </td>


      </tr>
      <tr>
        <td :style="{ textAlign: 'right', paddingRight: '10px' }">Potential Business (Policy Values) &nbsp; <i
            class="fa-solid fa-circle-info"></i></td>

        <td>
          <div class="input-group">

            <input type="text" class="form-control">
            <span class="input-group-text" id="basic-addon1" :style="{ backgroundColor: '#f0f4ff' }">
              <i class="fa-solid fa-circle-info"></i>
            </span>
          </div>
        </td>



      </tr>
      <tr>
        <td :style="{ textAlign: 'right', paddingRight: '10px' }">Gender</td>
        <td>
          <select class="form-select" id="exampleSelect">
            <option selected>Male</option>
            <option value="1">Female</option>

          </select>
        </td>
      </tr>
      <tr>
        <td :style="{ textAlign: 'right', paddingRight: '10px' }">Assigned Advisor &nbsp; <i
            class="fa-solid fa-circle-info"></i></td>
        <td>
          <div class="input-group ">

            <input type="text" class="form-control">
            <span class="input-group-text" id="basic-addon1" :style="{ backgroundColor: '#f0f4ff' }">
              <i class="fas fa-user"></i>
            </span>
          </div>
        </td>

      </tr>
      <tr>
        <td :style="{ textAlign: 'right', paddingRight: '10px' }">Insurance Lead Satus</td>
        <td>
          <div class="outer-div">
            <span class="circle ps-2"></span>
            <select class="form-select" id="exampleSelect" :style="{ border: 'none' }">
              <option selected>Not Contacted</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
          </div>

        </td>
      </tr>
      <tr>
        <td :style="{ textAlign: 'right', paddingRight: '10px' }">Product Category Referred</td>
        <td>
          <select class="form-select" id="exampleSelect">
            <option selected>-None</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
        </td>
      </tr>
      <tr>
        <td :style="{ textAlign: 'right', paddingRight: '10px' }">Cost Per Lead(CPL)</td>
        <td>
          <div class="input-group">

            <input type="text" class="form-control">
            <span class="input-group-text" id="basic-addon1" :style="{ backgroundColor: '#f0f4ff' }">
              <i class="fa-solid fa-circle-info"></i> </span>
          </div>
        </td>

      </tr>
      <tr>
        <td></td>
        <td>
          <div class="d-flex justify-content-center">
            <button class="btn me-3"
              :style="{ backgroundColor: '#f4f6fa', color: 'gray', border: '1px solid #cbcbcd' }">Cancel</button>
            <!-- Example split danger button -->
            <div class="btn-group">
              <button type="button" class="btn btn-primary ms-3 "
                :style="{ backgroundColor: '#0092f7', width: '190px' }">Save and Associate</button>
              <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" :style="{ backgroundColor: '#0092f7' }">
                <span class="sr-only">Toggle Dropdown</span>
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Save and Associate</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Separated link</a>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
  <!-- pop up end -->

  <div class="table-border">
    <table class="table table-striped ">
      <thead>
        <tr>
          <td scope="col"> <input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value="">
          </td>
          <td scope="col" class="heading-color">Created Time</td>
          <td scope="col" class="heading-color">Insurance Lead Name</td>
          <td scope="col" class="heading-color">Number of Contract Attempts.</td>
          <td scope="col" class="heading-color">Call Details</td>
          <td scope="col" class="heading-color">Insurance Lead Status</td>
          <td scope="col" class="heading-color">Lead Status Stage</td>
          <td scope="col" class="heading-color">Email</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td scope="col"> <input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value="">
          </td>
          <td>3:00</td>
          <td>sanjeev kumar</td>
          <td></td>
          <td>Out:0,in:0</td>
          <td><button class="btn btn-danger rounded-pill btn-formating" :style="{ padding: '0.3em 0.7em' }">Not
              Contracted</button></td>
          <td><button class="btn btn-danger rounded-pill" :style="{ padding: '0.3em 0.7em' }">Not Contracted</button></td>
          <td>sanjeev@gmail.com</td>
        </tr>
        <tr>
          <td scope="col"> <input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value="">
          </td>
          <td>3:00</td>
          <td>sanjeev kumar</td>
          <td></td>
          <td>Out:0,in:0</td>
          <td><button class="btn btn-danger rounded-pill" :style="{ padding: '0.3em 0.7em' }">Not Contracted</button></td>
          <td><button class="btn btn-danger rounded-pill" :style="{ padding: '0.3em 0.7em' }">Not Contracted</button></td>
          <td>sanjeev@gmail.com</td>
        </tr>
        <tr>
          <td scope="col"> <input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value="">
          </td>
          <td>3:00</td>
          <td>sanjeev kumar</td>
          <td></td>
          <td>Out:0,in:0</td>
          <td><button class="btn btn-danger rounded-pill" :style="{ padding: '0.3em 0.7em' }">Not Contracted</button></td>
          <td><button class="btn btn-danger rounded-pill" :style="{ padding: '0.3em 0.7em' }">Not Contracted</button></td>
          <td>sanjeev@gmail.com</td>
        </tr>

      </tbody>
    </table>
  </div>

  <!-- table ends here -->

</template>

<script>
import { reactive } from 'vue';
export default {
  props: {
    leadId: {
      type: String
    }
  },
  data() {
    return {
      isPopupOpen: reactive(false)
    }
  },
  methods: {
    changeMessage() {
      this.message = 'You have clicked the button!';
    },
    openPopup() {
      this.isPopupOpen = !this.isPopupOpen
    }
  },
  mounted() {
    console.log('lead id mounted', this.leadId);
  }
}
</script>

<style scoped>
.heading-color {
  color: #323338;
  font-weight: 600;
}

.input-box {
  border: 1px solid gray;
}

.lower-header {
  display: flex;
  justify-content: space-between;
}

.lead-btn {
  background-color: var(white) !important;
  color: var(--blue-color) !important;
  border: 1px solid var(--blue-color) !important;
  border-radius: 5px !important;
}

.lead-btn:hover {
  background-color: var(--blue-color) !important;
  border-radius: 7px;
  color: white !important;
  letter-spacing: -0.025rem;
  font-weight: 550;
  box-shadow: 2px 2px 2px 2px #e0e0e3;
}


.table-border {
  border: 1px solid #dee2e6 !important;
  border-radius: 5px !important;
  scrollbar-width: none;
  overflow: scroll;
}

.table {
  font-size: 15px;
  font-weight: 500;
}

.table-responsive {
  overflow-x: auto;
}

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

.table-row-spacing {
  border-collapse: separate;
  border-spacing: 0 15px;
}

.upper div {
  color: gray;
  padding: 2px;
}

.circle {
  height: 20px;
  display: block;
  width: 20px;
  background-color: red;
  border-radius: 50%;
}

.outer-div {
  display: flex;
  align-items: center;
  border: 1px solid #dfe2e5;
  border-radius: 10px;
  padding-left: 7px;
}

.card {
  position: absolute;
  z-index: 1000;
  top: 8%;
  left: 25%;
  border-radius: 10px;
}

.compagion-checkbox {
  height: 15px;
  width: 15px
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
</style>