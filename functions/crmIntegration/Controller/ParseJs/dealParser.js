const {getAccessToken,getDealCrmData, insertData, insertSubformData} = require("../../Utils/helper");
const {dateTimeFormat} = require("../../Utils/util");
async function parseDealData(app,dealData) {
  // <<<<<<<<<<<<< ========= ACCESSTOKEN ========== >>>>>>>>>>>>>>>>>>
  // const accessToken = await getAccessToken();
  // <<<<<<<<<<<<< ========= CRM DATA USING ZQCL  ========== >>>>>>>>>>>>>>>>>>
  // const catalystRowsArr = await getDealCrmData(dealData.id, accessToken);
  // const catalystRows = {...catalystRowsArr[0],...catalystRowsArr[1]};
  const catalystRows ='';
  const layout = dealData?.Layout === "4299079000000091023" ? "Standard Layout" : dealData?.Layout === "4299079000125250851" ? "Life Insurence" : dealData?.Layout === "4299079000125250001" ? "RRSP" : "Critical Insurance"

  const allState = await allStates(dealData,layout,catalystRows);
  const dealParse = allState[0];
  const policyTrackingParse = allState[1];
  const ownershipParse = allState[2];
  const beneficiariesParse = allState[3];
  const trusteesParse = allState[4];

  // // <<<<<<<<<<<<< ========= DEAL Insert ========== >>>>>>>>>>>>>>>>>>>
  const dealId = await insertData(app, "deals", dealParse);
  const dealResp = await Promise.all([
    insertData(app, "dealPolicyTracking", {...policyTrackingParse,dealId:dealId}),
    insertSubformData(app,"dealOwnership",ownershipParse,dealId,"deals"),
    insertSubformData(app,"dealBeneficiaries",beneficiariesParse,dealId,"deals"),
    insertSubformData(app,"trustees",trusteesParse,dealId,"deals")
  ]);
  console.log("dealId",dealId);
  console.log("dealResp",dealResp);
  
}
// <<<<<<<<<<<<< ========= CRM DATA PARSING ========== >>>>>>>>>>>>>>>>>>>
async function allStates(dealData,layout,catalystRows) {
  return  await Promise.all([
    parseData(dealData,layout,catalystRows),
    parsePolicyTrackingDate(dealData),
    parseOwnership(dealData),
    parseBeneficiaries(dealData),
    parseTrustees(dealData)
  ])
}
async function parseData(crmData,layout,lookUpData) {
  return {
    // <<<<<<<<<< ========= CATALYST LOOKUP DATA ========== >>>>>>>>>>>>>>>>>>
    locationName: lookUpData?.Loc_CatalystId ?? null,
    insuranceLead: lookUpData?.Lead_CatalystId ?? null,
    contactName: lookUpData?.Con_CatalystId ?? null,
    insuranceLeadLookup: lookUpData.LeadIns_CatalystId ?? null,
    // <<<<<<<<<< ========= CRM FIELDS DATA ========== >>>>>>>>>>>>>>>>>>
    layout: layout ?? "",
    dealName: crmData?.Deal_Name ?? "",
    dealOwner: "22106000000065307",
    insuranceLeadSource: crmData?.Lead_Source ?? "",
    currency: crmData?.Currency ?? "",
    type: crmData?.Type ?? "",
    stage: crmData?.Stage ?? "",
    forecastCategory: crmData?.Forecast_Category__s ?? "",
    exchangeRate: crmData?.Exchange_Rate ?? null,
    phoneBurnerFollowUpDate: crmData?.phoneburner0__PhoneBurner_Follow_Up_Date ?? null,
    roundRobinAssignmentTime: await dateTimeFormat(crmData?.advancedroundrobin__Round_Robin_Assignment_Time) ?? null,
    phoneBurnerLastCallTime: crmData?.phoneburner0__PhoneBurner_Last_Call_Time ?? null,
    phoneBurnerLastCallOutcome: crmData?.phoneburner0__PhoneBurner_Last_Call_Outcome ?? "",
    reRunRoundRobin: crmData?.advancedroundrobin__Re_run_round_robin ?? false,
    emailRoundRobinOwner: crmData?.advancedroundrobin__Email_Round_Robin_Owner ?? false,
    roundRobinProcessed: crmData?.advancedroundrobin__Round_Robin_Processed ?? false,
    eligibleRoundRobinOwnerFound:crmData?.advancedroundrobin__Eligible_Round_Robin_Owner_Found ?? false,
    isClientTheInsured: crmData?.Is_Client_the_Insured ?? "", 
    areThereMultipleInsuredForThisPolicy:crmData?.Are_there_multiple_Insured_for_this_Policy ?? "", 
    // areTherecrmDatasforThisPolicy: crmData?.Are_there_multiple_Insured_for_this_Policy ?? "",
    trustDocumentsReceivedAndUploaded: crmData?.Trust_Documents_Received_and_Uploaded ?? "",
    // numberOfcrmDatas: crmData?.numberOfcrmDatas ?? null,
    trustDissolutionDate: crmData?.Trust_Dissolution_Date ?? null,
    applicationOn: crmData?.Application_On ?? null,
    isClientABeneficiary: crmData?.Is_Client_a_Beneficiary ?? "",
    areThereMultipleBeneficiariesExclClient: crmData?.Are_there_Multiple_Beneficiaries_excl_Client ?? "", 
    // numberOfcrmDataUpto: crmData?.numberOfcrmDataUpto ?? "",
    applicationInitiatedOn: crmData?.Application_Initiated_On ?? null,
    currentClaims: crmData?.Any_Current_Claims_on_this_Policy ?? "",
    pastClaims: crmData?.Any_Past_Claims_on_this_Policy ?? "", 
    claimClosedOn: crmData?.Claim_Closed_On ?? null, 
    reasonOfClaim: crmData?.Reason_of_Claim ?? "",
    claimOutcome: crmData?.Claim_Outcome ?? "", 
    claimSubmitted: crmData?.Claim_Submitted ?? "",
    claimAmount: crmData?.Claim_Amount	 ?? null,
    totalPolicyCommission: crmData?.Total_Policy_Commission ?? null,
    dateOfClaim: crmData?.Date_of_Claim ?? null,
    settlementOrRejectionObservations: crmData?.Settlement_or_Rejection_Observations ?? "",
    howManyMonthsLeft: crmData?.How_Many_Months_left	 ?? null,
    returnAmount: crmData?.Return_Amount ?? null,
    description: crmData?.Description ?? "",
  };
}
async function parsePolicyTrackingDate(crmData) {
  return {
    initiatedDate: crmData?.Application_Initiated_On ?? null,
    nextFollowUpDate: crmData?.Next_Follow_Up_Date ?? null,
    amendmentRequestedDate: crmData?.Amendment_Requested_Date	 ?? null,
    amendmentRequestedFor: crmData?.Amendment_Requested_for	 ?? "",
    amendmentCompletedDate: crmData?.Amendment_Completed_Date ?? null,
    applicationMedicalRequirement: crmData?.Application_Medical_requirement ?? "",
    applicationConfirmationNumber: crmData?.Application_Medical_Confirmation_Number ?? null,
    applicationMedicalAppointmentDateTime: await dateTimeFormat(crmData.Application_Medical_Appointment_Date_Time) ?? null,
    applicationCancelled: crmData?.Application_Cancelled	 ?? null,
    applicationPostponed: crmData?.Application_Postponed_To	 ?? null,
    policyDeclinedDate: crmData?.Policy_Declined_Date	 ?? null,
    policyApprovedDate: crmData?.Policy_Approved_Date	 ?? null,
    policyDeclinedReason: crmData?.Reasons_for_Policy_being_Declined ?? "",
    approvalRating: crmData?.Approval_Rating	 ?? "",
    pickupPeriod: crmData?.Premiums_Paid_during_Pick_Up_Period ?? "",
    startDate: crmData?.Policy_Start_Date	 ?? null,
    policyPickedUp: crmData?.Policy_Picked_Up_On	 ?? null,
    issuedDate: crmData?.Policy_Issued_Date	 ?? null,
    medicalRequirement: crmData?.Renewal_Medical_requirement ?? "",
    reviewComments: crmData?.Policy_Review_Comments ?? "",
    commentsUpdatedOn: crmData?.Policy_Review_Comments_updated_on ?? null,
    policyRenewalDate: crmData?.Reviewed_Date_Time ?? null,
    confirmationNumber: crmData?.Application_Medical_Confirmation_Number	 ?? "",
    reviewedDate: await dateTimeFormat(crmData.Reviewed_Date_Time	) ?? null,
    policyExpiredDate: crmData?.Policy_Expired_On	 ?? null,
    renewalCompleted: crmData?.Policy_Renewal_Completed	 ?? "",
    amountSettled: crmData?.Amount_Settled	 ?? null,
    policyCommision: crmData?.Total_Policy_Commission	 ?? null,
    advisorCommision: crmData?.Total_Advisor_Commission ?? null,
    actualPolicyCommision: crmData?.Actual_policy_Commission_after_Deductibles ?? null,
    netCommision: crmData?.Net_Corporate_Commission ?? null,
    netAdvisorCommision: parseFloat(crmData?.Net_Advisor_Commission_After_Deductible) ?? null,
    netCorporateCommision: parseFloat(crmData?.Net_Corporate_Commission) ?? null,
  };
}
// <<<<<<<<<<<<< ========= SUBFORM PARSE DATA ========== >>>>>>>>>>>>>>>>>>>
async function parseOwnership(dealData) {
  let  dealOnwerShip = [];
  if (dealData.Insured_1_Name || dealData.Insured_1_Phone || dealData.Insured_1_Email) {
    dealOnwerShip[0] = {
      insuredName: dealData.Insured_1_Name ?? "",
      insuredPhone: dealData.Insured_1_Phone ?? "",
      insuredEmail: dealData.Insured_1_Email ?? "",
    };
  }
  if (dealData.Insured_2_Name || dealData.Insured_2_Phone || dealData.Insured_2_Email) {
  dealOnwerShip[1] = {
    insuredName: dealData.Insured_2_Name ?? "",
    insuredPhone: dealData.Insured_2_Phone ?? "",
    insuredEmail: dealData.Insured_2_Email ?? "",
  };
}
if (dealData.Insured_3_Name || dealData.Insured_3_Phone || dealData.Insured_3_Email) {
  dealOnwerShip[2] = {
    insuredName: dealData.Insured_3_Name ?? "",
    insuredPhone: dealData.Insured_3_Phone ?? "",
    insuredEmail: dealData.Insured_3_Email ?? "",
  };
}
  return dealOnwerShip
}
async function parseBeneficiaries(dealData) {
  const beneficiariesArr= []
  if(dealData.Beneficiary_1_Name || dealData.Beneficiary_1_Phone || dealData.Beneficiary_1_Email || dealData.Beneficiary_1_Relationship_with_Insured) {
    beneficiariesArr[0] = {
      beneficiaryName: dealData.Beneficiary_1_Name ?? "",
      beneficiaryRelationshipWithInsured: dealData.Beneficiary_1_Relationship_with_Insured ?? "",
      beneficiaryEmail: dealData.Beneficiary_1_Email ?? "",
      beneficiaryPhone: dealData.Beneficiary_1_Phone ?? "",
    }
  }
  if(dealData.Beneficiary_2_Name || dealData.Beneficiary_2_Phone || dealData.Beneficiary_2_Email || dealData.Beneficiary_2_Relationship_with_Insured) {
    beneficiariesArr[1] = {
      beneficiaryName: dealData.Beneficiary_2_Name ?? "",
      beneficiaryRelationshipWithInsured: dealData.Beneficiary_2_Relationship_with_Insured ?? "",
      beneficiaryEmail: dealData.Beneficiary_2_Email ?? "",
      beneficiaryPhone: dealData.Beneficiary_2_Phone ?? "",
    }
  }
  if(dealData.Beneficiary_3_Name || dealData.Beneficiary_3_Phone || dealData.Beneficiary_3_Email || dealData.Beneficiary_3_Relationship_with_Insured) {
    beneficiariesArr[2] = {
      beneficiaryName: dealData.Beneficiary_3_Name ?? "",
      beneficiaryRelationshipWithInsured: dealData.Beneficiary_3_Relationship_with_Insured ?? "",
      beneficiaryEmail: dealData.Beneficiary_3_Email ?? "",
      beneficiaryPhone: dealData.Beneficiary_3_Phone ?? "",
    }
  }
  if(dealData.Beneficiary_4_Name || dealData.Beneficiary_4_Phone || dealData.Beneficiary_4_Email || dealData.Beneficiary_4_Relationship_with_Insured) {
    beneficiariesArr[3] = {
      beneficiaryName: dealData.Beneficiary_4_Name ?? "",
      beneficiaryRelationshipWithInsured: dealData.Beneficiary_4_Relationship_with_Insured ?? "",
      beneficiaryEmail: dealData.Beneficiary_4_Email ?? "",
      beneficiaryPhone: dealData.Beneficiary_4_Phone ?? "",
    }
  }
  if(dealData.Beneficiary_5_Name || dealData.Beneficiary_5_Phone || dealData.Beneficiary_5_Email || dealData.Beneficiary_5_Relationship_with_Insured) {
    beneficiariesArr[4] = {
      beneficiaryName: dealData.Beneficiary_5_Name ?? "",
      beneficiaryRelationshipWithInsured: dealData.Beneficiary_5_Relationship_with_Insured ?? "",
      beneficiaryEmail: dealData.Beneficiary_5_Email ?? "",
      beneficiaryPhone: dealData.Beneficiary_5_Phone ?? "",
    }
  }
  if(dealData.Beneficiary_6_Name || dealData.Beneficiary_6_Phone || dealData.Beneficiary_6_Email || dealData.Beneficiary_6_Relationship_with_Insured) {
    beneficiariesArr[5] = {
      beneficiaryName: dealData.Beneficiary_6_Name ?? "",
      beneficiaryRelationshipWithInsured: dealData.Beneficiary_6_Relationship_with_Insured ?? "",
      beneficiaryEmail: dealData.Beneficiary_6_Email ?? "",
      beneficiaryPhone: dealData.Beneficiary_6_Phone ?? "",
    }
  }
  return beneficiariesArr
}
async function parseTrustees(dealData) {
  const trusteesArr= []
  if(dealData.Name_of_Trustee_1 || dealData.Trustee_1_Email || dealData.Trustee_1_Phone || dealData.Relationship_with_Beneficiary_for_Trustee_1) {
    trusteesArr[0] = {
      name: dealData.Name_of_Trustee_1 ?? "",
      relationship: dealData.Relationship_with_Beneficiary_for_Trustee_1 ?? "",
      email: dealData.Trustee_1_Email ?? "",
      phone: dealData.Trustee_1_Phone ?? "",
    }
  }
  if(dealData.Name_of_Trustee_2 || dealData.Trustee_2_Email || dealData.Trustee_2_Phone || dealData.Relationship_with_Beneficiary_for_Trustee_2) {
    trusteesArr[1] = {
      name: dealData.Name_of_Trustee_2 ?? "",
      relationship: dealData.Relationship_with_Beneficiary_for_Trustee_2 ?? "",
      email: dealData.Trustee_2_Email ?? "",
      phone: dealData.Trustee_2_Phone ?? "",
    }
  }
  return trusteesArr
}
module.exports = {
    parseDealData
  }