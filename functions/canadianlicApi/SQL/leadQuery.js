module.exports = {
    getleadByid:"SELECT * FROM leads WHERE ROWID =",
    countQuery: `SELECT COUNT(ROWID) AS totalCount FROM leads WHERE  leadStatus !='Converted'`,
    getleadsDescription:"SELECT * FROM leadsDescription WHERE leadId =",
    getFamilyDetails: "SELECT * FROM familyTree WHERE leadId =",
    getdependentParents:"SELECT * FROM dependentParents WHERE leadId =",
    getcontactsSiblings:"SELECT * FROM contactsSiblings WHERE leadId =",
    getfestivals:"SELECT * FROM festivals WHERE leadId =",
    getdependentChildren:"SELECT * FROM dependentChildren WHERE leadId =",
    getcontactEmergencyDetails:"SELECT * FROM contactEmergencyDetails WHERE leadId =",
    
    getAllLeads:`
            SELECT leads.MODIFIEDTIME, leads.CREATEDTIME, leads.ROWID, leads.layoutName, leads.lastName, leads.firstName, 
              leads.insuranceLeadStatus, leads.leadStatusStage, leads.mobile, leads.insuranceLeadSource, leads.phoneNumber, leads.email,
              leadService.gclidData, leadService.ROWID AS leadServiceROWID,
              userData.lastName AS userLastName, userData.email AS userEmail, userData.role, userData.firstName AS userFirstName, userData.ROWID AS userROWID,
              leadInformations.ROWID AS leadInfoROWID, leadInformations.country, leadInformations.zipCode, leadInformations.CREATORID,
              advisors.firstName AS advisorFirstName, advisors.lastName AS advisorLastName, advisors.ROWID AS advisorROWID
        FROM leads
        LEFT JOIN leadService ON leadService.leadId = leads.ROWID 
        LEFT JOIN userData ON userData.ROWID = leads.insuranceLeadOwner 
        LEFT JOIN advisors ON advisors.ROWID = leads.assignedAdvisor 
        LEFT JOIN leadInformations ON leadInformations.leadId = leads.ROWID 
        WHERE leads.leadStatus != 'converted' 
        %SEARCH_CONDITION%  ORDER BY CREATEDTIME DESC LIMIT %LIMIT% OFFSET %OFFSET% `,  
          
    deleteLead: "DELETE FROM leads WHERE ROWID IN",
  
  leadRelatedData:`SELECT leads.*,leadsDescription.*,leadService.*, familyTree.* ,leadInformations.* FROM leads
    LEFT JOIN leadsDescription ON  leadsDescription.leadId=leads.ROWID
    LEFT JOIN leadService ON  leadService.leadId=leads.ROWID
    LEFT JOIN familyTree ON  familyTree.leadId=leads.ROWID
    LEFT JOIN leadInformations ON leadInformations.leadId=leads.ROWID
    WHERE leads.ROWID =
    `,  
    depChildren:`SELECT * FROM dependentChildren WHERE leadId=`,
    depParents:`SELECT * FROM dependentParents WHERE leadId=`,
    contSiblings:`SELECT * FROM contactsSiblings WHERE leadId=`,
    contEmergency:`SELECT * FROM contactEmergencyDetails WHERE leadId=`,
    festivals:`SELECT * FROM festivals WHERE leadId=`,
    leadConvHis:`SELECT * FROM leadConversionHistory WHERE leadId=`,
}