module.exports = {

    // <<<<<<<<<<<<<===============NEW FUNCTIONALITIES ===============>>>>>>>>>>>>>
    getLeads: `SELECT firstName,lastName,ROWID FROM leads LIMIT 300 OFFSET %PAGENO%`,
    getUsers: `SELECT lastName,firstName,ROWID FROM userData LIMIT 300 OFFSET  %PAGENO%`,
    getLocation: `SELECT locationName,ROWID FROM locations LIMIT 300 OFFSET  %PAGENO%`,
    getContact: `SELECT firstName,lastName,ROWID FROM contacts LIMIT 300 OFFSET  %PAGENO%`,
    getAdviors: `SELECT firstName,lastName,ROWID FROM advisors LIMIT 300 OFFSET  %PAGENO%`,
    singleData: `SELECT * FROM %TABLE% WHERE ROWID = %ROWID%`,

    policyRelatedData: `SELECT policies.*,policySubDetails.*,supervisaPolicySubDetails.*,annuitantAndTracking.*
          FROM policies
          LEFT JOIN policySubDetails ON policies.ROWID = policySubDetails.policiesId
          LEFT JOIN supervisaPolicySubDetails ON policies.ROWID = supervisaPolicySubDetails.policyId
          LEFT JOIN annuitantAndTracking ON policies.ROWID = annuitantAndTracking.policyId
          WHERE ROWID = `,
    getBeneficiary: `SELECT * FROM beneficiary WHERE policyId =`,
    getContingentBeneficiary: `SELECT * FROM contingentBeneficiary WHERE policyId =`,
    getCrustees: `SELECT * FROM trustees WHERE policyId =`,
    getPolicyOwnership: `SELECT * FROM policyOwnership WHERE policyId =`,
    getPolicyCommission: `SELECT * FROM policyCommission WHERE policyId =`,
    getRenewalsHistory: `SELECT * FROM renewalsHistory WHERE policyId =`,
    getPastClaims: `SELECT * FROM pastClaims WHERE policyId =`,
    getinBasket: `SELECT * FROM inBasket WHERE policyId =`,
    
  };
  