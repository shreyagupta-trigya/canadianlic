const csvImportService = require("./services/csvImportService");
const catalyst = require("zcatalyst-sdk-node");
// exports.testFileImportConnections = async (req, res) => {
//     res.status(200).json({ success: true, message: "CSV connections are working" });
// };
exports.importCsvFile = async (app,DATA) => {
    console.log("app====>",app);
    const parsedAttachments = JSON.parse(formData.attachmentId);
    const { moduleName, ROWID } = formData;
    const fileId = parsedAttachments[0]?.id;
    console.log("moduleName, ROWID", moduleName, ROWID);
    try {
        const { 
            moduleName,
            leadsFileId, 
            leadInformationsFileId, 
            leadsDescriptionFileId, 
            leadServiceFileId, 
            leadConversionHistoryFileId, 
            contactsFileId,
            contactSubDetailsFileId,
            contactEmergencyDetailsFileId,
            contactsSiblingsFileId,
            contactConversionHistoryFileId,
            partnerContactFileId,
            advisorsFileId,
            advisorCredentialFileId,
            advisorBonusFileId,
            advisorFycFileId,
            advisorSubDetailsFileId,
            locationFileId,
            offeringFileId,
            policiesFileId,
            policyCommissionFileId,
            supervisaPolicySubDetailsFileId,
            policySubDetailsFileId,
            policyOwnershipFileId,
            festivalsFileId,
            familyTreeFileId,
            dependentParentsFileId,
            dependentChildrenFileId,
            bucketName,
            ROWID } = req.body;
        if (!moduleName) {
            return res.status(400).json({ success: false, message: "Module name is required" });
        }
        const app = catalyst.initialize(req, { scope: "admin" });
        const stratus = app.stratus();
        let dataStore = app.datastore().table("dataRequest");


        const files = moduleName === "leadAdvisors" ? {
            leads: leadsFileId,
            leadInformations: leadInformationsFileId,
            leadsDescription: leadsDescriptionFileId,
            leadService: leadServiceFileId,
            leadConversionHistory: leadConversionHistoryFileId,
            familyTree:familyTreeFileId,
            dependentParents:dependentParentsFileId,
            dependentChildren:dependentChildrenFileId,
            contactsSiblings:contactsSiblingsFileId
        }
        : moduleName === "leadClients" ? {
            leads: leadsFileId,
            leadInformations: leadInformationsFileId,
            leadsDescription: leadsDescriptionFileId,
            leadService: leadServiceFileId,
            leadConversionHistory: leadConversionHistoryFileId,
            festivals:festivalsFileId,
            familyTree:familyTreeFileId,
            dependentParents:dependentParentsFileId,
            dependentChildren:dependentChildrenFileId,
            contactsSiblings:contactsSiblingsFileId
        }  
        : moduleName === "users"?{
            userData: leadsFileId
        } 
        : moduleName === "vendors"?{
            vendors: leadsFileId
        } 
        : moduleName === "contacts"?{
            contacts: contactsFileId,
            contactSubDetails: contactSubDetailsFileId,
            contactEmergencyDetails: contactEmergencyDetailsFileId,
            contactsSiblings: contactsSiblingsFileId,
            contactConversionHistory: contactConversionHistoryFileId,
            partnerContact: partnerContactFileId
        } 
        : moduleName === "advisors"?{
            advisors: advisorsFileId,
            advisorCredential: advisorCredentialFileId,
            advisorBonus: advisorBonusFileId,
            advisorFyc: advisorFycFileId,
            advisorSubDetails: advisorSubDetailsFileId
        } 
        :moduleName === "locations" ? {
            locations: locationFileId
        }: 
        moduleName === "offering" ? {
            offering: offeringFileId
        }:
        moduleName === "advisorCredential" ? {
            advisorCredential: advisorCredentialFileId
        }
       : moduleName === "policies" ? {
            policies: policiesFileId,
            policyCommission: policyCommissionFileId,
            supervisaPolicySubDetails: supervisaPolicySubDetailsFileId,
            policySubDetails: policySubDetailsFileId,
            policyOwnership: policyOwnershipFileId
        } 
        : {};

        if (Object.values(files).every(file => !file)) {
            return res.status(400).json({ success: false, message: "No valid file IDs provided" });
        }

        const optionsMap = moduleName === "leadAdvisors" ? {
            leads: { operation: "insert" },
            leadInformations: { operation: "insert", fk_mapping: [{ local_column: "leadId", reference_column: "leadID" }] },
            leadsDescription: { operation: "insert", fk_mapping: [{ local_column: "leadId", reference_column: "leadID" }] },
            leadService: { operation: "insert", fk_mapping: [{ local_column: "leadId", reference_column: "leadID" }] },
            leadConversionHistory: { operation: "insert", fk_mapping: [{ local_column: "leadId", reference_column: "leadID" }] }
        } 
         : moduleName === "leadClients" ? {
            leads: { operation: "insert" },
            leadInformations: { operation: "insert", fk_mapping: [{ local_column: "leadId", reference_column: "leadID" }] },
            leadsDescription: { operation: "insert", fk_mapping: [{ local_column: "leadId", reference_column: "leadID" }] },
            leadService: { operation: "insert", fk_mapping: [{ local_column: "leadId", reference_column: "leadID" }] },
            leadConversionHistory: { operation: "insert", fk_mapping: [{ local_column: "leadId", reference_column: "leadID" }] },
            festivals: { operation: "insert", fk_mapping: [{ local_column: "leadId", reference_column: "leadID" }] },
            familyTree: { operation: "insert", fk_mapping: [{ local_column: "leadId", reference_column: "leadID" }] },
            dependentParents: { operation: "insert", fk_mapping: [{ local_column: "leadId", reference_column: "leadID" }] },
            dependentChildren: { operation: "insert", fk_mapping: [{ local_column: "leadId", reference_column: "leadID" }] },
            contactsSiblings: { operation: "insert", fk_mapping: [{ local_column: "leadId", reference_column: "leadID" }] }
        }
        : moduleName === "users" ?{
            userData: { operation: "insert" }
        }
        : moduleName === "vendors" ?{
            vendors: { operation: "insert" }
        }
        :  moduleName === "contacts" ?{
            contacts: { operation: "insert" },
            contactSubDetails: { operation: "insert", fk_mapping: [{ local_column: "contactId", reference_column: "contactID" }] },
            contactEmergencyDetails: { operation: "insert", fk_mapping: [{ local_column: "contactId", reference_column: "contactID" }] },
            contactsSiblings: { operation: "insert", fk_mapping: [{ local_column: "contactId", reference_column: "contactID" }] },
            contactConversionHistory: { operation: "insert", fk_mapping: [{ local_column: "contactId", reference_column: "contactID" }] },
            partnerContact: { operation: "insert", fk_mapping: [{ local_column: "contactId", reference_column: "contactID" }] }
        } 
        :   moduleName === "advisors" ?{
            advisors: { operation: "insert" },
            advisorCredential: { operation: "insert", fk_mapping: [{ local_column: "advisorCredentialsOwner", reference_column: "appAdvisorId" }] },
            advisorBonus: { operation: "insert", fk_mapping: [{ local_column: "advisorId", reference_column: "appAdvisorId" }] },
            advisorFyc: { operation: "insert", fk_mapping: [{ local_column: "advisorId", reference_column: "appAdvisorId" }] },
            advisorSubDetails: { operation: "insert", fk_mapping: [{ local_column: "advisorId", reference_column: "appAdvisorId" }] }
        } 
        : moduleName === "locations" ? {
            locations: {operation:"insert", fk_mapping: [{ local_column: "locationOwner", reference_column: "userID" }]}
        } 
        : moduleName === "offering" ? {
            offering: {operation:"insert", fk_mapping: [{ local_column: "offeringOwner", reference_column: "userID" }]}
        } 
        : moduleName === "advisorCredential" ? {
            advisorCredential: {operation: "insert", fk_mapping: [{ local_column: "advisorCredentialsOwner", reference_column: "appAdvisorId" },{ local_column: "contractedAdvisorListing", reference_column: "contactID" },{ local_column: "insurancePartnerListing", reference_column: "sourceId" }]}
        } 
        : moduleName === "policies" ?{
            policies: { operation: "insert" },
            policyCommission: { operation: "insert", fk_mapping: [{ local_column: "policyId", reference_column: "policyID" }] },
            supervisaPolicySubDetails: { operation: "insert", fk_mapping: [{ local_column: "policyId", reference_column: "policyID" }] },
            policySubDetails: { operation: "insert", fk_mapping: [{ local_column: "policiesId", reference_column: "policyID" }] },
            policyOwnership: { operation: "insert", fk_mapping: [{ local_column: "policyId", reference_column: "policyID" }] }
        } 
        : {};

        const result = await csvImportService.importCsvdata(app, files, optionsMap, dataStore, ROWID, bucketName);
        console.log("result", result);
        res.status(200).json({ success: true, message: "Import successfully", result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Import failed", error: error.message });
    }
};
