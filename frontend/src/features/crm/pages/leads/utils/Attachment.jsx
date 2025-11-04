import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormCard } from "@/components/custom/CustomFormComponents";
import { Search, Trash2, Eye, Download, Upload } from "lucide-react";
import axios from 'axios';
import { putUrl } from "@/boot/axios";

const Attachment = ({ id }) => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [attachmentList, setAttachmentList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAttachments = attachmentList.filter(attachment =>
    attachment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const findUser = (id) => {
    const user = localStorage.getItem('userId');
    return user === id ? localStorage.getItem('userName') : 'Admin';
  };

  const formatFileSize = (size) => {
    if (size < 1024) {
      return size + ' bytes';
    } else if (size < 1048576) {
      return (size / 1024).toFixed(2) + ' KB';
    } else {
      return (size / 1048576).toFixed(2) + ' MB';
    }
  };

  const handleFileSelect = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const uploadFile = async () => {
    const addedBy = localStorage.getItem('userId');
    try {
      setIsLoading(true);
      if (files.length > 0) {
        const formData = new FormData();
        files.forEach(file => {
          formData.append('files', file);
        });
        formData.append('moduleId', id);
        formData.append('type', 'attachment');
        formData.append('addedBy', addedBy);

        const response = await axios.post(`${putUrl}utilsfunction/api/v1/upload-files`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        if (response.data.success) {
          const attachments = JSON.parse(response.data.resp.attchments);
          const newAttachments = attachments.map(file => ({
            name: file.file_name || '',
            size: file.file_size || '',
            id: file.id || '',
            recId: response.data.resp.id || '',
            addedBy: findUser(response.data.resp.addedBy)
          }));
          setAttachmentList(prev => [...newAttachments, ...prev]);
          setFiles([]);
        } else {
          console.error('File upload failed:', response.data.message);
        }
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllFiles = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${putUrl}utilsfunction/api/v1/get-all-attachments/${id}`);
      const attachments = response.data.attachments;
      const temp = attachments.flatMap(attachment => {
        const parsedAttachments = JSON.parse(attachment.attchments);
        return parsedAttachments.map(item => ({
          name: item.file_name,
          size: item.file_size,
          id: item.id,
          recId: attachment.id,
          addedBy: findUser(attachment.addedBy),
        }));
      });
      setAttachmentList(temp);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFile = async (id, recId) => {
    const data = {
      type: "attachments",
      id,
      recId
    };
    try {
      setIsLoading(true);
      const response = await axios.post(`${putUrl}utilsfunction/api/v1/delete-attachment`, data);
      if (response.data.success) {
        setAttachmentList(prev => prev.filter(item => item.id !== id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadFile = async (fileId) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${putUrl}utilsfunction/api/v1/download-attachments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: fileId, type: 'attachments' }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const disposition = response.headers.get('Content-Disposition');
      const filename = disposition
        ? disposition.split('filename=')[1].replace(/"/g, '')
        : 'downloaded-file.pdf';

      const blob = await response.blob();
      const url = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));

      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const previewFile = async (fileId) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${putUrl}utilsfunction/api/v1/download-attachments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: fileId, type: 'attachments' }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));

      window.open(url, '_blank');
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error previewing the file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFileOption = async (id, recId) => {
    if (confirm('Are you sure you want to delete this file?')) {
      await deleteFile(id, recId);
    }
  };

  useEffect(() => {
    if (id) {
      getAllFiles();
    }
  }, [id]);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      <FormCard className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Attachments</h3>
          <div className="flex items-center gap-2">
            <input
              id="fileAttachments"
              type="file"
              multiple
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileSelect}
            />
            <label htmlFor="fileAttachments" className="btn custom-btn px-2 py-1 mt-0 mb-3">
              Attach
            </label>
            {files.length > 0 && (
              <Button onClick={uploadFile} disabled={isLoading} className="flex items-center gap-2">
                <Upload size={16} />
                Upload
              </Button>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            type="text"
            placeholder="Search attachments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {filteredAttachments.length > 0 ? (
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <thead className="bg-muted">
                <tr>
                  <th className="border border-border p-2 text-left">File Name</th>
                  <th className="border border-border p-2 text-left">Size</th>
                  <th className="border border-border p-2 text-center">Added By</th>
                  <th className="border border-border p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttachments.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/50">
                    <td
                      className="border border-border p-2 cursor-pointer text-blue-600"
                      onClick={() => previewFile(item.id)}
                    >
                      {item.name}
                    </td>
                    <td className="border border-border p-2">{formatFileSize(item.size)}</td>
                    <td className="border border-border p-2 text-center">{item.addedBy}</td>
                    <td className="border border-border p-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Trash2
                          className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-destructive"
                          onClick={() => deleteFileOption(item.id, item.recId)}
                        />
                        <Eye
                          className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground"
                          onClick={() => previewFile(item.id)}
                        />
                        <Download
                          className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground"
                          onClick={() => downloadFile(item.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No attachments available</p>
          </div>
        )}
      </FormCard>
    </>
  );
};

export default Attachment;
