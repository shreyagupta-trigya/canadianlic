const axios = require("axios");
require("dotenv").config();
const grant_type = process.env.GRANT_TYPE;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const refresh_token = process.env.REFRESH_TOKEN;
const tokenUrl = process.env.ACCOUNT_URI;
const CRM_URI = process.env.CRM_URI;
const adminId  = process.env.ADMINID;
const conttactId  = process.env.CONTACTID;
const insPartnerId  = process.env.INSIRANCEPARTNERID;
const locationId = process.env.LOCATIONID;
const insuranceLeaderId = process.env.INSURANCELEADID

// ******************** CREATE NEW RECORD IN CRM *******************
exports.dataSyncZcrm = async (token, formData, crmId) => {
  try {
    const layout = await layoutName(formData?.layout);
    const dealinfo = await  dealParseData(formData);
    const policyTracking = await  policyTrackParseData(formData);
    // ********** SUBFORM DATA ****************
    const dealOwnershipData = await mapDealOwnership(formData?.dealOwnership ?? []);
    const dealTrusteeData = await mapDealTrustee(formData?.trustee ?? []);
    const dealDealBeneficiaries = await mapDealBeneficiaries(formData?.beneficiaries ?? []);
    // ********** END SUBFORM DATA ****************    
    const data = {
      data: [
        {
          // **************** Deal Info *****************
          Owner:formData?.sourceId??adminId,
          Layout: {
            id: layout
          },
          Catalyst_Id: crmId,
          ...dealinfo,
          // **************** SUBFORM CRM FIELDS *******************
          numberOfInsured: formData?.dealOwnership[0]?.numberOfInsured??null,
          ...dealOwnershipData,
          ...policyTracking,
          ...dealTrusteeData,       
          ...dealDealBeneficiaries          
        }
      ]
    };
    // console.log("formdata CRM====>", JSON.stringify(data));
    const baseUrl = `https://www.zohoapis.com/crm/v7/Deals${(crmId !== null && crmId !== undefined) ? `/${crmId}` : ''}`;
    const baseMethod = crmId===null || crmId===undefined?'post':'PUT';   
    const config = {
      url: baseUrl,
      method: baseMethod,
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };
    const response = await axios.request(config);
    return response?.data?.data[0]?.details?.id;
  } catch (error) {
    console.error("Error creating Insurance Partner:", error);
    return error;
  }
};


exports.generateToken = async () => {
  const baseUrl = `${tokenUrl}?refresh_token=${refresh_token}&client_id=${client_id}&client_secret=${client_secret}&grant_type=${grant_type}`;
  const dataConfig = {
    url: baseUrl,
    method: "post",
  };
  const token = await axios
    .request(dataConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
  return token.access_token;
};
// ************ DEAL INFORMATION DATA PARSER ***********
async function dealParseData(formData){
  return {
    Deal_Name: formData?.dealName??"",
    Lead_Source: formData?.insuranceLeadSource ?? "",
    Country: formData?.currency??"",
   // Insurance_Lead_Lookup:insPartnerId,
    Type: formData?.type??"",
    Lead_Status_Stage: formData?.stage??null,
    Stage: formData?.stage??null,
    Contact_Name: conttactId,
    // Forecast_Category__s: formData?.forecastCategory??"",
    Account_Name: locationId,
    Insurance_Lead:insuranceLeaderId,
    LeadCreatedOn: "2024-10-29",
    Exchange_Rate: formData?.exchangeRate??"",
    phoneburner0__PhoneBurner_Follow_Up_Date: formData?.phoneBurnerFollowUpDate??null,
    phoneburner0__PhoneBurner_Last_Call_Outcome: formData?.phoneBurnerLastCallOutcome??"",
    advancedroundrobin__Re_run_round_robin: formData?.reRunRoundRobin??false,
    advancedroundrobin__Email_Round_Robin_Owner: formData?.emailRoundRobinOwner??false,
    advancedroundrobin__Round_Robin_Processed: formData?.roundRobinProcessed??false,
    advancedroundrobin__Eligible_Round_Robin_Owner_Found: formData?.eligibleRoundRobinOwnerFound??false,
    // **************** OWNERSHIP **************** 
    Is_Client_the_Insured: formData?.isClientTheInsured??false,
    Are_there_multiple_Insured_for_this_Policy: formData?.areThereMultipleInsuredForThisPolicy??false, 
    
     // How_Many_Months_left: formData?.howManyMonthsLeft??null,
     Total_Policy_Commission: formData?.totalPolicyCommission??null,
     Total_Advisor_Commission: formData?.advisorCommision??null,
     Net_Corporate_Commission: formData?.netCommision??null,
     Actual_policy_Commission_after_Deductibles: formData?.actualPolicyCommision??null,
     Return_Amount: formData?.returnAmount??null,
     Net_Advisor_Commission_After_Deductible: formData?.returnAmount??null,
     Description: formData?.netAdvisorCommision?.description??null,
    // ***************** Claims fileds *****************
    Any_Current_Claims_on_this_Policy: formData?.currentClaims??null, //PICKLIST CRM
    Any_Past_Claims_on_this_Policy: formData?.pastClaims??null, //PICKLIST CRM
    Reason_of_Claim: formData?.reasonOfClaim??"",
    Claim_Outcome: formData?.claimOutcome??null, //PICKLIST CRM
    Claim_Submitted: formData?.claimSubmitted??null, //PICKLIST CRM
    Claim_Amount: formData?.claimAmount??null,
    Date_of_Claim: formData?.dateOfClaim??null,
    Claim_Closed_On: formData?.claimClosedOn??null,
    Amount_Settled: formData?.amountSettled??null, 
    Settlement_or_Rejection_Observations: formData?.settlementOrRejectionObservations??"",
    // // ************* TRUSTEE FORM DATA **************
    Are_there_Trustees_for_this_Policy: formData?.areThereTrusteesforThisPolicy??null,
    Trust_Documents_Received_and_Uploaded: formData?.trustDocumentsReceivedAndUploaded??null,
    Trust_Dissolution_Date: formData?.trustDissolutionDate??null,
    Application_Initiated_On: formData?.Application_Initiated_On??null,
    Number_of_Trustees: formData?.numberOfTrustees??null,   
    // ************** Deal Beneficiaries ***************
    Is_Client_a_Beneficiary: formData?.isClientABeneficiary??null,
    Are_there_Multiple_Beneficiaries_excl_Client: formData?.areThereMultipleBeneficiariesExclClient??null,
    

  }
}
// Async function to format date and time to "YYYY-MM-DDTHH:mm"
async function dateTimeFormat(date) {
  if (!date) {   
    return null;
  }
  const dateFormat = new Date(date);
  if (isNaN(dateFormat.getTime())) {   
    return null;
  }
  const datePart = dateFormat.toISOString().split('T')[0];
  const timePart = dateFormat.toTimeString().split(' ')[0];

  return `${datePart}T${timePart}`;
}

// ************* POLICY TRACKING **************
async function policyTrackParseData(formData){
  return{
      Application_Initiated_On:formData?.policyTrackData?.initiatedDate??null,
      Next_Follow_Up_Date: formData?.policyTrackData?.nextFollowUpDate??null,
      Amendment_Requested_Date: formData?.policyTrackData?.amendmentRequestedDate??null,
      Amendment_Requested_for: formData?.policyTrackData?.amendmentRequestedFor??"",
      Application_Medical_requirement: formData?.policyTrackData?.applicationMedicalRequirement??null,
      Application_Medical_Confirmation_Number: formData?.policyTrackData?.applicationConfirmationNumber??null,
      Amendment_Completed_Date: formData?.policyTrackData?.amendmentCompletedDate??null,
      // Application_Medical_Appointment_Date_Time: formData?.policyTrackData?.applicationMedicalAppointmentDateTime??null,
      Application_Cancelled: formData?.policyTrackData?.applicationCancelled??null,
      Application_Postponed_To: formData?.policyTrackData?.applicationPostponed??null,
      Policy_Declined_Date: formData?.policyTrackData?.policyDeclinedDate??null,
      Policy_Approved_Date: formData?.policyTrackData?.policyApprovedDate??null,
      Reasons_for_Policy_being_Declined: formData?.policyTrackData?.policyDeclinedReason??null,
      Approval_Rating: formData?.policyTrackData?.approvalRating??"",
      Premiums_Paid_during_Pick_Up_Period: formData?.policyTrackData?.pickupPeriod??null,
      Policy_Start_Date: formData?.policyTrackData?.startDate??null,
      Policy_Picked_Up_On: formData?.policyTrackData?.policyPickedUp??null,
      Policy_Issued_Date: formData?.policyTrackData?.issuedDate??null,
      Renewal_Medical_requirement: formData?.policyTrackData?.medicalRequirement??null, // CRM PICK LIST
      Policy_Review_Comments: formData?.policyTrackData?.reviewComments??"", // CRM PICK LIST
      Policy_Review_Comments_updated_on: formData?.policyTrackData?.commentsUpdatedOn??null,
      Policy_Renewal_Date: formData?.policyTrackData?.policyRenewalDate??null,
      Renewal_Medical_Confirmation_Number: formData?.policyTrackData?.confirmationNumber??null,
      Renewal_Medical_Application_Date_Time: await dateTimeFormat(formData?.policyTrackData?.renewalMedicalApplicationDateTime)??null, //DATE TIME IN CRM
      Reviewed_Date_Time: await dateTimeFormat (formData?.policyTrackData?.reviewedDate)??null, //DATE TIME IN CRM
      Policy_Expired_On: formData?.policyTrackData?.policyExpiredDate??null, //DATE TIME IN CRM
      Policy_Renewal_Completed: formData?.policyTrackData?.renewalCompleted??null, //PICKLIST CRM          
      
  }
}
// *************LAYOUT FUNCTION **************
async function layoutName(layoutData) {
  let layout = '';
  switch (layoutData) {
    case 'Standard Layout':
      layout = '4299079000000091023';
      break;
    case 'RRSP':
      layout = '4299079000125250001';
      break;
    case 'Supervisa Insurance':
      layout = '4299079000118396498';
      break;
    case 'Critical Insurance':
      layout = '4299079000125250851';
      break;
    default:
      layout = '';
  } 
  return layout;
}
// ************* Deal subformdata ************
async function mapDealOwnership(dealOwnership) {
  const mappedData = {};
  dealOwnership.forEach((insured, index) => {
    const insuredIndex = index + 1;
    mappedData[`Insured_${insuredIndex}_Name`] = insured.insuredName || "";
    mappedData[`Insured_${insuredIndex}_Email`] = insured.insuredEmail || "";
    mappedData[`Insured_${insuredIndex}_Phone`] = insured.insuredPhone || "";
    mappedData[`Insured_${insuredIndex}_NumberOfInsured`] = insured.numberOfInsured || "";
  });

  return mappedData;
}
// ************* Deal trustee ************
async function mapDealTrustee(trustee) {
  const mappedTrustee = {};
  trustee.forEach((trustee, index) => {
    const insuredIndex = index + 1;
    mappedTrustee[`Name_of_Trustee_${insuredIndex}`] = trustee.nameOfTrustees || "";
    mappedTrustee[`Name_of_Beneficiary_for_Trustee_${insuredIndex}`] = trustee.nameOfBeneficiaryForTrustee || "";
    mappedTrustee[`Relationship_with_Beneficiary_for_Trustee_${insuredIndex}`] = trustee.relationshipWithBeneficiaryForTrustee || "";
  });

  return mappedTrustee;
}
// ************* Deal beneficiaries ************
async function mapDealBeneficiaries(beneficiaries) {
  const mappedTrustee = {};
  beneficiaries.forEach((beneficiaries, index) => {
    const insuredIndex = index + 1;
    mappedTrustee[`Beneficiary_${insuredIndex}_Name`] = beneficiaries.beneficiaryName || "";
    mappedTrustee[`Beneficiary_${insuredIndex}_Relationship_with_Insured`] = beneficiaries.beneficiaryRelationshipWithInsured || "";
    mappedTrustee[`Beneficiary_${insuredIndex}_Phone`] = beneficiaries.beneficiaryPhone || "";
    mappedTrustee[`Beneficiary_${insuredIndex}_Email`] = beneficiaries.beneficiaryEmail || "";
  });
  return mappedTrustee;
}
