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
  
      <!-- popup div -->
      <!-- <div v-if = "isPopupOpen" :style= "{position: 'absolute', top: '27%', left: '80%'}">
          <input placeholder= "text"><br/>
          <input placeholder = "tetx2"><br/>
          <input placeholder ="text3">
          <input laceholder= "text4">
     </div> -->
        <!-- popup div ends-->
         
    </div>
   <div class="border  overflow: scroll custom-scroll px-0 mt-3">
    <table class="table table table-striped custom-scroll">
    <thead>
      <tr>
        <th scope="col" >  <input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value=""   >
        </th>  
        <td scope="col" class="color fw-semibold">Start Time</td>
        <td scope="col" class="color fw-semibold">End Time</td>
        <td scope="col" class="color fw-semibold">Recording Size</td>
        <td scope="col" class="color fw-semibold">Format</td>
        </tr>
    </thead>
    <tbody>
     <tr>
        <td scope="row"><input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value=""></td>
       <td>2024-09-30T14:00:00Z</td>
       <td>2024-09-30T15:00:00Z</td>
       <td>1050000000</td>
       <td>mp4</td>
     </tr>
     <tr>
        <td scope="row"><input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value=""></td>
       <td>2024-09-30T14:00:00Z</td>
       <td>2024-09-30T15:00:00Z</td>
       <td>1050000000</td>
       <td>mp4</td>
     </tr>
     <tr>
        <td scope="row"><input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value=""></td>
       <td>2024-09-30T14:00:00Z</td>
       <td>2024-09-30T15:00:00Z</td>
       <td>1050000000</td>
       <td>mp4</td>
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
  
  
  
  
  
   
  
  
  
  
  
  
  