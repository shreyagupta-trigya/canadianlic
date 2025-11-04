<template>
  <div class=" p-3 mt-3 ">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <!-- <h4>Create Religion</h4> -->
       <div></div>

      <div class="px-2">


        <button @click="$router.push('/religionslist')" class="border rounded p-1 px-2 me-2">Cancel</button>
        <button class="border rounded p-1 px-2 me-2">Save and New</button>
        <button class="border rounded p-1 px-2 ">Save</button>
      </div>
    </div>

    <!-- Form -->
    <div class="card custom-card pb-5 p-4">
      <!-- Religion Image -->
      <div class="mb-4">
        <h6>Religion Image</h6>
        <div class="border rounded-circle d-flex justify-content-center align-items-center"
          style="width: 80px; height: 80px; overflow: hidden;">
          <i class="bi bi-image fs-2 text-muted"></i>
        </div>
      </div>

      <!-- Religion Information -->
      <h6 class="mb-3">Religion Information</h6>
      <form class="card-surface">
        <div class="row mb-3">
          <!-- Religion Name -->
          <div class="col-md-6">
            <label class="form-label">Religion Name</label>
            <input type="text" class="form-control" v-model="form.religionName" required />
          </div>

          <!-- Religion Owner -->
          <div class="col-md-6">
            <label class="form-label">Religion Owner</label>
            <select class="form-select" v-model="form.religionOwner">
              <option v-for="owner in owners" :key="owner" :value="owner">
                {{ owner }}
              </option>
            </select>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Religion</label>
            <v-select :options="religions" v-model="form.religion" placeholder="Select Religion" :multiple="true" class="custom-vselect" append-to-body />
          </div>

          <div class="col-md-6">
            <label class="form-label">Celebrated Festivals</label>
            <v-select :options="availableFestivals" v-model="form.festival" placeholder="Select Festival"
              :multiple="true"  append-to-body  class="custom-vselect"/>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { religions, religionFestivals } from "./utill/utill"
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "CreateReligion",
  components: { vSelect },
  data() {
    return {
      owners: ["Pushpinder Puri", "John Doe", "Jane Smith"],
      religions,
      religionFestivals,
      form: {
        religionName: "",
        religion: [],     // <-- Array
        religionOwner: "",
        festival: []
      }
    };
  },

  computed: {
    availableFestivals() {

      if (!this.form.religion || this.form.religion.length === 0) return [];
      return this.form.religion.reduce((all, rel) => {
        const list = this.religionFestivals[rel] || [];
        return all.concat(list);
      }, []);
    }
  },

watch: {
  "form.religion"(newReligions) {
    if (!newReligions || newReligions.length === 0) {
      this.form.festival = [];
      return;
    }

    // Collect and set all festivals related to the selected religions
    const allFestivals = newReligions.reduce((acc, religion) => {
      const festivals = this.religionFestivals[religion] || [];
      return acc.concat(festivals);
    }, []);

    this.form.festival = allFestivals;
  },
}


};
</script>

<style>
.card {
  border-radius: 8px;
}

.custom-vselect .vs__dropdown-toggle {
  border: 1px solid #ced4da;  
  border-radius: 8px;       
}


.vs__dropdown-menu {
  border: 1px solid #ced4da;
  border-radius: 8px;
}

.container {
  max-width: 400px;
  margin: 2rem auto;
}

.result {
  margin-top: 1rem;
}
</style>
