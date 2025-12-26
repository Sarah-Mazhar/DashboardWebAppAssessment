import { Project, ProjectStatus } from "@/types/project";
import { fakeDelay } from "./api";

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
  {
    id: "2",
    name: "CRM Platform",
    status: "Completed",
    startDate: "2023-01-01",
    endDate: "2023-10-01",
    progress: 100,
    budget: 30000,
  },
];

export interface ProjectsQuery {
  search?: string;
  status?: ProjectStatus;
  page?: number;
  limit?: number;
}

export const getProjects = async ({
  search = "",
  status,
  page = 1,
  limit = 5,
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
export type UpdateProjectVariables = {
  id: string;
  data: Partial<Project>;
};

export async function updateProject({
  id,
  data,
}: UpdateProjectVariables): Promise<void> {
  // mock delay
  await new Promise((res) => setTimeout(res, 300));

  console.log("Updating project", id, data);

  // REAL API EXAMPLE:
  // await axios.patch(`/api/projects/${id}`, data);
}
