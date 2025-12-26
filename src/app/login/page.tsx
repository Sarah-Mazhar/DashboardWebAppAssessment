"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/store/authSlice";

/*
Role-based login simulation
*/

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = (
    role: "admin" | "projectManager" | "developer"
  ) => {
    dispatch(login(role));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <h1 className="text-2xl font-bold mb-2">Login</h1>
        <p className="text-slate-600 mb-6">
          Choose a role to continue
        </p>

        <div className="space-y-3">
          <button
            onClick={() => handleLogin("admin")}
            className="w-full rounded-lg bg-slate-900 px-4 py-3 text-white hover:bg-slate-800"
          >
            Admin
          </button>

          <button
            onClick={() => handleLogin("projectManager")}
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-white hover:bg-indigo-500"
          >
            Project Manager
          </button>

          <button
            onClick={() => handleLogin("developer")}
            className="w-full rounded-lg border px-4 py-3 hover:bg-slate-50"
          >
            Developer
          </button>
        </div>
      </div>
    </div>
  );
}
