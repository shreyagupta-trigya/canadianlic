module.exports = {
  getAlldeal:
    "SELECT deals.*, contacts.lastName, contacts.firstName, contacts.ROWID, userData.firstName, userData.lastName, userData.ROWID, locations.locationName, locations.ROWID, leads.name, leads.firstName, leads.lastName, leads.ROWID FROM deals LEFT JOIN contacts ON contacts.ROWID = deals.contactName LEFT JOIN userData ON userData.ROWID = deals.dealOwner LEFT JOIN locations ON locations.ROWID = deals.locationName LEFT JOIN leads ON leads.ROWID = deals.insuranceLead ORDER BY CREATEDTIME DESC LIMIT ${limit} OFFSET ${offset}",
  getDealId:
    "SELECT deals.*, contacts.lastName, contacts.firstName, contacts.ROWID, userData.firstName, userData.lastName, userData.ROWID, locations.locationName, locations.ROWID, leads.name, leads.firstName, leads.lastName, leads.ROWID FROM deals LEFT JOIN contacts ON contacts.ROWID = deals.contactName LEFT JOIN userData ON userData.ROWID = deals.dealOwner LEFT JOIN locations ON locations.ROWID = deals.locationName LEFT JOIN leads ON leads.ROWID = deals.insuranceLead WHERE deals.ROWID =",
  deleteDeal: "DELETE FROM deals WHERE ROWID IN",
  dealById: `SELECT deals.*, contacts.lastName, contacts.firstName, contacts.ROWID, 
    userData.firstName, userData.lastName, userData.ROWID, 
    locations.locationName, locations.ROWID, 
    leads.name, leads.firstName, leads.lastName, leads.ROWID 
    FROM deals 
    LEFT JOIN contacts ON contacts.ROWID = deals.contactName 
    LEFT JOIN userData ON userData.ROWID = deals.dealOwner 
    LEFT JOIN locations ON locations.ROWID = deals.locationName 
    LEFT JOIN leads ON leads.ROWID = deals.insuranceLead WHERE deals.ROWID = %ROWID%`,

  getAllDeals:`SELECT deals.*, contacts.lastName, contacts.firstName, contacts.ROWID, userData.firstName, userData.lastName, userData.ROWID, locations.locationName, locations.ROWID, leads.name, leads.firstName, leads.lastName, leads.ROWID FROM deals LEFT JOIN contacts ON contacts.ROWID = deals.contactName LEFT JOIN userData ON userData.ROWID = deals.dealOwner LEFT JOIN locations ON locations.ROWID = deals.locationName LEFT JOIN leads ON leads.ROWID = deals.insuranceLead 
          %SEARCH_CONDITION%  ORDER BY CREATEDTIME DESC LIMIT %LIMIT% OFFSET %OFFSET% `,

  // <<<<<<<<<<<<<===============PETER FUNCTIONALITIES ===============>>>>>>>>>>>>>
  getLeads: `SELECT firstName,lastName,ROWID FROM leads LIMIT 300 OFFSET %PAGENO%`,
  getUsers: `SELECT lastName,firstName,ROWID FROM userData LIMIT 300 OFFSET  %PAGENO%`,
  getLocation: `SELECT locationName,ROWID FROM locations LIMIT 300 OFFSET  %PAGENO%`,
  getContact: `SELECT firstName,lastName,ROWID FROM contacts LIMIT 300 OFFSET  %PAGENO%`,
  getAdviors: `SELECT firstName,lastName,ROWID FROM advisors LIMIT 300 OFFSET  %PAGENO%`,
  singleData: `SELECT * FROM %TABLE% WHERE ROWID = %ROWID%`,
  dealRelatedData: `SELECT deals.*,dealPolicyTracking.*,dealInformation.*,familyTree.*
        FROM deals
        LEFT JOIN dealPolicyTracking ON deals.ROWID = dealPolicyTracking.dealId
        LEFT JOIN dealInformation ON deals.ROWID = dealInformation.dealId
        LEFT JOIN familyTree ON deals.ROWID = familyTree.dealId
        WHERE ROWID = `,
  dealOnwer: `SELECT * FROM dealOwnership WHERE dealId =`,
  dealBeneficiaries: `SELECT * FROM dealBeneficiaries WHERE dealId =`,
  dealTrustees: `SELECT * FROM trustees WHERE dealId =`,
  dealDependentParents: `SELECT * FROM dependentParents WHERE dealId =`,
  dealDependentChildren: `SELECT * FROM dependentChildren WHERE dealId =`,
  dealContactsSiblings: `SELECT * FROM contactsSiblings WHERE dealId =`,
  festivals: `SELECT * FROM festivals WHERE dealId =`,
  leadConversionHistory: `SELECT * FROM leadConversionHistory WHERE dealId =`,
};
