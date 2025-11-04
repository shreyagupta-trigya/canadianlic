const catalyst = require("zcatalyst-sdk-node");
const queries = require("../SQL/query");
const dontenv = require("dotenv");
dontenv.config();
const pageSize = process.env.PAGE_SIZE
// *********** TEST CONNECTION FUNCTION *********

exports.survayConnection = async (req, res) => {
  res.status(200).json({ success: true, message: "I am live " });
};
exports.createSurvay = async (req, res) => {
  try {
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const formData = req.body;
    const survayData = await parseServayData(formData);     
    const serResp = await adminApp
      .datastore()
      .table("zohoSurvay")
      .insertRow(survayData);
    res.status(200).json({
      success: true,
      message: "Survey Created Successfully...!!!",
      rowId: serResp.ROWID,
    });
  } catch (error) {
    res.status(209).json({ success: false, message: "Issue to create a servery" });
  }
};
exports.updateSurvay = async (req, res) => {
  try {
    const rowId = req.params.id;
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const formData = req.body;
    const survayData = await parseServayData(formData); 
    // console.log("survayData >>>>>>>>>>> ", survayData);
    const serResp = await adminApp
      .datastore()
      .table("zohoSurvay")
      .updateRow({ ...survayData , ROWID: rowId });
    res.status(200).json({
      success: true,
      message: "Survey Update successfully...!!!",
      rowId: serResp.ROWID,
    });
  } catch (error) {
    res.status(209).json({ success: false, message: "Issue to Update a servery" });
  }
};
exports.getServayList = async (req, res) => {
  try {
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const {page, layoutName} = req.body;
    const pageInt = parseInt(page) || 1;
    const pageNo = (pageInt - 1) * pageSize;
    const selectquery = queries.getSurvayList.replace("%LIMIT%",pageSize).replace("%OFFSET%",pageNo);
    if (layoutName !== "") {
        selectquery += ` AND layoutName = '${layoutName}'`;
    }
    console.log("selected query >>>>", selectquery)
    const serveryResp = await adminApp.zcql().executeZCQLQuery(selectquery);
    const survayResp =  await parseSuravayDB(serveryResp)
    res
      .status(200)
      .json({
        success: true,
        message: "Servery List fetched successfully...!!!",
        survayResp,
      });
  } catch (error) {
    res.status(209).json({
      success: false,
      message: "Issue to get a servery list",
      error: error
    });
  }
};
exports.getSurvayCount = async(req, res) =>{
  try {
    const adminApp = catalyst.initialize(req, { scope: "admin" });
      const query =  `${queries.getSurvayCount}`;
      // console.log("query >>>>", query);
      const response = await adminApp.zcql().executeZCQLQuery(query);
      let data = JSON.parse(JSON.stringify(response).replace("COUNT(ROWID)", "total"));
      const total = data?.[0]?.zohoSurvay?.total;
      res.status(200).json({
        success: true,
        message: "Zoho Survay Count Fetched Successfully",
        count:total
      });
    } catch (error) {
      res.status(409).json({ success: false, message: "Failed to fetch count", error: error });
  }
}
exports.deleteServay = async (req, res) => {
  try {
    const rowId = req.params.id;
    if (!rowId) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid row ID" });
    }
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    await adminApp.datastore().table("zohoSurvay").deleteRow(rowId);
    res.status(200).json({
      success: true,
      message: "Servay Deleted Successfully",
      rowId: rowId,
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      message: "Servay Deletion Failed",
      error: error,
    });
  }
};
// ************SERVAY DB PARSER **************
async function parseSuravayDB(serveryResp) {
  return serveryResp.map((item) =>({
    ownerName: `${item?.userData?.firstName??""} ${item?.userData?.lastName??""}`,
    surveyType: item?.zohoSurvay?.surveyType??"",
    campaignSubject: item?.zohoSurvay?.campaignSubject??"",
    senderName: item?.zohoSurvay?.senderName??"",
    senderAddress: item?.zohoSurvay?.senderAddress??"",
    replyToAddress: item?.zohoSurvay?.replyToAddress??"",
    ownerId: item?.zohoSurvay?.owner??"",
    expectedResponse: item?.zohoSurvay?.expectedResponse??"",
    advisorCampaigns: item?.zohoSurvay?.advisorCampaigns??"",
    endDate: item?.zohoSurvay?.endDate??"",
    numbersSent: item?.zohoSurvay?.numbersSent??"",
    description: item?.zohoSurvay?.description??"",
    type: item?.zohoSurvay?.type??"",
    roi: item?.zohoSurvay?.roi??"",
    insuranceLeadCampaigns: item?.zohoSurvay?.insuranceLeadCampaigns??"",
    budgetedCost: item?.zohoSurvay?.budgetedCost??"",
    expecteRevenue: item?.zohoSurvay?.expecteRevenue??"",
    exchangeRate: item?.zohoSurvay?.exchangeRate??"",
    survey: item?.zohoSurvay?.survey??"",
    currency: item?.zohoSurvay?.currency??"",
    department: item?.zohoSurvay?.department??"",
    rowId: item?.zohoSurvay?.ROWID??"",
    campaignName: item?.zohoSurvay?.campaignName??"",
    startDate: item?.zohoSurvay?.startDate ??"",
    status: item?.zohoSurvay?.status ??"",
    actualCost: item?.zohoSurvay?.actualCost ??"",

  }));
}

// *********** SURVERY PARSER DATA **********
async function parseServayData(data) {
  return {
    campaignSubject: data?.campaignSubject??"",
    senderName: data?.senderName??"",
    senderAddress: data?.senderAddress??"",
    replyToAddress: data?.replyToAddress??"",
    department: data?.department ?? "",
    surveyType: data?.surveyType ?? "",
    survey: data?.survey ?? "",
    owner: data?.owner ?? null,
    type: data?.type ?? "",
    roi: data?.roi ?? "",
    status: data?.status ?? "",
    campaignName: data?.campaignName ?? "",
    endDate: data?.endDate ?? "",
    startDate: data?.startDate ?? "",
    budgetedCost: data?.budgetedCost ?? "",
    expecteRevenue: data?.expecteRevenue ?? "",
    expectedResponse: data?.expectedResponse ?? "",
    actualCost: data?.actualCost ?? null,
    exchangeRate: data?.exchangeRate ?? "",
    numbersSent: data?.numbersSent ?? "",
    advisorCampaigns: data?.advisorCampaigns ?? "",
    currency: data?.currency ?? "",
    insuranceLeadCampaigns: data?.insuranceLeadCampaigns ?? "",
    description: data?.description ?? "",
    layoutName: data?.layoutName ?? "",
  };
}
