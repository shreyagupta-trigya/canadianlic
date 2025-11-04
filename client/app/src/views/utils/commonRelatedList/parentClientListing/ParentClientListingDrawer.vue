<template>
    <div class="drawer-main-div card">
        <div class="drawer p-2" :class="{ 'is-open': isOpen, 'is-visible': isVisible }">
            <div class="drawer__overlay" :style="{ transitionDuration: `${speed}ms` }"></div>
            <div class="drawer__content" v-click-away="closeDrawer" :style="{
                maxWidth: maxWidth,
                transitionDuration: `${speed}ms`,
                backgroundColor: backgroundColor,
            }">

            <div class="header d-flex justify-content-between">
                <div class="px-3 py-1">
                    <i @click="closeDrawer" class="fa fa-arrow-right cursor-pointer"></i>
                </div>
                <div class="search-container mt-2" style="text-align: end;">
                    <input class="search-input" type="search" placeholder="Search" aria-label="Search">
                    <i class="fas fa-search" aria-hidden="true"></i>
                </div>
            </div>
                <div class="table-container border mt-3" ref="scrollContainer">
                    <div class="table-wrapper">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col" class="ps-2 pe-1 pb-0"><input type="checkbox"
                                            @change="toggleSelectAll" /></th>
                                    <th scope="col" class="px-1">Type</th>
                                    <th scope="col" class="px-1">Campaign Name</th>
                                    <th scope="col" class="px-1">Status</th>
                                    <th scope="col" class="px-1">Start Date</th>
                                    <th scope="col" class="px-1">End Date</th>
                                    <th scope="col" class="px-1">Expected Revenue</th>
                                    <th scope="col" class="px-1">Campaign Subject</th>
                                    <th scope="col" class="px-1">Sender Name</th>
                                    <th scope="col" class="px-1">Sender Address</th>
                                    <th scope="col" class="px-1">Reply-to Address</th>
                                    <th scope="col" class="px-1">Survey Department</th>
                                    <th scope="col" class="px-1">Survey Type</th>
                                    <th scope="col" class="px-1">Survey</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in items" :key="item.id">
                                    <td><input type="checkbox" v-model="item.selected" /></td>
                                    <td>{{ item.type }}</td>
                                    <td>{{ item.campaignName }}</td>
                                    <td>{{ item.status }}</td>
                                    <td>{{ item.startDate }}</td>
                                    <td>{{ item.endDate }}</td>
                                    <td>{{ item.expectedRevenue }}</td>
                                    <td>{{ item.campaignSubject }}</td>
                                    <td>{{ item.senderName }}</td>
                                    <td>{{ item.senderAddress }}</td>
                                    <td>{{ item.replyToAddress }}</td>
                                    <td>{{ item.surveyDepartment }}</td>
                                    <td>{{ item.surveyType }}</td>
                                    <td>{{ item.survey }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div v-if="loading" class="text-center py-2">Loading...</div>
                <div class="d-flex justify-content-center gap-2 w-100 mt-4 position-fixed bg-white" style="bottom: 0;">
                    <button class="btn btn-info" @click="submit">Submit</button>
                    <button class="btn btn-danger" @click="closeDrawer">Reset</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { directive } from "vue3-click-away";

export default {
    name: "ParentClientDrawer",
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
            default: "75%",
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
            loading: false,
            totalItems: 300,
            itemsPerPage: 20,
            currentOffset: 0,
        };
    },
    watch: {
        isOpen(val) {
            this.isTransitioning = true;
            if (val) {
                this.toggleBackgroundScrolling(true);
                this.isVisible = true;
                this.fetchData(); // Fetch data when opening
            } else {
                this.toggleBackgroundScrolling(false);
                setTimeout(() => (this.isVisible = false), this.speed);
            }
            setTimeout(() => (this.isTransitioning = false), this.speed);
        },
    },
    methods: {
        fetchData() {
            if (this.currentOffset >= this.totalItems || this.loading) return;

            this.loading = true;
            setTimeout(() => {
                const newItems = Array.from({ length: this.itemsPerPage }, (_, i) => ({
                    id: this.currentOffset + i,
                    type: `Type ${this.currentOffset + i + 1}`,
                    campaignName: `Campaign ${this.currentOffset + i + 1}`,
                    status: `Status ${this.currentOffset + i + 1}`,
                    startDate: `2024-10-${this.currentOffset + 1}`,
                    endDate: `2024-11-${this.currentOffset + 1}`,
                    expectedRevenue: `$${(Math.random() * 10000).toFixed(2)}`,
                    campaignSubject: `Subject ${this.currentOffset + i + 1}`,
                    senderName: `Sender ${this.currentOffset + i + 1}`,
                    senderAddress: `Address ${this.currentOffset + i + 1}`,
                    replyToAddress: `replyto${this.currentOffset + i + 1}@example.com`,
                    surveyDepartment: `Department ${this.currentOffset + i + 1}`,
                    surveyType: `Type ${this.currentOffset + i + 1}`,
                    survey: `Survey ${this.currentOffset + i + 1}`,
                    selected: false, // Initialize checkbox state
                }));

                this.items = [...this.items, ...newItems];
                this.currentOffset += this.itemsPerPage;
                this.loading = false;
            }, 1000);
        },
        toggleSelectAll(event) {
            const checked = event.target.checked;
            this.items.forEach(item => {
                item.selected = checked;
            });
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
            const selectedItems = this.items.filter(item => item.selected);
            alert(`Selected Items: ${selectedItems.map(item => item.campaignName).join(', ')}`);
        }
    },
    mounted() {
        this.isVisible = this.isOpen;

        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                this.fetchData();
            }
        }, {
            root: this.$refs.scrollContainer,
            rootMargin: '0px',
            threshold: 1.0
        });

        observer.observe(this.$refs.scrollContainer);
    }
};
</script>

<style lang="scss" scoped>
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
    top: 30%;
    right: 20px;
    transform: translateY(-50%);
    color: #666;
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

.table {
    th {
        background-color: #f2f2f2;
        text-align: left;
    }

    td {
        padding: 0.5rem;
    }
}
</style>
