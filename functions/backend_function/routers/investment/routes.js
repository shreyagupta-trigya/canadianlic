const express=require("express");

const {createNewInvestment,getAllInvestments,updateInvestment,deleteInvestment}=require("../../controller/investment/controller")

const investmentRouter=express.Router();


investmentRouter.put("/createinvestment",createNewInvestment);

investmentRouter.get("/getinvestment/:id?",getAllInvestments);


// investmentRouter.route("/getusers/:id?").get(updateInvestment)

investmentRouter.delete("/deleteinvestment/:id",deleteInvestment)

investmentRouter.post("/updateinvestment/:id?",updateInvestment) 



module.exports=investmentRouter;