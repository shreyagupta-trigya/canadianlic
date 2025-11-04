const express = require("express");
const referralRouter = express.Router();

// ******* REFERRAL CONROLLER FUNCTION *****
const { refferalConnection, getReferralsList,getReferralsLeads, referralRelatedData,createReferral,updateReferral } = require("../controller/refferalController");

referralRouter.get("/testConnecton", refferalConnection);
referralRouter.post("/referral-list", getReferralsList);
referralRouter.post("/get-referral-lead/:id?", getReferralsLeads);
referralRouter.get("/getreferral-byId/:id?", referralRelatedData);
referralRouter.put("/create-referral", createReferral);
referralRouter.post("/update-referral/:id?", updateReferral);

module.exports= referralRouter;