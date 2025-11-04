<template>
  <div class="card me-2" style="min-height: 90vh;">
    <div class="card-body">
      <div class="ms-3 w-75">
        <p class="fs-5 fw-bolder mb-0 heading-color">Roles</p>
        <p class="heading-color">
          This page will allow you to define how you share the data among users based on your organization's role
          hierarchy. For more information, refer to online help.
        </p>
      </div>
      <div class="treeview js-treeview mb-5">
        <ul>
          <tree-node v-for="(level, index) in levels" :key="index" :node="level" @add-same-level="addSameLevel"
            @add-sub-level="addSubLevel" @remove-level="removeLevel" @open-drawer="openDrawer($event)"
            :ShowDialogueId="ShowDialogueId" @update-ShowDialogueId="updateShowDialogueId"></tree-node>
        </ul>
      </div>
    </div>

    <!-- Drawer Component -->
    <Drawer :isOpen="isDrawerOpen" @close="closeDrawer" @submit-data="handleRoleSubmission($event)"
      @delete-data="handleRoleDelete($event)" :allRoles="flattenedRoles" :action="action"
      @update-data="updateLevel($event)" :editData='editData' />
  </div>
</template>

<script>
import TreeNode from './roles/TreeNode.vue';
import Drawer from './roles/RolesDrawer.vue'; // Adjust the import path as necessary
import { reactive } from 'vue';
import { putUrl } from '../../boot/axios';
import axios from 'axios';

export default {
  name: "FamilyTree",
  components: { TreeNode, Drawer },

  data() {
    return {
      editData: reactive({}),
      levels: reactive([
        {
          level: "C",
          title: "CEO",
          id: "22106000001149673",
          userList: reactive([]),
          levelID: "22106000001149673",
          children: [
            // {
            //   level: "P",
            //   title: "Peter Sir",
            //   id: "1234567",
            //   userList:reactive([]),
            //   children: [
            //     {
            //       level: "A",
            //       title: "Assistant Manager", // Corrected spelling
            //       id: "A0B0C0",
            //       userList:reactive([]),
            //       children: [
            //         {
            //           level: "A",
            //           title: "Associate",
            //           id: "A0B0C0D0",
            //           children: []
            //         }
            //       ]
            //     }
            //   ]
            // }
          ]
        }
      ]),

      isDrawerOpen: false,
      nodeId: '',
      action: '',
      ShowDialogueId: '',
    };
  },
  computed: {
    flattenedRoles() {
      return this.flattenTree(this.levels);
    }
  },
  methods: {
    updateShowDialogueId(id) {
      this.ShowDialogueId = id;
    },
    async createRole(data) {
      const role = JSON.stringify(data);
      try {
        const response = await axios.put(`${putUrl}usersFunction/api/v1/createRole`, { role });
        console.log("this.createRole", response)
        this.levels[0].id = response?.data?.result?.ROWID
        return response
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    },
    async updateRole(data) {
      const role = JSON.stringify(data);
      try {
        const response = await axios.post(`${putUrl}usersFunction/api/v1/updateRole/${data[0].levelID}`, { role });
        console.log("update role", response)
        if (response.data.success) {
          this.levels = JSON.parse(response.data.result.roleDetails);
          this.closeDrawer()
        }
        return response;
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    },
    async getRole() {
      try {
        const response = await axios.get(`${putUrl}usersFunction/api/v1/getallroles`);
        console.log("get role", response);
        this.levels = JSON.parse(response.data[0].roles.roleDetails);
        this.levels[0].levelID = response.data[0].roles.ROWID;
        return response;
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    },
    moveRole(data, roleId, newParentId) {
      let roleToMove = null;
      // Recursive function to find and remove the role
      function findAndRemoveRole(node, roleId) {
        if (!node.children || node.children.length === 0) return null;
        // Find the role in children
        for (let i = 0; i < node.children.length; i++) {
          if (node.children[i].id === roleId) {
            // Store the role to move
            roleToMove = node.children[i];

            // Remove the role from its current position
            node.children.splice(i, 1);
            return;
          }

          // Recurse through the children to find the role
          findAndRemoveRole(node.children[i], roleId);
        }
      }
      // Recursive function to find the new parent and insert the role
      function findAndInsertRole(node, newParentId) {
        if (node.id === newParentId) {
          // Add the role under the new parent
          node.children.push(roleToMove);
          return true;
        };
        // Recursively search through children for the new parent
        if (node.children) {
          for (let child of node.children) {
            if (findAndInsertRole(child, newParentId)) {
              return true;
            }
          }
        };

        return false;
      }
      // Start the process by removing the role
      findAndRemoveRole({ children: data }, roleId);

      // If the role was found, insert it into the new parent
      if (roleToMove) {
        findAndInsertRole({ children: data }, newParentId);
      } else {
        console.log(`Role with ID ${roleId} not found.`);
      }

      return data;
    },
    handleNewRole() {
      this.isDrawerOpen = true; // Open the drawer
      this.action = 'add'; // Set action to 'add'
    },
    flattenTree(data) {
      const result = [];
      for (let item of data) {
        result.push({ title: item.title, id: item.id });
        if (item.children && item.children.length > 0) {
          result.push(...this.flattenTree(item.children));
        }
      }
      return result;
    },
    openDrawer(data) {
      console.log({ data });

      let result = { nodeId: null, action: null };

      function recursiveSearch(obj) {
        // Check if the current object has both 'nodeId' and 'action'
        if (obj && typeof obj === 'object') {
          if ('nodeId' in obj && typeof obj.nodeId !== 'object') {
            result.nodeId = obj.nodeId;
          }
          if ('action' in obj) {
            result.action = obj.action;
          }
        }

        // Continue to search deeper if 'nodeId' is an object
        if (obj.nodeId && typeof obj.nodeId === 'object') {
          recursiveSearch(obj.nodeId);
        }
      }
      // Start the recursive search
      recursiveSearch(data);
      console.log({ result });
      this.nodeId = result.nodeId;
      this.action = result.action;
      this.isDrawerOpen = true;
      if (result.action === 'update') {
        this.editData = this.findItemById(this.levels, result.nodeId)
      }
      else {
        this.editData = {};
      }
      console.log({ edit: this.editData })
    },
    closeDrawer() {
      this.isDrawerOpen = false;
    },
    handleRoleSubmission(formData) {
      console.log({ formData })
      this.addSubLevel(this.nodeId, formData)
      this.closeDrawer();
    },
    handleRoleDelete(formData) {
      console.log({ formData })
      console.log(formData.reportingTo)
      this.removeLevel(this.nodeId, formData.reportingto)
      this.closeDrawer();
    },
    generateNewId() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let newId = 'ID-';

      for (let i = 0; i < 8; i++) { // Length can be adjusted
        newId += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      return newId;
    },
    addSameLevel(id) {
      const currentLevel = this.findItemById(this.levels, id);
      if (!currentLevel) {
        console.log("Level not found.");
        return;
      }

      const parent = this.findParentById(this.levels, id);
      if (!parent) {
        console.log("Parent not found.");
        return;
      }

      const newLevel = {
        level: String.fromCharCode(parent.level.charCodeAt(0) + 1),
        title: "New Same Level",
        id: parent.id + "-" + (parent.children.length + 1),
        children: []
      };
      parent.children.push(newLevel);
      console.log("New same level added successfully.");
    },
    addSubLevel(parentId, formData) {
      // Update levels reactively
      const parent = this.findItemById(this.levels, parentId);
      if (!parent) {
        console.log("Parent ID not found.");
        return;
      }
      const newChild = {
        level: formData.roleName.charAt(0).toUpperCase(),
        title: formData.roleName,
        id: this.generateNewId(),
        location: formData.locationId,
        userList: [...formData.selectedUsers],
        children: []
      };
      console.log({ newChild })
      parent.children.push(newChild);
      console.log("New sublevel added successfully.", this.levels);
      this.updateRole(this.levels)
    },
    removeLevel(id, newParentId) {
      const parent = this.findParentById(this.levels, id);
      if (!parent) return;

      const nodeToRemove = parent.children.find(child => child.id === id);
      if (nodeToRemove) {

        // Reassign children to the new parent
        const newParent = this.findItemById(this.levels, newParentId);
        if (newParent) {
          newParent.children.push(...nodeToRemove.children);
        }

        // Remove the node from the parent's children
        parent.children = parent.children.filter(child => child.id !== id);
      }
      this.updateRole(this.levels)
    },
    // findItemById(data, id) {
    //   for (let item of data) {
    //     if (item.id === id) {
    //       return item;
    //     }
    //     if (item.children && item.children.length > 0) {
    //       const found = this.findItemById(item.children, id);
    //       if (found) {
    //         return found;
    //       }
    //     }
    //   }
    //   return null;
    // },
    findItemById(data, id) {
      if (!Array.isArray(data)) {
        console.error("Expected data to be an array, but got:", data);
        return null;
      }
      for (let item of data) {
        if (item.id === id) {
          return item;
        }
        if (item.children && item.children.length > 0) {
          const found = this.findItemById(item.children, id);
          if (found) {
            return found;
          }
        }
      }
      return null;
    },
    updateLevel(formData) {
      this.levels = this.findItemByIdAndUpdate(this.levels, this.nodeId, formData);
      console.log("New sublevel added successfully.", this.levels);
      this.moveRole(this.levels, this.nodeId, formData.roleId);
      this.updateRole(this.levels);

    },
    findItemByIdAndUpdate(data, id, formData) {
      return data.map(item => {
        if (item.id === id) {
          // Updating title and other necessary properties reactively
          return {
            ...item,
            title: formData.roleName,
            userId: formData.userId,
            location: formData.locationId,
            id: id,
            userList: [...formData.selectedUsers],
            level: formData.roleName[0].toUpperCase(),
          };
        }
        if (item.children && item.children.length > 0) {
          return {
            ...item,
            children: this.findItemByIdAndUpdate(item.children, id, formData)
          };
        }
        return item;
      });
    },
    findParentById(data, id) {
      for (let item of data) {
        if (item.children && item.children.some(child => child.id === id)) {
          return item;
        }
        if (item.children && item.children.length > 0) {
          const found = this.findParentById(item.children, id);
          if (found) {
            return found;
          }
        }
      }
      return null;
    },
  },
  mounted() {
    this.getRole();
  }

};
</script>

<style lang="scss">
@import "./userRole.scss";

.heading-color {
  color: #323338;
}
</style>
