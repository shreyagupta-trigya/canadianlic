const express=require("express");

const {createNewPolicy,getAllPolicy,getAllUsers,getDeals,updatePolicy,deletePolicy, getAllInvestmentAndPolicy,getInsurencePartner,getContacts,getLocations, getOffering}=require("./controller")

const policyRouter=express.Router();


policyRouter.put("/createPolicy",createNewPolicy);

policyRouter.route("/getpolicy/:id?").get(getAllPolicy);
policyRouter.get("/getInsurecePartners",getInsurencePartner);
policyRouter.get("/getContacts",getContacts);
policyRouter.get("/getLocations",getLocations);
policyRouter.get("/getOffering", getOffering);

policyRouter.get("/getusers/:id?", getAllUsers)

policyRouter.delete("/deletepolicy/:id", deletePolicy)

policyRouter.post("/updatepolicy/:id?", updatePolicy) 

policyRouter.get("/getdeals", getDeals);

policyRouter.post("/getallinvandpolicy/:id?", getAllInvestmentAndPolicy);


module.exports=policyRouter;