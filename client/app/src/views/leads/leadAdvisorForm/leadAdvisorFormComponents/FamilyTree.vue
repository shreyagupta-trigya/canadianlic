<template>
    <div>
      <h5 class="main-heading mb-0 ps-2">Family Tree</h5>
  
      <div class="multisteps-form__content">
        <!-- Family Tree Form -->
        <div class="row mt-2 ps-2">
          <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0">
            <label class="my-0">Relationship Status</label>
            <div class="choices">
              <select
                v-model="formData.relationShipStatus"
                class="multisteps-form__select form-select"
              >
                <option
                  v-for="(option, index) in relationShipStatusOptions"
                  :key="index"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
  
          <!-- Show specific fields based on relationship status -->
          <div class="row mt-2 ps-2" v-if="formData.relationShipStatus === 'Married'">
            <div class="col-12 col-sm-4">
              <label class="my-0">Name of Spouse</label>
              <input
                v-model="formData.nameOfSpouse"
                type="text"
                class="form-control form-control-default"
              />
            </div>
            <div class="col-12 col-sm-4">
              <label class="my-0">Number of Spouse</label>
              <input
                v-model="formData.numberOfSpouse"
                type="text"
                class="form-control form-control-default"
              />
            </div>
            <div class="col-12 col-sm-4">
              <label class="my-0">Anniversary Date</label>
              <input
                v-model="formData.anniversaryDate"
                type="date"
                class="form-control form-control-default"
              />
            </div>
            <div class="col-12 col-sm-4">
              <label class="my-0">Spouse's Date of Birth</label>
              <input
                v-model="formData.spouseDateOfBirth"
                type="date"
                class="form-control form-control-default"
              />
            </div>
            <div class="col-12 col-sm-4">
              <label class="my-0">Phone of Spouse</label>
              <input
                v-model="formData.phoneOfSpouse"
                type="text"
                class="form-control form-control-default"
              />
            </div>
            <div class="col-12 col-sm-4">
              <label class="my-0">Email of Spouse</label>
              <input
                v-model="formData.emailOfSpouse"
                type="text"
                class="form-control form-control-default"
              />
            </div>
          </div>
  
          <div
            class="row mt-2 ps-2"
            v-if="formData.relationShipStatus === 'Common Law'"
          >
            <div class="col-12 col-sm-4">
              <label class="my-0">Name of Common Law Partner</label>
              <input
                v-model="formData.nameOfCommonLawPartner"
                type="text"
                class="form-control form-control-default"
              />
            </div>
            <div class="col-12 col-sm-4">
              <label class="my-0">Common Law Partner's Date of Birth</label>
              <input
                v-model="formData.commonLawDateOfBirth"
                type="date"
                class="form-control form-control-default"
              />
            </div>
          </div>
        </div>
      </div>
  
      <!-- dependent parents -->
      <div class="row mt-2 ps-2">
        <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0">
          <label class="my-0">Dependent Parents ?</label>
          <div class="choices">
            <div class="select-box">
              <select
                v-model="formData.dependentParents"
                class="form-select"
                name="choices-state"
                tabindex="-1"
                data-choice="active"
                @change="updateDependentParentsData"
              >
                <option
                  v-for="(option, index) in choice"
                  :key="index"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-4" v-show="formData.dependentParents >= 'Yes'">
          <label class="my-0">Number of Dependent Parents</label>
          <div class="form-group multisteps-form__input">
            <div
              class="d-flex flex-direction-column align-items-center justify-content-center"
            >
              <input
                v-model="formData.numberOfDependentParents"
                type="number"
                class="form-control form-control-default"
                isrequired="false"
                autocomplete="off"
                @change="updateDependentParentsData"
              />
            </div>
          </div>
        </div>
        <div
          v-show="
            formData.numberOfDependentParents >= 1 &&
            formData.dependentParents === 'Yes'
          "
          style="width: 100%; overflow: scroll"
        >
          <table class="table border table-responsive">
            <thead
              class="table-dark danger"
              style="width: 100vw; overflow: 'scroll'"
            >
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
              <tr v-for="(parent, index) in depParentSubform" :key="index">
                <td>{{ index + 1 }}</td>
                <a
                  @click.prevent="removeSubformRow('dependentParents', index)"
                  href="javascript:;"
                >
                  <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                </a>
                <td>
                  <input
                    v-model="parent.relationship"
                    type="text"
                    class="form-control form-control-default"
                    isrequired="false"
                    autocomplete="off"
                  />
                </td>
                <td>
                  <input
                    v-model="parent.name"
                    type="text"
                    class="form-control form-control-default"
                    isrequired="false"
                    autocomplete="off"
                  />
                </td>
                <td>
                  <input
                    v-model="parent.dob"
                    type="date"
                    class="form-control form-control-default"
                    isrequired="false"
                    autocomplete="off"
                  />
                </td>
                <td>
                  <input
                    v-model="parent.email"
                    type="email"
                    class="form-control form-control-default"
                    isrequired="false"
                    autocomplete="off"
                  />
                </td>
                <td>
                  <input
                    v-model="parent.phone"
                    type="text"
                    class="form-control form-control-default"
                    isrequired="false"
                    autocomplete="off"
                  />
                </td>
                <td>
                  <input
                    v-model="parent.age"
                    type="text"
                    class="form-control form-control-default"
                    isrequired="false"
                    autocomplete="off"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button
            class="btn mb-0 btn-color btn-md"
            type="button"
            @click.prevent="addSubformRow('dependentParents')"
          >
            Add Row
          </button>
        </div>
      </div>
      <!-- dependent parents ends -->
      <!-- dependent children -->
      <div class="row mt-2 ps-2">
        <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0">
          <label class="my-0">Dependent Children ?</label>
          <div class="choices">
            <div class="select-box">
              <select
                v-model="formData.dependentChildren"
                class="form-select"
                name="choices-state"
                tabindex="-1"
                data-choice="active"
                @change.prevent="updateChildrenOption"
              >
                <option
                  v-for="(option, index) in choice"
                  :key="index"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div
          class="col-12 col-sm-4 fade-in"
          v-show="formData.dependentChildren === 'Yes'"
        >
          <label class="my-0">Number of Dependent Children</label>
          <div class="form-group multisteps-form__input">
            <div
              class="d-flex flex-direction-column align-items-center justify-content-center"
            >
              <input
                v-model="formData.numberOfDependentChildren"
                type="number"
                class="form-control form-control-default"
                isrequired="false"
                autocomplete="off"
                @change.prevent="updateChildrenOption"
              />
            </div>
          </div>
        </div>
        <div
          v-show="
            formData.numberOfDependentChildren >= 1 &&
            formData.dependentChildren === 'Yes'
          "
          style="width: 100%; overflow: scroll"
        >
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
              <tr
                v-for="(dependent, index) in depChildSubform"
                :key="index"
              >
                <td class="m-auto">{{ index + 1 }}</td>
                <td>
                  <a
                    @click.prevent="removeSubformRow('dependentChildren', index)"
                    href="javascript:;"
                  >
                    <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                  </a>
                </td>
                <td>
                  <input
                    v-model="dependent.relationship"
                    type="text"
                    class="form-control form-control-default"
                    isrequired="false"
                    autocomplete="off"
                  />
                </td>
                <td>
                  <input
                    v-model="dependent.name"
                    type="text"
                    class="form-control form-control-default"
                    isrequired="false"
                    autocomplete="off"
                  />
                </td>
                <td>
                  <input
                    v-model="dependent.dob"
                    type="date"
                    class="form-control form-control-default"
                    isrequired="false"
                    autocomplete="off"
                  />
                </td>
                <td>
                  <input
                    v-model="dependent.email"
                    type="email"
                    class="form-control form-control-default"
                    isrequired="false"
                    autocomplete="off"
                  />
                </td>
                <td>
                  <input
                    v-model="dependent.phone"
                    type="tel"
                    class="form-control form-control-default"
                    isrequired="false"
                    autocomplete="off"
                  />
                </td>
                <td>
                  <input
                    v-model="dependent.age"
                    type="tel"
                    class="form-control form-control-default"
                    isrequired="false"
                    autocomplete="off"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button
            class="btn mb-0 btn-color btn-md"
            type="button"
            @click.prevent="addSubformRow('dependentChildren')"
          >
            Add Row
          </button>
        </div>
      </div>
      <!-- dependent children ends -->
      <!-- dependent siblings -->
      <div class="row mt-2 ps-2">
        <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0">
          <label class="my-0">Siblings ?</label>
          <div class="choices">
            <div class="select-box">
              <select
                v-model="formData.siblings"
                class="form-select"
                name="choices-state"
                tabindex="-1"
                data-choice="active"
                @change.prevent="updateSiblingOption"
              >
                <option
                  v-for="(option, index) in choice"
                  :key="index"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-4" v-show="formData.siblings === 'Yes'">
          <label class="my-0">Number of Siblings</label>
          <div class="form-group multisteps-form__input">
            <div
              class="d-flex flex-direction-column align-items-center justify-content-center"
            >
              <input
                v-model="formData.numberOfSiblings"
                type="number"
                class="form-control form-control-default"
                isrequired="false"
                autocomplete="off"
                @change.prevent="updateSiblingData"
              />
            </div>
          </div>
        </div>
        <div
          v-show="formData.numberOfSiblings >= 1 && formData.siblings === 'Yes'"
          style="width: 100%; overflow: scroll"
        >
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
              <tr v-for="(parent, index) in siblingSubform" :key="index">
                <td class="m-auto">{{ index + 1 }}</td>
                <td>
                  <a
                    @click.prevent="removeSubformRow('siblings', index)"
                    href="javascript:;"
                  >
                    <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                  </a>
                </td>
                <td>
                  <input
                    v-model="parent.relationship"
                    type="text"
                    class="form-control form-control-default"
                    isrequired="false"
                    autocomplete="off"
                  />
                </td>
                <td>
                  <input
                    v-model="parent.name"
                    type="text"
                    class="form-control form-control-default"
                    isrequired="false"
                    autocomplete="off"
                  />
                </td>
                <td>
                  <input
                    v-model="parent.dob"
                    type="date"
                    class="form-control form-control-default"
                    isrequired="false"
                    autocomplete="off"
                  />
                </td>
                <td>
                  <input
                    v-model="parent.email"
                    type="email"
                    class="form-control form-control-default"
                    isrequired="false"
                    autocomplete="off"
                  />
                </td>
                <td>
                  <input
                    v-model="parent.phone"
                    type="tel"
                    class="form-control form-control-default"
                    isrequired="false"
                    autocomplete="off"
                  />
                </td>
                <td>
                  <input
                    v-model="parent.age"
                    type="tel"
                    class="form-control form-control-default"
                    isrequired="false"
                    autocomplete="off"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button
            class="btn mb-0 btn-color btn-md"
            type="button"
            @click.prevent="addSubformRow('siblings')"
          >
            Add Row
          </button>
        </div>
      </div>
      <!-- dependent siblings ends-->
      <div class="row mt-3 ps-2">
        <div class="col-12">
          <h5 class="main-heading mb-0">
            To transfer details to Family Tree (old Leads)
          </h5>
        </div>
      </div>
      <div class="row mt-2 ps-2">
        <div class="col-lg-4 col-md-4 col-sm-6">
          <label class="my-0">Dependent Children?</label>
          <!-- <MultiSelect class="form-select" v-model="formData.depChildren" :options="dependentChildrenOption"/> -->
        </div>
        <div class="col-lg-4 col-md-4 col-sm-6">
          <label class="my-0">Siblings</label>
          <!-- <MultiSelect class="form-select" v-model="formData.depSiblings" :options="siblingsOption"/>      -->
        </div>
        <div class="col-lg-4 col-md-4 col-sm-6">
          <label class="my-0">Dependent Parents </label>
          <!-- <MultiSelect class="form-select" v-model="formData.depParents" :options="dependentParentsOption"/>     -->
        </div>
      </div>
      <!-- Emergency Contact Form -->
      <div class="multisteps-form__content mt-3 ps-2">
        <h5 class="main-heading mb-0">
          Emergency Contact <span class="text-danger">*</span>
        </h5>
        <div style="width: 100%; overflow: scroll">
          <table class="table border table-responsive subform">
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
              <tr v-for="(contact, index) in emgContactSubform" :key="index">
                <td>{{ index + 1 }}</td>
                <td>
                  <a
                    @click.prevent="removeSubformRow('emergencyContacts', index)"
                    href="javascript:;"
                  >
                    <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                  </a>
                </td>
                <td>
                  <input
                    v-model="contact.emergencyContactName"
                    type="text"
                    class="form-control form-control-default"
                  />
                </td>
                <td>
                  <input
                    v-model="contact.emergencyContactPhone"
                    type="text"
                    class="form-control form-control-default"
                  />
                </td>
                <td>
                  <input
                    v-model="contact.emergencyContactRelationship"
                    type="text"
                    class="form-control form-control-default"
                  />
                </td>
                <td>
                  <input
                    v-model="contact.emergencyContactEmail"
                    type="text"
                    class="form-control form-control-default"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          class="btn mb-0 btn-color btn-md"
          type="button"
          @click.prevent="addSubformRow('emergencyContacts')"
        >
          Add Row
        </button>
      </div>
    </div>
    <div class="button-row d-flex justify-content-center mt-4 gap-4" style="margin-bottom:200px;">
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
  import {relationShipStatusOptions , choice, dependentParentsOption, dependentChildrenOption,siblingsOption} from "../../utils/picklist";
//   import MultiSelect from '../../../utils/MultiSelect.vue';
  
export default {
  name: "FamilyTree",
  props: {
    FamilyTree: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.updateSubforms();  // Initialize the subforms when the component is created
    console.log("<<<<<< ==== this.FamilyTree ======>>>>>>>>>>>>>>>>", this.FamilyTree);
  },
  watch: {
    FamilyTree: {
      handler() {
        console.log("<<<<<< ==== FamilyTree Updated ======>>>>>>>>>>>>>>>>", this.FamilyTree);
        this.formData = { ...this.FamilyTree };
        this.updateSubforms();  // Update the subforms when FamilyTree prop changes
      },
      deep: true,
    },
  },
  data() {
    return {
      formData: { ...this.FamilyTree },
      choice: { ...choice },
      dependentParentsOption: { ...dependentParentsOption },
      relationShipStatusOptions: { ...relationShipStatusOptions },
      dependentChildrenOption: { ...dependentChildrenOption },
      siblingsOption: { ...siblingsOption },
      emgContactSubform: [],
      siblingSubform: [],
      depChildSubform: [],
      depParentSubform: [],
      errors: {},
    };
  },
  methods: {
    updateSubforms() {
      // Safely assign subform data if available, otherwise fallback to an empty array
      this.emgContactSubform = this.FamilyTree.emergencyContactData ? [...this.FamilyTree.emergencyContactData] : [];
      this.siblingSubform = this.FamilyTree.siblingData ? [...this.FamilyTree.siblingData] : [];
      this.depChildSubform = this.FamilyTree.dependentChildrenData ? [...this.FamilyTree.dependentChildrenData] : [];
      this.depParentSubform = this.FamilyTree.dependentParentsData ? [...this.FamilyTree.dependentParentsData] : [];
    },
    addSubformRow(type) {
      switch (type) {
        case "emergencyContacts":
          this.emgContactSubform.push({
            emergencyContactName: "",
            emergencyContactPhone: "",
            emergencyContactRelationship: "",
            emergencyContactEmail: "",
          });
          break;
        case "siblings":
          this.siblingSubform.push({
            relationship: "",
            name: "",
            email: "",
            phone: "",
            dob: "",
            age: "",
          });
          break;
        case "dependentChildren":
          this.depChildSubform.push({
            relationship: "",
            name: "",
            email: "",
            phone: "",
            dob: "",
            age: "",
          });
          break;
        case "dependentParents":
          this.depParentSubform.push({
            relationship: "",
            name: "",
            email: "",
            phone: "",
            dob: "",
            age: "",
          });
          break;
        default:
          break;
      }
    },
    removeSubformRow(type, index) {
      switch (type) {
        case "emergencyContacts":
          this.emgContactSubform.splice(index, 1);
          break;
        case "siblings":
          this.siblingSubform.splice(index, 1);
          break;
        case "dependentChildren":
          this.depChildSubform.splice(index, 1);
          break;
        case "dependentParents":
          this.depParentSubform.splice(index, 1);
          break;
        default:
          break;
      }
    },
    nextStep() {
      this.$emit("next", {
        ...this.formData,
        dependentChildrenData: this.depChildSubform,
        dependentParentsData: this.depParentSubform,
        siblingData: this.siblingSubform,
        emergencyContactData: this.emgContactSubform,
      });
    },
    previousStep() {
      this.$emit("previous");
    },
  },
};
  </script>
  <style>
  .main-heading {
    font-weight: 500 !important;
  }
  </style>