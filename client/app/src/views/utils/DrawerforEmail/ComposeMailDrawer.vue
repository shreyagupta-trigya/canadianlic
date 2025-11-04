<template>
    <div>
        <div class="drawer" :class="{ 'is-open': isOpen, 'is-visible': isVisible }">
            <div class="drawer__overlay" :style="{ transitionDuration: `${speed}ms` }"></div>
            <div class="drawer__content" v-click-away="closeComposeMailDrawer" :style="{
                maxWidth: width,
                transitionDuration: `${speed}ms`,
                backgroundColor: backgroundColor,
            }">
                <div class="drawer-inner mx-4">
                    <div class="nav d-flex justify-content-between">
                        <span>New Message</span>
                        <span>
                            <i @click="toggleWidth"
                                class="fa-solid fa-down-left-and-up-right-to-center"></i>
                            <i class="fas fa-times" @click="closeComposeMailDrawer"></i>
                        </span>
                    </div>
                    <div class="form-group">
                        <div class="first p-2" style="border-bottom: 1px solid rgb(204, 203, 203);">
                            <input type="text" placeholder="Recipients" style="border: none; outline: none;">
                        </div>
                        <div class="second p-2" style="border-bottom: 1px solid rgb(206, 204, 204);">
                            <input type="text" placeholder="Subject" style="border: none; outline: none;">
                        </div>
                    </div>
                    <div class="editable" ref="quillEditor"></div>
                    <div class="footer">
                        <button type="button" class="btn btn-primary" style="border-radius: 70px; width: 100px">Send</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { directive } from "vue3-click-away";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill's CSS

export default {
    name: "ComposeMailDrawer",

    directives: {
        ClickAway: directive,
    },

    props: {
        activeMessage: {
            type: Object,
            required: false,
            default: () => { },
        },
        isOpen: {
            type: Boolean,
            required: false,
            default: false,
        },
        speed: {
            type: Number,
            required: false,
            default: 300,
        },
        backgroundColor: {
            type: String,
            required: false,
            default: "#fafafa",
        },
    },

    data() {
        return {
            width: '50%',
            isComposeMailDrawerOpen: false,
            showToMe: false,
            isVisible: false,
            isTransitioning: false,
            note: {
                noteTitle: '',
                noteText: ''
            },
            quill: null, // Quill instance
        };
    },

    watch: {
        isOpen(val) {
            this.isTransitioning = true;
            if (val) {
                this.toggleBackgroundScrolling(true);
                this.isVisible = true;
            } else {
                this.toggleBackgroundScrolling(false);
                setTimeout(() => (this.isVisible = false), this.speed);
            }
            setTimeout(() => (this.isTransitioning = false), this.speed);
        },
    },

    methods: {
        toggleWidth() {
            this.width = this.width === '50%' ? '100%' : '50%';
        },
        showToMeDetails() {
            this.showToMe = !this.showToMe;
        },
        toggleBackgroundScrolling(enable) {
            const body = document.querySelector("body");
            body.style.overflow = enable ? "hidden" : null;
            if (this.selectedButton !== "Update") {
                this.note.noteTitle = '';
                this.note.noteText = '';
            }
        },
        toggleComposeMailDrawer() {
            this.isComposeMailDrawerOpen = !this.isComposeMailDrawerOpen;
        },
        closeComposeMailDrawer() {
            if (!this.isTransitioning) {
        this.$emit("close");
      }
        },
        format(command, value) {
            if (this.quill) {
                this.quill.format(command, value);
            }
        },
        insertLink() {
            const url = prompt('Enter the URL');
            if (url) {
                this.quill.insertEmbed(this.quill.getSelection().index, 'link', url);
            }
        },
        insertImage() {
            const url = prompt('Enter the image URL');
            if (url) {
                this.quill.insertEmbed(this.quill.getSelection().index, 'image', url);
            }
        },
        changeFontSize() {
            const size = prompt('Enter font size (e.g., 16px)');
            if (size) {
                this.quill.format('size', size);
            }
        },
    },

    mounted() {
        this.isVisible = this.isOpen;

        // Initialize Quill editor
        this.quill = new Quill(this.$refs.quillEditor, {
            theme: 'snow',
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['link', 'image', 'video'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'font': [] }],
                    [{ 'align': [] }],
                    ['clean']
                ]
            }
        });
    }
};
</script>

<style lang="scss" scoped>
// General Styles
i {
    padding-left: 12px;
    cursor: pointer;
}

// Navigation Bar
.nav {
    width: 100%;
    background-color: rgb(243, 249, 249);
    border-radius: 5px;
    padding: 0.5em;
    margin-bottom: 10px;

    span {
        padding-left: 1em;
    }
}

// Icons inside span elements
span {
    i {
        padding-right: 1em;
    }
}

// Text Inputs
input[type="text"] {
    padding: 0.4em;
    width: 100%;
    box-sizing: border-box;
}

// Drawer Container
.drawer-inner {
    display: flex;
    flex-direction: column;
    height: 100%;
}

// Editable Area
.editable {
    flex: 1; // Takes up the remaining space
    padding: 10px;
    font-size: 16px;
    overflow: auto;
}

// Footer
.footer {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    background-color: #fafafa;
}

// Media Queries
@media (max-width: 768px) {
    .footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    
    .div1 {
        display: none; // Hide fixed button on smaller screens
    }

    span {
        i {
            padding-right: 10px;
            font-size: 10px;
        }
    }
}

@media (min-width: 769px) {
    .larger-screen {
        display: none;
    }
}

.drawer {
    visibility: hidden;

    &.is-visible {
        visibility: visible;
    }

    &.is-open {
        .drawer__overlay {
            opacity: 0.5;
        }

        .drawer__content {
            transform: translateX(0);
        }
    }

    &__overlay {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 200;
        opacity: 0;
        transition-property: opacity;
        background-color: #000000;
        user-select: none;
    }

    &__content {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
        z-index: 9999;
        overflow: auto;
        transition-property: transform;
        display: flex;
        flex-direction: column;
        transform: translateX(100%);
        box-shadow: 0 2px 6px #777;
    }
}
</style>
