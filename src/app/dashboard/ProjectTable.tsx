import { Project } from "@/types/project";

export default function ProjectTable({
  projects,
}: {
  projects: Project[];
}) {
  return (
    <div className="rounded-xl border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-zinc-100">
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Progress</th>
            <th>Budget</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((p) => (
            <tr key={p.id} className="border-t">
              <td>{p.name}</td>
              <td>{p.status}</td>
              <td>{p.progress}%</td>
              <td>${p.budget}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
