'use strict';

const express = require("express");
const catalyst = require("zcatalyst-sdk-node");
const verifyRouter = express.Router();

verifyRouter.post('/verifyUser', async (req, res) => {
    try {
        // <<<<<<<<<< ======== PETER COMMMENTED THIS CODE ON 29/10/2022 ====== ===== >>>>>>>>>>
        // const userEmail = req.body.userEmail;
        // const getQuery = `SELECT * FROM userData WHERE email='${userEmail}'`;
        // const response = await catalyst.initialize(req, { scope: 'admin' }).zcql().executeZCQLQuery(getQuery);
        
        // // Check if response is empty (user not found)
        // if (response.length === 0) {
        //     return res.status(404).json({ success: false, message: "User not found" });
        // } else {
        //     // User found, return user data
        //     return res.status(200).json({ success: true, message: "Verified",  });
        // }
        return res.status(200).json({ success: true, message: "Verified",  });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = verifyRouter