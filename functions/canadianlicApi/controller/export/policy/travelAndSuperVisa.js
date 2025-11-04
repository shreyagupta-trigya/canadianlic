//New Policy
module.exports = [
    {
        id: "layout",
        title: "Layout"
    },
    {
        id: "policyOwner",
        title: "Policy Owner"
    },
    {
        id: "client",
        title: "Client"
    },
    {
        id: "policyName",
        title: "Policy Name"
    },
    {
        id: "premiumFrequency",//not in db 
        title: "Premium Frequency"
    },
    {
        id: "policyNumber",
        title: "Policy Number"
    },

    {
        id: "issuedBy",
        title: "Issued By"
    },
    {
        id: "clientCampaignSource",
        title: "Client Campaign Source"
    },
    {
        id: "offeringName",
        title: "Offering Name"
    },

    {
        id: "coverageAmount",
        title: "Coverage Amount"
    },
    {
        id: "email",
        title: "email"
    },
    {
        id: "policyPremiumI",
        title: "Policy Premium (Read i)"
    },
    {
        id: "clientMobile",
        title: "Client Mobile"
    },
    {
        id: "clientAddress",
        title: "Client Address"
    },
    {
        id: "location",
        title: "Location"
    },
    {
        id: "policyAdvisor",
        title: "Policy Advisor"
    },
    {
        id: "policyStatus",
        title: "Policy Status"
    },
    {
        id: "productFycPercent",
        title: "Product FYC %"
    },
    {
        id: "advisorCommisionRecieved",//not in db 
        title: "Advisor Commision Recieved"
    },
    {
        id: "insuranceCompanyAccount",
        title: "Insurance Company Account"
    },
    {
        id: "policyType",
        title: "Policy Type"
    },
    {
        id: "corporateBonusPercent",
        title: "Corporate Bonus %"
    },
    {
        id: "offeringId",
        title: "Offering Id"
    },
    {
        id: "advisorProbhitedBehaviourCompliance",
        title: "Advisor Prohibited Behaviour Compliance"
    },
    {
        id: "clientFirstPolicy",//not in db 
        title: "Client's First Policy ?"
    },
    {
        id: "advisorBonusOfFyc",
        title: "Advisor Bonus % of FYC"
    },
   
    {
        id: "advisorCodeOfConductComplaince",
        title: "Advisor Code of Conduct Compliance"
    },
    {
        id: "whatsapp",
        title: "Whatsapp"
    },
    {
        id: "locationDiscountFactor",
        title: "Location Discount Factor"
    },
    {
        id: "exchangeRate",
        title: "Exchange Rate"
    },
    {
        id: "Currency",
        title: "Currency"
    },
    {
        id: "commentsOnRating",
        title: "Comments on Rating"
    },
    {
        id: "sendToBotResult",
        title: "Send To Bot Result"
    },
    {
        id: "sendToPolicyStartDateEmailTrack",
        title: "Send To Policy Start Date Email Track"
    },
    
    {
        id: "updateOfferingId",
        title: "Update Offering id"
    },
    {
        id: "updatePolicyStatus",
        title: "Update Policy Status"
    },
    {
        id: "triggerSupervisa",
        title: "Trigger Supervisa Full Refund Calculation"
    }

]


//Services---------------------------
module.exports=[
    {
        id: "isClientTheInsured",
        title: "Is Client the Insured?"
    },
    {
        id: "areThereMultipleInsured",
        title: "Are there multiple Insured for this Policy?"
    },
    {
        id: "numberOfInsured",
        title: "Number of Insured"
    },

    {
        id: "areThereMultipleBeneficiary",
        title: "Are there Multiple Beneficiaries excl. Client ?"
    },
    {
        id: "isClientABeneficiary",
        title: "Is Client A Beneficiary"

    },
    //subform of Are there Multiple Beneficiaries excl. Client ?
    {
        id: "areThereMultipleBeneficiary",
        title: "Are there Multiple Beneficiaries excl. Client ?"        //Name,	Life Beneficiary Name,	Date Of Birth,	Email,	Phone,	Realtionship

    },
    //end subform
    {
        id: "numberofBeneficiaries",
        title: "Number of Beneficiaries"
    },
    

    //subform of Contingent Beneficiary
    {
        id: "contingentBeneficiary",
        title: "Contingent Beneficiary"    //Name,	Date Of Birth,	Email,	Phone,	Cont-Beneficiary %,	Realtionship
    },
    {
        id: "areThereTrusteeForThisPolicy",
        title: "Are there Trustees for this Policy?"
    },
    {
        id: "applicationOn",
        title: "Application On"
    },
    {
        id: "trustDissolutionDate",
        title: "Trust Dissolution Date"
    },
    {
        id: "trustDocumentRecievedAndUploaded",
        title: "Trust Documents Received and Uploaded ?"
    },
    {
        id: "numberOfTrustee",
        title: "Number Of Trustee"
    }
]




//Policy Tracking - Application-----------------------
module.exports = [
    {
        id: "applicationSubmittedOn",
        title: "Application Submitted On"
    },
    {
        id: "nextFollowUpDate",
        title: "Next Follow Up Date"
    },
    {
        id: "newPolicyStartDate",
        title: "New Policy Start Date"
    },
    {
        id: "ApplicationInitiatedOn",
        title: "Application Initiated On"
    },
    {
        id: "policyApprovedDate",
        title: "Policy Approved Date"
    },
    {
        id: "cancellation",
        title: "Cancellation / Amendment Requested for?"
    },
    {
        id: "policyAttachmentLink",
        title: "Policy Attachment Link"
    },
    {
        id: "renwalExpired",
        title: "Confirmation Poilcy Renewal/Expired"
    },
    {
        id: "nameOfConfirmationRenewal",
        title: "Name of Confirmation Renewal"
    },
    {
        id: "policyStartDate",
        title: "Policy Start Date"
    },
    {
        id: "policyIssuedDate",
        title: "Policy Issued Date"
    },
    {
        id: "policyExpiresOn",
        title: "Policy Expired On"
    },
    {
        id: "nameOfConfirmation",
        title: "Name of Confirmation"
    },
    {
        id: "policyPickedUpOn",
        title: "Policy Picked Up On"
    },
    {
        id: "premiumPaidDuringPickUpPeriod",
        title: "Premiums Paid during Pick Up Period?"
    },
    {
        id: "applicationPostponedTo",
        title: "Application Postponed To"
    },
    {
        id: "policyDeclineDate",
        title: "Policy Declined Date"
    },
    {
        id: "applicationMedicalRequirement",
        title: "Application Medical requirement?"
    },
    {
        id: "earlyReturnAmendmentRequested",
        title: "Early Return/ Amendment Requested Date"
    },
    {
        id: "earlyReturnAmendmentCompletedDate",
        title: "Early Return/Amendment Completed Date"
    },
    {
        id: "ConfirmationPolicyStart",
        title: "Confirmation Policy Start?"
    },
    {
        id: "reasonForPolicyBeingDeclined",
        title: "Reasons for Policy being Declined"
    },
    {
        id: "earlyReturnApplicationCancelled",
        title: "Early Return/ Application Cancelled"
    },
    {
        id: "earlyReturnAmendmentRequestedFor",
        title: "Early Retrun/ Amendment Requested for?"
    },
    {
        id: "policyRenewalDate",
        title: "Policy Renewal Date"
    },
    {
        id: "policyReviewComments",
        title: "Policy Review Comments"
    },
    {
        id: "policyReviewCommentUpdatedOn",
        title: "Policy Review Comments updated on"
    },
    {
        id: "renewalMedicalRequirement",
        title: "Renewal Medical Requirement?"
    },
    {
        id: "policyRenewalCompleted",
        title: "Policy Renewal Completed?"
    },
    {
        id: "policyRenewalDate",
        title: "Reviewed Date & Time"
    },
    {
        id: "renewalMedicalConformationNumber",
        title: "Renewal Medical Confirmation Number"
    },
    {
        id: "renewalMedicalApplicationDateAndTime",
        title: "Renewal Medical Application Date"
    }
]


//Claims ------------------------------------
module.exports = [
    {
        id: "areCurrentClaimonThisPolicy",
        title: "Any Current Claims on this Policy?"
    },
    {
        id: "arePastClaimonThisPolicy",
        title: "Any Past Claims on this Policy?"
    },
    {
        id: "claimOutcome",
        title: "Claim Outcome"
    },
    {
        id: "claim",
        title: "Claim"         //Date of claim,	Reason for claim,	Amount of Claim (CA$),	Claim Closed On	Claim Amount Settled (CA$),	Claim Amount Rejected (CA$),	Settlement Observations if any

    },
    {
        id: "totalAmountClaimed",
        title: "Total Amount Claimed"
    },
    {
        id: "totalAmountSettled",
        title: "Total Amount Settled"
    },
    {
        id: "totalAmountRejected",
        title: "Total Amount Rejected"
    },
    {
        id: "ringcentralSmsResponse",
        title: "Ringcentral sms response"
    }
   

]


//Comission--------------------
module.exports = [
    {
        id: "dayWiseCorporateCommision",
        title: "Day wise Corporate Commission"
    },
    {
        id: "dayWiseLocationCommision",
        title: "Day wise Location Commission"
    },
    {
        id: "dayWiseAdvisorCommision",
        title: "Day wise Advisor Commission"
    },
    {
        id: "policyMonth",
        title: "Policy Month"
    },
    {
        id: "updateCommission",
        title: "Update Commissions"
    },

    //subform of  Policy Commission Info
    {
        id: "policyCommissionInfo",
        title: "Policy Commission Info"   //Month/Premium,	Gross Corporate Commission,	Gross Location Commission	Net Advisor Commission	Net Corporate Commission	Net Location Commission
        		
        
    },
    {
        id: "totalGrossLocationCommision",
        title: "Total Gross Location Commision"
    },
    {
        id: "totalNetLocationCommission",
        title: "Total Net Location Commission"
    },
    {
        id: "corporateCommission",
        title: "Corporate Commission %"
    },
    {
        id: "corporateCommissionAmount",
        title: "Corporate Commission Amount"
    },
    {
        id: "locationCommission",
        title: "Location Commission %"
    },
    {
        id: "totalGrossCorpoarateCom",
        title: "Total Gross Corpoarate Com. (CA$)"
    },
    {
        id: "totalGrossAdvisorCommission",
        title: "Total Net Advisor Commission"
    },
    {
        id: "totalNetCorporateCommision",
        title: "Total Net Corporate Commission"
    },
    {
        id: "advisorCommission",
        title: "Advisor Commission %"
    },
    {
        id: "updateCommission",
        title: "Update Commissions"
    },
    {
        id: "totalNetAdvisorCommission",
        title: "Total Net Advisor Commission (CA$)"
    },
    {
        id: "totalNetCorporateCom",
        title: "Total Net Corporate Com. (CA$)"
    },
    {
        id: "totalGrossLocationCom",
        title: "Total Gross Location Com. (CA$)"
    }
]

//History ---------------------------
module.exports = [
    {
        id: "totalRenewalCommissions",//not in db 
        title: "Total Renewal Commissions (CA$"

    },
    {
        id: "renewalHistory",
        title: "Renewal History"        //Premium Frequency,	Premium Amount (CA$),	Policy Amount (CA$)	Policy Issued Date,	Policy Renewed Date	Was Medical Required?,	Renewal Commission (CA$),	Policy Advisor
    }

]