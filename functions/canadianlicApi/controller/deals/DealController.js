const catalyst = require("zcatalyst-sdk-node");
const NodeCache = require("node-cache");
const cache = new NodeCache();
const { createObjectCsvStringifier } = require("csv-writer");
const queries = require("../../SQL/query");

const {
  insertData,
  insertSubformData,
  dateTimeFormat,
  updateData,
  updateSubformData,
} = require("../../Utils/util");

const {standard,critical,rrsp,lifeInsurance,standardData,lifeInsurenceData,rrspData,criticalInsurenceData} = require("../../controller/export/sales/deals/index");

// *********** CRM FUNCTION ***********
const {dataSyncZcrm,generateToken} = require("../crmIntegration/dealCrmIntegration");

exports.testConntection = async (req, res) => {
  try{
  res.status(200).json({ success: true, message: "I am live" });
  }
  catch (err){
    res.status(409).json({ success: false, message: "error",response:err.message });
    console.log(err);
  }
};

exports.createStandrardDeal = async (req, res) => {
  const {
    dealInformation,policyTracking,dealInfo,dealOwnership,trustee,beneficiaries,layout} = req.body;
  try {
    const catalystApp = catalyst.initialize(req, { scope: "admin" });
    
    // <<<<<<<<<<<<=========== INSERT DEAL INFORMATION =============>>>>>>>>>>>>>
    const deals = await parseDealData(dealInformation,dealOwnership,trustee,beneficiaries,dealInfo, layout);
    const dealId = await insertData(catalystApp, "deals", deals); // Insert Deal FUNCTIONALITY

    // <<<<<<<<<<<<=========== INSERT DEAL DATA MAPPING =============>>>>>>>>>>>>>
    const policyTrackData = await parsePolicyTrackingDate(policyTracking,dealId,dealInfo);
    console.log("policyTrackData>>>>", policyTrackData);
    const { updateArray: updateSubform = [], insertArray: insertSubform = [] } = await processSubform(dealOwnership?.dealOwnership, dealId, "dealOwnership") || {};
    const { updateArray: updateTrustees = [], insertArray: insertTrustees = [] } = await  processSubform(trustee?.trustee, dealId, "trustees") || {};
    const { updateArray: updateBeneficiaries = [], insertArray: insertBeneficiaries = [] } =  await processSubform(beneficiaries?.beneficiaries, dealId, "beneficiaries") || {};
    
    // // <<<<<<<<<<<<=========== INSERT DEAL FUNCTIONALITY =============>>>>>>>>>>>>>
    const dealPolicyId = await insertData(catalystApp, "dealPolicyTracking", {...policyTrackData,dealId:dealId});
    const dealOwnersId = insertSubform .length > 0 ?await insertSubformData(catalystApp,"dealOwnership",insertSubform):[];
    const trusteesId = insertTrustees .length > 0 ?await insertSubformData(catalystApp,"trustees",insertTrustees):[];
    const beneficiariesId = insertBeneficiaries .length > 0 ?await insertSubformData(catalystApp,"dealBeneficiaries",insertBeneficiaries):[];
    const updateOwnerId = updateSubform .length > 0 ?await updateSubformData(catalystApp,"dealOwnership",updateSubform):[];
    const updateTrusteesId = updateTrustees .length > 0 ?await updateSubformData(catalystApp,"trustees",updateTrustees):[];
    const updateBeneficiariesId = updateBeneficiaries .length > 0 ?await updateSubformData(catalystApp,"dealBeneficiaries",updateBeneficiaries):[];
    // ***************** SYNC DATA IN ZOHO CRM ******************
    const token = await generateToken();
    const crmId = await dataSyncZcrm(token,{...deals,...dealOwnership,policyTrackData,...trustee,...beneficiaries,ROWID:dealId});
    await catalystApp.datastore().table("deals").updateRow({sourceId:crmId,source:"catalyst",ROWID:dealId});
    console.log("crmID ====>", crmId);
    // **************** END ZOHO CRM ***********************
    res.status(201).json({
      success: true,
      message: "Deal and associated records created successfully",
      deals: {
        deal: dealId,
        dealPolicyTracking: dealPolicyId,
        dealOwnership: dealOwnersId,
        trustees: trusteesId,
        dealBeneficiaries: beneficiariesId,
        updateOwnerId: updateOwnerId,
        updateTrusteesId: updateTrusteesId,
        updateBeneficiariesId: updateBeneficiariesId,
      },
    });
  } catch (error) {
    console.error("Error creating Deal:", error);
    res.status(409).json({
      success: false,
      message: "Failed to create Deal",
      error: error,
    });
  }
};

exports.updateStandrardDeal = async (req, res) => {
  const {dealInformation,policyTracking,dealInfo,dealOwnership,trustee,beneficiaries,layout} = req.body;
  const rowId = req.params.id;
  try {
    const catalystApp = catalyst.initialize(req, { scope: "admin" });
    const dealsFieldsWithValues = await parseDealData(dealInformation,dealOwnership,trustee,beneficiaries,dealInfo,layout);
    const deals = Object.fromEntries(
      Object.entries(dealsFieldsWithValues).filter(([key, value]) => value !== "" && value !== null)
    );
    const policyTrackDataWithValues = await parsePolicyTrackingDate(policyTracking,rowId,dealInfo);
    const policyTrackData = Object.fromEntries(
      Object.entries(policyTrackDataWithValues).filter(([key, value]) => value !== "" && value !== null)
    );
    const { updateArray: updateSubform = [], insertArray: insertSubform = [] } = await processSubform(dealOwnership?.dealOwnership, rowId, "dealOwnership") || {};
    const { updateArray: updateTrustees = [], insertArray: insertTrustees = [] } = await  processSubform(trustee?.trustees, rowId, "trustees") || {};
    const { updateArray: updateBeneficiaries = [], insertArray: insertBeneficiaries = [] } =  await processSubform(beneficiaries?.beneficiaries, rowId, "beneficiaries") || {};
 
    // // <<<<<<<<<<<<=========== UPDATE DEAL FUNCTIONALITY =============>>>>>>>>>>>>>
    const dealId = await updateData(catalystApp, "deals", {...deals,ROWID:rowId});
    const dealPolicyId = policyTracking?.ROWID ? 
    await updateData(catalystApp, "dealPolicyTracking", {...policyTrackData,ROWID:policyTracking?.ROWID}) 
    : await insertData(catalystApp, "dealPolicyTracking", {...policyTrackData,dealId:rowId});
    const dealOwnersId = insertSubform .length > 0 ?await insertSubformData(catalystApp,"dealOwnership",insertSubform):[];
    const trusteesId = insertTrustees .length > 0 ?await insertSubformData(catalystApp,"trustees",insertTrustees):[];
    const beneficiariesId = insertBeneficiaries .length > 0 ?await insertSubformData(catalystApp,"dealBeneficiaries",insertBeneficiaries):[];
    const updateOwnerId = updateSubform .length > 0 ?await updateSubformData(catalystApp,"dealOwnership",updateSubform):[];
    const updateTrusteesId = updateTrustees .length > 0 ?await updateSubformData(catalystApp,"trustees",updateTrustees):[];
    const updateBeneficiariesId = updateBeneficiaries .length > 0 ?await updateSubformData(catalystApp,"dealBeneficiaries",updateBeneficiaries):[];
    // **************** UPDATE RECORD IN ZOHO CRM ****************    
     const token = await generateToken();
     crmId = await dataSyncZcrm(token,{...deals,policyTrackData},req.body?.sourceId);
     console.log("<<===CrmId====>>",crmId);   
    // **************** END UPDATE RECORD IN ZOHO CRM ****************
    res.status(200).json({
      success: true,
      message: "Deal and associated records Updated successfully",
      deals: {
        dealId: dealId,
        dealPolicyTracking: dealPolicyId,
        dealOwnership: dealOwnersId,
        trustees: trusteesId,
        dealBeneficiaries: beneficiariesId,
        updateOwnerId: updateOwnerId,
        updateTrusteesId: updateTrusteesId,
        updateBeneficiariesId: updateBeneficiariesId,
      },
    });
  } catch (error) {
    console.error("Error creating Deal:", error);
    res.status(409).json({
      success: false,
      message: "Failed to create Deal",
      error: error,
    });
  }
};
// <<<<<<<<<< ========= CSV DOWNLOAD FUNCTIONALITY =============>>>>>>>>>>
exports.downloadFile = async (req, res) => {
  try {
    const { type } = req.body;
    const csvContent = await downloadSampleFile(type);
    
    // Send the CSV file for download
    res.setHeader("Content-disposition", "attachment; filename=sample.csv");
    res.set("Content-Type", "text/csv");
    res.status(200).send(csvContent);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

exports.createLifeInsurenceDeal = async (req, res) => {
  const { 
    address={}, 
    facebook={}, 
    festivalForm={}, 
    lifeInsurance={}, 
    dealOwnership={}, 
    policyTracking={}, 
    policyReview={}, 
    claims={}, 
    applicationCal={}, 
    familyTree={}, 
    leadMgmt={}, 
    layout
  } = req.body;
       
    try {
      // <<<<<<<<< CATALYST SCOPE >>>>>>>>>>
      const catalystApp = catalyst.initialize(req, { scope: "admin" });

      //<<<<<<< INSERT DEAL INFORMATION >>>>>>>
      const lifeDealData = await parseLifeInsuranceData(lifeInsurance, dealOwnership, claims, familyTree, applicationCal,leadMgmt,facebook, layout);
      const dealId = await insertData(catalystApp, "deals", lifeDealData); // Insert Deal FUNCTIONALITY
      //  console.log("lifeDealDataID====>",dealId );
      
      //<<<<<<< INSERT DEAL RELATED INFORMATION >>>>>>>
      const policyTrackData = await parseLifeInsurancePolicyTrackingDate(lifeInsurance, familyTree,facebook,festivalForm,address,applicationCal, dealId);
      const dealInformationId = await insertData(catalystApp, "dealInformation", policyTrackData); 
      const policyTrack = await parseLifeInsurancePolicyTrackingData(policyTracking, policyReview,claims, dealId);
      console.log("policyTrack====>",policyTrack );
      const policyTrackingId = await insertData(catalystApp, "dealPolicyTracking", policyTrack); 
      // console.log("dealInformationId===>", policyTrackingId);
      const lifeInsuranceFamily = await parseLifeInsuranceFamilyDetails(familyTree, dealId);
      const lifeInsuranceFamilyId = await insertData(catalystApp, "familyTree", lifeInsuranceFamily); 

      //<<<<<<< INSERT DEAL SUBFORM DATA >>>>>>>
      const { updateArray: updateSubform = [], insertArray: insertSubform = [] } = await processSubform(dealOwnership?.dealOwnership, dealId, "dealOwnership") || {};
      const { updateArray: updateTrustees = [], insertArray: insertTrustees = [] } = await  processSubform(dealOwnership?.trustee, dealId, "trustees") || {};
      const { updateArray: updateBeneficiaries = [], insertArray: insertBeneficiaries = [] } =  await processSubform(dealOwnership?.beneficiaries, dealId, "beneficiaries") || {};
      const { updateArray: updatefamilyTree = [], insertArray: insertdependentParents = [] } =  await processSubform(familyTree?.dependentParentsData, dealId, "dependentParents") || {};
      const { updateArray: updateDependentChildren = [], insertArray: insertDependentChildren = [] } =  await processSubform(familyTree?.dependentChildrenData, dealId, "dependentChildren") || {};
      const { updateArray: updateSibling = [], insertArray: insertSibling = [] } =  await processSubform(familyTree?.siblingData, dealId, "sibling") || {};
      const { updateArray: updateFestivals = [], insertArray: insertfestivals = [] } =  await processSubform(festivalForm?.festivalsData, dealId, "festivals") || {};
      const { updateArray: updateLeadMgmt = [], insertArray: insertleadMgmt = [] } =  await processSubform(leadMgmt?.LeadData, dealId, "leadMgmt") || {};
      
      const dealOwnersId = insertSubform .length > 0 ?await insertSubformData(catalystApp,"dealOwnership",insertSubform):[];
      const trusteesId = insertTrustees .length > 0 ?await insertSubformData(catalystApp,"trustees",insertTrustees):[];
      const beneficiariesId = insertBeneficiaries .length > 0 ?await insertSubformData(catalystApp,"dealBeneficiaries",insertBeneficiaries):[];
      const dependentParentsId = insertdependentParents .length > 0 ?await insertSubformData(catalystApp,"dependentParents",insertdependentParents):[];
      const insertDependentChildrenId = insertDependentChildren .length > 0 ?await insertSubformData(catalystApp,"dependentChildren",insertDependentChildren):[];
      const insertSiblingId = insertSibling .length > 0 ?await insertSubformData(catalystApp,"contactsSiblings",insertSibling):[];
      const insertfestivalsId = insertfestivals .length > 0 ?await insertSubformData(catalystApp,"festivals",insertfestivals):[];
      const insertleadMgmtId = insertleadMgmt .length > 0 ?await insertSubformData(catalystApp,"leadConversionHistory",insertleadMgmt):[];
      // ***************** SYNC DATA IN ZOHO CRM ******************
      const token = await generateToken();
      const crmId = await dataSyncZcrm(token,{...policyTrackData,...dealOwnership,policyTrackData,...insertTrustees,...insertBeneficiaries,ROWID:dealId});
      await catalystApp.datastore().table("deals").updateRow({sourceId:crmId,source:"catalyst",ROWID:dealId});
      console.log("crmID ====>", crmId);
      // **************** END ZOHO CRM ***********************
    
      res.status(201).json({
        success: true,
        message: "Deal and associated records created successfully",
        deals: {
          deal: dealId,
          dealInfoId: dealInformationId,
          policyTrackingId: policyTrackingId,          
          familyId: lifeInsuranceFamilyId,
          dealOwners: dealOwnersId,  
          trustees: trusteesId,
          beneficiaries: beneficiariesId,        
          dependentParentsId: dependentParentsId,        
          insertDependentChildrenId: insertDependentChildrenId,        
          insertSiblingId: insertSiblingId,        
          insertfestivalsId: insertfestivalsId,        
          insertleadMgmtId: insertleadMgmtId,        
        },
      });
  } catch (error) {
    console.error("Error creating Deal:", error);
    res.status(409).json({
      success: false,
      message: "Failed to create Deal",
      error: error,
    });
  }

};
exports.updateLifeInsurenceDeal = async (req, res) => {
  const { 
    address={}, 
    facebook={}, 
    festivalForm={}, 
    lifeInsurance={}, 
    dealOwnership={}, 
    policyTracking={}, 
    policyReview={}, 
    claims={}, 
    applicationCal={}, 
    familyTree={}, 
    leadMgmt={}, 
    layout
  } = req.body;
  const rowId = req.params.id;
    try {
      // <<<<<<<<< CATALYST SCOPE >>>>>>>>>>
      const catalystApp = catalyst.initialize(req, { scope: "admin" });
      //<<<<<<< UPDATE DEAL INFORMATION >>>>>>>
      const lifeDealDataWithValues = await parseLifeInsuranceData(lifeInsurance, dealOwnership, claims, familyTree, applicationCal,leadMgmt,facebook, layout);
      const lifeDealData = Object.fromEntries(
        Object.entries(lifeDealDataWithValues).filter(([key, value]) => value !== "" && value !== null)
      );
      const dealId = await updateData(catalystApp, "deals", {...lifeDealData,ROWID:rowId}); // Insert Deal FUNCTIONALITY

      //<<<<<<< UPDATE DEAL RELATED INFORMATION >>>>>>>
      const policyTrackDataWithValues = await parseLifeInsurancePolicyTrackingDate(lifeInsurance, familyTree,facebook,festivalForm,address,applicationCal, rowId);
      const policyTrackData = Object.fromEntries(
        Object.entries(policyTrackDataWithValues).filter(([key, value]) => value !== "" && value !== null)
      );
      const dealInformationId = await updateData(catalystApp, "dealInformation", {...policyTrackData, ROWID:lifeInsurance.ROWID}); 
      const policyTrackWithValues = await parseLifeInsurancePolicyTrackingData(policyTracking, policyReview,claims, rowId);
      const policyTrack = Object.fromEntries(
        Object.entries(policyTrackWithValues).filter(([key, value]) => value !== "" && value !== null)
      );
      const policyTrackingId = await updateData(catalystApp, "dealPolicyTracking", {...policyTrack, ROWID: policyTracking.ROWID}); 
      const lifeInsuranceFamilyWithValues = await parseLifeInsuranceFamilyDetails(familyTree, rowId);
      const lifeInsuranceFamily = Object.fromEntries(
        Object.entries(lifeInsuranceFamilyWithValues).filter(([key, value]) => value !== "" && value !== null)
      );
      const lifeInsuranceFamilyId = await updateData(catalystApp, "familyTree", {...lifeInsuranceFamily, ROWID:familyTree.ROWID}); 

      //<<<<<<< INSERT DEAL SUBFORM DATA >>>>>>>
      const { updateArray: updateDealOwnership = [], insertArray: insertDealOwnership = [] } = await processSubform(dealOwnership?.dealOwnership, rowId, "dealOwnership") || {};
      const { updateArray: updateTrustees = [], insertArray: insertTrustees = [] } = await  processSubform(dealOwnership?.trustee, rowId, "trustees") || {};
      const { updateArray: updateBeneficiaries = [], insertArray: insertBeneficiaries = [] } =  await processSubform(dealOwnership?.beneficiaries, rowId, "beneficiaries") || {};
      const { updateArray: updateDependentParents = [], insertArray: insertdependentParents = [] } =  await processSubform(familyTree?.dependentParentsData, rowId, "dependentParents") || {};
      const { updateArray: updateDependentChildren = [], insertArray: insertDependentChildren = [] } =  await processSubform(familyTree?.dependentChildrenData, rowId, "dependentChildren") || {};
      const { updateArray: updateSibling = [], insertArray: insertSibling = [] } =  await processSubform(familyTree?.siblingData, rowId, "sibling") || {};
      const { updateArray: updateFestivals = [], insertArray: insertfestivals = [] } =  await processSubform(festivalForm?.festivalsData, rowId, "festivals") || {};
      const { updateArray: updateLeadMgmt = [], insertArray: insertleadMgmt = [] } =  await processSubform(leadMgmt?.LeadData, rowId, "leadMgmt") || {};
      // <<<<<<< CREATE RECORD >>>>
      const dealOwnersId = insertDealOwnership.length > 0 ? await insertSubformData(catalystApp,"dealOwnership",insertDealOwnership):[];
      const trusteesId = insertTrustees.length > 0 ? await insertSubformData(catalystApp,"trustees",insertTrustees):[];
      const beneficiariesId = insertBeneficiaries.length > 0 ? await insertSubformData(catalystApp,"dealBeneficiaries",insertBeneficiaries):[];
      const dependentParentsId = insertdependentParents.length > 0 ?await insertSubformData(catalystApp,"dependentParents",insertdependentParents):[];
      const insertDependentChildrenId = insertDependentChildren.length > 0 ? await insertSubformData(catalystApp,"dependentChildren",insertDependentChildren):[];
      const insertSiblingId = insertSibling.length > 0 ?await insertSubformData(catalystApp,"contactsSiblings",insertSibling):[];
      const insertfestivalsId = insertfestivals.length > 0 ?await insertSubformData(catalystApp,"festivals",insertfestivals):[];
      const insertleadMgmtId = insertleadMgmt.length > 0 ?await insertSubformData(catalystApp,"leadConversionHistory",insertleadMgmt):[];
      // <<<<<<< UPDATE RECORD >>>>>
      // console.log("insertSubform <<<====>", updateDealOwnership);
      const updateDealOwnershipId = updateDealOwnership.length > 0 ?await updateSubformData(catalystApp,"dealOwnership",updateDealOwnership):[];
      const updateTrusteesId = updateTrustees.length > 0 ?await updateSubformData(catalystApp,"trustees",updateTrustees):[];
      const UpdateBeneficiariesId = updateBeneficiaries.length > 0 ?await updateSubformData(catalystApp,"dealBeneficiaries",updateBeneficiaries):[];
      const UpdateDependentParentsId = updateDependentParents.length > 0 ?await updateSubformData(catalystApp,"dependentParents",updateDependentParents):[];
      const updateDependentChildrenId = updateDependentChildren.length > 0 ?await updateSubformData(catalystApp,"dependentChildren",updateDependentChildren):[];
      const updateSiblingId = updateSibling.length > 0 ?await updateSubformData(catalystApp,"contactsSiblings",updateSibling):[];
      const updateFestivalsId = updateFestivals.length > 0 ? await updateSubformData(catalystApp,"festivals",updateFestivals):[];
      const updateLeadMgmtId = updateLeadMgmt.length > 0 ?await updateSubformData(catalystApp,"leadConversionHistory",updateLeadMgmt):[];
      // **************** UPDATE RECORD IN ZOHO CRM ****************    
      const token = await generateToken();
      crmId = await dataSyncZcrm(token,{...lifeDealData,policyTrackData},req.body?.sourceId);
      console.log("<<===CrmId====>>",crmId);   
      // **************** END UPDATE RECORD IN ZOHO CRM ****************
      res.status(201).json({
        success: true,
        message: "Deal and associated records update successfully",
        deals: {
          deal: dealId,
          dealInfoId: dealInformationId,
          policyTrackingId: policyTrackingId,          
          familyTreeId: lifeInsuranceFamilyId,
          dealOwners: dealOwnersId,  
          trustees: trusteesId,
          beneficiaries: beneficiariesId,        
          dependentParentsId: dependentParentsId,        
          insertDependentChildrenId: insertDependentChildrenId,        
          insertSiblingId: insertSiblingId,        
          insertfestivalsId: insertfestivalsId,        
          insertleadMgmtId: insertleadMgmtId,
          updateDealOwnershipId: updateDealOwnershipId,
          updateTrusteesId: updateTrusteesId,
          UpdateBeneficiariesId: UpdateBeneficiariesId,
          UpdateDependentParentsId: UpdateDependentParentsId,
          updateDependentChildrenId: updateDependentChildrenId,
          updateSiblingId: updateSiblingId,
          updateFestivalsId: updateFestivalsId,
          updateLeadMgmtId: updateLeadMgmtId,
        },
      });
  } catch (error) {
    console.error("Error creating Deal:", error);
    res.status(409).json({
      success: false,
      message: "Failed to create Deal",
      error: error,
    });
  }

};
exports.dealRelatedData = async (req, res) => {
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  const rowId = req.params.id || req.body.rowId || req.query.rowId;
  let moduleArr = ["dealOwnership", "dealBeneficiaries", "trustees", "dependentParents", "dependentChildren", "contactsSiblings", "festivals", "leadConversionHistory"];
  try {
    let dealDetails = await fetchMainModules(adminApp, rowId);
    let { dealOwnershipArr, dealBeneficiariesArr, trusteesArr, dependentParentsArr, dependentChildrenArr, contactsSiblingsArr, festivalsArr, leadConversionHistoryArr} =
      await fetchSubModules(adminApp, rowId, moduleArr);
    res.status(200).json({
      success: true,
      message: "Deal data fetched successfully",
      dealDetails: {
        ...dealDetails,
        dealOwnership: dealOwnershipArr,
        dealBeneficiaries: dealBeneficiariesArr,
        trustees: trusteesArr,
        dependentParents: dependentParentsArr,
        dependentChildren: dependentChildrenArr,
        contactsSiblings: contactsSiblingsArr,
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
async function fetchMainModules(catalystApp, id) {
  let query = `${queries.dealRelatedData} ${id}`;
  let dealDetails = await catalystApp.zcql().executeZCQLQuery(query);
  if (!dealDetails || dealDetails.length === 0) {
    return {};
  } else {
    return ({ deals, dealPolicyTracking } = dealDetails[0]);
  }
  // return query;
}

exports.countDeals = async (req, res) => {
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  let countQuery = "SELECT COUNT(ROWID) FROM deals";
  try {
      const response = await adminApp.zcql().executeZCQLQuery(countQuery);
      let data = JSON.parse(JSON.stringify(response).replace("COUNT(ROWID)", "total"));
      const total = data?.[0]?.deals?.total;
      res.status(200).json({
          success: true,
          message: "Deals Count Fetched Successfully",
          count: total
      });
  } catch (error) {
      res.status(409).json({
          success: false,
          message: "Deals Count Fetch Issue",
          error: error
      });
  }
}

async function fetchSubModules(catalystApp, id, moduleArr) {
  const queryMap = {
    dealOwnership: `${queries.dealOnwer} ${id}`,
    dealBeneficiaries: `${queries.dealBeneficiaries} ${id}`,
    trustees: `${queries.dealTrustees} ${id}`,
    dependentParents: `${queries.dealDependentParents} ${id}`,
    dependentChildren: `${queries.dealDependentChildren} ${id}`,
    contactsSiblings: `${queries.dealContactsSiblings} ${id}`,
    festivals: `${queries.festivals} ${id}`,
    leadConversionHistory: `${queries.leadConversionHistory} ${id}`,
  };

  try {
    const fetchPromises = moduleArr.map(async (module) => {
      const query = queryMap[module];
      const response = await catalystApp.zcql().executeZCQLQuery(query);
      return response.map((item) => item[module]);
    });

    const [dealOwnershipArr, dealBeneficiariesArr, trusteesArr,dependentParentsArr, dependentChildrenArr, contactsSiblingsArr, festivalsArr,leadConversionHistoryArr] =
      await Promise.all(fetchPromises);

    return { dealOwnershipArr, dealBeneficiariesArr, trusteesArr, dependentParentsArr, dependentChildrenArr, contactsSiblingsArr, festivalsArr, leadConversionHistoryArr };
  } catch (error) {
    console.error("Error fetching sub-modules:", error);
    throw error;
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
      dealId: rowId,
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
    case "dealOwnership":
      return {
        numberOfInsured: item.numberOfInsured ?? "",
        insuredName: item.insuredName ?? "",
        insuredPhone: item.insuredPhone ?? "",
        insuredEmail: item.insuredEmail ?? "",
      };
    case "trustees":
      return {
        nameOfTrustees: item.nameOfTrustees ?? "",
        nameOfBeneficiaryForTrustee: item.nameOfBeneficiaryForTrustee ?? "",
        relationshipWithBeneficiaryForTrustee: item.relationshipWithBeneficiaryForTrustee ?? "",
        trusteePhone: item.trusteePhone ?? "",
        trusteeEmail: item.trusteeEmail ?? "",
      };
    case "beneficiaries":
      return {
        beneficiaryName: item.beneficiaryName ?? "",
        beneficiaryRelationshipWithInsured: item.beneficiaryRelationshipWithInsured ?? "",
        beneficiaryEmail: item.beneficiaryEmail ?? "",
        beneficiaryPhone: item.beneficiaryPhone ?? "",
      };      
    case "dependentParents":
      return {
        relationship: item.relationship ?? "",
        name: item.name ?? "",
        dob: item.dob ?? "",
        email: item.email ?? "",
        phone: item.phone ?? "",
        age: item.age ?? "",
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
        timeOfInteraction: item.timeOfInteraction ? item.timeOfInteraction: "",
        timeSpent: item.timeSpent ??  "",
        contactAttempt: item.contactAttempt ??  "",
        comments: item.comments ??  "",
        interactionOutcome: item.interactionOutcome ??  "",
        probabilityOfClosure: item.probabilityOfClosure ??  "",
      };      
    
    default:
      return {}; // Default case if type is not recognized
  }
}
async function parseDealData(dealInformation,dealOwnership,trustee, beneficiaries,dealInfo,layout) {
  return {
    layout: layout ?? "",
    dealName: dealInformation?.dealName ?? "",
    dealOwner: dealInformation?.dealOwner ?? null,
    insuranceLeadSource: dealInformation?.insuranceLeadSource ?? "",
    currency: dealInformation?.currency ?? "",
    insuranceLeadLookup: dealInformation.insuranceLeadLookup ?? null,
    type: dealInformation?.type ?? "",
    stage: dealInformation?.stage ?? "",
    contactName: dealInformation?.contactName ?? null,
    forecastCategory: dealInformation?.forecastCategory ?? "",
    locationName: dealInformation?.locationName ?? null,
    insuranceLead: dealInformation?.insuranceLead ?? null,
    exchangeRate: dealInformation?.exchangeRate ?? null,
    phoneBurnerFollowUpDate: dealInformation?.phoneBurnerFollowUpDate ?? null,
    roundRobinAssignmentTime: await dateTimeFormat(dealInformation?.roundRobinAssignmentTime) ?? null,
    phoneBurnerLastCallTime: dealInformation?.phoneBurnerLastCallTime ?? null,
    phoneBurnerLastCallOutcome:
      dealInformation?.phoneBurnerLastCallOutcome ?? "",
    reRunRoundRobin: dealInformation?.reRunRoundRobin ?? false,
    emailRoundRobinOwner: dealInformation?.emailRoundRobinOwner ?? false,
    roundRobinProcessed: dealInformation?.roundRobinProcessed ?? false,
    eligibleRoundRobinOwnerFound:
      dealInformation?.eligibleRoundRobinOwnerFound ?? false,
    isClientTheInsured: dealOwnership?.isClientTheInsured ?? "", // Ownership
    areThereMultipleInsuredForThisPolicy:
      dealOwnership?.areThereMultipleInsuredForThisPolicy ?? "", // Ownership
    areThereTrusteesforThisPolicy: trustee?.areThereTrusteesforThisPolicy ?? "", // Trustee
    trustDocumentsReceivedAndUploaded:
      trustee?.trustDocumentsReceivedAndUploaded ?? "", // Trustee
    numberOfTrustees: trustee?.numberOfTrustees ?? null, // Trustee
    trustDissolutionDate: trustee?.trustDissolutionDate ?? null, // Trustee
    applicationOn: trustee?.applicationOn ?? null, // Trustee
    isClientABeneficiary: beneficiaries?.isClientABeneficiary ?? "", // Beneficiaries
    areThereMultipleBeneficiariesExclClient:
      beneficiaries?.areThereMultipleBeneficiariesExclClient ?? "", // Beneficiaries
    numberOfBeneficiariesUpto: beneficiaries?.numberOfBeneficiariesUpto ?? "", // Beneficiaries
    applicationInitiatedOn: dealInfo?.applicationInitiatedOn ?? null, // Deal Info
    currentClaims: dealInfo?.currentClaims ?? "", // Deal Info
    pastClaims: dealInfo?.pastClaims ?? "", // Deal Info
    claimClosedOn: dealInfo?.claimClosedOn ?? null, // Deal Info
    reasonOfClaim: dealInfo?.reasonOfClaim ?? "", // Deal Info
    claimOutcome: dealInfo?.claimOutcome ?? "", // Deal Info
    claimSubmitted: dealInfo?.claimSubmitted ?? "", // Deal Info
    claimAmount: dealInfo?.claimAmount ?? null, // Deal Info
    totalPolicyCommission: parseFloat(dealInfo?.totalPolicyCommission) ?? null, // Deal Info
    dateOfClaim: dealInfo?.dateOfClaim ?? null, // Deal Info
    settlementOrRejectionObservations:
      dealInfo?.settlementOrRejectionObservations ?? "", // Deal Info
    howManyMonthsLeft: dealInfo?.howManyMonthsLeft ?? null, // Deal Info
    returnAmount: dealInfo?.returnAmount ?? null, // Deal Info
    description: dealInfo?.description ?? "", // Deal Info
  };
}
async function parsePolicyTrackingDate(policyTracking, rowId, dealInfo) {
  return {
    dealId: rowId,
    initiatedDate: policyTracking?.initiatedDate ?? null,
    nextFollowUpDate: policyTracking?.nextFollowUpDate ?? null,
    amendmentRequestedDate: policyTracking?.amendmentRequestedDate ?? null,
    amendmentRequestedFor: policyTracking?.amendmentRequestedFor ?? "",
    applicationMedicalRequirement: policyTracking?.applicationMedicalRequirement ?? "",
    applicationConfirmationNumber: policyTracking?.applicationConfirmationNumber ?? null,
    amendmentCompletedDate: policyTracking?.amendmentCompletedDate ?? null,
    applicationMedicalAppointmentDateTime: await dateTimeFormat(policyTracking?.applicationMedicalAppointmentDateTime) ?? null,
    applicationCancelled: policyTracking?.applicationCancelled ?? null,
    applicationPostponed: policyTracking?.applicationPostponed ?? null,
    policyDeclinedDate: policyTracking?.policyDeclinedDate ?? null,
    policyApprovedDate: policyTracking?.policyApprovedDate ?? null,
    policyDeclinedReason: policyTracking?.policyDeclinedReason ?? "",
    approvalRating: policyTracking?.approvalRating ?? "",
    pickupPeriod: policyTracking?.pickupPeriod ?? "",
    startDate: policyTracking?.startDate ?? null,
    policyPickedUp: policyTracking?.policyPickedUp ?? null,
    issuedDate: policyTracking?.issuedDate ?? null,
    medicalRequirement: policyTracking?.medicalRequirement ?? "",
    reviewComments: policyTracking?.reviewComments ?? "",
    commentsUpdatedOn: policyTracking?.commentsUpdatedOn ?? null,
    policyRenewalDate: policyTracking?.policyRenewalDate ?? null,
    confirmationNumber: policyTracking?.confirmationNumber ?? "",
    renewalMedicalApplicationDateTime: await dateTimeFormat(policyTracking?.renewalMedicalApplicationDateTime) ?? null,
    reviewedDate: await dateTimeFormat(policyTracking.reviewedDate) ?? null,
    policyExpiredDate: policyTracking?.policyExpiredDate ?? null,
    renewalCompleted: policyTracking?.renewalCompleted ?? "",
    amountSettled: dealInfo?.amountSettled ?? null,
    policyCommision: dealInfo?.policyCommision ?? null,
    advisorCommision: dealInfo?.advisorCommision ?? null,
    actualPolicyCommision: dealInfo?.actualPolicyCommision ?? null,
    netCommision: dealInfo?.netCommision ?? null,
    netAdvisorCommision: parseFloat(dealInfo?.netAdvisorCommision) ?? null,
    netCorporateCommision: parseFloat(dealInfo?.netCorporateCommision) ?? null,
  };
}
async function parseLifeInsurancePolicyTrackingDate(lifeInsurance,familyTree,facebook, festivalForm,address,applicationCal, rowId) {
  // <<<<<<<<<< dealInformation Table >>>>>>>>>
  return{
    dealId: rowId,
    coverage: lifeInsurance?.coverage ?? "", 
    existingInsurancePolicy: lifeInsurance?.existingInsurancePolicy ?? "", 
    genderPrediction: lifeInsurance?.genderPrediction ?? "",
     referredBy: lifeInsurance?.referredBy ?? "", 
    doYouOwnAHouseinCanada: lifeInsurance?.doYouOwnAHouseinCanada ?? "", 
    additionalContactInfo: lifeInsurance?.additionalContactInfo ?? "", 
    citizenStatus: lifeInsurance?.citizenStatus ?? "",
    dob: new Date(lifeInsurance?.dob) ?? null, 
    bestTimeToCall: lifeInsurance?.bestTimeToCall ?? "", 
    socialMediaInfo: lifeInsurance?.socialMediaInfo ?? "",
    preferredContactMethod: lifeInsurance?.preferredContactMethod ?? "", 
    genderPredictionScore: lifeInsurance?.genderPredictionScore ?? "",
    oldDatabaseLead: lifeInsurance?.oldDatabaseLead ?? "",
    emailIsValid: lifeInsurance?.emailIsValid ?? "",
    reassignment: lifeInsurance?.reassignment ?? "",
    ifreferredbyAdvisor: lifeInsurance?.ifreferredbyAdvisor ?? "", 
    assignedAdvisor: lifeInsurance?.assignedAdvisor ?? "",
    leadCreatedOn: new Date(lifeInsurance?.leadCreatedOn) ?? null,
    insuranceLeadStatus: lifeInsurance?.insuranceLeadStatus ?? "",
    netWorth: lifeInsurance?.netWorth ?? "",
    submitPageURL: lifeInsurance?.submitPageURL ?? "",
    gender: lifeInsurance?.gender ?? "",
     campaignRemove: lifeInsurance?.campaignRemove ?? false,
    rcSmsOptOut: lifeInsurance?.rcSmsOptOut ?? "", 
    assignedCampaigns: lifeInsurance?.assignedCampaigns ?? "",  
    existingPolicyRenewalDueBy: lifeInsurance?.existingPolicyRenewalDueBy ?? "",
    leadStatusStage: lifeInsurance?.leadStatusStage ?? "",
    understandingOfInsurance: lifeInsurance?.understandingOfInsurance ?? null,
    doYouOwnAHomeInCanada: lifeInsurance?.doYouOwnAHomeInCanada ?? null,

    // <=============== familyTree  ==================>
    groupInsurance: familyTree?.groupInsurance || facebook?.groupInsurance || "",
    year: familyTree?.year ?? "",
    potentialBusinessPolicyValues: familyTree?.potentialBusinessPolicyValues ?? "",  
    // <========= facebook ==========>
    adAccount: facebook?.adAccount ?? "",  
    adAccountId: facebook?.adAccountId ?? "",  
    adCampaign: facebook?.adCampaign ?? "",  
    adCampaignId: facebook?.adCampaignId ?? "",  
    faceBookPage: facebook?.faceBookPage ?? "",  
    faceBookPageId: facebook?.faceBookPageId ?? "",  
    costPerLead: facebook?.costPerLead ?? "",  
    adSet: facebook?.adSet ?? "",  
    adSetId: facebook?.adSetId ?? "",  
    facebookAd: facebook?.facebookAd ?? "",  
    adId: facebook?.adId ?? "",  
    leadForm: facebook?.leadForm ?? "",  
    leadFormId: facebook?.leadFormId ?? "",  
    skypeId: facebook?.skypeId ?? "",  
    instagramId: facebook?.instagramId ?? "",  
    linkedinId: facebook?.linkedinId ?? "",  
    twitterId: facebook?.twitterId ?? "",  
    // RRSP FIELDS
    faceBook: facebook?.faceBook ?? "",  
    faceBookAddInfo: facebook?.faceBookAddInfo ?? "",  
    instagram: facebook?.instagram ?? "",  
    linkedin: facebook?.linkedin ?? "",  
    twitter: facebook?.twitter ?? "",
    // groupInsurance: facebook?.groupInsurance ?? "",
    
    netCorporateCommission: parseFloat(applicationCal?.netCorporateCommission) ?? null,

    // <<<<< FESTIVAL >>>>
    religion: festivalForm?.religion ?? "",  
    celebratedFestivals: festivalForm?.celebratedFestivals ?? "",  
    // <========= Address ==========>
      street: address?.street ?? "",  
    state: address?.state ?? "",  
    country: address?.country ?? "",  
    city: address?.city ?? "",  
    zip: parseInt(address?.zip) ?? null,  

  }
}
async function parseLifeInsurancePolicyTrackingData(policyTracking, policyReview,claims, dealId){
  //  <=============== dealPolicyTracking Table ==================>
  return{
    dealId: dealId,
    renewalMedicalApplicationDateTime: await dateTimeFormat(policyTracking.renewalMedicalApplicationDateTime || policyReview.renewalMedicalApplicationDateTime) ?? null,
    applicationInitiatedOn: policyTracking?.applicationInitiatedOn ?? null, 
    nextFollowUpDate: policyTracking?.nextFollowUpDate ?? null, 
    amendmentRequestedDate: policyTracking?.amendmentRequestedDate ?? null, 
    applicationConfirmationNumber: policyTracking?.applicationConfirmationNumber ?? null,
    amendmentCompletedDate: policyTracking?.amendmentCompletedDate ?? null, 
    applicationCancelled: policyTracking?.applicationCancelled ?? null,
    applicationPostponed: policyTracking?.applicationPostponed ?? null,
    policyDeclinedDate: policyTracking?.policyDeclinedDate ?? null, 
    policyApprovedDate: policyTracking?.policyApprovedDate ?? null, 
    startDate: policyTracking?.startDate ?? null, 
    policyPickedUp: policyTracking?.policyPickedUp ?? null, 
    policyIssuedDate:  new Date(policyTracking?.policyIssuedDate) ?? null, 
    amendmentRequestedFor: policyTracking?.amendmentRequestedFor ?? "", 
    policyDeclinedReason: policyTracking?.policyDeclinedReason ?? "", 
    applicationMedicalRequirement: policyTracking?.applicationMedicalRequirement ?? "", 
    approvalRating: policyTracking?.approvalRating ?? "",    
    applicationMedicalAppointmentDateTime: await dateTimeFormat(policyTracking?.applicationMedicalAppointmentDateTime) ?? null,    
    pickupPeriod: policyTracking?.pickupPeriod ?? "",    
    // <==========policyReview=========>
    policyReviewCommentsUpdatedOn: new Date(policyReview?.policyReviewCommentsUpdatedOn) ?? "", 
    policyRenewalDate: policyReview?.policyRenewalDate ?? null, 
    renewalMedicalConfirmationNumber: policyReview?.renewalMedicalConfirmationNumber ?? "",
    reviewdDateandTime: policyReview?.reviewdDateandTime ? await dateTimeFormat(policyReview.reviewdDateandTime) : null,
    policyExpiredDate: new Date(policyReview?.policyExpiredDate) ?? null,
    renewalMedicalRequirement:policyReview?.renewalMedicalRequirement ?? "",
    policyReviewComments:policyReview?.policyReviewComments ?? "",
    policyRenewalCompleted:policyReview?.policyRenewalCompleted ?? "", 
    // <============== claims dealPolicyTracking ===============>
    claimAmount: claims?.claimAmount ?? null, 
    dateOfClaim: claims?.dateOfClaim ?? null,
    claimClosedOn: claims?.claimClosedOn ?? null,
    amountSettled: parseFloat(claims?.amountSettled) ?? null,
    reasonOfClaim: claims?.reasonOfClaim ?? "",
    settlementOrRejectionObservations: claims?.settlementOrRejectionObservations ?? "",
    pastClaims: claims?.pastClaims ?? "",
    currentClaims: claims?.currentClaims ?? "",
    claimSubmitted: claims?.claimSubmitted ?? "",
    claimOutcome: claims?.claimOutcome ?? "",

  }
}
async function parseLifeInsuranceFamilyDetails(familyTree ,rowId){
  //  <<<<<Familly tree table>>>>
  return{
    dealId: rowId,
    relationShipStatus: familyTree?.relationShipStatus ?? "",
    dependentParents: familyTree?.dependentParents ?? "",
    dependentChildren: familyTree?.dependentChildren ?? "",
    dependentChildren: familyTree?.dependentChildren ?? "",
    siblings: familyTree?.siblings ?? "",
    numberOfDependentChildren: familyTree?.numberOfDependentChildren ?? "",
    numberOfSiblings: familyTree?.numberOfSiblings ?? "",
    nameOfSpouse: familyTree?.nameOfSpouse ?? "",
    numberOfSpouse: familyTree?.numberOfSpouse ?? "",
    anniversaryDate: familyTree?.anniversaryDate ?? "",
    spouseDateOfBirth: familyTree?.spouseDateOfBirth ?? "",
    phoneOfSpouse: familyTree?.phoneOfSpouse ?? "",
    emailOfSpouse: familyTree?.emailOfSpouse ?? "",
    numberOfDependentParents: familyTree?.numberOfDependentParents ?? "",
 
  }
}
async function parseLifeInsuranceData(lifeInsurance, dealOwnership, claims, familyTree, applicationCal,leadMgmt,facebook, layout) {
  // <<=== DEAL Table ===>>
  return {
    layout: layout ?? "",
    dealName: lifeInsurance?.dealName ?? "",
    nextFollowUpDate: new Date(lifeInsurance?.nextFollowUpDate) ?? null,  
    // phoneBurnerFollowUpDate: await dateTimeFormat(lifeInsurance?.phoneBurnerFollowUpDate) ?? null,
    
    roundRobinAssignmentTime: await dateTimeFormat(lifeInsurance.roundRobinAssignmentTime)?? null,
    stage: lifeInsurance?.stage ?? "", 
    lifeInsurance: lifeInsurance?.lifeInsurance ?? "",    
    email: lifeInsurance?.email ?? "",
    preferredContactTime: lifeInsurance?.preferredContactTime ?? "",
    reRunRoundRobin: lifeInsurance?.reRunRoundRobin ?? false,
    emailRoundRobinOwner: lifeInsurance?.emailRoundRobinOwner ?? false,
    roundRobinProcessed: lifeInsurance?.roundRobinProcessed ?? false,
    eligibleRoundRobinOwnerFound: lifeInsurance?.eligibleRoundRobinOwnerFound ?? false,
    emailOutput: lifeInsurance?.emailOutput ?? "",
    dealOwner: lifeInsurance?.dealOwner ?? null,
    insuranceLeadSource: lifeInsurance?.insuranceLeadSource ?? "",
    currency: lifeInsurance?.currency ?? "",
    forecastCategory: lifeInsurance?.forecastCategory ?? "",
    contactName: lifeInsurance?.contactName ?? null,
    locationName: lifeInsurance.locationName ? lifeInsurance.locationName: null,
    insuranceLeadLookup: lifeInsurance.insuranceLeadLookup ? lifeInsurance.insuranceLeadLookup: null,
    insuranceLead: lifeInsurance.insuranceLead ? lifeInsurance.insuranceLead: null,
    type: lifeInsurance?.type ?? "",
    // lifeInsurance: lifeInsurance?.lifeInsurance ?? "",
    combinationHybridInsurance: lifeInsurance?.combinationHybridInsurance || facebook?.combinationHybridInsurance || familyTree?.combinationHybridInsurance||false,
    nextFollowUpDateTime: await dateTimeFormat(lifeInsurance?.nextFollowUpDateTime) ?? null,
    // <==========dealOwnership============>
    areThereTrusteesforThisPolicy: dealOwnership?.areThereTrusteesforThisPolicy ?? "",
    trustDocumentsReceivedAndUploaded: dealOwnership?.trustDocumentsReceivedAndUploaded ?? "",
    trustDissolutionDate: dealOwnership?.trustDissolutionDate ?? null,
    applicationOn: dealOwnership?.applicationOn ?? null,
    numberOfTrustees: dealOwnership?.numberOfTrustees ?? null,
    isClientABeneficiary: dealOwnership?.isClientABeneficiary ?? false,
    areThereMultipleBeneficiariesExclClient: dealOwnership?.areThereMultipleBeneficiariesExclClient ?? "",
    numberOfBeneficiariesUpto: dealOwnership?.numberOfBeneficiariesUpto ?? "",
    isClientTheInsured: dealOwnership?.isClientTheInsured ?? "",
    areThereMultipleInsuredForThisPolicy: dealOwnership?.areThereMultipleInsuredForThisPolicy ?? "",
    numberOfInsured: dealOwnership?.numberOfInsured ?? "",    
    
    // // <<<========= Family tree ========>>>
    phoneA: familyTree?.phoneA ?? facebook?.phoneA ?? null,
    referralNameOthers: familyTree?.referralNameOthers ?? "",
    firstVisit: new Date(familyTree?.firstVisit || facebook?.firstVisit) || null,  
    referralNameClient: familyTree?.referralNameClient ?? "", 
    visitorScore: familyTree?.visitorScore || facebook?.visitorScore || "", 
    mostRecentVisit: new Date(familyTree?.mostRecentVisit || facebook?.mostRecentVisit || null),
    firstPageVisited: familyTree?.firstPageVisited || facebook?.firstPageVisited || "", 
    servicesRequested: familyTree?.servicesRequested || facebook?.servicesRequested || "",  
    livingBenefits: familyTree?.livingBenefits || facebook?.livingBenefits || "",  
    loanProtection: familyTree?.loanProtection || facebook?.loanProtection || "",  
    insuranceLeadScoringPositiveScore: familyTree?.insuranceLeadScoringPositiveScore || facebook?.insuranceLeadScoringPositiveScore || "",  
    insuranceLeadScoringTouchPointScore: familyTree?.insuranceLeadScoringTouchPointScore || facebook?.insuranceLeadScoringTouchPointScore || "",  
    insuranceLeadScoringNegativeTouchPointScore: familyTree?.insuranceLeadScoringNegativeTouchPointScore || facebook?.insuranceLeadScoringNegativeTouchPointScore || "",  
    insuranceLeadScoringNegativeScore: familyTree?.insuranceLeadScoringNegativeScore || facebook?.insuranceLeadScoringNegativeScore || "",  
    insuranceLeadScoringPositiveTouchPointScore: familyTree?.insuranceLeadScoringPositiveTouchPointScore || facebook?.insuranceLeadScoringPositiveTouchPointScore || "",  
    insuranceLeadScoringScore: familyTree?.insuranceLeadScoringScore || facebook?.insuranceLeadScoringScore || "", 
    investments: familyTree?.investments || facebook?.investments || "",
    travelInsurance: familyTree?.travelInsurance || facebook?.travelInsurance || "",  
    lifeInsurance: familyTree?.lifeInsurance || facebook?.lifeInsurance || lifeInsurance?.lifeInsurance || "", 
    daysVisited: new Date(familyTree?.daysVisited || facebook?.daysVisited || null),
    numberOfCharts: familyTree?.numberOfCharts || facebook?.numberOfCharts || "",
    averageTimeSpent: familyTree?.averageTimeSpent || facebook?.averageTimeSpent || "",
    productCategoryReferred: familyTree?.productCategoryReferred || facebook?.productCategoryReferred || "",
    referrer: familyTree?.referrer || facebook?.referrer || "",
    referralSource: familyTree?.referralSource || facebook?.referralSource || "",
    secondaryEmail: familyTree?.secondaryEmail || facebook?.secondaryEmail || "",
    fax: familyTree?.fax || facebook?.fax || "",
    // combinationHybridInsurance: familyTree?.combinationHybridInsurance || false,
    healthDentalInsurance: familyTree?.healthDentalInsurance || facebook?.healthDentalInsurance || false,
    // <<<<<<<<<<<======ApplicationCal ============>   
    totalPolicyCommission: parseFloat(applicationCal?.totalPolicyCommission) ?? null,
    howManyMonthsLeft: applicationCal?.howManyMonthsLeft ?? "",
    totalAdvisorCommission: parseFloat(applicationCal?.totalAdvisorCommission) ?? null,
    netCorporateCommissionAfterDeductible: parseFloat(applicationCal?.netCorporateCommissionAfterDeductible) ?? null,
    actualPolicyCommissionAfterDeductibles: parseFloat(applicationCal?.actualPolicyCommissionAfterDeductibles) ?? null,
    returnAmount: parseFloat(applicationCal?.returnAmount) ?? null,
    netAdvisorCommissionAfterDeductible: parseFloat(applicationCal?.netAdvisorCommissionAfterDeductible) ?? null,
    description: applicationCal?.description ?? "",    
    // <============ leadMgmt ===============>      
      totalInteractionTime: leadMgmt?.totalInteractionTime ?? "",
      numberOfContactAttempts: leadMgmt?.numberOfContactAttempts ?? ""      
    }
}
// <<<<<<<<<<<<<<<<<<========== Sample FIle DOWNLOAD =============>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
async function downloadSampleFile(type) {
  try {
    let headers =
      type == "standard" ? standard : type == "lifeInsurence" ? lifeInsurance : type == "rrsp" ? rrsp:critical
    const csvStringifier = createObjectCsvStringifier({
      header: headers,
    });
    const data =
      type == "standerd"
        ? standardData
        : type == "lifeInsurence"
        ? lifeInsurenceData
        : type == "rrsp"
        ? rrspData 
        : criticalInsurenceData;
    const csvContent =
      csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(data);

    return csvContent;
  } catch (error) {
    console.error("Error downloading file:", error);
  }
}