var catalyst = require("zcatalyst-sdk-node");
const NodeCache = require("node-cache");
const query = require("../SQL/queries");
const util = require("../Utils/util");
const cache = new NodeCache();
// ****************CRM FUNCTION**************
const {dataSyncZcrm,generateToken} = require("../crmIntegration/crmIntegrationController");
exports.testcredential = (req, res) => {
    res.status(200).json({ success: true, message: "I am Live and Ready from advisorCrd controller." });
  };

  exports.getAllAdvisorCredentialById = async (req, res) => {
    // const ids = req.query.id;
    // console.log("ids",ids);
      let query;     
        query = `SELECT * FROM advisorCredential WHERE ROWID = ${req.query.id}`;
      catalyst
        .initialize(req, { scope: "admin" })
        .zcql()
        .executeZCQLQuery(query)
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((error) => {
          res.status(500).json({
            success: false,
            message: "Issue pulling user data",
            error: error,
          });
        });
  };
  exports.getAllAdvisorCredential = async (req, res) => {
    try {
      const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 if not provided
      const offset = parseInt(req.query.offset, 10) || 0; // Default to 0 if not provided
  
      const adminApp = catalyst.initialize(req, { scope: "admin" });
  
      // Query to get the total count of records
      const totaladvisorCredentialQuery = 'SELECT COUNT(advisorCredential.ROWID) FROM advisorCredential';
      const totalAdvResult = await adminApp.zcql().executeZCQLQuery(totaladvisorCredentialQuery);
      // console.log("totalAdvResult", totalAdvResult[0].advisorCredential);
      if (!totalAdvResult || totalAdvResult.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No records found",
        });
      }
  
      const totalCount = totalAdvResult[0].advisorCredential;
      const totalPages = Math.ceil(totalCount / limit);
      console.log("totalCount",totalCount);
      // Query to get the paginated data
      let dataQuery;
      if (!req.params.id) {
        dataQuery = `SELECT 
            advisorCredential.*, 
            contacts.firstName AS contactFirstName, 
            contacts.lastName AS contactLastName, 
            contacts.ROWID AS contactROWID, 
            advisors.firstName AS advisorFirstName, 
            advisors.lastName AS advisorLastName,
            insurencePartner.partnerName
        FROM 
            advisorCredential 
        LEFT JOIN 
            contacts ON advisorCredential.contractedAdvisorListing = contacts.ROWID
        LEFT JOIN 
            advisors ON advisorCredential.advisorCredentialsOwner = advisors.ROWID
        LEFT JOIN 
            insurencePartner ON advisorCredential.insurancePartnerListing = insurencePartner.ROWID
            ORDER BY advisorCredential.CREATEDTIME DESC
        LIMIT ${limit} OFFSET ${offset}`;
      } else {
        dataQuery = `SELECT * FROM advisorCredential WHERE ROWID = ${req.params.id}`;
      }  
      const dataResult = await adminApp.zcql().executeZCQLQuery(dataQuery);
      console.log("dataResult", dataResult);
      const credRecord = dataResult.map(item => ({
        mga: item.advisorCredential.mga,
        MODIFIEDTIME: item.advisorCredential.MODIFIEDTIME,
        userId: item.advisorCredential.userId,
        contractedAdvisorListing:  `${item.contacts.firstName} ${item.contacts.lastName}`,  // Correct reference
        CREATEDTIME: item.advisorCredential.CREATEDTIME,
        ROWID: item.advisorCredential.ROWID,
        advisorCredentialsOwner: `${item.advisors.firstName} ${item.advisors.lastName}`, // Correct reference
        insurancePartnerListing: item.insurencePartner.partnerName, 
      }));
      res.status(200).json({
        success: true,
        data: credRecord,
        totalCount: totalCount['COUNT(ROWID)'], 
        totalPages,
        limit,
        currentPage: Math.ceil(offset / limit) + 1,
        totalPages: Math.ceil(totalCount['COUNT(ROWID)'] / limit),
      });
    } catch (error) {
      console.error("Error fetching advisor credential data:", error);
      res.status(500).json({
        success: false,
        message: "Issue pulling user data",
        error: error.message || error,
      });
    }
  };
  
  
  exports.addAdvisorCredential = async (req, res) => {  
    const payload = req.body;
    // const hashedPassword = await bcrypt.hash(payload.password, 10);
    const data = {
      contractedAdvisorListing: payload.contractedAdvisorListing ?payload.contractedAdvisorListing: null,
      advisorCredentialsOwner: payload.advisorCredentialsOwner ? payload.advisorCredentialsOwner:null,
      insurancePartnerListing: payload.insurancePartnerListing ? payload.insurancePartnerListing: null,
      mga: payload.mga ? payload.mga	:null,
      userId: payload.userId ? payload.userId:null,
    };
    try {
      const adminApp = catalyst.initialize(req, { scope: "admin" });
      const response = await adminApp
        .datastore()
        .table("advisorCredential")
        .insertRow(data);
        const id = response.ROWID;
        // const token = await generateToken();
        // const crmId = await dataSyncZcrm(token,{...data,ROWID:id});
        // console.log("crmId:===> ", crmId);        
        //await adminApp.datastore().table("advisorCredential").updateRow({sourceId:crmId,source:"catalyst",ROWID:id});
        
      res.status(200).json({
        success: true,
        message: "Advisor Credential Added Successfully...!!!",
        ROWID: response.ROWID,
      });
    } catch (error) {
      console.log(error);
      res.status(409).json({
        success: false,
        message: "Company Added unsuccessfully...!!!",
        error: error,
      });
    }
  };
  exports.updateAdvisorCredential = async (req, res) => {
    const payload = req.body;
    const data = req.params.id
      ? {
        contractedAdvisorListing: payload.contractedAdvisorListing ?payload.contractedAdvisorListing: null,
        advisorCredentialsOwner: payload.advisorCredentialsOwner ? payload.advisorCredentialsOwner:null,
        insurancePartnerListing: payload.insurancePartnerListing ? payload.insurancePartnerListing: null,
        mga: payload.mga ? payload.mga	:null,
        userId: payload.userId ? payload.userId:'',
       ROWID:req.params.id,
        }
      : payload.map((payload) => ({
        contractedAdvisorListing: payload.contractedAdvisorListing ?payload.contractedAdvisorListing: null,
        advisorCredentialsOwner: payload.advisorCredentialsOwner ? payload.advisorCredentialsOwner:null,
        insurancePartnerListing: payload.insurancePartnerListing ? payload.insurancePartnerListing: null,
        mga: payload.mga ? payload.mga	:null,
        userId: payload.userId ? payload.userId:'',
        ROWID:req.params.id,
        }));
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const table = adminApp.datastore().table("advisorCredential");
    try {
      const response = await (req.params.id
        ? table.updateRow({ ...data, ROWID: req.params.id })
        : table.updateRows(data));
      res.status(200).json({
        success: true,
        message: "Advisor Credential Update Successfully...!!!",
        response,
      });
    } catch (error) {
      res.status(409).json({
        success: false,
        message: "Advisor Credential Update unsuccessfully...!!!",
        error: error,
      });
    }
  };
  exports.deleteAdvisorCredential = async (req, res) => {
    try {
      const adminApp = catalyst.initialize(req, { scope: "admin" });
      const ids = req.params.id || req.body.ids;
      if (!ids || ids.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No IDs provided for deletion."
        });
      }     
      let result = await adminApp.zcql().executeZCQLQuery(`${query.deleteAdvisorCrd}(${ids})`);
      res.status(200).json({
        success: true,
        message: "Advisor Credential Deleted Successfully...!!!",
        result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Failed to delete advisor credential.",
        error: error.message,
      });
    }
  };
  