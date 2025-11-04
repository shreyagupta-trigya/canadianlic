const catalyst=require("zcatalyst-sdk-node");
const queries = require("../../SQL/queries");
const NodeCache = require("node-cache");
const Node = new NodeCache();



// exports.getReferralClientData = async (req, res) => {
//     const adminApp = catalyst.initialize(req, { scope: "admin" });
//     const rowId = req.params.id || req.body.rowId || req.query.rowId;
//     let moduleArr = ["contactEmergencyDetails", "dependentChildren", "dependentParents","contactsSiblings","contactConversionHistory", "festivals",  "leadConversionHistory"];
//     try {
//       let contactDetails = await fetchMainModules(adminApp, rowId);
//       let {contactEmergencyDetailsArr, dependentChildrenArr, dependentParentsArr,contactsSiblingsArr, contactConversionHistoryArr, festivalsArr, leadConversionHistoryArr} =
//         await fetchSubModules(adminApp, rowId, moduleArr);
//       res.status(200).json({
//         success: true,
//         message: "Referral Client data fetched successfully",
//         contactDetails: {
//           ...contactDetails,
//           contactEmergencyDetails: contactEmergencyDetailsArr,
//           dependentChildren: dependentChildrenArr,
//           dependentParents: dependentParentsArr,
//           contactsSiblings: contactsSiblingsArr,
//           contactConversionHistory:contactConversionHistoryArr,
//           festivals: festivalsArr,
//           leadConversionHistory: leadConversionHistoryArr,
//         },
//       });
//     } catch (error) {
//       console.error("Error fetching Referral Client data:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to fetch Deal data",
//         error: error.message || error,
//       });
//     }
//   };

//   async function fetchMainModules(catalystApp, id) {
//     let query = `${queries.referralClientRelatedData} ${id}`;
//     let contactDetails = await catalystApp.zcql().executeZCQLQuery(query);
//     if (!contactDetails || contactDetails.length === 0) {
//       return {};
//     } else {
//       return ({ contacts, contactSubDetails,familyTree,leadInformations } = contactDetails[0]);
//     }  
//   }

//   async function fetchSubModules(catalystApp, id, moduleArr) {
//     const queryMap = {
//       contactEmergencyDetails: `${queries.getContactEmergencyDetails} ${id}`,
//       dependentChildren: `${queries.getDependentChildren} ${id}`,
//       dependentParents: `${queries.getDependentParents} ${id}`,
//       contactsSiblings: `${queries.getContactsSiblings} ${id}`,
//       contactConversionHistory: `${queries.getcontactConversionHistory} ${id}`,
//       festivals: `${queries.festivals} ${id}`,
//       leadConversionHistory: `${queries.getLeadConversionHistory} ${id}`,
//     };
  
//     try {
//       const fetchPromises = moduleArr.map(async (module) => {
//         const query = queryMap[module];
//         const response = await catalystApp.zcql().executeZCQLQuery(query);
//         return response.map((item) => item[module]);
//       });
  
//       const [contactEmergencyDetailsArr, dependentChildrenArr, dependentParentsArr,contactsSiblingsArr,contactConversionHistoryArr,  festivalsArr, leadConversionHistoryArr] =
//         await Promise.all(fetchPromises);
  
//       return { contactEmergencyDetailsArr, dependentChildrenArr, dependentParentsArr,contactsSiblingsArr,contactConversionHistoryArr,  festivalsArr, leadConversionHistoryArr };
//     } catch (error) {
//       console.error("Error fetching sub-modules:", error);
//       throw error;
//     }
//   }

exports.getReferralClientData = async (req, res) => {
    // const contactData = Node.get("contactList");
    // if (contactData) {
    //   return res
    //     .status(200)
    //     .json({ success: true, message: "Contacts data sent successfuly", contactData });
    // }
    // const secretKey = "shgfsyurswr67wr7wguwguwrwrw7fwuygw7it"; // Same secret key used for encryption
    // const encryptedData = req.headers.encrypteddata; // Assuming header key is 'encryptedData'
  
    // let userId, viewOnly, viewAll;
    // // Decrypt the data
    // if (encryptedData) {
    //   const decryptedData = decryptData(encryptedData, secretKey);
    //   [userId, viewOnly, viewAll] = decryptedData.split(",");
    // }
  
    // console.log("This is userId", userId);
  
    const adminApp = catalyst.initialize(req, { scope: "admin" });
  
    try {
      let contactData;
  
    //   if (viewOnly === "true" && viewAll === "false") {
        // Filter contact data based on userId
        // contactData = await adminApp.zcql()
        //   .executeZCQLQuery(`SELECT contacts.*, contactSubDetails.*
        // FROM contacts 
        // LEFT JOIN contactSubDetails ON contactSubDetails.contactId = contacts.ROWID where contactOwner=${userId}`);
    //   } else if (viewAll === "true" || viewOnly === "false") {
        // Get all contact data
        contactData = await adminApp.zcql()
          .executeZCQLQuery(queries.referralClientRelatedData);
    //   }
      Node.set("contactList", contactData);
      console.log("This is contacts data", contactData);
  
      res.status(200).json({
        success: true,
        message: "Contact data fetched successfully",
        contactData,
      });
    } catch (error) {
      // Handle errors
      console.error("Error fetching contact data:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch contact data", error });
    }
  };