"use strict";
const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const status = require ('express-status-monitor')
const fs = require("fs");
dotenv.config();
const app = express();
app.use(status())
app.use(express.json());
app.use(cors());
const router = require("./routes.js")
app.use("/api/v1",router);

module.exports = app;
