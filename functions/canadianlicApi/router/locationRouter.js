const express=require("express");

const {testConnection,
    createLocation,getLocation,updateLocation,deleteLocation,getSingleLocation,getSingleLocationData,downloadFile,countLocations}=require("../controller/location/locationController");

const locationRouter=express.Router();


locationRouter.put("/createlocation",createLocation);

locationRouter.get("/test-connection", testConnection);
locationRouter.get("/getlocation", getLocation);
locationRouter.get("/getsinglelocation/:id?", getSingleLocation);
locationRouter.get("/getsinglelocationdata/:id?", getSingleLocationData);


locationRouter.delete("/deletelocation/:id", deleteLocation)

locationRouter.post("/updatelocation/:id", updateLocation) 
locationRouter.post("/download-files",downloadFile)
locationRouter.get("/get-location-count", countLocations);

module.exports=locationRouter;