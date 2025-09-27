import { createTask } from "~/services/taskService"; // Add getTasks if missing
import { useTaskList } from "~/composables/useTaskList";
import type { Task, TaskRequest, Tasklist } from "~/types/task";

export const useTask = () => {
  const tasks = ref<Task[]>([]);
  const isLoading = ref(false);
  const errorMessage = ref("");
  const { token } = useAuth();
  const { currentTasklist, fetchCurrentTasklist } = useTaskList();

  const addTask = async (data: TaskRequest) => {
    if (!token.value) return;
    isLoading.value = true;
    errorMessage.value = "";
    try {
      // Ensure a tasklist exists
      if (!currentTasklist.value) {
        await fetchCurrentTasklist();
      }
      // Add tasklistId to data
      const taskData = { ...data, tasklistId: currentTasklist.value!.id };
      await createTask(taskData, token.value);
      await fetchCurrentTasklist(); // Refresh tasks
      navigateTo("/dashboard");
    } catch (error) {
      errorMessage.value = "Failed to create task. Please try again.";
    } finally {
      isLoading.value = false;
    }
  };

  const fetchTasks = async () => {
    if (!token.value || !currentTasklist.value) return;
    isLoading.value = true;
    errorMessage.value = "";
    try {
      const response = await getTasks(currentTasklist.value.id, token.value);
      tasks.value = response.data;
    } catch (error) {
      errorMessage.value = "Failed to load tasks. Please try again.";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    tasks: readonly(tasks),
    isLoading: readonly(isLoading),
    errorMessage: readonly(errorMessage),
    addTask,
    fetchTasks,
  };
};
