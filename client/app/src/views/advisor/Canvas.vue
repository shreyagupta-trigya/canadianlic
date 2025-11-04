<template>
  <div class="contactView no-scroll  card me-2  mb-0 pb-0" style="border-radius: 5px; max-height: 89vh; ">

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
                           <router-link to="/advisorslist">
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
                <div class="col-6">
                  <a :class="{ 'selected': selectedTab === 'overview' }" @click="selectTab('overview')" class="text-md  mx-2 "
          href="javascript:;">Overview</a>
        <a :class="{ 'selected': selectedTab === 'Details' }" @click="selectTab('Details')" class=" text-md  mx-2 "
          href="javascript:;">Details</a>
        <a :class="{ 'selected': selectedTab === 'Notes' }" @click="selectTab('Notes')"
          class="mx-2 text-md  position-relative" href="javascript:;">Notes
          <span
            class="position-absolute blue-color-background dot-badge translate-middle border border-light rounded-circle text-xxs"
            style="padding:3px"></span>
        </a>
        <a :class="{ 'selected': selectedTab === 'FYC' }" @click="selectTab('FYC')" class=" text-md  mx-2 "
          href="javascript:;">FYC</a>
        <a :class="{ 'selected': selectedTab === 'Bonus' }" @click="selectTab('Bonus')" class=" text-md  mx-2 "
          href="javascript:;">Bonus</a>
        <a :class="{ 'selected': selectedTab === 'Attachments' }" @click="selectTab('Attachments')"
          class=" text-md  mx-2 " href="javascript:;">Attachments</a>
        <a :class="{ 'selected': selectedTab === 'Communication' }" @click="selectTab('Communication')"
          class=" text-md   mx-2 position-relative" href="javascript:;">Comms
          <span
            class="position-absolute dot-badge blue-color-background translate-middle border border-light rounded-circle text-xxs"
            style="padding:3px"></span>
        </a>
            </div>
            <div v-if="!mobileView" class="col-6 d-flex justify-content-end " style="margin-right: 20px;" >
                <div style="position:relative;">
               
                <button type="button" class="btn  dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
    Quick Actions
  </button>
   
<ul class="dropdown-menu dropdown-menu-start dropdown-menu-lg-start" style="border: 1px solid; max-height: 250px; position: absolute; top: 19px; left: -120px; width: 200px; overflow: hidden;">

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
      <!-- navbar Items to show in destop ends -->

      <!-- navbar to show in mobile -->
      <div :class="{ 'mobile-view-navbar-open': navVisible }"
        class="mobile-view-navbar left-0 top-14 position-absolute h-100 bg-white border responsive-text-size">
        <ul class="mt-3">
          <li>
            <a @click="selectTab('overview')" class="text-md px-1 mx-2 col-12" href="javascript:;">Overview</a>
          </li>
          <li>
            <a @click="selectTab('Details'), toggleActivityNav()" class="mx-2 text-md px-1" href="javascript:;">
              Details</a>
          </li>
          <li>
            <a @click="selectTab('Notes'), toggleActivityNav()" class="mx-2 text-md px-1" href="javascript:;">
              Notes</a>
          </li>
          <li>
            <a @click="selectTab('Attachments'), toggleActivityNav()" class="mx-2 text-md px-1" href="javascript:;">
              Attachments</a>
          </li>
          <li>
            <a @click="selectTab('FYC'), toggleActivityNav()" class="mx-2 text-md px-1" href="javascript:;">
              FYC </a>
          </li>
          <li>
            <a @click="selectTab('Bonus'), toggleActivityNav()" class="mx-2 text-md px-1" href="javascript:;">
              Bonus </a>
          </li>
          <li>
            <a @click="selectTab('Communication'), toggleCommunicationNav()" class="mx-2 text-md px-1"
              href="javascript:;"> Comms <i class="fa fa-chevron-down mx-2 text-sm"></i></a>
            <!-- Sub-navigation for Communication -->
            <ul v-if="selectedTab === 'Communication'" class="sub-nav">
              <li><a :class="{ 'selected-mobileView-subNav': selectedActionTab === 'Whatsapp' }"
                  @click="selectActionTab('Whatsapp')" class="text-md px-2 text-sm" href="javascript:;"> Whats
                  App</a></li>
              <li><a :class="{ 'selected-mobileView-subNav': selectedActionTab === 'SMS' }"
                  @click="selectActionTab('SMS')" class="text-md px-2 text-sm" href="javascript:;"> SMS</a></li>
              <li><a :class="{ 'selected-mobileView-subNav': selectedActionTab === 'Email' }"
                  @click="selectActionTab('Email')" class="text-md px-2 text-sm" href="javascript:;"> Email</a>
              </li>
            </ul>
            <!-- Sub-navigation ends -->
          </li>
        </ul>
        <div style="margin-top: 200px; margin-left:31px;">
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
      
      <nav class=" border-bottom d-flex justify-content-start text-end p-2 pb-0 pt-3 ms-3">
        <div class="d-flex">

          <div class=" position-relative mx-1">
            <span
              class="text-xxs position-absolute top-0 right-0 start-100 translate-middle badge rounded-pill blue-color-background p-1">
              10
            </span>
            <a :class="{ 'selected': selectedActionTab === 'Whatsapp' }" @click="selectActionTab('Whatsapp')"
              class="mx-2 text-md  px-2" href="javascript:;">Whats
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
      <div v-if="selectedTab === 'overview'" class=" d-none mb-5 row justify-content-center conatct-overview">
        <div class="card col-lg-12 col-md-12 col-sm-12 gap-5">
          <div class="row">

            <!-- image box -->
            <div class=" d-flex pt-1 col-lg-6 col-md-6 col-sm-12">
              <div class="overview-img text-center "> <span class="overview-img-text pt-2"> {{ (this.formData.firstName
                != (null || undefined)) ? this.formData.firstName.slice(0, 1).toUpperCase() +
              this.formData.lastName.slice(0, 1).toUpperCase() : '' }}</span></div>
              <div class=" mt-4 ">

                <p class="mb-0 heading-color overview-heading text-bold">{{ this.formData.firstName + ' ' +
                  this.formData.lastName }}</p>
                <p :class="mobileView ? 'text-sm' : 'text-lg'">Advisor</p>
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
                    <p class="text-xs text-muted">{{ this.formData.email }}</p>
                  </div>

                </section>
              </div>
              <div class="text-start heading-color">
                <section class="d-flex">
                  <div class="pt-1 px-3"><i class="fa fa-phone text-color"></i> </div>
                  <div>
                    <p class=" mb-0 text-sm text-bold">Phone</p>
                    <p class="text-xs text-muted">{{ this.formData.Phone }}</p>
                  </div>

                </section>
              </div>
              <div class="text-start heading-color">
                <section class="d-flex">
                  <div class="pt-1 px-3"><i class="fa fa-mobile text-color"></i> </div>
                  <div>
                    <p class=" mb-0 text-sm text-bold">Mobile </p>
                    <p class="text-xs text-muted">{{ this.formData.mobile }}</p>
                  </div>

                </section>
              </div>
              <div class="text-start heading-color">
                <section class="d-flex">
                  <div class="pt-1 px-3"><i class="fa fa-street-view text-color"></i> </div>
                  <div>
                    <p class=" mb-0 text-sm text-bold">Location</p>
                    <p class="text-xs text-muted">{{ this.formData.city }}</p>
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
            class="remove-padding-in-mobile skype-div heading-color col-md-6 col-sm-12 ps-0">
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
      <div class=" p-2  " v-if="selectedTab === 'Attachments' && !mobileView">
        <Attachment :id="this.id" />
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

      <!-- Details starts here -->
      <div v-if="selectedTab === 'Details'" class="heading-color">

        <!-- Basic Information -->
        <div class="custom-border-body row border">
          <section class="d-flex align-items-center justify-content-between mx-1" @click="toggleInfo('showInfo1')">
            <p class="Details-heading-size mb-0 fs-5 orange-color">Basic Information</p>
            <i class="fa fa-chevron-down Details-heading-size fs-5 orange-color"
              :class="{ 'fa-chevron-up': showInfo1, 'fa-chevron-down': !showInfo1 }" style="cursor:pointer"></i>
          </section>
          <div v-show="showInfo1" class="custom-border-body row py-1 m-1">
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Name: </span>
              <span class="text-sm">{{ formData.firstName }} {{ formData.lastName }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Email: </span>
              <span class="text-sm">{{ formData.email }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Phone: </span>
              <span class="text-sm">{{ formData.mobile }}</span>
            </div>
          </div>
          <div v-show="showInfo1" class="custom-border-body row py-1 m-1">
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Date of Birth:</span>
              <span class="text-sm">{{ formData.dateOfBirth }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Location: </span>
              <span class="text-sm">{{ formData.location }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">E&O Policy Number: </span>
              <span class="text-sm">{{ formData.eoPolicyNumber }}</span>
            </div>
          </div>
          <div v-show="showInfo1" class="custom-border-body row py-1 m-1">
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Exchange Rate: </span>
              <span class="text-sm">{{ formData.exchangeRate }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Hire Level: </span>
              <span class="text-sm">{{ formData.hireLevel }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Hire Team Leg: </span>
              <span class="text-sm">{{ formData.hireTeamLeg }}</span>
            </div>
          </div>
          <div v-show="showInfo1" class="custom-border-body row py-1 m-1">
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Hire Team Name: </span>
              <span class="text-sm">{{ formData.hireTeamName }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Hire Type: </span>
              <span class="text-sm">{{ formData.hireType }}</span>
            </div>
          </div>
          <div v-show="showInfo1" class="custom-border-body row py-1 m-1">
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Phone: </span>
              <span class="text-sm">{{ formData.Phone }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">ROWID: </span>
              <span class="text-sm">{{ formData.ROWID }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Additional Contact Info: </span>
              <span class="text-sm">{{ formData.additionalContactInfo }}</span>
            </div>
          </div>
          <div v-show="showInfo1" class="custom-border-body row py-1 m-1">
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Advisor Module Name: </span>
              <span class="text-sm">{{ formData.advisorModuleName }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Advisor Owner: </span>
              <span class="text-sm">{{ formData.advisorOwner }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">App ID: </span>
              <span class="text-sm">{{ formData.appID }}</span>
            </div>
          </div>
          <div v-show="showInfo1" class="custom-border-body row py-1 m-1">
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Are you Licensed as an Insurance Advisor: </span>
              <span class="text-sm">{{ formData.areyouLicensedAsAnnsuranceAdvisor }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Assigned Advisor: </span>
              <span class="text-sm">{{ formData.assignedAdvisor }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Cessation Date: </span>
              <span class="text-sm">{{ formData.cessationDate }}</span>
            </div>
          </div>
          <div v-show="showInfo1" class="custom-border-body row py-1 m-1">
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">CIPR Number: </span>
              <span class="text-sm">{{ formData.ciprNumber }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Course Registration Date: </span>
              <span class="text-sm">{{ formData.courseRegistrationDate }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Currency: </span>
              <span class="text-sm">{{ formData.currency }}</span>
            </div>
          </div>
          <div v-show="showInfo1" class="custom-border-body row py-1 m-1">
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Date of Hire: </span>
              <span class="text-sm">{{ formData.dateOfHire }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">E&O Policy Expiry Date: </span>
              <span class="text-sm">{{ formData.eoPolicyExpiryDate }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Currency: </span>
              <span class="text-sm">{{ formData.currency }}</span>
            </div>
          </div>
          <div v-show="showInfo1" class="custom-border-body row py-1 m-1">
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Phone: </span>
              <span class="text-sm">{{ formData.Phone }}</span>
            </div>
            
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Additional Contact Info: </span>
              <span class="text-sm">{{ formData.additionalContactInfo }}</span>
            </div>
          </div>
          <!-- Add more fields here following a similar structure -->
        </div>

        <!-- Basic Information ends-->
        <!-- Additional information -->
        <div class="custom-border-body row border my-2">
          <section class="heder-bg d-flex align-items-center justify-content-between mx-1"
            @click="toggleInfo('showInfo3')">
            <p class="Details-heading-size mb-0 fs-5 green-color">Additional Information</p>
            <i class="fa fa-chevron-down Details-heading-size green-color fs-5"
              :class="{ 'fa-chevron-up': showInfo3, 'fa-chevron-down': !showInfo3 }" style="cursor:pointer"></i>
          </section>
         
          <div v-show="showInfo3" class="custom-border-body row py-1 m-1">
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Desired Timeline: </span>
              <span class="text-sm">{{ formData.desiredTimeline }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Employment Type: </span>
              <span class="text-sm">{{ formData.employmentType }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Facebook: </span>
              <span class="text-sm">{{ formData.facebook }}</span>
            </div>
          </div>
          <div v-show="showInfo3" class="custom-border-body row py-1 m-1">
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Fax: </span>
              <span class="text-sm">{{ formData.fax }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">FYC: </span>
              <span class="text-sm">{{ formData.fyc }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Generation Number: </span>
              <span class="text-sm">{{ formData.generationNumber }}</span>
            </div>
          </div>
          <div v-show="showInfo3" class="custom-border-body row py-1 m-1">
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Google Review: </span>
              <span class="text-sm">{{ formData.googleReview }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Insurance Partner: </span>
              <span class="text-sm">{{ formData.insurancePartner }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Life Career Preferences: </span>
              <span class="text-sm">{{ formData.lifeCareerPreferences }}</span>
            </div>
          </div>
          <div v-show="showInfo3" class="custom-border-body row py-1 m-1">
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">LinkedIn: </span>
              <span class="text-sm">{{ formData.linkedIn }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Offering: </span>
              <span class="text-sm">{{ formData.offering }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Organization Level: </span>
              <span class="text-sm">{{ formData.organizationLevel }}</span>
            </div>
          </div>
          <div v-show="showInfo3" class="custom-border-body row py-1 m-1">
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Payout Level: </span>
              <span class="text-sm">{{ formData.payoutLevel }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Phone: </span>
              <span class="text-sm">{{ formData.phone }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Postal Code: </span>
              <span class="text-sm">{{ formData.postalCode }}</span>
            </div>
          </div>
          <div v-show="showInfo3" class="custom-border-body row py-1 m-1">
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Premium: </span>
              <span class="text-sm">{{ formData.premium }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Province: </span>
              <span class="text-sm">{{ formData.province }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Reviewed Date: </span>
              <span class="text-sm">{{ formData.reviewedDate }}</span>
            </div>
          </div>
          <div v-show="showInfo3" class="custom-border-body row py-1 m-1">
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Secondary Email: </span>
              <span class="text-sm">{{ formData.secondaryEmail }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Skype: </span>
              <span class="text-sm">{{ formData.skype }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Street: </span>
              <span class="text-sm">{{ formData.street }}</span>
            </div>
          </div>
          <div v-show="showInfo3" class="custom-border-body row py-1 m-1">
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Team Leg: </span>
              <span class="text-sm">{{ formData.teamLeg }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Team Name: </span>
              <span class="text-sm">{{ formData.teamName }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Twitter: </span>
              <span class="text-sm">{{ formData.twitter }}</span>
            </div>
          </div>
                   
          <div v-show="showInfo3" class="custom-border-body row py-1 m-1">
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Youtube Video: </span>
              <span class="text-sm">{{ formData.youtubeVideo }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">Bonus Level: </span>
              <span class="text-sm">{{ formData.bonusLevel }}</span>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 my-1 custom-border-data">
              <span class="text-sm text-bold heading-color">City: </span>
              <span class="text-sm">{{ formData.city }}</span>
            </div>
          </div>

          <!-- Add more fields here following a similar structure -->
        </div>

        <!-- Additional information ends -->
      </div>
      <!-- Details ends here -->

      <!-- User details in right starts-->
      <div class="User-details-section border">
        <div>
          <i @mouseover="handleMouseOver" @mouseleave="handleMouseLeave"
            :class="['fa', isUserVisible ? 'fa-chevron-right' : 'fa-chevron-left ']" @click="showUser()"
            :style="{ cursor: 'pointer', zIndex: 6 }">
          </i>

          <div class="User-details-content pt-2">
            <!-- User details -->
            <div>
              <div class="User-headings mx-3">
                <p class="text-bold">User</p>
              </div>
              <div class="User-cards heading-color mx-3 my-2 px-2 py-2">
                <p class="mb-0 text-sm text-bold">{{ this.formData.firstName + ' ' + this.formData.lastName }}</p>
                <p class="mb-0 text-xs"><span class="text-bold">Email:</span>Peterxyz@trigybcajbckcaska
                </p>
                <p class="mb-0 text-xs"><span class="text-bold">Phone:</span> 7868768688</p>
              </div>
            </div>
            <!-- User details ends -->
            <hr>
            <!-- refferals details  -->

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

            <!-- refferals details ends -->
            <hr>
            <!-- policies details  -->

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

            <!-- Policies details ends -->
          </div>
        </div>
      </div>
      <!-- User details in right ends-->

      <!-- FYC start from here -->
      <div v-if="selectedTab === 'FYC'">
        <div class="custom-border-body row border">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Amount</th>
                <th scope="col">Year</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in this.formData.FYCArray" :key="item.ROWID">
                <td>{{ item.FYCAmount }}</td>
                <td>{{ item.year }}</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
      <!-- FYC ends from here -->
      <!-- Bonus start from here -->
      <div v-if="selectedTab === 'Bonus'">
        <div class="custom-border-body row border">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Amount</th>
                <th scope="col">Year</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in this.formData.bonusArray" :key="item.ROWID">
                <td>{{ item.bonusAmount }}</td>
                <td>{{ item.year }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Bonus ends from here -->

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
import { ref } from "vue"
import { putUrl } from "../../boot/axios";
import axios from "axios";
import { reactive } from "vue";
import Overview from "./Advisor.vue";
import Attachment from "../utils/Attachment.vue";
// import mounted, beforeUnmount from vue

export default {
  components: {
    Whatsapp,
    SMS,
    Email,
    Notes,
    Overview,
    Attachment 
  },
  props: ["id"],
  data() {
    let isLoading = ref(false);

    return {
      formData: reactive({
        bonusArray: [],
        FYCArray: [],

        //advisor details
        Phone: "",
        ROWID: "",
        additionalContactInfo: "",
        advisorMuduleName: "",
        advisorOwner: "",
        appID: "",
        areyouLicensedAsAnnsuranceAdvisor: "",
        assignedAdvisor: "",
        cessationDate: "",
        ciprNumber: "",
        courseRegistrationDate: "",
        currency: "",
        dateOfBirth: "",
        dateOfHire: "",
        email: "",
        eoPolicyExpiryDate: "",
        eoPolicyNumber: "",
        exchangeRate: "",
        firstName: "",
        hireLevel: "",
        hireTeamLeg: "",
        hireTeamName: "",
        hireType: "",
        howLongLicensed: "",
        inactiveAdvisor: "",
        insuranceAdvisor: "",
        insurancePartnerListing: "",
        landline: "",
        lastName: "",
        leadSource: "",
        leadStatus: "",
        licenceExpiryDate: "",
        licenceNumber: "",
        llqpLicensed: "",
        location: "",
        mobile: "",
        myCalendar: "",
        probemLookingToSolve: "",
        sincehowLong: "",
        socialMedia: "",
        status: "",
        teamGenerationNumber: "",
        whatLookingFor: "",
        // advisor sub details
        advisorId: "",
        bonusLevel: "",
        city: "",
        desiredTimeline: "",
        employmentType: "",
        facebook: "",
        fax: "",
        fyc: "",
        generationNumber: "",
        googleReview: "",
        insurancePartner: "",
        lifeCareerPreferences: "",
        linkedIn: "",
        offering: "",
        organizationLevel: "",
        payoutLevel: "",
        phone: "",
        postalCode: "",
        premium: "",
        province: "",
        reviewedDate: "",
        secondaryEmail: "",
        skype: "",
        street: "",
        teamLeg: "",
        teamName: "",
        twitter: "",
        youtubeVideo: ""
      }),
      headerName: '',
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

    async getAdvisordeatils() {
      try {
        let bonusArray = reactive([]);
        let FYCArray = reactive([]);
        let advisor = reactive([]);
        let advisorSubDetails = reactive([]);
        const response = await axios.get(`${putUrl}advisorfunction/api/v2/get-advisor-related-data/${this.id}`)
        console.log("advisor response is :",response);
        this.formData.firstName = response.data.advisorDetails.advisors.firstName;
        this.formData.lastName = response.data.advisorDetails.advisors.lastName;
        this.formData.email = response.data.advisorDetails.advisors.email;
        this.formData.mobile = response.data.advisorDetails.advisors.mobile;
        this.formData.dateOfBirth = response.data.advisorDetails.advisors.dateOfBirth;
        this.formData.location = response.data.advisorDetails.advisors.location;
        this.formData.eoPolicyNumber = response.data.advisorDetails.advisors.eoPolicyNumber;
        this.formData.exchangeRate = response.data.advisorDetails.advisors.exchangeRate;
        this.formData.hireLevel = response.data.advisorDetails.advisors.hireLevel;
        this.formData.hireTeamLeg = response.data.advisorDetails.advisors.hireTeamLeg;
        this.formData.hireTeamName = response.data.advisorDetails.advisors.hireTeamName;
        this.formData.hireType = response.data.advisorDetails.advisors.hireType;
        this.formData.Phone = response.data.advisorDetails.advisors.Phone;
        this.formData.ROWID = response.data.advisorDetails.advisors.ROWID;
        this.formData.additionalContactInfo = response.data.advisorDetails.advisors.additionalContactInfo;
        this.formData.advisorModuleName = response.data.advisorDetails.advisors.advisorModuleName;
        this.formData.advisorOwner = response.data.advisorDetails.advisors.advisorOwner;
        this.formData.appID = response.data.advisorDetails.advisors.appID;
        this.formData.areyouLicensedAsAnnsuranceAdvisor = response.data.advisorDetails.advisors.areyouLicensedAsAnnsuranceAdvisor;
        this.formData.assignedAdvisor = response.data.advisorDetails.advisors.assignedAdvisor;
        this.formData.cessationDate = response.data.advisorDetails.advisors.cessationDate;
        this.formData.ciprNumber = response.data.advisorDetails.advisors.ciprNumber;
        this.formData.courseRegistrationDate = response.data.advisorDetails.advisors.courseRegistrationDate;
        this.formData.currency = response.data.advisorDetails.advisors.currency;
        this.formData.dateOfHire = response.data.advisorDetails.advisors.dateOfHire;
        this.formData.eoPolicyExpiryDate = response.data.advisorDetails.advisors.eoPolicyExpiryDate;
        this.formData.howLongLicensed = response.data.advisorDetails.advisors.howLongLicensed;
        this.formData.inactiveAdvisor = response.data.advisorDetails.advisors.inactiveAdvisor;
        this.formData.insuranceAdvisor = response.data.advisorDetails.advisors.insuranceAdvisor;
        this.formData.insurancePartnerListing = response.data.advisorDetails.advisors.insurancePartnerListing;
        this.formData.landline = response.data.advisorDetails.advisors.landline;
        this.formData.leadSource = response.data.advisorDetails.advisors.leadSource;
        this.formData.leadStatus = response.data.advisorDetails.advisors.leadStatus;
        this.formData.licenceExpiryDate = response.data.advisorDetails.advisors.licenceExpiryDate;
        this.formData.licenceNumber = response.data.advisorDetails.advisors.licenceNumber;
        this.formData.llqpLicensed = response.data.advisorDetails.advisors.llqpLicensed;
        this.formData.location = response.data.advisorDetails.advisors.location;
        this.formData.mobile = response.data.advisorDetails.advisors.mobile;
        this.formData.myCalendar = response.data.advisorDetails.advisors.myCalendar;
        this.formData.probemLookingToSolve = response.data.advisorDetails.advisors.probemLookingToSolve;
        this.formData.sincehowLong = response.data.advisorDetails.advisors.sincehowLong;
        this.formData.socialMedia = response.data.advisorDetails.advisors.socialMedia;
        this.formData.status = response.data.advisorDetails.advisors.status;
        this.formData.teamGenerationNumber = response.data.advisorDetails.advisors.teamGenerationNumber;
        this.formData.whatLookingFor = response.data.advisorDetails.advisors.whatLookingFor;
        this.formData.advisorId = response.data.advisorSubDetails[0].advisorSubDetails.advisorId;
        this.formData.bonusLevel = response.data.advisorSubDetails[0].advisorSubDetails.bonusLevel;
        this.formData.city = response.data.advisorSubDetails[0].advisorSubDetails.city;
        this.formData.desiredTimeline = response.data.advisorSubDetails[0].advisorSubDetails.desiredTimeline;
        this.formData.employmentType = response.data.advisorSubDetails[0].advisorSubDetails.employmentType;
        this.formData.facebook = response.data.advisorSubDetails[0].advisorSubDetails.facebook;
        this.formData.fax = response.data.advisorSubDetails[0].advisorSubDetails.fax;
        this.formData.fyc = response.data.advisorSubDetails[0].advisorSubDetails.fyc;
        this.formData.generationNumber = response.data.advisorSubDetails[0].advisorSubDetails.generationNumber;
        this.formData.googleReview = response.data.advisorSubDetails[0].advisorSubDetails.googleReview;
        this.formData.insurancePartner = response.data.advisorSubDetails[0].advisorSubDetails.insurancePartner;
        this.formData.lifeCareerPreferences = response.data.advisorSubDetails[0].advisorSubDetails.lifeCareerPreferences;
        this.formData.linkedIn = response.data.advisorSubDetails[0].advisorSubDetails.linkedIn;
        this.formData.offering = response.data.advisorSubDetails[0].advisorSubDetails.offering;
        this.formData.organizationLevel = response.data.advisorSubDetails[0].advisorSubDetails.organizationLevel;
        this.formData.payoutLevel = response.data.advisorSubDetails[0].advisorSubDetails.payoutLevel;
        this.formData.phone = response.data.advisorSubDetails[0].advisorSubDetails.phone;
        this.formData.postalCode = response.data.advisorSubDetails[0].advisorSubDetails.postalCode;
        this.formData.premium = response.data.advisorSubDetails[0].advisorSubDetails.premium;
        this.formData.province = response.data.advisorSubDetails[0].advisorSubDetails.province;
        this.formData.reviewedDate = response.data.advisorSubDetails[0].advisorSubDetails.reviewedDate;
        this.formData.secondaryEmail = response.data.advisorSubDetails[0].advisorSubDetails.secondaryEmail;
        this.formData.skype = response.data.advisorSubDetails[0].advisorSubDetails.skype;
        this.formData.street = response.data.advisorSubDetails[0].advisorSubDetails.street;
        this.formData.teamLeg = response.data.advisorSubDetails[0].advisorSubDetails.teamLeg;
        this.formData.teamName = response.data.advisorSubDetails[0].advisorSubDetails.teamName;
        this.formData.twitter = response.data.advisorSubDetails[0].advisorSubDetails.twitter;
        this.formData.youtubeVideo = response.data.advisorSubDetails[0].advisorSubDetails.youtubeVideo;
        
  this.formData.bonusArray = response.data.data.advisorBonus.map(item =>
        ({
          bonusAmount: item.advisorBonus.bonusAmount,
          year: item.advisorBonus.year,
          ROWID: item.advisorBonus.ROWID
        })
        );
        this.formData.FYCArray = response.data.data.advisorFyc.map(item =>
        ({
          FYCAmount: item.advisorFyc.fyc,
          year: item.advisorFyc.year,
          ROWID: item.advisorFyc.ROWID
        })
        );
        advisor = response.data.data.advisorResult.map((item) => item.advisors)
        advisorSubDetails = response.data.data.advisorSubResult[0].advisorSubDetails

        console.log("advisor",{ advisorSubDetails })
        Object.assign(this.formData.bonusArray, bonusArray)
        Object.assign(this.formData.FYCArray, FYCArray)
        Object.assign(this.formData, advisor[0])
        Object.assign(this.formData, advisorSubDetails)
        console.log("this.formData.FYCArray", this.formData.FYCArray)
      } catch (error) {
        console.log(error)
      }
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
        const item = document.querySelector('.User-details-section');
        item.style.minHeight = '87vh';
      }
    },

    handleMouseLeave() {
      if (!this.isUserVisible) {
        const item = document.querySelector('.User-details-section');
        item.style.minHeight = '2rem';
      }
    },

    showUser() {
      window.addEventListener('resize', this.handleResize);

      if (this.navVisible) {
        this.navVisible = !this.navVisible
      }

      this.isUserVisible = !this.isUserVisible;
      const item = document.querySelector('.User-details-section');
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
      const content = document.querySelector('.User-details-content');
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
    },


  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    // Initially check the screen size
    this.handleResize();
    this.showUser()
    this.getAdvisordeatils()
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
  background-color: rgb(10, 243, 10);
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
    background-color: rgb(10, 243, 10);
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
