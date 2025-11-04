//lead Info 
module.exports=[{
    id:"insuranceLeadOwner",
    title:"Insurance Lead Owner"

},
{
    id:"insuranceLeadSource",
    title:"Insurance Lead Source"

},
{
    id:"firstName",
    title:"First Name"

},
{
    id:"lastName",
    title:"Last Name "

},
{
    id:"mobile",
    title:"Mobile "

},
{
    id:"areYouLLQPLicensed",
    title:"Are You LLQP Licensed"

},
{
    id:"email",
    title:"Email "

},
{
    id:"leadStatusStage",
    title:"Lead Status Stage"

},
{
    id:"dateOfBirth",
    title:"Date of Birth "

},
{
    id:"assignedAdvisor",
    title:"Assigned Advisor "

},
{
    id:"gender",
    title:"Gender "

},
{
    id:"isThisaReassignment", //duplicate id  need to recheck ==>> checked and changed, matched
    title:"Is This a Reassignment"

},
{
    id:"locationName",
    title:"Location Name"

},
{
    id:"ifReferredByAdvisorOrExternalReferral", // not in db need to be created
    title:"If referred by Advisor or External Referral - Name"

},
{
    id:"netWorth",
    title:"Net Worth "

},
{
    id:"referredBy",
    title:"Referred by "

},
{
    id:"exchangeRate",
    title:"Exchange Rate"

},
{
    id:"preferredContactMethod",
    title:" Preferred Contact Method"

},
{
    id:"currency",
    title:" Currency"

},
{
    id:"preferredContactTime",
    title:"Preferred Contact Time "

},
{
    id:"socialMediaInformation",
    title:"Social Media Information? "

},
{
    id:"roundRobinAssignmentTime",
    title:"Round Robin Assignment Time"

},
{
    id:"citizenshipStatus",
    title:"Citizenship Status "

},
{
    id:"understandingOfInsurance",
    title:"Understanding of Insurance "

},
{
    id:"existingInsurancePolicy",
    title:"Existing Insurance Policy?"

},
{
    id:"oldDatabaseLead",
    title:"Old Database Lead? "

},
{
    id:"doYouOwnaHomeInCanada", // db name is doYouOwnaHomeInCanada need to change ==>> changed and matchedd
    title:"Do you own a home in Canada?"

},
{
    id:"genderPredictionScore",
    title:"Gender Prediction Score "

},
{
    id:"doYouhaveLifeInsurance",// db name is doYouhaveLifeInsurance ==>> changed and matched
    title:"Do you have life insurance?"

},
{
    id:"rcSmsOptOut",
    title:"RC SMS Opt Out "

},
{
    id:"coverageYouAreLookingFor",//not in DB ,,leads table ,,need to be created
    title:"Coverage you are Looking for? "

},
{
    id:"areYouReadyToPurchaseThisLifeInsurancePoli",
    title:"Are you ready to purchase this Life Insurance Poli "

},
{
    id:"nextFollowUpDateTime",
    title:" Next Follow Up Date & Time"

},
{
    id:"areYouReadyToPurchaseThisLifeInsurancePol",
    title:"Are you ready to purchase this Life Insurance Pol "

},
{
    id:"additionalContactInformation",
    title:"Additional Contact Information? "

},
{
    id:"submitPageURL",
    title:"Submit Page URL "

},
{
    id:"assignedCampaigns",
    title:"Assigned Campaigns"

},
{
    id:"genderPrediction",
    title:"Gender Prediction "

},{
    id:"inboxURL",
    title:"Inbox URL "

},
{
    id:"phoneNumber",
    title:"Phone "

},
{
    id:"secondaryEmail",//not in db ,leads table // need to be check at backend if it is created or not
    title:"Secondary Email"

},
{
    id:"fax",// field not at backend not in db but exist in frontend
    title:"Fax "

},
{
    id:"roundRobinProcessed",
    title:"Round Robin Processed "

},
{
    id:"emailRoundRobinOwner",
    title:"Email Round Robin Owner "

},
{
    id:"eligibleRoundRobinOwnerFound",
    title:"Eligible Round Robin Owner Found "

},
{
    id:"reRunRoundRobin",
    title:"Re-Run Round Robin "

},
{
    id:"readyForPurchase",//not in db not at backend
    title:"Ready to purchase this life insurance policy? "

},
{
    id:"description",//not in db not at backend
    title:"Description "

},
//Family Tree --->subforms 
//module.exports=[
{ id:"relationShipStatus",
  title:"Relationship Status"

},
{ id:"dependentParents",
    title:"Dependent Parents ?"
  
  },
  { id:"dependentChildren",
    title:"Dependent Children ?"
  
  },
  { id:"siblings",
    title:"Siblings ?"
  
  },
  //];

  // family tree subforms 
  { id:"relationShipStatus",//Name of Spouse,Anniversary Date,Spouse's Date of Birth,Phone of Spouse,Email of Spouse
    title:"Relationship Status"
  
  },
  { id:"dependentParents",//Number of Dependent Parents,Relationship Parent,Name Parent,Date of Birth,Email,Phone
      title:"Dependent Parents ?"
    
    },
    { id:"dependentChildren",//Number of Dependent Children,Relationship child,Name child,Date of Birth,Email,Phone
      title:"Dependent Children ?"
    
    },
    { id:"siblings",//Number of Siblings,Relationship Sibling,Name Sibling,Date of Birth,Email,Phone
      title:"Siblings ?"
    
    },//];
    //Emergency Contact ---------[]
    //module.exports=[
      { id:"emergencyContact",//Emergency Contact Name,Emergency Contact Phone,Emergency Contact Relationship,Emergency Contact Email
    title:"Emergency Contact"
  
  },//,]
 

//address --------->checked
//module.exports=[
{
    id:" street",
    title:"Street"

},
{
    id:"state",
    title:"State"

},
{
    id:"country",
    title:"Country"

},
{
    id:"city",
    title:"City "

},
{
    id:"zipCode",
    title:"Zip "

},//]

//Refferal Info // no table found and no field at backend
//module.exports=[
{
    id:"year",
    title:" Year"

},
{
    id:"referralClient",
    title:"Referral Client"

},
{
    id:"referralSource",
    title:"Referral Source"

},
{
    id:"referralOtherThanClient",
    title:"Referral Other than Client"

},
{
    id:"productCategoryReferred",
    title:"Product Category Referred"

},
{
    id:"dependentChildren",
    title:"Dependent Children?"

},
{
    id:"siblings",
    title:"Siblings"

},
{
    id:"dependentParents",
    title:"Dependent Parents "

} ]
//Facebook 
module.exports=[
{
    id:"adAccount",
    title:"Ad Account "

},
{
    id:"adSet",
    title:"Ad Set"

},
{
    id:"adAccountId", //changed at frontend adAccount==>>adAccountId
    title:"Ad Account ID"

},
{
    id:"adSetId",//changed at frontend adSet==>>adSetId
    title:"Ad Set ID "

},
{
    id:"adCampaign",
    title:"Ad Campaign"

},
{
    id:"facebookAd",
    title:"Facebook Ad"

},
{
    id:"adCampaignId", // changed at frontend from adCampaign ==>>adCampaignId
    title:"Ad Campaign ID "

},
{
    id:"adId",
    title:"Ad ID "

},
{
    id:"facebookPage",
    title:"Facebook Page "

},
{
    id:"leadForm",
    title:"Lead Form "

},
{
    id:"facebookPageId",
    title:"Facebook Page ID"

},
{
    id:"leadFormId",
    title:"Lead Form ID "

},
{
    id:"costPerLead",
    title:" Cost Per Lead (CPL"

},
{
    id:"facebookAdInformation",
    title:"Facebook Ad Information ?"

},
{
    id:"twitter1",
    title:" Twitter"

},
{
    id:"linkedIn1",
    title:"LinkedIn ID "

},
{
    id:"skypeId",
    title:"Skype ID "

},
{
    id:"faceBook",//in db as facebook1
    title:"FaceBook"

},
{
    id:"instagramId",
    title:"Instagram ID "

},//];

//Festival
//module.exports=
{ id:"religion",
    title:"Religion"
  
  },
  { id:"celebratedFestivals",
    title:"Celebrated Festivals"
  
  }
  //]
  ,
  // subform festival
  { id:"importantFestivalsDates",//Festival Name,Date On Celebrated
    title:"Important Festivals Dates"
  
  },//]
 
 //Lead Management History 
 // This is not a field but a section name and this section contains a subform
 //module.exports=
 {
    id:"leadManagementHistory",//Interaction Type,Date/Time Of Interaction	,Contact Attempt,Time Spent (Mins)	,Comments	,Interaction Outcome	,Probability Of Closure

    title:"Lead Management History"

 },


// services
//module.exports=[
{
    id:"potentialBusiness", //
    title:"Potential Business (Policy Values) "

},
{
    id:"loanProtection",
    title:"Loan Protection "

},
{
    id:"servicesRequested", // changed at frontend from  loanProtection==>>servicesRequested 
    title:"Services Requested"

},
{
    id:"investments",
    title:"Investments "

},
{
    id:"lifeInsurance",
    title:"Life Insurance"

},
{
    id:"groupInsurance",
    title:"Group Insurance "

},
{
    id:"livingBenefits",
    title:"Living Benefits "

},
{
    id:"travelInsurance",
    title:"Travel Insurance "

},
{
    id:"combinationOrHybridInsurance",
    title:"Combination or Hybrid Insurance "

},
{
    id:"healthAndDentalInsurance",// in db as healthAndDentalInsurance need to be changed at frontend==> changed at frontend
    title:"Health & Dental Insurance "
    

},
]