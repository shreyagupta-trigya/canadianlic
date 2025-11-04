const express = require("express");
const contactRouter = express.Router();

const {getUsers,getAdviors,getLocations,getContacts,getLeadData} = require("../../controller/contact/contactController");

// Additional routes for testing connection, retrieving contact related data, creating a new contact, and updating an existing contact.
const {testConntection,contactRelatedData,createContact,updateContact} = require("../../controller/contact/contactController");

contactRouter.get("/get-users", getUsers);
contactRouter.get("/get-advisors", getAdviors);
contactRouter.get("/get-locations", getLocations);
contactRouter.get("/get-contacts", getContacts);
contactRouter.get("/get-lead-data", getLeadData);

contactRouter.get("/test-conntection", testConntection);
contactRouter.get("/get-contact/:id", contactRelatedData);
contactRouter.put("/create-contact", createContact);
contactRouter.post("/update-contact/:id", updateContact);

module.exports = contactRouter;
