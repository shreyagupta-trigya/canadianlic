const express = require('express');
const financeRouter = express.Router();
const {testConnection} = require("../controller/finance/InsurancePartner");


const {createinsurnacepartner,updateInsurancePartner,deletePartner,getAllPartners,getSingleInsurancePartner,downloadFile,countInsurancePartner} = require("../controller/finance/InsurancePartner");

financeRouter.get("/testConnection", testConnection);
financeRouter.put("/create-insurance-partner", createinsurnacepartner);
financeRouter.post("/update-insurance-partner/:id", updateInsurancePartner);
financeRouter.post("/delete-insurance-partner/:id", deletePartner);
financeRouter.post("/get-insurance-partner", getAllPartners);
financeRouter.post("/get-insurance-partner-byid/:id", getSingleInsurancePartner);
financeRouter.post("/download-files",downloadFile);
financeRouter.get("/count-insurance-partner", countInsurancePartner);

module.exports = financeRouter