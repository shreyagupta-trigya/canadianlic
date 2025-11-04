<template>
    <div class="drawer-main-div card">
        <div class="drawer p-2" :class="{ 'is-open': isOpen, 'is-visible': isVisible }">
            <div class="drawer__overlay" :style="{ transitionDuration: `${speed}ms` }"></div>
            <div class="drawer__content" v-click-away="closeDrawer" :style="{
                maxWidth: maxWidth,
                transitionDuration: `${speed}ms`,
                backgroundColor: backgroundColor,
            }">
                <div class="px-3 py-1 d-flex justify-content-between">
                    <div class="left-arrow">
                         <i @click="closeDrawer" class="fa fa-arrow-right cursor-pointer"></i>
                    </div>
                    <div class="search-container-div mt-3 mb-3">
                        <div class="search-container">
                            <input class="search-input" type="search" placeholder="Search" aria-label="Search">
                            <i class="fas fa-search" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>

                <div class="drawer-body">
                  
                    <div class="table-container border" ref="scrollContainer">
                        <table class="table table-striped custom-scroll">
                            <thead>
                                <tr>
                                    <td scope="col"><input class="form-check-input mt-0 compagion-checkbox"
                                            type="checkbox" /></td>
                                    <td scope="col" class="color fw-semibold">Offering Name</td>
                                    <td scope="col" class="color fw-semibold">Insurance Partner</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in items" :key="item.id">
                                    <td><input class="form-check-input mt-0 compagion-checkbox" type="checkbox" /></td>
                                    <td>{{ item.offeringName }}</td>
                                    <td>{{ item.insurancePartner }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-if="loading" class="text-center py-2">Loading...</div>
                </div>


                <div class="d-flex justify-content-center gap-2 w-100 mt-4 position-fixed bg-white" style="bottom: 0;">
                    <button class="btn btn-info">Submit</button>
                    <button class="btn btn-danger" @click="closeDrawer">Reset</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { directive } from "vue3-click-away";
import { reactive } from 'vue';
export default {
    name: "Drawer",
    directives: {
        ClickAway: directive,
    },
    props: {
        isOpen: {
            type: Boolean,
            required: false,
            default: false,
        },
        maxWidth: {
            type: String,
            required: false,
            default: "50%",
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
            isVisible: false,
            isTransitioning: false,
            items: [],
            isPopupOpen: reactive(false),
            loading: false,
            totalItems: 300,
            itemsPerPage: 20,
            currentOffset: 0
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
        openPopup() {
            this.isPopupOpen = !this.isPopupOpen;
        },
        fetchData() {
            if (this.currentOffset >= this.totalItems || this.loading) return;

            this.loading = true;
            setTimeout(() => {
                const newItems = Array.from({ length: this.itemsPerPage }, (_, i) => ({
                    id: this.currentOffset + i,
                    offeringName: `Offering ${this.currentOffset + i + 1}`,
                    insurancePartner: `Partner ${this.currentOffset + i + 1}`
                }));

                this.items = [...this.items, ...newItems];
                this.currentOffset += this.itemsPerPage;
                this.loading = false;
            }, 1000);
        },
        handleScroll(entries) {
            const [entry] = entries;
            if (entry.isIntersecting) {
                this.fetchData();
            }
        },
        toggleBackgroundScrolling(enable) {
            const body = document.querySelector("body");
            body.style.overflow = enable ? "hidden" : null;
        },
        closeDrawer() {
            if (!this.isTransitioning) {
                this.$emit("close");
            }
        },
        submit() {
            // Handle submit logic here
            alert('Form submitted');
        }
    },
    mounted() {
        this.isVisible = this.isOpen;
        this.fetchData();

        const observer = new IntersectionObserver(this.handleScroll, {
            root: this.$refs.scrollContainer,
            rootMargin: '0px',
            threshold: 1.0
        });

        observer.observe(this.$refs.scrollContainer);
    }
};
</script>

<style lang="scss" scoped>
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
            min-width: 50%;
            transform: translateX(0);
        }
    }

    &__overlay {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #000;
        opacity: 0;
        transition: opacity 0.3s;
    }

    &__content {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        transition: transform 0.3s;
        transform: translateX(100%);
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
}

.drawer-body {
    flex-grow: 1;
    overflow-y: auto;
}

.table-container {
    max-height: 80vh; // Set the height of the scrollable table container
    overflow-y: auto;
}

.drawer-footer {
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    background-color: #f9f9f9;
    padding: 1rem;
    border-top: 1px solid #ddd;
}

.search-container {
    /* position: relative; */
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
    position: relative;
    top: 50%;
    right: 25px;
    /* transform: translateY(-50%); */
    color: #666;
}
</style>
