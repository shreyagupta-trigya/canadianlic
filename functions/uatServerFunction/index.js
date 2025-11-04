const express = require('express');
const catalyst = require('zcatalyst-sdk-node');
const cors = require('cors');
const app = express();
const router = require("./Router/router");
const uatRouter = require("./Router/uatRouter");
// Use the CORS middleware
app.use(cors());

app.use(express.json());
app.use("/api/v1", router);
app.use("/uat/v2", uatRouter);
module.exports = app;
