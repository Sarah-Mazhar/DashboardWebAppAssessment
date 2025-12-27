"use client";

import { TaskPriority, TaskStatus } from "@/types/task";

type Filters = {
  search: string;
  status: TaskStatus | "All";
  priority: TaskPriority | "All";
  assignedTo: string;
};

export default function TaskFilters({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (filters: Filters) => void;
}) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 rounded-xl bg-white p-4 shadow sm:grid-cols-2 lg:grid-cols-4">
      {/* 🔍 Search */}
      <input
        placeholder="Search by task name"
        value={filters.search}
        onChange={(e) =>
          onChange({ ...filters, search: e.target.value })
        }
        className="rounded-lg border px-3 py-2"
      />

      {/* Status */}
      <select
        value={filters.status}
        onChange={(e) =>
          onChange({
            ...filters,
            status: e.target.value as Filters["status"],
          })
        }
        className="rounded-lg border px-3 py-2"
      >
        <option value="All">All Statuses</option>
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      {/* Priority */}
      <select
        value={filters.priority}
        onChange={(e) =>
          onChange({
            ...filters,
            priority: e.target.value as Filters["priority"],
          })
        }
        className="rounded-lg border px-3 py-2"
      >
        <option value="All">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      {/* Assigned To */}
      <input
        placeholder="Assigned to"
        value={filters.assignedTo}
        onChange={(e) =>
          onChange({
            ...filters,
            assignedTo: e.target.value,
          })
        }
        className="rounded-lg border px-3 py-2"
      />
    </div>
  );
}
