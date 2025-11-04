const catalyst = require("zcatalyst-sdk-node");
const searchQueryBuilder = require("./searchQueryBuilder")
const {
  insertDataIntoTable,
  insertMultipleRowsIntoTable,
  deleteDataFromTable,
  updateSubFormData,
  deleteById,
} = require("./utils");

exports.createNewPolicy = async (req, res) => {
  const formData = req.body;
  // console.log("forms data =>", formData);
  const policyData = {

    policyName: formData.BasicInfo.policyName ? formData.BasicInfo.policyName :null,
    policyNumber: formData.BasicInfo.policyNumber ? formData.BasicInfo.policyNumber :null,
    coverageAmount: parseFloat(formData.BasicInfo.coverageAmount) ? parseFloat(formData.BasicInfo.coverageAmount) :null,
    clientCampaignSource: formData.BasicInfo.clientCampaignSource ? formData.BasicInfo.clientCampaignSource :'',
    email: formData.BasicInfo.email ? formData.BasicInfo.email :"",
    policyPremiumI: parseFloat(formData.BasicInfo.policyPremiumI) ? parseFloat(formData.BasicInfo.policyPremiumI) :null,
    clientMobile: formData.BasicInfo.clientMobile ? formData.BasicInfo.clientMobile: null,
    productFycPercent: parseFloat(formData.BasicInfo.productFycPercent) ? parseFloat(formData.BasicInfo.productFycPercent) :null,
    insuranceCompanyAccount: parseFloat(formData.BasicInfo.insuranceCompanyAccount) ? parseFloat(formData.BasicInfo.insuranceCompanyAccount) :null,
    corporateBonusPercent: parseFloat(formData.BasicInfo.corporateBonusPercent) ? parseFloat(formData.BasicInfo.corporateBonusPercent) :null,
    offeringId: parseFloat(formData.BasicInfo.offeringId) ? parseFloat(formData.BasicInfo.offeringId) :null,
    advisorBonusOfFyc: parseFloat(formData.BasicInfo.advisorBonusOfFyc) ? parseFloat(formData.BasicInfo.advisorBonusOfFyc) :null,
    whatsapp: parseFloat(formData.BasicInfo.whatsapp) ? parseFloat(formData.BasicInfo.whatsapp) :null,
    locationDiscountFactor: parseFloat(formData.BasicInfo.locationDiscountFactor) ? parseFloat(formData.BasicInfo.locationDiscountFactor) : null,
    exchangeRate: parseFloat(formData.BasicInfo.exchangeRate) ? parseFloat(formData.BasicInfo.exchangeRate) :null,
    updateOfferingId: parseFloat(formData.BasicInfo.updateOfferingId) ? parseFloat(formData.BasicInfo.updateOfferingId) :false,
    updatePolicyStatus: parseFloat(formData.BasicInfo.updatePolicyStatus) ? parseFloat(formData.BasicInfo.updatePolicyStatus) :false,
    triggerSupervisa: parseFloat(formData.BasicInfo.triggerSupervisa) ? parseFloat(formData.BasicInfo.triggerSupervisa) :false,
    clientAddress: formData.BasicInfo.clientAddress ? formData.BasicInfo.clientAddress :"",
    commentsOnRating: formData.BasicInfo.commentsOnRating ? formData.BasicInfo.commentsOnRating :'',
    layout: formData.BasicInfo.layout ? formData.BasicInfo.layout :"",
    policyOwner: formData.BasicInfo.policyOwner ? formData.BasicInfo.policyOwner :null,
    sendToPolicyStartDateEmailTrack: formData.BasicInfo.sendToPolicyStartDateEmailTrack ? formData.BasicInfo.sendToPolicyStartDateEmailTrack :'',
    sendToBotResult: formData.BasicInfo.sendToBotResult ? formData.BasicInfo.sendToBotResult :'',
    phoneUpdated: formData.BasicInfo.phoneUpdated ? formData.BasicInfo.phoneUpdated : null,
    premiumFrequency: formData.BasicInfo.premiumFrequency ? formData.BasicInfo.premiumFrequency :null,
    policyStatus: formData.BasicInfo.policyStatus ? formData.BasicInfo.policyStatus :"",
    //  // service details
     isClientTheInsured: formData.Services.isClientTheInsured ? formData.Services.isClientTheInsured : '',
     areThereMultipleInsured: formData.Services.areThereMultipleInsured ? formData.Services.areThereMultipleInsured : '',
     numberOfInsured: formData.Services.numberOfInsured ? formData.Services.numberOfInsured : null,
     clientBeneficiary: formData.Services.areThereMultipleBeneficiary ? formData.Services.areThereMultipleBeneficiary :'',
     isClientABeneficiary: formData.Services.isClientABeneficiary ? formData.Services.isClientABeneficiary :null,
     numberofBeneficiaries: formData.Services.numberofBeneficiaries ? formData.Services.numberofBeneficiaries :null,
     trusteesPolicy: formData.Services.areThereTrusteeForThisPolicy ? formData.Services.areThereTrusteeForThisPolicy :'',
     numberOfTrustee: formData.Services.numberOfTrustee ? formData.Services.numberOfTrustee :null,
     applicationOn: new Date(formData.Services.applicationOn) ? new Date(formData.Services.applicationOn) :null,
     trustDissolutionDate: new Date(formData.Services.trustDissolutionDate) ? new Date(formData.Services.trustDissolutionDate) :null,
     trustDocumentRecievedAndUploaded: formData.Services.trustDocumentRecievedAndUploaded ? formData.Services.trustDocumentRecievedAndUploaded :null, 

    //  policyAdvisor: formData.BasicInfo.policyAdvisor ? formData.BasicInfo.policyAdvisor :null,
    //  client: formData.BasicInfo.client ? formData.BasicInfo.client :null,
    //  commissionReceived: formData.BasicInfo.advisorCommisionRecieved ? formData.BasicInfo.advisorCommisionRecieved :null,
    //  policyType: formData.BasicInfo.policyType ? formData.BasicInfo.policyType :null,
    //  deal: formData.BasicInfo.deal ? formData.BasicInfo.deal :null,
    //  issuedBy: formData.BasicInfo.issuedBy ? formData.BasicInfo.issuedBy :null,
    //  bonusLevel: parseInt(formData.BasicInfo.advisorBonusLevel) ? parseInt(formData.BasicInfo.advisorBonusLevel) :null,
    //  pbCompliance: formData.BasicInfo.advisorProbhitedBehaviourCompliance ? formData.BasicInfo.advisorProbhitedBehaviourCompliance :null,
    //  firstPolicy: formData.BasicInfo.clientFirstPolicy ? formData.BasicInfo.clientFirstPolicy :null,
    //  note: formData.BasicInfo.notes ? formData.BasicInfo.notes :null,
    //  conductCompliance: formData.BasicInfo.advisorCodeOfConductComplaince ? formData.BasicInfo.advisorCodeOfConductComplaince :null,
    //  // advisorName: formData.BasicInfo.advisorName ? formData.BasicInfo.advisorName :null,
    //  location: formData.BasicInfo.location ? formData.BasicInfo.location :null,
    //  attachmentLink: formData.BasicInfo.policyAttachmentLink ? formData.BasicInfo.policyAttachmentLink :null,
   };
  try {
    // Initialize Catalyst
    const catalystApp = catalyst.initialize(req, { scope: "admin" });
    const policyResult = await insertDataIntoTable(catalystApp, "policies", policyData );

    console.log("policyResult <====>", policyResult);

    const subPolicyData = {
      applicationSubmittedOn: new Date(formData.PolicyDetails.applicationSubmittedOn) ? new Date(formData.PolicyDetails.applicationSubmittedOn) :null,
      nextFollowUpDate: new Date(formData.PolicyDetails.nextFollowUpDate) ? new Date(formData.PolicyDetails.nextFollowUpDate) :null,
      newPolicyStartDate  : new Date(formData.PolicyDetails.newPolicyStartDate) ? new Date(formData.PolicyDetails.newPolicyStartDate) :null,
      applicationInitiatedOn  : new Date(formData.PolicyDetails.applicationInitiatedOn) ? new Date(formData.PolicyDetails.applicationInitiatedOn) :null,
      policyApprovedDate: new Date(formData.PolicyDetails.policyApprovedDate) ? new Date(formData.PolicyDetails.policyApprovedDate) :null,
      policyAttachmentLink: new Date(formData.PolicyDetails.policyAttachmentLink) ? new Date(formData.PolicyDetails.policyAttachmentLink) :null,
      nameOfConfirmationRenewal: new Date(formData.PolicyDetails.nameOfConfirmationRenewal) ? new Date(formData.PolicyDetails.nameOfConfirmationRenewal) :null,
      policyStartDate: new Date(formData.PolicyDetails.policyStartDate) ? new Date(formData.PolicyDetails.policyStartDate) :null,
      policyIssuedDate: new Date(formData.PolicyDetails.policyIssuedDate) ? new Date(formData.PolicyDetails.policyIssuedDate) :null,
      policyExpiresOn: new Date(formData.PolicyDetails.policyExpiresOn) ? new Date(formData.PolicyDetails.policyExpiresOn) :null,
      nameOfConfirmation: new Date(formData.PolicyDetails.nameOfConfirmation) ? new Date(formData.PolicyDetails.nameOfConfirmation) :null,
      policyPickedUpOn: new Date(formData.PolicyDetails.policyPickedUpOn) ? new Date(formData.PolicyDetails.policyPickedUpOn) :null,
      applicationPostponedTo: new Date(formData.PolicyDetails.applicationPostponedTo) ? new Date(formData.PolicyDetails.applicationPostponedTo) :null,
      policyDeclineDate: new Date(formData.PolicyDetails.policyDeclineDate) ? new Date(formData.PolicyDetails.policyDeclineDate) :null,
      earlyReturnAmendmentRequested: new Date(formData.PolicyDetails.earlyReturnAmendmentRequested) ? new Date(formData.PolicyDetails.earlyReturnAmendmentRequested) :null,
      earlyReturnAmendmentCompletedDate: new Date(formData.PolicyDetails.earlyReturnAmendmentCompletedDate) ? new Date(formData.PolicyDetails.earlyReturnAmendmentCompletedDate) :null,
      policyRenewalDate: new Date(formData.PolicyDetails.policyRenewalDate) ? new Date(formData.PolicyDetails.policyRenewalDate) :null,
      policyReviewCommentUpdatedOn: new Date(formData.PolicyDetails.policyReviewCommentUpdatedOn) ? new Date(formData.PolicyDetails.policyReviewCommentUpdatedOn) :null,
      reasonForPolicyBeingDeclined: formData.PolicyDetails.reasonForPolicyBeingDeclined ? formData.PolicyDetails.reasonForPolicyBeingDeclined :null,
      earlyReturnApplicationCancelled: formData.PolicyDetails.earlyReturnApplicationCancelled ? new Date(formData.PolicyDetails.earlyReturnApplicationCancelled) :null,
      earlyReturnAmendmentRequestedFor: new Date(formData.PolicyDetails.earlyReturnAmendmentRequestedFor) ? new Date(formData.PolicyDetails.earlyReturnAmendmentRequestedFor) :null,
      policyReviewComments: formData.PolicyDetails.policyReviewComments ? formData.PolicyDetails.policyReviewComments :'',
      cancellation: formData.PolicyDetails.cancellation ? formData.PolicyDetails.cancellation :'',
      renwalExpired: formData.PolicyDetails.renwalExpired ? formData.PolicyDetails.renwalExpired :'',
      premiumPaidDuringPickUpPeriod: formData.PolicyDetails.premiumPaidDuringPickUpPeriod ? formData.PolicyDetails.premiumPaidDuringPickUpPeriod :null,
      applicationMedicalRequirement: formData.PolicyDetails.applicationMedicalRequirement ? formData.PolicyDetails.applicationMedicalRequirement :null,
      confirmationPolicyStart: formData.PolicyDetails.confirmationPolicyStart ? formData.PolicyDetails.confirmationPolicyStart :null,
      renewalMedicalRequirement: formData.PolicyDetails.renewalMedicalRequirement ? formData.PolicyDetails.renewalMedicalRequirement :null,
      policyRenewalCompleted: formData.PolicyDetails.policyRenewalCompleted ? formData.PolicyDetails.policyRenewalCompleted :null,  
      // clamies details
      totalAmountClaimed: parseFloat(formData.PolicyDetails.totalAmountClaimed) ? parseFloat(formData.PolicyDetails.totalAmountClaimed) :null,
      totalAmountSettled: parseFloat(formData.PolicyDetails.totalAmountSettled) ? parseFloat(formData.PolicyDetails.totalAmountSettled) :null,
      totalAmountRejected: parseFloat(formData.PolicyDetails.totalAmountRejected) ? parseFloat(formData.PolicyDetails.totalAmountRejected) :null,
      ringcentralSmsResponse: formData.PolicyDetails.ringcentralSmsResponse ? formData.PolicyDetails.ringcentralSmsResponse :'', 
      areCurrentClaimonThisPolicy: formData.PolicyDetails.areCurrentClaimonThisPolicy ? formData.PolicyDetails.areCurrentClaimonThisPolicy :'', 
      arePastClaimonThisPolicy: formData.PolicyDetails.arePastClaimonThisPolicy ? formData.PolicyDetails.arePastClaimonThisPolicy :'', 
      claimOutcome: formData.PolicyDetails.claimOutcome ? formData.PolicyDetails.claimOutcome :null,    
      // approvalRating: formData.PolicyDetails.approvalRating ? formData.PolicyDetails.approvalRating :null,
      // reviewedDate: new Date(formData.PolicyDetails.reviewedDate) ? new Date(formData.PolicyDetails.reviewedDate) :null,
      // anyCurrentClaimsOnThisPolicy: formData.PolicyDetails.anyCurrentClaimsOnThisPolicy ? formData.PolicyDetails.anyCurrentClaimsOnThisPolicy :null,
      // anyPastClaimsOnThePolicy: formData.PolicyDetails.anyPastClaimsOnThePolicy ? formData.PolicyDetails.anyPastClaimsOnThePolicy :null,
      // dateOfClaim: new Date(formData.PolicyDetails.dateOfClaim) ? new Date(formData.PolicyDetails.dateOfClaim) :null, 
      // reasonOfClaim: formData.PolicyDetails.reasonOfClaim ? formData.PolicyDetails.reasonOfClaim :null,
      // claimAmount: parseFloat(formData.PolicyDetails.claimAmount) ? parseFloat(formData.PolicyDetails.claimAmount) :null,
      // claimClosedOn: new Date(formData.PolicyDetails.claimClosedOn) ? new Date(formData.PolicyDetails.claimClosedOn) :null,
      // claimSubmitted: formData.PolicyDetails.claimSubmitted ? formData.PolicyDetails.claimSubmitted :null,
      // renewalMedicalConformationNumber: formData.PolicyDetails.renewalMedicalConformationNumber ? formData.PolicyDetails.renewalMedicalConformationNumber :null,
      policiesId: policyResult.ROWID ? policyResult.ROWID :null,
    };
    const contactSubDetailsResult = await insertDataIntoTable( catalystApp, "policySubDetails", subPolicyData );
    
    console.log("contactSubDetailsResult <===>", contactSubDetailsResult)

    const supervisaPolicySubDetailsData = {
          dayWiseCorporateCommision: parseFloat(formData.Commission.dayWiseCorporateCommision) ? parseFloat(formData.Commission.dayWiseCorporateCommision) :null,
          dayWiseLocationCommision: parseFloat(formData.Commission.dayWiseLocationCommision) ? parseFloat(formData.Commission.dayWiseLocationCommision) :null,
          dayWiseAdvisorCommision: parseFloat(formData.Commission.dayWiseAdvisorCommision) ? parseFloat(formData.Commission.dayWiseAdvisorCommision) : null,
          policyMonth: parseFloat(formData.Commission.policyMonth) ? parseFloat(formData.Commission.policyMonth) :null,
          updateCommission: parseFloat(formData.Commission.updateCommission) ? parseFloat(formData.Commission.updateCommission) :null,
          totalGrossLocationCommision: parseFloat(formData.Commission.totalGrossLocationCommision) ? parseFloat(formData.Commission.totalGrossLocationCommision) :null,
          totalNetLocationCommission: parseFloat(formData.Commission.totalNetLocationCommission) ? parseFloat(formData.Commission.totalNetLocationCommission) :null,
          corporateCommission: parseFloat(formData.Commission.corporateCommission) ? parseFloat(formData.Commission.corporateCommission) :null,
          corporateCommissionAmount: parseFloat(formData.Commission.corporateCommissionAmount) ? parseFloat(formData.Commission.corporateCommissionAmount) :null,
          locationCommission: parseFloat(formData.Commission.locationCommission) ? parseFloat(formData.Commission.locationCommission) :null,
          totalGrossCorpoarateCom: parseFloat(formData.Commission.totalGrossCorpoarateCom) ? parseFloat(formData.Commission.totalGrossCorpoarateCom) :null,
          totalGrossAdvisorCommission: parseFloat(formData.Commission.totalGrossAdvisorCommission) ? parseFloat(formData.Commission.totalGrossAdvisorCommission) :null,
          totalNetCorporateCommision: parseFloat(formData.Commission.totalNetCorporateCommision) ? parseFloat(formData.Commission.totalNetCorporateCommision) :null,
          advisorCommission: parseFloat(formData.Commission.advisorCommission) ? parseFloat(formData.Commission.advisorCommission) :null,
          totalNetAdvisorCommission: parseFloat(formData.Commission.totalNetAdvisorCommission) ? parseFloat(formData.Commission.totalNetAdvisorCommission) :null,
          totalNetCorporateCom: parseFloat(formData.Commission.totalNetCorporateCom) ? parseFloat(formData.Commission.totalNetCorporateCom) :null,
          totalGrossLocationCom: parseFloat(formData.Commission.totalGrossLocationCom) ? parseFloat(formData.Commission.totalGrossLocationCom) :null,    
         
          policyId: policyResult.ROWID ? policyResult.ROWID :null,
        };

    const superVisaSubDetailsResult = await insertDataIntoTable(catalystApp, "supervisaPolicySubDetails", supervisaPolicySubDetailsData );
    console.log("superVisaSubDetailsResult=====>", superVisaSubDetailsResult);
    // inserting into subforms

    let contingentBeneficiaryDataResult;
    if ( formData.Services.ContingentBeneficiary && formData.Services.ContingentBeneficiary.length > 0) {
      contingentBeneficiaryDataResult = await insertMultipleRowsIntoTable(
        "contingentBeneficiary",
        formData.Services.ContingentBeneficiary,
        req,
        policyResult
      );
    }

    console.log("contingentBeneficiaryDataResult", contingentBeneficiaryDataResult);
    let policyOwnerShipResult;
    if (
      formData.Services.OwnwerShip &&
      formData.Services.OwnwerShip.length > 0
    ) {
      policyOwnerShipResult = await insertMultipleRowsIntoTable(
        "policyOwnership",
        formData.Services.OwnwerShip,
        req,
        policyResult
      );
    }
    let beneficiaryResult;

    if (
      formData.Services.Beneficiary &&
      formData.Services.Beneficiary.length > 0
    ) {
      beneficiaryResult = await insertMultipleRowsIntoTable(
        "beneficiary",
        formData.Services.Beneficiary,
        req,
        policyResult
      );
    }
    let policyTrusteeResult = null;
    if (formData.Services.Trustee && formData.Services.Trustee.length > 0) {
      console.log("this is policy trustee Data ", formData.Services.Trustee);
      policyTrusteeResult = await insertMultipleRowsIntoTable(
        "trustees",
        formData.Services.Trustee,
        req,
        policyResult
      );
    }
    let policyCommissioninfoResult;

    if ( formData.Commission.Commission && formData.Commission.Commission.length > 0  ) {     
      policyCommissioninfoResult = await insertMultipleRowsIntoTable(
        "policyCommission",
        formData.Commission.Commission,
        req,
        policyResult
      );
    }

    res.status(201).json({
      success: true,
      policyResult,
      message: "Policies Created Successfully",
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error creating policy:", error);
    // Send error response with error details
    res.status(409).json({
      success: false,
      message: "Failed to create policy",
      error: error, // Include error message for better error reporting
    });
  }
};

exports.getAllPolicy = async (req, res) => {
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  try {
    if (req.params.id) {
      console.log("This is policies id", req.params.id);
      const policyResult = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from policies Where ROWID=${req.params.id}`
        );
      const policySubDetails = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from policySubDetails Where policiesId=${req.params.id}`
        );
      const policyOwnerShip = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from policyOwnership Where policyId=${req.params.id}`
        );
      const beneficiary = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from beneficiary Where policyId=${req.params.id}`
        );

      const contingentBeneficiary = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from contingentBeneficiary Where policyId=${req.params.id}`
        );

      const supervisaPolicySubDetails = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from supervisaPolicySubDetails Where policyId=${req.params.id}`
        );
      const policyCommissionResult = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from policyCommission Where policyId=${req.params.id}`
        );
      const policyTrusteeResult = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from trustees Where policyId=${req.params.id}`
        );

      res.setHeader("Content-Type", "application/json");
      res.status(200).json({
        success: true,
        message: "policies  result got",
        data: {
          policyResult,
          policySubDetails,
          policyOwnerShip,
          beneficiary,
          contingentBeneficiary,
          supervisaPolicySubDetails,
          policyCommissionResult,
          policyTrusteeResult,
        },
      });
    } else {
      // Initialize Catalyst with the appropriate scope

      // Define SQL queries to fetch contact data and contact sub-data
      const policyQuery = `SELECT 
      policies.*, 
      contacts.firstName AS contactFirstName, 
      contacts.lastName AS contactLastName, 
      contacts.ROWID AS contactROWID,
      userData.lastName AS userLastName,
      userData.firstName AS userFirstName
  FROM 
      policies 
  LEFT JOIN 
      contacts ON policies.client = contacts.ROWID 
  LEFT JOIN 
      userData ON policies.policyOwner = userData.ROWID
  WHERE 
      policies.layout = 'Life Policies' OR policies.layout = 'Travel And SuperVisa'`;
      // Execute the SQL queries to fetch contact data and contact sub-data
      const policyData = await adminApp.zcql().executeZCQLQuery(policyQuery);

      // Respond with the fetched data
      res.status(200).json({
        success: true,
        message: "policy details fetched successfully",
        policyData,
      });
    }
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch contact data", error });
  }
};
exports.getInsurencePartner = async (req, res) => {
  let query = `SELECT insurencePartner.ROWID,insurencePartner.partnerName FROM insurencePartner`;

  const inResponse = catalyst
    .initialize(req, { scope: "admin" })
    .zcql()
    .executeZCQLQuery(query)
    .then((data) => {
      const partnes = data.map((item)=>({name:item.insurencePartner.partnerName, ROWID:item.insurencePartner.ROWID}))
      res.status(200).json(partnes);
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Issue pulling user data",
        error: error,
      });
    });
};
exports.getContacts = async (req, res) => {
  let query = `SELECT contacts.ROWID,contacts.firstName,contacts.lastName FROM contacts`;

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
        message: "Issue pulling Contacts data",
        error: error,
      });
    });
};
exports.getLocations = async (req, res) => {
  let query = `SELECT locations.ROWID,locations.locationName FROM locations`;
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
        message: "Issue pulling Location data",
        error: error,
      });
    });
};
exports.getOffering = async (req, res) => {
  let query = `SELECT offering.ROWID,offering.offeringName FROM offering`;
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
        message: "Issue pulling offering data",
        error: error,
      });
    });
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

exports.deletePolicy = async (req, res) => {
  const policyId = req.params.id;
  console.log("This is policy ID", policyId);
  try {
    // Initialize Catalyst
    const catalystApp = catalyst.initialize(req, { scope: "admin" });

    // Delete associated data from tables based on contactId
    const deletedPolicyCommission = await deleteDataFromTable(
      catalystApp,
      "policyCommission",
      { policyId: policyId }
    );
    const superVisaSubdetailResult = await deleteDataFromTable(
      catalystApp,
      "supervisaPolicySubDetails",
      { policyId: policyId }
    );
    const deletedPolicySubdetailResult = await deleteDataFromTable(
      catalystApp,
      "policySubDetails",
      { policiesId: policyId }
    );
    const contingentBeneficiaryResult = await deleteDataFromTable(
      catalystApp,
      "contingentBeneficiary",
      { policyId: policyId }
    );
    const deletedBeneficiaryResult = await deleteDataFromTable(
      catalystApp,
      "beneficiary",
      { policyId: policyId }
    );
    const deletedPolicyOwnershipResult = await deleteDataFromTable(
      catalystApp,
      "policyOwnership",
      {
        policyId: policyId,
      }
    );
    const deletedPolicies = await deleteDataFromTable(catalystApp, "policies", {
      ROWID: policyId,
    });

    const responseData = {
      deletedPolicies,
      deletedPolicyCommission,
      deletedPolicySubdetailResult,
      contingentBeneficiaryResult,
      deletedBeneficiaryResult,
      deletedPolicyOwnershipResult,
      superVisaSubdetailResult,
      deletedPolicyOwnershipResult,
    };

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

exports.updatePolicy = async (req, res) => {
  const formData = req.body;
  const id = req.params.id;

  console.log(formData);
  const policyData = {
    policyOwner: formData.policyOwner,
    layout: formData.layout,
    policyName: formData.policyName,
    policyNumber: formData.policyNumber,
    coverageAmount: parseFloat(formData.coverageAmount),
    email: formData.email,
    policyPremium: parseFloat(formData.policyPremiumI),
    mobile: formData.clientMobile,
    address: formData.clientAddress,
    policyAdvisor: formData.policyAdvisor,
    status: formData.policyStatus,
    discountFactor: parseFloat(formData.locationDiscountFactor),
    fyc: parseFloat(formData.productFycPercent),
    frequency: formData.premiumFrequency,
    client: formData.client,
    commissionReceived: formData.advisorCommisionRecieved,
    policyType: formData.policyType,
    bonus: parseFloat(formData.corporateBonusPercent),
    deal: formData.deal,
    issuedBy: formData.issuedBy,
    bonusLevel: parseInt(formData.advisorBonusLevel),
    campaignSource: formData.clientCampaignSource,
    pbCompliance: formData.advisorProbhitedBehaviourCompliance,
    firstPolicy: formData.clientFirstPolicy,
    aBonusFyc: parseFloat(formData.advisorBonusOfFyc),
    note: formData.notes,
    commentsOnRating: formData.commentsOnRating,
    conductCompliance: formData.advisorCodeOfConductComplaince,
    advisorName: formData.advisorName,
    location: formData.location,

    isClientTheInsured: formData.isClientTheInsured,
    areThereMultipleInsured: formData.areThereMultipleInsured,
    numberOfInsured: formData.numberOfInsured,
    attachmentLink: formData.policyAttachmentLink,
    clientBeneficiary: formData.areThereMultipleBeneficiary,
    isClientABeneficiary: formData.isClientABeneficiary,
    trusteesPolicy: formData.areThereTrusteeForThisPolicy,
    applicationOn: new Date(formData.applicationOn),
    dissolutionDate: new Date(formData.trustDissolutionDate),
    documentsReceived: formData.TrustDocumentRecievedAndUploaded,
    numberOfTrustee: formData.numberOfTrustee,

    offeringID: formData.offeringID,
    phoneUpdated: formData.phoneupdated,
    offeringName: "15172000000599001",
    ROWID: formData.mainROWID,
  };
  const subPolicyData = {
    applicationSubmittedOn: new Date(formData.applicationSubmittedOn),
    applicationPostponedTo: new Date(formData.applicationPostponedTo),
    nextFollowUpDate: new Date(formData.nextFollowUpDate),
    policyDeclineDate: new Date(formData.policyDeclineDate),
    earlyReturnApplicationCancelled: new Date(
      formData.earlyReturnApplicationCancelled
    ),
    policyApprovedDate: new Date(formData.policyApprovedDate),
    applicationMedicalRequirement: formData.applicationMedicalRequirement,
    approvalRating: formData.approvalRating,
    earlyReturnAmendmentRequested: new Date(
      formData.earlyReturnAmendmentRequested
    ),
    earlyReturnAmendmentRequestedFor: new Date(
      formData.earlyReturnAmendmentRequestedFor
    ),
    policyStartDate: new Date(formData.policyStartDate),
    earlyReturnAmendmentCompletedDate: new Date(
      formData.earlyReturnAmendmentCompletedDate
    ),
    reviewedDate: new Date(formData.reviewedDate),
    policyIssuedDate: new Date(formData.policyIssuedDate),
    policyPickedUpOn: new Date(formData.policyPickedUpOn),
    premiumPaidDuringPickUpPeriod: formData.premiumPaidDuringPickUpPeriod,
    policyRenewalDate: new Date(formData.policyRenewalDate),
    renewalMedicalRequirement: formData.renewalMedicalRequirement,
    policyRenewalCompleted: formData.policyRenewalCompleted,
    policyReviewComments: formData.policyReviewComments,
    policyExpiresOn: new Date(formData.policyExpiresOn),
    policyReviewCommentUpdatedOn: new Date(
      formData.policyReviewCommentUpdatedOn
    ),
    reasonForPolicyBeingDeclined: formData.reasonForPolicyBeingDeclined,
    anyCurrentClaimsOnThisPolicy: formData.anyCurrentClaimsOnThisPolicy,
    anyPastClaimsOnThePolicy: formData.anyPastClaimsOnThePolicy,
    dateOfClaim: new Date(formData.dateOfClaim),
    reasonOfClaim: formData.reasonOfClaim,
    claimAmount: parseFloat(formData.claimAmount),
    claimOutcome: formData.claimOutcome,
    claimClosedOn: new Date(formData.claimClosedOn),
    claimSubmitted: formData.claimSubmitted,
    totalAmountClaimed: parseFloat(formData.totalAmountClaimed),
    totalAmountSettled: parseFloat(formData.totalAmountSettled),
    totalAmountRejected: parseFloat(formData.totalAmountRejected),
    ringcentralSmsResponse: formData.ringcentralSmsResponse,
    renewalMedicalConformationNumber: formData.renewalMedicalConformationNumber,
    renewalMedicalApplicationDateAndTime: new Date(
      formData.renewalMedicalApplicationDateAndTime
    ),

    ROWID: formData.subROWID,
  };
  const supervisaPolicySubDetailsData = {
    dwaCommission: parseFloat(formData.dayWiseAdvisorCommision),
    dwcCommission: parseFloat(formData.dayWiseCorporateCommision),
    dwlCommission: parseFloat(formData.dayWiseLocationCommision),
    policyMonth: parseFloat(formData.policyMonth),
    tgCorpoarateCom: parseFloat(formData.totalGrossCorporateCommision),
    tgLocationCom: parseFloat(formData.totalGrossLocationCommision),
    tnAdvisorCom: parseFloat(formData.totalGrossAdvisorCommission),

    tnLocationCom: parseFloat(formData.totalNetLocationCommission),
    tnCorporateCom: parseFloat(formData.totalNetCorporateCommision),
    daysLeft: parseInt(formData.howManyDaysLeft),
    gcComm: parseFloat(formData.grossCorporateCommission),
    glComm: parseFloat(formData.grossLocationCommission),
    tpComm: parseFloat(formData.totalPolicyCommission),
    taComm: parseFloat(formData.totalAdvisorCommission),
    returnAmt: parseFloat(formData.returnAmountNotRecieved),
    apCommAfterDeduct: parseFloat(formData.actualPolicyCommssion),
    naCommAfterDeduct: parseFloat(formData.netAdvisorCommissionAfterDeductible),
    nlCommAfterDeduct: parseFloat(formData.netLocationCommssionAfterDeductible),
    ncCommAfterDeduct: parseFloat(
      formData.netCorporateCommssionAfterDeductible
    ),
    ROWID: formData.superVisaID,
  };

  const isClientInsuredData = formData.isClientInsuredData;
  const newIsClientInsuredData = formData.newIsClientInsuredData;
  const deletedIsClientInsuredData = formData.deletedIsClientInsuredData;

  const policyBeneficiaryData = formData.policyBeneficiaryData;
  const newPolicyBeneficiaryData = formData.newPolicyBeneficiaryData;
  const deletedPolicyBeneficiaryData = formData.deletedPolicyBeneficiaryData;

  const contingentBeneficiaryData = formData.contingentBeneficiaryData;
  const newContingentBeneficiaryData = formData.newContingentBeneficiaryData;
  const deletedContingentBeneficiaryData =
    formData.deletedContingentBeneficiaryData;

  const policyTrusteeData = formData.policyTrusteeData;
  const newPolicyTrusteeData = formData.newPolicyTrusteeData;
  const deletedPolicyTrusteeData = formData.deletedPolicyTrusteeData;

  const policyCommissionData = formData.policyCommissionData;
  const newPolicyCommissionData = formData.newPolicyCommissionData;
  const deletedPolicyCommissionData = formData.deletedPolicyCommissionData;

  console.log("This is isclient insured data in backend", isClientInsuredData);
  console.log(
    "This is newIsClientInsuredData insured data in backend",
    newIsClientInsuredData
  );
  console.log(
    "This is deletedIsClientInsuredData insured data in backend",
    deletedIsClientInsuredData
  );
  try {
    const catalystApp = catalyst.initialize(req, { scope: "admin" });

    // Update the contacts table based on ROWID
    policiesResponse = await catalystApp
      .datastore()
      .table("policies")
      .updateRow({ ...policyData });

    subPolicyDataResponse = await catalystApp
      .datastore()
      .table("policySubDetails")
      .updateRow({ ...subPolicyData });

    supervisaResponse = await catalystApp
      .datastore()
      .table("supervisaPolicySubDetails")
      .updateRow({ ...supervisaPolicySubDetailsData });

    if (
      formData.isClientInsuredData &&
      formData.isClientInsuredData.length > 0
    ) {
      const isClientInsuredDataResult = await updateSubFormData(
        isClientInsuredData,
        req,
        "policyOwnership"
      );
    }
    if (
      formData.newIsClientInsuredData &&
      formData.newIsClientInsuredData.length > 0
    ) {
      const newIsClientInsuredDataResult = await insertMultipleRowsIntoTable(
        "policyOwnership",
        newIsClientInsuredData,
        req,
        policiesResponse
      );
    }
    if (
      formData.deletedIsClientInsuredData &&
      formData.deletedIsClientInsuredData.length > 0
    ) {
      const deletedIsClientInsuredDataResult = await deleteById(
        "policyOwnership",
        deletedIsClientInsuredData,
        req
      );
    }

    if (policyBeneficiaryData && policyBeneficiaryData.length > 0) {
      console.log("this is policy beneficiary data ", policyBeneficiaryData);
      const policyBeneficiaryDataResult = await updateSubFormData(
        policyBeneficiaryData,
        req,
        "beneficiary"
      );
    }
    if (
      formData.newPolicyBeneficiaryData &&
      formData.newPolicyBeneficiaryData.length > 0
    ) {
      console.log(
        "this is policy newPolicyBeneficiaryData data ",
        newPolicyBeneficiaryData
      );

      const newPolicyBeneficiaryDataResult = await insertMultipleRowsIntoTable(
        "beneficiary",
        newPolicyBeneficiaryData,
        req,
        policiesResponse
      );
    }
    if (
      formData.deletedPolicyBeneficiaryData &&
      formData.deletedPolicyBeneficiaryData.length > 0
    ) {
      console.log("this is policy deletedPolicyBeneficiaryDataResult data ",deletedPolicyBeneficiaryData)

      const deletedPolicyBeneficiaryDataResult = await deleteById(
        "beneficiary",
        deletedPolicyBeneficiaryData,
        req
      );
    }

    if (formData.Services.ContingentBeneficiary && formData.Services.ContingentBeneficiary.length > 0) {
      const contingentBeneficiaryResult = await updateSubFormData(
        formData.Services.ContingentBeneficiary,
        req,
        "contingentBeneficiary"
      );
    } 

    if (formData.Services.Trustee && formData.Services.Trustee.length > 0) {
      const policyTrusteeDataResult = await updateSubFormData(
        formData.Services.Trustee,
        req,
        "trustees"
      );
    }

    if (policyCommissionData && policyCommissionData.length > 0) {
      const policyCommissionDataResult = await updateSubFormData(
        policyCommissionData,
        req,
        "policyCommission"
      );
    }
    if (newPolicyCommissionData && newPolicyCommissionData.length > 0) {
      const newPolicyCommissionDataResult = await insertMultipleRowsIntoTable(

        "policyCommission",
        newPolicyCommissionData,
        req,
        policiesResponse

      );
    }
    if (deletedPolicyCommissionData && deletedPolicyCommissionData.length > 0) {
      const deletedPolicyCommissionDataResult = await deleteById(
        "policyCommission",
        deletedPolicyCommissionData,
        req
      );
    }

    res.status(200).json({
      success: true,
      message: "Policies Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.getDeals = async (req, res) => {
  console.log("this is inside deal function");

  const catalystApp = catalyst.initialize(req, { scope: "admin" });
  const response = await catalystApp
    .zcql()
    .executeZCQLQuery("select * from deals");

  res.status(200).json({
    message: "Deals fetched successfully",
    success: true,
    response,
  });
};

exports.getAllInvestmentAndPolicy = async (req, res) => {
  try {
    const { search } = req.body;

    const rowId = req.params.id;
    const page = parseInt(req.body.page, 10) || 1;
    const limit = parseInt(req.body.limit, 10) || 10;
    const offset = (page - 1) * limit;
    const fieldMapping = {createdTime:"CREATEDTIME", applicationSubmittedOn:"applicationOn", client:["contacts.firstName", "contacts.lastName"], mobile:"clientMobile" };
    let searchConditions = searchQueryBuilder(search, fieldMapping);
  
    if (rowId) {
      const rowIdCondition = `ROWID = '${rowId}'`;
      searchConditions = searchConditions ? `${searchConditions} AND ${rowIdCondition}` : rowIdCondition;
    }

    const whereClause = searchConditions ? `WHERE (${searchConditions})` : '';
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  console.log("this is inside get all investment and policy function");
  const allPolicyInvQuery = `SELECT 
  policies.*, policySubDetails.*,supervisaPolicySubDetails.*,
  contacts.firstName AS contactFirstName, 
  contacts.lastName AS contactLastName, 
  contacts.ROWID AS contactROWID,
  userData.lastName AS userLastName,
  userData.firstName AS userFirstName
FROM 
  policies 
LEFT JOIN 
  contacts ON policies.client = contacts.ROWID 
LEFT JOIN 
  userData ON policies.policyOwner = userData.ROWID
LEFT JOIN 
policySubDetails ON policySubDetails.policiesId = policies.ROWID
LEFT JOIN 
supervisaPolicySubDetails ON supervisaPolicySubDetails.policyId = policies.ROWID
 %SEARCH_CONDITION%  ORDER BY CREATEDTIME DESC LIMIT %LIMIT% OFFSET %OFFSET% `;
  

  let query = allPolicyInvQuery
  .replace('%SEARCH_CONDITION%', whereClause)
  .replace('%LIMIT%', limit)
  .replace('%OFFSET%', offset);
  // Execute the SQL queries to fetch contact data and contact sub-data
  const policyInvData = await adminApp.zcql().executeZCQLQuery(query);
  // console.log("policyInvData--->",policyInvData);

  // Respond with the fetched data
  return res.status(200).json({
    success: true,
    message: "policy and investment details fetched successfully",
    policyInvData,
  });
} catch (error) {
  console.error("Error getting policies:", error);
  return res.status(500).json({ success: false, message: "Failed to get policies", error: error.message });

}
}
  
