
// <<<<<<<<<<<< OLD CODE >>>>>>>>>>>
const CryptoJS = require('crypto-js');

exports.decryptData=(encryptedData, secretKey)=> {
  const bytes  = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
}
// <<<<<<<<<<<< END OLD CODE >>>>>>>>>>>
