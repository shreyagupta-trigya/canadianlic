const catalyst = require("zcatalyst-sdk-node");
const queries = require("../../SQL/query");
// const {createObjectCsvStringifier} = require("csv-writer")
const { insertData, insertSubformData, dateTimeFormat, updateData, updateSubformData, } = require("../../Utils/util");
// const {lifePolicy,rrsp,tfsa,resp,visa,lifePolicySample,rrspSample,tfsaSample,respSample,visaSample} = require("../exports");
// ***************CRM FUNCTION **************
const {dataSyncZcrm,generateToken} = require("../crmIntegration/policyInvestmentCrmIntegration");

const {getSequence,updateSequence} = require("../../Utils/sequenceUtils");

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

// <<<<<<<<<<<<<<  CREATE NEW POLICY API >>>>>>>>>>>>>>  
exports.createPolicyInvestment = async (req, res) => {
  const { basicInfo, annuitantInfo,trackers,services,layout} = req.body;
  try {
    const catalystApp = catalyst.initialize(req, { scope: "admin" });    
    // <<<<<<<<<<<<=========== INSERT POLICY INFORMATION =============>>>>>>>>>>>>>
    const policy = await parsePolicyData(basicInfo, services,layout);
      // SEQUENCE CODE
      const sequenceResp = await getSequence(req,"policies");
      let sequence =  sequenceResp?.data
      let policyID = `${sequence?.prefix}-${sequence?.sequence.padStart(5,'0')}`;
      policy.policyID = policyID;    
  
    const policyId = await insertData(catalystApp, "policies", policy);
    await updateSequence(req,sequence?.rowId,parseInt(sequence.sequence) + 1);

    // <<<<<<<<<<<<=========== INSERT POLICY DATA MAPPING =============>>>>>>>>>>>>>
    
    // investment function
    const AnnuitantInfoData = await parseAnnuitantInfoData(annuitantInfo,trackers,policyId);
    const annuitantInfoDataId = await insertData(catalystApp, "annuitantAndTracking", AnnuitantInfoData);

      const { updateArray: updateBeneficiary = [], insertArray: insertBeneficiary = [] } = await processSubform(services?.Beneficiary, policyId, "beneficiary") || {};
      const { updateArray: updatInvestmentBasket = [], insertArray: insertInvestmentBasket = [] } =  await processSubform(annuitantInfo?.InvestmentBasketData, policyId, "InvestmentBask") || {};// investment basket

      // <<<<<<<<<<<<=========== INSERT POLICY INVESTMENT FUNCTIONALITY =============>>>>>>>>>>>>>
      const beneficiaryId = insertBeneficiary .length > 0 ?await insertSubformData(catalystApp,"beneficiary",insertBeneficiary):[];
      const insertInvestmentBasketId = insertInvestmentBasket.length > 0 ?await insertSubformData(catalystApp,"inBasket",insertInvestmentBasket):[];// investment basket

      // ***************** SYNC DATA IN ZOHO CRM ******************
      const token = await generateToken();
      const crmId = await dataSyncZcrm(token,{ basicInfo, annuitantInfo,trackers,services,layout, ROWID:policyId});
      await catalystApp.datastore().table("policies").updateRow({sourceId:crmId,source:"catalyst",ROWID:policyId});
      console.log("CRMId ====>", crmId);
      // ***************** SYNC DATA IN ZOHO CRM ******************
      res.status(201).json({
        success: true,
        message: "Policy Investment and associated records created successfully",
        deals: {
          policyId: policyId,
          insertInvestmentBasketId:insertInvestmentBasketId,
          annuitantInfoDataId:annuitantInfoDataId,
          beneficiaryId: beneficiaryId,         
        },
      });
    } catch (error) {
      console.error("Error creating Policy:", error);
      res.status(409).json({
        success: false,
        message: "Failed to create Policy Investment",
        error: error,
      });
    }
};
// <<<<<<<<< UPDATE POLICY DETAILs >>>>>>>>
exports.updatePolicyInvestment = async (req, res) => {
  const {basicInfo, annuitantInfo,trackers,services,layout} = req.body;
  const rowId = req.params.id;
  try {
    const catalystApp = catalyst.initialize(req, { scope: "admin" });
    
    // <<<<<<<<<<<<=========== INSERT POLICY INFORMATION =============>>>>>>>>>>>>>
    const policyFieldsWithValues = await parsePolicyData(basicInfo, services,layout);  
    const policy = Object.fromEntries(
      Object.entries(policyFieldsWithValues).filter(([key, value]) => value !== "" && value !== null)
    );
    const policyId = await updateData(catalystApp, "policies", {...policy,ROWID:rowId});

    const AnnuitantInfoDataWithValues = await parseAnnuitantInfoData(annuitantInfo,trackers,policyId);
    const AnnuitantInfoData = Object.fromEntries(
      Object.entries(AnnuitantInfoDataWithValues).filter(([key, value]) => value !== "" && value !== null)
    );
    const annuitantId = await updateData(catalystApp, "annuitantAndTracking", {...AnnuitantInfoData,ROWID:rowId});

    // <<<<<<<<<<<<=========== UPDATE POLICY DATA MAPPING =============>>>>>>>>>>>>>
    const { updateArray: updateBeneficiary = [], insertArray: insertBeneficiary = [] } = await processSubform(services?.Beneficiary, policyId, "beneficiary") || {};
    const { updateArray: updatInvestmentBasket = [], insertArray: insertInvestmentBasket = [] } =  await processSubform(annuitantInfo?.InvestmentBasketData, policyId, "InvestmentBask") || {};// investment basket
    const beneficiaryId = insertBeneficiary.length > 0 ?await insertSubformData(catalystApp,"beneficiary",insertBeneficiary):[];
    const updateBeneficiaryId = updateBeneficiary.length > 0 ?await updateSubformData(catalystApp,"beneficiary",updateBeneficiary):[];
    const insertInvestmentBasketId = insertInvestmentBasket.length > 0 ?await insertSubformData(catalystApp,"inBasket",insertInvestmentBasket):[];// investment basket
    const inBasketId = updatInvestmentBasket.length > 0 ?await updateSubformData(catalystApp,"inBasket",updatInvestmentBasket):[];
    
    // <<<<<<<<<<<<<<<<< UPDATE SUB FORM DATA >>>>>>>>>>>>>>>>>>
    // // *************** CRM UPDATE FUNCTION **********************
    // const token = await generateToken();
    // const crmId = await dataSyncZcrm(token,{ basicInfo, services, policyDetails, claims,commission,history,layout, ROWID:policyId},req.body?.policyDetails?.policies?.sourceId);
    // console.log("Updated crmId", crmId);
    // // **************** END CRM UPDATE FUNCTION *********************
    res.status(201).json({
      success: true,
      message: "Policy and associated records update successfully",
      deals: {
        policyId: policyId,
        annuitantId: annuitantId,
        beneficiaryId: beneficiaryId,
        updateBeneficiaryId: updateBeneficiaryId,
        insertInvestmentBasketId: insertInvestmentBasketId,
        inBasketId: inBasketId,
      },
    });
  } catch (error) {
    console.error("Error creating Policy:", error);
    res.status(409).json({
      success: false,
      message: "Failed to create Policy Investment",
      error: error,
    });
  }
};
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

async function parsePolicyData(basicInfo, services,layout) {
    return {
        layout: layout?? "",
        policyName: basicInfo?.policyName ?? null,
        clientMobile: basicInfo?.clientMobile ?? null,
        currency: basicInfo?.currency ?? "CAD",
        contractName: basicInfo?.contractName ?? "",
        investment:parseFloat(basicInfo?.investment )?? null,
        corporateCommission:parseFloat(basicInfo?.corporateCommission  )?? null,
        advisorCommission: basicInfo?.advisorCommission ?? "",
        monthlyAnnualContribution: parseFloat(basicInfo?.monthlyAnnualContribution) ?? null,
        contractNumber: basicInfo?.contractNumber ?? null,
        initialContribution: basicInfo?.initialContribution ?? null,
        initialDeposit: basicInfo?.initialDeposit ?? null,
        locationCommission: basicInfo?.locationCommission ?? null,
        clientAddress: basicInfo?.clientAddress ?? null,
        registered: basicInfo?.registered ?? null,
        totalContribution: basicInfo?.totalContribution ?? "",
        investment: basicInfo?.investment ?? "",
        policyOwner: basicInfo?.policyOwner ?? "",
        location: basicInfo?.location ?? "",
        client: basicInfo?.client ?? "",
        policyAdvisor: basicInfo?.policyAdvisor ?? "",
        type: basicInfo?.type ?? "",
        registered: basicInfo?.registered ?? "",
      // <<<<<<<<< SERVICE DETAILS >>>>>>>>>>
      numberofBeneficiaries: parseInt(services?.numberofBeneficiaries) ?? null,
      relationtoPrimaryAnnuitant: services?.relationtoPrimaryAnnuitant ?? "",
      isClientABeneficiary: services?.isClientABeneficiary ?? null,
      arethereMultipleBeneficiaries: services?.arethereMultipleBeneficiaries ?? "",
      beneficiaryGender: services?.beneficiaryGender ?? "",

    };
}
