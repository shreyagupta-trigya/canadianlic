"use strict";
var catalyst = require("zcatalyst-sdk-node");
const NodeCache = require("node-cache");
const cache = new NodeCache();
const query = require("../../SQL/leadQuery");
require("dotenv").config();
const PAGE_SIZE = process.env.PAGE_SIZE || 300;
// const query = require("../../SQL/query");
const { createObjectCsvStringifier } = require("csv-writer");
const fs = require("fs");
const path = require("path");
const searchQueryBuilder = require("../searchFilters/searchQueryBuilder");

const {
  insertData,
  updateData,
  insertSubformData,
  updateSubformData,
  deleteSubformData,
} = require("../../Utils/util");
const {
  leadclient,
  leadadvisor,
  clientGenerate,
  advisorGenerate,
  sampleData,
  sample,
} = require("../export/sales/lead/index");
const { networkInterfaces } = require("os");
const { dateTimeFormat } = require("../../Utils/util");
// *********** CRM FUNCTION ***********
const { dataSyncZcrm, generateToken } = require("../crmIntegration/leadCrmIntegration");

exports.test = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "I am live!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "not found" });
  }
};

exports.getLeadById = async (req, res) => {
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  const leadId = req.params.id;
  if (!leadId) {
    return res
      .status(400)
      .json({ success: false, message: "Lead ID is required" });
  }

  try {
    // Helper function to fetch data from a table
    const fetchDataFromTable = async (tableName, leadId) => {
      const result = await adminApp
        .zcql()
        .executeZCQLQuery(`Select * from ${tableName} Where leadId=${leadId}`);
      return result[0]?.[tableName] || null;
    };

    // Fetch all necessary data in parallel
    const [
      leadsResult,
      leadsDescriptionResult,
      familyTree,
      dependentParents,
      contactsSiblings,
      leadConversionHistory,
      festivals,
      dependentChildren,
      emergencyContact,
    ] = await Promise.all([
      fetchDataFromTable("leads", leadId),
      fetchDataFromTable("leadsDescription", leadId),
      fetchDataFromTable("familyTree", leadId),
      fetchDataFromTable("dependentParents", leadId),
      fetchDataFromTable("contactsSiblings", leadId),
      fetchDataFromTable("leadConversionHistory", leadId),
      fetchDataFromTable("festivals", leadId),
      fetchDataFromTable("dependentChildren", leadId),
      fetchDataFromTable("contactEmergencyDetails", leadId),
    ]);

    // Respond with the fetched data
    res.status(200).json({
      success: true,
      message: "Lead result received",
      data: {
        leadsResult,
        leadsDescriptionResult,
        familyTree,
        dependentParents,
        contactsSiblings,
        leadConversionHistory,
        festivals,
        dependentChildren,
        emergencyContact,
      },
    });
  } catch (error) {
    console.error("Error fetching lead data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch lead data",
      error: error.message,
    });
  }
};

exports.leadRelatedData = async (req, res) => {
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  const rowId = req.params.id || req.body.rowId || req.query.rowId;
  let moduleArr = [
    "dependentChildren",
    "dependentParents",
    "contactsSiblings",
    "contactEmergencyDetails",
    "festivals",
    "leadConversionHistory",
  ];
  try {
    let leadDetails = await fetchMainModules(adminApp, rowId);
    let {
      dependentChildrenArr,
      dependentParentsArr,
      contactsSiblingsArr,
      contactEmergencyDetailsArr,
      festivalsArr,
      leadConversionHistoryArr,
    } = await fetchSubModules(adminApp, rowId, moduleArr);

    res.status(200).json({
      success: true,
      message: "Lead data fetched successfully",
      leadDetails: {
        ...leadDetails,
        dependentChildrenData: dependentChildrenArr,
        dependentParentsData: dependentParentsArr,
        siblingData: contactsSiblingsArr,
        emergencyContactData: contactEmergencyDetailsArr,
        festivalsData: festivalsArr,
        LeadData: leadConversionHistoryArr,
      },
    });
  } catch (error) {
    console.error("Error fetching Lead data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Lead data",
      error: error.message || error,
    });
  }
};

exports.createNewLead = async (req, res) => {
  const {
    LeadInformation,
    FamilyTree,
    DescriptonInfo,
    ServiceRequestDetails,
    UMTDetails,
    FestivalForm,
    AddressInformation,
    Facebook,
    LeadManagementInformation,
    module,
    ReferralInformation,
    layoutName,
  } = req.body;

  try {
    const catalystApp = catalyst.initialize(req, { scope: "admin" });

    // Main module data insertion
    const leadData = await parseContactData(LeadInformation, FestivalForm, module);

    let { advisorLead, advisorFaceBook, advisorRefferel } =
      module === "advisor"
        ? await parseAdvisorData(LeadInformation, Facebook, ReferralInformation)
        : { advisorLead: {}, advisorFaceBook: {}, refferel: {} };

    const leadId = await insertData(catalystApp, "leads", {
      ...leadData,
      ...advisorLead,
    });

    // Parsing data
    const familyTreeData = await parseFamiltyTree(FamilyTree, leadId);
    const leadInfoData = await parseLeadInfomration(AddressInformation, Facebook, leadId);
    const descriptionData = module === "client" ? await parseDescription(DescriptonInfo, leadId) : {};
    const servicesData = await parseSerce(ServiceRequestDetails, UMTDetails, leadId);

    const [
      insertChildren,
      insertParents,
      insertSiblings,
      insertEmergencyContacts,
      insertHistory,
      insertFestival
    ] = await Promise.all([
      processSubform(FamilyTree?.dependentChildrenData, leadId, "dependentChildren"),
      processSubform(FamilyTree?.dependentParentsData, leadId, "dependentParents"),
      processSubform(FamilyTree?.siblingData, leadId, "siblings"),
      processSubform(FamilyTree?.emergencyContactData, leadId, "emergencyContacts"),
      processSubform(LeadManagementInformation?.LeadData, leadId, "conversionHistory"),
      processSubform(FestivalForm?.festivalsData, leadId, "festivals")
    ]);

    // Inserting data into tables in parallel
    const [
      familyResult,
      leadInfoResult,
      leadsDescriptionResult,
      servicesResult,
      insertChildrenResp,
      insertParentsResp,
      insertSiblingsResp,
      insertEmergencyContactsResp,
      insertHistoryResp,
      insertFestivalResp
    ] = await Promise.all([
      insertData(catalystApp, "familyTree", familyTreeData),
      insertData(catalystApp, "leadInformations", { ...leadInfoData, ...advisorFaceBook, ...advisorRefferel }),
      module === "client" ? insertData(catalystApp, "leadsDescription", descriptionData) : Promise.resolve({}),
      insertData(catalystApp, "leadService", servicesData),
      insertChildren.length > 0 ? insertSubformData(catalystApp, "dependentChildren", insertChildren) : Promise.resolve([]),
      insertParents.length > 0 ? insertSubformData(catalystApp, "dependentParents", insertParents) : Promise.resolve([]),
      insertSiblings.length > 0 ? insertSubformData(catalystApp, "contactsSiblings", insertSiblings) : Promise.resolve([]),
      insertEmergencyContacts.length > 0 ? insertSubformData(catalystApp, "contactEmergencyDetails", insertEmergencyContacts) : Promise.resolve([]),
      insertHistory.length > 0 ? insertSubformData(catalystApp, "leadConversionHistory", insertHistory) : Promise.resolve([]),
      insertFestival.length > 0 ? insertSubformData(catalystApp, "festivals", insertFestival) : Promise.resolve([])
    ]);

    // CRM Function
    const token = await generateToken();
    const crmId = await dataSyncZcrm(token, { LeadInformation, FamilyTree, DescriptonInfo, ServiceRequestDetails, UMTDetails, FestivalForm, AddressInformation, Facebook, LeadManagementInformation, module, ReferralInformation, layoutName, ROWID: leadId }, req.body?.sourceId);

    await catalystApp.datastore().table("leads").updateRow({ sourceId: crmId, source: "catalyst", ROWID: leadId });

    cache.del(`getAllLeads_page1_limit300`);
    // cache.delete(cacheKey);
    res.status(201).json({
      success: true,
      message: "Lead and related information created successfully",
      resp: {
        lead: leadId,
        description: leadsDescriptionResult,
        family: familyResult,
        leadInfoResult: leadInfoResult,
        services: servicesResult,
        dependentParents: insertParentsResp,
        dependentChildren: insertChildrenResp,
        siblings: insertSiblingsResp,
        emergencyContact: insertEmergencyContactsResp,
        festival: insertFestivalResp,
        conversionHistory: insertHistoryResp,
      },
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(409).json({
      success: false,
      message: "Failed to create Lead",
      error: error.message,
    });
  }
};

// exports.createNewLead = async (req, res) => {
//   const {
//     LeadInformation,
//     FamilyTree,
//     DescriptonInfo,
//     ServiceRequestDetails,
//     UMTDetails,
//     FestivalForm,
//     AddressInformation,
//     Facebook,
//     LeadManagementInformation,
//     module,
//     ReferralInformation,
//     layoutName,
//   } = req.body;

//   try {
//     const catalystApp = catalyst.initialize(req, { scope: "admin" });

//     // <<<<<<<<<<<<<<<<<< ======= MAIN MODULE INSERT DATA INTO TABLE ========= >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//     const leadData = await parseContactData(
//       LeadInformation,
//       FestivalForm,
//       module
//     );
//     // <<<<<<<<<<< IF LEAD IS ADVISOR =======>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//     let { advisorLead, advisorFaceBook, advisorRefferel } =
//       module === "advisor"
//         ? await parseAdvisorData(LeadInformation, Facebook, ReferralInformation)
//         : { advisorLead: {}, advisorFaceBook: {}, refferel: {} };

//     const leadId = await insertData(catalystApp, "leads", {
//       ...leadData,
//       ...advisorLead,
//     });
//     // let leadId = "22106000000468012";
//     // <<<<<<<<<<<<<<<<<< ======= PARSE DATA ========= >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//     const familyTreeData = await parseFamiltyTree(FamilyTree, leadId);
//     const leadInfoData = await parseLeadInfomration(
//       AddressInformation,
//       Facebook,
//       leadId
//     );
//     const descriptionData =
//       module === "client" ? await parseDescription(DescriptonInfo, leadId) : {};
//     const servicesData = await parseSerce(
//       ServiceRequestDetails,
//       UMTDetails,
//       leadId
//     );
//     const { insertArray: insertChildren = [] } = await processSubform(
//       FamilyTree?.dependentChildrenData,
//       leadId,
//       "dependentChildren"
//     );
//     const { insertArray: insertParents = [] } = await processSubform(
//       FamilyTree?.dependentParentsData,
//       leadId,
//       "dependentParents"
//     );
//     const { insertArray: insertSiblings = [] } = await processSubform(
//       FamilyTree?.siblingData,
//       leadId,
//       "siblings"
//     );
//     const { insertArray: insertEmergencyContacts = [] } = await processSubform(
//       FamilyTree?.emergencyContactData,
//       leadId,
//       "emergencyContacts"
//     );
//     const { insertArray: insertHistory = [] } = await processSubform(
//       LeadManagementInformation?.LeadData,
//       leadId,
//       "conversionHistory"
//     );
//     const { insertArray: insertFestival = [] } = await processSubform(
//       FestivalForm?.festivalsData,
//       leadId,
//       "festivals"
//     );

//     // <<<<<<<<<<<<<<<<<< ======= INSERT DATA INTO TABLE ========= >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//     const familyResult = await insertData(
//       catalystApp,
//       "familyTree",
//       familyTreeData
//     );
//     const leadInfoResult = await insertData(catalystApp, "leadInformations", {
//       ...leadInfoData,
//       ...advisorFaceBook,
//       ...advisorRefferel,
//     });
//     const leadsDescriptionResult =
//       module === "client"
//         ? await insertData(catalystApp, "leadsDescription", descriptionData)
//         : {};
//     const servicesResult = await insertData(
//       catalystApp,
//       "leadService",
//       servicesData
//     );
//     const insertChilrenResp =
//       insertChildren.length > 0
//         ? await insertSubformData(
//             catalystApp,
//             "dependentChildren",
//             insertChildren
//           )
//         : [];
//     const insertParentsResp =
//       insertParents.length > 0
//         ? await insertSubformData(
//             catalystApp,
//             "dependentParents",
//             insertParents
//           )
//         : [];
//     const insertSiblingsResp =
//       insertSiblings.length > 0
//         ? await insertSubformData(
//             catalystApp,
//             "contactsSiblings",
//             insertSiblings
//           )
//         : [];
//     const insertEmergencyContactsResp =
//       insertEmergencyContacts.length > 0
//         ? await insertSubformData(
//             catalystApp,
//             "contactEmergencyDetails",
//             insertEmergencyContacts
//           )
//         : [];
//     const insertHistoryResp =
//       insertHistory.length > 0
//         ? await insertSubformData(
//             catalystApp,
//             "leadConversionHistory",
//             insertHistory
//           )
//         : [];
//     const insertFestivalResp =
//       insertFestival.length > 0
//         ? await insertSubformData(catalystApp, "festivals", insertFestival)
//         : [];
//       // ******************* CRM FUNCTION *********************
//       const token =  await generateToken();
//       const crmId = await dataSyncZcrm(token,{LeadInformation,FamilyTree,DescriptonInfo,ServiceRequestDetails,UMTDetails,FestivalForm,AddressInformation,Facebook,LeadManagementInformation,module,ReferralInformation,layoutName,ROWID:leadId},req.body?.sourceId);
//         await catalystApp
//     .datastore()
//     .table("leads")
//     .updateRow({ sourceId: crmId, source: "catalyst",ROWID:leadId});
//     // ******************* END CRM FUNCTION *****************
//     cache.del(`getAllLeads_page1_limit300`);
//     res.status(201).json({
//       success: true,
//       message:
//         "Lead Description services Family DependentParents Siblings Festival emergencyContactResult created successfully",
//       resp: {
//         lead: leadId,
//         description: leadsDescriptionResult,
//         family: familyResult,
//         leadInfoResult: leadInfoResult,
//         services: servicesResult,
//         dependentParents: insertParentsResp,
//         dependentChildren: insertChilrenResp,
//         siblings: insertSiblingsResp,
//         emergencyContact: insertEmergencyContactsResp,
//         festival: insertFestivalResp,
//         conversionHistory: insertHistoryResp,
//       },
//     });
//   } catch (error) {
//     console.error("Error creating contact:", error);
//     res.status(409).json({
//       success: false,
//       message: "Failed to create Lead",
//       error: error,
//     });
//   }
// };
exports.updateNewLead = async (req, res) => {
  const {
    LeadInformation,
    FamilyTree,
    DescriptonInfo,
    ServiceRequestDetails,
    UMTDetails,
    FestivalForm,
    AddressInformation,
    Facebook,
    LeadManagementInformation,
    module,
    ReferralInformation,
    layoutName,
  } = req.body;
  const rowId = req.params.id;
  try {
    const catalystApp = catalyst.initialize(req, { scope: "admin" });

    // <<<<<<<<<<<<<<<<<< ======= PARSE DATA ========= >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const leadsData = await parseContactData(
      LeadInformation,
      FestivalForm,
      layoutName
    );
    const familyTreeData = await parseFamiltyTree(FamilyTree, rowId);
    const leadInfoData = await parseLeadInfomration(
      AddressInformation,
      Facebook,
      rowId
    );
    const descriptionData =
      module === "client" ? await parseDescription(DescriptonInfo, rowId) : {};
    const servicesData = await parseSerce(
      ServiceRequestDetails,
      UMTDetails,
      rowId
    );
    // <<<<<<<<<<< IF LEAD IS ADVISOR =======>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    let { advisorLead, advisorFaceBook, advisorRefferel } =
      module === "advisor"
        ? await parseAdvisorData(LeadInformation, Facebook, ReferralInformation)
        : { advisorLead: {}, advisorFaceBook: {}, advisorRefferel: {} };
    // <<<<<<<<<<< IF LEAD IS ADVISOR =======>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const {
      updateArray: updateChildren = [],
      insertArray: insertChildren = [],
    } = await processSubform(
      FamilyTree.dependentChildrenData,
      rowId,
      "dependentChildren"
    );
    const { updateArray: updateParents = [], insertArray: insertParents = [] } =
      await processSubform(
        FamilyTree.dependentParentsData,
        rowId,
        "dependentParents"
      );
    const {
      updateArray: updateSiblings = [],
      insertArray: insertSiblings = [],
    } = await processSubform(FamilyTree.siblingData, rowId, "siblings");
    const {
      updateArray: updateEmergencyContacts = [],
      insertArray: insertEmergencyContacts = [],
    } = await processSubform(
      FamilyTree.emergencyContactData,
      rowId,
      "emergencyContacts"
    );
    const { updateArray: updateHistory = [], insertArray: insertHistory = [] } =
      await processSubform(
        LeadManagementInformation?.LeadData ?? "",
        rowId,
        "conversionHistory"
      );
    const {
      updateArray: updateFetival = [],
      insertArray: insertFestival = [],
    } = await processSubform(FestivalForm.festivalsData, rowId, "festivals");

    // <<<<<<<<<<<<<<<<<< ======= UPDATE DATA INTO TABLE ========= >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const leadResult = await updateData(catalystApp, "leads", {
      ...leadsData,
      ROWID: rowId,
      ...advisorLead,
    });
    const familyResult = await updateData(catalystApp, "familyTree", {
      ...familyTreeData,
      ROWID: FamilyTree.ROWID,
    });
    const leadInfoResult = await updateData(catalystApp, "leadInformations", {
      ...leadInfoData,
      ROWID: Facebook.ROWID,
      ...advisorFaceBook,
      ...advisorRefferel,
    });
    const leadsDescriptionResult =
      module === "client"
        ? await updateData(catalystApp, "leadsDescription", {
            ...descriptionData,
            ROWID: DescriptonInfo.ROWID,
          })
        : {};
    const servicesResult = await updateData(catalystApp, "leadService", {
      ...servicesData,
      ROWID: ServiceRequestDetails.ROWID,
    });

    // <<<<<<<<<<<<<<<<<< ======= INSERT SUBFORM DATA INTO TABLE ========= >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const insertChilrenResp =
      insertChildren.length > 0
        ? await insertSubformData(
            catalystApp,
            "dependentChildren",
            insertChildren
          )
        : [];
    const insertParentsResp =
      insertParents.length > 0
        ? await insertSubformData(
            catalystApp,
            "dependentParents",
            insertParents
          )
        : [];
    const insertSiblingsResp =
      insertSiblings.length > 0
        ? await insertSubformData(
            catalystApp,
            "contactsSiblings",
            insertSiblings
          )
        : [];
    const insertEmergencyContactsResp =
      insertEmergencyContacts.length > 0
        ? await insertSubformData(
            catalystApp,
            "contactEmergencyDetails",
            insertEmergencyContacts
          )
        : [];
    const insertHistoryResp =
      insertHistory.length > 0
        ? await insertSubformData(
            catalystApp,
            "leadConversionHistory",
            insertHistory
          )
        : [];
    const insertFestivalResp =
      insertFestival.length > 0
        ? await insertSubformData(catalystApp, "festivals", insertFestival)
        : [];

    // <<<<<<<<<<<<<<<<<< ======= UPDATE SUBFORM DATA INTO TABLE ========= >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const updateChilrenResp =
      updateChildren.length > 0
        ? await updateSubformData(
            catalystApp,
            "dependentChildren",
            updateChildren
          )
        : [];
    const updateParentsResp =
      updateParents.length > 0
        ? await updateSubformData(
            catalystApp,
            "dependentParents",
            updateParents
          )
        : [];
    const updateSiblingsResp =
      updateSiblings.length > 0
        ? await updateSubformData(
            catalystApp,
            "contactsSiblings",
            updateSiblings
          )
        : [];
    const updateEmergencyContactsResp =
      updateEmergencyContacts.length > 0
        ? await updateSubformData(
            catalystApp,
            "contactEmergencyDetails",
            updateEmergencyContacts
          )
        : [];
    const updateHistoryResp =
      updateHistory.length > 0
        ? await updateSubformData(
            catalystApp,
            "leadConversionHistory",
            updateHistory
          )
        : [];
    const updateFetivalResp =
      updateFetival.length > 0
        ? await updateSubformData(catalystApp, "festivals", updateFetival)
        : [];
      // ************* CRM FUNCTION****************
      const token =  await generateToken();
      const crmId = await dataSyncZcrm(token,{LeadInformation,FamilyTree,DescriptonInfo,ServiceRequestDetails,UMTDetails,FestivalForm,AddressInformation,Facebook,LeadManagementInformation,module,ReferralInformation,layoutName,ROWID:rowId},req.body?.LeadInformation?.sourceId);
      // ************* CRM FUNCTION****************
      cache.del(`getAllLeads_page1_limit300`);
    res.status(201).json({
      success: true,
      message:
        "Lead Description services Family DependentParents Siblings Festival emergencyContactResult Updated  successfully",
      resp: {
        lead: leadResult,
        family: familyResult,
        leadInfoResult: leadInfoResult,
        description: leadsDescriptionResult,
        services: servicesResult,
        insertChilrenResp,
        insertParentsResp,
        insertSiblingsResp,
        insertEmergencyContactsResp,
        insertHistoryResp,
        insertFestivalResp,
        updateChilrenResp,
        updateParentsResp,
        updateSiblingsResp,
        updateEmergencyContactsResp,
        updateHistoryResp,
        updateFetivalResp,
      },
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(409).json({
      success: false,
      message: "Failed to create Lead",
      error: error,
    });
  }
};
exports.countLeads = async (req, res) => {
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  let countQuery = query.countQuery;
  try {
      const response = await adminApp.zcql().executeZCQLQuery(countQuery);
      let data = JSON.parse(JSON.stringify(response).replace("COUNT(ROWID)", "total"));
      const total = data?.[0]?.leads?.total;
      res.status(200).json({
          success: true,
          message: "Lead Count Fetched Successfully",
          count: total
      });
  } catch (error) {
      res.status(409).json({
          success: false,
          message: "Lead Count Fetch Issue",
          error: error
      });
  }
}
exports.getAllLeads = async (req, res) => {
  try {
    const { search } = req.body;

    const rowId = req.params.id;
    const page = parseInt(req.body.page, 10) || 1;
    const limit = parseInt(req.body.limit, 10) || 10;
    const offset = (page - 1) * limit;
    const fieldMapping = { createdTime:"CREATEDTIME", layout:"layoutName", insurenceLeadNameAll:["firstName","lastName"], email:"email", phone:"phoneNumber", assignedAdvisor: ["advisors.firstName", "advisors.lastName"], status:"leadStatus", serviceRequested:"leadService.servicesRequested", gclidData:"leadService.gclidData", lastActivityTime:"MODIFIEDTIME", createdBy :["userData.firstName","userData.lastName"] , lpUrlData:"leadService.lpUrlData" , facebookAd:"leadInformations.facebookAd", adCampaignName:"leadInformations.adCampaignName"};
    let searchConditions = searchQueryBuilder(search, fieldMapping);
  
    if (rowId) {
      const rowIdCondition = `ROWID = '${rowId}'`;
      searchConditions = searchConditions ? `AND ${searchConditions} AND ${rowIdCondition}` : rowIdCondition;
    }

    const whereClause = searchConditions ? `AND (${searchConditions})` : '';
  
    const leadQuery = query.getAllLeads
    .replace('%SEARCH_CONDITION%', whereClause)
    .replace('%LIMIT%', limit)
    .replace('%OFFSET%', offset);

    console.log("leadQuery--->", leadQuery);
    
    const leadDetails = await catalyst.initialize(req, { scope: "admin" }).zcql().executeZCQLQuery(leadQuery);

    if (!leadDetails || leadDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No leads were found at this time",
      });
    }

    // cache.set(cacheKey, leadDetails, 10000);

    res.status(200).json({
      success: true,
      message: "Lead data fetched successfully",
      leadDetails,
    });
  } catch (error) {
    console.error("Error fetching lead data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch lead data",
      error: error.message || error,
    });
  }
};
exports.deleteLead = async (req, res) => {
  try {
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const leadId = req.params.id || req.body.ids;
    // console.log("leadId: ", leadId);
    
    let deleteQuery = `${query.deleteLead} (${leadId})`;     
    const leadDetails = await adminApp.zcql().executeZCQLQuery(deleteQuery);
    const { page = 1, limit = 300 } = req.query;
    cache.del(`getAllLeads_page${page}_limit${limit}`);
    res.status(200).json({
      success: true,
      message: "Lead and associated data deleted successfully",
      data: leadDetails,
    });
  } catch (error) {
    console.error("Error deleting lead:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete lead and associated data",
      error: error.message || error,
    });
  }
};

exports.getLeads = async (req, res) => {
  const app = catalyst.initialize(req, { scope: 'admin' });
  try {
      const rowId = req.params.id;
      const { search } = req.body;
      const page = parseInt(req.body.page, 10) || 1;
      const limit = parseInt(req.body.limit, 10) || 10;
      const offset = (page - 1) * limit;
      const fieldMapping = { firstName:"firstName", lastName:"lastName" , email:"email" , title:"title" , contactNumber:"contactNumber" , leadStatus:"leadStatus" , enquiryType:"enquiryType" , leadDealingPerson:"leadDealingPerson" , leadSource:"leadSource" , company:"company" , instrumentName:"instrumentName" , dateTime: "CREATEDTIME" , modifiedTime: "MODIFIEDTIME" , creatorId:"CREATORID" };
      let searchConditions = searchQueryBuilder(search, fieldMapping);
      if (rowId) {
          const rowIdCondition = `ROWID = '${rowId}'`;
          searchConditions = searchConditions ? `${searchConditions} AND ${rowIdCondition}` : rowIdCondition;
      }
      const whereClause = searchConditions ? ` AND (${searchConditions})` : '';

      let leadQuery = queries.leadQuery.getLeadsQuery
          .replace('%SEARCH_CONDITION%', whereClause)
          .replace('%LIMIT%', limit)
          .replace('%OFFSET%', offset);
      // console.log("leadQuery", leadQuery);
      const response = await app.zcql().executeZCQLQuery(leadQuery);
      if (response.length === 0) {
          return res.status(404).json({ success: false, message: 'Leads not found!' });
      }
      res.status(200).json({ success: true, message: 'Leads retrieved successfully!', response });
  } catch (error) {
      console.error(error);
      res.status(409).json({ success: false, message: 'Failed! Cannot retrieve Leads!', error: error.message });
  }
};

exports.leadConvert = async (req, res) => {
  const convertData = req.body;
  const leadId = req.params.id;
  const catalystApp = catalyst.initialize(req, { scope: "admin" });
  let dealId = "";
  let advisorId = "";
  let contactId = "";
  // // Get Lead
  const leadData = await catalystApp
    .datastore()
    .table("leads")
    .getRow(leadId)
    .catch((error) => {
      console.log("Lead Pulling Issue:", error);
      res
        .status(403)
        .json({ success: false, message: "Lead Pulling Issue", output: error });
    });

  // if (!leadData) return;
  if (convertData.leadLayoutName === "Client") {
    //  Contact Creation
    contactId = await createContact(leadData, catalystApp, leadId, convertData);
  } else {
    advisorId = await createAdvisor(leadData, catalystApp, leadId, convertData);
  }
  // //  Contact Creation
  // // Deal Creation
  if (convertData.isChecked === true) {
    dealId = await createDeal(
      catalystApp,
      leadId,
      convertData,
      contactId,
      advisorId
    );
  }

  // Update Lead
  const updateLeadData = {
    leadStatus: "Converted",
    ROWID: leadId,
  };
  await catalystApp
    .datastore()
    .table("leads")
    .updateRow(updateLeadData)
    .catch((error) => {
      console.log("Lead Update Issue:", error);
      res
        .status(403)
        .json({ success: false, message: "Lead Update Issue", output: error });
      return "";
    });
  res.status(200).json({
    leadId: leadId,
    contactid: contactId,
    dealid: dealId,
    advisorId: advisorId,
  });
};
exports.downloadFile = async (req, res) => {
  const { type } = req.body;
  const csvContent = await downloadFile(type);
  // Send the CSV file for download
  res.setHeader("Content-disposition", "attachment; filename=sample.csv");
  res.set("Content-Type", "text/csv");
  res.status(200).send(csvContent);
  // res.status(200).send(csvContent);
};
exports.testUat = async (req, res) => {
  const { obj1, obj2 } = req.body;
  const additionalKeys = findAdditionalKeys(obj1, obj2);
  // console.log("additionalKeys", additionalKeys);
  // const catalystApp = catalyst.initialize(req, { scope: "admin" });
  // const result = await catalystApp.datastore().table("contactsSiblings").updateRows(payload);
  res.status(200).json({ status: "Success", additionalKeys });
};
// <<<<<<<<<<<<========= DATA FETCHING FUNCTIONS =============>>>>>>>>>>>>>>>>>>>>>>>>>>>>
async function fetchMainModules(catalystApp, id) {
  let queries = `${query.leadRelatedData} ${id}`;
  // console.log("queries<===>", queries);
  let leadDetails = await catalystApp.zcql().executeZCQLQuery(queries);
  // console.log("leadDetails <==>",leadDetails)
  if (!leadDetails || leadDetails.length === 0) {
    return {};
  } else {
    const {
      leads,
      leadsDescription,
      leadService,
      familyTree,
      leadInformations,
    } = leadDetails[0];
    return {
      leads,
      leadsDescription,
      leadService,
      familyTree,
      leadInformations,
    };
  }
  // return query;
}
async function fetchSubModules(catalystApp, id, moduleArr) {
  const queryMap = {
    dependentChildren: `${query.depChildren} ${id}`,
    dependentParents: `${query.depParents} ${id}`,
    contactsSiblings: `${query.contSiblings} ${id}`,
    contactEmergencyDetails: `${query.contEmergency} ${id}`,
    festivals: `${query.festivals} ${id}`,
    leadConversionHistory: `${query.leadConvHis} ${id}`,
  };

  try {
    const fetchPromises = moduleArr.map(async (module) => {
      const query = queryMap[module];
      // console.log("query",query)
      const response = await catalystApp.zcql().executeZCQLQuery(query);
      // console.log("response",response)

      return response.map((item) => item[module]);
    });

    const [
      dependentChildrenArr,
      dependentParentsArr,
      contactsSiblingsArr,
      contactEmergencyDetailsArr,
      festivalsArr,
      leadConversionHistoryArr,
    ] = await Promise.all(fetchPromises);

    return {
      dependentChildrenArr,
      dependentParentsArr,
      contactsSiblingsArr,
      contactEmergencyDetailsArr,
      festivalsArr,
      leadConversionHistoryArr,
    };
  } catch (error) {
    console.error("Error fetching sub-modules:", error);
    throw error;
  }
}
// <<<<<<<<<<<<<<<<<<<<< CONVERT LEAD FUNCTIONS =============>>>>>>>>>>>>>>>>>>>>>>>>>>>>
async function createContact(leadData, catalystApp, leadId, convertData) {
  console.log(
    "<<<<<<<<<<<<<<<<<<<< Contact >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  );
  const contactData = {
    firstName: leadData.firstName ? leadData.firstName : "",
    lastName: leadData.lastName ? leadData.lastName : "",
    mobile: leadData.mobile ? leadData.mobile : "",
    email: leadData.email ? leadData.email : "",
    contactOwner: convertData.owner ? convertData.owner : null,
    status: "Active",
    leadId: leadId,
    layoutName: convertData.leadLayoutName === "Client" ? "" : "null",
  };
  const contactResp = await catalystApp
    .datastore()
    .table("contacts")
    .insertRow(contactData)
    .catch((error) => {
      console.log("Contact insert Issue:", error);
      throw error;
    });
  return contactResp.ROWID;
}
async function createAdvisor(leadData, catalystApp, leadId, convertData) {
  console.log(
    "<<<<<<<<<<<<<<<<<<<< Advisor >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  );
  const advisorData = {
    firstName: leadData.firstName ? leadData.firstName : "",
    lastName: leadData.lastName ? leadData.lastName : "",
    mobile: leadData.mobile ? leadData.mobile : "",
    email: leadData.email ? leadData.email : "",
    advisorOwner: convertData.owner ? convertData.owner : null,
    status: "Active",
    leadId: leadId,
  };
  const advisorResp = await catalystApp
    .datastore()
    .table("advisors")
    .insertRow(advisorData)
    .catch((error) => {
      console.log("Contact insert Issue:", error);
      throw error;
    });
  return advisorResp.ROWID;
}
async function createDeal(
  catalystApp,
  leadId,
  convertData,
  contactId,
  advisorId
) {
  console.log(
    "<<<<<<<<<<<<<<<<<<<< DEAL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  );
  const dealData = {
    dealName: convertData.dealName ? convertData.dealName : "",
    status: "Active",
    contactName: contactId ? contactId : null,
    advisorsId: advisorId ? advisorId : null,
    dealOwner: convertData.owner ? convertData.owner : null,
    dealStage: convertData.stage ? convertData.stage : "",
    claimAmount: convertData.amount ? convertData.amount : null,
    insuranceLead: leadId,
    campaignSource: convertData.campaignSource
      ? convertData.campaignSource
      : null,
    contactRole: convertData.contactRole ? convertData.contactRole : null,
    claimClosedOn: convertData.closeDate ? convertData.closeDate : null,
    layout: convertData.layoutName ? convertData.layoutName : "",
  };
  try {
    const dealResp = await catalystApp
      .datastore()
      .table("deals")
      .insertRow(dealData)
      .catch((error) => {
        console.log("Deal insert Issue:", error);
        throw error;
      });
    return dealResp.ROWID;
  } catch (error) {
    console.error("Error creating Deal:", error);
    res.status(409).json({
      success: false,
      message: "Failed to create Deal",
      error: error,
    });
  }
}

// <<<<<<<<<<<<<========= PARSE DATA FUNCTIONS CONTACT=============>>>>>>>>>>>>>>>>>>>>>>>>>>>>
async function parseContactData(formData, festival, layoutName) {
  return {
    insuranceLeadOwner: formData?.insuranceLeadOwner ?? null,
    insuranceLeadSource: formData?.insuranceLeadSource ?? "",
    firstName: formData?.firstName ?? "",
    lastName: formData?.lastName ?? "",
    mobile: formData?.mobile ?? "",
    insuranceLeadStatus: formData?.insuranceLeadStatus ?? "",
    whatsapp: formData?.whatsapp ?? "",
    leadStatusStage: formData?.leadStatusStage ?? "",
    email: formData?.email ?? "",
    assignedAdvisor: formData?.assignedAdvisor ?? null,
    emailIsValid: formData?.emailIsValid ?? "",
    emailOptOut: formData?.emailOptOut ?? false,
    removeFromCampaign: formData?.removeFromCampaign ?? false,
    dateOfBirth: formData?.dateOfBirth ?? null,
    bestTimeToCall: formData?.bestTimeToCall ?? "",
    gender: formData?.gender ?? "",
    isThisaReassignment: formData?.isThisaReassignment ?? "",
    locationName: formData?.locationName ?? null,
    referredBy: formData?.referredBy ?? null,
    netWorth: formData?.netWorth ?? "",
    preferredContactMethod: formData?.preferredContactMethod ?? "",
    socialMediaInformation: formData?.socialMediaInformation ?? "",
    roundRobinProcessed: formData?.roundRobinProcessed ?? false,
    citizenshipStatus: formData?.citizenshipStatus ?? "",
    understandingOfInsurance: formData?.understandingOfInsurance ?? "",
    roundRobinAssignmentTime:
      (await dateTimeFormat(formData?.roundRobinAssignmentTime)) ?? null,
    existingInsurancePolicy: formData?.existingInsurancePolicy ?? "",
    eligibleRoundRobinOwnerFound:
      formData?.eligibleRoundRobinOwnerFound ?? false,
    doYouOwnaHomeInCanada: formData?.doYouOwnaHomeInCanada ?? "",
    leadCreatedOn: (await dateTimeFormat(formData?.leadCreatedOn)) ?? null,
    doYouhaveLifeInsurance: formData?.doYouhaveLifeInsurance ?? "",
    oldDatabaseLead: formData?.oldDatabaseLead ?? "",
    nextFollowUpDateTime:
      (await dateTimeFormat(formData?.nextFollowUpDateTime)) ?? null,
    genderPredictionScore: formData?.genderPredictionScore ?? "",
    submitPageURL: formData?.submitPageURL ?? "",
    assignedCampaigns: formData?.assignedCampaigns ?? "",
    areYouReadyToPurchaseThisLifeInsurancePoli:
      formData?.areYouReadyToPurchaseThisLifeInsurancePoli ?? "",
    areYouReadyToPurchaseThisLifeInsurancePol:
      formData?.areYouReadyToPurchaseThisLifeInsurancePol ?? false,
    assignedCampaigns: formData?.assignedCampaigns ?? "",
    genderPrediction: formData?.genderPrediction ?? "",
    inboxURL: formData?.inboxURL ?? "",
    additionalContactInformation: formData?.additionalContactInformation ?? "",
    areYouLLQPLicensed: formData?.areYouLLQPLicensed ?? "",
    phoneBurnerFollowUpDate:
      new Date(formData?.phoneBurnerFollowUpDate) ?? null,
    phoneBurnerLastCallOutcome: formData?.phoneBurnerLastCallOutcome ?? "",
    phoneBurnerLastCallTime:
      (await dateTimeFormat(formData?.phoneBurnerLastCallTime)) ?? null,
    driverLicenseNo: formData?.driverLicenseNo ?? "",
    vehicleYear: formData?.vehicleYear ?? "",
    whatIsYourPostalCode: formData?.whatIsYourPostalCode ?? "",
    whenWasYourVehicleMade: formData?.whenWasYourVehicleMade ?? "",
    phoneNumber: formData?.phoneNumber ?? "",
    name: formData?.name ?? "",
    addEmail1: formData?.addEmail1 ?? "",
    quote: formData?.quote ?? "",
    deposit: formData?.deposit ?? "",
    dateOfBirth1: formData?.dateOfBirth1 ?? null,
    childAge: formData?.childAge ?? "",
    howMuchYouLikeToStartThePlan: formData?.howMuchYouLikeToStartThePlan ?? "",
    howMuchAmountWantToStartWith: formData?.howMuchAmountWantToStartWith ?? "",
    startDateOfCoverage: new Date(formData?.startDateOfCoverage) ?? null,
    dateOfBirthOfTraveler: formData?.dateOfBirthOfTraveler ?? null,
    religion: festival?.religion ?? "",
    celebratedFestivals: festival?.celebratedFestivals ?? "",
    whereWouldYouBeTravellingto: formData?.whereWouldYouBeTravellingto ?? "",
    whattypeofStudent: formData?.whattypeofStudent ?? "",
    tripType: formData?.tripType ?? "",
    currency: formData?.currency ?? "",
    exchangeRate: formData?.exchangeRate ?? null,
    leadID: formData?.leadID ?? "",
    reRunRoundRobin: formData?.reRunRoundRobin ?? "false",
    emailRoundRobinOwner: formData?.emailRoundRobinOwner ?? "false",
    rcSmsOptOut: formData?.rcSmsOptOut ?? "false",
    // layoutName: module === "client" ? "Client" : " Advisor Leads",
    layoutName: layoutName ?? "",
    preferredContactTime: formData?.preferredContactTime ?? "",
  };
}
async function parseFamiltyTree(familyTree, leadId) {
  return {
    leadId: leadId,
    relationShipStatus: familyTree?.relationShipStatus ?? "",
    numberOfSpouse: familyTree?.numberOfSpouse ?? "",
    anniversaryDate: familyTree?.anniversaryDate ?? null,
    nameOfSpouse: familyTree?.nameOfSpouse ?? "",
    spouseDateOfBirth: familyTree?.spouseDateOfBirth ?? null,
    phoneOfSpouse: familyTree?.phoneOfSpouse ?? "",
    emailOfSpouse: familyTree?.emailOfSpouse ?? "",
    nameOfCommonLawPartner: familyTree?.nameOfCommonLawPartner ?? "",
    commonLawDateOfBirth: familyTree?.commonLawDateOfBirth ?? "",
    dependentParents: familyTree?.dependentParents ?? "",
    numberOfDependentParents: familyTree?.numberOfDependentParents ?? "",
    dependentChildren: familyTree?.dependentChildren ?? "",
    numberOfDependentChildren: familyTree?.numberOfDependentChildren ?? "",
    siblings: familyTree?.siblings ?? "",
    numberOfSiblings: familyTree?.numberOfSiblings ?? "",
    depChildren: familyTree?.depChildren ?? "",
    depSiblings: familyTree?.depSiblings ?? "",
    depParents: familyTree?.depParents ?? "",
  };
}
async function parseLeadInfomration(address, faceBook, leadId) {
  return {
    leadId: leadId,
    street: address?.street ?? "",
    state: address?.state ?? "",
    country: address?.country ?? "",
    city: address?.city ?? "",
    zipCode: address?.zipCode ?? "",
    adAccount: faceBook?.adAccount ?? "",
    adAccountId: faceBook?.adAccountId ?? "",
    adCampaign: faceBook?.adCampaign ?? "",
    adCampaignId: faceBook?.adCampaignId ?? "",
    facebookPage: faceBook?.facebookPage ?? "",
    facebookPageId: faceBook?.facebookPageId ?? "",
    costPerLead: faceBook?.costPerLead ?? "",
    adSet: faceBook?.adSet ?? "",
    adSetId: faceBook?.adSetId ?? "",
    facebookAd: faceBook?.facebookAd ?? "",
    adId: faceBook?.adId ?? "",
    leadForm: faceBook?.leadForm ?? "",
    leadFormId: faceBook?.leadFormId ?? "",
    facebookAdInformation: faceBook?.facebookAdInformation ?? "",
  };
}
async function parseDescription(description, leadId) {
  return {
    leadId: leadId,
    typeOfInsuranceLooking: description?.typeOfInsuranceLooking ?? "", //
    whatPolicyDoYouWant: description?.whatPolicyDoYouWant ?? "", //
    ageOf1stTraveler: description?.ageOf1stTraveler ?? "",
    enterageOf2ndTraveler: description?.enterageOf2ndTraveler ?? "", //
    travelerStartDate: description?.travelerStartDate ?? null,
    travelerEndDate: description?.travelerEndDate ?? "", //
    coverageYouAreLookingFor: description?.coverageYouAreLookingFor ?? "",
    preExistingmedicaLconditions:
      description?.preExistingmedicaLconditions ?? "", //
    howMuchCoverageIsRequired: description?.howMuchCoverageIsRequired ?? "",
    canYouPleaseLetMeKnowPremiumPaymentMode:
      description?.canYouPleaseLetMeKnowPremiumPaymentMode ?? "",
    tobaccoused: description?.tobaccoused ?? "",
    whatTypeOfTermPlanAreYouLookingFor:
      description?.whatTypeOfTermPlanAreYouLookingFor ?? "",
    doYouWantCriticalIllnessInsuranceWithMoney:
      description?.doYouWantCriticalIllnessInsuranceWithMoney ?? "",
    howDoYouConsiderYourHealth: description?.howDoYouConsiderYourHealth ?? "",
    whatsYourProfession: description?.whatsYourProfession ?? "",
    howManyCriticalIllnessCoverageYouNeed:
      description?.howManyCriticalIllnessCoverageYouNeed ?? "",
    howMuchMonthlyBenefitDoYouNeed:
      description?.howMuchMonthlyBenefitDoYouNeed ?? "",
    selectTheDurationOfTheCoverage:
      description?.selectTheDurationOfTheCoverage ?? "",
    youAreSeekingCoverageFor: description?.youAreSeekingCoverageFor ?? "",
    enterTheAmountOfMortgageCoverageRequired:
      description?.enterTheAmountOfMortgageCoverageRequired ?? "",
    whatsYourAge: description?.whatsYourAge ?? "",
    doYouHaveAnyMedicalIssue: description?.doYouHaveAnyMedicalIssue ?? "",
    secureYourChildsFutureWithHigherEducation:
      description?.secureYourChildsFutureWithHigherEducation ?? "",
    howMuchDoYouWantToSaveMonthly:
      description?.howMuchDoYouWantToSaveMonthly ?? "",
    wouldLikeToIncreaseMonthlyDeposits:
      description?.wouldLikeToIncreaseMonthlyDeposits ?? "",
    howManyChildrensDoYouHave: description?.howManyChildrensDoYouHave ?? "",
    eligibleToGetExtra2000InGovernmentGrants:
      description?.eligibleToGetExtra2000InGovernmentGrants ?? null,
    whatIsYourResidencyStatusInCanada:
      description?.whatIsYourResidencyStatusInCanada ?? "",
    depositEveryMonthTowardsYourChildEducation:
      description?.depositEveryMonthTowardsYourChildEducation ?? "",
    howLongDoYouNeedCoverageFor: description?.howLongDoYouNeedCoverageFor ?? "",
    wouldYouLikeToKnowHowRespWorks:
      description?.wouldYouLikeToKnowHowRespWorks ?? "",
    moneyRequireToCompleteYourChildEducation:
      description?.moneyRequireToCompleteYourChildEducation ?? "",
    selectYourAgeBracket: description?.selectYourAgeBracket ?? "",
    oneMillionInanRespAccountAtRetirement:
      description?.oneMillionInanRespAccountAtRetirement ?? "",
    howMuchdoYouWantToSaveYearly:
      description?.howMuchdoYouWantToSaveYearly ?? "",
    doYouWanToDepositMonthlyOrYearlyPremium:
      description?.doYouWanToDepositMonthlyOrYearlyPremium ?? "",
    wouldYouLikeToKnowHowTfsaWorks:
      description?.wouldYouLikeToKnowHowTfsaWorks ?? "",
    whatageDoYouWanttostartTheWithdrawalFrom:
      description?.whatageDoYouWanttostartTheWithdrawalFrom ?? "",
    whatKindOfBusinesssIsIt: description?.whatKindOfBusinesssIsIt ?? "",
    wouldYouLikeToKnowHowRrspWorks:
      description?.wouldYouLikeToKnowHowRrspWorks ?? "",
    oneMillionInAnTfsaAccountAtRetirement:
      description?.oneMillionInAnTfsaAccountAtRetirement ?? "",
    areYouAnOwnerOrEmployeeOfTheBusiness:
      description?.areYouAnOwnerOrEmployeeOfTheBusiness ?? "",
    areYouLookingForDrugAndDentalOrJustDrugPla:
      description?.areYouLookingForDrugAndDentalOrJustDrugPla ?? "",
    areYouLicensedAsAnInsuranceAdvisor:
      description?.areYouLicensedAsAnInsuranceAdvisor ?? "",
    whatTimeFrameYouLikeToMoveToBeaAdvisor:
      description?.whatTimeFrameYouLikeToMoveToBeaAdvisor ?? "",
    wouldYouLikeToKnowHowSuperVisaInsuranceWo:
      description?.wouldYouLikeToKnowHowSuperVisaInsuranceWo ?? "",
    existingHealthConditions: description?.existingHealthConditions ?? "",
    singleOrFamilyPlan: description?.singleOrFamilyPlan ?? "",
    monthlyPremiumKnowledge: description?.monthlyPremiumKnowledge ?? "",
    previousPolicyWithUs: description?.previousPolicyWithUs ?? "",
    superVisaInsurance: description?.superVisaInsurance ?? "",
    secureYourChildFutureWithHigherEducation:
      description?.secureYourChildFutureWithHigherEducation ?? "",
    enterageOf2ndTraveler: description?.enterageOf2ndTraveler ?? "",
    LookingForAdvisor: description?.LookingForAdvisor ?? "",
    totalDependents: description?.totalDependents ?? "",
    dependentAge1: description?.dependentAge1 ?? "",
    dependentAge2: description?.dependentAge2 ?? "",
    dependentAge3: description?.dependentAge3 ?? "",
    dependentAge4: description?.dependentAge4 ?? "",
    dependentAge5: description?.dependentAge5 ?? "",
    dependentAge6: description?.dependentAge6 ?? "",
  };
}
async function parseSerce(services, umtDetail, leadId) {
  return {
    leadId: leadId,
    potentialBusiness: services?.potentialBusiness ?? null,
    loanProtection: services?.loanProtection ?? "",
    servicesRequested: services?.servicesRequested ?? "",
    lifeInsurance: services?.lifeInsurance ?? "",
    investments: services?.investments ?? "",
    livingBenefits: services?.livingBenefits ?? "",
    groupInsurance: services?.groupInsurance ?? "",
    travelInsurance: services?.travelInsurance ?? "",
    combinationOrHybridInsurance:
      services?.combinationOrHybridInsurance ?? "false",
    autoInsurance: services?.autoInsurance ?? "",
    healthAndDentalInsurance: services?.healthAndDentalInsurance ?? "",
    homeInsurance: services?.homeInsurance ?? "",
    businessLiabilityInsurance: services?.businessLiabilityInsurance ?? "",
    immigrationServices: services?.immigrationServices ?? "",
    campaignidData: umtDetail?.campaignidData ?? "",
    networkData: umtDetail?.networkData ?? "",
    adgroupidData: umtDetail?.adgroupidData ?? "",
    deviceData: umtDetail?.deviceData ?? "",
    matchtypeData: umtDetail?.matchtypeData ?? "",
    keywordData: umtDetail?.keywordData ?? "",
    gclidData: umtDetail?.gclidData ?? "",
    lpUrlData: umtDetail?.lpUrlData ?? "",
  };
}

// <<<<<<<<<<<<<========= PARSE DATA FUNCTIONS  FORM CONTCT & ADVISOR=============>>>>>>>>>>>>>>>>>>>>>>>>>>>>
async function parseAdvisorData(leadData, facebookData, refferelData) {
  // // <<<<<<<<<<======== LEAD INFORMATION =========>>>>>>>>>>>>>>>>>>>>>
  let advisorLead = {
    ifReferredByAdvisorOrExternalReferral:
      leadData?.ifReferredByAdvisorOrExternalReferral ?? "",
    existingPolicyRenewalDueBy: leadData?.existingPolicyRenewalDueBy ?? "",
    rcSmsOptOut: leadData?.rcSmsOptOut ?? false, // Leads
    coverageYouAreLookingFor: leadData?.coverageYouAreLookingFor ?? "",
    secondaryEmail: leadData?.secondaryEmail ?? "",
    fax: leadData?.fax ?? "",
    readyForPurchase: leadData?.readyForPurchase ?? false,
    description: leadData?.description ?? "",
  };
  // // <<<<<<<<<<======== ReferralInformation =========>>>>>>>>>>>>>>>>>>>>>
  let advisorRefferel = {
    year: refferelData?.year ?? "",
    productCategoryReferred: refferelData?.productCategoryReferred ?? "",
    referralClient: refferelData?.referralClient ?? null,
    referralOtherThanClient: refferelData?.referralOtherThanClient ?? null,
    referralSource: refferelData?.referralSource ?? "",
  };

  // // <<<<<<<<<<======== LEAD INFO =========>>>>>>>>>>>>>>>>>>>>>"twitter1": "e",
  let advisorFaceBook = {
    instagramId: facebookData?.instagramId ?? "",
    faceBook: facebookData?.faceBook ?? "",
    linkedIn1: facebookData?.linkedIn1 ?? "",
    skypeId: facebookData?.skypeId ?? "",
    twitter1: facebookData?.twitter1 ?? "",
  };
  return { advisorLead, advisorFaceBook, advisorRefferel };
}
// <<<<<<<<<<<<<========= PARSE DATA FUNCTIONS FORM SUBFOMR=============>>>>>>>>>>>>>>>>>>>>>>>>>>>>
async function processSubform(subformArray, rowId, type) {
  if (!subformArray) {
    return { updateArray: [], insertArray: [] };
  }
  const updateArray = [];
  const insertArray = [];

  subformArray.forEach((item) => {
    const subformObject = {
      leadId: rowId,
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
    case "festivals":
      return {
        festivalName: item.festivalName ?? "",
        dateOfFestival: item.dateOfFestival ?? null,
      };
    case "conversionHistory":
      return {
        interactionType: item.interactionType ?? "",
        timeOfInteraction: item.timeOfInteraction ?? "",
        contactAttempt: item.contactAttempt ?? "",
        timeSpent: item.timeSpent ?? "",
        comments: item.comments ?? "",
        interactionOutcome: item.interactionOutcome ?? "",
        probabilityOfClosure: item.probabilityOfClosure ?? "",
      };
    case "emergencyContacts":
      return {
        emergencyContactName: item.emergencyContactName ?? "",
        emergencyContactPhone: item.emergencyContactPhone ?? "",
        emergencyContactRelationship: item.emergencyContactRelationship ?? "",
        emergencyContactEmail: item.emergencyContactEmail ?? "",
      };
    case "siblings":
      return {
        relationship: item.relationship ?? "",
        name: item.name ?? "",
        email: item.email ?? "",
        phone: item.phone ?? "",
        dob: item.dob ?? null,
        age: item.age ?? "",
      };
    case "dependentChildren":
      return {
        relationship: item.relationship ?? "",
        name: item.name ?? "",
        email: item.email ?? "",
        phone: item.phone ?? "",
        dob: item.dob ?? null,
        age: item.age ?? "",
      };
    case "dependentParents":
      return {
        relationship: item.relationship ?? "",
        name: item.name ?? "",
        email: item.email ?? "",
        phone: item.phone ?? "",
        dob: item.dob ?? null,
        age: item.age ?? "",
      };
    default:
      return {}; // Default case if type is not recognized
  }
}

// <<<<<<<<<<<<<<<<<<========== Sample FIle DOWNLOAD =============>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
async function downloadFile(type) {
  try {
    let headers =
      type == "advisor" ? leadadvisor : type == "sample" ? sample : leadclient;
    const csvStringifier = createObjectCsvStringifier({
      header: headers,
    });

    const data =
      type == "advisor"
        ? advisorGenerate
        : type == "sample"
        ? sampleData
        : clientGenerate;
    const csvContent =
      csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(data);

    return csvContent;
  } catch (error) {
    console.error("Error downloading file:", error);
  }
}

// <<<<<<<<<<<<<<<<<<<<< OBJECT COMAPRE FUNCTIONS =============>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function findAdditionalKeys(obj1, obj2) {
  let additionalKeys = {};

  function compareObjects(o1, o2, path) {
    for (let key in o2) {
      if (o2.hasOwnProperty(key)) {
        // Construct the current path
        let currentPath = path ? `${path}.${key}` : key;

        // If key is not in obj1, it is an additional key
        if (!o1.hasOwnProperty(key)) {
          additionalKeys[currentPath] = o2[key];
        } else if (
          typeof o2[key] === "object" &&
          !Array.isArray(o2[key]) &&
          o2[key] !== null
        ) {
          // If both are objects, recursively compare
          compareObjects(o1[key], o2[key], currentPath);
        }
      }
    }
  }

  compareObjects(obj1, obj2, "");
  return additionalKeys;
}
