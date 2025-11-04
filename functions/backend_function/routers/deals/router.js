const express = require("express");
const dealRouter = express.Router();

const {
  testConntection,
  createNewRecord,
  deleteDeals,
  getAllDeal,
  getDealById,
  getLeads,
  getUsers,
  getLeadData,
  getAdviors,
  getLocations,
  getContacts,
  getSingleData,
  dealRelatedData,
  createStandrardDeal,
  updateStandrardDeal,
  createLifeInsurenceDeal,
  updateLifeInsurenceDeal,
  downloadFile,
} = require("../../controller/deals/dealsController");

dealRouter.get("/test-connection", testConntection);
dealRouter.post("/create-new-record", createNewRecord);
dealRouter.delete("/delete-deals/:id?", deleteDeals);
dealRouter.post("/get-all-deals", getAllDeal);
dealRouter.get("/get-deal-by-id/:id?", getDealById);
dealRouter.get("/get-leads", getLeads);
dealRouter.get("/get-users", getUsers);
dealRouter.get("/get-lead-data", getLeadData);
dealRouter.get("/get-advisors", getAdviors);
dealRouter.get("/get-locations", getLocations);
dealRouter.get("/get-contacts", getContacts);
dealRouter.post("/get-single-data", getSingleData);
dealRouter.get("/deal-related-data/:id?", dealRelatedData);
dealRouter.post("/create-standard-deal", createStandrardDeal);
dealRouter.put("/update-standard-deal/:id?", updateStandrardDeal);
dealRouter.post("/create-life-insurance-deal", createLifeInsurenceDeal);
dealRouter.put("/update-life-insurance-deal/:id?", updateLifeInsurenceDeal);
dealRouter.post("/download-file", downloadFile);

module.exports = dealRouter;
