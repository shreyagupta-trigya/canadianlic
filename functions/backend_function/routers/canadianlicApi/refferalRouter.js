const express = require('express');
const refferalRouter = express.Router();

// const {testConnection}= require("../controller/finance/referralController");

// refferalRouter.get("/", testConnection);

const { testConnection, referralRelatedData,createReferral,updateReferral,countRefferal } = require("../controller/finance/referralController");

refferalRouter.get("/", testConnection);
refferalRouter.get("/getreferral-byId/:id?", referralRelatedData);
refferalRouter.put("/create-referral", createReferral);
refferalRouter.post("/update-referral/:id?", updateReferral);
refferalRouter.get("/count-referral", countRefferal);

module.exports = refferalRouter;