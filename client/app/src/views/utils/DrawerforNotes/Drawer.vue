<template>
  <div>
    <div class="drawer" :class="{ 'is-open': isOpen, 'is-visible': isVisible }">
      <div class="drawer__overlay" :style="{ transitionDuration: `${speed}ms` }"></div>
      <div class="drawer__content" v-click-away="closeDrawer" :style="{
        maxWidth: maxWidth,
        transitionDuration: `${speed}ms`,
        backgroundColor: backgroundColor,
      }">
        <div class="px-3 py-1"><i @click="closeDrawer" class="fa fa-arrow-right cursor-pointer"></i></div>
        <div class=" container">
          <h5 class="">Add Note</h5>
          <hr class="my-0" />
          <div class="form-group">
            <label for="noteTitle">Title</label>
            <input :class="{ 'mb-0': isTitleValid() }" type="text" v-model="note.noteTitle" maxlength="51"
              class="form-control" id="noteTitle" placeholder="Enter Note Title" />
            <p class="mb-0 mt-1 text-danger text-xs" v-if="!isTitleValid()">
              Title can't be more than 50 characters</p>
          </div>
          <div class="form-group">
            <label for="noteText mt-0" style="margin-top: 0;">Description</label>
            <textarea v-model="note.noteText" class="form-control" id="noteText" placeholder="Enter your note here"
              rows="4" maxlength="301">
                </textarea>
            <p class="mb-0 mt-1 text-danger text-xs" v-if="!isDescriptionValid()">
              Description can't be more than 300 characters</p>
          </div>
          <div>
            <div className='row justify-content-center '>
              <div class="col-lg-12 mb-2">
                <label for="imageUpload" class="image-upload" :style="labelStyle">
                  <div class="w-50 mx-auto">
                    <input class="form-control" type="file" id="imageUpload" name="image" multiple />
                    <div class="image-upload-content" :style="contentStyle">
                      <i class="fas fa-cloud-upload-alt" :style="iconStyle"></i>
                      <!-- <p style="text-align: center; margin: 0;">Add Attachments</p> -->
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div class="text-center">
            <button v-if="selectedButton === 'Submit'" @click="resetNote"
              class="add-btn btn me-2">Reset</button>
            <button v-if="selectedButton === 'Submit'" @click="handleSave"
              class="add-btn btn me-2">Save</button>
              <button v-if="selectedButton === 'Update'" @click=" handleUpdateNote"
                class="add-btn btn me-2">Cancel</button>
            <button v-if="selectedButton === 'Update'" @click=" handleUpdateNote"
              class="add-btn btn me-2">Update</button>
          </div>
        </div>
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
    updateData:{
      type:Function,
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
    updateData(value){
         if (value !== null){
               this.note.noteText = value.description;
               this.note.noteTitle = value.title;
               this.note.id = value.id
              }        
    }
  },

  methods: {
    resetNote(){
      this.note.noteText ="",
      this.note.noteTitle =""
    },
    async handleSave() {
      try {
        const res = await this.addNotes(this.note);
        console.log("respone note",res);
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
        console.log({res})
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
      if (this.selectedButton !== "Update"){
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
  }
}
</style>