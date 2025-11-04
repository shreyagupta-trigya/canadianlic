<template>
  <div>

    <!--  CONTACT INFO -->
    <h5 class="main-heading mt-2 mb-0 ps-2">Contact Info</h5>
    <div class="card custom-card mb-4">
      <div class="card-body mb-5">
        <div class="card-surface">
          <div class="row g-3">
            <!-- Contact Owner -->
            <div class="col-lg-3 col-sm-3 mt-2 mt-sm-0 ">
              <label class="mb-0 mt-2">Contact Owner <span class="text-danger">*</span></label>
              <div class="choices">
                <div class="select-box">
                  <select required v-model="formData.contactOwner" class="form-select" name="choices-state">
                    <option value="" disabled selected class="text-muted">Select Owner</option>
                    <option v-for="owner in ownersArr" :key="owner.ROWID" :value="owner.ROWID">
                      {{ owner.name }}
                    </option>
                  </select>
                  <span v-if="errors.contactOwner" class="text-danger">{{
                    errors.contactOwner
                  }}</span>
                </div>
              </div>
            </div>

            <!-- Insurance Lead Source -->
            <div class="col-lg-3 col-sm-3 mt-2 mt-sm-0">
              <label class="mb-0 mt-2">Insurance Lead Source
                <span class="text-danger">*</span></label>
              <div class="choices">
                <div class="select-box">
                  <select v-model="formData.insuranceLeadSource" id="choices-state" class="form-select"
                    name="choices-state">
                    <option v-for="(option, index) in insuranceleadSourceOptions" :key="index" :value="option">
                      {{ option }}
                    </option>
                  </select>
                  <span v-if="errors.insuranceLeadSource" class="text-danger">{{
                    errors.insuranceLeadSource
                  }}</span>
                </div>
              </div>
            </div>

            <!-- Assigned Advisor -->
            <div class="col-lg-3 col-sm-3 mt-2 mt-sm-0">
              <label class="mb-0 mt-2">Assigned Advisor</label>

              <div class="choices">
                <div class="select-box">
                  <select v-model="formData.assignedAdvisor" id="AssignedAdvisor" class="form-select"
                    name="choices-state">
                    <option v-for="contact in contactsArr" :key="contact.ROWID" :value="contact.ROWID">
                      {{ contact.name }}

                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Deal Stage Tracking -->
            <div class="col-lg-3 col-sm-3 mt-2 mt-sm-0">
              <label class="mb-0 mt-2">Deal Stage Tracking</label>
              <div class="choices">
                <div class="select-box">
                  <select v-model="formData.dealStageTracking" class="form-select" name="choices-state">
                    <option v-for="(option, index) in digitalStageTrackingOptions" :key="index" :value="option">
                      {{ option }}
                    </option>
                  </select>
                </div>
              </div>
            </div>


            <!-- Location -->
            <div class="col-lg-3 col-sm-3 mt-2 mt-sm-0">
              <label class="mb-0 mt-2">Location</label>
              <div class="choices">
                <div class="select-box">
                  <select v-model="formData.location" id="location" class="form-select" name="choices-state location">
                    <option v-for="location in locationArr" :key="location.ROWID" :value="location.ROWID">
                      {{ location.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Old Database Lead -->
            <div class="col-lg-3 col-sm-3 mt-2 mt-sm-0">
              <label class="mb-0 mt-2">Old Database Lead?</label>
              <div class="choices">
                <div class="select-box">
                  <select v-model="formData.oldDatabaseLead" id="choices-state" class="form-select"
                    name="choices-state">
                    <option v-for="(option, index) in socialMediaInformationOptions" :key="index" :value="option">
                      {{ option }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Lead -->
            <div class="col-lg-3 col-sm-3 mt-2 mt-sm-0">
              <label class="mb-0 mt-2">Lead</label>
              <div class="choices">
                <div class="select-box">
                  <select v-model="formData.leadId" id="leadId" name="leadId" tabindex="-1" data-choice="active"
                    class="form-select">
                    <option v-for="lead in leadsArr" :key="lead.ROWID" :value="lead.ROWID">
                      {{ lead.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Status -->
            <div class="col-lg-3 col-sm-3 mt-2 mt-sm-0">
              <label class="mb-0 mt-2">Status</label>
              <div class="choices">
                <div class="select-box">
                  <select v-model="formData.status" class="form-select" name="choices-state">
                    <option v-for="(option, index) in statusOptions" :key="index" :value="option">
                      {{ option }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- First Name -->
            <div class="col-12 col-lg-3 col-sm-3 mt-2 mt-sm-0">
              <label class="mb-0 mt-2 " for="firstName">First Name</label>
              <div class="form-group multisteps-form__input">
                <div class="">
                  <input v-model="formData.firstName" v-titleCase id="firstName" type="text"
                    class="form-control form-control-default" isrequired="false" autocomplete="off" />
                </div>
              </div>
            </div>

            <!-- Last Name -->
            <div class=" col-lg-3 col-sm-3 mt-2 mt-sm-0">
              <label class="mb-0 mt-2" for="lastName">Last Name <span class="text-danger">*</span></label>
              <div class="form-group multisteps-form__input">
                <div class="">
                  <input v-model="formData.lastName" type="text" v-titleCase id="lastName" class="form-control form-control-default"
                    isrequired="false" autocomplete="off" />
                  <span v-if="errors.lastName" class="text-danger">{{ errors.lastName }}</span>
                </div>
              </div>
            </div>

            <!-- Date of Birth -->
            <div class="col-12 col-lg-3 col-sm-3 mt-2 mt-sm-0">
              <label class="mb-0 mt-2">Date of Birth</label>
              <div class="input-group">
                <flat-pickr v-model="formData.dateOfBirth" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                  class="form-control" id="dateOfBirth" ref="fpDob" />
                <span class="input-group-text" @click="$refs.fpDob.fp.open()">
                  <i class="fa fa-calendar"></i>
                </span>
              </div>
            </div>


            <!-- Gender -->
            <div class="col-lg-3 col-sm-3  mt-2 mt-sm-0">
              <label class="mb-0 mt-2">Gender</label>
              <div class="choices">
                <div class="select-box">
                  <select v-model="formData.gender" class="form-select" name="choices-state">
                    <option v-for="(option, index) in genderOptions" :key="index" :value="option">
                      {{ option }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Email -->
            <div class="col-12 col-lg-3 col-sm-3 mt-2 mt-sm-0">
              <label class="mb-0 mt-2">Email <span class="text-danger">*</span></label>
              <div class="form-group multisteps-form__input">
                <div class="">
                  <input v-model="formData.email" type="email" class="form-control form-control-default"
                    isrequired="false" />
                  <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
                </div>
              </div>
            </div>

            <!-- Mobile -->
            <div class="col-12 col-lg-3 col-sm-3 mt-2 mt-sm-0">
              <label class="mb-0 mt-2">Mobile</label>
              <div class="form-group multisteps-form__input">
                <VueTelInput v-model="formData.mobile" :defaultCountry="'CA'"
                  :preferredCountries="['CA', 'US', 'IN', 'GB']" :enableAutoCountrySelect="true" :mode="'international'"
                  :inputOptions="{
                    placeholder: '+1 (XXX) XXX-XXXX',
                    inputmode: 'tel',
                    maxlength: 16,
                    onInput: handleTelInput
                  }" id="mobile" />
              </div>
            </div>
            <span v-if="errors.mobile" class="text-danger">{{ errors.mobile }}</span>

            <!-- WhatsApp -->
            <div class="col-12 col-lg-3 col-sm-3 mt-2 mt-sm-0">
              <label class="mb-0 mt-2">WhatsApp</label>
              <div class="form-group multisteps-form__input">
                <div class="">
                  <input v-model="formData.whatsApp" type="text" name="WhatsApp"
                    class="form-control form-control-default" isrequired="false" autocomplete="off" />
                </div>
              </div>
            </div>

            <!-- Client Address -->
            <div class="col-12 col-lg-3 col-sm-3 mt-2 mt-sm-0">
              <label class="mb-0 mt-2">Client Address</label>
              <div class="form-group multisteps-form__input">
                <div class="">
                  <textarea v-model="formData.clientAddress" class="form-control form-control-default"
                    isrequired="false" autocomplete="off" rows="1"></textarea>
                </div>
              </div>
            </div>

            <!-- Additional Contact Information? -->
            <div class="col-12 col-lg-3 col-sm-3 mt-2 mt-sm-0">
              <div class="form-group">
                <label class="mb-0 mt-2 mt-2" for="contact-info-dropdown">Additional Contact Information?</label>
                <select v-model="formData.additionalContactInformation" class="form-control" id="contact-info-dropdown">
                  <option v-for="(option, index) in optionsArray" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Social Media Information? -->
            <div class="col-lg-3 col-sm-3 mt-2 mt-sm-0">
              <label class="mb-0 mt-2">Social Media Information?1</label>

              <div class="choices">
                <div class="select-box">
                  <select v-model="formData.socialMediaInformation" class="form-select">
                    <option v-for="(option, index) in socialMediaInformationOptions" :key="index" :value="option">
                      {{ option }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Understanding of Insurance -->
            <div class="col-lg-3 col-sm-3 mt-2 mt-sm-0">
              <label class="mb-0 mt-2">Understanding of Insurance</label>
              <div class="choices">
                <div class="select-box">
                  <select v-model="formData.understandingOfInsurance" class="form-select">
                    <option v-for="(option, index) in priorityOptions" :key="index" :value="option">
                      {{ option }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <!-- Do you have a Corporation? -->
            <div class="col-lg-3 col-sm-3 mt-2 mt-sm-0">
              <label class="mb-0 mt-2">Do you have a Corporation?</label>
              <div class="choices">
                <div class="select-box">
                  <select v-model="formData.doYouHaveCorporations" class="form-select" name="choices-state">
                    <option v-for="(option, index) in choice" :key="index" :value="option">
                      {{ option }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card p-1 text-dark bg-light mb-3 mt-0" v-if="formData.additionalContactInformation === 'available'">
          <div class="card-body row p-1 mt-0">
            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="phoneNumber">Phone Number</label>
              <input type="number" id="phoneNumber" v-model="formData.phoneNumber" class="form-control"
                placeholder="Enter phone number" />
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="addEmail1">Add Email1</label>
              <input type="email" id="addEmail1" v-model="formData.addEmail1" class="form-control" />
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="fax">Fax</label>
              <input type="text" v-titleCase id="fax" v-model="formData.fax" class="form-control"
                placeholder="Enter fax number" />
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="otherContact">Other</label>
              <input type="text" v-titleCase id="otherContact" v-model="formData.otherContact" class="form-control"
                placeholder="Enter other contact info" />
            </div>
          </div>
        </div>
      </div>
      <div class="card-body mb-5">
        <div class="card-surface">
          <diV class="row g-3">
            <!-- How did you hear about us? -->
            <!-- Lead Created On -->
            <div class="col-12 col-lg-3 col-sm-3 mt-2 mt-sm-0">
              <label class="mb-0 mt-2">Lead Created On</label>
              <div class="input-group">
                <flat-pickr v-model="formData.leadCreatedOn" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                  class="form-control" id="leadCreatedOn" ref="fpLeadCreatedOn" :disabled="true" />
              </div>
            </div>


            <!-- Lead Converted On -->
            <div class="col-12 col-lg-3 col-sm-3 mt-2 mt-sm-0">
              <label class="mb-0 mt-2">Lead Converted On</label>
              <div class="input-group">
                <flat-pickr v-model="formData.leadConvertedOn" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                  class="form-control" id="leadConvertedOn" ref="fpLeadConvertedOn" :disabled="true" />
              </div>
            </div>


            <!-- Lead Status on Conversion -->
            <div class="col-lg-3 col-sm-3 mt-2 mt-sm-0">
              <label class="mb-0 mt-2">Lead Status on Conversion</label>
              <div class="choices">
                <div class="select-box">
                  <select v-model="formData.leadStatusOnConversion" class="form-select" name="choices-state" disabled>
                    <option value="">-None-</option>
                    <option value="Application Go Ahead - Life">Application Go Ahead - Life</option>
                    <option value="Application Go Ahead - Travel / Supervisa">Application Go Ahead - Travel / Supervisa
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Lead Created Time -->
            <div class="col-lg-3 col-md-3 col-sm-12 mt-0">
              <label class="mb-0 mt-2">Lead Created Time</label>
              <div class="input-group">
                <flat-pickr v-model="formData.leadCreatedTime" :config="dateTimePickerConfig"
                  placeholder="DD/MM/YYYY HH:mm" class="form-control" id="leadCreatedTime" ref="fpLeadCreatedTime" />
                <span class="input-group-text" @click="$refs.fpLeadCreatedTime.fp.open()">
                  <i class="fa fa-calendar"></i>
                </span>
              </div>
            </div>

            <!-- Preferred Contact Time -->
            <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
              <label class="mb-0 mt-2">Preferred Contact Time</label>
              <div class="choices">
                <div class="select-box">
                  <select v-model="formData.preferredContactTime" class="form-select">
                    <option v-for="(option, index) in availabilityOptions" :key="index" :value="option">
                      {{ option }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Preferred Contact Method -->
            <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
              <label class="mb-0 mt-2">Preferred Contact Method</label>
              <div class="choices">
                <div class="select-box">
                  <select v-model="formData.preferredContactMethod" class="form-select">
                    <option v-for="(option, index) in preferredContactMethodOptions" :key="index" :value="option">
                      {{ option }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Social Media Information? -->
            <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
              <label class="mb-0 mt-2">Social Media Information?</label>
              <div class="choices">
                <div class="select-box">
                  <select v-model="formData.socialMediaInformation" class="form-select">
                    <option v-for="(option, index) in socialMediaInformationOptions" :key="index" :value="option">
                      {{ option }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Old Database Lead? -->
            <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
              <label class="mb-0 mt-2">Old Database Lead?</label>
              <div class="choices">
                <div class="select-box">
                  <select v-model="formData.oldDatabaseLead" class="form-select">
                    <option v-for="(option, index) in socialMediaInformationOptions" :key="index" :value="option">
                      {{ option }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

          </div>
        </div>


        <div class="card-body mb-5">
          <div class="card-surface">
            <div class="row g-3">
              <!-- 🔹 Row 1 -->

              <!-- Last CLV Corporate -->
              <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                <label class="mb-0 mt-2">Last CLV Corporate</label>
                <div class="form-group">
                  <input v-model="formData.lastClvCorporate" type="text" class="form-control form-control-default" />
                </div>
              </div>

              <!-- CLV Corporate Commission -->
              <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                <label class="mb-0 mt-2">CLV Corporate Commission</label>
                <div class="form-group">
                  <input v-model="formData.clvCorporateCommision" type="text" placeholder="CA$"
                    class="form-control form-control-default" />
                </div>
              </div>

              <!-- CLV Advisor Commission -->
              <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                <label class="mb-0 mt-2">CLV Advisor Commission</label>
                <div class="form-group">
                  <input v-model="formData.clvAdvisorCommision" type="text" placeholder="CA$"
                    class="form-control form-control-default" />
                </div>
              </div>

              <!-- Last CLV Advisor -->
              <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                <label class="mb-0 mt-2">Last CLV Advisor</label>
                <div class="form-group">
                  <input v-model="formData.lastClvAdvisor" type="text" class="form-control form-control-default" />
                </div>
              </div>

              <!-- 🔹 Row 2 -->

              <!-- PhoneBurner Follow Up Date -->

              <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                <label class="mb-0 mt-2">PhoneBurner Follow Up Date</label>
                <div class="input-group">
                  <flat-pickr v-model="formData.phoneBurnerFollowUpDate" :config="datePickerConfig"
                    placeholder="DD/MM/YYYY" class="form-control" id="phoneBurnerFollowUpDate" ref="fpPbFollow" />
                  <span class="input-group-text" @click="$refs.fpPbFollow.fp.open()">
                    <i class="fa fa-calendar"></i>
                  </span>
                </div>
              </div>


              <!-- PhoneBurner Last Call Time -->

              <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                <label class="mb-0 mt-2">PhoneBurner Last Call Time</label>
                <div class="input-group">
                  <flat-pickr v-model="formData.phoneBurnerLastCallTime" :config="dateTimePickerConfig"
                    placeholder="DD/MM/YYYY HH:mm" class="form-control" id="phoneBurnerLastCallTime" ref="fpPbLast" />
                  <span class="input-group-text" @click="$refs.fpPbLast.fp.open()">
                    <i class="fa fa-calendar"></i>
                  </span>
                </div>
              </div>


              <!-- Description -->
              <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                <label class="mb-0 mt-2">Description</label>
                <div class="form-group">
                  <input v-model="formData.description" type="text" class="form-control form-control-default" />
                </div>
              </div>

              <!-- Number of Products Remaining (Individual) -->
              <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                <label class="mb-0 mt-2">Number of Products Remaining (Individual)</label>
                <div class="form-group">
                  <input v-model="formData.numberofProductsRemaining" type="text"
                    class="form-control form-control-default" />
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="card-body mb-5">
          <div class="card-surface">
            <div class="row g-3">
              <div class="row g-3">



                <!-- Currency (disabled) -->
                <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                  <label class="mb-0 mt-2">Currency</label>
                  <div class="form-group multisteps-form__input">
                    <div class="">
                      <select v-model="formData.currency" class="form-control form-control-default" isrequired="false"
                        disabled>
                        <option value="CAD">CAD</option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- Net Worth -->
                <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                  <label class="mb-0 mt-2">Net Worth</label>
                  <div class="choices">
                    <div class="select-box">
                      <select v-model="formData.netWorth" class="form-select">
                        <option v-for="(option, index) in priorityOptions" :key="index" :value="option">
                          {{ option }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- Email is valid -->
                <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                  <label class="mb-0 mt-2">Email is valid</label>
                  <div class="choices">
                    <div class="select-box">
                      <select v-model="formData.emailIsValid" class="form-select">
                        <option v-for="(option, index) in choice" :key="index" :value="option">
                          {{ option }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- Immigration Services -->
                <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                  <label class="mb-0 mt-2">Immigration Services</label>
                  <div class="choices">
                    <div class="select-box">
                      <select v-model="formData.immigrationServices" id="ImmigrationServices" class="form-select"
                        name="ImmigrationServices">
                        <option v-for="(option, index) in socialMediaInformationOptions" :key="index" :value="option">
                          {{ option }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-sm-3 col-md-3 mt-2 mt-sm-0">
                  <label class="mb-0 mt-2">Client's 1st Policy Issued On</label>

                  <div class="form-group multisteps-form__input">
                    <div class="input-group">
                      <flat-pickr v-model="formData.clientPolicyIssueOn" :config="dateTimePickerConfig"
                        placeholder="DD/MM/YYYY HH:mm" isrequired="false" autocomplete="off" class="form-control"
                        id="clientPolicyIssueOn" ref="fpPbLast" />
                      <span class="input-group-text" @click="$refs.fpPbLast.fp.open()">
                        <i class="fa fa-calendar"></i>
                      </span>
                    </div>

                  </div>
                </div>

              </div>
              <div class="col-12  col-sm-3">
                <div class="form-check checkbox-lg">
                  <input v-model="formData.emailRoundRobinOwner2" class="form-check-input" type="checkbox"
                    id="checkbox-1" style="width: 17px; height: 17px;" />
                  <label class="form-check-label mt-1" for="checkbox-1">Email Round Robin Owner
                  </label>
                </div>
              </div>
              <div class="col-12  col-sm-3">
                <div class="form-check checkbox-lg">
                  <input v-model="formData.eligibleRoundRobinOwnerFound" class="form-check-input" type="checkbox"
                    value="" id="checkbox-98" style="width: 17px; height: 17px;" />

                  <label class="form-check-label mt-1" for="checkbox-98">Eligible Round Robin Owner Found</label>
                </div>
              </div>
              <div class="col-12  col-sm-3">
                <div class="form-check checkbox-lg">
                  <input v-model="formData.emailOptOut" class="form-check-input" type="checkbox" value=""
                    id="checkbox-3" style="width: 17px; height: 17px;" />

                  <label class="form-check-label mt-1" for="checkbox-3">Email Opt Out</label>
                </div>
              </div>

              <div class="col-12  col-sm-3">
                <div class="form-check checkbox-lg">
                  <input v-model="formData.roundRobinProcessed" class="form-check-input" type="checkbox" value=""
                    id="checkbox-4" style="width: 17px; height: 17px;" />

                  <label class="form-check-label mt-1" for="checkbox-4">Round Robin Processed</label>
                </div>
              </div>

              <div class="col-12  col-sm-3">
                <div class="form-check checkbox-lg">
                  <input v-model="formData.reRoundRobinProcessed" class="form-check-input" type="checkbox" value=""
                    id="checkbox-96" style="width: 17px; height: 17px;" />

                  <label class="form-check-label mt-1" for="checkbox-96">Re -run round robin</label>
                </div>
              </div>
              <div class="col-12  col-sm-3">
                <div class="form-check checkbox-lg">
                  <input v-model="formData.rcSMSOptOut" class="form-check-input" type="checkbox" value=""
                    id="checkbox-99" style="width: 17px; height: 17px;" />

                  <label class="form-check-label mt-1" for="checkbox-99">RC SMS Opt Out</label>
                </div>
              </div>
              <div class="col-12  col-sm-3 mt-3">
                <div class="form-check checkbox-lg">
                  <input v-model="formData.removeFromCampaign" class="form-check-input" type="checkbox" id="checkbox-1"
                    style="width: 17px; height: 17px;" />
                  <label class="form-check-label my-2" for="checkbox-1">Remove From Campaign</label>
                </div>
              </div>
              <div class="col-12  col-sm-3 mt-3">
                <div class="form-check checkbox-lg">
                  <input v-model="formData.eligibleRoundRobinOwnerFound1" class="form-check-input" type="checkbox"
                    id="checkbox-1" style="width: 17px; height: 17px;" />
                  <label class="form-check-label my-2" for="checkbox-5">Eligible Round Robin Owner Found1</label>
                </div>
              </div>

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
<style></style>
<script>
import {
  insuranceleadSourceOptions,
  statusOptions,
  digitalStageTrackingOptions,
  socialMediaInformationOptions,
  parentClientOptions,
  preferredContactMethodOptions,
  availabilityOptions,
  genderOptions,
  choice,
  priorityOptions,
  optionsArray
} from "../utils/picklist.js";
import validateMandatoryFields from "../utils/validate.js";
import mandatory from "../utils/mandatory.js";
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'
import moment from "moment";
import FlatPickr from 'vue-flatpickr-component';
import titleCase from "../../../directives/titleCase.js";
import 'flatpickr/dist/flatpickr.css';
export default {
    directives: {
    titleCase
  },
  props: {
    ContactInfo: {
      type: Object,
      required: true,
    },
    owners: {
      type: Array,
      required: true,
    },
    contacts: {
      type: Array,
      required: true,
    },
    leads: {
      type: Array,
      required: true,
    },
    location: {
      type: Array,
      required: true,
    },

  },
  components: {
    VueTelInput,
    FlatPickr
  },
  data() {
    return {
      datePickerConfig: {
        dateFormat: "d/m/Y",   // DD/MM/YYYY
        allowInput: true
      },
      dateTimePickerConfig: {
        dateFormat: "d/m/Y H:i", // DD/MM/YYYY HH:mm
        allowInput: true,
        enableTime: true,
        time_24hr: true
      },
      formData: { ...this.ContactInfo },
      ownersArr: [...this.owners],
      contactsArr: [...this.contacts],
      leadsArr: [...this.leads],
      locationArr: [...this.location],
      digitalStageTrackingOptions: { ...digitalStageTrackingOptions },
      statusOptions: { ...statusOptions },
      insuranceleadSourceOptions: { ...insuranceleadSourceOptions },
      socialMediaInformationOptions: { ...socialMediaInformationOptions },
      parentClientOptions: { ...parentClientOptions },
      preferredContactMethodOptions: { ...preferredContactMethodOptions },
      availabilityOptions: { ...availabilityOptions },
      genderOptions: { ...genderOptions },
      choice: { ...choice },
      priorityOptions: { ...priorityOptions },
      optionsArray: { ...optionsArray },
      errors: {},
    }
  },
  mounted() {
    const dateOnly = [
      "dateOfBirth",
      "leadCreatedOn",
      "leadConvertedOn",
      "clientPolicyIssueOn",
      "phoneBurnerFollowUpDate"
    ];
    const dateTime = ["leadCreatedTime", "phoneBurnerLastCallTime"];

    dateOnly.forEach(f => {
      const v = this.formData[f];
      if (!v) return;
      const m = moment(v, ["YYYY-MM-DD", "DD/MM/YYYY"], true);
      if (m.isValid()) this.formData[f] = m.format("DD/MM/YYYY");
    });

    dateTime.forEach(f => {
      const v = this.formData[f];
      if (!v) return;
      const m = moment(v, [
        "YYYY-MM-DD HH:mm",
        "YYYY-MM-DDTHH:mm",
        "DD/MM/YYYY HH:mm"
      ], true);
      if (m.isValid()) this.formData[f] = m.format("DD/MM/YYYY HH:mm");
    });
  },

  watch: {
    ContactInfo: {
      handler(formData) {
        formData = { ...this.ContactInfo };
        console.log("this formData", formData);
      },
      immediate: true,
      deep: true,
    },
    owners: {
      handler(ownersArr) {
        ownersArr = this.owners;
        console.log("<<<<<<<<<<<<<======== this ownersArr =========>>>>>>>>>", ownersArr);
      },
      immediate: true,
      deep: true,
    },
    contacts: {
      handler(contactsArr) {
        contactsArr = this.contacts;
        console.log("this contactsArr", contactsArr);
      },
      immediate: true,
      deep: true,
    },
    leads: {
      handler(leadsArr) {
        leadsArr = this.leads;
        console.log("this leadsArr", leadsArr);
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
    handleTelInput(e) {
      const raw = e?.target?.value ?? '';
      // keep leading +, strip everything else non-digit
      let cleaned = raw.replace(/(?!^)\+/g, '');       // remove extra '+' if any
      cleaned = cleaned.replace(/[^+\d]/g, '');        // only '+' and digits
      // limit to '+' + 15 digits
      const plus = cleaned.startsWith('+') ? '+' : '';
      const digits = cleaned.replace(/\D/g, '').slice(0, 15);
      cleaned = plus + digits;
      e.target.value = cleaned;
      this.formData.mobile = cleaned;
      // clear error as user fixes
      if (this.errors.mobile) delete this.errors.mobile;
    },
    nextStep() {
      this.errors = validateMandatoryFields(this.formData, mandatory);
      const validateFields = Object.keys(this.errors).length === 0;
      console.log("validateFields", this.errors);
      const mobile = (this.formData.mobile || '').replace(/\s|-/g, '');
      if (mobile) {
        if (!mobile.startsWith('+')) {
          this.errors.mobile = 'Country code is required (e.g. +1...)';
        } else if (mobile.startsWith('+1') && !/^\+1\d{10}$/.test(mobile)) {
          this.errors.mobile = 'Canadian number must be +1 followed by 10 digits';
        } else if (!/^\+\d{8,15}$/.test(mobile)) {
          this.errors.mobile = 'Phone must be in international format (e.g. +1234567890)';
        }
      }
      if (validateFields) {

        const dateFields = [
          "dateOfBirth1",
          "dateOfBirth",
          "dateOfBirthOfTraveler",
          "leadCreatedOn",
          "startDateOfCoverage",
          "phoneBurnerFollowUpDate",
          "nextFollowUpDateTime",
          "roundRobinAssignmentTime"
          // ...add all your date fields here
        ];
        dateFields.forEach(field => {
          if (
            this.formData[field] &&
            moment(this.formData[field], "DD/MM/YYYY", true).isValid()
          ) {
            this.formData[field] = moment(this.formData[field], "DD/MM/YYYY").format("YYYY-MM-DD");
          }
        });
        this.$emit("next", this.formData);
      }
      // if (validateFields) {
      //   this.$emit("next", { ...this.formData });

      // }
    }
  },
}
</script>
<style>
.flatpickr-input {
  background: url('https://cdn.jsdelivr.net/npm/flatpickr/dist/themes/material_blue.png') no-repeat right 10px center/20px 20px;

}

@media screen and (max-width:500px) {
  .space {
    margin-bottom: 150px;
  }
}
</style>