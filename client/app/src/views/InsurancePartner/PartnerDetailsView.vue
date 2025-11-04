<template>
    <div class="contactView no-scroll  card me-2 mb-0 pb-0" style="border-radius: 5px; max-height: 89vh; ">

        <!-- navbar strats here -->
        <nav :class="[mobileView ? 'col px-0' : 'row px-2']" class=" col-12   pb-0 pt-3 border-bottom">
            <div class="d-flex justify-content-between align-items-center px-2">
                <div>
                    <a @click="showNav()" class="mx-2 ms-3" v-if="mobileView && !navVisible" href="javascript:;"> <i
                            class="fa fa-bars fs-5"></i></a>
                    <a @click="showNav()" class="mx-2 ms-3" v-if="mobileView && navVisible" href="javascript:;"> <i
                            class="fa fa-close fs-5"></i></a>
                </div>
                <div class=" d-lg-none d-sm-block me-3">
                    <p class="mb-2 fs-5 heading-color">{{ headerName }}</p>
                </div>
            </div>
            <!-- navbar to show in desktop -->
            <div v-if="!mobileView" class="col-12 d-flex justify-content-between ">
                <div class="col-10">
                <a :class="{ 'selected': selectedTab === 'Overview' }" @click="selectTab('Overview')"
                    class="text-md  mx-1 " href="javascript:;">Overview</a>
                <a :class="{ 'selected': selectedTab === 'Offerings' }" @click="selectTab('Offerings')"
                    class=" text-md  mx-1 " href="javascript:;">Offerings</a>
                <a :class="{ 'selected': selectedTab === 'Notes' }" @click="selectTab('Notes')"
                    class="mx-2 text-md  position-relative" href="javascript:;">Notes
                    <span
                        class="position-absolute blue-color-background dot-badge translate-middle border border-light rounded-circle text-xxs"
                        style="padding:3px"></span>
                </a>
                <a :class="{ 'selected': selectedTab === 'Attachments' }" @click="selectTab('Attachments')"
                    class=" text-md  mx-1 " href="javascript:;">Attachments</a>
                <a :class="{ 'selected': selectedTab === 'Contracted Advisors' }"
                    @click="selectTab('Contracted Advisors')" class=" text-md  mx-1 " href="javascript:;">Contracted
                    Advisors</a>
                <a data-bs-toggle="tooltip" data-bs-placement="bottom" :title=tooltip
                    :class="{ 'selected': selectedTab === nav_name }" @click="selectTab('RRSP Insurance Partner')"
                    class=" text-md  mx-2 " href="javascript:;">{{ nav_name.length > 10 ? nav_name.slice(0, 10) + '...'
                        : nav_name }}</a>
                <a :class="{ 'selected': selectedTab === 'Communication' }" @click="selectTab('Communication')"
                    class=" text-md mx-1 position-relative" href="javascript:;">Comms
                    <span
                        class="position-absolute dot-badge blue-color-background translate-middle border border-light rounded-circle text-xxs"
                        style="padding:3px"></span>
                </a>
                <a style="font-weight:700" class="fs-5 text-bold ms-1" href="#" role="button" id="dropdownMenuLink"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    ...
                </a>
                <ul class="dropdown-menu border shadow" aria-labelledby="dropdownMenuLink">
                    <li><a class="dropdown-item" href="#" @click="changeNav('Policies Issued Listing')">Policies Issued
                            Listing</a></li>
                    <li><a class="dropdown-item" href="#" @click="changeNav('RRSP Insurance Partner')">RRSp Insurance
                            Partners</a></li>
                </ul>
            
            </div>
            <div v-if="!mobileView" class="col-2 d-flex justify-content-end " style="margin-right: 20px;" >
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
          <button class="dropdown-item" type="button"  @click="handleItemClick(item)">{{capitalize(item)}}</button>
        </li>

    </ul>
</div>
            </div>
        </div>
            <!-- navbar Items to show in destop ends -->
            <!-- navbar to show in mobile -->

            <div :class="{ 'mobile-view-navbar-open': navVisible }"
                class="mobile-view-navbar left-0 top-14 position-absolute w-50 h-100 bg-white border responsive-text-size">
                <ul class="mt-3">
                    <li>
                        <a @click="selectTab('Overview')" class="text-md px-1 mx-2 col-12"
                            href="javascript:;">Overview</a>
                    </li>
                    <li>
                        <a @click="selectTab('Offerings'), toggleActivityNav()" class="mx-2 text-md px-1"
                            href="javascript:;">
                            Offerings</a>
                    </li>
                    <li>
                        <a @click="selectTab('Notes'), toggleActivityNav()" class="mx-2 text-md px-1"
                            href="javascript:;">
                            Notes</a>
                    </li>
                    <li>
                        <a @click="selectTab('Attachments'), toggleActivityNav()" class="mx-2 text-md px-1"
                            href="javascript:;">
                            Attachments</a>
                    </li>
                    <li>
                        <a @click="selectTab('Policies Issued Listing'), toggleActivityNav()" class="mx-2 text-md px-1"
                            href="javascript:;">
                            Policies Issued </a>
                    </li>
                    <li>
                        <a @click="selectTab('Contracted Advisors'), toggleActivityNav()" class="mx-2 text-md px-1"
                            href="javascript:;">
                            Contracted Advisors </a>
                    </li>
                    <li>
                        <a @click="selectTab('RRSP Insurance Partner'), toggleActivityNav()" class="mx-2 text-md px-1"
                            href="javascript:;">
                            RRSp Partners </a>
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
                                    @click="selectActionTab('SMS')" class="text-md px-2 text-sm" href="javascript:;">
                                    SMS</a></li>
                            <li><a :class="{ 'selected-mobileView-subNav': selectedActionTab === 'Email' }"
                                    @click="selectActionTab('Email')" class="text-md px-2 text-sm" href="javascript:;">
                                    Email</a>
                            </li>
                        </ul>
                        <!-- Sub-navigation ends -->
                    </li>
                </ul>
            </div>

            <!-- navbar to show in mobile ends-->
        </nav>
        <!-- navbar ends here -->
        <!-- Sub nav starts here  -->
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
                <div v-if="selectedActionTab === 'Email'" class="col-2 ">
                    <a href="javascript:;">
                        <button class="add-btn btn py-1 mb-0">
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
        <!-- Sub nav ends here  -->


        <!-- Main content container -->
        <div class="card-body custom-scroll pt-2" style="min-height:72vh">
            <!-- overview starts from here -->
            <!-- part overview 1  -->
            <div v-if="selectedTab === 'Overview'" class="mb-5 row justify-content-center conatct-overview">
                <Overview />
            </div>
                
            <div v-if="selectedTab === 'Overview'" class="d-none mb-5 row justify-content-center conatct-overview">
                <div class="card col-lg-12 col-md-12 col-sm-12 gap-5">
                    <div class="row">

                        <!-- image box -->
                        <div class=" d-flex pt-1 col-lg-6 col-md-6 col-sm-12">
                            <div class="overview-img text-center "> <span class="overview-img-text pt-2">
                                    {{ (this.formData.partnerdetails.partnerName != (null || undefined)) ?
                                        this.formData.partnerdetails.partnerName.slice(0, 1) :'' }}</span>
                            </div>
                            <div class=" mt-4 ">

                                <p class="mb-0 heading-color overview-heading text-bold">{{
                                    this.formData.partnerdetails.partnerName }}</p>
                                <p :class="mobileView ? 'text-sm' : 'text-lg'">Insurance Partner</p>
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
                                        <p class="text-xs text-muted">{{ this.formData.partnerdetails.email }}</p>
                                    </div>

                                </section>
                            </div>
                            <div class="text-start heading-color">
                                <section class="d-flex">
                                    <div class="pt-1 px-3"><i class="fa fa-phone text-color"></i> </div>
                                    <div>
                                        <p class=" mb-0 text-sm text-bold">Phone</p>
                                        <p class="text-xs text-muted">{{ this.formData.partnerdetails.phone }}</p>
                                    </div>

                                </section>
                            </div>
                            <div class="text-start heading-color">
                                <section class="d-flex">
                                    <div class="pt-1 px-3"><i class="fa fa-mobile text-color"></i> </div>
                                    <div>
                                        <p class=" mb-0 text-sm text-bold">Mobile </p>
                                        <p class="text-xs text-muted">{{ this.formData.partnerdetails.phone }}</p>
                                    </div>

                                </section>
                            </div>
                            <div class="text-start heading-color">
                                <section class="d-flex">
                                    <div class="pt-1 px-3"><i class="fa fa-street-view text-color"></i> </div>
                                    <div>
                                        <p class=" mb-0 text-sm text-bold">Location</p>
                                        <p class="text-xs text-muted">{{ this.formData.partnerdetails.city + ','
                                            + this.formData.partnerdetails.state }}</p>
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
                                <div class="pt-1 px-3 h-100"><i class="fa fa-skype text-color"></i> </div>
                                <div>
                                    <p class=" mb-0 text-sm text-bold">Skype</p>
                                    <p class="text-xs text-muted"></p>
                                </div>
                            </section>
                            <section class="d-flex">
                                <div class="pt-1 px-3"><i class="fa fa-birthday-cake text-color"></i> </div>
                                <div>
                                    <p class=" mb-0 text-sm text-bold">Birthday</p>
                                    <p class="text-xs text-muted"></p>
                                </div>
                            </section>
                            <section class="d-flex">
                                <div class="pt-1 px-3"><i class="fa fa-calendar text-color"></i> </div>
                                <div>
                                    <p class=" mb-0 text-sm text-bold">Work anniversary</p>
                                    <p class="text-xs text-muted"></p>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12 pe-0  remove-padding-in-mobile">
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
            <!-- overview ends from here -->
            <!-- Attachments start here -->
            <!-- Attachment Information -->
            <div v-if="selectedTab === 'Attachments' && !mobileView">
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
                        <button class="btn custom-btn px-2 py-1">Attach</button>
                    </div>
                </div>
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
            <div v-if="selectedTab === 'Attachments' && mobileView">

                <div class="custom-border-body row border">
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

            <!-- Offerings starts here -->
            <div v-if="selectedTab === 'Offerings'" class="heading-color">
                <div class="custom-border-body row border ">
                    <section class="d-flex align-items-center justify-content-between mx-1">
                        <p class=" Details-heading-size mb-0 fs-5 orange-color"> Offering Information</p>
                    </section>
                    <div class="custom-border-body row py-1 m-1">
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Owner: </span>
                            <span class="text-sm">Peter Antony</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Name: </span>
                            <span class="text-sm">Shashnak</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">catagory: </span>
                            <span class="text-sm">scbhjbjh</span>
                        </div>
                    </div>
                    <div class="custom-border-body row py-1 m-1">
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Type :</span>
                            <span class="text-sm"> c jcc</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Description : </span>
                            <span class="text-sm">Some description here</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Policies Issued %: </span>
                            <span class="text-sm">26%</span>
                        </div>
                    </div>
                    <div class="custom-border-body row py-1 m-1">
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Advisor % : </span>
                            <span class="text-sm">02%</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Offering Active : </span>
                            <span class="text-sm">Yes</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Insurance Partner Name : </span>
                            <span class="text-sm">Somya Bhardwaj</span>
                        </div>
                    </div>
                </div>

            </div>
            <!-- Offerings ends here -->

            <!-- RRSP Insurance Partner starts here -->
            <div v-if="selectedTab === 'RRSP Insurance Partner'" class="heading-color">
                <div class="custom-border-body row border">
                    <section class="d-flex align-items-center justify-content-between mx-1">
                        <p class=" Details-heading-size mb-0 fs-5 green-color"> Insurance Partner Information</p>

                    </section>
                    <div class="custom-border-body row py-1 m-1">
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Name: </span>
                            <span class="text-sm">Peter Antony</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Partner: </span>
                            <span class="text-sm">Shashnak</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">catagory: </span>
                            <span class="text-sm">scbhjbjh</span>
                        </div>
                    </div>
                    <div class="custom-border-body row py-1 m-1">
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Type :</span>
                            <span class="text-sm"> c jcc</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Description : </span>
                            <span class="text-sm">Some description here</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Policies Issued %: </span>
                            <span class="text-sm">26%</span>
                        </div>
                    </div>
                    <div class="custom-border-body row py-1 m-1">
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Advisor % : </span>
                            <span class="text-sm">02%</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Offering Active : </span>
                            <span class="text-sm">Yes</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Offering Partner Name : </span>
                            <span class="text-sm">Somya Bhardwaj</span>
                        </div>
                    </div>
                </div>

            </div>
            <!-- RRSP Insurance Partner ends here -->

            <!-- Policies Issued Listing starts here -->
            <div v-if="selectedTab === 'Policies Issued Listing'" class="heading-color">
                <div class="custom-border-body row border">
                    <section class="d-flex align-items-center justify-content-between mx-1">
                        <p class="Details-heading-size mb-0 fs-5 green-color">Insurance Partner</p>
                    </section>
                    <div class="custom-border-body row py-1 m-1">
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Name: </span>
                            <span class="text-sm">{{ this.formData.policyDetails.firstName + ' ' +
                                this.formData.policyDetails.lastName }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Email: </span>
                            <span class="text-sm">{{ this.formData.policyDetails.email }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Mobile: </span>
                            <span class="text-sm">{{ this.formData.policyDetails.mobile }}</span>
                        </div>
                    </div>
                    <div class="custom-border-body row py-1 m-1">
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Date Of Birth :</span>
                            <span class="text-sm">{{ this.formData.policyDetails.dateOfBirth }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Lead Source : </span>
                            <span class="text-sm">{{ this.formData.policyDetails.leadSource }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">LLQP Licensed: </span>
                            <span class="text-sm">{{ this.formData.policyDetails.llqpLicensed }}</span>
                        </div>
                    </div>
                    <div class="custom-border-body row py-1 m-1">
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Module : </span>
                            <span class="text-sm">{{ this.formData.policyDetails.advisorMuduleName }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">License Expiry Date : </span>
                            <span class="text-sm">{{ this.formData.policyDetails.licenceExpiryDate }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">E&O Policy Number : </span>
                            <span class="text-sm">{{ this.formData.policyDetails.eoPolicyNumber }}</span>
                        </div>
                    </div>
                    <div class="custom-border-body row py-1 m-1">
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">E&O Policy Expiry Date : </span>
                            <span class="text-sm">{{ this.formData.policyDetails.eoPolicyExpiryDate }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">CIPR Number : </span>
                            <span class="text-sm">{{ this.formData.policyDetails.ciprNumber }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Course Registration Date : </span>
                            <span class="text-sm">{{ this.formData.policyDetails.courseRegistrationDate }}</span>
                        </div>
                    </div>
                    <div class="custom-border-body row py-1 m-1">
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Hire Team Name : </span>
                            <span class="text-sm">{{ this.formData.policyDetails.hireTeamName }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Exchange Rate : </span>
                            <span class="text-sm">{{ this.formData.policyDetails.exchangeRate }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Hire Level : </span>
                            <span class="text-sm">{{ this.formData.policyDetails.hireLevel }}</span>
                        </div>
                    </div>
                    <div class="custom-border-body row py-1 m-1">
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Date Of Hire : </span>
                            <span class="text-sm">{{ this.formData.policyDetails.dateOfHire }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Advisor Owner : </span>
                            <span class="text-sm">{{ this.formData.policyDetails.advisorOwner }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Insurance Advisor: </span>
                            <span class="text-sm">{{ this.formData.policyDetails.insuranceAdvisor }}</span>
                        </div>
                    </div>
                    <div class="custom-border-body row py-1 m-1">
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">App ID : </span>
                            <span class="text-sm">{{ this.formData.policyDetails.appID }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Cessation Date : </span>
                            <span class="text-sm">{{ this.formData.policyDetails.cessationDate }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Licensed As Annsurance Advisor: </span>
                            <span class="text-sm">{{ this.formData.policyDetails.areyouLicensedAsAnnsuranceAdvisor
                                }}</span>
                        </div>
                    </div>
                    <div class="custom-border-body row py-1 m-1">
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Status : </span>
                            <span class="text-sm">{{ this.formData.policyDetails.status }}</span>
                        </div>
                        <!-- <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span class="text-sm text-bold heading-color">Cessation Date : </span>
            <span class="text-sm">{{ this.formData.policyDetails.cessationDate }}</span>
        </div> -->
                        <!-- <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span class="text-sm text-bold heading-color">Licensed As Annsurance Advisor: </span>
            <span class="text-sm">{{ this.formData.policyDetails.areyouLicensedAsAnnsuranceAdvisor }}</span>
        </div> -->
                    </div>
                </div>


            </div>
            <!-- Policies Issued Listing ends here -->

            <!-- contracted Advisor -->
            <div v-if="selectedTab === 'Contracted Advisors'">
                <div class="custom-border-body row border">
                    <section class="d-flex align-items-center justify-content-between mx-1">
                        <p class=" Details-heading-size mb-0 fs-5 green-color">Contracted Advisor</p>

                    </section>
                    <div class="custom-border-body row py-1 m-1">
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Name: </span>
                            <span class="text-sm">{{ this.formData.advisorDetails.firstName + ' ' +
                                this.formData.advisorDetails.lastName }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Email: </span>
                            <span class="text-sm">{{ this.formData.advisorDetails.email }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Mobile: </span>
                            <span class="text-sm">{{ this.formData.advisorDetails.mobile }}</span>
                        </div>
                    </div>
                    <div class="custom-border-body row py-1 m-1">
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Date Of Birth :</span>
                            <span class="text-sm">{{ this.formData.advisorDetails.dateOfBirth }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Lead Source : </span>
                            <span class="text-sm">{{ this.formData.advisorDetails.leadSource }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">LLQP Licensed: </span>
                            <span class="text-sm">{{ this.formData.advisorDetails.llqpLicensed }}</span>
                        </div>
                    </div>
                    <div class="custom-border-body row py-1 m-1">
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Module : </span>
                            <span class="text-sm">{{ this.formData.advisorDetails.advisorMuduleName }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">License Expiry Date : </span>
                            <span class="text-sm">{{ this.formData.advisorDetails.licenceExpiryDate }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">E&O Policy Number : </span>
                            <span class="text-sm">{{ this.formData.advisorDetails.eoPolicyNumber }}</span>
                        </div>
                    </div>
                    <div class="custom-border-body row py-1 m-1">
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Module : </span>
                            <span class="text-sm">{{ this.formData.advisorDetails.advisorMuduleName }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">License Expiry Date : </span>
                            <span class="text-sm">{{ this.formData.advisorDetails.licenceExpiryDate }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">E&O Policy Number : </span>
                            <span class="text-sm">{{ this.formData.advisorDetails.eoPolicyNumber }}</span>
                        </div>
                    </div>
                    <div class="custom-border-body row py-1 m-1">
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">E&O Policy Expiry Date : </span>
                            <span class="text-sm">{{ this.formData.advisorDetails.eoPolicyExpiryDate }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">CIPR Number : </span>
                            <span class="text-sm">{{ this.formData.advisorDetails.ciprNumber }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Course Registration Date : </span>
                            <span class="text-sm">{{ this.formData.advisorDetails.courseRegistrationDate }}</span>
                        </div>
                    </div>
                    <div class="custom-border-body row py-1 m-1">
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Hire Team Name : </span>
                            <span class="text-sm">{{ this.formData.advisorDetails.hireTeamName }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Exchange Rate : </span>
                            <span class="text-sm">{{ this.formData.advisorDetails.exchangeRate }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Hire Level : </span>
                            <span class="text-sm">{{ this.formData.advisorDetails.hireLevel }}</span>
                        </div>
                    </div>
                    <div class="custom-border-body row py-1 m-1">
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Date Of Hire : </span>
                            <span class="text-sm">{{ this.formData.advisorDetails.dateOfHire }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Advisor Owner : </span>
                            <span class="text-sm">{{ this.formData.advisorDetails.advisorOwner }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Insurance Advisor: </span>
                            <span class="text-sm">{{ this.formData.advisorDetails.insuranceAdvisor }}</span>
                        </div>

                    </div>

                    <div class="custom-border-body row py-1 m-1">
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">App ID : </span>
                            <span class="text-sm">{{ this.formData.advisorDetails.appID }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Cessation Date : </span>
                            <span class="text-sm">{{ this.formData.advisorDetails.cessationDate }}</span>
                        </div>
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Licensed As Annsurance Advisor: </span>
                            <span class="text-sm">{{
                                this.formData.advisorDetails.areyouLicensedAsAnnsuranceAdvisor}}</span>
                        </div>

                    </div>
                    <div class="custom-border-body row py-1 m-1">
                        <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Status : </span>
                            <span class="text-sm">{{ this.formData.advisorDetails.status }}</span>
                        </div>
                        <!-- <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Cessation Date : </span>
                            <span class="text-sm">{{ this.formData.advisorDetails.cessationDate}}</span>
                        </div> -->
                        <!-- <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data"><span
                                class="text-sm text-bold heading-color">Licensed As Annsurance Advisor: </span>
                            <span class="text-sm">{{ this.formData.advisorDetails.areyouLicensedAsAnnsuranceAdvisor}}</span>
                        </div> -->

                    </div>
                </div>
            </div>
            <!-- contracted Advisor ends -->

            <!-- User in right starts-->
            <div class="User-Offerings-section border">
                <div>
                    <i @mouseover="handleMouseOver" @mouseleave="handleMouseLeave"
                        :class="['fa', isUserVisible ? 'fa-chevron-right' : 'fa-chevron-left ']" @click="showUser()"
                        :style="{ cursor: 'pointer', zIndex: 6 }">
                    </i>

                    <div class="User-Offerings-content pt-2">
                        <!-- User Offerings -->
                        <div>
                            <div class="User-headings mx-3">
                                <p class="text-bold">User</p>
                            </div>
                            <div class="User-cards heading-color mx-3 my-2 px-2 py-2">
                                <p class="mb-0 text-sm text-bold">Peter Anthony</p>
                                <p class="mb-0 text-xs"><span class="text-bold">Email:</span>Peterxyz@trigybcajbckcaska
                                </p>
                                <p class="mb-0 text-xs"><span class="text-bold">Phone:</span> 7868768688</p>
                            </div>
                        </div>
                        <!-- User Offerings ends -->
                        <hr>
                        <!-- refferals Offerings  -->

                        <div class="User-headings d-flex justify-content-between mx-3 cursor-pointer"
                            @click="toggleInfo('showInfo3')">
                            <div>
                                <p class="text-bold">Refferals</p>
                            </div>
                            <i :class="['fa', !showInfo3 ? 'fa-chevron-down' : 'fa-chevron-up', 'me-2', 'mt-2 ']"
                                @click="toggleInfo('showInfo3')" style="cursor:pointer"></i>
                        </div>
                        <div class="refferal-cards">

                            <div v-show="showInfo3" v-for="item in refferalList" :key="item.email"
                                class="User-cards heading-color mx-3 my-2 px-2 py-2">
                                <p class="mb-0 text-sm text-bold">{{ item.name }}</p>
                                <p class="mb-0 text-xs"><span class="text-bold">Email:</span>{{ item.email }}</p>
                                <p class="mb-0 text-xs"><span class="text-bold">Phone:</span>{{ item.phone }}</p>
                            </div>
                        </div>

                        <!-- refferals Offerings ends -->
                        <hr>
                        <!-- policies Offerings  -->

                        <div class="User-headings d-flex justify-content-between mx-3 cursor-pointer"
                            @click="toggleInfo('showInfo4')">
                            <div>
                                <p class="text-bold">Policies</p>
                            </div>
                            <i :class="['fa', !showInfo4 ? 'fa-chevron-down' : 'fa-chevron-up', 'me-2', 'mt-2 ']"
                                @click="toggleInfo('showInfo4')"></i>

                        </div>
                        <div class="refferal-cards">

                            <div v-show="showInfo4" v-for="item in refferalList" :key="item.email"
                                class="User-cards heading-color mx-3 my-2 px-2 py-2">
                                <p class="mb-0 text-sm text-bold">{{ item.name }}</p>
                                <p class="mb-0 text-xs"><span class="text-bold">Email:</span>{{ item.email }}</p>
                                <p class="mb-0 text-xs"><span class="text-bold">Phone:</span>{{ item.phone }}</p>
                            </div>
                        </div>

                        <!-- Policies Offerings ends -->
                    </div>
                </div>
            </div>
            <!-- User in right ends-->

            <!-- Policies Issues Stars here -->
            <!-- policy starts here -->
            <div class="p-2 " v-if="selectedTab === 'Policies Issued' && !mobileView">
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
            <div v-if="selectedTab === 'Policies Issued' && mobileView" class=" p-2 border my-2 ">

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
            <!-- Policies Issues Ends here -->


            <!-- communication starts here -->
            <!-- <div v-if="selectedActionTab === 'Whatsapp'" class="null-data-image-div ">                     
                <img src="/images/whatsapp-with-too-many-happy-people.png">              
           </div> -->
            <div v-if="selectedActionTab === 'Whatsapp'" class="null-data-image-div " style="min-height:62vh">
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
            <!-- communication ends here -->
            <!-- notes starts from here -->
            <div v-if="selectedTab === 'Notes'">
                <Notes :id="this.id" />
            </div>
            <!-- notes ends from here -->
        </div>
        <!-- Main content container ends here -->
    </div>
</template>

<script>

import Notes from "../utils/Notes.vue"
import Whatsapp from "../utils/Whatsapp.vue"
import SMS from "../utils/SMS.vue";
import Email from "../utils/Email.vue"
import { ref } from "vue";
import axios from "axios";
import { putUrl } from "../../boot/axios";
import Overview from "./InsuranceForm.vue"
// import mounted, beforeUnmount from vue

export default {
    components: {
        Whatsapp,
        SMS,
        Email,
        Notes,
        Overview
    },
    props: ["id"],
    data() {
        let isLoading = ref(false);

        return {
            formData: {
                partnerdetails: [],
                advisorDetails: [],
                policyDetails: []
            },
            headerName: '',
            tooltip: ref("RRSP Insurance Partners"),
            nav_name: 'RRSP Insurance Partners',
            navVisible: false,
            mobileView: window.innerWidth <= 900,
            showicons: false,
            isLoading,
            selectedTab: 'Overview',
            selectedActionTab: '',
            visibleOverview: true,
            visibleActions: false,
            isUserVisible: true,
            showInfo1: true,
            showInfo2: true,
            showInfo3: true,
            showInfo4: false,
            refferalList: [{ name: "Somya", email: "somya@xyz.com", phone: "675756" },
            { name: "Somya", email: "somya@xyz.com", phone: "675756" },
            { name: "Somya", email: "somya@xyz.com", phone: "675756" }],
            items: [
        'phone burner'
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
        },

        // popup methods ends
        selectTab(tabName) {
            this.headerName = tabName;
            this.selectedActionTab = "";
            this.selectedTab = tabName;
            if (tabName === 'Overview') {
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
            this.headerName = tabName;
            this.selectedActionTab = tabName;
            if (tabName === 'Overview') {
                this.visibleOverview = true;
                this.visibleActions = false;
            } else {
                this.visibleOverview = false;
                this.visibleActions = true;
            }
        },

        // JavaScript
        handleMouseOver() {
            if (!this.isUserVisible) {
                const item = document.querySelector('.User-Offerings-section');
                item.style.minHeight = '87vh';
            }
        },

        handleMouseLeave() {
            if (!this.isUserVisible) {
                const item = document.querySelector('.User-Offerings-section');
                item.style.minHeight = '2rem';
            }
        },

        showUser() {
            window.addEventListener('resize', this.handleResize);

            if (this.navVisible) {
                this.navVisible = !this.navVisible
            }

            this.isUserVisible = !this.isUserVisible;
            const item = document.querySelector('.User-Offerings-section');
            if (this.mobileView) {
                item.style.width = this.isUserVisible ? '80%' : '1rem';
                console.log("Mobilevie true")
            } else {
                item.style.width = this.isUserVisible ? '30%' : '1rem';
                console.log("Mobilevie false")
            }

            item.style.height = this.isUserVisible ? '' : '2rem';
            item.style.minHeight = this.isUserVisible ? '' : '2rem';

            item.style.backgroundColor = this.isUserVisible ? "#fff" : "rgb(241, 241, 241) ";
            const content = document.querySelector('.User-Offerings-content');
            content.style.display = this.isUserVisible ? 'block' : 'none';
        },
        async fetchSinglePartner() {
            if (this.id) {
                try {
                    const response = await axios.get(`${putUrl}insurancePartner/api/v1/getAllPartners/${this.id}`);
                    console.log({ response });

                    const partnerdetails = response.data.data.data.map(
                        (item) => item.insurencePartner
                    );
                    const advisorDetails = response.data.data.advisor.map(
                        (item) => item.advisors
                    );

                    const policyDetails = response.data.data.policy.map(
                        (item) => item.advisors
                    );

                    this.formData.partnerdetails = partnerdetails[0]
                    this.formData.advisorDetails = advisorDetails[0]
                    this.formData.policyDetails = policyDetails[0]
                    console.log("this.formData.policyDetails", this.formData.policyDetails);
                } catch (error) {
                    console.error("Error fetching partner:", error);
                }
            }
        },
        capitalize(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    handleItemClick(item) {
      console.log('Item clicked:', item);
      // You can perform any specific action here based on the clicked item
      // For example, navigating to another page or calling an API
      alert(`You selected: ${item}`);
    },



    },
    beforeMount() {
        this.fetchSinglePartner()
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        // Initially check the screen size
        this.handleResize();
        this.showUser()

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

.User-Offerings-section {
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


.User-Offerings-content {}

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
th{
  font-size: 15px !important;
}
td span{
  font-size: 15px !important;
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
    background-color: #68b3f8;
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

.Offerings-value {
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

    .Offerings-heading-size {
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
        background-color: #68b3f8;
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