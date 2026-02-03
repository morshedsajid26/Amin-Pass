"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CustomerVisitChart({ data = [] }) {
  // 🔒 Static months (always show)
  const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  // 🔒 Process data
  const chartData = MONTHS.map((month) => {
    const found = data.find(
      (item) =>
        item.month?.toLowerCase() === month.toLowerCase() ||
        item.name?.toLowerCase() === month.toLowerCase()
    );

    // Support multiple key names: visits, visit, value
    const visits = found 
      ? Number(found.visits ?? found.visit ?? found.value ?? 0) 
      : 0;

    return {
      name: month,
      visits: visits,
    };
  });

  // Debug log
  console.log("CustomerVisitChart - Input data:", data);
  console.log("CustomerVisitChart - Processed chartData:", chartData);

  return (
    <div className="bg-white dark:bg-[#141414] rounded-2xl p-8">
      {data.length === 0 ? (
        <div className="h-[350px] flex items-center justify-center text-gray-500">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
          >
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#6D6E73",
                fontSize: 14,
                fontFamily: "inter",
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#6D6E73",
                fontSize: 14,
                fontFamily: "inter",
              }}
            />
            <Tooltip />
            <Bar
              dataKey="visits"
              fill="#D9DFFF"
              radius={[6, 6, 0, 0]}
              barSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
