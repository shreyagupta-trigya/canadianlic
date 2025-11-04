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

        <!-- Schedule a call Form -->
        <div class="container mx-2 my-2">
          <h4 class="text-base font-semibold mb-2">Schedule a call</h4>

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
              <input type="text" class="form-control border border-danger pe-5" value="Outbound" readonly />
              <i class="fas fa-lock position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Outgoing Call Status</label>
            <div class="position-relative">
              <input type="text" class="form-control pe-5" value="Scheduled" readonly />
              <i class="fas fa-lock position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Call Start Time</label>
            <div class="d-flex">
              <input type="date" class="form-control border-start border-2"
                :class="{ 'border-danger': isStartTimeInvalid }" v-model="callStartDate" />
              <input type="time" class="form-control border-start-0" v-model="callStartTime" />
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Call Owner</label>
            <div class="position-relative">
              <select class="form-select pe-5">
                <option>Peter Antony Joseph</option>
                <option>Antony Joseph</option>
                <option>John Doe</option>
                <option>Jane Smith</option>
              </select>
            </div>
          </div>

          <div class="mb-3">
            <label class="block text-sm font-medium mb-1">Subject</label>
            <input type="text" class="form-control border border-gray-300 rounded w-full text-sm"
              value="Call scheduled with -" />
          </div>

          <h3 class="text-sm font-semibold mt-4 mb-3">
            Purpose Of Outgoing Call
          </h3>

          <div class="mb-3">
            <label class="block text-sm font-medium mb-1">Call Purpose</label>
            <select class="form-select border border-gray-300 rounded w-full text-sm">
              <option>-None-</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="block text-sm font-medium mb-1">Call Agenda</label>
            <input type="text" class="form-control border border-gray-300 rounded w-full text-sm" />
          </div>

          <div class="d-flex justify-content-end gap-2 mt-4">
            <button type="button" class="btn btn-outline-secondary px-4 py-2" @click="closeDrawer">
              Cancel
            </button>

            <button type="submit" class="btn btn-danger px-4 py-2 fw-semibold text-color-white">
              Schedule
            </button>
          </div>

        </div>
        <!-- Schedule a call Form End -->
      </div>
    </div>
  </div>
</template>

<script>
import { directive } from "vue3-click-away";

export default {
  name: "ScheduleCallDrawer",
  directives: {
    ClickAway: directive,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    maxWidth: {
      type: String,
      default: "40rem",
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
      callStartDate: "2025-06-09",
      callStartTime: "13:00",
      isStartTimeInvalid: false,
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

    handleSubmit() {
      if (!this.callStartDate || !this.callStartTime) {
        this.isStartTimeInvalid = true;
        return;
      }

      this.isStartTimeInvalid = false;

      // Combine date + time into full datetime string
      const startDateTime = `${this.callStartDate} ${this.callStartTime}`;

      const payload = {
        start_time: startDateTime,
        // ... other form fields
      };

      console.log("Submitting:", payload);

      // Submit via axios or emit
      // axios.post('/api/submit', payload)
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
