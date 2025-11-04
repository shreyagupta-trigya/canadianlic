<template>
    <div class="contactView no-scroll  card me-2 mb-0 pb-0" style="border-radius: 5px; max-height: 89vh; ">
        <!-- navbar strats here -->
        <nav :class="[mobileView ? 'col px-0' : 'row px-2']" class=" col-12   pb-0 pt-3 border-bottom">
            <div class="d-flex justify-content-between align-items-center px-2">
                <div style="width:50%">
                    <a @click="showNav()" class="mx-2 ms-3" v-if="mobileView && !navVisible" href="javascript:;"> <i
                            class="fa fa-bars fs-5"></i></a>
                    <a @click="showNav()" class="mx-2 ms-3" v-if="mobileView && navVisible" href="javascript:;"> <i
                            class="fa fa-close fs-5"></i></a>
                </div>
                <div style="width:50%">
                    <div class="ms-auto d-flex justify-content-end" v-if="mobileView">
                        <router-link to="/contact">
                            <a href="javascript:;" class="mx-2">
                                <i class="fa-solid fa-arrow-left"></i> <!-- Arrow icon -->
                            </a>
                        </router-link>
                    </div>
                </div>
                <div class=" d-lg-none d-sm-block me-3">
                    <p class="mb-2 fs-5 heading-color">{{ headerName }}</p>
                </div>
            </div>
            <!-- navbar to show in desktop -->
            <div v-if="!mobileView" class="col-12  d-flex  justify-content-between ">
                <div class="col-9  ">
                    <a :class="{ 'selected': selectedTab === 'Overview' }" @click="selectTab('Overview')"
                        class="text-md    " style="" href="javascript:;">Overview</a>
                       
                    <!-- <a :class="{ 'selected': selectedTab === 'Overview' }" @click="selectTab('Overview')"
                    class="text-md   " href="javascript:;">Overview</a> -->


                    <a :class="{ 'selected': selectedTab === 'Activity' }" @click="selectTab('Activity')"
                        class="mx-2 text-md  position-relative" href="javascript:;">Activities
                        <span
                            class="position-absolute blue-color-background top-0 start-100 translate-middle border border-light rounded-circle text-xxs"
                            style="padding:3px"></span>
                    </a>
                    <a :class="{ 'selected': selectedTab === 'FamilyTree' }" @click="selectTab('FamilyTree')"
                        class=" text-md  mx-2 " href="javascript:;">Family Tree</a>

                    <a :class="{ 'selected': selectedTab === 'Festival' }" @click="selectTab('Festival')"
                        class=" text-md  mx-2 " href="javascript:;">Festivals</a>

                    <a :class="{ 'selected': selectedTab === 'Business' }" @click="selectTab('Business')"
                        class=" text-md  mx-2 " href="javascript:;">Businesses</a>

                    <a :class="{ 'selected': selectedTab === 'Lead History' }" @click="selectTab('Lead History')"
                        class=" text-md   " href="javascript:;">Lead History</a>

                    <a data-bs-toggle="tooltip" data-bs-placement="bottom" :title=tooltip
                        :class="{ 'selected': selectedTab === nav_name }" @click="selectTab('Policies')"
                        class=" text-md  mx-2 " href="javascript:;">{{ nav_name.length > 10 ? nav_name.slice(0, 10) +
                            '...'
                        : nav_name }}</a>
                    <a style="font-weight:700 ;" class="responsive-text-size text-bold ms-1" role="button"
                        id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="text-bold w-5 h-5 text-2xl">...</span>
                    </a>
                    <ul class="dropdown-menu border shadow" aria-labelledby="dropdownMenuLink"
                        style="max-height:60vh; overflow-y: scroll">
                        <li><a class="dropdown-item" @click="changeNav('Policies')">Policies</a></li>
                        <li><a class="dropdown-item" @click="changeNav('Communication')">Communication</a></li>
                        <li><a class="dropdown-item" @click="changeNav('Open Activity')">Open Activity</a></li>
                        <li><a class="dropdown-item" @click="changeNav('Close Activity')">Close Activity</a></li>
                        <li><a class="dropdown-item" @click="changeNav('Campaign')">Campaign</a></li>
                        <li><a class="dropdown-item" @click="changeNav('Businesses')">Businesses</a></li>
                        <li><a class="dropdown-item" @click="changeNav('Parent Client Listing')">Parent Client
                                Listing</a></li>
                        <li><a class="dropdown-item" @click="changeNav('Invited Meeting')">Invited Meeting</a></li>
                        <li><a class="dropdown-item" @click="changeNav('Customer Service')">Customer Service</a></li>
                        <li><a class="dropdown-item" @click="changeNav('Zoho Sales IQ')">Zoho Sales IQ</a></li>
                        <li><a class="dropdown-item" @click="changeNav('Zoho Survey')">Zoho Survey</a></li>
                        <li><a class="dropdown-item" @click="changeNav('Related Auto Insurance')">Related Auto
                                Insurance</a></li>
                        <li><a class="dropdown-item" @click="changeNav('Referral Lead')">Referral Lead</a></li>
                        <li><a class="dropdown-item" @click="changeNav('Referral Client')">Referral Client</a></li>
                        <li><a class="dropdown-item" @click="changeNav('Referred Form')">Referred Form</a></li>
                        <li><a class="dropdown-item" @click="changeNav('Total Referral')">Total Referral</a></li>
                        <li><a class="dropdown-item" @click="changeNav('Lead History')">Lead History</a></li>
                        <li><a class="dropdown-item" @click="changeNav('Remote Assist')">Remote Assist</a></li>
                        <li><a class="dropdown-item" @click="changeNav('Investment Policy Advisor')">Investment Policy
                                Advisor</a></li>


                    </ul>
                </div>
                <div v-if="!mobileView" class="col-3 d-flex justify-content-end " style="margin-right: 20px;">
                    <div style="position:relative;">

                        <button type="button" class="btn  dropdown-toggle" data-bs-toggle="dropdown"
                            data-bs-display="static" aria-expanded="false">
                            Quick Actions
                        </button>

                        <ul class="dropdown-menu dropdown-menu-start dropdown-menu-lg-start"
                            style="border: 1px solid; max-height: 250px; position: absolute; top: 19px; left: -120px; width: 200px; overflow: hidden;">

                            <!-- Search Bar (Fixed on Top) -->
                            <div class="search-container-div" style="padding: 10px;">
                                <div class="search-container">
                                    <input class="search-input" type="search" v-model="searchQuery" placeholder="Search"
                                        aria-label="Search" style="width: 100%; padding: 5px;">
                                </div>
                            </div>

                            <!-- Scrollable List of Filtered Items -->
                            <div class="dropdown-items-container" style="max-height: 150px; overflow-y: auto;">
                                <li v-for="(item, index) in filteredItems" :key="index">
                                    <button class="dropdown-item" type="button" @click="handleItemClick(item)">
                                        {{ capitalize(item) }}
                                    </button>
                                </li>
                            </div>

                        </ul>
                    </div>
                </div>
            </div>
            <!-- navbar Items to show in destop ends -->
            <!-- navbar to show in mobile -->
            <transition name="slide">
                <div v-if="navVisible" class="left-0 top-14 position-absolute w-50 h-100 bg-white border"
                    style="z-index: 6; display:block; ">
                    <ul class="mt-3">
                        <li><a @click="selectTab('overview')" class="text-md px-1 mx-2 col-12"
                                href="javascript:;">Overview</a></li>
                        <li>
                            <a @click="selectTab('Activity'), toggleActivityNav()" class="mx-2 text-md px-1"
                                href="javascript:;"> Activities <i class="fa fa-chevron-down mx-2 text-sm"></i></a>
                            <!-- Sub-navigation for Activity -->
                            <ul v-if="selectedTab === 'Activity'" class="sub-nav">
                                <li><a :class="{ 'selected-mobileView-subNav': selectedActionTab === 'notes' }"
                                        @click="selectActionTab('notes')" class="text-md px-2 text-sm"
                                        href="javascript:;">Notes</a>
                                </li>
                                <li><a :class="{ 'selected-mobileView-subNav': selectedActionTab === 'Attachments' }"
                                        @click="selectActionTab('Attachments')" class="text-md px-2 text-sm"
                                        href="javascript:;">Attachments</a></li>
                                <li><a :class="{ 'selected-mobileView-subNav': selectedActionTab === 'ScoreBoards' }"
                                        @click="selectActionTab('ScoreBoards')" class="text-md px-2 text-sm"
                                        href="javascript:;">Score Boards</a></li>
                            </ul>
                            <!-- Sub-navigation ends -->
                        </li>

                        <li><a @click="selectTab('FamilyTree')" class="text-md mx-2 px-1" href="javascript:;"> Family
                                Tree</a></li>
                        <li>
                            <a @click="selectTab('Business'), toggleActivityNav()" class="mx-2 text-md px-1"
                                href="javascript:;"> Businesses <i class="fa fa-chevron-down mx-2 text-sm"></i></a>
                            <!-- Sub-navigation for Activity -->
                            <ul v-if="selectedTab === 'Business'" class="sub-nav">
                                <li><a :class="{ 'selected-mobileView-subNav': selectedActionTab === 'Lead' }"
                                        @click="selectActionTab('Lead')" class="text-md px-2 text-sm"
                                        href="javascript:;"> Leads</a>
                                </li>
                                <li><a :class="{ 'selected-mobileView-subNav': selectedActionTab === 'Refferals' }"
                                        @click="selectActionTab('Refferals')" class="text-md px-2 text-sm"
                                        href="javascript:;"> Referrals</a></li>

                            </ul>
                            <!-- Sub-navigation ends -->
                        </li>
                        <li><a @click="selectTab('LeadHistory')" class="text-md px-1 mx-2" href="javascript:;">Lead
                                History</a></li>
                        <li><a @click="selectTab('Policy')" class="text-md px-1 mx-2" href="javascript:;">Policies</a>
                        </li>
                        <li><a @click="selectTab('OpenActivity')" class="text-md px-1 mx-2" href="javascript:;">Open
                                Activity</a>
                        </li>
                        <li>
                            <a @click="selectTab('Communication'), toggleCommunicationNav()" class="mx-2 text-md px-1"
                                href="javascript:;"> Comms <i class="fa fa-chevron-down mx-2 text-sm"></i></a>
                            <!-- Sub-navigation for Communication -->
                            <ul v-if="selectedTab === 'Communication'" class="sub-nav">
                                <li><a :class="{ 'selected-mobileView-subNav': selectedActionTab === 'Whatsapp' }"
                                        @click="selectActionTab('Whatsapp')" class="text-md px-2 text-sm"
                                        href="javascript:;"> Whats
                                        App</a></li>
                                <li><a :class="{ 'selected-mobileView-subNav': selectedActionTab === 'SMS' }"
                                        @click="selectActionTab('SMS')" class="text-md px-2 text-sm"
                                        href="javascript:;"> SMS</a></li>
                                <li><a :class="{ 'selected-mobileView-subNav': selectedActionTab === 'Email' }"
                                        @click="selectActionTab('Email')" class="text-md px-2 text-sm"
                                        href="javascript:;"> Email</a>
                                </li>
                            </ul>
                            <!-- Sub-navigation ends -->
                        </li>
                    </ul>
                    <div style="margin-top: 150px; margin-left:31px;">
                        <div style="position:relative;">

                            <button type="button" class="btn  dropdown-toggle" data-bs-toggle="dropdown"
                                data-bs-display="static" aria-expanded="false" style="border:1px solid">
                                Quick Actions
                            </button>
                            <ul class="dropdown-menu dropdown-menu-start dropdown-menu-lg-start"
                                style="border: 1px solid; max-height: 250px; position: absolute; top: -207px; left: 145px; width: 200px; overflow: hidden;">

                                <!-- Search Bar (Fixed on Top) -->
                                <div class="search-container-div" style="padding: 10px;">
                                    <div class="search-container">
                                        <input class="search-input" type="search" v-model="searchQuery"
                                            placeholder="Search" aria-label="Search" style="width: 100%; padding: 5px;">
                                    </div>
                                </div>

                                <!-- Scrollable List of Filtered Items -->
                                <div class="dropdown-items-container" style="max-height: 150px; overflow-y: auto;">
                                    <li v-for="(item, index) in filteredItems" :key="index">
                                        <button class="dropdown-item" type="button" @click="handleItemClick(item)">
                                            {{ capitalize(item) }}
                                        </button>
                                    </li>
                                </div>

                            </ul>
                        </div>
                    </div>
                </div>
            </transition>
            <!-- navbar to show in mobile ends-->
        </nav>
        <!-- navbar ends here -->
        <!-- Sub nav starts here  -->
        <!-- Sub nav for Activity starts here  -->
        <div class="" v-if="selectedTab === 'Activities' && !mobileView">
            <!-- button div -->
            <div class="row mt-2">
                <div class="col-10 ">
                    <div class="search-container ms-4">
                        <input class="search-input" type="search" placeholder="Search" aria-label="Search">
                        <i data-v-1a08f58e="" class="fas fa-search" aria-hidden="true"></i>
                    </div>

                </div>
                <div class="col-2 ">
                    <div class="dropdown">
                        <button class=" mb-0 btn py-1 add-btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Add
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <li><button class="dropdown-item" type="button">Add Note</button></li>
                            <li><button class="dropdown-item" type="button">Add Attachments</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- button div ends-->
            <nav class=" border-bottom d-flex justify-content-start text-end p-2 pb-0 pt-3 ms-3">

                <div class=" position-relative mx-1">
                    <span
                        class="text-xxs position-absolute top-0 right-0 start-100 translate-middle badge rounded-pill blue-color-background p-1">
                        10
                    </span>
                    <a :class="{ 'selected': selectedActionTab === 'Notes' }" @click="selectActionTab('Notes')"
                        class=" text-md px-2" href="javascript:;">Notes
                    </a>
                </div>

                <div class=" position-relative mx-1">
                    <span
                        class="text-xxs position-absolute top-0 right-0 start-100 translate-middle badge rounded-pill blue-color-background p-1">
                        20
                    </span>
                    <a :class="{ 'selected': selectedActionTab === 'Attachments' }"
                        @click="selectActionTab('Attachments')" class=" text-md   px-2"
                        href="javascript:;">Attachments</a>
                </div>

                <div class="mx-1">
                    <a :class="{ 'selected': selectedActionTab === 'Score Boards' }"
                        @click="selectActionTab('Score Boards')" class=" text-md  mx-2 px-2" href="javascript:;">Score
                        Boards</a>
                </div>


            </nav>
        </div>
        <!-- Sub nav for Activity ends here  -->
        <!-- Sub nav for Business starts here  -->
        <div class="" v-if="selectedTab === 'Businesses' && !mobileView">
            <!-- button div -->
            <div class="row mt-3">
                <div class="col-10 ">
                    <div class="search-container ms-4">
                        <input class="search-input" type="search" placeholder="Search" aria-label="Search">
                        <i data-v-1a08f58e="" class="fas fa-search" aria-hidden="true"></i>
                    </div>
                </div>


            </div>
            <!-- button div ends-->
            <nav class=" border-bottom d-flex justify-content-start text-end p-2 pb-0 pt-3 ms-3">
                <div>

                    <a :class="{ 'selected': selectedActionTab === 'Lead' }" @click="selectActionTab('Lead')"
                        class=" text-md  mx-2 px-2" href="javascript:;">Lead</a>

                    <a :class="{ 'selected': selectedActionTab === 'Refferals' }" @click="selectActionTab('Refferals')"
                        class=" text-md  mx-2 px-2" href="javascript:;">Refferals</a>

                </div>

            </nav>
        </div>
        <!-- Sub nav for Business ends here  -->


        <!-- Sub nav for Commuication starts here  -->
        <div class="" v-if="selectedTab === 'Communication' && !mobileView">
            <nav class=" border-bottom d-flex justify-content-start text-end p-2 pb-0 pt-3 ms-3">
                <div class="d-flex">

                    <div class=" position-relative mx-1">
                        <span
                            class="text-xxs position-absolute top-0 right-0 start-100 translate-middle badge rounded-pill blue-color-background p-1">
                            10
                        </span>
                        <a :class="{ 'selected': selectedActionTab === 'Whatsapp' }"
                            @click="selectActionTab('Whatsapp')" class="mx-2 text-md  px-2" href="javascript:;">Whats
                            App</a>
                    </div>

                    <div class=" position-relative mx-1">
                        <span
                            class="text-xxs position-absolute top-0 right-0 start-100 translate-middle badge rounded-pill blue-color-background p-1">
                            15
                        </span>
                        <a :class="{ 'selected': selectedActionTab === 'SMS' }" @click="selectActionTab('SMS')"
                            class=" text-md  mx-2 px-2" href="javascript:;">SMS</a>
                    </div>

                    <div class=" position-relative mx-1">
                        <span
                            class="text-xxs position-absolute top-0 right-0 start-100 translate-middle badge rounded-pill blue-color-background p-1">
                            30
                        </span>
                        <a :class="{ 'selected': selectedActionTab === 'Emails' }" @click="selectActionTab('Emails')"
                            class=" text-md  mx-2 px-2" href="javascript:;">Email</a>
                    </div>

                </div>

            </nav>
        </div>
        <!-- Sub nav for Commuication ends here  -->

        <!-- Sub nav ends here  -->
        <!-- Main content container -->
        <div class="card-body custom-scroll  pt-2" style="min-height:72vh">
            <!-- Overview Section -->
            <div v-if="selectedTab === 'Overview'" class="mb-5 row justify-content-center conatct-overview">
                <Overview :id="this.id" />
            </div>
            <!-- Overview enda -->
            <!-- overview starts from here -->
            <!-- part overview 1  -->
            <div v-if="selectedTab === 'Overview'" class="d-none mb-5 row justify-content-center conatct-overview">
                <div class="card col-lg-12 col-md-12 col-sm-12 gap-5">
                    <div class="row">

                        <!-- image box -->
                        <div class=" d-flex pt-1 col-lg-6 col-md-6 col-sm-12">
                            <div class="overview-img text-center "> <span class="overview-img-text pt-2">PA</span></div>
                            <div class=" mt-4 ">

                                <p class="mb-0 heading-color overview-heading text-bold">{{ formData.firstName + " " +
                                    formData.lastName }}</p>
                                <p :class="mobileView ? 'text-sm' : 'text-md'">contact</p>
                                <div>
                                    <i :class="[mobileView ? 'text-sm' : 'fs-4', 'fa', 'fa-whatsapp', 'cursor-pointer', 'pe-3', 'blue-color-icon']"
                                        title="Whats App"></i>
                                    <i :class="[mobileView ? 'text-sm' : 'fs-4', 'fa', 'fa-envelope-o', 'cursor-pointer', 'pe-3', 'blue-color-icon']"
                                        title="Send Email"></i>
                                    <i :class="[mobileView ? 'text-sm' : 'fs-4', 'fa', 'fa-commenting-o', 'cursor-pointer', 'pe-3', 'blue-color-icon']"
                                        title="Send SMS"></i>
                                    <i :class="[mobileView ? 'text-sm' : 'fs-4', 'fa', 'fa-newspaper-o', 'cursor-pointer', 'pe-3', 'blue-color-icon']"
                                        title="Policy"></i>
                                    <i :class="[mobileView ? 'text-sm' : 'fs-4', 'fa', 'fa-handshake-o', 'cursor-pointer', 'blue-color-icon']"
                                        title="Refferal"></i>

                                </div>
                            </div>
                        </div>
                        <!-- image box ends -->

                        <div class=" me-5 mt-4 mb-2 col-lg-4 col-md-3 col-sm-12">

                            <div class="text-start heading-color">
                                <section class="d-flex">
                                    <div class="pt-1 px-3"><i class="fa fa-envelope-o text-color"></i> </div>
                                    <div>
                                        <p class=" mb-0 text-sm text-bold">Email</p>
                                        <p class="text-xs text-muted">{{ formData.email }}</p>
                                    </div>

                                </section>
                            </div>
                            <div class="text-start heading-color">
                                <section class="d-flex">
                                    <div class="pt-1 px-3"><i class="fa fa-phone text-color"></i> </div>
                                    <div>
                                        <p class=" mb-0 text-sm text-bold">Phone</p>
                                        <p class="text-xs text-muted">{{ formData.mobile }}</p>
                                    </div>

                                </section>
                            </div>
                            <div class="text-start heading-color">
                                <section class="d-flex">
                                    <div class="pt-1 px-3"><i class="fa fa-mobile text-color"></i> </div>
                                    <div>
                                        <p class=" mb-0 text-sm text-bold">Mobile </p>
                                        <p class="text-xs text-muted">{{ formData.mobile }}</p>
                                    </div>

                                </section>
                            </div>
                            <div class="text-start heading-color">
                                <section class="d-flex">
                                    <div class="pt-1 px-3"><i class="fa fa-street-view text-color"></i> </div>
                                    <div>
                                        <p class=" mb-0 text-sm text-bold">Location</p>
                                        <p class="text-xs text-muted">{{ formData.location }}</p>
                                    </div>

                                </section>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- part overview 1 ends -->
                <!-- part overview 2 -->
                <div class=" row mt-4 justify-content-center ps-0 pe-0">
                    <div :class="{ ' min-h-50 ': mobileView }"
                        class=" heading-color col-md-6 col-sm-12 ps-0 remove-padding-in-mobile skype-div">
                        <div class="card p-3 h-100">
                            <section class="d-flex">
                                <div class="pt-1 px-3"><i class="fa fa-skype text-color"></i> </div>
                                <div>
                                    <p class=" mb-0 text-sm text-bold">Skype</p>
                                    <p class="text-xs text-muted">xyz</p>
                                </div>

                            </section>

                            <section class="d-flex">
                                <div class="pt-1 px-3"><i class="fa fa-birthday-cake text-color"></i> </div>
                                <div>
                                    <p class=" mb-0 text-sm text-bold">Birthday</p>
                                    <p class="text-xs text-muted">xyz</p>
                                </div>

                            </section>

                            <section class="d-flex">
                                <div class="pt-1 px-3"><i class="fa fa-calendar text-color"></i> </div>
                                <div>
                                    <p class=" mb-0 text-sm text-bold">Work anniversary</p>
                                    <p class="text-xs text-muted">xyz</p>
                                </div>

                            </section>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12 pe-0 remove-padding-in-mobile">
                        <div class="card">
                            <div class="text-center mt-3">
                                <img src="/images/refferFamily.svg" alt="No teams" style="width: 200px; height: 150px;">
                            </div>

                            <div class="text-center heading-color ">
                                <p class="mb-0 text-lg text-bold">Create and join new family</p>
                                <p class="mb-0 text-sm">Collaborate better with family and</p>
                                <p class=" text-sm">keep track of projects you're interested in</p>
                            </div>

                            <div class="text-center mb-4">
                                <button class="btn add-btn p-2 fw-bold">Explore family</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- part overview 2 ends-->
                <!-- <hr class="my-4"> -->
                <!-- part overview 3-->
                <div v-if="!mobileView" class="mt-4 container card">
                    <div class="ms-2 container pt-2">
                        <p class="mb-0 heading-color overview-heading text-bold">Notifications</p>
                        <p class="mb-0 text-sm heading-color">Manage your notification settings</p>
                        <p class="mb-0 text-sm heading-color">We may still send you important notifications about
                            your account and content</p>
                        <p class=" text-sm heading-color">outside of your preferred notification settings.</p>
                    </div>

                    <div class="col pt-2 mt-4 container pb-3">
                        <!-- desktop notification button -->
                        <section v-if="!mobileView" class="d-flex col-8 border p-2 mb-3 ">
                            <div class="pt-1 px-3"><i class="fa fa-calendar text-color"></i> </div>
                            <div class="col-8">
                                <p class=" mb-0 text-md text-bold">Desktop Notifications</p>
                                <p class="text-sm text-muted">Recieve notification directly on my screen</p>
                            </div>

                            <button class="col-2 desktop-notifications py-1 btn mt-2 mx-2">Enable </button>
                        </section>


                        <!-- desktop notification button  ends-->


                        <!-- email notification -->
                        <section v-if="!mobileView" class="d-flex justify-content-between col-8 border p-2 ">
                            <div class="d-flex">
                                <div class="pt-1 pb-2 px-3"><i class="fa fa-calendar text-color"></i> </div>
                                <div>
                                    <p class=" mb-0 text-md text-bold">Email Notifications</p>
                                    <p class="text-sm text-muted">Send me notifications via email when someone...
                                    </p>
                                </div>
                            </div>
                        </section>

                    </div>
                    <!-- email notifications ends -->


                </div>
                <!-- part overview 3 ends-->


            </div>

            <!-- Notes starts from here -->
            <div v-if="selectedActionTab === 'Notes'" class="w-100">
                <Notes :id="this.id" />
            </div>
            <!-- Notes Ends from here -->
            <Loader :loading="isLoading" />

            <!-- Attachments start here -->
            <!-- display when no data -->
            <!-- <div v-if="selectedActionTab === 'Attachments'" class=" null-data-image-div">
                <img src="/images/QALoan.png" class="null-data-image">
            </div> -->
            <!-- display when no data ends-->
            <!-- Attachment Information -->
            <div v-if="selectedActionTab === 'Attachments' && !mobileView">
                <Attachment :id="this.id" />
            </div>
            <!-- Attachments Information Ends Here -->
            <!-- show on mobile view     -->

            <div v-if="selectedActionTab === 'Attachments' && mobileView">

                <div class="custom-border-body row border">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-10 px-0">
                                <p class="mb-0  h6 blue-color"><small> doc.xml </small></p>
                                <p class="mb-0 h6"><small> 20/20/20</small></p>
                                <p class="card-text  h6"><small>500 kb</small></p>
                                <p class="mb-0  h6"><small>Somya Bhardwaj </small></p>
                            </div>
                            <div class="col-2 text-end">
                                <i class="fa fa-pencil p-2 text-lg  cursor-pointer"></i>
                                <i class="fa fa-trash p-2 text-lg  cursor-pointer"></i>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- show on mobile view     -->

            <!-- Attachments ends here -->

            <!-- Scoreboards starts  here -->

            <div v-if="selectedActionTab === 'Score Boards'">
                <div class="custom-border-body row border">
                    <section class="d-flex align-items-center justify-content-between mx-1"
                        @click="toggleInfo('showInfo1')">
                        <p class="green-color familytree-heading-size ">ScoreBoards</p>
                        <!-- <i class="fa fa-chevron-down green-color familytree-heading-size"
                                :class="{ 'fa-chevron-up': showInfo1, 'fa-chevron-down': !showInfo1 }"
                                style="cursor:pointer"></i> -->
                    </section>
                    <div class="custom-scroll">
                        <div class="custom-border-body row py-1 m-1">
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Referral Level: </span> <span
                                    class="text-sm">
                                    {{ formData.referralLevel }}</span>
                            </div>
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Payout Till Date Life: </span> <span
                                    class="text-sm">{{ formData.referralPayoutTillDateLife }}</span></div>
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Referral Till Date Living: </span> <span
                                    class="text-sm">{{ formData.referralPayoutTillDateLivingBenefits }}</span></div>
                        </div>
                        <div class="custom-border-body row py-1 m-1">
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Referral Till Date Travel :</span> <span
                                    class="text-sm">{{ formData.referralPayoutsTillDateTravel }}</span></div>
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Referral Payout Till Date Health and dental:
                                </span> <span class="text-sm">{{ formData.referralPayoutsTillDateHealthAndDental
                                }}</span></div>
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Referral Till Date Health And dental:
                                </span> <span class="text-sm">{{ formData.referralTillDateHealthAndDental }}</span>
                            </div>
                        </div>
                        <div class="custom-border-body row py-1 m-1">
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Referral Till Date Life: </span>
                                <span class="text-sm">{{ formData.referralTillDateLife }}</span>
                            </div>
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Referral Payouts Till Date Travel: </span>
                                <span class="text-sm">{{ formData.referralTillDateTravel }}</span>
                            </div>
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Referral Till Date Living Benefits: </span>
                                <span class="text-sm">{{ formData.referralTillDateLivingBenefits }}</span>
                            </div>
                        </div>
                        <div class="custom-border-body row py-1 m-1">
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Year: </span>
                                <span class="text-sm">{{ formData.year }}</span>
                            </div>
                            <!-- <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Referral Payouts Till Date Travel: </span>
                                <span class="text-sm">{{formData.referralTillDateTravel}}</span>
                            </div>
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Referral Till Date Living Benefits: </span>
                                <span class="text-sm">{{ formData.referralTillDateLivingBenefits }}</span>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
            <!-- Scoreboards ends here -->
            <!-- FamilyTree starts here -->
            <div v-if="selectedTab === 'Family Tree'" class="heading-color">
                <div class="">
                    <!-- Family Information -->
                    <!-- Family Information -->
                    <div class="custom-border-body row border py-2">
                        <section class="cursor-pointer d-flex align-items-center justify-content-between mx-1"
                            @click="toggleInfo('showInfo1')">
                            <p class=" mb-0 fs-5 orange-color">Family Information</p>
                            <i class="fa fa-chevron-down  fs-5 orange-color"
                                :class="{ 'fa-chevron-up': showInfo1, 'fa-chevron-down': !showInfo1 }"
                                style="cursor:pointer"></i>
                        </section>
                        <div v-show="showInfo1" class="border">
                            <table class="table table-striped">
                                <tbody>
                                    <!-- First row -->
                                    <tr>
                                        <td class="text-bold">Relationship:</td>
                                        <td>{{ formData.relationShipStatus }}</td>
                                    </tr>
                                    <!-- Second row -->
                                    <tr>
                                        <td class="text-bold">Name Of Spouse:</td>
                                        <td>{{ formData.nameOfSpouse }}</td>
                                    </tr>
                                    <!-- Third row -->
                                    <tr>
                                        <td class="text-bold">Anniversary Date:</td>
                                        <td>{{ formData.anniversaryDate }}</td>
                                    </tr>
                                    <!-- Fourth row -->
                                    <tr>
                                        <td class="text-bold">Spouse's Date of Birth:</td>
                                        <td>{{ formData.spouseDateOfBirth }}</td>
                                    </tr>
                                    <!-- Fifth row -->
                                    <tr>
                                        <td class="text-bold">Phone of Spouse:</td>
                                        <td>{{ formData.phoneOfSpouse }}</td>
                                    </tr>
                                    <!-- Sixth row -->
                                    <tr>
                                        <td class="text-bold">Email of Spouse:</td>
                                        <td>{{ formData.emailOfSpouse }}</td>
                                    </tr>
                                    <!-- Seventh row -->
                                    <tr>
                                        <td class="text-bold">Number of Spouse:</td>
                                        <td>{{ formData.numberOfSpouse }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- Family Information -->

                    <!-- Family Information -->
                    <!-- Dependent Parents -->
                    <div class=" custom-border-body py-2 border row my-2 ">
                        <section class="cursor-pointer heder-bg d-flex align-items-center justify-content-between mx-1"
                            @click="toggleInfo('showInfo2')">
                            <p class=" familytree-heading-size mb-0 fs-5 green-color">Dependent Parents</p>
                            <i class="fa fa-chevron-down familytree-heading-size green-color fs-5"
                                :class="{ 'fa-chevron-up': showInfo2, 'fa-chevron-down': !showInfo2 }"
                                style="cursor:pointer"></i>
                        </section>
                        <div v-show="showInfo2" class="custom-border-body row py-1 m-1"
                            v-for="item in formData.dependentParentsData" :key="item.id">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-10">
                                        <p class="card-title mb-0"><small
                                                class="heading-color text-md text-uppercase text-bold ">{{
                                                    item.name }} </small> : <small class="heading-color ">{{
                                                    item.relationship }}</small>
                                        </p>
                                        <p class="mb-0  h6"><small>{{ item.email }} </small></p>
                                        <p class="mb-0 h6"><small> {{ item.phone }}</small></p>
                                        <p class="card-text  h6"><small> {{ item.dob }}</small></p>
                                    </div>
                                    <div class="col-2 text-end">
                                        <i class="fa fa-pencil p-2 text-lg  cursor-pointer"></i>
                                        <i class="fa fa-trash p-2 text-lg  cursor-pointer"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Dependent Parents ends -->
                    <!-- Dependent Children -->
                    <div class=" custom-border-body py-2 border row my-2 ">
                        <section class="cursor-pointer heder-bg d-flex align-items-center justify-content-between mx-1"
                            @click="toggleInfo('showInfo3')">
                            <p class=" familytree-heading-size mb-0 fs-5 yellow-color">Dependent Children</p>
                            <i class="fa fa-chevron-down  familytree-heading-size yellow-color fs-5"
                                :class="{ 'fa-chevron-up': showInfo3, 'fa-chevron-down': !showInfo3 }"
                                style="cursor:pointer"></i>
                        </section>

                        <div v-show="showInfo3" class="custom-border-body row py-1 m-1"
                            v-for="item in formData.dependentParentsData" :key="item.id">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-10">
                                        <p class="card-title mb-0"><small
                                                class="heading-color text-md text-uppercase text-bold ">{{
                                                    item.name }} </small> :<small class="heading-color">{{
                                                    item.relationship }}</small>
                                        </p>
                                        <p class="mb-0  h6"><small>{{ item.email }} </small></p>
                                        <p class="mb-0 h6"><small> {{ item.phone }}</small></p>
                                        <p class="card-text  h6"><small> {{ item.dob }}</small></p>
                                    </div>
                                    <div class="col-2 text-end">
                                        <i class="fa fa-pencil p-2 text-lg  cursor-pointer"></i>
                                        <i class="fa fa-trash p-2 text-lg  cursor-pointer"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Dependent Children ends -->
                    <!-- Dependent Siblings -->
                    <div class="custom-border-body  py-2 border row my-2">
                        <section class="cursor-pointer  heder-bg d-flex align-items-center justify-content-between mx-1"
                            @click="toggleInfo('showInfo4')">
                            <p class=" familytree-heading-size mb-0 fs-5 private-color">Dependent Siblings</p>
                            <i class="fa fa-chevron-down familytree-heading-size private-color fs-5"
                                :class="{ 'fa-chevron-up': showInfo4, 'fa-chevron-down': !showInfo4 }"
                                style="cursor:pointer"></i>
                        </section>

                        <div v-show="showInfo4" class="custom-border-body row py-1 m-1"
                            v-for="item in formData.dependentParentsData" :key="item.id">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-10">
                                        <p class="card-title mb-0"><small
                                                class="heading-color text-md text-uppercase text-bold ">{{
                                                    item.name }} </small> :<small class="heading-color">{{
                                                    item.relationship }}</small>
                                        </p>
                                        <p class="mb-0  h6"><small>{{ item.email }} </small></p>
                                        <p class="mb-0 h6"><small> {{ item.phone }}</small></p>
                                        <p class="card-text  h6"><small> {{ item.dob }}</small></p>
                                    </div>
                                    <div class="col-2 text-end">
                                        <i class="fa fa-pencil p-2 text-lg  cursor-pointer"></i>
                                        <i class="fa fa-trash p-2 text-lg  cursor-pointer"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Dependent Siblings ends -->
                </div>

            </div>
            <!-- FamilyTree ends here -->
            <!-- Advisor details in right starts-->
            <div class="Advisor-details-section border">
                <div>
                    <i @mouseover="handleMouseOver" @mouseleave="handleMouseLeave"
                        :class="['fa', isAdvisorVisible ? 'fa-chevron-right' : 'fa-chevron-left ']"
                        @click="showAdvisor()" :style="{ cursor: 'pointer', zIndex: 6, }">
                    </i>
                    <div class="Advisor-details-content pt-2">
                        <!-- advisor details -->
                        <div>
                            <div class="advisor-headings mx-3">
                                <p class="text-bold">Advisor</p>
                            </div>
                            <div class="advisor-cards heading-color mx-3 my-2 px-2 py-2">
                                <p class="mb-0 text-sm text-bold">Peter Anthony</p>
                                <p class="mb-0 text-xs"><span class="text-bold">Email:</span>Peterxyz@trigybcajbckcaska
                                </p>
                                <p class="mb-0 text-xs"><span class="text-bold">Phone:</span> 7868768688</p>
                            </div>
                        </div>
                        <!-- advisor details ends -->
                        <hr>
                        <!-- refferals details  -->

                        <div class="advisor-headings d-flex justify-content-between mx-3 cursor-pointer"
                            @click="toggleInfo('showInfo5')">
                            <div>
                                <p class="text-bold">Refferals</p>
                            </div>
                            <i
                                :class="['fa', !showInfo5 ? 'fa-chevron-down' : 'fa-chevron-up', 'me-2', 'mt-2 ', 'cursor-pointer']"></i>
                        </div>
                        <div class="refferal-cards">

                            <div v-show="showInfo5" v-for="item in refferalList" :key="item.email"
                                class="advisor-cards heading-color mx-3 my-2 px-2 py-2">
                                <p class="mb-0 text-sm text-bold">{{ item.name }}</p>
                                <p class="mb-0 text-xs"><span class="text-bold">Email:</span>{{ item.email }}</p>
                                <p class="mb-0 text-xs"><span class="text-bold">Phone:</span>{{ item.phone }}</p>
                            </div>
                        </div>

                        <!-- refferals details ends -->
                        <hr>
                        <!-- policies details  -->

                        <div class="advisor-headings d-flex justify-content-between mx-3 cursor-pointer"
                            @click="toggleInfo('showInfo6')">
                            <div>
                                <p class="text-bold">Policies</p>
                            </div>
                            <i :class="['fa', !showInfo6 ? 'fa-chevron-down' : 'fa-chevron-up', 'me-2', 'mt-2 ']"
                                @click="toggleInfo('showInfo6')" style="cursor:pointer"></i>

                        </div>
                        <div class="refferal-cards">

                            <div v-show="showInfo6" v-for="item in refferalList" :key="item.email"
                                class="advisor-cards heading-color mx-3 my-2 px-2 py-2">
                                <p class="mb-0 text-sm text-bold">{{ item.name }}</p>
                                <p class="mb-0 text-xs"><span class="text-bold">Email:</span>{{ item.email }}</p>
                                <p class="mb-0 text-xs"><span class="text-bold">Phone:</span>{{ item.phone }}</p>
                            </div>
                        </div>

                        <!-- Policies details ends -->
                    </div>
                </div>

            </div>
            <!-- Advisor details in right ends-->

            <!-- festivals start from here -->
            <!-- festivals Information -->
            <div class=" p-2 " v-if="selectedTab === 'Festivals'">
                <div class=" border ">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Festivals</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="items in formData.festivalsData" :key="items.ROWID">
                                <td>{{ items.festivalName }}</td>
                                <td>{{ items.dateOfFestival }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- festivals Information Ends Here -->
            <!-- festivals ends from here -->
            <!-- lead starts  here -->
            <div v-if="selectedActionTab === 'Lead'">
                <div class="border">
                    <table class="table table-striped">
                        <thead>
                            <tr class="p-0">
                                <th scope="col p-2 "><span class="orange-color fs-5">Peter Antony</span></th>
                                <th scope="col p-2 text-end"></th>
                            </tr>
                        </thead>

                        <tbody>
                            <!-- First row -->
                            <tr>
                                <td class="text-bold">Best Time To Call:</td>
                                <td>{{ formData.bestTimeToCall }}</td>
                            </tr>
                            <!-- Second row -->
                            <tr>
                                <td class="text-bold">Date Of Birth:</td>
                                <td>{{ formData.dateOfBirth1 }}</td>
                            </tr>
                            <!-- Third row -->
                            <tr>
                                <td class="text-bold">Referred By:</td>
                                <td>{{ formData.ifReferredByAdvisorOrExternal }}</td>
                            </tr>
                            <!-- Fourth row -->
                            <tr>
                                <td class="text-bold">Is This Reassignment:</td>
                                <td>{{ formData.isThisReassignment }}</td>
                            </tr>
                            <!-- Fifth row -->
                            <tr>
                                <td class="text-bold">Referred:</td>
                                <td>{{ formData.referredBy }}</td>
                            </tr>
                            <!-- Sixth row -->
                            <tr>
                                <td class="text-bold">Investment:</td>
                                <td>{{ formData.investment1 }}</td>
                            </tr>
                            <!-- Seventh row -->
                            <tr>
                                <td class="text-bold">Do You Own Home In Canada:</td>
                                <td>{{ formData.doYouOwnHomeInCananda }}</td>
                            </tr>
                            <!-- Eighth row -->
                            <tr>
                                <td class="text-bold">Existing Renewal Policy Due By:</td>
                                <td>{{ formData.existingRenewalPolicyDueBy }}</td>
                            </tr>
                            <!-- Ninth row -->
                            <tr>
                                <td class="text-bold">Do You Have Life Insurance:</td>
                                <td>{{ formData.doYouHaveLifeInsurance }}</td>
                            </tr>
                            <!-- Tenth row -->
                            <tr>
                                <td class="text-bold">Coverage You Are Looking For:</td>
                                <td>{{ formData.coverageYouAreLookingFor }}</td>
                            </tr>
                            <!-- Eleventh row -->
                            <tr>
                                <td class="text-bold">Submit Page URL:</td>
                                <td>{{ formData.submitPageUrl }}</td>
                            </tr>
                            <!-- Twelfth row -->
                            <tr>
                                <td class="text-bold">Assigned Campaigns:</td>
                                <td>{{ formData.assignedCampaigns }}</td>
                            </tr>
                            <!-- Thirteenth row -->
                            <tr>
                                <td class="text-bold">State:</td>
                                <td>{{ formData.state }}</td>
                            </tr>
                            <!-- Fourteenth row -->
                            <tr>
                                <td class="text-bold">Zip Code:</td>
                                <td>{{ formData.zipCode }}</td>
                            </tr>
                            <!-- Fifteenth row -->
                            <tr>
                                <td class="text-bold">Twitter:</td>
                                <td>{{ formData.twitter1 }}</td>
                            </tr>
                            <!-- Sixteenth row -->
                            <tr>
                                <td class="text-bold">Skype ID:</td>
                                <td>{{ formData.skypeId1 }}</td>
                            </tr>
                            <!-- Seventeenth row -->
                            <tr>
                                <td class="text-bold">Instagram:</td>
                                <td>{{ formData.instagram1 }}</td>
                            </tr>
                            <!-- Eighteenth row -->
                            <tr>
                                <td class="text-bold">Lead Potential Business Policy Values:</td>
                                <td>{{ formData.leadPotentialBusinessPolicyValues }}</td>
                            </tr>
                            <!-- Nineteenth row -->
                            <tr>
                                <td class="text-bold">Insurance Lead Score:</td>
                                <td>{{ formData.insuranceLeadScore }}</td>
                            </tr>
                            <!-- Twentieth row -->
                            <tr>
                                <td class="text-bold">Insurance Lead Scoring Positive Score:</td>
                                <td>{{ formData.insuranceLeadScoringPositiveScore }}</td>
                            </tr>
                            <!-- Twenty-first row -->
                            <tr>
                                <td class="text-bold">Insurance Lead Scoring Negative Touch Point Score:</td>
                                <td>{{ formData.insuranceLeadScoringNegativeTouchPointScore }}</td>
                            </tr>
                            <!-- Twenty-second row -->
                            <tr>
                                <td class="text-bold">Gender:</td>
                                <td>{{ formData.gender1 }}</td>
                            </tr>
                            <!-- Twenty-third row -->
                            <tr>
                                <td class="text-bold">Lead Info Additional Contact Information:</td>
                                <td>{{ formData.leadInfoAdditionalContactInformation }}</td>
                            </tr>
                            <!-- Twenty-fourth row -->
                            <tr>
                                <td class="text-bold">Net Worth:</td>
                                <td>{{ formData.networth2 }}</td>
                            </tr>
                            <!-- Twenty-fifth row -->
                            <tr>
                                <td class="text-bold">Old Database Lead:</td>
                                <td>{{ formData.oldDatabaseLead1 }}</td>
                            </tr>
                            <!-- Twenty-sixth row -->
                            <tr>
                                <td class="text-bold">Gender Prediction:</td>
                                <td>{{ formData.genderPrediction1 }}</td>
                            </tr>
                            <!-- Twenty-seventh row -->
                            <tr>
                                <td class="text-bold">Exchange Rate:</td>
                                <td>{{ formData.exchangeRate1 }}</td>
                            </tr>
                            <!-- Twenty-eighth row -->
                            <tr>
                                <td class="text-bold">Currency:</td>
                                <td>{{ formData.currency1 }}</td>
                            </tr>
                            <!-- Twenty-ninth row -->
                            <tr>
                                <td class="text-bold">Round Robin Assignment Time:</td>
                                <td>{{ formData.roundRobinAssignmentTime1 }}</td>
                            </tr>
                            <!-- Thirtieth row -->
                            <tr>
                                <td class="text-bold">Lead Created On:</td>
                                <td>{{ formData.leadCreatedOn1 }}</td>
                            </tr>
                            <!-- Thirty-first row -->
                            <tr>
                                <td class="text-bold">Street:</td>
                                <td>{{ formData.street }}</td>
                            </tr>
                            <!-- Thirty-second row -->
                            <tr>
                                <td class="text-bold">City:</td>
                                <td>{{ formData.city }}</td>
                            </tr>
                            <!-- Thirty-third row -->
                            <tr>
                                <td class="text-bold">Country:</td>
                                <td>{{ formData.country }}</td>
                            </tr>
                            <!-- Thirty-fourth row -->
                            <tr>
                                <td class="text-bold">LinkedIn:</td>
                                <td>{{ formData.linkdin1 }}</td>
                            </tr>
                            <!-- Thirty-fifth row -->
                            <tr>
                                <td class="text-bold">Facebook:</td>
                                <td>{{ formData.facebook1 }}</td>
                            </tr>
                            <!-- Thirty-sixth row -->
                            <tr>
                                <td class="text-bold">Facebook Ad Information:</td>
                                <td>{{ formData.facebookAdInformation }}</td>
                            </tr>
                            <!-- Thirty-seventh row -->
                            <tr>
                                <td class="text-bold">Services Requested:</td>
                                <td>{{ formData.servicesRequested }}</td>
                            </tr>
                            <!-- Thirty-eighth row -->
                            <tr>
                                <td class="text-bold">Insurance Lead Scoring Touch Point Score:</td>
                                <td>{{ formData.insuranceLeadScoringTouchPointScore }}</td>
                            </tr>
                            <!-- Thirty-ninth row -->
                            <tr>
                                <td class="text-bold">Insurance Leads Scoring Positive Touch Point Score:</td>
                                <td>{{ formData.insuranceLeadsScoringPositiveTouchPointScore }}</td>
                            </tr>
                            <!-- Fortieth row -->
                            <tr>
                                <td class="text-bold">Insurance Leads Scoring Negative Score:</td>
                                <td>{{ formData.insuranceLeadsScoringNegativeScore }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- lead ends here -->
            <!-- refferals starts  here -->
            <div v-if="selectedActionTab === 'Refferals'">
                <div class="border">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col "><span class="orange-color fs-5">Shobhnath</span></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- First row -->
                            <tr>
                                <td class="text-bold">Name:</td>
                                <td>Peter Anthony</td>
                            </tr>
                            <!-- Second row -->
                            <tr>
                                <td class="text-bold">Annual Referral Slab:</td>
                                <td>XYZ</td>
                            </tr>
                            <!-- Third row -->
                            <tr>
                                <td class="text-bold">Referral Level:</td>
                                <td>A</td>
                            </tr>
                            <!-- Fourth row -->
                            <tr>
                                <td class="text-bold">Referral Product Category:</td>
                                <td>XYZ</td>
                            </tr>
                            <!-- Fifth row -->
                            <tr>
                                <td class="text-bold">Referral Payout Category:</td>
                                <td>XYZ</td>
                            </tr>
                            <!-- Sixth row -->
                            <tr>
                                <td class="text-bold">1st Policy Issue Date:</td>
                                <td>20/20/2024</td>
                            </tr>
                            <!-- Seventh row -->
                            <tr>
                                <td class="text-bold">Client:</td>
                                <td>XYZ</td>
                            </tr>
                            <!-- Eighth row -->
                            <tr>
                                <td class="text-bold">Exchange Rate:</td>
                                <td>XYZ</td>
                            </tr>
                            <!-- Ninth row -->
                            <tr>
                                <td class="text-bold">Layout:</td>
                                <td>XYZ</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- refferals ends here -->

            <!-- communication starts here -->
            <!-- <div v-if="selectedActionTab === 'Whatsapp'" class="null-data-image-div ">                     
                <img src="/images/whatsapp-with-too-many-happy-people.png">              
           </div> -->
            <div v-if="selectedActionTab === 'Whatsapp'" style="min-height:62vh">
                <Whatsapp />

            </div>

            <!-- <div v-if="selectedActionTab === 'SMS'" class="null-data-image-div ">
                <img src="/images/QALoan.png">
            </div> -->
            <div v-if="selectedActionTab === 'SMS'" class="null-data-image-div ">
                <SMS />
            </div>
            <!-- <div v-if="selectedActionTab === 'Emails'" class="null-data-image-div ">
                <img src="/images/email-with-too-many-happy-people.png">
            </div> -->
            <div v-if="selectedActionTab === 'Emails'" class="null-data-image-div ">
                <Email />
            </div>
            <!-- communication ends here -->

            <!-- policy starts here -->
            <div class="p-2 " v-if="selectedTab === 'Policies' && !mobileView">
                <div class="row ">
                    <div class="search-container-div col-lg-10 col-md-10 col-sm-12">
                        <div class="search-container">
                            <input class="search-input" type="search" placeholder="Search" aria-label="Search">
                            <i class="fas fa-search" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-12 add-note-btn-div text-end">
                        <i class="d-none d-sm- block fa fa-plus-square fs-4 cursor-pointer mb-2 mx-2 blue-color"
                            title="Add Note"></i>
                        <button class="btn custom-btn px-2 py-1">Add New</button>
                    </div>
                </div>
                <div class="border">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Policy Name</th>
                                <th scope="col">Policy Type</th>
                                <th scope="col">Renewable</th>
                                <th scope="col">Date Issued</th>
                                <th scope="col">Expiry Date</th>
                                <th scope="col">Premium</th>
                                <th scope="col">Maturity Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Life Insurance Policy</td>
                                <td>Life Insurance</td>
                                <td>Yes</td>
                                <td>January 1, 2024</td>
                                <td>January 1, 2044</td>
                                <td>$100/month</td>
                                <td>January 1, 2064</td>
                            </tr>
                            <tr>
                                <td>Car Insurance Policy</td>
                                <td>Vehicle Insurance</td>
                                <td>Yes</td>
                                <td>March 15, 2024</td>
                                <td>March 15, 2025</td>
                                <td>$500/year</td>
                                <td>N/A</td>
                            </tr>
                            <tr>
                                <td>Home Insurance Policy</td>
                                <td>Property Insurance</td>
                                <td>Yes</td>
                                <td>June 30, 2023</td>
                                <td>June 30, 2028</td>
                                <td>$1000/year</td>
                                <td>N/A</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-if="selectedTab === 'Policies' && mobileView">

                <div class="custom-border-body row py-1 border">
                    <div class="row">
                        <div class="col-10">
                            <p class="mb-0  h6 "><small> policy Name- Life Insurance</small></p>
                            <p class="mb-0 h6"><small> Policy Type- Life Insurance</small></p>
                            <p class="mb-0 h6"><small> Renewable- Yes</small></p>
                            <p class="mb-0 h6"><small> Date Issued- 20/20/20</small></p>
                            <p class="card-text  h6"><small>Expiry Date - 20/20/20</small></p>
                            <p class="mb-0  h6"><small>Premium - 100$ </small></p>
                        </div>
                        <div class="col-2 text-end">
                            <i class="fa fa-pencil p-2 text-lg  cursor-pointer"></i>
                            <i class="fa fa-trash p-2 text-lg  cursor-pointer"></i>
                        </div>
                    </div>
                </div>
            </div>
            <!-- policy ends here -->

            <!-- Lead history starts here -->
            <div class="p-2 " v-if="selectedTab === 'Lead History' && !mobileView">
                <div class="border">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Lead Name</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">End Date</th>
                                <th scope="col">Status</th>
                                <th scope="col">Last Modified</th>
                                <th scope="col">Expected Closure</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>John Doe</td>
                                <td>April 1, 2024</td>
                                <td>April 10, 2024</td>
                                <td>Closed</td>
                                <td>April 10, 2024</td>
                                <td>April 15, 2024</td>
                            </tr>
                            <tr>
                                <td>Jane Smith</td>
                                <td>March 20, 2024</td>
                                <td>April 5, 2024</td>
                                <td>Active</td>
                                <td>April 5, 2024</td>
                                <td>April 20, 2024</td>
                            </tr>
                            <tr>
                                <td>Michael Johnson</td>
                                <td>February 15, 2024</td>
                                <td>March 1, 2024</td>
                                <td>Lost</td>
                                <td>March 1, 2024</td>
                                <td>N/A</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-if="selectedTab === 'Lead History' && mobileView">

                <div class="custom-border-body row py-1 border">
                    <div class="">
                        <div class="row">
                            <div class="col-10">
                                <p class="mb-0  h6 blue-color"><small> Lead Name- doc.xml </small></p>
                                <p class="mb-0 h6"><small> Start Date- 20/20/20</small></p>
                                <p class="mb-0 h6"><small> End Date- 20/20/20</small></p>
                                <p class="mb-0 h6"><small> Last Modified- 20/20/20</small></p>
                                <p class="card-text  h6"><small>Status - Active</small></p>
                                <p class="mb-0  h6"><small>Expected Closure - 20/20/20 </small></p>
                            </div>
                            <div class="col-2 text-end">
                                <i class="fa fa-pencil p-2 text-lg  cursor-pointer"></i>
                                <i class="fa fa-trash p-2 text-lg  cursor-pointer"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Lead history ends here -->


            <!-- openActivity starts here- -->
            <div v-if="selectedTab === 'Open Activity'">
                <OpenActivity />
            </div>
            <!-- OpenActivity ends here- -->

            <!-- CloseActivity starts here- -->
            <div v-if="selectedTab === 'Close Activity'">
                <CloseActivity />
            </div>
            <!-- CloseActivity ends here- -->

            <!-- RemoteAssist starts here- -->
            <div v-if="selectedTab === 'Remote Assist'">
                <RemoteAssist />
            </div>
            <!-- RemoteAssist ends here- -->
            <!-- compagion starts here -->
            <div v-if="selectedTab === 'Campaign'">
                <Compagion />
            </div>
            <!-- compagion ends here---- -->

            <!-- Parent Client Listing starts here -->
            <div v-if="selectedTab === 'Parent Client Listing'">
                <ParentClientListing />
            </div>
            <!-- Parent Client Listing ends here -->

            <!-- Invited Meeting starts here -->
            <div v-if="selectedTab === 'Invited Meeting'">
                <InvitedMeeting />
            </div>
            <!-- Invited Meeting ends here---- -->

            <!-- Customer Service starts here -->
            <div v-if="selectedTab === 'Customer Service'">
                <CustomerService />
            </div>
            <!-- Customer Service ends here---- -->


            <!-- Zoho Sales IQ starts here -->
            <div v-if="selectedTab === 'Zoho Sales IQ'">
                <ZohoSalesIQ />
            </div>
            <!-- Zoho Sales IQ ends here---- -->

            <!-- Related Auto Insurance starts here -->
            <div v-if="selectedTab === 'Related Auto Insurance'">
                <RelatedAutoInsurance />
            </div>
            <!-- Related Auto Insurance ends here---- -->

            <!-- Zoho Survey starts here -->
            <div v-if="selectedTab === 'Zoho Survey'">
                <ZohoSurvey />
            </div>
            <!-- Zoho Sales IQ ends here---- -->

            <!-- Referral Lead starts here -->
            <div v-if="selectedTab === 'Referral Lead'">
                <ReferralLead />
            </div>
            <!-- Zoho Sales IQ ends here---- -->

            <!-- Referral Client starts here -->
            <div v-if="selectedTab === 'Referral Client'">
                <ReferralClient />
            </div>
            <!-- Referral Client ends here---- -->

            <!-- Total Referral starts here -->
            <div v-if="selectedTab === 'Total Referral'">
                <TotalRefferal />
            </div>
            <!-- Total Referral ends here---- -->

            <!-- Referred form starts here -->
            <div v-if="selectedTab === 'Referred Form'">
                <ReferrelFrom />
            </div>
            <!-- Total Referral ends here---- -->

            <!-- Investment policy Advisor form starts here -->
            <div v-if="selectedTab === 'Investment Policy Advisor'">
                <InvestmentPolicyAdvisor />
            </div>
            <!-- Investment Policy Advisor ends here---- -->


            <!-- Investment Policy Advisor ends here---- -->

            <div class="footer"></div>

        </div>
    </div>
    <!-- Main content container ends here -->


</template>

<script>

import { putUrl } from "../../boot/axios"
import axios from "axios"
import { reactive, ref } from "vue"
import Loader from "../utils/Loader.vue";
import Whatsapp from "../utils/Whatsapp.vue"
import SMS from "../utils/SMS.vue"
import Email from "../utils/Email.vue"
import Notes from "../utils/Notes.vue"
import Overview from "./ContactForm.vue";
import Attachment from "../utils/Attachment.vue";
import OpenActivity from "../utils/commonRelatedList/openActivity/OpenActivity.vue";
import CloseActivity from "../utils/commonRelatedList/closeActivity/CloseActivity.vue";
import Compagion from "../utils/commonRelatedList/compagions/Compagion.vue";
import ParentClientListing from "../utils/commonRelatedList/parentClientListing/ParentClientListing.vue";
import InvitedMeeting from "../utils/commonRelatedList/invitedMeetings/InvitedMeeting.vue";
import CustomerService from "../utils/commonRelatedList/customerService/CustomerService.vue";
import ZohoSalesIQ from "../utils/commonRelatedList/zohoSalesIQ/ZohoSalesIQ.vue";
import RelatedAutoInsurance from "../utils/commonRelatedList/relatedAutoInsurance/RelatedAutoInsurance.vue";
import ZohoSurvey from "../utils/commonRelatedList/zohoSurvey/ZohoSurvey.vue";
import ReferralLead from "../utils/commonRelatedList/referralLead/ReferralLead.vue";
import ReferralClient from "../utils/commonRelatedList/refferalClient/ReferralClient.vue";
import TotalRefferal from "../utils/commonRelatedList/totalRefferal/TotalRefferal.vue";
import ReferrelFrom from "../utils/commonRelatedList/referredFrom/ReferrelFrom.vue";
import InvestmentPolicyAdvisor from "../utils/commonRelatedList/investmentPolicyAdvisor/InvestmentPolicyAdvisor.vue";
import RemoteAssist from "../utils/commonRelatedList/remoteAssist/RemoteAssist.vue";
// import Template from "../utils/commonRelatedList/template/Template.vue";


// import mounted, beforeUnmount from vue

export default {
    components: {
        Loader,
        Whatsapp,
        SMS,
        Email,
        Notes,
        Overview,
        Attachment,
        OpenActivity,
        CloseActivity,
        Compagion,
        ParentClientListing,
        InvitedMeeting,
        CustomerService,
        ZohoSalesIQ,
        RelatedAutoInsurance,
        ZohoSurvey,
        ReferralLead,
        ReferralClient,
        TotalRefferal,
        ReferrelFrom,
        InvestmentPolicyAdvisor,
        RemoteAssist
        // Template

    },
    props: ["id"],
    data() {
        let isLoading = ref(false);
        // let policiesContact = reactive([])
        const formData = reactive({
            emailReRoundOwner: false,
            contactOwner: "",
            dealStageTracking: "",
            insuranceLeadSource: "",
            status: "",
            lead: "",
            firstName: "",
            lastName: "",
            oldDatabaseLead: "",
            mobile: "",
            clientAddress: "",
            email: "",
            advisorModuleName: "",
            parentClient: "",
            clientPolicyIssueOn: "",
            sixthOnBoardedAnniversary: "",
            dateOfBirth: "",
            preferredContactMethod: "",
            preferredContactTime: "",
            gender: "",
            leadCreatedOn: "",
            doYouHaveCorporations: "",
            doesYourCorporationHaveGroupPolicy: "",
            leadStatusOnConversion: "",
            leadConvertedOn: "",
            leadCreatedTime: "",
            layout: "",
            currency: "",
            exchangeRate: 1,
            thirdOnBoardAnniversary: "",
            ninthOnBoardAnniversary: "",
            socialMediaInformation: "",
            understandingOfInsurance: "",
            netWorth: "",
            roundRobinAssignmentTime: "",
            roundRobinAssignmentDate: "",
            emailIsValid: "",
            leadScore: "",
            clvCorporateCommision: "",
            lastClvCorporate: "",
            clvAdvisorCommision: "",
            lastClvAdvisor: "",
            emailRoundRobinOwner: false,
            additionalContactInformation: false,
            emailOptOut: false,
            roundRobinProcessed: false,
            reRoundRobinProcessed: false,
            eligibleRoundRobinOwnerFound: false,
            rcSmsOptOut: false,
            location: "",



            // 2nd step decaleration

            serviceAvailedOptions: "",
            lifeInsurance: "",
            lifeBenefits: "",
            serviceAvailedLoanProtection: "",
            serviceAvailedTravelInsurance: "",
            investment: "",
            groupInsurance: "",
            serviceAvailedhealthAndDentalInsurance: false,
            combinationOrHybridInsurance: false,

            // Repeat Business Information
            serviceAvailedUpdated: "",
            newServiceRequested: "",
            processStage: "",
            otherServiceRequested: "",
            dateNewServiceRequested: "",
            nextFollowUpDateAndTime: "",

            // Potential Business (Max Capability)
            potentialBusinessTravelInsurance: false,
            resp: false,
            rrspTfsa: false,
            potentialBusinessHealthAndDentalInsurance: false,
            otherInvestments: false,
            potentialBusinessLoanProtection: false,
            otherLivingBenefits: false,
            potentialBusinessCriticalIllness: false,
            potentialBusinessLifeInsurance: false,
            potentialDependent: false,
            maxNumberOfPotentialProduct: "",
            maxNumberOfPotentialProductApplicable: "",
            clientRating: "",
            potentialBusinessPolicyValues: "",

            // Pending Potential Business (Still not Sold)
            numberOfProductRemaining: "",
            potentialDependentCompleted: false,
            pendingPotentialBusinesslifeInsurance: false,
            dependentLifeIns: false,
            pendingPotentialBusinessCriticalIllness: false,
            dependentCriticalIns: false,
            pendingPotentialBusinessHealthAndDentalInsurances: false,
            pendingPotentialBusinessTravelInsurance: false,
            pendingPotentialBusinessResp: false,
            rrspTfsaMutualFundsSegFunds: false,
            ppbOtherInvestments: false,
            ppbLoanProtection: false,
            ppbOtherLivingBenefits: false,

            // Business Insurance Potential Revenue Map

            serviceOffering: "",

            // Ethnicity

            religion: "",
            celebratedFestivals: "",

            //  Address Informations
            mailingStreet: "",
            mailingCity: "",
            mailingState: "",
            mailingZip: "",
            mailingCountry: "",
            otherStreet: "",
            otherCity: "",
            otherZip: "",
            otherState: "",
            otherCountry: "",

            // Family Tree
            relationShipStatus: "",
            numberOfSpouse: "",
            nameOfSpouse: "",
            anniversaryDate: "",
            spouseDateOfBirth: "",
            phoneOfSpouse: "",
            emailOfSpouse: "",
            nameOfCommonLawPartner: "",
            commonLawDateOfBirth: "",

            // emergencyinfo

            // leadinfo

            bestTimeToCall: "",
            dateOfBirth1: "",
            ifReferredByAdvisorOrExternal: "",
            isThisReassignment: "",
            referredBy: "",
            investment1: "",
            preferredContactMethod2: "",
            preferredContactTime2: "",
            citizenshipStatus1: "",
            understandingOfInsurance1: "",
            existingInsurancePolicy2: "",
            doYouOwnHomeInCananda: "",
            existingRenewalPolicyDueBy: "",
            doYouHaveLifeInsurance: "",
            coverageYouAreLookingFor: "",
            submitPageUrl: "",
            assignedCampaigns: "",
            state: "",
            zipCode: "",
            twitter1: "",
            skypeId1: "",
            instagram1: "",
            leadPotentialBusinessPolicyValues: "",
            insuranceLeadScore: "",
            insuranceLeadScoringPositiveScore: "",
            insuranceLeadScoringNegativeTouchPointScore: "",
            gender1: "",
            leadInfoAdditionalContactInformation: "",
            networth2: "",
            oldDatabaseLead1: "",
            genderPrediction1: "",
            exchangeRate1: "",
            currency1: "",
            roundRobinAssignmentTime1: "",
            leadCreatedOn1: "",
            street: "",
            city: "",
            country: "",
            linkdin1: "",
            facebook1: "",
            facebookAdInformation: "",
            servicesRequested: "",
            insuranceLeadScoringTouchPointScore: "",
            insuranceLeadsScoringPositiveTouchPointScore: "",
            insuranceLeadsScoringNegativeScore: "",

            // subform declerations
            dependentParents: "",
            numberOfDependentParents: 0,
            dependentParentsData: [],
            newDependentParentsData: [],
            deletedDependentParentsData: [],

            dependentChildren: "",
            numberOfDependentChildren: 0,
            dependentChildrenData: [],
            newDependentChildrenData: [],
            deletedDependentChildrenData: [],

            siblings: "",
            numberOfSiblings: 0,
            formData: [],
            newformData: [],
            deletedformData: [],

            // refferal scoarbords
            referralLevel: "",
            referralPayoutTillDateLife: "",
            referralPayoutTillDateLivingBenefits: "",
            referralPayoutsTillDateHealthAndDental: "",
            referralPayoutsTillDateTravel: "",
            referralTillDateHealthAndDental: "",
            referralTillDateLife: "",
            referralTillDateLivingBenefits: "",
            referralTillDateTravel: "",
            year: "",

            numberOfFestivalsCelebrated: 0,
            festivalsData: [],
            newFestivalData: [],
            deletedFestivalData: [],

            // emergency contact fields
            numberOfEmergencyContact: 0,
            emergencyContactData: [],
            deletedEmergencyContact: [],
            newEmergencyContactCreated: [],
        })
        return {
            dropdownVisible: false,
            tooltip: ref("policies"),
            nav_name: 'policies',
            headerName: "",
            navVisible: false,
            mobileView: window.innerWidth <= 900,
            showicons: false,
            isLoading,
            formData,
            selectedTab: 'Overview',
            selectedActionTab: '',
            visibleOverview: true,
            visibleActions: false,
            isAdvisorVisible: true,
            festivalsList: [],
            familytreeList: [],
            showInfo1: true,
            showInfo2: true,
            showInfo3: false,
            showInfo4: false,
            showInfo5: true,
            showInfo6: false,
            refferalList: [{ name: "Somya", email: "somya@xyz.com", phone: "675756" },
            { name: "Somya", email: "somya@xyz.com", phone: "675756" },
            { name: "Somya", email: "somya@xyz.com", phone: "675756" }],
            items: [
                'reschedule call after 1 day',
                'reschedule call after 2 days',
                'reschedule call after 3 days',
                'reschedule call after 4 days',
                'reschedule call after 5 days',
                'reschedule call after 1 week ',
                'reschedule call after 5 week',
                'send with zoho sign',
                'remote assist',
                'send sms',
                'whatsapp chat',
                'new appointment',
                'closed all activities',
                'email booking url',
                'send sms',
                'whatsapp chat ',
                'ringcentral sms',
                'phoneburner',
                'supervisa send to bot',
                'get family tree supervisa',
                'send to lda',
                'format phone number',
                'Get family tree visitor',
                'stop communication'
            ],
            // The search query entered by the user
            searchQuery: ''

        };
    },
    computed: {
        // Computed property to filter the items based on the search query
        filteredItems() {
            return this.items.filter(item =>
                item.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('click', this.closeDropdown);
    },
    methods: {
        changeNav(navName) {
            this.selectTab(navName)
            this.nav_name = navName;
            this.tooltip = navName;
        },

        showNav() {

            if (this.isUserVisible) {
                this.showUser()
            }
            this.navVisible = !this.navVisible
        },
        handleResize() {
            this.mobileView = window.innerWidth <= 900;
        },
        toggleInfo(data) {
            if (data === "showInfo1") {
                this.showInfo1 = !this.showInfo1;
            }
            if (data === "showInfo2") {
                this.showInfo2 = !this.showInfo2;
            }
            if (data === "showInfo3") {
                this.showInfo3 = !this.showInfo3;
            }
            if (data === "showInfo4") {
                this.showInfo4 = !this.showInfo4;
            }
            if (data === "showInfo5") {
                this.showInfo5 = !this.showInfo5;

            }
            if (data === "showInfo6") {
                this.showInfo6 = !this.showInfo6;

            }
        },
        selectTab(tabName) {
            this.headerName = tabName;
            this.selectedActionTab = "";
            this.selectedTab = tabName;
            if (tabName === 'overview') {
                this.visibleOverview = true;
                this.visibleActions = false;
            } else {
                this.visibleOverview = false;
                this.visibleActions = true;
            }

            if (tabName === 'Activities') {
                this.selectedActionTab = 'Notes'
            }
            if (tabName === 'Businesses') {
                this.selectedActionTab = 'Lead'
            }
            if (tabName === 'Communication') {
                this.selectedActionTab = 'Whatsapp'
            }
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
        // JavaScript
        handleMouseOver() {
            if (!this.isAdvisorVisible) {
                const item = document.querySelector('.Advisor-details-section');
                item.style.minHeight = '87vh';
            }
        },

        handleMouseLeave() {
            if (!this.isAdvisorVisible) {
                const item = document.querySelector('.Advisor-details-section');
                item.style.minHeight = '2rem';
            }
        },
        toggleDropdown() {
            this.dropdownVisible = !this.dropdownVisible;
            console.log('Dropdown visibility:', this.dropdownVisible);
        },
        showAdvisor() {
            window.addEventListener('resize', this.handleResize);

            if (this.navVisible) {
                this.navVisible = !this.navVisible
            }

            this.isAdvisorVisible = !this.isAdvisorVisible;
            const item = document.querySelector('.Advisor-details-section');
            if (this.mobileView) {
                item.style.width = this.isAdvisorVisible ? '80%' : '1rem';
                console.log("Mobilevie true")
            } else {
                item.style.width = this.isAdvisorVisible ? '30%' : '1rem';
                console.log("Mobilevie false")
            }

            item.style.height = this.isAdvisorVisible ? '' : '2rem';
            item.style.minHeight = this.isAdvisorVisible ? '' : '2rem';

            item.style.backgroundColor = this.isAdvisorVisible ? "#fff" : "rgb(241, 241, 241) ";
            const content = document.querySelector('.Advisor-details-content');
            content.style.display = this.isAdvisorVisible ? 'block' : 'none';
        },
        capitalize(value) {
            if (!value) return '';
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        },

        async fetchContactData() {
            this.isLoading = true;
            if (this.id) {

                const getContactDetails = async () => {
                    const response = await axios.get(
                        `${putUrl}contact/api/v1/getcontact/${this.id}`
                    );
                    console.log(response)
                    this.isLoading = false;
                    let contactResult = reactive([]);
                    let contactSubDetails = reactive([]);
                    let familytree = reactive([]);
                    let leadinfo = reactive([]);
                    let dependentParents = reactive([]);
                    let dependentChildren = reactive([]);
                    let siblings = reactive([]);
                    let festivalsRes = reactive([]);
                    let referralScoreboard = reactive([]);
                    let leadConversionHistory = reactive([]);
                    let emergencyContactResult = reactive([]);

                    contactResult = response.data.data.contactResult.map(
                        (item) => item.contacts
                    );
                    contactSubDetails = response.data.data.contactSubDetails.map(
                        (item) => item.contactSubDetails
                    );
                    familytree = response.data.data.faimlyTree.map(
                        (item) => item.familyTree
                    );
                    leadinfo = response.data.data.leadInformations.map(
                        (item) => item.leadInformations
                    );
                    dependentParents = response.data.data.dependentParents.map(
                        (item) => item.dependentParents
                    );
                    dependentChildren = response.data.data.dependentChildren.map(
                        (item) => item.dependentChildren
                    );
                    siblings = response.data.data.contactsSiblings.map(
                        (item) => item.contactsSiblings
                    );
                    festivalsRes = response.data.data.festivals.map(
                        (item) => item.festivals
                    );
                    referralScoreboard = response.data.data.referralScoreboard.map(
                        (item) => item.referralScoreboard
                    );
                    leadConversionHistory = response.data.data.leadConversionHistory.map(
                        (item) => item.leadConversionHistory
                    );
                    emergencyContactResult = response.data.data.emergencyContact.map(
                        (item) => item.contactEmergencyDetails
                    );
                    // this.policiesContact = response.data.data.policiesContact.map(
                    //     (item) => item.policies
                    // );
                    // console.log(" this.policiesContact", this.policiesContact)

                    // mapping of not dynamically mapped data
                    this.formData.insuranceLeadSource =
                        contactResult[0].insuranceLeadsSource;
                    this.formData.doYouHaveCorporations =
                        contactResult[0].doYouHaveACorporation;
                    this.formData.doesYourCorporationHaveGroupPolicy =
                        contactResult[0].doesYourCorporationHaveAGroupPolicy;
                    this.formData.leadScore = contactResult[0].leadsScore;
                    this.formData.clvCorporateCommision =
                        contactResult[0].clvCorporateCommission;
                    this.formData.lastClvCorporate = contactResult[0].lastCLVCorporate;
                    this.formData.clvAdvisorCommision =
                        contactResult[0].clvAdvisorCommission;
                    this.formData.lastClvAdvisor = contactResult[0].lastCLVAdvisor;

                    this.formData.rcSmsOptOut = contactResult[0].rcSMSOptOut;
                    this.formData.sixthOnBoardedAnniversary =
                        contactResult[0].onBoardedAnniversary6th;
                    this.formData.clientPolicyIssueOn =
                        contactResult[0].clients1stPolicyIssuedOn;
                    this.formData.thirdOnBoardAnniversary =
                        contactResult[0].onBoardedAnniversary3rd;
                    this.formData.additionalContactInformation =
                        contactResult[0].additionalContactInformation;
                    this.formData.location = contactResult[0].location;
                    // repeat business info
                    this.formData.serviceAvailedUpdated =
                        contactSubDetails[0].servicesAvailedUpdated;
                    this.formData.nextFollowUpDateAndTime =
                        contactSubDetails[0].nextFollowUpDateTime;

                    // Pending Potential Business (Still not Sold)
                    this.formData.dependentCriticalIns =
                        contactSubDetails[0].pendingPotentialBusinessCriticalIllness;

                    // leadinfo
                    this.formData.ifReferredByAdvisorOrExternal =
                        leadinfo[0].ifreferredbyAdvisor;
                    this.formData.isThisReassignment = leadinfo[0].isthisAReassignment;
                    this.formData.investment1 = leadinfo[0].investments1;
                    this.formData.doYouOwnHomeInCananda =
                        leadinfo[0].doYouOwnAHomeInCanada;
                    this.formData.submitPageUrl = leadinfo[0].submitPageURL;
                    this.formData.skypeId1 = leadinfo[0].skypeID1;
                    this.formData.leadPotentialBusinessPolicyValues =
                        leadinfo[0].potentialBusinessPolicyValues1;
                    this.formData.insuranceLeadScore =
                        leadinfo[0].insuranceLeadsScoringScore;
                    this.formData.leadInfoAdditionalContactInformation =
                        leadinfo[0].additionalContactInformation;
                    this.formData.oldDatabaseLead1 = leadinfo[0].oldDatabaseLead1;
                    this.formData.existingRenewalPolicyDueBy =
                        leadinfo[0].existingPolicyRenewalDueBy;
                    this.formData.doYouHaveLifeInsurance =
                        leadinfo[0].doYouHavelifeInsurance;
                    this.formData.insuranceLeadScoringTouchPointScore =
                        leadinfo[0].insuranceLeadScoringTouchPointScore;
                    this.formData.insuranceLeadsScoringPositiveTouchPointScore =
                        leadinfo[0].insuranceLeadScoringPositiveTouchPointScore;
                    this.formData.insuranceLeadsScoringNegativeScore =
                        leadinfo[0].insuranceLeadScoringNegativeScore;

                    Object.assign(this.formData, contactResult[0]);
                    Object.assign(this.formData, contactSubDetails[0]);
                    Object.assign(this.formData, familytree[0]);
                    Object.assign(this.formData, leadinfo[0]);
                    Object.assign(this.formData, referralScoreboard[0]);


                    this.formData.dependentParentsData = dependentParents;
                    this.formData.dependentChildrenData = dependentChildren;
                    this.formData.formData = siblings;
                    this.formData.festivalsData = festivalsRes;
                    this.formData.festivalsData = festivalsRes;
                    this.formData.referralScoreCardData = referralScoreboard;
                    this.formData.leadConversionHistoryData = leadConversionHistory;
                    this.formData.emergencyContactData = emergencyContactResult;


                };

                getContactDetails();
            }
        },
        handleItemClick(item) {
            console.log('Item clicked:', item);
            // You can perform any specific action here based on the clicked item
            // For example, navigating to another page or calling an API
            alert(`You selected: ${item}`);
        },
        capitalize(value) {
            if (!value) return '';
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        // Initially check the screen size
        this.handleResize();
        this.fetchContactData()
        this.showAdvisor()

    }


}

</script>
<style scoped>
.dot-badge {
    top: 23% !important;
    left: 90% !important;
}

.content {
    width: 300px;
    height: 200px;
    overflow: scroll;
    scrollbar-width: none;
    /* Hide scrollbar in Firefox */
    -ms-overflow-style: none;
    /* Hide scrollbar in IE 10+ */
}

.content::-webkit-scrollbar {
    display: none;
    /* Hide scrollbar in Chrome, Safari, and Edge */
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

.footer {
    min-height: 5rem;
    min-width: 100%;
    background-color: #fff;
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

.advisor-cards {
    /* background-color: #CCE5FF; */
    margin-left: 1rem;
    border: 1px solid rgba(192, 192, 192, 0.5);
    margin-left: 1rem !important;
    border-radius: 1rem;

}

.advisor-cards:hover {
    background-color: #DCDFEC;
    cursor: pointer;
}

.advisor-headings {
    background-color: #CCE5FF;
    border: 1px solid rgba(192, 192, 192, 0.5);
    border-radius: 5px;
    height: 2rem;
    padding-left: 10px;
    border-right: none;
    color: #323338;

}

.Advisor-details-section {
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

.border {
    border-radius: 5px !important;
}

.custom-border-body {
    border: 1px solid rgba(192, 192, 192, 0.5);
    border-radius: 5px;
    transition: 0.2s ease-in;
    overflow: hidden;
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
    background-color: #F9E110;
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

.selected {
    border: 1px solid silver;
    align-items: center;
    height: 2rem;
    border-radius: 5px;
    border-bottom: 2px solid #fff;
    background-color: #fff;
    transform: translateY(1px);
    font-weight: 700;
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

.custom-scroll .container {
    margin: 0px;
    max-width: 100%;
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

    .familytree-heading-size {
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
        background-color: #F9E110;
        margin: 1.5rem;
    }

    .custom-border-body {
        border: none;
    }

    .custom-border-data {

        border-radius: 5px;
    }

}


@media (min-width: 768px) and (max-width: 991px) {


    .custom-border-data {

        border: none;

    }
}

@media (min-width: 992px) {
    .custom-border {
        border: 1px solid rgba(192, 192, 192, 0.5);
    }
}

/* css for custom sards ends here */
</style>
