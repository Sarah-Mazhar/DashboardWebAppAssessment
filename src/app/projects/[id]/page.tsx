"use client";

import { use, useEffect } from "react";
import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { getProjectById } from "@/services/projects";
import {
  getTasksByProject,
  bulkUpdateTasks,
  updateTask,
  addTask as addTaskApi,
} from "@/services/tasks";

import { RootState } from "@/store";
import { canEditTasks } from "@/utils/roleGuard";

import { ProjectStatus } from "@/types/project";
import { Task, TaskPriority, TaskStatus } from "@/types/task";

import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import { realtimeChannel } from "@/lib/realtime";
import TaskFilters from "./components/TaskFilters";
import { TaskSkeleton } from '../[id]/components/skeletons/TaskSkeleton';
import { ProjectSkeleton } from "../[id]/components/skeletons/ProjectSkeleton";




/* ================= STYLES ================= */

const statusStyles: Record<ProjectStatus, string> = {
  Active: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
  "On Hold": "bg-amber-100 text-amber-700",
};

/* ================= PAGE ================= */

export default function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ unwrap params (Next.js 15)
  const { id } = use(params);

  /* ---------- Auth ---------- */
  const role = useSelector((state: RootState) => state.auth.role);
  const canEdit = canEditTasks(role);

  /* ---------- State ---------- */
  const [selected, setSelected] = useState<string[]>([]);

  const [filters, setFilters] = useState({
  search: "",
  status: "All" as TaskStatus | "All",
  priority: "All" as TaskPriority | "All",
  assignedTo: "",
});


  /* ---------- React Query ---------- */
  const queryClient = useQueryClient();
  useEffect(() => {
  realtimeChannel.subscribe((event) => {
    queryClient.setQueryData(
      ["tasks", id],
      (old: Task[] | undefined) => {
        if (!old) return old;

        switch (event.type) {
          case "TASK_ADDED":
            return [...old, event.payload];

          case "TASK_UPDATED":
            return old.map((t) =>
              t.id === event.payload.id
                ? { ...t, ...event.payload.data }
                : t
            );

          case "TASK_BULK_UPDATED":
            return old.map((t) =>
              event.payload.ids.includes(t.id)
                ? { ...t, ...event.payload.data }
                : t
            );

          default:
            return old;
        }
      }
    );
  });

  // return () => realtimeChannel.close();
  return () => {
  // no-op (do not close shared channel)
};
}, [id, queryClient]);

  const { data: project, isLoading: projectLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),
  });

  const {
    data: tasks = [],
    isLoading: tasksLoading,
  } = useQuery({
    queryKey: ["tasks", id],
    queryFn: () => getTasksByProject(id),
  });

  const filteredTasks = tasks.filter((task) => {
  const matchesSearch =
    task.title.toLowerCase().includes(filters.search.toLowerCase());

  const matchesStatus =
    filters.status === "All" || task.status === filters.status;

  const matchesPriority =
    filters.priority === "All" ||
    task.priority === filters.priority;

  const matchesAssigned =
    task.assignedTo
      .toLowerCase()
      .includes(filters.assignedTo.toLowerCase());

  return (
    matchesSearch &&
    matchesStatus &&
    matchesPriority &&
    matchesAssigned
  );
});


  /* ---------- Mutations ---------- */

  const bulkMutation = useMutation({
    mutationFn: ({
      ids,
      data,
    }: {
      ids: string[];
      data: Partial<Task>;
    }) => bulkUpdateTasks(ids, data),

    onMutate: async ({ ids, data }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", id] });

      const previous = queryClient.getQueryData<Task[]>(["tasks", id]);

      queryClient.setQueryData<Task[]>(["tasks", id], (old) =>
        old
          ? old.map((t) =>
              ids.includes(t.id) ? { ...t, ...data } : t
            )
          : old
      );

      return { previous };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(["tasks", id], ctx.previous);
      }
    },

    onSuccess: () => {
      setSelected([]);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", id] });
    },
  });

  /* ---------- Handlers ---------- */

  const toggleTask = (taskId: string) => {
    setSelected((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const addTask = (task: {
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo: string;
}) => {
  addTaskApi({
    projectId: id,
    ...task,
  }).then(() =>
    queryClient.invalidateQueries({ queryKey: ["tasks", id] })
  );
};


  const editTask = (taskId: string, data: Partial<Task>) => {
    updateTask(taskId, data).then(() =>
      queryClient.invalidateQueries({ queryKey: ["tasks", id] })
    );
  };

  const bulkMarkDone = () => {
    console.log("BULK CLICK", selected);
    bulkMutation.mutate({
      ids: selected,
      data: { status: "Done" },
    });
  };

  /* ---------- Loading ---------- */
  // if (projectLoading || tasksLoading || !project) {
  //   return <div className="p-6">Loading project...</div>;
  // }
  /* ---------- Loading ---------- */
if (projectLoading) {
  return (
    <div className="p-8">
      <ProjectSkeleton />
    </div>
  );
}

if (!project) {
  return (
    <div className="p-8 text-center text-red-600">
      Failed to load project.
    </div>
  );
}



  /* ================= UI ================= */

  return (
 <div className="min-h-screen space-y-6 p-4 sm:p-6 lg:p-8">
      {/* ================= PROJECT SUMMARY ================= */}
      <div className="rounded-2xl bg-white p-6 shadow">
<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold">{project.name}</h1>

          <span
            className={`rounded-full px-4 py-1 text-sm font-medium ${statusStyles[project.status]}`}
          >
            {project.status}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          <div>
            <p className="text-sm text-zinc-500">Progress</p>
            <div className="mt-2 h-2 w-full rounded-full bg-zinc-200">
              <div
                className="h-full rounded-full bg-indigo-500"
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <p className="mt-1 text-xs">{project.progress}%</p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">Budget</p>
            <p className="mt-2 text-lg font-semibold">
              ${project.budget.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">Start Date</p>
            <p className="mt-2">{project.startDate}</p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">End Date</p>
            <p className="mt-2">{project.endDate}</p>
          </div>
        </div>
      </div>

      {/* ================= TASKS ================= */}
      <div>
        <h2 className="mb-4 text-2xl font-semibold">Tasks</h2>

        <TaskFilters filters={filters} onChange={setFilters} />


        {canEdit && <AddTaskForm onAdd={addTask} />}

        {canEdit && selected.length > 0 && (
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-indigo-50 p-4">
            <button
              onClick={bulkMarkDone}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
            >
              Mark selected as Done
            </button>
            <span className="text-sm text-indigo-700">
              {selected.length} selected
            </span>
          </div>
        )}

       <div className="mt-6">
  {tasksLoading ? (
    <TaskSkeleton />
  ) : filteredTasks.length === 0 ? (
    <div className="rounded-xl border border-dashed p-8 text-center text-zinc-500">
      No tasks match your filters.
    </div>
  ) : (
    <TaskList
      tasks={filteredTasks}
      selected={selected}
      onToggle={toggleTask}
      onEdit={editTask}
      canEdit={canEdit}
    />
  )}
</div>

      </div>
    </div>
  );
}
