const express = require("express");
const policyInvRouter = express.Router();

const { testConntection,createPolicyInvestment,policyRelatedData,updatePolicyInvestment } = require("../controller/policy/policyInvestmentController");


policyInvRouter.get("/test-conntection", testConntection);
policyInvRouter.get("/get-policy-related-data/:id?", policyRelatedData);
policyInvRouter.put("/create-policy-investment", createPolicyInvestment);
policyInvRouter.post("/update-policy-investment/:id", updatePolicyInvestment);

module.exports = policyInvRouter;