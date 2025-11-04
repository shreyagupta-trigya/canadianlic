<template>
  <div>
    <div class="row">
      <div class="d-flex justify-content-between align-items-center">
        <div class="search-container-div col-lg-10 col-md-10 col-sm-12">
          <div class="search-container">
            <input class="search-input" type="search"  aria-label="Search">
            <i class="fas fa-search" aria-hidden="true"></i>
          </div>
        </div>
        <!-- <div class="button">
          <button class="btn companagion-button px-2 py-1 mt-3" @click="openPopup">Add New Service</button>
        </div> -->
      </div>

      <div class="border px-0 mt-3">
        <table class="table table-striped custom-scroll">
          <thead>
            <tr>
              <td><input class="form-check-input mt-0 compagion-checkbox" type="checkbox"></td>
              <td class="color fw-semibold">Policy Number</td>
              <td class="color fw-semibold">Customer Name</td>
              <td class="color fw-semibold">Vehicle Type</td>
              <td class="color fw-semibold">Claim Status</td>
              <td class="color fw-semibold">Renewal Date</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input class="form-check-input mt-0 compagion-checkbox" type="checkbox"></td>
              <td>ABC123456</td>
              <td>John Doe</td>
              <td>SUV</td>
              <td>Approved</td>
              <td>2025-05-01</td>
            </tr>
            <tr>
              <td><input class="form-check-input mt-0 compagion-checkbox" type="checkbox"></td>
              <td>XYZ987654</td>
              <td>Jane Smith</td>
              <td> sedan</td>
              <td>Pending</td>
              <td>2025-03-15</td>
            </tr>
            <tr>
              <td><input class="form-check-input mt-0 compagion-checkbox" type="checkbox"></td>
              <td>LMN123789</td>
              <td>Emily Johnson</td>
              <td>Truck</td>
              <td>Denied</td>
              <td>2025-01-20</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  data() {
    return {
      isPopupOpen: reactive(false)
    };
  },
  methods: {
    openPopup() {
      this.isPopupOpen = !this.isPopupOpen;
    }
  }
};
</script>

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
  width: 15px;
}

.border {
  border: 1px solid #dee2e6 !important;
  border-radius: 5px !important;
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
