<template>
<div>
    <h5 class="main-heading mt-3">Advisor Bonus Tracker
  </h5>
    <div style="width: 100%; overflow: scroll">
      <table class="table border table-responsive subform">
        <thead class="table subform-table-head text-white">
          <tr>
            <th>#</th>
            <th>Actions</th>
            <th>Year</th>
            <th>Bonus Amount</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(parent, index) in formData.advisorBonus" :key="index">
            <td class="m-auto">{{ index + 1 }}</td>
            <td>
              <a @click.prevent="deleteLeadsRow(index)" href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Delete product">
                <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
              </a>
            </td>
            <td>
            <select v-model="parent.year" class="form-control form-control-default">
              <option value="" disabled selected>Select Year</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </td>
          <td>
              <input v-model="parent.bonusAmount2020" type="text" class="form-control form-control-default" autocomplete="off">
            </td>
            
          </tr>
        </tbody>
      </table>
    </div>
    <button class="btn mb-0 btn-color btn-md" type="button" @click.prevent="addRowToAdvisorBonusDataTable">
      Add Row
    </button>
  </div>
  <div class="button-row d-flex justify-content-center mt-2 gap-4">
        <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" type="button">Prev</button>
        <button class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" @click.prevent="sendData" type="button">Next</button>
      </div>
  </template>
  <script>

  export default {
    name: "advisorBonus",

    data() {
      return {
        formData: {
          advisorBonus: []
        }
      };
    },
   
    methods: {
        addRowToAdvisorBonusDataTable() {
        this.formData.advisorBonus.push({
            year:"",
            bonusAmount:"",
        });
      },
      deleteLeadsRow(index) {
        this.formData.advisorBonus.splice(index, 1);
      }
    }
  };
  </script>
  
  <style scoped>
  .main-heading {
    font-weight: 500 !important;
  }
  
  .form-control-default {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem;
    width: 100%;
  }
  
  .my-0 {
    margin-bottom: 0 !important;
  }
  </style>
  