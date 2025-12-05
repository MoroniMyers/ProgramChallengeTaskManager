<template>
  <div class="challenge">
    <div class="wrapper">
      <h1>To do</h1>
      <p v-if="state === 'loading'">Loading...</p>
      <p v-else-if="state === 'failed'">Error fetching data</p>
      <div 
        v-else-if="state === 'loaded'"  
        class="items"
      >
        <TaskDisplay
          v-for="task in tasks"
          :key="task.tasksId"
          :task="task"
        />
        <TaskInput 
        @submit="handleAddTask" 
        :is-submitting="isSubmitting"
        />

         <!-- Simple submission status / error feedback -->
        <p v-if="submitState === 'submitting'" class="status status--info">
          Submitting task...
        </p>
        <p v-else-if="submitState === 'error'" class="status status--error">
          {{ submitError }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

/* components */
import TaskDisplay from './TaskDisplay.vue';
import TaskInput from './TaskInput.vue';

/* composables */
import { useGetTasks } from '../composables/useGetTasks';
import { useSubmitTask } from '../composables/useSubmitTask';

const { tasks, state } = useGetTasks();
const { submitTask, submitState, submitError } = useSubmitTask(tasks);

const isSubmitting = computed(() => submitState.value === 'submitting');

const handleAddTask = (taskToAdd: string) => {
  submitTask(taskToAdd);
}
</script>

<style lang="scss">
.challenge {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .wrapper {
    width: 350px;

    h1 {
      padding: 0px 20px;
      color: var(--color-heading);
      font-weight: 800;
      font-size: var(--fs-5);
    }
    
    .items {
      padding-top: var(--space-3);
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    /*styles for status messages */
    .status {
      padding: 0 var(--space-3);
      font-size: var(--fs-1);

      &.status--info {
        color: var(--color-text-inactive);
      }

      &.status--error {
        color: var(--color-error);
      }
    }
  }
}
</style>
