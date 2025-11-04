"use strict";

const express = require('express');
const catalyst = require('zcatalyst-sdk-node');
const app = express();
const cors =  require("cors"); 

const policyRouter = require("./routes");
const policyRoute = require("./Router/router");
app.use(express.json());
app.use(cors());

app.use("/api/v1", policyRouter);
app.use("/api/v2", policyRoute);

app.get('/get-single-offerings/:id?', async (req, res) => {
    try {
        const query = `
            SELECT offering.*, userData.ROWID, userData.role, userData.email, userData.phone, userData.city, userData.lastName, userData.firstName  
            FROM userData
            LEFT JOIN offering ON userData.ROWID = offering.offeringOwner 
            WHERE offering.ROWID = '${req.params.id}'
        `;

        const response = await catalyst.initialize(req, { scope: 'admin' })
            .zcql()
            .executeZCQLQuery(query);

        if (response && response.length > 0) {
            res.status(200).json({ success: true, message: 'Offering data', response });
        } else {
            res.status(404).json({ success: false, message: 'Offering not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Cannot get offering data', error: error.message });
    }
});


module.exports = app;
