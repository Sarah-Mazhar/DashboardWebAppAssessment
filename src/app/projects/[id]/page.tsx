"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTasksByProject } from "@/services/tasks";

/*
Project details page.
Displays tasks related to the selected project.
*/

export default function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ unwrap params (Next.js 15 requirement)
  const { id } = use(params);

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks", id],
    queryFn: () => getTasksByProject(id),
  });

  if (isLoading) {
    return <div className="p-6">Loading project details...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">
        Project Tasks
      </h1>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="rounded-md border bg-white p-4"
          >
            <h3 className="font-medium">{task.title}</h3>
            <p className="text-sm text-slate-600">
              Priority: {task.priority} • Assigned to{" "}
              {task.assignedTo}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
