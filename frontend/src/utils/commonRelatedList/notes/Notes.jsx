import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Paperclip, Trash2, Plus, Edit, Search } from "lucide-react";
import axios from 'axios';
import { putUrl } from "@/boot/axios"; // Assuming this is the axios config
import { FormCard } from "@/components/custom/CustomFormComponents";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import dummyNotes from './dummyNotes.json';

const Notes = ({ id }) => {
  const fileInputRef = useRef(null);
  const [noteList, setNoteList] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteText, setNoteText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedFileNoteId, setSelectedFileNoteId] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState('Submit');
  const [updateData, setUpdateData] = useState(null);
  const [noteID, setNoteID] = useState('');
  const [subform, setSubform] = useState([
    {
      interactionType: "",
      timeOfInteraction: "",
      contactAttempt: null,
      timeSpent: null,
      comments: "",
      interactionOutcome: "",
      probabilityOfClosure: null,
    },
  ]);
  const [interactionType] = useState([
    "Phone Call",
    "Email",
    "Meeting",
    "Follow-up",
    "Demo",
    "Other",
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = noteList.filter(note =>
    note.noteTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isTitleValid = () => {
    const title = selectedButton === 'Update' && updateData ? updateData.title : noteTitle;
    return title.length <= 50;
  };

  const isDescriptionValid = () => {
    const desc = selectedButton === 'Update' && updateData ? updateData.description : noteText;
    return desc.length <= 300;
  };

  useEffect(() => {
    // Use dummy data instead of API call
    setNoteList(dummyNotes);
  }, [id]);

  const addRowToLeadDataTable = () => {
    setSubform([...subform, {
      interactionType: "",
      timeOfInteraction: "",
      contactAttempt: null,
      timeSpent: null,
      comments: "",
      interactionOutcome: "",
      probabilityOfClosure: null,
    }]);
  };

  const deleteLeadsRow = (index) => {
    setSubform(subform.filter((_, i) => i !== index));
  };

  const formatAndDisplayDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const selectfile = (event, noteId) => {
    setFile(event.target.files[0]);
    setSelectedFileNoteId(noteId);
    // Handle file upload confirmation
  };

  const downloadFile = async (id, mimeType) => {
    try {
      const response = await axios.get(`${putUrl}utilsFunction/api/v1/download-attachments/${id}`, {
        responseType: 'arraybuffer',
      });
      const blob = new Blob([response.data], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `file_${id}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleFileUpload = async (noteid) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post(`${putUrl}utilsFunction/api/v1/upload-files/${noteid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const addNotes = async (data) => {
    const userID = localStorage.getItem('userId');
    setIsLoading(true);
    try {
      const body = {
        noteTitle: data.noteTitle,
        noteText: data.noteText,
        addedBy: userID,
        moduleId: id
      };
      const response = await axios.post(`${putUrl}utilsFunction/api/v1/create-notes`, body, {
        headers: {
          "Content-Type": "application/json"
        },
      });
      setNoteList([{
        noteTitle: data.noteTitle,
        description: data.noteText,
        addedBy: userID,
        id: response.data.data.ROWID,
        AddedByName: localStorage.getItem('userName'),
      }, ...noteList]);
      setNoteTitle('');
      setNoteText('');
      setFile(null);
      setIsDrawerOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateNotes = async (data) => {
    setIsLoading(true);
    try {
      const body = {
        noteTitle: data.noteTitle,
        noteText: data.noteText,
      };
      const response = await axios.post(`${putUrl}utilsFunction/api/v1/update-notes/${noteID}`, body);
      const indexToUpdate = noteList.findIndex(note => note.id === noteID);
      setNoteList(prev => {
        const updated = [...prev];
        updated[indexToUpdate].noteTitle = data.noteTitle;
        updated[indexToUpdate].description = data.noteText;
        return updated;
      });
      setIsDrawerOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const switchButton = (button, title, description, id) => {
    setSelectedButton(button);
    if (button === "Update") {
      setUpdateData({
        title,
        description,
        id
      });
      setNoteID(id);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const deleteNotes = async (noteId) => {
    if (confirm('Are you sure you want to delete this note?')) {
      setIsLoading(true);
      try {
        await axios.delete(`${putUrl}utilsFunction/api/v1/delete-notes/${noteId}`);
        setNoteList(noteList.filter(note => note.id !== noteId));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getNotes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${putUrl}utilsFunction/api/v1/get-notes/${id}`);
      if (response.data.success) {
        setNoteList(response.data.notes.map(item => ({
          noteTitle: item.noteTitle,
          addedBy: item.addedBy,
          id: item.id,
          description: item.description,
          time: item.time,
          AddedByName: item.AddedByName,
        })));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>

      {/* Notes Section */}
      <FormCard className="w-full">
        <h3 className="text-lg font-semibold">Notes</h3>

        <div className="flex items-center justify-between mb-4">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <i onClick={toggleDrawer} className="fa fa-plus-square fs-4 cursor-pointer mb-2 mx-2 blue-color" title="Add Note"></i>
            <Button onClick={() => { toggleDrawer(); switchButton('Submit'); }} disabled={isLoading} className="flex items-center gap-2 bg-blue-500 cursor-pointer hover:bg-blue-600">
              <Plus size={16} />
              Add Note
            </Button>
          </div>
        </div>



        {/* Notes List */}
        <div className="overflow-x-auto max-h-96 overflow-y-auto">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>{searchTerm ? 'No notes match your search.' : 'No notes available'}</p>
            </div>
          ) : (
            filteredNotes.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 bg-card">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-base">{item.noteTitle}</h4>
                  <div className="flex items-center gap-2">
                    <label htmlFor={`fileInput-${item.id}`}>
                      <Paperclip className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground" />
                    </label>
                    <input
                      type="file"
                      id={`fileInput-${item.id}`}
                      onChange={(e) => selectfile(e, item.id)}
                      multiple
                      style={{ display: "none" }}
                    />
                    <Edit
                      className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground"
                      onClick={() => { toggleDrawer(); switchButton('Update', item.noteTitle, item.description, item.id); }}
                    />
                    <Trash2
                      className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-destructive"
                      onClick={() => deleteNotes(item.id)}
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {item.description.length > 100
                    ? `${item.description.slice(0, 100)}...`
                    : item.description}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Added by: {item.AddedByName}</span>
                  <span>{formatAndDisplayDateTime(item.time)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </FormCard>
      <FormCard className="w-full">
        {/* Lead Management History Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Lead Management History</h3>
            <Button onClick={addRowToLeadDataTable} variant="primary" className="flex items-center gap-2">
              <Plus size={16} />
              Add Row
            </Button>
          </div>

          <div className=" max-h-96 max-w-full overflow-auto">
            <table className="w-[1300px] border-collapse border overflow-auto border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">#</th>
                  <th className="border border-border p-2 text-left">Actions</th>
                  <th className="border border-border p-2 text-left">Interaction Type</th>
                  <th className="border border-border p-2 text-left">Date/Time</th>
                  <th className="border border-border p-2 text-left">Contact Attempt</th>
                  <th className="border border-border p-2 text-left">Time Spent (Mins)</th>
                  <th className="border border-border p-2 text-left">Comments</th>
                  <th className="border border-border p-2 text-left">Outcome</th>
                  <th className="border border-border p-2 text-left">Probability (%)</th>
                </tr>
              </thead>
              <tbody>
                {subform.map((parent, index) => (
                  <tr key={index} className="hover:bg-muted/50">
                    <td className="border border-border p-2">{index + 1}</td>
                    <td className="border border-border p-2">
                      <Trash2
                        className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-destructive"
                        onClick={() => deleteLeadsRow(index)}
                      />
                    </td>
                    <td className="border border-border p-2">
                      <select
                        value={parent.interactionType}
                        onChange={(e) => {
                          const updated = [...subform];
                          updated[index].interactionType = e.target.value;
                          setSubform(updated);
                        }}
                        className="w-full p-1 border rounded"
                      >
                        <option value="">Select</option>
                        {interactionType.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border border-border p-2">
                      <Input
                        type="datetime-local"
                        value={parent.timeOfInteraction}
                        onChange={(e) => {
                          const updated = [...subform];
                          updated[index].timeOfInteraction = e.target.value;
                          setSubform(updated);
                        }}
                      />
                    </td>
                    <td className="border border-border p-2">
                      <Input
                        type="number"
                        value={parent.contactAttempt || ""}
                        onChange={(e) => {
                          const updated = [...subform];
                          updated[index].contactAttempt = e.target.value ? parseInt(e.target.value) : null;
                          setSubform(updated);
                        }}
                      />
                    </td>
                    <td className="border border-border p-2">
                      <Input
                        type="number"
                        value={parent.timeSpent || ""}
                        onChange={(e) => {
                          const updated = [...subform];
                          updated[index].timeSpent = e.target.value ? parseInt(e.target.value) : null;
                          setSubform(updated);
                        }}
                      />
                    </td>
                    <td className="border border-border w-50 p-2">
                      <Textarea
                        value={parent.comments}
                        onChange={(e) => {
                          const updated = [...subform];
                          updated[index].comments = e.target.value;
                          setSubform(updated);
                        }}
                        rows={2}
                      />
                    </td>
                    <td className="border border-border p-2">
                      <Input
                        value={parent.interactionOutcome}
                        onChange={(e) => {
                          const updated = [...subform];
                          updated[index].interactionOutcome = e.target.value;
                          setSubform(updated);
                        }}
                      />
                    </td>
                    <td className="border border-border p-2">
                      <Input
                        type="number"
                        value={parent.probabilityOfClosure || ""}
                        onChange={(e) => {
                          const updated = [...subform];
                          updated[index].probabilityOfClosure = e.target.value ? parseInt(e.target.value) : null;
                          setSubform(updated);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FormCard>

      {/* Drawer for Add/Edit Note */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="right">
        <DrawerContent className="w-full max-w-2xl">
          <DrawerHeader>
            <DrawerTitle>{selectedButton === 'Submit' ? 'Add Note' : 'Edit Note'}</DrawerTitle>
            <DrawerDescription>
              {selectedButton === 'Submit' ? 'Create a new note for this lead.' : 'Update the existing note.'}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <div className="mb-4">
              <label htmlFor="noteTitle" className="block text-sm font-medium mb-1">Title</label>
              <Input
                id="noteTitle"
                placeholder="Enter Note Title"
                value={selectedButton === 'Update' && updateData ? updateData.title : noteTitle}
                onChange={(e) => {
                  if (selectedButton === 'Update') {
                    setUpdateData(prev => ({ ...prev, title: e.target.value }));
                  } else {
                    setNoteTitle(e.target.value);
                  }
                }}
                maxLength={51}
                className={isTitleValid() ? '' : 'border-red-500'}
              />
              {!isTitleValid() && (
                <p className="text-red-500 text-xs mt-1">Title can't be more than 50 characters</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="noteText" className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                id="noteText"
                placeholder="Enter your note here"
                value={selectedButton === 'Update' && updateData ? updateData.description : noteText}
                onChange={(e) => {
                  if (selectedButton === 'Update') {
                    setUpdateData(prev => ({ ...prev, description: e.target.value }));
                  } else {
                    setNoteText(e.target.value);
                  }
                }}
                rows={4}
                maxLength={301}
                className={isDescriptionValid() ? '' : 'border-red-500'}
              />
              {!isDescriptionValid() && (
                <p className="text-red-500 text-xs mt-1">Description can't be more than 300 characters</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="fileUpload" className="block text-sm font-medium mb-1">Attachments</label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400"
                onClick={() => fileInputRef.current.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => setFile(e.target.files[0])}
                  multiple
                  className="hidden"
                />
                <div className="flex flex-col items-center">
                  <Paperclip className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Add Attachments</p>
                </div>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={closeDrawer} variant="outline">
              Cancel
            </Button>
            <Button className={"bg-blue-400"}
              onClick={() => {
                const data = selectedButton === 'Update' && updateData
                  ? { noteTitle: updateData.title, noteText: updateData.description }
                  : { noteTitle, noteText };
                if (selectedButton === 'Submit') {
                  addNotes(data);
                } else {
                  updateNotes(data);
                }
              }}
              disabled={isLoading}
            >
              {selectedButton}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Notes;
