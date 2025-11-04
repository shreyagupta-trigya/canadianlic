<template>
    <div>
      <h5 class="main-heading mt-1">Annual Performance Track</h5>
  
      <div style="width: 100%; overflow: scroll">
        <table class="table border table-responsive subform">
          <thead class="table subform-table-head text-white">
            <tr>
              <th>#</th>
              <th>Actions</th>
              <th>Year</th>
              <th>Number of Advisors at Year End</th>
              <th>No. of Clients at Year End</th>
              <th>Annual Revenue (CA$)</th>
              <th>Advisor Annual Revenue Yield (CA$)</th>
              <th>Client Annual Revenue Yield (CA$)</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr v-for="(parent, index) in formData.AnnualPerformance" :key="index">
              <td class="m-auto">{{ index + 1 }}</td>
              <td>
                <a
                  @click.prevent="deleteLeadsRow(index)"
                  href="javascript:;"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="Delete product"
                >
                  <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                </a>
              </td>
              <td>
                <div
                  class="choices"
                  data-type="select-one"
                  tabindex="0"
                  role="listbox"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div class="select-box">
                    <select
                      v-model="parent.year"
                      class="multisteps-form__select form-control choices__input"
                      name="choices-state"
                    >
                      <option value="None">None</option>
                      <option value="2019">2019</option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                    </select>
                  </div>
                </div>
              </td>
              <td>
                <input
                  v-model="parent.noOfAdvisorsAtEnd"  @change="sendData()"
                  type="number"
                  class="form-control form-control-default"
                  autocomplete="off"
                />
              </td>
              <td>
                <input
                  v-model="parent.noOfClientAtYearEnd"
                  type="number"
                  class="form-control form-control-default"
                  autocomplete="off"
                />
              </td>
              <td>
                <input
                  v-model="parent.annualRevenue"
                  type="number"
                  class="form-control form-control-default"
                  autocomplete="off"
                />
              </td>
              <td>
                <input
                  v-model="parent.advisorAnnualRevenueYield	"
                  type="number" disabled
                  class="form-control form-control-default"
                  autocomplete="off"
                />
              </td>
              <td>
                <input
                  v-model="parent.clientAnnualYield	"
                  type="number" disabled
                  class="form-control form-control-default"
                  autocomplete="off"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        class="btn mb-0 btn-color btn-md"
        type="button"
        @click.prevent="addRowToAnnualPerformanceTable"
      >
        Add Row
      </button>
    </div>
  </template>
  <script>
  export default {
    name: "LeadManagementHistory",
    props:{
      getAnnualPerformance:{
          type: Function,
          required: true
        }
    },
    data() {
      return {
        formData: {
          AnnualPerformance: [],
        },
      };
    },
    methods: {
      sendData(){
        this.getAnnualPerformance(this.formData);
      },
      addRowToAnnualPerformanceTable() {
        this.formData.AnnualPerformance.push({
          year: "",
          noOfAdvisorsAtEnd: "",
          noOfClientAtYearEnd: "",
          annualRevenue: "",
          advisorAnnualRevenueYield: "",
          clientAnnualYield: "",
        });
      },
      deleteLeadsRow(index) {
        this.formData.AnnualPerformance.splice(index, 1);
      },
    },
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
  