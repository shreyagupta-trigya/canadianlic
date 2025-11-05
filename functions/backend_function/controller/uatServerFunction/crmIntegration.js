const catalyst = require("zcatalyst-sdk-node");
// const dayjs = require('dayjs');
const {getAccessToken,getDealCrmData,getLeadCrmData,dateTimeFormat,insertData,updateData,deleteData,insertSubformData,updateSubformData,deleteSubformData} = require("../Utils/helper");
// const {dateTimeFormat} = require("../Utils/util");
const { search } = require("../SQL/queries");
const { promises } = require("form-data");
exports.checkConnection = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "I am Live and Ready from crmIntegration controller.",
  });
};
exports.createUpdateLead = async (req, res) => {
  const catalystApp = catalyst.initialize(req, { scope: "admin" });
  const leadData= req.body;
  const crmId = leadData?.id
  const layout = leadData?.Layout === "4299079000000091055" ? "Client" : " Advisor Leads"
  const accessToken = await getAccessToken();
  const catalystRowsArr = await getLeadCrmData(crmId, accessToken);
  const leadLookupObj = {...catalystRowsArr[0],...catalystRowsArr[1]};
  const allStats= await getAllStats(leadData,leadLookupObj,layout)
  let leads = allStats[0];
  let familyTree = allStats[1];
  let serviceRequestDetails = allStats[2];
  let description = allStats[3];
  let parseAdvisorData = allStats[4];
  let leadInfo = allStats[5];
  let dependentChildrenData = allStats[6];
  let dependentParentsData = allStats[7];
  let siblingsData = allStats[8];
  let emergencyContactData = allStats[9];
  let festivalStats = allStats[10];
  let leadManagementHistory = allStats[11];
if (!leadData.Catalyst_ID ) {
  
  const leadId = await insertData(catalystApp, "leads",leads);
  const functionState = await Promise.all([
    insertData(catalystApp, "familyTree", {...familyTree,leadId:leadId}),
    insertData(catalystApp, "leadInformations", {...leadInfo,leadId:leadId}),
    insertData(catalystApp, "leadsDescription", {...description,leadId:leadId}),
    insertData(catalystApp, "leadService", {...serviceRequestDetails,leadId:leadId}),
    insertSubformData(catalystApp, "dependentChildren", dependentChildrenData,leadId,"leads"),
    insertSubformData(catalystApp, "dependentParents", dependentParentsData,leadId,"leads"),
    insertSubformData(catalystApp, "contactsSiblings", siblingsData,leadId,"leads"),
    insertSubformData(catalystApp, "contactEmergencyDetails", emergencyContactData,leadId,"leads"),
    insertSubformData(catalystApp, "festivals", festivalStats,leadId,"leads"),
    insertSubformData(catalystApp, "leadConversionHistory", leadManagementHistory,leadId,"leads")
  ]);

  res.status(200).json({ success: true, message: "I am live",leadId,accessToken,leadLookupObj,functionState});
} 
// else {
  
// }
};
exports.createUpdateDeal = async (req, res) => {
  const dealData = req.body;
  const app = catalyst.initialize(req, { scope: "admin" });
  // // <<<<<<<<<<<<< ========= ACCESSTOKEN ========== >>>>>>>>>>>>>>>>>>
  const accessToken = await getAccessToken();
  // const accessToken = "1000.51c2435e750734c191aaa960f44c7a48.1b07ab406625eed6bc27693ae7a7fb0f"
  //// <<<<<<<<<<<<< ========= CRM DATA USING ZQCL  ========== >>>>>>>>>>>>>>>>>>
  // const dealId = dealData?.id
  // const catalystRowsArr = await getDealCrmData(dealId, accessToken);
  const catalystRowsArr = [ { Deal_Name: 'Trigya Test new 23', Con_CatalystId: null, Catalyst_Id: null, id: '4299079000232093174', Loc_CatalystId: null }, { Deal_Name: 'Trigya Test new 23', Lead_CatalystId: null, Catalyst_Id: null, LeadIns_CatalystId: null, id: '4299079000232093174' } ]
  const catalystRows = {...catalystRowsArr[0],...catalystRowsArr[1]};
  const layout = dealData?.Layout === "4299079000000091023" ? "Standard Layout" : dealData?.Layout === "4299079000125250851" ? "Life Insurence" : dealData?.Layout === "4299079000125250001" ? "RRSP" : "Critical Insurance"

  // // <<<<<<<<<<<<< ========= CRM DATA PARSING ========== >>>>>>>>>>>>>>>>>>>
  const allState = await allStates(dealData,layout,catalystRows);
  const dealParse = allState[0];
  const policyTrackingParse = allState[1];
  const ownershipParse = allState[2];
  const beneficiariesParse = allState[3];
  const trusteesParse = allState[4];
  // // <<<<<<<<<<<<< ========= DEAL Insert ========== >>>>>>>>>>>>>>>>>>>
  const dealId = await insertData(app, "deals", dealParse);
  // let dealId = "22106000000916507";
  const dealResp = await Promise.all([
    insertData(app, "dealPolicyTracking", {...policyTrackingParse,dealId:dealId}),
    insertSubformData(app,"dealOwnership",ownershipParse,dealId,"deals"),
    insertSubformData(app,"dealBeneficiaries",beneficiariesParse,dealId,"deals"),
    insertSubformData(app,"trustees",trusteesParse,dealId,"deals")
  ]);
  res.status(200).json({ success: true, message: "I am live",dealId,dealResp});
  };
exports.createUpdateContact = async (req, res) => {
  const catalystApp = catalyst.initialize(req, { scope: "admin" });
  const contacts  = req.body;
  const layout = contacts?.Layout === "4299079000000091033" ? "Client" : " Advisor Leads"
  const allState = await allContactStates(contacts,layout);
  
  res.status(200).json({ success: true, message: "I am live", allState });
};
exports.createUpdateLocation = async (req, res) => {
  const catalystApp = catalyst.initialize(req, { scope: "admin" });
  const { locations } = req.body;
  const id = await searchData(catalystApp, "locations", locations?.sourceId);
  const locationId =
    id == null
      ? await insertData(catalystApp, "locations", locations)
      : await updateData(catalystApp, "locations", { ...locations, ROWID: id });
  const resp = {crmId : id, catalystId: locationId};
  res.status(200).json({ success: true, message: "I am live", resp});
};
exports.createUpdatePolicy = async (req, res) => {
  const catalystApp = catalyst.initialize(req, { scope: "admin" });
  const { policies } = req.body;
  const id = await searchData(catalystApp, "policies", policies?.sourceId);
  const policyId =
    id == null
      ? await insertData(catalystApp, "policies", policies)
      : await updateData(catalystApp, "policies", { ...policies, ROWID: id });
  const resp = {crmId : id, catalystId: policyId};
  res.status(200).json({ success: true, message: "I am live", resp });
};
exports.createUpdateInvestment = async (req, res) => {
  const catalystApp = catalyst.initialize(req, { scope: "admin" });
  const { investments } = req.body;
  const id = await searchData(catalystApp, "investments", investments?.sourceId);
  const investmentId =
    id == null
      ? await insertData(catalystApp, "investments", investments)
      : await updateData(catalystApp, "investments", { ...investments, ROWID: id });
  const resp = {crmId : id, catalystId: investmentId};  
  res.status(200).json({ success: true, message: "I am live", resp});
};
exports.compareobj = async (req, res) => {
  const { objA, objB } = req.body;
  let unmatchedKeys = {};
  for (let keyA in objA) {
      let valueA = objA[keyA];
      let keyB = keyA; // Assume the same key name in Object B

      // Check if the key exists in object B
      if (keyB in objB) {
          let valueB = objB[keyB];
          // Compare values, add to unmatchedKeys if different
          if (valueA !== valueB) {
              unmatchedKeys[keyA] = { "Object A": valueA, "Object B": valueB };
          }
      } else {
          unmatchedKeys[keyA] = { "Object A": valueA, "Object B": "Key missing in Object B" };
      }
  }
  for (let keyB in objB) {
    if (!(keyB in objA)) {
        unmatchedKeys[keyB] = { "Object A": "Key missing in Object A", "Object B": objB[keyB] };
    }
  }
  // return unmatchedKeys;
  res.status(200).json({ success: true, message: "I am live", unmatchedKeys});
}
// <<<<<<<<<<<========= CRM CONTACT FUNCTIONS ========>>>>>>>>>>>>>>>>>>>>>>>>>>>>
async function allContactStates(contacts,layout) {
  return  await Promise.all([
    parseContactData(contacts,layout)
  ]);
}
async function parseContactData(contacts,layout) {
  return {
    contactOwner: "22106000000065307",
    firstName: contacts.First_Name ?? "",
    lastName: contacts.Last_Name ?? "",
    mobile: contacts.Mobile ?? "",
    email: contacts.Email ?? "",
    whatsApp: contacts.whatsApp ?? "",
    source: "crm",
    sourceId: contacts?.id,
    layoutName: layout??'',
    clientPolicyIssueOn: new Date(contacts.Date_On_Boarded) ?? null,
    dateOfBirth: new Date(contacts.Date_of_Birth) ??null,    
    roundRobinAssignmentTime: await dateTimeFormat(contacts?.Round_Robin_Assignment_Time1) ?? null,
    leadCreatedTime: await dateTimeFormat(contacts?.Lead_Created_On1) ?? null,
    clvCorporateCommision: contacts?.CLV_Amount ?? '',
    lastClvCorporate: contacts?.Last_CLV_Corporate ?? '',
    clvAdvisorCommision: contacts?.CLV_Advisor_Commision	 ?? '',
    lastClvAdvisor: contacts?.Last_CLV_Advisor ?? '',   
    // phoneBurnerFollowUpDate: await dateTimeFormat(contacts.phoneBurnerFollowUpDate) ?? null,
    // phoneBurnerLastCallTime: await dateTimeFormat(contacts .phoneBurnerLastCallTime) ?? null,
    description: contacts?.Description ?? '',
    numberofProductsRemaining: contacts?.Number_of_Products_Remaining_Dependents ?? '',
    removeFromCampaign: contacts?.Remove_From_Campaign ?? false,
    eligibleRoundRobinOwnerFound1: contacts?.Eligible_Round_Robin_Owner_Found1 ?? false,
    eligibleRoundRobinOwnerFound: contacts?.advancedroundrobin__Eligible_Round_Robin_Owner_Found ?? false,
    emailRoundRobinOwner2: contacts?.Email_Round_Robin_Owner2 ?? false,
    emailOptOut: contacts?.Email_Opt_Out ?? false,
    roundRobinProcessed: contacts?.Round_Robin_Processed1	 ?? false,
    reRoundRobinProcessed: contacts?.advancedroundrobin__Re_run_round_robin ?? false,
    rcSMSOptOut: contacts?.multiuserringcentralmessagingextension__RC_SMS_Opt_Out ?? false,
    clientAddress: contacts?.Client_Address	 ?? '',
    dealStageTracking: contacts?.Stage_Track ?? '',    
    assignedAdvisor: null, // Update after meeting
    insuranceLeadSource: contacts?.Insurance_Leads_Scoring_Score ?? '',
    status: contacts?.Status	 ?? '',
    leadId: null, // Update after meeting
    oldDatabaseLead: contacts?.Old_Database_Lead ?? '',
    location: null, // Update after meeting
    autoInsurance: contacts?.Auto_Insurance	 ?? '',
    parentClient: null,// Update after meeting
    preferredContactMethod: contacts?.Preferred_Contact_Method ?? '',
    preferredContactTime: contacts?.Preferred_Contact_Time	 ?? '',
    gender: contacts?.Gender ?? '',
    doYouHaveCorporations: contacts?.Do_you_have_a_Corporation	 ?? '',
    immigrationServices: contacts?.Immigration_Services	 ?? '',
    socialMediaInformation: contacts?.Social_Media_Information	 ?? '',
    understandingOfInsurance: contacts?.Understanding_of_Insurance ?? '',
    netWorth: contacts?.Net_Worth ?? '',
    emailIsValid: contacts?.Email_is_valid	 ?? '',
    additionalContactInformation: contacts?.Additional_Contact_Information ?? false,
  };
}

async function searchData(catalystApp, tableName, id) {
  try {
    const query = search.replace("%TABLE%", tableName).replace("%ROWID%", id);
    console.log("<<<<<<<<< ========= QUERY ========== >>>>>>>>>>>>>>>>>>>>>>>",query);
    
    const result = await catalystApp
      .zcql()
      .executeZCQLQuery(query);
    let size = result.length;
    return size > 0 ? result[0].leads.ROWID : null;
  } catch (error) {
    console.error(`Error inserting data into ${tableName}:`, error);
    throw error;
  }
}
// <<<<<<<<<< ========= CRM DEALS FIELDS DATA ========== >>>>>>>>>>>>>>>>>>
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
    dealName: crmData?.dealName ?? "",
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

// <<<<<<<<<< ========= CRM LEADS FIELDS DATA ========== >>>>>>>>>>>>>>>>>>

async function getAllStats(crmResp,leadLookupObj,layout)
 {
  return  Promise.all([
    parseLeadsData(crmResp,leadLookupObj,layout),
    getFamilyTree(crmResp),
    getServiceRequestDetails(crmResp),
    getDescriptionStats(crmResp),
    parseAdvisorData(crmResp,leadLookupObj),
    getLeadInfo(crmResp),
    getDependentChildren(crmResp),
    getDependentParents(crmResp),
    getSiblings(crmResp) ,
    getEmergencyContact(crmResp),
    getFestivalStats(crmResp),
    getLeadManagementHistory(crmResp)
  ]);
  // return {
  //     leads : await parseLeadsData(crmResp,leadLookupObj,layout),
  //     familyTree : await getFamilyTree(crmResp),
  //     serviceRequestDetails: await getServiceRequestDetails(crmResp),
  //     descriptionStats: await getDescriptionStats(crmResp),
  //     parseAdvisorData: await parseAdvisorData(crmResp,leadLookupObj),
  //     leadInfo: await getLeadInfo(crmResp),
  //     dependentChildrenData: await getDependentChildren(crmResp),
  //     dependentParentsData: await getDependentParents(crmResp),
  //     siblingData: await getSiblings(crmResp) ,
  //     emergencyContactData: await getEmergencyContact(crmResp),
  //     festivalStats: await getFestivalStats(crmResp),
  //     leadManagementHistory: await getLeadManagementHistory(crmResp)
  // };
}
async function parseLeadsData (crmResp,leadLookupObj,layout) {
  let leads= {
  firstName : crmResp?.First_Name ?? "",
  lastName : crmResp?.Last_Name ?? "",
  mobile : crmResp?.Mobile ?? "",
  whatsapp : crmResp?.Whatsapp ?? "",
  email : crmResp?.Email ?? "",
  removeFromCampaign : crmResp?.Remove_From_Campaign ?? false,
  emailOptOut : crmResp?.Email_Opt_Out ?? "",
  bestTimeToCall : crmResp?.Best_Time_To_Call ?? "",
  roundRobinProcessed : crmResp?.advancedroundrobin__Round_Robin_Processed ?? false,
  emailRoundRobinOwner : crmResp?.advancedroundrobin__Email_Round_Robin_Owner ?? "",
  eligibleRoundRobinOwnerFound : crmResp?.advancedroundrobin__Eligible_Round_Robin_Owner_Found ?? "",
  reRunRoundRobin : crmResp?.advancedroundrobin__Re_run_round_robin ?? "",
  roundRobinAssignmentTime : crmResp?.advancedroundrobin__Round_Robin_Assignment_Time ?? "",
  leadCreatedOn : crmResp?.Lead_Created_On ?? "",
  insuranceLeadSource : crmResp?.Lead_Status ?? "",
  religion : crmResp?.Religion ?? "",
  preferredContactMethod : crmResp?.Preferred_Contact_Method ?? "",
  citizenshipStatus : crmResp?.Citizenship_Status ?? "",
  doYouhaveLifeInsurance : crmResp?.Do_you_have_life_insurance ?? "",
  submitPageURL : crmResp?.Submit_Page_URL ?? "",
  assignedCampaigns : crmResp?.Assigned_Campaigns ?? "",
  existingInsurancePolicy : crmResp?.Existing_Insurance_Policy ?? "",
  inboxURL : crmResp?.Inbox_URL ?? "",
  phoneBurnerLastCallOutcome : crmResp?.phoneburner0__PhoneBurner_Last_Call_Outcome ?? "",
  areYouLLQPLicensed : crmResp?.Are_you_LLQP_Licensed ?? "",
  phoneBurnerFollowUpDate : crmResp?.phoneburner0__PhoneBurner_Follow_Up_Date ?? null,
  phoneBurnerLastCallTime : crmResp?.phoneburner0__PhoneBurner_Last_Call_Time ?? "",
  driverLicenseNo : crmResp?.Driver_License_No ?? "",
  vehicleYear : crmResp?.Vehicle_Year ?? "",
  whatIsYourPostalCode : crmResp?.What_is_Your_Postal_Code ?? "",
  whenWasYourVehicleMade : crmResp?.When_Was_Your_Vehicle_Made ?? "",
  phoneNumber : crmResp?.Phone_Number ?? "",
  name : crmResp?.Name1 ?? "",
  addEmail1 : crmResp?.Add_Email1 ?? "",
  quote : crmResp?.Quote ?? "",
  deposit : crmResp?.Deposit ?? "",
  dateOfBirth1 : crmResp?.Date_of_birth_1 ?? null,
  childAge : crmResp?.Child_Age ?? "",
  howMuchYouLikeToStartThePlan : crmResp?.How_Much_You_Like_to_Start_the_Plan ?? "",
  howMuchAmountWantToStartWith : crmResp?.HOW_MUCH_AMOUNT_WANT_TO_START_WITH ?? "",
  startDateOfCoverage : crmResp?.Start_Date_of_Coverage ?? null,
  dateOfBirthOfTraveler : crmResp?.Date_of_birth_of_traveler ?? null,
  insuranceLeadOwner : "22106000000065307",
  insuranceLeadSource : crmResp?.Lead_Source ?? "",
  insuranceLeadStatus : crmResp?.Lead_Status ?? "",
  emailIsValid : crmResp?.Email_is_Valid ?? "",
  gender : crmResp?.Gender ?? "",
  referredBy : crmResp?.Referred_by ?? "",
  isThisaReassignment : crmResp?.Is_this_a_Reassignment ?? "",
  locationName : leadLookupObj?.Location_CatalystId ?? null,
  netWorth : crmResp?.Net_Worth ?? "",
  preferredContactMethod : crmResp?.Preferred_Contact_Method ?? "",
  socialMediaInformation : crmResp?.Social_Media_Information ?? "",
  preferredContactTime : crmResp?.Preferred_Contact_Time ?? "",
  citizenshipStatus : crmResp?.Citizenship_Status ?? "",
  understandingOfInsurance : crmResp?.UnderstandingofInsurance ?? "",
  doYouOwnaHomeInCanada : crmResp?.Do_you_own_a_home_in_Canada ?? "",
  doYouhaveLifeInsurance : crmResp?.Do_you_have_life_insurance ?? "",
  oldDatabaseLead : crmResp?.Old_Database_Lead ?? "",
  additionalContactInformation : crmResp?.Additional_Contact_Information ?? "",
  rcSmsOptOut : crmResp?.multiuserringcentralmessagingextension__RC_SMS_Opt_Out ?? "",
  exchangeRate : crmResp?.Exchange_Rate ?? "",
  religion :  crmResp.Religion ?? "",
  celebratedFestivals: crmResp.Celebrated_Festivals ?? "",
  layoutName : layout,
  source : "crm",
  sourceId : crmResp?.id
  }
  return leads;
}
async function getFamilyTree(crmResp) {
  const familyTree = {};
  familyTree.relationShipStatus = crmResp.Relationship_Status ?? "";
  familyTree.dependentParents = crmResp.Dependent_Parents ?? "";
  familyTree.dependentChildren = crmResp.Dependent_Children1 ?? "";
  familyTree.siblings = crmResp.Siblings1 ?? "";
  familyTree.numberOfDependentChildren = crmResp.Number_of_Dependents ?? "";
  familyTree.numberOfDependentParents = crmResp.Number_of_Dependent_Parents ?? "";
  familyTree.numberOfSiblings = crmResp.Number_of_Siblings ?? "";
  familyTree.depChildren= crmResp?.Dependent_Children ?? "";
  familyTree.depSiblings= crmResp?.Siblings ?? "";
  familyTree.depParents= crmResp?.Dependents	 ?? "";
  if (crmResp.Relationship_Status === "Married") {
      familyTree.nameOfSpouse = crmResp.Name_of_Spouse ?? "";
      familyTree.anniversaryDate = crmResp.Anniversary_Date ?? "";
      familyTree.spouseDateOfBirth = crmResp.Spouse_s_Date_of_Birth ?? "";
      familyTree.emailOfSpouse = crmResp.Spouse_s_Email ?? "";
      familyTree.phoneOfSpouse = crmResp.Spouse_s_Mobile ?? "";
  } else if (crmResp.Relationship_Status === "Comman Law") {
      familyTree.nameOfCommonLawPartner = crmResp.Name_of_Common_Law_Partner ?? "";
      familyTree.commonLawDateOfBirth = crmResp.Common_Law_Partner_s_Date_of_Birth ?? "";
  }

  return familyTree;
}
async function getServiceRequestDetails(crmResp) {
  const servReq = {};
  servReq.potentialBusiness= crmResp?.Potential_Business_Policy_Values	 ?? null;
  servReq.servicesRequested= crmResp?.Service_Request_Options_1 ?? "";
  servReq.lifeInsurance = crmResp.Life_Insurance_Options ?? "";
  servReq.livingBenefits = crmResp.Living_Benefits ?? "";
  servReq.travelInsurance = crmResp.Travel_Insurance ?? "";
  servReq.autoInsurance = crmResp.Auto_Insurance ?? "";
  servReq.homeInsurance = crmResp.Home_Insurance ?? "";
  servReq.loanProtection = crmResp.Loan_Protection ?? "";
  servReq.investments = crmResp.Investments ?? "";
  servReq.groupInsurance = crmResp.Group_Insurance ?? "";
  servReq.combinationOrHybridInsurance = crmResp.Hybrid_Insurance ?? false;
  servReq.healthAndDentalInsurance = crmResp.Health_Dental_Insurance ?? false;
  servReq.businessLiabilityInsurance = crmResp.Business_Liability_Insurance ?? "";
  servReq.immigrationServices = crmResp.Immigration_Services ?? "";
  // <<<<<<<<<<< ========= CRM UMT DETAILS DATA ========== >>>>>>>>>>>>>>>>>>
  servReq.campaignidData= crmResp?.campaignid_Data ?? null,
  servReq.matchtypeData = crmResp.matchtype_Data ?? "";
  servReq.gclidData = crmResp.GCLID_Data ?? "";
  servReq.networkData = crmResp.network_Data ?? "";
  servReq.deviceData = crmResp.device_Data ?? "";
  servReq.keywordData = crmResp.keyword_Data ?? "";
  servReq.lpUrlData = crmResp.LP_URL_Data ?? "";
  return servReq;
}
async function getLeadInfo(crmResp) {
  const leadInfo = {};
  // <<<<<<<<<<<========= FACEBOOK INFO ===========>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  leadInfo.adAccount = crmResp?.Ad_Account ?? "";
  leadInfo.adAccountId = crmResp?.Ad_Account_ID ?? "";
  leadInfo.adCampaign = crmResp?.Ad_Campaign ?? "";
  leadInfo.adCampaignId = crmResp?.Ad_Campaign_ID ?? "";
  leadInfo.facebookPage = crmResp?.FaceBook_Page ?? "";
  leadInfo.facebookPageId = crmResp?.FaceBook_Page_ID ?? "";
  leadInfo.costPerLead = crmResp?.Cost_Per_Lead_CPL ?? "";
  leadInfo.adSet = crmResp?.Ad_Set ?? "";
  leadInfo.adSetId = crmResp?.Ad_Set_ID ?? "";
  leadInfo.facebookAd = crmResp?.FaceBook_Ad ?? "";
  leadInfo.adId = crmResp?.Ad_ID ?? "";
  leadInfo.leadForm = crmResp?.Lead_Form ?? "";
  leadInfo.leadFormId = crmResp?.Lead_Form_ID ?? "";
  // <<<<<<<<<<<========= ADDRESS INFO ===========>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  leadInfo.street = crmResp?.Street ?? "";
  leadInfo.state = crmResp?.State ?? "";
  leadInfo.country = crmResp?.Country ?? "";
  leadInfo.city = crmResp?.City ?? "";
  leadInfo.zipCode = crmResp?.Zip_Code ?? "";
  return leadInfo;
}
async function getDescriptionStats(crmResp) {
  const desInfo = {};
  desInfo.ageOf1stTraveler = crmResp?.stTravelerAge ?? "";
  desInfo.travelerStartDate = crmResp?.stTravelerStartdate ?? "";
  desInfo.coverageYouAreLookingFor = crmResp?.Coverage_you_are_Looking_for ?? "";
  desInfo.tobaccoused = crmResp?.Tobaccoused ?? "";
  desInfo.whatTypeOfTermPlanAreYouLookingFor = crmResp?.TermPlanareyouLookingfor ?? "";
  desInfo.howDoYouConsiderYourHealth = crmResp?.How_do_you_Consider_your_Health ?? "";
  desInfo.selectTheDurationOfTheCoverage = crmResp?.Select_The_Duration_of_the_Coverage ?? "";
  desInfo.doYouHaveAnyMedicalIssue = crmResp?.Do_you_have_any_Medical_Issue ?? "";
  desInfo.eligibleToGetExtra2000InGovernmentGrants = crmResp?.eligible_to_get_extra_2000_in_Government_Grants ?? "";
  desInfo.depositEveryMonthTowardsYourChildEducation = crmResp?.Deposit_every_Month_towards_your_Child_Education ?? "";
  desInfo.wouldYouLikeToKnowHowRespWorks = crmResp?.Would_you_like_to_know_How_RESP_Works ?? "";
  desInfo.oneMillionInanRespAccountAtRetirement = crmResp?.Million_in_an_RRSP_Account_at_Retirement ?? "";
  desInfo.doYouWanToDepositMonthlyOrYearlyPremium = crmResp?.Do_you_want_to_Deposit_Monthly_or_Yearly_Premium ?? "";
  desInfo.areYouAnOwnerOrEmployeeOfTheBusiness = crmResp?.Are_you_an_Owner_or_Employee_of_the_Business ?? "";
  desInfo.areYouLookingForDrugAndDentalOrJustDrugPla = crmResp?.Are_you_looking_for_Drug_Dental_or_Just_Drug_Pla ?? "";
  // <<< ===== FROM CATALYSTS ======= >>>
  desInfo.typeOfInsuranceLooking = crmResp?.TypeofTravelInsurance ?? "";
  desInfo.whatPolicyDoYouWant = crmResp?.WhatPolicyDoYouWant    ?? "";
  desInfo.enterageOf2ndTraveler = crmResp?.ndTravelerAge  ?? "";
  desInfo.travelerStartDate = crmResp?.stTravelerStartdate      ?? "";
  desInfo.travelerEndDate = crmResp?.stTravelerEnddate    ?? "";
  desInfo.preExistingmedicaLconditions = crmResp?.stTravelerpreexistingmedicalconditions      ?? "";
  desInfo.howMuchCoverageIsRequired = crmResp?.How_Much_Coverage_is_Required ?? "";
  desInfo.canYouPleaseLetMeKnowPremiumPaymentMode = crmResp?.PremiumPaymentmode   ?? "";
  desInfo.doYouWantCriticalIllnessInsuranceWithMoney = crmResp?.Do_you_want_Critical_Illness_Insurance_With_Money ?? "";
  desInfo.whatsYourProfession = crmResp?.Whats_your_Profession ?? "";
  desInfo.howManyCriticalIllnessCoverageYouNeed = crmResp?.How_many_Critical_Illness_Coverage_you_need ?? "";
  desInfo.howMuchMonthlyBenefitDoYouNeed = crmResp?.How_Much_monthly_Benefit_do_you_Need ?? "";
  desInfo.youAreSeekingCoverageFor = crmResp?.you_are_Seeking_coverage_for ?? "";
  desInfo.enterTheAmountOfMortgageCoverageRequired = crmResp?.Enter_the_amount_of_Mortgage_Coverage_Required ?? "";
  desInfo.whatsYourAge = crmResp?.whatsyourAge ?? "";
  desInfo.secureYourChildsFutureWithHigherEducation = crmResp?.Secure_your_Childs_Future_with_Higher_Education ?? "";
  desInfo.howMuchDoYouWantToSaveMonthly = crmResp?.How_much_do_you_want_to_Save_monthly ?? "";
  desInfo.wouldLikeToIncreaseMonthlyDeposits = crmResp?.Would_like_to_increase_Monthly_Deposits     ?? "";
  desInfo.howManyChildrensDoYouHave = crmResp?.How_many_child_Children_s_do_you_have ?? "";
  desInfo.whatIsYourResidencyStatusInCanada = crmResp?.What_is_your_residency_status_in_Canada ?? "";
  desInfo.howLongDoYouNeedCoverageFor = crmResp?.How_long_do_you_need_Coverage_for ?? "";
  desInfo.moneyRequireToCompleteYourChildEducation = crmResp?.Money_require_to_Complete_your_Child_s_Education ?? "";
  desInfo.selectYourAgeBracket = crmResp?.Select_your_Age_Bracket     ?? "";
  desInfo.howMuchdoYouWantToSaveYearly = crmResp?.How_much_do_you_want_to_Save_Yearly ?? "";
  desInfo.whatageDoYouWanttostartTheWithdrawalFrom = crmResp?.What_age_do_you_want_to_start_the_withdrawal_from ?? "";
  desInfo.whatKindOfBusinesssIsIt = crmResp?.What_age_do_you_want_to_start_the_withdrawal_from ?? "";
  desInfo.wouldYouLikeToKnowHowRrspWorks = crmResp?.Would_you_like_to_know_How_RESP_Works ?? "";
  desInfo.oneMillionInAnTfsaAccountAtRetirement = crmResp?.Million_in_an_RRSP_Account_at_Retirement ?? "";
  desInfo.areYouLicensedAsAnInsuranceAdvisor = crmResp?.Are_You_Licensed_as_an_Insurance_Advisor ?? "";
  desInfo.whatTimeFrameYouLikeToMoveToBeaAdvisor = crmResp?.What_time_frame_you_like_to_move_to_be_a_advisor ?? "";
  desInfo.existingHealthConditions = crmResp?.stTravelerpreexistingmedicalconditions ?? "";
  desInfo.secureYourChildFutureWithHigherEducation	= crmResp?.Secure_your_Childs_Future_with_Higher_Education ?? "";
  desInfo.LookingForAdvisor = crmResp?.Gclid_Field ?? "";
  // desInfo.wouldYouLikeToKnowHowTfsaWorks = crmResp?.Would_you_like_to_know_How_RESP_Works ?? "";
  // desInfo.wouldYouLikeToKnowHowSuperVisaInsuranceWo = crmResp?. ?? "";
  // desInfo.singleOrFamilyPlan = crmResp?. ?? "";
  // desInfo.monthlyPremiumKnowledge = crmResp?. ?? "";
  // desInfo.previousPolicyWithUs = crmResp?. ?? "";
  // desInfo.superVisaInsurance = crmResp?. ?? "";
  return desInfo;
}
async function parseAdvisorData(crmResp,leadLookupObj) {
  // // <<<<<<<<<<======== LEAD INFORMATION =========>>>>>>>>>>>>>>>>>>>>>
  let advisorLead = {
    ifReferredByAdvisorOrExternalReferral: crmResp?.Advisor_Name ?? "",
    existingPolicyRenewalDueBy: crmResp?.Renewal_Due_By ?? null,
    rcSmsOptOut: crmResp?.multiuserringcentralmessagingextension__RC_SMS_Opt_Out ?? false,
    coverageYouAreLookingFor: crmResp?.Coverage_you_are_Looking_fo ?? "",
    secondaryEmail: crmResp?.Secondary_Email ?? "",
    fax: crmResp?.Fax ?? "",
    readyForPurchase: crmResp?.Are_you_ready_to_purchase_this_Life_Insurance_Pol ?? false,
    description: crmResp?.Description ?? "",
  };
  // // <<<<<<<<<<======== ReferralInformation =========>>>>>>>>>>>>>>>>>>>>>
  let advisorRefferel = {
    year: crmResp?.Year ?? "",
    productCategoryReferred: crmResp?.Referral_Payout_Category ?? "",
    referralSource: crmResp?.Referral_Source ?? "",
    referralClient: leadLookupObj?.Referral_Name_Client ?? null,
    referralOtherThanClient: leadLookupObj?.Referral_Name_Others ?? null,
  };

  // // <<<<<<<<<<======== LEAD INFO =========>>>>>>>>>>>>>>>>>>>>>"twitter1": "e",
  let advisorFaceBook = {
    instagramId: crmResp?.Instagram ?? "",
    faceBook: crmResp?.FaceBook ?? "",
    linkedIn1: crmResp?.Linked_In ?? "",
    skypeId: crmResp?.Skype_ID ?? "",
    twitter1 : crmResp?.Twitter ?? "",
  };
  return { advisorLead, advisorFaceBook, advisorRefferel };
}

// <<<<<<<<<<<<< ========= SUBFORM DATA PARSING ========== >>>>>>>>>>>>>>>>>>

async function getDependentChildren(crmResp) {
  const childersList = [];
  const numDependents = crmResp.Number_of_Dependents ?? 0;

  if (crmResp.Dependent_Children1 === "Yes") {
      if (numDependents >= 1) {
          childersList.push({
              relationship: crmResp?.Relationship_Child ?? "",
              name: crmResp?.Name_Child_1 ?? "",
              dob: crmResp?.Date_of_Birth_Child_1 ?? "",
              email: crmResp?.Email_Child_1 ?? "",
              phone: crmResp?.Phone_Child_1 ?? ""
          });
      }
      if (numDependents >= 2) {
          childersList.push({
              relationship: crmResp?.Relationship_Child_2 ?? "",
              name: crmResp?.Name_Child_2 ?? "",
              dob: crmResp?.Date_of_Birth_Child_2 ?? "",
              email: crmResp?.Email_Child_2 ?? "",
              phone: crmResp?.Phone_Child_2 ?? ""
          });
      }
      if (numDependents >= 3) {
          childersList.push({
              relationship: crmResp?.Relationship_Child_3 ?? "",
              name: crmResp?.Name_Child_3 ?? "",
              dob: crmResp?.Date_of_Birth_Child_3 ?? "",
              email: crmResp?.Email_Child_3 ?? "",
              phone: crmResp?.Phone_Child_3 ?? ""
          });
      }
      if (numDependents >= 4) {
        childersList.push({
            relationship: crmResp?.Relationship_Child_3 ?? "",
            name: crmResp?.Name_Child_4 ?? "",
            dob: crmResp?.Date_of_Birth_Child_4 ?? "",
            email: crmResp?.Email_Child_4 ?? "",
            phone: crmResp?.Phone_Child_4 ?? ""
        });
    }
    if (numDependents >= 5) {
      childersList.push({
          relationship: crmResp?.Relationship_Child_3 ?? "",
          name: crmResp?.Name_Child_5 ?? "",
          dob: crmResp?.Date_of_Birth_Child_5 ?? "",
          email: crmResp?.Email_Child_5 ?? "",
          phone: crmResp?.Phone_Child_5 ?? ""
      });
  }
  if (numDependents >= 6) {
    childersList.push({
        relationship: crmResp?.Relationship_Child_3 ?? "",
        name: crmResp?.Name_Child_6 ?? "",
        dob: crmResp?.Date_of_Birth_Child_6 ?? "",
        email: crmResp?.Email_Child_6 ?? "",
        phone: crmResp?.Phone_Child_6 ?? ""
    });
}
  }

  return childersList;
}
async function getDependentParents(crmResp) {
  const parentsList = [];
  const numDependentParents = crmResp.Number_of_Dependent_Parents ?? 0;

  if (crmResp.Dependent_Parents === "Yes") {
      if (numDependentParents >= 1) {
          parentsList.push({
              relationship: crmResp?.Relationship_Parent_1 ?? "",
              name: crmResp?.Name_of_Parent_1 ?? "",
              dob: crmResp?.Date_of_Birth_Parent_1 ?? "",
              email: crmResp?.Email_of_Parent_1 ?? "",
              phone: crmResp?.Phone_of_Parent_1 ?? ""
          });
      }
      if (numDependentParents >= 2) {
          parentsList.push({
              relationship: crmResp?.Relationship_Parent_2 ?? "",
              name: crmResp?.Name_Parent_2 ?? "",
              dob: crmResp?.Date_of_Birth_Parent_2 ?? "",
              email: crmResp?.Email_Parent_2 ?? "",
              phone: crmResp?.Phone_Parent_2 ?? ""
          });
      }
      if (numDependentParents >= 3) {
          parentsList.push({
              relationship: crmResp?.Relationship_Parent_3 ?? "",
              name: crmResp?.Name_Parent_3 ?? "",
              dob: crmResp?.Date_of_Birth_Parent_3 ?? "",
              email: crmResp?.Email_Parent_3 ?? "",
              phone: crmResp?.Phone_Parent_3 ?? ""
          });
      }
  }

  return parentsList;
}
async function getSiblings(crmResp) {
  const siblingList = [];
  const numSiblings = crmResp.Number_of_Siblings ?? 0;

  if (crmResp.Siblings1 === "Yes") {
      if (numSiblings >= 1) {
          siblingList.push({
              relationship: crmResp?.Relationship_Sibling_1 ?? "",
              name: crmResp?.Name_Sibling_1 ?? "",
              dob: crmResp?.Date_of_Birth_Sibling_1 ?? "",
              email: crmResp?.Email_Sibling_1 ?? "",
              phone: crmResp?.Phone_Sibling_1 ?? ""
          });
      }
      if (numSiblings >= 2) {
          siblingList.push({
              relationship: crmResp?.Relationship_Sibling_2 ?? "",
              name: crmResp?.Name_Sibling_2 ?? "",
              dob: crmResp?.Date_of_Birth_Sibling_2 ?? "",
              email: crmResp?.Email_Sibling_2 ?? "",
              phone: crmResp?.Phone_Sibling_2 ?? ""
          });
      }
      if (numSiblings >= 3) {
          siblingList.push({
              relationship: crmResp?.Relationship_Sibling_3 ?? "",
              name: crmResp?.Name_Sibling_3 ?? "",
              dob: crmResp?.Date_of_Birth_Sibling_3 ?? "",
              email: crmResp?.Email_Sibling_3 ?? "",
              phone: crmResp?.Phone_Sibling_3 ?? ""
          });
      }
  }

  return siblingList;
}
async function getEmergencyContact(crmResp) {
  if(crmResp.Emergency_Contact_Name === null && crmResp.Emergency_Contact_Phone === null && crmResp.Emergency_Contact_Relationship === null && crmResp.Emergency_Contact_Email === null){
    return [];
  }
  return [{
      emergencyContactName: crmResp?.Emergency_Contact_Name ?? "",
      emergencyContactPhone: crmResp?.Emergency_Contact_Phone ?? "",
      emergencyContactRelationship: crmResp?.Emergency_Contact_Relationship ?? "",
      emergencyContactEmail: crmResp?.Emergency_Contact_Email ?? ""
  }];
}
async function getFestivalStats(crmResp) {
  let felivalList = [];
  let fetivalArr = [
    "Canada_Day", "Eid_ul_Fit", "Victoria_Day", "Bakr_Eid", "Family_Day", "Holi",
    "Father_s_Day", "Dussehra", "Mother_s_Day", "Diwali", "Thanksgiving", 
    "Raksha Bandhan", "Christmas", "Guru_Nanak_Jayanti", "New Year", 
    "Guru_Gobind_Singh_Jayanti", "Lohri", "Guru_Granth_Sahib_Prakash_Divas", 
    "Vaisakhi", "Passover"
  ];

  fetivalArr.forEach(item => {
    if (crmResp[item] && crmResp[item] !== null) {
      let formattedDate = null;
      const dateValue = crmResp[item];

      // Check if dateValue is valid and then format it
      if (dateValue) {
        try {
          formattedDate = dateValue; // Ensure format is correct
        } catch (error) {
          console.error(`Invalid date for festival: ${item}`, error);
        }
      }

      felivalList.push({ festivalName: item.replace("_", " "), dateOfFestival: formattedDate });
    }
  });

  return felivalList;
}
async function getLeadManagementHistory(crmResp) {
  const historyList = [];

  crmResp.Lead_Management_History?.forEach(leadHtryObj => {
      const leadHtryMap = {
          interactionType: leadHtryObj?.Interaction_Type ?? "",
          dateOfInteraction: leadHtryObj?.Date_Time_of_Interaction ?? "",
          timeSpent: leadHtryObj?.Time_Spent_mins ?? 0,
          contactAttempt: leadHtryObj?.Contact_Attempt ?? 0,
          probabilityOfClosure: leadHtryObj?.Probability_of_Closure ?? 0,
          comments: leadHtryObj?.Comments ?? "",
          interactionOutcome: leadHtryObj?.Interaction_Outcome ?? ""
      };
      historyList.push(leadHtryMap);
  });

  return historyList;
}





