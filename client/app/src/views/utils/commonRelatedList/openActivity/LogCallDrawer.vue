<template>
  <div class="drawer-main-div card">
    <div class="drawer" :class="{ 'is-open': isOpen, 'is-visible': isVisible }">
      <div class="drawer__overlay" :style="{ transitionDuration: `${speed}ms` }"></div>
      <div class="drawer__content" v-click-away="closeDrawer" :style="{
        maxWidth: maxWidth,
        transitionDuration: `${speed}ms`,
        backgroundColor: backgroundColor,
      }">
        <div class="px-3 py-1">
          <i @click="closeDrawer" class="fa fa-arrow-right cursor-pointer"></i>
        </div>

        <!-- Log a call Form -->
        <div class="container mx-2 my-2">
          <h4 class="text-base font-semibold mb-2">Log a call</h4>

          <h2 class="text-lg md:text-base lg:text-base font-semibold text-[#323338] mt-4 mb-2">
            Call Information
          </h2>

          <div class="mb-2">
            <label class="block text-sm font-medium mb-1">Call For</label>
            <div class="flex gap-2">
              <select class="form-select border border-gray-300 rounded w-1/3 text-sm">
                <option>Contact</option>
              </select>
            </div>
          </div>

          <div class="mb-2">
            <label class="block text-sm font-medium mb-1">Related To</label>
            <div class="flex gap-2">
              <select class="form-select border border-gray-300 rounded w-1/3 text-sm">
                <option>Account</option>
              </select>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Call Type</label>
            <div class="position-relative">
              <input type="text" class="form-control border-danger pe-5" value="Outbound" readonly />
              <i class="fas fa-lock position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Outgoing Call Status</label>
            <div class="position-relative">
              <input type="text" class="form-control pe-5" value="Completed" readonly />
              <i class="fas fa-lock position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Call Start Time</label>
            <div class="d-flex">
              <input type="date" class="form-control border-start border-2" :class="{ 'border-danger': isStartTimeInvalid }" v-model="callStartDate" />
              <input type="time" class="form-control border-start-0" v-model="callStartTime" />
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Call Duration</label>
            <div class="d-flex align-items-center gap-2">
              <input type="text" class="form-control text-sm w-25" value="00" />
              <span class="text-sm">minutes</span>
              <input type="text" class="form-control text-sm w-25" value="00" />
              <span class="text-sm">seconds</span>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Subject</label>
            <input type="text" class="form-control text-sm" value="Outgoing call to -" />
          </div>

          <div class="mb-3">
            <label class="form-label">Voice Recording</label>
            <input type="text" class="form-control text-sm" />
          </div>

          <h3 class="text-sm font-semibold mt-4 mb-3">Purpose Of Outgoing Call</h3>

          <div class="mb-3">
            <label class="form-label">Call Purpose</label>
            <select class="form-select text-sm">
              <option>-None-</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Call Agenda</label>
            <input type="text" class="form-control text-sm" />
          </div>

          <h3 class="text-sm font-semibold mt-4 mb-3">Outcome Of Outgoing Call</h3>

          <div class="mb-3">
            <label class="form-label">Call Result</label>
            <select class="form-select text-sm">
              <option>-None-</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="form-label">Description</label>
            <input type="text" class="form-control text-sm" />
          </div>

          <!-- Buttons -->
         <div class="d-flex justify-content-end gap-2 mt-4">
            <button type="button" class="btn btn-outline-secondary px-4 py-2" @click="closeDrawer">
              Cancel
            </button>

            <button type="submit" class="btn btn-danger px-4 py-2 fw-semibold text-color-white">
              Save
            </button>
          </div>
        </div>
        <!-- Log a call Form End -->
      </div>
    </div>
  </div>
</template>



<script>
import { directive } from "vue3-click-away";

export default {
  name: "LogCallDrawer",
  directives: {
    ClickAway: directive,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: true,
    },
    maxWidth: {
      type: String,
      default: "40rem !important",
    },
    speed: {
      type: Number,
      default: 300,
    },
    backgroundColor: {
      type: String,
      default: "#ffffff",
    },
  },
  data() {
    return {
      isVisible: false,
      isTransitioning: false,
    };
  },
  watch: {
    isOpen(val) {
      this.isTransitioning = true;
      if (val) {
        this.toggleBackgroundScrolling(true);
        this.isVisible = true;
      } else {
        this.toggleBackgroundScrolling(false);
        setTimeout(() => (this.isVisible = false), this.speed);
      }
      setTimeout(() => (this.isTransitioning = false), this.speed);
    },
  },
  methods: {
    toggleBackgroundScrolling(enable) {
      document.body.style.overflow = enable ? "hidden" : null;
    },
    closeDrawer() {
      if (!this.isTransitioning) {
        this.$emit("close");
      }
    },
  },
  mounted() {
    this.isVisible = this.isOpen;
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 89%;
  border-radius: 10px !important;
  margin-left: 10%;
}

.drawer {
  visibility: hidden;

  &.is-visible {
    visibility: visible;
  }

  &.is-open {
    .drawer__overlay {
      opacity: 0.5;
    }

    .drawer__content {
      max-width: 40rem !important;
      transform: translateX(0);
    }
  }

  &__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 200;
    opacity: 0;
    transition-property: opacity;
    background-color: #000000;
    user-select: none;
  }

  &__content {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 9999;
    overflow: auto;
    transition-property: transform;
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    box-shadow: 0 2px 6px #777;
    background-color: #fff;
  }
}

.drawer-main-div {
  background-color: #fff;
}
</style>
