"use strict";

const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const contactRouter = require("./route");
const contactRouter2 = require("./Router/router");
app.use("/api/v1", contactRouter);
app.use("/api/v2", contactRouter2);

module.exports = app;
