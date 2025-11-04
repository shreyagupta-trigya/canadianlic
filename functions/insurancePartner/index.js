const express = require("express");

const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const insuranceRouter = require("./Routes");
const router = require("./Router/router");

app.use("/api/v1", insuranceRouter);

app.use("/api/v2", router);


module.exports = app;
