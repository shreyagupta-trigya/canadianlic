const catalyst = require("zcatalyst-sdk-node");
async function createRecord(req,module, data) {
    // console.log("data ==>",data);
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const leadResult = await adminApp
      .datastore()
      .table(module)
      .insertRow(data)
      .then((data) => {
        return data.ROWID;
      })
      .catch((error) => {
        console.log(`error in creating ==> ${module}`, error);
        throw error;
      });
    // console.log("leadResult",leadResult);
    return leadResult;
}
async function createBulkRecord(req,module, data) {
    // console.log("data ==>",data);
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const leadResult = await adminApp
      .datastore()
      .table(module)
      .insertRows(data)
      .then((data) => {
        return data.ROWID;
      })
      .catch((error) => {
        console.log(`error in creating ==> ${module}`, error);
        throw error;
      });
    // console.log("leadResult",leadResult);
    return leadResult;
}
async function updateRecord(req,module, data) {
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const leadResult = await adminApp
      .datastore()
      .table(module)
      .updateRow(data)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(`error in creating ==> ${module}`, error);
        throw error;
      });
    return leadResult;
}
async function insertRecords(req,module, data) {

    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const leadResult = await adminApp
      .datastore()
      .table(module)
      .updateRows(data)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(`error in creating ==> ${module}`, error);
        throw error;
      });
    return leadResult;
}
async function updateRecords(req,module, data) {
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const leadResult = await adminApp
      .datastore()
      .table(module)
      .updateRows(data)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(`error in creating ==> ${module}`, error);
        throw error;
      });
    return leadResult;
}
async function  dateTimeFormat(date) {
  const dateFormat = new Date(date);
  dateValue = dateFormat.toISOString().split('T')[0];
  timeVaue = dateFormat.toISOString().split('T')[1].split('.')[0].split(':');
  console.log("dateValue",dateValue)
  console.log("timeVaue",timeVaue)
  return dateValue + " " + timeVaue[0] + ":" + timeVaue[1]+":"+timeVaue[2];
}
module.exports = {
    createRecord,
    createBulkRecord,
    updateRecord,
    insertRecords,
    updateRecords,
    dateTimeFormat
};