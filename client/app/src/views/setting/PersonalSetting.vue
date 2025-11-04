<template>
    <!-- navbar strats here -->
    <nav :class="[mobileView ? 'col px-0' : 'row px-2']" class=" col-12   pb-0 pt-3 border-bottom">
        <!-- navbar to show in desktop -->
        <div v-if="!mobileView" class="col-10 ">
            <a :class="{ 'selected': selectedTab === 'Personal Settings' }" @click="selectTab('Personal Settings')"
                class="text-md px-3 pt-2 mx-2 " href="javascript:;">Personal Settings</a>
            <a :class="{ 'selected': selectedTab === 'Keyboard Shortcuts' }" @click="selectTab('Keyboard Shortcuts')"
                class="mx-2 text-md px-3 pt-2  position-relative" href="javascript:;">Keyboard Shortcuts
             
            </a>

        </div>
    </nav>
    <!-- navbar Items to show in destop ends -->

    <div class="p-2 pb-5">
        <div class="card">
            <!-- part Personal Settings 1  -->
            <div v-if="selectedTab === 'Personal Settings'">
                <div class="card">
                    <div class="row">
                        <!-- image box -->
                        <div class=" d-flex pt-1 col-12">
                            <div class="overview-img text-center "> <span class="overview-img-text pt-2">PA</span></div>
                            <div class=" mt-4 ">
                                <p class="mb-0 heading-color overview-heading text-bold">Master Demo</p>
                                <p :class="mobileView ? 'text-sm' : 'text-lg'">CEO Trigya</p>
                                <div class="d-flex">
                                    <i :class="[mobileView ? 'text-sm' : 'fs-4', 'fa', 'fa-whatsapp', 'cursor-pointer', 'pe-2', 'blue-color-icon']"
                                        title="Whats App"></i>
                                    <p> user1@demo1.trigya.co</p>
                                    <i :class="[mobileView ? 'text-sm' : 'fs-4', 'fa', 'fa-commenting-o', 'cursor-pointer', 'ps-2', 'blue-color-icon']"
                                        title="Send SMS"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center m-2">
                        <p class="mb-0 mx-2 m-2 heading-color  fw-bold">Locale Information
                        </p>
                        <i class="fa fa-pencil heading-color fs-6"></i>
                    </div>
                    <div class="row">
                        <section class="col-2 text-end">
                            <p class="heading-color mb-1">Language</p>
                            <p class="heading-color mb-1">Country Locale</p>
                            <p class="heading-color mb-1">Date Format</p>
                            <p class="heading-color mb-1">Time Format</p>
                            <p class="heading-color mb-1">Time Zone</p>
                            <p class="heading-color mb-1">Preferred Currency</p>
                            <p class="heading-color mb-1">Number Format</p>
                        </section>
                        <section class="col-6">
                            <p class="heading-color mb-1">English (United States)</p>
                            <p class="heading-color mb-1">United States</p>
                            <p class="heading-color mb-1">MMM D, YYYY</p>
                            <p class="heading-color mb-1">12 Hours</p>
                            <p class="heading-color mb-1">(GMT 5:30) India Standard Time (Asia/Kolkata)</p>
                            <p class="heading-color mb-1">Indian Rupee - INR</p>
                            <p class="heading-color mb-1">123,456.789</p>
                        </section>
                    </div>

                    <div>
                        
                    <div class="d-flex align-items-center m-2">
                            <p class="mb-0 mx-2  fw-bold heading-color">Groups
                            </p>
                    </div>
                    <div class="row">
                        <section class="col-2 text-end">
                            <p class="heading-color">Member in</p>                          
                        </section>
                        <section class="col-6">
                            <p class="heading-color">-</p>                          
                        </section>
                    </div>
                     <div class=" mx-2 mb-2">
                        <p class="mb-0 mx-2 fw-bold heading-color">Display Name Format & Preferences</p>
                        <p class="heading-color mx-2">It applies to full name in column of list view, lookup fields and user name</p>
                     </div>

                    </div>


                </div>
            </div>
            <!-- Personal Settingsends from here -->
            <div v-if="selectedTab === 'Keyboard Shortcuts'">
                shortcuts
            </div>
        </div>
    </div>

</template>
<script>
export default {
    data() {
        return {
            selectedTab: 'Personal Settings',
            selectedActionTab: '',
        }
    },
    methods: {
        // popup methods ends
        selectTab(tabName) {
            this.headerName = tabName;
            this.selectedActionTab = "";
            this.selectedTab = tabName;

        },

        selectActionTab(tabName) {
            this.headerName = tabName;
            this.selectedActionTab = tabName;
            if (tabName === 'overview') {
                this.visibleOverview = true;
                this.visibleActions = false;
            } else {
                this.visibleOverview = false;
                this.visibleActions = true;
            }
        },

    }

}
</script>
<style scoped>
.dot-badge {
    top: 27% !important;
    left: 90% !important;
}

.conatct-overview .card {
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.contactView nav a {
    padding: 3px 8px !important;
}

.text-color {
    color: #395886;
}

nav {
    font-weight: 600;
}

.blue-color-background {
    background-color: #0060B9;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.5s ease-in-out;
}

.slide-enter,
.slide-leave-to {
    transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave {
    transform: translateX(0);
}



ul {
    list-style: none;
}

ul li {
    margin: 5px;
}

.overview-heading {
    font-size: 20px;
}



.attach-btn {
    background-color: white !important;
    border: 1px solid #0060B9 !important;
    color: #0060B9 !important;
    border-radius: 5px;
}

.add-btn {
    background-color: white !important;
    border: 1px solid #0060B9 !important;
    color: #0060B9 !important;
    border-radius: 5px;
}

table {
    color: #323338 !important;
    font-size: 14px !important;
}

td {
    cursor: pointer;
}

th {
    padding: 1rem 0.5rem !important;
    cursor: pointer;
}


/* when no data is here */

.null-data-image-div {
    display: flex;
    justify-content: center;
    align-items: center;
}

.null-data-image-div img {
    max-height: 50vh;
}

/* when no data is here */
hr {
    margin: 1rem !important;
}

.refferal-cards {
    max-height: 25vh;
    overflow: scroll;

}

.User-cards {
    /* background-color: #CCE5FF; */
    margin-left: 1rem;
    border: 1px solid rgba(192, 192, 192, 0.5);
    margin-left: 1rem !important;
    border-radius: 1rem;

}

.User-cards:hover {
    background-color: #DCDFEC;
    cursor: pointer;
}

.User-headings {
    background-color: #CCE5FF;
    border: 1px solid rgba(192, 192, 192, 0.5);
    border-radius: 5px;
    height: 2rem;
    padding-left: 10px;
    border-right: none;
    color: #323338;

}

.User-details-section {
    transition: min-height 0.2s ease-in-out;
    transition: width 0.3s ease-in-out;
    position: absolute;
    right: 0;
    top: 3.1rem;
    z-index: 5;
    background-color: #fff;
    min-height: 87vh;
    /* box-shadow: inset 12px 0 0px rgb(241, 241, 241) !important; */
    box-shadow: inset 12px 0 0px #ced4da !important;
}


.User-details-content {}

.border {
    border-radius: 5px !important;
}

.custom-border-body {
    border: 1px solid rgba(192, 192, 192, 0.5);
    border-radius: 5px;
    transition: 0.2s ease-in;
    overflow: hidden;
}

.custom-border-body:hover {
    background-color: #DCDFEC;
}

.custom-border-data {
    border: none;
}

.custom-border-body .card-body {
    padding: 0.5rem 1.5rem !important;
}
.desktop-notifications {
    background-color: #0060B9 !important;
    border: none;
    border-radius: 5px !important;
    color: white !important;


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

.purple-higlight {
    color: #fff;
    font-weight: 600;
    background-color: #A25DDC;
}

.blue-color {
    color: #0060B9 !important
}

.blue-color-icon {
    font-size: 20px;
    color: #0060B9
}

.info-btn {
    background-color: #0060B9;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 15px;
    width: 4rem;
    font-weight: 600;
    padding: 3px 15px;
}

.save-btn {
    background-color: white !important;
    border: 1px solid #0060B9 !important;
    color: #0060B9 !important;
}

.overview-part2-div {
    min-height: 30vh;
}

.heading-color {
    color: #323338
}

.overview-img-text {
    font-size: 3.5rem;
    font-weight: 700;
    color: white;
}

.overview-img {
    width: 7rem;
    height: 7rem;
    border-radius: 100%;
    background-color: pink;
    margin: 1.5rem;
}

a {
    color: #323338 !important
}

a:hover {
    color: #323338
}


a:hover {
    color: #323338;
}

/* .selected {
    border: 1px solid silver;
    align-items: center;
    height: 2rem;
    border-radius: 5px;
    border-bottom: 2px solid #fff;
    background-color: #fff;
    transform: translateY(1px);
    font-weight: 700;
} */


.selected {
    border-bottom: 2px solid blueviolet;
    transform: translateY(1px);
    font-weight: 700;
    padding-bottom: 3px;
}
.selected-mobileView-subNav {
    background-color: #8fd3f4;
    color: white !important;
    padding: 3px;
}

.search-container {
    position: relative;
    display: inline-block;
}

.search-input {
    padding: 10px 40px 10px 10px;
    border: 2px solid #ccc;
    border-radius: 5px;
    /* Changed border radius to 5px */
    font-size: 16px;
    width: 250px;
    transition: border-color 0.3s ease-in-out;
    /* Smooth transition for border color */
}

.search-input:focus {
    outline: none;
    border-color: #8fd3f4;
    /* Light blue color on focus */
}

.fa-search {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: #666;
}


.custom-dropdown {
    position: relative;
    display: inline-block;
}

.custom-dropdown select {
    padding: 8px 32px 8px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: #fff;
    cursor: pointer;
}

.custom-dropdown .arrow {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    pointer-events: none;
}

.details-value {
    font-weight: 700;
    font-size: 13px;
    margin: 0;
}

.custom-scroll {
    max-height: calc(100vh - 160px);
    /* Adjust this value as needed */
    overflow-y: auto;
}

.custom-scroll .container {
    margin: 0px;
    max-width: 100%;
}

/* Hide scrollbar for WebKit browsers */
.custom-scroll::-webkit-scrollbar {
    display: none;
}

body::-webkit-scrollbar {
    display: none;
}

.no-scroll {
    overflow: hidden;
}


/* css for custom cards */

.section_our_solution .row {
    align-items: center;
}

.our_solution_category {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.our_solution_category .solution_cards_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
}


@media (max-width: 767px) {
    .custom-border-body {
        border: none;
    }

    .custom-border-data {

        /* border: 1px solid rgba(192, 192, 192, 0.5); */
        /* border-radius: 5px; */
        transition: 0.2s ease-in;
        overflow: hidden;
        cursor: pointer;
    }

    .custom-border-body:hover {
        background-color: #DCDFEC;
    }

    .custom-border-data {
        border: none;
    }

    .border {
        border-radius: 5px !important;
    }

    .Details-heading-size {
        font-size: 1.2rem;
        font-weight: 700 !important;
    }



    .overview-img-text {
        font-size: 2rem;
        font-weight: 700;
        color: white;
    }

    .overview-img {
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 100%;
        background-color: pink;
        margin: 1.5rem;
    }

}

@media (max-width: 767px) {
    .custom-border-body {
        border: none;
    }

    .custom-border-data {

        border-radius: 5px;
    }
}

@media (min-width: 768px) and (max-width: 991px) {
    .custom-border-body {
        /* border: 1px solid rgba(192, 192, 192, 0.5); */
    }

    .custom-border-data {
        .custom-border-data {

            border: none;
        }
    }
}

@media (min-width: 992px) {
    .custom-border {
        border: 1px solid rgba(192, 192, 192, 0.5);
    }
}

/* css for custom sards ends here */
</style>