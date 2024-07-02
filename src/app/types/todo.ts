export interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
  assignedTo?: string;
  day?: string;
  repoName?: string;
}
