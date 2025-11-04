const express=require("express");

const {testConnection,createNewContact,getAllContacts,getAllUsers,deleteContact,updateContact, getAllContactsDataById,downloadFile}=require("./controller")

const contactRouter=express.Router();

contactRouter.get("/testConnection", testConnection);
contactRouter.put("/createcontact",createNewContact);
contactRouter.get("/getcontact/:id?",getAllContactsDataById);
contactRouter.post("/get-contact-list-data/:id?",getAllContacts);
contactRouter.get("/getusers/:id?",getAllUsers)
contactRouter.delete("/deletecontact/:contactId?",deleteContact)
contactRouter.post("/updatecontact/:id?",updateContact) 
contactRouter.post("/download-files",downloadFile)

module.exports=contactRouter;