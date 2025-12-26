"use client";

import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/authSlice";

/*
Simple login screen
Simulates JWT authentication
*/

export default function LoginPage() {
  const dispatch = useDispatch();

  const handleLogin = (role: "Admin" | "ProjectManager" | "Developer") => {
    dispatch(
      loginSuccess({
        token: "fake-jwt-token",
        role,
      })
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center gap-4">
      <button onClick={() => handleLogin("Admin")}>Login as Admin</button>
      <button onClick={() => handleLogin("ProjectManager")}>
        Login as Manager
      </button>
      <button onClick={() => handleLogin("Developer")}>
        Login as Developer
      </button>
    </div>
  );
}
