const catalyst = require("zcatalyst-sdk-node");
const queries = require("../sql/queries.js");
exports.testConnection = async (req, res) => {
  res.status(200).json({ success: true, message: "i am live" });
};
exports.create_insurancepartner = async (req, res) => {
  const data = req.body;
  try {
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    // Insert Insurance Partner  Information
    const insurancepartnerResult = await parseInsurance(data);
    const response = await adminApp
      .datastore()
      .table("insurencePartner")
      .insertRow(insurancepartnerResult);
    res
      .status(200)
      .json({
        success: true,
        message: "Insurance Partner Created Successfully",
        response,
      });
  } catch (error) {
    res
      .status(409)
      .json({
        success: false,
        message: "Insurance  Created Isuse",
        error: error,
      });
  }
};

exports.updateInsurancepartner = async (req, res) => {
  const data = req.body;
  const rowId = req.params.id;
  try {
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    // Insert Insurance Partner  Information
    const insurancepartnerResult = await parseInsurance(data);
    const response = await adminApp
      .datastore()
      .table("insurencePartner")
      .updateRow({ ...insurancepartnerResult, ROWID: rowId });
    res
      .status(200)
      .json({
        success: true,
        message: "Insurance Partner updated Successfully",
        response,
      });
  } catch (error) {
    res
      .status(409)
      .json({
        success: false,
        message: "Insurance  updated Isuse",
        error: error,
      });
  }
};

exports.deleteInsurancepartner = async (req, res) => {
  try {
    const rowId = req.body.ids || req.params.id;
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const deletequery = `${queries.deleteinsurancepartner}(${rowId})`;
    const response = await adminApp.zcql().executeZCQLQuery(deletequery);
    res
      .status(200)
      .json({
        success: true,
        message: "Insurance Deleted  Successfully",
        data: response,
      });
  } catch (err) {
    res
      .status(409)
      .json({
        success: false,
        message: "Insurance  Deleted  Unsccessefully",
        error: err.message,
      });
    console.log(err);
  }
};

exports.getinsurancePartnerList = async (req, res) => {
  try {
    let pageSize = 300;
    const { page } = req.body;
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const pageInt = parseInt(page) || 1;
    const pageNo = (pageInt - 1) * pageSize;
    let insuranceQuery = queries.getinsurance.replace("%LIMIT%", pageSize);
    const responseArr = await adminApp
      .zcql()
      .executeZCQLQuery(`${insuranceQuery}${pageNo}`);
    const insurance = await parseInsuranceDB(responseArr);
    res
      .status(200)
      .json({
        success: true,
        message: "Insurance get Successfully",
        insurance,
      });
  } catch (err) {
    res
      .status(409)
      .json({ success: false, message: "Insurance get Issue", error: err });
  }
};

exports.getinsurancePartnerbyid = async (req, res) => {
    try {
        const rowId = req.params.id;
        const adminApp = catalyst.initialize(req, {scope:"admin"});
        const selectquery = `${queries.getinsuranceById}${rowId}`;
        const respArr = await adminApp.zcql().executeZCQLQuery(selectquery);
        const insurance = await parseInsuranceDB(respArr);
        res.status(200).json({success:true, message:"Insurance  Fetched Successfully",insurance})
        
    } catch (error) {
        res.status(409).json({success: false, message: "Insurance  Fetch Issue ", error:error});
        
    }

};

async function parseInsuranceDB(responseArr) {
  return responseArr.map(({ insurencePartner,userData }) => ({
    partnerOwner: insurencePartner?.partnerOwner ?? "",
    partnerName: insurencePartner?.partnerName ?? "",
    email: insurencePartner?.email ?? "",
    phone: insurencePartner?.phone ?? "",
    fax: insurencePartner?.fax ?? "",
    website: insurencePartner?.website ?? "",
    additionalContactInformation:
      insurencePartner?.additionalContactInformation ?? "",
    advisorListing: insurencePartner?.advisorListing ?? "",
    street: insurencePartner?.street ?? "",
    city: insurencePartner?.city ?? "",
    state: insurencePartner?.state ?? "",
    country: insurencePartner?.country ?? "",
    postalCode: insurencePartner?.postalCode ?? null,
    description: insurencePartner?.description ?? null,
    exchangeRate: insurencePartner?.exchangeRate ?? "",
    partnerListing: insurencePartner?.partnerListing ?? "",
    phoneBurnerLastCallOutcome:
      insurencePartner?.phoneBurnerLastCallOutcome ?? "",
    phoneBurnerLastCallTime: insurencePartner?.phoneBurnerLastCallTime ?? null,
    phoneBurnerFollowUpDate: insurencePartner?.phoneBurnerFollowUpDate ?? null,
    contractedAdvisorListing: insurencePartner?.contractedAdvisorListing ?? "",
    emailOptOut: insurencePartner?.emailOptOut ?? "",
    rowId:insurencePartner?.ROWID??"",
    ownerFirstName:userData?.firstName??"",
    ownerLastName:userData?.lastName??"",
    
  }));
}

async function parseInsurance(formData) {
  return {
    partnerOwner: formData.partnerOwner ? formData.partnerOwner : null,
    partnerName: formData.partnerName ? formData.partnerName : "",
    email: formData.email ? formData.email : "",
    phone: formData.phone ? formData.phone : null,
    fax: formData.fax ? formData.fax : null,
    website: formData.website ? formData.website : "",
    additionalContactInformation: formData.additionalContactInformation
      ? formData.additionalContactInformation
      : "",
    advisorListing: formData.advisorListing ? formData.advisorListing : null,
    street: formData.street ? formData.street : "",
    city: formData.city ? formData.street : "",
    state: formData.state ? formData.state : "",
    country: formData.country ? formData.country : "",
    postalCode: formData.postalCode ? formData.postalCode : null,
    description: formData.description ? formData.description : null,
    exchangeRate: formData.exchangeRate ? formData.exchangeRate : "",
    partnerListing: formData.partnerListing ? formData.partnerListing : "",
    phoneBurnerLastCallOutcome: formData.phoneBurnerLastCallOutcome
      ? formData.phoneBurnerLastCallOutcome
      : "",
    phoneBurnerLastCallTime: formData.phoneBurnerLastCallTime
      ? formData.phoneBurnerLastCallTime
      : null,
    phoneBurnerFollowUpDate:
      new Date(formData?.phoneBurnerFollowUpDate) ?? null,
    contractedAdvisorListing: formData.contractedAdvisorListing
      ? formData.contractedAdvisorListing
      : "",
    emailOptOut: formData.emailOptOut ? formData.emailOptOut : false,
  };
}

//******************* DATE TIME FORMATER ***************
async function dateTimeFormat(date) {
  if (!date) {
    return null;
  }
  const dateFormat = new Date(date);
  if (isNaN(dateFormat.getTime())) {
    return null;
  }
  // const dateFormat = new Date(date);
  dateValue = dateFormat.toISOString().split("T")[0];
  timeVaue = dateFormat.toISOString().split("T")[1].split(".")[0].split(":");
  return dateValue + " " + timeVaue[0] + ":" + timeVaue[1] + ":" + timeVaue[2];
}
