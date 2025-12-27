import Link from "next/link";

/*
Home page used as a navigation hub
Allows quick access to all main features for testing and review
*/

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Project Dashboard
          </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600">

            React & Next.js assessment showcasing authentication, dashboards,
            real-time updates, and modern UI patterns.
          </p>
        </header>

        {/* Navigation Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <NavCard
            title="Login"
            description="Simulated authentication with role-based access."
            href="/login"
          />

          <NavCard
            title="Dashboard"
            description="View projects with inline editing, filtering, and pagination."
            href="/dashboard"
          />

          <NavCard
            title="Project Details"
            description="Task management with real-time updates and bulk actions."
            href="/projects/1"
          />
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-slate-500">
          Built with Next.js, TypeScript, React Query, Redux Toolkit, and Tailwind
          CSS.
        </footer>
      </div>
    </div>
  );
}

/*
Reusable navigation card component
Keeps UI consistent and readable
*/
function NavCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
    >
      <h2 className="text-xl font-semibold text-slate-900 group-hover:text-slate-700">
        {title}
      </h2>
      <p className="mt-2 text-slate-600">{description}</p>
      <span className="mt-4 inline-block text-sm font-medium text-slate-500 group-hover:text-slate-700">
        Open →
      </span>
    </Link>
  );
}
