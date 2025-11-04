<template>
  <div class="modal fade show" tabindex="-1" style="display: block;" v-if="isOpen">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Mass Email</h5>
          <button type="button" class="btn-close" @click="handleClose"></button>
        </div>

        <div class="modal-body">
          <!-- Recipients -->
          <div class="mb-3">
            <label class="form-label text-muted fw-medium">To</label>
            <div class="mt-1 text-dark" v-if="selectedEmailContacts?.length">
              <span v-for="(lead, idx) in selectedEmailContacts" :key="lead.id">
                {{ lead.name
                }}<span v-if="idx < selectedEmailContacts.length - 1">, </span>
              </span>
            </div>
            <div v-else class="text-muted mt-1">
              No recipients selected
            </div>
          </div>

          <!-- Insert Template Dropdown -->
          <div class="dropdown" ref="root">
            <!-- Button -->

            <button style="background-color: ghostwhite; color: blue;"
              class="btn dropdown-toggle  d-flex align-items-center justify-content-between w-35" type="button"
              @click="toggleDropdown" @keyup.esc.prevent="closeDropdown">
              <span class="me-2 border-end pe-2" @click="openModal">Insert Template</span>
            </button>

            <div class="modal fade show" tabindex="-1" v-if="isModalOpen"
              style="display: block; background: rgba(0,0,0,0.5); ">
              <div class="modal-dialog modal-lg">
                <div style="height: 500px;" class="modal-content">

                  <!-- Header -->
                  <div class="modal-header">
                    <h5 class="modal-title">Select Template</h5>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                  </div>

                  <!-- Body -->
                  <div class="modal-body">
                    <div class="d-flex align-items-center mb-3">
                      <!-- Dropdown -->
                      <select v-model="filter" class="form-select w-auto me-2">
                        <option>All Templates</option>
                        <option>Favorites</option>
                        <option>Associated Templates</option>
                        <option>Created by me</option>
                        <option>Shared with me</option>
                        <option>Public Email Templates</option>
                      </select>

                      <!-- Search -->
                      <input type="text" v-model="search" class="form-control w-50 me-2"
                        placeholder="Search Template" />

                      <!-- Sort Button -->
                      <!-- <button style="font-size: s;" class="btn btn-light border">
                A <i class="bi bi-arrow-down"></i>
               </button> -->
                    </div>

                    <!-- Template List -->
                    <div v-if="filteredTemplates.length">
                      <ul class="list-group">
                        <li v-for="(template, i) in filteredTemplates" :key="i"
                          class="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{{ template.name }}</strong>
                            <span class="text-muted small d-block">Public Email Templates</span>
                          </div>
                          <button class="btn btn-link p-0" @click="openPreview(template)">Preview</button>
                        </li>

                      </ul>
                    </div>
                    <div v-else class="text-muted">No templates found</div>
                  </div>

                </div>
              </div>
            </div>

          </div>



          <!-- From -->
          <!-- <div class="mb-3"> <label class="form-label fw-semibold text-muted">Reply To</label> <select class="form-select"> <option selected>user1@demo5.trigya.co</option> <option>user2@demo5.trigya.co</option> <option>user3@demo5.trigya.co</option> </select> </div> -->
          <div class="mb-3"> <label class="form-label">From</label> <select class="form-select">
              <option selected>user1@demo5.trigya.co</option>
              <option>user2@demo5.trigya.co</option>
              <option>user3@demo5.trigya.co</option>
            </select>
            <div v-if="fromError" class="invalid-feedback"> {{ fromError }} </div>
          </div>

          <!-- Subject -->
          <div class="mb-3">
            <label class="form-label fw-semibold text-muted">Subject</label>
            <input v-model="emailSubject" type="text" class="form-control" placeholder="Enter email subject" />
          </div>

          <!-- Message -->
          <div class="mb-3">
            <label class="form-label fw-semibold text-muted">Message</label>
            <div class="editor-container">
              <div ref="quillEditor"></div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="handleClose">Cancel</button>
          <button class="btn btn-primary" @click="sendMassEmail">Send</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade show" v-if="isPreviewModalOpen" style="display: block; background: rgba(0,0,0,0.5);">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ previewTemplate?.name }}</h5>
          <button class="btn-close" @click="closePreview"></button>
        </div>

        <div class="modal-body">
          <!-- Toggle buttons -->
          <div class="mb-3">
            <button class="btn"
              :class="{ 'btn-primary': previewMode === 'desktop', 'btn-outline-primary': previewMode !== 'desktop' }"
              @click="previewMode = 'desktop'">
              Desktop
            </button>
            <button class="btn ms-2"
              :class="{ 'btn-primary': previewMode === 'mobile', 'btn-outline-primary': previewMode !== 'mobile' }"
              @click="previewMode = 'mobile'">
              Mobile
            </button>
          </div>

          <!-- Preview Frame -->
          <div :style="previewMode === 'mobile' ? 'width: 375px;' : 'width: 100%;'" class="border">
            <iframe :srcdoc="previewTemplate?.content" style="width: 100%; height: 600px; border: none;"></iframe>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closePreview">Close</button>
          <button class="btn btn-primary" @click="insertFromPreview">
            Insert This Template
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default {
  name: "InsertTemplateButton",
  props: {
    isOpen: Boolean,
    fields: Array,
    selectedIds: Array,
    selectedEmailContacts: Array,
  },
  data() {
    return {
      isModalOpen: false,
      filter: "All Templates",
      search: "",
      previewTemplate: null,
      isPreviewModalOpen: false,
      previewMode: 'desktop',
      templates: [
        {
          name: "Sanjeeta",
          content: `
      <div style="font-family: Arial; padding: 20px;">
        <h2 style="color:#007bff;">Co-marketing webinar</h2>
        <p>\${Leads.Last Name} invited by \${Leads.Last Name}</p>
        <p><strong>Monday, December 12th, 2016</strong><br/>11:00 AM - 12:00 PM <small>(EDT)</small></p>
        <a  style="background-color: green; color: white; padding: 10px 20px; display:inline-block; margin: 20px 0;">Register Now</a>
      </div>
    `
        }
      ],

      selectedField: "",
      selectedFrom: "",
      fromError: "",
      emailSubject: "",
      quill: null,
      emailContent: "",
      isDropdownOpen: false, // ✅ dropdown state
      items: ["Template A", "Template B", "Template C"],
    };
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          if (this.$refs.quillEditor) {
            this.initQuillEditor();
          }
        });
      }
    },
    selectedEmailContacts: {
      handler(newVal) {
        console.log("Selected Email Contacts:", newVal);
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    filteredTemplates() {
      return this.templates.filter((t) =>
        t.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }

  },
  mounted() {
    document.addEventListener("click", this.onClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.onClickOutside);
  },
  methods: {
    // 🔹 Modal
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    selectTemplate(template) {
      alert("Selected Template: " + template);
      this.closeModal();
    },
    closePreview() {
      this.previewTemplate = null;
      this.isPreviewModalOpen = false;
    },

    insertFromPreview() {
      if (this.quill && this.previewTemplate) {
        this.quill.root.innerHTML = this.previewTemplate.content;
        this.emailContent = this.previewTemplate.content;
        this.emailSubject = this.previewTemplate.name;
      }
      this.closePreview();
      this.closeModal(); // optional: close template selection too
    },

    openPreview(template) {
      this.previewTemplate = template;
      this.isPreviewModalOpen = true;
    },
    // 🔹 Dropdown
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    },
    select(item) {
      if (this.quill) {
        const range = this.quill.getSelection(true);
        this.quill.insertText(range.index, item + "\n", "user");
      }
      this.closeDropdown();
    },
    onClickOutside(e) {
      if (this.$refs.root && !this.$refs.root.contains(e.target)) {
        this.closeDropdown();
      }
    },

    // 🔹 Quill
    initQuillEditor() {
      if (!this.$refs.quillEditor) return;

      this.quill = new Quill(this.$refs.quillEditor, {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["link", "image"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ align: [] }],
            ["clean"],
          ],
        },
        placeholder: "Compose your email...",
      });

      this.quill.on("text-change", () => {
        this.emailContent = this.quill.root.innerHTML;
      });
    },

    // 🔹 Email Send
    sendMassEmail() {
      this.$emit("send-mass-email", {
        from: this.selectedFrom,
        contactData: this.selectedEmailContacts,
        subject: this.emailSubject,
        content: this.emailContent,
      });
      this.handleClose();
    },
    handleClose() {
      this.selectedField = "";
      this.selectedFrom = "";
      this.fromError = "";
      this.emailSubject = "";
      if (this.quill) {
        this.quill.setText("");
      }
      this.$emit("close");
    },
  },
};
</script>



<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.12s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
