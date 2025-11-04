const catalyst = require("zcatalyst-sdk-node");
require("dotenv").config();
const pageSize = process.env.PAGE_SIZE;
const queries = require("../../SQL/meetingQuery");
const {
  generateToken,
  dataSyncZcrm,
} = require("../../controller/crmIntegration/meetingCrmConnection");

exports.meetingConnection = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "I am live!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "I am not live!" });
  }
};
exports.createMeeting =async (req,res)=>{
  try{
    const data = req.body;
    const meetingData = await parseMeeting(data);
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const response = await adminApp
      .datastore()
      .table("meeting")
      .insertRow(meetingData);
    //************ CRM FUNCTIION ************
    const rowId =  response?.ROWID;
    const token = await generateToken();
    const crmId = await dataSyncZcrm(token,{...data,ROWID:rowId});
    await adminApp.datastore().table("meeting").updateRow({sourceId:crmId,source:"catalyst",ROWID:rowId});
    console.log("crmID ====>", crmId);
    //************ END CRM FUNCTIION ************

      res
      .status(200)
      .json({ success: true, message: "Meeting Created", ROWID: response.ROWID });

  }
  catch(err) {
    res.status(409).json({ success: false, message: "Meeting Not Created" });
  }
}

exports.updateMeeting =async (req,res)=>{
  try{
    const rowId = req.body.id || req.params.id;
    const data = req.body;
    const meetingData = await parseMeeting(data);
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const response = await adminApp
      .datastore()
      .table("meeting")
      .updateRow({...meetingData,ROWID:rowId});
      res
      .status(200)
      .json({ success: true, message: "Meeting Updated", ROWID: response.ROWID });

  }
  catch(err) {
    res.status(409).json({ success: false, message: "Meeting not updated" });
  }
}

exports.getMeeting =async (req,res)=>{
  try {
    const { page } = req.body;
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const pageInt = parseInt(page) || 1;
    const pageNo = (pageInt - 1) * pageSize;
    let MeetingQuery = queries.getMeetingQuery.replace("%LIMIT%", pageSize).replace("%OFFSET%", pageNo);
      console.log("meeting get query"+MeetingQuery);
    const responseArr = await adminApp.zcql().executeZCQLQuery(`${MeetingQuery}`);
    const meetingResp = await parseMeetingDB(responseArr);

    res
      .status(200)
      .json({ success: true, message: "Meeting Get Successfully", meetingResp });
  } catch (error) {
    res
      .status(409)
      .json({ success: false, message: "Meeting not Get ", error: error });
  }
}

exports.deleteMeeting = async (req, res) => {
  try {
    const rowId = req.body.ids || req.params.id;
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const meetingQuery = `${queries.deleteMeeting}(${rowId})`;
    console.log(meetingQuery);
    const response = await adminApp.zcql().executeZCQLQuery(meetingQuery);
    res
      .status(200)
      .json({
        success: true,
        message: "Meeting Deleted Successfully",
        data: response,
      });
  } catch (error) {
    res
      .status(409)
      .json({
        success: false,
        message: "Meeting Deleted Issue",
        error: error.message,
      });
    console.log(error);
  }
};

exports.createTask = async (req, res) => {
  try {
    const formData = req.body;
    const taskData = await parseTasks(formData);
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const response = await adminApp
      .datastore()
      .table("tasks")
      .insertRow(taskData);
    // ***********CRM FUNCTION ***********
    const rowId = response?.ROWID;
    const token = await generateToken();
    const crmId = await dataSyncZcrm(token, { ...taskData, ROWID: rowId });
    await adminApp
      .datastore()
      .table("remoteAccess")
      .updateRow({ sourceId: crmId, source: "catalyst", ROWID: rowId });
    console.log("crmID ====>", crmId);
    res
      .status(200)
      .json({ success: true, message: "Task created", ROWID: response.ROWID });
  } catch (err) {
    res.status(409).json({ success: false, message: "Task not created" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const rowId = req.body.id || req.params.id;
    const formData = req.body;
    const taskData = await parseTasks(formData);
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const response = await adminApp
      .datastore()
      .table("tasks")
      .updateRow({ ...taskData, ROWID: rowId });
    // ***********CRM FUNCTION ***********
    // const rowId =  response?.ROWID;
    const token = await generateToken();
    const crmId = await dataSyncZcrm(
      token,
      { ...taskData, ROWID: rowId },
      rowId
    );

    res.status(200).json({
      success: true,
      message: "Task updated",
      ROWID: response.ROWID,
      CrmId: crmId,
    });
  } catch (err) {
    res.status(409).json({ success: false, message: "Task not updated" });
  }
};
exports.getTask = async (req, res) => {
  try {
    const { page } = req.body;
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const pageInt = parseInt(page) || 1;
    const pageNo = (pageInt - 1) * pageSize;
    let taskQuery = queries.gettask
      .replace("%LIMIT%", pageSize)
      .replace("%OFFSET%", pageNo);
    const responseArr = await adminApp.zcql().executeZCQLQuery(`${taskQuery}`);
    const taskResp = await parseTaskDB(responseArr);

    res
      .status(200)
      .json({ success: true, message: "Task get Successfully", taskResp });
  } catch (error) {
    res
      .status(409)
      .json({ success: false, message: "Task not get ", error: error });
  }
};


async function parseTasks(formData) {
  return {
    subject: formData?.subject ?? "",
    dueDate: formData?.dueDate ?? "",
    owner: formData?.owner ?? null,
    reminder: formData?.reminder ?? "",
    taskRepeat: formData?.taskRepeat ?? "",
    refrenceModule: formData?.refrenceModule ?? "",
    status: formData?.status ?? "",
    description: formData?.description ?? "",
    taskPriority: formData?.taskPriority ?? "",
  };
}

async function parseTaskDB(formData) {
  return formData.map(({ tasks }) => ({
    subject: tasks?.subject ?? "",
    dueDate: tasks?.dueDate ?? "",
    owner: tasks?.owner ?? null,
    reminder: tasks?.reminder ?? "",
    taskRepeat: tasks?.taskRepeat ?? "",
    refrenceModule: tasks?.refrenceModule ?? "",
    status: tasks?.status ?? "",
    description: tasks?.description ?? "",
    taskPriority: tasks?.taskPriority ?? "",
    rowId: tasks?.ROWID ?? null,
  }));
}
async function parseMeeting(data){
   return{
    bookingSummary: data?.bookingSummary ?? "",
    title: data?.title ?? "",
    // toDate: data?.toDate ?? null,
    // fromDate: data?.fromDate ?? null,
    meetingDate: data?.meetingDate ?? "",
    reRunRoundRobin: data?.reRunRoundRobin ?? null,
    roundRobinProcessed: data?.roundRobinProcessed ?? "",
    description: data?.description ?? "",
    reminder: data?.reminder ?? "",
    
   }
}
async function parseMeetingDB(data){
  return data.map(({ meeting }) => ({
    bookingSummary: meeting?.bookingSummary ?? "",
    meetingDate: meeting?.meetingDate ?? "",
    reRunRoundRobin: meeting?.reRunRoundRobin ?? null,
    roundRobinProcessed: meeting?.roundRobinProcessed ?? "",
    description: meeting?.description ?? "",
    reminder: meeting?.reminder ?? "",
    rowId: meeting?.ROWID ?? null,
  }));
}