const express = require("express");
const advRouter = express.Router();
const {getUsers, getAdviors, getLocations, getContacts, getLeadData } = require("../Controller/newController");

const {testConntection, createContactAdvisor, advisorRelatedData, updateContactAdvisor }  = require("../Controller/newController");

advRouter.get("/get-users", getUsers);
advRouter.get("/get-advisors", getAdviors);
advRouter.get("/get-locations", getLocations);
advRouter.get("/get-contacts", getContacts);
advRouter.get("/get-lead-data", getLeadData);

advRouter.get("/test-conntection", testConntection);
advRouter.put("/create-advisor", createContactAdvisor);
advRouter.post("/update-advisor/:id", updateContactAdvisor);
advRouter.get("/get-advisor-related-data/:id", advisorRelatedData);


module.exports = advRouter;

