const express = require("express");
const dealRouter = express.Router();

const { testConntection} = require("../controller/deals/DealController");
// // ************ CRUD FUNCTION & DOWNLOAD FILE *********** 
const {createStandrardDeal,updateStandrardDeal,createLifeInsurenceDeal, updateLifeInsurenceDeal,downloadFile,dealRelatedData,countDeals} = require("../controller/deals/DealController");

dealRouter.get("/test-connection", testConntection);
dealRouter.get("/get-related-data/:id?", dealRelatedData);
dealRouter.put("/create-standrard-deal", createStandrardDeal);
dealRouter.post("/update-standrard-deal/:id", updateStandrardDeal);
dealRouter.post("/download-files", downloadFile);
// //******** Life Insurance **********/ 
dealRouter.put("/create-life-insurence", createLifeInsurenceDeal);
dealRouter.post("/update-life-insurence/:id", updateLifeInsurenceDeal);
dealRouter.get("/get-deals-count", countDeals);


module.exports = dealRouter;