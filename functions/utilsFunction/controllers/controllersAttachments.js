const catalyst = require("zcatalyst-sdk-node");
const dotenv = require("dotenv");
const fs = require("fs");
const { getAttachments,getAttachment } = require("../SQL/query");
const { log } = require("console");
dotenv.config();


exports.getAllDocuments = async (req, res) => {
  try {
    const catalystApp = catalyst.initialize(req, { scope: "admin" });
    // let folderID = process.env.attachments;
    const query = `${getAttachments}'${req.params.id}'`;
    const fileDetails = await catalystApp.zcql().executeZCQLQuery(query);
    console.log("File",fileDetails)
    const attachments = fileDetails.map((item) => ({
      id: item.attachments.ROWID,
      attchments: item.attachments.attachmentTxt,
      moduleId: item.attachments.moduleId,
      addedTime:item.attachments.CREATEDTIME,
      addedBy:item?.userData?.firstName +" "+item?.userData?.lastName
    }));
    res.status(200).json({
      success: true,
      message: "Files fetched successfully",
      attachments,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "faild to get all files detail" });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const { id, type } = req.body;
    console.log("req.body.id ==>", req.body);
    const folderID = type === "note"?process.env.noteAttachments : process.env.attachments;
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    console.log(folderID);
    
    // Download the file and wait for it to resolve
    let fileObject= await adminApp
      .filestore()
      .folder(folderID)
      .downloadFile(id);
      
    if (!fileObject) {
      throw new Error('File not found');
    }

    res.writeHead(200, {
      "Content-Length": fileObject.length,
      "Content-Disposition": `attachment; filename="${fileObject.file_name}"`,
    });
    res.end(fileObject);
  } catch (error) {
    res.status(409).json({
      success: false,
      message: "Download File unsuccessfully...!!!",
      error: error,
    });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    const { type,moduleId,addedBy } = req.body;
    const catalystApp = catalyst.initialize(req, { scope: "admin" });
    const folderID = type === "note"?process.env.noteAttachments : process.env.attachments;
    console.log("folderID", folderID);
    console.log("req.files",req.files);
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded.' });
    }
    let responses = [];
    
    for (const file of req.files) {
      let config = {
        code: fs.createReadStream(file.path), // Use Multer's file path
        name: file.originalname, // Use Multer's original filename
      };

      // Upload the file to Zoho Catalyst File Store
      let response = await catalystApp
        .filestore()
        .folder(folderID)
        .uploadFile(config);
      console.log("response",response)
      responses.push({id:response.id,file_name:response.file_name,file_size:response.file_size,mimeType:"application/pdf"});
    }
    let config = {
      attachmentTxt: JSON.stringify(responses),
      moduleId: moduleId,
      addedBy: addedBy,
    };
    let attResp = await catalystApp.datastore().table("attachments").insertRow(config);
    const filesArr = {
      id: attResp.ROWID,
      attchments: attResp.attachmentTxt,
      moduleId: attResp.moduleId,
      addedTime:attResp.CREATEDTIME,
      addedBy:attResp.addedBy
    };
    res
      .status(200)
      .json({
        success: true,
        message: "File uploaded successfully",
        resp: filesArr,
      });
  } catch (error) {
    console.error("Internal server error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const { id, type, recId } = req.body;
    let query = `${getAttachment}'${recId}'`;
    const folderID = type === "note"?process.env.noteAttachments : process.env.attachments;
    const adminApp = catalyst.initialize(req, { scope: "admin" });

    const resp = await adminApp.filestore().folder(folderID).deleteFile(id).then(async (respons) =>{
      console.log("respons",respons)
      // const attachment = await adminApp.zcql().executeZCQLQuery(query);
      // let files = JSON.parse(attachment.attachmentTxt);
      // console.log("files",files)
      
      // let filesArr = files.filter((item) => item.id !== id);
      // console.log("filesArr",filesArr)
      
      // const updateConfig = {
      //   attachmentTxt: JSON.stringify(filesArr),
      //   ROWID: recId,
      // };
      // const table = adminApp.datastore().table("attachments");
      // try {
      //   await filesArr.length === 0
      //     ? table.deleteRow(recId)
      //     : table.updateRow(updateConfig);
      // } catch (error) {
      //   res.status(409).json({
      //     success: false,
      //     message: "Delete or Update Attachment record  unsuccessfully...!!!",
      //     error: error,
      //   });
      // }
    });
    console.log("id and type",id,type)
    res
      .status(200)
      .json({ success: true, message: "Files Deleted successfully",resp });
  } catch (error) {
    res.status(409).json({
      success: false,
      message: "Delete File unsuccessfully...!!!",
      error: error,
    });
  }
};