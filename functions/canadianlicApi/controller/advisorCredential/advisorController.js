var catalyst = require("zcatalyst-sdk-node");
const NodeCache = require("node-cache");
const query = require("../../SQL/advisorCredential/queries");
const searchQueryBuilder = require("../../Utils/searchQueryBuilder");
// const query = require("../../SQL/advisorCardQuery");
const util = require("../../Utils/util");
const cache = new NodeCache();
const {getSequence,updateSequence} = require("../../Utils/sequenceUtils");

// ****************CRM FUNCTION**************
const {dataSyncZcrm,generateToken} = require("../crmIntegration/advisorCredCrmIntegration");

exports.testcredential = (req, res) => {
  try {
    res.status(200).json({ success: true, message: "I am Live!" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "I am not live!", error: error });
  }
};

exports.getAllAdvisorCredentialById = async (req, res) => {
  try {
    let query;
    query = `SELECT * FROM advisorCredential WHERE ROWID = ${req.query.id}`;
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const advResp = await adminApp.zcql().executeZCQLQuery(query);
    res
      .status(200)
      .json({
        success: true,
        message: "Advisor successfully fetched",
        advResp: advResp,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Issue pulling user data",
      error: error,
    });
  }
};
exports.getAllAdvisorCredential = async (req, res) => {
  try {
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const { search } = req.body;

    const rowId = req.params.id;
    const page = parseInt(req.body.page, 10) || 1;
    const limit = parseInt(req.body.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const totaladvisorCredentialQuery =
      "SELECT COUNT(advisorCredential.ROWID) FROM advisorCredential";
    const totalAdvResult = await adminApp
      .zcql()
      .executeZCQLQuery(totaladvisorCredentialQuery);
    if (!totalAdvResult || totalAdvResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No records found",
      });
    }

    const totalCount = totalAdvResult[0].advisorCredential;
    const totalPages = Math.ceil(totalCount / limit);
    // console.log("totalCount", totalCount);
    const fieldMapping = {contractedAdvisorListing:["contacts.firstName", "contacts.lastName"], insurancePartnerListing:"insurencePartner.partnerName", advisorCredentialsOwner:["advisors.firstName","advisors.lastName"],modifiedTime:"MODIFIEDTIME", createdTime:"CREATEDTIME"};
    let searchConditions = searchQueryBuilder(search, fieldMapping);
  
    if (rowId) {
      const rowIdCondition = `ROWID = '${rowId}'`;
      searchConditions = searchConditions ? `${searchConditions} AND ${rowIdCondition}` : rowIdCondition;
    }

    const whereClause = searchConditions ? `WHERE (${searchConditions})` : '';
    let dataQuery = query.getAllAdvisorCredential
    .replace('%SEARCH_CONDITION%', whereClause)
    .replace('%LIMIT%', limit)
    .replace('%OFFSET%', offset);
  
    const dataResult = await adminApp.zcql().executeZCQLQuery(dataQuery);
    // console.log("dataResult", dataResult);
    const credRecord = dataResult.map((item) => ({
      mga: item.advisorCredential.mga,
      MODIFIEDTIME: item.advisorCredential.MODIFIEDTIME,
      userId: item.advisorCredential.userId,
      contractedAdvisorListing: `${item.contacts.firstName} ${item.contacts.lastName}`,
      CREATEDTIME: item.advisorCredential.CREATEDTIME,
      ROWID: item.advisorCredential.ROWID,
      advisorCredentialsOwner: `${item.advisors.firstName} ${item.advisors.lastName}`,
      insurancePartnerListing: item.insurencePartner.partnerName,
    }));
    res.status(200).json({
      success: true,
      data: credRecord,
      totalCount: totalCount["COUNT(ROWID)"],
      totalPages,
      limit,
      currentPage: Math.ceil(offset / limit) + 1,
      totalPages: Math.ceil(totalCount["COUNT(ROWID)"] / limit),
    });
  } catch (error) {
    console.error("Error fetching advisor credential data:", error);
    res.status(500).json({
      success: false,
      message: "Issue pulling user data",
      error: error.message || error,
    });
  }
};

exports.addAdvisorCredential = async (req, res) => {
  const payload = req.body;
  // const hashedPassword = await bcrypt.hash(payload.password, 10);
  const advisorData = await parsAdvisorData(payload);
    // SEQUENCE CODE
    const sequenceResp = await getSequence(req,"advisorCredential");
    let sequence =  sequenceResp?.data
    let sourceId = `${sequence?.prefix}-${sequence?.sequence.padStart(5,'0')}`;
    advisorData.sourceId = sourceId;

  try {
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const response = await adminApp
      .datastore()
      .table("advisorCredential")
      .insertRow(advisorData);
    const id = response.ROWID;
    console.log("ids", id);

    await updateSequence(req,sequence?.rowId,parseInt(sequence.sequence) + 1);

    // **********CRM FUNCCTION ********
    // const token = await generateToken();
    // const crmId = await dataSyncZcrm(token,{...advisorData,ROWID:id});
    // console.log("crmId:===> ", crmId);
    // await adminApp.datastore().table("advisorCredential").updateRow({sourceId:crmId,source:"catalyst",ROWID:id});

    res.status(200).json({
      success: true,
      message: "Advisor Credential Added Successfully...!!!",
      ROWID: response.ROWID,
    });
  } catch (error) {
    console.log(error);
    res.status(409).json({
      success: false,
      message: "Advisor Credential Added unsuccessfully...!!!",
      error: error,
    });
  }
};
exports.updateAdvisorCredential = async (req, res) => {
  const payload = req.body;
  const advisorDataWithValues = await parsAdvisorData(payload);
  const advisorData = Object.fromEntries(
      Object.entries(advisorDataWithValues).filter(([key, value]) => value !== "" && value !== null)
    );

  const adminApp = catalyst.initialize(req, { scope: "admin" });
  const table = adminApp.datastore().table("advisorCredential");
  try {
    const response = await table.updateRow({...advisorData,ROWID: req.params.id });
    // **********CRM FUNCCTION ********
    // const token = await generateToken();
    // const crmId = await dataSyncZcrm(token,{...advisorData,ROWID:id},payload?.sourceId);
    // console.log("crmId:===> ", crmId);
    
    res.status(200).json({
      success: true,
      message: "Advisor Credential Update Successfully...!!!",
      response,
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      message: "Advisor Credential Update unsuccessfully...!!!",
      error: error,
    });
  }
};
exports.deleteAdvisorCredential = async (req, res) => {
  try {
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const ids = req.params.id || req.body.ids;
    if (!ids || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No IDs provided for deletion.",
      });
    }
    let result = await adminApp
      .zcql()
      .executeZCQLQuery(`${query.deleteAdvisorCrd}(${ids})`);
    res.status(200).json({
      success: true,
      message: "Advisor Credential Deleted Successfully...!!!",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete advisor credential.",
      error: error.message,
    });
  }
};

exports.countAdvisorCredential = async (req, res) => {
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  let countQuery = "SELECT COUNT(ROWID) FROM advisorCredential";
  try {
      const response = await adminApp.zcql().executeZCQLQuery(countQuery);
      let data = JSON.parse(JSON.stringify(response).replace("COUNT(ROWID)", "total"));
      const total = data?.[0]?.advisorCredential?.total;
      res.status(200).json({
          success: true,
          message: "Advisor Credential Count Fetched Successfully",
          count: total
      });
  } catch (error) {
      res.status(409).json({
          success: false,
          message: "Advisor Credential Count Fetch Issue",
          error: error
      });
  }
}

async function parsAdvisorData(payload) {
  return {
    contractedAdvisorListing: payload?.contractedAdvisorListing?.trim() ?? null,
    advisorCredentialsOwner: payload?.advisorCredentialsOwner?.trim() ?? null,
    insurancePartnerListing: payload?.insurancePartnerListing?.trim() ?? null,
    mga: payload?.mga ?? null,
    userId: payload?.userId ?? null,
  };
}
