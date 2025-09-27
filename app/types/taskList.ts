export interface Tasklist {
  id: number;
  title: string;
}

export interface TasklistRequest {
  title: string;
}

export interface TasklistResponse {
  status: number;
  message: string;
  data: Tasklist;
}

export interface TasklistsResponse {
  status: number;
  message: string;
  data: Tasklist[];
}
