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

referralRouter.put("/createreferral", createReferral);
referralRouter.post("/getallreferrals/:id?", getAllReferrals);
referralRouter.get("/getusers", getUsers);
referralRouter.get("/getsinglereferral/:id", getSingleReferral);
referralRouter.post("/update-referral/:id", updateReferral);
referralRouter.delete("/deletereferral/:id", deleteReferral);
referralRouter.post("/send-email-sample", sendEmailSample);
referralRouter.post("/registerrefferal", registerReferral);
referralRouter.post("/approveReferralEmail/:id", approveReferralEmail);
referralRouter.get("/getcontactDetails/:id?", getContactDetails);
referralRouter.get("/getReferrallist", getReferralList);
referralRouter.get("/getReferralRegister/:id", getReferralRegister);
referralRouter.post("/updateregisterreferral/:id", updateRegisterReferral);

module.exports = referralRouter;
