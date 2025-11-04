const express = require("express");
const leadRouter = express.Router();

const {test,getLeadById,getAllLeads,getLeads,deleteLead,leadConvert, leadRelatedData,downloadFile} = require("../controller/Controller");
const { getUsers, getAdviors, getLocations, getContacts, getLeadData, getReferral,getSingleData,createNewLead,updateNewLead,testUat } = require("../controller/Controller");

leadRouter.get("/",test);
leadRouter.get("/get-deals-byId/:id?",getLeadById);
leadRouter.get("/getAllLeads", getAllLeads);
leadRouter.get("/getleadbyId/:id?", getLeads);
leadRouter.delete("/deleteLead/:id?", deleteLead);
leadRouter.post("/lead-convert/:id?", leadConvert);

// <<<<<<<<<<<<<<<<<<========== PETER Functionality =============>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
leadRouter.get("/get-users", getUsers);
leadRouter.get("/get-advisors", getAdviors);
leadRouter.get("/get-locations", getLocations);
leadRouter.get("/get-contacts", getContacts);
leadRouter.get("/get-lead-data", getLeadData);
leadRouter.get("/get-referral", getReferral);
leadRouter.get("/get-single-data", getSingleData);
leadRouter.get("/get-related-data/:id?", leadRelatedData);
leadRouter.put("/createNewLead", createNewLead);
leadRouter.post("/updateNewLead/:id?", updateNewLead);
leadRouter.post("/test-uat/:id?", testUat);

// <<<<<<<<<<<<<<<<<<========== Sample FIle DOWNLOAD =============>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
leadRouter.post("/download-file", downloadFile);

//crediental form
const {testcredential, getAllAdvisorCredential,addAdvisorCredential,updateAdvisorCredential,deleteAdvisorCredential} = require("../controller/CredentialForm");

// leadRouter.get("/testcredential", testcredential)
// leadRouter.get("/getall-advisor-credential", getAllAdvisorCredential)
// leadRouter.put("/addadvisor-credential", addAdvisorCredential)
// leadRouter.post("/update-advisor-cedential/:id?", updateAdvisorCredential)
// leadRouter.delete("/delete-advisor-credential/:id?", deleteAdvisorCredential)

// deal life insurance controller 

// const { lifetest, createNewRecord, deleteDeals } = require("../controller/LifeInsurance");

// leadRouter.get("/lifetest", lifetest);
// leadRouter.put("/create-new-deal", createNewRecord);
// leadRouter.delete("/delete-deal", deleteDeals);




module.exports = leadRouter;