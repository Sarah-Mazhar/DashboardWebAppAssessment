/* ===============================
   Task Types
   =============================== */

export type TaskPriority = "Low" | "Medium" | "High";

export type TaskStatus = "Todo" | "In Progress" | "Done";

export interface Task {
  id: string;
  projectId: string;

  title: string;
  description?: string;

  priority: TaskPriority;
  status: TaskStatus;

  assignedTo: string;

  createdAt?: string;
  updatedAt?: string;
}
