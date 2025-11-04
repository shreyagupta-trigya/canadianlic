"use strict";
const express = require("express");
const cors = require("cors");
const catalyst = require("zcatalyst-sdk-node");
const { decryptData } = require("./utils");
const { offering, sample } = require("./exports");
const { createObjectCsvStringifier } = require("csv-writer");
const searchQueryBuilder = require("./searchQueryBuilder");
const {getSequence,updateSequence} = require("./sequenceUtils");

// const moment = require('moment');
// ************OFFERING FUNCTIONS************

const {
  generateToken,
  createOffering
} = require("./crmIntegration/offeringDataSyncController");

const app = express();
app.use(express.json());

app.use(cors());

app.put("/createoffering", async (req, res) => {
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  try {
    const newoffering = await dataParsing(req.body)
      // SEQUENCE CODE
      const sequenceResp = await getSequence(req,"offering");
      let sequence =  sequenceResp?.data
      let sourceId = `${sequence?.prefix}-${sequence?.sequence.padStart(5,'0')}`;
      newoffering.sourceId = sourceId;    


    const offeringResp = await adminApp.datastore().table("offering").insertRow(newoffering);
    const id = offeringResp?.ROWID;

    await updateSequence(req,sequence?.rowId,parseInt(sequence.sequence) + 1);
    
    // ************CREATE NEW RECORD IN ZOHO CRM************
    const token = await generateToken();
    const crmId = await createOffering(token,{...newoffering,ROWID:id});
    await adminApp.datastore().table("offering").updateRow({sourceId:crmId,source:"catalyst",ROWID:id});

    res.status(201).json({
      success: true,
      message: "Offering created successfully",
      crmId,
      id
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      message: "Issue creating offering",
      error: error.message,
    });
  }
});

app.post("/getallofferings/:id?", async (req, res) => {
    try{
      const { search } = req.body;
      const rowId = req.params.id;
      const page = parseInt(req.body.page, 10) || 1;
      const limit = parseInt(req.body.limit, 10) || 10;
      const offset = (page - 1) * limit;
    
      const fieldMapping = {name:"offeringName"};
    
      let searchConditions = searchQueryBuilder(search, fieldMapping);
    
      if (rowId) {
          const rowIdCondition = `ROWID = '${rowId}'`;
          searchConditions = searchConditions ? `${searchConditions} AND ${rowIdCondition}` : rowIdCondition;
        }
    
      const whereClause = searchConditions ? `WHERE (${searchConditions})` : '';
    let query = `SELECT offering.*,userData.firstName,userData.lastName FROM offering LEFT JOIN userData ON userData.ROWID=offering.offeringOwner
               %SEARCH_CONDITION%  ORDER BY CREATEDTIME DESC LIMIT %LIMIT% OFFSET %OFFSET% `;
    let finalQuery = query
    .replace('%SEARCH_CONDITION%', whereClause)
    .replace('%LIMIT%', limit)
    .replace('%OFFSET%', offset);
    const offering = await catalyst.initialize(req, { scope: "admin" }).zcql().executeZCQLQuery(finalQuery)
    return res.status(200).json(offering);
  }
    catch(error) {
      res.status(500).json({
        success: false,
        message: "Error fetching offering data",
        error: error.message,
      });
    };
});

app.get("/getsingleproduct/:id", (req, res) => {
  console.log(req.params.id);

  const query = `SELECT * from offering WHERE ROWID=${req.params.id}`;

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
        message: "Issue pulling Product data",
        output: error,
      });
    });
});

app.post("/updateproduct/:id?", async (req, res) => {
  try {  
  const catalystApp = catalyst.initialize(req, { scope: "admin" });
  const newofferingWithValues = await dataParsing(req.body)
  const newoffering = Object.fromEntries(
    Object.entries(newofferingWithValues).filter(([key, value]) => value !== "" && value !== null)
  );
  console.log("newoffering",newoffering);
  newoffering.ROWID = req.params.id;
  const resp = catalystApp.datastore().table("offering").updateRow(newoffering);
    
      // const token = await generateToken();
      // crmId = await createOffering(token,newoffering,req.body?.sourceId);

      res.status(201).json({
        success: true,
        message: "Updated Offering successfully",
        rowId : resp.ROWID
      })
   

  }catch(error){
      res
        .status(409)
        .json({ success: false, message: "Updated Faild", output: error })
    };
});

app.delete("/deleteoffering/:id", async (req, res) => {
  catalyst
    .initialize(req, { scope: "admin" })
    .datastore()
    .table("offering")
    .deleteRow(req.params.id)
    .then((data) => {
      res.status(201).json({
        success: true,
        message: "user deleted successfully",
        data,
      });
    })
    .catch((error) => {
      res.status(406).json({
        succuss: false,
        message: "Issue with deleting user",
        output: error,
      });
    });
});
app.post("/download-files", async (req, res) => {
  try {
    const csvContent = await downloadSampleFile();
    
    // Send the CSV file for download
    res.setHeader("Content-disposition", "attachment; filename=sample.csv");
    res.set("Content-Type", "text/csv");
    res.status(200).send(csvContent);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
});

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
module.exports = app;
