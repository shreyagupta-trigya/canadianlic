
const catalyst = require("zcatalyst-sdk-node");
const { importCsvFile } = require("./csvModule/csvImportController");

module.exports = async (event, context) => {
    try {
		const app = catalyst.initialize(context, { scope: "admin" });
        const DATA = event.data[0]; 
        console.log("Event data: ", DATA);

        const SOURCE_DETAILS = event.getSourceDetails();
        const SOURCE_ACTION = SOURCE_DETAILS.action;
        console.log("Event data SOURCE_ACTION: ", SOURCE_ACTION);
		// const datastore =	app.datastore().table("leads");
		// console.log("datastore: ", datastore);

        if (SOURCE_ACTION === "Insert") {    
            await importCsv(app,DATA);
        }

        console.log("Hello from index.js");
        context.closeWithSuccess(); 
    } catch (error) {
        console.error(error);
        context.closeWithFailure();
    }
};

// /**
//  * 
//  * @param {import('./types/event').EventDetails} event 
//  * @param {import('./types/event').Context} context 
//  */
// module.exports = (event, context) => {
// 	/* 
//         EVENT FUNCTIONALITIES
//     */
// 	// const DATA = event.getData(); //event data
// 	// const TIME = event.getTime(); //event occurred time

// 	// const ACTION = event.getAction(); //(insert | fetch | invoke ...)
// 	// const SOURCE = event.getSource(); //(datastore | cache | queue ...)
// 	// const SOURCE_ENTITY_ID = event.getSourceEntityId(); //if type is datastore then entity id is tableid

// 	// const SOURCE_BUS_DETAILS = event.getBusDetails(); //event bus details
// 	// const SOURCE_BUS_ID = SOURCE_BUS_DETAILS.id; //event bus id

// 	// const PROJECT_DETAILS = event.getProjectDetails(); //event project details

// 	console.log('Hello from index.js');

// 	/* 
//         CONTEXT FUNCTIONALITIES
//     */
// 	context.closeWithSuccess(); //end of application with success
// 	// context.closeWithFailure(); //end of application with failure
// };
