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
        <button class="btn companagion-button px-2 py-1 mt-3" @click="openPopup">Add New</button>
      </div> 

      <!-- popup div -->     
       
              <!-- form start -->
  <div class="card" :style="{width:'50%',padding:'20px'}"  v-if="isPopupOpen"   >
     <div class="header d-flex justify-content-between">
        <div>
            <h4>Create Contact</h4>
        </div>
        <div>
            <i class="fa-solid fa-x" @click="openPopup" style="cursor: pointer"></i>
        </div>
    </div>
    <div class="upper d-flex" :style="{alignItems:'center'}">
        
        <div>Layout</div>
        <div :style="{width:'120px',marginLeft:'10px'}">
            <select class="form-select" id="exampleSelect">
                <option selected>Standard</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
            </select>
        </div>
    </div>
    <table class="table-row-spacing" >
        <tr >
        <td :style="{textAlign:'right',paddingRight:'10px'}">FirstName</td>
        <td> 
        <div class="outer-div">
           <select class="form-select btn-select " id="exampleSelect" >
                <option selected>None -</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
            </select>
        <input type="text" class="input-control" >
        </div>
        </td> 
        </tr>
        <tr >
            <td :style="{textAlign:'right',paddingRight:'10px'}" class="row-spacing">LastName</td>
            <td> <input type="text" class="form-control" >  </td>
        </tr>
        <tr >
            <td :style="{textAlign:'right',paddingRight:'10px'}">Location Name</td>
            <td>
              <div class="input-group ">
                <input type="text" class="form-control" >
                <span class="input-group-text" id="basic-addon1" :style="{backgroundColor:'#f0f4ff',paddingLeft:'22px'}">
                <i class="fas fa-search"></i>
                </span>
              </div>
            </td>
        </tr>
        <tr >
            <td :style="{textAlign:'right',paddingRight:'10px'}">Email</td>
            <td> <input type="email" class="form-control" >  </td>
        </tr>
        <tr >
            <td :style="{textAlign:'right',paddingRight:'10px'}">Phone</td>
            <td> <input type="tel" class="form-control" >  </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <div class="d-flex justify-content-center">
              <button class="btn me-3" :style="{backgroundColor:'#f4f6fa',color:'gray',border:'1px solid #cbcbcd'}">Cancel</button>
            <!-- Example split danger button -->
                <div class="btn-group">
                  <button type="button" class="btn btn-primary ms-3 " :style="{backgroundColor:'#0092f7',width:'190px'}" >Save and Associate</button>
                  <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  :style="{backgroundColor:'#0092f7'}">
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
<!-- form enf -->
           
    
        <!-- popup div ends-->


        
    </div>
   <div class="border  overflow: scroll custom-scroll">
    <table class="table table table-striped custom-scroll">
    <thead>
    <tr>
      <td scope="col" >  <input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value="" >
      </td>  
      <td scope="col" class="color fw-semibold">Lead Created On</td>
      <td scope="col" class="color fw-semibold"> Lead Converted on</td>
      <td scope="col" class="color fw-semibold">Contact Name</td>
      <td scope="col" class="color fw-semibold"> Mobile</td>
      <td scope="col" class="color fw-semibold"> Email</td>
      <td scope="col" class="color fw-semibold"> Insurance Lead Source</td>
      <td scope="col" class="color fw-semibold"> Advisor's Licence Expiry</td>
      <td scope="col" class="color fw-semibold"> Advisor</td>
      
    </tr>
    </thead>
    <tbody>
    <tr>
      <th scope="row"><input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value=""></th>
      <td>29 Aug, 2024 </td>
      <td>27 Sep, 2024</td>
      <td>@Saqib Noman</td>
      <td>+1 639-571-3766<span class="green"><i class="fa-solid fa-phone " :style="{ color: 'white', padding: '5px', fontSize: '13px' }"></i></span></td>
      <td>saqib.noman1986@hotmail.com</td>
      <td>Chat</td>
      <td>advisor</td>
      <td>text</td>
      
    </tr>
    <tr>
      <th scope="row"><input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value=""></th>
      <td>26 Sep, 2024</td>
      <td>27 Sep, 2024</td>
      <td>Hameed Sofizada</td>
      <td>+1 289-600-9491<span class="green"><i class="fa-solid fa-phone " :style="{ color: 'white', padding: '5px', fontSize: '13px' }"></i></span></td>
      <td>Sofizada_hameed@yahoo.ca</td>
      <td>Google</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th scope="row"><input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value=""></th>
      <td colspan="2">27 Sep, 2024</td>
      <td>26 Sep, 2024</td>
      <td>+1647-406-7997 <span class="green"><i class="fa-solid fa-phone " :style="{ color: 'white', padding: '5px', fontSize: '13px' }"></i></span></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
     
      
    </tr>
    <tr>
      <th scope="row"><input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value=""></th>
      <td>22 Sep, 2024 </td>
      <td>26 Sep, 2024</td>
      <td>Joubert</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
     </tr>
     <tr>
      <th scope="row"><input class="form-check-input mt-0 compagion-checkbox" type="checkbox" value=""></th>
      <td>22 Sep, 2024 </td>
      <td>26 Sep, 2024</td>
      <td>Joubert</td>
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
    .green{
        background-color: #41B232;
        display: inline-block;
        height: 23px;
        width: 22px;
        border-radius: 50%;
        margin-left: 7px;
    }
    .card{
        position: absolute;
        z-index: 1000;
        top: 14%;
        left: 25%;
       border-radius: 10px;
       background-color: white;
    }
    .table-row-spacing {
 border-collapse: separate;
 border-spacing: 0 15px;
      }
  .upper div{
    color:gray;
    padding: 2px;
  }
  .circle{
    height: 20px;
    display: block;
    width: 20px;
    background-color: red;
    border-radius: 50%;
  }
  .outer-div{
    display: flex;
    align-items: center;
    border: 1px solid #dfe2e5;
       border-radius: 10px;
       padding-left:7px;
  }
  .input-control {
      border: none !important;
      outline: none !important;
    }

    .input-control:focus {
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
    }
    .btn-select{
      border: none;
    width: 84px;
    border-radius: 0px;
    border-right: 1px solid rgb(180, 180, 180);
    border:'none';
    width:120px;
    }
      /*  pop css end
      */
  </style>





   






