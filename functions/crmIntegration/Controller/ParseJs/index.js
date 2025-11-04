const  { parseDealData } = require("./dealParser");
const { parseLeadData } = require("./leadParser");
const { parseContactsData } = require("./contactsParser");
const {parsePolicysData} = require("./policyParse");
const {parseInvestPolicysData} = require("./policyInvestParse");
const {parsecInsurancePartnerData} = require("./insPartnerParse");
const {parseLocationDetails} = require("./locationParse");
const {parseContactsClientData} = require("./contactClientParse")
module.exports = {
  parseDealData,
  parseLeadData,
  parseContactsData,
  parsePolicysData,
  parseInvestPolicysData,
  parsecInsurancePartnerData,
  parseLocationDetails,
  parseContactsClientData
};