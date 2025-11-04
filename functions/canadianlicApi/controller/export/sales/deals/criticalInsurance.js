//Deal info ---> in deals table checked

module.exports = [
  {
    id: "dealName",
    title: "Deal Name",
  },
  {
    id: "dealOwner",
    title: "Deal Owner",
  },
  {
    id: "insuranceLeadSource",
    title: "Insurance Lead Source",
  },
  {
    id: "currency",
    title: "Currency",
  },
  {
    id: "insuranceLeadLookup",
    title: "Insurance Lead Lookup",
  },
  {
    id: "nextFollowUpDate",
    title: "Next Follow Up Date",
  },
  {
    id: "stage",
    title: "Stage",
  },
  {
    id: "contactName",
    title: "Contact Name",
  },
  {
    id: "forecastCategory",
    title: "Forecast Category",
  },
  {
    id: "locationName",
    title: "Location Name",
  },
  {
    id: "insuranceLead",
    title: "Insurance Lead",
  },
  {
    id: "exchangeRate",
    title: "Exchange Rate",
  },
  {
    id: "phoneBurnerFollowUpDate",
    title: "Next Follow Up Date & Time",
  },
  {
    id: "roundRobinAssignmentTime",
    title: "Round Robin Assignment Time",
  },
  {
    id: "understandingOfInsurance",
    title: "Understanding of insurance",
  },
  {
    id: "leadStatusStage",
    title: "Lead Status Stage",
  },
  {
    id: "type",
    title: "Type",
  },
  {
    id: "coverage",
    title: "Coverage you are looking for?",
  },
  {
    id: "existingInsurancePolicy",
    title: "Existing Insurance Policy",
  },
  {
    id: "genderPrediction",
    title: "Gender Prediction",
  },
  {
    id: "lifeInsurance", //not at backend-->created
    title: "Do you have life insurance?",
  },
  {
    id: "referred", //in dealinformation table as referredBy
    title: "Referred by",
  },
  {
    id: "house", //in db as doYouOwnAHouseinCanada
    title: "Do you own a house in Canada?",
  },
  {
    id: "additionalContactInfo",
    title: "Additional Contact Information?",
  },
  {
    id: "citizenStatus",
    title: "Citizenship Status",
  },
  {
    id: "dob",
    title: "Date of birth",
  },
  {
    id: "bestTimeToCall",
    title: "Best Time To Call",
  },
  {
    id: "socialMediaInfo",
    title: "Social Media Information",
  },
  {
    id: "preferredContactMethod",
    title: "Preferred Contact Method",
  },
  {
    id: "genderPredictionScore",
    title: "Gender Prediction Score",
  },
  {
    id: "oldDatabaseLead",
    title: "Old Database Lead?",
  },
  {
    id: "emailIsValid",
    title: "Email is Valid",
  },
  {
    id: "reassignment",
    title: "Is This a Reassignment",
  },
  {
    id: "ref", //not in db
    title: "If referred by Adivsor or External referral",
  },
  {
    id: "assignedAdvisor",
    title: "Assigned Advisor",
  },
  {
    id: "leadCreatedOn",
    title: "Lead Created On",
  },
  {
    id: "insuranceLeadStatus",
    title: "Insurance Lead Status",
  },
  {
    id: "netWorth",
    title: "Net Worth",
  },
  {
    id: "submitPageURL",
    title: "Submit Page URL",
  },
  {
    id: "assignedCampaigns",
    title: "Assigned Campaigns",
  },
  {
    id: "email",
    title: "Email",
  },
  {
    id: "gender",
    title: "Gender",
  },
  {
    id: "existingPolicyRenewalDueBy",
    title: "Existing Policy Renewal Due By",
  },
  {
    id: "preferredContactTime",
    title: "Preferred Contact Time",
  },
  {
    id: "reRunRoundRobin",
    title: "Re-run round robin",
  },
  {
    id: "emailRoundRobinOwner",
    title: "Email Round Robin Owner",
  },
  {
    id: "roundRobinProcessed",
    title: "Round Robin Processed",
  },
  {
    id: "eligibleOwner", //not in db
    title: "Eligible Round Robin Owner Found",
  },
  {
    id: "campaignRemove",
    title: "Remove from Campaign 1",
  },
  {
    id: "rcSmsOptOut",
    title: "RC SMS Opt Out",
  },
  {
    id: "emailOutput",
    title: "EmailOutput",
  },
  {
    id: "clientInsured",
    title: "Is Client the Insured?",
  },
  {
    id: "multipleInsured",
    title: "Are there multiple Insured for this Policy?",
  },
  {
    id: "number", //not matched with fromtend-->as numberOfInsured in  table dealOwnership
    title: "Number of insured",
  },
  //start subfrom of dealOwner
  {
    id: "dealOwner", //Insured Name,Insured Phone,Insured Email
    title: "Deal Owner",
  },
  //end subform dealOwner
  //start deal beneficiary
  {
    id: "isClientaBeneficiary", //exist in deals table
    title: "Is Client a Beneficiary?",
  },
  {
    id: "arethereMultipleBeneficiariesexclClient", //exist in deals table
    title: "Are there Multiple Beneficiaries excl. Client ?",
  },
  {
    id: "numberofBeneficiariesupto4", //need to be changed at frontend ---> in db as numberofBeneficiariesupto4
    title: "Number of Beneficiaries",
  },
  //start subform of beneficiariData
  {
    id: "dealBeneficiaries", //Beneficiary Name,Beneficiary Relationship with Insured,Beneficiary Phone,Beneficiary Email
    title: "Deal Beneficiaries",
  },
  //end subform of benificiaryData

  {
    id: "areThereTrusteesforThisPolicy",
    title: "Are there Trustees for this Policy?",
  },
  {
    id: "trustDocumentsReceivedAndUploaded",
    title: "Trust Documents Received and Uploaded ",
  },
  {
    id: "trustDissolutionDate",
    title: "Trust Dissolution Date",
  },
  {
    id: "applicationOn",
    title: "Application Initiated On",
  },
  {
    id: "numberOfTrustees",
    title: "Number of trustees",
  },
  //start subform of trusteeData
  {
    id: "dealTrustee", //Name of Trustee,   Name of Beneficiary for Trustee,Relationship with Beneficiary for Trustee,Trustee Phone,Trustee Email
    title: "Deal Trustee",
  },
  {
    id: "applicationInitiatedOn",
    title: "Application Initiated On",
  },
  {
    id: "nextFollowUpDate",
    title: "Next Follow Up Date",
  },
  {
    id: "amendmentRequestedDate",
    title: "Amendment Requested Date",
  },
  {
    id: "amendmentRequestedFor",
    title: "Amendment Requested for?",
  },
  {
    id: "applicationMedicalRequirement",
    title: "Application Medical requirement?",
  },
  {
    id: "applicationConfirmationNumber",
    title: "Application Medical Confirmation Number",
  },
  {
    id: "amendmentCompletedDate",
    title: "Amendment Completed Date",
  },
  {
    id: "applicationMedicalAppointment",
    title: "Application Medical Appointment Date & Time",
  },
  {
    id: "applicationCancelled",
    title: "Application Cancelled",
  },
  {
    id: "applicationPostponed",
    title: "Application Postponed",
  },
  {
    id: "policyDeclinedDate",
    title: "Policy Declined Date",
  },
  {
    id: "policyApprovedDate",
    title: "Policy Approved Date",
  },
  {
    id: "policyDeclinedReason",
    title: "Reasons for Policy being Declined",
  },
  {
    id: "approvalRating",
    title: "Approval Rating",
  },
  {
    id: "pickupPeriod",
    title: "Premiums Paid during Pick Up Period",
  },
  {
    id: "startDate",
    title: "Policy Start Date",
  },
  {
    id: "policyPickedUpOn", //not in db
    title: "Policy Picked Up On",
  },
  {
    id: "policyIssuedDate",
    title: "Policy Issued Date",
  },
  {
    id: "renewalMedicalRequirement", //not in db
    title: "Renewal Medical Requirement?",
  },
  {
    id: "policyReviewComments", // not in db
    title: "Policy Review Comments",
  },
  {
    id: "policyReviewCommentsUpdatedOn", //not in db
    title: "Policy Review Comments Updated On",
  },
  {
    id: "policyRenewalDate", //in deal policy tracking
    title: "Policy Renewal Date",
  },
  {
    id: "renewalMedicalConfirmationNumber", //not in db
    title: "Renewal Medical Confirmation Number",
  },
  {
    id: "renewalMedicalApplicationDateTime", //not in db
    title: "Renewal Medical Application Date & Time",
  },
  {
    id: "reviewdDateandTime", //not in db
    title: "Reviewd Date and Time",
  },
  {
    id: "policyRenewalCompleted", //exist in deals
    title: "Policy Renewal Completed",
  },
  {
    id: "anyCurrentClaimsOnThisPolicy", //not in db
    title: "Any Current Claims on this Policy?",
  },
  {
    id: "anyPastClaimsOnThisPolicy", //not in db
    title: "Any Past Claims on this Policy?",
  },
  {
    id: "reasonOfClaim", //exist in deals
    title: "Reason of Claim",
  },
  {
    id: "claimOutcome",
    title: "Claim Outcome",
  },
  {
    id: "claimSubmitted",
    title: "Claim Submitted?",
  },
  {
    id: "claimAmount",
    title: "Claim Amount",
  },
  {
    id: "dateOfClaim",
    title: "Date of Claim",
  },
  {
    id: "claimClosedOn",
    title: "Claim Closed On-",
  },
  {
    id: "amountSettled", //in policy tracking table
    title: "Amount Settled",
  },
  {
    id: "rejectionObservation", //as settlementOrRejectionObservations in table deals
    title: "Settlement or Rejection Observations",
  },
  {
    id: "street",
    title: "Street",
  },
  {
    id: "state",
    title: "State",
  },
  {
    id: "country",
    title: "Country",
  },
  {
    id: "city",
    title: "City",
  },
  {
    id: "zip",
    title: "Zip",
  },
  {
    id: "adAccount",
    title: "Ad Account",
  },
  {
    id: "adAccountId",
    title: "Ad Account ID",
  },
  {
    id: "adCampaign",
    title: "Ad Campaign",
  },
  {
    id: "adCampaignId",
    title: "Ad Campaign ID",
  },
  {
    id: "faceBookPage",
    title: "Facebook Page",
  },
  {
    id: "faceBookPageId",
    title: "Facebook Page ID",
  },
  {
    id: "costPerLead",
    title: "Cost Per Lead (CPL)",
  },
  {
    id: "adSet",
    title: "Ad Set",
  },
  {
    id: "adSetId",
    title: "Ad Set ID",
  },
  {
    id: "facebookAd",
    title: "Facebook Ad",
  },
  {
    id: "adId",
    title: "Ad ID",
  },
  {
    id: "leadForm",
    title: "Lead Form",
  },
  {
    id: "leadFormId",
    title: "Lead Form ID",
  },
  {
    id: "skypeID",
    title: "Skype ID",
  },
  {
    id: "instagramID",
    title: "Instagram ID",
  },
  {
    id: "linkedinID",
    title: "LinkedIn ID",
  },
  {
    id: "twitterID",
    title: "Twitter ID",
  },
  {
    id: "phoneA",
    title: "phoneA",
  },
  {
    id: "Year",
    title: "Year",
  },
  {
    id: "referralNameOthers",
    title: "Referral Name - Others",
  },
  {
    id: "firstVisit",
    title: "First/Visit",
  },
  {
    id: "referralNameClient",
    title: "Referral Name - Client",
  },
  {
    id: "visitorScore",
    title: "Visitor Score",
  },
  {
    id: "mostRecentVisit",
    title: "Most Recent Visit",
  },
  {
    id: "firstPageVisited",
    title: "First Page Visited",
  },
  {
    id: "servicesRequested",
    title: "Services Requested",
  },
  {
    id: "livingBenefits",
    title: "Living Benefits",
  },
  {
    id: "loanProtection",
    title: "Loan Protection",
  },
  {
    id: "groupInsurance",
    title: "Group Insurance",
  },
  {
    id: "insuranceLeadScoringPositiveScore",
    title: "Insurance Lead Scoring Positive Score",
  },
  {
    id: "insuranceLeadScoringTouchPointScore",
    title: "Insurance Lead Scoring Touch Point Score",
  },
  {
    id: "insuranceLeadScoringNegativeTouchPointScore",
    title: "Insurance Lead Scoring Negative Touch Point Score",
  },
  {
    id: "insuranceLeadScoringNegativeScore",
    title: "Insurance Lead Scoring Negative Score",
  },
  {
    id: "insuranceLeadScoringPositiveTouchPointScore",
    title: "Insurance Lead Scoring Positive Touch Point Score",
  },
  {
    id: "potentialBusinessPolicyValues", //not in table
    title: "Potential Business (Policy Values)",
  },
  {
    id: "insuranceLeadScoringScore",
    title: "Insurance Lead Scoring Score",
  },
  {
    id: "investments",
    title: "Investments",
  },
  {
    id: "travelInsurance",
    title: "Travel Insurance",
  },
  {
    id: "lifeInsurance",
    title: "Life Insurance",
  },
  {
    id: "daysVisited",
    title: "Days Visited",
  },
  {
    id: "numberOfCharts",
    title: "Number Of Charts",
  },
  {
    id: "averageTimeSpent",
    title: "Average Time Spent (Minutes)",
  },
  {
    id: "productCategoryReferred",
    title: "Product Category Referred",
  },
  {
    id: "referrer",
    title: "Referrer",
  },
  {
    id: "referralSource",
    title: "Referral Source",
  },
  {
    id: "secondaryEmail",
    title: "Secondary Email",
  },
  {
    id: "fax",
    title: "Fax",
  },
  {
    id: "combinationHybridInsurance",
    title: "Combination or Hybrid Insurance",
  },
  {
    id: "healthDentalInsurance",
    title: "Health & Dental Insurance",
  },
  {
    id: "relationShipStatus", // in family tree table
    title: "Relationship Status",
  },
  {
    id: "nameOfSpouse",
    title: "Name of Spouse",
  },
  {
    id: "anniversaryDate",
    title: "Anniversary Date",
  },
  {
    id: "spouseDateOfBirth",
    title: "Spouse's Date of Birth",
  },
  {
    id: "phoneOfSpouse",
    title: "Phone of Spouse",
  },
  {
    id: "emailOfSpouse",
    title: "Email of Spouse",
  },
  {
    id: "nameOfCommonLawPartner",
    title: "Name of Common Law Partner",
  },
  {
    id: "commonLawDateOfBirth",
    title: "Common Law Partner's Date of Birth",
  },
  {
    id: "dependentParents",
    title: "Dependent Parents ?",
  },
  {
    id: "dependentParents", // not matched with frontend ...duplicate id ...in table as numberOfDependentParents--> need to be changed at frontend
    title: "Number of Dependent Parents",
  },
  //starts subparts of dependentParentData
  {
    id: "dependentParents", //Relationship Parent,Parent Name,Date of Birth,Parent Email,Parent Phone
    title: "Dependent Parents ?",
  },
  //end subparts of dependentParentData

  {
    id: "dependentChildren",
    title: "Dependent Children ?",
  },
  {
    id: "numberOfDependentChildren",
    title: "Number of Dependent Children",
  },
  //start subparts (dependent children)
  {
    id: "dependentChildren", //Relationship child,Child Name,Date of Birth,Child Email,Child Phone
    title: "Dependent Children ?",
  },
  //end subparts of dependentChildrenData

  {
    id: "siblings",
    title: "Siblings ?",
  },
  {
    id: "numberOfSiblings",
    title: "Number of Siblings",
  },
  // start subparts sibling

  {
    id: "siblings", //Sibling Relationship,Sibling Name,Date of Birth,Sibling Email,Sibling Phone
    title: "Siblings ?",
  },
  {
    id: "religion", //not in table
    title: "Religion",
  },
  {
    id: "celebratedFestivals", //not in table
    title: "Celebrated Festivals",
  },
  //start subform of Important fetsivals Dates
  {
    id: "importantFestivalsDates", //Festival Name,Date On Celebrated
    title: "Important Festivals Dates",
  },
  {
    id: "howManyMonthsLeft",
    title: "How many months left?",
  },
  {
    id: "policyCommision",
    title: "Total Policy Commision",
  },
  {
    id: "totalAdvisorCommision", //not matched with frontend ---> in db as advisorCommision
    title: "Total Advisor Commision",
  },
  {
    id: "netCorporateCommision",
    title: "Net Corporate Commision",
  },
  {
    id: "actualPolicyCommisionAfterDeductibles", //not matched with frontend ==> in db as actualPolicyCommision
    title: "Actual Policy Commision After Deductibles",
  },
  {
    id: "returnAmount", //in deals table
    title: "Return Amount",
  },
  {
    id: "netAdvisorCommisionAfterDeductibles", //not matched with frontend ==>in db as netAdvisorCommision
    title: "Net Advisor Commision After Deductibles",
  },
  {
    id: "netCorporateCommisionAfterDeductibles", //not in db
    title: "Net Corporate Commision After Deductibles",
  },
  {
    id: "description",
    title: "Description Information",
  },
  {
    id: "leadManagementHistory", //Interaction Type	,Date/Time Of Interaction	,Contact Attempt	,Time Spent (Mins),Comments	,Interaction Outcome,Probability of Closure
    title: "Lead Management History",
  },
  {
    id: "totalInteractionTime",
    title: "Total Interaction Time (mins)",
  },
  {
    id: "numberOfContactAttempts",
    title: "Number of Contact Attempts",
  }
];
