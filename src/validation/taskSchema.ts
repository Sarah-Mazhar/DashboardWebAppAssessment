import { z } from "zod";

export const addTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  assignedTo: z.string().min(1, "Assigned user is required"),
  priority: z.enum(["Low", "Medium", "High"]),
  status: z.enum(["Todo", "In Progress", "Done"]),
});

export type AddTaskFormValues = z.infer<typeof addTaskSchema>;
