"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface QuizBarChartData {
  name: string; // Subject name
  avgScore: number; // Average score per subject
}

export default function QuizBarChart({ data }: { data: QuizBarChartData[] }) {
  return (
    <div className="w-full h-64 p-4 border shadow-md rounded-md">
      <h2 className="text-lg font-semibold text-center">Average Score per Lecture</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value: number) => value.toFixed(1)} />
          <Bar dataKey="avgScore" fill="#10B981" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
