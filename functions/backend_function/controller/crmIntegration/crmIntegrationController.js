const  axios  = require("axios");
const {dateTimeFormat} = require("../Utils/util");
const {parseDealData,parseLeadData, parseContactsData, parsePolicysData,parseInvestPolicysData,parseLocationDetails,parseContactsClientData} = require("../../Utils/crmIntegration/ParseJs");
const baseUrl = process.env.NODE_ENV === "production" ? process.env.PRODUCTION_URL : process.env.DEVELOPMENT_URL;
async function connectionCheck() {
  return "Connected to Catalyst";
}
async function createLead(leadData,app) {
    try{
      await parseLeadData(app,leadData);
    } catch(error) {
        console.log("LEAD CREATED Failed ",error);
        throw error;
    }
}
async function createDeal(dealData,app) {
  console.log(
    "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<==== createDeal =====>>>>>>>>>>>>>>>>>>>>>>>"
  );
    try {
      await parseDealData(app,dealData);
    } catch (error) {
      console.log("DEAL CREATED Failed ", error);
      throw error;
    }
}
async function createContact(contactData,app) {
    try {
       if(contactData?.Layout === "4299079000000407082"){
         await parseContactsData(app,contactData); 
        }else{
          await parseContactsClientData(app,contactData); 
       }
      // console.log("CONTACT CREATED", resp);
    } catch (error) {
      console.log("CONTACT CREATED Failed ", error);
      throw error;
    }
}
async function createLocation(locationData,app) {
    try {
      await parseLocationDetails(app,locationData);
      //  const resp =  await app.dataStore().table("locations").insertRows(locations);
      // console.log("LOCATION CREATED", resp);
    } catch (error) {
      console.log("LOCATION CREATED Failed ", error);
      throw error;
    }
}
async function createPolicy(policyData,app) {
    try {
      await parsePolicysData(app,policyData);
    } catch (error) {
      console.log("POLICY CREATED Failed ", error);
      throw error;
    }
}
// async function createInsurancePartner(investmentData,app) {
//     try {
//       await parseInvestPolicysData(app,investmentData);
//     } catch (error) {
//       console.log("Parsec Insurance Partner CREATED Failed ", error);
//       throw error;
//     }
// }

// <<<<<<<<<<<<< ----- HEALTH CARE PARTNER ---- >>>>>>>>>>>>>>
async function createInvestment(investmentData,app) {
    try {
      await parseInvestPolicysData(app,investmentData);     
      console.log(
        "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<==== CATALYST RESP =====>>>>>>>>>>>>>>>>>>>>>>>"
      );
      // console.log("INVESTMENT CREATED", resp);
    } catch (error) {
      console.log("INVESTMENT CREATED Failed ", error);
      throw error;
    }
}


module.exports  = {connectionCheck,createLead,createDeal,createContact,createLocation,createPolicy,createInvestment}
