import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, 'sample', 'data.json');
let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Define cities array
const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte", "San Francisco", "Indianapolis", "Seattle", "Denver", "Boston", "El Paso", "Detroit", "Nashville", "Portland", "Oklahoma City", "Las Vegas", "Memphis", "Louisville", "Baltimore", "Milwaukee"];

// Add new fields to existing records
data.forEach((record, index) => {
  record.dealName = `Deal ${record.ROWID}`;
  const stageMap = {
    "Initial Contact": "Prospecting",
    "Qualified": "Qualification",
    "Proposal Sent": "Proposal",
    "Negotiation": "Negotiation",
    "Closed": "Closed Won"
  };
  record.stage = stageMap[record.leadStatusStage] || "Prospecting";
  record.locationName = cities[index % cities.length];
  record.contactName = `${record.firstName} ${record.lastName}`;
  record.dealOwner = record.advisorfullName;
  record.insuranceDeal = `${record.servicesRequested} Deal`;
  record.insuranceLookup = `Lookup ${record.ROWID}`;
});

// Add more records to make 50
const lastROWID = data.length;
const additionalRecords = 50 - data.length;
for (let i = 1; i <= additionalRecords; i++) {
  const rowid = lastROWID + i;
  const record = {
    "ROWID": rowid.toString(),
    "firstName": `First${rowid}`,
    "lastName": `Last${rowid}`,
    "email": `email${rowid}@example.com`,
    "mobile": `123-456-${rowid.toString().padStart(4, '0')}`,
    "insuranceLeadSource": "Website",
    "advisorfullName": `Advisor ${rowid}`,
    "CREATEDTIME": new Date().toISOString(),
    "layoutName": rowid % 2 === 0 ? "Client" : "Advisor",
    "insuranceLeadStatus": "New",
    "insuranceLeadStatusColor": "#fdd835",
    "leadStatusStage": "Initial Contact",
    "leadStatusStageColor": "#fdd835",
    "servicesRequested": "Life Insurance",
    "gclid": `gclid${rowid}`,
    "firstPageVisited": "/home",
    "MODIFIEDTIME": new Date().toISOString(),
    "totalInteractionTime": 15,
    "phoneNumber": `123-456-${rowid.toString().padStart(4, '0')}`,
    "UserfullName": `User ${rowid}`,
    "adCampaign": `Campaign ${rowid}`,
    "facebookAd": `Ad ${rowid}`,
    "keywordData": "insurance",
    "submitPageURL": "/submit",
    "lpUrlData": "/lp",
    "gclidData": `data${rowid}`,
    "adNetwork": "Google",
    "dealName": `Deal ${rowid}`,
    "stage": "Prospecting",
    "locationName": cities[(data.length + i - 1) % cities.length],
    "contactName": `First${rowid} Last${rowid}`,
    "dealOwner": `Advisor ${rowid}`,
    "insuranceDeal": "Life Insurance Deal",
    "insuranceLookup": `Lookup ${rowid}`
  };
  data.push(record);
}

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
