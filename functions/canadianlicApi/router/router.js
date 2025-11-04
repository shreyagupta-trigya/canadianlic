
const express = require('express');
const router = express.Router();
const {connectionCheck,getAllInsurencePartner,createNewLead,getLeadById,getAllLeads,getLeads,getAllContact,deleteLead,updateLead,getAllLocations,getAllAdvisor,getAllUsers,leadConvert} = require("../../controller/advisorCredential/controller");

router.get("/",connectionCheck)
router.get("/getLeadById/:id?",getLeadById);
router.get("/getAllLeads", getAllLeads);
router.get("/getAllInsurencePartner", getAllInsurencePartner);
router.get("/getAllAdvisor/:id?", getAllAdvisor);
router.get("/getAllUsers/:id?", getAllUsers);
router.get("/getAllLocations/:id?", getAllLocations);
router.get("/getAllContact/:id?",getAllContact);
router.put("/createNewLead", createNewLead);
router.delete("/deleteLead/:id?", deleteLead);
router.post("/updateLead/:id?", updateLead);
router.post("/lead-convert/:id?", leadConvert);
// createNewLeadAdvisor form 
// router.put("/create-new-lead-advisor", createNewLeadAdvisor)
const {testcredential,getAllAdvisorCredentialById, getAllAdvisorCredential,addAdvisorCredential,updateAdvisorCredential,deleteAdvisorCredential} = require("../../controller/advisorCredential/advisorCrd.js");

router.get("/testcredential", testcredential)
router.get("/getall-advisor-credential", getAllAdvisorCredential)
router.get("/get-all-advisor-credential-by-id", getAllAdvisorCredentialById)
router.put("/addadvisor-credential", addAdvisorCredential)
router.post("/update-advisor-cedential/:id?", updateAdvisorCredential)
router.delete("/delete-advisor-credential/:id?", deleteAdvisorCredential)


const {getTableInstance,getAllTabels} = require("../../controller/advisorCredential/getTableInstance.js");
router.get("/get-table-instance/:id?", getTableInstance)
router.get("/get-all-table", getAllTabels)

// const {adCrdConnectionCheck} = require("../Controller/advisorCrd");
// router.get("/advisor-crd/",adCrdConnectionCheck)

// <<<<<<<<<<====== CRM IMTEGRATION ======== >>>>>>>>>>>>
const {checkConnection,createUpdateLead,createUpdateDeal, createUpdateContact,createUpdateLocation,createUpdatePolicy,createUpdateInvestment,compareobj} = require("../Controller/crmIntegration");
router.get("/crm/", checkConnection)
router.post("/crm/create-update-lead", createUpdateLead)
router.post("/crm/create-update-deal", createUpdateDeal)
router.post("/crm/create-update-contact", createUpdateContact)
router.post("/crm/create-update-location", createUpdateLocation)
router.post("/crm/create-update-policy", createUpdatePolicy)
router.post("/crm/create-update-investment", createUpdateInvestment)
router.get("/crm/compare", compareobj)
module.exports = router;