const catalyst = require("zcatalyst-sdk-node");
const { decryptData } = require("./utils");
const NodeCache = require("node-cache");
const Node = new NodeCache();
const { createObjectCsvStringifier } = require("csv-writer");
const {partner, sample} = require("./exports");
const searchQueryBuilder = require("./searchQueryBuilder");

// ******* ZOHO CRM FUNCTION *******
const{createInsurancePartner,generateToken} = require("./crmIntegration/insurancePartnerController");

exports.createinsurnacepartner = async (req, res) => {
  // console.log("This is insurance partner create details", req.body);
  // const formData =  req.body;
  const insuranceData  = await parseInsurancePartnr(req.body);
  try{
  const adminApp = catalyst.initialize(req, { scope: "admin" })
  const result = await adminApp.datastore().table("insurencePartner").insertRow(insuranceData);
  const id =  result?.ROWID;
  // console.log("fasfds ", result);
  const token = await generateToken();
  // console.log(token);
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
exports.getinsurancePartner = async (req, res) => {
  try{
  // Pagination and Search
  const { search } = req.body;
  const rowId = req.params.id;
  const page = parseInt(req.body.page, 10) || 1;
  const limit = parseInt(req.body.limit, 10) || 10;
  const offset = (page - 1) * limit;

  const fieldMapping = { insurancePartnerName:"partnerName", email: "email" , phone:"phone", website:"website" , insuranceContactOwner:"insuranceContactOwner"};

  let searchConditions = searchQueryBuilder(search, fieldMapping);

  if (rowId) {
    const rowIdCondition = `insurencePartner.ROWID = '${rowId}'`;
    searchConditions = searchConditions ? `${searchConditions} AND ${rowIdCondition}` : rowIdCondition;
  }

  const whereClause = searchConditions ? `WHERE (${searchConditions})` : '';

  let baseQuery = `
    SELECT insurencePartner.*, userData.firstName, userData.lastName 
    FROM insurencePartner 
    LEFT JOIN userData ON userData.ROWID = insurencePartner.partnerOwner 
    %SEARCH_CONDITION% 
    ORDER BY insurencePartner.CREATEDTIME DESC 
    LIMIT %LIMIT% OFFSET %OFFSET%`;

  let query = baseQuery
    .replace('%SEARCH_CONDITION%', whereClause)
    .replace('%LIMIT%', limit)
    .replace('%OFFSET%', offset);
    const insurancePartner = await catalyst.initialize(req, { scope: "admin" }).zcql().executeZCQLQuery(query);
    return res.status(200).json( insurancePartner );
  } catch(error){
      res.status(500).json({
        success: false,
        message: "Error fetching insurancePartner data",
        error: error.message,
      });
    };
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
    emailOptOut: formData?.emailOptOut ?? false,
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