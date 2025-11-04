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

                <!-- meeting form starts -->
                <div class="container mx-2">
                    <h4>Add Meeting</h4>
                    <div class="mb-2">
                        <label for="exampleInputPassword1" class="form-label">Booking Summary</label>
                        <input type="text" class="form-control" id="">
                    </div>
                    <div class="mb-2">
                        <label for="date" class="form-label">Meeting Date</label>
                        <input type="date" class="form-control" id="">
                    </div>
                    <div class="containerr">
                        <div class="row mt-2">
                            <div class="col">
                                Re-run round robin
                            </div>
                            <div class="col">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            </div>
                        </div>
                    </div>
                    <div class="containerr mb-2">
                        <div class="row mb-2 mt-2">
                            <div class="col">
                                Round Robin Processed
                            </div>
                            <div class="col">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="text" class="form-label">Description</label>
                        <textarea class="form-control" placeholder="Leave a comment here"
                            id="floatingTextarea"></textarea>
                    </div>

                    <div class="container">
                        <div class="row">
                            <div class="col">
                                Reminder
                            </div>
                            <div class="col">
                                <select class="form-select" id="floatingSelect" aria-label="">
                                    <option selected>15 Minutes before</option>
                                    <option value="1">5 Minutes before</option>
                                    <option value="2">10 Minutes before</option>
                                    <option value="3">30 Minutes before</option>
                                    <option value="3">1 day before</option>
                                    <option value="3">2 hours before</option>
                                    <option value="3">2 day before</option>
                                    <option value="3">1 day before</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col">
                            </div>
                            <div class="col mt-3">
                                <div class="dropdown">
                                    <a class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        None
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#">15 Minutes before</a></li>
                                        <li><a class="dropdown-item" href="#">5 Minutes before</a></li>
                                        <li><a class="dropdown-item" href="#">10 Minutes before</a></li>
                                        <li><a class="dropdown-item" href="#">30 Minutes before</a></li>
                                        <li><a class="dropdown-item" href="#">1 day before</a></li>
                                        <li><a class="dropdown-item" href="#">1 hour before</a></li>
                                        <li><a class="dropdown-item" href="#">2 day before</a></li>
                                        <li><a class="dropdown-item" href="#">2 hours before</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row text-center d-flex justify-space-around">
                        <div class="col">
                            <button class="btn btn-info m-2" @click="closeDrawer">Cancel</button>
                            <button class="btn btn-danger m-2">Submit</button>
                        </div>
                    </div>
                    <!-- <div class="row text-center d-flex justify-space-around mt-5">
                        <div class="col">
                            <button class="btn btn-info m-2">Cancel</button>
                            <button class="btn btn-danger m-2">Submit</button>
                        </div>
                    </div> -->
               
                </div>
                
                <!-- meeting form ends -->


            </div>
        </div>
    </div>
</template>
<script>
import { directive } from "vue3-click-away";

export default {

    name: "MeetingDrawer",
    directives: {
        ClickAway: directive,
    },
    props: {
        isOpen: {
            type: Boolean,
            required: false,
            default: true,
        },
        maxWidth: {
            type: String,
            required: false,
            default: "37rem !important",
        },
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
            isVisible: false,
            isTransitioning: false,
            isChecked: false, // State for the toggle switch
            isReminderChecked: false, // State for the reminder switch
            isPopupOpen: true,
            isReminderChecked2: false, // for the second repeat switch
            isPopupOpen2: true


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
        toggleSwitch() {
            this.isChecked = !this.isChecked; // Toggle the checked state
        },
        toggleBackgroundScrolling(enable) {
            const body = document.querySelector("body");
            body.style.overflow = enable ? "hidden" : null;
        },
        closeDrawer() {
            if (!this.isTransitioning) {
                this.$emit("close");
            }
        },

        changeMessage() {
            this.message = 'You have clicked the button!';
        },
        openPopup() {
            this.isPopupOpen = !this.isPopupOpen;
        },

        closePopup() {
            this.isPopupOpen = false;
        },
        openPopup2() { // handle the second popup
            this.isPopupOpen2 = true;
        },
        closePopup2() { // close the second popup
            this.isPopupOpen2 = false;
        },

    },
    async mounted() {
        this.isVisible = this.isOpen;

    },
};
</script>

<style lang="scss" scoped>
/* Import Multiselect CSS */
.card {

    width: 89%;
    border-radius: 10px !important;
    margin-left: 10%;
}

.right {
    position: relative;
    left: 85%;
    margin-right: 15px
}

.no-border {
    border: 1px solid white;

}
.outer{
    max-height: 100% !important;
}

.form-switch .form-check-input:after {
    top: 3px;
}

.multiselect {
    max-width: 425px;
    max-height: 20px;
    margin: 0 auto;
}

table td {
    font-size: 15px;
    color: #9999a5;
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
