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

        <div class="header d-flex justify-content-between p-2">
          <div class="inner-header">
            <i class="fa-solid fa-arrow-left"></i>

            <i class="fa-regular fa-file-arrow-down"></i>
            <i class="fa-solid fa-stamp"></i>
            <i class="fa-solid fa-trash-can"></i>
            <i class="fa-regular fa-envelope"></i>
            <i class="fa-regular fa-envelope"></i>
            <i class="fa-solid fa-ellipsis-vertical "></i>
          </div>


          <div class="inner-header">
            <span>2 of 100</span>
            <i class="fa-regular fa-less-than"></i>
            <i class="fa-regular fa-greater-than"></i>

          </div>
        </div>


        <h3 style="font-weight: 400; padding-left: 60px;">[1266-CAD-Canadian L.I.C.: Catalyst] [B17U-T448 Export
          Functionality in Advisor Credentials Form]</h3>
        <!-- header------- -->
        <div class="logo-info-section d-flex justify-content-between px-2">
          <div class="logo-info-section-left d-flex">
            <div class="logo"><i class="fa-regular fa-user" style="    font-weight: 800; padding: 7px "></i></div>
            <div class="info-section-left d-flex justify-content-end">
              <span class="p-1"><b>Trigya innovation</b></span>
              <span class="email p-1 text-muted">
                noreply@infomeeting.com</span>
            </div>
          </div>
          <div class="logo-info-section-right d-flex">
            <div class="left-info-section d-flex">
              <i class="fa-solid fa-paperclip p-2 text-muted"></i>
              <span style="font-size:0.8vw; " class="p-2 text-muted">Aug 26,2024 ,9:07AM (4days ago)</span>
            </div>
            <div class="right-info-section d-flex ">
              <i class="fa-regular fa-star p-2"></i>
              <i class="fa-regular fa-face-smile p-2 opacity-25"></i>
              <i class="fa-solid fa-reply p-2"></i>
            </div>
          </div>
        </div>
        <p style="text-align: center; color: gray;">------ --- To add notes to this task Reply ABOVE THIS LINE ---
          ------</p>
        <div>
          <div class="div"
            style="border: 1px solid gainsboro; margin-left: 20px; background-color:  rgb(226 235 239 / 45%);;">
            <div class="body-header" style="background-color: #dfe9f1; height: 70px;">
              <p class="p-4" style="    margin-left: 18%; font-size: large;"><b>Trigya Innovation</b></p>
            </div>

            <!-- body section-------- -->
            <p style="padding-right: 1rem !important;   padding-left: 19rem !important;"><b>B17U-T448 Export
                Functionality in Advisor Credentials Form</b></p>
            <p style="padding-right: 1rem !important;   padding-left: 19rem !important;">in <u
                style="color: blue;">1266-CAD-Canadian L.I.C.: Catalyst</u></p>

            <table class="p-2"
              style="height: 300px; margin-left: 20px; text-align: center; background-color: white; margin-left: 20%; width: 700px;">
              <tbody class="p-2" style="width: 220px;">
                <tr>
                  <td colspan="3" style="text-align: left;"><b>Peter Antony joseph </b> has updated the Status of the
                    following task.
                  </td>
                </tr>

                <tr style="text-align: left;">
                  <td>Task List</td>
                  <td class="col2">:</td>
                  <td>UAT 1</td>
                </tr>

                <tr style="text-align: left;">
                  <td>Milestone</td>
                  <td class="col2">:</td>
                  <td>None</td>
                </tr>

                <tr style="text-align: left;">
                  <td>Start Date</td>
                  <td>:</td>
                  <td>-</td>
                </tr>

                <tr style="text-align: left;">
                  <td>End Date</td>
                  <td>:</td>
                  <td>-</td>
                </tr>

                <tr style="text-align: left;">
                  <td>Owner</td>
                  <td>:</td>
                  <td>Sukanya Gupta, Bipasha Bareja</td>
                </tr>

                <tr style="text-align: left;">
                  <td>Completion Time</td>
                  <td>:</td>
                  <td>30-08-2024 04:20 PM</td>
                </tr>



              </tbody>
            </table>

            <button type="button" class="btn btn-primary"
              style="align-items: center; margin-left: 20%; margin-top: 30px;">View Task</button>
          </div>
        </div>
      </div>
      <!-- Message Details -->
      <!-- <div class="message-actions ps-2 heading-color mb-0 mt-2">
            <i class="mb-0 pb-2 fas fa-reply mx-2 " title="Reply"></i>
            <i class="mb-0 pb-2 fas fa-reply-all mx-2 " title="Reply All"></i>
            <i class="mb-0 pb-2 fas fa-share mx-2 " title="Forward"></i>
            <i class="mb-0 pb-2 fas fa-trash-alt mx-2 " title="Delete"></i>
            <i class="mb-0 pb-2 fas fa-exclamation mx-2 " @click="markUnread" title="Mark as Unread"></i>
            <i class="mb-0 pb-2 fas fa-exclamation-triangle mx-2 " @click="moveToSpam" title="Move to Spam"></i>
        </div>
        <div class="message-details-content card-body pt-0">
            <p class="text-md text-bold heading-color mb-0">{{ activeMessage.subject }}</p>
            <div class="row">
                <div class="col-lg-10 col-md-10 col-sm-8">
                    <p class="mb-0 heading-color"><strong class="blue-color text-sm text-bold">{{ activeMessage.name }}
                            :</strong><span class="text-sm ">{{ activeMessage.email }}</span></p>
                    <p class="mb-0 text-sm heading-color to-me cursor-pointer" @click=" showToMeDetails()">to me
                        <i :class="[showToMe ? 'fa fa-chevron-up' : 'fa fa-chevron-down']"
                            @mouseover="showToMeDetails()" @mouseleave="showToMeDetails()">
                        </i>
                    </p>
                </div>
                <p class="col-lg-2 text-end col-md-2 col-sm-2 heading-color text-bold"><small class="blue-color">{{
                        activeMessage.time }}</small></p>
            </div>
            <div :class="{ 'to-me-div card-open': showToMe, 'to-me-div': !showToMe }" class="card" v-show="showToMe">
                <div class="card-body">
                    <p class="mb-0 text-sm heading-color mb-1"><span class="text-bold">Name:</span>{{ activeMessage.name
                        }}</p>
                    <p class="mb-0 text-sm heading-color mb-1"><span class="text-bold">Subject:</span>{{
                        activeMessage.subject }}</p>
                    <p class="mb-0 text-sm heading-color mb-1"><span class="text-bold">Sender:</span>{{
                        activeMessage.email }}</p>
                    <p class="mb-0 text-sm heading-color mb-1"><span class="text-bold">Cc:</span>{{ activeMessage.email
                        }}</p>
                    <p class="mb-0 text-sm heading-color mb-1"><span class="text-bold">Bcc:</span>{{ activeMessage.email
                        }}</p>
                    <p class="mb-0 text-sm heading-color mb-1"><span class="text-bold">Time:</span>{{ activeMessage.time
                        }}</p>
                </div>
            </div>
            <div class="h-30 heading-color custom-scroll">
                <div class="card email-message-card" style="background-color:#f0f3f5; min-height:50vh;">
                    <div class="card-body shadow" style="background-color: #fff;">
                        <div class="text-sm" v-html="activeMessage.message"></div>
                    </div>
                </div>
                <div class="btn-div">
                    <button class="btn btn-outline-info mx-1 px-1 py-1">Reply<i class="fas fa-reply " @click="reply"
                            title="Reply"></i></button>
                    <button class="btn btn-outline-info mx-1 px-1 py-1">Forward<i class="fas fa-share mx-2"
                            @click="forward" title="Forward"></i></button>
                </div>
            </div>
        </div> -->
      <slot></slot>
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
    activeMessage: {
      type: Object,
      required: false,
      default: () => { },
    },
    isOpen: {
      type: Boolean,
      required: false,
      default: false,
    },
    maxWidth: {
      type: String,
      required: false,
      default: "70rem",
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
      showToMe: false,
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

  },

  methods: {
    showToMeDetails() {
      this.showToMe = !this.showToMe;
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

.to-me-div {
  border-radius: 5px;
  width: 50%;
  height: 50%;
  z-index: 4;
  position: fixed;
  background-color: white;
  transition: transform 0.5s ease-in-out;
}

.to-me-div.card-open {
  transform: translateX(0);
}

col2 {
  width: 20px
}

i {
  cursor: pointer;
}

.logo {
  background-color: #7bcaf2;
  padding: 5px;
  border-radius: 50%;
  display: inline-block;
  height: 40px;
  width: 40px;
}


.inner-header i {
  font-size: 1vw;
  display: inline-block;
  padding: 1vw;
  border-radius: 50%;

}
</style>