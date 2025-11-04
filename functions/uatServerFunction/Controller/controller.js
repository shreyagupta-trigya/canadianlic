var catalyst = require("zcatalyst-sdk-node");
const NodeCache = require("node-cache");
const query = require("../SQL/queries");
const util = require("../Utils/util");
const cache = new NodeCache();
exports.connectionCheck = (req, res) => {
  res.status(200).json({ success: true, message: "I am Live and Ready from Lead controller." });
};
exports.getLeadById = async (req, res) => {
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  try {
    if (req.params.id) {
      const leadId = req.params.id;

      // Check if the data is in the cache
      const cachedData = cache.get(leadId);
      if (cachedData) {
        return res.status(200).json({
          success: true,
          message: "Lead result received (from cache)",
          data: cachedData,
        });
      }

      console.log(leadId);
      console.log("Query:", `${query.getleadByid} ${leadId}`);
      const leadResult = await adminApp
        .zcql()
        .executeZCQLQuery(`${query.getleadByid} ${leadId}`);
      if (!leadResult || leadResult.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No lead found with the given ID.",
        });
      }

      const leadsDescription = await adminApp
        .zcql()
        .executeZCQLQuery(`${query.getleadsDescription} ${leadId}`);
      const faimlyTree = await adminApp
        .zcql()
        .executeZCQLQuery(`${query.getFamilyDetails} ${leadId}`);
      const dependentParents = await adminApp
        .zcql()
        .executeZCQLQuery(`${query.getdependentParents} ${leadId}`);
      const contactsSiblings = await adminApp
        .zcql()
        .executeZCQLQuery(`${query.getcontactsSiblings} ${leadId}`);
      const festivals = await adminApp
        .zcql()
        .executeZCQLQuery(`${query.getfestivals} ${leadId}`);
      const dependentChildren = await adminApp
        .zcql()
        .executeZCQLQuery(`${query.getdependentChildren} ${leadId}`);
      const emergencyContact = await adminApp
        .zcql()
        .executeZCQLQuery(`${query.getcontactEmergencyDetails} ${leadId}`);

      const responseData = {
        leadResult,
        leadsDescription,
        faimlyTree,
        dependentParents,
        leadSiblings: contactsSiblings,
        festivals,
        dependentChildren,
        emergencyContact,
      };

      // Cache the fetched data
      cache.set(leadId, responseData);

      res.setHeader("Content-Type", "application/json");
      res.status(200).json({
        success: true,
        message: "Lead result received",
        data: responseData,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "ID Parameter is missing" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "An error occurred", error });
  }
};
exports.getAllLeads = async (req, res) => {
  try {
    const cacheKey = "getAllLeads";

    // Check if data is in cache
    // const cachedData = cache.get(cacheKey);

    // if (cachedData) {
    //   return res.status(200).json({
    //     success: true,
    //     message: "Lead data fetched successfully (from cache)",
    //     leadDetails: cachedData,
    //   });
    // }

    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const leadDetails = await adminApp
      .zcql()
      .executeZCQLQuery(`${query.getAllLeads}`);

    if (!leadDetails || leadDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No leads were found at this time",
      });
    }

    // cache.set(cacheKey, leadDetails, 10000);
    res.status(200).json({
      success: true,
      message: "Lead data fetched successfully",
      leadDetails,
    });
  } catch (error) {
    console.error("Error fetching lead data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch lead data",
      error: error.message || error,
    });
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
exports.getAllInsurencePartner = async (req, res) => {
  let query;
  if (!req.params.id) {
    query = `SELECT * FROM insurencePartner`;
  } else {
    query = `SELECT * FROM insurencePartner WHERE ROWID = ${req.params.id}`;
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
        message: "Issue pulling insurencePartner data",
        error: error,
      });
    });
};
exports.getAllAdvisor = async (req, res) => {
  let query;
  if (!req.params.id) {
    query = `SELECT * FROM advisors`;
  } else {
    query = `SELECT * FROM advisors WHERE ROWID = ${req.params.id}`;
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
exports.getAllLocations = async (req, res) => {
  let query;
  if (!req.params.id) {
    query = `SELECT * FROM locations`;
  } else {
    query = `SELECT * FROM locations WHERE ROWID = ${req.params.id}`;
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
exports.getAllContact = async (req, res) => {
  let query;
  if (!req.params.id) {
    query = `SELECT * FROM contacts`;
  } else {
    query = `SELECT * FROM contacts WHERE ROWID = ${req.params.id}`;
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
        message: "Issue pulling contacts data",
        error: error,
      });
    });
};
exports.createNewLead = async (req, res) => {
  const formData = req.body.LeadInformation;
  util
    .createRecord(req, "leads", formData)
    .then((data) => {
      res.status(201).json({
        success: true,
        message: "Lead  created successfully",
        ROWID: data.ROWID,
      });
    })
    .catch((error) => {
      res.status(409).json({
        success: false,
        message: "Issue Creating Lead record",
        error: error,
      });
    });
  // util.createRecord(req,"leadsDescription",formData)
  // .then((data) => {
  //     util.createRecord(req,"familyTree",formData)
  //     .then((data) => {
  //         res.status(201).json({
  //             success: true,
  //             message: "Lead  created successfully"
  //         });
  //     })
  //     .catch((error) => {
  //         console.log("error in creating ==> familyTree", error);
  //         throw error;
  //     });
  // })
  // .catch((error) => {
  //     console.log("error in creating ==> leadsDescription", error);
  //     throw error;
  // });
};

exports.createNewLeadAdvisor = async (req, res) => {
  const formData = req.body.LeadInformation;
  const familyTreeFormData = req.body.FamilyTree;
  const leadDescFormData = req.body.DescriptonInfo;
  const festivalFormData = req.body.FestivalForm;
  const ServiceRequestFormData = req.body.ServiceRequestDetails;
  const AddressInformationFormData = req.body.AddressInformation;
  const LeadManagementFormdData = req.body.LeadManagementInformation;
  try {
    const catalystApp = catalyst.initialize(req, { scope: "admin" });

    const leadResult = await insertDataIntoTable(catalystApp, "leads", {
      insuranceLeadOwner: formData.insuranceLeadOwner,
      insuranceLeadSource: formData.insuranceLeadSource,
      firstName: formData.firstName,
      lastName: formData.lastName,
      mobile: formData.mobile,
      insuranceLeadStatus: formData.insuranceLeadStatus,
      whatsapp: formData.whatsapp,
      leadStatusStage: formData.leadStatusStage,
      email: formData.email,
      assignedAdvisor: formData.assignedAdvisor,
      emailIsValid: formData.emailIsValid,
      emailOptOut: formData.emailOptOut,
      removeFromCampaign: formData.removeFromCampaign,
      dateofBirth: formData.dateofBirth,
      bestTimeToCall: formData.bestTimeToCall,
      gender: formData.gender,
      isThisaReassignment: formData.isThisaReassignment,
      locationName: formData.locationName,
      referredBy: formData.referredBy,
      netWorth: formData.netWorth,
      preferredContactMethod: formData.preferredContactMethod,
      exchangeRate: formData.exchangeRate,
      currency: formData.currency,
      preferredContactTime: formData.preferredContactTime,
      socialMediaInformation: formData.socialMediaInformation,
      roundRobinProcessed: formData.roundRobinProcessed,
      citizenshipStatus: formData.citizenshipStatus,
      emailRoundRobinOwner: formData.emailRoundRobinOwner,
      understandingOfInsurance: formData.understandingOfInsurance,
      roundRobinAssignmentTime: new Date(formData.roundRobinAssignmentTime),
      existingInsurancePolicy: formData.existingInsurancePolicy,
      eligibleRoundRobinOwnerFound: formData.eligibleRoundRobinOwnerFound,
      doYouOwnaHomeInCanada: formData.doYouOwnaHomeInCanada,
      leadCreatedOn: formData.leadCreatedOn,
      doYouhaveLifeInsurance: formData.doYouhaveLifeInsurance,
      oldDatabaseLead: formData.oldDatabaseLead,
      nextFollowUpDateTime: formData.nextFollowUpDateTime,
      genderPredictionScore: formData.genderPredictionScore,
      reRunRoundRobin: formData.reRunRoundRobin,
      rcSmsOptOut: formData.rcSmsOptOut,
      submitPageURL: formData.submitPageURL,
      areYouReadyToPurchaseThisLifeInsurancePoli:
        formData.areYouReadyToPurchaseThisLifeInsurancePoli,
      assignedCampaigns: formData.assignedCampaigns,
      areYouReadyToPurchaseThisLifeInsurancePol:
        formData.areYouReadyToPurchaseThisLifeInsurancePol,
      genderPrediction: formData.genderPrediction,
      inboxURL: formData.inboxURL,
      additionalContactInformation: formData.additionalContactInformation,
      areYouLLQPLicensed: formData.areYouLLQPLicensed,
      phoneBurnerFollowUpDate: new Date(formData.phoneBurnerFollowUpDate),
      phoneBurnerLastCallOutcome: formData.phoneBurnerLastCallOutcome,
      phoneBurnerLastCallTime: formData.phoneBurnerLastCallTime,
      driverLicenseNo: formData.driverLicenseNo,
      vehicleYear: formData.vehicleYear,
      whatIsYourPostalCode: formData.whatIsYourPostalCode,
      whenWasYourVehicleMade: formData.whenWasYourVehicleMade,
      phoneNumber: formData.phoneNumber,
      name: formData.name,
      addEmail1: formData.addEmail1,
      quote: formData.quote,
      deposit: formData.deposit,
      dateOfBirth1: formData.dateOfBirth1,
      childAge: formData.childAge,
      howMuchYouLikeToStartThePlan: formData.howMuchYouLikeToStartThePlan,
      howMuchAmountWantToStartWith: formData.howMuchAmountWantToStartWith,
      startDateOfCoverage: formData.startDateOfCoverage,
      dateOfBirthOfTraveler: formData.dateOfBirthOfTraveler,
      religion: festivalFormData.religion,
      celebratedFestivals: festivalFormData.celebratedFestivals,
      layoutName: "Advisor Lead",
    });
    console.log("create new advisor lead", leadResult.ROWID);
    // lead description
    const leadsDescriptionResult = await insertDataIntoTable(
      catalystApp,
      "leadsDescription",
      {
        leadId: leadResult.ROWID,
        typeOfInsuranceLooking: leadDescFormData.typeOfInsuranceLooking,
        whatPolicyDoYouWant: leadDescFormData.whatPolicyDoYouWant,
        ageOf1stTraveler: leadDescFormData.ageOf1stTraveler,
        enterageOf2ndTraveler: leadDescFormData.enterageOf2ndTraveler,
        travelerStartDate: leadDescFormData.travelerStartDate,
        travelerEndDate: leadDescFormData.travelerEndDate,
        coverageYouAreLookingFor: leadDescFormData.coverageYouAreLookingFor,
        preExistingmedicaLconditions:
          leadDescFormData.preExistingmedicaLconditions,
        howMuchCoverageIsRequired: leadDescFormData.howMuchCoverageIsRequired,
        canYouPleaseLetMeKnowPremiumPaymentMode:
          leadDescFormData.canYouPleaseLetMeKnowPremiumPaymentMode,
        tobaccoused: leadDescFormData.tobaccoused,
        whattypeOfTermPlanAreYouLookingFor:
          leadDescFormData.whattypeOfTermPlanAreYouLookingFor,
        doYouWantCriticalIllnessInsuranceWithMoney:
          leadDescFormData.doYouWantCriticalIllnessInsuranceWithMoney,
        howDoYouConsiderYourHealth: leadDescFormData.howDoYouConsiderYourHealth,
        whatsYourProfession: leadDescFormData.whatsYourProfession,
        howManyCriticalIllnessCoverageYouNeed:
          leadDescFormData.howManyCriticalIllnessCoverageYouNeed,
        howMuchMonthlyBenefitDoYouNeed:
          leadDescFormData.howMuchMonthlyBenefitDoYouNeed,
        selectTheDurationOfTheCoverage:
          leadDescFormData.selectTheDurationOfTheCoverage,
        youAreSeekingCoverageFor: leadDescFormData.youAreSeekingCoverageFor,
        enterThAamountOfMortgageCoverageRequired:
          leadDescFormData.enterThAamountOfMortgageCoverageRequired,
        whatsYourAge: leadDescFormData.whatsYourAge,
        doYouHaveAnyMedicalIssue: leadDescFormData.doYouHaveAnyMedicalIssue,
        respAccountsForYourChildChildrens:
          leadDescFormData.respAccountsForYourChildChildrens,
        secureYourChildsFutureWithHigherEducation:
          leadDescFormData.secureYourChildsFutureWithHigherEducation,
        howMuchDoYouWantToSaveMonthly:
          leadDescFormData.howMuchDoYouWantToSaveMonthly,
        growthOnYourInvestmentInRespAccount:
          leadDescFormData.growthOnYourInvestmentInRespAccount,
        wouldLikeToIncreaseMonthlyDeposits:
          leadDescFormData.wouldLikeToIncreaseMonthlyDeposits,
        qualifyFor15BonusOfYourRespAccount:
          leadDescFormData.qualifyFor15BonusOfYourRespAccount,
        howManyChildrensDoYouHave: leadDescFormData.howManyChildrensDoYouHave,
        eligibleToGetExtra2000InGovernmentGrants:
          leadDescFormData.eligibleToGetExtra2000InGovernmentGrants,
        whatIsYourResidencyStatusInCanada:
          leadDescFormData.whatIsYourResidencyStatusInCanada,
        depositEveryMonthTowardsYourChildEducation:
          leadDescFormData.depositEveryMonthTowardsYourChildEducation,
        howLongDoYouNeedCoverageFor:
          leadDescFormData.howLongDoYouNeedCoverageFor,
        wouldYouLikeToKnowHowRespWorks:
          leadDescFormData.wouldYouLikeToKnowHowRespWorks,
        oneyRequireToCompleteYourChildsEducation:
          leadDescFormData.oneyRequireToCompleteYourChildsEducation,
        selectYourAgeBracket: leadDescFormData.selectYourAgeBracket,
        oneMillionInanRespAccountAtRetirement:
          leadDescFormData.oneMillionInanRespAccountAtRetirement,
        howMuchdoYouWantToSaveYearly:
          leadDescFormData.howMuchdoYouWantToSaveYearly,
        doYouWanToDepositMonthlyOrYearlyPremium:
          leadDescFormData.doYouWanToDepositMonthlyOrYearlyPremium,
        wouldYouLikeToKnowHowTfsaWorks:
          leadDescFormData.wouldYouLikeToKnowHowTfsaWorks,
        whatageDoYouWanttostartTheWithdrawalFrom:
          leadDescFormData.whatageDoYouWanttostartTheWithdrawalFrom,
        whatKindOfBusinesssIsIt: leadDescFormData.whatKindOfBusinesssIsIt,
        wouldYouLikeToKnowHowRrspWorks:
          leadDescFormData.wouldYouLikeToKnowHowRrspWorks,
        oneMillionInAnTfsaAccountAtRetirement:
          leadDescFormData.oneMillionInAnTfsaAccountAtRetirement,
        areYouAnOwnerOrEmployeeOfTheBusiness:
          leadDescFormData.areYouAnOwnerOrEmployeeOfTheBusiness,
        gclidField: leadDescFormData.gclidField,
        areYouLookingForDrugAndDentalOrJustDrugPla:
          leadDescFormData.areYouLookingForDrugAndDentalOrJustDrugPla,
        areYouLicensedAsAnInsuranceAdvisor:
          leadDescFormData.areYouLicensedAsAnInsuranceAdvisor,
        whatTimeFrameYouLikeToMoveToBeaAdvisor:
          leadDescFormData.whatTimeFrameYouLikeToMoveToBeaAdvisor,
        wouldYouLikeToKnowHowSuperVisaInsuranceWo:
          leadDescFormData.wouldYouLikeToKnowHowSuperVisaInsuranceWo,
        existingHealthConditions: leadDescFormData.existingHealthConditions,
        singleOrFamilyPlan: leadDescFormData.singleOrFamilyPlan,
        monthlyPremiumKnowledge: leadDescFormData.monthlyPremiumKnowledge,
        previousPolicyWithUs: leadDescFormData.previousPolicyWithUs,
        superVisaInsurance: leadDescFormData.superVisaInsurance,
      }
    );
    console.log("leadsDescriptionResult", leadsDescriptionResult.ROWID);
    // lead family tree
    const familyResult = await insertDataIntoTable(catalystApp, "familyTree", {
      leadId: leadResult.ROWID,
      relationShipStatus: familyTreeFormData.relationShipStatus,
      numberOfSpouse: familyTreeFormData.numberOfSpouse,
      anniversaryDate: new Date(familyTreeFormData.anniversaryDate),
      nameOfSpouse: familyTreeFormData.nameOfSpouse,
      spouseDateOfBirth: new Date(familyTreeFormData.spouseDateOfBirth),
      phoneOfSpouse: familyTreeFormData.phoneOfSpouse,
      emailOfSpouse: familyTreeFormData.emailOfSpouse,
      nameOfCommonLawPartner: familyTreeFormData.nameOfCommonLawPartner,
      commonLawDateOfBirth: new Date(familyTreeFormData.commonLawDateOfBirth),
      dependentParents: familyTreeFormData.dependentParents,
      numberOfDependentParents: familyTreeFormData.numberOfDependentParents,
      dependentChildren: familyTreeFormData.dependentChildren,
      numberOfDependentChildren: familyTreeFormData.numberOfDependentChildren,
      siblings: familyTreeFormData.siblings,
      numberOfSiblings: familyTreeFormData.numberOfSiblings,
    });
    console.log("leadsDescriptionResult", familyResult.ROWID);
    // lead service detals and
    const servicesResult = await insertDataIntoTable(
      catalystApp,
      "leadService",
      {
        leadId: leadResult.ROWID,
        // "potentialBusiness": formData.potentialBusiness,
        loanProtection: ServiceRequestFormData.loanProtection,
        servicesRequested: ServiceRequestFormData.servicesRequested,
        lifeInsurance: ServiceRequestFormData.lifeInsurance,
        investments: ServiceRequestFormData.investments,
        livingBenefits: ServiceRequestFormData.livingBenefits,
        groupInsurance: ServiceRequestFormData.groupInsurance,
        travelInsurance: ServiceRequestFormData.travelInsurance,
        combinationOrHybridInsurance:
          ServiceRequestFormData.combinationOrHybridInsurance,
        autoInsurance: ServiceRequestFormData.autoInsurance,
        healthAndDentalInsurance:
          ServiceRequestFormData.healthAndDentalInsurance,
        homeInsurance: ServiceRequestFormData.homeInsurance,
        businessLiabilityInsurance:
          ServiceRequestFormData.businessLiabilityInsurance,
        immigrationServices: ServiceRequestFormData.immigrationServices,
      }
    );
    console.log("servicesResult", servicesResult.ROWID);
    // insert into subform data parents
    // inserting into subforms

    // inserting into subforms
    console.log(
      "familyTreeFormData.newDependentParentsData",
      familyTreeFormData.newDependentParentsData
    );
    let dependentParentsResult;
    if (
      familyTreeFormData.newDependentParentsData &&
      familyTreeFormData.newDependentParentsData.length > 0
    ) {
      dependentParentsResult = await insertMultipleRowsIntoTable(
        "dependentParents",
        familyTreeFormData.newDependentParentsData,
        req,
        leadResult
      );
    }
    //   console.log('dependentParentsResult', dependentParentsResult);
    let dependentChildrenResult;
    if (
      familyTreeFormData.dependentChildrenData &&
      familyTreeFormData.dependentChildrenData.length > 0
    ) {
      dependentChildrenResult = await insertMultipleRowsIntoTable(
        "dependentChildren",
        familyTreeFormData.dependentChildrenData,
        req,
        leadResult
      );
    }
    let siblingsResults;

    if (
      familyTreeFormData.siblingData &&
      familyTreeFormData.siblingData.length > 0
    ) {
      siblingsResults = await insertMultipleRowsIntoTable(
        "contactsSiblings",
        familyTreeFormData.siblingData,
        req,
        leadResult
      );
    }
    let leadConversionHistoryResult;
    console.log("siblingsResults", siblingsResults);
    if (
      LeadManagementFormdData.LeadData &&
      LeadManagementFormdData.LeadData.length > 0
    ) {
      leadConversionHistoryResult = await insertMultipleRowsIntoTable(
        "leadConversionHistory",
        LeadManagementFormdData.LeadData,
        req,
        leadResult
      );
    }
    let festivalResult;
    if (
      festivalFormData.festivalsData &&
      festivalFormData.festivalsData.length > 0
    ) {
      festivalResult = await insertMultipleRowsIntoTable(
        "festivals",
        festivalFormData.festivalsData,
        req,
        leadResult
      );
    }
    let emergencyContactResult;
    if (
      familyTreeFormData.emergencyContactData &&
      familyTreeFormData.emergencyContactData.length > 0
    ) {
      emergencyContactResult = await insertMultipleRowsIntoTable(
        "contactEmergencyDetails",
        familyTreeFormData.emergencyContactData,
        req,
        leadResult
      );
    }

    const responseData = {
      lead: leadResult,
      description: leadsDescriptionResult,
      family: familyResult,
      dependentParents: dependentParentsResult,
      dependentChildren: dependentChildrenResult,
      siblings: siblingsResults,
      leadConversionHistoryResult,
      festival: festivalResult,
      emergencyContactResult: emergencyContactResult,
      // emergencyContact: emergencyLeadResult
    };
    //   Node.del("contactList")
    res.status(201).json({
      success: true,
      message:
        "Lead Description services Family DependentParents Siblings Festival emergencyContactResult created successfully",
      responseData,
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(409).json({
      success: false,
      message: "Failed to create contact",
      error: error,
    });
  }
};

exports.updateLead = async (req, res) => {
  const formData = req.body.LeadInformation;
  formData.ROWID = req.params.id;
  util
    .updateRecord(req, "leads", formData)
    .then((data) => {
      res.status(201).json({
        success: true,
        message: "Lead  Updated successfully",
        ROWID: data.ROWID,
      });
    })
    .catch((error) => {
      res.status(409).json({
        success: false,
        message: "Issue Updating Lead record",
        error: error,
      });
    });
  // util.createRecord(req,"leadsDescription",formData)
  // .then((data) => {
  //     util.createRecord(req,"familyTree",formData)
  //     .then((data) => {
  //         res.status(201).json({
  //             success: true,
  //             message: "Lead  created successfully"
  //         });
  //     })
  //     .catch((error) => {
  //         console.log("error in creating ==> familyTree", error);
  //         throw error;
  //     });
  // })
  // .catch((error) => {
  //     console.log("error in creating ==> leadsDescription", error);
  //     throw error;
  // });
};
// exports.updateLead = async (req, res) => {
//   const formData = req.body;
//   const id = req.params.id;
//   console.log("datat", id);
//   const updatedlead = {
//     insuranceLeadOwner: formData.insuranceLeadOwner,
//     insuranceLeadSource: formData.insuranceLeadSource,
//     firstName: formData.firstName,
//     lastName: formData.lastName,
//     mobile: formData.mobile,
//     insuranceLeadStatus: formData.insuranceLeadStatus,
//     whatsapp: formData.whatsapp,
//     leadStatusStage: formData.leadStatusStage,
//     email: formData.email,
//     assignedAdvisor: formData.assignedAdvisor,
//     emailIsValid: formData.emailIsValid,
//     emailOptOut: formData.emailOptOut,
//     removeFromCampaign: formData.removeFromCampaign,
//     dateofBirth: formData.dateofBirth,
//     bestTimeToCall: formData.bestTimeToCall,
//     gender: formData.gender,
//     isThisaReassignment: formData.isThisaReassignment,
//     locationName: formData.locationName,
//     referredBy: formData.referredBy,
//     netWorth: formData.netWorth,
//     preferredContactMethod: formData.preferredContactMethod,
//     exchangeRate: formData.exchangeRate,
//     currency: formData.currency,
//     preferredContactTime: formData.preferredContactTime,
//     socialMediaInformation: formData.socialMediaInformation,
//     roundRobinProcessed: formData.roundRobinProcessed,
//     citizenshipStatus: formData.citizenshipStatus,
//     emailRoundRobinOwner: formData.emailRoundRobinOwner,
//     understandingOfInsurance: formData.understandingOfInsurance,
//     roundRobinAssignmentTime: formData.roundRobinAssignmentTime,
//     existingInsurancePolicy: formData.existingInsurancePolicy,
//     eligibleRoundRobinOwnerFound: formData.eligibleRoundRobinOwnerFound,
//     doYouOwnaHomeInCanada: formData.doYouOwnaHomeInCanada,
//     leadCreatedOn: formData.leadCreatedOn,
//     doYouhaveLifeInsurance: formData.doYouhaveLifeInsurance,
//     oldDatabaseLead: formData.oldDatabaseLead,
//     nextFollowUpDateTime: formData.nextFollowUpDateTime,
//     genderPredictionScore: formData.genderPredictionScore,
//     reRunRoundRobin: formData.reRunRoundRobin,
//     rcSmsOptOut: formData.rcSmsOptOut,
//     submitPageURL: formData.submitPageURL,
//     areYouReadyToPurchaseThisLifeInsurancePoli:
//       formData.areYouReadyToPurchaseThisLifeInsurancePoli,
//     assignedCampaigns: formData.assignedCampaigns,
//     areYouReadyToPurchaseThisLifeInsurancePol:
//       formData.areYouReadyToPurchaseThisLifeInsurancePol,
//     genderPrediction: formData.genderPrediction,
//     inboxURL: formData.inboxURL,
//     additionalContactInformation: formData.additionalContactInformation,
//     areYouLLQPLicensed: formData.areYouLLQPLicensed,
//     phoneBurnerFollowUpDate: formData.phoneBurnerFollowUpDate,
//     phoneBurnerLastCallOutcome: formData.phoneBurnerLastCallOutcome,
//     phoneBurnerLastCallTime: formData.phoneBurnerLastCallTime,
//     driverLicenseNo: formData.driverLicenseNo,
//     vehicleYear: formData.vehicleYear,
//     whatIsYourPostalCode: formData.whatIsYourPostalCode,
//     whenWasYourVehicleMade: formData.whenWasYourVehicleMade,
//     phoneNumber: formData.phoneNumber,
//     name: formData.name,
//     addEmail1: formData.addEmail1,
//     quote: formData.quote,
//     deposit: formData.deposit,
//     dateOfBirth1: formData.dateOfBirth1,
//     childAge: formData.childAge,
//     howMuchYouLikeToStartThePlan: formData.howMuchYouLikeToStartThePlan,
//     howMuchAmountWantToStartWith: formData.howMuchAmountWantToStartWith,
//     startDateOfCoverage: formData.startDateOfCoverage,
//     dateOfBirthOfTraveler: formData.dateOfBirthOfTraveler,
//     religion: formData.religion,
//     celebratedFestivals: formData.celebratedFestivals,
//   };
//   const updateLeadsDescription = {
//     ROWID: formData.leadDescriptionRowId,
//     TypeOfInsuranceLooking: formData.TypeOfInsuranceLooking,
//     whatPolicyDoYouWant: formData.whatPolicyDoYouWant,
//     ageOf1stTraveler: formData.ageOf1stTraveler,
//     enterageOf2ndTraveler: formData.enterageOf2ndTraveler,
//     travelerStartDate: formData.travelerStartDate,
//     travelerEndDate: formData.travelerEndDate,
//     coverageYouAreLookingFor: formData.coverageYouAreLookingFor,
//     preExistingmedicaLconditions: formData.preExistingmedicaLconditions,
//     howMuchCoverageIsRequired: formData.howMuchCoverageIsRequired,
//     canYouPleaseLetMeKnowPremiumPaymentMode:
//       formData.canYouPleaseLetMeKnowPremiumPaymentMode,
//     tobaccoused: formData.tobaccoused,
//     whattypeOfTermPlanAreYouLookingFor:
//       formData.whattypeOfTermPlanAreYouLookingFor,
//     doYouWantCriticalIllnessInsuranceWithMoney:
//       formData.doYouWantCriticalIllnessInsuranceWithMoney,
//     howDoYouConsiderYourHealth: formData.howDoYouConsiderYourHealth,
//     whatsYourProfession: formData.whatsYourProfession,
//     howManyCriticalIllnessCoverageYouNeed:
//       formData.howManyCriticalIllnessCoverageYouNeed,
//     howMuchMonthlyBenefitDoYouNeed: formData.howMuchMonthlyBenefitDoYouNeed,
//     selectTheDurationOfTheCoverage: formData.selectTheDurationOfTheCoverage,
//     youAreSeekingCoverageFor: formData.youAreSeekingCoverageFor,
//     enterThAamountOfMortgageCoverageRequired:
//       formData.enterThAamountOfMortgageCoverageRequired,
//     whatsYourAge: formData.whatsYourAge,
//     doYouHaveAnyMedicalIssue: formData.doYouHaveAnyMedicalIssue,
//     respAccountsForYourChildChildrens:
//       formData.respAccountsForYourChildChildrens,
//     secureYourChildsFutureWithHigherEducation:
//       formData.secureYourChildsFutureWithHigherEducation,
//     howMuchDoYouWantToSaveMonthly: formData.howMuchDoYouWantToSaveMonthly,
//     growthOnYourInvestmentInRespAccount:
//       formData.growthOnYourInvestmentInRespAccount,
//     wouldLikeToIncreaseMonthlyDeposits:
//       formData.wouldLikeToIncreaseMonthlyDeposits,
//     qualifyFor15BonusOfYourRespAccount:
//       formData.qualifyFor15BonusOfYourRespAccount,
//     howManyChildrensDoYouHave: formData.howManyChildrensDoYouHave,
//     eligibleToGetExtra2000InGovernmentGrants:
//       formData.eligibleToGetExtra2000InGovernmentGrants,
//     whatIsYourResidencyStatusInCanada:
//       formData.whatIsYourResidencyStatusInCanada,
//     depositEveryMonthTowardsYourChildEducation:
//       formData.depositEveryMonthTowardsYourChildEducation,
//     howLongDoYouNeedCoverageFor: formData.howLongDoYouNeedCoverageFor,
//     wouldYouLikeToKnowHowRespWorks: formData.wouldYouLikeToKnowHowRespWorks,
//     oneyRequireToCompleteYourChildsEducation:
//       formData.oneyRequireToCompleteYourChildsEducation,
//     moneyRequireToCompleteYourChildsEducation:
//       formData.moneyRequireToCompleteYourChildsEducation,
//     selectYourAgeBracket: formData.selectYourAgeBracket,
//     oneMillionInanRespAccountAtRetirement:
//       formData.oneMillionInanRespAccountAtRetirement,
//     howMuchdoYouWantToSaveYearly: formData.howMuchdoYouWantToSaveYearly,
//     doYouWanToDepositMonthlyOrYearlyPremium:
//       formData.doYouWanToDepositMonthlyOrYearlyPremium,
//     wouldYouLikeToKnowHowTfsaWorks: formData.wouldYouLikeToKnowHowTfsaWorks,
//     whatageDoYouWanttostartTheWithdrawalFrom:
//       formData.whatageDoYouWanttostartTheWithdrawalFrom,
//     whatKindOfBusinesssIsIt: formData.whatKindOfBusinesssIsIt,
//     wouldYouLikeToKnowHowRrspWorks: formData.wouldYouLikeToKnowHowRrspWorks,
//     oneMillionInAnTfsaAccountAtRetirement:
//       formData.oneMillionInAnTfsaAccountAtRetirement,
//     areYouAnOwnerOrEmployeeOfTheBusiness:
//       formData.areYouAnOwnerOrEmployeeOfTheBusiness,
//     gclidField: formData.gclidField,
//     areYouLookingForDrugAndDentalOrJustDrugPla:
//       formData.areYouLookingForDrugAndDentalOrJustDrugPla,
//     areYouLicensedAsAnInsuranceAdvisor:
//       formData.areYouLicensedAsAnInsuranceAdvisor,
//     whatTimeFrameYouLikeToMoveToBeaAdvisor:
//       formData.whatTimeFrameYouLikeToMoveToBeaAdvisor,
//     wouldYouLikeToKnowHowSuperVisaInsuranceWo:
//       formData.wouldYouLikeToKnowHowSuperVisaInsuranceWo,
//     existingHealthConditions: formData.existingHealthConditions,
//     singleOrFamilyPlan: formData.singleOrFamilyPlan,
//     monthlyPremiumKnowledge: formData.monthlyPremiumKnowledge,
//   };

//   const updatedFamilyTree = {
//     ROWID: formData.familyTreeRowId,
//     relationShipStatus: formData.relationShipStatus,
//     numberofSpouse: formData.numberOfSpouse,
//     anniversaryDate: new Date(formData.anniversaryDate),
//     nameOfSpouse: formData.nameOfSpouse,
//     spouseDateOfBirth: new Date(formData.spouseDateOfBirth),
//     phoneOfSpouse: formData.phoneOfSpouse,
//     emailOfSpouse: formData.emailOfSpouse,
//     nameOfCommonLawPartner: formData.nameOfCommonLawPartner,
//     commonLawDateOfBirth: new Date(formData.commonLawDateOfBirth),
//     dependentParents: formData.dependentParents,
//     numberOfDependentParents: formData.numberOfDependentParents,
//     dependentChildren: formData.dependentChildren,
//     numberOfDependentChildren: formData.numberOfDependentChildren,
//     siblings: formData.siblings,
//     numberOfSiblings: formData.numberOfSiblings,
//     emergencyinfo: formData.emergencyinfo,
//     emergencyContactName: formData.emergencyContactName,
//     emergencyContactPhone: formData.emergencyContactPhone,
//     emergencyContactRelationship: formData.emergencyContactRelationship,
//     emergencyContactEmail: formData.emergencyContactEmail,
//   };

//   const updatedLeadService = {
//     ROWID: formData.leadServiceId,
//     potentialBusiness: formData.potentialBusiness,
//     loanProtection: formData.loanProtection,
//     servicesRequested: formData.servicesRequested,
//     lifeInsurance: formData.lifeInsurance,
//     investments: formData.investments,
//     livingBenefits: formData.livingBenefits,
//     groupInsurance: formData.groupInsurance,
//     travelInsurance: formData.travelInsurance,
//     combinationOrHybridInsurance: formData.combinationOrHybridInsurance,
//     autoInsurance: formData.autoInsurance,
//     healthAndDentalInsurance: formData.healthAndDentalInsurance,
//     homeInsurance: formData.homeInsurance,
//     businessLiabilityInsurance: formData.businessLiabilityInsurance,
//     immigrationServices: formData.immigrationServices,
//     campaignidData: formData.campaignidData,
//     networkData: formData.networkData,
//     adgroupidData: formData.adgroupidData,
//     deviceData: formData.deviceData,
//     matchtypeData: formData.matchtypeData,
//     keywordData: formData.keywordData,
//     gclidData: formData.gclidData,
//     lpUrlData: formData.LpUrlData,
//     adAccount: formData.adAccount,
//     adSet: formData.adSet,
//     adAccountID: formData.adAccountID,
//     adSetID: formData.adSetID,
//     adCampaign: formData.adCampaign,
//     faceBookAd: formData.faceBookAd,
//     adCampaignID: formData.adCampaignID,
//     adID: formData.adID,
//     faceBookPage: formData.faceBookPage,
//     leadForm: formData.leadForm,
//     faceBookPageID: formData.faceBookPageID,
//     leadFormID: formData.leadFormID,
//     costPerLead: formData.costPerLead,
//     facebookAdInformation: formData.facebookAdInformation,
//   };

//   const updatedDependentParents = formData.dependentParentsData;
//   const newDependentParents = formData.newDependentParentsData;

//   const updatedDependentChildren = formData.dependentChildrenData;
//   const newDependentChildren = formData.newDependentChildrenData;

//   const updatedSiblings = formData.siblingData;
//   const newSiblings = formData.newSiblingData;

//   const updatedFestival = formData.festivalsData;
//   const newFestivalData = formData.newFestivalData;
//   const deletedFestivalData = formData.deletedFestivalData;

//   const updatedEmergencyContactData = formData.emergencyContactData;
//   const newEmergencyContactCreated = formData.newEmergencyContactCreated;
//   const deletedEmeregncyContact = formData.deletedEmergencyContact;

//   // console.log("updatedFamilyTree", updatedFamilyTree)
//   // console.log("updatedLeadInfo", updatedLeadInfo);
//   let leadResponse;
//   try {
//     const catalystApp = catalyst.initialize(req, { scope: "admin" });

//     // Update the leadss table based on ROWID
//     leadResponse = await catalystApp
//       .datastore()
//       .table("leads")
//       .updateRow({ ROWID: id, ...updatedlead });

//     // Update the leadsDescription table based on the foreign key leadtId
//     // console.log("updateLeadsDescription", { leadId: id, ...updateLeadsDescription })
//     const leadDescription = await catalystApp
//       .datastore()
//       .table("leadsDescription")
//       .updateRow({ leadId: id, ...updateLeadsDescription });
//     // Update other related tables based on the foreign key leadtId
//     // console.log(formData);
//     const familyTreeResponse = await catalystApp
//       .datastore()
//       .table("familyTree")
//       .updateRow({ leadId: id, ...updatedFamilyTree });

//     const leadInfoResult = await catalystApp
//       .datastore()
//       .table("leadService")
//       .updateRow({ leadId: id, ...updatedLeadService });

//     if (
//       formData.dependentParentsData &&
//       formData.dependentParentsData.length > 0
//     ) {
//       const updatedParentsResponse = await updateSubFormData(
//         updatedDependentParents,
//         req,
//         "dependentParents"
//       );
//     }
//     if (
//       formData.newDependentParentsData &&
//       formData.newDependentParentsData.length > 0
//     ) {
//       const updatedNewDependentParentsResponse =
//         await insertMultipleRowsIntoTable(
//           "dependentParents",
//           newDependentParents,
//           req,
//           leadResponse
//         );
//     }
//     if (
//       formData.dependentChildrenData &&
//       formData.dependentChildrenData.length > 0
//     ) {
//       const dependentChildranResult = await updateSubFormData(
//         updatedDependentChildren,
//         req,
//         "dependentChildren"
//       );
//     }
//     if (
//       formData.newDependentChildrenData &&
//       formData.newDependentChildrenData.length > 0
//     ) {
//       const updatedNewDependentChildrenResponse =
//         await insertMultipleRowsIntoTable(
//           "dependentChildren",
//           newDependentChildren,
//           req,
//           leadResponse
//         );
//     }

//     if (formData.siblingData && formData.siblingData.length > 0) {
//       const siblingsResult = await updateSubFormData(
//         updatedSiblings,
//         req,
//         "contactsSiblings"
//       );
//     }
//     if (formData.newSiblingData && formData.newSiblingData.length > 0) {
//       const updatedNewDependentChildrenResponse =
//         await insertMultipleRowsIntoTable(
//           "contactsSiblings",
//           newSiblings,
//           req,
//           leadResponse
//         );
//     }

//     if (formData.festivalsData && formData.festivalsData.length > 0) {
//       const festivalResult = await updateSubFormData(
//         updatedFestival,
//         req,
//         "festivals"
//       );
//     }
//     if (formData.newFestivalData && formData.newFestivalData.length > 0) {
//       const newFestivalResult = await insertMultipleRowsIntoTable(
//         "festivals",
//         newFestivalData,
//         req,
//         leadResponse
//       );
//     }
//     if (
//       formData.deletedFestivalData &&
//       formData.deletedFestivalData.length > 0
//     ) {
//       const deleteFestivalResult = await deleteById(
//         "festivals",
//         deletedFestivalData,
//         req
//       );
//     }
//     if (
//       formData.emergencyContactData &&
//       formData.emergencyContactData.length > 0
//     ) {
//       const emergencyContactResult = await updateSubFormData(
//         updatedEmergencyContactData,
//         req,
//         "contactEmergencyDetails",
//         leadResponse
//       );

//       if (
//         formData.newEmergencyContactCreated &&
//         formData.newEmergencyContactCreated.length > 0
//       ) {
//         const newEmergencyContactResult = await insertMultipleRowsIntoTable(
//           "contactEmergencyDetails",
//           newEmergencyContactCreated,
//           req,
//           leadResponse
//         );
//         // console.log("field created",newEmergencyContactResult);
//       }

//       if (
//         formData.deletedEmergencyContact &&
//         formData.deletedEmergencyContact.length > 0
//       ) {
//         // console.log("delete emergencyContactResult",deletedEmeregncyContact);
//         const deleteEmergencyContactResult = await deleteById(
//           "contactEmergencyDetails",
//           deletedEmeregncyContact,
//           req
//         );
//         // console.log("delete emergencyContactResult",deleteEmergencyContactResult);
//       }
//     }
//     // Node.del("contactList")
//     res.status(200).json({
//       message: "Lead updated successfully",
//       success: true,
//     });
//   } catch (err) {
//     console.error("Error updating Lead:", err);
//     res.status(500).json({
//       message: "Failed to update Lead",
//       success: false,
//       error: err.message,
//     });
//   }
// };
exports.deleteLead = async (req, res) => {
  try {
    // Initialize Catalyst
    const adminApp = catalyst.initialize(req, { scope: "admin" });

    // Execute the delete query
    const leadId = req.params.id || req.body.ids;
    const leadDetails = await adminApp
      .zcql()
      .executeZCQLQuery(`${query.deleteLead}(${leadId})`);

    // Invalidate the cache for leads
    cache.del("leadDetails");

    // Send success response
    res.status(200).json({
      success: true,
      message: "Lead and associated data deleted successfully",
      data: leadDetails,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error deleting lead:", error);

    // Send error response with error details
    res.status(500).json({
      success: false,
      message: "Failed to delete lead and associated data",
      error: error.message || error,
    });
  }
};
exports.leadConvert = async (req, res) => {
  const convertData = req.body;
  const leadId = req.params.id;
  const catalystApp = catalyst.initialize(req, { scope: "admin" });
  let dealId = "";
  // Get Lead
  const leadData = await catalystApp
    .datastore()
    .table("leads")
    .getRow(leadId)
    .catch((error) => {
      console.log("Lead Pulling Issue:", error);
      res
        .status(403)
        .json({ success: false, message: "Lead Pulling Issue", output: error });
    });
  
  if (!leadData) return;
  //  Contact Creation
  let contactId = await createContact(leadData,catalystApp,leadId,convertData);
  // Deal Creation
  if (convertData.isChecked === true) {
    dealId = await createDeal(catalystApp,leadId,convertData,contactId);
  }

  // Update Lead
  const updateLeadData = {
    leadStatus: "Converted",
    ROWID: leadId,
  };
  await catalystApp
    .datastore()
    .table("leads")
    .updateRow(updateLeadData)
    .catch((error) => {
      console.log("Lead Update Issue:", error);
      res
        .status(403)
        .json({ success: false, message: "Lead Update Issue", output: error });
      return '';
    });
  res.status(200).json({
    leadId: leadId,
    contactid: contactId,
    dealid: dealId,
  });
};
async function createContact(leadData,catalystApp,leadId,convertData){
  const contactData = {
    firstName: leadData.firstName ? leadData.firstName:'',
    lastName: leadData.lastName ? leadData.lastName:'',
    mobile: leadData.mobile ? leadData.mobile:'',
    email: leadData.email ? leadData.email:'',
    contactOwner: convertData.owner ? convertData.owner:null,
    status: "Active",
    leadId: leadId
  };
  const contactResp = await catalystApp
      .datastore()
      .table("contacts")
      .insertRow(contactData)
      .catch((error) => {
        console.log("Contact insert Issue:", error); 
        throw error     
      }); 
    return contactResp.ROWID;
}
async function createDeal(catalystApp,leadId,convertData,contactId){
  const dealData = {
    name: convertData.dealName? convertData.dealName:'',
    status: "Active",
    contactName: contactId? contactId:null,
    dealOwner: convertData.owner? convertData.owner:null,
    dealStage: convertData.stage? convertData.stage:'',
    claimAmount: convertData.amount? convertData.amount:null,
    insuranceLead: leadId,
    campaignSource: convertData.campaignSource ? convertData.campaignSource:null,
    contactRole: convertData.contactRole ? convertData.contactRole:null,
    claimClosedOn: convertData.closeDate ? convertData.closeDate:null
  };
  let dealResp = await catalystApp
    .datastore()
    .table("deals")
    .insertRow(dealData)
    .catch((error) => {
      console.log("Deal insert Issue:", error);
      throw error
    });
  return dealResp.ROWID;
}