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
                <div class="message-details p-1 px-3">
                    <!-- Form for Role Information -->
                    <form @submit.prevent="handleFormSubmit">
                        <div v-if="action === 'add' || action === 'update'" class="form-group mb-0">
                            <label class="mb-0" for="roleName">Role Name</label>
                            <input type="text" class="form-control" id="roleName" v-model="form.roleName"
                                placeholder="Enter role name" required />
                        </div>
                        <div v-if="action === 'delete'" class="form-group mb-0">
                            <label class="mb-0" for="reportingTo">Reporting To</label>
                            <select class="form-control" id="reportingTo" v-model="form.reportingTo">
                                <option value="" disabled>Select a role</option>
                                <option v-for="role in allRoles" :key="role.id" :value="role.id">
                                    {{ role.title }}
                                </option>
                            </select>
                        </div>
                        <div v-if="action === 'add' || action === 'update'" class="form-group mb-0">
                            <label class="mb-0" for="user">Select User</label>
                            <!-- <select class="form-control" id="user" v-model="form.userId">
                                <option value="" disabled>Select a user</option>
                                <option v-for="user in userList" :key="user.ROWID" :value="user.ROWID">
                                    {{ user.name }}
                                </option>
                            </select> -->
                            <!-- <multiselect v-model="form.selectedUsers" :options="options" :multiple="true"
                                :close-on-select="false" placeholder="Pick some" label="name" track-by="id"
                                :clear-on-select="false" :allow-empty="true">
                            </multiselect> -->
                        </div>
                        <div v-if="action === 'add' || action === 'update'" class="form-group mb-0">
                            <label class="mb-0" for="location">Select location</label>
                            <select class="form-control" id="location" v-model="form.locationId">
                                <option value="" disabled>Select a location</option>
                                <option v-for="location in locationList" :key="location.ROWID" :value="location.ROWID">
                                    {{ location.name }}
                                </option>
                            </select>
                        </div>
                        <div v-if="action === 'add' || action === 'update'" class="form-group mb-0">
                            <label class="mb-0" for="role">Reporting To</label>
                            <select class="form-control" id="role" v-model="form.roleId">
                                <option value="" disabled>Reporting To</option>
                                <option v-for="role in allRoles" :key="role.id" :value="role.id">
                                    {{ role.title }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group mb-0">
                            <label class="mb-0" for="description">Description</label>
                            <textarea class="form-control" id="description" rows="3" v-model="form.description"
                                placeholder="Enter description"></textarea>
                        </div>
                        <div class="d-flex justify-content-center gap-2 w-100 mt-4 position-fixed bg-white"
                            style="bottom: 0;">
                            <button type="submit" class="btn btn-info">{{ action === 'add' ? "Save" :
                                action === 'delete' ? 'Delete' :
                                    action === 'update' ? 'Update' : '' }}</button>
                            <button class="btn btn-danger" @click="closeDrawer">Reset</button>
                        </div>
                    </form>
                    <!-- End of Form -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { directive } from "vue3-click-away";
import axios from 'axios';
import { putUrl } from "../../../boot/axios";
import { reactive } from "vue";
// import Multiselect from 'vue-multiselect';
// import 'vue-multiselect/dist/vue-multiselect.min.css';

export default {
    name: "Drawer",
    directives: {
        ClickAway: directive,
    },

    // components: {
    //     Multiselect,
    // },

    props: {
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
        allRoles: {
            type: Array,
            required: true, // Require the allRoles prop
        },
        action: {
            type: String,
            require: true,
            default: () => 'add'
        },
        editData: {
            type: Object,
            require: true,
            default: () => { }
        }
    },
    data() {
        return {
            userList: reactive([]),
            locationList: reactive([]),
            isVisible: false,
            isTransitioning: false,
            roleList: reactive([]),
            form: {
                roleName: '',
                roleId:'',
                reportingTo: '',
                description: '',
                selectedUsers: [],
                locationId: '',
            },
            selectedOptions: [],
            options: reactive([]),
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
        editData(val) {
            // Check if editData has a value and action is 'update'
            if (val && this.action === 'update') {
                this.form.roleName = val.title || '';
                this.form.locationId = val.location || '';
                this.form.selectedUsers = val.userList.map(item => ({
                    id: item.id,
                    name: item.name
                })) || [];
                this.form.description = val.description || '';
                this.form.reportingTo = val.reportingTo || '';
            } else {
                // Reset the form if editData is not set or action is not 'update'
                this.resetForm();
            }
        }
    },
    methods: {
        handleFormSubmit() {
            if (this.action === 'add') {
                this.handleSubmit();
            } else if (this.action === 'delete') {
                this.handleDelete();
            }
            else {
                this.handleUpdate();
            }
        },
        async fetchUsers() {
            try {
                const response = await axios.get(`${putUrl}lead/api/v1/get-users`);
                this.userList = response?.data?.users
                console.log("User res", this.userList);
                this.options = this.userList.map((item) => ({
                    id: item.ROWID,
                    name: item.name
                }))
                return response.data?.users;
            } catch (error) {
                console.error("Error fetching deals:", error);
            }
        },
        async fetchLocations() {
            try {
                const response = await axios.get(`${putUrl}lead/api/v1/get-locations`);
                this.locationList = response?.data?.locations
                console.log("loca", this.locationList)
                return response.data?.locations;
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        },
        toggleBackgroundScrolling(enable) {
            const body = document.querySelector("body");
            body.style.overflow = enable ? "hidden" : null;
        },
        openPreview(template) {
  this.previewTemplate = template;
  this.isPreviewModalOpen = true;
  this.previewMode = 'desktop';
},

closePreview() {
  this.isPreviewModalOpen = false;
  this.previewTemplate = null;
},

insertFromPreview() {
  if (this.quill && this.previewTemplate) {
    this.quill.root.innerHTML = this.previewTemplate.content;
    this.emailContent = this.previewTemplate.content;
    this.emailSubject = this.previewTemplate.name;
  }
  this.closePreview();
  this.closeModal();
},

        closeDrawer() {
            if (!this.isTransitioning) {
                this.$emit("close");
            }
        },
        handleSubmit() {

            console.log('Form data:', this.form);
            this.$emit('submit-data', this.form);
            this.resetForm(); // Optional: Reset the form after submission
        },
        handleDelete() {
            console.log('delete Form data:', this.form);
            this.$emit('delete-data', this.form);
            this.resetForm(); // Optional: Reset the form after submission
        },
        handleUpdate() {
            console.log('update Form data:', this.form);
            this.$emit('update-data', this.form);
            this.resetForm(); // Optional: Reset the form after submission
        },
        resetForm() {
            this.form = {
                roleName: '',
                reportingTo: '',
                description: '',
                userId: '',
                locationId: '',
            };
        },
    },
    async mounted() {
        this.isVisible = this.isOpen;
        await this.fetchUsers();
        await this.fetchLocations();
    },
};
</script>

<style lang="scss" scoped>
/* Import Multiselect CSS */
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
