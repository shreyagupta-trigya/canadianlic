const catalyst = require("zcatalyst-sdk-node");
require('dotenv').config();
const queries = require("../SQL/sequences");
const getSequence = async (req,tableName) =>  {
    try{
        const catalystApp = catalyst.initialize(req);
        const query = queries.selectUtil(tableName);
        const resp = await catalystApp.zcql().executeZCQLQuery(query);
        const response =  resp[0]?.sequences || 0;
        return{
            success: true,
            data: {
                rowId: response?.ROWID,
                sequence: response?.sequence ?? "",
                tableName: response?.tableName ?? "",
                prefix: response?.prefix ?? ""
            }
        }
    }catch(error){
        return {
            success: false,
            message: "Error getting sequence",
            error: error.message
        }
    }
}
const updateSequence = async (req,rowId,sequence) => {
    try {
        const catalystApp = catalyst.initialize(req);
        const payload = {
            ROWID: rowId,
            sequence: sequence
        }
        const resp = await catalystApp.datastore().table("sequences").updateRow(payload);
        return {success:true,rowId:resp.ROWID};
    }catch(error){
        return {success:false,message:"Error updating sequence",error:error.message};
    }
}
module.exports = {
    getSequence,
    updateSequence
}
