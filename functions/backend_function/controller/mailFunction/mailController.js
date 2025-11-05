const catalyst = require("zcatalyst-sdk-node");
const queries = require("../SQL/query");
const fs = require('fs');
const nodemailer = require('nodemailer');
require('dotenv').config();
const path = require('path');

const fromEmail = process.env.EMAIL_USER;
const password = process.env.EMAIL_PASS;
// ********** TEST FUNCTION *********
exports.testMail = async (req, res) => {
  res.status(200).json({ success: true, message: 'I am live!' });
};
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,  // Use port 465 for SSL
  secure: true,  // Use true for SSL
  auth: {
      user: fromEmail,
      pass: password
  }
});

// ************* SEND MAIL FUNCTION *******************
exports.sendMail = async (req, res) => {
  const { email, subject, message,sendBy } = req.body;
  const adminApp = catalyst.initialize(req,{ scope: 'admin'});
  let fileStore = adminApp.filestore().folder("22106000001176777"); 

  const attachments = req.files ? req.files.map(file => ({
    filename: file.originalname,
    path: path.join(__dirname, '..', file.path),
    cid: file.filename
  })) : [];
  const config = {
    code: fs.createReadStream(attachments[0].path),
    name: attachments[0].filename
  }
  const documnetdata = await fileStore.uploadFile(config);
  const mailOptions = {
    from: fromEmail,
    to: email,
    subject: subject,
    html: message,
    attachments: attachments
  };
  try {
    await transporter.sendMail(mailOptions);
    const sendMail = {
      subject: subject,
      mailBody: message,
      mailTo: email,
      sendBy:sendBy,
      status: "send",
      documnetId : documnetdata.id
    }
    const result = await adminApp.datastore().table("mails").insertRow(sendMail);
    // console.log("<<<<< Result >>>>>", result);
    if (req.files) {
      req.files.forEach(file => {
        fs.unlinkSync(path.join(__dirname, '..', file.path));
      });
    }
    res.status(200).send({ message: 'Email sent successfully!', sendMail });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ error: 'Failed to send email.' });
  }
};

//********* GET FILE USING ID**********/
exports.downloadFile = async (req, res) => {
  try {
    const { id, type } = req.body;
    console.log("req.body.id ==>", req.body);
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
// ************* GET MAILS FUNCTION *******************
exports.getMailList = async(req, res) =>{
    try{
      let pageSize=300;
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const {status,page} = req.body;
    const pageInt = parseInt(page) || 1;
    const pageNo = (pageInt - 1) * pageSize;
    let mailQuery = status === "" || status === "send" ? 
    queries.getMail.replace("%LIMIT%", pageSize).replace("%OFFSET%", pageNo) : 
    queries.getMailList.replace("%STATUS%",`'${status}'`).replace("%LIMIT%", pageSize).replace("%OFFSET%", pageNo);
    console.log("getLeadList>>>>>>>",mailQuery);
    const response=await  adminApp.zcql().executeZCQLQuery(`${mailQuery}`); 
    console.log("response>>>>>", response);
    const mailsResp = await mailsDBDataParse(response);
    res.status(200).json({success: true, message: "Mail get Successfully",mailsResp});
    }
    catch(err){
      res.status(409).json({success: false, message: "Mail get Issue", error:err});
    }
}

exports.deleteMail = async (req, res) => {
  const rowId = req.params.id || req.body.id;
  try {
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const deletequery =  `${queries.deleteMail}('${rowId}')`;
    console.log("delete query>>>>>>>", deletequery);
    const mailResp = await adminApp.zcql().executeZCQLQuery(deletequery);
    res.status(200).json({ success: true, message: "Mail successfully deleted", mailResp});
  } catch (error) {
    res
      .status(409)
      .json({ success: true, message: "Mail successfully deleted" });
  }
};

exports.getMailByUser = async(req, res) => {
const userId = req.params.id || req.body.id;
try{
  let pageSize=300;
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  const {page} = req.body;
  const pageInt = parseInt(page) || 1;
  const pageNo = (pageInt - 1) * pageSize;
  //  const adminApp = catalyst.initialize(req,{scope:"admin"});
   const mailQuery = queries.getMailByUser.replace("%userId%", userId).replace("%LIMIT%", pageSize).replace("%OFFSET%", pageNo);
  //  console.log("getLeadList>>>>>>>",mailQuery);
   const response=await  adminApp.zcql().executeZCQLQuery(`${mailQuery}`);
   const mailsResp = await mailsDBDataParse(response);
   res.status(200).json({success: true, message: "Mail get Successfully", mailsResp});
}catch(error){
  res.status(409).json({ success: false, message: "Mail get Issue", error: error});
}
}
// ************* MAIL DB PARSER *******************
async function mailsDBDataParse(response) {  
  return response.map((item)=>({
    mailBody: item.mails.mailBody,
    mailBody: item.mails.mailBody,
    subject: item.mails.subject,
    mailBcc: item.mails.mailBcc,
    documnetId: item.mails.documnetId,
    replyTo: item.mails.replyTo,
    mailTo: item.mails.mailTo,
    rowId: item.mails.ROWID,
    mailFrom: item.mails.mailFrom,
    mailCc: item.mails.mailCc,
    status: item.mails.status,
    sendBy: item.mails.sendBy,
    userName: `${item?.userData?.firstName??""} ${item?.userData?.lastName??""}`
  }));
}