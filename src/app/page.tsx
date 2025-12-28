import Link from "next/link";
import { CheckCircle, Shield, BarChart3, Users } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-20 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900">
          Project Management Dashboard
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          A modern project & task management platform demonstrating
          authentication, role-based access control, real-time updates,
          dashboards, and analytics.
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            href="/login"
            className="rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow hover:bg-indigo-700 transition"
          >
            Get Started → Login
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Feature
            icon={<Shield className="h-6 w-6 text-indigo-600" />}
            title="JWT Authentication"
            text="Simulated JWT login with Admin, Project Manager, and Developer roles."
          />

          <Feature
            icon={<Users className="h-6 w-6 text-indigo-600" />}
            title="Role-Based Access"
            text="Different permissions for editing projects, tasks, and analytics."
          />

          <Feature
            icon={<CheckCircle className="h-6 w-6 text-indigo-600" />}
            title="Task Management"
            text="Create, update, filter, and bulk-edit tasks with real-time updates."
          />

          <Feature
            icon={<BarChart3 className="h-6 w-6 text-indigo-600" />}
            title="Analytics & Charts"
            text="Admin-only project progress analytics using Recharts."
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-white py-6 text-center text-sm text-slate-500">
        Built with Next.js, TypeScript, Redux Toolkit, React Query & Tailwind CSS
      </footer>
    </main>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
        {icon}
      </div>
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{text}</p>
    </div>
  );
}
