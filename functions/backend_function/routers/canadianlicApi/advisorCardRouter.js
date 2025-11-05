const express = require('express');
const router = express.Router();
// const {testcredential} = require("../controller/advisorCredential/advisorController");

const {testcredential,getAllAdvisorCredentialById, getAllAdvisorCredential,addAdvisorCredential,updateAdvisorCredential,deleteAdvisorCredential,countAdvisorCredential} = require("../controller/advisorCredential/advisorController");

router.get("/testcredential", testcredential);
router.post("/getall-advisor-credential/:id?", getAllAdvisorCredential);
router.get("/get-all-advisor-credential-by-id", getAllAdvisorCredentialById);
router.put("/addadvisor-credential", addAdvisorCredential);
router.post("/update-advisor-cedential/:id?", updateAdvisorCredential);
router.delete("/delete-advisor-credential/:id?", deleteAdvisorCredential);
router.get("/get-advisor-credential-count", countAdvisorCredential);

module.exports = router;