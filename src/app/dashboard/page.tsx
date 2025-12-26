"use client";

import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { getProjects, updateProject } from "@/services/projects";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { canEditProjects } from "@/utils/roleGuard";
import Filters from "./Filters";
import AdminAnalytics from "./analytics";
import { Project, ProjectStatus } from "@/types/project";
import { ArrowUp, ArrowDown } from "lucide-react";

/* ================= TYPES ================= */

type ProjectsResponse = {
  data: Project[];
  total: number;
};

type UpdateProjectVariables = {
  id: string;
  data: Partial<Project>;
};

type SortBy = "name" | "startDate" | "budget";
type SortOrder = "asc" | "desc";

/* ================= PAGE ================= */

export default function DashboardPage() {
  const queryClient = useQueryClient();

  /* ---------- State ---------- */
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ProjectStatus | undefined>();
  const [sortBy, setSortBy] = useState<SortBy>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  /* ---------- Auth ---------- */
  const role = useSelector((state: RootState) => state.auth.role);
  const canEdit = canEditProjects(role);

  /* ---------- Query ---------- */
  const { data, isLoading } = useQuery<ProjectsResponse>({
    queryKey: ["projects", page, search, status],
    queryFn: () => getProjects({ page, search, status }),
    placeholderData: keepPreviousData,
  });

  /* ---------- Mutation ---------- */
  const mutation = useMutation<void, Error, UpdateProjectVariables>({
    mutationFn: updateProject,

    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["projects"] });

      const previous = queryClient.getQueryData<ProjectsResponse>([
        "projects",
        page,
        search,
        status,
      ]);

      queryClient.setQueryData<ProjectsResponse>(
        ["projects", page, search, status],
        (old) =>
          old
            ? {
                ...old,
                data: old.data.map((p) =>
                  p.id === variables.id
                    ? { ...p, ...variables.data }
                    : p
                ),
              }
            : old
      );

      return { previous };
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  /* ---------- Sorting ---------- */
  const sortedProjects = [...(data?.data ?? [])].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];

    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Projects Dashboard</h1>
        <p className="pt-4 opacity-70">
          Manage, track and update all projects in one place
        </p>
      </div>

      {/* Filters + Sorting */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-black/10 p-4">
        {/* Left */}
        <Filters
          search={search}
          onSearch={setSearch}
          status={status}
          onStatusChange={setStatus}
        />

        {/* Right – Sorting */}
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="rounded-lg border  px-3 py-2 text-sm"
          >
            <option value="name">Name</option>
            <option value="startDate">Start Date</option>
            <option value="budget">Budget</option>
          </select>

          <button
            onClick={() =>
              setSortOrder((o) => (o === "asc" ? "desc" : "asc"))
            }
            className="rounded-lg border bg-white p-2 hover:bg-zinc-100"
            title="Toggle sort order"
          >
            {sortOrder === "asc" ? (
              <ArrowUp size={18} />
            ) : (
              <ArrowDown size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Projects */}
      <div className="space-y-4">
        {sortedProjects.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl bg-white p-5 shadow transition hover:scale-[1.01]"
          >
            <div className="grid grid-cols-6 items-center gap-4">
              {/* Name */}
              <input
                defaultValue={project.name}
                disabled={!canEdit}
                onBlur={(e) =>
                  mutation.mutate({
                    id: project.id,
                    data: { name: e.target.value },
                  })
                }
                className="col-span-2 rounded-lg border px-3 py-2 font-semibold focus:ring-2 focus:ring-indigo-500 disabled:bg-zinc-100"
              />

              {/* Status */}
              <select
                defaultValue={project.status}
                disabled={!canEdit}
                onChange={(e) =>
                  mutation.mutate({
                    id: project.id,
                    data: { status: e.target.value as ProjectStatus },
                  })
                }
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  project.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : project.status === "Completed"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>

              {/* Dates */}
              <div className="text-sm text-zinc-600">
                <div>Start: {project.startDate}</div>
                <div>End: {project.endDate}</div>
              </div>

              {/* Progress */}
              <div>
                <div className="h-2 w-full rounded-full bg-zinc-200">
                  <div
                    className="h-full rounded-full bg-indigo-500"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <div className="mt-1 text-xs">{project.progress}%</div>
              </div>

              {/* Budget */}
              <div className="text-right font-bold">
                ${project.budget.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="rounded-full bg-black/10 px-6 py-2 hover:bg-black/20"
        >
          Prev
        </button>
        <span className="self-center">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="rounded-full bg-black/10 px-6 py-2 hover:bg-black/20"
        >
          Next
        </button>
      </div>

      <AdminAnalytics />
    </div>
  );
}
