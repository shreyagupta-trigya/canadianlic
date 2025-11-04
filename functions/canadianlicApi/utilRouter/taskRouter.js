const express = require("express");
const taskRouter = express.Router();
const multer=require("multer");


// Multer middleware configuration for uploading files.
const upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "temp/attachments");
      },
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    }),
  });

const {taskConnection,createTask,updateTask,getTask,taskDelete} =require("../controller/utilsApis/taskController");
taskRouter.get("/test-task", taskConnection);
taskRouter.post("/create-task",upload.array("file",10), createTask);
taskRouter.put("/update-task/:id", updateTask);
taskRouter.post("/get-task", getTask);
taskRouter.post("/delete-task/:id", taskDelete);


module.exports = taskRouter;