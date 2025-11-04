
const  catalyst =  require("zcatalyst-sdk-node");
const { decryptData } = require("../utils/utils");
const searchQueryBuilder = require("../utils/searchQueryBuilder");
const NodeCache = require( "node-cache" );
const { createObjectCsvStringifier } = require("csv-writer"); 
const Node = new NodeCache();
const {advisor, advisorSample} = require("../exports");
exports.testConnection = async(req, res) => {
res.status(200).json({success: true, message: "this is testing"});
}
exports.locations = async (req, res) => {
    try {
        const query = `SELECT * FROM locations`;
        const response = await catalyst.initialize(req, { scope: "admin" }).zcql().executeZCQLQuery(query);
        const locations = {};
        response.forEach(item => {
            const locationData = item.locations;
            locations[locationData.locationName] = locationData.ROWID;
        });
        return res.status(200).json(locations);
    } catch (error) {
        console.error("Error getting locations:", error);
        return res.status(500).json({ success: false, message: "Failed to get locations", error: error.message });
    }
};

// Route 3  get contact data for advisor form / assigned advisor dropdown

exports.allContacts = async (req, res)=>{

    try {

      const query =`SELECT * FROM contacts`;

      const response = await catalyst.initialize(req, {scope:'admin'}).zcql().executeZCQLQuery(query)
    
      let contactData = {}
      response.forEach(item =>{
              contactData[`${item.contacts.firstName} ${item.contacts.lastName}` ]  = item.contacts.ROWID
      })
      return res.status(200).json({success:true, message:"Contacts fetched ", contactData});
   
    } catch (error) {
       console.log(error)
    }

};

// //  Route 3 get all offerings
exports.offering= async (req, res) => {
    try {
        const query = `SELECT * FROM offering`;
        const response = await catalyst.initialize(req, { scope: "admin" }).zcql().executeZCQLQuery(query);
         console.log(response)
        
        const data =  response.map(item=>({
            
             offering:item.offering.offeringName,
             ROWID:item.offering.ROWID
         }))

         console.log(data)
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error getting locations:", error);
        return res.status(500).json({ success: false, message: "Failed to get locations", error: error.message });
    }
};

async function insertDataIntoTable(catalystApp, tableName, data) {
  try {
    const result = await catalystApp
      .datastore()
      .table(tableName)
      .insertRow(data);
    return result;
  } catch (error) {
    throw error;
  }
}
async function insertMultipleRowsIntoTable(table_name, row_data, req, advisorResult) {
  // Initialize Zoho Catalyst SDK
  const sdk = catalyst.initialize(req, { scope: "admin" });

  // Get datastore service
  const datastore_service = sdk.datastore();
  // Append contactId field to each row
  row_data.forEach(row => {
    row.advisorId = advisorResult.ROWID;
  });

  // Insert rows into the table
  const row_response = await datastore_service
    .table(table_name)
    .insertRows(row_data);

  return row_response;
}
// // Route 1 posting Advisor form data

exports.postadvisors = async (req, res) => {
        
  try {
    const user = req.body;
    const formData = user.formData
  //  console.log(formData)
    // Initialize Catalyst
    const catalystApp = catalyst.initialize(req, { scope: "admin" });
    //   const existingAdvisorQuery = `SELECT * FROM advisors WHERE email='${formData.email}'`
    //   const existingAdvisor = await catalyst.initialize(req,{scope:'admin'}).zcql().executeZCQLQuery(existingAdvisorQuery)
    //   if (existingAdvisor.length > 0){
    //   return res.status(200).json({success:false, message:"Advisor Already Exist"})      
    //   }
    // step 1 insert data into advisors table
    const advisorData = {
      advisorOwner: formData.advisorOwner ? formData.advisorOwner: null,
      firstName: formData.firstName ? formData.firstName: '',
      lastName:formData.lastName ? formData.lastName:'',
      mobile: formData.mobile ?formData.mobile: null,
      email: formData.email ?formData.email: '',
      landline: formData.landline ? formData.landline:'',
      dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : null,
      // location: parseFloat(formData.location) ? formData.location:null,
      // advisorMuduleName: formData.advisorMuduleName ? formData.advisorMuduleName: '',
      // assignedAdvisor: parseFloat(formData.assignedAdvisor) ? formData.assignedAdvisor: null, 
      // cessationDate: new Date(formData.cessationDate) ? new Date(formData.cessationDate): null,
      // leadStatus: formData.leadStatus ? formData.leadStatus:'',
      // ciprNumber: formData.ciprNo ?formData.ciprNo: null,
      // advisorLeadSource: formData.advisorLeadSource ?formData.advisorLeadSource: '',
      // myCalendar: String(formData.myCalendar) ?formData.myCalendar: '',
      // eoPolicyNumber: formData.eoPolicyNumber ?formData.eoPolicyNumber:null,
      // dateOfHire: new Date(formData.dateOfHire) ? new Date(formData.dateOfHire):null,
      // licenceNumber: formData.licenceNumber ? formData.licenceNumber: null,
      // status: formData.status ? formData.status:'',
      // sincehowLong: formData.llqpDuration ? formData.llqpDuration: null,
      // exchangeRate: formData.exchangeRate ? formData.exchangeRate: null,
      // appID: formData.appID ?formData.appID: null,
      // description: formData.description ?formData.description: '',
      // hireTeamName: formData.hireTeamName ?formData.hireTeamName:'',
      // hireTeamLeg: formData.hireTeamLeg ?formData.hireTeamLeg:'',
      // hireType: formData.hireType ?formData.hireType:'',
      // teamGenerationNumber: formData.teamGenerationNumber ? formData.teamGenerationNumber:'',
      // hireLevel: formData.hireLevel ? formData.hireLevel: '',
      // whatsapp: formData.whatsapp ? formData.whatsapp: '',
      // emailOptOut: formData.emailOptOut ? formData.emailOptOut: false,
      // removeFromCampaign: formData.removeFromCampaign ? formData.removeFromCampaign: false,
      // appAdvisorId: formData.appAdvisorId ? formData.appAdvisorId: '',
      // advisorsDateofBirth: new Date(formData.advisorsDateofBirth) ? new Date(formData.advisorsDateofBirth): null,
      // vendor: formData.vendor ? formData.vendor: null,
      additionalContactInformation: formData.additionalContactInformation ? formData.additionalContactInformation: false,
      inactiveAdvisor: formData.inactiveAdvisor ? formData.inactiveAdvisor: false,
      reviewedason: new Date(formData.reviewedason) ? new Date(formData.reviewedason): null,
      advisorsLicenceNumber: formData.advisorsLicenceNumber ? formData.advisorsLicenceNumber: null,

      // leadSource: formData.leadSource ? formData.leadSource: '',
      // additionalContactInfo: formData.additionalAddress ? formData.additionalAddress: false,
      // socialMedia: formData.isSocial ? formData.isSocial: false,
      // courseRegistrationDate: formData.dateOfCourseRegistration? new Date(formData.dateOfCourseRegistration):null,
      // licenceExpiryDate: new Date(formData.licenceExpiryDate) ?formData.licenceExpiryDate: null,
      // eoPolicyExpiryDate: formData.eoPolicyExpiryDate ? new Date(formData.eoPolicyExpiryDate): null,
      // llqpLicensed: String(formData.isLLQPlicenced) ? formData.isLLQPlicenced:'',
      // probemLookingToSolve: formData.problem ? formData.problem: null,
      // howLongLicensed: formData.licenceDuration ? formData.licenceDuration: null,
      // whatLookingFor: formData.lookingFor ?formData.lookingFor: null,
      // insuranceAdvisor: formData.insuranceAdvisor ? formData.insuranceAdvisor:'',
    };

    // Insert the new contact into the "advisors" table
    const advisorsResult = await insertDataIntoTable(catalystApp, "advisors", advisorData);

    console.log("advisorsResult========>", advisorsResult);
    // step 1 ended here

    //  step 2 insert Data into advisorSubDetails

    const advisorSubData = {

      organizationLevel: formData.organizationLevel ?formData.organizationLevel:'',
      teamName: formData.teamName ?formData.teamName:'',
      insurancePartner: formData.insurancePartner ?formData.insurancePartner:'',
      isthisaReassignment: formData.isthisaReassignment ?formData.isthisaReassignment:'',
      reviewedDate: new Date(formData.reviewedDate) ? new Date(formData.reviewedDate):null,
      generationNumber: formData.generationNumber ?formData.generationNumber:null,
      fax: formData.fax ?formData.fax: null,
      secondaryEmail: formData.secondaryEmail ?formData.secondaryEmail:'',
      bonusLevel: formData.bonusLevel ?formData.bonusLevel:'',
      desiredTimeline: formData.desiredTimeline ?formData.desiredTimeline:'',
      fyc: formData.fycPercentage ?formData.fycPercentage:'',
      payoutLevel: formData.payoutLevel ?formData.payoutLevel:'',
      premium: formData.premiumPercentage ?formData.premiumPercentage:'',
      offering: formData.offering ? formData.offering: null,
      employmentType: formData.employmentType ?formData.employmentType:'',

      // teamLeg: formData.teamLeg ?formData.teamLeg:'',
      // phone: formData.Phone ?formData.Phone:null,
      // skype: formData.skype ?formData.skype:'',
      // facebook: formData.facebook ?formData.facebook:'',
      // twitter: formData.twitter ?formData.twitter:'',
      // linkedIn: formData.linkedIn ?formData.linkedIn:'',
      // googleReview: formData.googleReview ?formData.googleReview:'',
      // youtubeVideo: formData.youtubeVideo ?formData.youtubeVideo:'',
      // street: formData.street ?formData.street:'',
      // province: formData.province ?formData.province:'',
      // city: formData.city ?formData.city:'',
      // postalCode: formData.postalCode ?formData.postalCode:'',
      // lifeCareerPreferences: formData.lifeCareerPreferences ? formData.lifeCareerPreferences:'',
      advisorId: advisorsResult.ROWID
    };
  

    // inserting into subforms
    const advisorSubDataResponse = await insertMultipleRowsIntoTable("advisorSubDetails",[advisorSubData], req, advisorsResult );
console.log("advisorSubDataResponse", advisorSubDataResponse);

    const contactinfo = {
      advisorId: advisorsResult.ROWID,
      bestTimeToCall: formData.LeadInfo.bestTimeToCall ? formData.LeadInfo.bestTimeToCall: '',
      referralNameClient: formData.LeadInfo.referralNameClient ? formData.LeadInfo.referralNameClient: '',
      ifreferredbyAdvisor: formData.LeadInfo.ifreferredbyAdvisor ? formData.LeadInfo.ifreferredbyAdvisor: '',
      existingPolicyRenewalDueBy: formData.LeadInfo.existingPolicyRenewalDueBy ? formData.LeadInfo.existingPolicyRenewalDueBy: '',
      submitPageUrl: formData.LeadInfo.submitPageUrl ? formData.LeadInfo.submitPageUrl: '',


    }
    const advisorformationResult = await insertDataIntoTable(catalystApp, "dealInformation", contactinfo );


    console.log("advisorformationResult", advisorformationResult)

    const familyResult = await insertDataIntoTable(catalystApp, "familyTree", {
      advisorId: advisorsResult.ROWID,
      relationShipStatus: formData.FamilyTree.relationShipStatus ? formData.FamilyTree.relationShipStatus: '',
      numberOfSpouse: formData.FamilyTree.numberOfSpouse ? formData.FamilyTree.numberOfSpouse: '',
      anniversaryDate: formData.FamilyTree.anniversaryDate ? new Date(formData.FamilyTree.anniversaryDate) :'',
      nameOfSpouse: formData.FamilyTree.nameOfSpouse ? formData.FamilyTree.nameOfSpouse: '',
      spouseDateOfBirth: formData.FamilyTree.spouseDateOfBirth ? new Date(formData.FamilyTree.spouseDateOfBirth):'',
      phoneOfSpouse: formData.FamilyTree.phoneOfSpouse ? formData.FamilyTree.phoneOfSpouse: '',
      emailOfSpouse: formData.FamilyTree.emailOfSpouse ?  formData.FamilyTree.emailOfSpouse:'',
      nameOfCommonLawPartner: formData.FamilyTree.nameOfCommonLawPartner ? formData.FamilyTree.nameOfCommonLawPartner: '',
      commonLawDateOfBirth: formData.FamilyTree.commonLawDateOfBirth ? new Date(formData.FamilyTree.commonLawDateOfBirth) :'',
      dependentParents: formData.FamilyTree.dependentParents ? formData.FamilyTree.dependentParents:'',
      numberOfDependentParents: formData.FamilyTree.numberOfDependentParents ? formData.FamilyTree.numberOfDependentParents: '',
      dependentChildren: formData.FamilyTree.dependentChildren ? formData.FamilyTree.dependentChildren: '',
      numberOfDependentChildren: formData.FamilyTree.numberOfDependentChildren ?  formData.FamilyTree.numberOfDependentChildren:'',
      siblings: formData.FamilyTree.siblings ? formData.FamilyTree.siblings:'',
      numberOfSiblings: formData.FamilyTree.numberOfSiblings ?  formData.FamilyTree.numberOfSiblings: '',        
    });

    console.log("familyResult", familyResult);

    // const advisorFycData = user.advisorFYC._value;
    // const advisorId = advisorsResult.ROWID;
    // // Append advisorId to each row in advisorFycData
    // const advisorFycDataWithId = advisorFycData.map(row => {
    //   return {
    //     ...row,
    //     advisorId: advisorId
    //   };
    // });
    // // Insert the advisorFycDataWithId into the "advisorFyc" table
    // const advisorFycResponse = await insertMultipleRowsIntoTable(
    //   "advisorFyc",
    //   advisorFycDataWithId,
    //   req,
    //   advisorsResult
    // );    
    // const advisorBonusData = user.advisorBonus._value;
    // // Append advisorId to each row in advisorFycData
    // const advisorBonusDataWithId = advisorBonusData.map(row => {
    //   return {
    //     ...row,
    //     advisorId: advisorId
    //   };
    // });
    // // Insert the advisorFycDataWithId into the "advisorFyc" table
    // const advisorBonusResponse = await insertMultipleRowsIntoTable(
    //   "advisorBonus",
    //   advisorBonusDataWithId,
    //   req,
    //   advisorsResult
    // );
    Node.del("advisorList");
    return res.status(200).json({success:true, message:"data inserted successfuly"})

    
 
  } catch (error) {
    console.error("Error getting advisor:", error);
    return res.status(500).json({ success: false, message: "Failed to insert advisor", error: error.message });
  }
};
// // Route for updating an advisor
exports.updateAdvisor = async (req, res) => {
  try {
    const advisorId = req.params.id;
    // console.log(advisorId);
    const users= req.body;  
    // console.log("advisor fyc record=>",users.advisorFYC._rawValue);
    const formData = users.formData;
    // console.log("fsfad",formData.lastName); 
    const catalystApp = catalyst.initialize(req, { scope: "admin" });
    // Update data in the "advisors" table
    const advisorDataToUpdate = {
      advisorOwner: formData.advisorOwner,
      currency: formData.currency,
      exchangeRate: formData.exchangeRate,
      leadSource: formData.leadSource,
      firstName: formData.firstName,
      lastName: formData.lastName,
      status: formData.status,
    //   dateOfHire: formData.dateOfHire,
      advisorMuduleName: formData.advisorMuduleName,
      cessationDate: formData.cessationDate,
      email: formData.email,
      dateOfBirth: formData.dateOfBirth??'',
      licenceNumber: formData.licenceNumber,
      additionalContactInfo: formData.additionalAddress,
      eoPolicyNumber: formData.eoPolicyNumber,
      socialMedia: formData.isSocial,
    //   courseRegistrationDate: formData.dateOfCourseRegistration??'',
      licenceExpiryDate: formData.licenceExpiryDate??'',
      ciprNumber: formData.ciprNo,
      eoPolicyExpiryDate: formData.eoPolicyExpiryDate??'',
      appID: formData.appID,
      myCalendar: String(formData.myCalendar),
      leadStatus: formData.leadStatus,
      llqpLicensed: String(formData.isLLQPlicenced),
      mobile: formData.mobile,
      Phone: formData.Phone,
      sincehowLong: formData.llqpDuration,
      probemLookingToSolve: formData.problem,
      howLongLicensed: formData.licenceDuration,
      whatLookingFor: formData.lookingFor,
      hireLevel: formData.hireLevel,
      hireTeamName: formData.hireTeamName,
      hireType: formData.hireType,
      hireTeamLeg: formData.hireTeamLeg,
      teamGenerationNumber: formData.teamGenerationNumber,
      landline: formData.landline,
      assignedAdvisor: formData.assignedAdvisor, 
      insuranceAdvisor: formData.insuranceAdvisor,
      location: formData.location,
      ROWID: advisorId
    };
    // console.log("advisorDataToUpdate", advisorDataToUpdate);
    // advisorDataToUpdate.ROWID = advisorId;
    const advisorUpdateResult = await catalystApp
      .datastore()
      .table("advisors")
      .updateRow(advisorDataToUpdate);

      const advisorSubDetailsData = {
        organizationLevel: formData.organizationLevel,
        teamName: formData.teamName,
        employmentType: formData.employmentType,
        teamLeg: formData.teamLeg,
        reviewedDate: formData.reviewedDate,
        generationNumber: formData.generationNumber,
        phone: formData.phone,
        fax: formData.fax,
        secondaryEmail: formData.secondaryEmail,
        skype: formData.skype,
        facebook: formData.facebook,
        twitter: formData.twitter,
        linkedIn: formData.linkedIn,
        googleReview: formData.googleReview,
        youtubeVideo: formData.youtubeVideo,
        street: formData.street,
        province: formData.province,
        city: formData.city,
        postalCode: formData.postalCode,
        insurancePartner: formData.insurancePartner,
        bonusLevel: formData.bonusLevel,
        fyc: formData.fyc,
        payoutLevel: formData.payoutLevel,
        premium: formData.premium,
        lifeCareerPreferences: formData.lifeCareerPreferences,
        desiredTimeline: formData.desiredTimeline,
        ROWID:  users.contactDetailROWID
      };
      const advisorSubDetailResult = await catalystApp
        .datastore()
        .table("advisorSubDetails")
        .updateRow(advisorSubDetailsData);
      //   // subformds advisor FYC
      //   console.log("formData advisorFYC_value=>", users.advisorFYC._rawValue);
      const advisorFycResult = await catalystApp
        .datastore()
        .table("advisorFyc")
        .updateRows(users.advisorFYC._rawValue);
      //   // subformds advisorBonus
      //   console.log("formData advisorBonus _value=>", users.advisorBonus._rawValue);
      const advisorBonusResult = await catalystApp
        .datastore()
        .table("advisorBonus")
        .updateRows(users.advisorBonus._rawValue);

        // Node Chache
        Node.del("advisorList");
    //return res.status(200).json({ success: true, message: "Advisor updated successfully", data: advisorBonusResult });
    return res.status(200).json({
      success: true,
      message: "Advisor updated successfully",
      data: {
        advisorUpdateResult,
        advisorSubDetailResult,
        advisorFycResult,
        // advisorBonusResult
      }
    });
  } catch (error) {
    console.error("Error updating advisor:", error);
    return res.status(500).json({ success: false, message: "Failed to update advisor", error: error });
  }
};

exports.getadvisor = async (req, res) => {
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  try {
    if (req.params.id) {
      const advisorResult = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from advisors Where ROWID=${req.params.id}`
        );
      const advisorSubResult = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from advisorSubDetails Where advisorID=${req.params.id}`
        );
      const advisorBonus = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from advisorBonus Where advisorID=${req.params.id}`
        );
      const advisorFyc = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from advisorFyc Where advisorID=${req.params.id}`
        );
       
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({
        success: true,
        message: "ARvisor result got",
        data: {
          advisorResult,
          advisorSubResult,
          advisorBonus,
          advisorFyc
        },
      });
    }
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch Advisor data", error });
  }
};
// // Route 2 Getting Advisor data and left join with userData
exports.getadvisors =  async (req, res) => {

  try {

    const query = `SELECT * FROM userData`;

    const advisor = await catalyst.initialize(req, { scope: "admin" }).zcql().executeZCQLQuery(query)
    
    return res.status(200).json({ success: true, message: "Advisor data sent successfuly" , advisor});

  } catch (error) {
    console.error("Error getting advisor:", error);
    return res.status(500).json({ success: false, message: "Failed to get advisor", error: error.message });

  }
};

// // get all advisors 

exports.getalladvisors=async (req, res) => {

// const adv=Node.get("advisorList");
// if(adv){
//   return res.status(200).json({ success: true, message: "Advisor data sent successfuly" , adv});
// }

  const secretKey = "shgfsyurswr67wr7wguwguwrwrw7fwuygw7it"; // Same secret key used for encryption
  const encryptedData = req.headers.encrypteddata; // Assuming header key is 'encryptedData'

  let userId, viewOnly, viewAll;
  // Decrypt the data
  if (encryptedData) {
    const decryptedData = decryptData(encryptedData, secretKey);
    [userId, viewOnly, viewAll] = decryptedData.split(",");
  }

  console.log(userId, viewOnly, viewAll)
  try {
    const { search } = req.body;

    const rowId = req.params.id;
    const page = parseInt(req.body.page, 10) || 1;
    const limit = parseInt(req.body.limit, 10) || 10;
    const offset = (page - 1) * limit;
    const fieldMapping = {name:["firstName","lastName"], advisorOwner:["userData.firstName","userData.lastName"] , contactOwner: ["contacts.firstName", "contacts.lastName"] , mobile:"mobile", email:"email", module:"layout" };
    let searchConditions = searchQueryBuilder(search, fieldMapping);
  
    if (rowId) {
      const rowIdCondition = `ROWID = '${rowId}'`;
      searchConditions = searchConditions ? `${searchConditions} AND ${rowIdCondition}` : rowIdCondition;
    }

    const whereClause = searchConditions ? `WHERE (${searchConditions})` : '';
    let advisorQuery= `SELECT ROWID,firstName,lastName,mobile,email,assignedAdvisor,advisorOwner,location
                FROM advisors
                LEFT JOIN userData ON advisors.advisorOwner = userData.ROWID 
                LEFT JOIN contacts ON advisors.assignedAdvisor = contacts.ROWID
                %SEARCH_CONDITION%  ORDER BY CREATEDTIME DESC LIMIT %LIMIT% OFFSET %OFFSET% `;
  
    let query = advisorQuery
    .replace('%SEARCH_CONDITION%', whereClause)
    .replace('%LIMIT%', limit)
    .replace('%OFFSET%', offset);
    const advisor = await catalyst.initialize(req, { scope: "admin" }).zcql().executeZCQLQuery(query)
    let adv=advisor.map((item)=>item.advisors)
    Node.set("advisorList",adv);
    return res.status(200).json({ success: true, message: "Advisor data sent successfuly" ,adv });

  } catch (error) {
    console.error("Error getting advisor:", error);
    return res.status(500).json({ success: false, message: "Failed to get advisor", error: error.message });

  }
}
// // delete

exports.deleteadvisor = async (req, res) => {
    try {
      const adminApp = catalyst.initialize(req, { scope: "admin" });
      const deleteQuery = `DELETE FROM advisors WHERE ROWID IN(${req.params.id || req.body.ids
      })`;
      let result = await adminApp.zcql().executeZCQLQuery(deleteQuery);
      Node.del("advisorList");
      res.status(200).json({
        success: true,
        message: "Advisor Deleted Successfully...!!!",
        deleteQuery,
        result,
      });
    } catch (error) {
      res.status(409).json({
        success: false,
        message: "Advisor Deletion unsuccessfully...!!!",
        error: error,
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
    let headers = advisor
    const csvStringifier = createObjectCsvStringifier({
      header: headers,
    });
    const data = advisorSample;
    const csvContent =
      csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(data);
    
    return csvContent;
  } catch (error) {
    console.error("Error downloading file:", error);
  }
}
