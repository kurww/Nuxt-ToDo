export interface Task {
  id: number;
  title: string;
  taskListId: number;
  completed: boolean;
}

export interface TaskRequest {
  title: string;
  completed: boolean;
  taskListId: number;
}

export interface TaskResponse {
  status: number;
  message: string;
  validation: null;
  data: {
    id: number;
    title: string;
    taskListId: number;
    completed: boolean;
  };
}

export interface TaskUpdateRequest {
  completed: boolean;
}
