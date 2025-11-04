"use strict";

const express = require("express");

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const locationRouter=require("./Routes");

app.use("/api/v1",locationRouter);


module.exports = app;
