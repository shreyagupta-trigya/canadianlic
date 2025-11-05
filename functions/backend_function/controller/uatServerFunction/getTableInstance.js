const catalyst = require("zcatalyst-sdk-node");

const getTableInstance = async (req, res) => {
  try {
    const tableId = req.params.id;
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const tableInstance = await adminApp
      .datastore()
      .table(tableId)
      .getAllColumns();
    const columns = tableInstance.map((column) => {
      return {
        filedName: column.column_name,
        dataType:
          column.data_type === "foreign key"
            ? "Lookup"
            : column.data_type === "text"
            ? "MultiLine"
            : column.data_type === "number"
            ? "Number"
            : column.data_type === "boolean"
            ? "Boolean"
            : column.data_type === "date"
            ? "Date"
            : column.data_type === "varchar"
            ? "SingleLine"
            : column.data_type === "datetime"
            ? "DateTime"
            : column.data_type,
      };
    });
    res.status(200).json({ success: true, message: "Table instance", columns });
  } catch (error) {
    console.error("Error getting table instance:", error);
    res.status(500).json({
      success: false,
      message: "Error getting table instance",
      error: error.message,
    });
  }
};

const getAllTabels = async (req, res) => {
  try {
    // const adminApp = catalyst.initialize(req, { scope: "admin" });
    // const tables = await adminApp.datastore().getAllTables();
    // const tableArr = tables.map((table) => {
    //   return {
    //     tableId: table._tableDetails.table_id,
    //     tableName: table._tableDetails.table_name,
    //   };
    // });
    let tableArr = [
      {
        tableId: "22106000000076316",
        tableName: "userSignupData",
      },
      {
        tableId: "22106000000075589",
        tableName: "contacts",
      },
    ];
    const columns = await getTabelCalumns(req, tableArr);
    console.log("columns", columns);
    res.status(200).json({ success: true, message: "Table instance", columns });
  } catch (error) {
    console.error("Error getting all tables:", error);
    res.status(500).json({
      success: false,
      message: "Error getting all tables",
      error: error.message,
    });
  }
};
async function getTabelCalumns(req, tableArr) {
  try {
    const table = catalyst.initialize(req, { scope: "admin" }).datastore();
    let allColumns = await tableArr.forEach(async (element) => {
      const tableInstance = await table.table(element.tableId).getAllColumns();
      const columns = tableInstance.map((column) => {
        return {
          filedName: column.column_name,
          dataType:
            column.data_type === "foreign key"
              ? "Lookup"
              : column.data_type === "text"
              ? "MultiLine"
              : column.data_type === "number"
              ? "Number"
              : column.data_type === "boolean"
              ? "Boolean"
              : column.data_type === "date"
              ? "Date"
              : column.data_type === "varchar"
              ? "SingleLine"
              : column.data_type === "datetime"
              ? "DateTime"
              : column.data_type,
        };
      });
      console.log("columns",columns);
      return columns;
    });
    console.log("allColumns", allColumns);
    return allColumns;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  getTableInstance,
  getAllTabels,
};
