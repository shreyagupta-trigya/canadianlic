const catalyst = require("zcatalyst-sdk-node");
const CryptoJS = require('crypto-js');
exports.insertMultipleRowsIntoTable = async (
  table_name,
  row_data,
  req,
  contactResult,
  id = null
) => {
  // Initialize Zoho Catalyst SDK
  const sdk = catalyst.initialize(req, { scope: "admin" });

  // Get datastore service
  const datastore_service = sdk.datastore();

  // Append contactId field to each row
  row_data.forEach((row) => {
    row.referralDataId = contactResult.ROWID;
  });

  console.log("referralId", row_data);

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

exports.deleteById = async (tableName, deleteData, req) => {
  const catalystApp = catalyst.initialize(req, { scope: "admin" });
  console.log("this is delete data", deleteData);

  let rowIds = deleteData.map((contact) => contact.ROWID);
  try {
    const row_response = await catalystApp
      .datastore()
      .table(tableName)
      .deleteRows(rowIds);
    return row_response;
  } catch (error) {
    return error;
  }
};


exports.decryptData=(encryptedData, secretKey)=> {
    const bytes  = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }
  