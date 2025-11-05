const catalyst = require("zcatalyst-sdk-node");
const axios = require("axios");
const formData = require("form-data");
// const { token } = require("morgan");
require("dotenv").config();
// const pageSize = process.env.PAGE_SIZE;
const grant_type = process.env.GRANT_TYPE;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const refresh_token = process.env.REFRESH_TOKEN;
const tokenUrl = process.env.ACCOUNT_URI;
const CRM_URI = process.env.CRM_URI;
const adminId  = process.env.ADMINID;

// const INV_BASE_URL = process.env.INV_BASE_URL
// const ORG_ID = process.env.ORG_ID

exports.testOfferingsConnection = async (req, res) => {
  try {
    const token = await generateToken();
    res.status(200).json({ success: true, message: "I am live", token });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "I am not live", error: error });
  }
};
// ********************CREATE NEW RECORD IN CRM *******************
exports.createOffering = async (token, newoffering, crmId) => {
  try {
    const data = {
      data: [
        {
          Owner:newoffering?.sourceId??adminId,
          Product_Name: newoffering?.offeringName ?? "",
          Product_Category: newoffering?.offeringCategory ?? "",
          Type: newoffering?.offeringType ?? "",
          Cancellation_Charge_Type: newoffering?.cancellationChargeType ?? "",
          // Product_FYC: newoffering?.productFYCPercent ?? "",
          // Product_Bonus: newoffering?.corporateBonusPercent ?? "",
          Description: newoffering?.description ?? "",
          Catalyst_Id:newoffering?.ROWID ?? "",
        },
      ],
    };
    const baseUrl = `https://www.zohoapis.com/crm/v7/Products${(crmId !== null && crmId !== undefined) ? `/${crmId}` : ''}`;

    const baseMethod = crmId===null || crmId===undefined?'post':'PUT';
    console.log("baseUrl===>", baseUrl);
    console.log("baseMethod===>", baseMethod);
    console.log("crmId===>", crmId);
    
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
    return response?.data; // Pass olny the CRM ID
  } catch (error) {
    console.error("Error creating offering:", error);
    return error;
  }
};

// *************SEARCH RECORD IN CRM ****************
// async function serachOffering(token, offeringName) {
//     try {
//     // console.log("offeringName====>", offeringName);
//       const criteria = `(Product_Name:equals:"${offeringName}")`;
//       const config = {
//         url: `${CRM_URI}/Products/search?criteria=${encodeURIComponent(criteria)}`,
//         method: "get",
//         headers: {
//           Authorization: `Zoho-oauthtoken ${token}`,
//           "Content-Type": "application/json",
//         },
//       };
//       const response = await axios.request(config);
//       console.log("Search offering Response ===>", response?.data);
//       return response.data;
//     } catch (error) {
//       console.error("Error:", error);
//       throw error.response ? error.response.data : error.message;
//       return error;
//     }
// }

exports.generateToken = async () => {
  // console.log("data===>", data)
  console.log("process.env.GRANT_TYPE", process.env.GRANT_TYPE);
  const baseUrl = `${tokenUrl}?refresh_token=${refresh_token}&client_id=${client_id}&client_secret=${client_secret}&grant_type=${grant_type}`;
  // console.log("response", baseUrl);
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
