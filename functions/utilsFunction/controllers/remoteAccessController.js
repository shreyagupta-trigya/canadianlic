const catalyst = require("zcatalyst-sdk-node");
const queries = require("../SQL/query");
const dotenv = require("dotenv");
dotenv.config();
const pageSize = process.env.PAGE_SIZE;

exports.testRemoteAccess =  async (req, res) => {
 res.status(200).json({success: true, message:"I am live"});
}
exports.createRemoteAccess = async (req, res) => {
    const formData = req.body;
    try {
        const adminApp = catalyst.initialize(req, { scope: "admin" });  
        const remoteData = await remoteDataParser(formData); 
        const remoteResp= await adminApp.datastore().table("remoteAccess").insertRow(remoteData); 
        res.status(200).json({
            success: true,
            message: "Remote Access Created Successfully",
            rowId: remoteResp.ROWID,
        });
    } catch (error) {
        res.status(409).json({
            success: false,
            message: "Remote Access Creation Failed",
            error: error,
        });
    }
};

exports.updateRemoteAccess = async (req, res) => {
    const formData = req.body;
    const rowId = req.params.id;
    try {
        if (!rowId) {
            return res.status(403).json({ success: false, message: "Invalid row ID" });
        }
        const adminApp = catalyst.initialize(req, { scope: "admin" });  
        const remoteData = await remoteDataParser(formData); 
        const remoteResp= await adminApp.datastore().table("remoteAccess").updateRow({...remoteData, ROWID:rowId});
        // console.log("remoteResp", remoteResp); 
        res.status(200).json({
            success: true,
            message: "Remote Access Updataion Successfully",
            rowId: remoteResp.ROWID,
        });
    } catch (error) {
        res.status(409).json({
            success: false,
            message: "Remote Access Updation Failed",
            error: error,
        });
    }
};

exports.deleteRemoteAccess = async (req, res) => {
  try {
    const rowId = req.params.id;
    if (!rowId) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid row ID" });
    }
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    await adminApp.datastore().table("remoteAccess").deleteRow(rowId);
    res.status(200).json({
      success: true,
      message: "Remote Access Deleted Successfully",
      rowId: rowId,
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      message: "Remote Access Deletion Failed",
      error: error,
    });
  }
};
exports.getCount = async(req, res) =>{
    try {
      const adminApp = catalyst.initialize(req, { scope: "admin" });
        const query =  `${queries.getRemoteAccessCount}`;
        // console.log("query >>>>", query);
        const response = await adminApp.zcql().executeZCQLQuery(query);
        let data = JSON.parse(JSON.stringify(response).replace("COUNT(ROWID)", "total"));
        const total = data?.[0]?.remoteAccess?.total;
        res.status(200).json({
          success: true,
          message: "RemoteAccess Count Fetched Successfully",
          count:total
        });
      } catch (error) {
        res.status(409).json({ success: false, message: "Failed to fetch count", error: error });
    }
}
exports.getallRemoteAccess = async(req, res) =>{
try{
const adminApp = catalyst.initialize(req, {scope:"admin"});
const {page} = req.body;
const pageInt = parseInt(page) || 1;
const pageNo = (pageInt - 1) * pageSize;
let remoteAccessQuery =  queries.getAllRemoteAccess.replace("%LIMIT%",pageSize).replace("%OFFSET%",pageNo);
const remoteAccessResp =  await adminApp.zcql().executeZCQLQuery(remoteAccessQuery);
const accessResp = await remoteAccessDBParser(remoteAccessResp);
res.status(200).json({success: true, message: "Get All Remote Access", accessResp});
}catch(error){
  res.status(404).json({ success: false, message: "No records found", error: error });
}
}
// ********* REMOTE ACCESS DB PARSER *********
async function remoteAccessDBParser(remoteAccessResp) {
  return remoteAccessResp.map((item)=>({
    rowId: item.remoteAccess.ROWID,
    name: item.remoteAccess.name,
    owner: item.remoteAccess.owner,
    onDemandSession: item.remoteAccess.onDemandSession,
    dateAndTime: item.remoteAccess.dateAndTime,
    reminder: item.remoteAccess.reminder,
    contactId: item.remoteAccess.contactId,
    description: item.remoteAccess.description,
    sessionId: item.remoteAccess.sessionId,
    exchangeRate: item.remoteAccess.exchangeRate,
    digest: item.remoteAccess.digest,
    sessionType: item.remoteAccess.sessionType,
    currency: item.remoteAccess.currency,
    timezonelist: item.remoteAccess.timezonelist,
    scheduleId: item.remoteAccess.scheduleId,
    leadId: item.remoteAccess.leadId,
    contactsName: `${item?.contacts?.firstName??""} ${item?.contacts?.lastName??""}`,
    leadName: `${item?.leads?.firstName ?? ""} ${item?.leads?.lastName ?? ""}`,
    userName: `${item?.userData?.firstName ?? ""} ${item?.userData?.lastName ?? ""}`
  }));

}
async function remoteDataParser(data) {
    return {
        name: data?.name ?? '',
        owner: data?.owner ?? null,
        exchangeRate: data?.exchangeRate ?? '',
        currency: data?.currency ?? '',
        sessionType: data?.sessionType ?? '',
        description: data?.description ?? '',
        dateAndTime: data?.dateAndTime ?? '',
        reminder: data?.reminder ?? '',
        leadId: data?.leadId ?? null,
        contactId: data?.contactId ?? null,
        sessionId: data?.sessionId ?? '',
        digest: data?.digest ?? '',
        onDemandSession: data?.onDemandSession ?? '',
        scheduleId: data?.scheduleId ?? '',
        timezonelist: data?.timezonelist ?? ''
    }
}
