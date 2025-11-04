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
  
  const createDeal = async (catalystApp, formData, dealInfo, claims) => {
    console.log(formData);
    const dealData = {
      // insuranceLeadOwner: dealInfo.insuranceLeadOwner,
      dealName: dealInfo.dealName ? dealInfo.dealName : null,
      dealOwner: dealInfo.dealOwner ? dealInfo.dealOwner : null,
      insuranceLeadSource: dealInfo.insuranceLeadSource ? dealInfo.insuranceLeadSource: null,
      currency: dealInfo.currency ? dealInfo.currency : null,
      // insuranceLeadLookup: dealInfo.insuranceLeadLookup ? dealInfo.insuranceLeadLookup : 'Null',
      nextFollowUpDate: dealInfo.nextFollowUpDate ? dealInfo.nextFollowUpDate : null,
      stage: dealInfo.stage ? dealInfo.stage :'',
      contactName: dealInfo.contactName ? dealInfo.contactName : null,
      forecastCategory: dealInfo.forecastCategory ? dealInfo.forecastCategory : '',
      locationName: dealInfo.locationName ? dealInfo.locationName : null,
      insuranceLead: dealInfo.insuranceLead ? dealInfo.insuranceLead: null,
      exchangeRate: dealInfo.exchangeRate ? dealInfo.exchangeRate: '',
      roundRobinAssignmentTime: dealInfo.roundRobinAssignmentTime ? dealInfo.roundRobinAssignmentTime: '',
      phoneBurnerFollowUpDate: dealInfo.phoneBurnerFollowUpDate ? dealInfo.phoneBurnerFollowUpDate: null,
      phoneBurnerLastCallTime: dealInfo.phoneBurnerLastCallTime ? dealInfo.phoneBurnerLastCallTime: '',
      emailRoundRobinOwner: dealInfo.emailRoundRobinOwner ? dealInfo.emailRoundRobinOwner: false,
      reRunRoundRobin: dealInfo.reRunRoundRobin ? dealInfo.reRunRoundRobin: false,
      roundRobinProcessed: dealInfo.roundRobinProcessed ? dealInfo.roundRobinProcessed: false,
      eligibleRoundRobinOwnerFound: dealInfo.eligibleRoundRobinOwnerFound ? dealInfo.eligibleRoundRobinOwnerFound: false,
      type: dealInfo.type ? dealInfo.type: '',
      layout: formData.layout ? formData.layout: '',
      phoneBurnerLastCallOutcome: dealInfo.phoneBurnerLastCallOutcome ? dealInfo.phoneBurnerLastCallOutcome: '',
      areThereTrusteesforThisPolicy: dealInfo.areThereTrusteesforThisPolicy ? dealInfo.areThereTrusteesforThisPolicy:'',
      trustDissolutionDate: dealInfo.trustDissolutionDate ? dealInfo.trustDissolutionDate: null,
      trustDocumentsReceivedAndUploaded: dealInfo.trustDocumentsReceivedAndUploaded ? dealInfo.trustDocumentsReceivedAndUploaded: '',
      numberOfTrustees: dealInfo.numberOfTrustees ? dealInfo.numberOfTrustees: '',
       applicationOn: dealInfo.applicationOn ? new Date(dealInfo.applicationOn): null,  
       applicationOn: dealInfo.applicationOn ? dealInfo.applicationOn: null ,           
      anyCurrentClaimsOnThisPolicy: claims.currentClaims ?claims.currentClaims: null,
      claimAmount: claims.claimAmount ?claims.claimAmount: null,
      anyPastClaimsOnThisPolicy: claims.pastClaims ? claims.pastClaims:'',
      claimClosedOn: claims.claimClosedOn ?claims.claimClosedOn: null,
      dateOfClaim: claims.dateOfClaim ? claims.dateOfClaim : null,
      claimOutcome: claims.claimOutcome ?claims.claimOutcome : '',
      settlementOrRejectionObservations: claims.settlementOrRejectionObservations,
      claimSubmitted: claims.claimSubmitted ? claims.claimSubmitted : false,
      reasonOfClaim: claims.reasonOfClaim ? claims.reasonOfClaim : '',
      isClientTheInsured: formData.DealOwnership.isClientTheInsured ? formData.DealOwnership.isClientTheInsured : '',
      areThereMultipleInsuredForThisPolicy: formData.DealOwnership.areThereMultipleInsuredForThisPolicy ? formData.DealOwnership.areThereMultipleInsuredForThisPolicy : '',
      // new fields
      lifeInsurance: formData.DealOwnership.lifeInsurance ? formData.DealOwnership.lifeInsurance : '',

    };  
    return await insertDataIntoTable(catalystApp, "deals", dealData);
    
  };  
  
  const createFacebook =  async(catalystApp, facebook, dealId) =>{
    if (!facebook || facebook.length === 0) {      
      return; 
    }
    const facebookData = {
      dealId: dealId,
      // add new missing filed --By bipasha
      understandingOfInsurance: formData.understandingOfInsurance ?formData.understandingOfInsurance :'',
      coverage: formData.coverage ?formData.coverage :'',
      existingInsurancePolicy: formData.existingInsurancePolicy ?formData.existingInsurancePolicy :'',
      // genderPrediction: formData.genderPrediction ?formData.genderPrediction :'',
      


      //end fields
            skypeId: facebook.skypeId ? facebook.skypeId: '',
      instagramId: facebook.instagramId ? facebook.instagramId: '',
      linkedinId: facebook.linkedinId ? facebook.linkedinId : '',
      twitterId: facebook.twitterId ? facebook.twitterId: '',
      leadFormId: facebook.leadFormId ? facebook.leadFormId: '',
      leadForm: facebook.leadForm ? facebook.leadForm: '',
      adId: facebook.adId ? facebook.adId: '',
      facebookAd: facebook.facebookAd ? facebook.facebookAd: '',
      adSetId: facebook.adSetId ? facebook.adSetId: '',
      adSet: facebook.adSet ? facebook.adSet: '',
      caDollar: facebook.caDollar ? facebook.caDollar: '',
      costPerLead: facebook.costPerLead ? facebook.costPerLead: '',
      faceBookPageId: facebook.faceBookPageId ? facebook.faceBookPageId: '',
      faceBookPage: facebook.faceBookPage ? facebook.faceBookPage: '',
      adCampaignId: facebook.adCampaignId ? facebook.adCampaignId: '',
      adCampaign: facebook.adCampaign ? facebook.adCampaign: '',
      adAccountId: facebook.adAccountId ? facebook.adAccountId: '',
      adAccount: facebook.adAccount ? facebook.adAccount: '',
    }
    return await insertDataIntoTable(catalystApp, "dealInformation", facebookData);
  }
  const createPolicyTracking =  async(catalystApp, policyTracking, dealId) =>{
    if (!policyTracking || policyTracking.length === 0) {      
      return; 
    }
    const policyTrackingData = {
      dealId: dealId,
      applicationInitiatedOn: policyTracking.applicationInitiatedOn ? policyTracking.applicationInitiatedOn: null,
      nextFollowUpDate: policyTracking.nextFollowUpDate ? new Date(policyTracking.nextFollowUpDate): null,
      amendmentRequestedDate: policyTracking.amendmentRequestedDate ? new Date(policyTracking.amendmentRequestedDate): null,
      applicationConfirmationNumber: policyTracking.applicationConfirmationNumber ? policyTracking.applicationConfirmationNumber: '',
      amendmentCompletedDate: policyTracking.amendmentCompletedDate ? new  Date(policyTracking.amendmentCompletedDate): null,
      // applicationMedicalAppointment: policyTracking.applicationMedicalAppointment ? policyTracking.applicationMedicalAppointment: '',
      applicationCancelled: policyTracking.applicationCancelled ? policyTracking.applicationCancelled: null,
      applicationPostponed: policyTracking.applicationPostponed ? policyTracking.applicationPostponed: null,
      policyDeclinedDate: policyTracking.policyDeclinedDate ? policyTracking.policyDeclinedDate: null,
      startDate: policyTracking.startDate ? new Date(policyTracking.startDate): null,
      policyPickedUp: policyTracking.policyPickedUp ? new Date(policyTracking.policyPickedUp): null,
      policyIssuedDate: policyTracking.policyIssuedDate ? new Date(policyTracking.policyIssuedDate): null,
      amendmentRequestedFor: policyTracking.amendmentRequestedFor ? new Date(policyTracking.amendmentRequestedFor): null,
      policyDeclinedReason: policyTracking.policyDeclinedReason ? policyTracking.policyDeclinedReason: '',
      applicationMedicalRequirement: policyTracking.applicationMedicalRequirement ? policyTracking.applicationMedicalRequirement: '',
      approvalRating: policyTracking.approvalRating ? policyTracking.approvalRating: '',
      pickupPeriod: policyTracking.pickupPeriod ? policyTracking.pickupPeriod: '',
     
    }
    return await insertDataIntoTable(catalystApp, "dealPolicyTracking", policyTrackingData);
  }
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
      monthsLeft: applicationCal.monthsLeft ? applicationCal.monthsLeft: '',
      policyCommision: applicationCal.policyCommision ? applicationCal.policyCommision: '',
      description: applicationCal.description ? applicationCal.description : '',
      returnAmount: applicationCal.returnAmount ? applicationCal.returnAmount: '',
      netAdvisorCommision: applicationCal.netAdvisorCommision ? applicationCal.netAdvisorCommision: '',
      netCorporateCommision: applicationCal.netCorporateCommision ? applicationCal.netCorporateCommision: '',
      isClientTheInsured: applicationCal.isClientTheInsured ? applicationCal.isClientTheInsured:'',
      areThereMultipleInsuredForThisPolicy: applicationCal.areThereMultipleInsuredForThisPolicy ? applicationCal.areThereMultipleInsuredForThisPolicy: '',
    };
  
    await insertDataIntoTable(catalystApp, "applicationCalculations", applicationCalData);
  };
  
  module.exports = {
    createDeal,
    createDealOwnership,
    createPolicyTracking,
    createFacebook,
    createApplicationCalculations,
    insertDataIntoTable,
    createDealConversionHistory,
    dependentChildrenResponse,
    dependentParentsResponse,
    siblingDataResponse,
    createfamilyTree,
    createContactEmergency
  };
  