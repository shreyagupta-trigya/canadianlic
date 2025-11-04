const catalyst = require("zcatalyst-sdk-node");
const { location, sample } = require("../export/locations/index");
const { createObjectCsvStringifier } = require("csv-writer");
// const {
//   insertDataIntoTable,
//   insertMultipleRowsIntoTable,
//   decryptData,
// } = require("./utils");
const {
  dataSyncZcrm,
  generateToken,
} = require("../crmIntegration/locationCrmIngegration");

exports.testConnection = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "I am Live!" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "I am not live", error: error });
  }
};
exports.createLocation = async (req, res) => {
  const formData = req.body;
  if (formData.parentLocation === "") {
    delete formData.parentLocation;
  }
  try {
    const catalystApp = catalyst.initialize(req, { scope: "admin" });
    const locationData = await parseLocation(formData);
    const locationResult = await insertDataIntoTable(
      catalystApp,
      "locations",
      locationData
    );
    const id = locationResult?.ROWID;

    // ************* CRM FUNCTION ***************
    const token = await generateToken();
    // console.log(token);
    const crmId = await dataSyncZcrm(token, { ...formData, ROWID: id });
    console.log("crmId:===> ", crmId);
    await catalystApp
      .datastore()
      .table("locations")
      .updateRow({ sourceId: crmId, source: "catalyst", ROWID: id });

    let RollingResult;
    if (
      formData?.Rolling?.RollingData &&
      formData?.Rolling?.RollingData?.length > 0
    ) {
      RollingResult = await insertMultipleRowsIntoTable(
        "locationRolling",
        formData?.Rolling?.RollingData,
        req,
        locationResult
      );
    }
    // console.log("RollingResult", RollingResult);

    let AnnualPerformanceResult;
    if (
      formData?.AnnualPerformance?.AnnualPerformance &&
      formData?.AnnualPerformance?.AnnualPerformance?.length > 0
    ) {
      AnnualPerformanceResult = await insertMultipleRowsIntoTable(
        "locationAnnualPerformance",
        formData?.AnnualPerformance?.AnnualPerformance,
        req,
        locationResult
      );
    }
    console.log("AnnualPerformanceResult", AnnualPerformanceResult);
    const responseData = {
      location: locationResult,
    };
    //  Node.del("contactList")
    res.status(201).json({
      success: true,
      message: "Location successfully",
      rowId: locationResult.ROWID,
      crmId,
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(409).json({
      success: false,
      message: "Failed to create Lead",
      error: error,
    });
  }
};

exports.getLocation = (req, res) => {
  const secretKey = "shgfsyurswr67wr7wguwguwrwrw7fwuygw7it"; // Same secret key used for encryption
  const encryptedData = req.headers.encrypteddata; // Assuming header key is 'encryptedData'

  let userId, viewOnly, viewAll;
  // Decrypt the data
  if (encryptedData) {
    const decryptedData = decryptData(encryptedData, secretKey);
    [userId, viewOnly, viewAll] = decryptedData.split(",");
  }
  // console.log(viewAll, req.headers);
  viewAll = "true";
  let query;
  if (viewAll == "true") {
    query = `SELECT locations.*,userData.firstName,userData.lastName FROM locations LEFT JOIN userData ON userData.ROWID=locations.locationOwner`;
  } else {
    query = `SELECT locations.*,userData.firstName,userData.lastName FROM locations LEFT JOIN userData ON userData.ROWID=locations.locationOwner WHERE locations.locationOwner=${userId}`;
  }
  // console.log(query);
  catalyst
    .initialize(req, { scope: "admin" })
    .zcql()
    .executeZCQLQuery(query)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Error fetching location data",
        error: error.message,
      });
    });
};

exports.getSingleLocation = (req, res) => {
  console.log(req.params.id);

  const query = `SELECT * from locations WHERE ROWID=${req.params.id}`;

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
        message: "Issue pulling location data",
        output: error,
      });
    });
};
exports.updateLocation = async (req, res) => {
  req.body.ROWID = req.params.id;
  const formData = req.body; 
  const locationUpdate = await parseLocation(formData);
  const catalystApp = catalyst.initialize(req, { scope: "admin" });
  catalystApp
    .datastore()
    .table("locations")
    .updateRow({...locationUpdate, ROWID:req.params.id})
    .then((row) =>
      res
        .status(201)
        .json({
          success: true,
          message: "Updated location successfully",
          output: row,
        })
    )
    .catch((error) =>
      res
        .status(409)
        .json({ success: false, message: "Updated Faild", output: error })
    );
};
exports.deleteLocation = async (req, res) => {
  console.log(req.params.id);
  catalyst
    .initialize(req, { scope: "admin" })
    .datastore()
    .table("locations")
    .deleteRow(req.params.id)
    .then((data) => {
      res.status(201).json({
        success: true,
        message: "location deleted successfully",
        data,
      });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(406)
        .json({
          succuss: false,
          message: "Issue with deleting location",
          output: error,
        });
    });
};

exports.getSingleLocationData = async (req, res) => {
  console.log(req.params.id);
  try {
    const query = `SELECT * from locations WHERE ROWID=${req.params.id}`;
    const location = await catalyst
      .initialize(req, { scope: "admin" })
      .zcql()
      .executeZCQLQuery(query);

    const userQuery = `SELECT * from userData WHERE ROWID=${location[0].locations.locationOwner}`;
    const locationOwner = await catalyst
      .initialize(req, { scope: "admin" })
      .zcql()
      .executeZCQLQuery(userQuery);

    const policyQuery = `SELECT * from policies WHERE location=${req.params.id}`;
    const policies = await catalyst
      .initialize(req, { scope: "admin" })
      .zcql()
      .executeZCQLQuery(policyQuery);

    const contactQuery = `SELECT * from contacts WHERE location=${req.params.id}`;
    const contacts = await catalyst
      .initialize(req, { scope: "admin" })
      .zcql()
      .executeZCQLQuery(contactQuery);

    const advisorQuery = `SELECT * from advisors WHERE location=${req.params.id}`;
    const advisors = await catalyst
      .initialize(req, { scope: "admin" })
      .zcql()
      .executeZCQLQuery(advisorQuery);
    res
      .status(200)
      .json({
        success: true,
        message: "location data",
        location,
        locationOwner,
        policies,
        contacts,
        advisors,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "faild to get location data", error });
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

exports.countLocations = async (req, res) => {
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  let countQuery = "SELECT COUNT(ROWID) FROM locations";
  try {
      const response = await adminApp.zcql().executeZCQLQuery(countQuery);
      let data = JSON.parse(JSON.stringify(response).replace("COUNT(ROWID)", "total"));
      const total = data?.[0]?.locations?.total;
      res.status(200).json({
          success: true,
          message: "Locations Count Fetched Successfully",
          count: total
      });
  } catch (error) {
      res.status(409).json({
          success: false,
          message: "Locations Count Fetch Issue",
          error: error
      });
  }
}

async function downloadSampleFile() {
  try {
    // console.log("This is insurance partner download file",partner)

    let headers = location;
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

// **********PARSE LOCATION DATA **********

async function parseLocation(formData) {
  return {
    locationOwner: formData?.locationOwner ?? null,
    locationName: formData?.locationName ?? "",
    email: formData?.email ?? "",
    phone: formData?.phone ?? null,
    fax: formData?.fax ?? "",
    website: formData?.website ?? "",
    rating: formData?.rating ?? "",
    description: formData?.description ?? "",
    currency: formData?.currency ?? "",
    parentLocation: formData?.parentLocation != null ? BigInt(formData.parentLocation) : null,
    employees: formData?.employees ?? "",
    discountFactor: formData?.discountFactor ?? "",
    exchangeRate: formData?.exchangeRate ?? "",
    // phoneBurnerFollowUpDate: formData?.phoneBurnerFollowUpDate ??null,
    street: formData?.street ?? "",
    city: formData?.city ?? "",
    state: formData?.state ?? "",
    postalCode: formData?.postalCode ?? "",
    country: formData?.country ?? "",
    shipmentStreet: formData?.shipmentStreet ?? "",
    shipmentCity: formData?.shipmentCity ?? "",
    shipmentState: formData?.shipmentState ?? "",
    shipmentPostalCode: formData?.shipmentPostalCode ?? "",
    shipmentCountry: formData?.shipmentCountry ?? "",
  };
}
