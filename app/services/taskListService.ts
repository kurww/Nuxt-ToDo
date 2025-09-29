import type {
  TaskListRequest,
  TaskListResponse,
  TaskListsResponse,
} from "~/types/task";

export const createTaskList = async (
  data: TaskListRequest,
  token: string
): Promise<TaskListResponse> => {
  const config = useRuntimeConfig();
  return await $fetch(`${config.public.apiBase}/tasklists`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  });
};

export const getTaskList = async (token: string): Promise<TaskListResponse> => {
  const config = useRuntimeConfig();
  return await $fetch(`${config.public.apiBase}/tasklists`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
};
