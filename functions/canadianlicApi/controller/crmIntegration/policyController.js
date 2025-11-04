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
  console.log("TOKEN", token);
  try {
    const layout = await layoutName(formData?.layout);
    const policyBasicInfo = await  policyBasicInfoParseData(formData);
    const policyServices = await  policyServicesParseData(formData);
    const policyDetails = await  policyDetailsParseData(formData);
    const policyClaims = await  policyClaimsParseData(formData);
    const policyCommission = await  policyCommissionParseData(formData);
    // // ********** SUBFORM DATA ****************
    const mapOwnerShip = await mapOwnerShipData(formData?.services ?? []);
    const policyBeneficiary = await policyBeneficiaryData(formData?.services ?? []);
    const policyCB = await policyCBData(formData?.services ?? []);
    const policyTrustee = await policyTrusteeData(formData?.services ?? []);
    const policyPastClaims = await policyPastClaimsData(formData?.services ?? []);
    // // ********** END SUBFORM DATA ****************    
    const data = {
      data: [
        {
          // **************** Deal Info *****************
          Owner:formData?.sourceId??adminId,
          Layout: {
            id: layout
          },
          Catalyst_Id: formData?.ROWID,
          ...policyBasicInfo,
          ...policyServices,
          ...policyDetails,
          ...policyClaims,
          ...policyCommission,
          // **************** SUBFORM CRM FIELDS *******************
          ...mapOwnerShip,
          ...policyBeneficiary,
          ...policyCB,       
          ...policyTrustee,          
          ...policyPastClaims,          
        }
      ]
    };
    console.log("Formdata CRM====>", JSON.stringify(data));
    const baseUrl = `https://www.zohoapis.com/crm/v7/Policies${(crmId !== null && crmId !== undefined) ? `/${crmId}` : ''}`;
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
async function policyBasicInfoParseData(formData){
  return {
    Name: formData?.basicInfo?.policyName??"",
    // Policy_Number: formData?.basicInfo?.policyNumber??"",
    Campaign_Source: formData?.basicInfo?.clientCampaignSource??"",
    Policy_Amount: formData?.basicInfo?.coverageAmount??"",
    Email: formData?.basicInfo?.email??"",
    Policy_Premium: formData?.basicInfo?.policyPremiumI??"",
    // Client_Mobile: formData?.basicInfo?.clientMobile??null,
    Product_FYC: formData?.basicInfo?.productFycPercent??null,
    Insurance_Company_Account: toString(formData?.basicInfo?.insuranceCompanyAccount??null),
    Policy_Bonus: formData?.basicInfo?.corporateBonusPercent??null,
    Offering_Id: formData?.basicInfo?.offeringId??null,
    Advisor_Bonus_of_FYC: formData?.basicInfo?.advisorBonusOfFyc??null,
    Whatsapp: formData?.basicInfo?.whatsapp??null,
    Location_Discount_Factor: formData?.basicInfo?.locationDiscountFactor??null,
    Exchange_Rate: formData?.basicInfo?.exchangeRate??null,
    Update_Offering_id: formData?.basicInfo?.updateOfferingId??false,
    Update_Policy_Status: formData?.basicInfo?.updatePolicyStatus??false,
    Trigger_Supervisa_Full_Refund_Calculation: formData?.basicInfo?.triggerSupervisa??false,
    Client_Address: formData?.basicInfo?.clientAddress??"",
    Comments_on_Rating: formData?.basicInfo?.commentsOnRating??"",
    Premium_Frequency: formData?.basicInfo?.premiumFrequency??"",
    // Issued_By // lookup field
    // Policy_Offered: // lookup field 
    // Location: // lookup field
    // Policy_Advisor: // lookup field
    Policy_Status: formData?.basicInfo?.policyStatus??"",
    Advisor_Commission_Received: formData?.basicInfo?.advisorCommisionRecieved??"",
    Policy_Type: formData?.basicInfo?.policyType??"",
    Advisor_Prohibited_Behaviour_Compliance: [formData?.basicInfo?.advisorProbhitedBehaviourCompliance??""],
    Client_s_First_Policy1: formData?.basicInfo?.clientFirstPolicy??"",
    Compliance_with_Advisor_Code_of_Conduct: [formData?.basicInfo?.advisorCodeOfConductComplaince??""],
    // Currency: formData?.basicInfo?.currency??"USD",
    Send_To_Bot_Result: formData?.basicInfo?.sendToBotResult??"",
    Send_To_Policy_Start_Date_Email_Track: formData?.basicInfo?.sendToPolicyStartDateEmailTrack??"",
    phone_updated: formData?.basicInfo?.phoneUpdated??false,
    // Advisor_Bonus_Level: formData?.basicInfo?.advisorBonusLevel??false, 
   // Client: formData?.basicInfo?.Client??false,//lookup field  

  }
}
async function policyServicesParseData(formData){
  return {
    Number_of_Beneficiaries_5_and_above: formData?.services?.numberofBeneficiaries??null,
    Application_Initiated_On: formData?.services?.applicationOn??null,
    Is_Client_Policy_Owner: formData?.services?.isClientTheInsured??"No",
    Are_there_multiple_Beneficiaries_to_this_Policy: formData?.services?.areThereMultipleBeneficiary??"",
    Is_Client_Policy_Insured: formData?.services?.isClientABeneficiary??"",
    Are_there_Trustees_for_this_Policy: formData?.services?.areThereTrusteeForThisPolicy??"",
    Trust_Dissolution_Date: formData?.services?.trustDissolutionDate??"",
    Number_of_Trustees: formData?.services?.numberOfTrustee??null,
    Trust_Documents_Received_and_Uploaded: formData?.services?.trustDocumentRecievedAndUploaded??"",
    Number_of_Owners: formData?.services?.numberOfInsured??null,   
  }
}

async function policyDetailsParseData(formData){
  return {
    Application_Submitted_On: formData?.policyDetails?.applicationSubmittedOn??null,
    Application_Follow_Up_Date: formData?.policyDetails?.nextFollowUpDate??null,
    New_Policy_Start_Date: formData?.policyDetails?.newPolicyStartDate??null,
    Application_Date: formData?.policyDetails?.applicationInitiatedOn??null,
    Policy_Approved_Date: formData?.policyDetails?.policyApprovedDate??null,
    Cancellation_Amendment_Requested_for: formData?.policyDetails?.cancellation??"",
   // Policy_Attachment_Link: formData?.policyDetails?.policyAttachmentLink??"",//url in crm 
    Re_Name_of_Confirmation: formData?.policyDetails?.nameOfConfirmationRenewal??"",
    Policy_Start_Date: formData?.policyDetails?.policyStartDate??"",
    Policy_Issued_Date: formData?.policyDetails?.policyIssuedDate??null,
    Policy_Expiry_On: formData?.policyDetails?.policyExpiresOn??null,
    Name_of_Confirmation: formData?.policyDetails?.nameOfConfirmation??"",
    Policy_Picked_Up_On: formData?.policyDetails?.policyPickedUpOn??"",
    Application_Postponed_To: formData?.policyDetails?.applicationPostponedTo??null,
    Policy_Declined_Date: formData?.policyDetails?.policyDeclineDate??null,
    Amendment_Requested_Date: formData?.policyDetails?.earlyReturnAmendmentRequested??null,
    Amendment_Completed_Date: formData?.policyDetails?.earlyReturnAmendmentCompletedDate??null,
    Application_Cancelled: formData?.policyDetails?.earlyReturnApplicationCancelled??null,
    Policy_Renewal_Date: formData?.policyDetails?.policyRenewalDate??null,
    Policy_Review_Comments_updated_on: formData?.policyDetails?.policyReviewCommentUpdatedOn??null,
    Comments_on_Rejection: formData?.policyDetails?.reasonForPolicyBeingDeclined??"",
    Amendment_Requested_for: formData?.policyDetails?.earlyReturnAmendmentRequestedFor??"",
    Policy_Review_Comments: formData?.policyDetails?.policyReviewComments??"",
    Confirmation_Poilcy_Renewal_Expired: formData?.policyDetails?.renwalExpired??"",
    Premiums_Paid: formData?.policyDetails?.premiumPaidDuringPickUpPeriod??"",
    Is_Medical_required: formData?.policyDetails?.applicationMedicalRequirement??"",
    Confirmation_Policy_Start: formData?.policyDetails?.confirmationPolicyStart??"",
    Renewal_Medical_requested: formData?.policyDetails?.renewalMedicalRequirement??"",
    Is_Policy_Renewed: formData?.policyDetails?.policyRenewalCompleted??"",
  }
}
async function policyClaimsParseData(formData){
    return {
        Any_Claims_on_this_Policy: formData?.services?.areCurrentClaimonThisPolicy??"",
        Any_Past_Claims_on_this_Policy: formData?.services?.arePastClaimonThisPolicy??"",
        Outcome: formData?.services?.claimOutcome??"",
        Total_Amount_Claimed: formData?.services?.totalAmountClaimed??"",
        Total_Amount_Settled: formData?.services?.totalAmountSettled??"",
        Total_Amount_Rejected: formData?.services?.totalAmountRejected??"",
        Ringcentral_sms_response: formData?.services?.ringcentralSmsResponse??"",     
    }
}
async function policyCommissionParseData(formData){
    return {
        Day_wise_Corporate_Commission: toString(formData?.commission?.dayWiseCorporateCommision??""),  
        Day_wise_Location_Commission: toString(formData?.commission?.dayWiseLocationCommision??""),  
        Day_wise_Advisor_Commission: toString(formData?.commission?.dayWiseAdvisorCommision??""),  
        Policy_Month: formData?.commission?.policyMonth??"",  
        Total_Gross_Location_Com: formData?.commission?.totalGrossLocationCommision??"",  
        Total_Net_Location_Commission: formData?.commission?.totalNetLocationpolicyCommission??"",  
        Total_Gross_Corporate_Com: formData?.commission?.totalGrossCorpoarateCom??"",  
        Total_Net_Corporate_Com: formData?.commission?.totalNetCorporateCommision??"",  
        Total_Net_Advisor_Commission: formData?.commission?.totalNetAdvisorpolicyCommission??"",  
        Total_Net_Corporate_Com: formData?.commission?.totalNetCorporateCom??"",  
        Total_Gross_Location_Com: formData?.commission?.totalGrossLocationCom??"",  
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

// *************LAYOUT FUNCTION **************
async function layoutName(layoutData) {
  let layout = '';
  switch (layoutData) {
    case 'New Policy':
      layout = '4299079000000475186';
      break;
    case 'Investment':
      layout = '4299079000030808003';
      break;
    default:
      layout = '';
  } 
  return layout;
}

// *****************SUB FORM DATA ******************
async function mapOwnerShipData(services) {
  const mappedData = {};
  if (Array.isArray(services?.OwnerShip)) {
    services.OwnerShip.forEach((owner, index) => {
      const ownerIndex = index + 1;
      mappedData[ownerIndex > 1 ? `Owner_${ownerIndex}` : `Policy_Owned_By${ownerIndex}`] = owner.name || "";
      mappedData[`Owner_${ownerIndex}_Email`] = owner.email || "";
      mappedData[ownerIndex > 1 ? `Insured_${ownerIndex}_Date_Of_Birth` : `Date_of_Birth_of_Insured`] = owner.dob || "";
    //   mappedData[`Owner_${ownerIndex}_Phone`] = owner.phone || "";
      mappedData[`Relation_of_${ownerIndex}_Insured_to_Client`] = owner.age || "";
    });
  }
  return mappedData;
}
async function policyBeneficiaryData(services) {
  const contBene = {};
  if (Array.isArray(services?.Beneficiary)) {
    services.Beneficiary.forEach((benefi, index) => {
      const childIndex = index + 1;
      contBene[`Life_Beneficiary_${childIndex}_Name`] = benefi.name || "";
      contBene[`Beneficiary_${childIndex}_Relationship_with_Insured`] = benefi.relationship || "";
      contBene[`Life_Beneficiary_${childIndex}_Name`] = benefi.lifeBeneficiaryName || "";
      contBene[`Beneficiary_${childIndex}_Email`] = benefi.email || "";
      contBene[`Beneficiary_${childIndex}_Phone`] = benefi.phone || "";
      contBene[`Beneficiary_${childIndex}_Date_of_Birth`] = benefi.dob || "";
    });
  }
  return contBene;
}
async function policyCBData(services) {
  const contBene = {};
  if (Array.isArray(services?.ContingentBeneficiary)) {
    services.ContingentBeneficiary.forEach((contBenefi, index) => {
      const childIndex = index + 1;
      contBene[`CB${childIndex}_Name`] = contBenefi.name || "";
      contBene[`CB${childIndex}_Phone`] = contBenefi.phone || "";
      contBene[`CB${childIndex}_Relationship`] = contBenefi.relationship || "";
    //   contBene[`CB${childIndex}_Email`] = contBenefi.email || "";
      contBene[`CB${childIndex}_Date_of_birth`] = contBenefi.dob || "";
      contBene[`Cont_Beneficiary_Per_${childIndex}`] = toString(contBenefi.beneficiaryPercent || "");
    });
  }
  return contBene;
}
async function policyTrusteeData(services) {
  const truste = {};
  if (Array.isArray(services?.Trustee)) {
    services.Trustee.forEach((trust, index) => {
      const childIndex = index + 1;
      truste[`Name_of_Trustee_${childIndex}`] = trust.name || "";
      truste[`Relationship_with_Beneficiary_for_Trustee_${childIndex}`] = trust.relationship || "";
    //   truste[`Trustee_${childIndex}_Email`] = trust.email || "";
    //   truste[`Trustee_${childIndex}_Phone`] = trust.phone || "";
    });
  }
  return truste;
}
async function policyPastClaimsData(claims) {
  const pClame = {};
  if (Array.isArray(claims?.pastClaims)) {
    claims.pastClaims.forEach((clame, index) => {
      const childIndex = index + 1;
      pClame[`Date_of_Claim`] = clame.dateOfClaim || "";
      pClame[`Reason_of_Claim`] = clame.reasonforClaim || "";
      pClame[`Claim_Amount`] = clame.amountofClaim || "";
      pClame[`Claim_Closed_On`] = clame.claimClosedOn || "";
      pClame[`Outcome`] = clame.phone || "";
      pClame[`Amount_Settled`] = clame.phone || "";
      pClame[`Settlement_Observations_if_any`] = clame.settlement || "";
    });
  }
  return pClame;
}
// ****************EMERGENCY CONTACT ****************
async function mapEmergencyContactData(FamilyTree) {
  const emergencyData = {};
  if (Array.isArray(FamilyTree?.emergencyContactData)) {
    FamilyTree.emergencyContactData.forEach((emergency, index) => {
      const childIndex = index + 1;
      emergencyData[`Name1`] = emergency.emergencyContactName || "";
      emergencyData[`Phone_of_Emergency_Contact`] = emergency.emergencyContactPhone || "";
      emergencyData[`Relationship`] = emergency.emergencyContactRelationship || "";
    });
  }
  return emergencyData;
}


