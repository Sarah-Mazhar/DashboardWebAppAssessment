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
import { useRouter } from "next/navigation";
import DashboardSkeleton from "./skeletons/DashboardSkeleton";

/* ================= TYPES ================= */

type ProjectsResponse = {
    data: Project[];
    total: number;
};

type UpdateProjectVariables = {
    id: string;
    data: Partial<Project>;
};

type SortBy = "name" | "startDate" | "budget" | "progress";
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
        queryFn: () =>
            getProjects({
                page,
                limit: 10,
                search,
                status,
            }),
        placeholderData: keepPreviousData,
    });

    const router = useRouter();


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
    const handleHeaderSort = (key: SortBy) => {
        if (sortBy === key) {
            setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
        } else {
            setSortBy(key);
            setSortOrder("asc");
        }
    };

    const sortedProjects = [...(data?.data ?? [])].sort((a, b) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];

        if (typeof aVal === "number" && typeof bVal === "number") {
            return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
        }

        return sortOrder === "asc"
            ? String(aVal).localeCompare(String(bVal))
            : String(bVal).localeCompare(String(aVal));
    });

    const SortIcon = ({ column }: { column: SortBy }) => (
        <span className="flex flex-col leading-none">
            <ArrowUp
                size={12}
                className={
                    sortBy === column && sortOrder === "asc"
                        ? "text-black"
                        : "text-zinc-400"
                }
            />
            <ArrowDown
                size={12}
                className={
                    sortBy === column && sortOrder === "desc"
                        ? "text-black"
                        : "text-zinc-400"
                }
            />
        </span>
    );

    // if (isLoading) {
    //     return (
    //         <div className="flex h-screen items-center justify-center">
    //             Loading dashboard...
    //         </div>
    //     );
    // }

    if (isLoading) {
  return <DashboardSkeleton />;
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

            {/* Filters */}
            <div className="mb-6 rounded-2xl bg-black/10 p-4">
                <Filters
                    search={search}
                    onSearch={setSearch}
                    status={status}
                    onStatusChange={setStatus}
                />
            </div>

            {/* ===== Column Headers ===== */}
            <div className="sticky top-0 z-10 mb-2 rounded-2xl bg-white/80 px-5 py-3 backdrop-blur">
                <div className="grid grid-cols-6 items-center gap-4 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    <button
                        onClick={() => handleHeaderSort("name")}
                        className="col-span-2 flex items-center gap-2 hover:text-black"
                    >
                        Name <SortIcon column="name" />
                    </button>

                    <div>Status</div>

                    <button
                        onClick={() => handleHeaderSort("startDate")}
                        className="flex items-center gap-2 hover:text-black"
                    >
                        Timeline <SortIcon column="startDate" />
                    </button>

                    <button
                        onClick={() => handleHeaderSort("progress")}
                        className="flex items-center gap-2 hover:text-black"
                    >
                        Progress <SortIcon column="progress" />
                    </button>

                    <button
                        onClick={() => handleHeaderSort("budget")}
                        className="flex items-center justify-end gap-2 hover:text-black"
                    >
                        Budget <SortIcon column="budget" />
                    </button>
                </div>
            </div>

            {/* ===== Project Cards ===== */}
            <div className="space-y-4">
                {sortedProjects.map((project) => (
                    <div
                        key={project.id}
                        onClick={() => router.push(`/projects/${project.id}`)}
                        className="cursor-pointer rounded-2xl bg-white p-5 shadow transition hover:scale-[1.01] hover:bg-zinc-50"
                    >

                        <div className="grid grid-cols-6 items-center gap-4">
                            <input
                                onClick={(e) => e.stopPropagation()}
                                defaultValue={project.name}
                                disabled={!canEdit}
                                onBlur={(e) =>
                                    mutation.mutate({
                                        id: project.id,
                                        data: { name: e.target.value },
                                    })
                                }
                                className="col-span-2 rounded-lg border px-3 py-2 font-semibold disabled:bg-zinc-100"
                            />

                            <select
                                onClick={(e) => e.stopPropagation()}
                                defaultValue={project.status}
                                disabled={!canEdit}
                                onChange={(e) =>
                                    mutation.mutate({
                                        id: project.id,
                                        data: { status: e.target.value as ProjectStatus },
                                    })
                                }
                                className={`
    rounded-full px-3 py-1 text-sm font-medium
    border border-transparent
    focus:outline-none focus:ring-2 focus:ring-indigo-300
    disabled:opacity-70 disabled:cursor-not-allowed
    ${project.status === "Active"
                                        ? "bg-emerald-100 text-emerald-700"
                                        : project.status === "Completed"
                                            ? "bg-sky-100 text-sky-700"
                                            : "bg-amber-100 text-amber-700"
                                    }
  `}
                            >
                                <option value="Active" className="text-black">
                                    Active
                                </option>
                                <option value="Completed" className="text-black">
                                    Completed
                                </option>
                                <option value="On Hold" className="text-black">
                                    On Hold
                                </option>
                            </select>


                            <div className="text-sm text-zinc-600">
                                <div>Start: {project.startDate}</div>
                                <div>End: {project.endDate}</div>
                            </div>

                            <div>
                                <div className="h-2 w-full rounded-full bg-zinc-200">
                                    <div
                                        className="h-full rounded-full bg-indigo-500"
                                        style={{ width: `${project.progress}%` }}
                                    />
                                </div>
                                <div className="mt-1 text-xs">{project.progress}%</div>
                            </div>

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
