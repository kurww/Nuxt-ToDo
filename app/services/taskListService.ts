import type {
  TasklistRequest,
  TasklistResponse,
  TasklistsResponse,
} from "~/types/task";

export const createTasklist = async (
  data: TasklistRequest,
  token: string
): Promise<TasklistResponse> => {
  return await $fetch("http://localhost:5713/tasklists", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  });
};

export const getTasklists = async (
  token: string
): Promise<TasklistsResponse> => {
  return await $fetch("http://localhost:5713/tasklists", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
};
