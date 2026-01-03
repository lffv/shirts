<template>
  <div class="base-input-wrapper">
    <label v-if="label" :for="id" class="base-input-label">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :id="id"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :class="[
        'base-input',
        {
          'border-red-500 focus:ring-red-500': error,
          'border-gray-300 focus:ring-blue-500': !error,
        },
      ]"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    />
    <p v-if="error" class="base-input-error">{{ error }}</p>
    <p v-if="hint" class="base-input-hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue: string;
  type?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  disabled: false,
  required: false,
  id: () => `input-${Math.random().toString(36).substr(2, 9)}`,
});

defineEmits<{
  "update:modelValue": [value: string];
  blur: [];
  focus: [];
}>();
</script>

<style scoped>
.base-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.base-input-label {
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--secondary);
}

.base-input {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: white;
}

.base-input:focus {
  outline: none;
  ring: 2px;
}

.base-input:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}

.base-input-error {
  font-size: 0.875rem;
  color: #ef4444;
}

.base-input-hint {
  font-size: 0.875rem;
  color: #6b7280;
}
</style>
