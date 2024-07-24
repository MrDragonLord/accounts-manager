<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps<{
  modelValue?: string | null,
  type?: 'text' | 'email',
  placeholder?: string,
  disabled?: boolean,
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const inputValue = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue
})

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>
<template>
  <input
      :value="modelValue"
      :type="type"
      @input="onInput"
      :placeholder="placeholder"
      :disabled="disabled"
      class="form-control"
  />
</template>