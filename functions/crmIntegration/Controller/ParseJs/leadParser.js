const {getAccessToken,getLeadCrmData, insertData, insertSubformData} = require("../../Utils/helper");
async function parseLeadData(catalystApp,leadData) {
  const layout = leadData?.Layout === "4299079000000091055" ? "Client" : " Advisor Leads"
  // const accessToken = await getAccessToken();
  // const catalystRowsArr = await getLeadCrmData(leadData.id, accessToken);
  // const leadLookupObj = {...catalystRowsArr[0],...catalystRowsArr[1]};
  const leadLookupObj='';
  const allStats= await getAllStats(leadData,leadLookupObj,layout);
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
    const leadId = await insertData(catalystApp, "leads",{...leads,source:"crm",sourceId:leadData.id});
    const functionState = await Promise.all([
      insertData(catalystApp, "familyTree", {...familyTree,leadId:leadId}),
      insertData(catalystApp, "leadInformations", {...leadInfo,leadId:leadId}),
      insertData(catalystApp, "leadsDescription", {...description,leadId:leadId}),
      insertData(catalystApp, "leadService", {...serviceRequestDetails,leadId:leadId}),
      insertSubformData(catalystApp, "dependentChildren", dependentChildrenData,leadId),
      insertSubformData(catalystApp, "dependentParents", dependentParentsData,leadId),
      insertSubformData(catalystApp, "contactsSiblings", siblingsData,leadId),
      insertSubformData(catalystApp, "contactEmergencyDetails", emergencyContactData,leadId),
      insertSubformData(catalystApp, "festivals", festivalStats,leadId),
      insertSubformData(catalystApp, "leadConversionHistory", leadManagementHistory,leadId)
    ]);
    console.log("leadId",leadId);
    console.log("leadResp",functionState);
    
  }
}
// <<<<<<<<<< ========= CRM LEADS FIELDS DATA ========== >>>>>>>>>>>>>>>>>>
async function getAllStats(crmResp,leadLookupObj,layout) {
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
}
async function parseLeadsData (crmResp,leadLookupObj,layout) {
  let leads= {
  firstName : crmResp?.First_Name ?? "",
  lastName : crmResp?.Last_Name ?? "",
  mobile : crmResp?.Mobile ?? "",
  whatsapp : crmResp?.Whatsapp ?? "",
  email : crmResp?.Email ?? "",
  removeFromCampaign : crmResp?.Remove_From_Campaign ?? false,
  emailOptOut : crmResp?.Email_Opt_Out ?? false,
  bestTimeToCall : crmResp?.Best_Time_To_Call ?? "",
  roundRobinProcessed : crmResp?.advancedroundrobin__Round_Robin_Processed ?? false,
  emailRoundRobinOwner : crmResp?.advancedroundrobin__Email_Round_Robin_Owner ?? false,
  eligibleRoundRobinOwnerFound : crmResp?.advancedroundrobin__Eligible_Round_Robin_Owner_Found ?? false,
  reRunRoundRobin : crmResp?.advancedroundrobin__Re_run_round_robin ?? false,
  roundRobinAssignmentTime : crmResp?.advancedroundrobin__Round_Robin_Assignment_Time ?? "",
  leadCreatedOn : crmResp?.Lead_Created_On ?? null,
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
  rcSmsOptOut : crmResp?.multiuserringcentralmessagingextension__RC_SMS_Opt_Out ?? false,
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
  module.exports = {
    parseLeadData
  }