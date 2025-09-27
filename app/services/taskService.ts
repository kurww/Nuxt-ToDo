import type {
  TaskRequest,
  TaskResponse,
  TaskUpdateRequest,
} from "~/types/task";

export const createTask = async (
  data: TaskRequest,
  token: string
): Promise<TaskResponse> => {
  const response = await fetch("http://localhost:5713/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const updateTask = async (
  id: number,
  data: Partial<TaskUpdateRequest>,
  token: string
): Promise<TaskResponse> => {
  const response = await fetch(`http://localhost:5713/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};


