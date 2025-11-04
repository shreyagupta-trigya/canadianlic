const catalyst = require("zcatalyst-sdk-node");
const axios = require("axios");
require("dotenv").config();
// const pageSize = process.env.PAGE_SIZE;
const grant_type = process.env.GRANT_TYPE;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const refresh_token = process.env.REFRESH_TOKEN;
const tokenUrl =  process.env.ACCOUNT_URI;

const adminUser  = process.env.ADMIN_USER;
const INV_BASE_URL = process.env.INV_BASE_URL
const ORG_ID = process.env.ORG_ID
const CREATOR_BASE_URL = process.env.BASE_URL

exports.testRemoteAssistConnection = async (req, res) => {
     const token = await generateToken();
  res.status(200).json({ success: true, message: "I am live", token });
};

async function generateToken() {
  const baseUrl = `${tokenUrl}?refresh_token=${refresh_token}&client_id=${client_id}&client_secret=${client_secret}&grant_type=${grant_type}`;
  console.log("response", baseUrl);
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
