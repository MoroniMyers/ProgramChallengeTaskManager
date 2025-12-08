<template>
  <div 
  class="task-display"
  :class="{ 'task-display--completed': task.isComplete }"
  >
    <label class="task-display__checkbox-wrapper">
      <input
        type="checkbox"
        class="task-display__checkbox"
        :checked="task.isComplete"
        :disabled="isSaving"
        @change="onToggle"
      />
      <span class="task-display__checkbox-custom"></span>
    </label>

    <p class="task-display__text">
      {{ task.content }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '../utils/types';

const props = defineProps<{
  task: Task;
  isSaving?: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggle-complete', payload: { taskId: number; newIsComplete: boolean }): void;
}>();

const onToggle = () => {
  emit('toggle-complete', {
    taskId: props.task.tasksId,
    newIsComplete: !props.task.isComplete,
  });
};
</script>

<style scoped lang="scss">
.task-display {
  display: flex;
  align-items: center;
  gap: var(--space-2);

  color: var(--color-heading);
  font-size: var(--fs-3);
  font-weight: 500;

  box-shadow: var(--box-shadow-1);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--border-radius-1);
  background: var(--color-input-background);

  transition:
    background-color 0.15s ease,
    box-shadow 0.15s ease,
    transform 0.05s ease;
}

.task-display:hover {
  box-shadow: var(--box-shadow-2);
  transform: translateY(-1px);
}

.task-display--completed .task-display__text {
  color: var(--color-text-inactive);
  text-decoration: line-through;
}

.task-display__checkbox-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.task-display__checkbox {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.task-display__checkbox-custom {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid var(--color-border-light);
  background: var(--color-input-background-extra-light);
  box-sizing: border-box;

  transition:
    background-color 0.12s ease,
    border-color 0.12s ease,
    box-shadow 0.12s ease;
}

.task-display__checkbox:checked + .task-display__checkbox-custom {
  background: var(--color-accent-one);
  border-color: var(--color-accent-one);
  box-shadow: 0 0 0 2px var(--color-accent-one-transparent);
}

.task-display__checkbox:focus-visible + .task-display__checkbox-custom {
  box-shadow: 0 0 0 2px var(--color-accent-two);
}

.task-display__checkbox:disabled + .task-display__checkbox-custom {
  opacity: 0.6;
}

.task-display__text {
  flex: 1;
}
</style>
