const catalyst = require("zcatalyst-sdk-node");

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

exports.updateSubFormData = async (formData, req, tableName) => {
  const catalystApp = catalyst.initialize(req, { scope: "admin" });
  try {
    const updateOldDataResult = await catalystApp
      .datastore()
      .table(tableName)
      .updateRows(formData);

    return resizeBy.status(200).json({
      success: true,

      message: "data deleted and updated and created successfully",
      deleteResult,
      createResult,
      updateOldDataResult,
    });
  } catch (error) {}
};

exports.deleteDataFromTable = async (catalystApp, tableName, condition) => {
  try {
    // Construct the DELETE query
    let query;
    if (typeof condition === "object") {
      // If condition is an object, construct query with WHERE clause
      const conditions = Object.entries(condition)
        .map(([key, value]) => `${key}='${value}'`)
        .join(" AND ");
      query = `DELETE FROM ${tableName} WHERE ${conditions}`;
    } else {
      // If condition is a single value, assume it's the ROWID
      query = `DELETE FROM ${tableName} WHERE ROWID='${condition}'`;
    }

    // Execute the DELETE query
    const result = await catalystApp.zcql().executeZCQLQuery(query);

    // Return the result of the DELETE operation
    return result;
  } catch (error) {
    // If an error occurs, throw it to be caught by the caller
    throw error;
  }
};

exports.insertMultipleRowsIntoTable = async (
  table_name,
  row_data,
  req,
  policyResult,
  id = null
) => {
  // Initialize Zoho Catalyst SDK
  const sdk = catalyst.initialize(req, { scope: "admin" });

  // Get datastore service
  const datastore_service = sdk.datastore();

  // Append contactId field to each row
  row_data.forEach((row) => {
    row.policyId = policyResult.ROWID;
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

exports.deleteById = async (tableName, deleteData, req) => {
  const catalystApp = catalyst.initialize(req, { scope: "admin" });
  console.log("this is delete data",deleteData)
  
let rowIds = deleteData.map(contact => contact.ROWID);
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
