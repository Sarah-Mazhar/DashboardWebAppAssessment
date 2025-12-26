import { fakeDelay } from "./api";

/*
Simulated task management with real-time behavior
*/

let tasks = [
  {
    id: "1",
    projectId: "1",
    title: "Design UI",
    priority: "High",
    assignedTo: "John",
  },
];

export const getTasks = async (projectId: string) => {
  await fakeDelay();
  return tasks.filter((t) => t.projectId === projectId);
};
