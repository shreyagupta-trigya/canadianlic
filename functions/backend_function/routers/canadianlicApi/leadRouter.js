const express = require("express");
const leadRouter = express.Router();

const { test,createNewLead,updateNewLead,downloadFile,leadRelatedData,getLeadById,getAllLeads, countLeads, deleteLead ,getLeads } = require("../controller/lead/Controller");

leadRouter.get("/test-connection", test);
leadRouter.put("/createNewLead", createNewLead);
leadRouter.post("/updateNewLead/:id?", updateNewLead);
leadRouter.get("/get-related-data/:id?", leadRelatedData);
leadRouter.get("/get-lead-byid/:id?", getLeadById);
leadRouter.post("/get-lead-details/:id?", getAllLeads);
leadRouter.get("/get-lead-count", countLeads);
leadRouter.delete("/delete-lead/:id?", deleteLead);
leadRouter.post('/get-leads/:id?', getLeads);

leadRouter.post("/download-file", downloadFile);

// <<<<<<<<<<====== CRM IMTEGRATION ======== >>>>>>>>>>>>
const {checkConnection,createUpdateLead,createUpdateDeal, createUpdateContact,createUpdateLocation,createUpdatePolicy,createUpdateInvestment,compareobj} = require("../controller/lead/crmIntegration");
leadRouter.get("/crm/", checkConnection)
leadRouter.post("/crm/create-update-lead", createUpdateLead)
leadRouter.post("/crm/create-update-deal", createUpdateDeal)
leadRouter.post("/crm/create-update-contact", createUpdateContact)
leadRouter.post("/crm/create-update-location", createUpdateLocation)
leadRouter.post("/crm/create-update-policy", createUpdatePolicy)
leadRouter.post("/crm/create-update-investment", createUpdateInvestment)
leadRouter.get("/crm/compare", compareobj)

module.exports = leadRouter;