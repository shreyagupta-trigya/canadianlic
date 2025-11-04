<template>
  <div class="card custom-card mb-4">
    <!-- This is for Travel Layout -->
    <div class="card-body mb-4" v-if="formData.layout !== 'Life Policies'">
      <div>
        <h5 class="ps-1 mb-3">Travel Layout</h5>
      </div>
      <h5 class="main-heading ps-2">Policy Tracking - Application</h5>
      <div class="card-body mb-4 mt-4" e Pov-if="formData.layout !== 'Liflicies'">
        <div class="multisteps-form__content">
          <div class="row mb-2 ms-1 ">
            <div class=" row  card-surface">


              <div class="col-lg-4 col-sm-12 mt-2">
                <label class="my-0">Application Initiated On</label>
                <div class="">

                  <div class="input-group bg-white">
                    <flat-pickr v-model="formData.applicationInitiatedOn" :config="datePickerConfig"
                      placeholder="DD/MM/YYYY" class="form-control form-control-default" :required="false"
                      autocomplete="off" id="dateOfBirth" ref="fpDateOfBirth" />
                    <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                      <i class="fa fa-calendar"></i>
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-sm-12 mt-2">
                <label class="my-0">Application Submitted On</label>
                <div class="">


                  <div class="input-group bg-white">
                    <flat-pickr v-model="formData.applicationSubmittedOn" :config="datePickerConfig"
                      placeholder="DD/MM/YYYY" class="form-control form-control-default" :required="false"
                      autocomplete="off" id="dateOfBirth" ref="fpDateOfBirth" />
                    <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                      <i class="fa fa-calendar"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-sm-12 mt-2">
                <label class="my-0">Policy Issued Date</label>
                <div class="">

                  <div class="input-group bg-white">
                    <flat-pickr v-model="formData.policyIssuedDate" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                      class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                      ref="fpDateOfBirth" />
                    <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                      <i class="fa fa-calendar"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-3 card-surface">
              <div class="col-lg-4 col-sm-12 mt-2">
                <label class="my-0">Policy Start Date</label>
                <div class="">

                  <div class="input-group bg-white">
                    <flat-pickr v-model="formData.policyStartDate" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                      class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                      ref="fpDateOfBirth" />
                    <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                      <i class="fa fa-calendar"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-sm-12 mt-2">
                <label class="my-0">New Policy Start Date</label>
                <div class="">

                  <div class="input-group bg-white">
                    <flat-pickr v-model="formData.newPolicyStartDate" :config="datePickerConfig"
                      placeholder="DD/MM/YYYY" class="form-control form-control-default" :required="false"
                      autocomplete="off" id="dateOfBirth" ref="fpDateOfBirth" />
                    <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                      <i class="fa fa-calendar"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-sm-12 mt-2">
                <label class="my-0">Confirmation Policy Start?</label>
                <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                  aria-expanded="false">
                  <div class="select-box">
                    <select v-model="formData.confirmationPolicyStart" id="choices-state"
                      class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                      data-choice="active">
                      <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                        :checked="option === '-None-'">{{ option }}</option>

                    </select>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-sm-12 mt-2">
                <label class="my-0">Is Insured Eligible as of New
                  Date? </label>
                <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                  aria-expanded="false">
                  <div class="select-box">
                    <select v-model="formData.insuredEligible" id="choices-state"
                      class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                      data-choice="active">
                      <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                        :checked="option === '-None-'">{{ option }}</option>

                    </select>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-sm-12 mt-2">
                <label class="my-0">Meets Medical Criteria as of
                  New Date? </label>
                <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                  aria-expanded="false">
                  <div class="select-box">
                    <select v-model="formData.medicalCriteria" id="choices-state"
                      class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                      data-choice="active">
                      <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                        :checked="option === '-None-'">{{ option }}</option>

                    </select>
                  </div>
                </div>
              </div>

              <!-- <div class="col-lg-4 col-sm-12 mt-2">
              <label class="my-0">Name of Confirmation Renewal</label>
              <div class="">
                <input v-model="formData.nameOfConfirmationRenewal" type="text"
                  class="form-control form-control-default" isrequired="false" autocomplete="off" />
              </div>
            </div> -->
              <div class="col-lg-4 col-sm-12 mt-2">
                <label class="my-0">Name of Confirmation</label>
                <div class="">
                  <input v-model="formData.nameOfConfirmation" type="text" class="form-control form-control-default"
                    isrequired="false" autocomplete="off" />
                </div>
              </div>
            </div>
            <div class="mt-4 pb-4 card-surface row">

              <div class="col-lg-4 col-sm-12 mt-2">
                <label class="my-0">Cancellation Requested for?</label>
                <div tabindex="0" role="listbox" aria-haspopup="true" aria-expanded="false"> <input
                    v-model="formData.cancellation" type="text" class="form-control form-control-default"
                    isrequired="false" autocomplete="off" />

                </div>
              </div>
              <div class="col-lg-4 col-sm-12 mt-2">
                <label class="my-0">Cancellation Completed Date </label>
                <div class="">

                  <div class="input-group bg-white">
                    <flat-pickr v-model="formData.cancellationDate" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                      class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                      ref="fpDateOfBirth" />
                    <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                      <i class="fa fa-calendar"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-sm-12 mt-2">
                <label class="my-0"> Attachment </label>

                <div class="">
                  <input type="file" class="form-control form-control-default p-1" autocomplete="off"
                    @change="handleFileChange" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
                </div>
              </div>


              <div class="col-lg-4 col-sm-12 mt-2">
                <label class="my-0">If insured Left The Country?</label>
                <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                  aria-expanded="false">
                  <div class="select-box">
                    <select v-model="formData.leftTheCompany" id="choices-state"
                      class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                      data-choice="active">
                      <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                        :checked="option === '-None-'">{{ option }}</option>

                    </select>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-sm-12 mt-2">
                <label class="my-0">Was there any Claim on
                  policy </label>
                <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                  aria-expanded="false">
                  <div class="select-box">
                    <select v-model="formData.claimOnPolicy" id="choices-state"
                      class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                      data-choice="active">
                      <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                        :checked="option === '-None-'">{{ option }}</option>

                    </select>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-sm-12 mt-2">
                <label class="my-0">Cancellation Reason</label>
                <div class="">
                  <textarea v-model="formData.cancellationReason" type="text" class="form-control form-control-default"
                    isrequired="false" autocomplete="off" />
                </div>
              </div>







              <div class="col-lg-4 col-sm-12 mt-2">
                <label class="my-0">Early Return/ Amendment Requested Date</label>
                <div class="">

                  <div class="input-group bg-white">
                    <flat-pickr v-model="formData.earlyReturnAmendmentRequested" :config="datePickerConfig"
                      placeholder="DD/MM/YYYY" class="form-control form-control-default" :required="false"
                      autocomplete="off" id="dateOfBirth" ref="fpDateOfBirth" />
                    <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                      <i class="fa fa-calendar"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-sm-12 mt-2">
                <label class="my-0">Early Retrun/ Amendment Requested for?</label>
                <div class="">
                  <textarea v-model="formData.earlyReturnAmendmentRequestedFor" type="date"
                    class="form-control form-control-default" isrequired="false" autocomplete="off" />
                </div>
              </div>

              <div class="col-lg-4 col-sm-12 mt-2">
                <label class="my-0">Next Follow Up Date</label>
                <div class="input-group bg-white">
                  <flat-pickr v-model="formData.nextFollowUpDate" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                    class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                    ref="fpDateOfBirth" />
                  <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                    <i class="fa fa-calendar"></i>
                  </span>
                </div>

              </div>
            </div>


            <!-- <div class="col-lg-4 col-sm-12 mt-2">
            <label class="my-0">Policy Approved Date</label>
            <div class="">

              <div class="input-group bg-white">
                <flat-pickr v-model="formData.policyApprovedDate" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                  class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                  ref="fpDateOfBirth" />
                <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                  <i class="fa fa-calendar"></i>
                </span>
              </div>
            </div>
          </div> -->
            <!-- <div v-if="formData.layout === 'Life Policies'" class="col-lg-4 col-sm-12 mt-2">
            <label v-if="formData.layout === 'Life Policies'" class="my-0">Approval Rating</label>
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div v-if="formData.layout === 'Life Policies'" class="select-box">
                <select v-model="formData.approvalRating" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in approvalRatingOptions" :key="index" :value="option"
                    :checked="option === '-None-'">{{ option }}</option>

                </select>
              </div>
            </div>
          </div> -->

            <!-- 
          <div class="col-lg-4 col-sm-12 mt-2">
            <label class="my-0">Confirmation Poilcy Renewal/Expired</label>
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.renwalExpired" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                    :checked="option === '-None-'">{{ option }}</option>

                </select>
              </div>
            </div>
          </div> -->



            <!-- <div class="col-lg-4 col-sm-12 mt-2">
            <label class="my-0">Policy Expired On </label>
            <div class="">

              <div class="input-group bg-white">
                <flat-pickr v-model="formData.policyExpiresOn" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                  class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                  ref="fpDateOfBirth" />
                <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                  <i class="fa fa-calendar"></i>
                </span>
              </div>
            </div>
          </div> -->

            <!-- <div class="col-lg-4 col-sm-12 mt-2">
            <label class="my-0">Policy Picked Up On</label>
            <div class="">

              <div class="input-group bg-white">
                <flat-pickr v-model="formData.policyPickedUpOn" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                  class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                  ref="fpDateOfBirth" />
                <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                  <i class="fa fa-calendar"></i>
                </span>
              </div>
            </div>
          </div> -->
            <!-- <div class="col-lg-4 col-sm-12 mt-2">
            <label class="my-0">Premiums Paid during Pick Up Period?
            </label>
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.premiumPaidDuringPickUpPeriod" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                    :checked="option === '-None-'">{{ option }}</option>

                </select>
              </div>
            </div>
          </div> -->
            <!-- <div class="col-lg-4 col-sm-12 mt-2">
            <label class="my-0">Application Postponed To</label>
            <div class="">

              <div class="input-group bg-white">
                <flat-pickr v-model="formData.applicationPostponedTo" :config="datePickerConfig"
                  placeholder="DD/MM/YYYY" class="form-control form-control-default" :required="false"
                  autocomplete="off" id="dateOfBirth" ref="fpDateOfBirth" />
                <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                  <i class="fa fa-calendar"></i>
                </span>
              </div>
            </div>
          </div> -->
            <!-- <div class="col-lg-4 col-sm-12 mt-2">
            <label class="my-0">Policy Declined Date</label>
            <div class="">

              <div class="input-group bg-white">
                <flat-pickr v-model="formData.policyDeclineDate" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                  class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                  ref="fpDateOfBirth" />
                <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                  <i class="fa fa-calendar"></i>
                </span>
              </div>
            </div>
          </div> -->

            <!-- <div class="col-lg-4 col-sm-12 mt-2">
            <label class="my-0">Application Medical requirement? </label>
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.applicationMedicalRequirement" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in applicationMedicalRequirementOptions" :key="index" :value="option"
                    :checked="option === '-None-'">{{ option }}</option>


                </select>
              </div>
            </div>
          </div> -->


            <!-- <div class="col-lg-4 col-sm-12 mt-2">
            <label class="my-0">Early Return/Amendment Completed Date</label>
            <div class="">

              <div class="input-group bg-white">
                <flat-pickr v-model="formData.earlyReturnAmendmentCompletedDate" :config="datePickerConfig"
                  placeholder="DD/MM/YYYY" class="form-control form-control-default" :required="false"
                  autocomplete="off" id="dateOfBirth" ref="fpDateOfBirth" />
                <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                  <i class="fa fa-calendar"></i>
                </span>
              </div>
            </div>
          </div> -->



            <!-- <div class="col-lg-4 col-sm-12 mt-2">
            <label class="my-0">Reasons for Policy being Declined</label>
            <div class="">
              <textarea v-model="formData.reasonForPolicyBeingDeclined" type="text"
                class="form-control form-control-default" isrequired="false" autocomplete="off" />
            </div>
          </div> -->
            <!-- <div class="col-lg-4 col-sm-12 mt-2">
            <label class="my-0">Early Return/ Application Cancelled</label>
            <div class="">

              <div class="input-group bg-white">
                <flat-pickr v-model="formData.earlyReturnApplicationCancelled" :config="datePickerConfig"
                  placeholder="DD/MM/YYYY" class="form-control form-control-default" :required="false"
                  autocomplete="off" id="dateOfBirth" ref="fpDateOfBirth" />
                <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                  <i class="fa fa-calendar"></i>
                </span>
              </div>
            </div>
          </div> -->

          </div>

        </div>
        <h5 class="main-heading mt-4 ps-2">Policy Review & Renewal</h5>
        <div class="multisteps-form__content card-surface ">
          <div class="row col-12 ps-2">
            <div class="row ">
              <div class="col-lg-4 col-sm-6 mt-2">
                <label class="my-0">Policy Renewal Date</label>
                <div class="">

                  <div class="input-group bg-white">
                    <flat-pickr v-model="formData.policyRenewalDate" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                      class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                      ref="fpDateOfBirth" />
                    <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                      <i class="fa fa-calendar"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-sm-6 mt-2">
                <label class="my-0">Policy Expired On</label>
                <div class="">

                  <div class="input-group bg-white">
                    <flat-pickr v-model="formData.policyExpiredDate" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                      class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                      ref="fpDateOfBirth" />
                    <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                      <i class="fa fa-calendar"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-sm-6 mt-2">
                <label class="my-0">Confirmation Poilcy
                  Renewal/Expired </label>
                <div class="">

                  <div class="input-group bg-white">
                    <flat-pickr v-model="formData.confirmatonPolicyRenewal" :config="datePickerConfig"
                      placeholder="DD/MM/YYYY" class="form-control form-control-default" :required="false"
                      autocomplete="off" id="dateOfBirth" ref="fpDateOfBirth" />
                    <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                      <i class="fa fa-calendar"></i>
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-sm-12 mt-2">
                <label class="my-0">Reviewed Date & Time</label>
                <div class="">

                  <div class="input-group bg-white">
                    <flat-pickr v-model="formData.reviewedDateTime" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                      class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                      ref="fpDateOfBirth" />
                    <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                      <i class="fa fa-calendar"></i>
                    </span>
                  </div>
                </div>
              </div>




              <div class="col-lg-4 col-md-6 mt-2" v-show="formData.reviewedDate != ''">
                <label class="my-0">Name of Confirmation
                  Renewal </label>
                <div class="">
                  <input v-model="formData.nameOfConfirmation" type="text" class="form-control form-control-default"
                    isrequired="false" autocomplete="off" />
                </div>

              </div>
              <div class="col-lg-4 col-sm-12 mt-2" v-show="formData.reviewedDate != ''">
                <label class="my-0">Policy Review Comments updated on</label>
                <div class="">

                  <div class="input-group bg-white">
                    <flat-pickr v-model="formData.policyReviewCommentUpdatedOn" :config="datePickerConfig"
                      placeholder="DD/MM/YYYY" class="form-control form-control-default" :required="false"
                      autocomplete="off" id="dateOfBirth" ref="fpDateOfBirth" />
                    <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                      <i class="fa fa-calendar"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-12 col-sm-12 mt-2" v-show="formData.reviewedDate != ''">
                <label class="my-0">Policy Review Comments</label>
                <div class="">
                  <textarea v-model="formData.policyReviewComments" type="text"
                    class="form-control form-control-default" isrequired="false" autocomplete="off" />
                </div>
              </div>


            </div>
            <!-- <div class="col-lg-4 col-sm-12 mt-2">
            <label class="my-0">Renewal Medical Requirement?</label>
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.renewalMedicalRequirement" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">

                  <option v-for="(option, index) in applicationMedicalRequirementOptions" :key="index" :value="option"
                    :checked="option === '-None-'">{{ option }}</option>


                </select>
              </div>
            </div>
          </div> -->

            <!-- <div class="col-lg-4 col-sm-12 mt-2">
            <label class="my-0">Policy Renewal Completed?</label>
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.policyRenewalCompleted" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                    :checked="option === '-None-'">{{ option }}</option>

                </select>
              </div>
            </div>
          </div> -->


          </div>
        </div>

        <div class="multisteps-form__content">
          <!-- buttons -->
          <!-- <div class="button-row d-flex justify-content-center mt-4 gap-4 space">
          <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" type="button"
            @click.prevent="prevStep">
            Prev
          </button>
          <button class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" type="button"
            @click.prevent="nextStep">
            Next
          </button>
        </div> -->
        </div>
      </div>
    </div>



    <!-- This is for Life Layout -->
    <div class="card-body mb-4 mt-4 " v-if="formData.layout === 'Life Policies'">
      <div>
        <h5 class="ps-1 mb-3">Life Layout</h5>
      </div>
      <h5 class="main-heading ps-2">Policy Tracking - Application
      </h5>
      <div class="multisteps-form__content">
        <div class="row mb-2 ms-1 ">
          <div class=" row pb-4 mt-2 card-surface">


            <div class="col-lg-6 col-sm-12 mt-2">
              <label class="my-0">Application Initiated On</label>
              <div class="">

                <div class="input-group bg-white">
                  <flat-pickr v-model="formData.applicationInitiatedOn" :config="datePickerConfig"
                    placeholder="DD/MM/YYYY" class="form-control form-control-default" :required="false"
                    autocomplete="off" id="dateOfBirth" ref="fpDateOfBirth" />
                  <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                    <i class="fa fa-calendar"></i>
                  </span>
                </div>
              </div>
            </div>

            <div class="col-lg-6 col-sm-12 mt-2">
              <label class="my-0">Application Submitted On</label>
              <div class="">


                <div class="input-group bg-white">
                  <flat-pickr v-model="formData.applicationSubmittedOn" :config="datePickerConfig"
                    placeholder="DD/MM/YYYY" class="form-control form-control-default" :required="false"
                    autocomplete="off" id="dateOfBirth" ref="fpDateOfBirth" />
                  <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                    <i class="fa fa-calendar"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class=" row pb-4 mt-4 card-surface">
            <div class="col-lg-4 col-sm-12 mt-2">
              <label class="my-0">Application Medical requirement? </label>
              <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                aria-expanded="false">
                <div class="select-box">
                  <select v-model="formData.applicationMedicalRequirement" id="choices-state"
                    class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                    data-choice="active">
                    <option v-for="(option, index) in applicationMedicalRequirementOptions" :key="index" :value="option"
                      :checked="option === '-None-'">{{ option }}</option>


                  </select>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-sm-12 mt-2">
              <label class="my-0">Next Follow Up Date</label>
              <div class="input-group bg-white">
                <flat-pickr v-model="formData.nextFollowUpDate" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                  class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                  ref="fpDateOfBirth" />
                <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                  <i class="fa fa-calendar"></i>
                </span>
              </div>

            </div>
            <div class="col-lg-4 col-sm-12 mt-2">
              <label class="my-0">Policy Start Date</label>
              <div class="">

                <div class="input-group bg-white">
                  <flat-pickr v-model="formData.policyStartDate" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                    class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                    ref="fpDateOfBirth" />
                  <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                    <i class="fa fa-calendar"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-sm-12 mt-2">
              <label class="my-0">Policy Issued Date</label>
              <div class="">

                <div class="input-group bg-white">
                  <flat-pickr v-model="formData.policyIssuedDate" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                    class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                    ref="fpDateOfBirth" />
                  <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                    <i class="fa fa-calendar"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-sm-12 mt-2">
              <label class="my-0">Policy Picked Up On</label>
              <div class="">

                <div class="input-group bg-white">
                  <flat-pickr v-model="formData.policyPickedUpOn" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                    class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                    ref="fpDateOfBirth" />
                  <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                    <i class="fa fa-calendar"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-sm-12 mt-2">
              <label class="my-0">Premiums Paid during Pick Up Period?
              </label>
              <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                aria-expanded="false">
                <div class="select-box">
                  <select v-model="formData.premiumPaidDuringPickUpPeriod" id="choices-state"
                    class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                    data-choice="active">
                    <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                      :checked="option === '-None-'">{{ option }}</option>

                  </select>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-sm-12 mt-2">
              <label class="my-0"> Amendment Requested Date</label>
              <div class="">

                <div class="input-group bg-white">
                  <flat-pickr v-model="formData.amendmentRequested" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                    class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                    ref="fpDateOfBirth" />
                  <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                    <i class="fa fa-calendar"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-sm-12 mt-2">
              <label class="my-0">Amendment Requested for? </label>
              <div class="">
                <textarea v-model="formData.amendmentRequestedFor" type="date" class="form-control form-control-default"
                  isrequired="false" autocomplete="off" />
              </div>
            </div>
            <div class="col-lg-4 col-sm-12 mt-2">
              <label class="my-0">Amendment Completed Date</label>
              <div class="">

                <div class="input-group bg-white">
                  <flat-pickr v-model="formData.amendmentCompletedDate" :config="datePickerConfig"
                    placeholder="DD/MM/YYYY" class="form-control form-control-default" :required="false"
                    autocomplete="off" id="dateOfBirth" ref="fpDateOfBirth" />
                  <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                    <i class="fa fa-calendar"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class=" row pb-4 mt-4 card-surface">
            <div class="col-lg-6 col-sm-12 mt-2">
              <label class="my-0">Policy Approved Date</label>
              <div class="">

                <div class="input-group bg-white">
                  <flat-pickr v-model="formData.policyApprovedDate" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                    class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                    ref="fpDateOfBirth" />
                  <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                    <i class="fa fa-calendar"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-sm-12 mt-2">
              <label class="my-0">Approval Rating</label>
              <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                aria-expanded="false">
                <div class="select-box">
                  <select v-model="formData.approvalRating" id="choices-state"
                    class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                    data-choice="active">
                    <option v-for="(option, index) in approvalRatingOptions" :key="index" :value="option"
                      :checked="option === '-None-'">{{ option }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-sm-12 mt-2">
              <label class="my-0">Policy Declined Date</label>
              <div class="">

                <div class="input-group bg-white">
                  <flat-pickr v-model="formData.policyDeclineDate" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                    class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                    ref="fpDateOfBirth" />
                  <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                    <i class="fa fa-calendar"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-sm-12 mt-2">
              <label class="my-0">Reasons for Policy being Declined</label>
              <div class="">
                <textarea v-model="formData.reasonForPolicyBeingDeclined" type="text"
                  class="form-control form-control-default" isrequired="false" autocomplete="off" />
              </div>
            </div>
            <div class="col-lg-6 col-sm-12 mt-2">
              <label class="my-0">Application Cancelled</label>
              <div class="">

                <div class="input-group bg-white">
                  <flat-pickr v-model="formData.applicationCancelled" :config="datePickerConfig"
                    placeholder="DD/MM/YYYY" class="form-control form-control-default" :required="false"
                    autocomplete="off" id="dateOfBirth" ref="fpDateOfBirth" />
                  <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                    <i class="fa fa-calendar"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-sm-12 mt-2">
              <label class="my-0">Cancellation Reason </label>
              <div class="">
                <textarea v-model="formData.canellationReason" type="text" class="form-control form-control-default"
                  isrequired="false" autocomplete="off" />
              </div>
            </div>

            <div class="col-lg-6 col-sm-12 mt-2">
              <label class="my-0">Application Postponed To</label>
              <div class="">

                <div class="input-group bg-white">
                  <flat-pickr v-model="formData.applicationPostponedTo" :config="datePickerConfig"
                    placeholder="DD/MM/YYYY" class="form-control form-control-default" :required="false"
                    autocomplete="off" id="dateOfBirth" ref="fpDateOfBirth" />
                  <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                    <i class="fa fa-calendar"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-sm-12 mt-2">
              <label class="my-0">Postponed Reason </label>
              <div class="">
                <textarea v-model="formData.postponedReason" type="text" class="form-control form-control-default"
                  isrequired="false" autocomplete="off" />
              </div>
            </div>
          </div>



















          <!-- <div class="row mt-3 card-surface">

            <div class="col-lg-4 col-sm-12 mt-2">
              <label class="my-0">New Policy Start Date</label>
              <div class="">

                <div class="input-group bg-white">
                  <flat-pickr v-model="formData.newPolicyStartDate" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                    class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                    ref="fpDateOfBirth" />
                  <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                    <i class="fa fa-calendar"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-sm-12 mt-2">
              <label class="my-0">Confirmation Policy Start?</label>
              <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                aria-expanded="false">
                <div class="select-box">
                  <select v-model="formData.confirmationPolicyStart" id="choices-state"
                    class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                    data-choice="active">
                    <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                      :checked="option === '-None-'">{{ option }}</option>

                  </select>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-sm-12 mt-2">
              <label class="my-0">Is Insured Eligible as of New
                Date? </label>
              <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                aria-expanded="false">
                <div class="select-box">
                  <select v-model="formData.insuredEligible" id="choices-state"
                    class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                    data-choice="active">
                    <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                      :checked="option === '-None-'">{{ option }}</option>

                  </select>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-sm-12 mt-2">
              <label class="my-0">Meets Medical Criteria as of
                New Date? </label>
              <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                aria-expanded="false">
                <div class="select-box">
                  <select v-model="formData.medicalCriteria" id="choices-state"
                    class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                    data-choice="active">
                    <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                      :checked="option === '-None-'">{{ option }}</option>

                  </select>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-sm-12 mt-2">
              <label class="my-0">Name of Confirmation Renewal</label>
              <div class="">
                <input v-model="formData.nameOfConfirmationRenewal" type="text"
                  class="form-control form-control-default" isrequired="false" autocomplete="off" />
              </div>
            </div>
          </div> -->

          <!-- <div class="col-lg-4 col-sm-12 mt-2">
            <label class="my-0">Cancellation Requested for?</label>
            <div tabindex="0" role="listbox" aria-haspopup="true" aria-expanded="false"> <input
                v-model="formData.cancellation" type="text" class="form-control form-control-default" isrequired="false"
                autocomplete="off" />

            </div>
          </div>
          <div class="col-lg-4 col-sm-12 mt-2">
            <label class="my-0">Cancellation Completed Date </label>
            <div class="">

              <div class="input-group bg-white">
                <flat-pickr v-model="formData.cancellationDate" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                  class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                  ref="fpDateOfBirth" />
                <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                  <i class="fa fa-calendar"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-sm-12 mt-2">
            <label class="my-0"> Attachment </label>

            <div class="">
              <input type="file" class="form-control form-control-default p-1" autocomplete="off"
                @change="handleFileChange" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
            </div>
          </div>



          <div class="col-lg-4 col-sm-12 mt-2">
            <label class="my-0">Confirmation Poilcy Renewal/Expired</label>
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.renwalExpired" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                    :checked="option === '-None-'">{{ option }}</option>

                </select>
              </div>
            </div>
          </div>



          <div class="col-lg-4 col-sm-12 mt-2">
            <label class="my-0">Policy Expired On </label>
            <div class="">

              <div class="input-group bg-white">
                <flat-pickr v-model="formData.policyExpiresOn" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                  class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                  ref="fpDateOfBirth" />
                <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                  <i class="fa fa-calendar"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-sm-12 mt-2">
            <label class="my-0">Name of Confirmation</label>
            <div class="">
              <input v-model="formData.nameOfConfirmation" type="text" class="form-control form-control-default"
                isrequired="false" autocomplete="off" />
            </div>
          </div> -->
        </div>
      </div>



      <h5 class="main-heading mt-5 ps-2">Policy Review & Renewal</h5>
      <div class="multisteps-form__content">
        <div class="row col-12 ps-2">
          <div class="row ms-1 pb-4 card-surface">
            <div class="col-lg-4 col-sm-6 mt-2">
              <label class="my-0">Policy Renewal Date</label>
              <div class="">

                <div class="input-group bg-white">
                  <flat-pickr v-model="formData.policyRenewalDate" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                    class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                    ref="fpDateOfBirth" />
                  <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                    <i class="fa fa-calendar"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-sm-12 mt-2">
              <label class="my-0">Policy Renewal Completed?</label>
              <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                aria-expanded="false">
                <div class="select-box">
                  <select v-model="formData.policyRenewalCompleted" id="choices-state"
                    class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                    data-choice="active">
                    <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                      :checked="option === '-None-'">{{ option }}</option>

                  </select>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-sm-12 mt-2">
              <label class="my-0">Renewal Medical Requirement?</label>
              <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                aria-expanded="false">
                <div class="select-box">
                  <select v-model="formData.renewalMedicalRequirement" id="choices-state"
                    class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                    data-choice="active">

                    <option v-for="(option, index) in applicationMedicalRequirementOptions" :key="index" :value="option"
                      :checked="option === '-None-'">{{ option }}</option>


                  </select>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-sm-12 mt-2" v-show="formData.renewalMedicalRequirement === 'Required'">
              <label class="my-0">Renewal Medical Confirmation Number</label>
              <div class="">
                <input v-model="formData.renewalMedicalConformationNumber" type="text"
                  class="form-control form-control-default" isrequired="false" autocomplete="off" />
              </div>
            </div>

            <div class="col-lg-4 col-sm-12 mt-2" v-show="formData.renewalMedicalRequirement === 'Required'">
              <label class="my-0">Renewal Medical Application Date</label>
              <div class="">
                <input v-model="formData.renewalMedicalApplicationDateAndTime" type="date"
                  class="form-control form-control-default" isrequired="false" autocomplete="off" />
              </div>
            </div>
          </div>


          <div class="row ms-1 mt-3 pb-4 card-surface">
            <div class="col-lg-6 col-sm-6 mt-2">
              <label class="my-0">Policy Expired On</label>
              <div class="">

                <div class="input-group bg-white">
                  <flat-pickr v-model="formData.policyExpiredDate" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                    class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                    ref="fpDateOfBirth" />
                  <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                    <i class="fa fa-calendar"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-sm-12 mt-2">
              <label class="my-0">Reviewed Date & Time</label>
              <div class="">

                <div class="input-group bg-white">
                  <flat-pickr v-model="formData.reviewedDateTime" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                    class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                    ref="fpDateOfBirth" />
                  <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                    <i class="fa fa-calendar"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="row ms-1 mt-3 pb-4 card-surface">
            <div class="col-lg-6 col-sm-12 mt-2" v-show="formData.reviewedDate != ''">
              <label class="my-0">Policy Review Comments</label>
              <div class="">
                <textarea v-model="formData.policyReviewComments" type="text" class="form-control form-control-default"
                  isrequired="false" autocomplete="off" />
              </div>
            </div>
            <div class="col-lg-6 col-sm-12 mt-2" v-show="formData.reviewedDate != ''">
              <label class="my-0">Policy Review Comments updated on</label>
              <div class="">

                <div class="input-group bg-white">
                  <flat-pickr v-model="formData.policyReviewCommentUpdatedOn" :config="datePickerConfig"
                    placeholder="DD/MM/YYYY" class="form-control form-control-default" :required="false"
                    autocomplete="off" id="dateOfBirth" ref="fpDateOfBirth" />
                  <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                    <i class="fa fa-calendar"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>








          <!-- <div class="col-lg-4 col-sm-6 mt-2">
              <label class="my-0">Confirmation Poilcy
                Renewal/Expired </label>
              <div class="">

                <div class="input-group bg-white">
                  <flat-pickr v-model="formData.confirmatonPolicyRenewal" :config="datePickerConfig"
                    placeholder="DD/MM/YYYY" class="form-control form-control-default" :required="false"
                    autocomplete="off" id="dateOfBirth" ref="fpDateOfBirth" />
                  <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                    <i class="fa fa-calendar"></i>
                  </span>
                </div>
              </div>
            </div>





            <div class="col-lg-4 col-md-6 mt-2" v-show="formData.reviewedDate != ''">
              <label class="my-0">Name of Confirmation
                Renewal </label>
              <div class="">
                <input v-model="formData.nameOfConfirmation" type="text" class="form-control form-control-default"
                  isrequired="false" autocomplete="off" />
              </div>

            </div> -->





          <!-- 
          <div class="col-lg-4 col-sm-12 mt-2" v-show="formData.renewalMedicalRequirement === 'Required'">
            <label class="my-0">Renewal Medical Confirmation Number</label>
            <div class="">
              <input v-model="formData.renewalMedicalConformationNumber" type="text"
                class="form-control form-control-default" isrequired="false" autocomplete="off" />
            </div>
          </div>

          <div class="col-lg-4 col-sm-12 mt-2" v-show="formData.renewalMedicalRequirement === 'Required'">
            <label class="my-0">Renewal Medical Application Date</label>
            <div class="">
              <input v-model="formData.renewalMedicalApplicationDateAndTime" type="date"
                class="form-control form-control-default" isrequired="false" autocomplete="off" />
            </div>
          </div> -->

        </div>



      </div>

      <div class="multisteps-form__content">
        <!-- buttons -->
        <div class="button-row d-flex justify-content-center mt-4 gap-4 space">
          <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" type="button"
            @click.prevent="prevStep">
            Prev
          </button>
          <button class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" type="button"
            @click.prevent="nextStep">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
<script>
import { applicationMedicalRequirementOptions, approvalRatingOptions, clientFirstPolicyOptions } from "../../utils/picklist.js";
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';


export default {
  components: { flatPickr },
  props: {
    policyDetails: {
      type: Object,
      required: true
    }
  },
  watch: {
    policyDetails: {
      handler(newVal) {
        if (JSON.stringify(newVal) !== JSON.stringify(this.formData)) {
          this.formData = { ...newVal };
        }
      },
      deep: true
    },
    formData: {
      handler(newVal) {
        if (JSON.stringify(newVal) !== JSON.stringify(this.policyDetails)) {
          this.$emit('update-policyDetails', { ...newVal });
        }
      },
      deep: true
    }
  },

  data() {
    return {
      datePickerConfig: {
        dateFormat: "d/m/Y", // DD/MM/YYYY
        allowInput: true
      },
      dateTimePickerConfig: {
        dateFormat: "d/m/Y H:i", // DD/MM/YYYY HH:mm
        allowInput: true,
        enableTime: true,
        time_24hr: true
      },
      formData: { ...this.policyDetails },
      clientFirstPolicyOptions: { ...clientFirstPolicyOptions },
      approvalRatingOptions: { ...approvalRatingOptions },
      applicationMedicalRequirementOptions: { ...applicationMedicalRequirementOptions },
      errors: {},
    }
  },
  methods: {
    openDatePicker() {
      if (this.$refs.fpDateOfBirth && this.$refs.fpDateOfBirth.fp) {
        this.$refs.fpDateOfBirth.fp.open()
      }
    },
    nextStep() {
      this.$emit('next', this.formData);
    },
    prevStep() {
      this.$emit('previous');
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.formData.policyAttachmentLink = file;
      }
    },

  }
}
</script>

<style>
@media screen and (max-width:500px) {
  .space {
    margin-bottom: 150px;
  }
}
</style>