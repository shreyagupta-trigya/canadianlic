const catalyst = require("zcatalyst-sdk-node");
require('dotenv').config();
const pageSize = process.env.PAGE_SIZE;
const vendorQuery = require("../../SQL/vendorQuery");
const searchQueryBuilder = require("../searchFilters/searchQueryBuilder");

exports.testConnection = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "I'm live!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "I'm not live!" });
  }
};

exports.createVendor = async (req, res) => {
    const adminApp = catalyst.initialize(req,{scope:"admin"});
    const dataStore = adminApp.datastore().table('vendors');
    try{
        const id = req.params.id;
        const formData =  req.body;
        const vendorData =  await parseVendorData(formData);
        const result = await id ? await dataStore.updateRow({...vendorData,ROWID:id}) : await dataStore.insertRow(vendorData);
        const rowId = result.ROWID;
        res.status(200).json({ success: true, message: id ? "Update Vendor successfully" : "Vendor created successfully", rowId });
    }catch(error){
        res.status(500).json({ success: false, message: "Failed to create vendor", error: error });
    }
}

exports.getVendor = async (req, res) => {
    try{
        const app = catalyst.initialize(req, { scope: 'admin' });
        const { search } = req.body;
        const rowId = req.params.id;
        const page = parseInt(req.body.page, 10) || 1;
        const limit = parseInt(req.body.limit, 10) || 10;
        const offset = (page - 1) * limit;
      
        const fieldMapping = {name:"name",vendorType:"vendorType", email:"email", owner:["userData.firstName","userData.lastName"], status:"status", modifiedTime:"MODIFIEDTIME", createdTime:"CREATEDTIME"};
      
        let searchConditions = searchQueryBuilder(search, fieldMapping);
      
        if (rowId) {
            const rowIdCondition = `ROWID = '${rowId}'`;
            searchConditions = searchConditions ? `${searchConditions} AND ${rowIdCondition}` : rowIdCondition;
          }
      
        const whereClause = searchConditions ? `WHERE (${searchConditions})` : '';
        let baseQuery = vendorQuery.getvendors
        let finalQuery = baseQuery
            .replace('%SEARCH_CONDITION%', whereClause)
            .replace('%LIMIT%', limit)
            .replace('%OFFSET%', offset);
        const response = await app.zcql().executeZCQLQuery(finalQuery);       
        const vendor = await parseData(response);
        res.status(200).json({
            success: true,
            message: 'Vendor retrieved successfully',
            vendor
        });
    } catch (error) {
        console.error("Error in getVendor:", error);
        res.status(500).json({
            success: false,
            message: "error in getting vendor"
        });
    }
};
exports.deleteVendor = async (req, res) => {
    const adminApp = catalyst.initialize(req,{scope:"admin"});
    const dataStore = adminApp.zcql();
    const id = req.params.id || req.body.ids;
    try {
        const query =`${vendorQuery.deletevendors}(${id})`;
        // console.log(query);
        const result = await dataStore.executeZCQLQuery(query)
        res.status(200).json({
            success: true,
            message: "Partner deleted successfully",
            id: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
};

exports.getCount = async (req, res) => {
    const adminApp = catalyst.initialize(req,{scope:"admin"});
    const dataStore = adminApp.zcql();
    try{
        const query = vendorQuery.getCount;
        const resultPromise = await dataStore.executeZCQLQuery(query);

        const result = JSON.parse(JSON.stringify(resultPromise).replace("COUNT(ROWID)","count"));
        console.log("result",result);
        const count = result[0]?.vendors.count;
        res.status(200).json({
            success: true,
            message: "Vendor count retrieved successfully",
            count: count
        });
    }   catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
};
async function parseVendorData(data){
    return{
        name: data?.vendorName??"",
        owner:data?.vendorOwner?.trim() ? data?.vendorOwner.trim():null,
        referredBy: data?.referredBy.trim()? data?.referredBy?.trim():null,
        exchangeRate: data?.exchangeRate??null,
        contact : data?.contact.trim()? data?.contact?.trim():null,
        phone: data?.phone??null,
        email: data?.email??null,
        currency: data?.currency??null,
        street: data?.street??null,
        postalCode: data?.postalCode??null,
        state: data?.State??null,
        country: data?.country??null,
        fax:data?.fax ?? null,
        vendorType: data?.vendorType??"",
        website: data?.website??""
    }
}

exports.countVendors = async (req, res) => {
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    let countQuery = "SELECT COUNT(ROWID) FROM vendors";
    try {
        const response = await adminApp.zcql().executeZCQLQuery(countQuery);
        let data = JSON.parse(JSON.stringify(response).replace("COUNT(ROWID)", "total"));
        const total = data?.[0]?.vendors?.total;
        res.status(200).json({
            success: true,
            message: "Vendors Count Fetched Successfully",
            count: total
        });
    } catch (error) {
        res.status(409).json({
            success: false,
            message: "Vendors Count Fetch Issue",
            error: error
        });
    }
  }

async function parseData(dataArr) {
    return dataArr.map(data => {
        return {
            userFirstName: data.userData?.firstName ?? "",
            userLastName: data.userData?.lastName ?? "",
            userId: data.userData?.lastName ?? "",
            vendorType: data.vendors?.vendorType ?? "",
            country: data.vendors?.country ?? "",
            website: data.vendors?.website ?? "",
            postalCode: data.vendors?.postalCode ?? "",
            exchangeRate: data.vendors?.exchangeRate ?? "",
            phone: data.vendors?.phone ?? "",
            street: data.vendors?. street ?? "",
            name: data.vendors?. name ?? "",
            currency: data.vendors?. currency ?? "",
            state: data.vendors?. state ?? "",
            fax: data.vendors?. fax ?? "",
            rowId: data.vendors?.ROWID ?? "",
            email: data.vendors?.email ?? "",
            contactFirstName: data.contacts?.firstName ?? "",
            contactLastName: data.contacts?.lastName ?? "",
           
        }
    })
}