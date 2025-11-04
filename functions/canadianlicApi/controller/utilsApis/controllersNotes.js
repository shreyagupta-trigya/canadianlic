const catalyst = require("zcatalyst-sdk-node");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();
const queries = require("../../SQL/leadDetailUtilQueries");
// Route 1// Function to create a new notes
exports.createNotes = async (req, res) => {
  try {
    const { noteTitle, noteText, addedBy, moduleId } = req.body;
    const catalystApp = catalyst.initialize(req, { scope: "admin" });
    const folderID = process.env.noteAttachments;
    let notesData = {};
    // configurig the path
    if (req.file) {
      let config = {
        code: fs.createReadStream(req.file.path),
        name: req.file.originalname,
      };
      console.log("req.file", typeof req.file.mimetype);
      // uploading file
      let filestore = catalystApp.filestore();
      let folder = filestore.folder(folderID);
      let uploadPromise = folder.uploadFile(config);
      const uploadedFile = await uploadPromise;
      // creating note data
      notesData = {
        noteTitle: noteTitle,
        description: noteText,
        addedBy: addedBy,
        moduleId: moduleId,
        attachmentRowid: uploadedFile.id,
        attachmentOriginalname: uploadedFile.file_name,
        memeType:req.file.mimetype
      };
    } else {
      notesData = {
        noteTitle: noteTitle,
        description: noteText,
        addedBy: addedBy,
        moduleId: moduleId,
      };
    }
    console.log(notesData);
    
    // upoading notedata
    const response = await catalyst
      .initialize(req, { scope: "admin" })
      .datastore()
      .table("notes")
      .insertRow(notesData);
    return res.status(200).json({
      success: true,
      message: "Note Created Successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error creating note:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create note",
      error: error.message,
    });
  }
};
// Route 2 Function to retrieve all notes
exports.getNotes = async (req, res) => {
  try {
    const query = queries.getNote.replace("%moduleId%", req.params.id);
    const notesResponse = await catalyst
      .initialize(req, { scope: "admin" })
      .zcql()
      .executeZCQLQuery(query);
    const notes = notesResponse.map((item) => ({
      noteTitle: item.notes.noteTitle,
      addedBy: item.userData.ROWID,
      id: item.notes.ROWID,
      description: item.notes.description,
      time: item.notes.CREATEDTIME,
      AddedByName: item.userData.firstName + " " + item.userData.lastName,
      attachmentRowid: item.notes.attachmentRowid,
      attachmentOriginalname: item.notes.attachmentOriginalname,
      memeType: item.notes.memeType,
    }));
    return res
      .status(200)
      .json({ success: true, message: "Note Fetched Successfully", notes: notes });
  } catch (error) {
    console.error("Error getting notes:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get notes",
      error: error.message,
    });
  }
};
// Route 3  Function to get single note
exports.getSingleNote = async (req, res) => {
  try {
    const query = queries.getSingleNote.replace("%ROWID%", req.params.id);
    const notesResponse = await catalyst
      .initialize(req, { scope: "admin" })
      .zcql()
      .executeZCQLQuery(query);
      const note = notesResponse.map((item) => ({
        noteTitle: item.notes.noteTitle,
        addedBy: item.userData.ROWID,
        id: item.notes.ROWID,
        description: item.notes.description,
        time: item.notes.CREATEDTIME,
        AddedByName: item.userData.firstName + " " + item.userData.lastName,
        attachmentRowid: item.notes.attachmentRowid,
        attachmentOriginalname: item.notes.attachmentOriginalname,
        memeType: item.notes.memeType,
      }));  
    return res
      .status(200)
      .json({ success: true, message: "Note Fetched Successfully", note: note });
  } catch (error) {
    console.error("Error getting notes:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get notes",
      error: error.message,
    });
  }
};
//Route 4 Function to delete a note
exports.deleteNotes = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await catalyst
      .initialize(req, { scope: "admin" })
      .datastore()
      .table("notes")
      .deleteRow(id);
    if (response) {
      return res
        .status(200)
        .json({ success: true, message: "Note deleted successfully" });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Failed to delete note" });
    }
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete note",
      error: error.message,
    });
  }
};
// Route 5 Function tp edit note
exports.updateNote = async (req, res) => {
  try {
    const { noteTitle, noteText, addedBy, moduleId } = req.body;
    const id = req.params.id;
    let note = {
      noteTitle: noteTitle,
      description: noteText,
      addedBy: addedBy,
      moduleId: moduleId,
      ROWID: id
    }
    const response = await catalyst
      .initialize(req, { scope: "admin" })
      .datastore()
      .table("notes")
      .updateRow(note);
      return res
        .status(200)
        .json({ success: true, message: "Note updated successfully", note: {...note, id: id} });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update note",
      error: error.message,
    });
  }
};
