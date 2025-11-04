const {getAccessToken,getContactCrmData, insertData, insertSubformData} = require("../../Utils/helper");

const {parseContactsClientData} = require("./contactClientParse");


async function parseContactsData(catalystApp,contactData) { 
    
    const layout = contactData?.Layout === "4299079000000091033" ? "Client" : "Advisor"
    // if(layout === "Advisor"){
    //     await parseContactsClientData(catalystApp,contactData)
    // }
    // const accessToken = await getAccessToken();
    // const catalystRowsArr = await getContactCrmData(contactData.id, accessToken);
    // // console.log("catalystRowsArr===>",catalystRowsArr);
    // const contactLookupObj = {...catalystRowsArr[0],...catalystRowsArr[1]};
    const contactLookupObj ='';
    const allStats= await getAllStats(contactData,contactLookupObj,layout);
    // console.log("contactLookupObj <==>", contactLookupObj);
    let contacts = allStats[0];
    let advisorSubDetails = allStats[1];
    let familyTree = allStats[2];
    let dependentChildrenData = allStats[3];
    let dependentParentsData = allStats[4];
    let siblingsData = allStats[5];
    let emergencyContactData = allStats[6];
    let festivalStats = allStats[7];
    let fycData = allStats[8];
    let bonusTrackerData = allStats[9];
    
    if(contactData.Catalyst_ID=== null){
    const contactId = await insertData(catalystApp, "advisors",{...contacts,source:"crm",sourceId:contactData.id});
    const functionState = await Promise.all([
      insertData(catalystApp, "advisorSubDetails", {...advisorSubDetails, advisorId:contactId}),
      insertData(catalystApp, "familyTree", {...familyTree,advisorId:contactId}),
      insertSubformData(catalystApp, "dependentChildren", dependentChildrenData,contactId,"advisor"),
      insertSubformData(catalystApp, "dependentParents", dependentParentsData,contactId,"advisor"),
      insertSubformData(catalystApp, "contactsSiblings", siblingsData,contactId,"advisor"),
      insertSubformData(catalystApp, "contactEmergencyDetails", emergencyContactData,contactId,"advisor"),
      insertSubformData(catalystApp, "festivals", festivalStats,contactId,"advisor"),
      insertSubformData(catalystApp, "advisorFyc", fycData,    contactId,"advisor"),
      insertSubformData(catalystApp, "advisorBonus", bonusTrackerData,    contactId,"advisor"),
    ]);
    console.log("contactId",contactId);
    console.log("Function State",functionState);
    }
}

async function getAllStats(crmResp,contactLookupObj,layout) {
return Promise.all([
        parseContactData(crmResp),
        getContactInfo(crmResp),
        getFamilyTree(crmResp),
        getDependentChildren(crmResp),
        getDependentParents(crmResp),
        getSiblings(crmResp) ,
        getEmergencyContact(crmResp),
        getFestivalStats(crmResp),
        // getLeadManagementHistory(crmResp)
        getFycData(crmResp),
        bonusTrackerData(crmResp)
]);
}

async function parseContactData(crmResp,contactLookupObj,layout) {
    return{
    layoutName : layout,
    source : "crm",
    sourceId : crmResp?.id,    
    firstName: crmResp?.First_Name ?? "",
    lastName: crmResp?.Last_Name ?? "",
    mobile: crmResp?.Mobile ?? "",
    email: crmResp?.Email ?? "",
    // landline: crmResp?.landline ?? "",
    // advisorLeadSource: contactLookupObj?.Advisor_CatalystId ?? null, // lookup fileds
    advisorsLicenceNumber: crmResp?.Advisor_s_Licence_Number ?? null,
    whatsapp: crmResp?.Whatsapp ?? "",
    appAdvisorId: crmResp?.App_Advisor_ID ?? "",
    ciprNumber: crmResp?.CIPR_Number ?? "",
    advisorsDateofBirth: crmResp?.Advisor_s_Date_of_Birth ? new Date(crmResp.Advisor_s_Date_of_Birth) : null,
    reviewedason: new Date(crmResp?.Reviewed_as_on) ?? null,
    cessationDate: crmResp?.Advisor_s_Cessation_Date ? new Date(crmResp.Advisor_s_Cessation_Date) : null,
    dateOfHire: crmResp?.	Date_of_Hire ? new Date(crmResp.	Date_of_Hire) : null,
    // appID: crmResp?.appID ?? "",
    myCalendar: crmResp?.Calendar ?? "",
    eoPolicyNumber: crmResp?.Advisor_s_E_O_Policy_Number ?? "",
    additionalContactInformation: crmResp?.Additional_Contact_Information ?? false,
    isSocial: crmResp?.isSocial ?? false,
    inactiveAdvisor: crmResp?.Inactive_Advisor ?? false,
    emailOptOut: crmResp?.Email_Opt_Out ?? false,
    removeFromCampaign: crmResp?.Remove_From_Campaign ?? false,
    // advisorOwner: crmResp?.advisorOwner ?? "",
    location: crmResp?.Location ?? null,
    vendor: crmResp?.Vendor ?? "",
    // assignedAdvisor: contactLookupObj?.Assigned_Advisor ?? null,
    status: crmResp?.Status ?? "",
    //  <<<<<<<<<<<< Festivities >>>>>>>>>>>
    religion: crmResp?.Religion ?? "",
    celebratedFestivals: crmResp?.Festivals?? "",
    //<<<<<<<<<<< Address >>>>>>>> 
    state: crmResp?.State ?? "",
    country: crmResp?.Country ?? "",
    postalCode: crmResp?.Zip_Code ?? "",
    // <<<<<<<<< ADVISOR DETAILS >>>>>>>>>
    hireTeamName: crmResp?.If_Team_Team_Name ?? "",
    hireTeamLeg: crmResp?.Hire_Team_Leg ?? "",
    teamGenerationNumber: crmResp?.If_Team_Team_Generation_Number ?? "",
    catalystId: crmResp?.Catalyst_ID ?? "",
    description: crmResp?.Description ?? "",
    hireLevel: crmResp?.Hire_Level ?? "",
    hireType: crmResp?.Hire_Type ?? "", 
    supervisaPayout: crmResp?.Supervisa_Payout_Level ?? "",
    premiumPercentage: crmResp?.of_Premium ?? "",
    fycPercentage: crmResp?.of_FYC ?? "",
    productCataegory: crmResp?.Referral_Payout_Category ?? "",
    livingBenefits: crmResp?.Living_Benefits ?? "",
    oldLeadDatabase: crmResp?.Old_Database_Lead ?? "",
    location2: crmResp?.Location_Name2 ?? null,
    emailIsValid: crmResp?.Email_is_valid ?? ""
    }
}
async function getContactInfo(crmResp) {
    return{        
        bestTimeToCall: crmResp?.Best_Time_To_Call	 ?? "",
        // referralNameClient: crmResp?.referralNameClient ?? "",
        ifreferredbyAdvisor: crmResp?.If_referred_by_Advisor_or_External_Referral_Name ?? "",
        existingPolicyRenewalDueBy: crmResp?.Existing_Policy_Renewal_Due_By ?? "",
        submitPageUrl: crmResp?.Submit_Page_URL ?? "",
        assignedCampaigns: crmResp?.Assigned_Campaigns ?? "",
        potentialBusiness: crmResp?.Potential_Business_Policy_Values ?? "",
        insuranceLeadScoringPositiveScore: crmResp?.Insurence_Leads_Scoring_Positive_Score ?? "",
        insuranceLeadsScoringTouchPointScore: crmResp?.Insurance_Leads_Scoring_Touch_Point_Score ?? "",
        insuranceLeadScoringNegativeScore: crmResp?.Insurence_Leads_Scoring_Negative_Score ?? "",
        insuranceLeadScoringScore: crmResp?.Insurance_Leads_Scoring_Score ?? "",
        insuranceLeadPositiveTouchScoringScore: crmResp?.Positive_Touch_Point_Score	 ?? "",
        insuranceLeadNegativeTouchScoringScore: crmResp?.Negative_Touch_Point_Score ?? "",
        coverageLokkingFor: crmResp?.Coverage_you_are_Looking_for ?? "",
        roundRobinAssignmentTime: crmResp?.advancedroundrobin__Round_Robin_Assignment_Time	 ?? "",
        genderPredication: crmResp?.Gender_Predication ?? "",
        //nextFollowUpDateTime: await dateTimeFormat(crmResp?.Next_Follow_Up_Date_Time) ?? null,
        dob: new Date(crmResp?.Date_of_Birth) ?? null,
        leadCreatedOn: crmResp?.Lead_Created_On ?? "",
        combinationHybird: crmResp?.Combination_or_Hybrid_Insurance ?? false,
        roundRobinProcessed1: crmResp?.Round_Robin_Processed1 ?? false,
        emailRoundRobinOwner2: crmResp?.Email_Round_Robin_Owner2 ?? false,
        eligibleRoundRobinOwnerFound1: crmResp?.Eligible_Round_Robin_Owner_Found1 ?? false,
        rerunroundrobin: crmResp?.advancedroundrobin__Re_run_round_robin	 ?? false,
        healthAndDentalInsurance: crmResp?.	Health_Dental_Insurance ?? false,
        rCSMSOptOut: crmResp?.multiuserringcentralmessagingextension__RC_SMS_Opt_Out ?? false,
        adAccount: crmResp?.Ad_Account ?? "",
        adAccountId: crmResp?.Ad_Account_ID ?? "",
        adCampaign: crmResp?.Ad_Campaign ?? "",
        adCampaignId: crmResp?.Ad_Campaign_ID ?? "",
        faceBookPage: crmResp?.	FaceBook_Page ?? "",
        faceBookPageId: crmResp?.FaceBook_Page_ID ?? "",
        costPerLead: crmResp?.Cost_Per_Lead_CPL ?? "",
        adSet: crmResp?.Ad_Set ?? "",
        adSetId: crmResp?.Ad_Set_ID ?? "",
        facebookAd: crmResp?.FaceBook_Ad ?? "",
        adId: crmResp?.Ad_ID ?? "",
        leadForm: crmResp?.Lead_Form ?? "",
        leadFormId: crmResp?.Lead_Form_ID ?? "",
        skypeID: crmResp?.Skype_ID ?? "",
        instagramID: crmResp?.Instagram ?? "",
        linkedin1: crmResp?.Linked_In ?? "",
        fb1: crmResp?.FaceBook1 ?? "",
        twitter1: crmResp?.Twitter1 ?? "",
        facebook: crmResp?.FaceBook ?? "",
        twitter: crmResp?.Twitter ?? "",
        linkedIn: crmResp?.Linked_In ?? "",
        googleReview: crmResp?.Google_Review ?? "",
        youtubeVedio: crmResp?.Google_Review_Video ?? "",
        netWorth: crmResp?.Net_Worth ?? "",
        addContactInfo: crmResp?.Additional_Contact_Information ?? false,
        gender: crmResp?.Gender ?? "",
        genderprediction: crmResp?.Gender_Predication ?? "",
        doYouHaveLifeInsurance: crmResp?.Do_you_have_life_insurance	 ?? "",
        existingInsurancePolicy: crmResp?.Existing_Insurance_Policy_2 ?? "",
        serviceRequested: crmResp?.New_Service_Requested ?? "",
        citizenshipStatus: crmResp?.Citizenship_Status1 ?? "",
        groupInsurance: crmResp?.Group_Insurance ?? "",
        referredBy: crmResp?.Referred_by ?? "",
        understandingOfInsurance: crmResp?.Understanding_of_Insurance ?? "",
        doYouOwnHomeInCanada: crmResp?.Do_you_own_a_home_in_Canada ?? "",
        referralSource: crmResp?.Referral_Source ?? "",
        preferredContactTime: crmResp?.Preferred_Contact_Time ?? "",
        preferredContact: crmResp?.Preferred_Contact_Method ?? "",
        loanProtection: crmResp?.Loan_Protection ?? "",
        isthisaReassignment: crmResp?.Is_this_a_Reassignment ?? "",
        socialMediaInfo: crmResp?.Social_Media_Information ?? "",
        fbAdInfo: crmResp?.Facebook_Ad_Information ?? "",
        travelInsurance: crmResp?.Travel_Insurance ?? "",
        investment: crmResp?.Investments ?? "",
        lifeInsurance: crmResp?.Life_Insurance ?? "",

        // <<<<<<<< ADDRESS >>>>>>>
        mailingStreet: crmResp?.Mailing_Street ?? null,
        mailingCity: crmResp?.Mailing_City ?? null,
        mailingState: crmResp?.Mailing_State ?? null,
        mailingPostalCode: crmResp?.Mailing_Zip ?? null,
        mailingCountry: crmResp?.	Mailing_Country ?? null,
        street: crmResp?.Street ?? null,
        city: crmResp?.City ?? null,
        // <<<<<<< Advisor details >>>>>>>>>>
        teamLeg: crmResp?.Hire_Team_Leg ?? "",
        // reviewedDate: new Date(crmResp?.reviewedDate) ?? null,
        generationNumber: crmResp?.Team_Generation_Number ?? "",       
        organizationLevel: crmResp?.Organization_Level ?? "",
        teamName: crmResp?.Team_Name ?? "",
        employmentType: crmResp?.Employment_Type ?? "",        
        bonusLevel: crmResp?.Bonus_Level ?? "",         
        // insurancePartner: crmResp?.Vendor_Name ?? "",
    }
}
async function getFamilyTree(crmResp) {
    const familyTree = {};
    familyTree.relationShipStatus = crmResp.Marital_Status ?? "";
    familyTree.dependentParents = crmResp.Any_Dependent_Parents ?? "";
    familyTree.dependentChildren = crmResp.Any_Dependent_Children ?? "";
    familyTree.siblings = crmResp.Siblings ?? "";
    familyTree.numberOfDependentChildren = crmResp.Number_of_Dependents ?? "";
    familyTree.numberOfDependentParents = crmResp.Number_of_Dependent_Parents ?? "";
    familyTree.numberOfSiblings = crmResp.Number_of_Siblings ?? "";
    familyTree.depChildren= crmResp?.Any_Dependent_Children ?? "";
    familyTree.depSiblings= crmResp?.Siblings ?? "";
    familyTree.depParents= crmResp?.Number_of_Dependents	 ?? "";
    if (crmResp.Marital_Status === "Married") {
        familyTree.nameOfSpouse = crmResp.Name_of_Spouse ?? "";
        familyTree.anniversaryDate = crmResp.Anniversary_Date ?? "";
        familyTree.spouseDateOfBirth = crmResp.Spouse_s_Date_of_Birth ?? "";
        familyTree.emailOfSpouse = crmResp.Spouse_s_Email ?? "";
        familyTree.phoneOfSpouse = crmResp.Spouse_s_Phone ?? "";
    } else if (crmResp.depParents === "Comman Law") {
        familyTree.nameOfCommonLawPartner = crmResp.Name_of_Common_Law_Partner ?? "";
        familyTree.commonLawDateOfBirth = crmResp.Common_Law_Partner_s_Date_of_Birth ?? "";
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
                phone: crmResp?.Phone_Child_1 ?? ""
            });
        }
        if (numDependents >= 2) {
            childersList.push({
                relationship: crmResp?.Relationship_Child_1 ?? "",
                name: crmResp?.Name_of_Child_2 ?? "",
                dob: crmResp?.Date_of_Birth_Child_2 ?? "",
                email: crmResp?.Email_Child_2 ?? "",
                phone: crmResp?.Phone_Child_2 ?? ""
            });
        }
        if (numDependents >= 3) {
            childersList.push({
                relationship: crmResp?.Relationship_Child_2 ?? "",
                name: crmResp?.Name_of_Child_3 ?? "",
                dob: crmResp?.Date_of_Birth_Child_3 ?? "",
                email: crmResp?.Email_Child_3 ?? "",
                phone: crmResp?.Phone_Child_3 ?? ""
            });
        }
        if (numDependents >= 4) {
        childersList.push({
            relationship: crmResp?.Relationship_Child_3 ?? "",
            name: crmResp?.Name_of_Child_4 ?? "",
            dob: crmResp?.Date_of_Birth_Child_4 ?? "",
            email: crmResp?.Email_Child_4 ?? "",
            phone: crmResp?.Phone_Child_4 ?? ""
        });
    }
    if (numDependents >= 5) {
        childersList.push({
            relationship: crmResp?.Relationship_Child_4 ?? "",
            name: crmResp?.Name_of_Child_5 ?? "",
            dob: crmResp?.Date_of_Birth_Child_5 ?? "",
            email: crmResp?.Email_Child_5 ?? "",
            phone: crmResp?.Phone_Child_5 ?? ""
        });
    }
    if (numDependents >= 6) {
    childersList.push({
        relationship: crmResp?.Relationship_Child_5 ?? "",
        name: crmResp?.Name_of_Child_6 ?? "",
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

    if (crmResp.Any_Dependent_Parents === "Yes") {
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
                name: crmResp?.Name_of_Parent_2 ?? "",
                dob: crmResp?.Date_of_Birth_Parent_2 ?? "",
                email: crmResp?.Email_of_Parent_2 ?? "",
                phone: crmResp?.Phone_of_Parent_2 ?? ""
            });
        }
        if (numDependentParents >= 3) {
            parentsList.push({
                relationship: crmResp?.Relationship_Parent_3 ?? "",
                name: crmResp?.Name_of_Parent_3 ?? "",
                dob: crmResp?.Date_of_Birth_Parent_3 ?? "",
                email: crmResp?.Email_of_Parent_3 ?? "",
                phone: crmResp?.Phone_of_Parent_3 ?? ""
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
                phone: crmResp?.Phone_of_Sibling_1 ?? ""
            });
        }
        if (numSiblings >= 2) {
            siblingList.push({
                relationship: crmResp?.Relationship_Sibling_2 ?? "",
                name: crmResp?.Name_of_Sibling_2 ?? "",
                dob: crmResp?.Date_of_Birth_Sibling_2 ?? "",
                email: crmResp?.Email_of_Sibling_2 ?? "",
                phone: crmResp?.Phone_of_Sibling_2 ?? ""
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
    if(crmResp.Name1 === null && crmResp.Phone_of_Emergency_Contact === null && crmResp.Relationship === null && crmResp.Email_of_Emergency_Contact === null){
    return [];
    }
    return [{
        emergencyContactName: crmResp?.Name1 ?? "",
        emergencyContactPhone: crmResp?.Phone_of_Emergency_Contact ?? "",
        emergencyContactRelationship: crmResp?.Relationship ?? "",
        emergencyContactEmail: crmResp?.Email_of_Emergency_Contact ?? ""
    }];
}
async function getFestivalStats(crmResp) {
    let felivalList = [];
    let fetivalArr = [
    "Date_for_Canada_Day", "Date_for_Eid", "Date_for_Victoria_Day", "Date_for_Bakr_Eid", "Date_for_Family_Day", "Date_for_Holi",
    "Date_for_Father_s_Day", "Date_for_Dussehra", "Date_for_Mother_s_Day", "Diwali", "Thanksgiving", 
    "Date_for_Raksha_Bandhan", "Date_for_Christmas", "Date_for_Guru_Nanak_Jayanti", "New Year", 
    "Date_for_Guru_Gobind_Singh_Jayanti", "Date_for_Lohri", "Date_for_Guru_Granth_Sahib_Prakash_Divas", 
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
// async function getLeadManagementHistory(crmResp) {
//     const historyList = [];

//     crmResp.Lead_Management_History?.forEach(leadHtryObj => {
//         const leadHtryMap = {
//             interactionType: leadHtryObj?.Interaction_Type ?? "",
//             dateOfInteraction: leadHtryObj?.Date_Time_of_Interaction ?? "",
//             timeSpent: leadHtryObj?.Time_Spent_mins ?? 0,
//             contactAttempt: leadHtryObj?.Contact_Attempt ?? 0,
//             probabilityOfClosure: leadHtryObj?.Probability_of_Closure ?? 0,
//             comments: leadHtryObj?.Comments ?? "",
//             interactionOutcome: leadHtryObj?.Interaction_Outcome ?? ""
//         };
//         historyList.push(leadHtryMap);
//     });

//     return historyList;
// }
async function getFycData(crmResp) {
    const crmArray = Array.isArray(crmResp) ? crmResp : [crmResp];
    const policyOwnershipArr = crmArray.flatMap(fycs => {
        return [
            fycs.Year_1_Annual_Commission != null && { year: 2020, fyc: parseFloat(fycs.Year_1_Annual_Commission) },
            fycs.Year_2_Annual_Commission != null && { year: 2021, fyc: parseFloat(fycs.Year_2_Annual_Commission) },
            fycs.Year_3_Annual_Commission != null && { year: 2022, fyc: parseFloat(fycs.Year_3_Annual_Commission) },
            fycs.Year_2023_FYC != null && { year: 2023, fyc: parseFloat(fycs.Year_2023_FYC) },
            fycs.Year_2024_FYC != null && { year: 2024, fyc: parseFloat(fycs.Year_2024_FYC) },
            fycs.FYC != null && { year: 2025, fyc: fycs.FYC }
        ].filter(Boolean);
    });
    return policyOwnershipArr; 
}
async function bonusTrackerData(crmResp) {
    const crmArray = Array.isArray(crmResp) ? crmResp : [crmResp];
    const trackerArr = crmArray.flatMap(bonus => {
        return [
            bonus.Bonus_Amount6 != null && { year: 2020, bonusAmount: parseFloat(bonus.Bonus_Amount6) },
            bonus.Bonus_Amount != null && { year: 2021, bonusAmount: parseFloat(bonus.Bonus_Amount) },
            bonus.Bonus_Amount1 != null && { year: 2022, bonusAmount: parseFloat(bonus.Bonus_Amount1) },
            bonus.Bonus_Amount2 != null && { year: 2023, bonusAmount: parseFloat(bonus.Bonus_Amount2)},
            bonus.Bonus_Amount3 != null && { year: 2024, bonusAmount: parseFloat(bonus.Bonus_Amount3) },
            bonus.Bonus_Amount4 != null && { year: 2025, bonusAmount: parseFloat(bonus.Bonus_Amount4) },
        ].filter(Boolean);
    });
    return trackerArr; 
}

module.exports = {
  parseContactsData
}