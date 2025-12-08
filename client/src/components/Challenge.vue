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
        <!-- To-do section -->
        <section class="tasks-section">
          <h2 class="tasks-section__title">To do</h2>

          <TaskDisplay
            v-for="task in todoTasks"
            :key="task.tasksId"
            :task="task"
            :is-saving="isToggling"
            @toggle-complete="handleToggleTask"
          />

          <TaskInput 
          @submit="handleAddTask" 
          :is-submitting="isSubmitting"
          />

          <!-- Simple submission status / error feedback -->
          <p v-if="submitState === 'submitting'" class="status status--info">
            Submitting task...
          </p>
          <p v-if="submitState === 'error'" class="status status--error">
            {{ submitError }}
          </p>
          <p v-if="submitState === 'success'" class="status status--success">
            Task added successfully!
          </p>
        </section>

        <!-- Completed section -->
        <section
          v-if="completedTasks.length"
          class="tasks-section tasks-section--completed"
        >
          <h2 class="tasks-section__title">Completed</h2>

          <TaskDisplay
            v-for="task in completedTasks"
            :key="task.tasksId"
            :task="task"
            :is-saving="isToggling"
            @toggle-complete="handleToggleTask"
          />
        </section>
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
import { useToggleTaskComplete } from '../composables/useToggleTaskComplete';

const { tasks, state } = useGetTasks();
const { submitTask, submitState, submitError } = useSubmitTask(tasks);
const { toggleTaskComplete, toggleState, toggleError } = useToggleTaskComplete(tasks);

const isSubmitting = computed(() => submitState.value === 'submitting');
const isToggling = computed(() => toggleState.value === 'saving');

const todoTasks = computed(() => tasks.value.filter(task => !task.isComplete));
const completedTasks = computed(() => tasks.value.filter(task => task.isComplete));

const handleAddTask = (taskToAdd: string) => {
  submitTask(taskToAdd);
}

const handleToggleTask = (payload: { taskId: number; newIsComplete: boolean }) => {
  toggleTaskComplete(payload.taskId, payload.newIsComplete);
};
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

    .tasks-section {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .tasks-section__title {
      padding: 0 var(--space-3);
      font-size: var(--fs-2);
      font-weight: 600;
      color: var(--color-text-inactive);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .tasks-section--completed .tasks-section__title {
      margin-top: var(--space-2);
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

      &.status--success {
        color: var(--color-success);
      }
    }
  }
}
</style>
