import axios from "axios";
import { putUrl } from "../../../boot/axios";

let locationOptions = [];
let users = [];
let contacts = [];
let policyAdvisorOptions = [];
let insurancePartner = [];
let insOfferingName = [];

export const getallusers = async () => {
  const response = await axios.get(`${putUrl}canadianlicapi/utils/api/v2/get-users`);

  users = response.data.users;
  console.log("This is api users print", users);
  return users;
};

export const getInsurancePartners = async () => {
  const response = await axios.get(
    `${putUrl}Policy/api/v1/getInsurecePartners`
  );
  console.log("response=======>", response.data[0]);
  insurancePartner = response.data;
  // insurancePartner = response.map((item) => ({
  //   ROWID: item.ROWID,
  //   name: item.partnerName
  // }));
  console.log("iiiiiiiiiiiiiiiii====> ", insurancePartner);
  return insurancePartner;
};
export const getOfferingdata = async () => {
  const response = await axios.get(
    `${putUrl}Policy/api/v1/getOffering`
  );
  insOfferingName = response.data.map((item) => ({ROWID:item.offering.ROWID,name:item.offering.offeringName}));
  console.log("This is contactoptions", response);
  return insOfferingName;  
};
export const getAllContacts = async () => {
  const response = await axios.get(`${putUrl}canadianlicapi/utils/api/v2/get-contacts`);
  contacts = response.data.contacts;
  console.log("This is contactoptions", response);
  return contacts;
};

export const getAdvisors = async () => {
  const response = await axios.get(
    `${putUrl}canadianlicapi/utils/api/v2/get-advisors`
  );
  policyAdvisorOptions = response.data?.advisors
  return policyAdvisorOptions;
};

export const getLocation = async () => {
  const response = await axios.get(`${putUrl}Policy/api/v1/getLocations`);
  console.log("<This is locations>", response.data[0]);
  locationOptions = response.data.map((item) => ({ROWID:item.locations.ROWID,name:item.locations.locationName}));
  console.log("<==========This is locations ========>", locationOptions);
  return locationOptions;
};

export const getDeals = async () => {
  const response = await axios.get(`${putUrl}Policy/api/v1/getdeals`);
  console.log("This is deals", response);
  return response.data.response.map((item) => item.deals);
};

export const getAllPolicy = async () => {
   
    const response = await axios.get(`${putUrl}Policy/api/v1/getpolicy`);
    console.log(
      "This is policy",
      response.data.policyData.map((item) => {
        return item.policies;
      })
    );

    const policyData = response.data.policyData.map(item => ({
      ...item.policies,
      firstName: `${item.contacts.firstName} ${item.contacts.lastName}`,
      ownerName: `${item.userData.firstName} ${item.userData.lastName}`,
    }));
    return policyData;
  
};

export const getPolicyDetails = async (id) => {
  console.log("This is policy external function", id);
  const response = await axios.get(`${putUrl}Policy/api/v1/getpolicy/${id}`);

  const policyDataArray = response.data.data.policyResult.map(
    (item) => item.policies
  );
  const policySubDetailsArray = response.data.data.policySubDetails.map(
    (item) => item.policySubDetails
  );
  const supervisaPolicySubDetails = response.data.data.supervisaPolicySubDetails.map(
    (item) => item.supervisaPolicySubDetails
  );
  const policyOwnerShip = response.data.data.policyOwnerShip.map(
    (item) => item.policyOwnership
  );
  const beneficiary = response.data.data.beneficiary.map(
    (item) => item.beneficiary
  );
  const contingentBeneficiary = response.data.data.contingentBeneficiary.map(
    (item) => item.contingentBeneficiary
  );
  const policyCommission = response.data.data.policyCommissionResult.map(
    (item) => item.policyCommission
  );
  const policyTrusteeResult = response.data.data.policyTrusteeResult.map(
    (item) => item.trustees
  );
  console.log("===policyDataArray===", policyDataArray[0]);
  console.log("policySubDetailsArray", policySubDetailsArray[0]);
  console.log("supervisaPolicySubDetails", supervisaPolicySubDetails[0]);
  console.log("policyOwnerShip", policyOwnerShip);
  console.log("beneficiary", beneficiary);
  console.log("contingentBeneficiary", contingentBeneficiary);
  console.log("policyCommission", policyCommission);

  console.log("++++++ policy id+++++++", policyDataArray	);
  const formData = {
    layout: policyDataArray[0].layout,
    policyOwner: policyDataArray[0].owner,
    policyName: policyDataArray[0].policyName,
    email: policyDataArray[0].email,
    policyAdvisor: policyDataArray[0].policyAdvisor,
    advisorName: policyDataArray[0].advisorName,
    location: policyDataArray[0].location,
    issuedBy: policyDataArray[0].issuedBy,
    client: policyDataArray[0].client,
    premiumFrequency: policyDataArray[0].frequency,
    policyNumber: policyDataArray[0].policyNumber,
    coverageAmount: policyDataArray[0].coverageAmount,
    policyPremiumI: policyDataArray[0].policyPremium,
    clientMobile: policyDataArray[0].mobile,
    clientAddress: policyDataArray[0].address,
    policyStatus: policyDataArray[0].status,
    locationDiscountFactor: policyDataArray[0].discountFactor,
    productFycPercent: policyDataArray[0].fyc,
    advisorCommisionRecieved: policyDataArray[0].commissionReceived,
    policyType: policyDataArray[0].policyType,
    corporateBonusPercent: policyDataArray[0].bonus,
    deal: policyDataArray[0].deal,
    advisorBonusLevel: policyDataArray[0].bonusLevel,
    clientCampaignSource: policyDataArray[0].campaignSource,
    advisorProbhitedBehaviourCompliance: policyDataArray[0].pbCompliance[0],
    clientFirstPolicy: policyDataArray[0].firstPolicy,
    advisorBonusOfFyc: policyDataArray[0].aBonusFyc,
    notes: policyDataArray[0].note,
    commentsOnRating: policyDataArray[0].commentsOnRating,
    advisorCodeOfConductComplaince: policyDataArray[0].conductCompliance[0],
    phoneupdated: policyDataArray[0].phoneUpdated,
  

    // second step of form
    isClientTheInsured: policyDataArray[0].isClientTheInsured,
    areThereMultipleInsured: policyDataArray[0].areThereMultipleInsured,
    numberOfInsured: policyDataArray[0].numberOfInsured,

    policyAttachmentLink: policyDataArray[0].attachmentLink,
    areThereMultipleBeneficiary: policyDataArray[0].clientBeneficiary,
    isClientABeneficiary: policyDataArray[0].isClientABeneficiary,

    // 3rd step data
    applicationSubmittedOn: policySubDetailsArray[0].applicationSubmittedOn,
    nextFollowUpDate: policySubDetailsArray[0].nextFollowUpDate,
    policyApprovedDate: policySubDetailsArray[0].policyApprovedDate,
    approvalRating: policySubDetailsArray[0].approvalRating,
    policyStartDate: policySubDetailsArray[0].policyStartDate,
    policyIssuedDate: policySubDetailsArray[0].policyIssuedDate,
    policyPickedUpOn: policySubDetailsArray[0].policyPickedUpOn,
    premiumPaidDuringPickUpPeriod:
      policySubDetailsArray[0].premiumPaidDuringPickUpPeriod,
    applicationPostponedTo: policySubDetailsArray[0].applicationPostponedTo,
    policyDeclineDate: policySubDetailsArray[0].policyDeclineDate,
    reasonForPolicyBeingDeclined:
      policySubDetailsArray[0].reasonForPolicyBeingDeclined,
    applicationMedicalRequirement:
      policySubDetailsArray[0].applicationMedicalRequirement,
    earlyReturnApplicationCancelled:
      policySubDetailsArray[0].earlyReturnApplicationCancelled,
    earlyReturnAmendmentRequested:
      policySubDetailsArray[0].earlyReturnAmendmentRequested,
    earlyReturnAmendmentRequestedFor:
      policySubDetailsArray[0].earlyReturnAmendmentRequestedFor,
    earlyReturnAmendmentCompletedDate:
      policySubDetailsArray[0].earlyReturnAmendmentCompletedDate,
    policyRenewalDate: policySubDetailsArray[0].policyRenewalDate,
    reviewed: policySubDetailsArray[0].reviewedDate,
    policyReviewComments: policySubDetailsArray[0].policyReviewComments,
    policyReviewCommentUpdatedOn:
      policySubDetailsArray[0].policyReviewCommentUpdatedOn,
    renewalMedicalRequirement:
      policySubDetailsArray[0].renewalMedicalRequirement,
    renewalMedicalConformationNumber:
      policySubDetailsArray[0].renewalMedicalConformationNumber,
    renewalMedicalApplicationDateAndTime:
      policySubDetailsArray[0].renewalMedicalApplicationDateAndTime,
    policyRenewalCompleted: policySubDetailsArray[0].policyRenewalCompleted,
    policyExpiresOn: policySubDetailsArray[0].policyExpiresOn,
    anyCurrentClaimsOnThisPolicy:
      policySubDetailsArray[0].anyCurrentClaimsOnThisPolicy,
    anyPastClaimsOnThePolicy: policySubDetailsArray[0].anyPastClaimsOnThePolicy,
    dateOfClaim: policySubDetailsArray[0].dateOfClaim,
    reasonOfClaim: policySubDetailsArray[0].reasonOfClaim,
    claimAmount: policySubDetailsArray[0].claimAmount,
    claimOutcome: policySubDetailsArray[0].claimOutcome,
    claimClosedOn: policySubDetailsArray[0].claimClosedOn,
    claimSubmitted: policySubDetailsArray[0].claimSubmitted,

    // 4th step form
    totalAmountClaimed: policySubDetailsArray[0].totalAmountClaimed,
    totalAmountSettled: policySubDetailsArray[0].totalAmountSettled,
    totalAmountRejected: policySubDetailsArray[0].totalAmountRejected,
    ringcentralSmsResponse: policySubDetailsArray[0].ringcentralSmsResponse,

    // 5th step form
    dayWiseCorporateCommision: supervisaPolicySubDetails[0].dwcCommission,
    dayWiseLocationCommision: supervisaPolicySubDetails[0].dwlCommission,
    dayWiseAdvisorCommision: supervisaPolicySubDetails[0].dwaCommission,
    policyMonth: supervisaPolicySubDetails[0].policyMonth,
    totalGrossCorporateCommision: supervisaPolicySubDetails[0].tgCorpoarateCom,
    totalGrossLocationCommision: supervisaPolicySubDetails[0].tgLocationCom,
    totalNetLocationCommission: supervisaPolicySubDetails[0].tnLocationCom,
    totalGrossAdvisorCommission: supervisaPolicySubDetails[0].tnAdvisorCom,
    totalNetCorporateCommision: supervisaPolicySubDetails[0].tnCorporateCom,

    // 6th step of form
    howManyDaysLeft: supervisaPolicySubDetails[0].daysLeft,
    grossCorporateCommission: supervisaPolicySubDetails[0].gcComm,
    grossLocationCommission: supervisaPolicySubDetails[0].glComm,
    totalPolicyCommission: supervisaPolicySubDetails[0].tpComm,
    totalAdvisorCommission: supervisaPolicySubDetails[0].taComm,
    returnAmountNotRecieved: supervisaPolicySubDetails[0].returnAmt,
    actualPolicyCommssion: supervisaPolicySubDetails[0].apCommAfterDeduct,
    netAdvisorCommissionAfterDeductible:
      supervisaPolicySubDetails[0].naCommAfterDeduct,
    netLocationCommssionAfterDeductible:
      supervisaPolicySubDetails[0].nlCommAfterDeduct,
    netCorporateCommssionAfterDeductible:
      supervisaPolicySubDetails[0].ncCommAfterDeduct,

    isClientInsuredData: [...policyOwnerShip],

    // policy Beneficiary sub form

    policyBeneficiaryData: [...beneficiary],

    // contigent Beneficiary subform

    contingentBeneficiaryData: [...contingentBeneficiary],

    // Policy Trustees
    areThereTrusteeForThisPolicy: policyDataArray[0].trusteesPolicy,
    applicationOn: policyDataArray[0].applicationOn,
    trustDissolutionDate: policyDataArray[0].dissolutionDate,
    TrustDocumentRecievedAndUploaded: policyDataArray[0].documentsReceived,
    numberOfTrustee:policyDataArray[0].numberOfTrustee,
    policyTrusteeData: [...policyTrusteeResult],

    // subform Of PolicyCommission

    policyCommissionData: [...policyCommission],
  };

  const rowIds = [{
    policyId: policyDataArray[0].ROWID,
    policySubId: policySubDetailsArray[0].ROWID,
    supervisaPolicySubId: supervisaPolicySubDetails[0].ROWID,
  }
  ];
   
  console.log("This is from ROWIDS from apis ",rowIds);
  return { formData, rowIds };
};


export const getAllInvestments = async () => {
 
    const response = await axios.get(`${putUrl}investment/api/v1/getinvestment`);
    console.log(
      "This is Investments",
      response.data.policyData.map((item) => {
        return item.policies;
      })
    );

    const policyData = response.data.policyData.map(item => ({
      ...item.policies,
      firstName: `${item.contacts.firstName} ${item.contacts.lastName}`,
      ownerName: `${item.userData.firstName} ${item.userData.lastName}`,
    }));
    return policyData;
  
};

export const getInvestmentDetails = async (id) => {
  console.log("This is investment external function", id);
  const response = await axios.get(`${putUrl}investment/api/v1/getinvestment/${id}`);
console.log(response);
  const investmentDataArray = response.data.data.investmentResult.map(
    (item) => item.policies
  );
  const beneficiaryResultArray = response.data.data.beneficiaryResult.map(
    (item) => item.beneficiary
  );
  const contingentBeneficiaryResult = response.data.data.contingentBeneficiaryResult.map(
    (item) => item.contingentBeneficiary
  );
  const inBasketResult = response.data.data.inBasketResult.map(
    (item) => item.inBasket
  );
  const annuitantAndTrackingResult = response.data.data.annuitantAndTrackingResult.map(
    (item) => item.annuitantAndTracking
  );

  const formData = {
    layout:investmentDataArray[0].layout,
    owner:investmentDataArray[0].owner,
    name:investmentDataArray[0].policyName,
    mobile:investmentDataArray[0].mobile,
    contractName:investmentDataArray[0].contractName,
    investment:investmentDataArray[0].policyPremium,
    frequency:investmentDataArray[0].frequency,
    corporateCommission:investmentDataArray[0].bonus,
    advisorCommission:investmentDataArray[0].commissionReceived,
    monthlyAnnualContribution:investmentDataArray[0].maContribution,
    contractNumber:investmentDataArray[0].policyNumber,
    type:investmentDataArray[0].policyType,
    initialDeposit:investmentDataArray[0].initialDeposit,
    locationCommission:investmentDataArray[0].discountFactor,
    initialContribution:investmentDataArray[0].initialContribution,
    totalContribution:investmentDataArray[0].totalContribution,
    cegs:investmentDataArray[0].cegs,
    registered:investmentDataArray[0].registered,
    clientAddress:investmentDataArray[0].address,

    // 2nd step form


    investmentBasketData:[...inBasketResult],


    isTheClientAnnuitent:annuitantAndTrackingResult[0].annuitantClient,
    numberOfAnnuitants:annuitantAndTrackingResult[0].annuitantsNo,
    phone:annuitantAndTrackingResult[0].phone,
    gender:annuitantAndTrackingResult[0].gender,
    nameOfCoApplicant:annuitantAndTrackingResult[0].coapplicantName,

    relationshipToPrimaryAnnuitment:annuitantAndTrackingResult[0].relationship,
    primarySubscriber:annuitantAndTrackingResult[0].pSubscriber,
    applicantGender:annuitantAndTrackingResult[0].applicantGender,
    isThereCoapplicant:annuitantAndTrackingResult[0].coapplicant,
    email:annuitantAndTrackingResult[0].email,
    dateOfBirth:annuitantAndTrackingResult[0].dob,
    applicantDOB:annuitantAndTrackingResult[0].applicantDob,
    nameOfPrimaryAnnuitment:annuitantAndTrackingResult[0].annuitantName,
    successorAnnuitant:annuitantAndTrackingResult[0].sAnnuitant,
    address:annuitantAndTrackingResult[0].address,
    isThereAJointReplacingSubscriber:annuitantAndTrackingResult[0].replacingSubscriber,
   


    // 3rd step form
    beneficiaryName:beneficiaryResultArray[0].name,
    beneficiaryPhone:beneficiaryResultArray[0].phone,
    beneficiarEmail:beneficiaryResultArray[0].email,
    beneficiaryGender:beneficiaryResultArray[0].gender,
    beneficiaryDOB:beneficiaryResultArray[0].dob,
    associatedToContract:beneficiaryResultArray[0].contractAssociated,
    beneficiaryType:beneficiaryResultArray[0].type,


  contingentBeneficiaryData: [...contingentBeneficiaryResult],



  // 4th step form
  dateOfEnquiry:annuitantAndTrackingResult[0].inquiryDate,
  maturityDate:annuitantAndTrackingResult[0].maturityDate,
  followUpDate:annuitantAndTrackingResult[0].followUpDate,
  dateOfSubmission:annuitantAndTrackingResult[0].submissionDate,
  contractStartDate:annuitantAndTrackingResult[0].contractStartDate,
  dateOfLastReview:annuitantAndTrackingResult[0].lastReviewDate,

  }

 let rowIds={
    policyId:investmentDataArray[0].ROWID,
    annuitantAndTrackingId:annuitantAndTrackingResult[0].ROWID,
    beneficiaryId:beneficiaryResultArray[0].ROWID,
  }

  console.log("this is rowids in get all investment details",rowIds);

  console.log("Thsi si coming from ",{
    investmentDataArray,
    beneficiaryResultArray,
    contingentBeneficiaryResult,
    inBasketResult,
  })

return {formData,rowIds};
}


export const getAllInvestmentAndPolicy=async (payload={})=>{
  // console.log("This is from get all investment and policy");
  const response = await axios.post(`${putUrl}Policy/api/v1/getallinvandpolicy`,payload);
  console.log("response",response);
  
  const policyInvestmentData = response.data.policyInvData.map(item => ({
    ...item.policySubDetails,
    ...item.supervisaPolicySubDetails,
    ...item.policies,
    clinetName: `${item.contacts.firstName} ${item.contacts.lastName}`,
    clinetROWID: `${item.contacts.ROWID}`,
    ownerName: `${item.userData.firstName} ${item.userData.lastName}`,
  }));
  return policyInvestmentData;

}
