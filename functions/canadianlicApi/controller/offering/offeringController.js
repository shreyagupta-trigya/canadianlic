const catalyst = require("zcatalyst-sdk-node");
const { decryptData } = require("../../Utils/util");
const { offering, sample } = require("../export/offering/index");
const { createObjectCsvStringifier } = require("csv-writer");
// const moment = require('moment');
// ************OFFERING FUNCTIONS************

// const {
//   generateToken,
//   createOffering
// } = require("./crmIntegration/offeringDataSyncController");

// const app = express();
// app.use(express.json());

// app.use(cors());

exports.testConnection = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "I am Live!" });
  } catch (error) {
    res.status(404).json({ success: true, message: "I am not Lived!" });
  }
};
// exports.createoffering = async (req, res) => {
//   const adminApp = catalyst.initialize(req, { scope: "admin" });
//   try {
//     const newoffering = await dataParsing(req.body)
//     const offeringResp = await adminApp.datastore().table("offering").insertRow(newoffering);
//     const id = offeringResp?.ROWID;
    
//     // ************CREATE NEW RECORD IN ZOHO CRM************
//     // if(!newoffering.sourceId){
//     // const token = await generateToken();
//     // // console.log(token);
//     // const crmId = await createOffering(token,{...newoffering,ROWID:id});
//     // await adminApp.datastore().table("offering").updateRow({sourceId:crmId,source:"catalyst",ROWID:id});
//     // }
//     res.status(201).json({
//       success: true,
//       message: "Offering created successfully",
//       crmId,
//       id
//     });
//   } catch (error) {
//     res.status(409).json({
//       success: false,
//       message: "Issue creating offering",
//       error: error.message,
//     });
//   }
// };

// exports.getallofferings=(req, res) => {
//   const secretKey = "shgfsyurswr67wr7wguwguwrwrw7fwuygw7it"; // Same secret key used for encryption
//   const encryptedData = req.headers.encrypteddata; // Assuming header key is 'encryptedData'

//   let userId, viewOnly, viewAll;
//   // Decrypt the data
//   if (encryptedData) {
//     const decryptedData = decryptData(encryptedData, secretKey);
//     [userId, viewOnly, viewAll] = decryptedData.split(",");
//   }
//   let query;
//   if (viewAll == "true") {

//     query = `SELECT offering.*,userData.firstName,userData.lastName FROM offering LEFT JOIN userData ON userData.ROWID=offering.offeringOwner ORDER BY CREATEDTIME DESC`;
//   } else {
//     query = `SELECT offering.*,userData.firstName,userData.lastName FROM offering LEFT JOIN userData ON userData.ROWID=offering.offeringOwner WHERE offering.offeringOwner=${userId}`;
//   }

//   catalyst
//     .initialize(req, { scope: "admin" })
//     .zcql()
//     .executeZCQLQuery(query)
//     .then((data) => {
//       res.status(200).json(data);
//     })
//     .catch((error) => {
//       res.status(500).json({
//         success: false,
//         message: "Error fetching user data",
//         error: error.message,
//       });
//     });
// };

// app.get("/getsingleproduct/:id", (req, res) => {
//   console.log(req.params.id);

//   const query = `SELECT * from offering WHERE ROWID=${req.params.id}`;

//   catalyst
//     .initialize(req, { scope: "admin" })
//     .zcql()
//     .executeZCQLQuery(query)
//     .then((data) => {
//       res.status(201).json(data);
//     })
//     .catch((error) => {
//       res.status(403).json({
//         succuss: false,
//         message: "Issue pulling Product data",
//         output: error,
//       });
//     });
// });

// app.post("/updateproduct/:id", async (req, res) => {
//   const catalystApp = catalyst.initialize(req, { scope: "admin" });
//   const newoffering = await dataParsing(req.body)
//   newoffering.ROWID = req.params.id;
//   catalystApp
//     .datastore()
//     .table("offering")
//     .updateRow(newoffering)
//     .then((row) =>(async () => {
//     //   const token = await generateToken();
//     //   crmId = await createOffering(token,newoffering,req.body?.sourceId);
//       res.status(201).json({
//         success: true,
//         message: "Updated user successfully"
//       })
//     }))
//     .catch((error) =>
//       res
//         .status(409)
//         .json({ success: false, message: "Updated Faild", output: error })
//     );
// });

// app.delete("/deleteoffering/:id", async (req, res) => {
//   catalyst
//     .initialize(req, { scope: "admin" })
//     .datastore()
//     .table("offering")
//     .deleteRow(req.params.id)
//     .then((data) => {
//       res.status(201).json({
//         success: true,
//         message: "user deleted successfully",
//         data,
//       });
//     })
//     .catch((error) => {
//       res.status(406).json({
//         succuss: false,
//         message: "Issue with deleting user",
//         output: error,
//       });
//     });
// });
exports.downloadFiles = async (req, res) => {
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

exports.countOffering = async (req, res) => {
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  let countQuery = "SELECT COUNT(ROWID) FROM offering";
  try {
      const response = await adminApp.zcql().executeZCQLQuery(countQuery);
      let data = JSON.parse(JSON.stringify(response).replace("COUNT(ROWID)", "total"));
      const total = data?.[0]?.offering?.total;
      res.status(200).json({
          success: true,
          message: "Offering Count Fetched Successfully",
          count: total
      });
  } catch (error) {
      res.status(409).json({
          success: false,
          message: "Offering Count Fetch Issue",
          error: error
      });
  }
}

async function downloadSampleFile() {
  try {
    // console.log("This is insurance partner download file",partner)
    
    let headers = offering;
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


async function dataParsing(offering) {
  return {
    offeringOwner: offering.offeringOwner ?? null,
    offeringCategory: offering.offeringCategory ?? '',
    offeringType: offering.offeringType ?? '',
    description: offering.description ?? '',
    productFYCPercent: offering.productFYCPercent ?? '',
    corporateBonusPercent: offering.corporateBonusPercent ?? '',
    cancellationChargeType: offering.cancellationChargeType ?? '',
    offeringName: offering.offeringName ?? '',
    insurancePartnerName: offering.insurancePartnerName ?? '',
    offeringActive: offering.offeringActive ?? false,
  }
}
// module.exports = app;