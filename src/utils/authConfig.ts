import { UserRole } from "@/types/auth";

export const MOCK_USERS: Record<string, UserRole> = {
  "admin@demo.com": "admin",
  "pm@demo.com": "projectManager",
  "dev@demo.com": "developer",
};
