const express =  require('express');
const vendorRouter = express.Router();

const {testConnection,createVendor,getVendor,getCount,deleteVendor,countVendors} = require("../controller/finance/vendor");

vendorRouter.get("/", testConnection);
vendorRouter.post("/create-vendor/:id?", createVendor);
vendorRouter.post("/get-vendor/:id?", getVendor);
vendorRouter.post("/get-count", getCount);
vendorRouter.post("/delete-vendor/:id?", deleteVendor);
vendorRouter.get("/count-vendor", countVendors);

module.exports = vendorRouter;