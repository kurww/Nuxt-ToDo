import { getTasklists, createTasklist } from "~/services/taskListService";
import type { Tasklist, TasklistRequest } from "~/types/task";

export const useTaskList = () => {
  const tasklists = ref<Tasklist[]>([]);
  const currentTasklist = ref<Tasklist | null>(null); // Single tasklist per user
  const isLoading = ref(false);
  const errorMessage = ref("");
  const { token } = useAuth();

  const fetchTasklists = async () => {
    if (!token.value) return;
    isLoading.value = true;
    errorMessage.value = "";
    try {
      const response = await getTasklists(token.value);
      if (response.status === 200) {
        tasklists.value = response.data;
        // Set current tasklist to the first (or only) one
        currentTasklist.value = tasklists.value[0] || null;
      }
    } catch (error) {
      errorMessage.value = "Failed to load tasklists. Please try again.";
    } finally {
      isLoading.value = false;
    }
  };

  const addTasklist = async (data: TasklistRequest) => {
    if (!token.value) return;
    isLoading.value = true;
    errorMessage.value = "";
    try {
      await createTasklist(data, token.value);
      await fetchTasklists(); // Refresh to update currentTasklist
    } catch (error) {
      errorMessage.value = "Failed to create tasklist. Please try again.";
    } finally {
      isLoading.value = false;
    }
  };

  const fetchCurrentTasklist = async () => {
    await fetchTasklists();
    if (!currentTasklist.value) {
      // Auto-create if none exists
      await addTasklist({ title: "My Tasks" });
    }
  };

  const clearError = () => {
    errorMessage.value = "";
  };

  return {
    tasklists: readonly(tasklists),
    currentTasklist: readonly(currentTasklist),
    isLoading: readonly(isLoading),
    errorMessage: readonly(errorMessage),
    fetchTasklists,
    addTasklist,
    fetchCurrentTasklist,
    clearError,
  };
};
