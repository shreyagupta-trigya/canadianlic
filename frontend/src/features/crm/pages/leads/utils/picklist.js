export const insuranceLeadSourceOptions = [
  "-None-",
  "Advisor Generated",
  "Canadian LIC Website",
  "CanadianLIC Website (Critical Illness)",
  "CanadianLIC Website (Super Visa)",
  "CanadianLIC Website (Term Life)",
  "CanadianLIC Website (Whole Life)",
  "Chat",
  "Chat- Created",
  "Cold Call",
  "Email Campaign",
  "Facebook Ads",
  "Google",
  "Google AdWords",
  "Harpreet Puri Website",
  "Home Page",
  "Internal Seminar",
  "Linked In",
  "Radio",
  "Referral",
  "Social Media - Others",
  "Supervisa Insurance Canada",
  "SVIC Website (Super Visa)",
  "Trade Show",
  "Twitter",
  "Vendor Partner Seminar",
  "Walk - Ins",
  "WhatsApp - Canadian LIC",
];
export const insuranceStatusStageColorMap = {
  "-None-": "#9e9e9e", // Grey
  "Not Contacted": "#eb4d4d", // Red
  "Attempted to Contact": "#f27e22", // Orange
  "Contact in Future": "#98d681", // Light Green
  "Contacted & Not Interested": "#f6c1ff", // Light Purple
  "Pre-Qualified": "#5d4ffb", // Dark Purple
  "Appointment": "#4137be", // Indigo
  "Quoted / In Process": "#98d681", // Teal
  "Confirmation of Application Go Ahead by Lead - Life": "#67c480", // Soft Green
  "Confirmation of Application Go Ahead by Lead - Travel / Supervisa": "#25b52a", // Green
  "Confirmation of Application Go Ahead by Lead - Investments": "#9dff00", // Darker Green
  "Junk Lead": "#666666", // Brown
  "Lost & Listed for Future Reactivation": "#9a2e47", // Dark Red
  "Lost & Closed / Archived": "#177ba0", // Blue
  "Escalated": "#90a9fd", // Light Blue
  "Not Qualified": "#666666", // Grey Blue
  "Discovery Call": "#f27e22", // Orange
  "Advisor Lead": "#90a9fd" // Light Blue again for lack of distinct color
};
export const leadStatusStageColorMap = {
  "-None-": "#9e9e9e", // Grey
  "Not Contacted": "#eb4d4d", // Red
  "Email": "#e972fd", // Indigo
  "Call not Answered": "#eb4d4d", // Deep Orange
  "Call Postponed by Lead": "#af38fa", // Light Purple
  "Call Scheduled": "#c4f0b3", // Light Green
  "Lead not Contactable from paid Ads": "#666666", // Dark Grey
  "Wrong Number": "#666666", // Dark Red
  "Appointment Sought": "#c4f0b3", // Medium Purple
  "Appointment Fixed": "#25b52a", // Green
  "Appointment Postponed": "#f6c1ff", // Light Pink
  "Appointment Completed and Pending Quote Request": "#add9ff", // Light Green
  "Quoted": "#98d681", // Soft Green
  "Quoted and Response Awaited": "#67c480", // Teal
  "Info Shared (Travelers)": "#f27e22", // Orange
  "Credit Card Info Pending/Provided": "#616e88", // Grey
  "Create Deal": "#acacac", // Medium Grey
  "Undecided": "#9a2e47", // Deep Red
  "After 3 Months": "#f6c1ff", // Light Purple
  "After 5 Months": "#e972fd", // Purple
  "After 9 Months": "#af38fa", // Purple
  "After 1 Year": "#8a37be" // Darker Purple
};

export const insuranceLeadStatusOptions = [
  { label: "-None-", value: "-None-", color: "#9e9e9e" },
  { label: "Not Contacted", value: "Not Contacted", color: "#f44336" },
  { label: "Attempted to Contact", value: "Attempted to Contact", color: "#f27e22" },
  { label: "Contact in Future", value: "Contact in Future", color: "#8bc34a" },
  { label: "Contacted & Not Interested", value: "Contacted & Not Interested", color: "#ce93d8" },
  { label: "Pre-Qualified", value: "Pre-Qualified", color: "#7e57c2" },
  { label: "Appointment", value: "Appointment", color: "#3f51b5" },
  { label: "Quoted / In Process", value: "Quoted / In Process", color: "#26a69a" },
  { label: "Confirmation of Application Go Ahead by Lead - Life", value: "Confirmation of Application Go Ahead by Lead - Life", color: "#81c784" },
  { label: "Confirmation of Application Go Ahead by Lead - Travel / Supervisa", value: "Confirmation of Application Go Ahead by Lead - Travel / Supervisa", color: "#4caf50" },
  { label: "Confirmation of Application Go Ahead by Lead - Investments", value: "Confirmation of Application Go Ahead by Lead - Investments", color: "#388e3c" },
  { label: "Junk Lead", value: "Junk Lead", color: "#5d4037" },
  { label: "Lost & Listed for Future Reactivation", value: "Lost & Listed for Future Reactivation", color: "#b71c1c" },
  { label: "Lost & Closed / Archived", value: "Lost & Closed / Archived", color: "#1565c0" },
  { label: "Escalated", value: "Escalated", color: "#7986cb" },
  { label: "Not Qualified", value: "Not Qualified", color: "#607d8b" },
  { label: "Discovery Call", value: "Discovery Call", color: "#ff9800" },
  { label: "Advisor Lead", value: "Advisor Lead", color: "#7986cb" }
];

export function getInsuranceLeadStatusColor(label) {
  return insuranceStatusStageColorMap[label] || "#bdbdbd"; // fallback grey
}
export function getleadStatusStageColor(label) {
  return leadStatusStageOption[label] || "#bdbdbd"; // fallback grey
}


export const leadStatusStageOption = [
  { label: "-None-", value: "-None-", color: "#9e9e9e" },
  { label: "Not Contacted", value: "Not Contacted", color: "#f44336" },
  { label: "Email", value: "Email", color: "#3f51b5" },
  { label: "Call not Answered", value: "Call not Answered", color: "#ff5722" },
  { label: "Call Postponed by Lead", value: "Call Postponed by Lead", color: "#ba68c8" },
  { label: "Call Scheduled", value: "Call Scheduled", color: "#8bc34a" },
  { label: "Lead not Contactable from paid Ads", value: "Lead not Contactable from paid Ads", color: "#616161" },
  { label: "Wrong Number", value: "Wrong Number", color: "#b71c1c" },
  { label: "Appointment Sought", value: "Appointment Sought", color: "#7e57c2" },
  { label: "Appointment Fixed", value: "Appointment Fixed", color: "#4caf50" },
  { label: "Appointment Postponed", value: "Appointment Postponed", color: "#f8bbd0" },
  { label: "Appointment Completed and Pending Quote Request", value: "Appointment Completed and Pending Quote Request", color: "#aed581" },
  { label: "Quoted", value: "Quoted", color: "#81c784" },
  { label: "Quoted and Response Awaited", value: "Quoted and Response Awaited", color: "#4db6ac" },
  { label: "Info Shared (Travelers)", value: "Info Shared (Travelers)", color: "#ff9800" },
  { label: "Credit Card Info Pending/Provided", value: "Credit Card Info Pending/Provided", color: "#9e9e9e" },
  { label: "Create Deal", value: "Create Deal", color: "#757575" },
  { label: "Undecided", value: "Undecided", color: "#b71c1c" },
  { label: "After 3 Months", value: "After 3 Months", color: "#e1bee7" },
  { label: "After 5 Months", value: "After 5 Months", color: "#ce93d8" },
  { label: "After 9 Months", value: "After 9 Months", color: "#ba68c8" },
  { label: "After 1 Year", value: "After 1 Year", color: "#ab47bc" }
];

export const referredByOptions = [
  "-None-",
  "Social Media",
  "Radio",
  "Google",
  "Advisor",
  "External Referral",
  "Lead/Client",
  "Mortgage/RealEstate/Accountant",
];

export const preferredContactMethodOption = [
  "-None-",
  "Cell Phone",
  "Home Phone",
  "Work Phone",
  "Email",
  "Tex",
  "Email, Cell Phone, WhatsApp",
];

export const preferredContactTimeOption = [
  "Weekdays - Morning",
  "Weekdays - Afternoon",
  "Weekdays - Evening",
  "Weekends - Morning",
  "Weekends - Afternoon",
  "Weekends - Evening",
  "Weekdays- Weekends- Morning",
  "Weekdays- Weekends- Evening",
  "Weekdays- Weekends- Afternoon",
  "Weekdays- Morning, Afternoon, Evening",
  "Weekends- Morning, Afternoon, Evening",
];

export const understandingOfInsuranceOption = [
  "-None-",
  "Expert",
  "High",
  "Low",
  "Moderate",
  "Unknown",
];

export const additionalContactInformationOption = ["-None-", "Available", "Unavailable"];

export const whattypeofStudentOption = [
  "-None-",
  "International Students in Canada",
  "Canadian Students Studying Abroad",
];

export const tripTypeOption = ["-None-", "Single Trip", "Multiple Trip"];

export const objectType = ["-None-", "Yes", "No"];

export const objectives = ["Yes", "No"];

export const LookingForAdvisor = ["-None-", "Part Time Advisor", "Full Time Advisor"];

export const frame = ["Immediately", "Within 1 month", "Within 3 months", "Within 6 months", "Within 1 year", "More than 1 year"];

export const genderOption = ["-None-", "Unknown", "Male", "Female"];

export const relationShipStatusOptions = [
  "-None-",
  "Single",
  "Married",
  "Divorced",
  "Common Law",
  "Widow",
  "Widower",
];

export const choice = ["-None-", "Unknown", "Yes", "No"];

export const adviosersType = ["Yes", "No"];

export const religionOptions = [
  "-None-",
  "Buddhism",
  "Unknown",
  "Christianity",
  "Hinduism",
  "Islam",
  "Judaism",
  "Sikhism",
  "General"
];

export const festivalsOptions = [
  "Eid-ul-Fitr",
  "Bakr-Eid",
  "Holi",
  "Dussehra",
  "Diwali",
  "Raksha Bandhan",
  "Guru Nanak Jayanti",
  "Guru Gobind Singh Jayanti",
  "Guru Granth Sahib Prakash Divas",
  "Passover",
  "Victoria Day",
  "Family Day",
  "Mother's Day",
  "Thanksgiving",
  "Christmas",
  "New Year",
  "Lohri",
  "Vaisakhi",
  "Father's Day",
];

export const celebratedFestivalsOptions = [
  "Canada Day",
  "New Year",
  "Family Day",
  "Victoria Day",
  "Father's Day",
  "Mother's Day",
];

export const interactionType = ["email", "Call", "Meeting"];

export const lifeInsuranceOption = [
  'Term Life Insurance',
  'Term Universal Life',
  'Permanent Universal Life',
 ' Whole Life',
 ' Participating Whole Life',
  'Non Medical',
  'Permament / T100',
  'Critical Illness',
];

export const livingBenefitsOption = [
 ' Critical Illness',
  ' Disability - Accidental',
 ' Disability - Illness',
  'Hospital Expenses',
 ' Accidental Benefits',
];

export const servicesRequested = [
"Life Insurance",
"Auto Insurance",
"Home Insurance",
"Living Benefits",
'Health & Dental Insurance',
'Travel Insurance',
'Investments',
'Combination or Hybrid Insurance',
'Loan Protection',
'Group Insurance',
'Super Visa Insurance',
'Immigration Services',
'Business Insurance',
];

export const businessLiabilityInsuranceOption = [
  "-None-",
  "Account Receivable Insurance",
  "Builder's Risk Insurance",
  "Business Insurance",
  "Commercial Automobile Insurance",
  "Commercial Property Insurance",
  "Contractor Insurance",
  "Corporate Insurance",
  "Cyber Liability Insurance",
  "Employee Liability Insurance",
  "Environmental Impairment Liability",
  "Garage Insurance",
  "General Liability Insurance",
  "Home Based Business Insurance",
  "Legal Expense Insurance",
  "Malpractice Insurance",
  "Private Client Insurance",
  "Product Liability Insurance",
  "Professional Liability Insurance",
  "Small Medium Business Insurance",
  "Specialty Insurance",
];

export const immigrationServicesOption1 = [
 "Super Visa",
 " Visitor Visa",
  "Work Permit",
  "Study Visa",
 " LMIA",
  "Caregivers",
  "Permanet Residence",
 " Startup Visa Program",
  "Business Visa",
 " Business Immigration - Investment",
  "Canadian Experience Class ( ECE)",
 " Citizenship",
  "Deprotation",
  "Federal Skill Worker",
 "   Temporary Resident Visa ( Business & Toursim)",
 " Provincial Nominee Program - Enterpreneur",
 " Provincial Nominee Program"
];

export const immigrationServicesOption = [
"Super Visa",
"Visitor Visa",
"Study Visa",
"LMIA",
"Caregivers",
"Permanent Residence: Express Entry",
"Startup Visa Program",
"Business Visa",
"Business Immigration - Investment",
"Canadian Experience Class (ECE)",
"Citizenship",
"Deportation",
"Federal Skill Worker",
"Temporary Resident Visa (Business & Tourism)",
"Provincial Nominee Program - Entrepreneur",
"Provincial Nominee Program",
"Decided",
"PR(H&C)"
];

export const travelInsuranceOption = [
  "-None-",
  "Travel",
  "Super Visa",
  "Visitor",
  "International Student",
];

export const autoInsuranceOption = [
  "-None-",
  "Auto Insurance",
  "Bundle Insurance",
  "Boat Insurance",
  "Classic Car Insurance",
  "Private Client Insurance",
  "MotorCycle Insurance",
  "RV Insurance",
  "Snow Mobile Insurance",
  "Commercial Automobile Insurance",
];

export const homeInsuranceOption = [
  "-None-",
  "Home Insurance",
  "Condo Insurance",
  "Tenant Insurance",
  "Cottage Insurance",
  "Rental Property Insurance",
  "Pet Insurance",
];

export const loanProtectionOption = [
  "-None- Insurance Type",
  "Rent Insurance",
  "Mortgage Protection",
  "Loan Protection",
  "Credit Protection",
];

export const investmentsOption = [
  "-None-",
  "Business Insurance",
  "Mutual Funds",
  "TFSA",
  "Seg Funds",
  "Annuities",
  "RRSP",
  "RRSP Loans",
  "RESP",
  "GIC",
  "Savings Account",
  "Pension Plan",
  "RIF",
  "GIA",
];

export const groupInsuranceOption = [
  "-None-",
  "Group Life",
  "Group Disability",
  "Group Accidental Benefits",
  "Group Health & Dental",
  "Group Travel",
  "Group Eye Care",
  "Group Critical Illness",
  "Group Flexible Plan",
];

export const servicesRequestedOptions = ["Life Insurance", "Living Benefits", "Health & Dental Insurance", "Travel Insurance", "Investments", "Combination or Hybrid Insurance", "Loan Protection", "Group Insurance", "Super Visa Insurance", "Business Insurance"];

export const timeframeOption = ["-None-", "3 Month", "6 Month", "1 Year"];

export const productCategoryOption = ["-None-", "Life", "Living Benifit", "Travel", "Health & Dental"];

export const yearOption = ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010"];

export const dependentParentsOption = [
  { name: "Mother", ROWID: "Mother" },
  { name: "Father", ROWID: "Father" },
  { name: "Mother in Law", ROWID: "Mother in Law" },
  { name: "Father in Law", ROWID: "Father in Law" }
];

export const siblingsOption = [
  { name: "Brother", ROWID: "Brother" },
  { name: "Sister", ROWID: "Sister" },
  { name: "Step Brother", ROWID: "Step Brother" },
  { name: "Step Sister", ROWID: "Step Sister" }
];

export const dependentChildrenOption = [
  { name: "Son", ROWID: "Son" },
  { name: "Daughter", ROWID: "Daughter" },
  { name: "Step Son", ROWID: "Step Son" },
  { name: "Step Daughter", ROWID: "Step Daughter" }
];

export const leadStatusOption = [
  "-None-",
  "Not Contacted",
  "Email",
  "Call not Answered",
  "Call Postponed by Lead",
  "Call Scheduled",
  "Lead not Contactable from paid Ads",
  "Wrong Number",
  "Appointment Sought",
  "Appointment Fixed",
  "Appointment Postponed",
  "Appointment Completed and Pending Quote Request",
  "Quoted",
  "Quoted and Response Awaited",
  "Info Shared (Travelers)",
  "Credit Card Info Pending/Provided",
  "Create Deal",
  "Undecided",
  "After 3 Months",
  "After 5 Months",
  "After 9 Months",
  "After 1 Year"
];

export const citizenshipStatusOption = [
  "-None-",
  "Canadian Citizenship",
  "PR",
  "Work Permit",
  "Student"
];

export const referralSourceOption = [
  "-None-",
  "Client",
  "Other than Client"
];

export const currency = [
  "CAD",
  "USD"
];

export const netWorth =[
  "-None-",
  "Unknown",
  "Low",
  "Moderate",
  "High"
];

export const groupInsurance =[
"Group Life",
'Group Disability',
'Group Accidental Benefits',
'Group Health & Dental',
'Group Travel',
'Group Eye Care',
'Group Critical Illness',
'Group Flexible Plan'
];
