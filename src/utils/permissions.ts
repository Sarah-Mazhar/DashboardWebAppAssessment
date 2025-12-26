import { Role } from "@/store/authSlice";

export const canEditProject = (role: Role) =>
  role === "admin" || role === "projectManager";
