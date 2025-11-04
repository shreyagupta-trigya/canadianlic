// src/utils/statusColorMap.js

export const leadStatusStageColorMap = {
  "-None-": "#9e9e9e", // Grey
  "Not Contacted": "#f44336", // Red
  "Email": "#3f51b5", // Indigo
  "Call not Answered": "#ff5722", // Deep Orange
  "Call Postponed by Lead": "#ba68c8", // Light Purple
  "Call Scheduled": "#8bc34a", // Light Green
  "Lead not Contactable from paid Ads": "#616161", // Dark Grey
  "Wrong Number": "#b71c1c", // Dark Red
  "Appointment Sought": "#7e57c2", // Medium Purple
  "Appointment Fixed": "#4caf50", // Green
  "Appointment Postponed": "#f8bbd0", // Light Pink
  "Appointment Completed and Pending Quote Request": "#aed581", // Light Green
  "Quoted": "#81c784", // Soft Green
  "Quoted and Response Awaited": "#4db6ac", // Teal
  "Info Shared (Travelers)": "#ff9800", // Orange
  "Credit Card Info Pending/Provided": "#9e9e9e", // Grey
  "Create Deal": "#757575", // Medium Grey
  "Undecided": "#b71c1c", // Deep Red
  "After 3 Months": "#e1bee7", // Light Purple
  "After 5 Months": "#ce93d8", // Purple
  "After 9 Months": "#ba68c8", // Purple
  "After 1 Year": "#ab47bc" // Darker Purple
};

export const insuranceStatusStageColorMap = {
  "-None-": "#9e9e9e", // Grey
  "Not Contacted": "#f44336", // Red
  "Attempted to Contact": "#ff9800", // Orange
  "Contact in Future": "#8bc34a", // Light Green
  "Contacted & Not Interested": "#ce93d8", // Light Purple
  "Pre-Qualified": "#7e57c2", // Dark Purple
  "Appointment": "#3f51b5", // Indigo
  "Quoted / In Process": "#26a69a", // Teal
  "Confirmation of Application Go Ahead by Lead - Life": "#81c784", // Soft Green
  "Confirmation of Application Go Ahead by Lead - Travel / Supervisa": "#4caf50", // Green
  "Confirmation of Application Go Ahead by Lead - Investments": "#388e3c", // Darker Green
  "Junk Lead": "#5d4037", // Brown
  "Lost & Listed for Future Reactivation": "#b71c1c", // Dark Red
  "Lost & Closed / Archived": "#1565c0", // Blue
  "Escalated": "#7986cb", // Light Blue
  "Not Qualified": "#607d8b", // Grey Blue
  "Discovery Call": "#ff9800", // Orange
  "Advisor Lead": "#7986cb" // Light Blue again for lack of distinct color
};

// statusColorMap.js
export const leadStatusStageFormColorMap = {
  "-None-": "#9e9e9e",          // Grey
  "Not Contacted": "#f44336"    // Red
};

// Exported helper function for use in any component
export function getStatusColor(label) {
  return leadStatusStageColorMap[label] || "#bdbdbd"; // fallback grey
}

export function getInsuranceLeadStatusColor(label) {
  return insuranceStatusStageColorMap[label] || "#bdbdbd"; // fallback grey
}

export function getLeadStatusStage(label) {
  return leadStatusStageFormColorMap[label] || "#bdbdbd"; // fallback grey
}
