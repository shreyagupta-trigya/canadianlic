const catalyst = require("zcatalyst-sdk-node");
const axios = require("axios");
// const { token } = require("morgan");
require('dotenv').config();
// const pageSize = process.env.PAGE_SIZE;
const grant_type = process.env.GRANT_TYPE;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const refresh_token = process.env.REFRESH_TOKEN;
const tokenUrl =  process.env.ACCOUNT_URI;
const CRM_URI = process.env.CRM_URI

// const adminUser  = process.env.ADMIN_USER;
// const INV_BASE_URL = process.env.INV_BASE_URL
// const ORG_ID = process.env.ORG_ID

// exports.testOfferingsConnection = async (req, res) => {
//     try {
//         const token = await generateToken();
//         res.status(200).json({ success: true, message: "I am live" , token});
//     } catch (error) {
//         res.status(500).json({ success: false, message: "I am not live", error: error });
//     }
// };
// exports.createOffering =  async(req, res) =>{

//     try {
//         const offering = req.body;   
//         // console.log("offering==>", offering);    
//         // ******************* SEARCH OFFERING ********************
//         const token = await generateToken();
//         // console.log("token====>>>", token);
//         const crmOfferingId = await serachOffering(token, offering.offeringName);
//         console.log("<<<==CrmOfferingId=>>", crmOfferingId.code);
//       //   if (crmOfferingId.code == "3100") {
//     //     const data = {
//     //       data: {
//     //         Owner: offering.offeringOwner ?? null,
//     //         Product_Name: offering.Product_Name ?? "",
//     //         Product_Active: offering.Product_Active ?? null,
//     //         Product_Category: offering.offeringCategory ?? "",
//     //         Type: offering.offeringType ?? "",           
//     //         Cancellation_Charge_Type: offering.addressLine1 ?? "",
//     //         Product_FYC: offering.productFYCPercent ?? "",
//     //         Product_Bonus: offering.corporateBonusPercent ?? "",
//     //         Description: offering.description ?? "",
//     //       }
//     //     };
  
//     //     const config = {
//     //       url: `https://www.zohoapis.com/crm/v7/Products`,
//     //       method: "post",
//     //       headers: {
//     //         Authorization: `Zoho-oauthtoken ${token}`,
//     //         "Content-Type": "application/json",
//     //       },
//     //       data: JSON.stringify(data),
//     //     };
  
//     //     const response = await axios.request(config);
//     //     console.log("response config >>>>>>>>>", config);
//     //     return response?.data;
//     //   } else if (crmOfferingId.code == '3000') {
//     //     return "Customer Exists";
       
//     //   } else {
//     //     return "Something went wrong";
//     //   }
//     } catch (error) {
//       console.error("Error creating offering:", error);
//       throw error;
//     }
// }

// async function serachOffering(token, offeringName) {
//     try { 
     
//     //   const Product_Name = offeringName;
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
//     //   console.log("Response ===>", response.data);
//       return response.data;
//     } catch (error) {
//       console.error("Error:", error);
//       // throw error.response ? error.response.data : error.message;
//       return error;
//     }
// }

exports.generateToken = async (data)=> {
    console.log("data===>", data)
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
}
