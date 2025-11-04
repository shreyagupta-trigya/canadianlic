<template>
  <div class="">
    <h5 class="main-heading mb-0 mt-4 ps-2">Referral Scoreboard</h5>
    <div style="width: 100%; overflow: scroll">
      <table class="table border table-responsive">
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>Actions</th>
            <th>Annual Referral Slab</th>
            <th>Referral Level</th>
            <th>Referral Product Category</th>
            <th>Referral Payout Category</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(parent, index) in scoreboardData" :key="index">
            <td class="m-auto">{{ index + 1 }}</td>
            <td>
              <a
                @click.prevent="deleteReferralCardRow(index, parent.ROWID)"
                href="javascript:;"
                data-bs-toggle="tooltip"
                data-bs-original-title="Delete product"
                ><i class="fas fa-trash text-secondary" aria-hidden="true"></i
              ></a>
            </td>
            <td>
              <div class="select-box">
                <select
                  v-model="parent.annualReferralSlab"
                  required
                  id="choices-state"
                  class="multisteps-form__select form-control choices__input mb-0 form-select"
                  name="choices-state"
                  tabindex="-1"
                  data-choice="active"
                >
                  <option
                    v-for="(option, index) in annualReferralSlabOptions"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
            </td>
            <td>
              <div class="select-box">
                <select
                  v-model="parent.referralLevel"
                  required
                  id="choices-state"
                  class="multisteps-form__select form-control choices__input mb-0 form-select"
                  name="choices-state"
                  tabindex="-1"
                  data-choice="active"
                >
                  <option
                    v-for="(option, index) in referralLevelOptions"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
            </td>
            <td>
              <div class="select-box">
                <select
                  v-model="parent.productCategory"
                  required
                  id="choices-state"
                  class="multisteps-form__select form-control choices__input mb-0 form-select"
                  name="choices-state"
                  tabindex="-1"
                  data-choice="active"
                >
                  <option
                    v-for="(option, index) in productCategoryOptions"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
            </td>
            <td>
              <div class="select-box">
                <select
                  v-model="parent.payoutCategory"
                  required
                  id="choices-state"
                  class="multisteps-form__select form-control choices__input mb-0 form-select"
                  name="choices-state"
                  tabindex="-1"
                  data-choice="active"
                >
                  <option
                    v-for="(option, index) in referralPayoutOptions"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <button
      class="btn mb-0 bg-gradient-dark btn-md null null"
      type="button"
      @click.prevent="addRowToReferralScoreCard"
    >
      Add Row
    </button>
  </div>
  <div class="button-row d-flex justify-content-center mt-2 gap-4">
    <button
      class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev"
      type="button"
      @click="previousStep"
    >
      Prev
    </button>
    <button
      v-if="!id"
      class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next"
      type="button"
      @click.prevent="nextStep"
    >
      Submit
    </button>
  </div>
</template>
<style></style>
<script>
import {referralPayoutOptions,productCategoryOptions,referralLevelOptions,annualReferralSlabOptions} from "../utils/data.js"

export default {
  name: "Refferal Scoreboard",
  props: {
    RefferalScoreboard: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formData: { ...this.RefferalScoreboard },
      scoreboardData: [],
      referralPayoutOptions:{...referralPayoutOptions},
      productCategoryOptions:{...productCategoryOptions},
      referralLevelOptions:{...referralLevelOptions},
      annualReferralSlabOptions:{...annualReferralSlabOptions},
    };
  },
  watch: {
    RefferalScoreboard: {
      handler(formData) {
        this.formData = { ...this.RefferalScoreboard };
        console.log("this is testing form data of refferalscoreboard",formData);
        this.scoreboardData = this.formData?.scoreboardData || [];
      },
      immediate: true,
      deep: true,
    }
  },
  methods: {
    addRowToReferralScoreCard() {
      this.scoreboardData.push({
        annualReferralSlab: "",
        referralLevel: "",
        productCategory: "",
        payoutCategory: "",
      });
    },
    deleteReferralCardRow(index) {
      this.scoreboardData.splice(index, 1);
    },
    nextStep() {
      this.$emit("next", {...this.formData, scoreboardData:this.scoreboardData});
    },
    previousStep() {
      this.$emit("previous", {...this.formData, scoreboardData:this.scoreboardData});
    },
  },
};
</script>
