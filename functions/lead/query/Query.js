module.exports = {
    getleadByid:"SELECT * FROM leads WHERE ROWID =",
    getleadsDescription:"SELECT * FROM leadsDescription WHERE leadId =",
    getFamilyDetails: "SELECT * FROM familyTree WHERE leadId =",
    getdependentParents:"SELECT * FROM dependentParents WHERE leadId =",
    getcontactsSiblings:"SELECT * FROM contactsSiblings WHERE leadId =",
    getfestivals:"SELECT * FROM festivals WHERE leadId =",
    getdependentChildren:"SELECT * FROM dependentChildren WHERE leadId =",
    getcontactEmergencyDetails:"SELECT * FROM contactEmergencyDetails WHERE leadId =",
    
    getAllLeads:`SELECT leads.*, leadService.*,userData.*,advisors.firstName,advisors.lastName,advisors.ROWID FROM leads 
    LEFT JOIN leadService ON leadService.leadId = leads.ROWID 
    LEFT JOIN userData  ON userData.ROWID = leads.insuranceLeadOwner 
    LEFT JOIN advisors ON advisors.ROWID = leads.assignedAdvisor 
    LEFT JOIN leadInformations ON leadInformations.leadId = leads.ROWID 
    ORDER BY CREATEDTIME DESC`,
    deleteLead: "DELETE FROM leads WHERE ROWID IN",

  // <<<<<<<<<<<<<===============SHOBNATH FUNCTIONALITIES ===============>>>>>>>>>>>>>
  getUsers: `SELECT lastName,firstName,ROWID FROM userData LIMIT 300 OFFSET  %PAGENO%`,
  getLocation: `SELECT locationName,ROWID FROM locations LIMIT 300 OFFSET  %PAGENO%`,
  getContact: `SELECT firstName,lastName,ROWID FROM contacts LIMIT 300 OFFSET  %PAGENO%`,
  getAdviors: `SELECT firstName,lastName,ROWID FROM advisors LIMIT 300 OFFSET  %PAGENO%`,
  singleData: `SELECT * FROM %TABLE% WHERE ROWID = %ROWID%`,
  getreferralData: `SELECT referralName,ROWID FROM referralData LIMIT %LIMIT% OFFSET  %OFFSET%`,

  
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