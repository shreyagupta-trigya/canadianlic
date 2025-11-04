
const csvUploadService = require("./services/csvUploadService");
const leadModel = require("./models/leadsModel");
const contactsModel = require("./models/contactsModel");
const usersModel = require("./models/usersModel");
const vendorsModel = require("./models/vendorsModel");
const advisorModel = require("./models/contactAdvisorModel");
const locationsModel = require("./models/locationsModel");
const offeringModel = require("./models/offeringModel");
const advisorCredentialModel = require("./models/advisorCredentialModel");
const policyModel = require("./models/policyModel");
const clientModel = require("./models/clientModel");
const insurencePartnerModel = require("./models/insurencePartnerModel");
const referralModel = require("./models/referralsModel");

exports.testFileConnections = async(req, res) =>{
    res.status(200).json({ success: true, message: "CSV connections are working" });
};
exports.uploadCsv = async (req, res) => {
    try {
        const { bucketName, template,moduleName } = req.body;
        const fileData = req.files?.file?.[0];
        console.log("fileData--->", fileData);
        if (!fileData || (!fileData.originalname.endsWith(".xls") && !fileData.originalname.endsWith(".xlsx"))) {
            return res.status(400).json({ success: false, message: "Only .xls or .xlsx files are allowed" });
        }
        console.log("moduleName--->", moduleName);
        // let availableModels = {};
   
        const availableModels = moduleName === "contacts"
        ? {
            contacts: contactsModel.contacts,
            contactSubDetails: contactsModel.contactSubDetails,
            contactEmergencyDetails: contactsModel.contactEmergencyDetails,
            contactsSiblings: contactsModel.contactsSiblings,
            contactConversionHistory: contactsModel.contactConversionHistory,
            partnerContact: contactsModel.partnerContact,
            festivals:clientModel.festivals,
            familyTree: clientModel.familyTree,
            dependentParents:clientModel.dependentParents,
            dependentChildren:clientModel.dependentChildren,
            contactsSiblings:clientModel.contactsSiblings
        }
        : moduleName === "advisors"
        ? {
            advisors: advisorModel.advisors,
            advisorBonus: advisorModel.advisorBonus,
            advisorFyc: advisorModel.advisorFyc,
            advisorSubDetails: advisorModel.advisorSubDetails,
            festivals:clientModel.festivals,
            familyTree: clientModel.familyTree,
            dependentParents:clientModel.dependentParents,
            dependentChildren:clientModel.dependentChildren,
            contactsSiblings:clientModel.contactsSiblings
        }
        : moduleName === "policies"
        ? {
            policies: policyModel.policies,
            policyCommission: policyModel.policyCommission,
            supervisaPolicySubDetails: policyModel.supervisaPolicySubDetails,
            policySubDetails: policyModel.policySubDetails,
            policyOwnership: policyModel.policyOwnership,
            contingentBeneficiary: policyModel.contingentBeneficiary,
            beneficiary: policyModel.beneficiary
        }
        : moduleName === "users"
        ?{            
            userData: usersModel.userData
        }
        : moduleName === "vendors"
        ? {
            vendors: vendorsModel.vendors
        }
        : moduleName === "locations"
        ? {
            locations: locationsModel.locations
        }
        : moduleName === "offering"?{
            offering: offeringModel.offering
        }
        : moduleName === "advisorCredential" ? {
            advisorCredential: advisorCredentialModel.advisorCredential
        }          
        : moduleName === "leadClients"
        ? {
            leads: clientModel.lead,
            leadInformations: clientModel.leadInformation,
            leadDescription: clientModel.leadDescription,
            leadService: clientModel.leadService,
            leadConversionHistory: clientModel.leadConversionHistory,
            festivals:clientModel.festivals,
            familyTree: clientModel.familyTree,
            dependentParents:clientModel.dependentParents,
            dependentChildren:clientModel.dependentChildren,
            contactsSiblings:clientModel.contactsSiblings
        }:
        moduleName === "leadAdvisors" ? {  
            leads: leadModel.leads,
            leadInformations: leadModel.leadInformations,
            leadsDescription: leadModel.leadDescription,
            leadService: leadModel.leadService,
            leadConversionHistory: leadModel.leadConversionHistory,
            festivals:clientModel.festivals,
            familyTree: clientModel.familyTree,
            dependentParents:clientModel.dependentParents,
            dependentChildren:clientModel.dependentChildren,
            contactsSiblings:clientModel.contactsSiblings
        }   : moduleName === "insurencePartner" ? {
            insurencePartner: insurencePartnerModel.insurencePartner
        }   : moduleName === "referralData" ? {
            referralData: referralModel.referralData
        }   
        :{};  
        
        const result = await csvUploadService.processCsvUpload(req, bucketName, fileData, availableModels);
        console.log("reult--->", result);
        res.status(200).json({
            success: true,
            message: "File processed and uploaded successfully",
            result
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "File processing failed", error: error.message });
    }
};