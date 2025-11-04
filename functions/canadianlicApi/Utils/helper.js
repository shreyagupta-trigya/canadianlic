require("dotenv").config();
const axios = require("axios");
const FormData = require("form-data");

const refreshToken = process.env.REFRESH_TOKEN ?? null;
const clientId = process.env.CLIENT_ID ?? null;
const clientSecret = process.env.CLIENT_SECRET ?? null;
const grantType = process.env.GRANT_TYPE ?? null;
const tokenUri = process.env.ACCOUNT_URI ?? null;
const baseUrl = process.env.CRM_URI ?? null;

// <<<<<<<<<<<<<========= CRM FUNCTIONS ========>>>>>>>>>>>>>>>>>>>>>>>>
async function getAccessToken() {
  console.log("Environment Variables:", {refreshToken,clientId,clientSecret,grantType,tokenUri,baseUrl});
  if (!refreshToken || !clientId || !clientSecret || !grantType || !tokenUri) {
    console.error("One or more environment variables are undefined.");
    return;
  }
  let formData = new FormData();
  formData.append("grant_type", grantType);
  formData.append("client_id", clientId);
  formData.append("client_secret", clientSecret);
  formData.append("refresh_token", refreshToken);
  let config = {
    method: "post",
    url: tokenUri,
    data: formData,
  };
  const accessToken = await axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data.access_token;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
    console.log("<<<<<<<<<<<<<< ========= ACCESSTOKEN GENERATION SUCCESS========== >>>>>>>>>>>>>>>>>>",accessToken);
  return accessToken;
}
async function updateData(accessToken,crmId,module,data) {
  const baseurl = `${baseUrl}/crm/${module}/${crmId}`;
  return axios.put(baseurl,data,{
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    }
  })
  .then((response) => {
    console.log(JSON.stringify(response.data));
    return response.data;
  })
  .catch((error) => {
    console.error("Error:", error);
    throw error;
  });

}
async function getDealCrmData(crmId, accessToken) {
    const  queryArr = [
        `select Deal_Name,Catalyst_Id,Account_Name.Catalyst_Id as Loc_CatalystId, Contact_Name.Catalyst_ID as Con_CatalystId from Deals where ((id = '${crmId}'))  limit 1`,
        `select Deal_Name,Catalyst_Id,Insurance_Lead.Catalyst_ID as Lead_CatalystId,Insurance_Lead_Lookup.Catalyst_ID as LeadIns_CatalystId from Deals where ((id = '${crmId}'))  limit 1`,
    ]
    const crmDataPromises = queryArr.map((query) =>{
        const body = {"select_query":query}
        return axios.post(
            `${baseUrl}/coql`,
            body,{
                headers: {
                    Authorization: `Zoho-oauthtoken ${accessToken}`,
                }
            }
        );
    });
    const crmResponses  = await Promise.all(crmDataPromises);
    const crmData = crmResponses.map(response => response.data.data[0]);
    console.log("<<<<<<<<<<<<<< ========= CRM DATA FETCHED SUCCESS========== >>>>>>>>>>>>>>>>>>");
    console.log("crmData",crmData);
    
    return crmData;
}
async function getLeadCrmData(crmId, accessToken) {
    const  queryArr = [
        `select Catalyst_ID,Assigned_to_Advisor.Catalyst_ID as Advisor_CatalystId,Location_Name.Catalyst_Id as Location_CatalystId from Leads where ((id = '${crmId}'))  limit 1`,
        `select Catalyst_ID,Referral_Name_Client as Referral_Name_Client,Referral_Name_Others as Referral_Name_Others from Leads where ((id = '${crmId}'))  limit 1`,
    ]
    const crmDataPromises = queryArr.map((query) =>{
      const body = {"select_query":query}
      return axios.post(
          `${baseUrl}/coql`,
          body,{
              headers: {
                  Authorization: `Zoho-oauthtoken ${accessToken}`,
              }
          }
      );
  });
  const crmResponses  = await Promise.all(crmDataPromises);
  console.log("crmResponses",crmResponses);
  
  const crmData = crmResponses.map(response => response.data.data[0]);
    console.log("<<<<<<<<<<<<<< ========= CRM DATA FETCHED SUCCESS========== >>>>>>>>>>>>>>>>>>");
    console.log("crmData",crmData);
    
    return crmData;
}
async function getContactCrmData(crmId, accessToken) {
  const  queryArr = [
      `select Catalyst_ID,Assigned_Advisor.Catalyst_ID as Advisor_CatalystId,Account_Name.Catalyst_Id as Location_CatalystId from Contacts where ((id = '${crmId}'))  limit 1`,
      `select Catalyst_ID,Referral_Name_Client as Referral_Name_Client,Referral_Name_Other_than_Client as Referral_Name_Others from Contacts where ((id = '${crmId}'))  limit 1`,
  ]
  const crmDataPromises = queryArr.map((query) =>{
    const body = {"select_query":query}
    return axios.post(
        `${baseUrl}/coql`,
        body,{
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`,
            }
        }
    );
});
const crmResponses  = await Promise.all(crmDataPromises);
console.log("****************** CRM DATA FETCHED SUCCESS**********************",crmResponses);
const crmData = crmResponses.map(response => response.data.data[0]);
  console.log("crmContactData",crmData);
  
  return crmData;
}
async function getPolicyrmData(crmId, accessToken) {
  const  queryArr = [
      `select Catalyst_Id,Policy_Advisor.Catalyst_ID as Advisor_CatalystId,Location.Catalyst_Id as Location_CatalystId from Policies where ((id = '${crmId}'))  limit 1`,
      `select Catalyst_Id,Client.Catalyst_ID as Policy_Client,Location.Catalyst_Id as Policy_LocationId,Policy_Advisor.Catalyst_ID as Advisor_CatalystId from Policies where ((id = '${crmId}'))  limit 1`,
  ]
  const crmDataPromises = queryArr.map((query) =>{
    const body = {"select_query":query}
    return axios.post(
        `${baseUrl}/coql`,
        body,{
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`,
            }
        }
    );
});
const crmResponses  = await Promise.all(crmDataPromises);
  console.log("****************** CRM DATA FETCHED SUCCESS**********************",crmResponses);
  // const crmData = crmResponses.map(response => response?.data?.data[0]);

  //   return crmData;
  const crmData = crmResponses.map(response => {
    // Check if response is empty and return a default value if so
    if (response?.data?.data && response.data.data.length > 0) {
      return response?.data?.data[0];
    } else {
      // Return a default empty object or `null` if data is missing
      return {};
    }
  });
  console.log("crmContactData",crmData);
}

// <<<<<<<<<<<<<========= CATALYST FUNCTIONS ========>>>>>>>>>>>>>>>>>>>>>>>>
async function insertData(catalystApp, tableName, data) {
  try {
    const table = catalystApp.datastore().table(tableName);
    const insertedRow = await table.insertRow(data);
    return insertedRow.ROWID;
  } catch (error) {
    console.error(`Error inserting data into ${tableName}:`, error);
    throw error;
  }
}
async function updateData(catalystApp, tableName, data) {
  try {
    const table = catalystApp.datastore().table(tableName);
    const updateRow = await table.updateRow(data);
    return updateRow?.ROWID;
  } catch (error) {
    console.error(`Error inserting data into ${tableName}:`, error);
    throw error;
  }
}
async function deleteData(catalystApp, tableName, data) {
  // try {
  //   const table = catalystApp.datastore().table(tableName);
  //   const updateRow = await table.(data);
  //   return updateRow;
  // } catch (error) {
  //   console.error(`Error inserting data into ${tableName}:`, error);
  //   throw error;
  // }
}
async function insertSubformData(catalystApp, tableName, data,id,module) {
  try {
    const dataArr = data.map(item => {
      return {
        ...item,
        ...(module === "deals" ? { dealId: id } :
            module === "leads" ? { leadId: id } :
            module === "advisor" ? { advisorId: id } :
            module === "policy" ? { policyId: id } :
          {})
      }
    })
    if(data.length > 0){
      const table = catalystApp.datastore().table(tableName);
      const insertedRow = await table.insertRows(dataArr);
      return insertedRow.map(item => item.ROWID);
      // return dataArr;
    }
    else{
      return [];
    }
  } catch (error) {
    console.error(`Error inserting data into ${tableName}:`, error);
    throw error;
  }
}
async function updateSubformData(catalystApp, tableName, data) {
  try {
    const table = catalystApp.datastore().table(tableName);
    const updateRow = await table.updateRows(data);
    return updateRow;
  } catch (error) {
    console.error(`Error Updating data into ${tableName}:`, error);
    throw error;
  }
}
async function deleteSubformData(catalystApp, tableName, data) {
  try {
    const table = catalystApp.datastore().table(tableName);
    const updateRow = await table.updateRows(data);
    return updateRow;
  } catch (error) {
    console.error(`Error inserting data into ${tableName}:`, error);
    throw error;
  }
}
// <<<<<<<<<<<<<========= DATE FORMAT FUNCTIONS ========>>>>>>>>>>>>>>>>>>>>>>>>
async function  dateTimeFormat(date) {
    const dateFormat = new Date(date);
    dateValue = dateFormat.toISOString().split('T')[0];
    timeVaue = dateFormat.toISOString().split('T')[1].split('.')[0].split(':');
    return dateValue + " " + timeVaue[0] + ":" + timeVaue[1]+":"+timeVaue[2];
}

module.exports = {
  dateTimeFormat, 
  insertData, 
  updateData, 
  deleteData, 
  insertSubformData, 
  updateSubformData, 
  deleteSubformData,
  getAccessToken,
  getDealCrmData,
  getLeadCrmData,
  getContactCrmData,
  getPolicyrmData
};
