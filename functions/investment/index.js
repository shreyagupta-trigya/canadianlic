"use strict";

const express = require("express");

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const investmentRouter = require("./routes");

app.use("/api/v1",investmentRouter);


module.exports = app;
