"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjects, updateProject } from "@/services/projects";
import { useSelector } from "react-redux";
import { RootState } from "@/store";


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


    const role = useSelector((state: RootState) => state.auth.role);
    const canEdit = role === "admin" || role === "projectManager";

    return (
        <div className="p-6">
            <h1 className="text-xl mb-4">Projects Dashboard</h1>

            <p className="mb-4 text-sm text-slate-600">
                Logged in as: <span className="font-medium">{role}</span>
            </p>


            {projects.map((project) => (
                <div key={project.id} className="border p-4 mb-2">
                    <input
                        defaultValue={project.name}
                        disabled={!canEdit}
                        className={`border px-2 py-1 rounded ${!canEdit ? "bg-slate-100 cursor-not-allowed" : ""
                            }`}
                        onBlur={(e) =>
                            canEdit &&
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
