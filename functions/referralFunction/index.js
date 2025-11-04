"use strict";
const express = require("express");
const cors = require("cors");
const catalyst = require("zcatalyst-sdk-node");
const searchQueryBuilder = require("./Util/searchQueryBuilder");
const {
  insertMultipleRowsIntoTable,
  deleteById,
  decryptData,
} = require("./utils");
const app = express();
app.use(express.json());
app.use(cors());
const referralRouter = require("./router/Router");
app.use("/api/v2/", referralRouter);

app.put("/createreferral", async (req, res) => {
  const referral = req.body;
  // console.log(referral);
  const newreferral = {
    referralName: referral.name ? referral.name: '',
    email: referral.email ? referral.email: '',
    phone: referral.phone ? referral.phone:null,
    lastName: referral.lastName ? referral.lastName: '',
    referralOwner: referral.referralOwner ? referral.referralOwner: null,
    referredByClient: referral.referredByClient ? referral.referredByClient:null,
    layout: referral.layout ? referral.layout: '',
    exchangeRate: referral.exchangeRate ? referral.exchangeRate: null,
    referredByOther: referral.referredByOther ? referral.referredByOther:'',
    currency: referral.currency ? referral.currency: null,
    annualReferralSlab: referral.annualReferralSlab ? referral.annualReferralSlab: '',
    referralLevel: referral.referralLevel ? referral.referralLevel: '',

    year: referral.year ? referral.year: null,
    firstPolicyIssueDate: new Date( referral.date) ? new Date(referral.date):null,
    client: referral.client ? referral.client: null,
    // productCategoryReferral: referral.productCategoryReferral ? referral.productCategoryReferral: null,
    referralPayout: referral.referralPayout ? referral.referralPayout: '',
    productCategoryReffered: referral.productCategoryReffered ? referral.productCategoryReffered: null,
  };
  // const gridData = referral.numberOfReferralScoreGridData;
  // console.log("This is grid data", gridData);
  try {
    const referralResponse = await catalyst
      .initialize(req, { scope: "admin" })
      .datastore()
      .table("referralData")
      .insertRow(newreferral);
    // send email
    console.log("referralResponsev===?>", referralResponse);
    // let email = catalyst.initialize(req, { scope: "admin" }).email();
    // let config = {
    //   from_email: "peterj@trigya.co",
    //   to_email: referralResponse.email,
    //   subject: "Create New refferal Account",
    //   content: `"<b>Hello</b>, ${referralResponse.referralName}, Your account has been successfully created.<br> ${referral.referralName} wants to add you in the referral. Please check and approve. <a href="http://localhost:8080/app/ApprovedReferral/${referralResponse.ROWID}">Accept Invitation</a></br>"`,
    //   html_mode: true,
    // };
    // let mailPromise = await email.sendMail(config);

    let referralScoreGridResponse;
    if (referral.numberOfReferralScoreGridData.length > 0) {
      referralScoreGridResponse = await insertMultipleRowsIntoTable(
        "referralScoreGrid",
        referral.numberOfReferralScoreGridData,
        req,
        referralResponse
      );
    }
console.log("referralScoreGridResponse", referralScoreGridResponse)
    res.status(200).json({
      success: true,
      message: "referral created successfully",
      referralResponse,
      referralScoreGridResponse,
    });
  } catch (error) {
    res.status(400).json({
      succes: false,
      message: error.message,
    });
    console.log(error);
  }
});

app.post("/getallreferrals/:id?", async (req, res) => {
  try{
    const app = catalyst.initialize(req, { scope: 'admin' });
    const { search } = req.body;
    const rowId = req.params.id;
    const page = parseInt(req.body.page, 10) || 1;
    const limit = parseInt(req.body.limit, 10) || 10;
    const offset = (page - 1) * limit;
  
    const fieldMapping = { referralName:"referralName", referralOwner:["userData.firstName","userData.lastName"] , modifiedTime:"MODIFIEDTIME", createdTime:"CREATEDTIME"};
  
    let searchConditions = searchQueryBuilder(search, fieldMapping);
  
    if (rowId) {
        const rowIdCondition = `ROWID = '${rowId}'`;
        searchConditions = searchConditions ? `${searchConditions} AND ${rowIdCondition}` : rowIdCondition;
      }
  
    const whereClause = searchConditions ? `WHERE (${searchConditions})` : '';

    let query = `SELECT referralData.*, userData.lastName,userData.ROWID,userData.firstName
    FROM referralData 
    LEFT JOIN userData ON referralData.referralOwner = userData.ROWID %SEARCH_CONDITION% 
    ORDER BY CREATEDTIME DESC 
    LIMIT %LIMIT% OFFSET %OFFSET%`;

    let finalQuery = query
    .replace('%SEARCH_CONDITION%', whereClause)
    .replace('%LIMIT%', limit)
    .replace('%OFFSET%', offset);
  // console.log("Final Query---->", finalQuery); // Log the final query for debugging
  const response = await app.zcql().executeZCQLQuery(finalQuery);
  return res.status(200).json(response);

} catch (error) {
  console.error(error);
  return res.status(409).json({
    success: false,
    message: `Failed! Cannot retrieve referrals records!`,
    error: error.message,
  });
}
});

app.get("/getusers", async (req, res) => {
  const catalystApp = catalyst.initialize(req, { scope: "admin" });
  try {
    const usersPromise = catalystApp
      .datastore()
      .table("userData")
      .getPagedRows({ pageSize: 200 })
      .then(({ data }) => data);

    const contactsPromise = catalystApp
      .datastore()
      .table("contacts")
      .getPagedRows({ pageSize: 200 })
      .then(({ data }) => data);

    const [usersData, contactsData] = await Promise.all([
      usersPromise,
      contactsPromise,
    ]);

    res.status(200).json({ usersData, contactsData });
  } catch (e) {
    console.error(e);
    res.status(500).json("Internal server error: " + e.message);
  }
});

app.get("/getsinglereferral/:id", async (req, res) => {
  console.log(req.params.id);

  const query = `SELECT * from referralData WHERE ROWID=${req.params.id}`;
  const subFormQuery = `SELECT * FROM referralScoreGrid WHERE referralDataId=${req.params.id}`;

  try {
    const mainData = await catalyst
      .initialize(req, { scope: "admin" })
      .zcql()
      .executeZCQLQuery(query);
    const subformData = await catalyst
      .initialize(req, { scope: "admin" })
      .zcql()
      .executeZCQLQuery(subFormQuery); 

      let mainFormData=mainData[0].referralData
      let subReferralFormData=subformData.map((item)=>item.referralScoreGrid)

    res.status(200).json({
      success: true,
      message: "referral fetched successfully",
      mainFormData,
      subReferralFormData,
    });
  } catch (error) {
    res.status({
      success: false,
      message: error.message,
    });
  }
});

app.post("/update-referral/:id", async (req, res) => {
  console.log(req.params.id);
  const referral = req.body;
  const rowData = {
    referralName: referral.name,
    email: referral.email,
    phone: referral.phone,
    lastName: referral.lastName,
    referralOwner: referral.referralOwner,
    referredByClient: referral.referredByClient,
    referredByOther: referral.referredByOther,
    annualReferralSlab: referral.annualReferralSlab,
    referralLevel: referral.referralLevel,
    referralProductCategory1: referral.referralProductCategory1,
    referralPayoytCategory1: referral.referralPayoytCategory1,
    referralProductCategory2: referral.referralProductCategory2,
    referralPayoutCategory2: referral.referralPayoutCategory2,
    referralProductCategory3: referral.referralProductCategory3,
    referralPayoutCategory3: referral.referralPayoutCategory3,
    referralProductCategory4: referral.referralProductCategory4,
    referralPayoutCategory4: referral.referralPayoutCategory4,
    year: referral.year,
    firstPolicyIssueDate: referral.date,
    client: referral.client,
    productCategoryReferral: referral.productCategoryReferral,
    referralPayout: referral.referralPayout,
  };
  const newReferralScoreGridData = referral.newReferralScoreGridData;
  rowData.ROWID = req.params.id;
  const catalystApp = catalyst.initialize(req, { scope: "admin" });
  const deletedReferralScoreGridData = referral.deletedReferralScoreGridData;

  try {
    const rowDataResponse = await catalystApp
      .datastore()
      .table("referralData")
      .updateRow(rowData);
      if (
        referral.newReferralScoreGridData &&
        referral.newReferralScoreGridData.length > 0
      ) {
       const newReferralScoreGridDataResponse = await insertMultipleRowsIntoTable(
      "referralScoreGrid",
      newReferralScoreGridData,
      req,
      rowDataResponse
    );
  }

    if (
      referral.newReferralScoreGridData &&
      referral.newReferralScoreGridData.length > 0
    ) {
      const newReferralScoreGridDataResponse =
        await insertMultipleRowsIntoTable(
          "referralScoreGrid",
          newReferralScoreGridData,
          req,
          rowDataResponse
        );
    }

    if (
      referral.deletedReferralScoreGridData &&
      referral.deletedReferralScoreGridData.length > 0
    ) {
      const deletedReferralScoreGridDataResponse = await deleteById(
        "referralScoreGrid",
        deletedReferralScoreGridData,
        req
      );
    }
    res.status(200).json({
      success: true,
      message: "referral updated successfully",
      rowDataResponse,
      // newReferralScoreGridDataResponse,
      // deletedReferralScoreGridDataResponse
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});
//referrerRegistration
app.delete("/deletereferral/:id", async (req, res) => {
  catalyst
    .initialize(req, { scope: "admin" })
    .datastore()
    .table("referralData")
    .deleteRow(req.params.id)
    .then((data) => {
      res.status(201).json({
        success: true,
        message: "Referral deleted successfully",
      });
    })
    .catch((error) => {
      res.status(406).json({
        succuss: false,
        message: "Issue with deleting referral",
        output: error,
      });
    });
});
// send email when create new referral

app.post("/send-email-sample", async (req, res) => {
  //Create an email instance
  let email = catalyst.initialize(req, { scope: "admin" }).email();
  let config = {
    from_email: "peterj@trigya.co",
    to_email: ["shobhnath@trigya.co"],
    subject: "Create New Refferal",
    content: "<b>Hello</b>,We'r",
    html_mode: true,
  };
  let mailPromise = await email.sendMail(config);
  res.status(200).send(mailPromise);
  console.log(config);
});
app.post("/registerrefferal", async (req, res) => {
  const referral = req.body;
  const mainformData = {
    referralName: referral.referralName,
    firstName: referral.firstName,
    refCall: referral.refCall,
    referralOwner: referral.referralOwner,
    exchangeRate: referral.exchangeRate,
    email: referral.email,
    currency: referral.currency,
    emailOptOut: referral.emailOpt,
    streetName: referral.streetName,
    houseOrAptNumber: referral.houseOrAptNumber,
    city: referral.city,
    postalCode: referral.postalCode,
    province: referral.province,
    country: referral.country,
    contactId: referral.referralContact,
  };
  // console.log("dddd=>", referral);
  // const subformData = referral.referralScoreCardData;
  try {
    const result = await catalyst
      .initialize(req, { scope: "admin" })
      .datastore()
      .table("referrerRegistration")
      .insertRow(mainformData);
    //
    // const refId = result.ROWID;
    // console.log("inserted record =>", result.ROWID);
    // send email
    let email = catalyst.initialize(req, { scope: "admin" }).email();
    let config = {
      from_email: "peterj@trigya.co",
      to_email: referral.email,
      subject: "Create New refferal Account",
      content: `"<b>Hello</b>, ${referral.referralName}, Your account has been successfully created.<br> ${referral.referralName} wants to add you in the referral. Please check and approve. <a href="http://localhost:8080/app/ApprovedReferral/${result.ROWID}">Accept Invitation</a></br>"`,
      html_mode: true,
    };
    let mailPromise = await email.sendMail(config);
    // res.status(200).send(mailPromise);
    // console.log(config);
    //end send email
    //   subformData.forEach((row) => {
    //     row.referrerRegistrationId = result.ROWID;
    //   });
    //  const subresult= await catalyst
    //         .initialize(req, { scope: "admin" })
    //         .datastore()
    //         .table("referrerRegistrationScoreboard")
    //         .insertRows(subformData);

    res.status(200).json({
      success: true,
      message: "Referral successfully registered and send email",
      result,
      mailPromise,
      // subresult,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json("Internal server error: " + e.message);
  }
});
app.post("/approveReferralEmail/:id", async (req, res) => {
  const formData = req.body;
  const updatedReff = {
    approvedStatus: formData.approvalStatus,
    comment: formData.comments,
    ROWID: req.params.id,
  };
  // console.log("update reff", updatedReff);
  try {
    const result = await catalyst
      .initialize(req, { scope: "admin" })
      .datastore()
      .table("referralData")
      .updateRow(updatedReff);

    console.log("result.approvedStatus", result.approvedStatus);
    const contactDetailsQuery = `SELECT * FROM contacts WHERE ROWID = '${result.referredByClient}'`;
    const contactDetails = await catalyst
      .initialize(req, { scope: "admin" })
      .zcql()
      .executeZCQLQuery(contactDetailsQuery);
    console.log("contact email", contactDetails[0].contacts.email);

    console.log("contact details", contactDetails);
    if (result.approvedStatus == "approved") {
      let email = catalyst.initialize(req, { scope: "admin" }).email();
      let config = {
        from_email: "peterj@trigya.co",
        to_email: result.email,
        subject: "Refferal Approved",
        content: `"<b>Hello</b>, ${result.referralName}, Your Referral has been successfully Approved."`,
        html_mode: true,
      };
      let mailPromise = await email.sendMail(config);
      // new contact
      let contactEmail = catalyst.initialize(req, { scope: "admin" }).email();
      let config1 = {
        from_email: "peterj@trigya.co",
        to_email: contactDetails[0].contacts.email,
        subject: "Refferal Approved",
        content: `"<b>Hello</b>, ${contactDetails[0].contacts.firstName}, Your Referral has been successfully Approved."`,
        html_mode: true,
      };
      let mailPromis = await contactEmail.sendMail(config1);
    } else {
      let email = catalyst.initialize(req, { scope: "admin" }).email();
      let config = {
        from_email: "peterj@trigya.co",
        to_email: result.email,
        subject: "efferal Regected",
        content: `"<b>Hello</b>, ${result.referralName}, Your Refferal has been Rejected.<br>"`,
        html_mode: true,
      };
      let mailPromise = await email.sendMail(config);
    }
    res.status(200).json({
      success: true,
      message: "Referral successfully updated",
      result,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json("Internal server error: " + e.message);
  }
});
app.get("/getcontactDetails/:id?", (req, res) => {
  let query;
  if (!req.params.id) {
    query = `SELECT * FROM contacts`;
  } else {
    query = `SELECT * FROM contacts WHERE ROWID = ${req.params.id}`;
  }
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
        message: "Issue pulling user data",
        error: error,
      });
    });
});
app.get("/getReferrallist", async (req, res) => {
  const catalystApp = catalyst.initialize(req, { scope: "admin" });
  try {
    const query = `select * from referrerRegistration `;
    const referralData = await catalyst
      .initialize(req, { scope: "admin" })
      .zcql()
      .executeZCQLQuery(query);

    // const referralSubformData= await catalyst.initialize(req,{scope: "admin"}).zcql().executeZCQLQuery("select * from referrerRegistrationScoreboard");

    res.status(200).json({
      message: "referral fetched successfully",
      referralData,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json("Internal server error: " + e.message);
  }
});

app.get("/getReferralRegister/:id", async (req, res) => {
  const query = `SELECT * from referrerRegistration WHERE ROWID=${req.params.id}`;
  const subFormQuery = `Select * from referrerRegistrationScoreboard
  Where referrerRegistrationId=${req.params.id}`;

  try {
    const formData = await catalyst
      .initialize(req, { scope: "admin" })
      .zcql()
      .executeZCQLQuery(query);

    const subformData = await catalyst
      .initialize(req, { scope: "admin" })
      .zcql()
      .executeZCQLQuery(subFormQuery);

    res.status(200).json({
      message: "referral fetched successfully",
      formData,
      subformData,
    });
  } catch (error) {
    res.status(500).json({
      succuss: false,
      message: "Issue pulling referral data",
      output: error,
    });
  }
});

app.post("/updateregisterreferral/:id", async (req, res) => {
  console.log(req.params.id);
  const referral = req.body;
  const mainformData = {
    referralName: referral.referralName,
    firstName: referral.firstName,
    refCall: referral.refCall,
    referralOwner: referral.referralOwner,
    exchangeRate: referral.exchangeRate,
    email: referral.email,
    currency: referral.currency,
    emailOptOut: referral.emailOpt,
    streetName: referral.streetName,
    houseOrAptNumber: referral.houseOrAptNumber,
    city: referral.city,
    postalCode: referral.postalCode,
    province: referral.province,
    country: referral.country,
    ROWID: req.params.id,
  };
  const subformData = referral.referralScoreCardData;

  const catalystApp = catalyst.initialize(req, { scope: "admin" });
  const result = await catalystApp
    .datastore()
    .table("referrerRegistration")
    .updateRow({ ...mainformData });

  // const subformResult=await catalystApp
  // .datastore()
  // .table("referrerRegistrationScoreboard")
  // .updateRows(req.body.referralScoreCardData);

  res.status(200).json({
    success: true,
    message: "Referral updated successfully",
    result,
    // subformResult
  });
});

module.exports = app;
