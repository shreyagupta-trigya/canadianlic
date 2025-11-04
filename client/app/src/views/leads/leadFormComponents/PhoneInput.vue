<template>
  <div class="phone-field">
    <label v-if="label" class="phone-label">{{ label }}</label>

    <VueTelInput
      v-model="val"
      :defaultCountry="defaultCountry"
      :preferredCountries="preferredCountries"
      :onlyCountries="onlyCountries"
      :autoDefaultCountry="autoDefaultCountry"
      :dropdownOptions="{ showDialCodeInSelection: true }"
      :inputOptions="{ placeholder, showDialCode: true }"
      @blur="$emit('blur')"
      class="phone-input form-control"
    />

    <small v-if="errorText" class="err">{{ errorText }}</small>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'

const props = defineProps({
  modelValue: { type: String, default: '' },          // stores full string (with +code)
  label: { type: String, default: 'Phone' },
  placeholder: { type: String, default: 'Enter phone number' },
  required: { type: Boolean, default: false },
  defaultCountry: { type: String, default: 'IN' },
  autoDefaultCountry: { type: Boolean, default: true },
  preferredCountries: { type: Array, default: () => ['IN','US','GB'] },
  onlyCountries: { type: Array, default: () => [] },
  // simple format guard; set true to enforce + and 8-15 digits
  enforceE164: { type: Boolean, default: true }
})

const emit = defineEmits(['update:modelValue','blur'])

const val = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', normalize(v))
})

function normalize(v) {
  if (!props.enforceE164 || !v) return v || ''
  const cleaned = String(v).replace(/\s|-/g, '')
  // if user types without +, keep as-is; component usually prefixes dial code
  return cleaned
}

const errorText = computed(() => {
  const v = (props.modelValue || '').trim()
  if (props.required && !v) return 'Phone is required'
  if (props.enforceE164 && v) {
    const digits = v.replace(/\s|-/g, '')
    if (!/^\+\d{8,15}$/.test(digits)) return 'Invalid phone format'
  }
  return ''
})
</script>

<style scoped>
.phone-field { display: grid; gap: .25rem; max-width: 420px; }
.phone-label { font-weight: 600; }
.err { color: #d33; }
:deep(.vue-tel-input) { width: 100%; }
</style>
