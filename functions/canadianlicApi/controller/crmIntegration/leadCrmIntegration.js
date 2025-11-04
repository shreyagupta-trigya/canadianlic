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
exports.dataSyncZcrm = async (token,formData, crmId) => {

  // console.log("crmId====>", formData,crmId);
  // console.log("<==FormData==>", JSON.stringify(formData));
  try {
    const layout = await layoutName(formData?.layout);
    const leadInfo = await leadParseData(formData.LeadInformation);
    const familyTree = await familyTreeParseData(formData.FamilyTree);
    const descriptonInfo = await descriptonInfoParseData(formData.DescriptonInfo);
    const parseServiceRequestdata = await parseServiceRequestDetails(formData.ServiceRequestDetails);
    const umtDetailsData = await parseUMTDetails(formData.UMTDetails);
    const addressinfoData = await parseAddressInformation(formData.AddressInformation);
    const facebookData = await parseFacebook(formData.Facebook);

    // ********** SUBFORM DATA ****************
    const dependentChildrenData = await mapDependentChildrenData(formData?.FamilyTree ?? []);
    const SiblingDataData = await mapSiblingData(formData?.FamilyTree ?? []);
    const EmergencyContactData = await mapEmergencyContactData(formData?.FamilyTree ?? []);
    const dependentParentsData = await mapdependentParentsData(formData?.FamilyTree ?? []);
    const leadManagementInfoData = await mapLeadManagementInfoData(formData?.LeadManagementInformation ?? []);
    // ********** END SUBFORM DATA ****************    
    const data = {
      data: [
        {
          // **************** LEAD INFO *****************
          Owner:formData?.sourceId??adminId,
          Catalyst_Id: formData?.ROWID??null,
          Layout: {
            id: "4299079000000091055"
          },
          ...familyTree, 
          ...descriptonInfo,   
          ...parseServiceRequestdata,  
          ...umtDetailsData, 
          ...addressinfoData,
          ...facebookData,
          ...leadInfo,
          ...dependentChildrenData,
          ...SiblingDataData,
          ...EmergencyContactData,
          ...dependentParentsData,
          ...leadManagementInfoData

        }
      ]
    };
    // console.log("formdata CRM====>", JSON.stringify(data));
    const baseUrl = `https://www.zohoapis.com/crm/v7/Leads${(crmId !== null && crmId !== undefined) ? `/${crmId}` : ''}`;
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
async function leadParseData(formData){
  return {
    
    Deal_Name: formData?.dealName??"",
    Lead_Source: formData?.insuranceLeadSource ?? "",
    First_Name: formData?.firstName??"",
    Last_Name: formData?.lastName??"",
    // Mobile: formData?.mobile??null,
    Lead_Status: formData?.insuranceLeadStatus??"",
    // Whatsapp: formData?.whatsapp??null,
    Lead_Status_Stage:formData?.leadStatusStage??"", 
    Lead_Status_Stage:formData?.leadStatusStage??"",
    Email: formData?.email??"",
    // Assigned_to_Advisor: formData?.assignedToAdvisor??"",// CRM LOOKUP
    Remove_From_Campaign: formData?.removeFromCampaign??"",
    Email_is_Valid: formData?.emailIsValid??"",
    // Assigned_to_Advisor: formData?.assignedAdvisor??"",
    Email_Opt_Out: formData?.emailOptOut??false,
    Gender: formData?.gender??"",
    Referred_by: formData?.referredBy??null,
    Old_Database_Lead: formData?.oldDatabaseLead??null,
    Is_this_a_Reassignment: formData?.isThisaReassignment??No,
    Gender_Prediction: formData?.genderPrediction??No,
    Gender_Prediction_Score: formData?.genderPredictionScore??null,
    Currency: formData?.currency??"",
    Exchange_Rate: formData?.exchangeRate??"",
    Preferred_Contact_Method: [formData?.preferredContactMethod??""],
    Submit_Page_URL: formData?.submitPageURL??"",
    // Assigned_Campaigns: formData?.assignedCampaigns??"",// lookup filed
    Inbox_URL: formData?.inboxURL??"",
    Net_Worth: formData?.netWorth??"",
    // Location_Name: formData?.locationName??"",// lookup filed
    Social_Media_Information: formData?.socialMediaInformation??"",
    Preferred_Contact_Time: [formData?.preferredContactTime??""],
    Citizenship_Status: formData?.citizenshipStatus??"",
    UnderstandingofInsurance: formData?.understandingOfInsurance??"",
    advancedroundrobin__Email_Round_Robin_Owner	: formData?.emailRoundRobinOwner??false,
    advancedroundrobin__Round_Robin_Processed		: formData?.roundRobinProcessed??false,
    advancedroundrobin__Re_run_round_robin: formData?.reRunRoundRobin??false,
    advancedroundrobin__Eligible_Round_Robin_Owner_Found: formData?.eligibleRoundRobinOwnerFound??false,
    Existing_Insurance_Policy: formData?.existingInsurancePolicy??false,
    advancedroundrobin__Round_Robin_Assignment_Time	: await dateTimeFormat(formData?.roundRobinAssignmentTime)??null,
    Lead_Created_On	: new Date(formData?.leadCreatedOn)??null,
    Next_Follow_Up_Date_Time	: await  dateTimeFormat(formData?.nextFollowUpDateTime)??null,
    Do_you_own_a_home_in_Canada	: formData?.doYouOwnaHomeInCanada??No,
    Do_you_have_life_insurance	: formData?.doYouHaveLifeInsurance??"",
    Are_you_ready_to_purchase_this_Life_Insurance_Poli	: formData?.areYouReadyToPurchaseThisLifeInsurancePoli??"",
    Are_you_ready_to_purchase_this_Life_Insurance_Pol	: formData?.areYouReadyToPurchaseThisLifeInsurancePol??false,
    Additional_Contact_Information	: formData?.additionalContactInformation??"",
    phoneburner0__PhoneBurner_Last_Call_Outcome	: formData?.phoneBurnerLastCallOutcome??"",
    phoneburner0__PhoneBurner_Last_Call_Time	: await dateTimeFormat(formData?.phoneBurnerLastCallTime)??null,
    Are_you_LLQP_Licensed	: formData?.areYouLLQPLicensed??"",
    What_is_Your_Postal_Code	: formData?.whatIsYourPostalCode??"",
    Driver_License_No	: formData?.driverLicenseNo??"",
    Vehicle_Year	: formData?.vehicleYear??"",
    // Phone_Number	: formData?.phoneNumber??"",
    When_Was_Your_Vehicle_Made	: formData?.whenWasYourVehicleMade??"",
    Name1	: formData?.name??"",
    Add_Email1	: formData?.addEmail1??"",
    Quote	: formData?.quote??"",
    // Child_Age	: formData?.childAge??null,
    Date_of_birth_1	: formData?.dateOfBirth1??"",
    // Deposit	: formData?.deposit??null, // only number value 
    How_Much_You_Like_to_Start_the_Plan	: formData?.howMuchYouLikeToStartThePlan??"",
    HOW_MUCH_AMOUNT_WANT_TO_START_WITH	: formData?.howMuchAmountWantToStartWith??"",
    Lead_ID	: formData?.leadID??"",
    Date_of_birth_of_traveler	: formData?.dateOfBirthOfTraveler??null,
    What_type_of_Student	: formData?.whattypeofStudent??"",
    Start_Date_of_Coverage	: formData?.startDateOfCoverage??null,
    Where_would_you_be_travelling_to	: formData?.whereWouldYouBeTravellingto??"",
    Trip_Type	: formData?.tripType??"",
    Date_of_Birth	: formData?.dateOfBirth??null,
    Best_Time_To_Call	: formData?.bestTimeToCall??"",

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
// ************* DEPEND CHILDEREN ************
async function mapDependentChildrenData(FamilyTree) {
  const mappedData = {};
  if (Array.isArray(FamilyTree?.dependentChildrenData)) {
    FamilyTree.dependentChildrenData.forEach((child, index) => {
      const childIndex = index + 1;
      mappedData[`Relationship_Child_${childIndex}`] = child.relationship || "";
      mappedData[`Name_Child_${childIndex}`] = child.name || "";
      mappedData[`Date_of_Birth_Child_${childIndex}`] = child.dob || "";
      // mappedData[`Email_Child_${childIndex}`] = child.email || "";
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
      // sibData[`Email_Sibling_${childIndex}`] = sibling.email || "";
      sibData[`Phone_Sibling_${childIndex}`] = sibling.phone || "";
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
      emergencyData[`Emergency_Contact_Name`] = emergency.emergencyContactName || "";
      emergencyData[`Emergency_Contact_Phone`] = emergency.emergencyContactPhone || "";
      emergencyData[`Emergency_Contact_Relationship`] = emergency.emergencyContactRelationship || "";
      // emergencyData[`Emergency_Contact_Email`] = emergency.emergencyContactEmail || "";
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
      // parentsData[`Email_of_Parent_${childIndex}`] = emergency.email || "";
    });
  }
  return parentsData;
}
// *************LEAD MANAGEMTN INFO *************
async function mapLeadManagementInfoData(LeadManagementInformation) {
  const leadinfomgtData = {};
  // Ensure `dependentChildrenData` exists before proceeding
  if (Array.isArray(LeadManagementInformation?.LeadData)) {
    LeadManagementInformation.LeadData.forEach((leadmgnt, index) => {
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

// ************* FAMILY TREE ****************
async function familyTreeParseData(FamilyTree){
  return{
    Relationship_Status:FamilyTree?.relationShipStatus??null,
    Name_of_Spouse:FamilyTree?.nameOfSpouse??"",
    Anniversary_Date:FamilyTree?.anniversaryDate??"",
    // Spouse_s_Email:FamilyTree?.emailOfSpouse??"",
    Spouse_s_Mobile:FamilyTree?.phoneOfSpouse??"",
    // Spouse_s_Date_of_Birth:FamilyTree?.spouseDateOfBirth??null,
    // Dependent_Parents: FamilyTree?.dependentParents??"",
    Dependent_Children1: FamilyTree?.dependentChildren??"",
    Number_of_Dependent_Parents: FamilyTree?.numberOfDependentParents??"",
    Number_of_Dependents: FamilyTree?.numberOfDependentChildren??"",
    Siblings1: FamilyTree?.siblings??"",
    Number_of_Siblings: FamilyTree?.numberOfSiblings??"",
  }
}
// *********LEAD DESCRIPTION *************
async function descriptonInfoParseData(descriptonInfo){
  return{
    TypeofTravelInsurance: descriptonInfo?.typeOfInsuranceLooking??"",
    stTravelerAge: String(descriptonInfo?.ageOf1stTraveler)??"",
    stTravelerStartdate: descriptonInfo?.travelerStartDate??null,
    Coverage_you_are_Looking_for: descriptonInfo?.coverageYouAreLookingFor??null,
    Tobaccoused: descriptonInfo?.tobaccoused??"",
    How_do_you_Consider_your_Health : descriptonInfo?.howDoYouConsiderYourHealth??"",
    TermPlanareyouLookingfor : descriptonInfo?.whatTypeOfTermPlanAreYouLookingFor??"",
    Select_The_Duration_of_the_Coverage  : descriptonInfo?.selectTheDurationOfTheCoverage??"",
    Secure_your_Childs_Future_with_Higher_Education : descriptonInfo?.secureYourChildsFutureWithHigherEducation??"",
    Enter_the_amount_of_Mortgage_Coverage_Required : descriptonInfo?.enterTheAmountOfMortgageCoverageRequired??"",
    Do_you_have_life_insurance : descriptonInfo?.doYouHaveAnyMedicalIssue??"",
    Deposit_every_Month_towards_your_Child_Education : descriptonInfo?.depositEveryMonthTowardsYourChildEducation??"",
    eligible_to_get_extra_2000_in_Government_Grants : String(descriptonInfo?.eligibleToGetExtra2000InGovernmentGrants)??"",
    Million_in_an_RRSP_Account_at_Retirement : descriptonInfo?.oneMillionInanRespAccountAtRetirement??"",
    Would_you_like_to_know_How_RESP_Works : descriptonInfo?.wouldYouLikeToKnowHowRespWorks??"",
    Do_you_want_to_Deposit_Monthly_or_Yearly_Premium : descriptonInfo?.doYouWanToDepositMonthlyOrYearlyPremium??"",
    Are_you_looking_for_Drug_Dental_or_Just_Drug_Pla : descriptonInfo?.areYouLookingForDrugAndDentalOrJustDrugPla??"",
    Are_you_an_Owner_or_Employee_of_the_Business : descriptonInfo?.areYouAnOwnerOrEmployeeOfTheBusiness??"",
    What_age_do_you_want_to_start_the_withdrawal_from : descriptonInfo?.whatageDoYouWanttostartTheWithdrawalFrom??"",
    Total_Dependents : descriptonInfo?.totalDependents??"",
    Dependent_Age_1 : String(descriptonInfo?.dependentAge1)??"",
    Dependent_Age_2 : descriptonInfo?.dependentAge2??"",
    ndTravelerAge : descriptonInfo?.enterageof2ndTraveler??"",
    WhatPolicyDoYouWant : descriptonInfo?.whatPolicyDoYouWant??"",
    Dependent_Age_3 : descriptonInfo?.Dependent_Age_3??"",
    stTravelerEnddate : descriptonInfo?.travelerEndDate??null,
    stTravelerpreexistingmedicalconditions : descriptonInfo?.preExistingmedicaLconditions??"",
    How_Much_monthly_Benefit_do_you_Need : descriptonInfo?.howMuchMonthlyBenefitDoYouNeed??"",
    Whats_your_Profession : descriptonInfo?.whatYourProfession??"",
    Do_you_want_Critical_Illness_Insurance_With_Money : descriptonInfo?.doYouWantCriticalIllnessInsuranceWithMoney??"",
    How_long_do_you_need_Coverage_for : descriptonInfo?.youAreSeekingCoverageFor??"",
    whatsyourAge : String(descriptonInfo?.whatsYourAge)??"",
    How_much_do_you_want_to_Save_monthly : descriptonInfo?.howMuchDoYouWantToSaveMonthly??"",
    What_time_frame_you_like_to_move_to_be_a_advisor : descriptonInfo?.whatTimeFrameYouLikeToMoveToBeaAdvisor??"",
    How_many_child_Children_s_do_you_have : descriptonInfo?.how_Many_Childrens??"",
    Would_like_to_increase_Monthly_Deposits : descriptonInfo?.wouldLikeToIncreaseMonthlyDeposits??"",
    What_is_your_residency_status_in_Canada : descriptonInfo?.whatIsYourResidencyStatusInCanada??"",
    How_long_do_you_need_Coverage_for : descriptonInfo?.howLongDoYouNeedCoverageFor??"",
    Deposit_every_Month_towards_your_Child_Education : descriptonInfo?.moneyRequireToCompleteYourChildEducation??"",
    what_Kind_of_business_is_it : descriptonInfo?.whatKindOfBusinesssIsIt??"",
    How_much_do_you_want_to_Save_Yearly : String(descriptonInfo?.howMuchdoYouWantToSaveYearly)??"",
    Select_your_Age_Bracket : descriptonInfo?.selectYourAgeBracket??"",
    Gclid_Field : descriptonInfo?.LookingForAdvisor??"",
    Are_You_Licensed_as_an_Insurance_Advisor : descriptonInfo?.areYouLicensedAsAnInsuranceAdvisor??"",
    Dependent_Age_4 : String(descriptonInfo?.dependentAge4)??"",
    Dependent_Age_5 : String(descriptonInfo?.dependentAge5)??"",
    Dependent_Age_6 : String(descriptonInfo?.dependentAge6)??"",

  }
}
// *****************SERVICE RESQUEST *****************
async function parseServiceRequestDetails(serviceRequest){
  return{
    Potential_Business_Policy_Values: serviceRequest?.potentialBusiness??"",
    Life_Insurance_Options: [serviceRequest?.lifeInsurance??null],
    Living_Benefits: [serviceRequest?.livingBenefits??null],
    Immigration_Services: [serviceRequest?.immigrationServices??null],
    Business_Liability_Insurance: [serviceRequest?.businessLiabilityInsurance??null],
    Service_Request_Options_1: [serviceRequest?.servicesRequested??null],
    Travel_Insurance: [serviceRequest?.travelInsurance??""],
    Auto_Insurance: [serviceRequest?.autoInsurance??""],
    Home_Insurance: [serviceRequest?.homeInsurance??""],
    Investments: [serviceRequest?.investments??""],
    Group_Insurance: [serviceRequest?.groupInsurance??""],
    Loan_Protection: [serviceRequest?.loanProtection??""],
    Hybrid_Insurance: serviceRequest?.combinationOrHybridInsurance??false,
    // Health_Dental_Insurance: serviceRequest?.healthAndDentalInsurance??false,
  }
}
// ***************** UMTDetails *****************
async function parseUMTDetails(umt) {
  return{
    campaignid_Data:umt?.campaignidData??"",
    adgroupid_Data:umt?.adgroupidData??"",
    network_Data:umt?.networkData??"",
    GCLID_Data:umt?.gclidData??"",
    keyword_Data:umt?.keywordData??"",
    LP_URL_Data:umt?.lpUrlData??null,
    device_Data:umt?.deviceData??null,
    matchtype_Data:umt?.matchtypeData??"",
  }
}
// *********** AddressInformation ***********
async function parseAddressInformation(addinfo) {
  return{
    Street:addinfo?.street??"",
    State:addinfo?.state??"",
    Country:addinfo?.country??"",
    Zip_Code:addinfo?.zipCode??"",
    City:addinfo?.city??"",
  }
}
// *********** Facebook ***********
async function parseFacebook(facebook) {
  return{
    Ad_Account:facebook?.adAccount??"",
    Ad_Account_ID:facebook?.adAccountId??"",
    adCampaign:facebook?.adAccountId??"",
    Ad_Campaign:facebook?.adCampaign??"",
    FaceBook_Page_ID:facebook?.facebookPageId??"",
    Ad_Set_ID:facebook?.adSetId??"",
    Lead_Form:facebook?.leadForm??"",
    Ad_ID:facebook?.adId??"",
    Ad_Set:facebook?.adSet??"",
    FaceBook_Page:facebook?.facebookPage??"",
    Ad_Campaign_ID:facebook?.adCampaignId??"",
    Cost_Per_Lead_CPL:facebook?.costPerLead??"",
    FaceBook_Ad:facebook?.facebookAd??"",
    Lead_Form_ID:facebook?.leadFormId??"",
    Facebook_Ad_Information:facebook?.facebookAdInformation??"",
  }
}
// ************* FESTIVAL ****************
// async function mapFestivalFormData(FestivalForm) {
//   const parentsData = {};
//   // Ensure `dependentChildrenData` exists before proceeding
//   if (Array.isArray(FestivalForm?.dependentParentsData)) {
//     FestivalForm.festivalsData.forEach((festival, index) => {
//       const childIndex = index + 1;
//       parentsData[`Relationship_Parent_${childIndex}`] = festival.festivalName || "";
//       parentsData[`Name_of_Parent_${childIndex}`] = festival.dateOfFestival || "";
//     });
//   }
//   return parentsData;
// }

