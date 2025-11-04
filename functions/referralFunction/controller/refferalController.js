const catalyst = require("zcatalyst-sdk-node");
const queries = require("../sql/Query");
const {
  insertData,
  insertSubformData,
  dateTimeFormat,
  updateData,
  updateSubformData,
} = require("../Util/util");

// ************ TEST CONNECTION ***********

exports.refferalConnection = async (req, res) => {
  res.status(200).json({ success: true, message: "I'm live!" });
};

// ************ GET ALL REFFERALS  ***********
exports.getReferralsList = async (req, res) => {
  try {
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * 300;
    let query = queries.referralListData.replace("%PAGENO%", offset);
    // console.log(query);
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const result = await adminApp.zcql().executeZCQLQuery(query);
    const refResp = await getReferralListDBParser(result);
    res.status(200).json({
      success: true,
      message: "Referral fetched successfully",
      refResp,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error to fetch referral" });
  }
};
exports.getReferralsLeads = async (req, res) => {
  try {
    const leadId =  req.params.id;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * 300;
    let query = queries.referralLeadsData.replace("%ROWID%", leadId ).replace("%PAGENO%", offset);
    // console.log(query);
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const result = await adminApp.zcql().executeZCQLQuery(query);
    const refResp = await getReferralLeadDBParser(result);
    res.status(200).json({
      success: true,
      message: "Referral Lead fetched successfully",
      refResp,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error to fetch referral Lead" });
  }
};

// **************** GET REFERRAL BY ID*********************
exports.referralRelatedData = async (req, res) => {
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  const rowId = req.params.id || req.body.rowId || req.query.rowId;
  let moduleArr = ["referralScoreGrid"];

  try {
    // Fetch main module data
    let refferalDetails = await fetchMainModules(adminApp, rowId);

    // Fetch sub-module data
    let { referralScoreGridArr } = await fetchSubModules(
      adminApp,
      rowId,
      moduleArr
    );

    // Respond with fetched data
    res.status(200).json({
      success: true,
      message: "Deal data fetched successfully",
      refferalDetails: {
        ...refferalDetails,
        referralScore: referralScoreGridArr,
      },
    });
  } catch (error) {
    console.error("Error fetching Deal data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Deal data",
      error: error.message || error,
    });
  }
};
// **************** CREATE NEW REFERRA ***************
exports.createReferral = async (req, res) => {
  const { refferalDetails } = req.body;
  try {
    const catalystApp = catalyst.initialize(req, { scope: "admin" });
    const referral = await parseReferralData(refferalDetails);
    const referralId = await insertData(catalystApp, "referralData", referral);
    const { updateArray: updateSubform = [], insertArray: insertSubform = [] } =
      (await processSubform(
        refferalDetails?.referralScoreboard ?? "",
        referralId,
        "referralScoreboard"
      )) || {};
    const referralScoreboardId =
      insertSubform.length > 0
        ? await insertSubformData(
            catalystApp,
            "referralScoreGrid",
            insertSubform
          )
        : [];
    res
      .status(200)
      .json({
        success: true,
        message: " Referral Success created",
        data: {
          referralId: referralId,
          referralScoreboardId: referralScoreboardId,
        },
      });
  } catch (error) {
    console.error("Error creating Referral:", error);
    res.status(409).json({
      success: false,
      message: "Failed to create Referral",
      error: error,
    });
  }
};
// *************** UPDATE REFERRAL ****************
exports.updateReferral = async (req, res) => {
  const { refferalDetails } = req.body;
  const rowId = req.params.id;
  try {
    const catalystApp = catalyst.initialize(req, { scope: "admin" });
    const referral = await parseReferralData(refferalDetails);
    const referralId = await insertData(catalystApp, "referralData", {
      ...referral,
      ROWID: rowId,
    });
    const { updateArray: updateSubform = [], insertArray: insertSubform = [] } =
      (await processSubform(
        refferalDetails?.referralScoreboard ?? "",
        referralId,
        "referralScoreboard"
      )) || {};
    const referralScoreboardId =
      insertSubform.length > 0
        ? await insertSubformData(
            catalystApp,
            "referralScoreGrid",
            insertSubform
          )
        : [];
    const updateReferralId =
    updateSubform.length > 0
        ? await updateSubformData(catalystApp, "referralScoreGrid", updateSubform)
        : [];

    res
      .status(200)
      .json({
        success: true,
        message: " Referral Success Update",
        data: {
          referralId: referralId,
          referralScoreboardId: referralScoreboardId,
          updateReferralId: updateReferralId
        },
      });
  } catch (error) {
    console.error("Error Update Referral:", error);
    res.status(409).json({
      success: false,
      message: "Failed to create Referral",
      error: error,
    });
  }
};
// **************REFERRAL***************
async function parseReferralData(refferalDetails) {
  return {
    referralName: refferalDetails?.referralName ?? "",
    email: refferalDetails?.email ?? "",
    phone: refferalDetails?.phone ?? "",
    lastName: refferalDetails?.lastName ?? "",
    referralOwner: refferalDetails?.referralOwner ?? null,
    referralOwner: refferalDetails?.referralOwner ?? null,
    referredByClient: refferalDetails?.referredByClient ?? null,
    leadId: refferalDetails?.leadId ?? null,
    layout: refferalDetails?.layout ?? "",
    exchangeRate: refferalDetails?.exchangeRate ?? "",
    referredByOther: refferalDetails?.referredByOther ?? null,
    currency: refferalDetails?.currency ?? "",
    annualReferralSlab: refferalDetails?.annualReferralSlab ?? "",
    referralLevel: refferalDetails?.referralLevel ?? "",
    year: refferalDetails?.year ?? "",
    firstPolicyIssueDate: new Date(refferalDetails?.firstPolicyIssueDate) ?? "",
    client: refferalDetails?.firstPolicyIssueDate ?? "",
    referralPayout: parseFloat(refferalDetails?.referralPayout) ?? null,
    productCategoryReffered: refferalDetails?.productCategoryReffered ?? "",
  };
}
// **************** SUBFORM REFERRAL DATA ***************
async function processSubform(subformArray, rowId, type) {
  if (!subformArray) {
    return { updateArray: [], insertArray: [] };
  }
  const updateArray = [];
  const insertArray = [];

  subformArray.forEach((item) => {
    const subformObject = {
      referralDataId: rowId,
      ROWID: item.ROWID ?? null,
      ...getSubformFields(item, type), // Merge fields based on type
    };

    if (item.ROWID) {
      updateArray.push(subformObject);
    } else {
      delete subformObject.ROWID;
      insertArray.push(subformObject);
    }
  });

  return { updateArray, insertArray };
}
function getSubformFields(item, type) {
  switch (type) {
    case "referralScoreboard":
      return {
        annualReferralSlab: item.annualReferralSlab ?? "",
        referralLevel: item.referralLevel ?? "",
        productCategory: item.productCategory ?? "",
        payoutCategory: item.payoutCategory ?? "",
      };
    default:
      return {}; // Default case if type is not recognized
  }
}
// **************** Fetch main module data ***************
async function fetchMainModules(catalystApp, id) {
  let query = `${queries.referralDataById} ${id}`;
  try {
    let refferalDetails = await catalystApp.zcql().executeZCQLQuery(query);
    if (!refferalDetails || refferalDetails.length === 0) {
      return {};
    } else {
      return refferalDetails[0];
    }
  } catch (error) {
    console.error("Error fetching main modules:", error);
    throw error;
  }
}

// **************** Fetch sub-modules data ***************
async function fetchSubModules(catalystApp, id, moduleArr) {
  const queryMap = {
    referralScoreGrid: `${queries.getReferalScoreboard} ${id}`,
  };
  try {
    const fetchPromises = moduleArr.map(async (module) => {
      const query = queryMap[module];
      const response = await catalystApp.zcql().executeZCQLQuery(query);
      return response.map((item) => item[module]);
    });

    const [referralScoreGridArr] = await Promise.all(fetchPromises);

    return { referralScoreGridArr };
  } catch (error) {
    console.error("Error fetching sub-modules:", error);
    throw error;
  }
}

// ******** GET REFERRAL LIST DB PARSER *****
async function getReferralListDBParser(result) {
  return result.map((item) => {
    return {
      ReferralOwner: `${item.userData?.firstName ?? ""} ${
        item.userData?.lastName ?? ""
      }`.trim(),
      ReferralOwnerId: item.userData?.ROWID ?? "",
      lastName: item.referralData?.lastName ?? "",
      year: item.referralData?.year ?? "",
      referralPayout: item.referralData?.referralPayout ?? "",
      referralName: item.referralData?.referralName ?? "",
      referralLevel: item.referralData?.referralLevel ?? "",
      refCall: item.referralData?.refCall ?? "",
      approvedStatus: item.referralData?.approvedStatus ?? "",
      referredByOther: item.referralData?.referredByOther ?? "",
      exchangeRate: item.referralData?.exchangeRate ?? "",
      client: item.referralData?.client ?? "",
      currency: item.referralData?.currency ?? "",
      email: item.referralData?.email ?? "",
      CREATORID: item.referralData?.CREATORID ?? "",
      productCategoryReffered: item.referralData?.productCategoryReffered ?? "",
      referredByClient: item.referralData?.referredByClient ?? "",
      firstPolicyIssueDate: item.referralData?.firstPolicyIssueDate ?? "",
      firstPolicyIssueDate1st: item.referralData?.["1stPolicyIssueDate"] ?? "",
      annualReferralSlab: item.referralData?.annualReferralSlab ?? "",
      layout: item.referralData?.layout ?? "",
      MODIFIEDTIME: item.referralData?.MODIFIEDTIME ?? "",
      phone: item.referralData?.phone ?? "",
      referralOwner: item.referralData?.referralOwner ?? null,
      productCategoryReferred:
        item.referralData?.productCategoryReferred ?? null,
      comment: item.referralData?.comment ?? "",
      CREATEDTIME: item.referralData?.CREATEDTIME ?? null,
      ROWID: item.referralData?.ROWID ?? null,
      leadId: item.referralData?.leadId ?? "",
    };
  });
}
async function getReferralLeadDBParser(result) {
  return result.map((item) => {
    return {
      ReferralOwner: `${item.userData?.firstName ?? ""} ${
        item.userData?.lastName ?? ""
      }`.trim(),
      ReferralOwnerId: item.userData?.ROWID ?? "",
      lastName: item.referralData?.lastName ?? "",
      year: item.referralData?.year ?? "",
      referralPayout: item.referralData?.referralPayout ?? "",
      referralName: item.referralData?.referralName ?? "",
      referralLevel: item.referralData?.referralLevel ?? "",
      refCall: item.referralData?.refCall ?? "",
      approvedStatus: item.referralData?.approvedStatus ?? "",
      referredByOther: item.referralData?.referredByOther ?? "",
      exchangeRate: item.referralData?.exchangeRate ?? "",
      client: item.referralData?.client ?? "",
      currency: item.referralData?.currency ?? "",
      email: item.referralData?.email ?? "",
      CREATORID: item.referralData?.CREATORID ?? "",
      productCategoryReffered: item.referralData?.productCategoryReffered ?? "",
      referredByClient: item.referralData?.referredByClient ?? "",
      firstPolicyIssueDate: item.referralData?.firstPolicyIssueDate ?? "",
      firstPolicyIssueDate1st: item.referralData?.["1stPolicyIssueDate"] ?? "",
      annualReferralSlab: item.referralData?.annualReferralSlab ?? "",
      layout: item.referralData?.layout ?? "",
      MODIFIEDTIME: item.referralData?.MODIFIEDTIME ?? "",
      phone: item.referralData?.phone ?? "",
      referralOwner: item.referralData?.referralOwner ?? null,
      productCategoryReferred:
        item.referralData?.productCategoryReferred ?? null,
      comment: item.referralData?.comment ?? "",
      CREATEDTIME: item.referralData?.CREATEDTIME ?? null,
      ROWID: item.referralData?.ROWID ?? null,
      leadMobile: item.leads?.mobile ?? "",
      leademail: item.leads?.email ?? "",
      leadName: `${item.leads?.firstName??""} ${item.leads?.lastName??""}` ?? null,
      leadId: item.referralData?.leadId ?? "",
    };
  });
}
