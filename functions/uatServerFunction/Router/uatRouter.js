const express = require('express');
const router = express.Router();
const {connectionCheck} = require("../Controller/uatController");
router.get("/",connectionCheck)
module.exports = router;