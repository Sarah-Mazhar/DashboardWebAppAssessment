"use client";

import { useState } from "react";
import { TaskPriority, TaskStatus } from "@/types/task";

type AddTaskPayload = {
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo: string;
};

export default function AddTaskForm({
  onAdd,
}: {
  onAdd: (task: AddTaskPayload) => void;
}) {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("Medium");
  const [status, setStatus] = useState<TaskStatus>("Todo");
  const [assignedTo, setAssignedTo] = useState("");

  const reset = () => {
    setTitle("");
    setPriority("Medium");
    setStatus("Todo");
    setAssignedTo("");
  };

  const submit = () => {
    if (!title || !assignedTo) return;

    onAdd({
      title,
      priority,
      status,
      assignedTo,
    });

    reset();
    setOpen(false);
  };

  return (
    <>
      {/* ➕ Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="mb-4 rounded-lg bg-indigo-600 px-4 py-2 text-white"
      >
        Add Task
      </button>

      {/* 🪟 Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-semibold">Add New Task</h3>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Title *
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2"
                  placeholder="Task title"
                />
              </div>

              {/* Assigned To */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Assigned To *
                </label>
                <input
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2"
                  placeholder="Team member"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Priority *
                </label>
                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value as TaskPriority)
                  }
                  className="w-full rounded-lg border px-3 py-2"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Status *
                </label>
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as TaskStatus)
                  }
                  className="w-full rounded-lg border px-3 py-2"
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  reset();
                  setOpen(false);
                }}
                className="rounded-lg border px-4 py-2"
              >
                Cancel
              </button>

              <button
                onClick={submit}
                disabled={!title || !assignedTo}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-white disabled:opacity-50"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
