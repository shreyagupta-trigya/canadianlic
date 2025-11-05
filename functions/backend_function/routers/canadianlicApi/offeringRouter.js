const express  = require('express');
const offeringRouter = express.Router();

const {testConnection,downloadFiles,countOffering} = require("../controller/offering/offeringController");

offeringRouter.get("/test-connection", testConnection);
offeringRouter.post("/download-files", downloadFiles);
// offeringRouter.put("/create-offering", createoffering);
// offeringRouter.get("/get-allofferings", getallofferings);
offeringRouter.get("/count-offering", countOffering);

module.exports =offeringRouter