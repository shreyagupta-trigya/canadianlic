module.exports = {

    // <<<<<<<<<<<<<===============NEW FUNCTIONALITIES ===============>>>>>>>>>>>>>
    getLeads: `SELECT firstName,lastName,ROWID FROM leads LIMIT 300 OFFSET %PAGENO%`,
    getUsers: `SELECT lastName,firstName,ROWID FROM userData LIMIT 300 OFFSET  %PAGENO%`,
    getLocation: `SELECT locationName,ROWID FROM locations LIMIT 300 OFFSET  %PAGENO%`,
    getContact: `SELECT firstName,lastName,ROWID FROM contacts LIMIT 300 OFFSET  %PAGENO%`,
    getAdviors: `SELECT firstName,lastName,ROWID FROM advisors LIMIT 300 OFFSET  %PAGENO%`,
    singleData: `SELECT * FROM %TABLE% WHERE ROWID = %ROWID%`,

    contactRelatedData: `SELECT contacts.*,contactSubDetails.*,familyTree.*,leadInformations.*
      FROM contacts
      LEFT JOIN contactSubDetails ON contactSubDetails.contactId = contacts.ROWID
      LEFT JOIN familyTree ON familyTree.contactId = contacts.ROWID
      LEFT JOIN leadInformations ON leadInformations.contactId = contacts.ROWID
      WHERE contacts.ROWID =`,
      getContactEmergencyDetails: `SELECT * FROM contactEmergencyDetails WHERE contactId =`,
      getDependentChildren: `SELECT * FROM dependentChildren WHERE contactId =`,
      getDependentParents: `SELECT * FROM dependentParents WHERE contactId =`,
      getContactsSiblings: `SELECT * FROM contactsSiblings WHERE contactId =`,
      getcontactConversionHistory: `SELECT * FROM contactConversionHistory WHERE contactId =`,
     festivals: `SELECT * FROM festivals WHERE contactId =`,
     getLeadConversionHistory: `SELECT * FROM leadConversionHistory WHERE contactId =`,
  };
  