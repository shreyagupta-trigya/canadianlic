// utill/utills.js
export const botColumns = [
  { key: "Action", label: "Action", visible: true },
  { key: "rpaBotName", label: "Bot Name", visible: true },
  { key: "botStatus", label: "Bot Status", visible: true },
  { key: "linkWithModule", label: "Linked Module", visible: true },
  { key: "policyPortalName", label: "Policy Portal", visible: true },
  { key: "portalUserId", label: "Portal User ID", visible: true },
  { key: "userPassword", label: "User Password", visible: true },
  { key: "aboutBot", label: "About Bot", visible: true },
  { key: "createdTime", label: "Created", visible: true },
  { key: "modifiedTime", label: "Modified", visible: true },
];

export const botRows = [
  {
    id: 1,
    rpaBotName: "Claims Bot",
    botStatus: "Active",
    linkWithModule: "Claims",
    policyPortalName: "PolicyPortal A",
    portalUserId: "userA",
    userPassword: "****",
    aboutBot: "Automates claim submission",
    createdTime: "2025-09-01",
    modifiedTime: "2025-09-05",
  },
  {
    id: 2,
    rpaBotName: "Payments Bot",
    botStatus: "Inactive",
    linkWithModule: "Payments",
    policyPortalName: "PolicyPortal B",
    portalUserId: "userB",
    userPassword: "****",
    aboutBot: "Handles vendor payments",
    createdTime: "2025-08-20",
    modifiedTime: "2025-09-03",
  },
];
