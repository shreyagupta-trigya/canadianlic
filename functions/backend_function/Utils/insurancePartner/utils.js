const catalyst = require("zcatalyst-sdk-node");

const CryptoJS = require('crypto-js');
exports.decryptData=(encryptedData, secretKey)=> {
    const bytes  = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }
  exports.insertDataIntoTable = async (catalystApp, tableName, data) => {
    try {
      const result = await catalystApp
        .datastore()
        .table(tableName)
        .insertRow(data);
      return result;
    } catch (error) {
      throw error;
    }
  };
  exports.insertMultipleRowsIntoTable = async (
    table_name,
    row_data,
    req,
    locationResult,
    id = null
  ) => {
    // Initialize Zoho Catalyst SDK
    const sdk = catalyst.initialize(req, { scope: "admin" });
  
    // Get datastore service
    const datastore_service = sdk.datastore();
  
    // Append leadId field to each row
    row_data.forEach((row) => {
      row.locatonId = locationResult.ROWID;
    });
  
    if (id) {
      // Update rows in the table if id is provided
      const update_query = `UPDATE ${table_name} SET ? WHERE id = ?`;
      await datastore_service.query(update_query, [row_data, id]);
      return { success: true, message: "Rows updated successfully" };
    } else {
      // Insert rows into the table if id is not provided
      const row_response = await datastore_service
        .table(table_name)
        .insertRows(row_data);
      return row_response;
    }
  };