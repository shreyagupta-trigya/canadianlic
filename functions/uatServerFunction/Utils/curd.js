async function insertData(catalystApp, tableName, data) {
    try {
      const table = catalystApp.datastore().table(tableName);
      const insertedRow = await table.insertRow(data);
      return insertedRow.ROWID;
    } catch (error) {
      console.error(`Error inserting data into ${tableName}:`, error);
      throw error;
    }
  }
  
  async function updateData(catalystApp, tableName, data) {
    try {
      const table = catalystApp.datastore().table(tableName);
      const updateRow = await table.updateRow(data);
      return updateRow?.ROWID;
    } catch (error) {
      console.error(`Error inserting data into ${tableName}:`, error);
      throw error;
    }
  }
  
  async function deleteData(catalystApp, tableName, data) {
    // try {
    //   const table = catalystApp.datastore().table(tableName);
    //   const updateRow = await table.;
    //   return updateRow;
    // } catch (error) {
    //   console.error(`Error inserting data into ${tableName}:`, error);
    //   throw error;
    // }
  }
  async function insertSubformData(catalystApp, tableName, data) {
    try {
      const table = catalystApp.datastore().table(tableName);
      const insertedRow = await table.insertRows(data);
      return insertedRow;
    } catch (error) {
      console.error(`Error inserting data into ${tableName}:`, error);
      throw error;
    }
  }
  
  async function updateSubformData(catalystApp, tableName, data) {
    try {
      const table = catalystApp.datastore().table(tableName);
      const updateRow = await table.updateRows(data);
      return updateRow;
    } catch (error) {
      console.error(`Error Updating data into ${tableName}:`, error);
      throw error;
    }
  }
  
  async function deleteSubformData(catalystApp, tableName, data) {
    try {
      const table = catalystApp.datastore().table(tableName);
      const updateRow = await table.updateRows(data);
      return updateRow;
    } catch (error) {
      console.error(`Error inserting data into ${tableName}:`, error);
      throw error;
    }
  }

  module.exports = { insertData, updateData, deleteData, insertSubformData, updateSubformData}