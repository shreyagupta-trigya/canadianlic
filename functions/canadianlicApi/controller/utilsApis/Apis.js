var catalyst = require("zcatalyst-sdk-node");
const query = require("../../SQL/query");
require("dotenv").config();
const pageSize = process.env.PAGE_SIZE;
// *************Common Functions***************

exports.testConntection =  async(req, res)=>{
    try{
res.status(200).json({success:true, message:"I am live!"});
    }catch(error){
        res.status(409).json({success: false, message: "Test Connection Issue", error:error});
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
exports.getLeadData = async (req, res) => {
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * 300;
    let querySql = query.getLeads.replace("%LIMIT%", pageSize).replace("%OFFSET%", offset);
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const result = await adminApp.zcql().executeZCQLQuery(querySql);
  
    let leads = result.map((lead) => ({
      firstName: lead.leads.firstName,
      lastName: lead.leads.lastName,
      name: lead.leads.firstName + " " + lead.leads.lastName,
      ROWID: lead.leads.ROWID,
    }));
    res.status(200).json({
      success: true,
      message: "Lead fetched successfully",
      leads,
    });
};
exports.getOffering = async (req, res) => {
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * pageSize;
    let querySql = query.getOfferings.replace("%LIMIT%", pageSize).replace("%OFFSET%", offset);
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const result = await adminApp.zcql().executeZCQLQuery(querySql);
    let offerings = result.map(({offering}) => ({
      offeringName: offering?.offeringName,
      ROWID: offering?.ROWID,
    }));
    res.status(200).json({
      success: true,
      message: "Offering fetched successfully",
      offerings,
    });
};
exports.getInsurecePartners = async (req, res) => {
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * pageSize;
    let querySql = query.getInsurecePartners.replace("%LIMIT%", pageSize).replace("%OFFSET%", offset);
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const result = await adminApp.zcql().executeZCQLQuery(querySql);
    let insPartner = result.map(({insurencePartner}) => ({
      offeringName: insurencePartner?. partnerName,
      ROWID: insurencePartner?.ROWID,
    }));
    res.status(200).json({
      success: true,
      message: "Insurence Partner fetched successfully",
      insPartner,
    });
};
exports.getSingleData = async (req, res) => {
  const { tableName, Id } = req.body;
  let querySql = query.singleData
    .replace("%TABLE%", tableName)
    .replace("%ROWID%", Id);
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  const response = await adminApp.zcql().executeZCQLQuery(querySql);
  res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    response: response[0],
  });
};