import api from '../utils/axios';
import { ref, type Ref } from 'vue';
import type { Task } from '../utils/types';
import type { AxiosError } from 'axios';

type SubmitState = 'idle' | 'submitting' | 'error'| 'success';

/**
 * Composable for creating a new task.
 *
 * Responsibilities:
 * - Send a POST request to the API to create a task.
 * - Track submission status and any error message.
 * - Append the newly created task to the provided tasks list.
 */
export const useSubmitTask = (tasks: Ref<Task[]>) => {
  const submitState = ref<SubmitState>('idle');
  const submitError = ref<string | null>(null);

  const submitTask = async (taskContent: string) => {
    const trimmedTaskContent  = taskContent.trim();

    if (!trimmedTaskContent ) {
      // nothing meaningful to submit
      return;
    }

    // Guard: prevent double-submit spam
    if (submitState.value === 'submitting') {
      return;
    }

    submitState.value = 'submitting';
    submitError.value = null;

    try {
      const response = await api.post<Task>('/tasks', { taskContent: trimmedTaskContent});

      const createdTask  = response.data;

      // Append the new task to the existing list
      tasks.value = [...tasks.value, createdTask ];

      // Mark success before resetting to idle
      submitState.value = 'success';

      //auto reset back to idle after a moment
      setTimeout(() => {
        submitState.value = 'idle';
      }, 1500);

    } catch (error) {
      console.error(error);
      submitState.value = 'error';

      const axiosError = error as AxiosError<{ error?: string }>;
      const apiErrorMessage = axiosError.response?.data?.error;

      submitError.value =
        apiErrorMessage ?? 'Failed to submit task. Please try again.';
    }
  };

  return {
    submitTask,
    submitState,
    submitError,
  };
};