const express = require("express");
const crmIntegrationRouter = express.Router();

const {createLead,createDeal,createContact,createLocation,createPolicy,createInvestment} = require("../../controller/crmIntegration/crmIntegrationController");

crmIntegrationRouter.post("/create-lead", createLead);
crmIntegrationRouter.post("/create-deal", createDeal);
crmIntegrationRouter.post("/create-contact", createContact);
crmIntegrationRouter.post("/create-location", createLocation);
crmIntegrationRouter.post("/create-policy", createPolicy);
crmIntegrationRouter.post("/create-investment", createInvestment);

module.exports = crmIntegrationRouter;
