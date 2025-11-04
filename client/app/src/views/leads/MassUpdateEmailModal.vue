<template>
  <div class="modal fade show" tabindex="-1" style="display: block;" v-if="isOpen">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Mass Email</h5>
          <button type="button" class="btn-close" @click="handleClose"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label text-muted fw-medium">To</label>
            <div class="mt-1 text-dark" v-if="selectedEmailLeads?.length">
              <span v-for="(lead, idx) in selectedEmailLeads" :key="lead.id">
                {{ lead.name }}<span v-if="idx < selectedEmailLeads.length - 1">, </span>
              </span>
            </div>
            <div v-else class="text-muted mt-1">
              No recipients selected
            </div>
            
          </div>


          <!-- <div class="mb-3">
            <label class="form-label fw-semibold text-muted">Reply To</label>
            <select class="form-select">
              <option selected>user1@demo5.trigya.co</option>
              <option>user2@demo5.trigya.co</option>
              <option>user3@demo5.trigya.co</option>
            </select>
          </div> -->

          <div class="mb-3">
            <label class="form-label">From</label>
            <select class="form-select">
              <option selected>user1@demo5.trigya.co</option>
              <option>user2@demo5.trigya.co</option>
              <option>user3@demo5.trigya.co</option>
            </select>
            <div v-if="fromError" class="invalid-feedback">
              {{ fromError }}
            </div>

          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold text-muted">Subject</label>
            <input v-model="emailSubject" type="text" class="form-control" placeholder="Enter email subject">
          </div>

          <!-- Add Quill Editor -->
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
</template>

<script>
import Quill from "quill";
import "quill/dist/quill.snow.css";
export default {
  props: {
    isOpen: Boolean,
    fields: Array,
    selectedIds: Array,
    selectedEmailLeads: Array,
  },
  watch: {
    selectedEmailLeads: {
      handler(newVal) {
        console.log('Watch - Selected Email Leads:', {
          leads: JSON.parse(JSON.stringify(newVal)), // Deep copy to see full object
          count: newVal?.length || 0,
          timestamp: new Date().toISOString()
        });
      },
      immediate: true,
      deep: true // Add deep watching
    },
    isOpen(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          // Clean previous instance if exists
          if (this.quill) {
            this.quill = null;
          }

          if (this.$refs.quillEditor) {
            this.initQuillEditor();
          }
        });
      }
    }

  },



  created() {
    console.log('Modal Created - Selected Leads:', this.selectedEmailLeads);
  },

  data() {
    return {
      selectedField: "",
      selectedFrom: "",
      fromError: "",
      emailSubject: "",
      quill: null,
      emailContent: ""
    };
  },
  computed: {
    filteredFields() {
      return this.fields;
    }
  },

  mounted() {
    this.$nextTick(() => {
      if (this.isOpen && this.$refs.quillEditor) {
        this.initQuillEditor();
      }
    });
  },

  methods: {
    initQuillEditor() {
      if (!this.$refs.quillEditor) return;

      this.quill = new Quill(this.$refs.quillEditor, {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['link', 'image'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'align': [] }],
            ['clean']
          ]
        },
        placeholder: 'Compose your email...'
      });

      this.quill.on('text-change', () => {
        this.emailContent = this.quill.root.innerHTML;
      });
    },

    sendMassEmail() {
      // Basic email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.selectedFrom) {
        this.fromError = "Sender email is required.";
        return;
      }
      if (!emailPattern.test(this.selectedFrom)) {
        this.fromError = "Please enter a valid email address.";
        return;
      }

      // Include selected leads in emission
      this.$emit("send-mass-email", {
        from: this.selectedFrom,
        leads: this.selectedEmailLeads, // now you have full details
        subject: this.emailSubject,
        content: this.emailContent
      });

      this.handleClose();
    },
    handleClose() {
      this.selectedField = "";
      this.selectedFrom = "";
      this.fromError = "";
      this.emailSubject = "";
      if (this.quill) {
        this.quill.setText('');
      }
      this.$emit("close");
    }
  }
};
</script>