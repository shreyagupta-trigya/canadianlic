const csvImportService = require("./services/csvImportService");
const catalyst = require("zcatalyst-sdk-node");
exports.testFileImportConnections = async (req, res) => {
    res.status(200).json({ success: true, message: "CSV connections are working" });
};
exports.importCsvFile = async (req, res) => {
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
            contingentBeneficiaryFileId,
            beneficiaryFileId,
            festivalsFileId,
            familyTreeFileId,
            dependentParentsFileId,
            dependentChildrenFileId,
            insurencePartnerFileId,
            referralDataFileId,
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
            festivals:festivalsFileId,
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
            partnerContact: partnerContactFileId,
            festivals:festivalsFileId,
            familyTree:familyTreeFileId,
            dependentParents:dependentParentsFileId,
            dependentChildren:dependentChildrenFileId
        } 
        : moduleName === "advisors"?{
            advisors: advisorsFileId,
            advisorCredential: advisorCredentialFileId,
            advisorBonus: advisorBonusFileId,
            advisorFyc: advisorFycFileId,
            advisorSubDetails: advisorSubDetailsFileId,
            festivals:festivalsFileId,
            familyTree:familyTreeFileId,
            dependentParents:dependentParentsFileId,
            dependentChildren:dependentChildrenFileId,
            contactsSiblings:contactsSiblingsFileId
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
            policyOwnership: policyOwnershipFileId,
            contingentBeneficiary:contingentBeneficiaryFileId,
            beneficiary:beneficiaryFileId
        }:
        moduleName === "insurencePartner" ? {
            insurencePartner: insurencePartnerFileId
        }:
        moduleName === "referralData" ? {
            referralData: referralDataFileId
        }
        : {};

        if (Object.values(files).every(file => !file)) {
            return res.status(400).json({ success: false, message: "No valid file IDs provided" });
        }

        const optionsMap = moduleName === "leadAdvisors" ? {
            leads: { operation: "insert",fk_mapping: [{ local_column: "insuranceLeadOwner", reference_column: "userID" },{ local_column: "assignedAdvisor", reference_column: "appAdvisorId" },{ local_column: "locationName", reference_column: "sourceId" }] },
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
            vendors: { operation: "insert", fk_mapping: [{ local_column: "owner", reference_column: "userID" }]  }
        }
        :  moduleName === "contacts" ?{
            contacts: { operation: "insert" , fk_mapping: [{ local_column: "contactOwner", reference_column: "userID" },{ local_column: "assignedAdvisor", reference_column: "contactID" }] },
            contactSubDetails: { operation: "insert", fk_mapping: [{ local_column: "contactId", reference_column: "contactID" }] },
            contactEmergencyDetails: { operation: "insert", fk_mapping: [{ local_column: "contactId", reference_column: "contactID" }] },
            contactsSiblings: { operation: "insert", fk_mapping: [{ local_column: "contactId", reference_column: "contactID" }] },
            contactConversionHistory: { operation: "insert", fk_mapping: [{ local_column: "contactId", reference_column: "contactID" }] },
            partnerContact: { operation: "insert", fk_mapping: [{ local_column: "contactId", reference_column: "contactID" }] },
            festivals: { operation: "insert", fk_mapping: [{ local_column: "contactId", reference_column: "contactID" }] },
            familyTree: { operation: "insert", fk_mapping: [{ local_column: "contactId", reference_column: "contactID" }] },
            dependentParents: { operation: "insert", fk_mapping: [{ local_column: "contactId", reference_column: "contactID" }] },
            dependentChildren: { operation: "insert", fk_mapping: [{ local_column: "contactId", reference_column: "contactID" }] }
        } 
        :   moduleName === "advisors" ?{
            advisors: { operation: "insert", fk_mapping: [{ local_column: "assignedAdvisor", reference_column: "contactID" }]  },
            advisorCredential: { operation: "insert", fk_mapping: [{ local_column: "advisorCredentialsOwner", reference_column: "appAdvisorId" }] },
            advisorBonus: { operation: "insert", fk_mapping: [{ local_column: "advisorId", reference_column: "appAdvisorId" }] },
            advisorFyc: { operation: "insert", fk_mapping: [{ local_column: "advisorId", reference_column: "appAdvisorId" }] },
            advisorSubDetails: { operation: "insert", fk_mapping: [{ local_column: "advisorId", reference_column: "appAdvisorId" }] },
            festivals: { operation: "insert", fk_mapping: [{ local_column: "advisorId", reference_column: "appAdvisorId" }] },
            familyTree: { operation: "insert", fk_mapping: [{ local_column: "advisorId", reference_column: "appAdvisorId" }] },
            dependentParents: { operation: "insert", fk_mapping: [{ local_column: "advisorId", reference_column: "appAdvisorId" }] },
            dependentChildren: { operation: "insert", fk_mapping: [{ local_column: "advisorId", reference_column: "appAdvisorId" }] },
            contactsSiblings: { operation: "insert", fk_mapping: [{ local_column: "advisorId", reference_column: "appAdvisorId" }] }
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
            policies: {operation:"insert", fk_mapping: [{ local_column: "policyOwner", reference_column: "userID" },{ local_column: "policyAdvisor", reference_column: "appAdvisorId" }]},
            policyCommission: { operation: "insert", fk_mapping: [{ local_column: "policyId", reference_column: "policyID" }] },
            supervisaPolicySubDetails: { operation: "insert", fk_mapping: [{ local_column: "policyId", reference_column: "policyID" }] },
            policySubDetails: { operation: "insert", fk_mapping: [{ local_column: "policiesId", reference_column: "policyID" }] },
            policyOwnership: { operation: "insert", fk_mapping: [{ local_column: "policyId", reference_column: "policyID" }] },
            contingentBeneficiary: { operation: "insert", fk_mapping: [{ local_column: "policyId", reference_column: "policyID" }] },
            beneficiary: { operation: "insert", fk_mapping: [{ local_column: "policyId", reference_column: "policyID" }] }
        } 
        : moduleName === "insurencePartner" ? {
            insurencePartner: {operation: "insert",fk_mapping: [{ local_column: "partnerOwner", reference_column: "userID" }]},
        } 
        : moduleName === "referralData" ? {
            referralData: {operation: "insert",fk_mapping: [{ local_column: "referralOwner", reference_column: "userID" }]},
        } 
        : {};

        const result = await csvImportService.importCsvdata(app, files, optionsMap, dataStore, ROWID, bucketName);
        console.log("result", result);
        res.status(200).json({ success: true, message: "Import successfully", result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Import failed", error: error.message });
    }
};
