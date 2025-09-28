import {
  createTask,
  updateTask,
  deleteTask as deleteTaskService,
} from "~/services/taskService";
import { useTaskList } from "~/composables/useTaskList";
import type {
  Task,
  TaskRequest,
  TaskResponse,
  TaskUpdateRequest,
} from "~/types/task";

export const useTask = () => {
  const tasks = ref<Task[]>([]);
  const isLoading = ref(false);
  const errorMessage = ref("");
  const { token } = useAuth();
  const { currentTasklist, fetchCurrentTaskList } = useTaskList();

  const addTask = async (data: TaskRequest) => {
    if (!token.value) return;
    isLoading.value = true;
    errorMessage.value = "";
    try {
      const response: TaskResponse = await createTask(data, token.value);
      if (response.status === 201 || response.status === 200) {
        navigateTo("/dashboard");
      } else {
        errorMessage.value = response.message || "Failed to create task";
      }
    } catch (error: any) {
      errorMessage.value = error?.message || "Failed to create task";
    } finally {
      isLoading.value = false;
    }
  };

  const updateTaskStatus = async (id: number, data: TaskUpdateRequest) => {
    if (!token.value) return;
    isLoading.value = true;
    errorMessage.value = "";
    try {
      const response: TaskResponse = await updateTask(id, data, token.value); // Now calls the service function
      if (response.status === 200 || response.status === 201) {
        // Refresh the tasklist to sync with server
        await fetchCurrentTaskList();
      } else {
        errorMessage.value = response.message || "Failed to update task";
      }
    } catch (error: any) {
      errorMessage.value = error?.message || "Failed to update task";
    } finally {
      isLoading.value = false;
    }
  };

  const deleteTask = async (id: number) => {
    if (!token.value) return;
    isLoading.value = true;
    errorMessage.value = "";
    try {
      const response: TaskResponse = await deleteTaskService(id, token.value); // Now calls the service function
      if (response.status === 200 || response.status === 201) {
        // Refresh the tasklist to sync with server
        await fetchCurrentTaskList();
      } else {
        errorMessage.value = response.message || "Failed to delete task";
      }
    } catch (error: any) {
      errorMessage.value = error?.message || "Failed to delete task";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    tasks: readonly(tasks),
    isLoading: readonly(isLoading),
    errorMessage: readonly(errorMessage),
    addTask,
    updateTaskStatus,
    deleteTask,
  };
};
