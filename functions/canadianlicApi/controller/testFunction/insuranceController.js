const catalyst = require("zcatalyst-sdk-node");
const {getAccessToken,getPolicyrmData, insertData, insertSubformData} = require("../../Utils/helper");


exports.insuranceConnection = async (req, res) => {
    try {
      res.status(200).json({ success: true, message: "I'm live!" });
    } catch (error) {
      res.status(500).json({ success: false, message: "I'm Not live!" });
    }
};
exports.createInsPartner = async (req, res) => {
    try {
      const catalystApp = catalyst.initialize(req, { scope: "admin" });
      const policyData = req.body?.data?.event_data[0];
  
      if (!policyData) {
        return res.status(400).json({ success: false, message: "Invalid policy data." });
      }
  
      const response = await parsecInsurancePartnerData(catalystApp, policyData);
      res.status(200).json({
        success: true,
        message: "Insurace  successfully created",
        data: response,
      });
    } catch (error) {
      console.error("Error in Insurance:", error);
      res.status(500).json({ success: false, message: "Insurance not created!" });
    }
};
async function parsecInsurancePartnerData(catalystApp, insPartnerData) {
  const layout = insPartnerData?.Layout === "4299079000000475186" ? "Life Policy" : "Travel and Supervisa";
  // const accessToken = await getAccessToken();
  // const catalystRowsArr = await getinsPartnerCrmData(insPartnerData?.id, accessToken);
  // const policyLookupObj = { ...catalystRowsArr[0], ...catalystRowsArr[1] };
  const policyLookupObj='';
  const insPartner = await parseInsurancesData(insPartnerData, policyLookupObj, layout);
  if (insPartnerData.Catalyst_Id === null) {
    const insPartnerId = await insertData(catalystApp, "insurencePartner", {
      ...insPartner,
      source: "crm",
      sourceId: insPartnerData?.id??null
    });  
    console.log("policyId",insPartnerId);
  }
}


async function parseInsurancesData(formData, policyLookupObj, layout) {
  return {
    partnerOwner: formData?.Owner ?? null,
    partnerName: formData?.Vendor_Name ?? '',
    email: formData?.Email ??'',
    phone: formData?.Phone ?? null,
    fax: formData?.Fax ?? null,
    website: formData?.Website ?? '',
    additionalContactInformation: formData?.Additional_Contact_Information ??'',
    advisorListing: formData?.Contracted_Advisor_Listing ??null,
    street: formData?.Street ??'',
    city: formData?.City ??'',
    state: formData?.State ?? '',
    country: formData?.Country ?? '',
    postalCode: formData?.Zip_Code ?? null,
    description: formData?.Description ??null,
    exchangeRate: formData?.Exchange_Rate ?? null,
    //partnerListing: formData?.partnerListing ??'',//not found in crm
    phoneBurnerLastCallOutcome: formData?.phoneburner0__PhoneBurner_Last_Call_Outcome ??'',
    phoneBurnerLastCallTime: formData?.phoneburner0__PhoneBurner_Last_Call_Time ?? null,
    phoneBurnerFollowUpDate: formData?.phoneburner0__PhoneBurner_Follow_Up_Date ?? null,
    contractedAdvisorListing: formData?.Contracted_Advisor_Listing ??'',
    // emailOptOut: formData?.Email_Opt_Out ?? false,
  }  
}
