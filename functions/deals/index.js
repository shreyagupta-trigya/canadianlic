const express = require('express');
const catalyst = require('zcatalyst-sdk-node');
const app = express();
const cors =  require("cors");

const router = require("./router/Router");
app.use(express.json());
app.use(cors());
app.use("/api/v1",router);

module.exports = app;