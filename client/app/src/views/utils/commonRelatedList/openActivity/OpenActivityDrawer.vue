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

                <!-- task form starts -->
                <div class="outer">
                    <h4 class="mx-3">{{selectedButton === 'Update'? 'Update Task' : 'Add Task'}}</h4>
                    <div class=" mx-3">
                        <label for="exampleInputEmail1" class="form-label">Subject</label>
                        <input type="text" class="form-control" id="text" v-model="task.subject" aria-describedby="">
                    </div>
                    <div class="mb-3 mx-3">
                        <label for="exampleInputEmail1" class="form-label">Due Date</label>
                       
                        <div class="input-group bg-white">
            <flat-pickr v-model="task.dueDate" aria-describedby="" :config="datePickerConfig" placeholder="DD/MM/YYYY"
              class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
              ref="fpDateOfBirth" />
            <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
              <i class="fa fa-calendar"></i>
            </span>
          </div>
                    </div>
                    <div class="outer mb-3 mx-3">
                        <lablel class="mb-3" style="color: black">Priority</lablel>
                        <div class="mb-3">
                            <select class="form-select form-select-sm" aria-label="Small select example" v-model="task.taskPriority"  
                                style="height: 35px !important;">
                                <option selected>None</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                    <div class="outer mb-3 mx-3">
                        <lablel class="mb-3" style="color: black">Owner</lablel>
                        <div class="input-group mb-3">
                            <!-- <SingleSlelect class="form-select " id="insuranceLeadOwner" v-model="task.owner"
                            :options="users" @click.stop  :value="users.ROWID"/> -->

                            <select
                    v-model="task.owner"
                    class="form-control"
                    id="insuranceLeadOwner"
                  >
                    <option
                      v-for="(owners, index) in users"
                      :key="index"
                      :value="owners.ROWID"
                    >
                      {{ owners.firstName }} {{ owners.lastName}}
                    </option>
                  
                  </select>
                        </div>
                    </div>
                    <div class="row mx-3 mb-3 ">
                        <div class="col">
                            Reminder
                        </div>
                        <div class="col">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck2"
                                @click="openPopup2" v-model="isReminderChecked">
                        </div>
                    </div>
                    <!-- Conditionally rendered table for second reminder -->
                    <div class="card"
                        style="position: absolute; top: 53%; left: 40%; transform: translate(-50%, -50%); z-index: 1000;">

                        <i class="fa-solid fa-xmark" id="right2"
                            style="cursor: pointer; margin-right: 20px; transform: translate(-50%, -50%); z-index: 1000; position: absolute; top: 10%; left: 95%;"
                            v-if="isPopupOpen2" @click.stop="handleclosePopup2" @click="closePopup2"></i>
                        <div class="reminder mb-3" v-if="isPopupOpen2">
                            <table class="table mt-4 mx-3">
                                <tbody>
                                    <tr>
                                        <td scope="row">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" name="flexRadioDefault"
                                                    id="flexRadioDefault2" checked />
                                            </div>
                                        </td>
                                        <td>
                                            <select class="form-select" aria-label="Default select example"
                                                style="color: black">
                                                <option selected>On</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select class="form-select" aria-label="Default select example"
                                                style="color: black">
                                                <option selected>Day</option>
                                                <option value="1">Month</option>
                                                <option value="2">Year</option>
                                            </select>
                                        </td>
                                        <td style="color: black; padding-top: 13px;" class="mt-2">of due date</td>
                                        <td>
                                            <input type="time" class="time">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="mb-3 mx-3">
                                <label for="exampleInputEmail1" class="form-label">Alert</label>
                                <input type="text" class="form-control" id="" aria-describedby=""   >
                            </div>
                            <div class="mb-3 mx-3">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" 
                                    aria-describedby="emailHelp">
                            </div>
                        </div>
                    </div>


                    <!-- Repeat popup -->
                    <div class="row mx-3 mb-3">
                        <div class="col">
                            Repeat
                        </div>
                        <div class="col">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck2"
                                @click="openPopup" v-model="isReminderChecked2">

                        </div>

                    </div>
                    <!-- Conditionally rendered table -->
                    <div class="card"
                        style="position: absolute; top: 53%; left: 40%; transform: translate(-50%, -50%); z-index: 1000;">

                        <i class="fa-solid fa-xmark" id="right"
                            style="cursor: pointer;margin-right: 20px; transform: translate(-50%, -50%); z-index: 1000; position: absolute; top: 10%; left: 95%;"
                            v-if="isPopupOpen" @click="handleclosePopup" @click.stop="handleclosePopup"></i>

                        <table class="table mx-3 mb-3" style="border: 1px solid white" v-if="isPopupOpen">
                            <tbody>
                                <tr>
                                    <td>Type</td>
                                    <td>Daily</td>
                                </tr>
                                <tr>
                                    <th scope="row"></th>
                                    <td>
                                        <div class="div d-flex">
                                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                            Except weekends and holidays
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Ends</td>
                                    <td>
                                        <div class="div d-flex">
                                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck2">
                                            Never
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <div class="div d-flex">
                                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck3">
                                            After 1 Time(s)
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <div class="div d-flex">
                                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck4">
                                            On &nbsp;&nbsp;
                                            <input type="date" class="no-border" style="color: black;margin-top: -5px;">
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <button class="btn-ShowMore mx-3" @click="openPopup3">Show More</button>

                    <div class="showMore mx-3" v-if="isPopupOpen3">
                        <label class="mt-2">Related To</label>
                        <select class="form-select" aria-label="Default select example" v-model="task.refrenceModule">
                            <option selected>Contact Name</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <label class="mt-2">Status</label>
                        <select class="form-select" aria-label="Default select example" v-model="task.status"  >
                            <option selected>Not Started</option>
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
                            <option value="Working">Working</option>
                        </select>
                        <label class="mt-2">Description</label>
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Leave a comment here" v-model="task.description"  
                                id="floatingTextarea"></textarea>
                            <label for="floatingTextarea">Description</label>
                        </div>
                    </div>

                    <div class="row text-center d-flex justify-space-around mt-5">
                        <div class="col">
                            <button class="btn btn-info m-2" @click="closeDrawer">Cancel</button>
                            <button class="btn btn-danger m-2" @click="selectedButton === 'Update'? handleUpdateTask(task.taskId) : handleSubmit()">{{selectedButton === 'Update'? 'Update' : 'Add '}}</button>
                        </div>
                    </div>
                </div>
                <!-- task form ends -->
            </div>
        </div>
    </div>
</template>
<script>
import { directive } from "vue3-click-away";
import { reactive } from 'vue';
import { putUrl } from "../../../../boot/axios.js";
import axios from "axios";
// import { X } from 'lucide-vue-next';
// import SingleSlelect from "../../../utils/SingleSlelect.vue";
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
export default {

   components: { flatPickr },
    name: "OpenActivity",
    directives: {
        ClickAway: directive,
    },

//     components:{
//     SingleSlelect
//   },
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
        addTask: {
            type: Function,
        },
        updateData: {
            type: Function,
        },
        selectedButton: {
         type: String
        },
        updateTask: {
            type: Function,
        },
   
    },
    data() {
        return {
             datePickerConfig: {
        dateFormat: "d/m/Y", // DD/MM/YYYY
        allowInput: true
      },
      dateTimePickerConfig: {
        dateFormat: "d/m/Y H:i", // DD/MM/YYYY HH:mm
        allowInput: true,
        enableTime: true,
        time_24hr: true
      },
            isVisible: false,
            isTransitioning: false,
            isChecked: false, // State for the toggle switch
            isReminderChecked: false, // State for the reminder switch
            // isPopupOpen: false,
            isReminderChecked2: false, // for the second repeat switch
            isPopupOpen2: false,
            isPopupOpen: reactive(false),
            isPopupOpen3: reactive(false),
            task:{
                subject:'',
                status:'',
                dueDate:'',
                taskPriority:'',
                owner:'',
                reminder:'',
                taskRepeat:'',
                refrenceModule:'',
                description:'',
                             
            },
            users: [],

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
            console.log('value:',value);
         if (value !== null){
               this.task.subject = value.subject;
               this.task.status = value.status;
                  this.task.id = value.id;
               
                this.task.owner = value.owner;
                this.task.dueDate = value.dueDate;
                this.task.refrenceModule = value.refrenceModule;
                this.task.description = value.description;

              }        
    }
    },
    methods: {
           openDatePicker() {
      if (this.$refs.fpDateOfBirth && this.$refs.fpDateOfBirth.fp) {
        this.$refs.fpDateOfBirth.fp.open()
      }
      },
        async fetchUsers() {
      try {
        const response = await axios.get(`${putUrl}lead/api/v1/get-users`);
        console.log("User res", response);
        return response.data?.users;
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    },
        handleSwitchChange() {
            this.isPopupOpen = !this.isPopupOpen;
            this.isReminderChecked = !this.isReminderChecked;
        },
        // toggleSwitch() {
        //     this.isChecked = !this.isChecked; // Toggle the checked state
        // },
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
            if (this.isReminderChecked == false) {
                this.isReminderChecked = true
            } else {
                this.isReminderChecked = false
            }
        },
        openPopup3() {

            if (this.isPopupOpen3 == false) {
                this.isPopupOpen3 = true;
            } else {
                this.isPopupOpen3 = false;
            }
        },

        handleclosePopup() {
            this.isPopupOpen = false;
            this.isReminderChecked = false
        },
        
        openPopup2() { // handle the second popup
            this.isPopupOpen2 = true;
        },
        closePopup2() { // close the second popup
            this.isPopupOpen2 = false;
        },
        async handleSubmit(){
            try{
                const res=await this.addTask(this.task);            
                if(res.data.success){
                    this.task.subject='';
                    this.task.status='';
                    this.task.dueDate=null;
                    this.task.taskPriority='';
                    this.task.owner='';
                    // this.task.reminder='';
                    // this.task.taskRepeat='';
                    this.task.refrenceModule='';
                    this.task.description='';
                }
                this.closeDrawer();
                console.log('Task added successfully:',res);
            }catch(error){
                console.error('Error saving task:',error);
            }
        },
        async  handleUpdateTask(){
           
           try{
            const res= await this.updateTask(this.task);
            if(res.data.success){
                this.task.subject='';
                this.task.status='';
                this.task.dueDate='';
                this.task.taskPriority='';
                this.task.owner='';
                this.task.reminder='';
                this.task.taskRepeat='';
                this.task.refrenceModule='';
                this.task.description='';
                this.closeDrawer();
            }
            
           }catch(error){
                console.error('Error updating task:',error);
            }
        }
       
    },
    async created() {
        this.users = await this.fetchUsers();
        console.log("fetched user", this.users);
    },
    async mounted() {
        this.isVisible = this.isOpen;

    },
};
</script>

<style lang="scss" scoped>
/* Import Multiselect CSS */
.col {
    color: black
}

.time {
    color: #1c1919;
    border-radius: 5px;
    border: 1px solid #b5b5bb;
    height: 35px;
}

label,
.form-label {
    font-size: 0.75rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #111213;
    margin-left: 0.25rem;
    font-weight: 500 !important;
}

.card {

    width: 89%;
    border-radius: 10px !important;
    margin-left: 10%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* Custom shadow */
}

.right {
    position: relative;
    left: 85%;
    margin-right: 15px
}

.no-border {
    border: 1px solid white;

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
    color: black
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

.btn-ShowMore {
    background-color: white;
    color: black;
    border: 1px solid #d6dddb;
    ;
    width: 200px;
    border-radius: 5px;
}
</style>
