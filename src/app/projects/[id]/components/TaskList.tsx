"use client";

import { Task, TaskPriority, TaskStatus } from "@/types/task";

export default function TaskList({
  tasks,
  selected,
  onToggle,
  onEdit,
  canEdit,
}: {
  tasks: Task[];
  selected: string[];
  onToggle: (id: string) => void;
  onEdit: (id: string, data: Partial<Task>) => void;
  canEdit: boolean;
}) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex flex-col gap-4 rounded-xl border bg-white p-4 sm:flex-row sm:items-center sm:justify-between">


          {/* LEFT */}
          <div className="flex items-start gap-3">
            {/* <input
              type="checkbox"
              checked={selected.includes(task.id)}
              onChange={() => onToggle(task.id)}
            /> */}
            <input
              type="checkbox"
              aria-label={`Select task ${task.title}`}
              checked={selected.includes(task.id)}
              onChange={() => onToggle(task.id)}
            />


            <div>
              {/* 🔹 Title */}
              <p className="font-medium">{task.title}</p>

              {/* 🔹 Assigned To */}
              <p className="text-sm text-zinc-500">
                Assigned to:{" "}
                <span className="font-medium text-zinc-700">
                  {task.assignedTo}
                </span>
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">

            {/* Priority */}
            <select
              disabled={!canEdit}
              value={task.priority}
              onChange={(e) =>
                onEdit(task.id, {
                  priority: e.target.value as TaskPriority,
                })
              }
              className="rounded-lg border px-2 py-1 text-sm"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            {/* Status */}
            <select
              disabled={!canEdit}
              value={task.status}
              onChange={(e) =>
                onEdit(task.id, {
                  status: e.target.value as TaskStatus,
                })
              }
              className="rounded-lg border px-2 py-1 text-sm"
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
