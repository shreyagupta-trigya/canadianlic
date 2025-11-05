var catalyst = require("zcatalyst-sdk-node");
const NodeCache = require("node-cache");
const query = require("../SQL/queries");
const util = require("../Utils/util");
const cache = new NodeCache();
exports.dealConnectionCheck = (req, res) => {
    res.status(200).json({ success: true, message: "I am Live and Ready from dealController." });
  };