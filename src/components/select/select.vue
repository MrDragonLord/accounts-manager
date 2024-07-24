<script setup lang="ts">
import { defineProps, defineModel, ref, watch } from 'vue'

interface Option {
  value: string | number
  label: string
}

defineProps<{
  options: Option[],
  disabled?: boolean,
}>()

const model = defineModel<string | number>({
  default: '',
});
</script>
<template>
  <select
      v-model="model"
      :disabled="disabled"
      class="form-select">
    <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>