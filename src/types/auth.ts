/*
Centralized authentication and role types.
Used across Redux, UI guards, and services.
*/

export type UserRole = "admin" | "projectManager" | "developer";

export interface AuthState {
  token: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
}
