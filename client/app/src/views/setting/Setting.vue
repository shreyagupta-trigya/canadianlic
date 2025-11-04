<template>
    <div class="bg-white w-100 h-100 setting-main-div" style="min-height: 87vh;">
        
        <div>
            <div class="row">
                <section class="col-6 ">
                    <h5 class="ms-4 mt-2 heading-color ">All Settings </h5>
                </section>
                <section class="col-6 d-flex justify-content-end pe-4 align-items-center">
                    <div class="border px-2 " style="border-radius: 20px;width:200px">
                        <i class="fas fa-search"></i>
                        <input class="search-input col-8 " style="outline: none; border: none;" type="search" />
                    </div>
                </section>
            </div>
            <div class="d-flex justify-content-start w-100 h-100 responsive">
                <div class="p-2 mx-2">
                    <section class="card setting-card p-2">
                        <p class="fw-bold mb-0 mx-2 heading-color ">General</p>
                        <router-link to="/personal-setting" class="link-nav p-2">
                            <p class="mb-0 text-muted">Personal Settings</p>
                        </router-link>
                        <router-link to="/userslist" class="link-nav p-2">
                            <p class="mb-0 text-muted">Users</p>
                        </router-link>
                        <router-link to="/companySetting" class="link-nav p-2">
                            <p class="mb-0 text-muted">Company Settings</p>
                        </router-link>
                    </section>
                </div>
                <div class="p-2 mx-2">
                    <section class="card setting-card p-2">
                        <p class="fw-bold mb-0 mx-2 heading-color ">Security Control</p>
                        <router-link to="/UserProfile" class="link-nav p-2">
                            <p class="mb-0 text-muted">Profiles</p>
                        </router-link>
                        <router-link to="/users-permission" class="link-nav p-2">
                            <p class="mb-0 text-muted">Roles and Sharing</p>
                        </router-link>
                        <router-link to="/users-role-list" class="link-nav p-2">
                            <p class="mb-0 text-muted">Permissions</p>
                        </router-link>
                    </section>
                </div>
                <div class="p-2 mx-2">
                    <section class="card setting-card p-2">
                        <p class="fw-bold mb-0 mx-2 heading-color ">RPA Bot</p>
                        <router-link to="/rpabot" class="link-nav p-2">
                            <p class="mb-0 text-muted">All Bots</p>
                        </router-link>
                        <!-- <router-link to="/users-permission" class="link-nav p-2">
                            <p class="mb-0 text-muted">Roles and Sharing</p>
                        </router-link>
                        <router-link to="/users-role-list" class="link-nav p-2">
                            <p class="mb-0 text-muted">Permissions</p>
                        </router-link> -->
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>

.setting-card {
    width: 22rem;
    min-height: 100%;
}

.link-nav:hover {
    background-color: #DCDFEC;
    color: black !important;
    font-weight: 600;
}

.search-input:focus {
    border: none;
    outline:none;
}

.heading-color {
    color: #323338
}
.setting-main-div p{
    color: #323338 !important
}

@media (max-width:500px){
    .responsive{
    flex-direction: column;
}
}
</style>
