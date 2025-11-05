const express = require("express");
const cors = require("cors")
const app =  express();
app.use(cors());
app.use(express.json());

const leadRouter = require("./routers/lead/router");
const contactRouter = require("./routers/contact/router");
const dealRouter = require("./routers/deals/router");
const crmIntegrationRouter = require("./routers/crmIntegration/router");
const csvimportRouter = require("./routers/csvimport/router");
const demothemeRouter = require("./routers/demotheme_function/router");
const insurancePartnerRouter = require("./routers/insurancePartner/router");
const insurancePartnerRoutes = require("./routers/insurancePartner/Routes");
const investmentRouter = require("./routers/investment/routes");
const advisorFunctionRouter = require("./routers/advisorFunction/router");
const productFunctionRouter = require("./routers/productFunction/router");
const referralFunctionRouter = require("./routers/referralFunction/router");
const uatServerFunctionRouter = require("./routers/uatServerFunction/router");
const usersFunctionRouter = require("./routers/usersFunction/router");
const utilsFunctionRouter = require("./routers/utilsFunction/routes");
const canadianlicApiRouter = require("./routers/canadianlicApi/router");
const mailFunctionRouter = require("./routers/mailFunction/router");
const locationsRouter = require("./routers/locations/Routes");

app.use("/api/v1", leadRouter);
app.use("/api/v1", contactRouter);
app.use("/api/v1", dealRouter);
app.use("/api/v1", crmIntegrationRouter);
app.use("/api/v1", csvimportRouter);
app.use("/api/v1", demothemeRouter);
app.use("/api/v1", insurancePartnerRouter);
app.use("/api/v2", insurancePartnerRoutes);
app.use("/api/v1", investmentRouter);
app.use("/api/v1", advisorFunctionRouter);
app.use("/api/v1", productFunctionRouter);
app.use("/api/v1", referralFunctionRouter);
app.use("/api/v1", uatServerFunctionRouter);
app.use("/api/v1", usersFunctionRouter);
app.use("/api/v1", utilsFunctionRouter);
app.use("/api/v1", canadianlicApiRouter);
app.use("/api/v1", mailFunctionRouter);
app.use("/api/v1", locationsRouter);

module.exports=app;
