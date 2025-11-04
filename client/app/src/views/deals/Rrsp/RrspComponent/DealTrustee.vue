<template>
    <div>
        <h5 class="main-heading mt-2">Deal Trustee </h5>
        <div class="row mb-2">
            <div class="col-4 col-sm-4 mt-2 mt-sm-0">
                <label class="my-0">Are there Trustees for this Policy?</label>
                <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                    aria-expanded="false">
                    <div class="select-box">
                        <select v-model="formData.areThereTrusteesforThisPolicy"
                            class="multisteps-form__select form-control choices__input" name="choices-state">
                            <option v-for="(option, index) in areThereTrusteesforThisPolicy" :key="index"
                                :value="option">
                                {{ option }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-4 col-sm-4 mt-2 mt-sm-0">
                <label class="my-0">Trust Documents Received and Uploaded </label>
                <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                    aria-expanded="false">
                    <div class="select-box">
                        <select v-model="formData.trustDocumentsReceivedAndUploaded"
                            class="multisteps-form__select form-control choices__input" name="choices-state">
                            <option v-for="(option, index) in trustDocumentsReceivedAndUploaded" :key="index"
                                :value="option">
                                {{ option }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="col-4 col-sm-4 mt-2 mt-sm-0">
                <label class="my-0">Trust Dissolution Date</label>
                <div>
                    <input class="form-control" type="date" v-model="formData.trustDissolutionDate" />
                </div>
            </div>
            <div class="col-4 col-sm-4 mt-2 mt-sm-0">
                <label class="my-0">Application On</label>
                <div>
                    <input class="form-control" type="date" v-model="formData.applicationOn" />
                </div>
            </div>
            <div class="col-4 col-sm-4 mt-2 mt-sm-0">
                <label class="my-0">Number of trustees</label>
                <div>
                    <input class="form-control" type="text" v-model="formData.numberOfTrustees" />
                </div>
            </div>

        </div>
        <div style="width: 100%; overflow: scroll">
            <table class="table border table-responsive subform">
                <thead class="table subform-table-head text-white">
                    <tr>
                        <th>#</th>
                        <th>Actions</th>
                        <th>Name of Trustee</th>
                        <th>Name of Beneficiary for Trustee</th>
                        <th>Relationship with Beneficiary for Trustee</th>
                        <th>Trustee Phone</th>
                        <th>Trustee Email</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="(parent, index) in formData.trusteeData" :key="index">
                        <td class="m-auto">{{ index + 1 }}</td>
                        <td>
                            <a @click.prevent="deleteLeadsRow(index)" href="javascript:;" data-bs-toggle="tooltip"
                                data-bs-original-title="Delete product">
                                <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                            </a>
                        </td>
                        <td>
                            <input v-model="parent.nameOfTrustee"  @change="dealTrustee()" type="text" class="form-control form-control-default"
                                autocomplete="off">
                        </td>
                        <td>
                            <input v-model="parent.nameOfBeneficiaryForTrustee" type="text"
                                class="form-control form-control-default" autocomplete="off">
                        </td>
                        <td>
                            <input v-model="parent.relationshipWithBeneficiaryForTrustee" type="text"
                                class="form-control form-control-default" autocomplete="off">
                        </td>
                        <td>
                            <input v-model="parent.trusteePhone" type="tel" class="form-control form-control-default"
                                autocomplete="off" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
                        </td>
                        <td>
                            <input v-model="parent.trusteeEmail" type="email" class="form-control form-control-default"
                                autocomplete="off">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button class="btn mb-0 btn-color btn-md" type="button" @click.prevent="addRowTodealDataTable">
            Add Row
        </button>
    </div>
</template>

<script>
import { reactive,computed } from 'vue';
export default {
    name: "DealTrustee", // Make sure this name matches your component's intended use
    props: {
        getApplicationCal: {
            type: Function,
            required: true
        },
        getDealTrustee: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const numberOfTrustees = reactive(computed(() => formData.trusteeData.length))
        const formData = reactive({
            areThereTrusteesforThisPolicy: "",
            trustDocumentsReceivedAndUploaded: "",
            trustDissolutionDate: "",
            applicationOn: "",
            numberOfTrustees: numberOfTrustees, // This will be managed automatically by the computed property
            trusteeData: []
        });

        // Initialize formData with props.DealTrustee if provided
        if (props.DealTrustee) {
            Object.assign(formData, props.DealTrustee);
        }

        return {
            formData,
            areThereTrusteesforThisPolicy: [
                "None",
                "Yes",
                "No"
            ],
            trustDocumentsReceivedAndUploaded: [
                "None",
                "Yes",
                "No"
            ],
            addRowTodealDataTable() {
                console.log("Adding new row to trusteeData");
                formData.trusteeData.push({
                    nameOfTrustee: "",
                    nameOfBeneficiaryForTrustee: "",
                    relationshipWithBeneficiaryForTrustee: "",
                    trusteePhone: "",
                    trusteeEmail: ""
                });
                console.log(formData.trusteeData); // Check if the array is updated
            },
            deleteLeadsRow(index) {
                formData.trusteeData.splice(index, 1);
            },
            // sendData() {
            //     props.getDealTrustee(formData);
            // }
        };
    },
    methods:{
        dealTrustee(){
            this.getDealTrustee(this.formData)
        }
    }
};
</script>
<style scoped>
.main-heading {
    font-weight: 500 !important;
}

.form-control-default {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem;
    width: 100%;
}

.my-0 {
    margin-bottom: 0 !important;
}
</style>