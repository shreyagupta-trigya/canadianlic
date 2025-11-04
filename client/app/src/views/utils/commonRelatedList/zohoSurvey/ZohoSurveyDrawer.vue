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
          <!-- Survey Form -->
          <div class="message-details p-1">
            <div>
              <div class="text-start">
                <form class="card-body pt-1">
                  <div class="form-group">
                    <label for="surveySelect">Select the Survey</label>
                    <select class="form-control" id="surveySelect">
                      <option value="" disabled selected>Select a survey</option>
                      <option value="survey1">Survey 1</option>
                      <option value="survey2">Survey 2</option>
                      <option value="survey3">Survey 3</option>
                    </select>
                  </div>
                  <div class="form-group ">
                    <label for="surveyLink">Survey Link</label>
                    <input type="text" class="form-control" id="surveyLink" disabled placeholder="Survey link" />
                  </div>
                  <div class="form-group">
                    <label for="textToDisplay">Text To Display (Optional)</label>
                    <input type="text" class="form-control" id="textToDisplay" placeholder="Enter text to display" />
                  </div>
                  <div class="d-flex justify-content-center gap-2 w-100 mt-4 position-fixed bg-white" style="bottom: 0;">
                    <button class="btn btn-info">Submit</button>
                    <button type="button" class="btn btn-danger" @click="closeDrawer">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <!-- Survey Form ends -->
          <slot></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { directive } from "vue3-click-away";
  
  export default {
    name: "Drawer",
  
    directives: {
      ClickAway: directive,
    },
  
    props: {
      updateData: {
        type: Function,
      },
      updateNotes: {
        type: Function,
      },
      addNotes: {
        type: Function,
      },
      selectedButton: {
        type: String
      },
      isOpen: {
        type: Boolean,
        required: false,
        default: false,
      },
      maxWidth: {
        type: String,
        required: false,
        default: "400px",
      },
      // Transition Speed in Milliseconds
      speed: {
        type: Number,
        required: false,
        default: 300,
      },
      backgroundColor: {
        type: String,
        required: false,
        default: "#fafafa",
      },
    },
  
    data() {
      return {
        labelStyle: {
          border: '2px dashed lightgrey',
          borderRadius: '10px',
          width: '100%',
          height: '100px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        },
        contentStyle: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        },
        iconStyle: {
          fontSize: '24px',
          marginBottom: '5px'
        },
        isVisible: false,
        isTransitioning: false,
        note: {
          noteTitle: '',
          noteText: ''
        }
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
      updateData(value) {
        if (value !== null) {
          this.note.noteText = value.description;
          this.note.noteTitle = value.title;
          this.note.id = value.id;
        }
      }
    },
  
    methods: {
      resetNote() {
        this.note.noteText = "",
        this.note.noteTitle = ""
      },
      async handleSave() {
        try {
          const res = await this.addNotes(this.note);
          if (res.data.success) {
            this.note.noteTitle = '';
            this.note.noteText = '';
          }
        } catch (error) {
          console.error('Error saving note:', error);
        }
      },
      async handleUpdateNote() {
        try {
          const res = await this.updateNotes(this.note);
          console.log({ res })
          if (res.data.success) {
            this.note.noteTitle = '';
            this.note.noteText = '';
            this.closeDrawer();
          }
        } catch (error) {
          console.error('Error updating note:', error);
        }
      },
      isDescriptionValid() {
        return this.note.noteText.length <= 300;
      },
      isTitleValid() {
        return this.note.noteTitle.length <= 50;
      },
      toggleBackgroundScrolling(enable) {
        const body = document.querySelector("body");
        body.style.overflow = enable ? "hidden" : null;
        if (this.selectedButton !== "Update") {
          this.note.noteTitle = '';
          this.note.noteText = '';
        }
      },
      closeDrawer() {
        console.log("closeDrawer");
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
        max-width: 30rem !important;
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
    }
  }
  .drawer-main-div {
    background-color: #fff;
  }
  </style>
  