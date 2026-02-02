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

  /**
   * data expected format example:
   * [
   *   { month: "Jan", visits: 12 },
   *   { month: "Mar", visits: 5 },
   * ]
   */

  // 🔥 Merge static months + dynamic data
  const chartData = MONTHS.map((month) => {
    const found = data.find(
      (item) =>
        item.month === month ||
        item.name === month
    );

    return {
      name: month,                 //    always static
      visits: found ? Number(found.visits) : 0, //    dynamic
    };
  });

  return (
    <div className="bg-white dark:bg-[#141414] rounded-2xl p-8">
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
    </div>
  );
}
