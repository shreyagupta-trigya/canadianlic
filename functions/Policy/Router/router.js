const express = require("express");
const policyRouter = express.Router();

// const { testConntection, getUsers, getLeadData, getAdviors, getLocations, getContacts, getSingleData, dealRelatedData } = require("../Controller/controller");

// crude functionality 
const { testConntection,createPolicy,policyRelatedData,dowloadFile,updatePolicy,getAdviors,getContacts,getUsers,createPolicyFromRPA } = require("../Controller/controller");


policyRouter.get("/test-conntection", testConntection);
policyRouter.get("/get-users", getUsers);
policyRouter.get("/get-advisors", getAdviors);
// policyRouter.get("/get-locations", getLocations);
policyRouter.get("/get-contacts", getContacts);
// policyRouter.get("/get-lead-data", getLeadData);
// policyRouter.get("/get-single-data", getSingleData);
policyRouter.get("/get-policy-related-data/:id?", policyRelatedData);
policyRouter.put("/create-policy", createPolicy);
policyRouter.post("/update-policy/:id", updatePolicy);
policyRouter.post("/create-policy-from-rpa", createPolicyFromRPA);
// // <<<<<<<<<<<< ========= Download Functionality =============>>>>>>>>>>
policyRouter.post("/download-files", dowloadFile);
module.exports = policyRouter;