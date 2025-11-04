const standard = require("./dealStandard.js");
const critical = require("./criticalInsurance.js");
const rrsp = require("./rrsp.js");
const lifeInsurance = require("./lifeInsurence.js");

// <<<<<<<<< ======== SAMPLE DATA ======== >>>>>>>>>>
const standardData = require("./sample/standardData.js");
const lifeInsurenceData = require("./sample/lifeInsurence.js");
const rrspData = require("./sample/rrsp.js");
const criticalInsurenceData = require("./sample/criticalInsurence.js");

module.exports = {
standard,
critical,
rrsp,
lifeInsurance,
standardData,
lifeInsurenceData,
rrspData,
criticalInsurenceData
};