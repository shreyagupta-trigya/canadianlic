<template>
  <div class="card custom-card mb-4">
    <div class="card-body mb-4">
      <div class="card-surface">
        <div class="row mt-2 ps-2">
          <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0 mt-2">
            <label class="my-0">Policy Name <span class="text-danger">*</span></label>
            <div class="">
              <input :class="{ highlight: errors.policyName }" v-model="formData.policyName" id="referralname"
                type="text" class="form-control form-control-default" name="" isrequired="false" autocomplete="off" />
              <span v-if="errors.policyName" class="error input-error-font-size">{{ errors.policyName }}</span>
            </div>
          </div>
          <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0 mb-2">
            <label class="my-0">Layout
              <!-- <span class="text-danger">*</span> -->
            </label>
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box" :class="{ highlight: errors.layout }">
                <select v-model="formData.layout" required id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in layoutOption" :key="index" :value="option"
                    :checked="option === '-None-'">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-sm-4 mt-2 mt-sm-0">
            <label class="my-0">Policy Status</label>
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.policyStatus" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in policyStatusOptions" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-2  ps-2">
          <div class="col-lg-3 col-sm-12 mt-2 mt-sm-0">
            <label class="my-0">Policy Advisor</label>
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box" :class="{ highlight: errors.policyAdvisor }">
                <select v-model="formData.policyAdvisor" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option value="">Select</option>
                  <option v-for="advisor in advisorsArr" :key="advisor.ROWID" :value="advisor.ROWID">
                    {{ advisor.name }}
                  </option>
                </select>
                <span v-if="errors.policyAdvisor" class="error input-error-font-size">{{ errors.policyAdvisor }}</span>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-12 mt-2 mt-sm-0">
            <label class="my-0">Insurance Company Account</label>
            <div class="form-group multisteps-form__input">
              <div class="">
                <input v-model="formData.insuranceCompanyAccount" type="number"
                  class="form-control form-control-default" name="" isrequired="false" autocomplete="off" />
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-12 mt-2 mt-sm-0">
            <label class="my-0">Policy Owner <span class="text-danger">*</span></label>
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box" :class="{ highlight: errors.policyOwner }">
                <select required v-model="formData.policyOwner" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option value="">Select</option>
                  <option v-for="owner in ownersArr" :key="owner.ROWID" :value="owner.ROWID">
                    {{ owner.name }}
                  </option>
                </select>
                <span v-if="errors.policyOwner" class="error input-error-font-size">{{ errors.policyOwner }}</span>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-12 mt-2 mt-sm-0">
            <label class="my-0">Location<span class="text-danger">*</span>
            </label>
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box" :class="{ highlight: errors.location }">
                <select v-model="formData.location" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option value="">Select</option>
                  <option v-for="location in locationsArr" :key="location.ROWID" :value="location.ROWID">
                    {{ location.name ? location.name : "" }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-2 ps-2">
          <div class="col-lg-3 col-sm-6 mt-2 mt-sm-0">
            <label class="my-0">Policy Number</label>
            <div class="form-group multisteps-form__input">
              <div class="">
                <input v-model="formData.policyNumber" type="text" class="form-control form-control-default"
                  isrequired="false" autocomplete="off" />
              </div>
            </div>
          </div>
          <!-- <div class="col-lg-3 col-md-6 col-sm-4 mt-2 mt-sm-0">
            <label class="my-0">Coverage Amount</label>
            <div class="form-group multisteps-form__input">
              <div class="">
                <input
                  v-model="formData.coverageAmount"
                  type="text"
                  class="form-control form-control-default"
                  name=""
                  placeholder="CA$"
                  isrequired="false"
                  autocomplete="off"
                />
              </div>
            </div>
          </div> -->

          <div class="col-lg-3 col-md-6 col-sm-4 mt-2 mt-sm-0">
            <label class="my-0">Coverage Amount</label>
            <div class="form-group multisteps-form__input">
              <div class="input-group">
                <span class="input-group-text">CA$</span>
                <input :value="formattedCoverageAmount" @input="handleCoverageAmountInput" @blur="formatCoverageAmount"
                  @focus="clearCoverageAmountFormatting" type="text" class="form-control form-control-default" name=""
                  isrequired="false" autocomplete="off" />
              </div>
            </div>
          </div>

          <!-- <div class="col-lg-3 col-sm-4 mt-2 mt-sm-0">
            <label class="my-0">Policy Premium (Read i)</label>
            <div class="form-group multisteps-form__input">
              <div class="">
                <input
                  v-model="formData.policyPremiumI"
                  type="number"
                  name="mobile"
                  class="form-control form-control-default"
                  isrequired="false"
                  autocomplete="off"
                />
              </div>
            </div>
          </div> -->

          <div class="col-lg-3 col-sm-4 mt-2 mt-sm-0">
            <label class="my-0">Policy Premium (Read i)</label>
            <div class="form-group multisteps-form__input">
              <div class="input-group">
                <span class="input-group-text">CA$</span>
                <input :value="formattedPolicyPremium" @input="handlePolicyPremiumInput" @blur="formatPolicyPremium"
                  @focus="clearPolicyPremiumFormatting" type="text" name="mobile"
                  class="form-control form-control-default" isrequired="false" autocomplete="off" />
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-sm-6 mt-2 mt-sm-0">
            <label class="my-0">Premium Frequency</label>
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.premiumFrequency" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in premiumFrequencyOptions" :key="index" :value="option"
                    :checked="option === '-None-'">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-2 ps-2">
          <div class="col-lg-3 col-sm-6 mt-2 mt-sm-0">
            <label class="my-0">Client<span class="text-danger">*</span></label>
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box" :class="{ highlight: errors.client }">
                <select v-model="formData.client" required id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option value="">Select</option>
                  <option v-for="contact in contactsArr" :key="contact.ROWID" :value="contact.ROWID">
                    {{ contact.name }}
                  </option>
                </select>
                <span v-if="errors.client" class="error input-error-font-size">{{ errors.client }}</span>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-4 mt-2 mt-sm-0">
            <label class="my-0">email
              <!-- <span class="text-danger">*</span> -->
            </label>
            <div class="form-group multisteps-form__input">
              <div class="">
                <input v-model="formData.email" type="email" class="form-control form-control-default"
                  :class="{ highlight: errors.email }" isrequired="false" autocomplete="off" />
                <span v-if="errors.email" class="error input-error-font-size">{{
                  errors.email
                }}</span>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-4 mt-2 mt-sm-0">
            <label class="my-0">Client Mobile
              <!-- <span class="text-danger">*</span> -->
            </label>
            <div class="form-group multisteps-form__input">
              <!-- <div class="">
                <input type="number" v-model.number="formData.clientMobile" class="form-control form-control-default"
                  isrequired="false" autocomplete="off" />
                <span v-if="errors.clientMobile" class="error input-error-font-size">{{ errors.clientMobile }}</span>
              </div>
              <span v-if="errors.clientMobile" class="error input-error-font-size">{{
                errors.clientMobile
              }}</span>
            </div> -->
              <VueTelInput style="height: 2.16rem" v-model="formData.clientMobile" :defaultCountry="'CA'"
                :preferredCountries="['CA', 'US', 'IN', 'GB']" :enableAutoCountrySelect="true" :mode="'international'"
                :inputOptions="{
                  placeholder: '+1 (XXX) XXX-XXXX',
                  inputmode: 'tel',
                  maxlength: 16, // '+' + 15 digits (E.164)
                  onInput: handleTelInput, // live sanitize
                }" id="mobile" />
              <span v-if="errors.clientMobile" class="error input-error-font-size">{{ errors.clientMobile }}</span>
            </div>
          </div>
          <div class="col-lg-3 col-sm-4 mt-2 mt-sm-0">
            <label class="my-0">Whatsapp
              <!-- <span class="text-danger">*</span> -->
            </label>
            <!-- <div class="form-group multisteps-form__input">
              <div class="">
                <input type="number" v-model.number="formData.whatsapp" class="form-control form-control-default"
                  isrequired="false" autocomplete="off" />
                <span v-if="errors.whatsapp" class="error input-error-font-size">{{ errors.whatsapp }}</span>
              </div>
            </div> -->
            <VueTelInput style="height: 2.16rem" v-model="formData.whatsapp" :defaultCountry="'CA'"
              :preferredCountries="['CA', 'US', 'IN', 'GB']" :enableAutoCountrySelect="true" :mode="'international'"
              :inputOptions="{
                placeholder: '+1 (XXX) XXX-XXXX',
                inputmode: 'tel',
                maxlength: 16, // '+' + 15 digits (E.164)
                onInput: handleTelInput, // live sanitize
              }" id="mobile" />
            <span v-if="errors.whatsapp" class="error input-error-font-size">{{
              errors.whatsapp
            }}</span>
          </div>
        </div>

        <div class="row mt-2 ps-2">
          <div class="col-lg-12 col-md-6 col-sm-4 mt-2 mt-sm-0">
            <label class="my-0">Client Address</label>
            <div class="form-group multisteps-form__input">
              <div class="">
                <textarea v-model="formData.clientAddress" class="form-control form-control-default" isrequired="false"
                  rows="1"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card-body mb-2 mt-4">
        <div class="card-surface">
          <div class="row mt-2 ps-2">
            <div class="col-lg-6 col-md-6 col-sm-4">
              <label class="my-0">Offering Id</label>
              <div class="form-group multisteps-form__input">
                <div class="">
                  <input v-model="formData.offeringId" type="text" class="form-control form-control-default"
                    isrequired="false" autocomplete="off" />
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-sm-6 mt-1 mt-sm-0">
              <label class="my-0">Offering Name</label>
              <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                aria-expanded="false">
                <div class="select-box" :class="{ highlight: errors.offeringName }">
                  <select required v-model="formData.offeringName" id="choices-state"
                    class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                    data-choice="active">
                    <option value="">Select</option>
                    <option v-for="(option, index) in insOfferingNameArr" :key="index" :value="option.ROWID">
                      {{ option.name }}
                    </option>
                  </select>
                  <span v-if="errors.offeringName" class="error input-error-font-size">{{ errors.offeringName
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-2 ps-2">
            <div class="col-lg-6 col-sm-6 mt-2 mt-sm-0">
              <label class="my-0">Policy Type </label>
              <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                aria-expanded="false">
                <div class="select-box">
                  <select v-model="formData.policyType" id="choices-state"
                    class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                    data-choice="active">
                    <option v-for="(option, index) in policyTypeOption" :key="index" :value="option">
                      {{ option }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-sm-6 mt-2 mt-sm-0">
              <label class="my-0">Issued By</label>
              <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                aria-expanded="false">
                <div class="select-box" :class="{ highlight: errors.client }">
                  <select v-model="formData.issuedBy" required id="choices-state"
                    class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                    data-choice="active">
                    <option value="">Select</option>
                    <option v-for="(option, index) in insPartnersArr" :key="index" :value="option.ROWID">
                      {{ option.name }}
                    </option>
                  </select>
                  <span v-if="errors.issuedBy" class="error input-error-font-size">{{ errors.issuedBy }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="">
      <div style="margin: 1px;" class="row mt-2 card-surface mb-4  ps-2">
        <div class="col-lg-3 col-md-6 col-sm-4">
          <label class="my-0">Client Campaign Source</label>
          <div class="form-group multisteps-form__input">
            <div class="">
              <input v-model="formData.clientCampaignSource" type="text" class="form-control form-control-default"
                isrequired="false" autocomplete="off" />
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-4 mt-2 mt-sm-0">
          <label class="my-0">Product FYC %</label>
          <div class="form-group multisteps-form__input">
            <div class="">
              <input v-model="formData.productFycPercent" type="number" class="form-control form-control-default"
                isrequired="false" />
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-4 mt-2 mt-sm-0">
          <label class="my-0">Corporate Bonus %</label>
          <div class="form-group multisteps-form__input">
            <div class="">
              <input v-model="formData.corporateBonusPercent" type="number" class="form-control form-control-default"
                isrequired="false" />
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 mt-2 mt-sm-0">
          <label class="my-0">Client's First Policy ? </label>
          <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
            aria-expanded="false">
            <div class="select-box">
              <select v-model="formData.clientFirstPolicy" id="choices-state"
                class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                data-choice="active">
                <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                  :checked="option === '-None-'">
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6">
          <label class="my-0">Advisor Bonus % of FYC </label>
          <div class="form-group multisteps-form__input">
            <div class="">
              <input v-model="formData.advisorBonusOfFyc" type="number" class="form-control form-control-default"
                isrequired="false" autocomplete="off" />
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 mt-2 mt-sm-0">
          <label class="my-0">Advisor Commision Recieved</label>
          <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
            aria-expanded="false">
            <div class="select-box">
              <select v-model="formData.advisorCommisionRecieved" id="choices-state"
                class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                data-choice="active">
                <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                  :checked="option === '-None-'">
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-sm-6">
          <label class="my-0">Advisor Code of Conduct Compliance </label>
          <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
            aria-expanded="false">
            <div class="select-box">
              <select v-model="formData.advisorCodeOfConductComplaince" id="choices-state"
                class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                data-choice="active">
                <option v-for="(option, index) in advisorCodeOfConductComplainceOption" :key="index" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 ">
          <label class="my-0">Advisor Prohibited Behaviour Compliance </label>
          <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
            aria-expanded="false">
            <div class="select-box">
              <select v-model="formData.advisorProbhitedBehaviourCompliance" id="choices-state"
                class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                data-choice="active">
                <option v-for="(option, index) in advisorProbhitedOption" :key="index" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
        </div>



        <div class="col-lg-3 col-md-6 col-sm-4">
          <label class="my-0">Location Discount Factor</label>
          <div class="form-group multisteps-form__input">
            <div class="">
              <input v-model="formData.locationDiscountFactor" type="number" class="form-control form-control-default"
                isrequired="false" autocomplete="off" />
            </div>
          </div>
        </div>


        <div v-if="formData.layout === 'Life Policies'" class="col-lg-3 col-sm-4 mt-2 mt-sm-0">
          <label v-if="formData.layout === 'Life Policies'" class="my-0">Advisor Bonus level</label>
          <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
            aria-expanded="false">
            <div class="select-box">
              <select v-model="formData.advisorBonusLevel" id="choices-state"
                class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                data-choice="active">
                <option v-for="(option, index) in advisorBonusLevelOptions" :key="index" :value="option"
                  :checked="option === '-None-'">
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
        </div>




        <div class="col-lg-3 col-md-6 col-sm-4">
          <label class="my-0">Exchange Rate</label>
          <div class="form-group multisteps-form__input">
            <div class="">
              <input v-model="formData.exchangeRate" type="number" class="form-control form-control-default"
                isrequired="false" autocomplete="off" />
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 mt-1 mt-sm-0">
          <label class="my-0">Currency</label>
          <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
            aria-expanded="false">
            <div class="select-box" :class="{ highlight: errors.Currency }">
              <select required v-model="formData.currency" id="choices-state"
                class="multisteps-form__select form-control choices__input" tabindex="-1" data-choice="active">
                <option value="CAD">CAD</option>

              </select>

              <span v-if="errors.Currency" class="error input-error-font-size">
                {{ errors.Currency }}
              </span>
            </div>
          </div>
        </div>
        <div class="col-lg-3 mb-3 col-sm-4">
          <label class="my-0">Comments on Rating</label>

          <div class="">
            <textarea v-model="formData.commentsOnRating" type="text" class="form-control form-control-default"
              isrequired="false" autocomplete="off" />
          </div>
        </div>
      </div>
      <div class="card-surface">


        <h5 class="main-heading">Bot Details</h5>
        <div class="row ">
          <div class="col-lg-6 col-sm-6 mt-2 mt-sm-0">
            <label class="my-0">Send To Bot Result</label>
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.sendToBotResult" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(
option, index
                  ) in sendToPolicyStartDateEmailTrackOptions" :key="index" :value="option"
                    :checked="option === '-None-'">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-sm-6 mt-2 mt-sm-0">
            <label class="my-0">Send To Policy Start Date Email Track</label>
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.sendToPolicyStartDateEmailTrack" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(
option, index
                  ) in sendToPolicyStartDateEmailTrackOptions" :key="index" :value="option"
                    :checked="option === '-None-'">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-4">
          <div class="form-check checkbox-lg">
            <input v-if="formData.layout === 'Life Policies'" v-model="formData.phoneUpdated" class="form-check-input"
              type="checkbox" id="checkbox-1" />
            <label v-if="formData.layout === 'Life Policies'" class="form-check-label my-0" for="checkbox-1">Phone
              Updated</label>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 col-sm-4 mt-2">
            <div class="form-check checkbox-lg">
              <input v-model="formData.updateOfferingId" class="form-check-input" type="checkbox" id="checkbox-1"
                style="width: 16px; height: 16px" />
              <label class="form-check-label my-0" for="checkbox-1">Update Offering id</label>
            </div>
          </div>
          <div class="col-lg-12 col-sm-4 mt-2">
            <div class="form-check checkbox-lg">
              <input v-model="formData.updatePolicyStatus" class="form-check-input" type="checkbox" id="checkbox-1"
                style="width: 16px; height: 16px" />
              <label class="form-check-label my-0" for="checkbox-1">Update Policy Status</label>
            </div>
          </div>
          <div class="col-lg-12 col-sm-4 mt-2">
            <div class="form-check checkbox-lg">
              <input v-model="formData.triggerSupervisa" class="form-check-input" type="checkbox" id="checkbox-1"
                style="width: 16px; height: 16px" />
              <label class="form-check-label my-0" for="checkbox-2">Trigger Supervisa Full Refund Calculation</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="button-row d-flex justify-content-center mt-4 gap-4 space">
      <button class="btn mb-1 bg-gradient-dark btn-md null null js-btn-next" @click.prevent="nextStep" type="button">
        Next
      </button>
    </div>
  </div>
</template>
<style>
.input-group-text {
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  border-right: none;
  font-weight: 500;
  max-height: 35px;
}
</style>
<style></style>
<script>
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/dist/vue-tel-input.css";
import mandatory from "../../utils/mandatory.js";
import validateMandatoryFields from "../../utils/validate.js";
import {
  premiumFrequencyOptions,
  policyStatusOptions,
  policyTypeOption,
  advisorCodeOfConductComplainceOption,
  clientFirstPolicyOptions,
  advisorProbhitedOption,
  sendToPolicyStartDateEmailTrackOptions,
  advisorBonusLevelOptions,
  layoutOption,
} from "../../utils/picklist";

export default {
  components: {
    VueTelInput,
  },
  props: {
    basicInfo: {
      type: Object,
      required: true,
    },
    owners: {
      type: Array,
      required: true,
    },
    locations: {
      type: Array,
      required: true,
    },
    contacts: {
      type: Array,
      required: true,
    },
    advisors: {
      type: Array,
      required: true,
    },
    insPartners: {
      type: Array,
      required: true,
    },
    insOfferingName: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {

      formData: {
        currency: this.basicInfo.currency || "CAD",
        ...this.basicInfo,
      },
      errors: {},

      premiumFrequencyOptions: { ...premiumFrequencyOptions },
      policyStatusOptions: { ...policyStatusOptions },
      policyTypeOption: { ...policyTypeOption },
      advisorCodeOfConductComplainceOption: {
        ...advisorCodeOfConductComplainceOption,
      },
      clientFirstPolicyOptions: { ...clientFirstPolicyOptions },
      advisorProbhitedOption: { ...advisorProbhitedOption },
      sendToPolicyStartDateEmailTrackOptions: {
        ...sendToPolicyStartDateEmailTrackOptions,
      },
      advisorBonusLevelOptions: { ...advisorBonusLevelOptions },
        // API sometimes returns a simple string — ensure layoutOption is always an array
        layoutOption: Array.isArray(layoutOption) ? [...layoutOption] : [layoutOption],
      errors: {},
      ownersArr: [],
      locationsArr: [],
      contactsArr: [],
      advisorsArr: [],
      insPartnersArr: [],
      insOfferingNameArr: [],
      formattedCoverageAmount: "",
      formattedPolicyPremium: "",
    };
  },
  watch: {
     formData: {     
       handler(newVal) {
       this.$emit("update-basicInfo", { ...newVal });
      },
     deep: true,
   },
    basicInfo: {
      handler() {
        // preserve defaults and normalize layout so it matches one of layoutOption entries
        // this.formData = { currency: this.basicInfo.currency || "CAD", ...this.basicInfo };
        if (this.formData.layout) {
          const incoming = String(this.formData.layout).trim().toLowerCase();
          const match = this.layoutOption.find((opt) => {
            const val = typeof opt === "object" ? (opt.name || opt.value || opt.label) : opt;
            return String(val || "").trim().toLowerCase() === incoming;
          });
          if (match) {
            this.formData.layout = typeof match === "object" ? (match.name || match.value || match.label) : match;
          }
        }
        this.ownersArr = this.owners;
        this.locationsArr = this.locations;
        this.contactsArr = this.contacts;
        this.advisorsArr = this.advisors;
        this.insPartnersArr = this.insPartners;
        this.insOfferingNameArr = this.insOfferingName;
        // console.log("23", this.formData);
 
        // Format the amounts when data is loaded
        this.formatCoverageAmount();
        this.formatPolicyPremium();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    handleTelInput(e) {
      const raw = e?.target?.value ?? "";
      // keep leading +, strip everything else non-digit
      let cleaned = raw.replace(/(?!^)\+/g, ""); // remove extra '+' if any
      cleaned = cleaned.replace(/[^+\d]/g, ""); // only '+' and digits
      // limit to '+' + 15 digits
      const plus = cleaned.startsWith("+") ? "+" : "";
      const digits = cleaned.replace(/\D/g, "").slice(0, 15);
      cleaned = plus + digits;
      e.target.value = cleaned;
      this.formData.mobile = cleaned;
      // clear error as user fixes
      if (this.errors.mobile) delete this.errors.mobile;
    },
    // Handle real-time input for Coverage Amount
    handleCoverageAmountInput(event) {
      let value = event.target.value;

      // Remove all non-digit and non-decimal characters except the first decimal point
      value = value.replace(/[^\d.]/g, "");

      // Ensure only one decimal point
      const decimalCount = (value.match(/\./g) || []).length;
      if (decimalCount > 1) {
        value = value.substring(0, value.lastIndexOf("."));
      }

      // Update the formatted display value
      this.formattedCoverageAmount = value;

      // Update the actual form data with the raw value
      this.formData.coverageAmount = value;
    },

    // Format Coverage Amount with international formatting and CA$ prefix
    formatCoverageAmount() {
      if (!this.formData.coverageAmount && this.formData.coverageAmount !== 0)
        return;

      const rawValue = this.formData.coverageAmount.toString();

      if (rawValue) {
        // Format with thousand separators and 2 decimal places
        const formatted = this.formatCurrency(rawValue);
        this.formattedCoverageAmount = formatted;
      }
    },

    // Clear formatting when user focuses on Coverage Amount field for editing
    clearCoverageAmountFormatting() {
      if (this.formData.coverageAmount || this.formData.coverageAmount === 0) {
        this.formattedCoverageAmount = this.formData.coverageAmount
          .toString()
          .replace(/[^\d.]/g, "");
      }
    },

    // Handle real-time input for Policy Premium
    handlePolicyPremiumInput(event) {
      let value = event.target.value;

      // Remove all non-digit and non-decimal characters except the first decimal point
      value = value.replace(/[^\d.]/g, "");

      // Ensure only one decimal point
      const decimalCount = (value.match(/\./g) || []).length;
      if (decimalCount > 1) {
        value = value.substring(0, value.lastIndexOf("."));
      }

      // Update the formatted display value
      this.formattedPolicyPremium = value;

      // Update the actual form data with the raw value
      this.formData.policyPremiumI = value;
    },

    // Format Policy Premium with international formatting and CA$ prefix
    formatPolicyPremium() {
      if (!this.formData.policyPremiumI && this.formData.policyPremiumI !== 0)
        return;

      const rawValue = this.formData.policyPremiumI.toString();

      if (rawValue) {
        // Format with thousand separators and 2 decimal places
        const formatted = this.formatCurrency(rawValue);
        this.formattedPolicyPremium = formatted;
      }
    },

    // Clear formatting when user focuses on Policy Premium field for editing
    clearPolicyPremiumFormatting() {
      if (this.formData.policyPremiumI || this.formData.policyPremiumI === 0) {
        this.formattedPolicyPremium = this.formData.policyPremiumI
          .toString()
          .replace(/[^\d.]/g, "");
      }
    },

    // Helper function to format currency with commas and 2 decimal places
    formatCurrency(value) {
      // Clean the value first
      const cleanValue = value.toString().replace(/[^\d.]/g, "");
      const number = parseFloat(cleanValue);

      if (isNaN(number)) return "";

      return number.toLocaleString("en-CA", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },

    nextStep() {
      this.errors = validateMandatoryFields(this.formData, mandatory);
      const validateFields = Object.keys(this.errors).length === 0;
      if (validateFields) {
        console.log(
          "<<<<<<<<<<<<<<< CURRENT STEP >>>>>>>>>>>>>>>>>>>>>>>>",
          this.formData
        );
        this.$emit("next", this.formData);
      }
    },
    prevStep() {
      this.$emit("previous");
    },
  },
};
</script>
<style>
@media screen and (max-width: 500px) {
  .space {
    margin-bottom: 50px;
  }
}
</style>
