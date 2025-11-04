const express=require("express");
 const referralClientRouter =express.Router();

const {getReferralClientData}=require("../controller/utilsApis/referralClientController.js");

referralClientRouter.post("/get-referral-client",getReferralClientData)
module.exports = referralClientRouter;