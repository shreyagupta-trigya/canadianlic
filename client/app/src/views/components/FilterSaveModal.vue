<template>
    <teleport to="body">
        <div class="modal fade show modal-overlay" tabindex="-1" style="display: block;" v-if="show">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Save Filter</h5>
                        <button type="button" class="btn-close" @click="$emit('close')">x</button>
                    </div>

                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label fw-semibold text-muted"> Enter Filter Name</label>
                            <input v-model="filterName" type="text" class="form-control"
                                placeholder="e.g. Active Advisors" />
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-secondary" @click="$emit('close')">Cancel</button>
                        <button class="btn btn-primary" @click="handleSave">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>
import { useSavedFilters } from '../../composable/useSavedFilters';

export default {
    name: 'FilterSaveModal',
    props: {
        show: Boolean,
        fields: Object,
        operation: Object,
        moduleKey: {
            type: String,
            required: true
        }
    },
    emits: ['close'],
    data() {
        return {
            filterName: ''
        };
    },
    methods: {
        handleSave() {
            try {
                const { save } = useSavedFilters(this.moduleKey);
                save(this.filterName, this.fields, this.operation);
                this.$emit('close');
            } catch (err) {
                alert(err.message);
            }
        }
    }
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    /* High z-index to float above drawer */
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-dialog {
    width: 500px;
    max-width: 95%;
}
</style>
