const insertDataIntoTable = async (catalystApp, tableName, data) => {
    try {
      const table = catalystApp.datastore().table(tableName);
      const insertedRow = await table.insertRow(data);
      return insertedRow;
    } catch (error) {
      console.error(`Error inserting data into ${tableName}:`, error);
      throw error;
    }
  };
  
  const createDeal = async (catalystApp, dealInfo, claims) => {
    const dealData = {
      // insuranceLeadOwner: dealInfo.insuranceLeadOwner,
      dealOwner: dealInfo.dealOwner,
      insuranceLeadSource: dealInfo.insuranceLeadSource,
      roundRobinProcessed: dealInfo.roundRobinProcessed,
      emailRoundRobinOwner: dealInfo.emailRoundRobinOwner,
      insuranceLeadLookup: dealInfo.insuranceLeadLookup,
      stage: dealInfo.stage,
      locationName: dealInfo.locationName,
      insuranceLead: dealInfo.insuranceLead,
      exchangeRate: dealInfo.exchangeRate,
      reRunRoundRobin: dealInfo.reRunRoundRobin,
      forecastCategory: dealInfo.forecastCategory,
      roundRobinAssignmentTime: dealInfo.roundRobinAssignmentTime,
      phoneBurnerFollowUpDate: dealInfo.phoneBurnerFollowUpDate,
      currency: dealInfo.currency,
      name: dealInfo.dealName,
      type: dealInfo.type,
      layout: "life insurance",
      eligibleRoundRobinOwnerFound: dealInfo.eligibleRoundRobinOwnerFound,
      phoneBurnerLastCallOutcome: dealInfo.phoneBurnerLastCallOutcome,
      areThereTrusteesforThisPolicy: dealInfo.areThereTrusteesforThisPolicy,
      trustDissolutionDate: dealInfo.trustDissolutionDate,
      trustDocumentsReceivedAndUploaded: dealInfo.trustDocumentsReceivedAndUploaded,
      numberOfTrustees: dealInfo.numberOfTrustees,
      applicationOn: dealInfo.applicationOn,
      
      anyCurrentClaimsOnThisPolicy: claims.currentClaims,
      claimAmount: claims.claimAmount,
      anyPastClaimsOnThisPolicy: claims.pastClaims,
      claimClosedOn: claims.claimClosedOn,
      dateOfClaim: claims.dateOfClaim,
      claimOutcome: claims.claimOutcome,
      settlementOrRejectionObservations: claims.observation,
      claimSubmitted: claims.claimSubmitted,
      reasonOfClaim: claims.reasonOfClaim
    };  
    return await insertDataIntoTable(catalystApp, "deals", dealData);
  };  
  const createDealOwnership = async (catalystApp, dealOwnership, dealId) => {
    if (!dealOwnership.dealData || dealOwnership.dealData.length === 0) {      
      return; 
    }
    const dealOwnershipData = dealOwnership.dealData.map(item => ({
      dealId: dealId,
      insuredEmail: item.insuredEmail,
      insuredName: item.insuredName,
      insuredPhone: item.insuredPhone,
      numberOfInsured: item.numberOfInsured
    }));
  
    await catalystApp.datastore().table("dealOwnership").insertRows(dealOwnershipData);
  };
  // createDealConversionHistory
  const createDealConversionHistory = async (catalystApp, LeadMgmt, dealId) => {
    if (!LeadMgmt.LeadData || LeadMgmt.LeadData.length === 0) {      
      return; 
    }
    const dealOwnershipData = LeadMgmt.LeadData.map(item => ({
      dealId: dealId,
      interactionType: item.interactionType,
      timeOfInteraction: item.timeOfInteraction,
      contactAttempt: item.contactAttempt,
      timeSpent: item.timeSpent,
      comments: item.comments
    }));  
    await catalystApp.datastore().table("leadConversionHistory").insertRows(dealOwnershipData);
  };
  // create family tree
  const createfamilyTree = async (catalystApp, FamilyTree, dealId) => {
 
    const fmailyData = {
      dealId: dealId,
      relationShipStatus: FamilyTree.relationShipStatus,
      nameOfSpouse: FamilyTree.nameOfSpouse,
      numberOfSpouse: FamilyTree.numberOfSpouse,
      anniversaryDate: FamilyTree.anniversaryDate,
      spouseDateOfBirth: FamilyTree.spouseDateOfBirth,
      phoneOfSpouse: FamilyTree.phoneOfSpouse,
      emailOfSpouse: FamilyTree.emailOfSpouse,
      nameOfCommonLawPartner: FamilyTree.nameOfCommonLawPartner,
      commonLawDateOfBirth: FamilyTree.commonLawDateOfBirth,
      dependentParents: FamilyTree.dependentParents,
      numberOfDependentParents: FamilyTree.numberOfDependentParents,
      dependentChildren: FamilyTree.dependentChildren,
      numberOfDependentChildren: FamilyTree.numberOfDependentChildren,
      siblings: FamilyTree.siblings,
      numberOfSiblings: FamilyTree.numberOfSiblings,
    }
    return await insertDataIntoTable(catalystApp, "familyTree", fmailyData);
  };
  const dependentChildrenResponse = async (catalystApp, dependentChildren, dealId) => {
    if (!dependentChildren.dependentChildrenData || dependentChildren.dependentChildrenData.length === 0) {      
      return; 
    }
    const dealOwnershipData = dependentChildren.dependentChildrenData.map(item => ({
      dealId: dealId,
      relationship: item.relationship,
      name: item.name,
      dob: item.dob,
      email: item.email,
      phone: item.phone
    }));  
    await catalystApp.datastore().table("dependentChildren").insertRows(dealOwnershipData);
  };
  const dependentParentsResponse = async (catalystApp, dependentParent, dealId) => {
    if (!dependentParent.dependentParentsData || dependentParent.dependentParentsData.length === 0) {      
      return; 
    }
    const dealOwnershipData = dependentParent.dependentParentsData.map(item => ({
      dealId: dealId,
      relationship: item.relationship,
      name: item.name,
      dob: item.dob,
      email: item.email,
      phone: item.phone
    }));  
    await catalystApp.datastore().table("dependentParents").insertRows(dealOwnershipData);
  };
  const siblingDataResponse = async (catalystApp, sibling, dealId) => {
    if (!sibling.siblingData || sibling.siblingData.length === 0) {      
      return; 
    }
    const dealOwnershipData = sibling.siblingData.map(item => ({
      dealId: dealId,
      relationship: item.relationship,
      name: item.name,
      dob: item.dob,
      email: item.email,
      phone: item.phone
    }));  
    await catalystApp.datastore().table("contactsSiblings").insertRows(dealOwnershipData);
  };
  // Emergency contact
  const createContactEmergency = async (catalystApp, contact, dealId) => {
    if (!contact.emergencyContactData || contact.emergencyContactData.length === 0) {      
      return; 
    }
    const dealEmergencyContactData = contact.emergencyContactData.map(item => ({
      dealId: dealId,
      emergencyContactName: item.emergencyContactName,
      emergencyContactPhone: item.emergencyContactPhone,
      emergencyContactRelationship: item.emergencyContactRelationship,
      emergencyContactEmail: item.emergencyContactEmail,
    }));  
    await catalystApp.datastore().table("contactEmergencyDetails").insertRows(dealEmergencyContactData);
  };
  
  const createApplicationCalculations = async (catalystApp, applicationCal, dealId) => {
    const applicationCalData = {
      dealId: dealId,
      monthsLeft: applicationCal.monthsLeft,
      description: applicationCal.description,
      returnAmount: applicationCal.returnAmount,
      isClientTheInsured: applicationCal.isClientTheInsured,
      areThereMultipleInsuredForThisPolicy: applicationCal.areThereMultipleInsuredForThisPolicy
    };
  
    await insertDataIntoTable(catalystApp, "applicationCalculations", applicationCalData);
  };
  
  module.exports = {
    createDeal,
    createDealOwnership,
    createApplicationCalculations,
    insertDataIntoTable,
    createDealConversionHistory,
    dependentChildrenResponse,
    dependentParentsResponse,
    siblingDataResponse,
    createfamilyTree,
    createContactEmergency
  };
  