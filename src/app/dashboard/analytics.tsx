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

const data = [
  { name: "ERP", progress: 70 },
  { name: "CRM", progress: 45 },
  { name: "Mobile App", progress: 90 },
];

export default function AdminAnalytics() {
  const role = useSelector((state: RootState) => state.auth.role);
  if (role !== "admin") return null;

  return (
    <div className="mt-12 rounded-3xl bg-white/20 p-6 backdrop-blur">
      <h2 className="mb-6 text-2xl font-bold text-black">
        Admin Analytics
      </h2>

      <div className="h-72 rounded-2xl bg-white p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="progress"
              radius={[8, 8, 0, 0]}
              fill="url(#gradient)"
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
