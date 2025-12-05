<template>
  <form class="task-input" @submit.prevent="onSubmit">
    <input
      v-model="newTask"
      class="task-input__field"
      type="text"
      placeholder="Add a new task..."
      @keydown.enter.prevent="onSubmit"
    />

    <button
      type="submit"
      class="task-input__button"
      :disabled="isButtonDisabled"
    >
      <span v-if="isSubmitting">Adding...</span>
      <span v-else>ADD</span>
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  isSubmitting?: boolean;
}>();

/**
 * Emits:
 *  - submit: when the user submits a non-empty value.
 *    The payload is the trimmed string.
 */
const emit = defineEmits<{
  (e: 'submit', taskToAdd: string): void
}>()

const newTask = ref('')

const isInputEmpty = computed(() => !newTask.value.trim());
const isSubmitting = computed(() => props.isSubmitting === true);
const isButtonDisabled = computed(
  () => isInputEmpty.value || isSubmitting.value
);


const onSubmit = () => {
  const trimmed = newTask.value.trim()
  if (!trimmed) return

  emit('submit', trimmed)
  newTask.value = ''
}
</script>

<style scoped lang="scss">

.task-input {
  display: flex;
  align-items: center;
  gap: var(--space-2);

  padding: var(--space-2) var(--space-3);
  border-radius: var(--border-radius-1);
  box-shadow: var(--box-shadow-1);

  background: var(--color-input-background-extra-light);
}

.task-input__field {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;

  font-size: var(--fs-3);
  color: var(--color-text);
}

.task-input__field::placeholder {
  color: var(--color-text-inactive);
  font-style: italic;
}

/* Input focus */
.task-input__field:focus-visible {
  outline: none;
}

/* mimic a subtle focus by adjusting bg of the container when field is focused */
.task-input:focus-within {
  background: var(--color-input-background-light);
}

/* ADD button */
.task-input__button {
  border: none;
  border-radius: 999px;

  padding: 4px 14px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  background: var(--color-contrast-one);
  color: var(--color-heading);

  box-shadow: var(--box-shadow-1);
  cursor: pointer;

  transition:
    transform 0.08s ease,
    box-shadow 0.08s ease,
    background-color 0.08s ease,
    color 0.08s ease;
}

/* Hover and focus states */
.task-input__button:hover:not(:disabled),
.task-input__button:focus-visible:not(:disabled) {
  background: var(--color-contrast-two);
  box-shadow: var(--box-shadow-2);
  transform: translateY(-1px);
}

/* Pressed state */
.task-input__button:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: var(--box-shadow-1);
}

/* Disabled when the input is empty */
.task-input__button:disabled {
  opacity: 0.5;
  cursor: default;
  box-shadow: none;
}
</style>
