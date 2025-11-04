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

                <!-- form starts Here -->
                <form class="mx-3">
                    <h4>Create Task</h4>
                    <table class="table">
                        <tbody>
                            <tr>
                                <td>Due Date</td>
                                <td> <input type="date" class="form-control no-border" id="dateInput" /></td>
                            </tr>
                            <tr>
                                <td>Priority</td>
                                <td>
                                    <div class="dropdown">
                                        <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            High
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">Low</a></li>
                                            <li><a class="dropdown-item" href="#">Medium</a></li>
                                            <li><a class="dropdown-item" href="#">High</a></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Owner</td>
                                <td>Pushpinder Puri</td>
                            </tr>
                            <tr>
                                <td>Reminder</td>
                                <td>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" role="switch" id="repeatSwitch"
                                            v-model="isRepeatChecked" @change="toggleRepeatSwitch" :style="{
                                                width: '40px',
                                                height: '20px',
                                                appearance: 'none',
                                                backgroundColor: isRepeatChecked ? '#007bff' : '#ccc',
                                                borderRadius: '20px',
                                                position: 'relative',
                                                outline: 'none',
                                                cursor: 'pointer'
                                            }" />
                                        <span :style="{
                                            position: 'absolute',
                                            top: '50%',
                                            left: isRepeatChecked ? '20px' : '0',
                                            transform: 'translateY(-50%)',
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            backgroundColor: '#fff',
                                            transition: 'left 0.2s ease-in-out'
                                        }"></span>
                                    </div>

                                </td>
                            </tr>
                            <tr>
                                <td>Repeat</td>
                                <td>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" role="switch"
                                            id="reminderSwitch" v-model="isReminderChecked"
                                            @change="toggleReminderSwitch" :style="{
                                                width: '40px',
                                                height: '20px',
                                                appearance: 'none',
                                                backgroundColor: isReminderChecked ? '#007bff' : '#ccc',
                                                borderRadius: '20px',
                                                position: 'relative',
                                                outline: 'none',
                                                cursor: 'pointer'
                                            }" />
                                        <span :style="{
                                            position: 'absolute',
                                            top: '50%',
                                            left: isReminderChecked ? '20px' : '0',
                                            transform: 'translateY(-50%)',
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            backgroundColor: '#fff',
                                            transition: 'left 0.2s ease-in-out'
                                        }"></span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>More Fields</td>
                            </tr>
                            <tr>
                                <td>Contact Name</td>
                                <td>
                                    <div class="dropdown">
                                        <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            Insurance
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">Insurance </a></li>
                                            <li><a class="dropdown-item" href="#">action2</a></li>
                                            <li><a class="dropdown-item" href="#">Action3</a></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Realated To</td>
                                <td>
                                    <div class="dropdown">
                                        <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            Customer Support
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">Insurance </a></li>
                                            <li><a class="dropdown-item" href="#">action2</a></li>
                                            <li><a class="dropdown-item" href="#">Action3</a></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>
                                    <div class="dropdown">
                                        <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            Not Started
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">Pending </a></li>
                                            <li><a class="dropdown-item" href="#">action2</a></li>
                                            <li><a class="dropdown-item" href="#">Action3</a></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Description
                                </td>
                                <td>
                                    <textarea class="form-control" placeholder="Leave a comment here"
                                        id="floatingTextarea"></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <!-- form ends here -->


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
        isOpen: {
            type: Boolean,
            required: false,
            default: true,
        },
        maxWidth: {
            type: String,
            required: false,
            default: "400px",
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
            isRepeatChecked: false,

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

        toggleReminderSwitch() {
            console.log("Reminder Switch:", this.isReminderChecked ? "ON" : "OFF");
        },
        toggleRepeatSwitch() {
            console.log("Repeat Switch:", this.isRepeatChecked ? "ON" : "OFF");
        },
    },
    async mounted() {
        this.isVisible = this.isOpen;

    },
};
</script>

<style lang="scss" scoped>
/* Import Multiselect CSS */
// .no-border {
//     border: 1px solid white
// }
.form-switch .form-check-input:after {
    top:3px;
}
.multiselect {
    max-width: 425px;
    max-height: 20px;
    margin: 0 auto;
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
