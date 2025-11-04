const express = require("express");
const router = express.Router();
// deal life insurance controller 

const { testConntection } = require("../controller/utilsApis/Apis");
// ************** COMMON FUNCTION **************
const { getUsers,getLeadData,getContacts,getLocations,getAdviors,getReferral,getOffering,getInsurecePartners} = require("../controller/utilsApis/Apis");

router.get("/test-connection", testConntection);
router.get("/get-users", getUsers);
router.get("/get-lead-data", getLeadData);
router.get("/get-contacts", getContacts);
router.get("/get-locations", getLocations);
router.get("/get-advisors", getAdviors);
router.get("/get-referral", getReferral);
router.get("/get-offering", getOffering);
router.get("/get-insurece-partners", getInsurecePartners);

module.exports = router;