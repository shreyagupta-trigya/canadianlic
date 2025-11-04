const express = require("express");
const dealRoute = express.Router();
// deal life insurance controller 

const { 
    testConntection, 
    getAllDeal, 
    deleteDeals, 
} = require("../controller/DealController");
const {
    getLeads,
    getUsers,
    getLeadData,
    getAdviors,
    getLocations,
    getContacts,
    getSingleData,
    dealRelatedData} = require("../controller/DealController");
// crude functionality 
const {createStandrardDeal,updateStandrardDeal,createLifeInsurenceDeal, updateLifeInsurenceDeal,downloadFile} = require("../controller/DealController");

dealRoute.get("/test-connection", testConntection);
dealRoute.post("/get-all-deals/:id?", getAllDeal);

dealRoute.get("/get-leads/:id?", getLeads);
dealRoute.delete("/delete-deal/:id?", deleteDeals);
// PETER Functionality
dealRoute.get("/get-users", getUsers);
dealRoute.get("/get-advisors", getAdviors);
dealRoute.get("/get-locations", getLocations);
dealRoute.get("/get-contacts", getContacts);
dealRoute.get("/get-lead-data", getLeadData);
dealRoute.get("/get-single-data", getSingleData);
dealRoute.get("/get-related-data/:id?", dealRelatedData);
dealRoute.put("/create-standrard-deal", createStandrardDeal);
dealRoute.post("/update-standrard-deal/:id", updateStandrardDeal);
dealRoute.post("/download-files", downloadFile);
// Life Insurance
dealRoute.put("/create-life-insurence", createLifeInsurenceDeal);
dealRoute.post("/update-life-insurence/:id", updateLifeInsurenceDeal);


module.exports = dealRoute;