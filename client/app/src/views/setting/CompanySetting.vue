<template>
    <div class="card custom-card">
        <div class="card-surface">
            <div class="company-setting">
                <div class="tabs">
                    <div v-for="tab in tabs" :key="tab" class="tab-item" @click="activeTab = tab">
                        <span :class="{ active: activeTab === tab }">{{ tab }}</span>
                        <div v-if="activeTab === tab" class="tab-underline"></div>
                    </div>
                </div>

                <div class="tab-content">
                    <div v-if="activeTab === 'Company Details'">
                        <!-- Company Details Form -->
                        <form @submit.prevent="saveSettings">
                            <!-- ... -->
                        </form>
                    </div>

                    <div v-else-if="activeTab === 'Holidays'" class="holiday-content">
                        <div class="header-row">
                            <div>
                                <h2>Holiday details</h2>
                                <p>Create a list of holidays based on your organization.</p>
                            </div>
                            <button class="primary-btn" size="small" @click="showForm = true">Create Holiday
                                list</button>
                        </div>
                    </div>

                    <!-- Holiday Form -->

                    <div v-if="activeTab === 'Holidays' && showForm" class="holiday-form">
                        <div class="card-surface p-2">
                            <h5 class="form-title p-2">Create Holiday list</h5>

                            <!-- Note -->
                            <div class="info-box mb-2 p-1">
                                <span>Note: Holidays added will influence other CRM features.</span>
                            </div>

                            <!-- Select Year -->

                            <div class="row ps-2 mb-4">
                                <div class="col-lg-4 col-md-4 col-sm-12">
                                    <label class="mb-0 mt-2" for="selectYear">Select year</label>
                                    <select id="selectYear" class="form-select" v-model="selectedYear">
                                        <option v-for="(year, index) in years" :key="index" :value="year">
                                            {{ year }}
                                        </option>
                                    </select>
                                </div>

                            </div>

                            <!-- Holiday List Box -->
                            <!-- Holiday List Box -->
                            <!-- <div class="card-surface">
                                <h6 class="fw-semibold mb-2 ps-2">Holiday list</h6>

                                <div class="holiday-box ps-3 pe-3 pt-3 pb-2">
                                    <div class="row align-items-end g-3 mb-3" v-for="(row, idx) in holidays"
                                        :key="row.id">
                                        
                                        <div class="col-lg-5 col-md-6 col-sm-12">
                                            <label class="form-label">Holiday name</label>
                                            <input type="text" class="form-control" placeholder="Holiday name"
                                                v-model="row.name" />
                                        </div>

                                       
                                        <div class="col-lg-5 col-md-6 col-sm-12">
                                            <label class="form-label">Holiday date</label>
                                            <div class="input-group">
                                                <flat-pickr :ref="el => datePickers[idx] = el" v-model="row.date"
                                                    :config="datePickerConfig" placeholder="DD/MM/YYYY"
                                                    class="form-control" />
                                                <span class="input-group-text" @click="openPicker(idx)">
                                                    <i class="fa fa-calendar"></i>
                                                </span>
                                            </div>
                                        </div>

                                    
                                        <div class="col-lg-2 col-md-12 col-sm-12 d-flex gap-3">
                                            
                                            <button type="button" class="btn btn-link p-0 text-danger action-icon"
                                                @click="removeHoliday(idx)" aria-label="Remove row">&#8211;</button>

                                           
                                            <button v-if="idx === holidays.length - 1" type="button"
                                                class="btn btn-link p-0 text-success action-icon" @click="addHoliday()"
                                                aria-label="Add row">+</button>
                                        </div>
                                    </div>
                                </div>

                            </div> -->
                            <!-- <div class="card-body p-1">
                                <div class="card-surface mb-1">
                                    <h5 class="main-heading mt-2 ps-2 mb-2">Important Festivals Dates</h5>
                                    <div style="width: 100%; overflow: scroll">
                                        <table class="table border table-responsive subform">
                                            <thead class="table subform-table-head text-white">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Actions</th>
                                                    <th>Festival Name</th>
                                                    <th>Date On Celebrated</th>
                                                </tr>
                                            </thead>
                                            <tbody class="table-group-divider">
                                                <tr v-for="(parent, index) in festivalsData" :key="index">
                                                    <td class="m-auto">{{ index + 1 }}</td>
                                                    <td>
                                                        <a @click.prevent="deleteFestivalTableRow(index)"
                                                            href="javascript:;" data-bs-toggle="tooltip"
                                                            data-bs-original-title="Delete product">
                                                            <i class="fas fa-trash text-secondary"
                                                                aria-hidden="true"></i>
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <div class="choices" data-type="select-one" tabindex="0"
                                                            role="listbox" aria-haspopup="true" aria-expanded="false">
                                                            <div class="select-box">
                                                                <select v-model="parent.festivalName"
                                                                    class="multisteps-form__select form-control choices__input"
                                                                    name="choices-state">
                                                                    <option v-for="(option, index) in festivals"
                                                                        :key="index" :value="option">
                                                                        {{ option }}
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <input v-model="parent.dateOfFestival" type="date"
                                                            class="form-control form-control-default"
                                                            autocomplete="off">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                   
                                </div>
                            </div> -->

                            <div class="card-body p-1">
                                <div class="card-surface mb-1">
                                    <h5 class="main-heading mt-2 ps-2 mb-2">Holiday Calendar</h5>
                                    <div style="width: 100%; overflow: auto">
                                        <table class="table border table-responsive subform">
                                            <thead class="table subform-table-head text-white">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Actions</th>
                                                    <th>Holiday Name</th>
                                                    <th>Holiday Date</th>
                                                </tr>
                                            </thead>
                                            <tbody class="table-group-divider">
                                                <tr v-for="(row, idx) in holidays" :key="row.id">
                                                    <!-- Serial number -->
                                                    <td class="m-auto">{{ idx + 1 }}</td>

                                                    <!-- Actions -->
                                                    <td class="d-flex gap-2">
                                                        <!-- Remove -->
                                                        <button type="button"
                                                            class="btn btn-link p-0 mt-1   ms-4 text-danger action-icon"
                                                            @click="removeHoliday(idx)" aria-label="Remove row">
                                                            <i class="fas fa-trash text-secondary"
                                                                aria-hidden="true"></i>
                                                        </button>

                                                        <!-- Add (only on last row) -->

                                                    </td>

                                                    <!-- Holiday Name -->
                                                    <td>
                                                        <input v-model="row.name" type="text" class="form-control"
                                                            placeholder="Holiday name" />
                                                    </td>

                                                    <!-- Holiday Date -->
                                                    <td>
                                                        <div class="input-group">
                                                            <flat-pickr :ref="el => datePickers[idx] = el"
                                                                v-model="row.date" :config="datePickerConfig"
                                                                placeholder="DD/MM/YYYY" class="form-control" />
                                                            <span class="input-group-text" @click="openPicker(idx)">
                                                                <i class="fa fa-calendar"></i>
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!-- <button class="btn mb-0 btn-color btn-md null null" type="button"
                                        @click.prevent="addRowToFestivalsTable">
                                        
                                    </button> -->
                                    <button type="button" class="btn mb-0 btn-color btn-md null null"
                                        @click="addHoliday()" aria-label="Add row">
                                        Add Row
                                    </button>
                                </div>
                            </div>


                            <!-- Save / Cancel Buttons -->
                            <!-- Card Footer -->
                            <div class="card-footer d-flex justify-content-start gap-2">
                                <button class="btn btn-info btn-sm" @click="save">Save</button>
                                <button class="btn btn-outline-secondary btn-sm" @click="cancel">Cancel</button>
                            </div>

                            <!-- Success Message -->
                            <!-- <div v-if="message" class="alert alert-success mt-3">{{ message }}</div> -->
                        </div>

                    </div>



                    <div v-if="message" class="message">{{ message }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
export default {
    name: "CompanySetting",
    components: { FlatPickr },
    data() {
        return {
            tabs: [
                "Company Details",
                "Fiscal Year",
                "Business hours",
                "Holidays",
                "Currencies"
            ],
            activeTab: "Holidays",
            holidays: [
                { id: 1, name: "", date: "" }
            ],
            showForm: false,
            selectedYear: 2025,
            years: [2025, 2026, 2027],

            holidayName: "",
            holidayDate: "",

            // Flatpickr Config
            // keep refs to each picker instance
            datePickers: [],

            datePickerConfig: {
                dateFormat: "d/m/Y",
                altInput: false,
                allowInput: true
            },
            message: "",
        };
    },
    methods: {
        addHoliday() {
            const nextId = this.holidays.length ? Math.max(...this.holidays.map(h => h.id)) + 1 : 1;
            this.holidays.push({ id: nextId, name: "", date: "" });
            this.$nextTick(() => {
                // focus the new row's name field automatically (optional)
            });
        },
        removeHoliday(index) {
            this.holidays.splice(index, 1);
            if (!this.holidays.length) {
                // always keep at least one empty row
                this.holidays.push({ id: 1, name: "", date: "" });
            }
        },
        openPicker(index) {
            const ref = this.datePickers[index];
            if (ref && ref.fp) ref.fp.open();
        },

        save() {
            this.message = "Holiday list saved successfully!";
        },
        cancel() {
            this.showForm = false;
            this.message = "";
        }


    },
};
</script>

<style scoped>
.card-surface {
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.tabs {
    display: flex;
    gap: 2rem;
    padding: 1rem 1.5rem 0.5rem;
    background-color: #f9f9fc;
    border-bottom: 1px solid #e0e0e0;
}

.tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 6px 12px;
    cursor: pointer;
    position: relative;
}

.tab-item span {
    font-weight: 500;
    font-size: 15px;
    color: #444;
}

.tab-item span.active {
    font-weight: 700;
    color: #000;
}

.tab-underline {
    width: 100%;
    height: 3px;
    background-color: #3b82f6;
    border-radius: 9999px;
    margin-top: 4px;
}

.tab-content {
    padding: 2rem;
}

.holiday-content .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.holiday-content h2 {
    font-size: 20px;
    font-weight: 700;
    color: #1f2d3d;
    margin-bottom: 0.25rem;
}

.holiday-content p {
    font-size: 14px;
    color: #4b5563;
}

.primary-btn {
    background-color: #3b82f6;
    color: white;
    font-weight: 600;
    border: none;
    border-radius: 6px;
    padding: 4px 16px;
    cursor: pointer;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
    transition: background 0.2s;
}

.primary-btn:hover {
    background-color: #2563eb;
}

.card-header {
    background-color: #ffffff;
    border-bottom: 1px solid #eee;
    padding: 1rem 1.25rem;
}

.card-body {
    padding: 1.5rem;
}

.card-footer {
    background-color: #fafafa;
    border-top: 1px solid #eee;
    padding: 1rem 1.5rem;
}

/* put inside <style scoped> with your existing styles */

.holiday-box {
    background-color: #f9fafe;
    border: 1px solid #e5eaf2;
    border-radius: 10px;
}

/* plus/minus look like your screenshot */
.action-icon {
    font-size: 20px;
    line-height: 1;
    text-decoration: none;
}

.action-icon:hover {
    opacity: 0.8;
    text-decoration: none;
}
</style>
