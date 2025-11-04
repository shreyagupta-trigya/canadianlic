const catalyst = require("zcatalyst-sdk-node");
const {getAccessToken,getPolicyrmData, insertData, insertSubformData} = require("../../Utils/helper");


exports.policyConnection = async (req, res) => {
    try {
      res.status(200).json({ success: true, message: "I'm live!" });
    } catch (error) {
      res.status(500).json({ success: false, message: "I'm Not live!" });
    }
};
exports.createPolicy = async (req, res) => {
    try {
      const catalystApp = catalyst.initialize(req, { scope: "admin" });
      const policyData = req.body?.data?.event_data[0];
  
      if (!policyData) {
        return res.status(400).json({ success: false, message: "Invalid policy data." });
      }
  
      const response = await parsePolicysData(catalystApp, policyData);
      res.status(200).json({
        success: true,
        message: "Policy successfully created",
        data: response,
      });
    } catch (error) {
      console.error("Error in createPolicy:", error);
      res.status(500).json({ success: false, message: "Policy not created!" });
    }
};
async function parsePolicysData(catalystApp, policiesData) {
    const layout = policiesData?.Layout === "4299079000000475186" ? "Life Policy" : "Travel and Supervisa";
    // const accessToken = await getAccessToken();
    // const catalystRowsArr = await getPolicyCrmData(policiesData?.id, accessToken);
    // const policyLookupObj = { ...catalystRowsArr[0], ...catalystRowsArr[1] };
    const policyLookupObj='';
    const allStats = await getAllStats(policiesData, policyLookupObj, layout);
  
    let policies = allStats[0];
    let supervisaPolicySubDetails = allStats[1];
    let annuitantAndTrackingDetails = allStats[2];
    let policySubDetailsDetails = allStats[3];
    let beneficiaryDetails = allStats[4];
   // let parsePolicyTrusteeDetails = allStats[5];
    let contingentBeneficiaryDataDetails = allStats[5];
    let policyOwnershipDetails = allStats[6];
    let claimDetails = allStats[7];
    let commissionDetails = allStats[8];
    // console.log("<===commissionDetails===>",(allStats));
    if (policiesData.Catalyst_Id === null) {

      //console.log("No policies", policiesData);     
      const policiesId = await insertData(catalystApp, "policies", {
        ...policies,
        source: "crm",
        sourceId: policiesData?.id??null
      });
  
      await Promise.all([
        insertData(catalystApp, "supervisaPolicySubDetails", { ...supervisaPolicySubDetails, policyId: policiesId }),
        insertData(catalystApp, "annuitantAndTracking", { ...annuitantAndTrackingDetails, policyId: policiesId }),
        insertData(catalystApp, "policySubDetails", { ...policySubDetailsDetails, policiesId: policiesId }),
        insertSubformData(catalystApp, "beneficiary", beneficiaryDetails,policiesId,"policy"),
        //insertSubformData(catalystApp, "trustees", parsePolicyTrusteeDetails,policiesId,"policy"),
        insertSubformData(catalystApp, "contingentBeneficiary", contingentBeneficiaryDataDetails,policiesId,"policy"),
        insertSubformData(catalystApp, "policyOwnership", policyOwnershipDetails,policiesId,"policy"),
        insertSubformData(catalystApp, "pastClaims", claimDetails,policiesId,"policy"),
        insertSubformData(catalystApp, "policyCommission", commissionDetails,policiesId,"policy"),
      ]);
      console.log("policyId",policiesId);
      //console.log("Function State",functionState);
    }
  }
  
  async function getAllStats(crmResp, contactLookupObj, layout) {
    return Promise.all([
      parsePolicyData(crmResp),
      parseSupervisaPolicySubDetailsData(crmResp),
      parseAnnuitantInfoData(crmResp),
      parsePolicyTrackingDate(crmResp),
      beneficiaryData(crmResp),
      //parsePolicyTrustee(crmResp),
      contingentBeneficiaryData(crmResp),
      policyOwnershipData(crmResp),
      claimData(crmResp),
      commissionData(crmResp),
    ]);
  }
  
  
  async function parsePolicyData(crmResp) {
    return {
      policyOwner: "22106000000065307",
      policyName: crmResp?.Name ?? '',
      policyNumber: crmResp?.Policy_Number ?? '',
      coverageAmount: crmResp?.Policy_Amount ?? null,
      policyPremiumI: crmResp?.Policy_Premium ?? null,
      premiumFrequency: crmResp?.Premium_Frequency ?? null,
      clientCampaignSource:crmResp?.Campaign_Source??"",
      email:crmResp?.Email??"",
      clientMobile:crmResp?.Client_Mobile??null,
      productFycPercent:crmResp?.Product_FYC??null,
      insuranceCompanyAccount:crmResp?.Insurance_Company_Account??"",
      corporateBonusPercent:crmResp?.Policy_Bonus??null,
      offeringId:crmResp?.Offering_Id??"",
      advisorBonusOfFyc:parseFloat(crmResp?.Advisor_Bonus_of_FYC)??null,
      whatsapp:crmResp?.Whatsapp??"",
      locationDiscountFactor:  parseFloat(crmResp?.Location_Discount_Factor)??null,
      exchangeRate:crmResp?.Exchange_Rate??null,
      updateOfferingId:crmResp?.Update_Offering_id??null,
      updatePolicyStatus:crmResp?.Update_Policy_Status??null,
      triggerSupervisa:crmResp?.Trigger_Supervisa_Full_Refund_Calculation??false,
      clientAddress:crmResp?.Client_Address??'',
      commentsOnRating:crmResp?.Comments_on_Rating??'',
      // layout:crmResp.Layout??'',
      policyOwner: crmResp?.Owner ?? null,
      sendToPolicyStartDateEmailTrack: crmResp?.Send_To_Policy_Start_Date_Email_Track ?? '',
      sendToBotResult: crmResp?.Send_To_Bot_Result ?? '',
      phoneUpdated: crmResp?.phone_updated ?? null,
      premiumFrequency: crmResp?.Premium_Frequency ?? null,
      policyStatus: crmResp?.Policy_Status ?? '',
      location: crmResp?.Location ?? null,
      policyAdvisor: crmResp?.Policy_Advisor ?? null,
      advisorCommisionRecieved: crmResp?.Advisor_Commission_Received ?? '',
      policyType: crmResp?.Policy_Type ?? '',
      advisorProbhitedBehaviourCompliance: crmResp?.Advisor_Prohibited_Behaviour_Compliance ?? '',
      clientFirstPolicy: crmResp?.Client_s_First_Policy1 ?? '',
      advisorCodeOfConductComplaince: crmResp?.Compliance_with_Advisor_Code_of_Conduct ?? '',
      currency: crmResp?.Currency ?? '',
      issuedBy: crmResp?.Issued_By ?? null,
      offeringName: crmResp?.Policy_Offered ?? null,
      client: crmResp?.Client ?? null,
  
      // <<<<<<<<< SERVICE DETAILS >>>>>>>>>>
      isClientTheInsured: crmResp?.Is_Client_Policy_Owner ?? '',
      areThereMultipleInsured: crmResp?.Are_there_multiple_Owners_for_this_Policy ?? '',
      numberOfInsured: crmResp?.Number_of_Owners ?? null,
      areThereMultipleBeneficiary: crmResp?.Are_there_multiple_Beneficiaries_to_this_Policy ?? '',
      isClientABeneficiary: crmResp?.Is_Client_Policy_Insured ?? null,
      numberofBeneficiaries: crmResp?.Number_of_Beneficiaries ?? null,
      areThereTrusteeForThisPolicy: crmResp?.Are_there_Trustees_for_this_Policy ?? '',
      numberOfTrustee: crmResp?.Number_of_Trustees ?? null,
      applicationOn: new Date(crmResp?.Application_Initiated_On )?? null,
      trustDissolutionDate: crmResp?.Trust_Dissolution_Date ??  null,
      trustDocumentRecievedAndUploaded: crmResp?.Trust_Documents_Received_and_Uploaded ?? null,
       // <<<<<<<< Investment FIELDS >>>>>>>>
       relationtoPrimaryAnnuitant: crmResp?.B_Relation_to_Primary_Annuitant ?? "",// not found in crm 
        beneficiaryGender: crmResp?.Beneficiary_Gender ?? "",
       totalContribution: parseFloat(crmResp?.Total_Contribution) ??null,
       investment: parseFloat(crmResp?.Investment) ?? null,
       corporateCommission: parseFloat( crmResp?.Corporate_Commission) ?? null,
       advisorCommission: crmResp?.Advisor_Commission ?? "",
       monthlyAnnualContribution: parseFloat(crmResp?.Monthly_Annual_Contribution) ?? null,
        contractNumber: crmResp?.Contract_Number ?? null,
       initialContribution: crmResp?.Initial_Contribution ?? null,
       initialDeposit: crmResp?.Initial_Deposit ?? null,
       locationCommission: crmResp?.Location_Commission ?? null,
       clientAddress: crmResp?.Client_Address ?? null,
       registered: crmResp?.Registered ?? null,
      layout:crmResp?.Layout === "4299079000000475186" ? "Life Polices" : "Travel and Supervisa",
    };
  }
  async function parseSupervisaPolicySubDetailsData(crmResp){
    return{
        dayWiseCorporateCommision: parseFloat(crmResp?.Day_wise_Corporate_Commission) ?? null,
        dayWiseLocationCommision: parseFloat(crmResp?.Day_wise_Location_Commission) ?? null,
        dayWiseAdvisorCommision: parseFloat(crmResp?.Day_wise_Advisor_Commission) ?? null,
        policyMonth: parseFloat(crmResp?.Policy_Month) ?? null,
        updateCommission: parseFloat(crmResp?.Update_Commissions) ?? null,
        totalGrossLocationCommision: parseFloat(crmResp?.Total_Gross_Location_Com) ?? null,
        totalNetLocationCommission: parseFloat(crmResp?.Total_Net_Location_Commission) ?? null,
        corporateCommission: parseFloat(crmResp?.Net_Corporate_Commission) ?? null,
        corporateCommissionAmount: parseFloat(crmResp?.Corporate_Commission_Amount) ?? null,
        locationCommission: parseFloat(crmResp?.Day_wise_Location_Commission) ?? null,
        totalGrossCorpoarateCom: parseFloat(crmResp?.Total_Gross_Corporate_Com) ?? null,
        totalGrossAdvisorCommission: parseFloat(crmResp?.Total_Net_Advisor_Commission) ?? null,
        totalNetCorporateCommision: parseFloat(crmResp?.Total_Net_Corporate_Com) ?? null,
        advisorCommission: parseFloat(crmResp?.Advisor_Commission) ?? null,
        totalNetAdvisorCommission: parseFloat(crmResp?.Total_Net_Advisor_Commission) ?? null,
        totalNetCorporateCom: parseFloat(crmResp?.Total_Net_Corporate_Com) ?? null,
        totalGrossLocationCom: parseFloat(crmResp?.Total_Gross_Location_Com) ?? null,
        totalNetLocationpolicyCommission: parseFloat(crmResp?.Total_Net_Location_Commission) ?? null,
        corporatepolicyCommission: parseFloat(crmResp?.Total_Net_Corporate_Com) ?? null,
        locationPolicyCommission: parseFloat(crmResp?.Location_Commission_Amount1) ?? null,
        advisorPolicyCommission: parseFloat(crmResp?.Advisor_Commission) ?? null,
        updatePolicyCommission: parseFloat(crmResp?.Update_Commissions) ?? null,
        totalNetAdvisorpolicyCommission: parseFloat(crmResp?.Total_Net_Advisor_Commission) ?? null
    }
  }
  
  async function parseAnnuitantInfoData(crmResp){
    return{
      numberOfAnnuitants: crmResp?.Number_of_Annuitants ?? null,
      phone: crmResp?.Phone ?? null,
      //relationshipToPrimaryAnnuitment: crmResp?.Relationship_to_Primary_Annuitant ?? "",
      email: crmResp?.Email ?? "",
      dateOfBirth: new Date(crmResp?.Date_of_Birth) ?? null,
      applicantDOB: new Date(crmResp?.Applicant_DOB) ?? null,
      nameOfPrimaryAnnuitment: crmResp?.Name_of_Primary_Annuitant ?? "",
      isTheClientAnnuitent: crmResp?.Is_the_client_the_Annuitant ?? "",
      gender: crmResp?.Gender ?? "",
      applicantGender: crmResp?.Applicant_Gender ?? "",
      /// <<<<<<<<<<<<< INVESTMENT TRACKER  >>>>>>>>>>>>
      dateOfEnquiry: new Date(crmResp?.Date_of_Inquiry) ?? null,
      maturityDate: new Date(crmResp?.Maturity_Date) ?? null,
      followUpDate: new Date(crmResp?.Follow_Up_Date) ?? null,
      dateOfSubmission: new Date(crmResp?.Date_of_Submission) ?? null,
      contractStartDate: new Date(crmResp?.Contract_Start_Date) ?? null,
      dateOfLastReview:  new Date(crmResp?.Date_of_Last_Review) ?? null,
    }
  } 
 async function parsePolicyTrackingDate(crmResp){
    return{
      //Investment Data 
      // policiesId: rowId,
      applicationSubmittedOn: crmResp?.Application_Submitted_On ?? null,
      nextFollowUpDate: crmResp?.Application_Follow_Up_Date ??null,
      newPolicyStartDate: crmResp?.New_Policy_Start_Date ?? null,
      applicationInitiatedOn: crmResp?.Application_Date ?? null,
      policyApprovedDate: crmResp?.Policy_Approved_Date ?? null,
      policyAttachmentLink: crmResp?.Policy_Attachment_Link ?? null,
      nameOfConfirmationRenewal: crmResp?.Re_Name_of_Confirmation ?? null,
      policyStartDate: crmResp?.Policy_Start_Date ?? null,
      policyIssuedDate: crmResp?.Policy_Issued_Date ?? null,
      policyExpiresOn: crmResp?.Policy_Expiry_On ?? null,
      nameOfConfirmation: crmResp?.Name_of_Confirmation ?? null,
      policyPickedUpOn: crmResp?.Policy_Picked_Up_On ?? null,
      applicationPostponedTo: crmResp?.applicationPostponedTo ?? null,
      policyDeclineDate: crmResp?.Policy_Declined_Date ?? null,
      earlyReturnAmendmentRequested: crmResp?.Amendment_Requested_for ?? null,
      earlyReturnAmendmentCompletedDate: crmResp?.Amendment_Completed_Date ?? null,
      policyRenewalDate: crmResp?.Policy_Renewal_Date ?? null,
      //Policy Data 
      policyReviewCommentUpdatedOn: crmResp?.Policy_Review_Comments_updated_on ? new Date(crmResp.Policy_Review_Comments_updated_on) : null, 
      reasonForPolicyBeingDeclined: crmResp?.Comments_on_Rejection ?? null,
      earlyReturnApplicationCancelled: crmResp?.Application_Cancelled ? new Date(crmResp.Application_Cancelled) : null,
      earlyReturnAmendmentRequestedFor: crmResp?.Amendment_Requested_for ?? '',
      policyReviewComments: crmResp?.Policy_Review_Comments ?? '',
      cancellation: crmResp?.Cancellation_Amendment_Requested_for ?? '',
      renwalExpired: crmResp?.Confirmation_Poilcy_Renewal_Expired ?? '',
      premiumPaidDuringPickUpPeriod: crmResp?.Premiums_Paid ?? '',
      applicationMedicalRequirement: crmResp?.Is_Medical_required ?? '',
      confirmationPolicyStart: crmResp?.Confirmation_Policy_Start ?? '',
      renewalMedicalRequirement: crmResp?.Renewal_Medical_requested ?? null,
      policyRenewalCompleted: crmResp?.Is_Policy_Renewed ?? null,
      renewalMedicalConformationNumber: crmResp?.Renewal_Medical_Confirmation_Number ?? '',
      renewalMedicalApplicationDateAndTime: crmResp?.Renewal_Medical_Application_Date_Time ?? null,
      // reviewedDateTime: await dateTimeFormat(crmResp?.Last_Reviewed_Date_Time) ?? null,                      
      // // clamies details
      totalAmountClaimed: parseFloat(crmResp?.Total_Amount_Claimed) ?? null,
      totalAmountSettled: parseFloat(crmResp?.Total_Amount_Settled) ?? null,
      totalAmountRejected: parseFloat(crmResp?.Total_Amount_Rejected) ?? null,
      ringcentralSmsResponse: crmResp?.Ringcentral_sms_response ?? '',
      areCurrentClaimonThisPolicy: crmResp?.Any_Claims_on_this_Policy ?? '',
      arePastClaimonThisPolicy: crmResp?.Any_Past_Claims_on_this_Policy ?? '',
      claimOutcome: crmResp?.Outcome ?? '',
  
    }
}
// *********SUB FORM DATA*************
async function beneficiaryData(crmResp) {
  const crmArray = Array.isArray(crmResp) ? crmResp : [crmResp];
  const transformedBeneficiaryArray = crmArray.flatMap(event => {
    return [
      {
        email: event.Beneficiary_1_Email || null,
        phone: event.Beneficiary_1_Phone || null,
        relationship: event.Beneficiary_1_Relationship_with_Insured || null,
        name: event.Beneficiary_1_Name || null,
        dob: event.Beneficiary_1_Date_of_Birth || null,
        lifeBeneficiaryName: event.Insured || null
      },
      {
        email: event.Beneficiary_2_Email || null,
        phone: event.Beneficiary_2_Phone || null,
        relationship: event.Beneficiary_2_Relationship_with_Insured || null,
        name: event.Beneficiary_2 || null,
        dob: event.Beneficiary_2_Date_of_Birth || null,
        lifeBeneficiaryName: event.Life_Beneficiary_1_Name || null


      },
      {
        email: event.Beneficiary_3_Email || null,
        phone: event.Beneficiary_3_Phone || null,
        relationship: event.Beneficiary_3_Relationship_with_Insured || null,
        name: event.Beneficiary_3 || null,
        dob: event.Beneficiary_3_Date_of_Birth || null,
        lifeBeneficiaryName: event.Beneficiary_2_Relationship_with_Insured || null

      },
      {
        email: event.Beneficiary_4_Email || null,
        phone: event.Beneficiary_4_Phone || null,
        relationship: event.Beneficiary_4_Relationship_with_Insured || null,
        name: event.Beneficiary_4 || null,
        dob: event.Beneficiary_4_Date_of_Birth || null,
        lifeBeneficiaryName: event.Beneficiary_3_Relationship_with_Insured || null

      },
      {
        email: event.Beneficiary_5_Email || null,
        phone: event.Beneficiary_5_Phone || null,
        relationship: event.Beneficiary_5_Relationship || null,
        name: event.Beneficiary_5_Name || null,
        dob: event.Beneficiary_5_Date_of_Birth || null,
        lifeBeneficiaryName: event.Beneficiary_4_Relationship_with_Insured || null

      },
      {
        email: event.Beneficiary_6_Email || null,
        phone: event.Beneficiary_6_Phone || null,
        relationship: event.Beneficiary_6_Relationship_with_Insured || null,
        name: event.Beneficiary_6_Name || null,
        dob: event.Beneficiary_6_Date_of_Birth || null,
        lifeBeneficiaryName: event.Beneficiary_5_Relationship || null

      }
    ].filter(beneficiary => 
      beneficiary.email || beneficiary.phone || beneficiary.relationship || beneficiary.name || beneficiary.dob||beneficiary.lifeBeneficiaryName
    );
  });

  return transformedBeneficiaryArray;
}
async function contingentBeneficiaryData(crmResp) {
  const crmArray = Array.isArray(crmResp) ? crmResp : [crmResp];
  const contingentBeneficiaryArr = crmArray.flatMap(contg => {
    return [
      {
        name: contg.	CB1_Name || null,
        phone: contg.CB1_Phone || null,
        relationship: contg.CB1_Relationship || null,
        email: contg.CB1_Email || null,
        dob: contg.CB1_Date_of_birth || null,
        beneficiaryPercent: contg.Cont_Beneficiary_Per_1 || null
      },
      {
        name: contg.CB2_Name || null,
        phone: contg.CB2_Phone || null,
        relationship: contg.CB2_Relationship || null,
        email: contg.CB2_Email || null,
        dob: contg.CB2_Date_of_birth || null,
        beneficiaryPercent: contg.Cont_Beneficiary_Per_2 || null
      },
      {
        name: contg.	CB3_Name || null,
        phone: contg.CB3_Phone || null,
        relationship: contg.CB3_Relationship || null,
        email: contg.CB3_Email || null,
        dob: contg.CB3_Date_of_birth || null,
        beneficiaryPercent: contg.Cont_Beneficiary_Per_3 || null
      },        
      
    ].filter(contingent => 
      contingent.name || contingent.phone || contingent.relationship || contingent.email || contingent.dob||contingent.beneficiaryPercent
    );
  });
  return contingentBeneficiaryArr;
}
async function policyOwnershipData(crmResp) {
  const crmArray = Array.isArray(crmResp) ? crmResp : [crmResp];
  const policyOwnershipArr = crmArray.flatMap(polic => {
    return [
      {
        name: polic?.Policy_Owned_By || null,
        dob: polic?.Date_of_Birth_of_Insured || null,
        email: polic?.Owner_1_Email || null,
        relationship: polic?.Relation_of_1_Insured_to_Client || null,
      },
      {
        name: polic?.Owner_2 || null,
        dob: polic?.Insured_2_Date_Of_Birth || null,
        email: polic?.Owner_2_Email || null,
        relationship: polic?.Relation_of_2_Insured_to_Client || null,
      },
      {
        name: polic?.Owner_3 || null,
        dob: polic?.Insured_3_Date_Of_Birth || null,
        email: polic?.Owner_3_Email || null,
        relationship: polic?.Relation_of_3_Insured_to_Client || null,
      },    
      {
        name: polic?.Insured_4_Name || null,
        dob: polic?.Insured_4_Date_of_Birth || null,
        email: polic?.Insured_4_Email || null,
        relationship: polic?.Relation_of_3_Insured_to_Client || null,
      },    
      {
        name: polic?.	Insured_5_Name || null,
        dob: polic?.Insured_5_Date_of_Birth || null,
        email: polic?.Insured_5_Email || null,
        relationship: polic?.Relation_of_3_Insured_to_Client || null,
      }    
      
    ].filter(policy => 
      policy.name || policy.phone || policy.relationship || policy.email || policy.dob||policy.beneficiaryPercent
    );
  });
  return policyOwnershipArr;
}
async function claimData(crmResp) {
  const crmArray = Array.isArray(crmResp) ? crmResp : [crmResp];
  const claimsArr = crmArray.flatMap(clame => {
    return [
      {
        dateOfClaim: clame?.Date_of_Claim || null,
        reasonforClaim: clame?.Reason_of_Claim || null,
        amountofClaim: clame?.Claim_Amount || null,
        claimClosedOn: clame?.Claim_Closed_On || null     
      }
    ].filter(claim => 
      claim.dateOfClaim || claim.reasonforClaim || claim.amountofClaim || claim.claimClosedOn
    );
  });
  return claimsArr;
}
async function commissionData(crmResp) {
  const crmArray = Array.isArray(crmResp) ? crmResp : [crmResp];
  const commisArr = crmArray.flatMap(comm => {
    return [
      {
        monthPremium: comm?.Month ?? "",
        gcComm: parseFloat(comm?.Gross_Corporate_Commission) ?? null,
        naCoom: parseFloat(comm?.Net_Advisor_Commission) ?? null,
        ncComm: parseFloat(comm?.Net_Corporate_Commission) ?? null,
        nlComm: parseFloat(comm?.Net_Location_Commission) ?? null,
        glComm: parseFloat(comm?.Gross_Location_Commission) ?? null,
      }
    ].filter(commission => 
      commission.monthPremium || commission.gcComm || commission.naCoom || commission.ncComm ||commission.nlComm || commission.glComm
    );
  });
  return commisArr;
}

// function parsePolicyTrustee(crmResp) {
//   if (crmResp.Are_there_Trustees_for_this_Policy === "Yes") {
//     return [{
//       date: crmResp.Trust_Dissolution_Date ?? "",
//       document: crmResp.Trust_Documents_Received_and_Uploaded ?? "",
//       Number_of_Trustees: crmResp.Number_of_Trustees ?? "",
//       Application_Initiated_On: crmResp.Application_Initiated_On ?? ""
//     }];
//   }
//   return [];
// }


