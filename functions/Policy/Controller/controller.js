const catalyst = require("zcatalyst-sdk-node");
const queries = require("../query/PolicyQuery");
const {createObjectCsvStringifier} = require("csv-writer")
const { insertData, insertSubformData, dateTimeFormat, updateData, updateSubformData, } = require("../Util/util");
const {lifePolicy,rrsp,tfsa,resp,visa,lifePolicySample,rrspSample,tfsaSample,respSample,visaSample} = require("../exports");
// <<<<<<<<<<<<<<  CREATE NEW POLICY API >>>>>>>>>>>>>>  
exports.testConntection = async (req, res) => {
  res.status(200).json({ success: true, message: "I am live" });
};
exports.policyRelatedData = async (req, res) => {
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  const rowId = req.params.id || req.body.rowId || req.query.rowId;
  let moduleArr = ["beneficiary", "contingentBeneficiary", "trustees","policyOwnership", "policyCommission", "renewalsHistory", "pastClaims","inBasket"];
  try {
    let policyDetails = await fetchMainModules(adminApp, rowId);
    let { beneficiaryArr, contingentBeneficiaryArr, trusteesArr,policyOwnershipArr, policyCommissionArr, renewalsHistoryArr, pastClaimsArr,inBasketArr} =
    await fetchSubModules(adminApp, rowId, moduleArr);
    res.status(200).json({
      success: true,
      message: "Policy data fetched successfully",
      policyDetails: {
        ...policyDetails,
        beneficiary: beneficiaryArr,
        contingentBeneficiary: contingentBeneficiaryArr,
        trustees: trusteesArr,
        policyOwnership: policyOwnershipArr,
        policyCommission: policyCommissionArr,
        renewalsHistory: renewalsHistoryArr,
        pastClaims: pastClaimsArr,
        inBasket:inBasketArr
      },
    });
  } catch (error) {
    console.error("Error fetching Policy data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Policy data",
      error: error.message || error,
    });
  }
};
exports.getUsers = async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const offset = (page - 1) * 300;
  let query = queries.getUsers.replace("%PAGENO%", offset);
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  const result = await adminApp.zcql().executeZCQLQuery(query);

  let users = result.map((user) => ({
    firstName: user.userData.firstName,
    lastName: user.userData.lastName,
    name: user.userData.firstName + " " + user.userData.lastName,
    ROWID: user.userData.ROWID,
  }));
  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    users,
  });
};
exports.getAdviors = async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const offset = (page - 1) * 300;
  let query = queries.getAdviors.replace("%PAGENO%", offset);
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  const result = await adminApp.zcql().executeZCQLQuery(query);

  let advisors = result.map((advisor) => ({
    firstName: advisor.advisors.firstName,
    lastName: advisor.advisors.lastName,
    name: advisor.advisors.firstName + " " + advisor.advisors.lastName,
    ROWID: advisor.advisors.ROWID,
  }));
  res.status(200).json({
    success: true,
    message: "Adviors fetched successfully",
    advisors,
  });
};
exports.getContacts = async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const offset = (page - 1) * 300;
  let query = queries.getContact.replace("%PAGENO%", offset);
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  const result = await adminApp.zcql().executeZCQLQuery(query);

  let contacts = result.map((contact) => ({
    firstName: contact.contacts.firstName,
    lastName: contact.contacts.lastName,
    name: contact.contacts.firstName + " " + contact.contacts.lastName,
    ROWID: contact.contacts.ROWID,
  }));
  res.status(200).json({
    success: true,
    message: "Contacts fetched successfully",
    contacts,
  });
};
// <<<<<<<<<<<<<<  CREATE NEW POLICY API >>>>>>>>>>>>>>  
exports.createPolicy = async (req, res) => {
  const { basicInfo, services, policyDetails, claims,commission,history,annuitantInfo,trackers,layout} = req.body;
  try {
    const catalystApp = catalyst.initialize(req, { scope: "admin" });
    
    // <<<<<<<<<<<<=========== INSERT POLICY INFORMATION =============>>>>>>>>>>>>>
    const policy = await parsePolicyData(basicInfo, services,layout);
    const policyId = await insertData(catalystApp, "policies", policy);

      // <<<<<<<<<<<<=========== INSERT POLICY DATA MAPPING =============>>>>>>>>>>>>>
      const policyTrackData = await parsePolicyTrackingDate(policyDetails,claims,policyId);
      const supervisaPolicySubDetailsData = await parseSupervisaPolicySubDetailsData(commission,policyId);
      // investment function
      const AnnuitantInfoData = await parseAnnuitantInfoData(annuitantInfo,trackers,policyId);
      // console.log("policyTrackData=======", policyTrackData);
      const { updateArray: updateBeneficiary = [], insertArray: insertBeneficiary = [] } = await processSubform(services?.Beneficiary, policyId, "beneficiary") || {};
      const { updateArray: updateTrustees = [], insertArray: insertContingentBeneficiary = [] } = await  processSubform(services?.ContingentBeneficiary, policyId, "contingentBeneficiary") || {};
      const { updateArray: updatTrustee = [], insertArray: inserTrustee = [] } =  await processSubform(services?.Trustee, policyId, "trustee") || {};
      const { updateArray: updatOwnerShip = [], insertArray: insertOwnerShip = [] } =  await processSubform(services?.OwnerShip, policyId, "OwnerShip") || {};
      const { updateArray: updatPolicyCommission = [], insertArray: insertPolicyCommission = [] } =  await processSubform(commission?.policyCommission, policyId, "commission") || {};
      const { updateArray: updatRenewalHistory = [], insertArray: insertRenewalHistory = [] } =  await processSubform(history?.renewalsHistoryData, policyId, "renewalHis") || {};
      const { updateArray: updatClaims = [], insertArray: insertClaims = [] } =  await processSubform(claims?.pastClaims, policyId, "claim") || {};
      const { updateArray: updatInvestmentBasket = [], insertArray: insertInvestmentBasket = [] } =  await processSubform(annuitantInfo?.InvestmentBasketData, policyId, "InvestmentBask") || {};// investment basket
      console.log("insertRenewalHistory===>", insertRenewalHistory);
      // // <<<<<<<<<<<<=========== INSERT POLICY FUNCTIONALITY =============>>>>>>>>>>>>>
      const policySubDetailsId = await insertData(catalystApp, "policySubDetails", policyTrackData);
      const annuitantInfoDataId = await insertData(catalystApp, "annuitantAndTracking", AnnuitantInfoData);// INVESTMENT AnnuitantInfoDataId 
      const supervisaPolicySubDetailsId = await insertData(catalystApp, "supervisaPolicySubDetails", supervisaPolicySubDetailsData);
      const beneficiaryId = insertBeneficiary .length > 0 ?await insertSubformData(catalystApp,"beneficiary",insertBeneficiary):[];
      const contingentBeneficiaryId = insertContingentBeneficiary.length > 0 ?await insertSubformData(catalystApp,"contingentBeneficiary",insertContingentBeneficiary):[];
      const inserTrusteeId = inserTrustee.length > 0 ?await insertSubformData(catalystApp,"trustees",inserTrustee):[];
      const insertOwnerShipId = insertOwnerShip.length > 0 ?await insertSubformData(catalystApp,"policyOwnership",insertOwnerShip):[];
      const policyCommissionId = insertPolicyCommission.length > 0 ?await insertSubformData(catalystApp,"policyCommission",insertPolicyCommission):[];
      const insertRenewalHistoryId = insertRenewalHistory.length > 0 ?await insertSubformData(catalystApp,"renewalsHistory",insertRenewalHistory):[];
      const insertClaimsId = insertClaims.length > 0 ?await insertSubformData(catalystApp,"pastClaims",insertClaims):[];
      const insertInvestmentBasketId = insertInvestmentBasket.length > 0 ?await insertSubformData(catalystApp,"inBasket",insertInvestmentBasket):[];// investment basket
  
      res.status(201).json({
        success: true,
        message: "Policy and associated records created successfully",
        deals: {
          policyId: policyId,
          policySubDetailsId: policySubDetailsId,
          supervisaPolicySubDetailsId: supervisaPolicySubDetailsId,
          beneficiaryId: beneficiaryId,
          contingentBeneficiaryId: contingentBeneficiaryId,
          inserTrusteeId: inserTrusteeId,
          insertOwnerShipId: insertOwnerShipId,
          policyCommissionId: policyCommissionId,
          insertRenewalHistoryId: insertRenewalHistoryId,
          insertClaimsId: insertClaimsId,
          annuitantInfoDataId:annuitantInfoDataId,
          insertInvestmentBasketId:insertInvestmentBasketId
        },
      });
    } catch (error) {
      console.error("Error creating Policy:", error);
      res.status(409).json({
        success: false,
        message: "Failed to create Policy",
        error: error,
      });
    }
};
// <<<<<<<<< UPDATE POLICY DETAILs >>>>>>>>
exports.updatePolicy = async (req, res) => {
  const { basicInfo, services, policyDetails, claims,commission,history,layout} = req.body;
  const rowId = req.params.id;
  try {
    const catalystApp = catalyst.initialize(req, { scope: "admin" });
    
    // <<<<<<<<<<<<=========== INSERT POLICY INFORMATION =============>>>>>>>>>>>>>
    const policy = await parsePolicyData(basicInfo, services,layout);
    const policyId = await updateData(catalystApp, "policies", {...policy,ROWID:rowId});

    // <<<<<<<<<<<<=========== UPDATE POLICY DATA MAPPING =============>>>>>>>>>>>>>
    const policyTrackData = await parsePolicyTrackingDate(policyDetails,claims,policyId);
    const policySubDetailsId = await updateData(catalystApp, "policySubDetails", {...policyTrackData,ROWID:policyDetails.ROWID});
    const supervisaPolicySubDetailsData = await parseSupervisaPolicySubDetailsData(commission,policyId);
    const supervisaPolicySubDetailsId = await updateData(catalystApp, "supervisaPolicySubDetails", {...supervisaPolicySubDetailsData, ROWID:services.ROWID});
    const { updateArray: updateBeneficiary = [], insertArray: insertBeneficiary = [] } = await processSubform(services?.Beneficiary, policyId, "beneficiary") || {};
    const { updateArray: updateContingentBeneficiary = [], insertArray: insertContingentBeneficiary = [] } = await  processSubform(services?.ContingentBeneficiary, policyId, "contingentBeneficiary") || {};
    const { updateArray: updatTrustee = [], insertArray: inserTrustee = [] } =  await processSubform(services?.Trustee, policyId, "trustee") || {};
    const { updateArray: updatOwnerShip = [], insertArray: insertOwnerShip = [] } =  await processSubform(services?.OwnerShip, policyId, "OwnerShip") || {};
    const { updateArray: updatPolicyCommission = [], insertArray: insertPolicyCommission = [] } =  await processSubform(commission?.policyCommission, policyId, "commission") || {};
    const { updateArray: updatRenewalHistory = [], insertArray: insertRenewalHistory = [] } =  await processSubform(history?.renewalsHistoryData, policyId, "renewalHis") || {};
    const { updateArray: updatClaims = [], insertArray: insertClaims = [] } =  await processSubform(claims?.pastClaims, policyId, "claim") || {};

    // // <<<<<<<<<<<<=========== INSERT SUB FORM POLICY FUNCTIONALITY =============>>>>>>>>>>>>>
    
    const beneficiaryId = insertBeneficiary.length > 0 ?await insertSubformData(catalystApp,"beneficiary",insertBeneficiary):[];
    const contingentBeneficiaryId = insertContingentBeneficiary.length > 0 ?await insertSubformData(catalystApp,"contingentBeneficiary",insertContingentBeneficiary):[];
    const inserTrusteeId = inserTrustee.length > 0 ?await insertSubformData(catalystApp,"trustees",inserTrustee):[];
    const insertOwnerShipId = insertOwnerShip.length > 0 ?await insertSubformData(catalystApp,"policyOwnership",insertOwnerShip):[];
    const policyCommissionId = insertPolicyCommission.length > 0 ?await insertSubformData(catalystApp,"policyCommission",insertPolicyCommission):[];
    const insertRenewalHistoryId = insertRenewalHistory.length > 0 ?await insertSubformData(catalystApp,"renewalsHistory",insertRenewalHistory):[];
    const insertClaimsId = insertClaims.length > 0 ?await insertSubformData(catalystApp,"pastClaims",insertClaims):[];
    // <<<<<<<<<<<<<<<<< UPDATE SUB FORM DATA >>>>>>>>>>>>>>>>>>
    const updateBeneficiaryId = updateBeneficiary.length > 0 ?await updateSubformData(catalystApp,"beneficiary",updateBeneficiary):[];
    const updateContingentBeneficiaryId = updateContingentBeneficiary.length > 0 ?await insertSubformData(catalystApp,"contingentBeneficiary",updateContingentBeneficiary):[];
    const updateInserTrusteeId = updatTrustee.length > 0 ?await insertSubformData(catalystApp,"trustees",updatTrustee):[];
    const updateInsertOwnerShipId = updatOwnerShip.length > 0 ?await insertSubformData(catalystApp,"policyOwnership",updatOwnerShip):[];
    const updatePolicyCommissionId = updatPolicyCommission.length > 0 ?await insertSubformData(catalystApp,"policyCommission",updatPolicyCommission):[];
    const updateInsertRenewalHistoryId = updatRenewalHistory.length > 0 ?await insertSubformData(catalystApp,"renewalsHistory",updatRenewalHistory):[];
    const updateInsertClaimsId = updatClaims.length > 0 ?await insertSubformData(catalystApp,"pastClaims",updatClaims):[];
   
    res.status(201).json({
      success: true,
      message: "Policy and associated records update successfully",
      deals: {
        policyId: policyId,
        policySubDetailsId: policySubDetailsId,
        supervisaPolicySubDetailsId: supervisaPolicySubDetailsId,
        beneficiaryId: beneficiaryId,
        contingentBeneficiaryId: contingentBeneficiaryId,
        inserTrusteeId: inserTrusteeId,
        insertOwnerShipId: insertOwnerShipId,
        policyCommissionId: policyCommissionId,
        insertRenewalHistoryId: insertRenewalHistoryId,
        insertClaimsId: insertClaimsId,
        updateBeneficiaryId:updateBeneficiaryId,
        updateContingentBeneficiaryId:updateContingentBeneficiaryId,
        updateInserTrusteeId:updateInserTrusteeId,
        updateInsertOwnerShipId:updateInsertOwnerShipId,
        updatePolicyCommissionId:updatePolicyCommissionId,
        updateInsertRenewalHistoryId:updateInsertRenewalHistoryId,
        updateInsertClaimsId:updateInsertClaimsId
      },
    });
  } catch (error) {
    console.error("Error creating Policy:", error);
    res.status(409).json({
      success: false,
      message: "Failed to create Policy",
      error: error,
    });
  }
};

// ********************** Create POLICY  from RPA *********************
exports.createPolicyFromRPA = async (req, res) => {
  const app = catalyst.initialize(req, { scope: "admin" });
  const formdata = req.body || {};
  try {
    const payload = await parsePolicyDataFromRPA(formdata);
    const policyId = await insertData(app, "policies", payload);
    // const policyId = "5951000001207913";
    const formData = {...formdata?.primaryInsuredPerson,...formdata?.contactInformation,...formdata?.beneficiaryInformation}
    const subpolicyData = {...formdata.policyInformation,...formdata.coverageDetails}
    const resp = await Promise.all([
      app.datastore().table("policySubDetails").insertRow(parseSubDetails(subpolicyData,policyId)),
      app.datastore().table("policyOwnership").insertRow(parsePolicyOwnerShip(formData,policyId)),
      app.datastore().table("beneficiary").insertRow(parseBeneficiaryDetails(formData,policyId)),
    ])
    res.status(201).json({
      success: true,
      message: "Policy and associated records created successfully", 
      id: policyId
    });
  }catch (error) {
    console.error("Error creating Policy:", error);
    res.status(409).json({
      success: false,
      message: "Failed to create Policy",
      error: error,
    });
  }

}

async function processSubform(subformArray, rowId, type) {
  if (!subformArray) {
    return { updateArray: [], insertArray: [] };
  }

  const updateArray = [];
  const insertArray = [];

  subformArray.forEach((item) => {
    const subformObject = {
      policyId: rowId,
      ROWID: item.ROWID ?? null,
      ...getSubformFields(item, type), // Merge fields based on type
    };

    if (item.ROWID) {
      updateArray.push(subformObject);
    } else {
      delete subformObject.ROWID;
      insertArray.push(subformObject);
    }
  });

  return { updateArray, insertArray };
}
function getSubformFields(item, type) {
  switch (type) {
    case "beneficiary":
      return {
        name: item?.name ?? "",
        email: item?.email ?? "",
        dob: item?.dob ?? null,
        phone: item?.phone ?? "",
        lifeBeneficiaryName: item?.lifeBeneficiaryName ?? "",
        relationship: item?.relationship ?? "",
        
      };
    case "contingentBeneficiary":
      return {
        name: item?.name ?? "",
        email: item?.email ?? "",
        dob: item?.dob ?? null,
        phone: item?.phone ?? "",
        beneficiaryPercent: item?.beneficiaryPercent ?? "",
        relationship: item?.relationship ?? "",

      };
    
    case "trustee":
      return {
        name: item?.name ?? "",
        email: item?.email ?? "",
        phone: item?.phone ?? "",
        relationship: item?.relationship ?? "",
        
      };
    case "OwnerShip":
      return {
        name: item?.name ?? "",
        email: item?.email ?? "",
        dob: item?.dob ?? null,
        relationship: item?.relationship ?? "",
        
      };
    case "commission":
      return {
        monthPremium: item?.monthPremium ?? "",
        gcComm: item?.gcComm ?? null,
        naCoom: item?.naCoom ?? null,
        ncComm: item?.ncComm ?? null,
        nlComm: item?.nlComm ?? null,
        glComm: item?.glComm ?? null,
        
      };
    case "renewalHis":
      return {
        premiumFrequency: item?.premiumFrequency ?? "",
        premiumAmount: item?.premiumAmount ? parseFloat(item.premiumAmount) : null,
        policyAmount: item?.policyAmount ? parseFloat(item.policyAmount) : null,
        policyIssuedDate: item?.policyIssuedDate ? new Date(item.policyIssuedDate) : null,
        policyRenewalDate: item?.policyRenewalDate ? new Date(item.policyRenewalDate) : null,
        medicalRequired: item?.medicalRequired ?? "",
        renewalCommission: item?.renewalCommission ? parseFloat(item.renewalCommission) : null,
        policyAdvisor: item?.policyAdvisor ?? "",
        
      };
    case "claim":
      return {
        dateOfClaim: item?.dateOfClaim ? new Date(item.dateOfClaim) : null,
        reasonforClaim: item?.reasonforClaim ?? "",
        amountofClaim: item?.amountofClaim ? parseFloat(item.amountofClaim) : null,
        claimClosedOn: item?.claimClosedOn ? new Date(item.claimClosedOn) : null,
        claimAmountSettled: item?.claimAmountSettled ? parseFloat(item.claimAmountSettled) : null,
        claimAmountRejected: item?.claimAmountRejected ? parseFloat(item.claimAmountRejected) : null,
        settlement: item?.settlement ?? "",        
      };
    case "InvestmentBask":
      return {
        contribution: item.dateOfClaim ?? null,
        invPercentage: item?.invPercentage ?? "",
        fundCode: item?.fundCode ?? null,
        type: item?.type?? null,
        basketDate: new Date(item?.basketDate)??null
      };
    
    default:
      return {}; // Default case if type is not recognized
  }
}
async function parseSupervisaPolicySubDetailsData(commission, rowId){
  return{
    policyId: rowId,
    dayWiseCorporateCommision: parseFloat(commission?.dayWiseCorporateCommision) ?? null,
    dayWiseLocationCommision: parseFloat(commission?.dayWiseLocationCommision) ?? null,
    dayWiseAdvisorCommision: parseFloat(commission?.dayWiseAdvisorCommision) ?? null,
    policyMonth: parseFloat(commission?.policyMonth) ?? null,
    updateCommission: parseFloat(commission?.updateCommission) ?? null,
    totalGrossLocationCommision: parseFloat(commission?.totalGrossLocationCommision) ?? null,
    totalNetLocationCommission: parseFloat(commission?.totalNetLocationCommission) ?? null,
    corporateCommission: parseFloat(commission?.corporateCommission) ?? null,
    corporateCommissionAmount: parseFloat(commission?.corporateCommissionAmount) ?? null,
    locationCommission: parseFloat(commission?.locationCommission) ?? null,
    totalGrossCorpoarateCom: parseFloat(commission?.totalGrossCorpoarateCom) ?? null,
    totalGrossAdvisorCommission: parseFloat(commission?.totalGrossAdvisorCommission) ?? null,
    totalNetCorporateCommision: parseFloat(commission?.totalNetCorporateCommision) ?? null,
    advisorCommission: parseFloat(commission?.advisorCommission) ?? null,
    totalNetAdvisorCommission: parseFloat(commission?.totalNetAdvisorCommission) ?? null,
    totalNetCorporateCom: parseFloat(commission?.totalNetCorporateCom) ?? null,
    totalGrossLocationCom: parseFloat(commission?.totalGrossLocationCom) ?? null,
    totalNetLocationpolicyCommission: parseFloat(commission?.totalNetLocationpolicyCommission) ?? null,
    corporatepolicyCommission: parseFloat(commission?.corporatepolicyCommission) ?? null,
    locationPolicyCommission: parseFloat(commission?.locationPolicyCommission) ?? null,
    advisorPolicyCommission: parseFloat(commission?.advisorPolicyCommission) ?? null,
    updatePolicyCommission: parseFloat(commission?.updatePolicyCommission) ?? null,
    totalNetAdvisorpolicyCommission: parseFloat(commission?.totalNetAdvisorpolicyCommission) ?? null,

  }
}
// <<<<<<<<<<<<< INVESTMENT FUNCTION >>>>>>>>>>
async function parseAnnuitantInfoData(annuitantInfo,trackers,policyId){
  return{
    policyId: policyId,
    numberOfAnnuitants: annuitantInfo?.numberOfAnnuitants ?? null,
    phone: annuitantInfo?.phone ?? null,
    relationshipToPrimaryAnnuitment: annuitantInfo?.relationshipToPrimaryAnnuitment ?? "",
    email: annuitantInfo?.email ?? "",
    dateOfBirth: new Date(annuitantInfo?.dateOfBirth) ?? null,
    applicantDOB: new Date(annuitantInfo?.applicantDOB) ?? null,
    nameOfPrimaryAnnuitment: annuitantInfo?.nameOfPrimaryAnnuitment ?? "",
    isTheClientAnnuitent: annuitantInfo?.isTheClientAnnuitent ?? "",
    gender: annuitantInfo?.gender ?? "",
    applicantGender: annuitantInfo?.applicantGender ?? "",
    /// <<<<<<<<<<<<< INVESTMENT TRACKER  >>>>>>>>>>>>
    dateOfEnquiry: new Date(trackers?.dateOfEnquiry) ?? null,
    maturityDate: new Date(trackers?.maturityDate) ?? null,
    followUpDate: new Date(trackers?.followUpDate) ?? null,
    dateOfSubmission: new Date(trackers?.dateOfSubmission) ?? null,
    contractStartDate: new Date(trackers?.contractStartDate) ?? null,
    dateOfLastReview:  new Date(trackers?.dateOfLastReview) ?? null,
  }
}
async function parsePolicyTrackingDate(policyDetails,claims,rowId){
  return{
    policiesId: rowId,
    applicationSubmittedOn: new Date(policyDetails?.applicationSubmittedOn) ?? null,
    nextFollowUpDate: new Date(policyDetails?.nextFollowUpDate) ?? null,
    newPolicyStartDate: new Date(policyDetails?.newPolicyStartDate) ?? null,
    applicationInitiatedOn: new Date(policyDetails?.applicationInitiatedOn) ?? null,
    policyApprovedDate: new Date(policyDetails?.policyApprovedDate) ?? null,
    policyAttachmentLink: policyDetails?.policyAttachmentLink ?? null,
    nameOfConfirmationRenewal: policyDetails?.nameOfConfirmationRenewal ?? null,
    policyStartDate: new Date(policyDetails?.policyStartDate) ?? null,
    policyIssuedDate: new Date(policyDetails?.policyIssuedDate) ?? null,
    policyExpiresOn: new Date(policyDetails?.policyExpiresOn) ?? null,
    nameOfConfirmation: policyDetails?.nameOfConfirmation ?? null,
    policyPickedUpOn: new Date(policyDetails?.policyPickedUpOn) ?? null,
    applicationPostponedTo: new Date(policyDetails?.applicationPostponedTo) ?? null,
    policyDeclineDate: new Date(policyDetails?.policyDeclineDate) ?? null,
    earlyReturnAmendmentRequested: new Date(policyDetails?.earlyReturnAmendmentRequested) ?? null,
    earlyReturnAmendmentCompletedDate: new Date(policyDetails?.earlyReturnAmendmentCompletedDate) ?? null,
    policyRenewalDate: new Date(policyDetails?.policyRenewalDate) ?? null,
    policyReviewCommentUpdatedOn: new Date(policyDetails?.policyReviewCommentUpdatedOn) ?? null,
    reasonForPolicyBeingDeclined: policyDetails?.reasonForPolicyBeingDeclined ?? null,
    earlyReturnApplicationCancelled: new Date(policyDetails?.earlyReturnApplicationCancelled) ?? null,    
    earlyReturnAmendmentRequestedFor: policyDetails?.earlyReturnAmendmentRequestedFor ?? '',
    policyReviewComments: policyDetails?.policyReviewComments ?? '',
    cancellation: policyDetails?.cancellation ?? '',
    renwalExpired: policyDetails?.renwalExpired ?? '',
    premiumPaidDuringPickUpPeriod: policyDetails?.premiumPaidDuringPickUpPeriod ?? '',
    applicationMedicalRequirement: policyDetails?.applicationMedicalRequirement ?? '',
    confirmationPolicyStart: policyDetails?.confirmationPolicyStart ?? '',
    renewalMedicalRequirement: policyDetails?.renewalMedicalRequirement ?? null,
    policyRenewalCompleted: policyDetails?.policyRenewalCompleted ?? null,
    renewalMedicalConformationNumber: policyDetails?.renewalMedicalConformationNumber ?? '',
    renewalMedicalApplicationDateAndTime: policyDetails?.renewalMedicalApplicationDateAndTime ?? null,
    // reviewedDateTime: await dateTimeFormat(policyDetails?.reviewedDateTime) ?? null,   
                      
    // clamies details
    totalAmountClaimed: claims?.totalAmountClaimed ? parseFloat(claims.totalAmountClaimed) : null,
    totalAmountSettled: claims?.totalAmountSettled ? parseFloat(claims.totalAmountSettled) : null,
    totalAmountRejected: claims?.totalAmountRejected ? parseFloat(claims.totalAmountRejected) : null,
    ringcentralSmsResponse: claims?.ringcentralSmsResponse ?? '',
    areCurrentClaimonThisPolicy: claims?.areCurrentClaimonThisPolicy ?? '',
    arePastClaimonThisPolicy: claims?.arePastClaimonThisPolicy ?? '',
    claimOutcome: claims?.claimOutcome ?? '',
      
    
  }
}
async function parsePolicyData(basicInfo, services,layout) {
    return {
      layout: layout?? "",
      policyNumber: basicInfo?.policyNumber ?? null,
      coverageAmount: basicInfo?.coverageAmount ? parseFloat(basicInfo.coverageAmount) : null,
      clientCampaignSource: basicInfo?.clientCampaignSource ?? '',
      email: basicInfo?.email ?? '',
      policyPremiumI: basicInfo?.policyPremiumI ? parseFloat(basicInfo.policyPremiumI) : null,
      clientMobile: basicInfo?.clientMobile ?? null,
      productFycPercent: basicInfo?.productFycPercent ? parseFloat(basicInfo.productFycPercent) : null,
      insuranceCompanyAccount: basicInfo?.insuranceCompanyAccount ?? null,
      corporateBonusPercent: basicInfo?.corporateBonusPercent ? parseFloat(basicInfo.corporateBonusPercent) : null,
      offeringId: basicInfo?.offeringId ?? null,
      advisorBonusOfFyc: basicInfo?.advisorBonusOfFyc ? parseFloat(basicInfo.advisorBonusOfFyc) : null,
      whatsapp: basicInfo?.whatsapp ?? null,
      locationDiscountFactor: basicInfo?.locationDiscountFactor ? parseFloat(basicInfo.locationDiscountFactor) : null,
      exchangeRate: basicInfo?.exchangeRate ? parseFloat(basicInfo.exchangeRate) : null,
      updateOfferingId: basicInfo?.updateOfferingId ?? false,
      updatePolicyStatus: basicInfo?.updatePolicyStatus ?? false,
      triggerSupervisa: basicInfo?.triggerSupervisa ?? false,
      clientAddress: basicInfo?.clientAddress ?? '',
      commentsOnRating: basicInfo?.commentsOnRating ?? '',
      layout: basicInfo?.layout ?? '',
      policyOwner: basicInfo?.policyOwner ?? null,
      sendToPolicyStartDateEmailTrack: basicInfo?.sendToPolicyStartDateEmailTrack ?? '',
      sendToBotResult: basicInfo?.sendToBotResult ?? '',
      phoneUpdated: basicInfo?.phoneUpdated ?? null,
      premiumFrequency: basicInfo?.premiumFrequency ?? null,
      policyStatus: basicInfo?.policyStatus ?? '',
      location: basicInfo?.location ?? null,
      policyAdvisor: basicInfo?.policyAdvisor ?? null,
      advisorCommisionRecieved: basicInfo?.advisorCommisionRecieved ?? '',
      policyType: basicInfo?.policyType ?? '',
      advisorProbhitedBehaviourCompliance: basicInfo?.advisorProbhitedBehaviourCompliance ?? '',
      clientFirstPolicy: basicInfo?.clientFirstPolicy ?? '',
      advisorCodeOfConductComplaince: basicInfo?.advisorCodeOfConductComplaince ?? '',
      currency: basicInfo?.currency ?? '',
      issuedBy: basicInfo?.issuedBy ?? null,
      offeringName: basicInfo?.offeringName ?? null,
      client: basicInfo?.client ?? null,

      // <<<<<<<<< SERVICE DETAILS >>>>>>>>>>
       isClientTheInsured: services?.isClientTheInsured ?? '',
       areThereMultipleInsured: services?.areThereMultipleInsured ?? '',
       numberOfInsured: services?.numberOfInsured ?? null,
       areThereMultipleBeneficiary: services?.areThereMultipleBeneficiary ?? '',
       isClientABeneficiary: services?.isClientABeneficiary ?? null,
       numberofBeneficiaries: services?.numberofBeneficiaries ?? null,
       areThereTrusteeForThisPolicy: services?.areThereTrusteeForThisPolicy ?? '',
       numberOfTrustee: services?.numberOfTrustee ?? null,
       applicationOn: services?.applicationOn ? new Date(services.applicationOn) : null,
       trustDissolutionDate: services?.trustDissolutionDate ? new Date(services.trustDissolutionDate) : null,
       trustDocumentRecievedAndUploaded: services?.trustDocumentRecievedAndUploaded ?? null,
       
       // <<<<<<<< POLICY FIELDS >>>>>>>>
       relationtoPrimaryAnnuitant: services?.relationtoPrimaryAnnuitant ?? "",
       beneficiaryGender: services?.beneficiaryGender ?? "",
       totalContribution: basicInfo?.totalContribution ?? "",
       investment: basicInfo?.investment ?? "",
       corporateCommission: basicInfo?.corporateCommission ?? "",
       advisorCommission: basicInfo?.advisorCommission ?? "",
       monthlyAnnualContribution: parseFloat(basicInfo?.monthlyAnnualContribution) ?? null,
       contractNumber: basicInfo?.contractNumber ?? null,
       initialContribution: basicInfo?.initialContribution ?? null,
       initialDeposit: basicInfo?.initialDeposit ?? null,
       locationCommission: basicInfo?.locationCommission ?? null,
       clientAddress: basicInfo?.clientAddress ?? null,
       registered: basicInfo?.registered ?? null,

       
    };
}

exports.dowloadFile = async (req, res) => {
  const { type } = req.body;
  try {
    const csvContent = await downloadSampleFile(type);
    
    // Send the CSV file for download
    res.setHeader("Content-disposition", "attachment; filename=sample.csv");
    res.set("Content-Type", "text/csv");
    res.status(200).send(csvContent);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

// <<<<<<<<<<<<<<  FETCH POLICY DETAILS >>>>>>>>>>>>>>
async function fetchMainModules(catalystApp, id) {
  let query = `${queries.policyRelatedData} ${id}`;
  let policyDetails = await catalystApp.zcql().executeZCQLQuery(query);
  if (!policyDetails || policyDetails.length === 0) {
    return {};
  } else {
    return ({ policies, supervisaPolicySubDetails, policySubDetails,annuitantAndTracking } = policyDetails[0]);
  }
  // return query;
}
async function fetchSubModules(catalystApp, id, moduleArr) {
  const queryMap = {
    beneficiary: `${queries.getBeneficiary} ${id}`,
    contingentBeneficiary: `${queries.getContingentBeneficiary} ${id}`,
    trustees: `${queries.getCrustees} ${id}`,
    policyOwnership: `${queries.getPolicyOwnership} ${id}`,
    policyCommission: `${queries.getPolicyCommission} ${id}`,
    renewalsHistory: `${queries.getRenewalsHistory} ${id}`,
    pastClaims: `${queries.getPastClaims} ${id}`,
    inBasket: `${queries.getinBasket} ${id}`,
  };

  try {
    const fetchPromises = moduleArr.map(async (module) => {
      const query = queryMap[module];
      const response = await catalystApp.zcql().executeZCQLQuery(query);
      return response.map((item) => item[module]);
    });
    const [beneficiaryArr, contingentBeneficiaryArr, trusteesArr,policyOwnershipArr, policyCommissionArr, renewalsHistoryArr, pastClaimsArr,inBasketArr] =
      await Promise.all(fetchPromises);

    return { beneficiaryArr, contingentBeneficiaryArr, trusteesArr,policyOwnershipArr, policyCommissionArr, renewalsHistoryArr, pastClaimsArr,inBasketArr };
  } catch (error) {
    console.error("Error fetching sub-modules:", error);
    throw error;
  }
}
// <<<<<<<<<<<<<<  END GET POLICY DETAILS API >>>>>>>>>>>>>>


async function parseSupervisaPolicySubDetailsData(commission, rowId){
  return{
    policyId: rowId,
    dayWiseCorporateCommision: parseFloat(commission?.dayWiseCorporateCommision) ?? null,
    dayWiseLocationCommision: parseFloat(commission?.dayWiseLocationCommision) ?? null,
    dayWiseAdvisorCommision: parseFloat(commission?.dayWiseAdvisorCommision) ?? null,
    policyMonth: parseFloat(commission?.policyMonth) ?? null,
    updateCommission: parseFloat(commission?.updateCommission) ?? null,
    totalGrossLocationCommision: parseFloat(commission?.totalGrossLocationCommision) ?? null,
    totalNetLocationCommission: parseFloat(commission?.totalNetLocationCommission) ?? null,
    corporateCommission: parseFloat(commission?.corporateCommission) ?? null,
    corporateCommissionAmount: parseFloat(commission?.corporateCommissionAmount) ?? null,
    locationCommission: parseFloat(commission?.locationCommission) ?? null,
    totalGrossCorpoarateCom: parseFloat(commission?.totalGrossCorpoarateCom) ?? null,
    totalGrossAdvisorCommission: parseFloat(commission?.totalGrossAdvisorCommission) ?? null,
    totalNetCorporateCommision: parseFloat(commission?.totalNetCorporateCommision) ?? null,
    advisorCommission: parseFloat(commission?.advisorCommission) ?? null,
    totalNetAdvisorCommission: parseFloat(commission?.totalNetAdvisorCommission) ?? null,
    totalNetCorporateCom: parseFloat(commission?.totalNetCorporateCom) ?? null,
    totalGrossLocationCom: parseFloat(commission?.totalGrossLocationCom) ?? null,
    totalNetLocationpolicyCommission: parseFloat(commission?.totalNetLocationpolicyCommission) ?? null,
    corporatepolicyCommission: parseFloat(commission?.corporatepolicyCommission) ?? null,
    locationPolicyCommission: parseFloat(commission?.locationPolicyCommission) ?? null,
    advisorPolicyCommission: parseFloat(commission?.advisorPolicyCommission) ?? null,
    updatePolicyCommission: parseFloat(commission?.updatePolicyCommission) ?? null,
    totalNetAdvisorpolicyCommission: parseFloat(commission?.totalNetAdvisorpolicyCommission) ?? null,

  }
}
async function parsePolicyTrackingDate(policyDetails,claims,rowId){
  return{
    policiesId: rowId,
    applicationSubmittedOn: policyDetails?.applicationSubmittedOn ? new Date(policyDetails.applicationSubmittedOn) : null,
    nextFollowUpDate: policyDetails?.nextFollowUpDate ? new Date(policyDetails.nextFollowUpDate) : null,
    newPolicyStartDate: policyDetails?.newPolicyStartDate ? new Date(policyDetails.newPolicyStartDate) : null,
    applicationInitiatedOn: policyDetails?.applicationInitiatedOn ? new Date(policyDetails.applicationInitiatedOn) : null,
    policyApprovedDate: policyDetails?.policyApprovedDate ? new Date(policyDetails.policyApprovedDate) : null,
    policyAttachmentLink: policyDetails?.policyAttachmentLink ?? null,
    nameOfConfirmationRenewal: policyDetails?.nameOfConfirmationRenewal ?? null,
    policyStartDate: policyDetails?.policyStartDate ? new Date(policyDetails.policyStartDate) : null,
    policyIssuedDate: policyDetails?.policyIssuedDate ? new Date(policyDetails.policyIssuedDate) : null,
    policyExpiresOn: policyDetails?.policyExpiresOn ? new Date(policyDetails.policyExpiresOn) : null,
    nameOfConfirmation: policyDetails?.nameOfConfirmation ? new Date(policyDetails.nameOfConfirmation) : null,
    policyPickedUpOn: policyDetails?.policyPickedUpOn ? new Date(policyDetails.policyPickedUpOn) : null,
    applicationPostponedTo: policyDetails?.applicationPostponedTo ? new Date(policyDetails.applicationPostponedTo) : null,
    policyDeclineDate: policyDetails?.policyDeclineDate ? new Date(policyDetails.policyDeclineDate) : null,
    earlyReturnAmendmentRequested: policyDetails?.earlyReturnAmendmentRequested ? new Date(policyDetails.earlyReturnAmendmentRequested) : null,
    earlyReturnAmendmentCompletedDate: policyDetails?.earlyReturnAmendmentCompletedDate ? new Date(policyDetails.earlyReturnAmendmentCompletedDate) : null,
    policyRenewalDate: policyDetails?.policyRenewalDate ? new Date(policyDetails.policyRenewalDate) : null,
    policyReviewCommentUpdatedOn: policyDetails?.policyReviewCommentUpdatedOn ? new Date(policyDetails.policyReviewCommentUpdatedOn) : null,
    reasonForPolicyBeingDeclined: policyDetails?.reasonForPolicyBeingDeclined ?? null,
    earlyReturnApplicationCancelled: policyDetails?.earlyReturnApplicationCancelled ? new Date(policyDetails.earlyReturnApplicationCancelled) : null,
    earlyReturnAmendmentRequestedFor: policyDetails?.earlyReturnAmendmentRequestedFor ?? '',
    policyReviewComments: policyDetails?.policyReviewComments ?? '',
    cancellation: policyDetails?.cancellation ?? '',
    renwalExpired: policyDetails?.renwalExpired ?? '',
    premiumPaidDuringPickUpPeriod: policyDetails?.premiumPaidDuringPickUpPeriod ?? '',
    applicationMedicalRequirement: policyDetails?.applicationMedicalRequirement ?? '',
    confirmationPolicyStart: policyDetails?.confirmationPolicyStart ?? '',
    renewalMedicalRequirement: policyDetails?.renewalMedicalRequirement ?? null,
    policyRenewalCompleted: policyDetails?.policyRenewalCompleted ?? null,
    renewalMedicalConformationNumber: policyDetails?.renewalMedicalConformationNumber ?? '',
    renewalMedicalApplicationDateAndTime: policyDetails?.renewalMedicalApplicationDateAndTime ?? null,
    reviewedDateTime: await dateTimeFormat(policyDetails?.reviewedDateTime) ?? null,                      
    // clamies details
    totalAmountClaimed: parseFloat(claims?.totalAmountClaimed) ?? null,
    totalAmountSettled: parseFloat(claims?.totalAmountSettled) ?? null,
    totalAmountRejected: parseFloat(claims?.totalAmountRejected) ?? null,
    ringcentralSmsResponse: claims?.ringcentralSmsResponse ?? '',
    areCurrentClaimonThisPolicy: claims?.areCurrentClaimonThisPolicy ?? '',
    arePastClaimonThisPolicy: claims?.arePastClaimonThisPolicy ?? '',
    claimOutcome: claims?.claimOutcome ?? '',

    
  }
}
async function parsePolicyData(basicInfo, services,layout) {
    return {
      layout:layout??"",
      policyName: basicInfo?.policyName ?? '',
      policyNumber: basicInfo?.policyNumber ?? null,
      coverageAmount: parseFloat(basicInfo?.coverageAmount) ?? null,
      clientCampaignSource: basicInfo?.clientCampaignSource ?? '',
      email: basicInfo?.email ?? '',
      policyPremiumI: parseFloat(basicInfo?.policyPremiumI) ?? null,
      clientMobile: basicInfo?.clientMobile ?? null,
      productFycPercent: parseFloat(basicInfo?.productFycPercent) ?? null,
      insuranceCompanyAccount: basicInfo?.insuranceCompanyAccount ?? null,
      corporateBonusPercent: parseFloat(basicInfo?.corporateBonusPercent) ?? null,
      offeringId: basicInfo?.offeringId ?? null,
      advisorBonusOfFyc: parseFloat(basicInfo?.advisorBonusOfFyc) ?? null,
      whatsapp: basicInfo?.whatsapp ?? null,
      locationDiscountFactor: parseFloat(basicInfo?.locationDiscountFactor) ?? null,
      exchangeRate: parseFloat(basicInfo?.exchangeRate) ?? null,
      updateOfferingId: basicInfo?.updateOfferingId ?? false,
      updatePolicyStatus: basicInfo?.updatePolicyStatus ?? false,
      triggerSupervisa: basicInfo?.triggerSupervisa ?? false,
      clientAddress: basicInfo?.clientAddress ?? '',
      commentsOnRating: basicInfo?.commentsOnRating ?? '',     
      policyOwner: basicInfo?.policyOwner ?? null,
      sendToPolicyStartDateEmailTrack: basicInfo?.sendToPolicyStartDateEmailTrack ?? '',
      sendToBotResult: basicInfo?.sendToBotResult ?? '',
      phoneUpdated: basicInfo?.phoneUpdated ?? null,
      premiumFrequency: basicInfo?.premiumFrequency ?? null,
      policyStatus: basicInfo?.policyStatus ?? '',
      location: basicInfo?.location ?? null,
      policyAdvisor: basicInfo?.policyAdvisor ?? null,
      advisorCommisionRecieved: basicInfo?.advisorCommisionRecieved ?? '',
      policyType: basicInfo?.policyType ?? '',
      advisorProbhitedBehaviourCompliance: basicInfo?.advisorProbhitedBehaviourCompliance ?? '',
      clientFirstPolicy: basicInfo?.clientFirstPolicy ?? '',
      advisorCodeOfConductComplaince: basicInfo?.advisorCodeOfConductComplaince ?? '',
      currency: basicInfo?.currency ?? '',
      issuedBy: basicInfo?.issuedBy ?? null,
      offeringName: basicInfo?.offeringName ?? null,
      client: basicInfo?.client ?? null,

      // <<<<<<<<< SERVICE DETAILS >>>>>>>>>>
      isClientTheInsured: services?.isClientTheInsured ?? '',
      areThereMultipleInsured: services?.areThereMultipleInsured ?? '',
      numberOfInsured: services?.numberOfInsured ?? null,
      areThereMultipleBeneficiary: services?.areThereMultipleBeneficiary ?? '',
      isClientABeneficiary: services?.isClientABeneficiary ?? null,
      // numberofBeneficiaries: services?.numberofBeneficiaries ?? null,
      areThereTrusteeForThisPolicy: services?.areThereTrusteeForThisPolicy ?? '',
      numberOfTrustee: services?.numberOfTrustee ?? null,
      applicationOn: services?.applicationOn ? new Date(services.applicationOn) : null,
      trustDissolutionDate: services?.trustDissolutionDate ? new Date(services.trustDissolutionDate) : null,
      trustDocumentRecievedAndUploaded: services?.trustDocumentRecievedAndUploaded ?? null,
      arethereMultipleBeneficiaries: services?.arethereMultipleBeneficiaries ?? '',
      beneficiaryGender: services?.beneficiaryGender ?? '',     

    };
}
async function processSubform(subformArray, rowId, type) {
  if (!subformArray) {
    return { updateArray: [], insertArray: [] };
  }

  const updateArray = [];
  const insertArray = [];

  subformArray.forEach((item) => {
    const subformObject = {
      policyId: rowId,
      ROWID: item.ROWID ?? null,
      ...getSubformFields(item, type), // Merge fields based on type
    };

    if (item.ROWID) {
      updateArray.push(subformObject);
    } else {
      delete subformObject.ROWID;
      insertArray.push(subformObject);
    }
  });

  return { updateArray, insertArray };
}
function getSubformFields(item, type) {
  switch (type) {
    case "beneficiary":
      return {
        name: item?.name ?? "",
        email: item?.email ?? "",
        dob: item?.dob ?? null,
        phone: item?.phone ?? "",
        lifeBeneficiaryName: item?.lifeBeneficiaryName ?? "",
        relationship: item?.relationship ?? "",
        
      };
    case "contingentBeneficiary":
      return {
        name: item?.name ?? "",
        email: item?.email ?? "",
        dob: item?.dob ?? null,
        phone: item?.phone ?? "",
        beneficiaryPercent: item?.beneficiaryPercent ?? "",
        relationship: item?.relationship ?? "",
      };
    
    case "trustee":
      return {
        name: item?.name ?? "",
        email: item?.email ?? "",
        phone: item?.phone ?? "",
        relationship: item?.relationship ?? "",
      };
    case "OwnerShip":
      return {
        name: item?.name ?? "",
        email: item?.email ?? "",
        dob: item?.dob ?? null,
        relationship: item?.relationship ?? "",
      };
    case "commission":
      return {
        monthPremium: item?.monthPremium ?? "",
        gcComm: item?.gcComm ?? null,
        naCoom: item?.naCoom ?? null,
        ncComm: item?.ncComm ?? null,
        nlComm: item?.nlComm ?? null,
        glComm: item?.glComm ?? null,
      };
    case "renewalHis":
      return {
        premiumFrequency: item?.premiumFrequency ?? "",
        premiumAmount: item?.premiumAmount ? parseFloat(item.premiumAmount) : null,
        policyAmount: item?.policyAmount ? parseFloat(item.policyAmount) : null,
        policyIssuedDate: item?.policyIssuedDate ? new Date(item.policyIssuedDate) : null,
        policyRenewalDate: item?.policyRenewalDate ? new Date(item.policyRenewalDate) : null,
        medicalRequired: item?.medicalRequired ?? "",
        renewalCommission: item?.renewalCommission ? parseFloat(item.renewalCommission) : null,
        policyAdvisor: item?.policyAdvisor ?? "",
        
      };
    case "claim":
      return {
        dateOfClaim: item?.dateOfClaim ? new Date(item.dateOfClaim) : null,
        reasonforClaim: item?.reasonforClaim ?? "",
        amountofClaim: item?.amountofClaim ? parseFloat(item.amountofClaim) : null,
        claimClosedOn: item?.claimClosedOn ? new Date(item.claimClosedOn) : null,
        claimAmountSettled: item?.claimAmountSettled ? parseFloat(item.claimAmountSettled) : null,
        claimAmountRejected: item?.claimAmountRejected ? parseFloat(item.claimAmountRejected) : null,
        settlement: item?.settlement ?? ""
        
      };
    
    default:
      return {}; // Default case if type is not recognized
  }
}
// <<<<<<< ==== CSV DOWNLOAD FUNCTIONALITY ======== >>>>>>>
async function downloadSampleFile(type) {
  try {
    let headers =  type === "lifePolicy"? lifePolicy:type === "rrsp" ? rrsp:type === "tfsa" ? tfsa:type === "resp" ? resp: visa;
    const csvStringifier = createObjectCsvStringifier({
      header: headers,
    });
    const data = type === "lifePolicy"? lifePolicySample:type === "rrsp" ? rrspSample:type === "tfsa" ? tfsaSample:type === "resp" ? respSample: visaSample;
    const csvContent =
      csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(data);
    
    return csvContent;
  } catch (error) {
    console.error("Error downloading file:", error);
  }
}


// <<<<<<<<<<<<<<  CREATE NEW POLICY API FOR RPA >>>>>>>>>>>>>>  
async function parsePolicyDataFromRPA(formdata) {
 let name = `${formdata?.primaryInsuredPerson?.firstName ?? ''} ${formdata?.primaryInsuredPerson?.lastName ?? ''}`;
  let issuedBy = formdata?.policyInformation?.agent;
  let issuedByLook = null;
  let policyType = formdata?.coverageDetails?.policyType ?? null;
  let policyNo = formdata?.primaryInsuredPerson?.policyNumber ?? '';
  let contactobj = formdata?.contactInformation;
  const coverageObj = parseCurrency(formdata?.coverageDetails?.coverage ?? null);
  const probhitedBehaviour = [
"Complied with Prohibition of Exercise of Discretionary Authority",
"Complied with Prohibition of Fronting",
"Complied with Rebating and Inducements",
"Complied with Prohibition of Viatical Agreements/Life Settlements/Stranger Owned or Investor Owned Life Insurance",
"Complied with Prohibition of certain methods of Payments",
"Complied with Prohibition of Twisting",
"Complied with Prohibition of Churning",
"Complied with Prohibition of Tied Selling",
"Complied with Prohibition of Forgery and Alteration of Documents",
"Complied with Prohibition of Engaging in Criminal Behavior While Performing the Duties of an Agent",
"Complied with Prohibition of Selling insurance or providing advice without having a valid insurance license",
"Complied with Prohibition of Selling insurance or providing advice without having a valid errors and omissions insurance",
"Complied with Prohibition of Improper Use of Sales Associates and Assistants"
]
  const CodeOfConduct = [
	"Placed the Customer’s Best Interests First",
	"Held Out Representation Appropriately",
	"Made Needs-Based Recommendations",
	"Made Clear and Accurate Representations",
	"Provided Full Disclosure",
	"Provided Segregated Fund Point of Sale Disclosures",
	"Used Only Approved Sales Illustrations",
	"Avoided Conflicts of Interest",
	"Recommended Replacements Only When it is Appropriate to Do So",
	"Recommended Leveraging Only When it is Appropriate to Do So",
	"Obeyed the Rules for Referrals and Referral Fees",
	"Obeyed the Rules for Commission Splitting",
	"Protected Privacy & Confidentiality",
	"Respected Copyrights",
	"Delivered All Documents Immediately",
	"Handled and Reported Complaints Appropriately",
	"Maintained a Complaint Log",
	"Followed Guidelines relevant to Anti-Money Laundering",
	"Complied with CRTC’s Unsolicited Telecommunications Rules, including National Do Not Call List “N- DNCL”",
	"Kept Accurate and Substantial Books & Records",
	"Maintained active licences and the required errors and omissions insurance",
	"Notified Canadian LIC Administration of any discrepancies",
]
  return {
    layout: formdata?.layout ?? "Travel and Supervisa",
    policyOwner: 5951000000278302, // Harpreet K	 USER ID
    policyName: name + '-' + issuedBy + '-' + policyType + '-' + policyNo,
    policyNumber: policyNo,
    coverageAmount: formdata?.coverageDetails?.coverage ?? null,
    policyPremiumI: formdata?.premiumPaymentInfo?.premium ?? null,
    premiumFrequency:"",
    clientMobile: phoneFormat(contactobj?.phoneNumber) ?? null,
    clientAddress: contactobj ? `${contactobj?.addressLine1 ?? ''} ${contactobj?.addressLine2 ?? ''} ${contactobj?.city ?? ''} ${contactobj?.province ?? ''} ${contactobj?.postalCode ?? ''} ${contactobj?.country ?? ''}` : '',
    currency: 'USD',
    issuedBy: issuedByLook,
    email:  contactobj?.emailAddress ?? '',
    whatsapp: phoneFormat(contactobj?.phoneNumber) ?? null,
    location: 5951000000511698, //  Brampton LOCATION ID
    exchangeRate: 1,
    advisorProbhitedBehaviourCompliance:probhitedBehaviour,
    advisorCodeOfConductComplaince:CodeOfConduct,
    isClientTheInsured:"No",
    areThereMultipleInsured:"No",
    isClientABeneficiary:"Yes",
    numberofBeneficiariesupto4:"1",
  };
}

function parseSubDetails (formdata,policyId) {

  return {
    applicationInitiatedOn:dateFormat(formdata?.saleDate ?? null),
    applicationSubmittedOn:dateFormat(formdata?.saleDate ?? null),
    policyStartDate:dateFormat(formdata?.effectiveDate ?? null),
    policyIssuedDate:dateFormat(formdata?.effectiveDate ?? null),
    policyRenewalDate:dateFormat(formdata?.expiryDate ?? null),
    policiesId:policyId,
  }
}

function parsePolicyOwnerShip(formdata,policyId) {
  return {
    name: `${formdata?.firstName ?? ''}` + ' ' + `${formdata?.lastName ?? ''}`,
    dob: dateFormat(formdata?.dateOfBirth ?? null),
    email: formdata?.emailAddress ?? '',
    phone: phoneFormat(formdata?.phoneNumber ?? ''),
    relationship: formdata?.relationshipToInsured ?? '',
    policyId: policyId,
  }
}

function parseBeneficiaryDetails(formdata,policyId) {
  return {
    name: `${formdata?.firstName ?? ''}` + ' ' + `${formdata?.lastName ?? ''}`,
    dob: dateFormat(formdata?.dateOfBirth ?? null),
    email: formdata?.emailAddress ?? '',
    phone: phoneFormat(formdata?.phoneNumber ?? ''),
    relationship: formdata?.relationshipToInsured ?? '',
    policyId: policyId,
  }
}

function parseCurrency(value) {
  const regex = /^(\$)([\d,]+(?:\.\d{1,2})?)\s?(CAD)$/
  const match = value.match(regex);

  if (!match) {
    console.log("No match found");
    return {
      currencySymbol: "$",
      amount: 0,
      currencyCode: "USD"
    };
  }
  return {
    currencySymbol: match[1],
    amount: parseFloat(match[2].replace(/,/g, "")), // remove commas, convert to number
    currencyCode: match[3]
  };
}

function phoneFormat(number) {
  if (!number) return "";
  return number.replace(/\D/g, "");
}

function dateFormat(date) {
  if (!date) {
    return null;
  }
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}