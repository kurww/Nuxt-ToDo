import { getTaskList, createTaskList } from "~/services/taskListService";
import type {
  TaskList,
  TaskListRequest,
  TaskListResponse,
} from "~/types/taskList";

export const useTaskList = () => {
  const currentTasklist = ref<TaskList | null>(null);
  const isLoading = ref(false);
  const errorMessage = ref("");
  const { token } = useAuth();

  const fetchTaskList = async () => {
    if (!token.value) return;
    isLoading.value = true;
    errorMessage.value = "";
    try {
      const response: TaskListResponse = await getTaskList(token.value);
      if (response.status === 200) {
        currentTasklist.value = response.data;
      }
    } catch (error) {
      errorMessage.value = "Failed to load tasklists. Please try again.";
    } finally {
      isLoading.value = false;
    }
  };

  const addTaskList = async (data: TasklistRequest) => {
    if (!token.value) return;
    isLoading.value = true;
    errorMessage.value = "";
    try {
      await createTaskList(data, token.value);
      await fetchTaskList();
    } catch (error) {
      errorMessage.value = "Failed to create tasklist. Please try again.";
    } finally {
      isLoading.value = false;
    }
  };

  const fetchCurrentTaskList = async () => {
    await fetchTaskList();
    if (!currentTasklist.value) {
      // Auto-create if none exists
      await addTaskList({ title: "My Tasks" });
    }
  };

  const clearError = () => {
    errorMessage.value = "";
  };

  return {
    currentTasklist: readonly(currentTasklist),
    isLoading: readonly(isLoading),
    errorMessage: readonly(errorMessage),
    fetchTaskList,
    addTaskList,
    fetchCurrentTaskList,
    clearError,
  };
};
