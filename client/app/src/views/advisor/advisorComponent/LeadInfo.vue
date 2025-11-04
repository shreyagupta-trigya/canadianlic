<template>
  <div>
    <h5 class="main-heading mt-2 mb-0 ps-2">Lead Information</h5>

    <div class="row ps-2">
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Best Time To Call</label>
        <input
          v-model="formData.bestTimeToCall"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-6">
        <label for="Location" class="form-label text-muted my-0 "
          >Location Name 2</label
        >
        <select class="form-select" v-model="formData.location2" id="location2">
          <option value="" disabled selected class="text-muted">
            Select Location
          </option>
          <option
            v-for="(location2) in locationArr"
            :value="location2.ROWID"
            :key="location2.ROWID"
          >
            {{ location2.name }}
          </option>
        </select>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Referral Name - Client</label>
        <input
          v-model="formData.referralNameClient"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Referral Name - Others</label>
        <input
          v-model="formData.referralNameClient"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="preferredContact" class="my-0"
          >Preferred Contact Method
        </label>
        <select
          class="form-select"
          v-model="formData.preferredContact"
          formData.referredBy
          id="preferredContact">
        <option v-for="(option, index) in preferredContactMethod" :key="index" :value="option">
          {{ option }}
          </option>
        </select>
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="preferredContactTime" class="my-0"
          >Preferred Contact Time
        </label>
        <select
          class="form-select"
          v-model="formData.preferredContactTime"
          formData.referredBy
          id="preferredContactTime"
        >
        <option v-for="(option, index) in preferredContactTimeOptions" :key="index" :value="option">
          {{ option }}
          </option>
        </select>
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="Reassignment" class="my-0">Is this a Reassignment?</label>
        <select
          class="form-select"
          v-model="formData.isthisaReassignment"
          formData.isthisaReassignment
          id="Reassignment"
        >
        <option v-for="(option, index) in isthisaReassignmentOptions" :key="index" :value="option">
                {{ option }}
              </option>

        </select>
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="loanProtection" class="my-0">Loan Protection</label>
        <select
          class="form-select"
          v-model="formData.loanProtection"
          id="loanProtection"
        >
        <option v-for="(option, index) in loanProtectionOption" :key="index" :value="option">
                {{ option }}
              </option>

        </select>
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="loanProtection" class="my-0">Referral Source</label>
        <select
          class="form-select"
          v-model="formData.referralSource"
          id="ReferralSource"
        >
        <option v-for="(option, index) in referralSourceOptions" :key="index" :value="option">
                {{ option }}
              </option>

        </select>
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="socialMediaInfo" class="my-0"
          >Social Media Information</label
        >
        <select
          class="form-select"
          v-model="formData.socialMediaInfo"
          id="socialMediaInfo"
        >
        <option v-for="(option, index) in socialMediaInfoOption" :key="index" :value="option">
                {{ option }}
              </option>

        </select>
      </div>

      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="groupInsurance" class="my-0">Group Insurance</label>
        <select
          class="form-select"
          v-model="formData.groupInsurance"
          id="groupInsurance"
        >
        <option v-for="(option, index) in groupInsuranceOption" :key="index" :value="option">
                {{ option }}
              </option>

          
        </select>
      </div>

      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="referredBy" class="my-0">Referred by </label>
        <select
          class="form-select"
          v-model="formData.referredBy"
          formData.referredBy
          id="Reassignment"
        >
        <option v-for="(option, index) in referredByOptions" :key="index" :value="option">
                {{ option }}
              </option>
         
        </select>
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="ifreferredbyAdvisor" class="my-0"
          >If referred by Advisor or External Referral - Name
        </label>
        <input
          type="text"
          v-model="formData.ifreferredbyAdvisor"
          class="form-control"
          id="ifreferredbyAdvisor"
        />
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="citizenshipStatus" class="my-0">Citizenship Status </label>
        <select
          class="form-select"
          v-model="formData.citizenshipStatus"
          formData.referredBy
          id="citizenshipStatus"
        >
        <option v-for="(option, index) in citizenshipStatusOptions" :key="index" :value="option">
                {{ option }}
              </option>
        
        </select>
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="understandingOfInsurance" class="my-0"
          >Understanding of Insurance
        </label>
        <select
          class="form-select"
          v-model="formData.understandingOfInsurance"
          formData.understandingOfInsurance
          id="understandingOfInsurance"
        >
        <option v-for="(option, index) in understandingOfInsuranceOptions" :key="index" :value="option">
                {{ option }}
              </option>
        </select>
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="existingInsurancePolicy" class="my-0"
          >Existing Insurance Policy?
        </label>
        <select
          class="form-select"
          v-model="formData.existingInsurancePolicy"
          formData.existingInsurancePolicy
          id="existingInsurancePolicy"
        >
        <option v-for="(option, index) in existingInsurancePolicyOptions" :key="index" :value="option">
                {{ option }}
              </option>
        </select>
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="existingInsurancePolicy" class="my-0"
          >Services Requested
        </label>
        <select
          class="form-select"
          v-model="formData.serviceRequested"
          formData.serviceRequested
          id="serviceRequested"
        >
        <option v-for="(option, index) in serviceRequestedOptions" :key="index" :value="option">
                {{ option }}
              </option>
        </select>
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="doYouOwnHomeInCanada" class="my-0"
          >Do you own a home in Canada?
        </label>
        <select
          class="form-select"
          v-model="formData.doYouOwnHomeInCanada"
          formData.doYouOwnHomeInCanada
          id="understandingOfInsurance"
        >
        <option v-for="(option, index) in doYouOwnHomeInCanadaOptions" :key="index" :value="option">
                {{ option }}
              </option>
        </select>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Existing Policy Renewal Due By</label>
        <input
          v-model="formData.existingPolicyRenewalDueBy"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="doYouhaveLifeInsurance" class="my-0"
          >Do you have life insurance?
        </label>
        <select
          class="form-select"
          v-model="formData.doYouHaveLifeInsurance"
          formData.doYouHaveLifeInsurance
          id="understandingOfInsurance"
        >
        <option v-for="(option, index) in doYouHaveLifeInsuranceOptions" :key="index" :value="option">
                {{ option }}
              </option>
        </select>
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="doYouhaveLifeInsurance" class="my-0">
          Product Category Referred
        </label>
        <select
          class="form-select"
          v-model="formData.productCataegory"
          id="productCataegory"
        >
        <option v-for="(option, index) in productCataegoryOptions" :key="index" :value="option">
                {{ option }}
              </option>
        </select>
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
    <label for="livingBenefitsCategory" class="my-0">
        Living Benefits 
    </label>
    <select
        class="form-select"
        v-model="formData.livingBenefits"
        id="livingBenefitsCategory"
    >
    <option v-for="(option, index) in livingBenefitsCategoryOptions" :key="index" :value="option">
                {{ option }}
              </option>
    </select>
</div>

      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Submit Page URL</label>
        <input
          v-model="formData.submitPageUrl"
          type="url"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Assigned Campaigns</label>
        <input
          v-model="formData.assignedCampaigns"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Potential Business (Policy Values)1</label>
        <input
          v-model="formData.potentialBusiness"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Insurence Leads Scoring Positive Score</label>
        <input
          v-model="formData.insuranceLeadScoringPositiveScore"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2"
          >Insurance Leads Scoring Touch Point Score</label
        >
        <input
          v-model="formData.insuranceLeadsScoringTouchPointScore"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Insurence Leads Scoring Negative Score</label>
        <input
          v-model="formData.insuranceLeadScoringNegativeScore"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Insurance Leads Scoring Score</label>
        <input
          v-model="formData.insuranceLeadScoringScore"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2"
          >Insurence Leads scoring Positive Touch Point Score</label
        >
        <input
          v-model="formData.insuranceLeadPositiveTouchScoringScore"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2"
          >Insurence Leads Scoring Negative Touch Point Score</label
        >
        <input
          v-model="formData.insuranceLeadNegativeTouchScoringScore"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Coverage you are Looking for?</label>
        <input
          v-model="formData.coverageLokkingFor"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="doYouhaveLifeInsurance" class="my-0">Gender1</label>
        <select class="form-select"
          v-model="formData.gender"
          formData.gender
          id="gender"
        >
        <option v-for="(option, index) in genderOptions" :key="index" :value="option">
                {{ option }}
              </option>
        </select>
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="doYouhaveLifeInsurance" class="my-0"
          >Additional Contact Information?1
        </label>
        <select
          class="form-select"
          v-model="formData.addContactInfo"
          formData.gender
          id="addContactInfo"
        >
          <option value="Status" selected class="text-muted"></option>
          <option value="-None-">-None-</option>
          <option value="Available">Available</option>
          <option value="UnAvailable">UnAvailable</option>
        </select>
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="doYouhaveLifeInsurance" class="my-0">Net Worth2 </label>
        <select
          class="form-select"
          v-model="formData.netWorth"
          formData.netWorth
          id="netWorth"
        >
          <option value="-unkown-">-unkown-</option>
          <option value="low">low</option>
          <option value="High">High</option>
          <option value="Moderate">Moderate</option>
        </select>
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="genderprediction" class="my-0">Gender Predication1</label>
        <select
          class="form-select"
          v-model="formData.genderprediction"
          formData.genderprediction
          id="genderprediction"
        >
        <option v-for="(option, index) in genderpredictionOptions" :key="index" :value="option">
                {{ option }}
              </option>
        </select>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Currency</label>
        <input
          v-model="formData.currency"
          type="text"
          disabled
          placeholder="CAD"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Round Robin Assignment Time</label>
        <input
          v-model="formData.roundRobinAssignmentTime"
          type="datetime-local"
          placeholder="CAD"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Gender Predication</label>
        <input
          v-model="formData.GenderPredication"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Next Follow Up Date & Time</label>
        <input
          v-model="formData.nextFollowUpDateTime"
          type="datetime-local"
          placeholder="CAD"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Date Of Birth1</label>
        <input
          v-model="formData.dob"
          type="date"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Lead Created On</label>
        <input
          v-model="formData.leadCreatedOn"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="oldLeadDatabase" class="my-0">Old Database Lead?1 </label>
        <select
          class="form-select"
          v-model="formData.oldLeadDatabase"
          id="oldLeadDatabase"
        > <option v-for="(option, index) in oldLeadDatabaseOptions" :key="index" :value="option">
                {{ option }}
              </option>
          
        </select>
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="emailIsValid" class="my-0">Email is valid</label>
        <select
          class="form-select"
          v-model="formData.emailIsValid"
          formData.emailIsValid
        >
        <option v-for="(option, index) in emailIsValidOptions" :key="index" :value="option">
                {{ option }}
              </option>
        </select>
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4 d-flex">
        <label class="my-0 pe-2" for="combinationHybird">
          Combination or Hybrid Insurance
        </label>
        <input
          class="form-check-input border"
          type="checkbox"
          v-model="formData.combinationHybird"
          id="combinationHybird"
        />
      </div> 
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4 d-flex">
        <label class="my-0 pe-2" for="roundRobinProcessed1">
          Round Robin Processed1
        </label>
        <input
          class="form-check-input border"
          type="checkbox"
          v-model="formData.roundRobinProcessed1"
          id="roundRobinProcessed1"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6 d-flex">
        <label 
          for="emailRoundRobinOwner2"
          class="form-label text-muted mb-1 mt-1 my-0 pe-2"
          >Email Round Robin Owner2</label
        >
        <input
          type="checkbox"
          v-model="formData.emailRoundRobinOwner2"
          class="form-check-input"
          id="emailRoundRobinOwner2"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6 d-flex">
        <label
          for="eligibleRoundRobinOwnerFound1"
          class="form-label text-muted mb-1 mt-1 my-0 pe-2"
          >Eligible Round Robin Owner Found1</label
        >
        <input
          type="checkbox"
          v-model="formData.eligibleRoundRobinOwnerFound1"
          class="form-check-input"
          id="eligibleRoundRobinOwnerFound1"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6 d-flex">
        <label for="rerunroundrobin" class="form-label text-muted mb-1 mt-1 my-0 pe-2"
          >Re-run round robin</label
        >
        <input
          type="checkbox"
          v-model="formData.rerunroundrobin"
          class="form-check-input"
          id="rerunroundrobin"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6 d-flex">
        <label
          for="healthAndDentalInsurance"
          class="form-label text-muted mb-1 mt-1 my-0 pe-2"
          >Health & Dental Insurance</label
        >
        <input
          type="checkbox"
          v-model="formData.healthAndDentalInsurance"
          class="form-check-input"
          id="healthAndDentalInsurance"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6 d-flex">
        <label for="rCSMSOptOut" class="form-label text-muted mb-1 mt-1 my-0 pe-2"
          >RC SMS Opt Out</label
        >
        <input
          type="checkbox"
          v-model="formData.rCSMSOptOut"
          class="form-check-input"
          id="rCSMSOptOut"
        />
      </div>
    </div>
    <h5 class="main-heading mt-2 mb-0 ps-2">FaceBook Ad Information</h5>
    <!-- Ad Account -->
    <div class="row ps-2">
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Ad Account</label>
        <input
          v-model="formData.adAccount"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <!-- Ad Account ID -->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Ad Account ID</label>
        <input
          v-model="formData.adAccountId"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="doYouhaveLifeInsurance" class="my-0"
          >Facebook Ad Information ?
        </label>
        <select
          class="form-select"
          v-model="formData.fbAdInfo"
          formData.fbAdInfo
          id="understandingOfInsurance"
        >
          <option value="Status" selected class="text-muted">
            Facebook Ad Information ?
          </option>
          <option value="-None-">-None-</option>
          <option value="Available">Available</option>
          <option value="UnAvailable">UnAvailable</option>
        </select>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Ad Campaign</label>
        <input
          v-model="formData.adCampaign"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <!-- Ad Campaign ID -->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Ad Campaign ID</label>
        <input
          v-model="formData.adCampaignId"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Facebook Page</label>
        <input
          v-model="formData.faceBookPage"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <!-- Facebook Page ID -->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Facebook Page ID</label>
        <input
          v-model="formData.faceBookPageId"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Cost Per Lead (CPL)</label>
        <input
          v-model="formData.costPerLead"
          type="text"
          class="form-control form-control-default"
        />
      </div>

      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Ad Set</label>
        <input
          v-model="formData.adSet"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <!-- Ad Set ID -->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Ad Set ID</label>
        <input
          v-model="formData.adSetId"
          type="text"
          class="form-control form-control-default"
        />
      </div>

      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Facebook Ad</label>
        <input
          v-model="formData.facebookAd"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <!-- Ad ID -->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Ad ID</label>
        <input
          v-model="formData.adId"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Lead Form</label>
        <input
          v-model="formData.leadForm"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <!-- Lead Form ID -->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Lead Form ID</label>
        <input
          v-model="formData.leadFormId"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <!-- Skype ID ID -->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Skype ID 1</label>
        <input
          v-model="formData.skypeID"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <!-- Instagram  -->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Instagram1
        </label>
        <input
          v-model="formData.instagramID"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <!-- Instagram ID -->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">LinkedIn1</label>
        <input
          v-model="formData.linkedin1"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Facebook1</label>
        <input
          v-model="formData.fb1"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <!-- Twitter ID -->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Twitter1</label>
        <input
          v-model="formData.twitter1"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="referredBy" class="my-0">Investments1 </label>
        <select
          class="form-select"
          v-model="formData.investment"
          formData.referredBy
          id="Reassignment"
        >
        <option v-for="(option, index) in investmentOptions" :key="index" :value="option">
                {{ option }}
              </option>
        </select>
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="lifeInsurance" class="my-0">Life Insurance</label>
        <select
          class="form-select"
          v-model="formData.lifeInsurance"
          id="Reassignment"
        >
        <option v-for="(option, index) in lifeInsuranceOptions" :key="index" :value="option">
                {{ option }}
              </option>
        </select>
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="travelInsurance" class="my-0">Travel Insurance</label>
        <select
          class="form-select"
          v-model="formData.travelInsurance"
          id="travelInsurance"
        >
        <option v-for="(option, index) in travelInsuranceOptions" :key="index" :value="option">
                {{ option }}
              </option>
        </select>
      </div>

      <h5 class="main-heading mt-2 mb-0 mt-2">Social Media</h5>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Skype ID</label>
        <input
          v-model="formData.skypeID"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Facebook</label>
        <input
          v-model="formData.facebook"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Twitter</label>
        <input
          v-model="formData.twitter"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Linked In</label>
        <input
          v-model="formData.linkedin"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">Google Review</label>
        <input
          v-model="formData.googleReview"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0 mt-2">YouTube Video</label>
        <input
          v-model="formData.youtubeVedio"
          type="text"
          class="form-control form-control-default"
        />
      </div>
    </div>
  </div>
  <div class="button-row d-flex justify-content-center mt-4 gap-4 space">
    <button
    class="btn mb-1 bg-gradient-light btn-md null null js-btn-prev"
    type="button"
    @click="previousStep"
  >
    Prev
  </button>
  <button
    class="btn mb-1 bg-gradient-dark btn-md null null js-btn-next"
    @click.prevent="nextStep"
    type="button"
  >
    Next
  </button> 
  </div>
</template>

<script>
import{preferredContactMethod,productCataegoryOptions,livingBenefitsCategoryOptions,genderOptions,genderpredictionOptions,emailIsValidOptions,oldLeadDatabaseOptions,investmentOptions,lifeInsuranceOptions,travelInsuranceOptions
  ,doYouHaveLifeInsuranceOptions,doYouOwnHomeInCanadaOptions,serviceRequestedOptions,existingInsurancePolicyOptions,understandingOfInsuranceOptions,citizenshipStatusOptions,referredByOptions,groupInsuranceOption,referralSourceOptions,preferredContactTimeOptions,loanProtectionOption,socialMediaInfoOption,isthisaReassignmentOptions} from "../utils/picklist"
export default {
  name: "FacebookAdInformation",
  props: {
    leadInfo: {
      type: Function,
      required: true,
    },
    location:{
      type: Object,
      required: true,
    }  
  },
  data() {
    return {
      formData: { ...this.leadInfo },   
      preferredContactMethod:{...preferredContactMethod}, 
      preferredContactTimeOptions:{...preferredContactTimeOptions},
      isthisaReassignmentOptions:{...isthisaReassignmentOptions}, 
      loanProtectionOption:{...loanProtectionOption},
      referralSourceOptions:{...referralSourceOptions},
      socialMediaInfoOption:{...socialMediaInfoOption},
      groupInsuranceOption:{...groupInsuranceOption},
      referredByOptions:{...referredByOptions},
      citizenshipStatusOptions:{...citizenshipStatusOptions},
      understandingOfInsuranceOptions:{...understandingOfInsuranceOptions},
      existingInsurancePolicyOptions:{...existingInsurancePolicyOptions},
      serviceRequestedOptions:{...serviceRequestedOptions},
      doYouOwnHomeInCanadaOptions:{...doYouOwnHomeInCanadaOptions},
      doYouHaveLifeInsuranceOptions:{...doYouHaveLifeInsuranceOptions},
      productCataegoryOptions:{...productCataegoryOptions},
      livingBenefitsCategoryOptions:{...livingBenefitsCategoryOptions},
      genderOptions:{...genderOptions},
      genderpredictionOptions:{...genderpredictionOptions},
      emailIsValidOptions:{...emailIsValidOptions},
      oldLeadDatabaseOptions:{...oldLeadDatabaseOptions},
      investmentOptions:{...investmentOptions},
      lifeInsuranceOptions:{...lifeInsuranceOptions},
      travelInsuranceOptions:{...travelInsuranceOptions},

    }
  },
  watch: {
    leadInfo: {
      handler(formData) {
        formData = { ...this.leadInfo };
        this.locationArr = { ...this.location };
        console.log("this formData deal facebook", formData);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    nextStep() {
      this.$emit("next", { ...this.formData });  
    },
    previousStep() {
      this.$emit("previous");
    },
  },
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
  .space{
    margin-bottom:150px;
  }
}
</style>
