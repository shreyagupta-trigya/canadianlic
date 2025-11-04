<template>
  <div>
    <h5 class="main-heading mt-2">Rolling 12 Month Yield</h5>

    <div style="width: 100%; overflow: scroll">
      <table class="table border table-responsive subform">
        <thead class="table subform-table-head text-white">
          <tr>
            <th>#</th>
            <th>Actions</th>
            <th>Month</th>
            <th>Year</th>
            <th>Monthly Revenue (CA$)</th>
            <th>Number of Advisors</th>
            <th>Number of Clients</th>
            <th>Advisor Monthly Yield (CA$)</th>
            <th>Client Monthly Yield (CA$)</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(parent, index) in formData.RollingData" :key="index">
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
                    v-model="parent.months"
                    class="multisteps-form__select form-control choices__input"
                    name="choices-state" @change="sendData()"
                  >
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
              </div>
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
                v-model="parent.monthlyRevenue"
                type="number" 
                class="form-control form-control-default"
                autocomplete="off"
              />
            </td>
            <td>
              <input
                v-model="parent.numberOfAdvisor"
                type="number"
                class="form-control form-control-default"
                autocomplete="off"
              />
            </td>
            <td>
              <input
                v-model="parent.numberOfClient"
                type="number"
                class="form-control form-control-default"
                autocomplete="off"
              />
            </td>
            <td>
              <input
                v-model="parent.advisorMonthlyYield	"
                type="number" disabled
                class="form-control form-control-default"
                autocomplete="off"
              />
            </td>
            <td>
              <input
                v-model="parent.clientMonthlyYield	"
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
      @click.prevent="addRowToRollingDataTable"
    >
      Add Row
    </button>
  </div>
</template>
<script>
export default {
  name: "LeadManagementHistory",
  props:{
    getRolling:{
      type: Function,
      required: true
    }
  },
  data() {
    return {
      formData: {
        RollingData: [],
      },
    };
  },
  methods: {
    sendData(){
        this.getRolling(this.formData);
      },
    addRowToRollingDataTable() {
      this.formData.RollingData.push({
        months: "",
        year: "",
        monthlyRevenue: "",
        numberOfAdvisor: "",
        numberOfClient: "",
        clientMonthlyYield: "",
      });
    },
    deleteLeadsRow(index) {
      this.formData.RollingData.splice(index, 1);
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
