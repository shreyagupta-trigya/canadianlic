const catalyst = require("zcatalyst-sdk-node");
const queries = require("../../SQL/queries");

const { insertData, insertSubformData, dateTimeFormat, updateData, updateSubformData, } = require("../../Utils/util");
const {client,sample} = require("../export/contact/client/exports/index");
const {dataSyncZcrm,generateToken} = require("../crmIntegration/contactClientCrmIntegraton");
const {getSequence,updateSequence} = require("../../Utils/sequenceUtils");


exports.testConntection = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "I am live" });
  } catch (error) {
    res.status(error.code).json({ success: false, message: "I am not live" });
  }
};

//  <<<<<<<<<<<<<< GET CONTACT >>>>>>>>>>>>>>
exports.contactRelatedData = async (req, res) => {
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  const rowId = req.params.id || req.body.rowId || req.query.rowId;
  let moduleArr = ["contactEmergencyDetails", "dependentChildren", "dependentParents","contactsSiblings","contactConversionHistory", "festivals",  "leadConversionHistory"];
  try {
    let contactDetails = await fetchMainModules(adminApp, rowId);
    let {contactEmergencyDetailsArr, dependentChildrenArr, dependentParentsArr,contactsSiblingsArr, contactConversionHistoryArr, festivalsArr, leadConversionHistoryArr} =
      await fetchSubModules(adminApp, rowId, moduleArr);
    res.status(200).json({
      success: true,
      message: "Deal data fetched successfully",
      contactDetails: {
        ...contactDetails,
        contactEmergencyDetails: contactEmergencyDetailsArr,
        dependentChildren: dependentChildrenArr,
        dependentParents: dependentParentsArr,
        contactsSiblings: contactsSiblingsArr,
        contactConversionHistory:contactConversionHistoryArr,
        festivals: festivalsArr,
        leadConversionHistory: leadConversionHistoryArr,
      },
    });
  } catch (error) {
    console.error("Error fetching Deal data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Deal data",
      error: error.message || error,
    });
  }
};

exports.getRefferalClients =  async(req, res)=>{
  try{
    const rowId = req.params.id;
    const catalystApp = catalyst.initialize(req, { scope: "admin" });
    const query = `${queries.getRefferalClients} '${rowId}'`;
    const respParse = await catalystApp.zcql().executeZCQLQuery(query);
    const response = await parseClientDataDB(respParse);
    res.status(200).json({success:true,message:"successfully Fetch the client", response});

  }catch(error){
    res.status(409).json({success:false, message:"Getting Error to fetch client information",error});
  }
}

// <<<<<<<<<<<<<<<< NEW CONTACT CREATE  >>>>>>>>>>>>>>>
exports.createContact = async function(req, res) {
  const { service, contactInfo, potential, familyTree,festival,leadinfo,facebook,leadMgt,address,leadHistory,layout} = req.body;
 try{
  const catalystApp = catalyst.initialize(req, { scope: "admin" });      
  // <<<<<<<<<<<<=========== INSERT CONTACT INFORMATION =============>>>>>>>>>>>>>
  const contact = await parseContactData(contactInfo,layout);
    // SEQUENCE CODE
    const sequenceResp = await getSequence(req,"contacts");
    let sequence =  sequenceResp?.data
    let contactID = `${sequence?.prefix}-${sequence?.sequence.padStart(5,'0')}`;
    contact.contactID = contactID;

  const contactId = await insertData(catalystApp, "contacts", contact);
  // UPDATE SEQUENCE
  await updateSequence(req,sequence?.rowId,parseInt(sequence.sequence) + 1);
    
  const ContactSubDetailsData = await parseContactSubDetailsData(service,potential,festival,leadMgt,address,contactId);

  // console.log("<<<<<<<< ContactSubDetailsData >>>>>>>", ContactSubDetailsData);
  const leadinfoData = await parseleadInformationsData(leadinfo,facebook,contactId);
  const familyTreeData = await parseFamilyTreeData(familyTree,contactId);  
  const contactSubDetailsId = await insertData(catalystApp, "contactSubDetails", ContactSubDetailsData);
  const leadInformationsId = await insertData(catalystApp, "leadInformations", leadinfoData);
  const familyTreeId = await insertData(catalystApp, "familyTree", familyTreeData);

// <<<<<<<<<<< INSERT SUBFORM DATA >>>>>>>>>>>>>>>
const { updateArray: updatefamilyTree = [], insertArray: insertdependentParents = [] } =  await processSubform(familyTree?.dependentParentsData, contactId, "dependentParents") || {};
const { updateArray: updateDependentChildren = [], insertArray: insertDependentChildren = [] } =  await processSubform(familyTree?.dependentChildrenData, contactId, "dependentChildren") || {};
const { updateArray: updateSibling = [], insertArray: insertSibling = [] } =  await processSubform(familyTree?.siblingData, contactId, "sibling") || {};
const { updateArray: updateFestivals = [], insertArray: insertfestivals = [] } =  await processSubform(festival?.festivalsData, contactId, "festivals") || {};
const { updateArray: updateContactEmergencyDetails = [], insertArray: insertContactEmergencyDetails = [] } =  await processSubform(familyTree?.emergencyContactData, contactId, "emergencyContact") || {};
const { updateArray: updateLeadMgmt = [], insertArray: insertleadMgmt = [] } =  await processSubform(leadMgt?.LeadMgtData, contactId, "leadMgmt") || {};
const { updateArray: updateleadHistory = [], insertArray: insertleadHistory = [] } =  await processSubform(leadHistory?.leadConversionHistoryData, contactId, "leadHistory") || {};

const dependentParentsId = insertdependentParents.length > 0 ?await insertSubformData(catalystApp,"dependentParents",insertdependentParents):[];
const insertDependentChildrenId = insertDependentChildren.length > 0 ?await insertSubformData(catalystApp,"dependentChildren",insertDependentChildren):[];
const insertSiblingId = insertSibling.length > 0 ?await insertSubformData(catalystApp,"contactsSiblings",insertSibling):[];
const insertfestivalsId = insertfestivals.length > 0 ?await insertSubformData(catalystApp,"festivals",insertfestivals):[];
const insertContactEmergencyDetailsId = insertContactEmergencyDetails.length > 0 ?await insertSubformData(catalystApp,"contactEmergencyDetails",insertContactEmergencyDetails):[];
const insertleadMgmtId = insertleadMgmt.length > 0 ?await insertSubformData(catalystApp,"leadConversionHistory",insertleadMgmt):[];
const insertleadHistoryId = insertleadHistory.length > 0 ?await insertSubformData(catalystApp,"contactConversionHistory",insertleadHistory):[];
// ***************** CRM FUNCTION ************************
// ***************** SYNC DATA IN ZOHO CRM ******************
const token = await generateToken();
const crmId = await dataSyncZcrm(token,{ service, contactInfo, potential, familyTree,festival,leadinfo,facebook,leadMgt,address,leadHistory,layout,ROWID:contactId});
await catalystApp.datastore().table("contacts").updateRow({sourceId:crmId,source:"catalyst",ROWID:contactId});
console.log("CRMId ====>", crmId);
// ***************** SYNC DATA IN ZOHO CRM ******************
// **************** CRM  FUNCTION ************************
  res.status(201).json({
    success: true,
    message: "Contact and associated records created successfully",
    deals: {
      contactId: contactId,
      contactSubDetailsId:contactSubDetailsId,
      leadInformationsId:leadInformationsId,
      familyTreeId:familyTreeId,
      dependentParentsId:dependentParentsId,
      insertDependentChildrenId:insertDependentChildrenId,
      insertSiblingId:insertSiblingId,
      insertfestivalsId:insertfestivalsId,
      contactEmergencyDetails:insertContactEmergencyDetailsId,
      insertleadMgmtId:insertleadMgmtId,
      insertleadHistoryId:insertleadHistoryId
      
    },
  });
  } catch (error) {
    console.error("Error creating Policy:", error);
    res.status(409).json({
      success: false,
      message: "Failed to create Policy",
      error: error,
    });
  }
}
exports.updateContact = async function(req, res) {
  const { service, contactInfo, potential, familyTree,festival,leadinfo,facebook,leadMgt,address,leadHistory,layout} = req.body;
  const rowId = req.params.id;

  try{
  const catalystApp = catalyst.initialize(req, { scope: "admin" });
      
  // <<<<<<<<<<<<=========== UPDATE CONTACT INFORMATION =============>>>>>>>>>>>>>
  const contactFieldsWithValues = await parseContactData(contactInfo,layout);
  const contact = Object.fromEntries(
    Object.entries(contactFieldsWithValues).filter(([key, value]) => value !== "" && value !== null)
  );
  const contactId = await updateData(catalystApp, "contacts", {...contact, ROWID: rowId});

  const ContactSubDetailsDataWithValues = await parseContactSubDetailsData(service,potential,festival,leadMgt,address,contactId);
  const ContactSubDetailsData = Object.fromEntries(
    Object.entries(ContactSubDetailsDataWithValues).filter(([key, value]) => value !== "" && value !== null)
  );
  const contactSubDetailsId = await updateData(catalystApp, "contactSubDetails", {...ContactSubDetailsData, ROWID: contactInfo.ROWID});

  const leadinfoDataDataWithValues = await parseleadInformationsData(leadinfo,facebook,contactId);
  // leadinfoData.ROWID=leadinfo.ROWID;
  const leadinfoData = Object.fromEntries(
    Object.entries(leadinfoDataDataWithValues).filter(([key, value]) => value !== "" && value !== null)
  );
  const leadInformationsId = leadinfoData.length> 0 ? await updateData(catalystApp, "leadInformations", {...leadinfoData, ROWID:leadinfo.ROWID}) : null;

  const familyTreeDataWithValues = await parseFamilyTreeData(familyTree,contactId);
  const familyTreeData = Object.fromEntries(
    Object.entries(familyTreeDataWithValues).filter(([key, value]) => value !== "" && value !== null)
  );
  const familyTreeId = familyTreeData.length> 0 ? await insertData(catalystApp, "familyTree", {...familyTreeData, ROWID:familyTree.ROWID}) : null ;

// <<<<<<<<<<< INSERT SUBFORM DATA >>>>>>>>>>>>>>>
const { updateArray: updatefamilyTree = [], insertArray: insertdependentParents = [] } =  await processSubform(familyTree?.dependentParentsData, contactId, "dependentParents") || {};
const { updateArray: updateDependentChildren = [], insertArray: insertDependentChildren = [] } =  await processSubform(familyTree?.dependentChildrenData, contactId, "dependentChildren") || {};
const { updateArray: updateSibling = [], insertArray: insertSibling = [] } =  await processSubform(familyTree?.siblingData, contactId, "sibling") || {};
const { updateArray: updateFestivals = [], insertArray: insertfestivals = [] } =  await processSubform(festival?.festivalsData, contactId, "festivals") || {};
const { updateArray: updateContactEmergencyDetails = [], insertArray: insertContactEmergencyDetails = [] } =  await processSubform(familyTree?.emergencyContactData, contactId, "emergencyContact") || {};
const { updateArray: updateLeadMgmt = [], insertArray: insertleadMgmt = [] } =  await processSubform(leadMgt?.LeadMgtData, contactId, "leadMgmt") || {};
const { updateArray: updateleadHistory = [], insertArray: insertleadHistory = [] } =  await processSubform(leadHistory?.leadConversionHistoryData, contactId, "leadHistory") || {};

const dependentParentsId = insertdependentParents.length > 0 ?await insertSubformData(catalystApp,"dependentParents",insertdependentParents):[];
const insertDependentChildrenId = insertDependentChildren.length > 0 ?await insertSubformData(catalystApp,"dependentChildren",insertDependentChildren):[];
const insertSiblingId = insertSibling.length > 0 ?await insertSubformData(catalystApp,"contactsSiblings",insertSibling):[];
const insertfestivalsId = insertfestivals.length > 0 ?await insertSubformData(catalystApp,"festivals",insertfestivals):[];
const insertContactEmergencyDetailsId = insertContactEmergencyDetails.length > 0 ?await insertSubformData(catalystApp,"contactEmergencyDetails",insertContactEmergencyDetails):[];
const insertleadMgmtId = insertleadMgmt.length > 0 ?await insertSubformData(catalystApp,"leadConversionHistory",insertleadMgmt):[];
const insertleadHistoryId = insertleadHistory.length > 0 ?await insertSubformData(catalystApp,"contactConversionHistory",insertleadHistory):[];


const updatefamilyTreeId = updatefamilyTree.length > 0 ?await updateSubformData(catalystApp,"dependentParents",updatefamilyTree):[];
const updateDependentChildrenId = updateDependentChildren.length > 0 ?await updateSubformData(catalystApp,"dependentChildren",updateDependentChildren):[];
const updateSiblingId = updateSibling.length > 0 ?await updateSubformData(catalystApp,"contactsSiblings",updateSibling):[];
const updateFestivalsId = updateFestivals.length > 0 ?await updateSubformData(catalystApp,"festivals",updateFestivals):[];
const updateContactEmergencyDetailsId = updateContactEmergencyDetails.length > 0 ?await updateSubformData(catalystApp,"contactEmergencyDetails",updateContactEmergencyDetails):[];
const updateLeadMgmtId = updateLeadMgmt.length > 0 ?await updateSubformData(catalystApp,"leadConversionHistory",updateLeadMgmt):[];
const updateleadHistoryId = updateleadHistory.length > 0 ?await updateSubformData(catalystApp,"contactConversionHistory",updateleadHistory):[];
// ***************CRM UPDATE FUNCTION **********************
const token = await generateToken();
const crmId = await dataSyncZcrm(token,{ service, contactInfo, potential, familyTree,festival,leadinfo,facebook,leadMgt,address,leadHistory,layout,ROWID:contactId},req.body?.contacts?.sourceId);

// *************************************

  res.status(201).json({
    success: true,
    message: "Update and associated records created successfully",
    deals: {
      contactId: contactId,
      contactSubDetailsId:contactSubDetailsId,
      leadInformationsId:leadInformationsId,
      familyTreeId:familyTreeId,
      dependentParentsId:dependentParentsId,
      insertDependentChildrenId:insertDependentChildrenId,
      insertSiblingId:insertSiblingId,
      insertfestivalsId:insertfestivalsId,
      contactEmergencyDetails:insertContactEmergencyDetailsId,
      insertleadMgmtId:insertleadMgmtId,
      insertleadHistoryId:insertleadHistoryId,
      updatefamilyTreeId:updatefamilyTreeId,
      updateDependentChildrenId:updateDependentChildrenId,
      updateSiblingId:updateSiblingId,
      updateFestivalsId:updateFestivalsId,
      updateContactEmergencyDetailsId:updateContactEmergencyDetailsId,
      updateLeadMgmtId:updateLeadMgmtId,
      updateleadHistoryId:updateleadHistoryId
    },
  });
  } catch (error) {
    console.error("Error creating Policy:", error);
    res.status(409).json({
      success: false,
      message: "Failed to create Policy",
      error: error,
    });
  }
}

exports.countContactClients = async (req, res) => {
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  let countQuery = "SELECT COUNT(ROWID) FROM contacts";
  try {
      const response = await adminApp.zcql().executeZCQLQuery(countQuery);
      let data = JSON.parse(JSON.stringify(response).replace("COUNT(ROWID)", "total"));
      const total = data?.[0]?.contacts?.total;
      res.status(200).json({
          success: true,
          message: "Contact Clients Count Fetched Successfully",
          count: total
      });
  } catch (error) {
      res.status(409).json({
          success: false,
          message: "Contact Clients Count Fetch Issue",
          error: error
      });
  }
}

// ************ ASYNC FUNCTION ********************
async function fetchMainModules(catalystApp, id) {
  let query = `${queries.contactRelatedData} ${id}`;
  let contactDetails = await catalystApp.zcql().executeZCQLQuery(query);
  if (!contactDetails || contactDetails.length === 0) {
    return {};
  } else {
    return ({ contacts, contactSubDetails,familyTree,leadInformations } = contactDetails[0]);
  }  
}
async function fetchSubModules(catalystApp, id, moduleArr) {
  const queryMap = {
    contactEmergencyDetails: `${queries.getContactEmergencyDetails} ${id}`,
    dependentChildren: `${queries.getDependentChildren} ${id}`,
    dependentParents: `${queries.getDependentParents} ${id}`,
    contactsSiblings: `${queries.getContactsSiblings} ${id}`,
    contactConversionHistory: `${queries.getcontactConversionHistory} ${id}`,
    festivals: `${queries.festivals} ${id}`,
    leadConversionHistory: `${queries.getLeadConversionHistory} ${id}`,
  };

  try {
    const fetchPromises = moduleArr.map(async (module) => {
      const query = queryMap[module];
      const response = await catalystApp.zcql().executeZCQLQuery(query);
      return response.map((item) => item[module]);
    });

    const [contactEmergencyDetailsArr, dependentChildrenArr, dependentParentsArr,contactsSiblingsArr,contactConversionHistoryArr,  festivalsArr, leadConversionHistoryArr] =
      await Promise.all(fetchPromises);

    return { contactEmergencyDetailsArr, dependentChildrenArr, dependentParentsArr,contactsSiblingsArr,contactConversionHistoryArr,  festivalsArr, leadConversionHistoryArr };
  } catch (error) {
    console.error("Error fetching sub-modules:", error);
    throw error;
  }
}

async function parseContactData(contactInfo,layout){
  return{
    layout: layout ?? "",
    firstName: contactInfo?.firstName ?? '',
    lastName: contactInfo?.lastName ?? '',
    mobile: contactInfo?.mobile ?? '',
    whatsApp: contactInfo?.whatsApp ?? '',
    email: contactInfo?.email ?? '',
    clientPolicyIssueOn: new Date(contactInfo.clientPolicyIssueOn) ?? null,
    dateOfBirth: new Date(contactInfo.dateOfBirth) ??null,    
    clientPolicyIssueOn:  new Date(contactInfo?.clientPolicyIssueOn)?? null,
    dateOfBirth:  new Date(contactInfo?.dateOfBirth) ? new Date(contactInfo.dateOfBirth): null,
    roundRobinAssignmentTime: await dateTimeFormat(contactInfo?.roundRobinAssignmentTime) ?? null,
    leadCreatedTime: await dateTimeFormat(contactInfo?.leadCreatedTime) ?? null,
    clvCorporateCommision: contactInfo?.clvCorporateCommision ?? '',
    lastClvCorporate: contactInfo?.lastClvCorporate ?? '',
    clvAdvisorCommision: contactInfo?.clvAdvisorCommision ?? '',
    lastClvAdvisor: contactInfo?.lastClvAdvisor ?? '',    
    phoneBurnerFollowUpDate: await dateTimeFormat(contactInfo.phoneBurnerFollowUpDate) ?? null,
    phoneBurnerLastCallTime: await dateTimeFormat(contactInfo .phoneBurnerLastCallTime) ?? null,
    description: contactInfo?.description ?? '',
    numberofProductsRemaining: contactInfo?.numberofProductsRemaining ?? '',
    removeFromCampaign: contactInfo?.removeFromCampaign ?? false,
    eligibleRoundRobinOwnerFound1: contactInfo?.eligibleRoundRobinOwnerFound1 ?? false,
    emailRoundRobinOwner2: contactInfo?.emailRoundRobinOwner2 ?? false,
    eligibleRoundRobinOwnerFound: contactInfo?.eligibleRoundRobinOwnerFound ?? false,
    emailOptOut: contactInfo?.emailOptOut ?? false,
    roundRobinProcessed: contactInfo?.roundRobinProcessed ?? false,
    reRoundRobinProcessed: contactInfo?.reRoundRobinProcessed ?? false,
    rcSMSOptOut: contactInfo?.rcSMSOptOut ?? false,
    clientAddress: contactInfo?.clientAddress ?? '',
    contactOwner: contactInfo?.contactOwner ?? null,
    dealStageTracking: contactInfo?.dealStageTracking ?? '',    
    assignedAdvisor: contactInfo?.assignedAdvisor?? null,
    insuranceLeadSource: contactInfo?.insuranceLeadSource ?? '',
    status: contactInfo?.status ?? '',
    leadId: contactInfo?.leadId ?? null,
    oldDatabaseLead: contactInfo?.oldDatabaseLead ?? '',
    location: contactInfo?.location ?? null,
    autoInsurance: contactInfo?.autoInsurance ?? '',
    parentClient: contactInfo?.parentClient ?? '',
    preferredContactMethod: contactInfo?.preferredContactMethod ?? '',
    preferredContactTime: contactInfo?.preferredContactTime ?? '',
    gender: contactInfo?.gender ?? '',
    doYouHaveCorporations: contactInfo?.doYouHaveCorporations ?? '',
    immigrationServices: contactInfo?.immigrationServices ?? '',
    socialMediaInformation: contactInfo?.socialMediaInformation ?? '',
    understandingOfInsurance: contactInfo?.understandingOfInsurance ?? '',
    netWorth: contactInfo?.netWorth ?? '',
    emailIsValid: contactInfo?.emailIsValid ?? '',
    additionalContactInformation: contactInfo?.additionalContactInformation ?? false,
    
  }
}
async function parseContactSubDetailsData(service,potential,festival,leadMgt,address,contactId) {
  return {
    contactId: contactId,  
    serviceAvailedhealthAndDentalInsurance: service?.serviceAvailedhealthAndDentalInsurance?? false,
    combinationOrHybridInsurance: service?.combinationOrHybridInsurance?? false,
    dateNewServiceRequested: service.dateNewServiceRequested ? new Date(service.dateNewServiceRequested): null,
    // nextFollowUpDateAndTime: service.nextFollowUpDateAndTime ? await dateTimeFormat( service.nextFollowUpDateAndTime): null,
    maxNumberOfPotentialProductApplicable: service?.maxNumberOfPotentialProductApplicable ?? '',
    potentialBusinessPolicyValues: service?.potentialBusinessPolicyValues ?? '',
    potentialBusinessTravelInsurance: service?.potentialBusinessTravelInsurance ?? false,
    resp: service?.resp ?? false,
    rrspTfsa: service?.rrspTfsa ?? false,
    potentialBusinessHealthAndDentalInsurance: service?.potentialBusinessHealthAndDentalInsurance ?? false,
    otherInvestments: service?.otherInvestments ?? false,
    potentialBusinessLoanProtection: service?.potentialBusinessLoanProtection ?? false,
    otherLivingBenefits: service?.otherLivingBenefits ?? false,
    potentialBusinessCriticalIllness: service?.potentialBusinessCriticalIllness ?? false,
    potentialBusinessLifeInsurance: service?.potentialBusinessLifeInsurance ?? false,
    potentialDependent: service?.potentialDependent ?? false,
    serviceAvailedOptions: service?.serviceAvailedOptions ?? '',
    lifeInsurance: service?.lifeInsurance ?? '',
    lifeBenefits: service?.lifeBenefits ?? '',
    serviceAvailedLoanProtection: service?.serviceAvailedLoanProtection ?? '',
    serviceAvailedTravelInsurance: service?.serviceAvailedTravelInsurance ?? '',
    investment: service?.investment ?? '',
    serviceAvailedUpdated: service?.serviceAvailedUpdated ?? '',
    processStage: service?.processStage ?? '',
    otherServiceRequested: service?.otherServiceRequested ?? '',

    // <<<<<<<<<<<<<<<< Potential DETAILS  >>>>>>>>>>>>>>>
    numberOfProductRemaining: potential?.numberOfProductRemaining ?? '',
    numberOfProductRemainingIndividuals: potential?.numberOfProductRemainingIndividuals ?? '',
    potentialDependentCompleted: potential?.potentialDependentCompleted ?? false,
    pendingPotentialBusinesslifeInsurance: potential?.pendingPotentialBusinesslifeInsurance ?? false,
    dependentLifeIns: potential?.dependentLifeIns ?? false,
    pendingPotentialBusinessCriticalIllness: potential?.pendingPotentialBusinessCriticalIllness ?? false,
    dependentCriticalIns: potential?.dependentCriticalIns ?? false,
    pendingPotentialBusinessHealthAndDentalInsurances: potential?.pendingPotentialBusinessHealthAndDentalInsurances ?? false,
    pendingPotentialBusinessTravelInsurance: potential?.pendingPotentialBusinessTravelInsurance ?? false,
    pendingPotentialBusinessResp: potential?.pendingPotentialBusinessResp ?? false,
    rrspTfsaMutualFundsSegFunds: potential?.rrspTfsaMutualFundsSegFunds ?? false,
    ppbOtherInvestments: potential?.ppbOtherInvestments ?? false,
    ppbLoanProtection: potential?.ppbLoanProtection ?? false,
    ppbOtherLivingBenefits: potential?.ppbOtherLivingBenefits ?? false,
    serviceOffering: potential?.serviceOffering ?? '',
    
    // // <<<<<<< FESTIVAL  >>>>>>>
    religion: festival?.religion ?? '',
    celebratedFestivals: festival?.celebratedFestivals ?? '',
    totalInteractionTime: leadMgt?.totalInteractionTime ?? '',
    
    // // <<<<<<<<<<<<<<<<<<<< ADDRESS >>>>>>>>>>>>>>>>>>>>>>>
    mailingStreet: address?.mailingStreet ?? '',
    mailingCity: address?.mailingCity ?? '',
    mailingState: address?.mailingState ?? '',
    mailingpostalCode: address?.mailingpostalCode ?? '',
    mailingCountry: address?.mailingCountry ?? '',
    otherStreet: address?.otherStreet ?? '',
    otherCity: address?.otherCity ?? '',
    otherState: address?.otherState ?? '',
    otherCountry: address?.otherCountry ?? '', 

  }
}
async function parseleadInformationsData(leadinfo,facebook,contactId){
  return{
    contactId: contactId,
    bestTimeToCall: leadinfo?.bestTimeToCall ?? '',
    dateOfBirth1: new Date(leadinfo.dateOfBirth1) ?? null,
    ifReferredByAdvisorOrExternal: leadinfo?.ifReferredByAdvisorOrExternal ?? '',
    existingRenewalPolicyDueBy: leadinfo?.existingRenewalPolicyDueBy ? new Date(leadinfo.existingRenewalPolicyDueBy) : null,
    coverageYouAreLookingFor: leadinfo?.coverageYouAreLookingFor ?? '',
    submitPageUrl: leadinfo?.submitPageUrl ?? '',
    assignedCampaigns: leadinfo?.assignedCampaigns ?? '',
    twitter1: leadinfo?.twitter1 ?? '',
    locationName2: leadinfo?.locationName2 ?? null,
    
    roundRobinAssignmentTime1: await dateTimeFormat(leadinfo.roundRobinAssignmentTime1) ? await dateTimeFormat(leadinfo.roundRobinAssignmentTime1): null,
    skypeId1: leadinfo?.skypeId1 ?? '',
    instagram1: leadinfo?.instagram1 ?? '',
    leadPotentialBusinessPolicyValues: leadinfo?.leadPotentialBusinessPolicyValues ?? '',
    insuranceLeadScore: leadinfo?.insuranceLeadScore ?? '',
    insuranceLeadScoringPositiveScore: leadinfo?.insuranceLeadScoringPositiveScore ?? '',
    insuranceLeadScoringNegativeTouchPointScore: leadinfo?.insuranceLeadScoringNegativeTouchPointScore ?? '',
    exchangeRate1: leadinfo?.exchangeRate1 ?? '',
    currency1: leadinfo?.currency1 ?? '',
    linkdin1: leadinfo?.linkdin1 ?? '',
    facebook1: leadinfo?.facebook1 ?? '',
    insuranceLeadScoringTouchPointScore: leadinfo?.insuranceLeadScoringTouchPointScore ?? '',
    insuranceLeadsScoringPositiveTouchPointScore: leadinfo?.insuranceLeadsScoringPositiveTouchPointScore ?? '',
    insuranceLeadsScoringNegativeScore: leadinfo?.insuranceLeadsScoringNegativeScore ?? '',
    whatsapp: leadinfo?.whatsapp ?? '',
    phoneBurnerLastOutcome: leadinfo?.phoneBurnerLastOutcome ?? '',
    street: leadinfo?.street ?? '',
    city: leadinfo?.city ?? '',
    zipCode: leadinfo?.zipCode ?? '',
    state: leadinfo?.state ?? '',
    country: leadinfo?.country ?? '',
    catalystId: leadinfo?.catalystId ?? '',
    isThisReassignment: leadinfo?.isThisReassignment ?? '',
    investments1: leadinfo?.investments1 ?? '',
    referredBy: leadinfo?.referredBy ?? '',
    citizenshipStatus1: leadinfo?.citizenshipStatus1 ?? '',
    preferredContactTime2: leadinfo?.preferredContactTime2 ?? '',
    existingInsurancePolicy2: leadinfo?.existingInsurancePolicy2 ?? '',
    doYouOwnHomeInCananda: leadinfo?.doYouOwnHomeInCananda ?? '',
    understandingOfInsurance1: leadinfo?.understandingOfInsurance1 ?? '',
    preferredContactMethod2: leadinfo?.preferredContactMethod2 ?? '',
    additionalContactInformation1: leadinfo?.additionalContactInformation1 ?? '',
    gender1: leadinfo?.gender1 ?? '',
    leadInfoAdditionalContactInformation: leadinfo?.leadInfoAdditionalContactInformation ?? '',
    networth2: leadinfo?.networth2 ?? '',
    genderPrediction1: leadinfo?.genderPrediction1 ?? '',
    oldDatabaseLead1: leadinfo?.oldDatabaseLead1 ?? '',
    facebookAdInformation: leadinfo?.facebookAdInformation ?? '',
    homeInsurance: leadinfo?.homeInsurance ?? '',
    
    // <<<<<<<<<<<< FACEBOOK >>>>>>>>>>>>>
    adAccount: facebook?.adAccount ?? '',
    adAccountId: facebook?.adAccountId ?? '',
    adCampaign: facebook?.adCampaign ?? '',
    adCampaignId: facebook?.adCampaignId ?? '',
    facebookPage: facebook?.facebookPage ?? '',
    facebookPageId: facebook?.facebookPageId ?? '',
    costPerLead: facebook?.costPerLead ?? '',
    adSet: facebook?.adSet ?? '',
    adSetId: facebook?.adSetId ?? '',
    facebookAd: facebook?.facebookAd ?? '',
    adId: facebook?.adId ?? '',
    leadForm: facebook?.leadForm ?? '',
    leadFormId: facebook?.leadFormId ?? '',

  }
}
async function parseFamilyTreeData(familyTree,contactId){
  return{
    contactId: contactId,   
    updateFamilyTree: familyTree?.updateFamilyTree ?? false,
    updateFamilyTree: familyTree?.updateFamilyTree ?? false,
    relationShipStatus: familyTree?.relationShipStatus ?? '',
    dependentParents: familyTree?.dependentParents ?? '',
    dependentChildren: familyTree?.dependentChildren ?? '',
    siblings: familyTree?.siblings ?? '',
    nameOfSpouse: familyTree?.nameOfSpouse ?? '',
    numberOfSpouse: familyTree?.numberOfSpouse ?? '',
    anniversaryDate: familyTree?.anniversaryDate ?? '',
    spouseDateOfBirth: familyTree?.spouseDateOfBirth ?? '',
    phoneOfSpouse: familyTree?.phoneOfSpouse ?? '',
    emailOfSpouse: familyTree?.emailOfSpouse ?? '',
    numberOfDependentParents: familyTree?.numberOfDependentParents ?? '',
    numberOfDependentChildren: familyTree?.numberOfDependentChildren ?? '',
    numberOfSiblings: familyTree?.numberOfSiblings ?? '',
    updateFamilyTreeforSupervisa: familyTree?.updateFamilyTreeforSupervisa ?? false,
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
      contactId: rowId,
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
    case "leadHistory":
      return {
        referralPayouttillDateHealthDental: item?.referralPayouttillDateHealthDental ?? "",
        // referralPayouttillDateLifeTravel: item?.referralPayouttillDateLifeTravel ?? null,
        referralPayouttillDateLivingBenefits: item?.referralPayouttillDateLivingBenefits ?? null,
        referralPayouttillDateLife: item?.referralPayouttillDateLife ?? null,
        referralstillDateHealthDental: item?.referralstillDateHealthDental ?? null,
        referralstillDateLivingBenefits: item?.referralstillDateLivingBenefits ?? null,
        referraltilldateLife: item?.referraltilldateLife ?? null,
        referralLevel: item?.referralLevel ?? "",

      };     
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
        relationship: item.relationship ?? "",
        name: item.name ?? "",
        dob: item.dob ?? "",
        email: item.email ?? "",
        phone: item.phone ?? "",
        age: item.age ?? "",
        
      };      
    case "sibling":
      return {
        relationship: item.relationship ?? "",
        name: item.name ?? "",
        dob: item.dob ?? "",
        email: item.email ?? "",
        phone: item.phone ?? "",
        age: item.age ?? "",
        
      };
    case "festivals":
      return {
        festivalName: item.festivalName ?? "",
        dateOfFestival: item.dateOfFestival ? new Date(item.dateOfFestival) : null,
        
      };      
    case "leadMgmt":
      return {
        interactionType: item.interactionType ?? "",
        timeOfInteraction: item.timeOfInteraction ?? "",
        timeSpent: item.timeSpent ?? "",
        contactAttempt: item.contactAttempt ?? "",
        comments: item.comments ?? "",
        interactionOutcome: item.interactionOutcome ?? "",
        probabilityOfClosure: item.probabilityOfClosure ?? "",
        referraltilldateLife: item.referraltilldateLife ?? "",
        
      };      
    case "emergencyContact":
      return {
        emergencyContactEmail: item.emergencyContactEmail ?? "",
        emergencyContactRelationship: item.emergencyContactRelationship ?? "",
        emergencyContactPhone: item.emergencyContactPhone ?? "",
        contactAttempt: item.contactAttempt ?? "",
        emergencyContactName: item.emergencyContactName ?? "",
        
      };      
    
    default:
      return {}; // Default case if type is not recognized
  }
}


// <<<<<<<<<< ========= CSV DOWNLOAD FUNCTIONALITY =============>>>>>>>>>>
exports.downloadFile = async (req, res) => {
  try {
    const csvContent = await downloadSampleFile();
    
    // Send the CSV file for download
    res.setHeader("Content-disposition", "attachment; filename=sample.csv");
    res.set("Content-Type", "text/csv");
    res.status(200).send(csvContent);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

// <<<<<<<<<<<<<<<<<<========== Sample FIle DOWNLOAD =============>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
async function downloadSampleFile() {
  try {
    let headers = client
    const csvStringifier = createObjectCsvStringifier({
      header: headers,
    });
    const data = sample;
    const csvContent =
      csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(data);

    return csvContent;
  } catch (error) {
    console.error("Error downloading file:", error);
  }
}

async function parseClientDataDB(data) {
  return data.map((item) => ({
    sourceId: item.contacts?.sourceId || "",
    leadsScore: item.contacts?.leadsScore || null,
    eligibleRoundRobinOwnerFound: item.contacts?.eligibleRoundRobinOwnerFound || false,
    leadCreatedTime: item.contacts?.leadCreatedTime || "",
    source: item.contacts?.source || "",
    clientAddress: item.contacts?.clientAddress || "",
    preferredContactTime: item.contacts?.preferredContactTime || "",
    insuranceLeadSource: item.contacts?.insuranceLeadSource || "",
    dealStageTracking: item.contacts?.dealStageTracking || "",
    leadId: item.contacts?.leadId || "",
    firstName: item.contacts?.firstName || "",
    lastName: item.contacts?.lastName || "",
    email: item.contacts?.email || "",
    mobile: item.contacts?.mobile || "",
    dateOfBirth: item.contacts?.dateOfBirth || "",
    netWorth: item.contacts?.netWorth || "Unknown",
    location: item.contacts?.location || "",
    status: item.contacts?.status || "",
    roundRobinProcessed: item.contacts?.roundRobinProcessed || false,
  }));
}
