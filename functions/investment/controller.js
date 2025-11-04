const catalyst = require("zcatalyst-sdk-node");
const NodeCache = require( "node-cache" );
const Node = new NodeCache();
const {
  insertDataIntoTable,
  insertMultipleRowsIntoTable,
  deleteDataFromTable,
  updateSubFormData,
  deleteById,
} = require("./utils");

exports.createNewInvestment = async (req, res) => {
  const formData = req.body;
  // console.log("forms data =>", formData);

  const invData = {
    policyOwner: formData.BasicInfo.policyOwner ? formData.BasicInfo.policyOwner: null,
    policyName: formData.BasicInfo.policyName ? formData.BasicInfo.policyName: '',
    clientMobile: formData.BasicInfo.clientMobile ? formData.BasicInfo.clientMobile: '',
    client: formData.BasicInfo.client ? formData.BasicInfo.client: null,
    policyAdvisor: formData.BasicInfo.policyAdvisor ? formData.BasicInfo.policyAdvisor: null,  
    currency: formData.BasicInfo.currency ? formData.BasicInfo.currency: '',
    contractName: formData.BasicInfo.contractName ? formData.BasicInfo.contractName: '',
    investment: parseFloat(formData.BasicInfo.investment) ? formData.BasicInfo.investment : null,
    corporateCommission: parseFloat(formData.BasicInfo.corporateCommission) ? formData.BasicInfo.corporateCommission: null,
    advisorCommission: formData.BasicInfo.advisorCommission ? formData.BasicInfo.advisorCommission:'',
    monthlyAnnualContribution: parseFloat(formData.BasicInfo.monthlyAnnualContribution) ? parseFloat(formData.BasicInfo.monthlyAnnualContribution): null,
    contractNumber: formData.BasicInfo.contractNumber ? formData.BasicInfo.contractNumber: '',
    initialContribution: parseFloat(formData.BasicInfo.initialContribution) ? parseFloat(formData.BasicInfo.initialContribution):null,
    initialDeposit: parseFloat(formData.BasicInfo.initialDeposit) ? formData.BasicInfo.initialDeposit:null,
    location: parseFloat(formData.BasicInfo.location) ? formData.BasicInfo.location:null,
    locationCommission: parseFloat(formData.BasicInfo.locationCommission) ? formData.BasicInfo.locationCommission:null,
      clientAddress: formData.BasicInfo.clientAddress ? formData.BasicInfo.clientAddress:'',
    layout: formData.BasicInfo.layout ? formData.BasicInfo.layout: '' ,
    type: formData.BasicInfo.type ?formData.BasicInfo.type:'',
    totalContribution: parseFloat(formData.BasicInfo.totalContribution) ?parseFloat(formData.BasicInfo.totalContribution):null,

    // frequency: formData.frequency ? formData.frequency: '',
    registered:formData.BasicInfo.registered ?formData.BasicInfo.registered:null,   
    numberofBeneficiariesupto4:formData.Beneficiary.numberofBeneficiariesupto4 ?formData.Beneficiary.numberofBeneficiariesupto4:null,   
    relationtoPrimaryAnnuitant:formData.Beneficiary.relationtoPrimaryAnnuitant ?formData.Beneficiary.relationtoPrimaryAnnuitant:null,   
  };
  // console.log("invData", invData);

const annuitentStep = {
    numberOfAnnuitants: parseInt(formData.AnnuitantInfo.numberOfAnnuitants) ? formData.AnnuitantInfo.numberOfAnnuitants: null,
    phone: formData.AnnuitantInfo.phone ?formData.AnnuitantInfo.phone:null,
    relationshipToPrimaryAnnuitment: formData.AnnuitantInfo.relationshipToPrimaryAnnuitment ? formData.AnnuitantInfo.relationshipToPrimaryAnnuitment:'',
    email: formData.AnnuitantInfo.email ?formData.AnnuitantInfo.email:'',
    dateOfBirth: formData.AnnuitantInfo.dateOfBirth ? new Date(formData.AnnuitantInfo.dateOfBirth): null,
    applicantDOB: formData.AnnuitantInfo.applicantDOB ? new Date(formData.AnnuitantInfo.applicantDOB):null,
    nameOfPrimaryAnnuitment: formData.AnnuitantInfo.nameOfPrimaryAnnuitment ? formData.AnnuitantInfo.nameOfPrimaryAnnuitment:'',
    isTheClientAnnuitent: formData.AnnuitantInfo.isTheClientAnnuitent ? formData.AnnuitantInfo.isTheClientAnnuitent: '' ,
    gender: formData.AnnuitantInfo.gender ? formData.AnnuitantInfo.gender:'',
    applicantGender: formData.AnnuitantInfo.applicantGender ? formData.AnnuitantInfo.applicantGender: '',
    //  tracker forms
    dateOfEnquiry: formData.Trackers.dateOfEnquiry ? new Date(formData.Trackers.dateOfEnquiry):null,
    maturityDate: formData.Trackers.maturityDate ? new Date(formData.Trackers.maturityDate): null,
    followUpDate: formData.Trackers.followUpDate ? new Date(formData.Trackers.followUpDate): null,
    dateOfSubmission: formData.Trackers.dateOfSubmission ? new Date(formData.Trackers.dateOfSubmission): null,
    contractStartDate: formData.Trackers.contractStartDate ? new Date(formData.Trackers.contractStartDate): null,
    dateOfLastReview: formData.Trackers.dateOfLastReview ? new Date(formData.Trackers.dateOfLastReview): null,

    // coapplicantName: formData.nameOfCoApplicant ? formData.nameOfCoApplicant:'',
    // sAnnuitant: formData.successorAnnuitant ? formData.successorAnnuitant:'',
    // pSubscriber: formData.primarySubscriber ? formData.primarySubscriber:'',
    // coapplicant: formData.isThereCoapplicant ? formData.isThereCoapplicant:'',
    // address: formData.address ? formData.address:'',
    // replacingSubscriber: formData.isThereAJointReplacingSubscriber ? formData.isThereAJointReplacingSubscriber:'',
  };
  // const beneficiaryData = {
  //   name: formData.beneficiaryName ? formData.beneficiaryName:'',
  //   phone: formData.beneficiaryPhone ? formData.beneficiaryPhone:null,
  //   email: formData.beneficiarEmail ? formData.beneficiarEmail:'',
  //   gender: formData.beneficiaryGender ? formData.beneficiaryGender:'',
  //   dob: formData.beneficiaryDOB ? new Date(formData.beneficiaryDOB):null,
  //   contractAssociated: formData.associatedToContract ?formData.associatedToContract:'',
  //   type: formData.beneficiaryType ? formData.beneficiaryType:'',
  // };

  // const basketData = formData.investmentBasketData;
  // const newbasketData = formData.newInvestmentBasketData;
  // const deletedbasketData = formData.newInvestmentBasketData;

  // const contBeneficiaryData = formData.contingentBeneficiaryData;
  // const newContBeneficiaryData = formData.newContingentBeneficiaryData;
  // const deletedContBeneficiaryData = formData.deletedContingentBeneficiaryData;

  try {
    // console.log("This is basket Data", basketData);
    // Initialize Catalyst
    const catalystApp = catalyst.initialize(req, { scope: "admin" });

    // // Insert the new contact into the "contacts" table
    const invResult = await insertDataIntoTable(catalystApp,"policies", invData );

    // console.log("invResult====>", invResult);

    annuitentStep.policyId = invResult.ROWID;
    // console.log("annuitentStep=====>", annuitentStep);
    const annuitentStepResult = await insertDataIntoTable( catalystApp, "annuitantAndTracking", annuitentStep );

   
    console.log("formData.Beneficiary.BeneficiariesData====>",formData.Beneficiary.BeneficiariesData)

    let contBeneficiaryDataResult;
   if (formData.Beneficiary.BeneficiariesData && formData.Beneficiary.BeneficiariesData.length > 0) {
      contBeneficiaryDataResult = await insertMultipleRowsIntoTable( "beneficiary", formData.Beneficiary.BeneficiariesData, req, invResult);
    }
    console.log("contBeneficiaryDataResult=====>", contBeneficiaryDataResult)
    
// console.log('beneficiaryDataresult=====>',formData.AnnuitantInfo.InvestmentBasketData)

    if (formData.AnnuitantInfo.InvestmentBasketData && formData.AnnuitantInfo.InvestmentBasketData.length > 0) {
      const invBasketDataResult = await insertMultipleRowsIntoTable( "inBasket", formData.AnnuitantInfo.InvestmentBasketData,  req, invResult );
      console.log("invBasketDataResult", invBasketDataResult);
    }
   
    // Send success response with created record details
    res.status(201).json({
      success: true,
      message: "Investment Created Successfully",
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error creating investment:", error);
    // Send error response with error details
    res.status(409).json({
      success: false,
      message: "Failed to create investment",
      error: error, // Include error message for better error reporting
    });
  }
};

exports.getAllInvestments = async (req, res) => {
  const adminApp = catalyst.initialize(req, { scope: "admin" });
  try {
    if (req.params.id) {
      console.log("This is policies id", req.params.id);
      const investmentResult = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from policies Where ROWID=${req.params.id}`
        );
      const inBasketResult = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from  inBasket Where policyId=${req.params.id}`
        );

      const beneficiaryResult = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from beneficiary Where policyId=${req.params.id}`
        );

      const contingentBeneficiaryResult = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from contingentBeneficiary Where policyId=${req.params.id}`
        );
      const annuitantAndTrackingResult = await adminApp
        .zcql()
        .executeZCQLQuery(
          `Select * from annuitantAndTracking Where policyId=${req.params.id}`
        );

      res.setHeader("Content-Type", "application/json");
      res.status(200).json({
        success: true,
        message: "policies  result got",
        data: {
          investmentResult,
          inBasketResult,
          beneficiaryResult,
          contingentBeneficiaryResult,
          annuitantAndTrackingResult,
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
      policies.layout = 'RRSP' OR policies.layout = 'RESP' OR policies.layout = 'TFSA';  
  `;

      // Execute the SQL queries to fetch contact data and contact sub-data
      const policyData = await adminApp.zcql().executeZCQLQuery(policyQuery);

      // Respond with the fetched data
      res.status(200).json({
        success: true,
        message: "investments fetched successfully",
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

exports.deleteInvestment = async (req, res) => {
  const policyId = req.params.id;
  console.log("This is investment ID", policyId);
  try {
    // Initialize Catalyst
    const catalystApp = catalyst.initialize(req, { scope: "admin" });

    // Delete associated data from tables based on contactId
    const beneficiaryResult = await deleteDataFromTable(
      catalystApp,
      "beneficiary",
      { policyId: policyId }
    );

    const annuitantAndTrackingResult = await deleteDataFromTable(
      catalystApp,
      "annuitantAndTracking",
      { policyId: policyId }
    );

    const contingentBeneficiaryResult = await deleteDataFromTable(
      catalystApp,
      "contingentBeneficiary",
      { policyId: policyId }
    );
    const inBasketResult = await deleteDataFromTable(catalystApp, "inBasket", {
      policyId: policyId,
    });

    const deletedPolicies = await deleteDataFromTable(catalystApp, "policies", {
      ROWID: policyId,
    });

    const responseData = {
      beneficiaryResult,
      annuitantAndTrackingResult,
      inBasketResult,
      deletedPolicies,
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

exports.updateInvestment = async (req, res) => {
  const formData = req.body;
  const id = req.params.id;

  // console.log(formData);
  // console.log("This is formData",formData.cegs)
  // console.log("This is formData",formData.registered)
  const invData = {
    layout: formData.layout,
    owner: formData.owner,
    policyName: formData.name,
    mobile: formData.mobile,
    contractName: formData.contractName,
    policyPremium: formData.investment,
    frequency: formData.frequency,
    address: formData.clientAddress,
    bonus: formData.corporateCommission,
    commissionReceived: formData.advisorCommission,
    maContribution: parseFloat(formData.monthlyAnnualContribution),
    policyNumber: formData.contractNumber,
    policyType: formData.type,
    initialDeposit: formData.initialDeposit,
    discountFactor: formData.locationCommission,
    initialContribution: formData.initialContribution,
    totalContribution: formData.totalContribution,
    cesg:formData.cesg,
    registered:formData.registered,
   
    ROWID: formData.policiesId,

    // 2nd step form

    // 3rd step form
  };
  const annuitentStep = {
    annuitantClient: formData.isTheClientAnnuitent,
    annuitantsNo: formData.numberOfAnnuitants,
    phone: formData.phone,
    gender: formData.gender,
    coapplicantName: formData.nameOfCoApplicant,
    relationship: formData.relationshipToPrimaryAnnuitment,

    sAnnuitant: formData.successorAnnuitant,
    pSubscriber: formData.primarySubscriber,
    email: formData.email,
    dob: formData.dateOfBirth,
    applicantDob: formData.applicantDOB,
    applicantGender: formData.applicantGender,
    coapplicant: formData.isThereCoapplicant,
    annuitantName: formData.nameOfPrimaryAnnuitment,
    address: formData.address,
    replacingSubscriber: formData.isThereAJointReplacingSubscriber,
    inquiryDate: new Date(formData.dateOfEnquiry),
    maturityDate: new Date(formData.maturityDate),
    lastReviewDate: new Date(formData.dateOfLastReview),
    submissionDate: new Date(formData.dateOfSubmission),
    contractStartDate: new Date(formData.contractStartDate),
    followUpDate: new Date(formData.followUpDate),
    ROWID: formData.benfId,
  };
  const beneficiaryData = {
    name: formData.beneficiaryName,
    phone: formData.beneficiaryPhone,
    email: formData.beneficiarEmail,
    gender: formData.beneficiaryGender,
    dob: new Date(formData.beneficiaryDOB),
    contractAssociated: formData.associatedToContract,
    type: formData.beneficiaryType,
    ROWID: formData.annuitentId,
  };
  const basketData = formData.investmentBasketData;
  const newbasketData = formData.newInvestmentBasketData;
  const deletedbasketData = formData.deletedInvestmentBasketData;

  const contBeneficiaryData = formData.contingentBeneficiaryData;
  const newContBeneficiaryData = formData.newContingentBeneficiaryData;
  const deletedContBeneficiaryData = formData.deletedContingentBeneficiaryData;

  try {
    const catalystApp = catalyst.initialize(req, { scope: "admin" });
    policyResponse = await catalystApp
      .datastore()
      .table("policies")
      .updateRow({ ...invData });

    benfResult = await catalystApp
      .datastore()
      .table("beneficiary")
      .updateRow({ ...beneficiaryData });

    annuitentResult = await catalystApp
      .datastore()
      .table("annuitantAndTracking")
      .updateRow({ ...annuitentStep });

    if (basketData && basketData.length > 0) {
      const updateBasketDataResult = await updateSubFormData(
        basketData,
        req,
        "inBasket",
        policyResponse
      );
    }
    if (newbasketData && newbasketData.length > 0) {
      const newupdateBasketDataResult = await insertMultipleRowsIntoTable(
        "inBasket",
        newbasketData,
        req,
        policyResponse
      );
      // console.log("field created",newEmergencyContactResult);
    }

    if (deletedbasketData && deletedbasketData.length > 0) {
      console.log("This is investment baket data delete", deletedbasketData);
      // console.log("delete emergencyContactResult",deletedEmeregncyContact);
      const deletedUpdateBasketDataResult = await deleteById(
        "inBasket",
        deletedbasketData,
        req
      );
      // console.log("delete emergencyContactResult",deleteEmergencyContactResult);
    }
    if (contBeneficiaryData && contBeneficiaryData.length > 0) {
      const contBeneficiaryDataResult = await updateSubFormData(
        contBeneficiaryData,
        req,
        "contingentBeneficiary",
        policyResponse
      );
    }
    if (newContBeneficiaryData && newContBeneficiaryData.length > 0) {
      console.log("This is inside new cont bebeficiary ddata backen",newContBeneficiaryData)
      const newContBeneficiaryDataResult = await insertMultipleRowsIntoTable(
        "contingentBeneficiary",
        newContBeneficiaryData,
        req,
        policyResponse
      );
      // console.log("field created",newEmergencyContactResult);
    }

    if (deletedContBeneficiaryData && deletedContBeneficiaryData.length > 0) {
      console.log(
        "This is investment baket data delete",
        deletedContBeneficiaryData
      );
      // console.log("delete emergencyContactResult",deletedEmeregncyContact);
      const deletedContBeneficiaryDataResult = await deleteById(
        "contingentBeneficiary",
        deletedContBeneficiaryData,
        req
      );
      // console.log("delete emergencyContactResult",deleteEmergencyContactResult);
    }

    res.status(200).json({
      success: true,
      message: "Investment updated successfully",
      data: {
        policyResponse,
        benfResult,
        annuitentResult,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// exports.getDeals = async (req, res) => {
//   console.log("this is inside deal function");

//   const catalystApp = catalyst.initialize(req, { scope: "admin" });
//   const response = await catalystApp
//     .zcql()
//     .executeZCQLQuery("select * from deals");

//   res.status(200).json({
//     message: "Deals fetched successfully",
//     success: true,
//     response,
//   });
// };

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