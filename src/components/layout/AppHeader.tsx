"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authSlice";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";

/*
Global application header.
Displays navigation, current role, and logout action.
*/

export default function AppHeader() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, role } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <nav className="flex items-center gap-6">
          <Link href="/" className="font-semibold text-slate-900">
            Project Dashboard
          </Link>
          <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600">
            Role: <strong>{role}</strong>
          </span>
          <button
            onClick={handleLogout}
            className="rounded-md bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-800"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
