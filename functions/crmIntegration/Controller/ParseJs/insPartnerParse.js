const {getAccessToken,getinsPartnerCrmData, insertData, insertSubformData} = require("../../Utils/helper");



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


module.exports = {parsecInsurancePartnerData}