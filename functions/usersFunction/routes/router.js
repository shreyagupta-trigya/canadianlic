const express = require("express");
const router = express.Router();
const {roleTest,getAllRoles,createRole,updateRole} = require("../Controller/roles");

router.get("/roletest", roleTest);
router.get("/getallroles", getAllRoles);
router.put("/createRole", createRole);
router.post("/updateRole/:id", updateRole);
module.exports = router;