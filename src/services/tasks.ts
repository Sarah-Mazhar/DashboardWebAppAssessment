
/*
Simulated task management with real-time behavior
*/

import { fakeDelay } from "./api";

export type Task = {
  id: string;
  projectId: string;
  title: string;
  priority: "Low" | "Medium" | "High";
  assignedTo: string;
};

let tasks: Task[] = [
  {
    id: "1",
    projectId: "1",
    title: "Design UI",
    priority: "High",
    assignedTo: "Ahmed",
  },
  {
    id: "2",
    projectId: "1",
    title: "Setup API",
    priority: "Medium",
    assignedTo: "Sara",
  },
];

export const getTasksByProject = async (projectId: string) => {
  await fakeDelay();
  return tasks.filter((t) => t.projectId === projectId);
};
