require("dotenv").config();
const refreshToken = process.env.REFRESH_TOKEN;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const grantType = process.env.GRANT_TYPE;
const tokenUri = process.env.ACCOUNT_URI;
const redirect_uri = process.env.REDIRECT_URI;
const baseUrl = process.env.CRM_URI;
exports.connectionCheck = async (req, res) => {
    res.status(200).json({ success: true, message: "I'm alive",refreshToken,clientId,clientSecret,grantType,tokenUri,redirect_uri,baseUrl });

}   