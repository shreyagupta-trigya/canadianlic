const express = require("express");
const policyRouter = express.Router();

const { testConntection,createPolicy,policyRelatedData,dowloadFile,updatePolicy,countPolicies } = require("../controller/policy/policyController");


policyRouter.get("/test-conntection", testConntection);
policyRouter.get("/get-policy-related-data/:id?", policyRelatedData);
policyRouter.put("/create-policy", createPolicy);
policyRouter.post("/update-policy/:id", updatePolicy);

policyRouter.post("/download-files", dowloadFile);
policyRouter.get("/count-policy", countPolicies);

module.exports = policyRouter;