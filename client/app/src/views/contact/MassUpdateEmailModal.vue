<template>
  <div class="modal fade show" tabindex="-1" style="display: block;" v-if="isOpen">
  <div class="modal-dialog" style="max-width: 80vw; width: 80%;">
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
                {{ lead.name }}<span v-if="idx < selectedEmailContacts.length - 1">, </span>
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
                            <strong>{{ template.name || template }}</strong>
                          </div>
                          <button class="btn btn-link p-0" @click="openPreview(template)">Preview</button>
                        </li>
                      </ul>
                    </div>

                    <div class="modal fade show" v-if="isPreviewModalOpen"
                      style="display: block; background: rgba(0,0,0,0.5);">
                      <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title">{{ previewTemplate?.name || previewTemplate }}</h5>
                            <button class="btn-close" @click="closePreview"></button>
                          </div>
                          <div class="modal-body">
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
                            <div :style="previewMode === 'mobile' ? 'width: 375px;' : 'width: 100%;'" class="border">
                              <iframe :srcdoc="previewTemplate?.content || previewTemplate"
                                style="width: 100%; height: 600px; border: none;"></iframe>
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
    
         filter: "All Templates",
      search: "",
      previewTemplate: null,
      isPreviewModalOpen: false,
      previewMode: 'desktop',
      templates: [
        {
          name: "Welcome Email",
          content: `
            <div style="font-family: Arial, sans-serif; background: #fff; max-width: 600px; margin: 0 auto; border: 1px solid #eee;">
              <!-- Header -->
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 24px 32px 0 32px;">
                <div style="display: flex; align-items: center;">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDh14bUjCky34K9pZdbern0m0LY4KOvg7u5g&s" alt="LIC Insurance Logo" style="height: 48px; margin-right: 12px;">
                  <span style="font-size: 1.5rem; font-weight: bold; color: #b71c1c; letter-spacing: 1px;">Canadian LIC</span>
                </div>
                <div style="text-align: right; font-size: 14px; color: #888;">
                  888 888 8888<br>demo@zylker.com
                </div>
              </div>
              <!-- Banner -->
              <div style="background: #ef6c5d; color: #fff; text-align: center; padding: 32px 24px 24px 24px;">
                <h2 style="margin: 0; font-size: 2rem; font-weight: bold;">Pre-Sales Managemen</h2>
                <div style="margin: 8px 0 0 0; font-size: 1.1rem;">Venue</div>
                <div style="margin: 4px 0 0 0; font-size: 1rem; font-weight: bold;">18th Dec 2016 at 11:00 AM UTC</div>
                <div style="margin: 4px 0 16px 0; font-size: 1rem;">Company street, Company city, Company country.</div>
                <a href="#" style="display: inline-block; background: #fff; color: #ef6c5d; padding: 10px 28px; border-radius: 4px; font-weight: bold; text-decoration: none; margin-top: 8px;">Register Now</a>
              </div>
              <!-- Team Images Row -->
              <div style="display: flex; justify-content: space-around; align-items: flex-end; padding: 32px 16px 0 16px;">
                <div style="text-align: center;">
                  <img src="https://randomuser.me/api/portraits/women/1.jpg" alt="CEO" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover;">
                  <div style="color: #ef6c5d; font-weight: bold; margin-top: 8px;">\${Leads.Last Name}</div>
                  <div style="font-size: 13px; color: #888;">CEO, zylker</div>
                </div>
                <div style="text-align: center;">
                  <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="Manager" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover;">
                  <div style="color: #ef6c5d; font-weight: bold; margin-top: 8px;">\${Leads.Last Name}</div>
                  <div style="font-size: 13px; color: #888;">Manager, zylker</div>
                </div>
                <div style="text-align: center;">
                  <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="Speaker" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover;">
                  <div style="color: #ef6c5d; font-weight: bold; margin-top: 8px;">\${Leads.Last Name}</div>
                  <div style="font-size: 13px; color: #888;">Speaker, zylker</div>
                </div>
              </div>
              <!-- Footer -->
              <div style="padding: 24px 32px 24px 32px; font-size: 15px; color: #444;">
                This is your welcome paragraph. You can use this space to explain about your company and what it does. You will see all the formatting options once
              </div>
            </div>
          `
        },
        {
          name: "Invoice Reminder",
          content: `
            <div style="font-family: Arial; padding: 20px;">
              <h2 style="color:#dc3545;">Invoice Reminder</h2>
              <p>Dear <strong>\${Leads.First Name}</strong>,</p>
              <p>This is a friendly reminder that your invoice <strong>#\${Invoice.Number}</strong> is due on <strong>\${Invoice.Due Date}</strong>.</p>
              <p>Please make the payment at your earliest convenience.</p>
              <p>Thank you!</p>
            </div>
          `
        },
        {
          name: "Follow-up Mail",
          content: `
            <div style="font-family: Arial; padding: 20px;">
              <h2 style="color:#28a745;">Just Checking In</h2>
              <p>Hi <strong>\${Leads.First Name}</strong>,</p>
              <p>I wanted to follow up regarding our last conversation. Let me know if you have any questions or need further assistance.</p>
              <p>Looking forward to your response!</p>
            </div>
          `
        },
        {
          name: "Promotion Offer",
          content: `
            <div style="font-family: Arial; padding: 20px;">
              <h2 style="color:#ffc107;">Special Promotion Just for You!</h2>
              <p>Dear <strong>\${Leads.First Name}</strong>,</p>
              <p>We're excited to offer you an exclusive promotion. Use code <strong>PROMO2025</strong> to get a special discount!</p>
              <p>Don't miss out—this offer is valid for a limited time only.</p>
            </div>
          `
        },
        {
          name: "Feedback Request",
          content: `
            <div style="font-family: Arial; padding: 20px;">
              <h2 style="color:#17a2b8;">We Value Your Feedback</h2>
              <p>Hi <strong>\${Leads.First Name}</strong>,</p>
              <p>Your opinion matters to us! Please take a moment to let us know how we're doing and how we can improve.</p>
              <p><a href="#" style="color: #fff; background: #17a2b8; padding: 8px 16px; border-radius: 4px; text-decoration: none;">Give Feedback</a></p>
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
      selectedTemplate: null,
      previewTemplate: null,
      isPreviewModalOpen: false,
      previewMode: 'desktop',
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
    },
  },
  mounted() {
    document.addEventListener("click", this.onClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.onClickOutside);
  },
  methods: {
    // Modal
    sanitizeHtmlForQuill(html) {
    return html
      .replace(/style="[^"]*"/g, "")
      .replace(/<img[^>]*>/g, "")
      .replace(/<div[^>]*>/g, "<p>")
      .replace(/<\/div>/g, "</p>");
  },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },

    openPreview(template) {
      this.previewTemplate = template;
      this.isPreviewModalOpen = true;
    },
    closePreview() {
      this.previewTemplate = null;
      this.isPreviewModalOpen = false;
    },
insertFromPreview() {
  this.$nextTick(() => {
    if (this.quill && this.previewTemplate) {
      let html = this.previewTemplate.content || this.previewTemplate;

      // ✅ 1. Sanitize before inserting
      html = this.sanitizeHtmlForQuill(html);

      // ✅ 2. Clear content
      this.quill.setContents([]);

      // ✅ 3. Enable editor
      this.quill.enable(true);

      // ✅ 4. Insert safe HTML
      this.quill.clipboard.dangerouslyPasteHTML(0, html);

      // ✅ 5. Sync & close modals
      this.emailContent = html;
      this.emailSubject = this.previewTemplate.name || '';
      this.closePreview();
      this.closeModal();
    }
  });
},



    selectTemplate(template) {
      alert("Selected Template: " + template);
      this.closeModal();
    },
    // Dropdown
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

    // Quill
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

  // ✅ Enable editing (in case it's not)
  this.quill.enable(true);

  // ✅ Sync content to emailContent
  this.quill.on("text-change", () => {
    this.emailContent = this.quill.root.innerHTML;
  });
},

    // Email Send
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
    showPreview(template) {
      this.selectedTemplate = template;
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
