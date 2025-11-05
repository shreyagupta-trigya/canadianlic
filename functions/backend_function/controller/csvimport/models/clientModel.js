const leads = require("./leadsModel");

const lead = leads.leads;
const leadInformation = leads.leadInformations;
const leadDescription = leads.leadDescription;
const leadService = leads.leadService;
const leadConversionHistory = leads.leadConversionHistory;
const familyTree = {
    "Lead ID":"leadId",
    "Relation Ship Status":"relationShipStatus",
    "Contact Id":"contactId",
    "Dependent Parents":"dependentParents",
    "Dependent Children":"dependentChildren",
    "Siblings":"siblings",
    "Number Of Dependent Parents":"numberOfDependentParents",
    "Number Of Siblings":"numberOfSiblings",
    "Emergency Info":"emergencyinfo",
    "Emergency Contact Name":"emergencyContactName",
    "Emergency Contact Phone":"emergencyContactPhone",
    "Emergency Contact Relationship":"emergencyContactRelationship",
    "Emergency Contact Email":"emergencyContactEmail",
    "Name Of Spouse":"nameOfSpouse",
    "Phone Of Spouse":"phoneOfSpouse",
    "Email Of Spouse":"emailOfSpouse",
    "Name Of Common Law Partner":"nameOfCommonLawPartner",
    "Common Law Date Of Birth":"commonLawDateOfBirth",
    "Number Of Spouse":"numberOfSpouse",
    "Number Of Dependent Children":"numberOfDependentChildren",
    "Deal Id":"dealId",
    "Anniversary Date":"anniversaryDate",
    "Spouse Date Of Birth":"spouseDateOfBirth",
    "Advisor Id":"advisorId",
    "Dep Children":"depChildren",
    "Dep Siblings":"depSiblings",
    "Dep Parents":"depParents",
    "Update Family Tree":"updateFamilyTree",
    "Update Family Tree for Supervisa":"updateFamilyTreeforSupervisa"
};

const dependentParents = {
    "Lead ID":"leadId",
    "Contact Id":"contactId",
    "Relationship":"relationship",
    "Name":"name",
    "Email":"email",
    "Phone":"phone",
    "DOB":"dob",
    "Deal Id":"dealId",
    "Age":"age",
    "Advisor Id":"advisorId"
};

const dependentChildren = {
    "Lead ID":"leadId",
    "Contact Id":"contactId",
    "Relationship":"relationship",
    "Name":"name",
    "Email":"email",
    "Phone":"phone",
    "DOB":"dob",
    "Deal Id":"dealId",
    "Age":"age",
    "Advisor Id":"advisorId"
};

const contactsSiblings = {
    "Lead ID":"leadId",
    "Contact Id":"contactId",
    "Relationship":"relationship",
    "Name":"name",
    "Email":"email",
    "Phone":"phone",
    "DOB":"dob",
    "Deal Id":"dealId",
    "Age":"age",
    "Advisor Id":"advisorId"
};

const festivals = {
    "Lead ID":"leadId",
    "Contact Id":"contactId",
    "Deal Id":"dealId",
    "Advisor Id":"advisorId",
    "Festival Name":"festivalName",
    "Date Of Festival":"dateOfFestival"
};

module.exports = {
    lead,
    leadInformation,
    leadDescription,
    leadService,
    leadConversionHistory,
    festivals,
    familyTree,
    dependentParents,
    dependentChildren,
    contactsSiblings
}