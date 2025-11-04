const express = require("express");
const cors = require("cors")
const app =  express();
app.use(cors());
app.use(express.json());

const leadRouter = require("./router/Router");

app.use("/api/v1", leadRouter);

module.exports=app;
