"use strict";
var catalyst = require("zcatalyst-sdk-node");
const NodeCache = require("node-cache");
const cache = new NodeCache();
const query = require("../query/Query");
const { createObjectCsvStringifier } = require("csv-writer");
const fs = require("fs");
const path = require("path");
const pageSize = process.env.PAGE_SIZE;

const {getSequence,updateSequence} = require("../Utils/sequenceUtils");

// const {
//   insertDataIntoTable,
//   insertMultipleRowsIntoTable,
//   updateDataInTable,
//   deleteDataFromTable,
//   updateSubFormData,
//   deleteById,
//   decryptData,
//   filterContactData,
// } = require("../query/Utils");
const {
  insertData,
  updateData,
  insertSubformData,
  updateSubformData,
  deleteSubformData,
} = require("../Utils/util");
const {
  leadclient,
  leadadvisor,
  clientGenerate,
  advisorGenerate,
  sampleData,
  sample,
} = require("../export");
const { networkInterfaces } = require("os");
const { dateTimeFormat } = require("../Utils/util");
// *********** CRM FUNCTION ***********
const {dataSyncZcrm,generateToken} = require("../crmIntegration/crmIntegrationController");

exports.test = async (req, res) => {
  res.status(200).json({ status: "Success" });
};

exports.getLeadById = async (req, res) => {
  const adminApp = catalyst.initialize(req, { scope: "admin" });

  try {
    const leadId = req.params.id;
    if (!leadId) {
      return res
        .status(400)
        .json({ success: false, message: "Lead ID is required" });
    }

    // Fetch lead data from different tables
    const leadsResult = await adminApp
      .zcql()
      .executeZCQLQuery(`Select * from leads Where ROWID=${leadId}`);
    const leadsDescriptionResult = await adminApp
      .zcql()
      .executeZCQLQuery(
        `Select * from leadsDescription Where leadId=${leadId}`
      );
    const familyTree = await adminApp
      .zcql()
      .executeZCQLQuery(`Select * from familyTree Where leadId=${leadId}`);
    const dependentParents = await adminApp
      .zcql()
      .executeZCQLQuery(
        `Select * from dependentParents Where leadId=${leadId}`
      );
    const contactsSiblings = await adminApp
      .zcql()
      .executeZCQLQuery(
        `Select * from contactsSiblings Where leadId=${leadId}`
      );
    const leadConversionHistory = await adminApp
      .zcql()
      .executeZCQLQuery(
        `Select * from leadConversionHistory Where leadId=${leadId}`
      );
    const festivals = await adminApp
      .zcql()
      .executeZCQLQuery(`Select * from festivals Where leadId=${leadId}`);
    const dependentChildren = await adminApp
      .zcql()
      .executeZCQLQuery(
        `Select * from dependentChildren Where leadId=${leadId}`
      );
    const emergencyContact = await adminApp
      .zcql()
      .executeZCQLQuery(
        `Select * from contactEmergencyDetails Where leadId=${leadId}`
      );

    // Respond with the fetched data
    res.status(200).json({
      success: true,
      message: "Lead result received",
      data: {
        leadsResult: leadsResult[0].leads,
        leadsDescriptionResult: leadsDescriptionResult[0].leadsDescription,
        familyTree: familyTree[0].familyTree,
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
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch lead data",
        error: error.message,
      });
  }
};

// <<<<<<<<<<<======= Shobnath new structured api call ========>>>>>>>>>>>>>>>>>>>>>
exports.getUsers = async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const offset = (page - 1) * 300;
  let querySql = query.getUsers.replace("%PAGENO%", offset);
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  const result = await adminApp.zcql().executeZCQLQuery(querySql);

  let users = result.map((user) => ({
    firstName: user.userData.firstName,
    lastName: user.userData.lastName,
    name: user.userData.firstName + " " + user.userData.lastName,
    ROWID: user.userData.ROWID,
  }));
  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    users,
  });
};

exports.getAdviors = async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const offset = (page - 1) * 300;
  let querySql = query.getAdviors.replace("%PAGENO%", offset);
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  const result = await adminApp.zcql().executeZCQLQuery(querySql);

  let advisors = result.map((advisor) => ({
    firstName: advisor.advisors.firstName,
    lastName: advisor.advisors.lastName,
    name: advisor.advisors.firstName + " " + advisor.advisors.lastName,
    ROWID: advisor.advisors.ROWID,
  }));
  res.status(200).json({
    success: true,
    message: "Adviors fetched successfully",
    advisors,
  });
};

exports.getLeadData = async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const offset = (page - 1) * 300;
  let querySql = query.getLeads.replace("%PAGENO%", offset);
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  const result = await adminApp.zcql().executeZCQLQuery(querySql);

  let leads = result.map((lead) => ({
    firstName: lead.leads.firstName,
    lastName: lead.leads.lastName,
    name: lead.leads.firstName + " " + lead.leads.lastName,
    ROWID: lead.leads.ROWID,
  }));
  res.status(200).json({
    success: true,
    message: "Adviors fetched successfully",
    leads,
  });
};
exports.getReferral = async (req, res) => {
  try {
    const page = parseInt(req.body.page) || 1;
    const pageSize = parseInt(req.body.pageSize) || 300;
    const pageNo = (page - 1) * pageSize;
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    let querySql = query.getreferralData.replace("%LIMIT%", pageSize).replace("%OFFSET%", pageNo);
    const result = await adminApp.zcql().executeZCQLQuery(querySql);
    let referral = result.map(({ referralData }) => ({
      referralName: referralData ? referralData.referralName : "N/A",
      ROWID: referralData ? referralData.ROWID : "N/A",
    }));
    res.status(200).json({
      success: true,
      message: "Referral fetched successfully",
      referral,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "There was an issue fetching the referral data", 
      error: error.message || "Unknown error" 
    });
  }
};


exports.getLocations = async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const offset = (page - 1) * 300;
  let querySql = query.getLocation.replace("%PAGENO%", offset);
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  const result = await adminApp.zcql().executeZCQLQuery(querySql);

  let locations = result.map((location) => ({
    name: location.locations.locationName,
    ROWID: location.locations.ROWID,
  }));
  res.status(200).json({
    success: true,
    message: "Locations fetched successfully",
    locations,
  });
};

exports.getContacts = async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const offset = (page - 1) * 300;
  let querySql = query.getContact.replace("%PAGENO%", offset);
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  const result = await adminApp.zcql().executeZCQLQuery(querySql);

  let contacts = result.map((contact) => ({
    firstName: contact.contacts.firstName,
    lastName: contact.contacts.lastName,
    name: contact.contacts.firstName + " " + contact.contacts.lastName,
    ROWID: contact.contacts.ROWID,
  }));
  res.status(200).json({
    success: true,
    message: "Contacts fetched successfully",
    contacts,
  });
};

exports.getSingleData = async (req, res) => {
  const { tableName, Id } = req.body;
  let querySql = query.singleData
    .replace("%TABLE%", tableName)
    .replace("%ROWID%", Id);
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  const response = await adminApp.zcql().executeZCQLQuery(querySql);
  res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    response: response[0],
  });
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
    layoutName
  } = req.body;

  try {
    const catalystApp = catalyst.initialize(req, { scope: "admin" });

    // <<<<<<<<<<<<<<<<<< ======= MAIN MODULE INSERT DATA INTO TABLE ========= >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const leadData = await parseContactData(LeadInformation, FestivalForm,layoutName);
    // SEQUENCE CODE
    const sequenceResp = await getSequence(req,"leads");
    let sequence =  sequenceResp?.data
    let leadID = `${sequence?.prefix}-${sequence?.sequence.padStart(5,'0')}`;
    leadData.leadID = leadID;
    
    // <<<<<<<<<<< IF LEAD IS ADVISOR =======>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    let { advisorLead, advisorFaceBook, advisorRefferel } =
      module === "advisor"
        ? await parseAdvisorData(LeadInformation, Facebook, ReferralInformation)
        : { advisorLead: {}, advisorFaceBook: {}, refferel: {} };

    const leadId = await insertData(catalystApp, "leads",{...leadData,...advisorLead});
    // UPDATE SEQUENCE
    await updateSequence(req,sequence?.rowId,parseInt(sequence.sequence) + 1);
    
    // let leadId = "22106000000468012";
    // <<<<<<<<<<<<<<<<<< ======= PARSE DATA ========= >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const familyTreeData = await parseFamiltyTree(FamilyTree, leadId);
    const leadInfoData = await parseLeadInfomration(
      AddressInformation,
      Facebook,
      leadId
    );
    const descriptionData =
      module === "client" ? await parseDescription(DescriptonInfo, leadId) : {};
    const servicesData = await parseSerce(
      ServiceRequestDetails,
      UMTDetails,
      leadId
    );
    const { insertArray: insertChildren = [] } = await processSubform(
      FamilyTree?.dependentChildrenData,
      leadId,
      "dependentChildren"
    );
    const { insertArray: insertParents = [] } = await processSubform(
      FamilyTree?.dependentParentsData,
      leadId,
      "dependentParents"
    );
    const { insertArray: insertSiblings = [] } = await processSubform(
      FamilyTree?.siblingData,
      leadId,
      "siblings"
    );
    const { insertArray: insertEmergencyContacts = [] } = await processSubform(
      FamilyTree?.emergencyContactData,
      leadId,
      "emergencyContacts"
    );
    const { insertArray: insertHistory = [] } = await processSubform(
      LeadManagementInformation?.LeadData,
      leadId,
      "conversionHistory"
    );
    const { insertArray: insertFestival = [] } = await processSubform(
      FestivalForm?.festivalsData,
      leadId,
      "festivals"
    );

    // <<<<<<<<<<<<<<<<<< ======= INSERT DATA INTO TABLE ========= >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const familyResult = await insertData(
      catalystApp,
      "familyTree",
      familyTreeData
    );
    const leadInfoResult = await insertData(catalystApp, "leadInformations", {
      ...leadInfoData,
      ...advisorFaceBook,
      ...advisorRefferel,
    });
    const leadsDescriptionResult =
      module === "client"
        ? await insertData(catalystApp, "leadsDescription", descriptionData)
        : {};
    const servicesResult = await insertData(
      catalystApp,
      "leadService",
      servicesData
    );
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

      // ******************* CRM FUNCTION *********************
        const token =  await generateToken();
        const crmId = await dataSyncZcrm(token,{LeadInformation,FamilyTree,DescriptonInfo,ServiceRequestDetails,UMTDetails,FestivalForm,AddressInformation,Facebook,LeadManagementInformation,module,ReferralInformation,layoutName,ROWID:leadId});
          await catalystApp
      .datastore()
      .table("leads")
      .updateRow({ sourceId: crmId, source: "catalyst",ROWID:leadId});
      // ******************* END CRM FUNCTION *****************

    res.status(201).json({
      success: true,
      message:
        "Lead Description services Family DependentParents Siblings Festival emergencyContactResult created successfully",
      resp: {
        lead: leadId,
        description: leadsDescriptionResult,
        family: familyResult,
        leadInfoResult: leadInfoResult,
        services: servicesResult,
        dependentParents: insertParentsResp,
        dependentChildren: insertChilrenResp,
        siblings: insertSiblingsResp,
        emergencyContact: insertEmergencyContactsResp,
        festival: insertFestivalResp,
        conversionHistory: insertHistoryResp,
        crmId:crmId
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
    layoutName
  } = req.body;
  const rowId = req.params.id;
  try {
    const catalystApp = catalyst.initialize(req, { scope: "admin" });

    // <<<<<<<<<<<<<<<<<< ======= PARSE DATA ========= >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const fieldsWithValues = await parseContactData(LeadInformation, FestivalForm,module);
    const leadsData = Object.fromEntries(
      Object.entries(fieldsWithValues).filter(([key, value]) => value !== "" && value !== null)
    );
    const familyTreeDatafieldsWithValues = await parseFamiltyTree(FamilyTree, rowId);
    const familyTreeData = Object.fromEntries(
      Object.entries(familyTreeDatafieldsWithValues).filter(([key, value]) => value !== "" && value !== null)
    );
    const leadInfoDatafieldsWithValues = await parseLeadInfomration(
      AddressInformation,
      Facebook,
      rowId
    );
    const leadInfoData = Object.fromEntries(
      Object.entries(leadInfoDatafieldsWithValues).filter(([key, value]) => value !== "" && value !== null)
    );
    const descriptionDatafieldsWithValues =
      module === "client" ? await parseDescription(DescriptonInfo, rowId) : {};
      const descriptionData = Object.fromEntries(
        Object.entries(descriptionDatafieldsWithValues).filter(([key, value]) => value !== "" && value !== null)
      );
    const servicesDatafieldsWithValues = await parseSerce(
      ServiceRequestDetails,
      UMTDetails,
      rowId
    );
    const servicesData = Object.fromEntries(
      Object.entries(servicesDatafieldsWithValues).filter(([key, value]) => value !== "" && value !== null)
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
    const leadResult = await updateData(catalystApp, "leads", {...leadsData,ROWID: rowId,...advisorLead,});
    console.log("leadResult", leadResult);
    const familyResult = await updateData(catalystApp, "familyTree", {...familyTreeData,ROWID: FamilyTree.ROWID});
    console.log("familyResult", familyResult);
    const leadInfoResult = await updateData(catalystApp, "leadInformations", {...leadInfoData,ROWID: Facebook.ROWID,...advisorFaceBook,...advisorRefferel});
    console.log("leadInfoResult", leadInfoResult);
    const leadsDescriptionResult = module === "client"? await updateData(catalystApp, "leadsDescription", {...descriptionData,ROWID: DescriptonInfo.ROWID}):{};
    console.log("leadsDescriptionResult", leadsDescriptionResult);
    const servicesResult = await updateData(catalystApp, "leadService", {...servicesData,ROWID: ServiceRequestDetails.ROWID});
      console.log("servicesResult", servicesResult);
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
      // *************CRM FUNCTION****************
      const token =  await generateToken();
      const crmId = await dataSyncZcrm(token,{LeadInformation,FamilyTree,DescriptonInfo,ServiceRequestDetails,UMTDetails,FestivalForm,AddressInformation,Facebook,LeadManagementInformation,module,ReferralInformation,layoutName,ROWID:rowId},req.body?.LeadInformation?.sourceId);
      // await catalystApp
      // .datastore()
      // .table("leads")
      // .updateRow({ sourceId: crmId, source: "catalyst",ROWID:rowId});
      // *************CRM FUNCTION****************
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
exports.getAllLeads = async (req, res) => {
  try {
    const cacheKey = "getAllLeads";

    // Check if data is in cache
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return res.status(200).json({
        success: true,
        message: "Lead data fetched successfully (from cache)",
        leadDetails: cachedData,
      });
    }

    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const leadDetails = await adminApp
      .zcql()
      .executeZCQLQuery(`${query.getAllLeads}`);

    if (!leadDetails || leadDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No leads were found at this time",
      });
    }

    cache.set(cacheKey, leadDetails, 10000);
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
    // Initialize Catalyst
    const adminApp = catalyst.initialize(req, { scope: "admin" });

    // Execute the delete query
    const leadId = req.params.id || req.body.ids;
    const leadDetails = await adminApp
      .zcql()
      .executeZCQLQuery(`${query.deleteLead}(${leadId})`);

    // Invalidate the cache for leads
    cache.del("leadDetails");

    // Send success response
    res.status(200).json({
      success: true,
      message: "Lead and associated data deleted successfully",
      data: leadDetails,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error deleting lead:", error);

    // Send error response with error details
    res.status(500).json({
      success: false,
      message: "Failed to delete lead and associated data",
      error: error.message || error,
    });
  }
};
exports.getLeads = async (req, res) => {
  let query;
  if (!req.params.id) {
    query = `SELECT * FROM leads`;
  } else {
    query = `SELECT * FROM leads WHERE ROWID = ${req.params.id}`;
  }
  catalyst
    .initialize(req, { scope: "admin" })
    .zcql()
    .executeZCQLQuery(query)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Issue pulling contacts data",
        error: error,
      });
    });
};
exports.leadConvert = async (req, res) => {
  const convertData = req.body;
  console.log("leadConvert", convertData);
  const leadId = req.params.id;
  const catalystApp = catalyst.initialize(req, { scope: "admin" });
  let dealId = "";
  let advisorId = "";
  let contactId = "";
  //<<<<<<<<<<<<<< Get Lead >>>>>>>>>>
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
  if (convertData.leadLayoutName.toLowerCase() === "client") {
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
      // console.log("Lead Update Issue:", error);
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
async function parseContactData(formData, festival,module) {
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
    // roundRobinAssignmentTime:
    //   formData?.roundRobinAssignmentTime != "{}" &&
    //   formData?.roundRobinAssignmentTime != "" &&
    //   formData?.roundRobinAssignmentTime != null &&
    //   formData?.roundRobinAssignmentTime != undefined
    //     ? dateTimeFormat(formData?.roundRobinAssignmentTime)
    //     : null,
    existingInsurancePolicy: formData?.existingInsurancePolicy ?? "",
    eligibleRoundRobinOwnerFound:
      formData?.eligibleRoundRobinOwnerFound ?? false,
    doYouOwnaHomeInCanada: formData?.doYouOwnaHomeInCanada ?? "",
    // leadCreatedOn: new Date(formData?.leadCreatedOn) ?? null,
    doYouhaveLifeInsurance: formData?.doYouhaveLifeInsurance ?? "",
    oldDatabaseLead: formData?.oldDatabaseLead ?? "",
    // nextFollowUpDateTime:
    //   formData?.phoneBurnerLastCallTime != "{}" &&
    //   formData?.nextFollowUpDateTime != "" &&
    //   formData?.nextFollowUpDateTime != null &&
    //   formData?.nextFollowUpDateTime != undefined
    //     ? dateTimeFormat(formData?.nextFollowUpDateTime)
    //     : null,
    genderPredictionScore: formData?.genderPredictionScore ?? "",
    submitPageURL: formData?.submitPageURL ?? "",
    assignedCampaigns: formData?.assignedCampaigns ?? "",
    areYouReadyToPurchaseThisLifeInsurancePoli:
      formData?.areYouReadyToPurchaseThisLifeInsurancePoli ?? "",
    assignedCampaigns: formData?.assignedCampaigns ?? "",
    genderPrediction: formData?.genderPrediction ?? "",
    inboxURL: formData?.inboxURL ?? "",
    additionalContactInformation: formData?.additionalContactInformation ?? "",
    areYouLLQPLicensed: formData?.areYouLLQPLicensed ?? "",
    phoneBurnerFollowUpDate:
      new Date(formData?.phoneBurnerFollowUpDate) ?? null,
    phoneBurnerLastCallOutcome: formData?.phoneBurnerLastCallOutcome ?? "",
    // phoneBurnerLastCallTime:
    //   formData?.phoneBurnerLastCallTime != "{}" &&
    //   formData?.phoneBurnerLastCallTime != "" &&
    //   formData?.phoneBurnerLastCallTime != null &&
    //   formData?.phoneBurnerLastCallTime != undefined
    //     ? dateTimeFormat(formData?.phoneBurnerLastCallTime)
    //     : null,
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
    layoutName: module === "client" ? "Client" : " Advisor Leads",
    // layoutName: layoutName??'',
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
    facebookPage: faceBook?.faceBookPage ?? "",
    facebookPageId: faceBook?.faceBookPageId ?? "",
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
  // DEPENDENT AGE FIELDS ARE NOT Created IN THE LEADS DESCRIPTION TABLE
  // "dependentAge1": 33,
  // "dependentAge2": "33",
  // "dependentAge3": "3",
  // "dependentAge4": 3,
  // "dependentAge6": "3",
  // "dependentAge5": "3"
  return {
    leadId: leadId,
    typeOfInsuranceLooking: description?.typeOfInsuranceLooking ?? "",
    whatPolicyDoYouWant: description?.whatPolicyDoYouWant ?? "",
    ageOf1stTraveler: description?.ageOf1stTraveler ?? "",
    enterageOf2ndTraveler: description?.enterageOf2ndTraveler ?? "",
    travelerStartDate: description?.travelerStartDate ?? null,
    travelerEndDate: description?.travelerEndDate ?? "",
    coverageYouAreLookingFor: description?.coverageYouAreLookingFor ?? "",
    preExistingmedicaLconditions:
      description?.preExistingmedicaLconditions ?? "",
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
    // referralClient: refferelData?.referralClient ?? null,
    // referralOtherThanClient: refferelData?.referralOtherThanClient ?? null,
    referralSource: refferelData?.referralSource ?? "",
  };

  // // <<<<<<<<<<======== LEAD INFO =========>>>>>>>>>>>>>>>>>>>>>"twitter1": "e",
  let advisorFaceBook = {
    instagramId: facebookData?.instagramId ?? "",
    faceBook: facebookData?.faceBook ?? "",
    linkedIn1: facebookData?.linkedIn1 ?? "",
    skypeId: facebookData?.skypeId ?? "",
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
