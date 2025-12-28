import { Project, ProjectStatus } from "@/types/project";
import { fakeDelay } from "./api";

const statuses: ProjectStatus[] = ["Active", "Completed", "On Hold"];

/* ---------- Generate mock projects ---------- */
let projects: Project[] = Array.from({ length: 25 }).map((_, i) => ({
  id: String(i + 1),
  name: `Project ${i + 1}`,
  status: statuses[i % 3],
  startDate: `2024-01-${String((i % 28) + 1).padStart(2, "0")}`,
  endDate: `2024-12-${String((i % 28) + 1).padStart(2, "0")}`,
  progress: Math.floor(Math.random() * 100),
  budget: 10000 + i * 2500,
}));

/* ---------- Types ---------- */
export interface ProjectsQuery {
  search?: string;
  status?: ProjectStatus;
  page?: number;
  limit?: number;
}

/* ---------- Fetch Projects ---------- */

export const getProjectById = async (id: string): Promise<Project> => {
  await fakeDelay();

  const project = projects.find((p) => p.id === id);

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
};

export const getProjects = async ({
  search = "",
  status,
  page = 1,
  limit = 10, // 10 per page
}: ProjectsQuery) => {
  await fakeDelay();

  let filtered = [...projects];

  if (search) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (status) {
    filtered = filtered.filter((p) => p.status === status);
  }

  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    data: filtered.slice(start, end),
    total: filtered.length,
  };
};

/* ---------- Update Project ---------- */
export type UpdateProjectVariables = {
  id: string;
  data: Partial<Project>;
};

export async function updateProject({
  id,
  data,
}: UpdateProjectVariables): Promise<void> {
  await fakeDelay();

  projects = projects.map((p) =>
    p.id === id ? { ...p, ...data } : p
  );
}
