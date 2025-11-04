<template>
    <Loader :loading="isLoading"></Loader>
    <div class="row ">
        <div class="search-container-div col-lg-10 col-md-10 col-sm-12">
            <div class="search-container">
                <input class="search-input" type="search" placeholder="Search" aria-label="Search">
                <i class="fas fa-search" aria-hidden="true"></i>
            </div>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-12 add-note-btn-div text-end">
            <i class="d-none d-sm- block fa fa-plus-square fs-4 cursor-pointer mb-2 mx-2 blue-color"
                title="Add Note"></i>
            <input id="fileAttachments" @change="handleFileSelect" type="file" multiple style="display: none;" />
            <label for="fileAttachments" class="btn custom-btn px-2 py-1 mt-0 mb-3">Attach
            </label>
            <button v-if="files.length > 0" style="padding: 5px; font-weight:500" @click="uploadFile"
                class="btn custom-btn mx-2 ">Upload
            </button>
        </div>
    </div>
    <div v-if="attachmentList.length > 0" class=" border " style="border-radius: 6px;">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">File Name</th>
                    <th scope="col">Size</th>
                    <th scope="col" class="text-center">Added By</th>
                    <th scope="col" class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in attachmentList" :key="item.id">
                    <td style="cursor:pointer;" @click="previewFile(item.id)" class="blue-color">{{ item.name }}</td>
                    <td>{{ formatFileSize(item.size) }}</td>
                    <td class="text-center">{{ item.addedBy }}</td>
                    <td class="text-center">
                        <i @click="deleteFileOption(item.id, item.recId)" style="cursor:pointer;"
                            class="fa fa-trash text-center"></i>
                        <i @click="previewFile(item.id)" style="cursor:pointer;" class="fa fa-eye text-center  mx-2"></i>
                        <i @click="downloadFile(item.id)" style="cursor:pointer;"
                            class="fa fa-download text-center"></i>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
    <div v-if="attachmentList.length <= 0" class="d-flex justify-content-center align-items-center">
        <img class="w-25 h-25" src="/images/QALoan.png">
    </div>

</template>
<script>
import axios from 'axios';
import { putUrl } from '../../boot/axios';
import Loader from './Loader.vue';
import { reactive, ref } from 'vue';
import Swal from "sweetalert2";
export default {

    data() {
        return {
            files: [],
            isLoading: ref(false),
            attachmentList: reactive([])
        }
    },
    props: ["id"],
    components: {
        Loader
    },
    methods: {
        findUser(id) {
            const user = localStorage.getItem('userId')
            return user === id ? localStorage.getItem('userName') : 'Admin'
        },
        async deleteFileOption(id, recId) {
            try {
                const result = await Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                });

                if (result.isConfirmed) {
                    // Call the deleteFile method
                    await this.deleteFile(id, recId);
                    this.isLoading = false;
                    await Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    this.isLoading = false;

                }
            } catch (error) {
                console.error('Error during delete operation:', error);
                await Swal.fire({
                    title: "Error",
                    text: "An error occurred while trying to delete the file.",
                    icon: "error"
                });
                this.isLoading = false;
            } finally {
                this.isLoading = false;
            }
        },
        async deleteFile(id, recId) {
            const data = {
                type: "attachments",
                id,
                recId
            }
            try {
                this.isLoading = true
                const response = await axios.post(`${putUrl}utilsfunction/api/v1/delete-attachment`, data)
                if (response.data.success) {
                    this.attachmentList = this.attachmentList.filter(item => item.id != id)
                }
            } catch (error) {
                console.log(error)
                this.isLoading = false
            }
        },
        formatFileSize(size) {
            if (size < 1024) {
                const temp = size + ' bytes';
                console.log({ temp })
                return temp;
            }
            else if (size < 1048576) {
                const temp = (size / 1024).toFixed(2) + ' KB';
                console.log({ temp })
                return temp;
            }
            else {
                const temp = (size / 1048576).toFixed(2) + ' MB';
                console.log({ temp })
                return temp;
            }
        },
        handleFileSelect(event) {
            this.files = Array.from(event.target.files);
            console.log({ files: this.files })
        },
        async uploadFile() {
            const addedBy = localStorage.getItem('userId');
            try {
                this.isLoading = true
                if (this.files.length > 0) {
                    this.isLoading = true;

                    // Prepare form data
                    const formData = new FormData();
                    this.files.forEach(file => {
                        formData.append('files', file);
                    });
                    formData.append('moduleId', this.id);
                    formData.append('type', 'attachment');
                    formData.append('addedBy', addedBy);

                    // Send files to the server
                    const response = await axios.post(`${putUrl}utilsfunction/api/v1/upload-files`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });

                    // Check if the response indicates success
                    if (response.data.success) {
                        // Parse the attachments from the response
                        const attachments = JSON.parse(response.data.resp.attchments);

                        // Update the attachment list by unshifting new attachments
                        this.attachmentList = [
                            ...attachments.map(file => ({
                                name: file.file_name || '',
                                size: file.file_size || '',
                                id: file.id || '',
                                recId: response.data.resp.id || '',
                                // addedBy: response.data.resp.addedBy || ''
                                addedBy: this.findUser(response.data.resp.addedBy)
                            })),
                            ...this.attachmentList
                        ];

                        // Clear the file input
                        this.files = [];

                    } else {
                        // Handle case where the response does not indicate success
                        console.error('File upload failed:', response.data.message);
                    }

                    return response;
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            } finally {
                this.isLoading = false;
            }
        },
        async getAllFiles() {
            try {
                this.isLoading = true
                const response = await axios.get(`${putUrl}utilsfunction/api/v1/get-all-attachments/${this.id}`);
                console.log(response);
                const attachments = response.data.attachments;
                console.log({ response })
                // Flatten the nested arrays
                const temp = attachments.flatMap(attachment => {
                    // Parse the 'attchments' string into an array
                    const parsedAttachments = JSON.parse(attachment.attchments);
                    return parsedAttachments.map(item => ({
                        name: item.file_name,
                        size: item.file_size,
                        id: item.id,
                        recId: attachment.id,
                        addedBy: attachment.addedBy,
                    }));
                });

                this.attachmentList = [...temp];
                this.isLoading = false
            } catch (error) {
                console.log(error);
                this.isLoading = false
            }

        },
        async downloadFile(fileId) {
            try {
                this.isLoading = true;

                // Send a POST request to the backend API
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

                // Get the filename from the Content-Disposition header or default to 'downloaded-file.pdf'
                const disposition = response.headers.get('Content-Disposition');
                const filename = disposition
                    ? disposition.split('filename=')[1].replace(/"/g, '')
                    : 'downloaded-file.pdf';

                // Convert the response to a blob
                const blob = await response.blob();

                // Create a URL for the Blob and set the correct MIME type
                const url = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));

                // Create a link element and trigger the download
                const link = document.createElement('a');
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Clean up the URL object
                URL.revokeObjectURL(url);
                this.isLoading = false;
            } catch (error) {
                console.error('Error downloading the file:', error);
                this.isLoading = false;
            }
        },
        async previewFile(fileId) {
            try {
                this.isLoading = true;

                // Send a POST request to the backend API
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

                // Get the filename from the Content-Disposition header or default to 'downloaded-file.pdf'
                const disposition = response.headers.get('Content-Disposition');
                const filename = disposition
                    ? disposition.split('filename=')[1].replace(/"/g, '')
                    : 'downloaded-file.pdf';
                   console.log(filename)
                // Convert the response to a blob
                const blob = await response.blob();

                // Create a URL for the Blob and set the correct MIME type
                const url = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));

                window.open(url, '_blank')

                // Clean up the URL object
                URL.revokeObjectURL(url);
                this.isLoading = false;
            } catch (error) {
                console.error('Error downloading the file:', error);
                this.isLoading = false;
            }
        },


    },
    watch: {
        id(newId) {

            this.getAllFiles(newId);
        }
    },
    mounted() {
        if (this.id) {

            this.getAllFiles()
        }
    }

};
</script>
<style scoped>
.search-container {
    position: relative;
    display: inline-block;
}

.search-input {
    padding: 10px 40px 10px 10px;
    border: 2px solid #ccc;
    border-radius: 5px;
    /* Changed border radius to 5px */
    font-size: 16px;
    width: 250px;
    transition: border-color 0.3s ease-in-out;
    /* Smooth transition for border color */
}

.search-input:focus {
    outline: none;
    border-color: #8fd3f4;
    /* Light blue color on focus */
}

.fa-search {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: #666;
}
</style>