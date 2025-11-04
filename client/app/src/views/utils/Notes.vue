<template>
    <Loader :loading="isLoading"></Loader>
    <Drawer :updateData="this.updateData" :selectedButton="this.selectedButton" :addNotes="this.addNotes"
        :updateNotes="this.updateNotes" :is-open="isDrawerOpen" :speed="500" @close="closeDrawer"></Drawer>
    <div class="contact-note">
        <div class="d-flex justify-content-center remove-padding-in-mobile">
            <div v-if="selectedTab === 'Notes'" class="col-md-12">
                <h5 class="main-heading mt-2 mb-2 mb-0 ps-2">Notes</h5>
                <!-- button div -->
                <div class="card-surface w-100 " style="padding: 35px;">
                    <div class="row  ">
                        <div class="search-container-div col-lg-10 col-md-10 col-sm-12">
                            <div class="search-container">
                                <input class="search-input" type="search" placeholder="Search" aria-label="Search">
                                <i class="fas fa-search" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-12 add-note-btn-div text-end">
                            <i @click="toggleDrawer" class="fa fa-plus-square fs-4 cursor-pointer mb-2 mx-2 blue-color"
                                title="Add Note"></i>
                            <button @click="toggleDrawer(), switchButton('Submit')" class="btn custom-btn px-2 py-1">Add
                                Note</button>
                        </div>
                    </div>
                    <!-- button div ends -->
                    <div class="custom-scroll">
                        <div v-if="noteList.length === 0" class="null-data-image-div">
                            <img src="/images/email-with-too-many-happy-people.png">
                        </div>
                        <!-- details section -->
                        <div v-for="item in noteList" :key="item.id" class=" mb-2 cursor-pointer">
                            <!-- left -->
                            <div class="row border shadow rounded">
                                <div class="py-2 px-4 col-lg-9 col-md-9">
                                    <p class="card-title heading-color text-md mb-0 text-bold heading-color">{{
                                        item.noteTitle }}</p>
                                    <p :disabled="isDescriptionValid()" class="card-text mb-0 heading-color">
                                        {{ item.description.slice(0, 100) }} <span
                                            :style="{ display: item.description.length < 100 ? 'none' : 'block' }"
                                            class="cursor-pointer mb-0 text-xs text-danger" data-bs-toggle="modal"
                                            :data-bs-target="'#staticBackdrop-' + item.id"> ...Read
                                            More</span><!-- Button trigger modal -->
                                    </p>

                                    <!-- Model start here -->
                                    <div class="modal fade" :id="'staticBackdrop-' + item.id" data-bs-backdrop="static"
                                        data-bs-keyboard="false" tabindex="-1"
                                        :aria-labelledby="'staticBackdropLabel-' + item.id" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">{{
                                                        item.noteTitle
                                                        }}
                                                    </h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body ">
                                                    {{ item.description }}
                                                </div>

                                                <div class="modal-footer d-flex justify-content-between">
                                                    <div class="d-flex justify-content-start">
                                                        <!-- Use the corresponding Font Awesome icon -->
                                                        <i @click="downloadFile(item.attachmentRowid, item.memeType)"
                                                            v-if="iconObject[fileTypeFunction(item.attachmentOriginalname)]"
                                                            data-bs-toggle="tooltip" data-bs-placement="bottom"
                                                            :title="item.attachmentOriginalname"
                                                            v-html="iconObject[fileTypeFunction(item.attachmentOriginalname)]"></i>
                                                        <!-- If file type doesn't match, show txt icon -->
                                                        <i v-else
                                                            @click="downloadFile(item.attachmentRowid, item.memeType)"
                                                            data-bs-toggle="tooltip" data-bs-placement="bottom"
                                                            :title="item.attachmentOriginalname"
                                                            class="fa fa-file-text-o p-2 text-md blue-color"></i>
                                                    </div>
                                                    <button type="button" class="button"
                                                        data-bs-dismiss="modal">Close</button>
                                                    <!-- <button type="button" class="btn btn-primary">Understood</button> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Model ends here -->

                                    <span class="text-sm blue-color text-bold">
                                        <u>Added By :</u>
                                    </span>
                                    <span class="text-sm text-dark mx-2 heading-color"> {{ item.AddedByName }}</span>
                                    <span class="ms-1 text-xs blue-color">
                                        {{ isValidDateTime(item.time) ? formatAndDisplayDateTime(item.time) : '' }}
                                    </span>

                                    <div class="d-flex justify-content-start">
                                        <!-- Use the corresponding Font Awesome icon -->
                                        <i @click="downloadFile(item.attachmentRowid, item.memeType)"
                                            v-if="iconObject[fileTypeFunction(item.attachmentOriginalname)]"
                                            data-bs-toggle="tooltip" data-bs-placement="bottom"
                                            :title="item.attachmentOriginalname"
                                            v-html="iconObject[fileTypeFunction(item.attachmentOriginalname)]"></i>
                                        <!-- If file type doesn't match, show txt icon -->
                                        <i @click="downloadFile(item.attachmentRowid, item.memeType)" v-else
                                            data-bs-toggle="tooltip" data-bs-placement="bottom"
                                            :title="item.attachmentOriginalname"
                                            class="fa fa-file-text-o p-2 text-md blue-color"></i>
                                    </div>
                                </div>
                                <div class="text-end pt-2 col-3 ">
                                    <label for="fileInput">
                                        <!-- <span class="text-danger">{{ file && file.name.slice(0,15) + ' ' }} </span> -->
                                        <i class="fa fa-paperclip p-2 text-lg blue-color cursor-pointer"></i>
                                    </label>
                                    <input type="file" id="fileInput" @change="selectfile($event, item.id)" multiple
                                        style="display: none;">
                                    <!-- <i @click="openAddNotePopup(), switchButton('Update', item.noteTitle, item.description, item.id)" -->
                                    <i @click="toggleDrawer(), switchButton('Update', item.noteTitle, item.description, item.id)"
                                        class="fa fa-pencil p-2 text-md blue-color cursor-pointer"></i>
                                    <i @click="deleteNotes(item.id)"
                                        class="fa fa-trash p-2 text-md blue-color cursor-pointer"></i>
                                </div>
                                <!-- ends -->
                            </div>
                            <!-- details section ends -->
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div>
            <h5 class="main-heading mt-4 ps-2">Lead Management History</h5>
            <div style="width: 100%; overflow: scroll">
                <table class="table border table-responsive subform">
                    <thead class="table subform-table-head text-white">
                        <tr>
                            <th>#</th>
                            <th>Actions</th>
                            <th>Interaction Type</th>
                            <th>Date/Time Of Interaction</th>
                            <th>Contact Attempt</th>
                            <th>Time Spent (Mins)</th>
                            <th style="min-width:20rem" class="text-center">Comments</th>
                            <th>Interaction Outcome</th>
                            <th>Probability Of Closure</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-for="(parent, index) in subform" :key="index">
                            <td class="m-auto">{{ index + 1 }}</td>
                            <td>
                                <a @click.prevent="deleteLeadsRow(index)" href="javascript:;" data-bs-toggle="tooltip"
                                    data-bs-original-title="Delete product">
                                    <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                                </a>
                            </td>
                            <td>
                                <div class="choices">
                                    <div class="select-box">
                                        <select v-model="parent.interactionType" class="form-select"
                                            name="choices-state">
                                            <option v-for="(option, index) in interactionType" :key="index"
                                                :value="option">
                                                {{ option }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <!-- <input v-model="parent.timeOfInteraction" type="datetime-local"
                                    class="form-control form-control-default" autocomplete="off"> -->
                                    <div class="input-group bg-white">
            <flat-pickr v-model="parent.timeOfInteraction" :config="datePickerConfig" placeholder="DD/MM/YYYY"
              class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
              ref="fpDateOfBirth" />
            <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
              <i class="fa fa-calendar"></i>
            </span>
          </div>
                            </td>
                            <td>
                                <input v-model="parent.contactAttempt" type="number"
                                    class="form-control form-control-default" autocomplete="off">
                            </td>
                            <td>
                                <input v-model="parent.timeSpent" type="number"
                                    class="form-control form-control-default" autocomplete="off">
                            </td>
                            <td>
                                <textarea v-model="parent.comments" class="form-control form-control-default" rows="2"
                                    cols="12"></textarea>
                            </td>
                            <td>
                                <input v-model="parent.interactionOutcome" type="text"
                                    class="form-control form-control-default" autocomplete="off">
                            </td>
                            <td>
                                <input v-model="parent.probabilityOfClosure" type="number"
                                    class="form-control form-control-default" autocomplete="off">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button class="btn mb-0 btn-color btn-md" type="button" @click.prevent="addRowToLeadDataTable">
                Add Row
            </button>
        </div>

    </div>
    <Loader :loading="isLoading"></Loader>
</template>
<script>
import { putUrl } from "../../boot/axios";
import axios from "axios";
import { reactive } from "vue";
import formatDateAndTime from "./util-js/dateFinder";
import Swal from 'sweetalert2';
import getFileType from './util-js/getFileType';
import Drawer from "./DrawerforNotes/Drawer.vue";
import Loader from "./Loader.vue"
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
export default {
       
    computed: {
        fileTypeFunction() {
            return getFileType;
        }
    },
    props: ["id"],
    components: {
        Loader,
        Drawer,
        flatPickr
    },
    data() {
        return {
             datePickerConfig: {
        dateFormat: "d/m/Y", // DD/MM/YYYY
        allowInput: true
      },
      dateTimePickerConfig: {
        dateFormat: "d/m/Y H:i", // DD/MM/YYYY HH:mm
        allowInput: true,
        enableTime: true,
        time_24hr: true
      },
            updateData: null,
            isDrawerOpen: false,
            iconObject: {
                excel: `<i class="fa fa-file-excel-o p-2 text-md blue-color"></i>`,
                word: `<i class="fa fa-file-word-o p-2 text-md blue-color"></i>`,
                powerpoint: `<i class="fa fa-file-powerpoint-o p-2 text-md blue-color"></i>`,
                pdf: `<i class="fa fa-file-pdf-o p-2 text-md blue-color"></i>`,
                PPTX: `<i class="fa fa-file-powerpoint-o p-2 text-md blue-color"></i>`,
                PPS: `<i class="fa fa-file-powerpoint-o p-2 text-md blue-color"></i>`,
                xlsx: `<i class="fa fa-file-powerpoint-o p-2 text-md blue-color"></i>`,
                jpg: ` <i class="fa fa-file-image-o p-2 text-md blue-color"></i>`,
                png: `<i class="fa fa-file-image-o p-2 text-md blue-color"></i>`,
                JPEG: `<i class="fa fa-file-image-o p-2 text-md blue-color"></i>`,
                GIF: `<i class="fa fa-file-image-o p-2 text-md blue-color"></i>`,
                BMP: `<i class="fa fa-file-image-o p-2 text-md blue-color"></i>`,
                txt: `<i class="fa fa-file-text-o p-2 text-md blue-color"></i>`,
            },
            progressBar: reactive(0),
            noteTitle: reactive(''),
            noteText: reactive(''),
            showAddNotePopup: false,
            noteList: reactive([]),
            selectedTab: 'Notes',
            isLoading: false,
            fileName: {},
            selectedButton: reactive(''),
            noteID: reactive(''),
            date: '',
            time: '',
            file: null,
            selectedFileNoteId: '',
            subform: [
                {
                    interactionType: "",
                    timeOfInteraction: "",
                    contactAttempt: null,
                    timeSpent: null,
                    comments: "",
                    interactionOutcome: "",
                    probabilityOfClosure: null,
                },
            ],
            interactionType: [
                "Phone Call",
                "Email",
                "Meeting",
                "Follow-up",
                "Demo",
                "Other",
            ],
        };
    },
    mounted() {
        this.getNotes();
    },
    methods:
    {
           openDatePicker() {
      if (this.$refs.fpDateOfBirth && this.$refs.fpDateOfBirth.fp) {
        this.$refs.fpDateOfBirth.fp.open()
      }
      },
        addRowToLeadDataTable() {
            this.subform.push({
                interactionType: "",
                timeOfInteraction: "",
                contactAttempt: null,
                timeSpent: null,
                comments: "",
                interactionOutcome: "",
                probabilityOfClosure: null,
            });
        },
        deleteLeadsRow(index) {
            this.subform.splice(index, 1);
        },


        isValidDateTime(time) {
            const formattedDate = this.formatAndDisplayDateTime(time);
            return formattedDate && !isNaN(new Date(time).getTime());
        },
        // Function to check if the noteText exceeds 300 characters
        isDescriptionValid() {
            return this.noteText.length <= 300;
        },
        formatAndDisplayDateTime(timestamp) {

            const { formattedDate, formattedTime } = formatDateAndTime(timestamp);
            return `${formattedDate} ${formattedTime}`;
        },
        selectfile(event, noteId) {
            this.file = event.target.files[0];
            this.selectedFileNoteId = noteId;
            Swal.fire({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    this.handleFileUpload(noteId).then(() => {
                        Swal.fire("File Uploaded !", "", "success");
                    })
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });
        },
        selectfileWhenAdd(event) {
            this.file = event.target.files[0];


        },
        async downloadFile(id, memeType) {

            try {
                const response = await axios.get(`${putUrl}utilsFunction/api/v1/download-attachments/${id}`, {
                    responseType: 'arraybuffer',
                    onDownloadProgress: (progressEvent) => {
                        console.log(progressEvent)
                        // const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                        // console.log(progress);
                        // this.progressBar = progress;
                    }
                });
                const blob = new Blob([response.data], { type: memeType });
                const url = window.URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = url;

                link.setAttribute('download', `file_${id / 2}`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error("Error downloading file:", error);
            }
        },
        async previewFile(id, mimeType) {

            try {
                const response = await axios.get(`${putUrl}utilsFunction/api/v1/download-attachments/${id}`, {
                    responseType: 'arraybuffer',
                });

                // Create Blob from response data
                const blob = new Blob([response.data], { type: mimeType });
                // If the MIME type is supported, create a preview URL
                const url = window.URL.createObjectURL(blob);
                return `<img src='${url}' terget='_blank' style='height:100px;width:100%;'alt='attachment' class='attName'/>`
                // Open the preview in a new tab
                // window.open(url, '_blank');

            } catch (error) {
                console.error("Error previewing file:", error);
            }
        },
        async handleFileUpload(noteid) {
            console.log(noteid)
            const formData = new FormData();
            formData.append('file', this.file);
            try {
                const response = await axios.post(`${putUrl}utilsFunction/api/v1/upload-files/${noteid}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                });
                console.log(response)
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        },
        async updateNotes(data) {
            this.isLoading = true;
            console.log({ data })
            const note = {
                noteTitle: data.noteTitle,
                noteText: data.noteText,
            }
            try {
                const response = await axios.post(`${putUrl}utilsFunction/api/v1/update-notes/${this.noteID}`, note);
                console.log('update0', { response })
                const indexToUpdate = this.noteList.findIndex(note => note.id === this.noteID);
                this.noteList[indexToUpdate].noteTitle = data.noteTitle;
                this.noteList[indexToUpdate].description = data.noteText;
                this.isLoading = false;
                console.log('update', { response })
                return response;
            } catch (error) {
                this.isLoading = false;
                console.log(error);
            }
        },
        async addNotes(note) {
            const userID = localStorage.getItem('userId');
            console.log("notes here", note);
            this.isLoading = true;
            try {
                const body = {
                    noteTitle: note.noteTitle,
                    noteText: note.noteText,
                    addedBy: userID,
                    moduleId: this.id
                };
                console.log(body)
                const response = await axios.post(`${putUrl}utilsFunction/api/v1/create-notes`, body, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                console.log("Notes", response);
                this.noteList.unshift({
                    noteTitle: note.noteTitle,
                    description: note.noteText,
                    addedBy: userID,
                    userID: this.id,
                    id: response.data.data.ROWID,
                    AddedByName: localStorage.getItem('userName'),
                });
                this.cancelAddNote();
                this.noteTitle = '';
                this.noteText = '';
                this.file = null;
                // this.isLoading = false;
                this.progressBar = 0;
                this.closeDrawer();
                this.isLoading = false;
                return response;
            } catch (error) {
                this.isLoading = false;
                console.log(error);
                this.cancelAddNote();
                this.progressBar = 0;

            }
        },
        async deleteNotes(id) {
            this.isLoading = true;
            const ROWID = id;
            if (confirm('Are you sure you want to delete this note ?')) {
                try {
                    const response = await axios.delete(`${putUrl}utilsFunction/api/v1/delete-notes/${id}`);
                    this.noteTitle = '';
                    this.noteText = '';
                    this.isLoading = false;
                    this.noteList = this.noteList.filter((note) => note.id !== ROWID);
                    return response;
                } catch (error) {
                    this.isLoading = false;
                    console.log(error);
                }
            } else {
                this.isLoading = false;
                return 0;
            }
        },
        async getNotes() {
            this.isLoading = true;
            console.log({ id: this.id })
            try {
                const response = await axios.get(`${putUrl}utilsFunction/api/v1/get-notes/${this.id}`);
                console.log("get notes", response)
                if (response.data.success) {
                    const noteData = response.data.notes.map((item) => ({
                        noteTitle: item.noteTitle,
                        addedBy: item.addedBy,
                        id: item.id,
                        description: item.description,
                        time: item.time,
                        AddedByName: item.AddedByName,
                        // attachmentRowid: item.notes.attachmentRowid,
                        // attachmentOriginalname: item.notes.attachmentOriginalname,
                        // memeType: item.notes.memeType,
                    }));
                    console.log({ noteData })
                    this.noteList = noteData;
                    console.log("<<<<<<<<<========NOTE =======<>>>>>>>>>>", this.noteList.length);
                    this.$emit('updatecount', this.noteList.length)
                }
                this.noteTitle = '';
                this.noteText = '';
                this.isLoading = false;
                return response;
            } catch (error) {
                this.isLoading = false;
                console.log(error);
            }
        },
        switchButton(button, title, description, id) {
            this.selectedButton = button;
            if (button === "Update") {
                this.updateData = {
                    title,
                    description,
                    id
                }
                this.noteID = id;

            }
        },
        openAddNotePopup() {
            this.showAddNotePopup = true;
        },
        cancelAddNote() {
            this.showAddNotePopup = false;
        },
        toggleDrawer() {
            this.isDrawerOpen = !this.isDrawerOpen;
        },
        closeDrawer() {
            this.isDrawerOpen = false;
        },

        nextStep() {
            this.$emit("next", { LeadData: this.subform });
        },
        previousStep() {
            this.$emit("previous");
        },
        // deleteLeadsRow(index) {
        addRowToLeadDataTable() {
            this.subform.push({
                interactionType: "",
                timeOfInteraction: "",
                contactAttempt: "",
                timeSpent: "",
                comments: "",
                interactionOutcome: "",
                probabilityOfClosure: ""
            });
        },
        deleteLeadsRow(index) {
            this.subform.splice(index, 1);
        }


    }

};
</script>

<style scoped>
.button {
    background-color: #6161FF;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
}

.button:hover {
    background-color: #5034fc;
}

textarea:focus {
    outline: none;
    border-color: #8fd3f4;
}

input:focus {
    outline: none;
    border-color: #8fd3f4;
}

.orange-color {
    color: #FF642E;
}

.yellow-color {
    color: #FFCB00
}

.green-color {
    color: #9CD326;
}

.private-color {
    color: #f65f7c;
}

.border {
    border-radius: 5px !important;
}

.null-data-image-div {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s ease-in-out;
}

.null-data-image-div img {
    max-height: 50vh;
    transition: transform 0.3s ease-in-out;
}

.search-container {
    position: relative;
    display: inline-block;
}

.search-input {
    padding: 10px 40px 10px 10px;
    border: 2px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    width: 250px;
    transition: border-color 0.3s ease-in-out;
}

.search-input:focus {
    outline: none;
    border-color: #8fd3f4;
}

.fa-search {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: #666;
}

.add-btn {
    background-color: white !important;
    border: 1px solid #0060B9 !important;
    color: #0060B9 !important;
    border-radius: 5px;
}

.add-note-btn-div i {
    display: none;
    color: #0060B9;
}

.message-details {
    z-index: 6;
    position: fixed;
    height: 83vh;
    right: 0;
    bottom: 0;
    width: 30%;
    background-color: #fefefe;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
    transition: transform 0.5s ease-in-out;
    transform: translateX(100%);
    overflow-y: auto;
}

.message-details-content {
    padding: 20px;
}

.message-details-open {
    transform: translateX(0);
}

@media (max-width: 600px) {
    .message-details {
        width: 100%;
        height: 87vh !important;
        top: 14vh !important;
    }

    .text-size {
        font-size: 12px !important;
    }

    .btn-div {
        display: block !important;
    }

    .message-details-content {
        width: 90% !important;
    }

    .add-note-btn-div i {
        display: block;
        color: #0060B9;
    }

    .add-note-btn-div button {
        display: none;
    }

    .search-container-div {
        display: none;
    }
}

@media (max-width: 900px) {
    .message-details {
        width: 100%;
        height: 90.5vh !important;
        top: 10vh;
    }

    .text-size {
        font-size: 14px !important;
    }

    .btn-div {
        display: block !important;
    }

}
</style>