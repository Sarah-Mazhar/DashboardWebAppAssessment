import { fakeDelay } from "./api";

/*
Mock projects dataset
Acts as an in-memory database
*/

export type Project = {
  id: string;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  progress: number;
  budget: number;
};

let projects: Project[] = [
  {
    id: "1",
    name: "ERP System",
    status: "Active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    progress: 70,
    budget: 50000,
  },
];

export const getProjects = async (): Promise<Project[]> => {
  await fakeDelay();
  return projects;
};

export const updateProject = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<Project>;
}): Promise<Project[]> => {
  await fakeDelay();
  projects = projects.map((p) => (p.id === id ? { ...p, ...data } : p));
  return projects;
};
