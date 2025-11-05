const express = require("express");
const clientContactRouter = express.Router();

const {testConntection,contactRelatedData,createContact,updateContact,downloadFile,getRefferalClients,countContactClients} = require("../controller/contacts/clientController");

clientContactRouter.get("/test-conntection", testConntection);
clientContactRouter.get("/get-contact/:id", contactRelatedData);
clientContactRouter.put("/create-contact", createContact);
clientContactRouter.post("/update-contact/:id", updateContact);
clientContactRouter.post("/get-refferal-contact/:id?", getRefferalClients);
clientContactRouter.post("/download-files",downloadFile);
clientContactRouter.get("/get-contact-client-count", countContactClients);
module.exports = clientContactRouter;