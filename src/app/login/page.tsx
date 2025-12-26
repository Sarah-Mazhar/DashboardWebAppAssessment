"use client";

import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { generateMockToken } from "@/utils/jwt";
import { UserRole } from "@/types/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = (role: UserRole) => {
    const token = generateMockToken({
      role,
      email: email || "test@example.com",
    });

    dispatch(
      loginSuccess({
        token,
        role,
      })
    );

    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow">
        <h1 className="mb-6 text-center text-xl font-semibold">
          Login
        </h1>

        <input
          className="mb-3 w-full rounded border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="mb-4 w-full rounded border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="space-y-2">
          <button
            onClick={() => handleLogin("admin")}
            className="w-full rounded bg-black py-2 text-white"
          >
            Login as Admin
          </button>

          <button
            onClick={() => handleLogin("projectManager")}
            className="w-full rounded bg-zinc-800 py-2 text-white"
          >
            Login as Project Manager
          </button>

          <button
            onClick={() => handleLogin("developer")}
            className="w-full rounded bg-zinc-700 py-2 text-white"
          >
            Login as Developer
          </button>
        </div>
      </div>
    </div>
  );
}
