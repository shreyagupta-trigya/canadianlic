<template>
    <h5 class="main-heading mb-0 ps-2">Family Tree</h5>
    <div class="multisteps-form__content">
        <div class="multisteps-form__content">
            <!-- Family Tree Form -->
            <div class="row mt-2 ps-2">
                <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0">
                    <label class="my-0">Relationship Status</label>
                    <div class="choices">
                        <select v-model="formData.relationShipStatus" class="multisteps-form__select form-select">
                            <option v-for="(option, index) in relationShipStatusOptions" :key="index" :value="option">
                                {{ option }}
                            </option>
                        </select>
                    </div>
                </div>

                <!-- Show specific fields based on relationship status -->
                <div class="row mt-2" v-if="formData.relationShipStatus === 'Married'">
                    <div class="col-12 col-sm-4">
                        <label class="my-0">Name of Spouse</label>
                        <input v-model="formData.nameOfSpouse" type="text" class="form-control form-control-default" />
                    </div>
                    <div class="col-12 col-sm-4">
                        <label class="my-0">Number of Spouse</label>
                        <input v-model="formData.numberOfSpouse" type="text"
                            class="form-control form-control-default" />
                    </div>
                    <div class="col-12 col-sm-4">
                        <label class="my-0">Anniversary Date</label>
                        <input v-model="formData.anniversaryDate" type="date"
                            class="form-control form-control-default" />
                    </div>
                    <div class="col-12 col-sm-4">
                        <label class="my-0">Spouse's Date of Birth</label>
                        <input v-model="formData.spouseDateOfBirth" type="date"
                            class="form-control form-control-default" />
                    </div>
                    <div class="col-12 col-sm-4">
                        <label class="my-0">Phone of Spouse</label>
                        <input v-model="formData.phoneOfSpouse" type="text" class="form-control form-control-default" />
                    </div>
                    <div class="col-12 col-sm-4">
                        <label class="my-0">Email of Spouse</label>
                        <input v-model="formData.emailOfSpouse" type="text" class="form-control form-control-default" />
                    </div>
                </div>

                <div class="row mt-2" v-if="formData.relationShipStatus === 'Common Law'">
                    <div class="col-12 col-sm-4">
                        <label class="my-0">Name of Common Law Partner</label>
                        <input v-model="formData.nameOfCommonLawPartner" type="text"
                            class="form-control form-control-default" />
                    </div>
                    <div class="col-12 col-sm-4">
                        <label class="my-0">Common Law Partner's Date of Birth</label>
                        <input v-model="formData.commonLawDateOfBirth" type="date"
                            class="form-control form-control-default" />
                    </div>
                </div>
            </div>
        </div>
        <!-- dependent parents -->
        <div class="row  mt-2 ps-2">
            <!-- Dependent Parents Select -->
            <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0">
                <label class="my-0">Dependent Parents?</label>
                <div class="choices">
                    <div class="select-box">
                        <select v-model="formData.dependentParents"
                            class="multisteps-form__select form-control choices__input"
                            @change="handleDependentParentsCount">
                            <option v-for="(option, index) in choice" :key="index" :value="option">
                                {{ option }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Number of Dependent Parents -->
            <div class="col-12 col-sm-4" v-show="formData.dependentParents === 'Yes'">
                <label class="my-0">Number of Dependent Parents</label>
                <div class="form-group multisteps-form__input">
                    <div class="d-flex flex-direction-column align-items-center justify-content-center">
                        <input v-model="formData.numberOfDependentParents" type="number"
                            class="form-control form-control-default" autocomplete="off"
                            @input="handleDependentParentsCount" />
                    </div>
                </div>
            </div>

            <!-- Dependent Parents Table -->
            <div v-show="formData.numberOfDependentParents >= 1 && formData.dependentParents === 'Yes'"
                style="width: 100%; overflow: scroll">
                <table class="table border table-responsive">
                    <thead class="table-dark danger">
                        <tr>
                            <th>#</th>
                            <th>Action</th>
                            <th>Relationship Parent</th>
                            <th>Name Parent</th>
                            <th>Date of Birth</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(parent, index) in dependentParentsData" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>
                                <a @click.prevent="deletedependentParentsData(index)" href="javascript:;">
                                    <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                                </a>
                            </td>
                            <td>
                                <input v-model="parent.relationship" type="text"
                                    class="form-control form-control-default" />
                            </td>
                            <td>
                                <input v-model="parent.name" type="text" class="form-control form-control-default" />
                            </td>
                            <td>
                                <input v-model="parent.dob" type="date" class="form-control form-control-default" />
                            </td>
                            <td>
                                <input v-model="parent.email" type="email" class="form-control form-control-default" />
                            </td>
                            <td>
                                <input v-model="parent.phone" type="text" class="form-control form-control-default" />
                            </td>
                            <td>
                                <input v-model="parent.age" type="text" class="form-control form-control-default" />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button class="btn mb-0 btn-color btn-md" type="button" @click.prevent="addRowTodependentParentsData">
                    Add Row
                </button>
            </div>


        </div>
        <!-- dependent parents ends -->
        <!-- dependent children -->
        <div class="row  mt-2 ps-2">
            <div class="col-lg-4 col-sm-6  mt-2 mt-sm-0 ">
                <label class="my-0">Dependent Children ?</label>
                <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                    aria-expanded="false">
                    <div class="select-box">
                        <select v-model="formData.dependentChildren" id="choices-state"
                            class="multisteps-form__select form-control choices__input" name="choices-state"
                            tabindex="-1" data-choice="active" @change.prevent="updateChildrenOption">
                            <option v-for="(option, index) in choice" :key="index" :value="option">
                                {{ option }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-4 fade-in" v-show="formData.dependentChildren === 'Yes'">
                <label class="my-0">Number of Dependent Children</label>
                <div class="form-group multisteps-form__input">
                    <div class="d-flex flex-direction-column align-items-center justify-content-center">
                        <input v-model="formData.numberOfDependentChildren" type="number"
                            class="form-control form-control-default" isrequired="false" autocomplete="off"
                            @input="updateChildrenOption" />
                    </div>
                </div>
            </div>
            <div v-show="formData.numberOfDependentChildren >= 1" style="width: 100%; overflow: scroll">
                <table class="table border table-responsive fade-in">
                    <thead class="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Action</th>
                            <th>Relationship child</th>
                            <th>Name child</th>
                            <th>Date of Birth</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(dependent, index) in dependentChildrenData" :key="index">
                            <td class="m-auto">{{ index + 1 }}</td>
                            <td>
                                <a @click.prevent="dependentChildren(index, dependent.ROWID)" href="javascript:;">
                                    <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                                </a>
                            </td>
                            <td>
                                <input v-model="dependent.relationship" type="text"
                                    class="form-control form-control-default" isrequired="false" autocomplete="off" />
                            </td>
                            <td>
                                <input v-model="dependent.name" type="text" class="form-control form-control-default"
                                    isrequired="false" autocomplete="off" />
                            </td>
                            <td>
                                <input v-model="dependent.dob" type="date" class="form-control form-control-default"
                                    isrequired="false" autocomplete="off" />
                            </td>
                            <td>
                                <input v-model="dependent.email" type="email" class="form-control form-control-default"
                                    isrequired="false" autocomplete="off" />
                            </td>
                            <td>
                                <input v-model="dependent.phone" type="tel" class="form-control form-control-default"
                                    isrequired="false" autocomplete="off" />
                            </td>
                            <td>
                                <input v-model="dependent.age" type="tel" class="form-control form-control-default"
                                    isrequired="false" autocomplete="off" />
                            </td>

                        </tr>
                    </tbody>
                </table>
                <button class="btn mb-0 btn-color btn-md" type="button"
                    @click.prevent="addRowToDependentChildrenData">Add
                    Row</button>
            </div>
        </div>
        <!-- dependent children ends -->
        <!-- dependent siblings -->
        <div class="row  mt-2 ps-2">
            <div class="col-lg-4 col-sm-6  mt-2 mt-sm-0">
                <label class="my-0">Siblings ?</label>
                <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                    aria-expanded="false">
                    <div class="select-box">
                        <select v-model="formData.siblings" id="choices-state"
                            class="multisteps-form__select form-control choices__input" name="choices-state"
                            tabindex="-1" data-choice="active" @change.prevent="updateSiblingOption">
                            <option v-for="(option, index) in choice" :key="index" :value="option">
                                {{ option }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-4" v-show="formData.siblings === 'Yes'">
                <label class="my-0">Number of Siblings</label>
                <div class="form-group multisteps-form__input">
                    <div class="d-flex flex-direction-column align-items-center justify-content-center">
                        <input v-model="formData.numberOfSiblings" type="number"
                            class="form-control form-control-default" isrequired="false" autocomplete="off"
                            @change.prevent="updateSiblingData" />
                    </div>
                </div>
            </div>
            <div v-show="formData.numberOfSiblings >= 1 &&
                formData.siblings === 'Yes'
                " style="width: 100%; overflow: scroll">
                <table class="table border table-responsive">
                    <thead class="table-dark" style="width: 20rem">
                        <tr>
                            <th>#</th>
                            <th>Action</th>
                            <th>Relationship Sibling</th>
                            <th>Name Sibling</th>
                            <th>Date of Birth</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-for="(parent, index) in siblingData" :key="index">
                            <td class="m-auto">{{ index + 1 }}</td>
                            <td>
                                <a @click.prevent="deleteParentData(index, parent.ROWID)" href="javascript:;">
                                    <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                                </a>
                            </td>
                            <td>
                                <input v-model="parent.relationship" type="text"
                                    class="form-control form-control-default" isrequired="false" autocomplete="off" />
                            </td>
                            <td>
                                <input v-model="parent.name" type="text" class="form-control form-control-default"
                                    isrequired="false" autocomplete="off" />
                            </td>
                            <td>
                                <input v-model="parent.dob" type="date" class="form-control form-control-default"
                                    isrequired="false" autocomplete="off" />
                            </td>
                            <td>
                                <input v-model="parent.email" type="email" class="form-control form-control-default"
                                    isrequired="false" autocomplete="off" />
                            </td>
                            <td>
                                <input v-model="parent.phone" type="tel" class="form-control form-control-default"
                                    isrequired="false" autocomplete="off" />
                            </td>
                            <td>
                                <input v-model="parent.age" type="tel" class="form-control form-control-default"
                                    isrequired="false" autocomplete="off" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button class="btn mb-0 btn-color btn-md" type="button" @click.prevent="addRowTosiblingData">Add
                    Row</button>
            </div>

        </div>
        <!-- Emergency contact -->
        <h5 class="main-heading mt-2 ps-2">
            Emergency Contact <span class="text-danger">*</span>

        </h5>
        <div style="width: 100%; overflow: scroll">
            <table class="table border table-responsive subform ps-2">
                <thead class="table subform-table-head text-white">
                    <tr>
                        <th>#</th>

                        <th>Action</th>

                        <th>Emergency Contact Name</th>

                        <th>Emergency Contact Phone</th>

                        <th>Emergency Contact Relationship</th>

                        <th>Emergency Contact Email</th>
                    </tr>
                </thead>

                <tbody class="table-group-divider">
                    <tr v-for="(parent, index) in emergencyContactData" :key="index">
                        <td class="m-auto">{{ index + 1 }}</td>

                        <td>
                            <a @click.prevent="
                                deleteEmergencyContact(index, parent.ROWID)
                                " href="javascript:;" data-bs-toggle="tooltip"
                                data-bs-original-title="Delete product"><i class="fas fa-trash text-secondary"
                                    aria-hidden="true"></i></a>
                        </td>

                        <td>
                            <input v-model="parent.emergencyContactName" type="text"
                                class="form-control form-control-default" isrequired="false" autocomplete="off" />
                        </td>

                        <td>
                            <input v-model="parent.emergencyContactPhone" type="text"
                                class="form-control form-control-default" isrequired="false" autocomplete="off" />
                        </td>

                        <td>
                            <input v-model="parent.emergencyContactRelationship" type="text"
                                class="form-control form-control-default" isrequired="false" autocomplete="off" />
                        </td>

                        <td>
                            <input v-model="parent.emergencyContactEmail" type="text"
                                class="form-control form-control-default" isrequired="false" autocomplete="off" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button class="btn mb-0 btn-color btn-md null null" type="button" @click.prevent="addRowToEmergencyContact">
            Add Row
        </button>
    </div>
    <div class="button-row d-flex justify-content-center mt-4 gap-4 space">
        <button class="btn mb-1 bg-gradient-light btn-md null null js-btn-prev" type="button" @click="previousStep">
            Prev
        </button>
        <button class="btn mb-1 bg-gradient-dark btn-md null null js-btn-next" @click.prevent="nextStep" type="button">
            Next
        </button>
    </div>
</template>
<script>
import {
    relationShipStatusOptions,
    choice
} from "../utils/picklist";
export default {
    name: 'FamilyTree',
    props: {
        familyTree: {
            type: Object,
            required: true
        }
    },
    watch: {
        // familyTree:{
        //       handler(){
        //           this.formData = {...this.familyTree};
        //           this.siblingData = this.familyTree.siblingData || [];
        //           this.dependentChildrenData = this.familyTree.dependentChildrenData || [];
        //           this.dependentParentsData = this.familyTree.dependentParentsData || [];
        //           this.emergencyContactData = this.familyTree.emergencyContactData || [];           

        //       },
        //       immediate: true,
        //       deep: true,
        //   }
        familyTree: {
            handler(newVal, oldVal) {
                //Prevent unnecessary reactivity reset (edit mode safe)
                if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
                    this.initializeFamilyData(newVal);
                }
            },
            immediate: true,
            deep: true,
        },
    },
    data() {
        return {
            formData: {},

            // dropdown options
            relationShipStatusOptions,
            choice,

            // local reactive lists
            siblingData: [],
            dependentChildrenData: [],
            dependentParentsData: [],
            emergencyContactData: [],
        };

    },
    methods: {
        // Initialization Logic (runs safely for both add/edit)
        initializeFamilyData(data) {
            this.formData = { ...data };

            this.siblingData = Array.isArray(data.siblingData)
                ? JSON.parse(JSON.stringify(data.siblingData))
                : [];

            this.dependentChildrenData = Array.isArray(data.dependentChildrenData)
                ? JSON.parse(JSON.stringify(data.dependentChildrenData))
                : [];

            this.dependentParentsData = Array.isArray(data.dependentParentsData)
                ? JSON.parse(JSON.stringify(data.dependentParentsData))
                : [];

            this.emergencyContactData = Array.isArray(data.emergencyContactData)
                ? JSON.parse(JSON.stringify(data.emergencyContactData))
                : [];
        },
        addRowTosiblingData() {
            this.siblingData.push({
                relationship: "",
                name: "",
                dob: "",
                email: "",
                phone: "",
                age: "",
            });
        },
        deletesiblingData(index) {
            this.siblingData.splice(index, 1);
        },
        updateChildrenOption() {
            const count = parseInt(this.formData.numberOfDependentChildren) || 0;
            const current = this.dependentChildrenData.length;

            if (this.formData.dependentChildren === 'Yes') {
                if (count > current) {
                    for (let i = current; i < count; i++) {
                        this.dependentChildrenData.push({
                            relationship: "",
                            name: "",
                            dob: "",
                            email: "",
                            phone: "",
                            age: "",
                        });
                    }
                } else if (count < current) {
                    this.dependentChildrenData.splice(count);
                }
            } else {
                // If user selects "No"
                this.dependentChildrenData = [];
                this.formData.numberOfDependentChildren = 0;
            }
        },

        addRowToDependentChildrenData() {
            this.dependentChildrenData.push({
                relationship: "",
                name: "",
                dob: "",
                email: "",
                phone: "",
                age: "",
            });
            this.formData.numberOfDependentChildren = this.dependentChildrenData.length;
        },

        dependentChildren(index) {
            this.dependentChildrenData.splice(index, 1);
        },
        handleDependentParentsCount() {
            const count = parseInt(this.formData.numberOfDependentParents) || 0;
            const current = this.dependentParentsData.length;

            // If "Yes" selected, adjust the rows
            if (this.formData.dependentParents === 'Yes') {
                if (count > current) {
                    for (let i = current; i < count; i++) {
                        this.dependentParentsData.push({
                            relationship: "",
                            name: "",
                            dob: "",
                            email: "",
                            phone: "",
                            age: "",
                        });
                    }
                } else if (count < current) {
                    this.dependentParentsData.splice(count);
                }
            } else {
                // If "No" selected, clear the data
                this.dependentParentsData = [];
                this.formData.numberOfDependentParents = 0;
            }
        },


        addRowTodependentParentsData() {
            this.dependentParentsData.push({
                relationship: "",
                name: "",
                dob: "",
                email: "",
                phone: "",
                age: "",
            });
            this.formData.numberOfDependentParents = this.dependentParentsData.length;

        },
        deletedependentParentsData(index) {
            this.dependentParentsData.splice(index, 1);
            this.formData.numberOfDependentParents = this.dependentParentsData.length;
        },
        dependentChildren(index) {
            this.dependentChildrenData.splice(index, 1);
            this.formData.numberOfDependentChildren = this.dependentChildrenData.length;
        },

        addRowToEmergencyContact() {
            this.emergencyContactData.push({
                emergencyContactEmail: "",
                emergencyContactRelationship: "",
                emergencyContactPhone: "",
                emergencyContactName: "",
            });
        },
        deleteEmergencyContact(index) {
            this.emergencyContactData.splice(index, 1);
        },
        nextStep() {
            this.$emit('next', { ...this.formData, siblingData: this.siblingData, dependentChildrenData: this.dependentChildrenData, dependentParentsData: this.dependentParentsData, emergencyContactData: this.emergencyContactData });

        },
        previousStep() {
            this.$emit('previous');
        }
    }
};
</script>
<style>
@media screen and (max-width:500px) {
    .space {
        margin-bottom: 150px;
    }
}
</style>