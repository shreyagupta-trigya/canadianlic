const catalyst = require("zcatalyst-sdk-node");
const queries = require("../sql/queries.js");

// ********** TEST CONNECTION **********

exports.testVendorConnection = async (req, res) => {
  res.status(200).json({ success: true, message: "I'm live!" });
};
exports.createVendor =  async(req, res)=>{
    try {
        const adminApp = catalyst.initialize(req, { scope: "admin" });
        const formData = req.body;
        const payload = await parseVendorData(formData);
        const vendorResp = await adminApp.datastore().table("vendors").insertRow(payload);
        res.status(200).json({ success: true, message: "Vendor successfull created", vendorResp });
    }catch(error){
        res.status(409).json({ success: true, message: "Vendor not created Successfully"});
    }
}

// ********** VENDORS PARSER DATA **********

async function parseVendorData(formData) {
    return {
        name: formData?.name??"",
        owner: formData?.owner??null,
        referredBy: formData?.referredBy??null,
        exchangeRate: formData?.exchangeRate??"",
        contacts: formData?.contacts??null,
        phone: formData?.phone??"",
        email: formData?.email??"",
        currency: formData?.currency??"",
        street: formData?.street??"",
        postalCode: formData?.postalCode??"",
        state: formData?.state??"",
        country: formData?.country??"",
    }
}