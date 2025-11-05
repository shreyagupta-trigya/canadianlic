var catalyst = require("zcatalyst-sdk-node");
const query = require("../SQL/query");
require("dotenv").config();
const pageSize = process.env.PAGE_SIZE;
// *************Common Functions***************


exports.getLeadList = async(req,res)=>{
    const {page} = req.body;
    console.log("pages requested", page);
    try{
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const pageInt = parseInt(page) || 1;
    const pageNo = (pageInt - 1) * pageSize;
    let leadQuery = query.getAllLeads.replace("%LIMIT%", pageSize).replace("%OFFSET%", pageNo);
    const response=await  adminApp.zcql().executeZCQLQuery(`${leadQuery}`); 
    const leadResp = await leadParserDb(response);
    res.status(200).json({success: true, message: "Lead get Successfully",leadResp});
    }
    catch(err){
      res.status(409).json({success: false, message: "Lead get Issue", error:err});
    }
}
exports.getUsers = async (req, res) => {
    const page = parseInt(req.body.page) || 1;
    const pageNo = (page - 1) * pageSize;
    let querySql = query.getUsers.replace("%LIMIT%", pageSize).replace("%OFFSET%", pageNo);
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const result = await adminApp.zcql().executeZCQLQuery(querySql);
  
    let users = result.map((user) => ({
      firstName: user.userData.firstName,
      lastName: user.userData.lastName,
      name: user.userData.firstName + " " + user.userData.lastName,
      ROWID: user.userData.ROWID,
    }));
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
};
  
exports.getAdviors = async (req, res) => {
const page = parseInt(req.body.page) || 1;
const pageNo = (page - 1) * pageSize;
let querySql = query.getAdviors.replace("%LIMIT%", pageSize).replace("%OFFSET%", pageNo);
const adminApp = catalyst.initialize(req, { scope: "admin" });
const result = await adminApp.zcql().executeZCQLQuery(querySql);

let advisors = result.map((advisor) => ({
    firstName: advisor.advisors.firstName,
    lastName: advisor.advisors.lastName,
    name: advisor.advisors.firstName + " " + advisor.advisors.lastName,
    ROWID: advisor.advisors.ROWID,
}));
res.status(200).json({
    success: true,
    message: "Adviors fetched successfully",
    advisors,
});
};

exports.getLocations = async (req, res) => {
const page = parseInt(req.body.page) || 1;
const pageNo = (page - 1) * 300;
let querySql = query.getLocation.replace("%LIMIT%", pageSize).replace("%OFFSET%", pageNo);
const adminApp = catalyst.initialize(req, { scope: "admin" });
const result = await adminApp.zcql().executeZCQLQuery(querySql);

let locations = result.map((location) => ({
    name: location.locations.locationName,
    ROWID: location.locations.ROWID,
}));
res.status(200).json({
    success: true,
    message: "Locations fetched successfully",
    locations,
});
};
  
exports.getContacts = async (req, res) => {
const page = parseInt(req.body.page) || 1;
const pageNo = (page - 1) * 300;
let querySql = query.getContact.replace("%LIMIT%", pageSize).replace("%OFFSET%", pageNo);
const adminApp = catalyst.initialize(req, { scope: "admin" });
const result = await adminApp.zcql().executeZCQLQuery(querySql);

let contacts = result.map((contact) => ({
    firstName: contact.contacts.firstName,
    lastName: contact.contacts.lastName,
    name: contact.contacts.firstName + " " + contact.contacts.lastName,
    ROWID: contact.contacts.ROWID,
}));
res.status(200).json({
    success: true,
    message: "Contacts fetched successfully",
    contacts,
});
};
exports.getReferral = async (req, res) => {
const page = parseInt(req.body.page) || 1;
const pageNo = (page - 1) * 300;
let querySql = query.getreferralData.replace("%LIMIT%", pageSize).replace("%OFFSET%", pageNo);
const adminApp = catalyst.initialize(req, { scope: "admin" });
const result = await adminApp.zcql().executeZCQLQuery(querySql);
let referral = result.map(({ referralData }) => ({
    referralName: referralData.referralName,
    ROWID: referralData.ROWID,
}));
res.status(200).json({
    success: true,
    message: "Referra fetched successfully",
    referral,
});
};
// ************ LEAD PARSE DB*************
async function leadParserDb(response) {
    return response.map(({ leads }) => ({
      firstName: leads.firstName,
      lastName: leads.lastName,
      mobile: leads.mobile,
      ROWID: leads.ROWID,
    }));
}
