const catalyst = require('zcatalyst-sdk-node');
const searchQueryBuilder = require("./searchQueryBuilder.js");
const searchQuery = require("./searchQueries.js");
const NodeCache = require( "node-cache" );
const Node = new NodeCache();
const express = require('express');
require("dotenv").config();
const pageSize = process.env.PAGE_SIZE

exports.testSearchConnection = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Search connection is successful!",
    });
}

exports.getRecords = async (req, res) => {
    const app = catalyst.initialize(req, { scope: 'admin' });
    const { search , moduleName} = req.body;
  
    try {
      const rowId = req.params.id;
      const page = parseInt(req.body.page, 10) || 1;
      const limit = parseInt(req.body.limit, 10) || 10;
      const offset = (page - 1) * limit;
  
      const fieldMapping = {
        leads: { createdTime:"CREATEDTIME", layout:"layoutName", insurenceLeadNameAll:["firstName","lastName"], email:"email", phone:"phoneNumber", assignedAdvisor: ["advisors.firstName", "advisors.lastName"], status:"leadStatus", serviceRequested:"leadService.servicesRequested", gclidData:"leadService.gclidData", lastActivityTime:"MODIFIEDTIME", createdBy :["userData.firstName","userData.lastName"] , lpUrlData:"leadService.lpUrlData" , facebookAd:"leadInformations.facebookAd", adCampaignName:"leadInformations.adCampaignName"},
        deals: { dealCreatedOn:"CREATEDTIME", dealName:"dealName", dealOwner: ["userData.firstName","userData.lastName"] , locationName:"locations.locationName", contactName:["contacts.firstName", "contacts.lastName"] , insurancedeal:["leads.firstName", "leads.lastName"]},
        contacts: { createdTime:"CREATEDTIME", contactName:["firstName","lastName"] , contactOwner: ["userData.firstName","userData.lastName"] , mobile:"mobile", email:"email", mailingStreet:"contactSubDetails.mailingStreet",mailingCity:"contactSubDetails.mailingCity", mailingZip:"contactSubDetails.mailingZip", emergencyContactName:"contactEmergencyDetails.emergencyContactName",emergencyContactPhone:"contactEmergencyDetails.emergencyContactPhone", emergencyContactRelationship:"contactEmergencyDetails.emergencyContactRelationship", emergencyContactEmail:"contactEmergencyDetails.emergencyContactEmail" },
        advisors: { name:["firstName","lastName"], advisorOwner:["userData.firstName","userData.lastName"] , contactOwner: ["contacts.firstName", "contacts.lastName"] , mobile:"mobile", email:"email", module:"layout" },
        policies: {createdTime:"CREATEDTIME", applicationSubmittedOn:"applicationOn", client:["contacts.firstName", "contacts.lastName"], mobile:"clientMobile" },
        insurencePartner: { insurancePartnerName:"partnerName", email: "email" , phone:"phone", website:"website" , insuranceContactOwner:"insuranceContactOwner"},
        // partnerContact: { partnerContactName:"partnerContact", email:"email", partnerContactOwner:"partnerContactOwner", parentPartner:"parentPartner", address:"address", modifiedTime:"MODIFIEDTIME", createdTime:"CREATEDTIME"},
        vendors: {name:"name",vendorType:"vendorType", email:"email", owner:["userData.firstName","userData.lastName"], status:"status", modifiedTime:"MODIFIEDTIME", createdTime:"CREATEDTIME"},
        referrals: { referralName:"referralName", referralOwner:["userData.firstName","userData.lastName"] , modifiedTime:"MODIFIEDTIME", createdTime:"CREATEDTIME"},
        offering: {name:"offeringName"},
        locations: { locationName:"locationName", locationOwner:["userData.firstName","userData.lastName"]},
        advisorCredential: {contractedAdvisorListing:["contacts.firstName", "contacts.lastName"], insurancePartnerListing:"insurencePartner.partnerName", advisorCredentialsOwner:["advisors.firstName","advisors.lastName"],modifiedTime:"MODIFIEDTIME", createdTime:"CREATEDTIME"},
      }[moduleName];

      // Generate search conditions
      let searchConditions = searchQueryBuilder(search, fieldMapping);
  
      if (rowId) {
        const rowIdCondition = `ROWID = '${rowId}'`;
        searchConditions = searchConditions ? `${searchConditions} AND ${rowIdCondition}` : rowIdCondition;
      }
  
      const whereClause = searchConditions ? `WHERE (${searchConditions})` : '';
  
      const queryTemplate = {
        leads: searchQuery.getLeadsRecord,
        deals: searchQuery.getDealsRecord,
        contacts: searchQuery.getContactsRecord,
        advisors: searchQuery.getAdvisorsRecord,
        policies: searchQuery.getPoliciesRecord,
        insurencePartner: searchQuery.getInsurencePartnerRecord,
        // partnerContact: searchQuery.getpartnerContactRecord,
        vendors: searchQuery.getVendorsRecord,
        referrals: searchQuery.getReferralsRecord,
        offering: searchQuery.getOfferingRecord,
        locations: searchQuery.getLocationsRecord,
        advisorCredential: searchQuery.getAdvisorCredentialRecord
      }[moduleName];

      // Inject search condition and pagination into the query template
      let finalQuery = queryTemplate
        .replace('%SEARCH_CONDITION%', whereClause)
        .replace('%LIMIT%', limit)
        .replace('%OFFSET%', offset);
      // console.log("Final Query---->", finalQuery); // Log the final query for debugging
      const response = await app.zcql().executeZCQLQuery(finalQuery);
  
      if (response.length === 0) {
        return res.status(404).json({ success: false, message: `${moduleName} records not found!` });
      }
      const adv = response.map(item => item.advisors);

      Node.set("advisorList", adv); // optional cache
      return res.status(200).json({
        success: true,
        message: `${moduleName} records retrieved successfully!`,
        adv,
      });
  
    } catch (error) {
      console.error(error);
      return res.status(409).json({
        success: false,
        message: `Failed! Cannot retrieve ${moduleName} records!`,
        error: error.message,
      });
    }
  };
  