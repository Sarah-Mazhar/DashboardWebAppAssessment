"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

/*
Visualizes project progress over time
*/

export default function ProjectProgressChart({ data }: any) {
  return (
    <LineChart width={400} height={200} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line dataKey="progress" />
    </LineChart>
  );
}
