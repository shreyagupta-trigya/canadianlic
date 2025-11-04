const express = require('express');
const app = express();
const cors =  require("cors");
app.use(express.json());
app.use(cors());
const dealRouter =  require("./router/dealRouter");
const leadRouter =  require("./router/leadRouter");
const advRouter =  require("./router/advRouter");
const clientContactRouter = require("./router/clientContactRouter");
const utilsRouter =  require("./router/utilsRouter");
const policyRouter = require("./router/policyRouter");
const policyInvRouter = require("./router/policyInvestmentRouter");
const insPartnerRouter = require("./router/insPartnerRouter");
const offeringRouter = require("./router/offeringRouter");
const locationRouter = require("./router/locationRouter");
const advisorCredrouter = require("./router/advisorCardRouter");
const refferalRouter = require("./router/refferalRouter");
const vendorRouter =  require("./router/vendorRouter");
const taskRouter=require("./utilRouter/taskRouter");
const meetingRouter=require("./utilRouter/meetingRouter");
const referralClientRouter=require("./utilRouter/referralClientRouter");
const leadDetailUtilRouter=require("./utilRouter/leadDetailUtilRouter");
const notesRouter=require("./utilRouter/leadDetailUtilRouter");
const importCsvRouter = require("./router/fileUpload");
const contactRouter = require("./router/testFunction/contctRouter");
const searchRouter = require("./router/searchFiltersRouter");

app.use("/deal/api/v2", dealRouter);
app.use("/lead/api/v2", leadRouter);
app.use("/contact/api/v2", advRouter);
app.use("/contact/client/api/v2", clientContactRouter);
app.use("/utils/api/v2", utilsRouter);
app.use("/policy/api/v2", policyRouter);
app.use("/finance/inspartner/api/v2", insPartnerRouter);
app.use("/finance/refferal/api/v2", refferalRouter);
app.use("/finance/vendor/api/v2", vendorRouter);
app.use("/offering/api/v2", offeringRouter);
app.use("/location/api/v2", locationRouter);
app.use("/policy/inv/api/v2", policyInvRouter);
app.use("/advisor/card/api/v2", advisorCredrouter);
app.use("/task/api/v2",taskRouter);
app.use("/meetings/api/v2",meetingRouter);
app.use("/remote-assist/api/v2",leadDetailUtilRouter);
app.use("/notes/api/v2",notesRouter);
app.use("/referral-client/api/v2",referralClientRouter);

app.use("/test/contact/api/v2", contactRouter);

// **************UPLOAD CSVFILE***************
app.use("/import-csv-router", importCsvRouter);

// **************SEARCH FILTER API***************
app.use("/search/api/v2", searchRouter);

module.exports = app;