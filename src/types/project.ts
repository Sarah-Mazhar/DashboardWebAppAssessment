export type ProjectStatus = "Active" | "Completed" | "On Hold";

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  progress: number;
  budget: number;
}
