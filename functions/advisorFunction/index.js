const express = require("express");
const cors = require("cors")
const app =  express();
app.use(cors());
app.use(express.json());

const leadRouter = require("./routes/advisorRouts");
const advRouter = require("./routes/router");

app.use("/api/v1", leadRouter);

app.use("/api/v2", advRouter);

module.exports=app;