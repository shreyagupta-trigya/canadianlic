const catalyst = require("zcatalyst-sdk-node");
const queries = require("../../SQL/queries.js");
const { createObjectCsvStringifier } = require("csv-writer");
const {partner, sample} = require("../export/finance/insPartner/exports/index.js");
const {generateToken, createInsurancePartner} = require("../crmIntegration/insurancePartnerCRmIntegration.js");

exports.testConnection = async (req, res) => {
  res.status(200).json({ success: true, message: "i am live" });
};

exports.createinsurnacepartner = async (req, res) => {
  // console.log("This is insurance partner create details", req.body);
  // const formData =  req.body;
  const insuranceData  = await parseInsurancePartnr(req.body);
  try{
  const adminApp = catalyst.initialize(req, { scope: "admin" })
  const result = await adminApp.datastore().table("insurencePartner").insertRow(insuranceData);
  const id =  result?.ROWID;
  // console.log("fasfds ", result);
  // ************* CRM FUNCTION **************
  const token = await generateToken();
  const crmId = await createInsurancePartner(token,{...insuranceData,ROWID:id});
  console.log("crmId:===> ", crmId);
  await adminApp.datastore().table("insurencePartner").updateRow({sourceId:crmId,source:"catalyst",ROWID:id});
    res.status(201).json({
      success: true,
      message: "insurance Partner createtd successfully",
      result,
      crmId
    });
  } catch(error){     
    res.status(409).json({
      success: false,
      message: "Issue to create insurance partner",
      error: error,
    });
  };
};
exports.getinsurancePartner = (req, res) => {
  const data = Node.get("partnerList");
  if (data) {
    res
      .status(200)
      .json(
        data.map((item) => ({
          insurancePartner: item.insurencePartner,
          userData: item.userData,
        }))
      );
  }
  const secretKey = "shgfsyurswr67wr7wguwguwrwrw7fwuygw7it"; // Same secret key used for encryption
  const encryptedData = req.headers.encrypteddata; // Assuming header key is 'encryptedData'

  let userId, viewOnly, viewAll;
  // Decrypt the data
  if (encryptedData) {
    const decryptedData = decryptData(encryptedData, secretKey);
    [userId, viewOnly, viewAll] = decryptedData.split(",");
  }
  let query;
  if (viewAll == 'true') {
    query = `SELECT insurencePartner.*,userData.lastName,userData.firstName FROM insurencePartner LEFT JOIN userData ON userData.ROWID=insurencePartner.partnerOwner`;
   
  } else {
    query = `SELECT insurencePartner.*,userData.lastName,userData.firstName FROM insurencePartner LEFT JOIN userData ON userData.ROWID=insurencePartner.partnerOwner WHERE partnerOwner=${userId}`;
  }
  catalyst
    .initialize(req, { scope: "admin" })
    .zcql()
    .executeZCQLQuery(query)
    .then((data) => {
      Node.set("partnerList", data);
      res
        .status(200)
        .json(
          data.map((item) => ({
            insurancePartner: item.insurencePartner,
            userData: item.userData,
          }))
        );
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Error fetching user data",
        error: error.message,
      });
    });
};

exports.getSingleInsurancePartner = (req, res) => {
  console.log(req.params.id);

  const query = `SELECT * from insurencePartner WHERE ROWID=${req.params.id}`;

  catalyst
    .initialize(req, { scope: "admin" })
    .zcql()
    .executeZCQLQuery(query)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((error) => {
      res.status(403).json({
        succuss: false,
        message: "Issue pulling insurance partner data",
        output: error,
      });
    });
};

exports.updateInsurancePartner = async (req, res) => {
  console.log(req.params.id);

  req.body.ROWID = req.params.id;
  insuracneId.ROWID = req.params.id;
  const catalystApp = catalyst.initialize(req, { scope: "admin" });
  catalystApp
    .datastore()
    .table("insurencePartner")
    .updateRow(req.body)
    
    .then((row) => (async() => {
      const token = await generateToken();
      crmId = await createOffering(token,insuracneId,req.body?.sourceId);
     
      Node.del("partnerList");
      res
        .status(201)
        .json({
          success: true,
          message: "Updated Insurance Partner successfully",
          output: row,
        });
    }))
    .catch((error) =>
      res
        .status(409)
        .json({ success: false, message: "Updated Faild", output: error })
    );
};

exports.deletePartner = async (req, res) => {
  console.log(req.params.id);
  catalyst
    .initialize(req, { scope: "admin" })
    .datastore()
    .table("insurencePartner")
    .deleteRow(req.params.id)
    .then((data) => {
      Node.del("partnerList");
      res.status(201).json({
        success: true,
        message: "partner deleted successfully",
        data,
      });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(406)
        .json({
          succuss: false,
          message: "Issue with deleting user",
          output: error,
        });
    });
};

exports.getAllPartners = async (req, res) => {
  try {
    const query = `SELECT * from insurencePartner WHERE ROWID=${req.params.id}`;
    const data = await catalyst
      .initialize(req, { scope: "admin" })
      .zcql()
      .executeZCQLQuery(query);

    const getAdvisor = `SELECT * from advisors WHERE ROWID=${data[0].insurencePartner.advisorListing}`;
    const advisor = await catalyst
      .initialize(req, { scope: "admin" })
      .zcql()
      .executeZCQLQuery(getAdvisor);

    const policyListing = `SELECT * from advisors WHERE ROWID=${data[0].insurencePartner.partnerListing}`;
    const policy = await catalyst
      .initialize(req, { scope: "admin" })
      .zcql()
      .executeZCQLQuery(policyListing);

    res.status(200).json({ succuss: true, data: { data, advisor, policy } });
  } catch (error) {
    res.status(403).json({
      succuss: false,
      message: "Issue pulling insurance partner data",
      output: error,
    });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const csvContent = await downloadSampleFile();
    
    // Send the CSV file for download
    res.setHeader("Content-disposition", "attachment; filename=sample.csv");
    res.set("Content-Type", "text/csv");
    res.status(200).send(csvContent);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

exports.countInsurancePartner = async (req, res) => {
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  let countQuery = "SELECT COUNT(ROWID) FROM insurencePartner";
  try {
      const response = await adminApp.zcql().executeZCQLQuery(countQuery);
      let data = JSON.parse(JSON.stringify(response).replace("COUNT(ROWID)", "total"));
      const total = data?.[0]?.insurencePartner?.total;
      res.status(200).json({
          success: true,
          message: "Insurence Partner Count Fetched Successfully",
          count: total
      });
  } catch (error) {
      res.status(409).json({
          success: false,
          message: "Insurence Partner Count Fetch Issue",
          error: error
      });
  }
}

// *************INSURANCE PARTNER PARSER**************
async function parseInsurancePartnr(formData) {
  return {
    partnerOwner: formData?.partnerOwner ?? null,
    partnerName: formData?.partnerName ?? '',
    email: formData?.email ??'',
    phone: formData?.phone ?? null,
    fax: formData?.fax ?? null,
    website: formData?.website ?? '',
    additionalContactInformation: formData?.additionalContactInformation ??'',
    advisorListing: formData?.advisorListing ??null,
    street: formData?.street ??'',
    city: formData?.city ??'',
    state: formData?.state ?? '',
    country: formData?.country ?? '',
    postalCode: formData?.postalCode ?? null,
    description: formData?.description ??null,
    exchangeRate: formData?.exchangeRate ?? null,
    partnerListing: formData?.partnerListing ??'',
    phoneBurnerLastCallOutcome: formData?.phoneBurnerLastCallOutcome ??'',
    phoneBurnerLastCallTime: formData?.phoneBurnerLastCallTime ?? null,
    phoneBurnerFollowUpDate: formData?.phoneBurnerFollowUpDate ?? null,
    contractedAdvisorListing: formData?.contractedAdvisorListing ??'',
    // emailOptOut: formData?.emailOptOut ?? false,
  }  
}
// <<<<<<<<<<<<<<<<<<========== Sample FIle DOWNLOAD =============>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
async function downloadSampleFile() {
  try {
    // console.log("This is insurance partner download file",partner)
    
    let headers = partner;
    const csvStringifier = createObjectCsvStringifier({
      header: headers,
    });
    const data = sample;
    const csvContent =
      csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(data);

    return csvContent;
  } catch (error) {
    console.error("Error downloading file:", error);
  }
}