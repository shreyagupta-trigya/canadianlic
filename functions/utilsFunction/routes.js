const express = require("express");
const router = express.Router();
const { createNotes, getNotes, deleteNotes, getSingleNote, updateNote } = require("./controllers/controllersNotes");
const { getAllDocuments, downloadFile, uploadFile,deleteFile } = require("./controllers/controllersAttachments");
const multer = require("multer");

// Multer configuration for file upload
// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'temp/');  // Directory to save uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);  // Use unique names to avoid conflicts
    }
});
const upload = multer({ storage: storage });

// Routes
router.post("/create-notes", createNotes);
router.post("/update-notes/:id", updateNote);
router.get("/get-notes/:id", getNotes);
router.get("/get-single-note/:id", getSingleNote);
router.delete("/delete-notes/:id", deleteNotes);

// <<<<<<<<<======== Attachments =========>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.post("/upload-files", upload.array("files"), uploadFile);
router.post("/download-attachments", downloadFile);
router.post("/delete-attachment", deleteFile);
router.get("/get-all-attachments/:id?", getAllDocuments);

// ******** SURVAY FUNCTIONS *******

const {survayConnection, createSurvay,updateSurvay, getServayList, getSurvayCount, deleteServay}  =  require("./controllers/survayController");
router.get("/servery-test", survayConnection);
router.post("/create-servery", createSurvay);
router.put("/update-servery/:id?", updateSurvay);
router.post("/get-servery-list", getServayList);
router.get("/servery-count", getSurvayCount);
router.post("/delete-servay/:id?", deleteServay);

// ************* UTIL FUNCTIONS ******************
const {getLeadList,getUsers,getAdviors,getLocations,getContacts,getReferral} =  require("./controllers/utilsControllers");

router.post("/get-lead-data/", getLeadList);
router.post("/get-users", getUsers);
router.post("/get-advisors", getAdviors);
router.post("/get-locations", getLocations);
router.post("/get-contacts", getContacts);
router.post("/get-referral", getReferral);

// *************** END UTIL FUNCTION *****************

// ********* TICKET FUNCTION ********
const {ticketConnection, createTicket,updateTicket, getTicketList, deleteTicket} = require("./controllers/ticketController");

router.get("/gestTicketConnection", ticketConnection);
router.post("/create-ticket", createTicket);
router.put("/update-ticket/:id", updateTicket);
router.post("/get-ticket-list", getTicketList);
router.post("/delete-ticket/:id", deleteTicket);

//********* Remote Access ************/
const {testRemoteAccess, createRemoteAccess,updateRemoteAccess,deleteRemoteAccess,getCount, getallRemoteAccess } = require("./controllers/remoteAccessController");
router.get("/test-remote-access", testRemoteAccess);
router.post("/create-remote-access", createRemoteAccess);
router.put("/update-remote-access/:id", updateRemoteAccess);
router.post("/delete-remote-access/:id", deleteRemoteAccess);
router.get("/remote-access-total-count", getCount);
router.post("/getall-remote-access", getallRemoteAccess);


// ****************** CRM INTEGRATIONS **********************
const {testRemoteAssistConnection} = require("./controllers/crmIntegration/createRemoteAssistController");
router.get("/test-remote-assistConnection", testRemoteAssistConnection);

// ******** OFFERINGS *******

// const { testOfferingsConnection,createOffering } = require("./controllers/crmIntegration/offeringDataSyncController");
// router.get("/testOffer", testOfferingsConnection);
// router.post("/create-offering", createOffering);

module.exports = router;
