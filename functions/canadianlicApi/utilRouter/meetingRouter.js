const express = require('express');
const meetngRouter = express.Router();

const {meetingConnection,createMeeting,updateMeeting,getMeeting,deleteMeeting} = require("../controller/utilsApis/meetingController");

meetngRouter.get("/meeting-connection",meetingConnection);
meetngRouter.post("/create-meeting",createMeeting);
meetngRouter.put("/update-meeting/:id",updateMeeting);
meetngRouter.post("/get-meeting",getMeeting);
meetngRouter.post("/delete-meeting/:id",deleteMeeting);

module.exports = meetngRouter;