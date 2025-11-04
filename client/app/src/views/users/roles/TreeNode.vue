<template>

    <li class="">
        <div class="treeview__level " :data-level="node.level">
            <div class="treeview__level-btns d-flex gap-2 justify-content-around align-items-center">
                <span @mouseleave="hideDialogue()" @mouseover="ShowDialogue(node.id)" class="level-title">{{ node.title
                    }}</span>

                <div class="level-add" @click.stop="openDrawer(node.id, 'add')">
                    <span class="fa fa-circle-plus"></span>
                </div>
                <div class="level-add" @click.stop="openDrawer(node.id, 'delete')">
                    <span class="fa fa-trash text-danger"></span>
                </div>
                <div v-if="node.childIndex !== '1'" class="level-add" @click.stop="openDrawer(node.id, 'update')">
                    <span class="fa fa-pencil "></span>
                </div>
            </div>
            <div class="card shadow-lg border rounded bg-white p-4 popupcard" style="z-index: 9999;
             width: 40rem; 
             position: absolute; 
             top: -10rem;
             left: 30rem; 
             transform: translateX(-50%);
             max-height:30rem; 
             overflow:scroll" 
             v-if="this.ShowDialogueId === node.id">
                <section>
                    <h4 class="mb-4 text-primary font-weight-bold">
                        Location: {{ getLocationName(node.location) }}
                    </h4>
                    <div v-for="(item, idx) in node.userList" :key="idx" class="">
                        <div class="row align-items-center">
                            <div class="col-3">
                                <p class="mb-1 font-weight-bold text-muted">Employee Name:</p>
                            </div>
                            <div class="col-9">
                                <p class="mb-0">{{ item && item.name ?  item.name :'' }}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <ul v-if="node.children && node.children.length > 0">
            <tree-node v-for="(child, childIndex) in node.children" :key="childIndex" :node="child"
                @add-same-level="addSameLevel" @add-sub-level="addSubLevel" @remove-level="removeLevel"
                @open-drawer="openDrawer" @mouseleave="hideDialogue()" @mouseover="ShowDialogue"></tree-node>
        </ul>
    </li>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';
import { putUrl } from '../../../boot/axios';
export default {
    name: "TreeNode",
    props: {
        node: Object
    },
    data() {
        return {
            ShowDialogueId: '',
            locationList: reactive([])

        }
    },
    mounted() {
        this.fetchLocations();
    },
    methods: {
        getLocationName(id) {
            console.log({ id })
            const temp = this.locationList.find((item) => item.ROWID === id)
            return temp.name
        },
        async fetchLocations() {
            try {
                const response = await axios.get(`${putUrl}lead/api/v1/get-locations`);
                this.locationList = response?.data?.locations
                console.log("loca", this.locationList)
                return response.data?.locations;
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        },
        ShowDialogue(id) {
            this.ShowDialogueId = id
        },
        hideDialogue() {
            this.ShowDialogueId = ''
        },
        addSameLevel(id) {
            this.$emit('add-same-level', id);
        },
        addSubLevel(id) {
            this.$emit('add-sub-level', id);
        },
        removeLevel(id) {
            this.$emit('remove-level', id);
        },
        openDrawer(nodeId, action) {
            const data = {
                nodeId,
                action
            }
            console.log('Node ID:', nodeId,);
            this.isDrawerOpen = true;
            this.$emit('open-drawer', data);
        }

    }

};
</script>
<style scoped>
.popupcard ::-webkit-scrollbar {
    display: none !important;
}

.popupcard {
    scrollbar-width: none;
    /* For Firefox */
}
</style>