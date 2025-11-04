<template>
    <div class="w-full border-top  mt-3">
        <!-- <h3 class="mt-3 ms-1">RPA Bot </h3> -->
    </div>
    <div class="card custom-card p-5 mt-5  w-full shadow-sm mb-4 me-2">

        <form class="card-body" @submit.prevent="() => alert('Form submitted!')">
            <div class="row g-3">
                <div class="row  card-surface pb-4"> <!-- RPA Bot Name -->
                    <div class="col-md-6 ">
                        <label class="form-label">
                            RPA Bot Name <span class="text-danger">*</span>
                        </label>
                        <input v-model="form.rpaBotName" type="text" class="form-control" placeholder="RPA Bot Name"
                            required />
                    </div>

                    <!-- Bot Status -->
                    <div class="col-md-6">
                        <label class="form-label">
                            Bot Status <span class="text-danger">*</span>
                        </label>
                        <select v-model="form.botStatus" class="form-select" required>
                            <option value="" disabled>Select status</option>
                            <option>Active</option>
                            <option>Inactive</option>
                            <option>Paused</option>
                        </select>
                    </div>

                    <!-- Link With Module -->
                    <div class="col-md-6">
                        <label class="form-label">Link With Module</label>
                        <input v-model="form.linkWithModule" type="text" class="form-control"
                            placeholder="Module name" />
                    </div>

                    <!-- Policy Portal Name -->
                    <div class="col-md-6">
                        <label class="form-label">Policy Portal Name</label>
                        <input v-model="form.policyPortalName" type="text" class="form-control"
                            placeholder="Policy Portal" />
                    </div>
                </div>
                <div class="row  card-surface pb-4 mt-3">
                    <!-- Portal User ID -->
                    <div class="col-md-6">
                        <label class="form-label">
                            Portal User ID <span class="text-danger">*</span>
                        </label>
                        <input v-model="form.portalUserId" type="text" class="form-control" placeholder="User ID"
                            required />
                    </div>

                    <!-- User Password -->
                    <div class="col-md-6">
                        <label class="form-label">
                            User Password <span class="text-danger">*</span>
                        </label>
                        <input v-model="form.userPassword" type="password" class="form-control" placeholder="Password"
                            required />
                    </div>

                    <!-- About Bot -->
                    <div class="col-md-12">
                        <label class="form-label">About Bot</label>
                        <textarea v-model="form.aboutBot" class="form-control" placeholder="Enter details about the bot"
                            rows="3"></textarea>
                    </div>

                    <!-- Created Time -->
                    <div class="col-md-6">
                        <label class="form-label">Created Time</label>
                        <input v-model="form.createdTime" type="datetime-local" class="form-control" />
                    </div>

                    <!-- Modified Time -->
                    <div class="col-md-6">
                        <label class="form-label">Modified Time</label>
                        <input v-model="form.modifiedTime" type="datetime-local" class="form-control" />
                    </div>
                </div>
            </div>

        </form>
        <div class="d-flex justify-content-center gap-3 mt-4">
            <button @click="$router.push('/rpabot')" type="submit"
                class="btn btn bg-gradient-light btn-md mb-0  px-4">Back</button>
            <button @click="onSubmit" type="submit" class="btn bg-gradient-dark btn-md mb-0 px-4">Submit</button>
            

      

        </div>
    </div>
</template>

<script>
export default {
    name: "RpaBotForm",
    emits: ["next-step"],
    data() {
        return {
            form: {
                rpaBotName: "",
                botStatus: "",
                linkWithModule: "",
                policyPortalName: "",
                portalUserId: "",
                userPassword: "",
                aboutBot: "",
                createdTime: "",
                modifiedTime: "",
            },
        };
    },
    methods: {
        handleSubmit() {
            this.$emit("next-step", { ...this.form });
        },
        onSubmit() {
            alert("Form Is Submitted Successfully")
        }
    },
};
</script>
