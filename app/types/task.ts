export interface Task {
  id: string;
  title: string;
  tasklistId: number;
  completed: boolean;
}

export interface TaskRequest {
  title: string;
  tasklistId: number;
  completed: boolean;
}

export interface TaskResponse {
  id: string;
  title: string;
  tasklistId: number;
  completed: boolean;
}

export interface TasksResponse {
  status: number;
  message: string;
  data: Task[];
}
