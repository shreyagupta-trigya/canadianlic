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
                           <router-link to="/locationlist">
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
            <div v-if="!mobileView" class="col-12 d-flex justify-content-between ">
                <div class="col-9">
                    <a :class="{ 'selected': selectedTab === 'overview' }" @click="selectTab('overview')"
                    class="text-md  mx-1 " href="javascript:;">Overview</a>
                <a :class="{ 'selected': selectedTab === 'Offerings' }" @click="selectTab('Offerings')"
                    class=" text-md  mx-1 " href="javascript:;">Offerings</a>
                <a :class="{ 'selected': selectedTab === 'Notes' }" @click="selectTab('Notes')"
                    class="mx-2 text-md  position-relative" href="javascript:;">Notes
                    <span
                        class="position-absolute blue-color-background dot-badge translate-middle border border-light rounded-circle text-xxs"
                        style="padding:3px">
                    </span>
                </a>
                <a :class="{ 'selected': selectedTab === 'Attachments' }" @click="selectTab('Attachments')"
                    class=" text-md  mx-1 " href="javascript:;">Attachments</a>
                <a :class="{ 'selected': selectedTab === 'Policy' }" @click="selectTab('Policy')"
                    class=" text-md  mx-1 " href="javascript:;">Policy</a>
                <a :class="{ 'selected': selectedTab === 'Contacts' }" @click="selectTab('Contacts')"
                    class=" text-md  mx-1 " href="javascript:;">Contacts</a>
                <a data-bs-toggle="tooltip" data-bs-placement="bottom" :title=tooltip
                    :class="{ 'selected': selectedTab === nav_name }" @click="selectTab('Member Locations')"
                    class=" text-md  mx-2 " href="javascript:;">{{ nav_name.length > 10 ? nav_name.slice(0, 10) + '...'
                        : nav_name }}</a>
                <a :class="{ 'selected': selectedTab === 'Communication' }" @click="selectTab('Communication')"
                    class=" text-md mx-1 position-relative" href="javascript:;">Comms
                    <span
                        class="position-absolute dot-badge blue-color-background translate-middle border border-light rounded-circle text-xxs"
                        style="padding:3px"></span>
                </a>
                <a style="font-weight:700" class="responsive-text-size text-bold ms-1" href="#" role="button"
                    id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    ...
                </a>
                <ul class="dropdown-menu border shadow" aria-labelledby="dropdownMenuLink">
                    <li>
                        <a class="dropdown-item" href="#" @click="changeNav('Member Locations')">Member Locations</a>
                    </li>
                    <li><a class="dropdown-item" href="#" @click="changeNav('Leads Listed')">Leads Listed</a></li>
                    <li><a class="dropdown-item" href="#" @click="changeNav('Advisor Leads')">Advisor Leads</a></li>
                    <li><a class="dropdown-item" href="#" @click="changeNav('Investment Location')">Investment Location</a></li>
                </ul>
            </div>
            <div v-if="!mobileView" class="col-3 d-flex justify-content-end " style="margin-right: 20px;" >
                <div style="position:relative;">
               
                <button type="button" class="btn  dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
    Quick Actions
  </button>
  
<ul class="dropdown-menu dropdown-menu-start dropdown-menu-lg-start" style="border: 1px solid; max-height: 250px; position: absolute; top: 19px; left: -120px; width: 200px; overflow: hidden;">

<!-- Search Bar (Fixed on Top) -->
<div class="search-container-div" style="padding: 10px;">
  <div class="search-container">
    <input class="search-input" type="search" v-model="searchQuery" placeholder="Search" aria-label="Search" style="width:80%; padding: 5px;">
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
            <div :class="{ 'mobile-view-navbar-open': navVisible }"
                class="mobile-view-navbar left-0 top-14 position-absolute h-100 bg-white border responsive-text-size">
                <ul class="mt-3">
                    <li>
                        <a @click="selectTab('overview')" class="text-md px-1 mx-2 col-12"
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
                        <a @click="selectTab('Policy'), toggleActivityNav()" class="mx-2 text-md px-1"
                            href="javascript:;">Policy</a>
                    </li>
                    <li>
                        <a @click="selectTab('Contacts'), toggleActivityNav()" class="mx-2 text-md px-1"
                            href="javascript:;">
                            Contacts</a>
                    </li>
                    <li>
                        <a @click="selectTab('Member Locations'), toggleActivityNav()" class="mx-2 text-md px-1"
                            href="javascript:;">Member Locations</a>
                    </li>
                    <li>
                        <a @click="selectTab('Leads Listed'), toggleActivityNav()" class="mx-2 text-md px-1"
                            href="javascript:;">Leads Listed</a>
                    </li>
                    <li>
                        <a @click="selectTab('Advisor Leads'), toggleActivityNav()" class="mx-2 text-md px-1"
                            href="javascript:;">Advisor Leads</a>
                    </li>
                    <li>
                        <a @click="selectTab('Investment Location'), toggleActivityNav()" class="mx-2 text-md px-1"
                            href="javascript:;">Investment Location</a>
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
                <div style="margin-top:170px; margin-left:31px;">
                <div style="position:relative;">
               
               <button type="button" class="btn  dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false" style="border:1px solid">
                  Quick Actions
              </button>
              
           
               
<ul class="dropdown-menu dropdown-menu-start dropdown-menu-lg-start" style="border: 1px solid; max-height: 250px; position: absolute; top: -207px; left: 145px; width: 200px; overflow: hidden;">

<!-- Search Bar (Fixed on Top) -->
<div class="search-container-div" style="padding: 10px;">
  <div class="search-container">
    <input class="search-input" type="search" v-model="searchQuery" placeholder="Search" aria-label="Search" style="width: 100%; padding: 5px;">
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
            <div v-if="selectedTab === 'overview'" class="mb-5 row justify-content-center conatct-overview">
             <Overview />
            </div>
            <!-- part overview 1  -->
            <div v-if="selectedTab === 'overview'" class="d-none mb-5 row justify-content-center conatct-overview">
                <div class="card col-lg-12 col-md-12 col-sm-12 gap-5">
                    <div class="row">
                        <!-- image box -->
                        <div class=" d-flex pt-1 col-lg-6 col-md-6 col-sm-12">
                            <div class="overview-img text-center "> <span class="overview-img-text pt-2">{{
                                (this.formData.firstName
                                    != (null || undefined)) ? this.formData.firstName.slice(0, 1).toUpperCase() +
                                this.formData.lastName.slice(0, 1).toUpperCase() : '' }}</span></div>
                            <div class=" mt-4 ">

                                <p class="mb-0 heading-color overview-heading text-bold">
                                    {{ this.formData.firstName + ' ' + this.formData.lastName }}</p>
                                <p :class="mobileView ? 'text-sm' : 'text-lg'">Location Partner</p>
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
                                        <p class="text-xs text-muted">{{ formData.phone }}</p>
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
                                        <p class="text-xs text-muted">{{ (formData.city != (null || undefined) ?
                                            formData.city : ' ') + ' ' + (formData.state != (null || undefined)
                                                ? formData.state : ' ') }}</p>
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
                                    <p class="text-xs text-muted"></p>
                                </div>
                            </section>
                            <section class="d-flex">
                                <div class="pt-1 px-3"><i class="fa fa-birthday-cake text-color"></i> </div>
                                <div>
                                    <p class=" mb-0 text-sm text-bold">Email</p>
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
                        <i class="d-none d-sm- block fa fa-plus-square fs-4 cursor-pointer mb-2 mx-2 blue-color" title="Add Note"></i>
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
                    <div class="">
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
                <div class="custom-border-body row border">
                    <section class="d-flex align-items-center justify-content-between mx-1">
                        <p class=" Details-heading-size mb-0 responsive-text-size orange-color"> Offering Information
                        </p>
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
            <!-- Policy starts here -->
            <div v-if="selectedTab === 'Policy'" class="heading-color">
                <div class=" row border">
                    <section class="d-flex align-items-center justify-content-between mx-1">
                        <p class=" Details-heading-size mb-0 fs-5 yellow-color"> Policy Information</p>
                    </section>
                    <div v-for="item in formData.policies" :key="item.ROWID" class="row py-1 m-1">
                        <div class="card-body border">
                            <div class="row">
                                <div class="container">
                                    <div class="row">
                                        <div class="col">
                                            <table class="table table-striped table-hover">
                                                <tbody>
                                                    <tr>
                                                        <th class="orange-color text-lg text-bold">Policy Name</th>
                                                        <td class="orange-color text-lg">{{ item.policyName }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Bonus Fyc</th>
                                                        <td>{{ item.aBonusFyc }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Address</th>
                                                        <td>{{ item.address }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Advisor Bonus Level</th>
                                                        <td>{{ item.advisorBonusLevel }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Advisor Name</th>
                                                        <td>{{ item.advisorName }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Application On</th>
                                                        <td>{{ item.applicationOn }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Are There Multiple Insured</th>
                                                        <td>{{ item.areThereMultipleInsured }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Attachment Link</th>
                                                        <td>{{ item.attachmentLink }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Bonus</th>
                                                        <td>{{ item.bonus }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Bonus Level</th>
                                                        <td>{{ item.bonusLevel }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Campaign Source</th>
                                                        <td>{{ item.campaignSource }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Cegs</th>
                                                        <td>{{ item.cegs }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Client</th>
                                                        <td>{{ item.client }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Client Beneficiary</th>
                                                        <td>{{ item.clientBeneficiary }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Comments On Rating</th>
                                                        <td>{{ item.commentsOnRating }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Commission Received</th>
                                                        <td>{{ item.commissionReceived }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Conduct Compliance</th>
                                                        <td>{{ item.conductCompliance }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Contact ID</th>
                                                        <td>{{ item.contactID }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Contract Name</th>
                                                        <td>{{ item.contractName }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Coverage Amount</th>
                                                        <td>{{ item.coverageAmount }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Deal</th>
                                                        <td>{{ item.deal }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Discount Factor</th>
                                                        <td>{{ item.discountFactor }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Dissolution Date</th>
                                                        <td>{{ item.dissolutionDate }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Documents Received</th>
                                                        <td>{{ item.documentsReceived }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Email</th>
                                                        <td>{{ item.email }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>First Policy</th>
                                                        <td>{{ item.firstPolicy }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Frequency</th>
                                                        <td>{{ item.frequency }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Fyc</th>
                                                        <td>{{ item.fyc }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Initial Contribution</th>
                                                        <td>{{ item.initialContribution }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Initial Deposit</th>
                                                        <td>{{ item.initialDeposit }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Is Client A Beneficiary</th>
                                                        <td>{{ item.isClientABeneficiary }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Is Client The Insured</th>
                                                        <td>{{ item.isClientTheInsured }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Issued By</th>
                                                        <td>{{ item.issuedBy }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Layout</th>
                                                        <td>{{ item.layout }}</td>
                                                    </tr>                                                   
                                                    <tr>
                                                        <th>Ma Contribution</th>
                                                        <td>{{ item.maContribution }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Mobile</th>
                                                        <td>{{ item.mobile }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Module</th>
                                                        <td>{{ item.module }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>No Trustees</th>
                                                        <td>{{ item.noTrustees }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Note</th>
                                                        <td>{{ item.note }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Number Of Insured</th>
                                                        <td>{{ item.numberOfInsured }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Number Of Trustee</th>
                                                        <td>{{ item.numberOfTrustee }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Number Of Beneficiaries</th>
                                                        <td>{{ item.numberofBeneficiaries }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Offering Name</th>
                                                        <td>{{ item.offeringName }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Owner</th>
                                                        <td>{{ item.owner }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Pb Compliance</th>
                                                        <td>{{ item.pbCompliance }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Phone Updated</th>
                                                        <td>{{ item.phoneUpdated }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Policy Advisor</th>
                                                        <td>{{ item.policyAdvisor }}</td>
                                                    </tr>

                                                    <tr>
                                                        <th>Policy Number</th>
                                                        <td>{{ item.policyNumber }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Policy Premium</th>
                                                        <td>{{ item.policyPremium }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Policy Type</th>
                                                        <td>{{ item.policyType }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Registered</th>
                                                        <td>{{ item.registered }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Status</th>
                                                        <td>{{ item.status }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Total Contribution</th>
                                                        <td>{{ item.totalContribution }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Trustees Policy</th>
                                                        <td>{{ item.trusteesPolicy }}</td>
                                                    </tr>


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Policy ends here -->
            <!-- Contacts starts here -->
            <div v-if="selectedTab === 'Contacts'" class="heading-color">
                <div class="  py-2 border row my-2 ">
                    <section class="cursor-pointer heder-bg d-flex align-items-center justify-content-between mx-1"
                        @click="toggleInfo('showInfo3')">
                        <p class=" familytree-heading-size mb-0 fs-5 yellow-color">Contacts</p>
                        <i class="fa fa-chevron-down  familytree-heading-size yellow-color fs-5"
                            :class="{ 'fa-chevron-up': showInfo3, 'fa-chevron-down': !showInfo3 }"
                            style="cursor:pointer"></i>
                    </section>
                    <div v-show="showInfo3" class=" row py-1 m-1" v-for="item in formData.contacts" :key="item.ROWID">
                        <div class="card-body border">
                            <div class="row">
                                <div class="container">
                                    <div class="row">
                                        <div class="col">
                                            <table class="table table-striped table-hover">
                                                <tbody>
                                                    <tr>
                                                        <th class="orange-color text-lg text-bold">Name</th>
                                                        <td class="orange-color text-lg">{{ item.firstName + ' ' +
                                                            item.lastName }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Relationship</th>
                                                        <td>{{ item.relationship }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Email</th>
                                                        <td>{{ item.email }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Phone</th>
                                                        <td>{{ item.phone }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Date of Birth</th>
                                                        <td>{{ item.dob }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Mobile</th>
                                                        <td>{{ item.mobile }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Additional Contact Information</th>
                                                        <td>{{ item.additionalContactInformation }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Advisor Module Name</th>
                                                        <td>{{ item.advisorModuleName }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Client Address</th>
                                                        <td>{{ item.clientAddress }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Clients 1st Policy Issued On</th>
                                                        <td>{{ item.clients1stPolicyIssuedOn }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>CLV Advisor Commission</th>
                                                        <td>{{ item.clvAdvisorCommission }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>CLV Corporate Commission</th>
                                                        <td>{{ item.clvCorporateCommission }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Currency</th>
                                                        <td>{{ item.currency }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Deal Stage Tracking</th>
                                                        <td>{{ item.dealStageTracking }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Do You Have a Corporation</th>
                                                        <td>{{ item.doYouHaveACorporation }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Does Your Corporation Have a Group Policy</th>
                                                        <td>{{ item.doesYourCorporationHaveAGroupPolicy }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Eligible Round Robin Owner Found</th>
                                                        <td>{{ item.eligibleRoundRobinOwnerFound }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Email Is Valid</th>
                                                        <td>{{ item.emailIsValid }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Email Opt Out</th>
                                                        <td>{{ item.emailOptOut }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Email Round Robin Owner</th>
                                                        <td>{{ item.emailRoundRobinOwner }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Exchange Rate</th>
                                                        <td>{{ item.exchangeRate }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Gender</th>
                                                        <td>{{ item.gender }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Insurance Leads Source</th>
                                                        <td>{{ item.insuranceLeadsSource }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Last CLV Advisor</th>
                                                        <td>{{ item.lastCLVAdvisor }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Last CLV Corporate</th>
                                                        <td>{{ item.lastCLVCorporate }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Layout</th>
                                                        <td>{{ item.layout }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Lead</th>
                                                        <td>{{ item.lead }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Lead Converted On</th>
                                                        <td>{{ item.leadConvertedOn }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Lead Created On</th>
                                                        <td>{{ item.leadCreatedOn }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Lead Created Time</th>
                                                        <td>{{ item.leadCreatedTime }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Lead Status On Conversion</th>
                                                        <td>{{ item.leadStatusOnConversion }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Leads Score</th>
                                                        <td>{{ item.leadsScore }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Net Worth</th>
                                                        <td>{{ item.netWorth }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Old Database Lead</th>
                                                        <td>{{ item.oldDatabaseLead }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>On Boarded Anniversary 3rd</th>
                                                        <td>{{ item.onBoardedAnniversary3rd }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>On Boarded Anniversary 6th</th>
                                                        <td>{{ item.onBoardedAnniversary6th }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>On Boarded Anniversary 9th</th>
                                                        <td>{{ item.onBoardedAnniversary9th }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Parent Client</th>
                                                        <td>{{ item.parentClient }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Preferred Contact Method</th>
                                                        <td>{{ item.preferredContactMethod }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Preferred Contact Time</th>
                                                        <td>{{ item.preferredContactTime }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>RC SMS Opt Out</th>
                                                        <td>{{ item.rcSMSOptOut }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Re Round Robin Processed</th>
                                                        <td>{{ item.reRoundRobinProcessed }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Re Run Round Robin</th>
                                                        <td>{{ item.reRunRoundRobin }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Round Robin Assignment Date</th>
                                                        <td>{{ item.roundRobinAssignmentDate }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Round Robin Assignment Time</th>
                                                        <td>{{ item.roundRobinAssignmentTime }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Round Robin Processed</th>
                                                        <td>{{ item.roundRobinProcessed }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Social Media Information</th>
                                                        <td>{{ item.socialMediaInformation }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Status</th>
                                                        <td>{{ item.status }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Understanding of Insurance</th>
                                                        <td>{{ item.understandingOfInsurance }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Contacts ends here -->
            <!-- Member Locations starts here -->
            <div v-if="selectedTab === 'Member Locations'" class="heading-color">
                <div class="custom-border-body row border">
                    <section class="d-flex align-items-center justify-content-between mx-1">
                        <p class=" Details-heading-size mb-0 responsive-text-size orange-color"> Member Locations</p>

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
            <!-- Member Locations ends here -->
            <!--Leads Listed -->
            <div v-if="selectedTab === 'Leads Listed'">
                <div class="custom-border-body row border">
                    <section class=" heder-bg d-flex align-items-center justify-content-between mx-1">
                        <p class=" familytree-heading-size mb-0 responsive-text-size private-color">Leads Listed</p>

                    </section>
                    <div class="custom-border-body row py-1 m-1">
                        <div class="">
                            <div class="row">
                                <div class="col-10">
                                    <p class="card-title mb-0"><small
                                            class="heading-color text-md text-uppercase text-bold ">Somya
                                            Bhardwaj</small> :
                                        <small class="heading-color ">Advisor</small>
                                    </p>
                                    <p class="mb-0  h6"><small>Somya@xyz.com </small></p>
                                    <p class="mb-0 h6"><small>78979879</small></p>
                                    <p class="card-text  h6"><small>13/10/2000</small></p>
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
            <!--Leads Listed ends -->
            <!--Advisor Leads -->
            <div v-if="selectedTab === 'Advisor Leads'">
                <div class="  py-2 border row my-2 ">
                    <section class="cursor-pointer heder-bg d-flex align-items-center justify-content-between mx-1"
                        @click="toggleInfo('showInfo3')">
                        <p class=" familytree-heading-size mb-0 fs-5 yellow-color">Advisors</p>
                        <i class="fa fa-chevron-down  familytree-heading-size yellow-color fs-5"
                            :class="{ 'fa-chevron-up': showInfo3, 'fa-chevron-down': !showInfo3 }"
                            style="cursor:pointer"></i>
                    </section>
                    <div v-show="showInfo3" class=" row py-1 m-1" v-for="item in formData.advisors" :key="item.ROWID">
                        <div class="card-body border">
                            <div class="row">
                                <div class="container">
                                    <div class="row">
                                        <div class="col">
                                            <table class="table table-striped table-hover">
                                                <tbody>
                                                    <tr>
                                                        <th>Advisor Name</th>
                                                        <td>{{ item.advisorName }}</td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <th>Address</th>
                                                        <td>{{ item.address }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Advisor Bonus Level</th>
                                                        <td>{{ item.advisorBonusLevel }}</td>
                                                    </tr>
                                                   
                                                    <tr>
                                                        <th>Application On</th>
                                                        <td>{{ item.applicationOn }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Are There Multiple Insured</th>
                                                        <td>{{ item.areThereMultipleInsured }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Attachment Link</th>
                                                        <td>{{ item.attachmentLink }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Bonus</th>
                                                        <td>{{ item.bonus }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Bonus Fyc</th>
                                                        <td>{{ item.BonusFyc }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Bonus Level</th>
                                                        <td>{{ item.bonusLevel }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Campaign Source</th>
                                                        <td>{{ item.campaignSource }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Cegs</th>
                                                        <td>{{ item.cegs }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Client</th>
                                                        <td>{{ item.client }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Client Beneficiary</th>
                                                        <td>{{ item.clientBeneficiary }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Comments On Rating</th>
                                                        <td>{{ item.commentsOnRating }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Commission Received</th>
                                                        <td>{{ item.commissionReceived }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Conduct Compliance</th>
                                                        <td>{{ item.conductCompliance }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Contact ID</th>
                                                        <td>{{ item.contactID }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Contract Name</th>
                                                        <td>{{ item.contractName }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Coverage Amount</th>
                                                        <td>{{ item.coverageAmount }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Deal</th>
                                                        <td>{{ item.deal }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Discount Factor</th>
                                                        <td>{{ item.discountFactor }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Dissolution Date</th>
                                                        <td>{{ item.dissolutionDate }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Documents Received</th>
                                                        <td>{{ item.documentsReceived }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Email</th>
                                                        <td>{{ item.email }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>First Policy</th>
                                                        <td>{{ item.firstPolicy }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Frequency</th>
                                                        <td>{{ item.frequency }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Fyc</th>
                                                        <td>{{ item.fyc }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Initial Contribution</th>
                                                        <td>{{ item.initialContribution }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Initial Deposit</th>
                                                        <td>{{ item.initialDeposit }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Is Client A Beneficiary</th>
                                                        <td>{{ item.isClientABeneficiary }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Is Client The Insured</th>
                                                        <td>{{ item.isClientTheInsured }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Issued By</th>
                                                        <td>{{ item.issuedBy }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Layout</th>
                                                        <td>{{ item.layout }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Location</th>
                                                        <td>{{ item.location }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Ma Contribution</th>
                                                        <td>{{ item.maContribution }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Mobile</th>
                                                        <td>{{ item.mobile }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Module</th>
                                                        <td>{{ item.module }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>No Trustees</th>
                                                        <td>{{ item.noTrustees }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Note</th>
                                                        <td>{{ item.note }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Number Of Insured</th>
                                                        <td>{{ item.numberOfInsured }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Number Of Trustee</th>
                                                        <td>{{ item.numberOfTrustee }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Number Of Beneficiaries</th>
                                                        <td>{{ item.numberofBeneficiaries }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Offering Name</th>
                                                        <td>{{ item.offeringName }}</td>
                                                    </tr>                                                 
                                                    <tr>
                                                        <th>Pb Compliance</th>
                                                        <td>{{ item.pbCompliance }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Phone Updated</th>
                                                        <td>{{ item.phoneUpdated }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Policy Advisor</th>
                                                        <td>{{ item.policyAdvisor }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Policy Name</th>
                                                        <td>{{ item.policyName }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Policy Number</th>
                                                        <td>{{ item.policyNumber }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Policy Premium</th>
                                                        <td>{{ item.policyPremium }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Policy Type</th>
                                                        <td>{{ item.policyType }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Registered</th>
                                                        <td>{{ item.registered }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Status</th>
                                                        <td>{{ item.status }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Total Contribution</th>
                                                        <td>{{ item.totalContribution }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Trustees Policy</th>
                                                        <td>{{ item.trusteesPolicy }}</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--Advisor Leads ends -->
            <!--Investment Location -->
            <div v-if="selectedTab === 'Investment Location'">
                <div class="custom-border-body row border">
                    <section class="d-flex align-items-center justify-content-between mx-1">
                        <p class=" Details-heading-size mb-0 responsive-text-size green-color"> Investment Location</p>
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
            <!--Investment Location ends -->
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
                <Notes :id="this.id"/>
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
import Email from "../utils/Email.vue";
import { ref } from "vue";
import axios from "axios";
import { putUrl } from "../../boot/axios";
import { reactive } from "vue";
import Overview from "./Locations.vue"
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
            formData: reactive({
                policies: [],
                contacts: [],
                advisors: [],
                // location         
                aaAnnualYield: null,
                aaMonthlyYield: null,
                caAnnualYield: null,
                caMonthlyYield: null,
                locationCity: "",
                country: "",
                currency: "",
                description: "",
                discountFactor: "",
                locationEmail: "shashank@gmail.com",
                employees: "",
                fax: "",
                locationName: "USA",
                mRevenue: null,
                locationPhone: "",
                phoneBurnerCallOutcome: null,
                phoneBurnerFollowUp: null,
                phoneBurnerFollowUpTime: null,
                postalCode: "",
                rating: "Good",
                shipmentCity: "",
                shipmentCountry: "",
                shipmentPostalCode: "",
                shipmentState: "",
                shipmentStreet: "",
                locationState: "",
                street: "",
                trRevenue: null,
                website: "",
                // user
                address1: "",
                address2: "",
                bio: "",
                city: "",
                email: "",
                facebookAccount: "",
                firstName: "",
                instagramAccount: "",
                lastName: "",
                phone: "",
                publicEmail: "",
                role: "",
                state: "",
                status: "",
                twitterHandle: "",
                userType: "",
                verifiedEmail: "",
                verifiedPhone: "",
                zip: ""
            }),
            headerName: '',
            tooltip: ref("Member Locations"),
            nav_name: 'Member Locations',
            navVisible: false,
            mobileView: window.innerWidth <= 900,
            showicons: false,
            isLoading,
            selectedTab: 'overview',
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
        
        ' Send with zoho sign',
         ' PhoneBurner',
       ],
       
      // The search query entered by the user
      searchQuery:''
        };
    },
    computed:{filteredItems() {
      return this.items.filter(item => 
        item.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        async fetchSingleLocation() {
            if (this.id) {
                try {
                    const response = await axios.get(`${putUrl}locations/api/v1/getsinglelocationdata/${this.id}`);
                    console.log(response);
                    this.formData.policies = response.data.policies.map(item => item.policies)
                    this.formData.contacts = response.data.contacts.map(item => item.contacts)
                    this.formData.advisors = response.data.advisors.map(item => item.advisors)
                    console.log(" this.formData.advisors", this.formData.advisors)
                    Object.assign(this.formData, response.data.location[0].locations)
                    Object.assign(this.formData, response.data.locationOwner[0].userData)
                    // Assigning data to duplicate keys
                    this.formData.locationCity = response.data.location[0].locations.city
                    this.formData.locationEmail = response.data.location[0].locations.email
                    this.formData.locationState = response.data.location[0].locations.state
                    this.formData.locationPhone = response.data.location[0].locations.phone
                } catch (error) {
                    console.error("Error fetching Location:", error);
                }
            }
        },
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
        this.showUser();
        this.fetchSingleLocation();
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
    color: #FF642E !important;
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
    width: 118%;
}

.search-input {
    padding: 10px 40px 10px 10px;
    border: 2px solid #ccc;
    border-radius: 5px;
    /* Changed border radius to 5px */
    font-size: 16px;
    width: 100%;
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