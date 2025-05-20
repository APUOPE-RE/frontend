"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#4F46E5", // Indigo
  "#F59E0B", // Amber
  "#10B981", // Emerald
  "#EF4444", // Red
  "#3B82F6", // Blue
  "#A855F7", // Purple
  "#22C55E", // Green
  "#E11D48", // Rose
  "#F97316", // Orange
  "#14B8A6"  // Teal
];

interface QuizPieChartData {
  name: string; // Category/Subject Name
  score: number; // Total Score per Category
}

export default function QuizPieChart({ data }: { data: QuizPieChartData[] }) {
  // Compute total score to calculate percentage
  const totalScore = data.reduce((sum, entry) => sum + entry.score, 0);

  return (
    <div className="w-full h-72 p-4 border shadow-md rounded-md">
      <h2 className="text-lg font-semibold text-center pb-2">Score Distribution by Subject</h2>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="score"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${((value as number) / totalScore * 100).toFixed(1)}%`, "Percentage"]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
