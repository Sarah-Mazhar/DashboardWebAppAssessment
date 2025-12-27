"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addTaskSchema,
  AddTaskFormValues,
} from "@/validation/taskSchema";
import { TaskPriority, TaskStatus } from "@/types/task";
import { useState } from "react";

export default function AddTaskForm({
  onAdd,
}: {
  onAdd: (task: AddTaskFormValues) => void;
}) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddTaskFormValues>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      priority: "Medium",
      status: "Todo",
    },
  });

  const submit = (data: AddTaskFormValues) => {
    onAdd(data);
    reset();
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mb-4 rounded-lg bg-indigo-600 px-4 py-2 text-white"
      >
        Add Task
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          role="dialog"
          aria-modal="true"
        >
          <form
            onSubmit={handleSubmit(submit)}
            className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg"
          >
            <h3 className="mb-4 text-xl font-semibold">Add New Task</h3>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium">
                  Title *
                </label>
                <input
                  {...register("title")}
                  className="w-full rounded-lg border px-3 py-2"
                />
                {errors.title && (
                  <p className="text-sm text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Assigned To */}
              <div>
                <label className="block text-sm font-medium">
                  Assigned To *
                </label>
                <input
                  {...register("assignedTo")}
                  className="w-full rounded-lg border px-3 py-2"
                />
                {errors.assignedTo && (
                  <p className="text-sm text-red-600">
                    {errors.assignedTo.message}
                  </p>
                )}
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium">
                  Priority *
                </label>
                <select
                  {...register("priority")}
                  className="w-full rounded-lg border px-3 py-2"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium">
                  Status *
                </label>
                <select
                  {...register("status")}
                  className="w-full rounded-lg border px-3 py-2"
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  reset();
                  setOpen(false);
                }}
                className="rounded-lg border px-4 py-2"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-white disabled:opacity-50"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
