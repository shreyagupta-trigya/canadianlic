const {getAccessToken,getContactCrmData, insertData, insertSubformData,dateTimeFormat} = require("../../Utils/helper");




async function parseContactsClientData(catalystApp, contactData) {
    const layout =
      contactData?.Layout === "4299079000000091033" ? "Client" : " Advisor";
    // const accessToken = await getAccessToken();
    //const catalystRowsArr = await getContactCrmData(contactData.id, accessToken);
    // console.log("catalystRowsArr===>",catalystRowsArr);
    //const contactLookupObj = {...catalystRowsArr[0],...catalystRowsArr[1]};
    const contactLookupObj = "";
    const allStats = await getAllStats(contactData, contactLookupObj, layout);
  
  //   console.log("contactLookupObj <==>", allStats);
    let contacts = allStats[0];
    let contactSubDetails = allStats[1];
    let familyTree = allStats[2];
    let dependentChildrenData = allStats[3];
    let dependentParentsData = allStats[4];
    let siblingsData = allStats[5];
    let emergencyContactData = allStats[6];
    let festivalStats = allStats[7];
    let leadManagementHistory = allStats[8];
  
    console.log("formdat===>", contacts )
    if(contactData.Catalyst_ID=== null){
    const contactId = await insertData(catalystApp, "contacts",{...contacts,source:"crm",sourceId:contactData.id});
    const functionState = await Promise.all([
      insertData(catalystApp, "contactSubDetails", {...contactSubDetails, contactId:contactId}),
      insertData(catalystApp, "familyTree", {...familyTree,contactId:contactId}),
      insertSubformData(catalystApp, "dependentChildren", dependentChildrenData,contactId,"contacts"),
      insertSubformData(catalystApp, "dependentParents", dependentParentsData,contactId,"contacts"),
      insertSubformData(catalystApp, "contactsSiblings", siblingsData,contactId,"contacts"),
      insertSubformData(catalystApp, "contactEmergencyDetails", emergencyContactData,contactId,"contacts"),
      insertSubformData(catalystApp, "festivals", festivalStats,contactId,"contacts"),
      insertSubformData(catalystApp, "leadConversionHistory", leadManagementHistory,contactId,"contacts"),
    ]);
    console.log("contactId",contactId);
    console.log("Function State",functionState);
    }
  }
  
  async function getAllStats(crmResp, contactLookupObj, layout) {
    return Promise.all([
      parseContactData(crmResp),
      parseContactSubDetailsData(crmResp),
      getFamilyTree(crmResp),
      getDependentChildren(crmResp),
      getDependentParents(crmResp),
      getSiblings(crmResp),
      getEmergencyContact(crmResp),
      getFestivalStats(crmResp),
      getLeadManagementHistory(crmResp),
    ]);
  }
  // contact table data
  async function parseContactData(crmResp) {
    return {
      // layoutName : layout,
      source: "crm",
      firstName: crmResp?.First_Name ?? "",
      lastName: crmResp?.Last_Name ?? "",
      mobile: crmResp?.Mobile ?? "",
      whatsApp: crmResp?.Whatsapp ?? "",
      email: crmResp?.Email ?? "",
      //clientPolicyIssueOn: new Date(crmResp.clientPolicyIssueOn) ?? null, // field not found in crm
      dateOfBirth: new Date(crmResp.Date_of_Birth) ?? null,
      //clientPolicyIssueOn:  new Date(crmResp?.clientPolicyIssueOn)?? null,
      //dateOfBirth:  new Date(crmResp?.dateOfBirth) ? new Date(crmResp.dateOfBirth): null,
      roundRobinAssignmentTime:
        (await dateTimeFormat(
          crmResp?.advancedroundrobin__Round_Robin_Assignment_Time
        )) ?? null,
      leadCreatedTime: (await dateTimeFormat(crmResp?.Lead_Created_Time)) ?? null,
      clvCorporateCommision: crmResp?.CLV_Amount ?? "",
      lastClvCorporate: crmResp?.Last_CLV_Corporate ?? "",
      clvAdvisorCommision: crmResp?.CLV_Advisor_Commision ?? "",
      lastClvAdvisor: crmResp?.Last_CLV_Advisor ?? "",
      phoneBurnerFollowUpDate:
        (await dateTimeFormat(
          crmResp.phoneburner0__PhoneBurner_Follow_Up_Date
        )) ?? null,
      phoneBurnerLastCallTime:
        (await dateTimeFormat(
          crmResp.phoneburner0__PhoneBurner_Last_Call_Time
        )) ?? null,
      description: crmResp?.Description ?? "",
      numberofProductsRemaining:
        crmResp?.Number_of_Products_Remaining_Dependents ?? "",
      removeFromCampaign: crmResp?.Remove_From_Campaign ?? false,
      eligibleRoundRobinOwnerFound1:
        crmResp?.Eligible_Round_Robin_Owner_Found1 ?? false,
      emailRoundRobinOwner2: crmResp?.Email_Round_Robin_Owner2 ?? false,
      eligibleRoundRobinOwnerFound:
        crmResp?.advancedroundrobin__Eligible_Round_Robin_Owner_Found ?? false,
      emailOptOut: crmResp?.Email_Opt_Out ?? false,
      roundRobinProcessed:
        crmResp?.advancedroundrobin__Round_Robin_Processed ?? false,
      //reRoundRobinProcessed: crmResp?.reRoundRobinProcessed ?? false,// not in crm
      rcSMSOptOut:
        crmResp?.multiuserringcentralmessagingextension__RC_SMS_Opt_Out ?? false,
      clientAddress: crmResp?.Client_Address ?? "",
      contactOwner: crmResp?.Owner ?? null,
      dealStageTracking: crmResp?.Stage_Track ?? "",
      assignedAdvisor: crmResp?.Assigned_Advisor ?? null,
      insuranceLeadSource: crmResp?.Lead_Source ?? "",
      status: crmResp?.Status ?? "",
      //leadId: crmResp?.leadId ?? null,//Not in crm
      oldDatabaseLead: crmResp?.Old_Database_Lead ?? "",
      location: crmResp?.Location ?? null,
      autoInsurance: crmResp?.Auto_Insurance ?? "",
      parentClient: crmResp?.Parent_Client_if_applicable ?? "",
      preferredContactMethod: crmResp?.Preferred_Contact_Method ?? "",
      preferredContactTime: crmResp?.Preferred_Contact_Time ?? "",
      gender: crmResp?.Gender ?? "",
      doYouHaveCorporations: crmResp?.Do_you_have_a_Corporation ?? "",
      immigrationServices: crmResp?.Immigration_Services ?? "",
      socialMediaInformation: crmResp?.Social_Media_Information ?? "",
      understandingOfInsurance: crmResp?.Understanding_of_Insurance ?? "",
      netWorth: crmResp?.Net_Worth ?? "",
      //emailIsValid: crmResp?.emailIsValid ?? '',//not in crm
      additionalContactInformation:
        crmResp?.Additional_Email_or_Phone_Contact_Information ?? false,
    };
  }
  
  // contactSubDetails Data
  
  async function parseContactSubDetailsData(crmResp){
    return {
      //   contactId: contactId,
      // serviceAvailedhealthAndDentalInsurance: service?.serviceAvailedhealthAndDentalInsurance?? false, //not found in crm
      combinationOrHybridInsurance:crmResp?.Combination_or_Hybrid_Insurance ?? false,
      // dateNewServiceRequested: new Date(crmResp.Date_of_Service_Update)?? null,
      // nextFollowUpDateAndTime: service.nextFollowUpDateAndTime ? await dateTimeFormat( service.nextFollowUpDateAndTime): null,
      maxNumberOfPotentialProductApplicable: crmResp?.Max_Potential_Products ?? "",
      potentialBusinessPolicyValues: crmResp?.Potential_Business_Policy_Values ?? "",
      potentialBusinessTravelInsurance: crmResp?.Travel_Insurance2 ?? false,
      resp: crmResp?.RESP ?? false,
      rrspTfsa: crmResp?.RRSP_TFSA_Mutual_Funds_Seg_Funds1 ?? false,
      potentialBusinessHealthAndDentalInsurance:
        crmResp?.Health_Dental_Insurance2 ?? false,
      otherInvestments: crmResp?.Other_Investments ?? false,
      potentialBusinessLoanProtection: crmResp?.Loan_Protection2 ?? false,
      otherLivingBenefits: crmResp?.Other_Living_Benefits1 ?? false,
      potentialBusinessCriticalIllness: crmResp?.Critical_Illness1 ?? false,
      potentialBusinessLifeInsurance: crmResp?.Life_Insurance2 ?? false,
      potentialDependent: crmResp?.Potential_Dependents ?? false,
      serviceAvailedOptions: crmResp?.Service_Request_Options_1 ?? "",
      lifeInsurance: crmResp?.Life_Insurance1 ?? "",
      lifeBenefits: crmResp?.Living_Benefits ?? "",
      serviceAvailedLoanProtection: crmResp?.Loan_Protection ?? "",
      serviceAvailedTravelInsurance: crmResp?.Travel_Insurance ?? "",
      investment: crmResp?.Investments ?? "",
      serviceAvailedUpdated: crmResp?.Services_Availed_Updated ?? "",
      processStage: crmResp?.Process_Stage ?? "",
      otherServiceRequested: crmResp?.Other_Service_Requested ?? "",
      // <<<<<<<<<<<<<<<< Potential DETAILS  >>>>>>>>>>>>>>>
      numberOfProductRemaining:crmResp?.Number_of_Products_Remaining_Dependents ?? "",
      numberOfProductRemainingIndividuals:crmResp?.Number_Remaining_max_9 ?? "",
      potentialDependentCompleted:crmResp?.Potential_Dependents_Completed ?? false,
      pendingPotentialBusinesslifeInsurance: crmResp?.Life_Insurance2 ?? false,
      dependentLifeIns: crmResp?.Dependent_Life_Ins ?? false,
      pendingPotentialBusinessCriticalIllness:
      crmResp?.Critical_Illness1 ?? false,
      dependentCriticalIns: crmResp?.Dependent_Critical_Ins ?? false,
      pendingPotentialBusinessHealthAndDentalInsurances:
      crmResp?.Health_Dental_Insurance2 ?? false,
      pendingPotentialBusinessTravelInsurance:
      crmResp?.Travel_Insurance2 ?? false,
      pendingPotentialBusinessResp: crmResp?.RESP1 ?? false,
      rrspTfsaMutualFundsSegFunds:crmResp?.RRSP_TFSA_Mutual_Funds_Seg_Funds1 ?? false,
      ppbOtherInvestments: crmResp?.Other_Investments1 ?? false,
      ppbLoanProtection: crmResp?.Loan_Protection2 ?? false,
      ppbOtherLivingBenefits: crmResp?.Other_Living_Benefits1 ?? false,
      serviceOffering: crmResp?.Service_Offering ?? "",
      // // <<<<<<< FESTIVAL  >>>>>>>
      religion: crmResp?.Religion ?? "",
      celebratedFestivals: crmResp?.Festivals ?? "",
      // totalInteractionTime: leadMgt?.totalInteractionTime ?? '', // not in crm
  
      // // <<<<<<<<<<<<<<<<<<<< ADDRESS >>>>>>>>>>>>>>>>>>>>>>>
      mailingStreet: crmResp?.Mailing_Street ?? "",
      mailingCity: crmResp?.Mailing_City ?? "",
      mailingState: crmResp?.Mailing_State ?? "",
      mailingpostalCode: crmResp?.Mailing_Zip ?? "",
      mailingCountry: crmResp?.Mailing_Country ?? "",
      otherStreet: crmResp?.Other_Street ?? "",
      otherCity: crmResp?.Other_City ?? "",
      otherState: crmResp?.Other_State ?? "",
      otherCountry: crmResp?.Other_Country ?? ""
    }
  }
  
  async function getFamilyTree(crmResp) {
    const familyTree = {};
    familyTree.relationShipStatus = crmResp.Marital_Status ?? "";
    familyTree.dependentParents = crmResp.Any_Dependent_Parents ?? "";
    familyTree.dependentChildren = crmResp.Any_Dependent_Children ?? "";
    familyTree.siblings = crmResp.Siblings ?? "";
    familyTree.numberOfDependentChildren = crmResp.Number_of_Dependents ?? "";
    familyTree.numberOfDependentParents =
      crmResp.Number_of_Dependent_Parents ?? "";
    familyTree.numberOfSiblings = crmResp.Number_of_Siblings ?? "";
    familyTree.depChildren = crmResp?.Any_Dependent_Children ?? "";
    familyTree.depSiblings = crmResp?.Siblings ?? "";
    familyTree.depParents = crmResp?.Number_of_Dependents ?? "";
    if (crmResp.Marital_Status === "Married") {
      familyTree.nameOfSpouse = crmResp.Name_of_Spouse ?? "";
      familyTree.anniversaryDate = crmResp.Anniversary_Date ?? "";
      familyTree.spouseDateOfBirth = crmResp.Spouse_s_Date_of_Birth ?? "";
      familyTree.emailOfSpouse = crmResp.Spouse_s_Email ?? "";
      familyTree.phoneOfSpouse = crmResp.Spouse_s_Phone ?? "";
    } else if (crmResp.depParents === "Comman Law") {
      familyTree.nameOfCommonLawPartner =
        crmResp.Name_of_Common_Law_Partner ?? "";
      familyTree.commonLawDateOfBirth =
        crmResp.Common_Law_Partner_s_Date_of_Birth ?? "";
    }
  
    return familyTree;
  }
  // ******************* SUBFORM DATA PARSING *************************
  
  async function getDependentChildren(crmResp) {
    const childersList = [];
    const numDependents = crmResp.Number_of_Children ?? 0;
  
    if (crmResp.Any_Dependent_Children === "Yes") {
      if (numDependents >= 1) {
        childersList.push({
          relationship: crmResp?.Relationship_Child ?? "",
          name: crmResp?.Name_of_Child_1 ?? "",
          dob: crmResp?.Date_of_Birth_Child_1 ?? "",
          email: crmResp?.Email_Child_1 ?? "",
          phone: crmResp?.Phone_Child_1 ?? "",
        });
      }
      if (numDependents >= 2) {
        childersList.push({
          relationship: crmResp?.Relationship_Child_1 ?? "",
          name: crmResp?.Name_of_Child_2 ?? "",
          dob: crmResp?.Date_of_Birth_Child_2 ?? "",
          email: crmResp?.Email_Child_2 ?? "",
          phone: crmResp?.Phone_Child_2 ?? "",
        });
      }
      if (numDependents >= 3) {
        childersList.push({
          relationship: crmResp?.Relationship_Child_2 ?? "",
          name: crmResp?.Name_of_Child_3 ?? "",
          dob: crmResp?.Date_of_Birth_Child_3 ?? "",
          email: crmResp?.Email_Child_3 ?? "",
          phone: crmResp?.Phone_Child_3 ?? "",
        });
      }
      if (numDependents >= 4) {
        childersList.push({
          relationship: crmResp?.Relationship_Child_3 ?? "",
          name: crmResp?.Name_of_Child_4 ?? "",
          dob: crmResp?.Date_of_Birth_Child_4 ?? "",
          email: crmResp?.Email_Child_4 ?? "",
          phone: crmResp?.Phone_Child_4 ?? "",
        });
      }
      if (numDependents >= 5) {
        childersList.push({
          relationship: crmResp?.Relationship_Child_4 ?? "",
          name: crmResp?.Name_of_Child_5 ?? "",
          dob: crmResp?.Date_of_Birth_Child_5 ?? "",
          email: crmResp?.Email_Child_5 ?? "",
          phone: crmResp?.Phone_Child_5 ?? "",
        });
      }
      if (numDependents >= 6) {
        childersList.push({
          relationship: crmResp?.Relationship_Child_5 ?? "",
          name: crmResp?.Name_of_Child_6 ?? "",
          dob: crmResp?.Date_of_Birth_Child_6 ?? "",
          email: crmResp?.Email_Child_6 ?? "",
          phone: crmResp?.Phone_Child_6 ?? "",
        });
      }
    }
  
    return childersList;
  }
  async function getDependentParents(crmResp) {
    const parentsList = [];
    const numDependentParents = crmResp.Number_of_Dependent_Parents ?? 0;
  
    if (crmResp.Any_Dependent_Parents === "Yes") {
      if (numDependentParents >= 1) {
        parentsList.push({
          relationship: crmResp?.Relationship_Parent_1 ?? "",
          name: crmResp?.Name_of_Parent_1 ?? "",
          dob: crmResp?.Date_of_Birth_Parent_1 ?? "",
          email: crmResp?.Email_of_Parent_1 ?? "",
          phone: crmResp?.Phone_of_Parent_1 ?? "",
        });
      }
      if (numDependentParents >= 2) {
        parentsList.push({
          relationship: crmResp?.Relationship_Parent_2 ?? "",
          name: crmResp?.Name_of_Parent_2 ?? "",
          dob: crmResp?.Date_of_Birth_Parent_2 ?? "",
          email: crmResp?.Email_of_Parent_2 ?? "",
          phone: crmResp?.Phone_of_Parent_2 ?? "",
        });
      }
      if (numDependentParents >= 3) {
        parentsList.push({
          relationship: crmResp?.Relationship_Parent_3 ?? "",
          name: crmResp?.Name_of_Parent_3 ?? "",
          dob: crmResp?.Date_of_Birth_Parent_3 ?? "",
          email: crmResp?.Email_of_Parent_3 ?? "",
          phone: crmResp?.Phone_of_Parent_3 ?? "",
        });
      }
    }
  
    return parentsList;
  }
  async function getSiblings(crmResp) {
    const siblingList = [];
    const numSiblings = crmResp.Number_of_Siblings ?? 0;
  
    if (crmResp.Siblings === "Yes") {
      if (numSiblings >= 1) {
        siblingList.push({
          relationship: crmResp?.Relationship_Sibling_1 ?? "",
          name: crmResp?.Name_of_Sibling_1 ?? "",
          dob: crmResp?.Date_of_Birth_Sibling_1 ?? "",
          email: crmResp?.Email_of_Sibling_1 ?? "",
          phone: crmResp?.Phone_of_Sibling_1 ?? "",
        });
      }
      if (numSiblings >= 2) {
        siblingList.push({
          relationship: crmResp?.Relationship_Sibling_2 ?? "",
          name: crmResp?.Name_of_Sibling_2 ?? "",
          dob: crmResp?.Date_of_Birth_Sibling_2 ?? "",
          email: crmResp?.Email_of_Sibling_2 ?? "",
          phone: crmResp?.Phone_of_Sibling_2 ?? "",
        });
      }
      if (numSiblings >= 3) {
        siblingList.push({
          relationship: crmResp?.Relationship_Sibling_3 ?? "",
          name: crmResp?.Name_Sibling_3 ?? "",
          dob: crmResp?.Date_of_Birth_Sibling_3 ?? "",
          email: crmResp?.Email_Sibling_3 ?? "",
          phone: crmResp?.Phone_Sibling_3 ?? "",
        });
      }
    }
  
    return siblingList;
  }
  async function getEmergencyContact(crmResp) {
    if (
      crmResp.Name1 === null &&
      crmResp.Phone_of_Emergency_Contact === null &&
      crmResp.Relationship === null &&
      crmResp.Email_of_Emergency_Contact === null
    ) {
      return [];
    }
    return [
      {
        emergencyContactName: crmResp?.Name1 ?? "",
        emergencyContactPhone: crmResp?.Phone_of_Emergency_Contact ?? "",
        emergencyContactRelationship: crmResp?.Relationship ?? "",
        emergencyContactEmail: crmResp?.Email_of_Emergency_Contact ?? "",
      },
    ];
  }
  async function getFestivalStats(crmResp) {
    let felivalList = [];
    let fetivalArr = [
      "Date_for_Canada_Day",
      "Date_for_Eid",
      "Date_for_Victoria_Day",
      "Date_for_Bakr_Eid",
      "Date_for_Family_Day",
      "Date_for_Holi",
      "Date_for_Father_s_Day",
      "Date_for_Dussehra",
      "Date_for_Mother_s_Day",
      "Diwali",
      "Thanksgiving",
      "Date_for_Raksha_Bandhan",
      "Date_for_Christmas",
      "Date_for_Guru_Nanak_Jayanti",
      "New Year",
      "Date_for_Guru_Gobind_Singh_Jayanti",
      "Date_for_Lohri",
      "Date_for_Guru_Granth_Sahib_Prakash_Divas",
      "Vaisakhi",
      "Passover",
    ];
  
    fetivalArr.forEach((item) => {
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
  
        felivalList.push({
          festivalName: item.replace("_", " "),
          dateOfFestival: formattedDate,
        });
      }
    });
  
    return felivalList;
  }
  async function getLeadManagementHistory(crmResp) {
    const historyList = [];
  
    crmResp.Lead_Management_History?.forEach((leadHtryObj) => {
      const leadHtryMap = {
        interactionType: leadHtryObj?.Interaction_Type ?? "",
        dateOfInteraction: leadHtryObj?.Date_Time_of_Interaction ?? "",
        timeSpent: leadHtryObj?.Time_Spent_mins ?? 0,
        contactAttempt: leadHtryObj?.Contact_Attempt ?? 0,
        probabilityOfClosure: leadHtryObj?.Probability_of_Closure ?? 0,
        comments: leadHtryObj?.Comments ?? "",
        interactionOutcome: leadHtryObj?.Interaction_Outcome ?? "",
      };
      historyList.push(leadHtryMap);
    });
  
    return historyList;
  }

  module.exports = {
    parseContactsClientData
  }