'use strict';
// const bcrypt = require('bcrypt');
var catalyst = require('zcatalyst-sdk-node');

exports.testcredential = async(req, res) => {
	res.status(200).json({status: "Success"});
};
// exports.getAllAdvisorCredential = async (req, res) => {
//     let query;
//     if (!req.params.id) {
//       query = `SELECT * FROM advisorCredential`;
//     } else {
//       query = `SELECT * FROM advisorCredential WHERE ROWID = ${req.params.id}`;
//     }
//     catalyst
//       .initialize(req, { scope: "admin" })
//       .zcql()
//       .executeZCQLQuery(query)
//       .then((data) => {
//         res.status(200).json(data);
//       })
//       .catch((error) => {
//         res.status(500).json({
//           success: false,
//           message: "Issue pulling user data",
//           error: error,
//         });
//       });
// };
exports.getAllAdvisorCredential = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 if not provided
    const offset = parseInt(req.query.offset, 10) || 0; // Default to 0 if not provided

    const adminApp = catalyst.initialize(req, { scope: "admin" });

    // Query to get the total count of records
    const totaladvisorCredentialQuery = 'SELECT COUNT(advisorCredential.ROWID) FROM advisorCredential';
    const totalAdvResult = await adminApp.zcql().executeZCQLQuery(totaladvisorCredentialQuery);
    // console.log("totalAdvResult", totalAdvResult[0].advisorCredential);
    if (!totalAdvResult || totalAdvResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No records found",
      });
    }

    const totalCount = totalAdvResult[0].advisorCredential;
    const totalPages = Math.ceil(totalCount / limit);
    console.log("totalCount",totalCount);
    // Query to get the paginated data
    let dataQuery;
    if (!req.params.id) {
      dataQuery = `SELECT * FROM advisorCredential LIMIT ${limit} OFFSET ${offset}`;
    } else {
      dataQuery = `SELECT * FROM advisorCredential WHERE ROWID = ${req.params.id}`;
    }

    const dataResult = await adminApp.zcql().executeZCQLQuery(dataQuery);
    const credRecord = dataResult.map(item => ({
      owner: item.advisorCredential.owner,
      MODIFIEDTIME: item.advisorCredential.MODIFIEDTIME,
      locationName: item.advisorCredential.locationName,
      name: item.advisorCredential.name,
      CREATEDTIME: item.advisorCredential.CREATEDTIME,
      ROWID: item.advisorCredential.ROWID,
      email: item.advisorCredential.email,
      advisorStatus: item.advisorCredential.advisorStatus,
    }));
    res.status(200).json({
      success: true,
      data: credRecord,
      totalCount: totalCount['COUNT(ROWID)'], 
      totalPages,
      limit,
      currentPage: Math.ceil(offset / limit) + 1,
      totalPages: Math.ceil(totalCount['COUNT(ROWID)'] / limit),
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
  const data = {
    name: payload.owner,
    locationName: payload.locationName,
    email: payload.email,
    password: payload.password,
    owner: payload.advisorOwner,
    advisorStatus: payload.advisorStatus,
  };
  try {
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const response = await adminApp
      .datastore()
      .table("advisorCredential")
      .insertRow(data);
    res.status(200).json({
      success: true,
      message: "Advisor Credential Added Successfully...!!!",
      ROWID: response.ROWID,
    });
  } catch (error) {
    console.log(error);
    res.status(409).json({
      success: false,
      message: "Company Added unsuccessfully...!!!",
      error: error,
    });
  }
};
exports.updateAdvisorCredential = async (req, res) => {
  const payload = req.body;
  const data = req.params.id
    ? {
      name: payload.name,
      locationName: payload.locationName,
      email: payload.email,
      owner: payload.owner,
      advisorStatus: payload.advisorStatus,
      }
    : payload.map((payload) => ({
      name: payload.name,
      locationName: payload.locationName,
      email: payload.email,
      owner: payload.owner,
      advisorStatus: payload.advisorStatus,
      ROWID: payload.id,
      }));
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  const table = adminApp.datastore().table("advisorCredential");
  try {
    const response = await (req.params.id
      ? table.updateRow({ ...data, ROWID: req.params.id })
      : table.updateRows(data));
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
    const ids = req.params.id ? [req.params.id] : req.body.ids;
    if (!ids || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No IDs provided for deletion."
      });
    }
    const deleteQuery = `DELETE FROM advisorCredential WHERE ROWID IN (${ids.map(id => `'${id}'`).join(", ")})`;

    let result = await adminApp.zcql().executeZCQLQuery(deleteQuery);
    res.status(200).json({
      success: true,
      message: "Advisor Credential Deleted Successfully...!!!",
      deleteQuery,
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
