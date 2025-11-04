'use strict';

const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const catalyst = require('zcatalyst-sdk-node');
const cors = require('cors')
const app = express();
const folderID = '15172000000371797'
const foldername = 'uploads'
app.use(fileUpload())
app.use(express.json());
app.use(cors())

app.use(cors())

// Route 1 add notes to notes Database
app.post('/createnotes', async (req, res) => {
    try {
        console.log(req.body)
        const currentDate = await new Date();
        console.log("Current Date:", currentDate);

        const notesData = {
            addedBy: req.body.fullName,
            description: req.body.noteText,
            noteTitle: req.body.noteTitle,
            addedTime: currentDate
        };

        console.log("Notes Data:", notesData);

        const response = await catalyst.initialize(req, { scope: 'admin' }).datastore().table("notes").insertRow(notesData);

        console.log("Response from Catalyst:", response);

        return res.status(200).json({ success: true, message: "Note Created", data: response.data });
    } catch (error) {
        console.error("Error creating note:", error);
        return res.status(500).json({ success: false, message: "Failed to create note", error: error.message });
    }
});

// Route 2 get all notes
  
app.get("/getnotes", async (req, res)=>{

    try {
        const query = `SELECT * FROM notes ORDER BY CREATEDTIME desc`
        const notes = await catalyst.initialize(req, {scope:"admin"}).zcql().executeZCQLQuery(query)
              console.log(notes)
        return res.status(200).json({ success: true, message: "All Notes", data: notes });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to get note", error: error.message });
        
    }

})

app.delete("/deleteNotes", async (req, res)=>{
    try {
        const ROWID = req.body.ROWID;
        const response = await 
        catalyst
        .initialize(req,{scope:"admin"})
        .datastore()
        .table('notes').deleteRow(ROWID)
  console.log(response)
  if (response) {
    return res.status(200).json({ success: true, message: "Note deleted successfully" });
} else {
    return res.status(500).json({ success: false, message: "Failed to delete note" });
}
    } catch (error) {
          return res.status(500).json({ success: false, message: "Failed to delete note", error: error.message });
    }
})

// Route 4 get adviors data

app.get("/getadvisor/:id", async (req, res)=>{

	try {
		const ROWID = req.params.id;

		const query = `Select * FROM advisors WHERE ROWID =${ROWID}`

		const response = await catalyst.initialize(req, {scope:"admin"}).zcql().executeZCQLQuery(query)

		const advisorSubData = await catalyst.initialize(req, {scope:"admin"}).zcql().executeZCQLQuery(`Select * FROM advisorSubDetails WHERE advisorId =${ROWID}`)
		const advisorFYCData = await catalyst.initialize(req, {scope:"admin"}).zcql().executeZCQLQuery(`Select * FROM advisorFyc WHERE advisorId =${ROWID}`)
		const advisorBonusData = await catalyst.initialize(req, {scope:"admin"}).zcql().executeZCQLQuery(`Select * FROM advisorBonus WHERE advisorId =${ROWID}`)

		return res.status(200).json({success:true, message:"Advisor get successfully", response , advisorSubData,  advisorFYCData, advisorBonusData})
	} catch (error) {
		 console.log(error)

		 return res.status(500).json({success:false, message:error.message})
	}
})

module.exports= app