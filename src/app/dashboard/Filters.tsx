import { ProjectStatus } from "@/types/project";

type Props = {
  search: string;
  onSearch: (v: string) => void;
  status?: ProjectStatus;
  onStatusChange: (v?: ProjectStatus) => void;
};

export default function Filters({
  search,
  onSearch,
  status,
  onStatusChange,
}: Props) {
  return (
    <div className="flex gap-4">
      <input
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search projects..."
        className="border px-3 py-1 rounded"
      />

      <select
        value={status ?? ""}
        onChange={(e) =>
          onStatusChange(
            e.target.value
              ? (e.target.value as ProjectStatus)
              : undefined
          )
        }
        className="border px-3 py-1 rounded"
      >
        <option value="">All</option>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
        <option value="On Hold">On Hold</option>
      </select>
    </div>
  );
}
