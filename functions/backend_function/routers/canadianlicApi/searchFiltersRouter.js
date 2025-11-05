const express = require('express');
const searchRouter = express.Router();

const { testSearchConnection , getRecords } = require("../controller/searchFilters/searchFilters.js");

searchRouter.get("/test-connection", testSearchConnection);
searchRouter.post("/get-search-records/:id?", getRecords);

module.exports = searchRouter;