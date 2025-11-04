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
  // console.log("CrmId", crmId);
  try {
    const layout = await layoutName(formData?.layout);
    const contactInf = await  contactAdvisorParseData(formData);
    const contactAdvisorDetails = await  contactAdvisorDetailsParseData(formData);
    const contactAdvisorAddress = await  contactAdvisorAddressParseData(formData);
    const contactAdvisorInfo = await  contactAdvisorInfoParseData(formData);
    // // ********** SUBFORM DATA ****************
    const dependentChildrenData = await mapDependentChildrenData(formData?.familyTree ?? []);
    const siblingDataData = await mapSiblingData(formData?.familyTree ?? []);
    const emergencyContactData = await mapEmergencyContactData(formData?.familyTree ?? []);
    const dependentParentsData = await mapdependentParentsData(formData?.familyTree ?? []);
    // // ********** END SUBFORM DATA ****************    
    const data = {
      data: [
        {
          // **************** Deal Info *****************
          Owner:formData?.sourceId??adminId,
          Layout: {
            id: layout
          },
          Catalyst_ID: crmId,
          ...contactInf,
          ...contactAdvisorDetails,
          ...contactAdvisorAddress,
          ...contactAdvisorInfo,
          // **************** SUBFORM CRM FIELDS *******************
          ...dependentChildrenData,
          ...siblingDataData,
          ...emergencyContactData,       
          ...dependentParentsData,          
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
async function contactAdvisorParseData(formData){
  return {
    First_Name: formData?.basicInfo?.firstName??"",
    Last_Name: formData?.basicInfo?.lastName??"",
    Mobile: formData?.basicInfo?.mobile??"",
    Email: formData?.basicInfo?.email??"",
    Advisor_Lead_Source: formData?.basicInfo?.advisorLeadSource??"",
    Advisor_s_Licence_Number: toString(formData?.basicInfo?.advisorsLicenceNumber)??"",
    Whatsapp: formData?.basicInfo?.whatsapp??"",
    App_Advisor_ID: formData?.basicInfo?.appAdvisorId??"",
    CIPR_Number: formData?.basicInfo?.ciprNumber??"",
    Advisor_s_Date_of_Birth: formData?.basicInfo?.advisorsDateofBirth??"",
    // Reviewed_as_on: formData?.basicInfo?.reviewedason??"",// date function
    // Advisor_s_Cessation_Date: formData?.basicInfo?.cessationDate??"",// date function
    // Date_of_Hire: formData?.basicInfo?.dateOfHire??"",// date function
    App_Advisor_ID: formData?.basicInfo?.appID??"",
    // Calendar: formData?.basicInfo?.myCalendar??"",// url
    Advisor_s_E_O_Policy_Number: formData?.basicInfo?.eoPolicyNumber??"",
    Additional_Contact_Information: formData?.basicInfo?.additionalContactInformation??false,
    Social_Media: formData?.basicInfo?.isSocial??false,
    Inactive_Advisor: formData?.basicInfo?.inactiveAdvisor??false,
    Email_Opt_Out: formData?.basicInfo?.emailOptOut??false,
    Remove_From_Campaign: formData?.basicInfo?.removeFromCampaign??false,
    // Status: formData?.basicInfo?.Status??"",

  }
}
async function contactAdvisorDetailsParseData(formData){
  return {
    Catalyst_ID: formData?.advisorDetails?.sourceId??null,
    // Team_Leg: Number(formData?.advisorDetails?.teamLeg??null),// number in crm
    Team_Generation_Number: formData?.advisorDetails?.generationNumber??null,
    If_Team_Team_Name: formData?.advisorDetails?.hireTeamName??"",
    // Hire_Team_Leg: formData?.advisorDetails?.hireTeamLeg??"",
    Team_Generation_Number: formData?.advisorDetails?.teamGenerationNumber??null,
    Description: formData?.advisorDetails?.description??"",
    Organization_Level: formData?.advisorDetails?.organizationLevel??"",
    // Team_Name: formData?.advisorDetails?.teamName??"",// picklist
    // Employment_Type: formData?.advisorDetails?.employmentType??"",// picklist
    // Hire_Level: formData?.advisorDetails?.hireLevel??"",// picklist
    // Hire_Type: formData?.advisorDetails?.hireType??"",// picklist
    // Bonus_Level: formData?.advisorDetails?.bonusLevel??"",// picklist
    // Supervisa_Payout_Level	: formData?.advisorDetails?.supervisaPayout??"",// picklist
    // of_Premium	: formData?.advisorDetails?.premiumPercentage??"",// picklist
   
  }
}
async function contactAdvisorAddressParseData(formData){
  return {
    Mailing_Street: formData?.address?.mailingStreet??"",
    Mailing_City: formData?.address?.mailingCity??"",
    Mailing_State: formData?.address?.mailingState??"",
    Mailing_Zip: toString(formData?.address?.mailingPostalCode??""),
    Mailing_Country: formData?.address?.mailingCountry??"",
    Mailing_Street: formData?.address?.street??"",
    City: formData?.address?.city??"",
    Mailing_State: formData?.address?.state??"",
    Country: formData?.address?.country??"",
  }
}
async function contactAdvisorInfoParseData(formData){
  return {
    Best_Time_To_Call: formData?.leadInfo?.bestTimeToCall??"",
    // Referral_Name_Client: formData?.leadInfo?.referralNameClient??"",
    If_referred_by_Advisor_or_External_Referral_Name: formData?.leadInfo?.ifreferredbyAdvisor??"",
    Existing_Policy_Renewal_Due_By: formData?.leadInfo?.existingPolicyRenewalDueBy??"",
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
    Ad_Account	: formData?.leadInfo?.adAccount??"",
    Ad_Account_ID	: formData?.leadInfo?.adAccountId??"",
    Ad_Campaign	: formData?.leadInfo?.adCampaign??"",
    Ad_Campaign_ID	: formData?.leadInfo?.adCampaignId??"",
    FaceBook_Page	: formData?.leadInfo?.faceBookPage??"",
    FaceBook_Page_ID	: formData?.leadInfo?.faceBookPageId??"",
    // Cost_Per_Lead_CPL	: formData?.leadInfo?.costPerLead??CAD,// currency in crm
    Ad_Set	: formData?.leadInfo?.adSet??"",
    Ad_Set_ID	: formData?.leadInfo?.adSetId??"",
    FaceBook_Ad	: formData?.leadInfo?.facebookAd??"",
    Ad_ID	: formData?.leadInfo?.adId??"",
    Lead_Form		: formData?.leadInfo?.leadForm??"",
    Lead_Form_ID		: formData?.leadInfo?.leadFormId??"",
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

// *************LAYOUT FUNCTION **************
async function layoutName(layoutData) {
  let layout = '';
  switch (layoutData) {
    case 'Advisor':
      layout = '4299079000000407082';
      break;
    case 'Client':
      layout = '4299079000000091033';
      break;
    default:
      layout = '';
  } 
  return layout;
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
// async function mapLeadManagementInfoData(LeadManagementInformation) {
//   const leadinfomgtData = {};
//   // Ensure `dependentChildrenData` exists before proceeding
//   if (Array.isArray(LeadManagementInformation?.LeadData)) {
//     LeadManagementInformation.LeadData.forEach((leadmgnt, index) => {
//       const childIndex = index + 1;
//       leadinfomgtData[`Interaction_Type`] = leadmgnt.interactionType || "";
//       leadinfomgtData[`Date_Time_of_Interaction`] = leadmgnt.timeOfInteraction || "";
//       leadinfomgtData[`Contact_Attempt`] = leadmgnt.contactAttempt || "";
//       leadinfomgtData[`Time_Spent_mins`] = leadmgnt.timeSpent || "";
//       leadinfomgtData[`Comments`] = leadmgnt.comments || "";
//       leadinfomgtData[`Interaction_Outcome`] = leadmgnt.interactionOutcome || "";
//       leadinfomgtData[`Probability_of_Closure`] = leadmgnt.probabilityOfClosure || "";
//     });
//   }
//   return leadinfomgtData;
// }


