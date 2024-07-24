<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

const props = defineProps<{
  modelValue: string
  placeholder?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
}>()

const inputValue = ref(props.modelValue)
const showPassword = ref(false)

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue
})

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const inputType = ref('password')
watch(showPassword, (newValue) => {
  inputType.value = newValue ? 'text' : 'password'
})
</script>
<template>
  <div class="form-password">
    <input
        :type="inputType"
        :value="modelValue"
        @input="onInput"
        @blur="emit('blur')"
        :placeholder="placeholder"
        :disabled="disabled"
        class="form-control"
    />
    <button type="button" @click="togglePasswordVisibility" class="btn toggle-button">
      <font-awesome-icon :icon="['fas', 'eye']" v-if="showPassword" />
      <font-awesome-icon :icon="['fas', 'eye-slash']" v-else />
    </button>
  </div>
</template>
<style scoped lang="scss">
  .form-password {
    position: relative;

    .form-control {
      padding: 0.375rem 2.5rem 0.375rem 0.75rem;
    }

    .toggle-button {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
</style>