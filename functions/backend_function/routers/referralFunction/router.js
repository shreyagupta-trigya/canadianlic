const express = require("express");
const referralRouter = express.Router();
const {
  createReferral,
  getAllReferrals,
  getUsers,
  getSingleReferral,
  updateReferral,
  deleteReferral,
  sendEmailSample,
  registerReferral,
  approveReferralEmail,
  getContactDetails,
  getReferralList,
  getReferralRegister,
  updateRegisterReferral
} = require("../../controller/referralFunction/referralController");

referralRouter.post("/createReferral", createReferral);
referralRouter.post("/getAllReferrals/:id?", getAllReferrals);
referralRouter.get("/getUsers", getUsers);
referralRouter.get("/getSingleReferral/:id", getSingleReferral);
referralRouter.put("/updateReferral/:id", updateReferral);
referralRouter.delete("/deleteReferral/:id", deleteReferral);
referralRouter.post("/sendEmailSample", sendEmailSample);
referralRouter.post("/registerReferral", registerReferral);
referralRouter.put("/approveReferralEmail/:id", approveReferralEmail);
referralRouter.get("/getContactDetails/:id?", getContactDetails);
referralRouter.get("/getReferralList", getReferralList);
referralRouter.get("/getReferralRegister/:id", getReferralRegister);
referralRouter.put("/updateRegisterReferral/:id", updateRegisterReferral);

module.exports = referralRouter;
