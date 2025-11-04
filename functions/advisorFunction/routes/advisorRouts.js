const express = require("express");
const adviosrRouter = express.Router();



// const {testConnection,locations, allContacts,offering,postadvisors,updateAdvisor,getadvisor,getalladvisors,deleteadvisor,getadvisors,downloadFile} = require("../Controller/controller.js");
const {testConnection,getalladvisors,deleteadvisor} = require("../Controller/controller.js");
adviosrRouter.get("/", testConnection);
// adviosrRouter.get("/locations", locations);
// adviosrRouter.get("/allContacts", allContacts);
// adviosrRouter.get("/offering", offering);
// adviosrRouter.post("/postadvisors", postadvisors);
// adviosrRouter.post("/updateAdvisor/:id?", updateAdvisor);
// adviosrRouter.post("/getadvisor/:id?", getadvisor);
// adviosrRouter.get("/getadvisors", getadvisors);
adviosrRouter.post("/getalladvisors/:id?", getalladvisors);
adviosrRouter.delete("/deleteadvisor/:id?", deleteadvisor);
// adviosrRouter.post("/download-files", downloadFile);


module.exports = adviosrRouter;
