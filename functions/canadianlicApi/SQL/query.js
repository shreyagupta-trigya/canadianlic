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

  // ************** DEAL QUERY****************
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

  // ****************GET OFFERING ****************
  getOfferingBYId :`SELECT offering.*, userData.ROWID, userData.role, userData.email, userData.phone, userData.city, userData.lastName, userData.firstName  
          FROM userData
          LEFT JOIN offering ON userData.ROWID = offering.offeringOwner 
          WHERE offering.ROWID=`,

    // ********** UTIL QUERY **********
    getLeads: `SELECT firstName,lastName,ROWID FROM leads LIMIT %LIMIT% OFFSET %OFFSET%`,
    getOfferings: `SELECT offeringName,ROWID FROM offering LIMIT %LIMIT% OFFSET %OFFSET%`,
    getInsurecePartners: `SELECT partnerName,ROWID FROM insurencePartner LIMIT %LIMIT% OFFSET %OFFSET%`,
    getUsers: `SELECT lastName,firstName,ROWID FROM userData LIMIT %LIMIT% OFFSET  %OFFSET%`,
    getLocation: `SELECT locationName,ROWID FROM locations LIMIT %LIMIT% OFFSET  %OFFSET%`,
    getContact: `SELECT firstName,lastName,ROWID FROM contacts LIMIT %LIMIT% OFFSET  %OFFSET%`,
    getAdviors: `SELECT firstName,lastName,ROWID FROM advisors LIMIT %LIMIT% OFFSET  %OFFSET%`,
    singleData: `SELECT * FROM %TABLE% WHERE ROWID = %ROWID%`,
    getreferralData: `SELECT referralName,ROWID FROM referralData LIMIT %LIMIT% OFFSET  %OFFSET%`,
  
    // ********* ADVISOR QUERY ********** 
    getAdvisorData: `SELECT advisors.*,advisorSubDetails.*,familyTree.*
    FROM advisors
    LEFT JOIN advisorSubDetails ON advisors.ROWID = advisorSubDetails.advisorId
    LEFT JOIN familyTree ON advisors.ROWID = familyTree.advisorId
    WHERE ROWID = `,
    getDependentParents: `SELECT * FROM dependentParents WHERE advisorId =`,
    getDependentChildren: `SELECT * FROM dependentChildren WHERE advisorId =`,
    getSiblings: `SELECT * FROM contactsSiblings WHERE advisorId =`,
    getFestivals: `SELECT * FROM festivals WHERE advisorId =`,
    getEmergencyDetails: `SELECT * FROM contactEmergencyDetails WHERE advisorId =`,
    getAdvisorFyc: `SELECT * FROM advisorFyc WHERE advisorId =`,
    getAdvisorBonus: `SELECT * FROM advisorBonus WHERE advisorId =`,

};
