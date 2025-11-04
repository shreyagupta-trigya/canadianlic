const express=require("express");

const {createLocation,getLocation,updateLocation,deleteLocation,getSingleLocation,getSingleLocationData,downloadFile}=require("./controller")

const locationRouter=express.Router();


locationRouter.put("/createlocation",createLocation);

locationRouter.post("/getlocation/:id?", getLocation);
locationRouter.get("/getsinglelocation/:id?", getSingleLocation);
locationRouter.get("/getsinglelocationdata/:id?", getSingleLocationData);


locationRouter.delete("/deletelocation/:id", deleteLocation)

locationRouter.post("/updatelocation/:id", updateLocation) 
locationRouter.post("/download-files",downloadFile)

module.exports=locationRouter;