module.exports={
    deleteinsurancepartner:`DELETE FROM insurencePartner where ROWID IN`,
    getinsurance:`SELECT insurencePartner.*,userData.lastName,
    userData.firstName FROM insurencePartner LEFT JOIN userData ON 
    userData.ROWID=insurencePartner.partnerOwner
    ORDER BY CREATEDTIME DESC  LIMIT %LIMIT% OFFSET `,  
    getinsuranceById:`SELECT * from insurencePartner WHERE ROWID =`,

    // ***********CONTACT QUERY ********************
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
    // *********** END CONTACT QUERY *****************


    // ***********GET REFERRAL CLIENT QUERY ********************
    getRefferalClients: `SELECT * FROM contacts WHERE referralLeadId =`,
}