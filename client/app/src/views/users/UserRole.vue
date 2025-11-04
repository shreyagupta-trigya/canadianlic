<template>
  <div class="row">
    <div class="col-12 col-lg-12 m-auto">
      <div
        class="card multisteps-form__panel p-3 border-radius-xl bg-white js-active position-relative"
        data-animation="FadeIn"
      >
        <form class="multisteps-form_from">
          <div class="row mt-4">
            <div class="col-12 col-sm-4">
              <label>Role Name</label>
              <div class="form-group multisteps-form__input">
                <input
                  v-model="roleName"
                  id="roleName"
                  type="text"
                  class="form-control form-control-default"
                  placeholder="Role Name"
                  autocomplete="off"
                />
              </div>
            </div>
            <div class="col-12 col-sm-8 mt-4 mt-sm-0"></div>
          </div>

          <div class="row">
            <div class="col-12 col-sm-4">
              <label>Description</label>
              <div class="form-group multisteps-form__input">
                <textarea
                  v-model="description"
                  id="description"
                  class="form-control form-control-default"
                  placeholder="Description"
                  required
                ></textarea>
              </div>
            </div>
            <div class="col-12 col-sm-8 mt-4 mt-sm-0"></div>
          </div>

          <table class="table align-items-center justify-content-center mb-0">
            <thead>
              <tr>
                <th>Module Name</th>
                <th>Module Access</th>
                <th>Full Access</th>
                <th>Add</th>
                <th>View Only</th>
                <th>View All</th>
                <th>Modify Only</th>
                <th>Modify All</th>
                <th>Delete</th>
                <th>Import</th>
                <th>Export</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(module, index) in moduleName" :key="index">
                <td>
                  <h6 class="ps-4">{{ module.moduleName }}</h6>
                </td>
                <td>
                  <input
                    type="checkbox"
                    v-model="module.access.module_access"
                    @change="updateModuleAccess(index)"
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    v-model="module.access.fullAccess"
                    @change="updateFullAccess(index)"
                  />
                </td>
                <td>
                  <input type="checkbox" v-model="module.access.add" />
                </td>
                <td>
                  <input type="checkbox" v-model="module.access.viewOnly" />
                </td>
                <td>
                  <input type="checkbox" v-model="module.access.viewAll" />
                </td>
                <td>
                  <input type="checkbox" v-model="module.access.modifyOnly" />
                </td>
                <td>
                  <input type="checkbox" v-model="module.access.modifyAll" />
                </td>
                <td>
                  <input type="checkbox" v-model="module.access.delete" />
                </td>
                <td>
                  <input type="checkbox" v-model="module.access.import" />
                </td>
                <td>
                  <input type="checkbox" v-model="module.access.export" />
                </td>
              </tr>
            </tbody>
          </table>

          <div
            v-if="!id"
            class="button-row d-flex justify-content-center mt-2 gap-4"
          >
            <button
              class="btn mb-0 bg-gradient-dark btn-md"
              type="button"
              @click.prevent="handleSubmitForm"
            >
              Submit
            </button>
            <button
              class="btn mb-0 bg-gradient-dark btn-md"
              type="button"
              @click.prevent="resetForm"
            >
              Reset
            </button>
          </div>
          <div
            v-if="id"
            class="button-row d-flex justify-content-center mt-2 gap-4"
          >
            <button
              class="btn mb-0 bg-gradient-dark btn-md"
              type="button"
              @click.prevent="handleUpdateForm"
            >
              Update
            </button>
            <button
              class="btn mb-0 bg-gradient-dark btn-md"
              type="button"
              @click.prevent="cancle"
            >
              Cancel
            </button>
          </div>
        </form>
        <Loader :loading="isLoading"></Loader>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";
import { putUrl } from "../../boot/axios";
import Loader from "../utils/Loader.vue";
import { ref } from "vue";
import Swal from "sweetalert2";
import router from "../../router/index";
import module from "./module/module.js";
export default {
  components: {
    Loader,
  },

  data() {
    const route = useRoute();
    return {
      route,
      description: ref(""),
      roleName: ref(""),
      moduleName: [],
      isLoading: false,
      id:null,
    };
  },
  methods: {
    async setUserRoleData(id) {
      try {
        const response = await axios.get(
          `${putUrl}usersFunction/getAllUsersRole/${id}`
        );
        // console.log("<<<<< response >>>>>>",id);
        if (response.data && response.data.length > 0) {
          return response.data[0].appUsersRole;
        }
      } catch (error) {
        console.error(error);
      }
    },
    // <<<<<<<<<<< ======== CREATE AND UPDATE FORM ========= >>>>>>>>>>>>

    async handleUpdateForm() {
      const userId = localStorage.getItem("userId");

      // Map the permissions properly
      // const updatedPermissions = this.moduleName.map((module) => ({
        const updatedPermissions = Object.values(this.moduleName).map((module) => ({
        moduleName: module.moduleName,
        module_access: module.access.module_access || false,
        moduleAccess: module.access.moduleAccess || false,
        add: module.access.add || false,
        viewOnly: module.access.viewOnly || false,
        viewAll: module.access.viewAll || false,
        modifyOnly: module.access.modifyOnly || false,
        fullAccess: module.access.fullAccess || false,
        modifyAll: module.access.modifyAll || false,
        delete: module.access.delete || false,
        import: module.access.import || false,
        export: module.access.export || false,
      }));

      try {
        const userRoleData = {
          permissions: updatedPermissions, // Pass the mapped permissions array
          description: this.description,
          userId: userId,
          roleName: this.roleName,
        };
        const response = await axios.post(
          `${putUrl}usersFunction/updateUserRole/${this.id}`,
          userRoleData
        );
        console.log({ response });
        Swal.fire({
          title: "<strong>User Role Updated Successfully</strong>",
          icon: "success",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        setTimeout(() => {
          router.push("/users-role-list");
        }, 2000);
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: error.message,
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    },
    async handleSubmitForm() {
      const userId = localStorage.getItem("userId");
      // console.log("this.moduleName", this.moduleName);
      const permissions = Object.values(this.moduleName).map((module) => ({
        
        moduleName: module.moduleName,
        module_access: module.access.module_access || false,
        moduleAccess: module.access.moduleAccess || false,
        add: module.access.add || false,
        viewOnly: module.access.viewOnly || false,
        viewAll: module.access.viewAll || false,
        modifyOnly: module.access.modifyOnly || false,
        fullAccess: module.access.fullAccess || false,
        modifyAll: module.access.modifyAll || false,
        delete: module.access.delete || false,
        import: module.access.import || false,
        export: module.access.export || false,
      }));

      try {
        const userRoleData = {
          permissions,
          description: this.description,
          userId: userId,
          roleName: this.roleName,
        };
        // console.log("userRoleData >>>>",userRoleData);
        // Make the API request
        const response = await axios.put(
          `${putUrl}usersFunction/createUserRole`,
          userRoleData
        );
        // Handle the success response
        if (response.data) {
          Swal.fire({
            title: "<strong>User Role Created Successfully</strong>",
            icon: "success",
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false,
          });

          // Redirect after success
          setTimeout(() => {
            router.push("/users-role-list");
          }, 2000);
        }
      } catch (error) {
        console.error(error);
      }
    },

    // <<<<<<<<<<< ======== RESET FORM ========= >>>>>>>>>>>>
    resetForm() {
      this.description = "";
      this.roleName = "";
      this.moduleName.forEach((module) => {
        module.add = false;
        module.viewOnly = false;
        module.viewAll = false;
        module.modifyOnly = false;
        module.modifyAll = false;
        module.fullAccess = false;
        module.delete = false;
      });
    },
    // <<<<<<<<<<< ======== UPDATE MODULE ACCESS ========= >>>>>>>>>>>>
    updateModuleAccess(index) {
      const module = this.moduleName[index];
      if (module.access.fullAccess) {
        module.access.module_access = true;
        module.access.add = true;
        module.access.viewOnly = true;
        module.access.viewAll = true;
        module.access.modifyOnly = true;
        module.access.modifyAll = true;
        module.access.delete = true;
        module.access.import = true;
        module.access.export = true;
      } else {
        module.access.module_access = false;
      }
    },
    // <<<<<<<<<<< ======== UPDATE FULL ACCESS ========= >>>>>>>>>>>>
    updateFullAccess(index) {
      const module = this.moduleName[index];
      if (module.access.fullAccess) {
        module.access.module_access = true;
        module.access.add = true;
        module.access.viewOnly = true;
        module.access.viewAll = true;
        module.access.modifyOnly = true;
        module.access.modifyAll = true;
        module.access.delete = true;
        module.access.import = true;
        module.access.export = true;
      } else {
        module.access.module_access = false;
        module.access.add = false;
        module.access.viewOnly = false;
        module.access.viewAll = false;
        module.access.modifyOnly = false;
        module.access.modifyAll = false;
        module.access.delete = false;
        module.access.import = false;
        module.access.export = false;
      }
    },
    cancle() {
      this.$emit("cancle");
    },
  },
  async beforeMount() {
    this.id = this.route.params.id;

    if (this.route.params.id) {
      //   // console.log("ID received:", this.id);
      const data = await this.setUserRoleData(this.route.params.id);
      this.roleName = data.roleName;
      this.description = data.description;
      const permission = JSON.parse(data.permmisions);
      this.moduleName = permission.map((item) => ({
        moduleName: item.moduleName,
        access: {
          module_access: item.module_access,
          add: item.add,
          viewOnly: item.viewOnly,
          viewAll: item.viewAll,
          modifyOnly: item.modifyOnly,
          modifyAll: item.modifyAll,
          fullAccess: item.fullAccess,
          delete: item.delete,
          import: item.import,
          export: item.export,
        },
      }));
    } else {
      this.moduleName = module;
    }
    this.isLoading = false;
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
