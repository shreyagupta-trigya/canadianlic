<template>
    <div style="width: 99%;" class="d-flex  justify-content-end align-items-center">
        <div class="col-md-4 col-sm-12 mt-2 mr-3" style="
                      position: absolute;
                      left: 15px;
                      width: 12rem;
                      border: 2px solid 184e88;
                      border-radius: 10px;
                      top: -1px;
                    ">

        </div>
        <div class="d-flex align-items-center">
            <div class=" justify-content-center mx-0 gap-1">
                <button  type="button" class="btn search-btn-list"
                    :class="{ 'active-reset': isFiltered }" :title="isFiltered
                        ? 'Filters applied — click to reset'
                        : 'Search'
                        ">
                    <span class="fa fa-search cursor-pointer"></span>
                </button>
            </div>
            <div class=" justify-content-center mx-0 gap-1">
                <div class=" justify-content-center mx-1">
                    <button  type="button" class="btn search-btn-list "
                        :class="{ 'active-reset': isFiltered }" :title="isFiltered
                            ? 'Filters applied — click to reset'
                            : 'No filters to reset'
                            ">
                        <span class="fa fa-refresh cursor-pointer"></span>
                    </button>
                </div>
            </div>
            <div>
                <button @click="$router.push('/religionsform')" class=" btn new-btn-list btn-sm " type="button"
                    aria-expanded="false">
                    New
                </button>

            </div>
        </div>
        <div class="dropdown mx-1" :class="{
            // dnone:
            //     !showAndHideState?.import && !showAndHideState?.export,
        }">
            <button class="btn ellipsis-btn-list" data-bs-toggle="dropdown" aria-expanded="false"
                id="dropdownMenuButton1">
                <p class="fs-6 mb-0 cursor-pointer m-0 text-bold fs-5 fw-bold fa fa-ellipsis"></p>
            </button>

            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                <li v-if="selectedLeads.length > 0">
                    <a class="dropdown-item" 
                        :class="{ dnone: !showAndHideState.export }">Delete All</a>
                </li>

                <li>
                    <button class="dropdown-item" type="button">
                        <a target="_blank"> Export sample</a>
                    </button>
                </li>
                <li>
                    <button class="dropdown-item" type="button" >
                        Mass Update
                    </button>
                </li>
                <li>
                    <button class="dropdown-item" type="button" >
                        Mass Email
                    </button>
                </li>

            </ul>
        </div>
       


    </div>
    <!-- <div class="w-full" style="height:63px;display:flex;justify-content:space-between;background-color:white;">
        <div></div>
        <div class="mt-3 me-4">
            <button @click="$router.push('/religionsform')" class="border rounded">Create Religion</button>
        </div>
    </div> -->

    <div class="religions-list-container">
        <!-- Sidebar -->
        <!-- <div class="sidebar border border-end-0 position-fixed h-100 overflow-auto bg-white" style="width:260px;">
            <div class="table-light w-full px-2 py-1"
                style="position:sticky;top:0;z-index:30;background:white;height:100px;">
                <div class="sidebar-header fw-semibold">Filter Religions by</div>
                <input type="text" class="form-control" placeholder="Search" v-model="search" />
            </div>

            <div class="sidebar-section mb-3 px-3">
                <div class="sidebar-section-title fw-bold small mb-2" @click="isSystemCollapsed = !isSystemCollapsed"
                    style="cursor:pointer;display:flex;align-items:center;justify-content:space-between;">
                    <span>System Defined Filters</span>
                    <span>{{ isSystemCollapsed ? '▶' : '▼' }}</span>
                </div>
                <div v-show="!isSystemCollapsed">
                    <div v-for="filter in systemFilters" :key="filter" class="form-check d-flex align-items-center">
                        <input class="form-check-input" type="checkbox" :id="filter" v-model="selectedSystemFilters"
                            :value="filter" />
                        <label class="mt-2" :for="filter">{{ filter }}</label>
                    </div>
                </div>
            </div>

          
            <div class="sidebar-section px-3">
                <div class="sidebar-section-title fw-bold small mb-2" @click="isFieldCollapsed = !isFieldCollapsed"
                    style="cursor:pointer;display:flex;align-items:center;justify-content:space-between;">
                    <span>Filter By Fields</span>
                    <span>{{ isFieldCollapsed ? '▶' : '▼' }}</span>
                </div>
                <div v-show="!isFieldCollapsed">
                    <div v-for="field in fieldFilters" :key="field" class="form-check d-flex align-items-center">
                        <input class="form-check-input" type="checkbox" :id="field" v-model="selectedFieldFilters"
                            :value="field" />
                        <label class="mt-2" :for="field">{{ field }}</label>
                    </div>
                </div>
            </div>

        
            <div class="sidebar-section px-3">
                <div class="sidebar-section-title fw-bold small mb-2" @click="isModuleCollapsed = !isModuleCollapsed"
                    style="cursor:pointer;display:flex;align-items:center;justify-content:space-between;">
                    <span>Filter By Related Modules</span>
                    <span>{{ isModuleCollapsed ? '▶' : '▼' }}</span>
                </div>
                <div v-show="!isModuleCollapsed">
                    <div v-for="module in moduleFilters" :key="module" class="form-check d-flex align-items-center">
                        <input class="form-check-input" type="checkbox" :id="module" v-model="selectedModuleFilters"
                            :value="module" />
                        <label class="mt-2" :for="module">{{ module }}</label>
                    </div>
                </div>
            </div>
        </div> -->

        <!-- Table -->
        <div class="flex-grow-1 border position-fixed"
            style="height:100vh; width:85vw; overflow-y: auto;">
                <table class="table table-hover table-bordered align-middle">
                <thead class="thead-light bottom-border-light" style="position:sticky;top:0;z-index:10;">
                    <tr>
                        <th class="" style=" position: relative; text-align: center; width: 25px; ">
                            <div class="d-flex justify-content-center">
                                <input type="checkbox" style="height: 17px; width: 18px;"
                                    :checked="selectedContacts.length === paginatedRows.length && paginatedRows.length > 0"
                                    @change="toggleSelectAll($event)" />
                                <!-- <div class="resizer" @mousedown="startResize($event, 0)"></div> -->
                            </div>
                        </th>
                        <!-- Dynamic Columns -->
                        <th v-for="(col, index) in visibleColumns.filter(col => col.visible)" :key="col.key"
                            class="px-auto text-uppercase text-xxs text-start" style="position: relative"
                            :style="{ width: columnWidths[index] + 'px' }">
                            <div class="d-flex align-items-center justify-content-between ">
                                <a class="text-sm ">{{ col.label }}</a>
                                <!-- Sort Icons -->
                                <div class="dropdown pe-5">
                                    <i class="bi bi-list  fs-5   cursor-pointer icon-transition icon-hover"
                                        role="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                    <ul class="dropdown-menu shadow " style="min-width: 50px;">
                                        <li>
                                            <a class="dropdown-item  " @click="toggleSort(col.key)"
                                                style="cursor:pointer;">
                                                <i v-if="sortOrder === 'asc'" class="bi bi-arrow-up no-hover"></i>
                                                <i v-else class="bi bi-arrow-down no-hover"></i>
                                                <span v-if="sortColumn === col.key">
                                                    <span v-if="sortOrder === 'asc'" class="text-small">Asc</span>
                                                    <span v-else class="text-small">Des</span>
                                                </span>
                                                <span v-else class="text-small">Asc</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div v-if="index !== visibleColumns.filter(col => col.visible).length - 1" class="resizer"
                                @mousedown="startResize($event, index)">
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in sortedRows" :key="row.id">
                        <!-- Checkbox -->
                        <td>
                            <div style="margin-left: 20px ; width: 25px;" class="d-flex text-center ">
                                <div class="my-auto form-check">
                                    <input class="form-check-input" type="checkbox" v-model="selectedContacts"
                                        :value="row.id" />
                                </div>
                            </div>
                        </td>

                        <!-- Actions -->
                        <td v-if="isVisible('Action')" class="ps-0 text-sm dropdown-cell border">
                            <div class="d-flex align-items-start ms-5">
                                <router-link :to="'/religionsform/'"
                                    :class="{ disable: !showAndHideState.previewButton }">
                                    <a href="javascript:;" data-bs-toggle="tooltip" title="Preview">
                                        <i class="fas fa-eye blue-color"></i>
                                    </a>
                                </router-link>

                                <div class="list-ellipsis-drop ms-2 position-relative" @click.stop>
                                    <!-- Ellipsis icon -->
                                    <i class="fa-solid fa-ellipsis blue-color cursor-pointer"
                                        @click="toggleMenu(row.id)"></i>

                                    <!-- Custom dropdown -->
                                    <div v-if="openMenuId === row.id"
                                        class="menu bg-white shadow rounded p-2 position-absolute"
                                        style="min-width: 120px; z-index: 20;">
                                        <button class="dropdown-item w-100 text-start"
                                            :class="{ disable: !showAndHideState.editButton }" @click="editRow(row.id)">
                                            Edit
                                        </button>
                                        <button class="dropdown-item w-100 text-start"
                                            :class="{ disable: !showAndHideState.deleteButton }"
                                            @click="confirmDelete(row.id)">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="border ps-4">{{ row.religion }}</td>
                        <td class="border ps-4">{{ row.religionName }}</td>
                        <td class="border ps-4">{{ row.owner }}</td>
                        <td class="border ps-4">{{ row.modified }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    name: "ReligionTable",
    name: "ContactRow",
    props: ['row', 'showAndHideState'],
    data() {
        return {
              isFiltered: false,       // Initialize isFiltered
      selectedLeads: [],  

            openMenuId: null,
            search: "",
            paginatedRows: [
                { id: 1, religion: "Hinduism", religionName: "Sanatana Dharma", owner: "Admin", modified: "2025-09-01" },
                { id: 2, religion: "Christianity", religionName: "Catholic", owner: "John Doe", modified: "2025-08-28" },
                { id: 3, religion: "Islam", religionName: "Sunni", owner: "Ayesha", modified: "2025-08-22" },
            ],
            visibleColumns: [
                { key: "action", label: "Action", visible: true },
                { key: "religion", label: "Religion", visible: true },
                { key: "religionName", label: "Religion Name", visible: true },
                { key: "owner", label: "Religion Owner", visible: true },
                { key: "modified", label: "Modified Time", visible: true },
            ],
            contacts: [
                { contactROWID: 1, name: "John Doe" },
                { contactROWID: 2, name: "Jane Smith" },
                { contactROWID: 3, name: "Ali Khan" }
            ],
            selectedContacts: [],
            showAndHideState: {
                previewButton: true,
                editButton: true,
                deleteButton: true
            },
            columnWidths: [150, 200, 200, 150],
            selectedRows: [],
            sortColumn: null,
            sortOrder: "asc",

            isSystemCollapsed: true,
            isFieldCollapsed: true,
            isModuleCollapsed: true,
            systemFilters: ["Touched Records", "Untouched Records", "Locked", "Activities"],
            selectedSystemFilters: [],
            fieldFilters: ["Religion", "Religion Name", "Religion Owner"],
            selectedFieldFilters: [],
            moduleFilters: ["Calls", "Emails", "Tasks"],
            selectedModuleFilters: [],
        };
    },
    mounted() {
        // Close menu when clicking outside
        document.addEventListener('click', this.handleOutsideClick);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleOutsideClick);
    },

    computed: {
        filteredRows() {
            if (!this.search) return this.paginatedRows;
            return this.paginatedRows.filter(row =>
                row.religion.toLowerCase().includes(this.search.toLowerCase()) ||
                row.religionName.toLowerCase().includes(this.search.toLowerCase()) ||
                row.owner.toLowerCase().includes(this.search.toLowerCase())
            );
        },
        sortedRows() {
            if (!this.sortColumn) return this.filteredRows;
            return [...this.filteredRows].sort((a, b) => {
                const valA = a[this.sortColumn] ?? "";
                const valB = b[this.sortColumn] ?? "";
                return this.sortOrder === "asc"
                    ? valA.localeCompare(valB)
                    : valB.localeCompare(valA);
            });
        },
    },
    methods: {
        toggleMenu(id) {
            this.openMenuId = this.openMenuId === id ? null : id;
        },
        editRow(id) {
            this.$router.push(`/contact/${id}`);
            this.openMenuId = null;
        },
        confirmDelete(id) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                iconColor: "red",
                showCancelButton: true,
                confirmButtonColor: "#E9C874",
                cancelButtonColor: "red",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    // Remove row by ID
                    this.rows = this.rows.filter((r) => r.id !== id);

                    // Success alert
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your record has been deleted.",
                        icon: "success",
                        confirmButtonColor: "#E9C874"
                    });
                }
                // Always close menu
                this.openMenuId = null;
            });
        },

        handleOutsideClick() {
            this.openMenuId = null;
        },

        isVisible(column) {
            // Return true/false depending on your logic
            // For now, always return true for demo
            return column === "Action" || true;
        },
        toggleSelectAll(event) {
            if (event.target.checked) {

                this.selectedContacts = this.paginatedRows.map(r => r.id);
            } else {

                this.selectedContacts = [];
            }
        },

        toggleSort(columnKey) {
            if (this.sortColumn === columnKey) {
                this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
            } else {
                this.sortColumn = columnKey;
                this.sortOrder = "asc";
            }
        },
        startResize(event, index) {
            const startX = event.pageX;
            const startWidth = this.columnWidths[index];
            const onMouseMove = e => {
                const newWidth = startWidth + (e.pageX - startX);
                if (newWidth > 50) this.$set(this.columnWidths, index, newWidth);
            };
            const onMouseUp = () => {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            };
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        },
    },
    isVisible(column) {
        return column === "Action"; // Always show for this example
    },

    // Confirm before deleting
    // confirmDelete(id) {
    //     if (confirm(`Delete item with ID ${id}?`)) {
    //         this.paginatedRows = this.paginatedRows.filter(r => r.id !== id);
    //         this.selectedContacts = this.selectedContacts.filter(cid => cid !== id);
    //     }
    // }
};
</script>

<style scoped>
.religions-list-container {
    display: flex;
    background: #f8f9fb;
    font-family: "Inter", Arial, sans-serif;
    font-size: 14px;
    color: #222;
    min-height: 100vh;
}

.sidebar {
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.sidebar::-webkit-scrollbar {
    display: none;
}

.sidebar-header {
    font-weight: 500;
    margin-bottom: 12px;
}

.sidebar-section-title {
    font-weight: 600;
    cursor: pointer;
}

.resizer {
    position: absolute;
    top: 0;
    right: 0;
    width: 5px;
    cursor: col-resize;
    user-select: none;
}

th,
td {
    padding: 10px;
    border-bottom: 1px solid #e5e7eb;
}

th {
    background: #f8f9fb;
    font-weight: 500;
}
</style>
