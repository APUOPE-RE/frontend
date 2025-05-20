/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface QuizLineChartData {
  date: string;
  score: number;
  subject: string; // Add subject field
}

export default function QuizLineChart({ data }: { data: QuizLineChartData[] }) {
  return (
    <div className="w-full h-64 p-4 border shadow-md rounded-md">
      <h2 className="text-lg font-semibold text-center">
        Quiz Performance Over Time
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#4F46E5"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded-md shadow-md text-sm">
        <p className="font-semibold">Date: {payload[0].payload.date}</p>
        <p>Score: {payload[0].value}</p>
        <p>{payload[0].payload.subject}</p>
      </div>
    );
  }
  return null;
};
