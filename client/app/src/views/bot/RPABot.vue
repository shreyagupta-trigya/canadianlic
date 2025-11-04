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
                    <button @click="toggleDrawer" type="button" class="btn search-btn-list"
                        :class="{ 'active-reset': isFiltered }" :title="isFiltered
                            ? 'Filters applied — click to reset'
                            : 'Search'
                            ">
                        <span class="fa fa-search cursor-pointer"></span>
                    </button>
                </div>
                <div class=" justify-content-center mx-0 gap-1">
                    <div class=" justify-content-center mx-1">
                        <button @click="resetLeadList" type="button" class="btn search-btn-list "
                            :class="{ 'active-reset': isFiltered }" :title="isFiltered
                                ? 'Filters applied — click to reset'
                                : 'No filters to reset'
                                ">
                            <span class="fa fa-refresh cursor-pointer"></span>
                        </button>
                    </div>
                </div>
                <div>
                    <button @click="$router.push('/rpabotform')" class=" btn new-btn-list btn-sm " type="button"
                        aria-expanded="false">
                        New
                    </button>

                </div>
            </div>
            <div class="dropdown mx-1" :class="{
                dnone:
                    !showAndHideState?.import && !showAndHideState?.export,
            }">
                <button class="btn ellipsis-btn-list" data-bs-toggle="dropdown" aria-expanded="false"
                    id="dropdownMenuButton1">
                    <p class="fs-6 mb-0 cursor-pointer m-0 text-bold fs-5 fw-bold fa fa-ellipsis"></p>
                </button>

                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                    <li v-if="selectedLeads.length > 0">
                        <a class="dropdown-item" @click="deleteSelectedRecords"
                            :class="{ dnone: !showAndHideState.export }">Delete All</a>
                    </li>

                    <li>
                        <button @click="downloadFile('sample')" class="dropdown-item" type="button">
                            <a target="_blank"> Export sample</a>
                        </button>
                    </li>
                    <li>
                        <button class="dropdown-item" type="button" @click="openMassUpdatePopup">
                            Mass Update
                        </button>
                    </li>
                    <li>
                        <button class="dropdown-item" type="button" @click="openMassEmailPopup">
                            Mass Email
                        </button>
                    </li>

                </ul>
            </div>
            <!-- Dropdown Button -->
            <!-- <div class="dropdown dropstart">
                <button class="btn new-btn-list btn-sm  border px-3 py-2" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="bi bi-sliders no-hover"></i>
                </button>
                <ul class="dropdown-menu shadow-sm" style="min-width: 20px;">
                    <li>
                        <a class="dropdown-item no-hover me-5" @click="toggleColumnManageDrawer">Manage Columns</a>
                    </li>

                </ul>
            </div> -->


        </div>
    
    <div class="border" style="height:90vh;overflow:auto;min-width:80vw;position:relative;">
        <table class="table table-hover table-bordered">
            <thead class="thead-light bottom-border-light" style="position:sticky;top:0;z-index:10;background:white;">
                <tr>
                    <th style="text-align:center;width:50px;">
                        <div class="d-flex justify-content-center">
                            <input type="checkbox" style="height:20px;width:20px;"
                                :checked="selectedRows.length === paginatedRows.length && paginatedRows.length > 0"
                                @change="toggleSelectAll" />
                        </div>
                    </th>

                    <th v-for="(col, index) in visibleColumns.filter(c => c.visible)" :key="col.key"
                        :style="{ width: columnWidths[index] + 'px' }"
                        class="px-auto text-uppercase text-xxs text-start">

                        <div class="d-flex align-items-center justify-content-between pe-2">
                            <span class="text-sm">{{ col.label }}</span>
                            <div class="dropdown pe-3">
                                <i class="bi bi-list fs-5 p-1 cursor-pointer icon-transition icon-hover" role="button"
                                    data-bs-toggle="dropdown"></i>
                                <ul class="dropdown-menu shadow" style="min-width:16px;">
                                    <li>
                                        <a class="dropdown-item " @click="toggleSort(col.key)" style="cursor:pointer;">
                                            <i v-if="sortOrder === 'asc'" class="bi bi-arrow-up no-hover"></i>
                                            <i v-else="" class="bi bi-arrow-down no-hover"></i>
                                            <span>
                                                <span v-if="sortOrder === 'asc'" class="text-small">Asc</span>
                                                <span v-else class="text-small">Des</span>
                                            </span>
                                            <!-- <span v-else class="text-small">Asc</span> -->
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>


                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="row in sortedRows" :key="row.id">
                    <td>
                        <input style="margin-left:19px;" class="form-check-input" type="checkbox" v-model="selectedRows"
                            :value="row.id" />
                    </td>

                    <td v-if="isVisible('Action')" class="ps-3 text-sm border">
                        <div class="d-flex align-items-start ms-3">
                            <router-link :to="'/religionsform/'">
                                <i class="fas fa-eye blue-color" title="Preview"></i>
                            </router-link>
                            <div class="ms-2 position-relative" @click.stop>
                                <i class="fa-solid fa-ellipsis blue-color cursor-pointer"
                                    @click="toggleMenu(row.id)"></i>
                                <div v-if="openMenuId === row.id"
                                    class="menu bg-white shadow rounded p-2 position-absolute"
                                    style="min-width:120px;z-index:20;">
                                    <button class="dropdown-item w-100 text-start" @click="editRow(row.id)">
                                        Edit
                                    </button>
                                    <button class="dropdown-item w-100 text-start" @click="confirmDelete(row.id)">
                                        Delete
                                    </button>
                                </div>
                            </div>

                        </div>
                    </td>

                    <td class="border ps-4">{{ row.rpaBotName }}</td>
                    <td class="border ps-4">{{ row.botStatus }}</td>
                    <td class="border ps-4">{{ row.linkWithModule }}</td>
                    <td class="border ps-4">{{ row.policyPortalName }}</td>
                    <td class="border ps-4">{{ row.portalUserId }}</td>
                    <td class="border ps-4">{{ row.userPassword }}</td>
                    <td class="border ps-4">{{ row.aboutBot }}</td>
                    <td class="border ps-4">{{ row.createdTime }}</td>
                    <td class="border ps-4 pe-2 ">{{ row.modifiedTime }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
import Swal from "sweetalert2";
import { botColumns, botRows } from "./utill/utills";

export default {
    name: "RpaBotTable",
    data() {
        return {
            selectedTableLayout: "Client",
            selectedLeads: [],
            isFiltered: false,
            showAndHideState: {
                addButton: true,
                import: true,
                export: true,
            },
            rows: [],


            columns: botColumns,
            rows: botRows,
            selectedRows: [],
            sortColumn: null,
            sortOrder: "asc",
            openMenuId: null,
            columnWidths: Array(botColumns.length).fill(150),
            visibleColumns: [
                { key: "Action", visible: true },
                { key: "rpaBotName", visible: true },
                { key: "botStatus", visible: true },

            ],
        };
    },
    computed: {
        visibleColumns() {
            return this.columns;
        },
        paginatedRows() {
            // For now return all rows (pagination not implemented)
            return this.rows;
        },
        sortedRows() {
            if (!this.sortColumn) return this.rows;

            return [...this.rows].sort((a, b) => {
                const aVal = a[this.sortColumn];
                const bVal = b[this.sortColumn];

                if (aVal == null) return 1; // Handle null/undefined gracefully
                if (bVal == null) return -1;

                // Compare values
                if (this.sortOrder === "asc") {
                    return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
                } else {
                    return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
                }
            });
        },
    },
    methods: {
        isVisible(columnKey) {

            const col = this.visibleColumns.find(c => c.key === columnKey);
            return col ? col.visible : false;
        },
        handleTableListView(event) {
            const value = event.target.value;
            this.selectedTableLayout = value;
            console.log("Layout changed to:", value);
            // Add logic to fetch or filter data based on layout here
        },

        // 🔹 Toggle drawer (e.g., for search filters)
        toggleDrawer() {
            console.log("Drawer toggled");
            // Implement drawer open/close logic, or emit an event
        },

        // 🔹 Reset filters and refresh table
        resetLeadList() {
            this.isFiltered = false;
            this.selectedLeads = [];
            console.log("Filters reset and lead list refreshed");
            // Re-fetch or reset your table data here
        },

        // 🔹 Delete selected rows
        deleteSelectedRecords() {
            if (this.selectedLeads.length === 0) {
                alert("No leads selected.");
                return;
            }
            if (confirm("Delete selected records?")) {
                this.rows = this.rows.filter(row => !this.selectedLeads.includes(row.id));
                this.selectedLeads = [];
                console.log("Selected records deleted");
            }
        },


        downloadFile(type) {
            console.log(`Exporting file of type: ${type}`);

        },


        openMassUpdatePopup() {
            console.log("Mass Update popup opened");

        },


        openMassEmailPopup() {
            console.log("Mass Email popup opened");

        },


        toggleColumnManageDrawer() {
            console.log("Column Manage Drawer toggled");
        },

        toggleSelectAll(event) {
            if (event.target.checked) {
                this.selectedRows = this.paginatedRows.map((r) => r.id);
            } else {
                this.selectedRows = [];
            }
        },
        toggleSort(colKey) {
            if (this.sortColumn === colKey) {
                this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
            } else {
                this.sortColumn = colKey;
                this.sortOrder = "asc";
            }
        },

        toggleMenu(id) {
            this.openMenuId = this.openMenuId === id ? null : id;
        },
        editRow(id) {
            alert(`Edit row with ID: ${id}`);
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
      // Delete row if confirmed
      this.rows = this.rows.filter((r) => r.id !== id);
      Swal.fire({
        title: "Deleted!",
        text: "Your record has been deleted.",
        icon: "success",
        confirmButtonColor: "#E9C874"
      });
    }
    this.openMenuId = null; // Close dropdown menu in either case
  });
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
      // Delete row if confirmed
      this.rows = this.rows.filter((r) => r.id !== id);
      Swal.fire({
        title: "Deleted!",
        text: "Your record has been deleted.",
        icon: "success",
        confirmButtonColor: "#E9C874"
      });
    }
    this.openMenuId = null; // Close dropdown menu in either case
  });
}


    }
};
</script>

<style scoped>
.table th,
.table td {
    white-space: nowrap;
}

.menu {
    animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>
