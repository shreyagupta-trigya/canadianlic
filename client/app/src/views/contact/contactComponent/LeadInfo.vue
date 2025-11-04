<template>
  <div>
    <h5 class="main-heading mb-0 ps-2">Lead info</h5>

    <div class=" card custom-card  ">
      <div class="row card-body w-100 ">
        <div class="card-surface row ps-2 ms-2 mb-3 w-100">
          <div class="col-lg-3 col-md-3 col-sm-6">
            <label class="mb-0 mt-2">Best Time To Call <span class="text-danger">*</span></label>

            <div class="form-group multisteps-form__input">
              <div class="">
                <input v-model="formData.bestTimeToCall" type="text" class="form-control form-control-default"
                  isrequired="false" autocomplete="off" />


              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6 mt-2 mt-sm-0">
            <label class="mb-0 mt-2">Location Name2</label>
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select required v-model="formData.locationName2" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option value="">Select</option>
                  <option v-for="location in locationArr" :key="location.ROWID" :value="location.ROWID">
                    {{ location.name }}
                  </option>
                </select>

              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6">
            <label class="mb-0 mt-2">Date of Birth1</label>

            <div class="form-group multisteps-form__input">
              <div class="">
                <input v-model="formData.dateOfBirth1" type="date" class="form-control form-control-default"
                  isrequired="false" autocomplete="off" />
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-3 col-sm-4 ">
            <label class="mb-0 mt-1">If referred by Advisor or External Referral - Name </label>

            <div class="form-group multisteps-form__input">
              <div class="">
                <input v-model="formData.ifReferredByAdvisorOrExternal" type="text"
                  class="form-control form-control-default" is required="false" autocomplete="off" />
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
            <label class="mb-0 mt-2">Is this a Reassignment?</label>

            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.isThisReassignment" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in choice" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-4">
            <div class="form-group">
              <label class="mb-0 mt-2" for="contact-info-dropdown">Additional Contact Information?1</label>
              <select v-model="formData.additionalContactInformation1" class="form-control" id="contact-info-dropdown">
                <option v-for="(option, index) in priorityOptions" :key="index" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
            <label class="mb-0 mt-2">Referred by</label>

            <div class="choices">
              <div class="select-box">
                <select v-model="formData.referredBy" class="form-select">
                  <option v-for="(option, index) in referredByOtions" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
            <label class="mb-0 mt-2">Investments 1</label>

            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.investments1" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in investmentOptions" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="card-surface row ps-2  mb-3  ms-2 ">

          <div class="col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
            <label class="mb-0 mt-2">Preferred Contact Method 2</label>

            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.preferredContactMethod2" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(
option, index
                  ) in preferredContactMethodOptions" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
            <label class="mb-0 mt-2">Preferred Contact Time 2</label>

            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.preferredContactTime2" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in availabilityOptions" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
            <label class="mb-0 mt-2">Citizenship Status1</label>

            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.citizenshipStatus1" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in citizenshipStatusOptions" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
            <label class="mb-0 mt-2">Understanding of Insurance1</label>

            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.understandingOfInsurance1" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in priorityOptions" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
            <label class="mb-0 mt-2">Existing Insurance Policy?2 </label>

            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.existingInsurancePolicy2" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in choice" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
            <label class="mb-0 mt-2">Do you own a home in Canada?</label>

            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.doYouOwnHomeInCananda" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in choice" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="col-lg-3  col-sm-4 col-md-3 mt-2 mt-sm-0">
            <label class="mb-0 mt-2">Existing Policy Renewal Due By</label>

            <div class="form-group multisteps-form__input">
              <div class="">
                <input v-model="formData.existingRenewalPolicyDueBy" type="date"
                  class="form-control form-control-default" name="" isrequired="false" autocomplete="off" />
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
            <label class="mb-0 mt-2">Do you have life insurance?</label>

            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.doYouHaveLifeInsurance" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in choice" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="card-surface row ps-2 ms-2 mb-3">
          <div class="col-lg-3 col-md-3  col-sm-4 mt-2 mt-sm-0 mt-lg-2">
            <label class="mb-0 mt-2">Coverage you are Looking for?</label>

            <div class="form-group multisteps-form__input">
              <div class="">
                <input v-model="formData.coverageYouAreLookingFor" type="text" class="form-control form-control-default"
                  name="" isrequired="false" autocomplete="off" />
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-3  col-sm-4 mt-2 mt-sm-0 mt-md-2">
            <label class="mb-0 mt-2">Submit Page URL</label>

            <div class="form-group multisteps-form__input">
              <div class="">
                <input v-model="formData.submitPageUrl" type="url" class="form-control form-control-default" name=""
                  isrequired="false" autocomplete="off" />
              </div>
            </div>
          </div>

          <div class=" col-lg-3 col-md-3  col-sm-6 mt-lg-2 mt-2 mt-sm-0 mt-md-4">
            <label class="mb-0 mt-2">Assigned Campaigns</label>

            <div class="form-group multisteps-form__input">
              <div class="">
                <input v-model="formData.assignedCampaigns" type="text" class="form-control form-control-default"
                  name="" isrequired="false" autocomplete="off" />
              </div>
            </div>
          </div>

          <div class=" col-lg-3 col-md-3  col-sm-6 mt-lg-2 mt-md-3 mt-sm-0">
            <label class="mb-0 mt-lg-2 mt-md-4">Twitter1</label>

            <div class="form-group multisteps-form__input">
              <div class="">
                <input v-model="formData.twitter1" type="text" class="form-control form-control-default" name=""
                  isrequired="false" autocomplete="off" />
              </div>
            </div>
          </div>
          <div class=" col-lg-3 col-md-3  col-sm-6 mt-2 mt-md-4 mt-sm-0">
            <label class="mb-0 mt-3">Round Robin Assignment Time1 </label>

            <div class="form-group multisteps-form__input">
              <div class="">
                <input v-model="formData.roundRobinAssignmentTime1" id="referralname" type="datetime-local"
                  class="form-control form-control-default" name="" placeholder="Referral Name" isrequired="false"
                  autocomplete="off" />
              </div>
            </div>
          </div>
          <div class=" col-lg-3 col-md-3  col-sm-6  mt-2 mt-md-3 mt-sm-0">
            <label class="mb-0 mt-4">Skype ID1</label>

            <div class="form-group multisteps-form__input">
              <div class="">
                <input v-model="formData.skypeId1" type="text" class="form-control form-control-default" name=""
                  isrequired="false" autocomplete="off" />
              </div>
            </div>
          </div>

          <div class=" col-lg-3 col-md-3  col-sm-6  mt-2 mt-md-3 mt-sm-0">
            <label class="mb-0 mt-2 mt-md-4">Instagram1</label>

            <div class="form-group multisteps-form__input">
              <div class="">
                <input v-model="formData.instagram1" type="text" class="form-control form-control-default" name=""
                  isrequired="false" autocomplete="off" />
              </div>
            </div>
          </div>

          <div class=" col-lg-3 col-md-3  col-sm-6 mt-lg-2 mt-sm-0">
            <label class="mb-0 mt-lg-2 mt-md-3">Potential Business (Policy Values)1
            </label>

            <div class="form-group multisteps-form__input">
              <div class="">
                <input v-model="formData.leadPotentialBusinessPolicyValues" type="text"
                  class="form-control form-control-default" name="" isrequired="false" autocomplete="off" />
              </div>
            </div>
          </div>
        </div>
        <div class="card-surface row ps-2 ms-2 mb-3">
          <div class=" col-lg-3 col-md-3  col-sm-6 mt-lg-0 mt-md-4 mt-sm-0">
            <label class="mb-3 ">Insurance Leads Scoring Score </label>

            <div class="form-group multisteps-form__input">
              <div class="">
                <input v-model="formData.insuranceLeadScore" type="text" class="form-control form-control-default"
                  name="" isrequired="false" autocomplete="off" />
              </div>
            </div>
          </div>

          <div class=" col-lg-3 col-md-3  col-sm-6  mt-sm-0">
            <label class="mb-0 mt-2">Insurence Leads Scoring Positive Score</label>

            <div class="form-group multisteps-form__input">
              <div class="">
                <input v-model="formData.insuranceLeadScoringPositiveScore" type="text"
                  class="form-control form-control-default" name="" isrequired="false" autocomplete="off" />
              </div>
            </div>
          </div>

          <div class=" col-lg-3 col-md-3  col-sm-6  mt-sm-0">
            <label class="mb-0 mt-2">Insurence Leads Scoring Negative Touch Point Score</label>

            <div class="form-group multisteps-form__input">
              <div class="">
                <input v-model="formData.insuranceLeadScoringNegativeTouchPointScore
                  " type="text" class="form-control form-control-default" name="" isrequired="false"
                  autocomplete="off" />
              </div>
            </div>
          </div>

          <div class=" col-lg-3 col-md-3  col-sm-6 mt-sm-0">
            <label class="mb-4 mt-2">Gender1</label>

            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.gender1" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in genderOptions" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class=" col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
            <label class="mb-0 mt-3">Additional Contact Information ?1</label>

            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.leadInfoAdditionalContactInformation" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in choice" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class=" col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
            <label class="mb-0 mt-3">Net Worth2</label>

            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.networth2" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in priorityOptions" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class=" col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
            <label class="mb-0 mt-3">Old Database Lead ?1</label>

            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.oldDatabaseLead1" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in choice" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class=" col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
            <label class="mb-0 mt-3">Gender Predication1</label>

            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.genderPrediction1" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in genderOptions" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class=" col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
          <label class="mb-0 mt-2">Exchange Rate1</label>

          <div class="form-group multisteps-form__input">
            <div class="">
              <input v-model="formData.exchangeRate1" id="referralname" type="text"
                class="form-control form-control-default" name="" isrequired="false" autocomplete="off" />
            </div>
          </div>
        </div>

        <div class=" col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
          <label class="mb-0 mt-2">Currency1</label>

          <div class="form-group multisteps-form__input">
            <div class="">
              <input v-model="formData.currency1" id="referralname" type="text"
                class="form-control form-control-default" name="" isrequired="false" autocomplete="off" />
            </div>
          </div>
        </div>


        <div class=" col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
          <label class="mb-0 mt-2">Lead Created On</label>

          <div class="form-group multisteps-form__input">
            <div class="">
              <input v-model="formData.leadCreatedOn1" type="date" disabled class="form-control form-control-default"
                name="" isrequired="false" autocomplete="off" />
            </div>
          </div>
        </div>
        <div class=" col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
          <label class="mb-0 mt-2">Linked In1 </label>

          <div class="form-group multisteps-form__input">
            <div class="">
              <input v-model="formData.linkdin1" id="referralname" type="text" class="form-control form-control-default"
                name="" isrequired="false" autocomplete="off" />
            </div>
          </div>
        </div>

        <div class=" col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
          <label class="mb-0 mt-2">FaceBook 1</label>

          <div class="form-group multisteps-form__input">
            <div class="">
              <input v-model="formData.facebook1" id="referralname" type="datetime-local"
                class="form-control form-control-default" name="" placeholder="Referral Name" isrequired="false"
                autocomplete="off" />
            </div>
          </div>
        </div>

        <div class=" col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
          <label class="mb-0 mt-2">Facebook Ad Information ?</label>
          <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
            aria-expanded="false">
            <div class="select-box">
              <select v-model="formData.facebookAdInformation" id="choices-state"
                class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                data-choice="active">
                <option v-for="(option, index) in choice" :key="index" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class=" col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
          <label class="mb-0 mt-2">Home Insurance</label>
          <div>
            <div class="select-box">
              <select v-model="formData.homeInsurance" data-choice="active">
                <option value="home-insurance">Home Insurance</option>
                <option value="condo-insurance">Condo Insurance</option>
                <option value="tenant-insurance">Tenant Insurance</option>
                <option value="cottage-insurance">Cottage Insurance</option>
                <option value="rental-property-insurance">Rental Property Insurance</option>
                <option value="pet-insurance">Pet Insurance</option>
              </select>
            </div>
          </div>
        </div>

        <div class=" col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
          <label class="mb-0 mt-2">Services Requested</label>
          <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
            aria-expanded="false">
            <div class="select-box">
              <select v-model="formData.servicesRequested" id="choices-state"
                class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                data-choice="active">
                <option v-for="(option, index) in serviceAvailedOptions" :key="index" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class=" col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
          <label class="mb-0 mt-2">Insurence Leads scoring Touch Point Score</label>
          <div class="form-group multisteps-form__input">
            <div class="">
              <input v-model="formData.insuranceLeadScoringTouchPointScore" id="referralname" type="text"
                class="form-control form-control-default" name="" isrequired="false" autocomplete="off" />
            </div>
          </div>
        </div>
        <div class=" col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
          <label class="mb-0 mt-2">Insurence Leads scoring Positive Touch Point Score</label>
          <div class="form-group multisteps-form__input">
            <div class="">
              <input v-model="formData.insuranceLeadsScoringPositiveTouchPointScore
                " id="referralname" type="text" class="form-control form-control-default" name="" isrequired="false"
                autocomplete="off" />
            </div>
          </div>
        </div>
        <div class=" col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
          <label class="mb-0 mt-2">Insurance Leads Scoring Negative Score</label>
          <div class="form-group multisteps-form__input">
            <div class="">
              <input v-model="formData.insuranceLeadsScoringNegativeScore" id="referralname" type="text"
                class="form-control form-control-default" name="" isrequired="false" autocomplete="off" />
            </div>
          </div>
        </div>
        <div class=" col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
          <label class="mb-4 mt-2">Whatsapp</label>
          <div class="form-group multisteps-form__input">
            <div class="">
              <input v-model="formData.whatsapp" id="Whatsapp" type="text" class="form-control form-control-default"
                name="" isrequired="false" autocomplete="off" />
            </div>
          </div>
        </div>
        <div class=" col-lg-3 col-md-3  col-sm-6 mt-2 mt-sm-0">
          <label class="mb-0 mt-2">PhoneBurner Last Call Outcome</label>
          <div class="form-group multisteps-form__input">
            <div class="">
              <input v-model="formData.phoneBurnerLastOutcome" id="phoneBurnerLastOutcome" type="text"
                class="form-control form-control-default" name="" isrequired="false" autocomplete="off" />
            </div>
          </div>
        </div>
        <!-- <h5 class="main-heading mb-0">Address info</h5>
        <div class="col-12 col-sm-4">
          <label class="mb-0 mt-2">Street</label>

          <div class="form-group multisteps-form__input">
            <div class="">
              <input v-model="formData.street" type="text" class="form-control form-control-default" isrequired="false"
                autocomplete="off" />
            </div>
          </div>
        </div> -->

        <!-- <div class="col-12 col-sm-4">
          <label class="mb-0 mt-2">City</label>

          <div class="form-group multisteps-form__input">
            <div class="">
              <input v-model="formData.city" type="text" class="form-control form-control-default" isrequired="false"
                autocomplete="off" />
            </div>
          </div>
        </div> -->

        <!-- <div class="col-12 col-sm-4">
          <label class="mb-0 mt-2">Zip</label>

          <div class="form-group multisteps-form__input">
            <div class="">
              <input v-model="formData.zipCode" type="text" class="form-control form-control-default" isrequired="false"
                autocomplete="off" />
            </div>
          </div>
        </div> -->

        <!-- <div class="col-12 col-sm-4">
          <label class="mb-0 mt-2">State</label>

          <div class="form-group multisteps-form__input">
            <div class="">
              <input v-model="formData.state" type="text" class="form-control form-control-default" isrequired="false"
                autocomplete="off" />
            </div>
          </div>
        </div> -->

        <!-- <div class="col-12 col-sm-4">
          <label class="mb-0 mt-2"> Country</label>

          <div class="form-group multisteps-form__input">
            <div class="">
              <input v-model="formData.country" type="text" class="form-control form-control-default" isrequired="false"
                autocomplete="off" />
            </div>
          </div>
        </div>
        <div class="heading-div">
          <h5 class="main-heading mb-0 mt-2">Catalyst</h5>
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
          <label for="teamLeg" class="my-0">Catalyst ID</label>
          <input type="text" v-model="formData.catalystId" class="form-control" id="catalystId" />
        </div> -->
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
import {
  choice,
  preferredContactMethodOptions,
  investmentOptions,
  referredByOtions,
  availabilityOptions,
  citizenshipStatusOptions,
  priorityOptions,
  genderOptions

} from "../utils/picklist";
export default {
  name: "LeadManagementHistory",
  props: {
    Leadinfo: {
      type: Function,
      required: true
    },
    location: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      formData: { ...this.Leadinfo },
      locationArr: [...this.location],
      choice: { ...choice },
      preferredContactMethodOptions: { ...preferredContactMethodOptions },
      investmentOptions: { ...investmentOptions },
      referredByOtions: { ...referredByOtions },
      availabilityOptions: { ...availabilityOptions },
      citizenshipStatusOptions: { ...citizenshipStatusOptions },
      priorityOptions: { ...priorityOptions },
      genderOptions: { ...genderOptions },
      LeadData: {},
    }
  },
  watch: {
    Leadinfo: {
      handler() {
        console.log("<<<<<<<<<<<INSERT THE WATCH FOR DEALOWNERSHIP>>>>>>>>>>>>>>>>>>>>>>>>>")
        this.formData = { ...this.Leadinfo };

        console.log("<<<<<<<<< == this formData Leadinfo ==>>>>>>>>>", this.formData);
      },
      immediate: true,
      deep: true,
    },
    location: {
      handler(locationArr) {
        locationArr = this.location;
        console.log("this leadsArr", locationArr);
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