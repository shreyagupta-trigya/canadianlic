const express = require("express");
const advRouter = express.Router();
// const {getUsers, getAdviors, getLocations, getContacts, getLeadData } = require("../controller/contacts/advisorController");

const {testConntection, createContactAdvisor, advisorRelatedData, updateContactAdvisor ,countContactAdvisor}  = require("../controller/contacts/advisorController");



advRouter.get("/test-conntection", testConntection);
advRouter.put("/create-advisor", createContactAdvisor);
advRouter.post("/update-advisor/:id?", updateContactAdvisor);
advRouter.get("/get-advisor-related-data/:id?", advisorRelatedData);
advRouter.get("/get-contact-advisor-count", countContactAdvisor);

// advRouter.post("/download-files", downloadFile);
module.exports = advRouter;

