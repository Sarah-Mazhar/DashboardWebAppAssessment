import { jwtDecode } from "jwt-decode";
import { UserRole } from "@/types/auth";

/*
Decodes JWT and extracts user role.
In real apps, token is issued by backend.
*/

interface JwtPayload {
  role: UserRole;
  email: string;
}

export const decodeToken = (token: string): JwtPayload => {
  return jwtDecode<JwtPayload>(token);
};
