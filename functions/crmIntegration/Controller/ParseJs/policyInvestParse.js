const {getAccessToken,getPolicyCrmData, insertData, insertSubformData} = require("../../Utils/helper");
async function parseInvestPolicysData(catalystApp, policiesData) {
    const layout = policiesData?.Layout === "4299079000000475186" ? "Life Policy" : "Travel and Supervisa";
    // const accessToken = await getAccessToken();
    // const catalystRowsArr = await getPolicyCrmData(policiesData?.id, accessToken);
    // const policyLookupObj = { ...catalystRowsArr[0], ...catalystRowsArr[1] };
    const policyLookupObj='';
    const allStats = await getAllStats(policiesData, policyLookupObj, layout);
  
    let policies = allStats[0];    
    let contingentBeneficiaryDataDetails = allStats[1];

    if (policiesData.Catalyst_Id === null) {

      //console.log("No policies", policiesData);     
      const policiesId = await insertData(catalystApp, "policies", {
        ...policies,
        source: "crm",
        sourceId: policiesData?.id??null
      });
  
      await Promise.all([
        insertSubformData(catalystApp, "contingentBeneficiary", contingentBeneficiaryDataDetails,policiesId,"policy"),       
      ]);
      console.log("policyId",policiesId);
      //console.log("Function State",functionState);
    }
  }
  
  async function getAllStats(crmResp, contactLookupObj, layout) {
    return Promise.all([
      parsePolicyData(crmResp),
      contingentBeneficiaryData(crmResp)
    ]);
  }
  
  
  async function parsePolicyData(crmResp) {
    return {
      policyOwner: "22106000000065307",
      policyName: crmResp?.Name ?? "",
      clientMobile: crmResp?.Client_Mobile ?? null,
      currency: crmResp?.Currency ?? "CAD",
      contractName: crmResp?.Contract_Name ?? "",
      investment:parseFloat(crmResp?.Investment )?? null,
      corporateCommission:parseFloat(crmResp?.Corporate_Commission  )?? null,
      advisorCommission: crmResp?.Advisor_Commission ?? "",
      monthlyAnnualContribution: parseFloat(crmResp?.Monthly_Annual_Contribution) ?? null,
      contractNumber: crmResp?.Contract_Number ?? null,
      initialContribution: crmResp?.Initial_Contribution ?? null,
      initialDeposit: crmResp?.Initial_Deposit ?? null,
      locationCommission: crmResp?.Location_Commission ?? null,
      clientAddress: crmResp?.Client_Address ?? null,
    //   registered: crmResp?.	Registered ?? null, // picklist
    //   totalContribution: crmResp?.Total_Contribution ?? "", // currency 
    //   location: crmResp?.Location ?? "",// location lookup
    //   client: crmResp?.Client_Name ?? "", // lookup filed
    //   policyAdvisor: crmResp?.Policy_Advisor ?? "", // lookup
      type: crmResp?.Type ?? "",
      registered: crmResp?.Registered ?? "",
    // <<<<<<<<< SERVICE DETAILS >>>>>>>>>>
    numberofBeneficiaries: parseInt(crmResp?.Number_of_Beneficiaries) ?? null,
    relationtoPrimaryAnnuitant: crmResp?.Name_of_Primary_Annuitant ?? "",
    isClientABeneficiary: crmResp?.Is_the_Client_a_Beneficiary ?? null,
    arethereMultipleBeneficiaries: crmResp?.Are_there_multiple_Beneficiaries ?? "",
    // beneficiaryGender: crmResp?.Beneficiary_Gender ?? "",// looku files

    layout:crmResp?.Layout === "4299079000092182164" ? "Investment" : "Investment",
    };
  }

// *********SUB FORM DATA*************

async function contingentBeneficiaryData(crmResp) {
  const crmArray = Array.isArray(crmResp) ? crmResp : [crmResp];
  const contingentBeneficiaryArr = crmArray.flatMap(contg => {
    return [
      {
        name: contg.Contingent_Beneficiary_1_Name || null,
        phone: contg.Contingent_Beneficiary_1_Phone || null,
        relationship: contg.Contingent_Beneficiary_1_Relationship || null,
        email: contg.Contingent_Beneficiary_1_Email || null,
        dob: contg.Contingent_Beneficiary_1_DOB || null
      },
      {
        name: contg.Contingent_Beneficiary_2_Name || null,
        phone: contg.Contingent_Beneficiary_2_Phone || null,
        relationship: contg.Contingent_Beneficiary_2_Relationship || null,
        email: contg.Contingent_Beneficiary_2_Email || null,
        dob: contg.Contingent_Beneficiary_2_DOB || null,
      },
      {
        name: contg.Contingent_Beneficiary_3_Name || null,
        phone: contg.Contingent_Beneficiary_3_Phone || null,
        relationship: contg.Contingent_Beneficiary_3_Relationship || null,
        email: contg.Contingent_Beneficiary_3_Email || null,
        dob: contg.Contingent_Beneficiary_3_DOB || null,
      },        
      
    ].filter(contingent => 
      contingent.name || contingent.phone || contingent.relationship || contingent.email || contingent.dob
    );
  });
  return contingentBeneficiaryArr;
}

module.exports = {
    parseInvestPolicysData
  }