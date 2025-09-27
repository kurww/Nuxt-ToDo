import type { TaskRequest, TaskResponse, TasksResponse } from "~/types/task";

export const createTask = async (
  data: TaskRequest,
  token: string
): Promise<TaskResponse> => {
  const response = await fetch("http://localhost:5713/tasks", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  });
  return await response.json();
};

export const getTasks = async (
  tasklistId: number,
  token: string
): Promise<TasksResponse> => {
  const response = await fetch(
    `http://localhost:5713/tasklists/${tasklistId}/tasks`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
};
