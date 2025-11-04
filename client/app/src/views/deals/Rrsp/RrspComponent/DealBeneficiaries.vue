<template>
    <div>
        <h5 class="main-heading mt-2">Deal Beneficiaries</h5>
        <div class="row mb-2">
            <div class="col-4 col-sm-4 mt-2 mt-sm-0">
                <label class="my-0">Is Client a Beneficiary?</label>
                <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                    aria-expanded="false">
                    <div class="select-box">
                        <select v-model="formData.isClientaBeneficiary"
                            class="multisteps-form__select form-control choices__input" name="choices-state">
                            <option v-for="(option, index) in isClientaBeneficiary" :key="index" :value="option">
                                {{ option }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-4 col-sm-4 mt-2 mt-sm-0">
                <label class="my-0">Are there Multiple Beneficiaries excl. Client ?</label>
                <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                    aria-expanded="false">
                    <div class="select-box">
                        <select v-model="formData.arethereMultipleBeneficiariesexclClient"
                            class="multisteps-form__select form-control choices__input" name="choices-state">
                            <option v-for="(option, index) in arethereMultipleBeneficiariesexclClient" :key="index"
                                :value="option">
                                {{ option }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="my-0">Number of Beneficiaries</label>
                <input v-model="formData.numberOfBeneficiariesUpto" type="text"
                    class="form-control form-control-default"/>
            </div>
        </div>      
        <div style="width: 100%; overflow: scroll">
            <table class="table border table-responsive subform">
                <thead class="table subform-table-head text-white">
                    <tr>
                        <th>#</th>
                        <th>Actions</th>
                        <th>Beneficiary Name</th>
                        <th>Beneficiary Relationship with Insured</th>
                        <th>Beneficiary Phone</th>
                        <th>Beneficiary Email</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="(beneficiary, index) in formData.beneficiariesData" :key="index">
                        <td class="m-auto">{{ index + 1 }}</td>
                        <td>
                            <a @click.prevent="deleteLeadsRow(index)" href="javascript:;" data-bs-toggle="tooltip"
                                data-bs-original-title="Delete product">
                                <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                            </a>
                        </td>
                        <td>
                            <input v-model="beneficiary.beneficiaryName" @change="dealTrustee()" type="text" class="form-control form-control-default"
                                autocomplete="off">
                        </td>
                        <td>
                            <input v-model="beneficiary.beneficiaryRelationshipwithInsured" type="text"
                                class="form-control form-control-default" autocomplete="off">
                        </td>
                        <td>
                            <input v-model="beneficiary.beneficiaryPhone" type="tel" class="form-control form-control-default"
                                autocomplete="off" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
                        </td>
                        <td>
                            <input v-model="beneficiary.beneficiaryEmail" type="email" class="form-control form-control-default"
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
import { reactive } from 'vue';

export default {
    name: "LeadManagementHistory",
    props: {
        getDealBeneficiaries: {
            type: Function,
            required: true
        },
        DealTrustee: {
            type: Object,
            required: true  
        }
    },
    setup() {
     
        const formData = reactive({
            isClientaBeneficiary: "",
            arethereMultipleBeneficiariesexclClient: "",
            numberofBeneficiariesupto4: "",
            beneficiariesData: []
        });

        const isClientaBeneficiary = [
            "None",
            "Yes",
            "No"
        ];

        const arethereMultipleBeneficiariesexclClient = [
            "None",
            "Yes Upto 4",
            "More than 4 to 6"
        ];

        function addRowTodealDataTable() {
            formData.beneficiariesData.push({
                beneficiaryName: "",
                beneficiaryRelationshipwithInsured: "",
                beneficiaryPhone: "",
                beneficiaryEmail: ""
            });
        }

        function deleteLeadsRow(index) {
            formData.beneficiariesData.splice(index, 1);
        }

        return {
            
            formData,
            isClientaBeneficiary,
            arethereMultipleBeneficiariesexclClient,
            addRowTodealDataTable,
            deleteLeadsRow
        };
    },
    methods:{
        dealTrustee(){
            console.log("this is testin function", );
            this.getDealBeneficiaries(this.formData)
            // console.log("this is testin function",getDealBeneficiaries );
        },
        sendData(){   

        this.getDealBeneficiaries(this.formData);
        },
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
