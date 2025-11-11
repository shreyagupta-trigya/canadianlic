import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, PlusSquare, Trash2, Eye, Download } from "lucide-react";
import axios from 'axios';
import { putUrl } from "@/boot/axios";
// import Swal from "sweetalert2";

const Attachment = ({ id }) => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [attachmentList, setAttachmentList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAttachments = attachmentList.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
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
      {isLoading && <div className="text-center py-4">Loading...</div>}
      <div className="flex  justify-between flex-wrap gap-4 mb-4">
        <div className="flex-1 ">
          <div className="relative w-70">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              type="search"
              placeholder="Search"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-end">
          {/* <PlusSquare className="hidden sm:block w-6 h-6 cursor-pointer mb-2 mx-2 text-blue-600" title="Add Note" /> */}
          <input
            id="fileAttachments"
            type="file"
            multiple
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileSelect}
          />
          <label htmlFor="fileAttachments" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">
            Attach
          </label>
          {files.length > 0 && (
            <Button onClick={uploadFile} disabled={isLoading} className="ml-2 bg-transparent text-black hover:bg-transparent cursor-pointer border" size="sm">
              Upload
            </Button>
          )}
        </div>
      </div>
      {attachmentList.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-center">Added By</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttachments.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="cursor-pointer text-blue-600" onClick={() => previewFile(item.id)}>
                    {item.name}
                  </TableCell>
                  <TableCell>{formatFileSize(item.size)}</TableCell>
                  <TableCell className="text-center">{item.addedBy}</TableCell>
                  <TableCell className="text-center">
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex justify-center items-center py-8">
       No attachments
        </div>
      )}
    </>
  );
};

export default Attachment;
