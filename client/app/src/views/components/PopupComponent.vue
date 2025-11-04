<template>
  <div class="popup" v-if="show">
    <div class="popup-content">
  <div
    class="alert text-white font-weight-bold"
    role="alert"
  >
    <span class="alert-icon">
      <i />
    </span>
    <span class="alert-text">
      &nbsp; {{ message }}
      <slot />
    </span>
    <button
      type="button"
      class="btn-close d-flex justify-content-center align-items-center nbtn"
      data-bs-dismiss="alert"
      aria-label="Close"
      @click="closePopup"
    ></button>
   
  </div>
</div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: true
    };
  },
  methods: {
    closePopup() {
      this.show = false;
    }
  }
};
</script>

<style>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: rgb(215,8,7);
  padding: 20px;
  border-radius: 5px;
}
.nbtn{
    position: absolute;
    top: -10px;
    right: -10px;
}
</style>
