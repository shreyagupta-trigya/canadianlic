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
exports.createInsurancePartner = async (token, insurencePartner, crmId) => {
  try {
    const data = {
      data: [
        {
          Owner:insurencePartner?.sourceId??adminId,
          Vendor_Name: insurencePartner?.partnerName ?? "",
          // Phone: insurencePartner?.phone ?? "",
          // Email: insurencePartner?.email ?? "",
          Fax: insurencePartner?.fax ?? "",
          Street: insurencePartner?.street ?? "",
          Website: insurencePartner?.website ?? "",
          Description:insurencePartner?.description ?? "", 
          Catalyst_Id: insurencePartner?.ROWID ?? "",
        },
      ],
    };
    const baseUrl = `https://www.zohoapis.com/crm/v7/Vendors${(crmId !== null && crmId !== undefined) ? `/${crmId}` : ''}`;

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
