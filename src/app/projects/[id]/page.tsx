"use client";

import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/services/tasks";

/*
Project details page
Displays tasks and updates in real time
*/

export default function ProjectDetails({ params }: any) {
  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks", params.id],
    queryFn: () => getTasks(params.id),
  });

  return (
    <div className="p-6">
      <h2>Tasks</h2>
      {tasks.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
}
