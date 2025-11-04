const express = require('express');
const app = express();
const cors =  require("cors");

const router = require("./router/router");
app.use(express.json());
app.use(cors());
app.use("/api/v1",router);

module.exports = app;