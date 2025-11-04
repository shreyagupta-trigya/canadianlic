<template>
  <div>
    <h5 class="main-heading mt-2 mb-0 ps-2">FaceBook Ad Information</h5>
    <div class="row ps-2 mx-1 card custom-card">
      <!-- Ad Account -->
      <div class="row ps-2 mx-1 card-surface   ">
        <div class="col-lg-3 col-md-3 col-sm-12">
          <label class="my-0 mt-2">Ad Account</label>
          <input v-model="formData.adAccount" type="text" class="form-control form-control-default" />
        </div>
        <!-- Ad Account ID -->
        <div class="col-lg-3 col-md-3 col-sm-12">
          <label class="my-0 mt-2">Ad Account ID</label>
          <input v-model="formData.adAccountId" type="text" class="form-control form-control-default" />
        </div>

        <div class="col-lg-3 col-md-3 col-sm-12">
          <label class="my-0 mt-2">Ad Campaign</label>
          <input v-model="formData.adCampaign" type="text" class="form-control form-control-default" />
        </div>
        <!-- Ad Campaign ID -->
        <div class="col-lg-3 col-md-3 col-sm-12">
          <label class="my-0 mt-2">Ad Campaign ID</label>
          <input v-model="formData.adCampaignId" type="text" class="form-control form-control-default" />
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12">
          <label class="my-0 mt-2">Facebook Page</label>
          <input v-model="formData.facebookPage" type="text" class="form-control form-control-default" />
        </div>
        <!-- Facebook Page ID -->
        <div class="col-lg-3 col-md-3 col-sm-12">
          <label class="my-0 mt-2">Facebook Page ID</label>
          <input v-model="formData.facebookPageId" type="text" class="form-control form-control-default" />
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12">
          <label class="my-0 mt-2">Cost Per Lead (CPL)</label>
          <input v-model="formData.costPerLead" type="text" class="form-control form-control-default" />
        </div>

        <div class="col-lg-3 col-md-3 col-sm-12">
          <label class="my-0 mt-2">Ad Set</label>
          <input v-model="formData.adSet" type="text" class="form-control form-control-default" />
        </div>
        <!-- Ad Set ID -->
        <div class="col-lg-3 col-md-3 col-sm-12">
          <label class="my-0 mt-2">Ad Set ID</label>
          <input v-model="formData.adSetId" type="text" class="form-control form-control-default" />
        </div>

        <div class="col-lg-3 col-md-3 col-sm-12">
          <label class="my-0 mt-2">Facebook Ad</label>
          <input v-model="formData.facebookAd" type="text" class="form-control form-control-default" />
        </div>
        <!-- Ad ID -->
        <div class="col-lg-3 col-md-3 col-sm-12">
          <label class="my-0 mt-2">Ad ID</label>
          <input v-model="formData.adId" type="text" class="form-control form-control-default" />
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12">
          <label class="my-0 mt-2">Lead Form</label>
          <input v-model="formData.leadForm" type="text" class="form-control form-control-default" />
        </div>
        <!-- Lead Form ID -->
        <div class="col-lg-3 col-md-3 col-sm-12">
          <label class="my-0 mt-2">Lead Form ID</label>
          <input v-model="formData.leadFormId" type="text" class="form-control form-control-default" />
        </div>
        
        <div class="col-lg-3 col-md-3 col-sm-12">
          <label class="my-0 mt-2">Facbook Ad Information ?</label>

          <select v-model="formData.facebookAd" class="form-control form-control-default">
            <option value="">Available</option>
            <option value="">Unavailable</option>
          </select>
        </div>
      </div>

      <h5 class="main-heading mt-2 mb-0 ps-2">Social Media Information</h5>
      <div class="row ps-2 mx-1 mt-1">
        <!-- Ad Account -->
        <div class="row ps-2 ms-1 card-surface mb-4  ">
          <div class="col-lg-3 col-md-3 col-sm-12">
            <label class="my-0 mt-2">Twitter</label>
            <input v-model="formData.twitter" type="text" class="form-control form-control-default" />
          </div>
          <div class="col-lg-3 col-md-3 col-sm-12">
            <label class="my-0 mt-2">Linkedin ID</label>
            <input v-model="formData.linkedinid" type="text" class="form-control form-control-default" />
          </div>
          <div class="col-lg-3 col-md-3 col-sm-12">
            <label class="my-0 mt-2">Skype ID</label>
            <input v-model="formData.skypeid" type="text" class="form-control form-control-default" />
          </div>
          <div class="col-lg-3 col-md-3 col-sm-12">
            <label class="my-0 mt-2">Facbook</label>
            <input v-model="formData.facebook" type="text" class="form-control form-control-default" />
          </div>
          <div class="col-lg-3 col-md-3 col-sm-12">
            <label class="my-0 mt-2">Instagram</label>
            <input v-model="formData.instagram" type="text" class="form-control form-control-default" />
          </div>
         
        </div>
         <div class="row ps-2 ms-1 card-surface mb-4">
            <div>
        <h5 class="main-heading mt-2 mb-0 ps-2">Score Summary</h5>
        <div class="row ps-2">
          <div class="col-lg-4 col-md-4 col-sm-12">
            <label class="my-0 mt-2">Insurance Leads Scoring Score</label>
            <input v-model="formData.insuranceLeadsScoringScore" type="number"
              class="form-control form-control-default" />
          </div>

          <div class="col-lg-4 col-md-4 col-sm-12">
            <label class="my-0 mt-2">Insurance Leads Scoring Positive Score</label>
            <!-- JSON: insuranceLeadScoringPositiveScore -->
            <input v-model="formData.insuranceLeadScoringPositiveScore" type="number"
              class="form-control form-control-default" />
          </div>

          <div class="col-lg-4 col-md-4 col-sm-12">
            <label class="my-0 mt-2">Insurance Leads Scoring Negative Score</label>
            <!-- JSON: insuranceLeadScoringNegativeScore (also has insuranceLeadsScoringNegativeScore) -->
            <input v-model="formData.insuranceLeadScoringNegativeScore" type="number"
              class="form-control form-control-default" />
          </div>

          <div class="col-lg-4 col-md-4 col-sm-12">
            <label class="my-0 mt-2">Insurance Leads Scoring Touch Point Score</label>
            <!-- JSON: insuranceLeadScoringTouchPointScore -->
            <input v-model="formData.insuranceLeadScoringTouchPointScore" type="number"
              class="form-control form-control-default" />
          </div>

          <div class="col-lg-4 col-md-4 col-sm-12">
            <label class="my-0 mt-2">Insurance Leads Scoring Positive Touch Point Score</label>
            <!-- JSON: insuranceLeadScoringPositiveTouchPointScore -->
            <input v-model="formData.insuranceLeadScoringPositiveTouchPointScore" type="number"
              class="form-control form-control-default" />
          </div>

          <div class="col-lg-4 col-md-4 col-sm-12">
            <label class="my-0 mt-2">Insurance Leads Scoring Negative Touch Point Score</label>
            <!-- JSON: insuranceLeadScoringNegativeTouchPointScore -->
            <input v-model="formData.insuranceLeadScoringNegativeTouchPointScore" type="number"
              class="form-control form-control-default" />
          </div>
        </div>
      </div>
         </div>
         <div class="row ps-2 ms-1 card-surface mb-4">
            <h5 class="main-heading mt-2 mb-0 ps-2 mt-4">Google AdWords Information</h5>
      <div class="row ps-2">
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">GCLID</label>
          <input v-model="formData.gclid" type="text" class="form-control form-control-default" />
        </div>

        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Keyword</label>
          <input v-model="formData.keyword" type="text" class="form-control form-control-default" />
        </div>

        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Click Type</label>
          <input v-model="formData.clickType" type="text" class="form-control form-control-default" />
        </div>

        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Device Type</label>
          <input v-model="formData.deviceType" type="text" class="form-control form-control-default" />
        </div>

        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Ad Network</label>
          <input v-model="formData.adNetwork" type="text" class="form-control form-control-default" />
        </div>

        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Search Partner Network</label>
          <input v-model="formData.searchPartnerNetwork" type="text" class="form-control form-control-default" />
        </div>

        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Ad Campaign Name</label>
          <input v-model="formData.adCampaignName" type="text" class="form-control form-control-default" />
        </div>

        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">AdGroup Name</label>
          <input v-model="formData.adGroupName" type="text" class="form-control form-control-default" />
        </div>

        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Ad</label>
          <input v-model="formData.ad" type="text" class="form-control form-control-default" />
        </div>

        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Ad Click Date</label>
          <input v-model="formData.adClickDate" type="date" class="form-control form-control-default" />
        </div>

        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Cost per Click</label>
          <input v-model="formData.costPerClick" type="number" step="0.01" class="form-control form-control-default"
            placeholder="CA$ 0.00" />
        </div>

        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Cost per Conversion</label>
          <input v-model="formData.costPerConversion" type="number" step="0.01"
            class="form-control form-control-default" placeholder="CA$ 0.00" />
        </div>

        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Conversion Exported On</label>
          <input v-model="formData.conversionExportedOn" type="date" class="form-control form-control-default" />
        </div>

        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Conversion Export Status</label>
          <input v-model="formData.conversionExportStatus" type="text" class="form-control form-control-default" />
        </div>

        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Reason for Conversion Failure</label>
          <input v-model="formData.conversionFailureReason" type="text" class="form-control form-control-default" />
        </div>
      </div>
         </div>
         <div class="row ps-2 ms-1 card-surface mb-4">
              <div class="mt-4">
        <h5 class="main-heading mt-2 mb-0 ps-2">UTM Details</h5>
        <div class="row ps-2">
          <div class="col-lg-4 col-md-4 col-sm-12">
            <label class="my-0 mt-2">Campaign ID Data</label>
            <!-- Your JSON has "assignedCampaigns"; keep lp if you later normalize -->
            <input v-model="formData.assignedCampaigns" type="text" class="form-control form-control-default" />
          </div>

          <div class="col-lg-4 col-md-4 col-sm-12">
            <label class="my-0 mt-2">Network Data</label>
            <input v-model="formData.networkData" type="text" class="form-control form-control-default" />
          </div>

          <div class="col-lg-4 col-md-4 col-sm-12">
            <label class="my-0 mt-2">Adgroup Data</label>
            <input v-model="formData.adgroupData" type="text" class="form-control form-control-default" />
          </div>

          <div class="col-lg-4 col-md-4 col-sm-12">
            <label class="my-0 mt-2">Device Data</label>
            <input v-model="formData.deviceData" type="text" class="form-control form-control-default" />
          </div>

          <div class="col-lg-4 col-md-4 col-sm-12">
            <label class="my-0 mt-2">Match Type Data</label>
            <input v-model="formData.matchTypeData" type="text" class="form-control form-control-default" />
          </div>

          <div class="col-lg-4 col-md-4 col-sm-12">
            <label class="my-0 mt-2">Keyword Data</label>
            <input v-model="formData.keywordData" type="text" class="form-control form-control-default" />
          </div>

          <div class="col-lg-4 col-md-4 col-sm-12">
            <label class="my-0 mt-2">GCLID Data</label>
            <input v-model="formData.gclidData" type="text" class="form-control form-control-default" />
          </div>

          <div class="col-lg-4 col-md-4 col-sm-12">
            <label class="my-0 mt-2">LP URL Data</label>
            <input v-model="formData.submitPageUrl" type="text" class="form-control form-control-default" />
          </div>
        </div>
      </div>
         </div>
         <div class="row ps-2 ms-1 card-surface mb-4">
                <div>
        <h5 class="main-heading mt-2 mb-0 ps-2 mt-4">Visit Summary</h5>
        <div class="row ps-2">
          <div class="col-lg-4 col-md-4 col-sm-12">
            <label class="my-0 mt-2">Most Recent Visit</label>
            <input v-model="formData.mostRecentVisit" type="date" class="form-control form-control-default" />
          </div>

          <div class="col-lg-4 col-md-4 col-sm-12">
            <label class="my-0 mt-2">Average Time Spent (Minutes)</label>
            <input v-model="formData.averageTimeSpent" type="number" class="form-control form-control-default" />
          </div>

          <div class="col-lg-4 col-md-4 col-sm-12">
            <label class="my-0 mt-2">Referrer</label>
            <input v-model="formData.referrer" type="text" class="form-control form-control-default" />
          </div>

          <div class="col-lg-4 col-md-4 col-sm-12">
            <label class="my-0 mt-2">First Visit</label>
            <input v-model="formData.firstVisit" type="date" class="form-control form-control-default" />
          </div>

          <!-- Right-side fields from SS -->
          <div class="col-lg-4 col-md-4 col-sm-12">
            <label class="my-0 mt-2">First Page Visited</label>
            <input v-model="formData.firstPageVisited" type="text" class="form-control form-control-default" />
          </div>

          <div class="col-lg-4 col-md-4 col-sm-12">
            <label class="my-0 mt-2">Number Of Chats</label>
            <input v-model="formData.numberOfChats" type="number" class="form-control form-control-default" />
          </div>

          <div class="col-lg-4 col-md-4 col-sm-12">
            <label class="my-0 mt-2">Visitor Score</label>
            <input v-model="formData.visitorScore" type="number" class="form-control form-control-default" />
          </div>

          <div class="col-lg-4 col-md-4 col-sm-12">
            <label class="my-0 mt-2">Days Visited</label>
            <input v-model="formData.daysVisited" type="number" class="form-control form-control-default" />
          </div>
        </div>
      </div>
         </div>
      </div>
    </div>
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
export default {
  name: "FacebookAdInformation",
  props: {
    Facebook: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formData: { ...this.Facebook }
    };
  },
  watch: {
    Facebook: {
      handler(formData) {
        formData = { ...this.Facebook };
        console.log("this formData deal facebook", formData);
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    nextStep() {
      this.$emit("next", { ...this.formData });
    },
    previousStep() {
      this.$emit("previous");
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

@media screen and (max-width:500px) {
  .space {
    margin-bottom: 150px;
  }
}
</style>