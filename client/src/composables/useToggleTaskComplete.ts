import api from '../utils/axios';
import { ref, type Ref } from 'vue';
import type { Task } from '../utils/types';
import type { AxiosError } from 'axios';

type ToggleState = 'idle' | 'saving' | 'error';

export const useToggleTaskComplete = (tasks: Ref<Task[]>) => {
  const toggleState = ref<ToggleState>('idle');
  const toggleError = ref<string | null>(null);

  const toggleTaskComplete = async (taskId: number, newIsComplete: boolean) => {
    // find the task in local tasks list
    const index = tasks.value.findIndex(t => t.tasksId === taskId);
    if (index === -1) return;

    const originalTask = tasks.value[index];

    // optimistic update
    tasks.value = [
      ...tasks.value.slice(0, index),
      { ...originalTask, isComplete: newIsComplete },
      ...tasks.value.slice(index + 1),
    ];

    toggleState.value = 'saving';
    toggleError.value = null;

    try {
      const response = await api.put<Task>(`/tasks/${taskId}`, {
        isComplete: newIsComplete,
      });

      const updatedTask = response.data;

      // ensure local state matches server
      tasks.value = tasks.value.map(task =>
        task.tasksId === updatedTask.tasksId ? updatedTask : task
      );

      toggleState.value = 'idle';

    } catch (err) {
      console.error(err);

      // revert optimistic update
      tasks.value = [
        ...tasks.value.slice(0, index),
        originalTask,
        ...tasks.value.slice(index + 1),
      ];

      toggleState.value = 'error';

      const axiosError = err as AxiosError<{ error?: string }>;
      const apiErrorMessage = axiosError.response?.data?.error;
      toggleError.value =
        apiErrorMessage ?? 'Failed to update task. Please try again.';
    }
  };

  return {
    toggleTaskComplete,
    toggleState,
    toggleError,
  };
};