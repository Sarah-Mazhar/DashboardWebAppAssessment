import { UserRole } from "@/types/auth";

/*
Utility helpers for role-based permissions.
*/

export const canEditProjects = (role: UserRole | null) => {
  return role === "admin" || role === "projectManager";
};

export const canViewAnalytics = (role: UserRole | null) => {
  return role === "admin";
};
