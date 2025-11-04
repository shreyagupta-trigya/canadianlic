const express = require("express");
const cors = require("cors")
const app =  express();
app.use(cors());
app.use(express.json());

const leadRouter = require("./routers/lead/router");
const contactRouter = require("./routers/contact/router");
const dealRouter = require("./routers/deals/router");

app.use("/api/v1", leadRouter);
app.use("/api/v1", contactRouter);
app.use("/api/v1", dealRouter);

module.exports=app;
