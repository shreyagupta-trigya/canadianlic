<template>
  <!-- Conditionally render based on activeDrawer -->
  <OpenActivityDrawer
    :updateData="this.updateData"
    :updateTask="this.updateTask"
    :speed="500"
    :isOpen="isTaskDrawerOpen"
    @close="closeTaskDrawer"
    :addTask="this.addTask"
    :selectedButton="this.selectedButton"
  />
  <MeetingDrawer
    :speed="500"
    :isOpen="isMeetingdrawerOpen"
    @close="closeMeetingsDrawer"
  />
  <ScheduleCallDrawer
    :speed="500"
    :isOpen="isScheduleDrawerOpen"
    @close="closeScheduleDrawer"
  />
  <LogCallDrawer
    :speed="500"
    :isOpen="isLogDrawerOpen"
    @close="closeLogDrawer"
  />
  <CallNowDrawer
    :speed="500"
    :isOpen="isCallNowDrawerOpen"
    @close="closeCallNowDrawer"
  />

  <div>
    <div class="row">
      <div class="d-flex justify-content-between align-items-center">
        <div class="search-container-div col-lg-10 col-md-10 col-sm-12">
          <div class="search-container">
            <input
              class="search-input"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <i class="fas fa-search" aria-hidden="true"></i>
          </div>
        </div>

        <!-- Dropdown for adding Task/Meeting -->
        <div class="dropdown" style="margin-right: 7%">
          <button
            class="btn companagion-button px-2 py-1 mt-3"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            id="dropdownMenuButton1"
          >
            Add New
          </button>
          <ul class="dropdown-menu">
            <li>
              <a
                class="dropdown-item"
                @click="openTaskDrawer(), switchButton('add')"
                >Task</a
              >
            </li>
            <li>
              <a class="dropdown-item" @click="openMeetingsDrawer">Meeting</a>
            </li>
            <li>
              <hr class="dropdown-divider light-divider" />
            </li>
            <li>
              <a class="dropdown-item" @click="openScheduleDrawer"
                >Schedule a call</a
              >
            </li>
            <li>
              <a class="dropdown-item" @click="openLogDrawer">Log a call</a>
            </li>
            <li>
              <a class="dropdown-item" @click="openCallNowDrawer">Call now</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Table Content -->
      <div class="border px-0">
        <table class="table table-striped">
          <thead>
            <tr>
              <td>
                <input
                  class="form-check-input mt-0 compagion-checkbox"
                  type="checkbox"
                  value=""
                />
              </td>

              <td></td>
              <td class="color fw-semibold">Task Name</td>
              <td class="color fw-semibold">Status</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in taskList" :key="item.id">
              <td>
                <input
                  class="form-check-input mt-0 compagion-checkbox"
                  type="checkbox"
                  value=""
                />
              </td>
              <td>
                <i
                  class="fa fa-pencil p-2 text-md blue-color cursor-pointer"
                  @click="
                    openTaskDrawer(),
                      switchButton(
                        'Update',
                        item.taskId,
                        item.subject,
                        item.description,
                        item.status,
                        item.taskPriority,
                        item.dueDate,
                        item.refrenceModule,
                        item.owner
                      )
                  "
                ></i>
                <i
                  class="fa fa-trash p-2 text-md blue-color cursor-pointer"
                  @click="deleteTask(item.taskId)"
                ></i>
              </td>

              <td>{{ item.subject }}</td>
              <td>{{ item.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <Loader :loading="isLoading"></Loader>
</template>
<script>
import { reactive } from "vue";
import MeetingDrawer from "./MeetingDrawer.vue";
import OpenActivityDrawer from "./OpenActivityDrawer.vue";
import ScheduleCallDrawer from "./ScheduleCallDrawer.vue";
import LogCallDrawer from "./LogCallDrawer.vue";
import CallNowDrawer from "./CallNowDrawer.vue";

import { putUrl } from "../../../../boot/axios";
import axios from "axios";
import Loader from "../../../utils/Loader.vue";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      isMeetingdrawerOpen: false,
      isTaskDrawerOpen: false,
      isScheduleDrawerOpen: false,
      isLogDrawerOpen: false,
      isCallNowDrawerOpen: false,
      subject: reactive(""),
      status: reactive(""),
      taskId: reactive(""),
      taskList: reactive([]),
      isLoading: false,
      selectedButton: reactive(""),
      updateData: null,
    };
  },
  props: ["id"],
  components: {
    OpenActivityDrawer,
    MeetingDrawer,
    ScheduleCallDrawer,
    LogCallDrawer,
    CallNowDrawer,
    Loader,
  },
  mounted() {
    this.getTaskList();
  },
  methods: {
    openScheduleDrawer() {
      this.isScheduleDrawerOpen = true;
    },
    closeScheduleDrawer() {
      this.isScheduleDrawerOpen = false;
    },
    openLogDrawer() {
      this.isLogDrawerOpen = true;
    },
    closeLogDrawer() {
      this.isLogDrawerOpen = false;
    },
    openCallNowDrawer() {
      this.isCallNowDrawerOpen = true;
    },
    closeCallNowDrawer() {
      this.isCallNowDrawerOpen = false;
    },
    openMeetingsDrawer() {
      this.isMeetingdrawerOpen = true;
    },
    openTaskDrawer() {
      this.isTaskDrawerOpen = true;
    },

    closeMeetingsDrawer() {
      this.isMeetingdrawerOpen = false;
    },
    closeTaskDrawer() {
      this.isTaskDrawerOpen = false;
    },

    switchButton(
      button,
      id,
      subject,
      description,
      status,
      taskPriority,
      dueDate,
      refrenceModule,
      owner
    ) {
      this.selectedButton = button;
      this.updateData = {
        id,
        subject,
        description,
        status,
        taskPriority,
        dueDate,
        refrenceModule,
        owner,
      };
      this.taskId = id;
    },
    // add task api
    async addTask(task) {
      try {
        const data = {
          subject: task.subject,
          status: task.status,
          owner: task.owner,
          dueDate: task.dueDate,
          taskPriority: task.taskPriority,
          // reminder:task.reminder,
          // taskRepeat:task.taskRepeat,
          refrenceModule: task.refrenceModule,
          description: task.description,
        };
        const response = await axios.post(
          `${putUrl}canadianlicapi/task/api/v2/create-task`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.success) {
          Swal.fire(
            "Task Added Successfully!",
            "Your task has been created.",
            "success"
          );
          this.getTaskList();
        }
        // this.taskList.unshift({
        //     subject:task.subject,
        //     status:task.status,
        //     dueDate:task.dueDate,
        //     taskPriority:task.taskPriority,
        //     description:task.description,
        //     refrenceModule:task.refrenceModule,
        // });
        this.closeTaskDrawer();
        return response;
      } catch (error) {
        Swal.fire(
          "Error",
          "An error occurred while creating the task.",
          "error"
        );
        console.log("Error", error);
      }
    },
    // get all task api
    async getTaskList() {
      this.isLoading = true;
      try {
        const response = await axios.post(
          `${putUrl}canadianlicapi/task/api/v2/get-task`
        );
        console.log("get response:", response);
        if (response.data.success) {
          this.isLoading = false;
          const taskData = response.data.taskResp.map((item) => ({
            subject: item.subject,
            status: item.status,
            taskId: item.rowId,
            dueDate: item.dueDate,
            taskPriority: item.taskPriority,
            owner: item.owner,
            // reminder:item.reminder,
            // taskRepeat:item.taskRepeat,
            refrenceModule: item.refrenceModule,
            description: item.description,
          }));
          this.taskList = taskData;
          console.log("taskList:", this.taskList);
        }
      } catch (error) {
        this.isLoading = false;

        console.log("Error in getting task data", error);
      }
    },
    // update task api
    async updateTask(data) {
      console.log("drawer data to updateTask ():", data);
      const task = {
        subject: data.subject,
        status: data.status,
        id: data.id,
        dueDate: data.dueDate,
        taskPriority: data.taskPriority,
        owner: data.owner,
        // reminder:data.reminder,
        // taskRepeat:data.taskRepeat,
        refrenceModule: data.refrenceModule,
        description: data.description,
      };
      try {
        const response = await axios.put(
          `${putUrl}canadianlicapi/task/api/v2/update-task/${this.taskId}`,
          task
        );
        if (response.data.success) {
          Swal.fire(
            "Task Updated Successfully!",
            "Your task has been updated.",
            "success"
          );
          this.getTaskList();
        }
        return response;
      } catch (error) {
        console.log("error in updating task", error);
        Swal.fire(
          "Error",
          "An error occurred while updating the task.",
          "error"
        );
      }
    },
    // delete task api
    async deleteTask(id) {
      this.isLoading = true;
      const ROWID = id;
      if (confirm("Are you sure you want to delete this task ?")) {
        try {
          const response = await axios.post(
            `${putUrl}canadianlicapi/task/api/v2/delete-task/${ROWID}`
          );
          this.isLoading = false;
          if (response.data.success) {
            Swal.fire(
              "Task Deleted Successfully!",
              "Your task has been deleted.",
              "success"
            );
          }
          this.taskList = this.taskList.filter((item) => item.taskId !== ROWID);
          return response;
        } catch (error) {
          this.isLoading = false;
          Swal.fire(
            "Error",
            "An error occurred while deleting the task.",
            "error"
          );
          console.log("Error in deleting task", error);
        }
      }
    },
  },
};
</script>

<style scoped>
.card .card-body {
  overflow: hidden;
}

.search-container {
  position: relative;
  display: inline-block;
}

.search-input {
  padding: 10px 40px 10px 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 250px;
  transition: border-color 0.3s ease-in-out;
}

.search-input:focus {
  outline: none;
  border-color: #8fd3f4;
}

.fa-search {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: #666;
}

.color {
  color: #323338;
}

.compagion-checkbox {
  height: 15px;
  width: 15px;
}

.border {
  border: 1px solid #dee2e6 !important;
  border-radius: 5px !important;
  scrollbar-width: none;
  /* overflow: scroll; */
}

.table {
  font-size: 14px;
  color: #323338 !important;
}

td {
  cursor: pointer;
}

th {
  padding: 1rem 0.5rem !important;
  cursor: pointer;
}

.btn {
  margin-bottom: 1rem;
  letter-spacing: -0.025rem;
  text-transform: none;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.companagion-button {
  background-color: var(white) !important;
  color: var(--blue-color) !important;
  border: 1px solid var(--blue-color) !important;
  border-radius: 5px !important;
}

.companagion-button:hover {
  background-color: var(--blue-color) !important;
  border-radius: 7px;
  color: white !important;
  letter-spacing: -0.025rem;
  font-weight: 550;
  box-shadow: 2px 2px 2px 2px #e0e0e3;
}

.truncate {
  max-width: 210px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.light-divider {
  border-top: 1px solid rgba(244, 233, 233, 0.566);
  margin: 0.25rem 1rem;
}
</style>
