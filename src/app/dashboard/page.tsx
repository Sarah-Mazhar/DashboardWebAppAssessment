"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjects, updateProject } from "@/services/projects";

/*
Main dashboard displaying projects list
Includes optimistic updates and inline editing
*/

export default function DashboardPage() {
  const queryClient = useQueryClient();

  const { data: projects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const mutation = useMutation({
    mutationFn: updateProject,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["projects"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Projects Dashboard</h1>

      {projects.map((project) => (
        <div key={project.id} className="border p-4 mb-2">
          <input
            defaultValue={project.name}
            onBlur={(e) =>
              mutation.mutate({
                id: project.id,
                data: { name: e.target.value },
              })
            }
          />
        </div>
      ))}
    </div>
  );
}
