const express = require('express');
const contactRouter =  express.Router()

const {testConnection,createContact} = require("../../controller/testFunction/contactController");

contactRouter.get("/",testConnection);
contactRouter.post("/create-contact",createContact);


// ********POLICY CONTROLLER*******

const {policyConnection,createPolicy} = require("../../controller/testFunction/policyController");
contactRouter.get("/testConnection", policyConnection);
contactRouter.post("/create-policy",createPolicy );

// *******Insurance testin******

const {insuranceConnection,createInsPartner} = require("../../controller/testFunction/insuranceController");

contactRouter.get("/insurance-connection",insuranceConnection);
contactRouter.post("/create-ins-partner",createInsPartner);


module.exports = contactRouter;