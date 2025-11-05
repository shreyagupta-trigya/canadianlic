const express = require("express");
const csvImportRouter = express.Router();

const { importCsvFile } = require("../../controller/csvimport/csvImportController");
const { uploadCsv, testFileConnections } = require("../../controller/csvimport/csvUploadController");

csvImportRouter.post("/import-csv", importCsvFile);
csvImportRouter.post("/upload-csv", uploadCsv);
csvImportRouter.get("/test-connections", testFileConnections);

module.exports = csvImportRouter;
