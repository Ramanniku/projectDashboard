import React from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import data from "../Store/data.json";

function ProjectReportChart() {
  const chartData = data.projectReport.chart;

  return (
    <div className="glass-effect rounded-2xl p-6 border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Project Report</h3>
        <div className="flex gap-2">
          <span className="w-3 h-3 bg-red-400 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
          <span className="w-3 h-3 bg-green-400 rounded-full"></span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={360}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="blue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b5bfd" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#3b5bfd" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="green" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="orange" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" />
          <YAxis tickFormatter={(v) => `${v}K`} />
          <Tooltip
            formatter={(value, name) => [
              `${value}K`,
              name === "tasks"
                ? "Tasks Completed"
                : name === "completed"
                ? "Project Completed"
                : "Upcoming Project"
            ]}
          />

          <Area
            type="monotone"
            dataKey="tasks"
            stroke="#3b5bfd"
            strokeDasharray="5 5"
            fill="url(#blue)"
            strokeWidth={2}
          />

          <Area
            type="monotone"
            dataKey="completed"
            stroke="#22c55e"
            strokeDasharray="5 5"
            fill="url(#green)"
            strokeWidth={2}
          />

          <Area
            type="monotone"
            dataKey="upcoming"
            stroke="#f59e0b"
            strokeDasharray="5 5"
            fill="url(#orange)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProjectReportChart;
