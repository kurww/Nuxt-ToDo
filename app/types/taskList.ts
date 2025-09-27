import type { Task } from "~/types/task";

export interface TaskList {
  id: number;
  title: string;
  userId: number;
  tasks: Task[];
}

export interface TaskListRequest {
  title: string;
}

export interface TaskListResponse {
  status: number;
  message: string;
  data: TaskList;
}
