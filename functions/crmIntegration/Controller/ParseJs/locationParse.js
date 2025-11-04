
const {getAccessToken,getPolicyCrmData, insertData, insertSubformData} = require("../../Utils/helper");
async function parseLocationDetails(catalystApp, locationData) {
    const layout = locationData?.Layout === "4299079000000475186" ? "Life Policy" : "Travel and Supervisa";
    // const accessToken = await getAccessToken();
    // const catalystRowsArr = await getPolicyCrmData(locationData?.id, accessToken);
    // const policyLookupObj = { ...catalystRowsArr[0], ...catalystRowsArr[1] };
    const policyLookupObj='';
    const allStats = await getAllStats(locationData, policyLookupObj, layout);
  
    let policies = allStats[0];    

    if (locationData.Catalyst_Id === null) {
      const policiesId = await insertData(catalystApp, "locations", {
        ...policies,
        source: "crm",
        sourceId: locationData?.id??null
      });
      console.log("LocationId",policiesId);
    }
  }
  
  async function getAllStats(crmResp, contactLookupObj, layout) {
    return Promise.all([
      parseLocationData(crmResp),
    ]);
  }
  
async function parseLocationData(crmResp) {  
    return {
      locationOwner: "22106000000065307",
      locationName: crmResp.Account_Name ?? "",
      // email: formData.email ? formData.email : null,
      // parentLocation: crmResp.Parent_Location ?? "",
      phone: crmResp.Phone ?? "",
      fax: crmResp.Fax  ?? "",
      website: crmResp.Website ?? "",
      rating: crmResp.Rating ?? "",
      description: crmResp.Description ?? "",
      currency: crmResp.Currency ?? "",
      employees: crmResp.Employees ?? null,
      discountFactor: crmResp.Location_Discount_Factor ?? null,
      exchangeRate: crmResp.Exchange_Rate ?? "",
      phoneBurnerFollowUpDate: crmResp.phoneburner0__PhoneBurner_Follow_Up_Date ?? null,
      phoneBurnerCallOutcome: crmResp.phoneburner0__PhoneBurner_Last_Call_Outcome ?? "",
      // phoneBurnerFollowUpTime: dateTimeFormat(crmResp.phoneburner0__PhoneBurner_Last_Call_Time) ?? null,
      street: crmResp.Billing_Street ?? "",
      city: crmResp.Billing_City ?? "",
      state: crmResp.Billing_State ?? "",
      postalCode: crmResp.Billing_Code ?? "",
      country: crmResp.Billing_Country ?? "",
      shipmentStreet: crmResp.Shipping_Street ?? "",
      shipmentCity: crmResp.Shipping_City ?? "",
      shipmentState: crmResp.Shipping_State ?? "",
      shipmentPostalCode: crmResp.Shipping_Code ?? "",
      shipmentCountry: crmResp.Shipping_Country ?? "",
      source: "crm",
      sourceId: crmResp?.id
    };
  }

module.exports = {parseLocationDetails}