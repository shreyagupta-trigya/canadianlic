<template>
    <div class="ps-2">
        <h5 class="main-heading mb-0">Family Tree</h5>
<div class="row mt-2">
    <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Year</label>
          <input type="text" v-model="formData.year" class="form-control" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Referral Name - Others</label>
          <input type="text" v-model="formData.referralNameOthers" class="form-control" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Referral Name - Client</label>
          <input type="text" v-model="formData.referralNameClient" class="form-control" />
        </div>

</div>
        <div class="multisteps-form__content">
            <!-- Family Tree Form -->
            <div class="row mt-2">
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
        <div class="row  mt-2">
            <div class="col-lg-4 col-sm-6  mt-2 mt-sm-0">
                <label class="my-0">Dependent Parents ?</label>
                <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                    aria-expanded="false">
                    <div class="select-box">
                        <select v-model="formData.dependentParents" id="choices-state"
                            class="multisteps-form__select form-control choices__input" name="choices-state"
                            tabindex="-1" data-choice="active" @change="updateDependentParentsData">
                            <option v-for="(option, index) in choice" :key="index" :value="option">
                                {{ option }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-4" v-show="formData.dependentParents >= 'Yes'">
                <label class="my-0">Number of Dependent Parents</label>
                <div class="form-group multisteps-form__input">
                    <div class="d-flex flex-direction-column align-items-center justify-content-center">
                        <input v-model="formData.numberOfDependentParents" type="number"
                            class="form-control form-control-default" isrequired="false" autocomplete="off"
                            @change="updateDependentParentsData" />
                    </div>
                </div>
            </div>
            <div v-show="formData.numberOfDependentParents >= 1 &&
                formData.dependentParents === 'Yes'
                " style="width: 100%; overflow: scroll">
                <table class="table border table-responsive">
                    <thead class="table-dark danger" style="width: 100vw; overflow: 'scroll'">
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
                            <a @click.prevent="deletedependentParentsData(index, parent.ROWID)" href="javascript:;">
                                <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                            </a>
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
                                <input v-model="parent.phone" type="text" class="form-control form-control-default"
                                    isrequired="false" autocomplete="off" />
                            </td>
                            <td>
                                <input v-model="parent.age" type="text" class="form-control form-control-default"
                                    isrequired="false" autocomplete="off" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                    <button class="btn mb-0 btn-color btn-md" type="button" @click.prevent="addRowTodependentParentsData">Add
                Row</button>
            </div>
        
        </div>
        <!-- dependent parents ends -->
        <!-- dependent children -->
        <div class="row  mt-2">
            <div class="col-lg-4 col-sm-6  mt-2 mt-sm-0">
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
                            @change.prevent="updateChildrenOption" />
                    </div>
                </div>
            </div>
            <div v-show="formData.numberOfDependentChildren >= 1 &&
                formData.dependentChildren === 'Yes'" style="width: 100%; overflow: scroll">
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
                <button class="btn mb-0 btn-color btn-md" type="button" @click.prevent="addRowToDependentChildrenData">Add
                    Row</button>
            </div>
        </div>
        <!-- dependent children ends -->
        <!-- dependent siblings -->
        <div class="row  mt-2">
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
    </div>
    <div class="button-row d-flex justify-content-center mt-4 gap-4 space">
        <button
          class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev"
          type="button"
          @click="previousStep"
        >
          Prev
        </button>
        <button
          class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next"
          @click.prevent="nextStep"
          type="button"
        >
          Next
        </button>
      </div>
</template>

<script>

import {relationShipStatusOptions , choice, dependentParentsOption, dependentChildrenOption} from "../../utils/picklist";

export default {
    name: 'FamilyTree',
    props: {
        FamilyTree:{
            type: Object,
            required: true
        }
    },
    watch:{
        FamilyTree:{
            handler(){
                this.formData = {...this.FamilyTree};
                this.siblingData = this.FamilyTree.siblingData || [];
                this.dependentChildrenData = this.FamilyTree.dependentChildrenData || [];
                this.dependentParentsData = this.FamilyTree.dependentParentsData || [];
               
            },
            immediate: true,
            deep: true,
        }
    },
    data() {
        return {
            formData:{...this.FamilyTree },
            choice:{...choice },
            dependentParentsOption:{...dependentParentsOption },
            relationShipStatusOptions:{...relationShipStatusOptions },
            dependentChildrenOption:{...dependentChildrenOption },
            
            siblingData: [],
            dependentChildrenData: [],
            dependentParentsData: [],
            errors:{},
        }
    },
    methods: {      
         
        addRowTosiblingData()  {
            this.siblingData.push({
                relationship: "",
                name: "",
                dob: "",
                email: "",
                phone: "",
                age:"",
            });
        },
        deletesiblingData(index)  {
            this.siblingData.splice(index, 1);
        },
        addRowToDependentChildrenData()  {
            this.dependentChildrenData.push({
                relationship: "",
                name: "",
                dob: "",
                email: "",
                phone: "",
                age:"",
            });
        },
        dependentChildren(index)  {
            this.dependentChildrenData.splice(index, 1);
        },
        addRowTodependentParentsData()  {
            this.dependentParentsData.push({
                relationship: "",
                name: "",
                dob: "",
                email: "",
                phone: "",
                age:"",
            });
        },
        deletedependentParentsData(index)  {
            this.dependentParentsData.splice(index, 1);
        },
        nextStep() {
        this.$emit('next',{...this.formData, siblingData:this.siblingData,  dependentChildrenData: this.dependentChildrenData, dependentParentsData: this.dependentParentsData });
        },
        previousStep() {
        this.$emit('previous');
        }
    }
};
</script>
<style>
.main-heading {
    font-weight: 500 !important;
}
@media screen and (max-width:500px) {
  .space{
    margin-bottom:150px;
  }
}
</style>