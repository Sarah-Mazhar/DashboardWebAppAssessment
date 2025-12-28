"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authSlice";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";

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
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <nav className="flex items-center gap-6">
          <Link href="/dashboard" className="font-semibold text-slate-900">
            Project Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            {role?.toUpperCase()}
          </span>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white transition hover:bg-slate-800"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
