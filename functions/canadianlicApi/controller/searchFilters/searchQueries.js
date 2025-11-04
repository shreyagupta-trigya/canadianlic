module.exports = {
    getLeadsRecord: `SELECT 
    leads.*, 
    advisors.ROWID AS advisorROWID, 
    advisors.firstName AS advisorFirstName, 
    advisors.lastName AS advisorLastName,
    leadInformations.*, 
    leadService.*,
    userdata.ROWID AS userDataROWID, 
    userData.firstName AS userDataFirstName, 
    userData.lastName AS userDataLastName
FROM leads
LEFT JOIN leadInformations ON leadInformations.leadId = leads.ROWID
LEFT JOIN userData ON leads.insuranceLeadOwner = userData.ROWID 
LEFT JOIN leadService ON leadService.leadId = leads.ROWID
LEFT JOIN advisors ON leads.assignedAdvisor = advisors.ROWID 
%SEARCH_CONDITION%  
ORDER BY CREATEDTIME DESC 
LIMIT %LIMIT% OFFSET %OFFSET%`
    ,

    getDealsRecord: `SELECT deals.*,
                userdata.ROWID AS userDataROWID, userData.firstName AS userDataFirstName, userData.lastName AS userDataLastName ,
                contacts.ROWID AS contactROWID, contacts.firstName AS contactFirstName, contacts.lastName AS contactLastName,
                locations.ROWID AS locationROWID, locations.locationName AS locationName,
                leads.ROWID AS leadROWID, leads.firstName AS leadFirstName, leads.lastName AS leadLastName
                FROM deals
                LEFT JOIN userData ON deals.dealOwner = userData.ROWID
                LEFT JOIN contacts ON deals.contactName = contacts.ROWID
                LEFT JOIN locations ON deals.locationName = locations.ROWID
                LEFT JOIN leads ON deals.insuranceLead = leads.ROWID
                %SEARCH_CONDITION%  ORDER BY CREATEDTIME DESC LIMIT %LIMIT% OFFSET %OFFSET% `,


    getContactsRecord: `SELECT contacts.*, contactSubDetails.*
                    from contacts
                    LEFT JOIN userData ON contacts.contactOwner = userData.ROWID 
                    LEFT JOIN contactSubDetails ON contactSubDetails.contactId = contacts.ROWID 
                    LEFT JOIN contactSubDetails ON contactEmergencyDetails.contactId = contacts.ROWID 
                    %SEARCH_CONDITION%  ORDER BY CREATEDTIME DESC LIMIT %LIMIT% OFFSET %OFFSET% `,


    getAdvisorsRecord: `SELECT ROWID,firstName,lastName,mobile,email,assignedAdvisor,advisorOwner,location
                FROM advisors
                LEFT JOIN userData ON advisors.advisorOwner = userData.ROWID 
                LEFT JOIN contacts ON advisors.assignedAdvisor = contacts.ROWID
                %SEARCH_CONDITION%  ORDER BY CREATEDTIME DESC LIMIT %LIMIT% OFFSET %OFFSET% `,


    getPoliciesRecord: `SELECT policies.*, contacts.ROWID AS contactROWID, contacts.firstName AS contactFirstName, contacts.lastName AS contactLastName
                    FROM policies
                    LEFT JOIN contacts ON policies.client = contacts.ROWID
                    %SEARCH_CONDITION%
                    ORDER BY policies.CREATEDTIME DESC
                    LIMIT %LIMIT% OFFSET %OFFSET% `,


    getInsurencePartnerRecord: `SELECT insurencePartner.*,
                userdata.ROWID AS userDataROWID, userData.firstName AS userDataFirstName, userData.lastName AS userDataLastName
                FROM insurencePartner
                LEFT JOIN userData ON insurencePartner.partnerOwner = userData.ROWID              
                %SEARCH_CONDITION%  ORDER BY CREATEDTIME DESC LIMIT %LIMIT% OFFSET %OFFSET% `,


    // getpartnerContactRecord: `SELECT partnerContact.*, userdata.ROWID AS userDataROWID, userData.firstName AS userDataFirstName, userData.lastName AS userDataLastName
    //                 FROM partnerContact
    //                 LEFT JOIN userData ON partnerContact.contactId = userData.ROWID %SEARCH_CONDITION%  ORDER BY CREATEDTIME DESC LIMIT %LIMIT% OFFSET %OFFSET% `,


    getVendorsRecord: `SELECT vendors.*, userdata.ROWID AS userDataROWID, userData.firstName AS userDataFirstName, userData.lastName AS userDataLastName
                FROM vendors
                LEFT JOIN userData ON vendors.owner = userData.ROWID %SEARCH_CONDITION%  ORDER BY CREATEDTIME DESC LIMIT %LIMIT% OFFSET %OFFSET% `,


    getReferralsRecord: `SELECT referralData.*, userdata.ROWID AS userDataROWID, userData.firstName AS userDataFirstName, userData.lastName AS userDataLastName
                FROM referralData
                LEFT JOIN userData ON referralData.referralOwner = userData.ROWID %SEARCH_CONDITION%  ORDER BY CREATEDTIME DESC LIMIT %LIMIT% OFFSET %OFFSET% `,


    getOfferingRecord: `SELECT * FROM offering %SEARCH_CONDITION%  ORDER BY CREATEDTIME DESC LIMIT %LIMIT% OFFSET %OFFSET% `,

    getLocationsRecord: `SELECT locations.*, userdata.ROWID AS userDataROWID, userData.firstName AS userDataFirstName, userData.lastName AS userDataLastName
                FROM locations
                LEFT JOIN userData ON locations.locationOwner = userData.ROWID %SEARCH_CONDITION%  ORDER BY CREATEDTIME DESC LIMIT %LIMIT% OFFSET %OFFSET% `,

    getAdvisorCredentialRecord: `SELECT advisorCredential.*,
advisors.ROWID AS advisorROWID, 
advisors.firstName AS advisorFirstName, 
advisors.lastName AS advisorLastName,
contacts.ROWID AS contactROWID, 
contacts.firstName AS contactFirstName, 
contacts.lastName AS contactLastName,
insurencePartner.ROWID AS partnerROWID, 
insurencePartner.partnerName AS partnerName
FROM advisorCredential
LEFT JOIN advisors ON advisorCredential.advisorCredentialsOwner = advisors.ROWID
LEFT JOIN contacts ON advisorCredential.contractedAdvisorListing = contacts.ROWID
LEFT JOIN insurencePartner ON advisorCredential.insurancePartnerListing = insurencePartner.ROWID
%SEARCH_CONDITION% 
ORDER BY CREATEDTIME DESC 
LIMIT %LIMIT% OFFSET %OFFSET%`
}