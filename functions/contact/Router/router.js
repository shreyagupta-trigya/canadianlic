const express = require("express");
const contactRouter2 = express.Router();

const {getUsers,getAdviors,getLocations,getContacts,getLeadData} = require("../Controller/controller");

// Additional routes for testing connection, retrieving contact related data, creating a new contact, and updating an existing contact.
const {testConntection,contactRelatedData,createContact,updateContact} = require("../Controller/controller");

contactRouter2.get("/get-users", getUsers);
contactRouter2.get("/get-advisors", getAdviors);
contactRouter2.get("/get-locations", getLocations);
contactRouter2.get("/get-contacts", getContacts);
contactRouter2.get("/get-lead-data", getLeadData);

contactRouter2.get("/test-conntection", testConntection);
contactRouter2.get("/get-contact/:id", contactRelatedData);
contactRouter2.put("/create-contact", createContact);
contactRouter2.post("/update-contact/:id", updateContact);

module.exports = contactRouter2;