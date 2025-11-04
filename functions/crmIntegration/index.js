const {createLead,createDeal,createContact,createLocation,createPolicy,createInvestment} = require("./Controller/catalystIntegration");
const catalyst = require('zcatalyst-sdk-node');
module.exports = async(event, context) => {
  const app = catalyst.initialize(context);
  try {
    const DATA = event.data; //event data
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<==== DATA LOG =====>>>>>>>>>>>>>>>>>>>>>>>',DATA);
    const crmData = DATA.event_data[0];
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<==== crmData LOG =====>>>>>>>>>>>>>>>>>>>>>>>',crmData);
    const signals = DATA.signal_info 
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<==== signals LOG =====>>>>>>>>>>>>>>>>>>>>>>>',signals);
    let catalystLog;
    if(signals?.publisher_module_api_name === "Leads") {
      catalystLog = await createLead(crmData,app);
    }
    else if(signals?.publisher_module_api_name === "Deals") {
      catalystLog = await createDeal(crmData,app);
    }  
    else if(signals?.publisher_module_api_name === "Contacts") {
      catalystLog = await createContact(crmData,app);
    }
    else if(signals?.publisher_module_api_name === "Accounts") { // Locations Module
      catalystLog = await createLocation(crmData,app);
    }
    else if(signals?.publisher_module_api_name === "Policies") {
      catalystLog = await createPolicy(crmData,app);
    }
    else if(signals?.publisher_module_api_name === "Investments") {
      catalystLog = await createInvestment(crmData,app);
    }
    // else if(signals?.publisher_module_api_name === "Vendors") {
    //   catalystLog = await createInsurancePartner(crmData,app);
    // }
	    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<==== LOG =====>>>>>>>>>>>>>>>>>>>>>>>',catalystLog);
    // const SOURCE_DETAILS = event.getSourceDetails(); //event source details
    // const SOURCE_ACTION = SOURCE_DETAILS.action; //(insert | fetch | invoke ...)
    // const SOURCE_TYPE = SOURCE_DETAILS.type; //(datastore | cache | queue ...)
    // const SOURCE_ENTITY_ID = SOURCE_DETAILS.entityId; //if type is datastore then entity id is tableid

    // const SOURCE_BUS_DETAILS = SOURCE_DETAILS.getBusDetails(); //event bus details
    // const SOURCE_BUS_ID = SOURCE_BUS_DETAILS.id; //event bus id

    // const PROJECT_DETAILS = event.getProjectDetails(); //event project details
    // //const FUNCTION_DETAILS = event.getFunctionDetails(); //event function details
    // const retunMap = {DATA, TIME, SOURCE_DETAILS, SOURCE_ACTION, SOURCE_TYPE, SOURCE_ENTITY_ID, SOURCE_BUS_DETAILS, SOURCE_BUS_ID, PROJECT_DETAILS};
    // console.log('Hello from index.js', retunMap);

    /* 
        CONTEXT FUNCTIONALITIES
    */
    context.closeWithSuccess(); //end of application with success
  } catch (error) {
	  console.log("ERROR", error);
    context.closeWithFailure(error);
  }
};
