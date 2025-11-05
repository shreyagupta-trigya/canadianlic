const express =require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { audio, video, attachment } = require("../Utils/fileTypes.js");

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const storage = multer.diskStorage({    
    destination: (req, file, cb) => {
        console.log("<------>",req.files['file']);
        if (file.fieldname === 'file') {
            ensureDir('temp/attachments');
            cb(null, 'temp/attachments');
        }
        else {
            cb(new Error('Unknown field name'), false);
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const allowedMimeTypes = ["video/mp4", "video/webm", "application/octet-stream"];

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    console.log({file:file.originalname});
    console.log({fieldname:file.fieldname}); 
    if (file.fieldname === 'file' && (attachment.includes(ext)|| video.includes(ext) ||audio.includes(ext) || allowedMimeTypes.includes(file.mimetype))) {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid file type'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// const {testConnections,createInspections} =  require("../../../controller/utils/mediaFile/uploadFileController.js");

// router.get('/test-connections', testConnections);
// router.post('/upload-media-file',upload.fields([
//     { name: "file", maxCount: 5 }
// ]), createInspections);



//*********CSV UPLOAD FUNCTION ********* */
const { testCsvConnections, readExcelAndUpload, importCsv} =  require("../controller/import/csvImport.js");

router.get('/api/v2/test-csv-connections', testCsvConnections);
router.post('/api/v2/upload-csv', upload.fields([ { name: "file", maxCount: 1 }]), readExcelAndUpload);
// router.post('/api/v2/upload-csv', upload.fields([ { name: "file", maxCount: 1 }]), processAndUploadCSV);
router.post('/api/v2/import-csv', importCsv);

//*********csvModule FUNCTION ********* */

const { testFileConnections, uploadCsv } = require("../controller/csvModule/csvUploadController");

router.get("/api/v2/test-file-connections", testFileConnections);
router.post("/api/v2/upload-csvdata", upload.fields([ { name: "file", maxCount: 1 }]), uploadCsv);


// ***************CSV IMPORT FUNCTION ********
const {testFileImportConnections, importCsvFile} =  require("../controller/csvModule/csvImportController.js");
router.get('/api/v2/test-file-import-connections', testFileImportConnections);
router.post('/api/v2/import-csv-files', importCsvFile);
// *******CSV IMPORT FUNCTIONS ********
// const {importLeadCsv, importUsersCsv} = require("../controller/csvModule/services/csvImportService.js");

// router.post("/api/v2/import-lead-csv", importLeadCsv);
// router.post("/api/v2/import-user-csv", importUsersCsv);

module.exports = router;
