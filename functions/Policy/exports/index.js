const lifePolicy = require("./lifePolicy.js");
const rrsp = require("./rrsp.js");
const tfsa = require("./tfsa.js");
const resp = require("./resp.js");
const visa = require("./travelAndSuperVisa.js");
// <<<<<<<=== Sample Data ========>>>>>>>
const lifePolicySample = require("./sample/lifeSample.js");
const rrspSample = require("./sample/rrspSample.js");
const tfsaSample = require("./sample/tfsaSample.js");
const respSample = require("./sample/respSample.js");
const visaSample = require("./sample/visaSample.js");
module.exports = {
  lifePolicy,
  rrsp,
  tfsa,
  resp,
  visa,
  lifePolicySample,
  rrspSample,
  tfsaSample,
  respSample,
  visaSample,
};
