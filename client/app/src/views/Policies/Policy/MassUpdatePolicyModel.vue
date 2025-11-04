<template>
  <div class="modal fade show" tabindex="-1" style="display: block;" v-if="isOpen">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Mass Update</h5>
          <button type="button" class="btn-close" @click="handleClose"></button>
        </div>
        <div class="modal-body">
           <div class="mb-3">
            <label class="form-label">Select a field</label>
            <select v-model="selectedField" class="form-select mb-2">
              <option disabled value="">Select a field</option>
              <option v-for="field in filteredFields" :key="field" :value="field">{{ field }}</option>
            </select>
          </div>
          <input v-model="updateValue" class="form-control mb-2" placeholder="Enter value" />
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="handleClose">Cancel</button>
          <button class="btn btn-primary" @click="update">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    fields: Array
  },
  data() {
    return {
      selectedField: "",
      updateValue: ""
    };
  },
  computed: {
    filteredFields() {
      if (!this.selectedField) return this.fields;
      return this.fields.filter(f =>
        f.toLowerCase().includes(this.selectedField.toLowerCase())
      );
    }
  },
  methods: {
    update() {
      this.$emit("update-mass", {
        field: this.selectedField,
        value: this.updateValue
      });
      this.handleClose();
    },
    handleClose() {
      this.selectedField = "";
      this.updateValue = "";
      this.search = "";
      this.$emit("close");
    }
  }
};
</script>