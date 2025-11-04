<template>
  <div>
  <div class="row">
  <div class="d-flex justify-content-between align-items-center">
    <div class="search-container-div col-lg-10 col-md-10 col-sm-12">
      <div class="search-container">
        <input class="search-input" type="search" placeholder="Search" aria-label="Search">
        <i class="fas fa-search" aria-hidden="true"></i>
      </div>
    </div>
    <div class="button">
      <router-link :to="'/refferal'">
      <button class="btn companagion-button px-2 py-1 mt-3" @click="openPopup">Add New</button>
      </router-link>
    </div> 
  
    <!-- popup div -->
    <!-- <div v-if = "isPopupOpen" :style= "{position: 'absolute', top: '27%', left: '80%'}">
        <input placeholder= "text"><br/>
        <input placeholder = "tetx2"><br/>
        <input placeholder ="text3">
        <input laceholder= "text4">
    </div> -->
      <!-- popup div ends-->
        
  </div>
  <div class="border  overflow: scroll custom-scroll px-0">
  <table class="table table-striped custom-scroll">
  <thead>
    <tr>
      <td scope="col" >  <input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value=""   >
      </td>  
      <td scope="col" class="color fw-semibold">Referred By</td>
      <td scope="col" class="color fw-semibold">Year</td>
      <td scope="col" class="color fw-semibold">Referral-Leads</td>
      <td scope="col" class="color fw-semibold">Referral Made-Client</td>
      <td scope="col" class="color fw-semibold">Referral </td>
      <td scope="col" class="color fw-semibold">Referral Payout</td>
      <td scope="col" class="color fw-semibold">Created</td>
      </tr>
  </thead>
  <tbody>

<tr>
<td scope="col" >  <input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value=""   >
      </td>
  <td>Jaspreet Kaur</td>
  <td>2024</td>
  <td>Jaspreet Kaur</td>
  <td>Harman singh</td>
  <td>Harman singh</td>
  <td> Harpreet kaur</td>
  <td>January 1, 2024</td>
</tr>
<tr>
<td scope="col" >  <input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value=""   >
      </td>
  <td>Manpreet Kaur</td>
  <td>2024</td>
  <td>Manpreet Kaur</td>
  <td>Harman singh</td>
  <td>Harman singh</td>
  <td> Harpreet kaur</td>
  <td>march 1, 2024</td>
</tr>
<tr>
<td scope="col" >  <input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value=""   >
      </td>
  <td>preet Kaur</td>
  <td>2024</td>
  <td>preet Kaur</td>
  <td>Harman singh</td>
  <td>Harman singh</td>
  <td> Harpreet kaur</td>
  <td>June 1, 2025</td>
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
      export default {
        data() {
          return {
            isPopupOpen:reactive(false)     
          }
        },
        methods: {
          changeMessage() {
            this.message = 'You have clicked the button!';
          },
          openPopup(){
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
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: #666;
  }
  .color{
  color: #323338;
  }
  .compagion-checkbox{
  height: 15px;
  width: 15px
  }
  .border{
    border: 1px solid #dee2e6 !important;
    border-radius: 5px !important;
    scrollbar-width: none;
    overflow: scroll;
  }
  .table{
    font-size: 15px;
    font-weight: 500;
  }
  .table-responsive {
      overflow-x: auto; 
  }
  .btn{
    margin-bottom: 1rem;
    letter-spacing: -0.025rem;
    text-transform: none;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  }
  .companagion-button{
    background-color: var(white) !important;
    color: var(--blue-color) !important;
    border: 1px solid var(--blue-color) !important;
    border-radius: 5px !important;
  }
  .companagion-button:hover{
    background-color: var(--blue-color) !important;
    border-radius: 7px;
    color: white !important;
    letter-spacing: -0.025rem;
    font-weight: 550;
    box-shadow: 2px 2px 2px 2px #e0e0e3;
  }
  .truncate{
    max-width: 210px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  </style>
