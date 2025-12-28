"use client";

import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { generateMockToken } from "@/utils/jwt";
import { MOCK_USERS } from "@/utils/authConfig";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    const role = MOCK_USERS[email];

    if (!role) {
      setError("Invalid credentials");
      return;
    }

    const token = generateMockToken({ email, role });

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
          aria-label="Email"
        />

        <input
          className="mb-3 w-full rounded border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Password"
        />

        {error && (
          <p role="alert" className="mb-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          className="w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700"
        >
          Login
        </button>

        <div className="mt-4 text-xs text-zinc-500">
          <p>Admin: admin@demo.com</p>
          <p>PM: pm@demo.com</p>
          <p>Dev: dev@demo.com</p>
          <p>Password: anything</p>
        </div>
      </div>
    </div>
  );
}
