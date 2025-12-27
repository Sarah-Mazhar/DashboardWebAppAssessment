
/*
Simulated task management with real-time behavior
*/

// import { fakeDelay } from "./api";

// export type Task = {
//   id: string;
//   projectId: string;
//   title: string;
//   priority: "Low" | "Medium" | "High";
//   assignedTo: string;
// };

// let tasks: Task[] = [
//   {
//     id: "1",
//     projectId: "1",
//     title: "Design UI",
//     priority: "High",
//     assignedTo: "Ahmed",
//   },
//   {
//     id: "2",
//     projectId: "1",
//     title: "Setup API",
//     priority: "Medium",
//     assignedTo: "Sara",
//   },
// ];

// export const getTasksByProject = async (projectId: string) => {
//   await fakeDelay();
//   return tasks.filter((t) => t.projectId === projectId);
// };


import { Task, TaskPriority, TaskStatus } from "../types/task";
import { fakeDelay } from "./api";
import { realtimeChannel } from "@/lib/realtime";


let tasks: Task[] = [
  {
    id: "1",
    projectId: "1",
    title: "Setup database",
    priority: "High",
    status: "In Progress",
    assignedTo: "Ahmed",
  },
  {
    id: "2",
    projectId: "1",
    title: "Design UI",
    priority: "Medium",
    status: "Todo",
    assignedTo: "Sarah",
  },
];

export const getTasksByProject = async (projectId: string) => {
  await fakeDelay();
  return tasks.filter((t) => t.projectId === projectId);
};

export const addTask = async (task: Omit<Task, "id">) => {
  await fakeDelay();

  const newTask = {
    ...task,
    id: crypto.randomUUID(),
  };

  tasks.push(newTask);

  realtimeChannel.emit({
    type: "TASK_ADDED",
    payload: newTask,
  });
};


export const updateTask = async (
  id: string,
  data: Partial<Task>
) => {
  await fakeDelay();

  tasks = tasks.map((t) =>
    t.id === id ? { ...t, ...data } : t
  );

  realtimeChannel.emit({
    type: "TASK_UPDATED",
    payload: { id, data },
  });
};

export const bulkUpdateTasks = async (
  ids: string[],
  data: Partial<Task>
) => {
  await fakeDelay();

  tasks = tasks.map((t) =>
    ids.includes(t.id) ? { ...t, ...data } : t
  );

  realtimeChannel.emit({
    type: "TASK_BULK_UPDATED",
    payload: { ids, data },
  });
};

