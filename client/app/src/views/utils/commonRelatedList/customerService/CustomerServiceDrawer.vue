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

                
    <div class="container">
        <h5 class="mx-3 mt-3">Add New Customer Service</h5>
        <form class="mx-3">
            <!-- First row: Policy Advisor and Task Name -->
            <div class="row  ">
                <div class="form-group col-md-6">
                    <label for="policyAdvisor">Policy Advisor</label>
                    <select class="form-select" aria-label="Default select example" id="policyAdvisor" placeholder="it will update automatically">
                        <option selected></option>
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                    </select>
                </div>
                <div class="form-group col-md-6">
                    <label for="taskName">Task Name</label>
                    <select class="form-select" aria-label="Default select example" id="taskName">
                        <option selected></option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
            </div>

            <!-- Second row: Contacts and Policies -->
            <div class="row  ">
                <div class="form-group col-md-6">
                    <label for="contacts" style="margin-top: -20px">Contacts</label>
                    <select class="form-select" aria-label="Default select example" id="policies">
                        <option selected>Sajeda Arshi</option>
                        <option value="1">Sajeda Arshi</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div class="form-group col-md-6">
                    <label for="policies" style="margin-top: -20px">Policies</label>
                    <select class="form-select" aria-label="Default select example" id="policies">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
            </div>

            <!-- Third row: Task Completed CSR Name and Contact Mobile -->
            <div class="row  ">
                <div class="form-group col-md-6">
                    <label for="csrName">Task Completed CSR Name</label>
                    <input type="text" class="form-control" id="" aria-describedby="">
                </div>
                <div class="form-group col-md-6">
                    <label for="contactMobile">Contact Mobile</label>
                    <input type="text" class="form-control" id="" aria-describedby="">
                </div>
            </div>

            <!-- Fourth row: Updated Policy Module-Zoho and Comment on Contact Profile- ZOHO -->
            <div class="row  ">
                <div class="form-group col-md-6">
                    <label for="policyModuleZoho">Updated Policy Module-Zoho</label>
                    <select class="form-select" aria-label="Default select example" id="policyModuleZoho">
                        <option selected>None</option>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                        <option value="3">Not Started</option>
                    </select>
                </div>
                <div class="form-group col-md-6">
                    <label for="commentZoho">Comment on Contact Profile- ZOHO</label>
                    <select class="form-select" aria-label="Default select example" id="commentZoho">
                        <option selected>Not Started</option>
                        <option value="2">None</option>
                        <option value="2">Yes</option>
                        <option value="2">No</option>                      
                    </select>
                </div>
            </div>

            <!-- Fifth row: Request BOT/Email company/Cancel Portal and Confirmation to Client -->
            <div class="row  ">
                <div class="form-group col-md-6">
                    <label for="requestBot">Request BOT/Email company/Cancel Portal</label>
                    <select class="form-select" aria-label="Default select example" id="requestBot">
                        <option selected>Not Started</option>
                        <option value="1">None</option>
                        <option value="2">Yes</option>
                        <option value="3">No</option>
                    </select>
                </div>
                <div class="form-group col-md-6">
                    <label for="confirmationClient">Confirmation to Client</label>
                    <select class="form-select" aria-label="Default select example" id="confirmationClient">
                        <option selected>Not Started</option>
                        <option value="1">None</option>
                        <option value="2">Yes</option>
                        <option value="3">No</option>
                    </select>
                </div>
            </div>

            <!-- Sixth row: Confirmation Received By Us and Image Upload -->
            <div class="row  ">
                <div class="form-group col-md-6">
                    <label for="">Confirmation Received By Us</label>
                    <select class="form-select" aria-label="Default select example" id="confirmationReceived">
                        <option selected>Not Started</option>
                        <option value="1">None</option>
                        <option value="2">Yes</option>
                        <option value="3">No</option>
                    </select>
                </div>
                <div class="form-group col-md-6">
                    <label for="imageUpload">Image Upload</label>
                   <input type="file" class="form-control">
                </div>
            </div>

            <!-- Seventh row: Description -->
            <div class="row  ">
                <div class="form-group col-md-12">
                    <label for="description">Description</label>
                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                </div>
            </div>
        </form>

        <!-- Submit and Close Buttons -->
        <div class="d-flex justify-content-center gap-2 w-100 mt-4">
            <button class="btn btn-info" type="submit">Submit</button>
            <button class="btn btn-danger" type="button" @click="closeDrawer" >Close</button>
        </div>
    </div>


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
            default: "55% !important",
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
.form-group {
            margin-bottom: 10px;
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
