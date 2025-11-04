const { search } = require("../Router/router");

module.exports = {
    getleadByid:"SELECT * FROM leads WHERE ROWID =",
    getleadsDescription:"SELECT * FROM leadsDescription WHERE leadId =",
    getFamilyDetails: "SELECT * FROM familyTree WHERE leadId =",
    getdependentParents:"SELECT * FROM dependentParents WHERE leadId =",
    getcontactsSiblings:"SELECT * FROM contactsSiblings WHERE leadId =",
    getfestivals:"SELECT * FROM festivals WHERE leadId =",
    getdependentChildren:"SELECT * FROM dependentChildren WHERE leadId =",
    getcontactEmergencyDetails:"SELECT * FROM contactEmergencyDetails WHERE leadId =",
    getAllLeads:`SELECT leads.MODIFIEDTIME, leads.CREATEDTIME, leads.ROWID, leads.layoutName, leads.lastName, leads.firstName, 
       leads.insuranceLeadStatus, leads.leadStatusStage, leads.mobile, leads.insuranceLeadSource, leads.phoneNumber,leads.email,
        leadService.gclidData,leadService.ROWID,
        userData.*,
        leadInformations.*,
        advisors.firstName,advisors.lastName,advisors.ROWID 
        FROM leads 
        LEFT JOIN leadService ON leadService.leadId = leads.ROWID 
        LEFT JOIN userData  ON userData.ROWID = leads.insuranceLeadOwner 
        LEFT JOIN advisors ON advisors.ROWID = leads.assignedAdvisor 
        LEFT JOIN leadInformations ON leadInformations.leadId = leads.ROWID 
        WHERE leads.leadStatus !='converted' 
        ORDER BY CREATEDTIME DESC
        `,
    deleteLead: "DELETE FROM leads WHERE ROWID IN",
    getAlldeal: "SELECT deals.*, contacts.lastName, contacts.firstName, contacts.ROWID, userData.firstName, userData.lastName, userData.ROWID, locations.locationName, locations.ROWID, leads.name, leads.firstName, leads.lastName, leads.ROWID FROM deals LEFT JOIN contacts ON contacts.ROWID = deals.contactName LEFT JOIN userData ON userData.ROWID = deals.dealOwner LEFT JOIN locations ON locations.ROWID = deals.locationName LEFT JOIN leads ON leads.ROWID = deals.insuranceLead ORDER BY CREATEDTIME DESC LIMIT ${limit} OFFSET ${offset}",
    getDealId: "SELECT deals.*, contacts.lastName, contacts.firstName, contacts.ROWID, userData.firstName, userData.lastName, userData.ROWID, locations.locationName, locations.ROWID, leads.name, leads.firstName, leads.lastName, leads.ROWID FROM deals LEFT JOIN contacts ON contacts.ROWID = deals.contactName LEFT JOIN userData ON userData.ROWID = deals.dealOwner LEFT JOIN locations ON locations.ROWID = deals.locationName LEFT JOIN leads ON leads.ROWID = deals.insuranceLead WHERE deals.ROWID =",
    deleteDeal: "DELETE FROM deals WHERE ROWID IN",
    deleteAdvisorCrd: "DELETE FROM advisorCredential WHERE ROWID IN",
    search : `SELECT * FROM %TABLE% WHERE sourceId = %ROWID%`
}