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
//   console.log("<<FormData>>", formData);
  try {
    const contactInf = await contactClientInfoParseData(formData);
    const contactAdvisorDetails = await contactServiceParseData(formData);
    const contactAdvisorAddress = await contactpotentialParseData(formData);
    const contactClientleadinfo = await  contactleadInfoParseData(formData);
    const facebookParse = await  facebookParseData(formData);
    const addressParse = await  addressParseData(formData);
    // // ********** SUBFORM DATA ****************
    const dependentChildrenData = await mapDependentChildrenData(formData?.familyTree ?? []);
    const siblingDataData = await mapSiblingData(formData?.familyTree ?? []);
    const emergencyContactData = await mapEmergencyContactData(formData?.familyTree ?? []);
    const dependentParentsData = await mapdependentParentsData(formData?.familyTree ?? []);
    const mapLeadManagementInfo = await mapLeadManagementInfoData(formData?.leadMgt ?? []);
    // // ********** END SUBFORM DATA ****************    
    const data = {
      data: [
        {
          // **************** Deal Info *****************
          Owner:formData?.sourceId??adminId,
          Layout: {
            id: "4299079000000091033"
          },
          Catalyst_ID: formData?.ROWID,
          ...contactInf,
          ...contactAdvisorDetails,
          ...contactAdvisorAddress,
          ...contactClientleadinfo,
          ...facebookParse,
          ...addressParse,
          // **************** SUBFORM CRM FIELDS *******************
          ...dependentChildrenData,
          ...siblingDataData,
          ...emergencyContactData,       
          ...dependentParentsData,          
          ...mapLeadManagementInfo,          
        }
      ]
    };
    // console.log("Formdata CRM====>", JSON.stringify(data));
    const baseUrl = `https://www.zohoapis.com/crm/v7/Contacts${(crmId !== null && crmId !== undefined) ? `/${crmId}` : ''}`;
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
async function contactClientInfoParseData(formData) {
    return {
        First_Name: formData?.contactInfo?.firstName ?? "",
        Last_Name: formData?.contactInfo?.lastName ?? "",
        // Mobile: formData?.contactInfo?.mobile ?? "",
        WhatsApp: formData?.contactInfo?.whatsApp ?? "",
        Email: formData?.contactInfo?.email ?? "",
        Client_Policy_Issue_On: formData?.contactInfo?.clientPolicyIssueOn ?? "",
        Date_of_Birth: formData?.contactInfo?.dateOfBirth ?? "",
        Round_Robin_Assignment_Time: formData?.contactInfo?.roundRobinAssignmentTime ?? "",
        // Lead_Created_Time: formData?.contactInfo?.leadCreatedTime ?? "",
        CLV_Corporate_Commission: formData?.contactInfo?.clvCorporateCommision ?? "",
        Last_CLV_Corporate: formData?.contactInfo?.lastClvCorporate ?? "",
        CLV_Advisor_Commission: formData?.contactInfo?.clvAdvisorCommision ?? "",
        Last_CLV_Advisor: formData?.contactInfo?.lastClvAdvisor ?? "",
        Phone_Burner_Follow_Up_Date: formData?.contactInfo?.phoneBurnerFollowUpDate ?? "",
        Phone_Burner_Last_Call_Time: formData?.contactInfo?.phoneBurnerLastCallTime ?? "",
        Description: formData?.contactInfo?.description ?? "",
        Number_of_Products_Remaining: formData?.contactInfo?.numberofProductsRemaining ?? "",
        Remove_From_Campaign: formData?.contactInfo?.removeFromCampaign ?? false,
        Eligible_Round_Robin_Owner_Found_1: formData?.contactInfo?.eligibleRoundRobinOwnerFound1 ?? false,
        Email_Round_Robin_Owner_2: formData?.contactInfo?.emailRoundRobinOwner2 ?? false,
        Eligible_Round_Robin_Owner_Found: formData?.contactInfo?.eligibleRoundRobinOwnerFound ?? false,
        Email_Opt_Out: formData?.contactInfo?.emailOptOut ?? false,
        Round_Robin_Processed: formData?.contactInfo?.roundRobinProcessed ?? false,
        Re_Round_Robin_Processed: formData?.contactInfo?.reRoundRobinProcessed ?? false,
        RC_SMS_Opt_Out: formData?.contactInfo?.rcSMSOptOut ?? false,
        Client_Address: formData?.contactInfo?.clientAddress ?? "",
        Contact_Owner: formData?.contactInfo?.contactOwner ?? "",
        Deal_Stage_Tracking: formData?.contactInfo?.dealStageTracking ?? "",
        // Assigned_Advisor: formData?.contactInfo?.assignedAdvisor ?? "",
        Insurance_Lead_Source: formData?.contactInfo?.insuranceLeadSource ?? "",
        Status: formData?.contactInfo?.status ?? "",
        Lead_Id: formData?.contactInfo?.leadId ?? "",
        Old_Database_Lead: formData?.contactInfo?.oldDatabaseLead ?? "",
        // Location: formData?.contactInfo?.location ?? "",
        Number_of_Products_max_9:"1",
        Auto_Insurance: [formData?.contactInfo?.autoInsurance ?? ""],
        Parent_Client: formData?.contactInfo?.parentClient ?? "",
        Preferred_Contact_Method: formData?.contactInfo?.preferredContactMethod ?? "",
        Preferred_Contact_Time: formData?.contactInfo?.preferredContactTime ?? "",
        Gender: formData?.contactInfo?.gender ?? "",
        Do_You_Have_Corporations: formData?.contactInfo?.doYouHaveCorporations ?? "",
        Immigration_Services: [formData?.contactInfo?.immigrationServices ?? ""],
        Social_Media_Information: formData?.contactInfo?.socialMediaInformation ?? "",
        Understanding_Of_Insurance: formData?.contactInfo?.understandingOfInsurance ?? "",
        Net_Worth: formData?.contactInfo?.netWorth ?? "",
        Email_Is_Valid: formData?.contactInfo?.emailIsValid ?? "",
        // Additional_Contact_Information: formData?.contactInfo?.additionalContactInformation ??false,
      };
}
  
async function contactServiceParseData(formData){
    return {
        Health_Dental_Insurance: formData?.service?.serviceAvailedhealthAndDentalInsurance ?? null,
        Combination_Hybrid_Insurance: formData?.service?.combinationOrHybridInsurance ?? null,
        Date_New_Service_Requested: formData?.service?.dateNewServiceRequested ?? null,
        Next_Follow_Up_Date_And_Time: formData?.service?.nextFollowUpDateAndTime ?? null,
        Max_Number_Of_Potential_Product_Applicable: formData?.service?.maxNumberOfPotentialProductApplicable ?? null,
        // Potential_Business_Policy_Values: formData?.service?.potentialBusinessPolicyValues ?? null,
        Potential_Business_Travel_Insurance: formData?.service?.potentialBusinessTravelInsurance ?? null,
        Resp: formData?.service?.resp ?? null,
        RRSP_TFSA: formData?.service?.rrspTfsa ?? null,
        Potential_Business_Health_And_Dental_Insurance: formData?.service?.potentialBusinessHealthAndDentalInsurance ?? null,
        Other_Investments: formData?.service?.otherInvestments ?? null,
        Potential_Business_Loan_Protection: formData?.service?.potentialBusinessLoanProtection ?? null,
        Other_Living_Benefits: formData?.service?.otherLivingBenefits ?? null,
        Potential_Business_Critical_Illness: formData?.service?.potentialBusinessCriticalIllness ?? null,
        Potential_Business_Life_Insurance: formData?.service?.potentialBusinessLifeInsurance ?? null,
        Potential_Dependent: formData?.service?.potentialDependent ?? null,
        Service_Availed_Options: formData?.service?.serviceAvailedOptions ?? null,
        Life_Insurance: [formData?.service?.lifeInsurance ?? ""],
        Life_Benefits: formData?.service?.lifeBenefits ?? null,
        Service_Availed_Loan_Protection: formData?.service?.serviceAvailedLoanProtection ?? null,
        Service_Availed_Travel_Insurance: formData?.service?.serviceAvailedTravelInsurance ?? null,
        Investment: formData?.service?.investment ?? null,
        Group_Insurance: formData?.service?.groupInsurance ?? null,
        Service_Availed_Updated: formData?.service?.serviceAvailedUpdated ?? null,
        Process_Stage: formData?.service?.processStage ?? null,
        Other_Service_Requested: [formData?.service?.otherServiceRequested ?? ""]
    };
}
async function contactpotentialParseData(formData){
    return {
        // Number_of_Products_Remaining_Dependents: formData?.potential?.numberOfProductRemaining ??null,
        // Number_Remaining_max_9: formData?.potential?.numberOfProductRemainingIndividuals ??null,
        Potential_Dependents_Completed: formData?.potential?.potentialDependentCompleted ??null,
    };
}
async function contactleadInfoParseData(formData){
  return {
    Best_Time_To_Call: formData?.leadInfo?.bestTimeToCall??"",
    Date_of_Birth1: formData?.leadinfo?.dateOfBirth1??null,
    If_referred_by_Advisor_or_External_Referral_Name: formData?.leadInfo?.ifReferredByAdvisorOrExternal??"",
    Existing_Policy_Renewal_Due_By: formData?.leadInfo?.existingRenewalPolicyDueBy??"",
    Coverage_you_are_Looking_for: formData?.leadInfo?.coverageYouAreLookingFor??"",    
    Submit_Page_URL: formData?.leadInfo?.submitPageUrl??"",
    Assigned_Campaigns: formData?.leadInfo?.assignedCampaigns??"",
    // Potential_Business_Policy_Values: formData?.leadInfo?.potentialBusiness??"",
    Positive_Score: formData?.leadInfo?.insuranceLeadScoringPositiveScore??"",
    // Insurance_Leads_Scoring_Touch_Point_Score: formData?.leadInfo?.insuranceLeadsScoringTouchPointScore??"", // INteger in crm 
    // Insurence_Leads_Scoring_Negative_Score: formData?.leadInfo?.insuranceLeadScoringNegativeScore??"", // integer in crm
    // Insurance_Leads_Scoring_Score: formData?.leadInfo?.insuranceLeadScoringScore??"", // integer in crm
    // advancedroundrobin__Round_Robin_Assignment_Time	: new dateTimeFormat(formData?.leadInfo?.roundRobinAssignmentTime)??null,
    // Gender_Predication: formData?.leadInfo?.GenderPredication??null,// integer in crm
    Lead_Created_On: new Date(),
    Combination_or_Hybrid_Insurance: formData?.leadInfo?.combinationHybird??false,
    Round_Robin_Processed1: formData?.leadInfo?.roundRobinProcessed1??false,
    Email_Round_Robin_Owner2: formData?.leadInfo?.emailRoundRobinOwner2??false,
    Eligible_Round_Robin_Owner_Found1: formData?.leadInfo?.eligibleRoundRobinOwnerFound1??false,
    Health_Dental_Insurance: formData?.leadInfo?.healthAndDentalInsurance??false,
    multiuserringcentralmessagingextension__RC_SMS_Opt_Out	: formData?.leadInfo?.rCSMSOptOut??false,   
    Skype_ID		: formData?.leadInfo?.skypeID??"",
    Instagram		: formData?.leadInfo?.instagramID??"",
    Linked_In1		: formData?.leadInfo?.linkedin1??"",
    FaceBook1		: formData?.leadInfo?.fb1??"",
    Twitter1		: toString(formData?.leadInfo?.twitter1)??"",
    FaceBook		: formData?.leadInfo?.facebook??"",
    // Twitter		: formData?.leadInfo?.twitter??"",
    Linked_In		: formData?.leadInfo?.linkedin??"",
    // Google_Review		: formData?.leadInfo?.googleReview??"",
    // Google_Review_Video		: formData?.leadInfo?.youtubeVedio??"",
    Preferred_Contact_Method		: [formData?.leadInfo?.preferredContact]??"",
    Preferred_Contact_Time		: [formData?.leadInfo?.preferredContact]??"",
    Is_this_a_Reassignment		: formData?.leadInfo?.isthisaReassignment??"",
    Referral_Source		: formData?.leadInfo?.referralSource??"",
    Social_Media_Information		: toString(formData?.leadInfo?.socialMediaInfo)??"",
    Group_Insurance		: [formData?.leadInfo?.groupInsurance]??"",
    Referred_by		: formData?.leadInfo?.referredBy??"",
    Citizenship_Status1		: formData?.leadInfo?.citizenshipStatus??"",
    Understanding_of_Insurance		: formData?.leadInfo?.understandingOfInsurance??"",
    Existing_Insurance_Policy_2		: formData?.leadInfo?.existingInsurancePolicy??"",
  }
}
async function facebookParseData(formData) {
  return {
    Ad_Account: formData?.facebook?.adAccount ?? "",
    Ad_Account_ID: formData?.facebook?.adAccountId ?? "",
    Ad_Campaign: formData?.facebook?.adCampaign ?? "",
    Ad_Campaign_ID: formData?.facebook?.adCampaignId ?? "",
    FaceBook_Page: formData?.facebook?.faceBookPage ?? "",
    FaceBook_Page_ID: formData?.facebook?.faceBookPageId ?? "",
    Ad_Set: formData?.facebook?.adSet ?? "",
    Ad_Set_ID: formData?.facebook?.adSetId ?? "",
    FaceBook_Ad: formData?.facebook?.facebookAd ?? "",
    Ad_ID: formData?.facebook?.adId ?? "",
    Lead_Form: formData?.facebook?.leadForm ?? "",
    Lead_Form_ID: formData?.facebook?.leadFormId ?? "",
  };
}
async function addressParseData(formData) {
  return {
    Mailing_Street: formData?.address?.adAccount ?? "",
    Mailing_City: formData?.address?.mailingCity ?? "",
    Mailing_State: formData?.address?.mailingState ?? "",
    Mailing_Zip: formData?.address?.mailingpostalCode ?? "",
    Mailing_Country: formData?.address?.mailingCountry ?? "",
    Other_Street: formData?.address?.otherStreet ?? "",
    Other_City: formData?.address?.otherCity ?? "",
    Other_State: formData?.address?.otherState ?? "",
    Other_Country: formData?.address?.otherCountry ?? "",
  };
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


// ************* DEPEND CHILDEREN ************
async function mapDependentChildrenData(FamilyTree) {
  const mappedData = {};
  if (Array.isArray(FamilyTree?.dependentChildrenData)) {
    FamilyTree.dependentChildrenData.forEach((child, index) => {
      const childIndex = index + 1;
      mappedData[`Relationship_Child_${childIndex}`] = child.relationship || "";
      mappedData[`Name_Child_${childIndex}`] = child.name || "";
      mappedData[`Date_of_Birth_Child_${childIndex}`] = child.dob || "";
      mappedData[`Email_Child_${childIndex}`] = child.email || "";
      mappedData[`Phone_Child_${childIndex}`] = child.phone || "";
      mappedData[`Age_Child_${childIndex}`] = child.age || "";
    });
  }
  return mappedData;
}
// *****************ADD SUBLING ******************
async function mapSiblingData(FamilyTree) {
  const sibData = {};
  if (Array.isArray(FamilyTree?.siblingData)) {
    FamilyTree.siblingData.forEach((sibling, index) => {
      const childIndex = index + 1;
      sibData[`Relationship_Sibling_${childIndex}`] = sibling.relationship || "";
      sibData[`Name_Sibling_${childIndex}`] = sibling.name || "";
      sibData[`Date_of_Birth_Sibling_${childIndex}`] = sibling.dob || "";
      sibData[`Email_of_Sibling_${childIndex}`] = sibling.email || "";
      sibData[`Phone_of_Sibling_${childIndex}`] = sibling.phone || "";
    });
  }
  return sibData;
}
// ****************EMERGENCY CONTACT ****************
async function mapEmergencyContactData(FamilyTree) {
  const emergencyData = {};
  // Ensure `dependentChildrenData` exists before proceeding
  if (Array.isArray(FamilyTree?.emergencyContactData)) {
    FamilyTree.emergencyContactData.forEach((emergency, index) => {
      const childIndex = index + 1;
      emergencyData[`Name1`] = emergency.emergencyContactName || "";
      emergencyData[`Phone_of_Emergency_Contact`] = emergency.emergencyContactPhone || "";
      emergencyData[`Relationship`] = emergency.emergencyContactRelationship || "";
      // emergencyData[`Email_of_Emergency_Contact`] = emergency.emergencyContactEmail || "";
    });
  }
  return emergencyData;
}
// *************DEPEND PARENTS***************
async function mapdependentParentsData(FamilyTree) {
  const parentsData = {};
  // Ensure `dependentChildrenData` exists before proceeding
  if (Array.isArray(FamilyTree?.dependentParentsData)) {
    FamilyTree.dependentParentsData.forEach((emergency, index) => {
      const childIndex = index + 1;
      parentsData[`Relationship_Parent_${childIndex}`] = emergency.relationship || "";
      parentsData[`Name_of_Parent_${childIndex}`] = emergency.name || "";
      parentsData[`Date_of_Birth_Parent_${childIndex}`] = emergency.dob || "";
      parentsData[`Phone_of_Parent_${childIndex}`] = emergency.phone || "";
      parentsData[`Email_of_Parent_${childIndex}`] = emergency.email || "";
    });
  }
  return parentsData;
}
// *************LEAD MANAGEMTN INFO *************
async function mapLeadManagementInfoData(leadMgt) {
  const leadinfomgtData = {};
  // Ensure `dependentChildrenData` exists before proceeding
  if (Array.isArray(leadMgt?.LeadMgtData)) {
    leadMgt.LeadMgtData.forEach((leadmgnt, index) => {
      const childIndex = index + 1;
      leadinfomgtData[`Interaction_Type`] = leadmgnt.interactionType || "";
      leadinfomgtData[`Date_Time_of_Interaction`] = leadmgnt.timeOfInteraction || "";
      leadinfomgtData[`Contact_Attempt`] = leadmgnt.contactAttempt || "";
      leadinfomgtData[`Time_Spent_mins`] = leadmgnt.timeSpent || "";
      leadinfomgtData[`Comments`] = leadmgnt.comments || "";
      leadinfomgtData[`Interaction_Outcome`] = leadmgnt.interactionOutcome || "";
      leadinfomgtData[`Probability_of_Closure`] = leadmgnt.probabilityOfClosure || "";
    });
  }
  return leadinfomgtData;
}


