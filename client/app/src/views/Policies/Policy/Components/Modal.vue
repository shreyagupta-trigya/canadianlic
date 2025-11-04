<template>
  <!-- <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <slot />
      <button @click="$emit('close')" class="cancel-btn">Cancel</button>
    </div>
  </div> -->
  <div class="modal fade show modal-overlay" tabindex="-1" style="display: block;" v-if="show">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Save Filter</h5>
          <button type="button" class="btn-close" @click="$emit('close')">x</button>
        </div>
        <div class="modal-body">

          <div class="mb-3">
            <label  class="form-label fw-semibold text-muted">Enter Filter Name</label>
            <input v-model="inputValue" type="text" class="form-control" placeholder="Enter email subject">
          </div>

        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="$emit('close')">Cancel</button>
          <button class="btn btn-primary" @click="saveFilter">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    fields: Object,
    show: Boolean,
    operation:Object,
  },
   data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    saveFilter() {
      if (!this.inputValue.trim()) {
        alert("Please enter a filter name");
        return;
      }

      // Get existing filters array
      const savedFilters = JSON.parse(localStorage.getItem("savedFilters")) || [];

      // Push new filter into array
      savedFilters.push({
        name: this.inputValue,
        fields: { ...this.fields },
        operation: { ...this.operation },
      });

      // Save back to localStorage
      localStorage.setItem("savedFilters", JSON.stringify(savedFilters));

      this.$emit("close"); // close modal
    },
  },
};
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<!-- 
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}
.cancel-btn {
  margin-top: 15px;
  padding: 8px 16px;
  background: #ef4444;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style> -->
