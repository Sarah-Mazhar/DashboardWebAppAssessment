"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjects, updateProject } from "@/services/projects";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import AdminAnalytics from "./analytics";
import { canEditProjects } from "@/utils/roleGuard";

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
        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: ["projects"] });

            const previousProjects =
                queryClient.getQueryData<any[]>(["projects"]);

            queryClient.setQueryData<any[]>(["projects"], (old) =>
                old?.map((p) =>
                    p.id === variables.id ? { ...p, ...variables.data } : p
                )
            );

            return { previousProjects };
        },
        onError: (_err, _vars, context) => {
            queryClient.setQueryData(["projects"], context?.previousProjects);
        },
        onSettled: () => {
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
                    {/* <input
                        disabled={!canEditProjects(role)}
                        defaultValue={project.name}
                        // disabled={!canEdit}
                        className={`border px-2 py-1 rounded ${!canEdit ? "bg-slate-100 cursor-not-allowed" : ""
                            }`}
                        onBlur={(e) =>
                            canEdit &&
                            mutation.mutate({
                                id: project.id,
                                data: { name: e.target.value },
                            })
                        }
                    /> */}

                    <input
                        disabled={!canEditProjects(role)}
                        defaultValue={project.name}
                        onBlur={(e) =>
                            canEdit &&
                            mutation.mutate({
                                id: project.id,
                                data: { name: e.target.value },
                            })
                        }
                        className="disabled:cursor-not-allowed disabled:bg-zinc-100"
                    />

                </div>
            ))}
            <AdminAnalytics />
        </div>
    );

}
