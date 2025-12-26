import { jwtDecode } from "jwt-decode";
import { UserRole } from "@/types/auth";

/*
Mock JWT utilities for frontend-only authentication.
Simulates backend-issued JWT with role-based claims.
*/

export type AppJwtPayload = {
  email: string;
  role: UserRole;
};

/**
 * Generates a fake JWT (header.payload.signature)
 * Used only for frontend assessment purposes.
 */
export const generateMockToken = (payload: AppJwtPayload): string => {
  const header = btoa(JSON.stringify({ alg: "none", typ: "JWT" }));
  const body = btoa(JSON.stringify(payload));
  const signature = "mock-signature";

  return `${header}.${body}.${signature}`;
};

/**
 * Decodes JWT and extracts app-specific payload
 */
export const decodeToken = (token: string): AppJwtPayload => {
  return jwtDecode<AppJwtPayload>(token);
};
