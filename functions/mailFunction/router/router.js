const express = require('express');
const router = express.Router();
const multer = require('multer');
const { testMail, sendMail, getMailList,deleteMail, getMailByUser } = require('../controller/mailController');

//************* CONFIGURE MULTER STORAGE ****************
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'temp/');  // Directory to save uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

//********* MAIL ROUTER ************
router.get('/test-mail', testMail);
router.post('/send-mail', upload.array('files'), sendMail);
router.post('/get-mail-list', getMailList);
router.post("/delete-mail/:id?", deleteMail);
router.post("/get-mail-by-user/:id?", getMailByUser);

module.exports = router;
