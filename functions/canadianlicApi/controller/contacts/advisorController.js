const catalyst = require("zcatalyst-sdk-node");
const queries = require("../../SQL/query");
const {
    insertData,
    insertSubformData,
    dateTimeFormat,
    updateData,
    updateSubformData,
  } = require("../../Utils/util");

  const {getSequence,updateSequence} = require("../../Utils/sequenceUtils");


const {generateToken,dataSyncZcrm} =  require("../crmIntegration/contactAdvisorCrmIntegration");
  exports.testConntection = async (req, res) => {
    res.status(200).json({ success: true, message: "I am live" });
};

// <<<<<<<<<<<<<<<<< GET ADVISOR >>>>>>>>>>>>>>>>>
exports.advisorRelatedData = async (req, res) => {
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  const rowId = req.params.id || req.body.rowId || req.query.rowId;
  let moduleArr = ["dependentChildren", "dependentParents", "contactsSiblings", "contactEmergencyDetails", "festivals", "advisorFyc", "advisorBonus"];
  try {
    let advisorDetails = await fetchMainModules(adminApp, rowId);
    let {dependentChildrenArr, dependentParentsArr, contactsSiblingsArr,contactEmergencyDetailsArr,festivalsArr,advisorFycArr, advisorBonusArr} =
      await fetchSubModules(adminApp, rowId, moduleArr);
    res.status(200).json({
      success: true,
      message: "Advisor data fetched successfully",
      advisorDetails: {
        ...advisorDetails,
        dependentChildren: dependentChildrenArr,
        dependentParents: dependentParentsArr,
        contactsSiblings: contactsSiblingsArr,
        contactEmergencyDetails: contactEmergencyDetailsArr,
        festivals: festivalsArr,
        advisorFyc:advisorFycArr,
        advisorBonus: advisorBonusArr,
      },
    });
  } catch (error) {
    console.error("Error fetching Advisor data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Advisor data",
      error: error.message || error,
    });
  }
};

// <<<<<<<<<<<<< CREATE NEW ADVISOR >>>>>>>>>>>>>>>

exports.createContactAdvisor = async (req, res) => {
  const { leadInfo, address, familyTree, advisorFYC, festival, basicInfo, advisorDetails, layout} = req.body;
        
    try {
      // <<<<<<<<< CATALYST SCOPE >>>>>>>>>>
      const catalystApp = catalyst.initialize(req, { scope: "admin" });

      //<<<<<<< INSERT ADVISOR INFORMATION >>>>>>>
      const advisorsData = await parseadvisorsData(basicInfo,festival,address,advisorDetails,leadInfo,layout);
       // SEQUENCE CODE
      const sequenceResp = await getSequence(req,"advisors");
      let sequence =  sequenceResp?.data
      let appAdvisorId = `${sequence?.prefix}-${sequence?.sequence.padStart(5,'0')}`;
      advisorsData.appAdvisorId = appAdvisorId;

      const advisorId = await insertData(catalystApp, "advisors", advisorsData); 
          // UPDATE SEQUENCE
      await updateSequence(req,sequence?.rowId,parseInt(sequence.sequence) + 1);
    
      const leadInfosData = await parseAdvisorSubDetailsData(leadInfo,address,advisorDetails,advisorId);
      const familyTreeData = await parseFamilyTree(familyTree,advisorId);
      const advisorSubDetailsId = await insertData(catalystApp, "advisorSubDetails", leadInfosData);
      const familyTreeId = await insertData(catalystApp, "familyTree", familyTreeData);


      //<<<<<<< INSERT ADVISOR RELATED INFORMATION >>>>>>>
      const { updateArray: updatefamilyTree = [], insertArray: insertdependentParents = [] } =  await processSubform(familyTree?.dependentParentsData, advisorId, "dependentParents") || {};
      const { updateArray: updateDependentChildren = [], insertArray: insertDependentChildren = [] } =  await processSubform(familyTree?.dependentChildrenData, advisorId, "dependentChildren") || {};
      const { updateArray: updateSibling = [], insertArray: insertSibling = [] } =  await processSubform(familyTree?.siblingData, advisorId, "sibling") || {};
      const { updateArray: updateContactEmergencyDetails = [], insertArray: insertContactEmergencyDetails = [] } =  await processSubform(familyTree?.emergencyContactData, advisorId, "emergencyContact") || {};
      const { updateArray: updateFestivals = [], insertArray: insertfestivals = [] } =  await processSubform(festival?.festivalsData, advisorId, "festivals") || {};
      const { updateArray: updateAdvisorFYC = [], insertArray: insertAdvisorFYC = [] } =  await processSubform(advisorFYC?.advisorFycData, advisorId, "advisorFYC") || {};
      const { updateArray: updateAdvisorBonus = [], insertArray: insertadvisorBonus = [] } =  await processSubform(advisorFYC?.advisorBonusData, advisorId, "advisorBonus") || {};
      
      const dependentParentsId = insertdependentParents.length > 0 ?await insertSubformData(catalystApp,"dependentParents",insertdependentParents):[];
      const insertDependentChildrenId = insertDependentChildren.length > 0 ?await insertSubformData(catalystApp,"dependentChildren",insertDependentChildren):[];
      const insertSiblingId = insertSibling.length > 0 ?await insertSubformData(catalystApp,"contactsSiblings",insertSibling):[];
      const insertContactEmergencyDetailsId = insertContactEmergencyDetails.length > 0 ?await insertSubformData(catalystApp,"contactEmergencyDetails",insertContactEmergencyDetails):[];
      const insertfestivalsId = insertfestivals.length > 0 ?await insertSubformData(catalystApp,"festivals",insertfestivals):[];
      const insertadvisorFycId = insertAdvisorFYC.length > 0 ?await insertSubformData(catalystApp,"advisorFyc",insertAdvisorFYC):[];
      const insertadvisorBonusId = insertadvisorBonus.length > 0 ?await insertSubformData(catalystApp,"advisorBonus",insertadvisorBonus):[];
      // ***************** SYNC DATA IN ZOHO CRM ******************
      const token = await generateToken();
      const crmId = await dataSyncZcrm(token,{leadInfo, address, familyTree, advisorFYC, festival, basicInfo, advisorDetails, layout,ROWID:advisorId});
      await catalystApp.datastore().table("advisors").updateRow({sourceId:crmId,source:"catalyst",ROWID:advisorId});
      console.log("crmID ====>", crmId);
      // ***************** SYNC DATA IN ZOHO CRM ******************
      res.status(201).json({
        success: true,
        message: "Policy and associated records created successfully",
        policys: {
          advisor: advisorId,
          leadInfo: advisorSubDetailsId,
          familyTreeId:familyTreeId,
          dependentParentsId: dependentParentsId,
          insertDependentChildrenId:insertDependentChildrenId,
          insertSiblingId:insertSiblingId,
          insertContactEmergencyDetailsId:insertContactEmergencyDetailsId,
          insertfestivalsId:insertfestivalsId,
          insertadvisorFycId:insertadvisorFycId,
          insertadvisorBonusId:insertadvisorBonusId
        },
      });
  } catch (error) {
    console.error("Error creating Advisor:", error);
    res.status(409).json({
      success: false,
      message: "Failed to create Advisor",
      error: error,
    });
  }  
};

exports.updateContactAdvisor = async (req, res) => {
  const { leadInfo, address, familyTree, advisorFYC, festival, basicInfo, advisorDetails, layout} = req.body;
  const rowId = req.params.id;
    try {
      // <<<<<<<<< CATALYST SCOPE >>>>>>>>>>
      const catalystApp = catalyst.initialize(req, { scope: "admin" });

      //<<<<<<< INSERT ADVISOR INFORMATION >>>>>>>
      const advisorsDataFieldsWithValues = await parseadvisorsData(basicInfo,festival,address,advisorDetails,leadInfo,layout);
      const advisorsData = Object.fromEntries(
        Object.entries(advisorsDataFieldsWithValues).filter(([key, value]) => value !== "" && value !== null)
      );
      const advisorId = await updateData(catalystApp, "advisors", {...advisorsData, ROWID:rowId}); 

      const leadInfosDataFieldsWithValues = await parseAdvisorSubDetailsData(leadInfo,address,advisorDetails,advisorId);
      const leadInfosData = Object.fromEntries(
        Object.entries(leadInfosDataFieldsWithValues).filter(([key, value]) => value !== "" && value !== null)
      );
      const familyTreeDataFieldsWithValues = await parseFamilyTree(familyTree,advisorId);
      const familyTreeData = Object.fromEntries(
        Object.entries(familyTreeDataFieldsWithValues).filter(([key, value]) => value !== "" && value !== null)
      );
      const advisorSubDetailsId = await updateData(catalystApp, "advisorSubDetails", {...leadInfosData, ROWID:leadInfo.ROWID});
      const familyTreeId = await updateData(catalystApp, "familyTree", {...familyTreeData, ROWID:familyTree.ROWID});


      //<<<<<<< INSERT ADVISOR RELATED INFORMATION >>>>>>>
      const { updateArray: updateDependentParents = [], insertArray: insertdependentParents = [] } =  await processSubform(familyTree?.dependentParentsData, advisorId, "dependentParents") || {};
      const { updateArray: updateDependentChildren = [], insertArray: insertDependentChildren = [] } =  await processSubform(familyTree?.dependentChildrenData, advisorId, "dependentChildren") || {};
      const { updateArray: updateSibling = [], insertArray: insertSibling = [] } =  await processSubform(familyTree?.siblingData, advisorId, "sibling") || {};
      const { updateArray: updateContactEmergencyDetails = [], insertArray: insertContactEmergencyDetails = [] } =  await processSubform(familyTree?.emergencyContactData, advisorId, "emergencyContact") || {};
      const { updateArray: updateFestivals = [], insertArray: insertfestivals = [] } =  await processSubform(festival?.festivalsData, advisorId, "festivals") || {};
      const { updateArray: updateAdvisorFYC = [], insertArray: insertAdvisorFYC = [] } =  await processSubform(advisorFYC?.advisorFycData, advisorId, "advisorFYC") || {};
      const { updateArray: updateAdvisorBonus = [], insertArray: insertadvisorBonus = [] } =  await processSubform(advisorFYC?.advisorBonusData, advisorId, "advisorBonus") || {};
      
      const dependentParentsId = insertdependentParents.length > 0 ?await insertSubformData(catalystApp,"dependentParents",insertdependentParents):[];
      const insertDependentChildrenId = insertDependentChildren.length > 0 ?await insertSubformData(catalystApp,"dependentChildren",insertDependentChildren):[];
      const insertSiblingId = insertSibling.length > 0 ?await insertSubformData(catalystApp,"contactsSiblings",insertSibling):[];
      const insertContactEmergencyDetailsId = insertContactEmergencyDetails.length > 0 ?await insertSubformData(catalystApp,"contactEmergencyDetails",insertContactEmergencyDetails):[];
      const insertfestivalsId = insertfestivals.length > 0 ?await insertSubformData(catalystApp,"festivals",insertfestivals):[];
      const insertadvisorFycId = insertAdvisorFYC.length > 0 ?await insertSubformData(catalystApp,"advisorFyc",insertAdvisorFYC):[];
      const insertadvisorBonusId = insertadvisorBonus.length > 0 ?await insertSubformData(catalystApp,"advisorBonus",insertadvisorBonus):[];
      
      const updateDependentParentsId = updateDependentParents.length > 0 ?await updateSubformData(catalystApp,"dependentParents",updateDependentParents):[];
      const updateDependentChildrenId = updateDependentChildren.length > 0 ?await updateSubformData(catalystApp,"dependentChildren",updateDependentChildren):[];
      const updateSiblingId = updateSibling.length > 0 ?await updateSubformData(catalystApp,"contactsSiblings",updateSibling):[];
      const updateContactEmergencyDetailsId = updateContactEmergencyDetails.length > 0 ?await updateSubformData(catalystApp,"contactEmergencyDetails",updateContactEmergencyDetails):[];
      const updateFestivalsId = updateFestivals.length > 0 ?await updateSubformData(catalystApp,"festivals",updateFestivals):[];
      const updateAdvisorFycId = updateAdvisorFYC.length > 0 ?await updateSubformData(catalystApp,"advisorFyc",updateAdvisorFYC):[];
      const updateAdvisorBonusId = updateAdvisorBonus.length > 0 ?await updateSubformData(catalystApp,"advisorBonus",updateAdvisorBonus):[];
      // ***********CRM UPDATE FUNCTION*******************
      const token = await generateToken();
      crmId = await dataSyncZcrm(token,{leadInfo, address, familyTree, advisorFYC, festival, basicInfo, advisorDetails, layout},req.body?.advisorDetails?.sourceId);
      // ******************************
      res.status(201).json({
        success: true,
        message: "Policy and associated records created successfully",
        policys: {
          advisor: advisorId,
          leadInfo: advisorSubDetailsId,
          familyTreeId:familyTreeId,
          dependentParentsId: dependentParentsId,
          insertDependentChildrenId:insertDependentChildrenId,
          insertSiblingId:insertSiblingId,
          insertContactEmergencyDetailsId:insertContactEmergencyDetailsId,
          insertfestivalsId:insertfestivalsId,
          insertadvisorFycId:insertadvisorFycId,
          insertadvisorBonusId:insertadvisorBonusId,
          updateDependentParentsId:updateDependentParentsId,
          updateDependentChildrenId:updateDependentChildrenId,
          updateSiblingId:updateSiblingId,
          updateContactEmergencyDetailsId:updateContactEmergencyDetailsId,
          updateFestivalsId:updateFestivalsId,
          updateAdvisorFycId:updateAdvisorFycId,
          updateAdvisorBonusId:updateAdvisorBonusId,

        },
      });
  } catch (error) {
    console.error("Error creating Advisor:", error);
    res.status(409).json({
      success: false,
      message: "Failed to create Advisor",
      error: error,
    });
  }  
};

exports.countContactAdvisor = async (req, res) => {
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  let countQuery = "SELECT COUNT(ROWID) FROM advisors";
  try {
      const response = await adminApp.zcql().executeZCQLQuery(countQuery);
      let data = JSON.parse(JSON.stringify(response).replace("COUNT(ROWID)", "total"));
      const total = data?.[0]?.advisors?.total;
      res.status(200).json({
          success: true,
          message: "Contact Advisor Count Fetched Successfully",
          count: total
      });
  } catch (error) {
      res.status(409).json({
          success: false,
          message: "Contact Advisor Count Fetch Issue",
          error: error
      });
  }
}

async function processSubform(subformArray, rowId, type) {
  if (!subformArray) {
    return { updateArray: [], insertArray: [] };
  }

  const updateArray = [];
  const insertArray = [];

  subformArray.forEach((item) => {
    const subformObject = {
      advisorId: rowId,
      ROWID: item.ROWID ?? null,
      ...getSubformFields(item, type), // Merge fields based on type
    };

    if (item.ROWID) {
      updateArray.push(subformObject);
    } else {
      delete subformObject.ROWID;
      insertArray.push(subformObject);
    }
  });

  return { updateArray, insertArray };
}  
function getSubformFields(item, type) {
  switch (type) {      
    case "dependentParents":
      return {
        relationship: item?.relationship ?? "",
        name: item?.name ?? "",
        dob: item?.dob ?? "",
        email: item?.email ?? "",
        phone: item?.phone ?? "",
        age: item?.age ?? "",        
      };
    case "dependentChildren":
      return {
        relationship: item?.relationship ?? "",
        name: item?.name ?? "",
        dob: item?.dob ?? "",
        email: item?.email ?? "",
        phone: item?.phone ?? "",
        age: item?.age ?? "",
        
      };      
    case "sibling":
      return {
        relationship: item?.relationship ?? "",
        name: item?.name ?? "",
        dob: item?.dob ?? "",
        email: item?.email ?? "",
        phone: item?.phone ?? "",
        age: item?.age ?? "",
        
      };
    case "festivals":
      return {
        festivalName: item?.festivalName ?? "",
        dateOfFestival: new Date(item.dateOfFestival)?? null,
        
      };
    case "emergencyContact":
      return {
        emergencyContactEmail: item?.emergencyContactEmail ?? "",
        emergencyContactRelationship: item?.emergencyContactRelationship ?? "",
        emergencyContactPhone: item?.emergencyContactPhone ?? "",
        contactAttempt: item?.contactAttempt ?? "",
        emergencyContactName: item?.emergencyContactName ?? "",
        
      };      
    case "advisorBonus":
      return {
        year: item?.year ?? "",
        bonusAmount: parseFloat(item?.bonusAmount) ?? "",
        bonusAmount2020: item?.bonusAmount2020 ?? "",
        
      };      
    case "advisorFYC":
      return {
        year: item?.year ?? "",
        fyc: parseFloat(item?.fyc) ?? "",
        
      };      
    
    default:
      return {}; // Default case if type is not recognized
  }
}
async function fetchMainModules(catalystApp, id) {
  let query = `${queries.getAdvisorData} ${id}`;
  console.log("====", query);
  let advisorDetails = await catalystApp.zcql().executeZCQLQuery(query);
  if (!advisorDetails || advisorDetails.length === 0) {
    return {};
  } else {
    return ({ advisors, advisorSubDetails,familyTree } = advisorDetails[0]);
  }  
}
async function fetchSubModules(catalystApp, id, moduleArr) {
  const queryMap = {
    dependentChildren: `${queries.getDependentChildren} ${id}`,
    dependentParents: `${queries.getDependentParents} ${id}`,
    contactsSiblings: `${queries.getSiblings} ${id}`,
    contactEmergencyDetails: `${queries.getEmergencyDetails} ${id}`,
    festivals: `${queries.getFestivals} ${id}`,
    advisorFyc: `${queries.getAdvisorFyc} ${id}`,
    advisorBonus: `${queries.getAdvisorBonus} ${id}`,
  };
  try {
    const fetchPromises = moduleArr.map(async (module) => {
      const query = queryMap[module];
      const response = await catalystApp.zcql().executeZCQLQuery(query);
      return response.map((item) => item[module]);
    });

    const [dependentChildrenArr, dependentParentsArr, contactsSiblingsArr,contactEmergencyDetailsArr,festivalsArr,advisorFycArr, advisorBonusArr] =
      await Promise.all(fetchPromises);

    return { dependentChildrenArr, dependentParentsArr, contactsSiblingsArr,contactEmergencyDetailsArr,festivalsArr,advisorFycArr, advisorBonusArr };
  } catch (error) {
    console.error("Error fetching sub-modules:", error);
    throw error;
  }
}
async function parseadvisorsData(basicInfo,festival,address,advisorDetails,leadInfo,layout) {
  return{
    layout: layout??"",
    firstName: basicInfo?.firstName ?? "",
    lastName: basicInfo?.lastName ?? "",
    mobile: basicInfo?.mobile ?? "",
    email: basicInfo?.email ?? "",
    landline: basicInfo?.landline ?? "",
    advisorLeadSource: basicInfo?.advisorLeadSource ?? "",
    advisorsLicenceNumber: basicInfo?.advisorsLicenceNumber ?? null,
    whatsapp: basicInfo?.whatsapp ?? "",
    appAdvisorId: basicInfo?.appAdvisorId ?? "",
    ciprNumber: basicInfo?.ciprNumber ?? "",
    advisorsDateofBirth: basicInfo?.advisorsDateofBirth ? new Date(basicInfo.advisorsDateofBirth) : null,
    reviewedason: new Date(basicInfo?.reviewedason) ?? null,
    cessationDate: basicInfo?.cessationDate ? new Date(basicInfo.cessationDate) : null,
    dateOfHire: basicInfo?.dateOfHire ? new Date(basicInfo.dateOfHire) : null,
    appID: basicInfo?.appID ?? "",
    myCalendar: basicInfo?.myCalendar ?? "",
    eoPolicyNumber: basicInfo?.eoPolicyNumber ?? "",
    additionalContactInformation: basicInfo?.additionalContactInformation ?? false,
    isSocial: basicInfo?.isSocial ?? false,
    inactiveAdvisor: basicInfo?.inactiveAdvisor ?? false,
    emailOptOut: basicInfo?.emailOptOut ?? false,
    removeFromCampaign: basicInfo?.removeFromCampaign ?? false,
    advisorOwner: basicInfo?.advisorOwner ?? "",
    location: basicInfo?.location ?? null,
    vendor: basicInfo?.vendor ?? "",
    assignedAdvisor: basicInfo?.assignedAdvisor ?? null,
    status: basicInfo?.status ?? "",
    //  <<<<<<<<<<<< Festivities >>>>>>>>>>>
    religion: festival?.religion ?? "",
    celebratedFestivals: festival?.celebratedFestivals ?? "",
    //<<<<<<<<<<< Address >>>>>>>> 
    state: address?.state ?? "",
    country: address?.country ?? "",
    postalCode: address?.postalCode ?? "",
    // <<<<<<<<< ADVISOR DETAILS >>>>>>>>>
    hireTeamName: advisorDetails?.hireTeamName ?? "",
    hireTeamLeg: advisorDetails?.hireTeamLeg ?? "",
    teamGenerationNumber: advisorDetails?.teamGenerationNumber ?? "",
    catalystId: advisorDetails?.catalystId ?? "",
    description: advisorDetails?.description ?? "",
    hireLevel: advisorDetails?.hireLevel ?? "",
    hireType: advisorDetails?.hireType ?? "", 
    supervisaPayout: advisorDetails?.supervisaPayout ?? "",
    premiumPercentage: advisorDetails?.premiumPercentage ?? "",
    fycPercentage: advisorDetails?.fycPercentage ?? "",

    productCataegory: leadInfo?.productCataegory ?? "",
    livingBenefits: leadInfo?.livingBenefits ?? "",
    oldLeadDatabase: leadInfo?.oldLeadDatabase ?? "",
    location2: leadInfo?.location2 ?? null,
    emailIsValid: leadInfo?.emailIsValid ?? "",


  }
}
async function parseAdvisorSubDetailsData(leadInfo,address,advisorDetails,ROWID ) {
  return{
    advisorId: ROWID,
      bestTimeToCall: leadInfo?.bestTimeToCall ?? "",
      referralNameClient: leadInfo?.referralNameClient ?? "",
      ifreferredbyAdvisor: leadInfo?.ifreferredbyAdvisor ?? "",
      existingPolicyRenewalDueBy: leadInfo?.existingPolicyRenewalDueBy ?? "",
      submitPageUrl: leadInfo?.submitPageUrl ?? "",
      assignedCampaigns: leadInfo?.assignedCampaigns ?? "",
      potentialBusiness: leadInfo?.potentialBusiness ?? "",
      insuranceLeadScoringPositiveScore: leadInfo?.insuranceLeadScoringPositiveScore ?? "",
      insuranceLeadsScoringTouchPointScore: leadInfo?.insuranceLeadsScoringTouchPointScore ?? "",
      insuranceLeadScoringNegativeScore: leadInfo?.insuranceLeadScoringNegativeScore ?? "",
      insuranceLeadScoringScore: leadInfo?.insuranceLeadScoringScore ?? "",
      insuranceLeadPositiveTouchScoringScore: leadInfo?.insuranceLeadPositiveTouchScoringScore ?? "",
      insuranceLeadNegativeTouchScoringScore: leadInfo?.insuranceLeadNegativeTouchScoringScore ?? "",
      coverageLokkingFor: leadInfo?.coverageLokkingFor ?? "",
      roundRobinAssignmentTime: leadInfo?.roundRobinAssignmentTime ?? "",
      genderPredication: leadInfo?.genderPredication ?? "",
      nextFollowUpDateTime: await dateTimeFormat(leadInfo?.nextFollowUpDateTime) ?? null,
      dob: new Date(leadInfo?.dob) ?? null,
      leadCreatedOn: leadInfo?.leadCreatedOn ?? "",
      combinationHybird: leadInfo?.combinationHybird ?? false,
      roundRobinProcessed1: leadInfo?.roundRobinProcessed1 ?? false,
      emailRoundRobinOwner2: leadInfo?.emailRoundRobinOwner2 ?? false,
      eligibleRoundRobinOwnerFound1: leadInfo?.eligibleRoundRobinOwnerFound1 ?? false,
      rerunroundrobin: leadInfo?.rerunroundrobin ?? false,
      healthAndDentalInsurance: leadInfo?.healthAndDentalInsurance ?? false,
      rCSMSOptOut: leadInfo?.rCSMSOptOut ?? false,
      adAccount: leadInfo?.adAccount ?? "",
      adAccountId: leadInfo?.adAccountId ?? "",
      adCampaign: leadInfo?.adCampaign ?? "",
      adCampaignId: leadInfo?.adCampaignId ?? "",
      faceBookPage: leadInfo?.faceBookPage ?? "",
      faceBookPageId: leadInfo?.faceBookPageId ?? "",
      costPerLead: leadInfo?.costPerLead ?? "",
      adSet: leadInfo?.adSet ?? "",
      adSetId: leadInfo?.adSetId ?? "",
      facebookAd: leadInfo?.facebookAd ?? "",
      adId: leadInfo?.adId ?? "",
      leadForm: leadInfo?.leadForm ?? "",
      leadFormId: leadInfo?.leadFormId ?? "",
      skypeID: leadInfo?.skypeID ?? "",
      instagramID: leadInfo?.instagramID ?? "",
      linkedin1: leadInfo?.linkedin1 ?? "",
      fb1: leadInfo?.fb1 ?? "",
      twitter1: leadInfo?.twitter1 ?? "",
      facebook: leadInfo?.facebook ?? "",
      twitter: leadInfo?.twitter ?? "",
      linkedIn: leadInfo?.linkedIn ?? "",
      googleReview: leadInfo?.googleReview ?? "",
      youtubeVedio: leadInfo?.youtubeVedio ?? "",
      netWorth: leadInfo?.netWorth ?? "",
      addContactInfo: leadInfo?.addContactInfo ?? "",
      gender: leadInfo?.gender ?? "",
      genderprediction: leadInfo?.genderprediction ?? "",
      doYouHaveLifeInsurance: leadInfo?.doYouHaveLifeInsurance ?? "",
      existingInsurancePolicy: leadInfo?.existingInsurancePolicy ?? "",
      serviceRequested: leadInfo?.serviceRequested ?? "",
      citizenshipStatus: leadInfo?.citizenshipStatus ?? "",
      groupInsurance: leadInfo?.groupInsurance ?? "",
      referredBy: leadInfo?.referredBy ?? "",
      understandingOfInsurance: leadInfo?.understandingOfInsurance ?? "",
      doYouOwnHomeInCanada: leadInfo?.doYouOwnHomeInCanada ?? "",
      referralSource: leadInfo?.referralSource ?? "",
      preferredContactTime: leadInfo?.preferredContactTime ?? "",
      preferredContact: leadInfo?.preferredContact ?? "",
      loanProtection: leadInfo?.loanProtection ?? "",
      isthisaReassignment: leadInfo?.isthisaReassignment ?? "",
      socialMediaInfo: leadInfo?.socialMediaInfo ?? "",
      fbAdInfo: leadInfo?.fbAdInfo ?? "",
      travelInsurance: leadInfo?.travelInsurance ?? "",
      investment: leadInfo?.investment ?? "",
      lifeInsurance: leadInfo?.lifeInsurance ?? "",

      // <<<<<<<< ADDRESS >>>>>>>
      mailingStreet: address?.mailingStreet ?? null,
      mailingCity: address?.mailingCity ?? null,
      mailingState: address?.mailingState ?? null,
      mailingPostalCode: address?.mailingPostalCode ?? null,
      mailingCountry: address?.mailingCountry ?? null,
      street: address?.street ?? null,
      city: address?.city ?? null,
      // <<<<<<< Advisor details >>>>>>>>>>
        teamLeg: advisorDetails?.teamLeg ?? "",
        reviewedDate: new Date(advisorDetails?.reviewedDate) ?? null,
        generationNumber: advisorDetails?.generationNumber ?? "",       
        organizationLevel: advisorDetails?.organizationLevel ?? "",
        teamName: advisorDetails?.teamName ?? "",
        employmentType: advisorDetails?.employmentType ?? "",        
        bonusLevel: advisorDetails?.bonusLevel ?? "",         
        insurancePartner: advisorDetails?.insurancePartner ?? "",
      
      
  }
}
async function parseFamilyTree(familyTree, ROWID) {
  return{
    advisorId: ROWID,
    relationShipStatus: familyTree?.relationShipStatus ?? null,
    dependentParents: familyTree?.dependentParents ?? null,
    numberOfDependentParents: familyTree?.numberOfDependentParents ?? null,
    dependentChildren: familyTree?.dependentChildren ?? null,
    numberOfDependentChildren: familyTree?.numberOfDependentChildren ?? null,
    siblings: familyTree?.siblings ?? null,
    numberOfSiblings: familyTree?.numberOfSiblings ?? null,
    nameOfSpouse: familyTree?.nameOfSpouse ?? null,
    numberOfSpouse: familyTree?.numberOfSpouse ?? null,
    anniversaryDate: familyTree?.anniversaryDate ?? null,
    spouseDateOfBirth: familyTree?.spouseDateOfBirth ?? null,
    phoneOfSpouse: familyTree?.phoneOfSpouse ?? null,
    emailOfSpouse: familyTree?.emailOfSpouse ?? null
  } 
}