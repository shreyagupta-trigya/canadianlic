const express=require("express");
const router = express.Router();

const {testConnection,create_insurancepartner,updateInsurancepartner,deleteInsurancepartner,getinsurancePartnerList,getinsurancePartnerbyid} = require("../../controller/insurancePartner/controller");
router.get("/testConnection", testConnection);
router.put("/create-insurance-partner", create_insurancepartner);
router.post("/update-insurance-partner/:id", updateInsurancepartner);
router.post("/delete-insurance-partner/:id", deleteInsurancepartner);
router.post("/get-insurance-partner", getinsurancePartnerList);
router.post("/get-insurance-partner-byid/:id", getinsurancePartnerbyid);

// **************** VENDOR FUNCTIONS ******************
const { testVendorConnection,createVendor } = require("../../controller/insurancePartner/vendorController");
router.get("/vendor-connections", testVendorConnection);
router.post("/create-vendor", createVendor);

module.exports = router;