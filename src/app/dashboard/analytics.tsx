"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/*
Admin-only analytics section.
*/

const data = [
  { name: "ERP", progress: 70 },
  { name: "CRM", progress: 45 },
  { name: "Mobile App", progress: 90 },
];

export default function AdminAnalytics() {
  const role = useSelector((state: RootState) => state.auth.role);

  if (role !== "admin") return null;

  return (
    <div className="mt-8 rounded-xl border bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Admin Analytics
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="progress" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
