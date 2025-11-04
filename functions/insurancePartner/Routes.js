const express=require("express");

const {createinsurnacepartner,getinsurancePartner,getSingleInsurancePartner,updateInsurancePartner,deletePartner,getAllPartners,downloadFile}=require("./controller")

const insuranceRouter=express.Router();


insuranceRouter.put("/createinsurnacepartner",createinsurnacepartner);
insuranceRouter.post("/getinsurancepartner/:id?",getinsurancePartner);
insuranceRouter.get("/getinsurancepartner/:id?",getSingleInsurancePartner);
insuranceRouter.delete("/deletepartner/:id?",deletePartner)
insuranceRouter.post("/updateinsurancepartner/:id?",updateInsurancePartner) 
insuranceRouter.get("/getAllPartners/:id?",getAllPartners)
insuranceRouter.post("/download-files",downloadFile)
module.exports=insuranceRouter;