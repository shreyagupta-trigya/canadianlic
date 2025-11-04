const catalyst = require("zcatalyst-sdk-node");
const NodeCache = require("node-cache");
const searchQueryBuilder = require("./Util/searchQueryBuilder");
const { createObjectCsvStringifier } = require("csv-writer"); 
const Node = new NodeCache();
const {
  insertDataIntoTable,
  insertMultipleRowsIntoTable,
  deleteDataFromTable,
  updateSubFormData,
  deleteById,
  decryptData,
  filterContactData,
} = require("./utils");
const {client,sample} = require("./exports");
exports.testConnection = async(req, res) =>{
res.status(200).json({success:true, message: "Connection established"})
};
exports.createNewContact = async (req, res) => {
  const formData = req.body;
  // console.log("formData", formData);
  try {
    // Initialize Catalyst
    const catalystApp = catalyst.initialize(req, { scope: "admin" });

    // Insert the new contact into the "contacts" table
    const contactResult = await insertDataIntoTable(catalystApp, "contacts", {
      contactOwner: formData.contactOwner ? formData.contactOwner: null,
      dealStageTracking: formData.dealStageTracking ? formData.dealStageTracking: '',
      insuranceLeadsSource: formData.insuranceLeadSource ? formData.insuranceLeadSource: '',
      status: formData.status ? formData.status: '',
      lead: formData.lead ? formData.lead: '',
      firstName: formData.firstName ? formData.firstName: '',
      lastName: formData.lastName ? formData.lastName: '',
      oldDatabaseLead: formData.oldDatabaseLead ? formData.oldDatabaseLead: '',
      emailRoundRobinOwner: formData.emailRoundRobinOwner ? formData.emailRoundRobinOwner: false,

      mobile: formData.mobile ?formData.mobile: null,
      clientAddress: formData.clientAddress ? formData.clientAddress: '',
      email: formData.email ? formData.email: '',
      advisorModuleName: formData.advisorModuleName ? formData.advisorModuleName: '',
      parentClient: formData.parentClient ? formData.parentClient: '',
      clients1stPolicyIssuedOn: formData.clientPolicyIssueOn ? new Date(formData.clientPolicyIssueOn): null ,
      onBoardedAnniversary6th: formData.sixthOnBoardedAnniversary ? formData.sixthOnBoardedAnniversary: '',
      dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth): null ,
      preferredContactMethod: formData.preferredContactMethod  ? formData.preferredContactMethod: null ,
      preferredContactTime: formData.preferredContactTime ? formData.preferredContactTime: null,
      gender: formData.gender ? formData.gender : '',
      leadCreatedOn: formData.leadCreatedOn ? new Date(formData.leadCreatedOn): null,
      doYouHaveACorporation: formData.doYouHaveCorporations ? formData.doYouHaveCorporations: '',
      doesYourCorporationHaveAGroupPolicy:formData.doesYourCorporationHaveGroupPolicy ? formData.doesYourCorporationHaveGroupPolicy: '',
      leadStatusOnConversion: formData.leadStatusOnConversion ? formData.leadStatusOnConversion: '',
      leadConvertedOn: formData.leadConvertedOn ? new Date(formData.leadConvertedOn): null ,
      leadCreatedTime: formData.leadCreatedTime ? formData.leadCreatedTime: null,
      layout: formData.layout ? formData.layout: null,
      currency: formData.currency ?formData.currency : null,
      exchangeRate: formData.exchangeRate ?formData.exchangeRate: null,
      onBoardedAnniversary3rd: formData.thirdOnBoardAnniversary ? formData.thirdOnBoardAnniversary: null,
      onBoardedAnniversary9th: formData.ninthOnBoardAnniversary ? formData.ninthOnBoardAnniversary: null,
      socialMediaInformation: formData.socialMediaInformation ? formData.socialMediaInformation: null,
      understandingOfInsurance: formData.understandingOfInsurance ? formData.understandingOfInsurance: null,
      netWorth: formData.netWorth ? formData.understandingOfInsurance: null,
      roundRobinAssignmentTime: formData.roundRobinAssignmentTime ? formData.roundRobinAssignmentTime: null,
      roundRobinAssignmentDate: formData.roundRobinAssignmentDate ? formData.roundRobinAssignmentDate: null,
      emailIsValid: formData.emailIsValid ? formData.emailIsValid: null,
      leadsScore: formData.leadScore ? formData.leadScore: null,
      clvCorporateCommission: formData.clvCorporateCommision ? formData.clvCorporateCommision: null,
      lastCLVCorporate: formData.lastClvCorporate ? formData.lastClvCorporate: null,
      clvAdvisorCommission: formData.clvAdvisorCommision ?formData.clvAdvisorCommision : null,
      lastCLVAdvisor: formData.lastClvAdvisor ? formData.lastClvAdvisor: null,
      emailOptOut: formData.emailOptOut ? formData.emailOptOut: null,
      roundRobinProcessed: formData.roundRobinProcessed ? formData.roundRobinProcessed: null,
      reRoundRobinProcessed: formData.reRoundRobinProcessed ? formData.reRoundRobinProcessed: null,
      eligibleRoundRobinOwnerFound: formData.eligibleRoundRobinOwnerFound ? formData.eligibleRoundRobinOwnerFound: null,
      rcSMSOptOut: formData.rcSmsOptOut ? formData.rcSmsOptOut: null,
      // additionalContactInformation:formData.additionalContactInformation
    });

    console.log("contactResult=====>", contactResult)
    // // // // Insert the contactSubDetails into the "contactSubDetails" table
    const contactSubDetailsResult = await insertDataIntoTable(
      catalystApp,
      "contactSubDetails",

      {
        contactId: contactResult.ROWID,
        serviceAvailedOptions: formData.serviceAvailedOptions ? formData.serviceAvailedOptions: '',
        lifeInsurance: formData.lifeInsurance ?formData.lifeInsurance: '',

        lifeBenefits: formData.lifeBenefits ? formData.lifeBenefits: '',
        serviceAvailedLoanProtection: formData.serviceAvailedLoanProtection ? formData.serviceAvailedLoanProtection: '',
        serviceAvailedTravelInsurance: formData.serviceAvailedTravelInsurance ? formData.serviceAvailedTravelInsurance: '',
        investment: formData.investment ? formData.investment: '',
        groupInsurance: formData.groupInsurance ? formData.groupInsurance: '',
        serviceAvailedhealthAndDentalInsurance: formData.serviceAvailedhealthAndDentalInsurance ? formData.serviceAvailedhealthAndDentalInsurance: false,
        combinationOrHybridInsurance: formData.combinationOrHybridInsurance ?formData.combinationOrHybridInsurance: false,

        // Repeat Business information

        servicesAvailedUpdated: formData.serviceAvailedUpdated ? formData.serviceAvailedUpdated: '' ,
        newServiceRequested: formData.newServiceRequested ? formData.newServiceRequested: '',
        processStage: formData.processStage ? formData.processStage: '',
        otherServiceRequested: formData.otherServiceRequested ? formData.otherServiceRequested:'',
        dateNewServiceRequested: formData.dateNewServiceRequested ? formData.dateNewServiceRequested: '',
        nextFollowUpDateTime: formData.nextFollowUpDateAndTime ? new Date(formData.nextFollowUpDateAndTime): null,

        // Potential Business (Max Capability)

        potentialBusinessTravelInsurance:formData.potentialBusinessTravelInsurance ? formData.potentialBusinessTravelInsurance: false,
        resp: formData.resp ? formData.resp: false,
        rrspTfsa: formData.rrspTfsa ? formData.rrspTfsa: false,
        potentialBusinessHealthAndDentalInsurance: formData.potentialBusinessHealthAndDentalInsurance ? formData.potentialBusinessHealthAndDentalInsurance: false,
        otherInvestments: formData.otherInvestments ? formData.otherInvestments: false,
        potentialBusinessLoanProtection: formData.potentialBusinessLoanProtection ? formData.potentialBusinessLoanProtection: false,
        otherLivingBenefits: formData.otherLivingBenefits ? formData.otherLivingBenefits: false,
        potentialBusinessCriticalIllness:formData.potentialBusinessCriticalIllness ? formData.potentialBusinessCriticalIllness: false,
        potentialBusinessLifeInsurance: formData.potentialBusinessLifeInsurance ? formData.potentialBusinessLifeInsurance: false,
        potentialDependent: formData.potentialDependent ? formData.potentialDependent: false,
        maxNumberOfPotentialProduct: formData.maxNumberOfPotentialProduct ? formData.maxNumberOfPotentialProduct:'',
        maxNumberOfPotentialProductApplicable: formData.maxNumberOfPotentialProductApplicable? formData.maxNumberOfPotentialProductApplicable:'',
        clientRating: formData.clientRating ? formData.clientRating:'',
        potentialBusinessPolicyValues: formData.potentialBusinessPolicyValues ? formData.potentialBusinessPolicyValues: '',

        // Pending Potential Business (Still not Sold)

        numberOfProductRemaining: formData.numberOfProductRemaining ? formData.numberOfProductRemaining:'',
        potentialDependentCompleted: formData.potentialDependentCompleted ? formData.potentialDependentCompleted: false,
        pendingPotentialBusinesslifeInsurance: formData.pendingPotentialBusinesslifeInsurance ?formData.pendingPotentialBusinesslifeInsurance: false,
        dependentLifeIns: formData.dependentLifeIns ? formData.dependentLifeIns: false,
        pendingPotentialBusinessCriticalIllness: formData.dependentCriticalIns ? formData.dependentCriticalIns: false,
        pendingPotentialBusinessHealthAndDentalInsurances: formData.pendingPotentialBusinessHealthAndDentalInsurances ? formData.pendingPotentialBusinessHealthAndDentalInsurances: false,
        pendingPotentialBusinessTravelInsurance: formData.pendingPotentialBusinessTravelInsurance ? formData.pendingPotentialBusinessTravelInsurance: false,
        pendingPotentialBusinessResp: formData.pendingPotentialBusinessResp ? formData.pendingPotentialBusinessResp: false,

        rrspTfsaMutualFundsSegFunds: formData.rrspTfsaMutualFundsSegFunds ? formData.rrspTfsaMutualFundsSegFunds: false,
        ppbOtherInvestments: formData.ppbOtherInvestments ? formData.ppbOtherInvestments: false,
        ppbLoanProtection: formData.ppbLoanProtection ? formData.ppbLoanProtection: false,
        ppbOtherLivingBenefits: formData.ppbOtherLivingBenefits ? formData.ppbOtherLivingBenefits: false,

        // Business Insurance Potential Revenue Map

        serviceOffering: formData.serviceOffering ? formData.serviceOffering:'',

        // Ethnicity
        religion: formData.religion ? formData.religion:'',
        celebratedFestivals: formData.celebratedFestivals ? formData.celebratedFestivals: '',

        //  Address Informations
        mailingStreet: formData.mailingStreet ?  formData.mailingStreet: '',
        mailingCity: formData.mailingCity ? formData.mailingCity: '',

        mailingState: formData.mailingState ? formData.mailingState: '',
        mailingZip: formData.mailingZip ? formData.mailingZip: null,
        mailingCountry: formData.mailingCountry ? formData.mailingCountry : '',
        otherStreet: formData.otherStreet ? formData.otherStreet : '',
        otherCity: formData.otherCity ? formData.otherCity: '',
        otherState: formData.otherState ? formData.otherState: '',
        otherCountry: formData.otherCountry ? formData.otherCountry:'',
      }
    );
    console.log("contactSubDetailsResult=======>", contactSubDetailsResult);
    // // // // // Insert family details into the "familyTree" table
    const familyResult = await insertDataIntoTable(catalystApp, "familyTree", {
      contactId: contactResult.ROWID,
      relationShipStatus: formData.relationShipStatus ? formData.relationShipStatus: '',
      numberOfSpouse: formData.numberOfSpouse ? formData.numberOfSpouse: null,
      anniversaryDate: formData.anniversaryDate ? new Date(formData.anniversaryDate): null,
      nameOfSpouse: formData.nameOfSpouse ? formData.nameOfSpouse: null,
      spouseDateOfBirth: formData.spouseDateOfBirth ? new Date(formData.spouseDateOfBirth): null,
      phoneOfSpouse: formData.phoneOfSpouse ? formData.phoneOfSpouse: null,
      emailOfSpouse: formData.emailOfSpouse ? formData.emailOfSpouse: null,
      nameOfCommonLawPartner: formData.nameOfCommonLawPartner ?formData.nameOfCommonLawPartner: null,
      commonLawDateOfBirth: formData.commonLawDateOfBirth ? new Date(formData.commonLawDateOfBirth): null,
      dependentParents: formData.dependentParents ? formData.dependentParents:'',
      numberOfDependentParents: formData.numberOfDependentParents ? formData.numberOfDependentParents:'',
      dependentChildren: formData.dependentChildren ? formData.dependentChildren:'',
      numberOfDependentChildren: formData.numberOfDependentChildren ? formData.numberOfDependentChildren: null,
      siblings: formData.siblings ? formData.siblings: '',
      numberOfSiblings: formData.numberOfSiblings ? formData.numberOfSiblings:'',
      // emergencyinfo: formData.emergencyinfo,
      // emergencyContactName: formData.emergencyContactName,
      // emergencyContactPhone: formData.emergencyContactPhone,
      // emergencyContactRelationship: formData.emergencyContactRelationship,
      // emergencyContactEmail: formData.emergencyContactEmail,
    });

    // // // Insert leadInformations details into the "leadInformations" table
    const leadInformationsResult = await insertDataIntoTable(
      catalystApp,
      "leadInformations",

      {
        contactId: contactResult.ROWID,
        bestTimeToCall: formData.bestTimeToCall ? formData.bestTimeToCall: '' ,
        dateOfBirth1: formData.dateOfBirth1 ? new Date(formData.dateOfBirth1): null,
        ifreferredbyAdvisor: formData.ifReferredByAdvisorOrExternal ? formData.ifReferredByAdvisorOrExternal: '',
        isthisAReassignment: formData.isThisReassignment ? formData.isThisReassignment:'' ,
        referredBy: formData.referredBy ? formData.referredBy: '',
        investments1: formData.investment1 ? formData.investment1:'',
        preferredContactMethod2: formData.preferredContactMethod2 ? formData.preferredContactMethod2: '',
        preferredContactTime2: formData.preferredContactTime2 ?formData.preferredContactTime2: '',
        citizenshipStatus1: formData.citizenshipStatus1 ? formData.citizenshipStatus1: '',
        understandingOfInsurance1: formData.understandingOfInsurance1 ? formData.understandingOfInsurance1: '',
        existingInsurancePolicy2: formData.existingInsurancePolicy2 ? formData.existingInsurancePolicy2:'',
        doYouOwnAHomeInCanada: formData.doYouOwnHomeInCananda ? formData.doYouOwnHomeInCananda: ''  ,
        existingPolicyRenewalDueBy: formData.existingRenewalPolicyDueBy ?  new Date(formData.existingRenewalPolicyDueBy): null,
        doYouHavelifeInsurance: formData.doYouHaveLifeInsurance ? formData.doYouHaveLifeInsurance: '',
        coverageYouAreLookingFor: formData.coverageYouAreLookingFor ? formData.coverageYouAreLookingFor: '',
        submitPageURL: formData.submitPageUrl ? formData.submitPageUrl: '',
        assignedCampaigns: formData.assignedCampaigns ? formData.assignedCampaigns: '',
        state: formData.state ? formData.state: '',
        zipCode: formData.zipCode ? formData.zipCode: '',
        twitter1: formData.twitter1 ? formData.twitter1: '',
        skypeID1: formData.skypeId1 ? formData.skypeId1 : '',
        instagram1: formData.instagram1 ? formData.instagram1:'',
        insuranceLeadsScoringScore: formData.insuranceLeadScore ? formData.insuranceLeadScore: '',
        insuranceLeadScoringPositiveScore: formData.insuranceLeadScoringPositiveScore ? formData.insuranceLeadScoringPositiveScore: '',
        insuranceLeadScoringNegativeTouchPointScore: formData.insuranceLeadScoringNegativeTouchPointScore ? formData.insuranceLeadScoringNegativeTouchPointScore:'',
        gender1: formData.gender1 ? formData.gender1: '',
        additionalContactInformation: formData.leadInfoAdditionalContactInformation ? formData.leadInfoAdditionalContactInformation:'',
        networth2: formData.networth2 ? formData.networth2: '',
        databaseLead1: formData.databaseLead1 ? formData.databaseLead1: '',
        genderPrediction1: formData.genderPrediction1 ? formData.genderPrediction1: '',
        exchangeRate1: formData.exchangeRate1 ? formData.exchangeRate1: '',
        currency1: formData.currency1 ? formData.currency1: '',
        // roundRobinAssignmentTime1: `${formData.roundRobinAssignmentTime1}`,
        leadCreatedOn1: formData.leadCreatedOn1 ? formData.leadCreatedOn1: '',
        street: formData.street ? formData.street: '',
        city: formData.city ? formData.city: '',
        country: formData.country ? formData.country: '',
        linkdin1: formData.linkdin1 ? formData.linkdin1: '',
        facebook1: formData.facebook1 ? formData.facebook1:'',
        facebookAdInformation: formData.facebookAdInformation ? formData.facebookAdInformation: '',
        servicesRequested: formData.servicesRequested ? formData.servicesRequested: '',
        insuranceLeadScoringTouchPointScore: formData.insuranceLeadScoringTouchPointScore ? formData.insuranceLeadScoringTouchPointScore:'',
        insuranceLeadScoringPositiveTouchPointScore: formData.insuranceLeadsScoringPositiveTouchPointScore ? formData.insuranceLeadsScoringPositiveTouchPointScore:'',
        insuranceLeadScoringNegativeScore: formData.insuranceLeadsScoringNegativeScore ? formData.insuranceLeadsScoringNegativeScore:'',

        oldDatabaseLead1: formData.oldDatabaseLead1 ? formData.oldDatabaseLead1:'',
      }
    );

    console.log("leadInformationsResult ===>", leadInformationsResult)
    // inserting into subforms
    let dependentParentsResult;
    if (
      formData.dependentParentsData &&
      formData.dependentParentsData.length > 0
    ) {
      dependentParentsResult = await insertMultipleRowsIntoTable(
        "dependentParents",
        formData.dependentParentsData,
        req,
        contactResult
      );
    }
    let dependentChildrenResult;
    if (
      formData.dependentChildrenData &&
      formData.dependentChildrenData.length > 0
    ) {
      dependentChildrenResult = await insertMultipleRowsIntoTable(
        "dependentChildren",
        formData.dependentChildrenData,
        req,
        contactResult
      );
    }
    let siblingsResults;

    if (formData.siblingData && formData.siblingData.length > 0) {
      siblingsResults = await insertMultipleRowsIntoTable(
        "contactsSiblings",
        formData.siblingData,
        req,
        contactResult
      );
    }
    let referralScoreCardResult;
    if (
      formData.referralScoreCardData &&
      formData.referralScoreCardData.length > 0
    ) {
      referralScoreCardResult = await insertMultipleRowsIntoTable(
        "referralScoreboard",
        formData.referralScoreCardData,
        req,
        contactResult
      );
    }
    let leadConversionHistoryResult;

    if (
      formData.leadConversionHistoryData &&
      formData.leadConversionHistoryData.length > 0
    ) {
      leadConversionHistoryResult = await insertMultipleRowsIntoTable(
        "leadConversionHistory",
        formData.leadConversionHistoryData,
        req,
        contactResult
      );
    }

    let festivalResult;
    if (formData.festivalsData && formData.festivalsData.length > 0) {
      festivalResult = await insertMultipleRowsIntoTable(
        "festivals",
        formData.festivalsData,
        req,
        contactResult
      );
    }
    let emergencyContactResult;
    if (formData.emergencyContactData && formData.emergencyContactData.length > 0) {
      emergencyContactResult = await insertMultipleRowsIntoTable(
        "contactEmergencyDetails",
        formData.emergencyContactData,
        req,
        contactResult
      );
    }
    // Construct response data with created record details
    const responseData = {
      contact: contactResult,
      contactSubDetails: contactSubDetailsResult,
      family: familyResult,
      leadInformationsResult: leadInformationsResult,
      dependentParents: dependentParentsResult,
      dependentChildrenResult: dependentChildrenResult,
      siblings: siblingsResults,
      referralScoreCard: referralScoreCardResult,

      leadConversionHistory: leadConversionHistoryResult,
      festival: festivalResult,
      emergencyContactResult: emergencyContactResult,
    };
    Node.del("contactList")
    // Send success response with created record details
    res.status(201).json({
      success: true,
      message: "Contact, contactSubDetails, and family created successfully",
      responseData,
    });

  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error creating contact:", error);
    // Send error response with error details
    res.status(409).json({
      success: false,
      message: "Failed to create contact",
      error: error, // Include error message for better error reporting
    });
  }
};

exports.getAllContactsDataById = async (req, res) => {
  const adminApp = catalyst.initialize(req, { scope: "admin" });

  try {
    if (req.params.id) {
      console.log(req.params.id);
      const contactResult = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from contacts Where ROWID=${req.params.id}`
        );
      const contactSubDetails = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from contactSubDetails Where contactId=${req.params.id}`
        );
      const faimlyTree = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from familyTree Where contactId=${req.params.id}`
        );
      const dependentParents = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from dependentParents Where contactId=${req.params.id}`
        );
      // console.log(dependentParents);
      const contactsSiblings = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from contactsSiblings Where contactId=${req.params.id}`
        );

      const leadConversionHistory = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from leadConversionHistory Where contactId=${req.params.id}`
        );
      const referralScoreboard = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from referralScoreboard Where contactId=${req.params.id}`
        );
      const festivals = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from festivals Where contactId=${req.params.id}`
        );
      const leadInformations = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from leadInformations Where contactId=${req.params.id}`
        );
      const dependentChildren = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from dependentChildren Where contactId=${req.params.id}`
        );
      const emergencyContact = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from contactEmergencyDetails Where contactId=${req.params.id}`
        );
      const policiesContact = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from policies Where contactId=${req.params.id}`
        );

      res.setHeader("Content-Type", "application/json");
      res.status(200).json({
        success: true,
        message: "contact result got",
        data: {
          policiesContact,
          contactResult,
          contactSubDetails,
          faimlyTree,
          dependentParents,
          contactsSiblings,
          leadConversionHistory,
          referralScoreboard,
          festivals,
          leadInformations,
          dependentChildren,
          emergencyContact,
        },
      });
    }
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch contact data", error });
  }
};

exports.getAllContacts = async (req, res) => {
  // const contactData = Node.get("contactList");
  // if (contactData) {
  //   return res
  //     .status(200)
  //     .json({ success: true, message: "Contacts data sent successfuly", contactData });
  // }
  const secretKey = "shgfsyurswr67wr7wguwguwrwrw7fwuygw7it"; // Same secret key used for encryption
  const encryptedData = req.headers.encrypteddata; // Assuming header key is 'encryptedData'

  let userId, viewOnly, viewAll;
  // Decrypt the data
  if (encryptedData) {
    const decryptedData = decryptData(encryptedData, secretKey);
    [userId, viewOnly, viewAll] = decryptedData.split(",");
  }

  // console.log("This is userId", userId);

  const adminApp = catalyst.initialize(req, { scope: "admin" });

  try {
    const { search } = req.body;
    const rowId = req.params.id;
    const page = parseInt(req.body.page, 10) || 1;
    const limit = parseInt(req.body.limit, 10) || 10;
    const offset = (page - 1) * limit;
    const fieldMapping = { createdTime:"CREATEDTIME", contactName:["firstName","lastName"] , contactOwner: ["userData.firstName","userData.lastName"] , mobile:"mobile", email:"email", mailingStreet:"contactSubDetails.mailingStreet",mailingCity:"contactSubDetails.mailingCity", mailingZip:"contactSubDetails.mailingZip", emergencyContactName:"contactEmergencyDetails.emergencyContactName",emergencyContactPhone:"contactEmergencyDetails.emergencyContactPhone", emergencyContactRelationship:"contactEmergencyDetails.emergencyContactRelationship", emergencyContactEmail:"contactEmergencyDetails.emergencyContactEmail" };
    let searchConditions = searchQueryBuilder(search, fieldMapping);
  
    if (rowId) {
      const rowIdCondition = `ROWID = '${rowId}'`;
      searchConditions = searchConditions ? `${searchConditions} AND ${rowIdCondition}` : rowIdCondition;
    }

    const whereClause = searchConditions ? `WHERE (${searchConditions})` : '';
    let contactQuery= `SELECT contacts.*, contactSubDetails.*
        FROM contacts 
        LEFT JOIN contactSubDetails ON contactSubDetails.contactId = contacts.ROWID
        LEFT JOIN userData ON userData.ROWID = contacts.contactOwner
        LEFT JOIN contactEmergencyDetails ON contactEmergencyDetails.contactId= contacts.ROWID
        %SEARCH_CONDITION% ORDER BY contacts.CREATEDTIME DESC LIMIT %LIMIT% OFFSET %OFFSET% `;
  
    let query = contactQuery
    .replace('%SEARCH_CONDITION%', whereClause)
    .replace('%LIMIT%', limit)
    .replace('%OFFSET%', offset);
      // Get all contact data
      let contactData = await adminApp.zcql().executeZCQLQuery(query);
    Node.set("contactList", contactData);
    // console.log("This is contacts data", contactData);
    console.log("Contact data ----:", contactData);
    res.status(200).json({
      success: true,
      message: "Contact data fetched successfully",
      contactData,
    });
  } catch (error) {
    // Handle errors
    console.error("Error fetching contact data:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch contact data", error });
  }
};

exports.getAllUsers = async (req, res) => {
  let query;
  if (!req.params.id) {
    query = `SELECT * FROM userData`;
  } else {
    query = `SELECT * FROM userData WHERE ROWID = ${req.params.id}`;
  }
  catalyst
    .initialize(req, { scope: "admin" })
    .zcql()
    .executeZCQLQuery(query)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Issue pulling user data",
        error: error,
      });
    });
};

exports.deleteContact = async (req, res) => {
  const contactId = req.params.contactId;
  // const contactId = contactIdsString.split(',');

  try {
    // Initialize Catalyst
    const catalystApp = catalyst.initialize(req, { scope: "admin" });

    // Delete associated data from tables based on contactId
    const deleteContactSubDetailsResult = await deleteDataFromTable( catalystApp, "contactSubDetails", { contactId: contactId } );
    console.log("deleteContactSubDetailsResult", deleteContactSubDetailsResult);
    // const deleteContactSubDetailsResult = await deleteDataFromTable(
    //   catalystApp,
    //   "contactSubDetails",
    //   { contactId: contactId }
    // );
    const deleteFamilyResult = await deleteDataFromTable(
      catalystApp,
      "familyTree",
      { contactId: contactId }
    );
    const deleteLeadInformationsResult = await deleteDataFromTable(
      catalystApp,
      "leadInformations",
      { contactId: contactId }
    );
    const dependentParentsResult = await deleteDataFromTable(
      catalystApp,
      "dependentParents",
      { contactId: contactId }
    );
    const dependentChildrenResult = await deleteDataFromTable(
      catalystApp,
      "dependentChildren",
      { contactId: contactId }
    );
    const siblings = await deleteDataFromTable(
      catalystApp,
      "contactsSiblings",
      {
        contactId: contactId,
      }
    );
    const referralScoreCard = await deleteDataFromTable(
      catalystApp,
      "referralScoreboard",
      { contactId: contactId }
    );
    const festival = await deleteDataFromTable(catalystApp, "festivals", {
      contactId: contactId,
    });
    // ... add more delete operations for other tables based on contactId as needed

    // Delete the contact from the "contacts" table based on ROWID
    const deleteContactResult = await deleteDataFromTable(
      catalystApp,
      "contacts",
      contactId
    );

    // Construct response data with details of deleted records
    const responseData = {
      deleteContact: deleteContactResult,
      deleteContactSubDetails: deleteContactSubDetailsResult,
      deleteFamily: deleteFamilyResult,
      deleteLeadInformations: deleteLeadInformationsResult,
      dependentParentsResult,
      dependentChildrenResult,
      siblings,
      referralScoreCard,
      festival,
    };
    Node.del("contactList")
    // Send success response with details of deleted records
    res.status(200).json({
      success: true,
      message: "Contact and associated data deleted successfully",
      data: responseData,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error deleting contact:", error);
    // Send error response with error details
    res.status(500).json({
      success: false,
      message: "Failed to delete contact and associated data",
      error: error, // Include error message for better error reporting
    });
  }
};

exports.updateContact = async (req, res) => {
  const formData = req.body;
  const id = req.params.id;
  console.log(formData.newEmergencyContactCreated);
  const updatedContact = {
    contactOwner: formData.contactOwner,
    dealStageTracking: formData.dealStageTracking,
    insuranceLeadsSource: formData.insuranceLeadSource,
    status: formData.status,
    lead: formData.lead,
    firstName: formData.firstName,
    lastName: formData.lastName,
    oldDatabaseLead: formData.oldDatabaseLead,
    emailRoundRobinOwner: formData.emailRoundRobinOwner,

    mobile: formData.mobile,
    clientAddress: formData.clientAddress,
    email: formData.email,
    advisorModuleName: formData.advisorModuleName,
    parentClient: formData.parentClient,
    clients1stPolicyIssuedOn: new Date(formData.clientPolicyIssueOn),
    onBoardedAnniversary6th: formData.sixthOnBoardedAnniversary,
    dateOfBirth: formData.dateOfBirth,
    preferredContactMethod: formData.preferredContactMethod,
    preferredContactTime: formData.preferredContactTime,
    gender: formData.gender,
    leadCreatedOn: new Date(formData.leadCreatedOn),
    doYouHaveACorporation: formData.doYouHaveCorporations,
    doesYourCorporationHaveAGroupPolicy:
      formData.doesYourCorporationHaveGroupPolicy,
    leadStatusOnConversion: formData.leadStatusOnConversion,
    leadConvertedOn: new Date(formData.leadConvertedOn),
    leadCreatedTime: formData.leadCreatedTime,
    layout: formData.layout,
    currency: formData.currency,
    exchangeRate: formData.exchangeRate,
    onBoardedAnniversary3rd: formData.thirdOnBoardAnniversary,
    onBoardedAnniversary9th: formData.ninthOnBoardAnniversary,
    socialMediaInformation: formData.socialMediaInformation,
    understandingOfInsurance: formData.understandingOfInsurance,
    netWorth: formData.netWorth,
    roundRobinAssignmentTime: formData.roundRobinAssignmentTime,
    roundRobinAssignmentDate: formData.roundRobinAssignmentDate,
    emailIsValid: formData.emailIsValid,
    leadsScore: formData.leadScore,
    clvCorporateCommission: formData.clvCorporateCommision,
    lastCLVCorporate: formData.lastClvCorporate,
    clvAdvisorCommission: formData.clvAdvisorCommision,
    lastCLVAdvisor: formData.lastClvAdvisor,
    emailOptOut: formData.emailOptOut,
    roundRobinProcessed: formData.roundRobinProcessed,
    reRoundRobinProcessed: formData.reRoundRobinProcessed,
    eligibleRoundRobinOwnerFound: formData.eligibleRoundRobinOwnerFound,
    rcSMSOptOut: formData.rcSmsOptOut,
    // additionalContactInformation:formData.additionalContactInformation
  };
  const updatedContactSubdetails = {
    ROWID: formData.contactSubDetailsRowId,
    serviceAvailedOptions: formData.serviceAvailedOptions,
    lifeInsurance: formData.lifeInsurance,

    lifeBenefits: formData.lifeBenefits,
    serviceAvailedLoanProtection: formData.serviceAvailedLoanProtection,
    serviceAvailedTravelInsurance: formData.serviceAvailedTravelInsurance,
    investment: formData.investment,
    groupInsurance: formData.groupInsurance,
    serviceAvailedhealthAndDentalInsurance:
      formData.serviceAvailedhealthAndDentalInsurance,
    combinationOrHybridInsurance: formData.combinationOrHybridInsurance,

    // Repeat Business information

    servicesAvailedUpdated: formData.serviceAvailedUpdated,
    newServiceRequested: formData.newServiceRequested,
    processStage: formData.processStage,
    otherServiceRequested: formData.otherServiceRequested,
    dateNewServiceRequested: formData.dateNewServiceRequested,
    nextFollowUpDateTime: new Date(formData.nextFollowUpDateAndTime),

    // Potential Business (Max Capability)

    potentialBusinessTravelInsurance: formData.potentialBusinessTravelInsurance,
    resp: formData.resp,
    rrspTfsa: formData.rrspTfsa,
    potentialBusinessHealthAndDentalInsurance:
      formData.potentialBusinessHealthAndDentalInsurance,
    otherInvestments: formData.otherInvestments ? formData.otherInvestments: false,
    potentialBusinessLoanProtection: formData.potentialBusinessLoanProtection,

    otherLivingBenefits: formData.otherLivingBenefits,
    potentialBusinessCriticalIllness: formData.potentialBusinessCriticalIllness,
    potentialBusinessLifeInsurance: formData.potentialBusinessLifeInsurance,
    potentialDependent: formData.potentialDependent,
    maxNumberOfPotentialProduct: formData.maxNumberOfPotentialProduct,
    maxNumberOfPotentialProductApplicable:
      formData.maxNumberOfPotentialProductApplicable,
    clientRating: formData.clientRating,
    potentialBusinessPolicyValues: formData.potentialBusinessPolicyValues,

    // Pending Potential Business (Still not Sold)

    numberOfProductRemaining: formData.numberOfProductRemaining,
    potentialDependentCompleted: formData.potentialDependentCompleted,
    pendingPotentialBusinesslifeInsurance:
      formData.pendingPotentialBusinesslifeInsurance,
    dependentLifeIns: formData.dependentLifeIns,
    pendingPotentialBusinessCriticalIllness: formData.dependentCriticalIns,
    pendingPotentialBusinessHealthAndDentalInsurances:
      formData.pendingPotentialBusinessHealthAndDentalInsurances,
    pendingPotentialBusinessTravelInsurance:
      formData.pendingPotentialBusinessTravelInsurance,
    pendingPotentialBusinessResp: formData.pendingPotentialBusinessResp,
    rrspTfsaMutualFundsSegFunds: formData.rrspTfsaMutualFundsSegFunds,
    ppbOtherInvestments: formData.ppbOtherInvestments,
    ppbLoanProtection: formData.ppbLoanProtection,
    ppbOtherLivingBenefits: formData.ppbOtherLivingBenefits,

    // Business Insurance Potential Revenue Map

    serviceOffering: formData.serviceOffering,

    // Ethnicity
    religion: formData.religion,
    celebratedFestivals: formData.celebratedFestivals,

    //  Address Informations
    mailingStreet: formData.mailingStreet,
    mailingCity: formData.mailingCity,

    mailingState: formData.mailingState,
    mailingZip: formData.mailingZip,
    mailingCountry: formData.mailingCountry,
    otherStreet: formData.otherStreet,
    otherCity: formData.otherCity,
    otherState: formData.otherState,
    otherCountry: formData.otherCountry,
  };

  const updatedFamilyTree = {
    ROWID: formData.familyTreeRowId,
    relationShipStatus: formData.relationShipStatus,
    numberofSpouse: formData.numberOfSpouse,
    anniversaryDate: new Date(formData.anniversaryDate),
    nameOfSpouse: formData.nameOfSpouse,
    spouseDateOfBirth: new Date(formData.spouseDateOfBirth),
    phoneOfSpouse: formData.phoneOfSpouse,
    emailOfSpouse: formData.emailOfSpouse,
    nameOfCommonLawPartner: formData.nameOfCommonLawPartner,
    commonLawDateOfBirth: new Date(formData.commonLawDateOfBirth),
    dependentParents: formData.dependentParents,
    numberOfDependentParents: formData.numberOfDependentParents,
    dependentChildren: formData.dependentChildren,
    numberOfDependentChildren: formData.numberOfDependentChildren,
    siblings: formData.siblings,
    numberOfSiblings: formData.numberOfSiblings,
    emergencyinfo: formData.emergencyinfo,
    emergencyContactName: formData.emergencyContactName,
    emergencyContactPhone: formData.emergencyContactPhone,
    emergencyContactRelationship: formData.emergencyContactRelationship,
    emergencyContactEmail: formData.emergencyContactEmail,
  };

  const updatedLeadInfo = {
    ROWID: formData.leadInfoRowId,
    bestTimeToCall: formData.bestTimeToCall,
    dateOfBirth1: new Date(formData.dateOfBirth1),
    ifreferredbyAdvisor: formData.ifReferredByAdvisorOrExternal,
    isthisAReassignment: formData.isThisReassignment,
    referredBy: formData.referredBy,
    investments1: formData.investment1,
    preferredContactMethod2: formData.preferredContactMethod2,
    preferredContactTime2: formData.preferredContactTime2,
    citizenshipStatus1: formData.citizenshipStatus1,
    understandingOfInsurance1: formData.understandingOfInsurance1,
    existingInsurancePolicy2: formData.existingInsurancePolicy2,
    doYouOwnAHomeInCanada: formData.doYouOwnHomeInCananda,
    existingPolicyRenewalDueBy: new Date(formData.existingRenewalPolicyDueBy),
    doYouHavelifeInsurance: formData.doYouHaveLifeInsurance,
    coverageYouAreLookingFor: formData.coverageYouAreLookingFor,
    submitPageURL: formData.submitPageUrl,
    assignedCampaigns: formData.assignedCampaigns,
    state: formData.state,
    zipCode: formData.zipCode,
    twitter1: formData.twitter1,
    skypeID1: formData.skypeId1,
    instagram1: formData.instagram1,
    potentialBusinessPolicyValues1: formData.leadPotentialBusinessPolicyValues,
    insuranceLeadsScoringScore: formData.insuranceLeadScore,
    insuranceLeadScoringPositiveScore:
      formData.insuranceLeadScoringPositiveScore,
    insuranceLeadScoringNegativeTouchPointScore:
      formData.insuranceLeadScoringNegativeTouchPointScore,
    gender1: formData.gender1,
    additionalContactInformation: formData.leadInfoAdditionalContactInformation,
    networth2: formData.networth2,
    databaseLead1: formData.databaseLead1,
    genderPrediction1: formData.genderPrediction1,
    exchangeRate1: formData.exchangeRate1,
    currency1: formData.currency1,
    // roundRobinAssignmentTime1: `${formData.roundRobinAssignmentTime1}`,
    leadCreatedOn1: formData.leadCreatedOn1,
    street: formData.street,
    city: formData.city,
    country: formData.country,
    linkdin1: formData.linkdin1,
    facebook1: formData.facebook1,
    facebookAdInformation: formData.facebookAdInformation,
    servicesRequested: formData.servicesRequested,
    insuranceLeadScoringTouchPointScore:
      formData.insuranceLeadScoringTouchPointScore,
    insuranceLeadScoringPositiveTouchPointScore:
      formData.insuranceLeadsScoringPositiveTouchPointScore,
    insuranceLeadScoringNegativeScore:
      formData.insuranceLeadsScoringNegativeScore,

    oldDatabaseLead1: formData.oldDatabaseLead1,
  };

  const updatedDependentParents = formData.dependentParentsData;
  const newDependentParents = formData.newDependentParentsData;

  const updatedDependentChildren = formData.dependentChildrenData;
  const newDependentChildren = formData.newDependentChildrenData;

  const updatedSiblings = formData.siblingData;
  const newSiblings = formData.newSiblingData;

  const updatedReferralScoreCard = formData.referralScoreCardData;

  const updatedFestival = formData.festivalsData;
  const newFestivalData = formData.newFestivalData;
  const deletedFestivalData = formData.deletedFestivalData;

  const updatedLeadConversionHistory = formData.leadConversionHistoryData;
  const updatedEmergencyContactData = formData.emergencyContactData;
  const newEmergencyContactCreated = formData.newEmergencyContactCreated;
  const deletedEmeregncyContact = formData.deletedEmergencyContact;

  // console.log("updatedFamilyTree", updatedFamilyTree)
  // console.log("updatedLeadInfo", updatedLeadInfo);
  let contactResponse;
  try {
    const catalystApp = catalyst.initialize(req, { scope: "admin" });

    // Update the contacts table based on ROWID
    contactResponse = await catalystApp
      .datastore()
      .table("contacts")
      .updateRow({ ROWID: id, ...updatedContact });

    // Update the contactSubdetails table based on the foreign key contactId
    const contactSubDetailsResponse = await catalystApp
      .datastore()
      .table("contactSubdetails")
      .updateRow({ contactId: id, ...updatedContactSubdetails });

    // Update other related tables based on the foreign key contactId
    // console.log(formData);
    // Example:
    const familyTreeResponse = await catalystApp
      .datastore()
      .table("familyTree")
      .updateRow({ contactId: id, ...updatedFamilyTree });

    const leadInfoResult = await catalystApp
      .datastore()
      .table("leadInformations")
      .updateRow({ contactId: id, ...updatedLeadInfo });

    if (
      formData.dependentParentsData &&
      formData.dependentParentsData.length > 0
    ) {
      const updatedParentsResponse = await updateSubFormData(
        updatedDependentParents,
        req,
        "dependentParents"
      );
    }
    if (
      formData.newDependentParentsData &&
      formData.newDependentParentsData.length > 0
    ) {
      const updatedNewDependentParentsResponse =
        await insertMultipleRowsIntoTable(
          "dependentParents",
          newDependentParents,
          req,
          contactResponse
        );
    }

    if (
      formData.dependentChildrenData &&
      formData.dependentChildrenData.length > 0
    ) {
      const dependentChildranResult = await updateSubFormData(
        updatedDependentChildren,
        req,
        "dependentChildren"
      );
    }
    if (
      formData.newDependentChildrenData &&
      formData.newDependentChildrenData.length > 0
    ) {
      const updatedNewDependentChildrenResponse =
        await insertMultipleRowsIntoTable(
          "dependentChildren",
          newDependentChildren,
          req,
          contactResponse
        );
    }

    if (formData.siblingData && formData.siblingData.length > 0) {
      const siblingsResult = await updateSubFormData(
        updatedSiblings,
        req,
        "contactsSiblings"
      );
    }
    if (formData.newSiblingData && formData.newSiblingData.length > 0) {
      const updatedNewDependentChildrenResponse =
        await insertMultipleRowsIntoTable(
          "contactsSiblings",
          newSiblings,
          req,
          contactResponse
        );
    }

    if (
      formData.referralScoreCardData &&
      formData.referralScoreCardData.length > 0
    ) {
      const referralScoreboardResult = await updateSubFormData(
        updatedReferralScoreCard,
        req,
        "referralScoreboard"
      );
    }
    if (
      formData.leadConversionHistoryData &&
      formData.leadConversionHistoryData.length > 0
    ) {
      const LeadConversionHistoryResult = await updateSubFormData(
        updatedLeadConversionHistory,
        req,
        "leadConversionHistory"
      );
    }
    if (formData.festivalsData && formData.festivalsData.length > 0) {
      const festivalResult = await updateSubFormData(
        updatedFestival,
        req,
        "festivals"
      );
    }
    if (formData.newFestivalData && formData.newFestivalData.length > 0) {
      const newFestivalResult = await insertMultipleRowsIntoTable(
        "festivals",
        newFestivalData,
        req,
        contactResponse
      );
    }
    if (
      formData.deletedFestivalData &&
      formData.deletedFestivalData.length > 0
    ) {
      const deleteFestivalResult = await deleteById(
        "festivals",
        deletedFestivalData,
        req
      );
    }
    if (
      formData.emergencyContactData &&
      formData.emergencyContactData.length > 0
    ) {
      const emergencyContactResult = await updateSubFormData(
        updatedEmergencyContactData,
        req,
        "contactEmergencyDetails",
        contactResponse
      );

      if (
        formData.newEmergencyContactCreated &&
        formData.newEmergencyContactCreated.length > 0
      ) {
        const newEmergencyContactResult = await insertMultipleRowsIntoTable(
          "contactEmergencyDetails",
          newEmergencyContactCreated,
          req,
          contactResponse
        );
        // console.log("field created",newEmergencyContactResult);
      }

      if (
        formData.deletedEmergencyContact &&
        formData.deletedEmergencyContact.length > 0
      ) {
        // console.log("delete emergencyContactResult",deletedEmeregncyContact);
        const deleteEmergencyContactResult = await deleteById(
          "contactEmergencyDetails",
          deletedEmeregncyContact,
          req
        );
        // console.log("delete emergencyContactResult",deleteEmergencyContactResult);
      }
    }
    // const festivalResult = await catalystApp
    //   .datastore()
    //   .table("festivals")
    //   .updateRows({ contactId: id,updatedFestival });

    // Update other related tables in a similar manner
    //  console.log(contactSubDetailsResponse);
    Node.del("contactList")
    res.status(200).json({
      message: "Contacts updated successfully",
      success: true,
    });
  } catch (err) {
    console.error("Error updating contacts:", err);
    res.status(500).json({
      message: "Failed to update contacts",
      success: false,
      error: err.message,
    });
  }
};

// <<<<<<<<<< ========= CSV DOWNLOAD FUNCTIONALITY =============>>>>>>>>>>
exports.downloadFile = async (req, res) => {
  try {
    const csvContent = await downloadSampleFile();
    
    // Send the CSV file for download
    res.setHeader("Content-disposition", "attachment; filename=sample.csv");
    res.set("Content-Type", "text/csv");
    res.status(200).send(csvContent);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

// <<<<<<<<<<<<<<<<<<========== Sample FIle DOWNLOAD =============>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
async function downloadSampleFile() {
  try {
    let headers = client
    const csvStringifier = createObjectCsvStringifier({
      header: headers,
    });
    const data = sample;
    const csvContent =
      csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(data);

    return csvContent;
  } catch (error) {
    console.error("Error downloading file:", error);
  }
}