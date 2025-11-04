<template>
    
  <div class="drawer-main-div card">
    <div class="drawer" :class="{ 'is-open': isOpen, 'is-visible': isVisible }">
      <div class="drawer__overlay" :style="{ transitionDuration: `${speed}ms` }"></div>

      <div class="drawer__content" :style="{ maxWidth: maxWidth, backgroundColor: backgroundColor }">
        <!-- Header -->
        <div class="px-3 py-2 d-flex justify-content-between align-items-center border-bottom">
          <h5 class="mb-0">Manage Table Columns</h5>
          <i @click="closeDrawer" class="fa fa-arrow-right cursor-pointer" />
        </div>

        <!-- Body -->
        <div class="d-flex flex-column px-3 pt-3" style="flex: 1; overflow-y: auto">
          <input v-model="searchText" type="text" class="form-control mb-3" placeholder="Search columns..." />

          <div v-for="(col, idx) in filteredColumns" :key="col.label" class="d-flex align-items-center gap-2 mb-2">
            <input type="checkbox" :id="col.label" v-model="col.visible" @change="updateVisibleList({ index: idx, label: col.label, checked: col.visible })"
              class="form-check-input" style="width: 1rem; height: 1rem;" />
            <label :for="col.label" class="mt-2 p-0">{{ col.label }}</label>
          </div>
        </div>

        <!-- Footer Buttons -->
        <div class="d-flex justify-content-center gap-2 border-top bg-white"
          style="position: sticky; bottom: 0; padding: 1rem; z-index: 2;">
          <button class="btn btn-info " @click="handleUpdateVisibleList">Save</button>
          <button class="btn btn-danger" @click="closeDrawer">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PolicyColumnManageDrawer',

  props: {
    isOpen: { type: Boolean, default: false },
    speed: { type: Number, default: 300 },
    maxWidth: { type: String, default: '400px' },
    backgroundColor: { type: String, default: '#fafafa' },

    // String array only
    columns: {
      type: Array,
      required: true,
      default: () => []
    },

    visibleColumns: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  emits: ['update-columns', 'close'],

  data() {
    return {
      isVisible: false,
      isTransitioning: false,
      searchText: '',
      localColumns: [], // [{ label: 'Name', visible: true }]
      visibleOnly: []
    }
  },

  watch: {
    isOpen(val) {
      this.isTransitioning = true
      if (val) {
        this.isVisible = true
        this.initLocalColumns()
        this.toggleBackgroundScrolling(true)
      } else {
        this.toggleBackgroundScrolling(false)
        setTimeout(() => (this.isVisible = false), this.speed)
      }
      setTimeout(() => (this.isTransitioning = false), this.speed)
    },

    columns: {
      handler() {
        this.initLocalColumns()
      },
      immediate: true
    }
  },

  computed: {
    filteredColumns() {
      if (!this.searchText) return this.localColumns
      return this.localColumns.filter(col =>
        col.label.toLowerCase().includes(this.searchText.toLowerCase())
      )
    }
  },

  methods: {
    toggleBackgroundScrolling(enable) {
      const body = document.querySelector('body')
      body.style.overflow = enable ? 'hidden' : null
    },

    closeDrawer() {
      if (!this.isTransitioning) {
        // Reset to previous state if cancelled
        this.initLocalColumns()
        this.$emit('close')
      }
    },

    initLocalColumns() {
      this.localColumns = this.columns.map(label => ({
        label,
        visible: this.visibleColumns.includes(label) //Respect current visible state
      }))
      console.log('Initialized Local Columns:', this.localColumns)
    },


    // Update visibleOnly based on localColumns

   updateVisibleList({index, label, checked}) {
    // Update the local column's visibility
    if (this.localColumns[index]) {
      this.localColumns[index].visible = checked;
    }
    // Emit real-time to parent
       this.$emit('toggle-column', { index, label, checked });

      const visibleOnly = this.localColumns
        .filter(c => c.visible)
        .map(c => c.label)
      console.log('Visible Columns:', visibleOnly)
      this.visibleOnly = visibleOnly

      console.log(checked, label, index,"00");
    console.log('Current visible columns:', this.visibleOnly);
    },
    handleUpdateVisibleList() {
      // localColumns = [{ label, visible }] 
      const visible = (this.localColumns || [])
        .filter(c => c.visible)
        .map(c => c.label)
      if (!visible.length) return

      this.$emit('update-columns', visible)
      this.closeDrawer()
    },
  }
}
</script>

<style lang="scss" scoped>
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
      max-width: 24rem !important;
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
    background: #fff;
  }
}

.drawer-main-div {
  background-color: #fff;
}
</style>
