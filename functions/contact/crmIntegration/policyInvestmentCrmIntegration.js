const axios = require("axios");
require("dotenv").config();
const grant_type = process.env.GRANT_TYPE;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const refresh_token = process.env.REFRESH_TOKEN;
const tokenUrl = process.env.ACCOUNT_URI;
const CRM_URI = process.env.CRM_URI;
const adminId  = process.env.ADMINID;
const conttactId  = process.env.CONTACTID;
const insPartnerId  = process.env.INSIRANCEPARTNERID;
const locationId = process.env.LOCATIONID;
const insuranceLeaderId = process.env.INSURANCELEADID

// ******************** CREATE NEW RECORD IN CRM *******************
exports.dataSyncZcrm = async (token, formData, crmId) => {
  // console.log("CrmId", crmId);
  try {
    const layout = await layoutName(formData?.layout);
    const policyBasicInfo = await  policyBasicInfoParseData(formData);
    const policyServices = await  policyServicesParseData(formData);
    const policyTrackers = await  policyTrackersParseData(formData);
    const policyAnnuitantInfo = await  policyAnnuitantInfoParseData(formData);
   
    // // ********** SUBFORM DATA ****************
    const policyCB = await policyCBData(formData?.services ?? []);
    const policyBeneficiary = await policyBeneficiaryData(formData?.services ?? []);
    
    // // ********** END SUBFORM DATA ****************    
    const data = {
      data: [
        {
          // **************** Deal Info *****************
          Owner:adminId,
          Layout: {
            id: "4299079000092182164"
          },
          Catalyst_Id: formData?.ROWID,
          ...policyBasicInfo,
          ...policyServices,
          ...policyTrackers,
          ...policyAnnuitantInfo,
          // **************** SUBFORM CRM FIELDS *******************
          ...policyCB,
          ...policyBeneficiary,  
        }
      ]
    };
    // console.log("Formdata CRM====>", JSON.stringify(data));
    const baseUrl = `https://www.zohoapis.com/crm/v7/Investments${(crmId !== null && crmId !== undefined) ? `/${crmId}` : ''}`;
    const baseMethod = crmId===null || crmId===undefined?'post':'PUT';   
    const config = {
      url: baseUrl,
      method: baseMethod,
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };
    const response = await axios.request(config);
    return response?.data?.data[0]?.details?.id;
  } catch (error) {
    console.error("Error creating Insurance Partner:", error);
    return error;
  }
};


exports.generateToken = async () => {
  const baseUrl = `${tokenUrl}?refresh_token=${refresh_token}&client_id=${client_id}&client_secret=${client_secret}&grant_type=${grant_type}`;
  const dataConfig = {
    url: baseUrl,
    method: "post",
  };
  const token = await axios
    .request(dataConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
  return token.access_token;
};
// ************ DEAL INFORMATION DATA PARSER ***********
async function policyBasicInfoParseData(formData){
    return {
      Name: formData?.basicInfo?.policyName??"",
    //   Client_Mobile: formData?.basicInfo?.clientMobile??null,
    //   Currency: formData?.basicInfo?.currency??"CAD",
      Contract_Name: formData?.basicInfo?.contractName??"",
      Investment: formData?.basicInfo?.investment??"",
      Corporate_Commission: formData?.basicInfo?.corporateCommission??null,
      Advisor_Commission: formData?.basicInfo?.advisorCommission??null,
      Monthly_Annual_Contribution: formData?.basicInfo?.monthlyAnnualContribution??null,
      Contract_Number: formData?.basicInfo?.contractNumber??null,
      Initial_Contribution: formData?.basicInfo?.initialContribution??null,
      Initial_Deposit: formData?.basicInfo?.initialDeposit??null,
      Location_Commission: formData?.basicInfo?.advisorCommission??null,
      Total_Contribution: formData?.basicInfo?.totalContribution??null,
      Client_Address: formData?.basicInfo?.clientAddress??null,
      Client_Address: formData?.basicInfo?.clientAddress??null,
      Registered: formData?.basicInfo?.registered??"",
      Location: locationId,
      // client: formData?.basicInfo?.client??null,
      // Policy_Advisor: advisorId,
    }
}
async function policyServicesParseData(formData){
  return {
    // Number_of_Beneficiaries_5_and_above: formData?.services?.numberofBeneficiaries??null,
    Is_Client_Policy_Insured: formData?.services?.isClientABeneficiary??"",
    Are_there_multiple_Beneficiaries_to_this_Policy: formData?.services?.arethereMultipleBeneficiaries??"",
   
  }
}
async function policyTrackersParseData(formData){
  return {
    Maturity_Date: formData?.trackers?.maturityDate??null,
    Follow_Up_Date: formData?.trackers?.followUpDate??"",
    Date_of_Submission: formData?.trackers?.dateOfSubmission??null,
    Contract_Start_Date: formData?.trackers?.contractStartDate??null,
    Date_of_Last_Review: formData?.trackers?.dateOfLastReview??null,
   
  }
}
async function policyAnnuitantInfoParseData(formData){
  return {
    Number_of_Annuitants: formData?.annuitantInfo?.numberOfAnnuitants??null,
    // Phone: formData?.annuitantInfo?.phone??null,
    B_Relation_to_Primary_Annuitant: formData?.annuitantInfo?.relationshipToPrimaryAnnuitment??null,
    Email: formData?.annuitantInfo?.email??null,
    Application_Follow_Up_Date: formData?.annuitantInfo?.followUpDate??null,
    Date_of_Birth: formData?.annuitantInfo?.dateOfBirth??"",
    Applicant_DOB: formData?.annuitantInfo?.applicantDOB??"",
    Name_of_Primary_Annuitant: formData?.annuitantInfo?.nameOfPrimaryAnnuitment??"",
    Is_the_client_the_Annuitant: formData?.annuitantInfo?.isTheClientAnnuitent??"",
    Gender: formData?.annuitantInfo?.gender??"",
    Applicant_Gender: formData?.annuitantInfo?.applicantGender??"",
  }
}


// Async function to format date and time to "YYYY-MM-DDTHH:mm"
async function dateTimeFormat(date) {
  if (!date) {   
    return null;
  }
  const dateFormat = new Date(date);
  if (isNaN(dateFormat.getTime())) {   
    return null;
  }
  const datePart = dateFormat.toISOString().split('T')[0];
  const timePart = dateFormat.toTimeString().split(' ')[0];

  return `${datePart}T${timePart}`;
}

// *************LAYOUT FUNCTION **************
async function layoutName(layoutData) {
  let layout = '';
  switch (layoutData) {
    case 'New Policy':
      layout = '4299079000000475186';
      break;
    case 'Investment':
      layout = '4299079000030808003';
      break;
    default:
      layout = '';
  } 
  return layout;
}

// *****************SUB FORM DATA ******************
async function policyBeneficiaryData(services) {
  const contBene = {};
  if (Array.isArray(services?.Beneficiary)) {
    services.Beneficiary.forEach((benefi, index) => {
      const childIndex = index + 1;
      contBene[`Life_Beneficiary_${childIndex}_Name`] = benefi.name || "";
      contBene[`Beneficiary_${childIndex}_Relationship_with_Insured`] = benefi.relationship || "";
      contBene[`Life_Beneficiary_${childIndex}_Name`] = benefi.lifeBeneficiaryName || "";
      contBene[`Beneficiary_${childIndex}_Email`] = benefi.email || "";
      contBene[`Beneficiary_${childIndex}_Phone`] = benefi.phone || "";
      contBene[`Beneficiary_${childIndex}_Date_of_Birth`] = benefi.dob || "";
    });
  }
  return contBene;
}
async function policyCBData(annuitantInfo) {
  const annuitantData = {};
  if (Array.isArray(annuitantInfo?.InvestmentBasketData)) {
    annuitantInfo.InvestmentBasketData.forEach((Investmen, index) => {
      const childIndex = index + 1;
      annuitantData[`CB${childIndex}_Name`] = Investmen.name || "";
      annuitantData[`CB${childIndex}_Phone`] = Investmen.phone || "";
      annuitantData[`CB${childIndex}_Relationship`] = Investmen.relationship || "";
    //   annuitantData[`CB${childIndex}_Email`] = Investmen.email || "";
    annuitantData[`CB${childIndex}_Date_of_birth`] = Investmen.dob || "";
    annuitantData[`Cont_Beneficiary_Per_${childIndex}`] = toString(Investmen.beneficiaryPercent || "");
    });
  }
  return annuitantData;
}
