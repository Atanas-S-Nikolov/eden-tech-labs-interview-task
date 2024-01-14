<script setup lang="ts">
const hasError = defineModel<boolean>('hasError');
const emit = defineEmits(['change']);

function handleChange(event: Event) {
  emit('change', event);
}
</script>

<template>
  <label for="date_picker">Date:</label>
  <input
    type="date"
    id="date_picker"
    name="date-picker"
    @change="handleChange"
  />
  <p v-if="hasError" id="error_message">Invalid date</p>
</template>

<style scoped>
  #error_message {
    color: red;
    margin-top: 0;
  }
</style>
