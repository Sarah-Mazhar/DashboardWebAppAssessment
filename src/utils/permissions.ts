import { UserRole  } from "@/types/auth";

export const canEditProject = (role: UserRole ) =>
  role === "admin" || role === "projectManager";
