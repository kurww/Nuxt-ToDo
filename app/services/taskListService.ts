import type {
  TaskListRequest,
  TaskListResponse,
  TaskListsResponse,
} from "~/types/task";

export const createTaskList = async (
  data: TaskListRequest,
  token: string
): Promise<TaskListResponse> => {
  return await $fetch("http://localhost:5713/tasklists", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  });
};

export const getTaskList = async (token: string): Promise<TaskListResponse> => {
  return await $fetch("http://localhost:5713/tasklists", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
};
