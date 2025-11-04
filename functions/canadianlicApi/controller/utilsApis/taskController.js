const catalyst = require("zcatalyst-sdk-node");
require("dotenv").config();
const pageSize = process.env.PAGE_SIZE;
const queries = require("../../SQL/taskQuery");

exports.taskConnection = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "I am live!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "I am not live!" });
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
    res.status(200).json({ success: true, message: "task created", ROWID: response.ROWID });
  }
  catch (err) {
    res.status(409).json({ success: false, message: "task not created" });
  }
}

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
    res.status(200).json({ success: true, message: "task updated", ROWID: response.ROWID });
  }
  catch (err) {
    res.status(409).json({ success: false, message: "task not updated" });
  }
}
exports.getTask = async (req, res) => {
  try {
    const { page } = req.body;
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const pageInt = parseInt(page) || 1;
    const pageNo = (pageInt - 1) * pageSize;
    let taskQuery = queries.gettask.replace("%LIMIT%", pageSize).replace("%OFFSET%", pageNo);
    console.log("taskquery" + taskQuery);
    const responseArr = await adminApp.zcql().executeZCQLQuery(`${taskQuery}`);
    //console.log(responseArr);
    const taskResp = await parseTaskDB(responseArr);

    res
      .status(200)
      .json({ success: true, message: "Task Get Successfully", taskResp });
  } catch (error) {
    res
      .status(409)
      .json({ success: false, message: "Task Not Get ", error: error });
  }
}
exports.taskDelete = async (req, res) => {
  try {
    const rowId = req.body.ids || req.params.id;
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const deleteTaskQuery = `${queries.deleteTask}(${rowId})`;
    //console.log("deletequery>>>>>>>",deletequery);
    const response = await adminApp.zcql().executeZCQLQuery(deleteTaskQuery);
    res
      .status(200)
      .json({
        success: true,
        message: "Task Deleted Successfully",
        data: response,
      });
  } catch (error) {
    res
      .status(409)
      .json({
        success: false,
        message: "Task Deleted Issue",
        error: error.message,
      });
    console.log(error);
  }
};
async function parseTasks(formData) {
  return {
    subject: formData?.subject ?? "",
    dueDate: formData?.dueDate ?? null,
    owner: formData?.owner ?? null,
    reminder: formData?.reminder ?? false,
    taskRepeat: formData?.taskRepeat ?? false,
    refrenceModule: formData?.refrenceModule ?? "",
    status: formData?.status ?? "",
    description: formData?.description ?? "",
    taskPriority: formData?.taskPriority ?? "",

  }

}


async function parseTaskDB(formData) {
  return formData.map(({ tasks, userData }) => ({
    subject: tasks?.subject ?? "",
    dueDate: tasks?.dueDate ?? null,
    ownerName: ((userData?.firstName ?? "") + (userData?.lastName ?? "")),
    owner: tasks?.owner ?? "",
    reminder: tasks?.reminder ?? false,
    taskRepeat: tasks?.taskRepeat ?? false,
    refrenceModule: tasks?.refrenceModule ?? "",
    status: tasks?.status ?? "",
    description: tasks?.description ?? "",
    taskPriority: tasks?.taskPriority ?? "",
    rowId: tasks?.ROWID ?? null,

  }));
}
