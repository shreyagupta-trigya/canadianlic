const catalyst = require("zcatalyst-sdk-node");
const axios = require("axios");
require("dotenv").config();
// const pageSize = process.env.PAGE_SIZE;
const grant_type = process.env.GRANT_TYPE;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const refresh_token = process.env.REFRESH_TOKEN;
const tokenUrl = process.env.ACCOUNT_URI;
const CRM_URI = process.env.CRM_URI;
const adminId  = process.env.ADMINID;

// ********************CREATE NEW RECORD IN CRM *******************
exports.dataSyncZcrm = async (token, formData, crmId) => {
  try {
    const data = {
      data: [
        {
          Owner:formData?.sourceId??adminId,
          Rating: formData?.rating ?? "",
          Account_Name: formData?.locationName ?? "",
          Phone: formData?.phone ?? "",
          // Parent_Account: formData?.fax ?? "",
          Fax: formData?.fax ?? "",
          Employees: formData?.employees ?? "",
          Website:formData?.website ?? "", 
          // Currency:formData?.currency ?? "", 
          // Location_Discount_Factor:formData?.discountFactor ?? "", 
          // Exchange_Rate:formData?.exchangeRate ??null, 
          // phoneburner0__PhoneBurner_Follow_Up_Date:formData?.phoneBurnerFollowUpDate ?? null, 
          // phoneburner0__PhoneBurner_Last_Call_Outcome:formData?.phoneBurnerLastCallOutcome ?? "", 
          // phoneburner0__PhoneBurner_Last_Call_Time:formData?.phoneBurnerLastCallTime ?? "", 
          // *****BILLING ADDRESS **** 
          Billing_Street:formData?.street ?? "", 
          Shipping_Street:formData?.shipmentStreet ?? "", 
          Billing_City:formData?.city ?? "", 
          Shipping_City:formData?.shipmentCity ?? "", 
          Billing_State:formData?.state ?? "", 
          Shipping_State:formData?.shipmentState ?? "", 
          Billing_Code:formData?.postalCode ?? "", 
          Shipping_Code:formData?.shipmentPostalCode ?? "", 
          Billing_Country:formData?.country ?? "", 
          Shipping_Country:formData?.shipmentCountry ?? "", 
          Description:formData?.description ?? "", 
          Catalyst_Id: formData?.ROWID ?? "",
          // // ***** Annual Performance Track PERFORMANCE DATA ****
          // Revenue_Yield_Tracking: formData?.AnnualPerformance?.AnnualPerformance?.map((performance) => ({
          //   Agent_Annual_Revenue_Yield: performance.annualRevenue ?? "",
          //   Annual_Revenue: performance.annualRevenue ?? "",
          //   Client_Annual_Revenue_Yield: performance.advisorAnnualRevenueYield ?? "",
          //   No_of_Clients_at_Year_End: performance.clientAnnualYield ?? "",
          //   Number_of_Agents_at_Year_End: performance.noOfAdvisorsAtEnd ?? "",
          //   Year: performance.year ?? "",
          // })) ?? [],
          // ***** Rolling Performance Track PERFORMANCE DATA ****
          // Annual_Performance_Track: formData?.Rolling?.RollingData?.map((rolling)=>({
          //   // Agent_Monthly_Yield: rolling?.Agent_Annual_Revenue_Yield??"",
          //   // Client_Monthly_Yield: rolling?.Annual_Revenue??"",
          //   // Monthly_Agent_Yield: rolling?.No_of_Clients_at_Year_End??"",
          //   // Monthly_Client_Yield: rolling?.Number_of_Agents_at_Year_End??"",
          //   Month: rolling?.months??"",
          //   Monthly_Revenue: rolling?.monthlyRevenue??"",
          //   Number_of_Agents: rolling?.numberOfAdvisor??"",
          //   Number_of_Clients: rolling?.numberOfClient??"",
          //   Year: rolling?.year??"",
          // }))??[],
        }
      ]
    };
    const baseUrl = `https://www.zohoapis.com/crm/v7/Accounts${(crmId !== null && crmId !== undefined) ? `/${crmId}` : ''}`;

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
    // console.log("config===>", JSON.stringify(data));
    const response = await axios.request(config);
    // console.log("crm id", response?.data?.data[0]?.details?.id);
    return response?.data?.data[0]?.details?.id; // Pass olny the CRM ID
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
