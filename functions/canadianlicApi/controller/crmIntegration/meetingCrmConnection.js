const axios = require("axios");
require("dotenv").config();
const grant_type = process.env.GRANT_TYPE;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const refresh_token = process.env.REFRESH_TOKEN;
const tokenUrl = process.env.ACCOUNT_URI;
const CRM_URI = process.env.CRM_URI;
const adminId  = process.env.ADMINID;
const conttactId  = process.env.CONTACTID;
const insPartnerId  = process.env.INSIRANCEPARTNERID;
const locationId = process.env.LOCATIONID;
const insuranceLeaderId = process.env.INSURANCELEADID

// ******************** CREATE NEW RECORD IN CRM *******************
exports.dataSyncZcrm = async (token, formData, crmId) => {
  console.log("TOKEN", token);
  try {
    //const layout = await layoutName(formData?.layout)
    const parseMeeting = await  parseMeetingData(formData);
    const data = {
      data: [
        {
          Owner:adminId,          
          Catalyst_Id: formData?.ROWID,
          ...parseMeeting
                 
        }
      ],
      "trigger":[
        "approval",
        "workflow",
        "blueprint"
        ]
    };
    // console.log("Formdata CRM====>", JSON.stringify(data));
    const baseUrl = `https://www.zohoapis.com/crm/v7/Events${(crmId !== null && crmId !== undefined) ? `/${crmId}` : ''}`;
    const baseMethod = crmId===null || crmId===undefined?'post':'PUT';   
    const config = {
      url: baseUrl,
      method: baseMethod,
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };
    const response = await axios.request(config);
    return response?.data?.data[0]?.details?.id;
  } catch (error) {
    console.error("Error creating Remote Access:", error);
    return error;
  }
};


exports.generateToken = async () => {
  const baseUrl = `${tokenUrl}?refresh_token=${refresh_token}&client_id=${client_id}&client_secret=${client_secret}&grant_type=${grant_type}`;
  const dataConfig = {
    url: baseUrl,
    method: "post",
  };
  const token = await axios
    .request(dataConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
  return token.access_token;
};
// ************ REMOTE ASSIST INFORMATION DATA PARSER ***********

async function parseMeetingData(data){
    return{       
      // zohobookingstest__Booking_Summary	: data?.bookingSummary ??"",
      Event_Title	: data?.title ??"",
      Start_DateTime	:await dateTimeFormat( data?.meetingDate) ??null,
      End_DateTime	:await dateTimeFormat( data?.toDate) ??null,
      advancedroundrobin__Meeting_Date	:await dateTimeFormat(data?.meetingDate )??null,
      advancedroundrobin__Re_run_round_robin	: data?.reRunRoundRobin ?? "",
      advancedroundrobin__Round_Robin_Processed	: data?.roundRobinProcessed ?? "",
      Description: data?.description ?? "",     
      Catalyst_Id: data?.ROWID??null 
    }
}
// Async function to format date and time to "YYYY-MM-DDTHH:mm"
async function dateTimeFormat(date) {
  if (!date) {   
    return null;
  }
  const dateFormat = new Date(date);
  if (isNaN(dateFormat.getTime())) {   
    return null;
  }
  const datePart = dateFormat.toISOString().split('T')[0];
  const timePart = dateFormat.toTimeString().split(' ')[0];

  return `${datePart}T${timePart}`;
}
