module.exports = {
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
    // NEW QUERY 
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
}