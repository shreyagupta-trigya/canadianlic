<template>
    <div class="contactView no-scroll  card me-2 mb-0 pb-0" style="border-radius: 5px; max-height: 89vh; ">
        <!-- navbar strats here -->
        <nav :class="[mobileView ? 'col px-0' : 'row px-2']" class=" col-12   pb-0 pt-3 border-bottom">
            <div>
                <a @click="showNav()" class="mx-2 ms-3" v-if="mobileView && !navVisible" href="javascript:;"> <i
                        class="fa fa-bars fs-5"></i></a>
                <a @click="showNav()" class="mx-2 ms-3" v-if="mobileView && navVisible" href="javascript:;"> <i
                        class="fa fa-close fs-5"></i></a>
            </div>
            <!-- navbar to show in desktop -->
             <div class="col-12 d-flex justify-content-between">
            <div v-if="!mobileView" class="col-6  ">

                <a :class="{ 'selected': selectedTab === 'overview' }" @click="selectTab('overview')"
                    class="text-md  mx-2 " href="javascript:;">Overview</a>


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

                <a :class="{ 'selected': selectedTab === 'LeadHistory' }" @click="selectTab('LeadHistory')"
                    class=" text-md   mx-2" href="javascript:;">Lead History</a>
                <a :class="{ 'selected': selectedTab === 'Policy' }" @click="selectTab('Policy')"
                    class=" text-md   mx-2" href="javascript:;">Policies</a>

                <a :class="{ 'selected': selectedTab === 'Communication' }" @click="selectTab('Communication')"
                    class=" text-md   mx-2 position-relative" href="javascript:;">Comms
                    <span
                        class="position-absolute top-0 start-100 blue-color-background translate-middle border border-light rounded-circle text-xxs"
                        style="padding:3px"></span>
                </a>
                <a :class="{ 'selected': selectedTab === 'ReferralForm' }" @click="selectTab('ReferralForm')"
                    class=" text-md   mx-2" href="javascript:;">Referral Form</a>

                    <a :class="{ 'selected': selectedTab ==='OpenActivity'}" @click="selectTab('OpenActivity')"
                    class=" text-md mx-1 position-relative" href="javascript:;">Open Activity
                 </a>
                 <a :class="{ 'selected': selectedTab ==='CloseActivity'}" @click="selectTab('CloseActivity')"
                    class=" text-md mx-1 position-relative" href="javascript:;">Close Activity
                 </a>
            </div>
            <div v-if="!mobileView" class="col-6 d-flex justify-content-end  ">
                <div style="position:relative;">
               
               <button type="button" class="btn  dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
   Quick Actions
 </button>
 <ul class="dropdown-menu dropdown-menu-start dropdown-menu-lg-start"  style="border: 1px solid; max-height:200px; top:19px; left:-120px; position:absolute; overflow-y:auto;">
   <div class="search-container-div col-lg-10 col-md-10 col-sm-12">
                       <div class="search-container">
                           <input class="search-input" type="search" v-model="searchQuery" placeholder="Search" aria-label="Search">
                           <i class="fas fa-search" aria-hidden="true"></i>
                       </div>
                   </div>
     <!-- Filtered list of items -->
     <li v-for="(item, index) in filteredItems" :key="index">
         <button class="dropdown-item" type="button" >{{capitalize(item)}}</button>
       </li>

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
                        <li><a @click="selectTab('OpenActivity')" class="text-md px-1 mx-2" href="javascript:;">Open Activity</a>
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
                </div>
            </transition>
            <!-- navbar to show in mobile ends-->
        </nav>
        <!-- navbar ends here -->

        <!-- Sub nav starts here  -->
        <!-- Sub nav for Activity starts here  -->
        <div class="" v-if="selectedTab === 'Activity' && !mobileView">
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
                        <button class=" mb-0 btn py-2 add-btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
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
                        {{ noteList.length }} <span v-if="noteList.length >= 100">+</span>
                    </span>
                    <a :class="{ 'selected': selectedActionTab === 'notes' }" @click="selectActionTab('notes')"
                        class="mx-2 text-md px-2" href="javascript:;">Notes
                    </a>
                </div>

                <div class=" position-relative mx-1">
                    <span
                        class="text-xxs position-absolute top-0 right-0 start-100 translate-middle badge rounded-pill blue-color-background p-1">
                        20
                    </span>
                    <a :class="{ 'selected': selectedActionTab === 'Attachments' }"
                        @click="selectActionTab('Attachments')" class=" text-md  mx-2 px-2"
                        href="javascript:;">Attachments</a>
                </div>

                <div class="mx-1">
                    <a :class="{ 'selected': selectedActionTab === 'ScoreBoards' }"
                        @click="selectActionTab('ScoreBoards')" class=" text-md  mx-2 px-2" href="javascript:;">Score
                        Boards</a>
                </div>


            </nav>
        </div>
        <!-- Sub nav for Activity ends here  -->
        <!-- Sub nav for Business starts here  -->
        <div class="" v-if="selectedTab === 'Business' && !mobileView">
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
            <!-- button div -->
            <div class="row mt-3">
                <div class="col-10 ">
                    <div class="search-container ms-4">
                        <input class="search-input" type="search" placeholder="Search" aria-label="Search">
                        <i data-v-1a08f58e="" class="fas fa-search" aria-hidden="true"></i>
                    </div>

                </div>

                <div class="col-2 ">
                    <a href="javascript:;">
                        <button class="add-btn btn p-2">
                            Send Email</button>
                    </a>
                </div>
            </div>
            <!-- button div ends-->
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
                        <a :class="{ 'selected': selectedActionTab === 'Email' }" @click="selectActionTab('Email')"
                            class=" text-md  mx-2 px-2" href="javascript:;">Email</a>
                    </div>

                </div>

            </nav>
        </div>
        <!-- Sub nav for Commuication ends here  -->

      <!-- openActivity starts here- -->
      <div v-if = "selectedTab === 'OpenActivity' && !mobileView">
                 <OpenActivity/>
             </div>
            <!-- OpenActivity ends here- -->

        
        <!-- Sub nav ends here  -->
        <!-- Main content container -->
        <div class="card-body custom-scroll" style="min-height:84vh">
            <!-- overview starts from here -->
            <!-- part overview 1  -->
            <div v-if="selectedTab === 'overview'" class="row justify-content-center conatct-overview">
                <div class="card col-lg-12 col-md-12 col-sm-12 gap-5">
                    <div class="row py-2">

                        <!-- image box -->
                        <div class=" d-flex pt-1 col-lg-5 col-md-5 col-sm-12">
                            <div class="overview-img text-center "> <span class="overview-img-text pt-2">PA</span></div>
                            <div class=" mt-4 ">

                                <p class="mb-0 heading-color overview-heading text-bold">{{ formData.firstName + " " +
                                    formData.lastName }}</p>
                                <p :class="mobileView ? 'text-sm' : 'text-lg'">contact</p>
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

                        <div class="mt-2 mb-2 col-lg-7 col-md-7 col-sm-12">
                            <div class="row">
                                <div class="text-start heading-color col-md-6 col-sm-12">
                                    <section class="d-flex">
                                        <div class="pt-1 px-3"><i class="fa fa-envelope-o text-color"></i> </div>
                                        <div>
                                            <p class=" mb-0 text-sm text-bold">Email</p>
                                            <p class="text-xs text-muted">Xyzscbc@gmail.com</p>
                                        </div>

                                    </section>
                                </div>
                                <div class="text-start heading-color col-md-6 col-sm-12">
                                    <section class="d-flex">
                                        <div class="pt-1 px-3"><i class="fa fa-skype text-color"></i> </div>
                                        <div>
                                            <p class=" mb-0 text-sm text-bold">Skype</p>
                                            <p class="text-xs text-muted">Xyzscbc@gmail.com</p>
                                        </div>

                                    </section>
                                </div>
                                <div class="text-start heading-color col-md-6 col-sm-12 ">
                                    <section class="d-flex">
                                        <div class="pt-1 px-3"><i class="fa fa-phone text-color"></i> </div>
                                        <div>
                                            <p class=" mb-0 text-sm text-bold">Phone</p>
                                            <p class="text-xs text-muted">6657657</p>
                                        </div>

                                    </section>
                                </div>
                                <div class="text-start heading-color col-md-6 col-sm-12 ">
                                    <section class="d-flex">
                                        <div class="pt-1 px-3"><i class="fa fa-birthday-cake text-color"></i> </div>
                                        <div>
                                            <p class=" mb-0 text-sm text-bold">Birthday </p>
                                            <p class="text-xs text-muted">54657667</p>
                                        </div>

                                    </section>
                                </div>
                                <div class="text-start heading-color col-md-6 col-sm-12 ">
                                    <section class="d-flex">
                                        <div class="pt-1 px-3"><i class="fa fa-street-view text-color"></i> </div>
                                        <div>
                                            <p class=" mb-0 text-sm text-bold">Location</p>
                                            <p class="text-xs text-muted">xyz</p>
                                        </div>

                                    </section>
                                </div>
                                <div class="text-start heading-color col-md-6 col-sm-12 ">
                                    <section class="d-flex">
                                        <div class="pt-1 px-3"><i class="fa fa-calendar-o text-color"></i> </div>
                                        <div>
                                            <p class=" mb-0 text-sm text-bold">Work anniversary</p>
                                            <p class="text-xs text-muted">xyz</p>
                                        </div>

                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- part overview 1 ends -->
                <!-- part overview 2 -->
                <div class=" row mt-4 justify-content-center ps-0 pe-0">
                    <div class=" heading-color col-md-6 col-sm-12 ps-0">
                        <div v-if="!mobileView" class="container card">
                            <div class="ms-2 container pt-2">
                                <p class="mb-0 heading-color overview-heading text-bold">Notifications</p>
                                <p class="mb-0 text-sm heading-color">Manage your notification settings</p>
                                <p class="mb-0 text-sm heading-color">We may still send you important notifications
                                    about
                                    your account and content</p>
                                <p class=" text-sm heading-color">outside of your preferred notification settings.</p>
                            </div>
                            <div class="ms-2 col pt-2 ps-2 mt-4 container pb-3">
                                <!-- desktop notification button -->
                                <section v-if="!mobileView" class=" ms-3 row col-12 border p-2 mb-3 ">
                                    <div class="pt-1 px-3 col-1">
                                        <i class="fa fa-calendar text-color"></i>
                                    </div>
                                    <div class="col-9">
                                        <p class=" mb-0 text-md text-bold">Desktop Notifications</p>
                                        <p class="text-sm text-muted">Recieve notification directly on my screen</p>
                                    </div>
                                    <div class="col-2 mt-2 px-0"><button
                                            class=" desktop-notifications py-1 btn mt-2">Enable </button></div>
                                </section>
                                <!-- desktop notification button  ends-->
                                <!-- email notification -->
                                <section v-if="!mobileView" class=" ms-3 row col-12 border p-2 mb-3 ">
                                    <div class="pt-1 px-3 col-1">
                                        <i class="fa fa-calendar text-color"></i>
                                    </div>
                                    <div class="col-9">
                                        <p class=" mb-0 text-md text-bold">Email Notifications</p>
                                        <p class="text-sm text-muted">Send me notifications via email when someone...
                                        </p>
                                    </div>
                                    <div class="col-2 mt-2 px-0"><button
                                            class=" desktop-notifications py-1 btn mt-2">Enable </button></div>
                                </section>

                            </div>
                        </div>
                        <!-- email notifications ends -->
                    </div>
                    <div class="col-md-6 col-sm-12 pe-0">
                        <div class="card" style="min-height:49vh">
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

            </div>
            <!-- Notes starts from here -->
            <div class="d-flex justify-content-center px-4">
                <div v-if="selectedActionTab === 'notes'" class="col-md-12">
                    <div class="custom-scroll">
                        <!-- details section -->
                        <div v-for="item in noteList" :key="item.id" class="border shadow rounded mb-2 cursor-pointer">
                            <!-- left -->
                            <div class="row">
                                <div class="card-body py-2 px-4 col-8">
                                    <p class="card-title heading-color text-md mb-0">{{ item.noteTitle }}</p>
                                    <p class="card-text mb-0"><small>{{ item.description }}</small> <span
                                            class="blue-color">... <small>read
                                                more</small></span></p>
                                    <small><span class="text-md  "><u>Author :</u></span> {{ item.addedBy
                                        }}</small>
                                    <div>
                                        <i class="fa fa-file-excel-o p-2 text-md blue-color"></i>
                                        <i class="fa fa-file-word-o p-2 text-md blue-color"></i>
                                        <i class="fa fa-file-powerpoint-o p-2 text-md blue-color"></i>
                                        <i class="fa fa-file-image-o p-2 text-md blue-color"></i>
                                        <i class="fa fa-file-video-o p-2 text-md blue-color"></i>
                                        <i class="fa fa-file-audio-o p-2 text-md blue-color"></i>
                                        <i class="fa fa-file-text-o p-2 text-md blue-color"></i>
                                    </div>
                                </div>

                                <div class="text-end pt-2 col-3 me-2">
                                    <!-- <small>{{ selectedFile.name }}</small> -->
                                    <label for="fileInput">
                                        <i class="fa fa-paperclip p-2 text-lg blue-color cursor-pointer"></i>
                                    </label>
                                    <input type="file" id="fileInput" name="files[]" @change="updateSelectedDoc"
                                        multiple style="display: none;">

                                    <i class="fa fa-pencil p-2 text-md blue-color cursor-pointer"></i>
                                    <i @click="deleteNotes(item.id)"
                                        class="fa fa-trash p-2 text-md blue-color cursor-pointer"></i>
                                </div>

                                <!-- ends -->
                            </div>
                            <!-- details section ends-->
                        </div>
                    </div>
                    <!-- <div class="footer"></div> -->
                </div>
                <Loader :loading="isLoading" />
                <!-- Notes Ends from here -->
                <!-- Popup for adding notes -->
                <div v-if="showAddNotePopup" class="popup text-start">
                    <div class="col-md-6 col-lg-3 col-sm-6 border shadow p-3 popup-child">
                        <div class="d-flex mb-3 justify-content-between">
                            <h5 class="">Add Note</h5>
                            <i class="fa fa-close " @click="cancelAddNote" style="cursor:pointer"></i>
                        </div>
                        <div class="form-group">
                            <label for="noteTitle">Title</label>
                            <input type="text" v-model="noteTitle" class="form-control" id="noteTitle"
                                placeholder="Enter Note Title" />
                        </div>
                        <div class="form-group">
                            <label for="noteText">Description</label>
                            <textarea v-model="noteText" class="form-control" id="noteText"
                                placeholder="Enter your note here" rows="4"></textarea>
                        </div>
                        <div class="text-center">
                            <button @click="addNotes" class="save-btn btn me-2">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- popup for add notes ends  -->
            <!-- Attachments start here -->
            <!-- display when no data -->
            <!-- <div v-if="selectedActionTab === 'Attachments'" class=" null-data-image-div">
                <img src="/images/QALoan.png" class="null-data-image">
            </div> -->
            <!-- display when no data ends-->
            <!-- Attachment Information -->
            <div class=" p-2  " v-if="selectedActionTab === 'Attachments' && !mobileView">
                <div class=" border ">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">File Name</th>
                                <th scope="col">Attached By</th>
                                <th scope="col">Date Added</th>
                                <th scope="col">Size</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="blue-color">Document1.pdf</td>
                                <td>John Doe</td>
                                <td>2024-04-13</td>
                                <td>1.5 MB</td>
                                <td><i class="fa fa-trash"></i></td>
                            </tr>
                            <tr>
                                <td class="blue-color">Spreadsheet.xlsx</td>
                                <td>Jane Smith</td>
                                <td>2024-04-12</td>
                                <td>750 KB</td>
                                <td><i class="fa  fa-trash"></i></td>
                            </tr>
                            <tr>
                                <td class="blue-color">Presentation.pptx</td>
                                <td>Michael Johnson</td>
                                <td>2024-04-11</td>
                                <td>2.2 MB</td>
                                <td><i class="fa  fa-trash"></i></td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
            <!-- Attachments Information Ends Here -->
            <!-- show on mobile view     -->

            <div v-if="selectedActionTab === 'Attachments' && mobileView" class=" p-2 border my-2 ">

                <div class="custom-border-body row py-1 m-1">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-10">
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

            <div class=" p-2 border " v-if="selectedActionTab === 'ScoreBoards'">
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
                                class="text-sm text-bold heading-color">Level: </span> <span class="text-sm"> A1</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Referral Till Date Life: </span> <span
                                class="text-sm">5</span></div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Referral Till Date Living: </span> <span
                                class="text-sm">10</span></div>
                    </div>
                    <div class="custom-border-body row py-1 m-1">
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Referral Till Date Travel :</span> <span
                                class="text-sm">20</span></div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Referral Till Date Health : </span> <span
                                class="text-sm">20</span></div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Referral Payout Till Date : </span> <span
                                class="text-sm">20</span></div>
                    </div>
                    <div class="custom-border-body row py-1 m-1">
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Referral Payouts Till Date Travel: </span> <span
                                class="text-sm">20</span></div>
                    </div>
                </div>
            </div>

            <!-- Scoreboards ends here -->



            <!-- FamilyTree starts here -->
            <div v-if="selectedTab === 'FamilyTree'" class="container heading-color">
                <div class="">
                    <!-- Family Information -->
                    <div class=" p-2 border ">
                        <section class="d-flex align-items-center justify-content-between mx-1"
                            @click="toggleInfo('showInfo1')">
                            <p class=" familytree-heading-size mb-0 fs-5 orange-color">Family Information</p>
                            <i class="fa fa-chevron-down familytree-heading-size fs-5 orange-color"
                                :class="{ 'fa-chevron-up': showInfo1, 'fa-chevron-down': !showInfo1 }"
                                style="cursor:pointer"></i>
                        </section>
                        <div v-show="showInfo1" class="custom-border-body row py-1 m-1">
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Relationship: </span> <span
                                    class="text-sm">{{
                                        formData.relationShipStatus }}</span></div>
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Name Of Spouse: </span> <span
                                    class="text-sm">{{
                                        formData.nameOfSpouse }}</span></div>
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Anniversary Date: </span> <span
                                    class="text-sm">{{
                                        formData.anniversaryDate }}</span></div>
                        </div>
                        <div v-show="showInfo1" class="custom-border-body row py-1 m-1">
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Spouse's Date of Birth :</span> <span
                                    class="text-sm">{{ formData.spouseDateOfBirth }}</span></div>
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Phone of Spouse : </span> <span
                                    class="text-sm">{{
                                        formData.phoneOfSpouse }}</span></div>
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Email of Spouse: </span> <span
                                    class="text-sm">{{
                                        formData.emailOfSpouse }}</span></div>
                        </div>
                        <div v-show="showInfo1" class="custom-border-body row py-1 m-1">
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Number of Spouse : </span> <span
                                    class="text-sm">{{ formData.numberOfSpouse }}</span></div>
                        </div>
                    </div>
                    <!-- Family Information -->
                    <!-- Dependent Parents -->
                    <div class=" p-2 border my-2 ">
                        <section class=" heder-bg d-flex align-items-center justify-content-between mx-1"
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
                    <div class=" p-2 border my-2 ">
                        <section class=" heder-bg d-flex align-items-center justify-content-between mx-1"
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
                    <div class=" p-2 border my-2">
                        <section class="  heder-bg d-flex align-items-center justify-content-between mx-1"
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
                        @click="showAdvisor()" :style="{ cursor: 'pointer', zIndex: 6, color: 'white' }">
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

                        <div class="advisor-headings d-flex justify-content-between mx-3">
                            <div>
                                <p class="text-bold">Refferals</p>
                            </div>
                            <i :class="['fa', !showInfo5 ? 'fa-chevron-down' : 'fa-chevron-up', 'me-2', 'mt-2 ']"
                                @click="toggleInfo('showInfo5')" style="cursor:pointer"></i>
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

                        <div class="advisor-headings d-flex justify-content-between mx-3">
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
            <div class=" p-2 " v-if="selectedTab === 'Festival'">


                <div class=" border ">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Festivals</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Christmas Day</td>
                                <td>December 25, 2024</td>
                            </tr>
                            <tr>
                                <td>Easter Sunday</td>
                                <td>April 14, 2024</td>
                            </tr>
                            <tr>
                                <td>Good Friday</td>
                                <td>April 12, 2024</td>
                            </tr>
                            <tr>
                                <td>Ash Wednesday</td>
                                <td>February 28, 2024</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- festivals Information Ends Here -->
            <!-- festivals ends from here -->
            <!-- lead starts  here -->
            <div class=" p-2 " v-if="selectedActionTab === 'Lead'">
                <div>

                    <div class="custom-scroll">
                        <div class="custom-border-body row py-1 m-1">
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Name: </span> <span class="text-sm">Peter
                                    Anthony</span></div>
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Date Of Birth: </span> <span
                                    class="text-sm">10/10/97</span></div>
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Preferred Contact Time: </span> <span
                                    class="text-sm">Afternoon</span></div>
                        </div>
                        <div class="custom-border-body row py-1 m-1">
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Citizenship Status :</span> <span
                                    class="text-sm">green card</span></div>
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Do You Own A Home: </span> <span
                                    class="text-sm">yes</span></div>
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Existing Policy Renewal: </span> <span
                                    class="text-sm">20/20/2024</span></div>
                        </div>
                        <div class="custom-border-body row py-1 m-1">
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">linkedIn : </span> <span class="text-sm">
                                    xyx.linkdin.com</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- lead ends here -->
            <!-- refferals starts  here -->
            <div class=" p-2 " v-if="selectedActionTab === 'Refferals'">
                <div>
                    <div class="custom-scroll">
                        <div class="custom-border-body row py-1 m-1">
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Name: </span> <span class="text-sm">Peter
                                    Anthony</span></div>
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Annual Referral Slab: </span> <span
                                    class="text-sm">XYZ</span></div>
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Referral Level: </span> <span
                                    class="text-sm">A</span></div>
                        </div>
                        <div class="custom-border-body row py-1 m-1">
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Referral Product Category :</span> <span
                                    class="text-sm">XYZ</span>
                            </div>
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Referral Payout Category: </span> <span
                                    class="text-sm">XYZ </span>
                            </div>
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">1st Policy Issue Date: </span> <span
                                    class="text-sm">20/20/2024</span>
                            </div>
                        </div>
                        <div class="custom-border-body row py-1 m-1">
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">Client : </span> <span class="text-sm">
                                    XYZ</span>
                            </div>
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">ExchangeRate : </span> <span
                                    class="text-sm">
                                    XYZ</span>
                            </div>
                            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                    class="text-sm text-bold heading-color">layout : </span> <span class="text-sm">
                                    XYZ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- refferals ends here -->

            <!-- communication starts here -->
            <!-- <div v-if="selectedActionTab === 'Whatsapp'" class="null-data-image-div ">                     
                <img src="/images/whatsapp-with-too-many-happy-people.png">              
           </div> -->
            <div v-if="selectedActionTab === 'Whatsapp'" class="null-data-image-div ">
                <Whatsapp />

            </div>

            <!-- <div v-if="selectedActionTab === 'SMS'" class="null-data-image-div ">
                <img src="/images/QALoan.png">
            </div> -->
            <div v-if="selectedActionTab === 'SMS'" class="null-data-image-div ">
                <SMS />
            </div>
            <!-- <div v-if="selectedActionTab === 'Email'" class="null-data-image-div ">
                <img src="/images/email-with-too-many-happy-people.png">
            </div> -->
            <div v-if="selectedActionTab === 'Email'" class="null-data-image-div ">
                <Email />
            </div>
            <div v-if="selectedActionTab === 'OpenActivity'" class="null-data-image-div ">
                <OpenActivity />
            </div>
            <!-- communication ends here -->

            <!-- policy starts here -->
            <div class="p-2 " v-if="selectedTab === 'Policy' && !mobileView">
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
            <div v-if="selectedTab === 'Policy' && mobileView" class=" p-2 border my-2 ">

                <div class="custom-border-body row py-1 m-1">
                    <div class="card-body">
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
            </div>
            <!-- policy ends here -->

            <!-- Lead history starts here -->
            <div class="p-2 " v-if="selectedTab === 'LeadHistory' && !mobileView">


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
            <div v-if="selectedTab === 'LeadHistory' && mobileView" class=" p-2 border my-2 ">

                <div class="custom-border-body row py-1 m-1">
                    <div class="card-body">
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
import SMS from "../utils/SMS.vue";
import Email from "../utils/Email.vue"
import OpenActivity from "../utils/commonRelatedList/openActivity/OpenActivity.vue";

// import mounted, beforeUnmount from vue

export default {
    components: {
        Loader,
        Whatsapp,
        SMS,
        Email,
        OpenActivity
    },
    props: ["id"],
    data() {
        let isLoading = ref(false);

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
            siblingData: [],
            newSiblingData: [],
            deletedSiblingData: [],

            // referralScoreCardData: [],
            // referralScoreNumber: 0,
            // leadConversionHistoryNumber: 0,
            // leadConversionHistoryData: [],
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
            navVisible: false,
            mobileView: window.innerWidth <= 900,
            showicons: false,
            isLoading,
            formData,
            selectedTab: 'overview',
            selectedActionTab: '',
            visibleOverview: true,
            visibleActions: false,
            isAdvisorVisible: true,
            navOpen: false,
            showAddNotePopup: false,
            noteTitle: '',
            noteText: '',
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
        
        'create contact',
        'send with zoho sign',
        'send whatsapp',
        'whatsapp chat',
        'phoneburner'
      ],
      // The search query entered by the user
      searchQuery:''

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
    },
    methods: {
        showNav() {

            if (this.isAdvisorVisible) {
                this.showAdvisor()
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
        // popup methods
        openAddNotePopup() {
            this.showAddNotePopup = true;
        },
        cancelAddNote() {
            this.showAddNotePopup = false;
            this.noteTitle = '';
            this.noteText = '';
        },

        // Close the popup
        cancelNote() {
            this.showAddNotePopup = false;
        },

        // popup methods ends
        selectTab(tabName) {
            this.selectedActionTab = "";
            this.selectedTab = tabName;
            if (tabName === 'overview') {
                this.visibleOverview = true;
                this.visibleActions = false;
            } else {
                this.visibleOverview = false;
                this.visibleActions = true;
            }

            if (tabName === 'Activity') {
                this.selectedActionTab = 'notes'
            }
            if (tabName === 'Business') {
                this.selectedActionTab = 'Lead'
            }
            if (tabName === 'Communication') {
                this.selectedActionTab = 'Whatsapp'
            }
        },

        selectActionTab(tabName) {
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

        async fetchContactData() {
            this.isLoading = true;
            if (this.id) {

                const getContactDetails = async () => {
                    console.log(this.id);
                    //   isLoading.value = true;
                    const response = await axios.get(
                        `${putUrl}contact/api/v1/getcontact/${this.id}`
                    );
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
                    console.log(response);
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

                    //   console.log(formData.additionalContactInformation);
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

                    console.log(leadinfo[0].insuranceLeadScoringTouchPointScore);

                    //   familyTreeRowId.value = familytree[0].ROWID;
                    //   contactSubDetailsRowId.value = contactSubDetails[0].ROWID;
                    //   leadInfoRowId.value = leadinfo[0].ROWID;

                    Object.assign(this.formData, contactResult[0]);
                    Object.assign(this.formData, contactSubDetails[0]);
                    Object.assign(this.formData, familytree[0]);
                    Object.assign(this.formData, leadinfo[0]);

                    this.formData.dependentParentsData = dependentParents;
                    this.formData.dependentChildrenData = dependentChildren;
                    this.formData.siblingData = siblings;
                    this.formData.festivalsData = festivalsRes;
                    this.formData.festivalsData = festivalsRes;
                    this.formData.referralScoreCardData = referralScoreboard;
                    this.formData.leadConversionHistoryData = leadConversionHistory;
                    this.formData.emergencyContactData = emergencyContactResult;

                    //   isLoading = false;
                    console.log(contactResult[0].additionalContactInformation);
                    // console.log(dependentParents);
                    // console.log(response.data.data.referralScoreboard);
                    console.log("this is latest formData ", this.formData);
                };

                getContactDetails();

                console.log("this is fetched form data", this.formData);
            }
        },

        // add notes

        async addNotes() {
            this.isLoading = true;
            try {
                const notes = {
                    fullName: this.fullName,
                    noteTitle: this.noteTitle,
                    noteText: this.noteText
                }


                const response = await axios.post(`${putUrl}canvasFunctions/createnotes`, notes)
                await this.getNotes();
                this.cancelNote();
                this.noteTitle = "";
                this.noteText = "";
                this.isLoading = false;
                return response
            } catch (error) {
                this.isLoading = false;
                console.log(error)
            }
        },
        async deleteNotes(id) {
            this.isLoading = true;
            const ROWID = id;
            console.log(ROWID)
            if (confirm("Are you sure you want to delete this note ?")) {
                try {
                    const response = await axios.delete(`${putUrl}canvasFunctions/deleteNotes`, { data: { ROWID: id } })
                    this.noteTitle = "";
                    this.noteText = "";
                    this.isLoading = false;
                    this.noteList = this.noteList.filter(note => note.id !== ROWID);

                    return response
                } catch (error) {
                    this.isLoading = false;
                    console.log(error)
                }
            } else {
                this.isLoading = false;
                return 0
            }

        },
        // get all notes
        async getNotes() {
            this.isLoading = true;
            try {
                const response = await axios.get(`${putUrl}canvasFunctions/getnotes`)
                console.log("get notes", response.data.data)
                const noteData = response.data.data.map(item => ({
                    noteTitle: item.notes.noteTitle,
                    addedBy: item.notes.addedBy,
                    id: item.notes.ROWID,
                    description: item.notes.description
                }));
                this.noteList = noteData
                this.noteTitle = "";
                this.noteText = "";
                return response
            } catch (error) {
                this.isLoading = false;
                console.log(error)
            }
        },
        async getFestivals() {
            try {
                const festivals = await axios.get(`${putUrl}contact/getallfestivals`)
                console.log(festivals)
                this.festivalsList = festivals.data.festivals.map(festival => {
                    return {
                        ROWID: festival.ROWID,
                        festivalName: festival.festivalName,
                        dateOfFestival: festival.dateOfFestival
                        // Add more properties if needed
                    };
                });

            } catch (error) {
                console.log("festivals", error)
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
        // async getFamilyTree(){
        //     try {
        //        const familyTree = await axios.get(`${putUrl}contact/getallfestivals`)
        //        console.log(familyTree)
        //        this.familyTreeList = familyTree.data.familyTree.map(familyTree => {
        //             return {
        //                 ROWID: familyTree.ROWID,
        //                 festivalName: familyTree.festivalName,
        //                 dateOfFestival: festival.dateOfFestival
        //                 // Add more properties if needed
        //             };
        //         });

        //     } catch (error) {
        //         console.log("festivals",error)
        //     }
        // },
        //     // method ens here
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        // Initially check the screen size
        this.handleResize();
        this.getNotes()
        this.fetchContactData()
        this.getFestivals()
        this.showAdvisor()
    }


}

</script>
<style scoped>
.conatct-overview .card {
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.contactView nav a {
    padding: 0px 5px !important;
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
    font-size: 1px !important;
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
    box-shadow: inset 12px 0 0px rgb(164, 164, 175) !important;
}


.Advisor-details-content {}

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
    .text-sm {
        font-size: 1rem !important;
    }

    .custom-border-body {
        border: none;
    }

    .custom-border-data {
        border-radius: 5px;
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
