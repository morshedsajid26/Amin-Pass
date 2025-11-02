"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "High Priority", value: 40, color: "#878D96" },
  { name: "Medium Priority", value: 20, color: "#C1C7CD" },
  { name: "Low Priority", value: 30, color: "#A2A9B0" },
];

export default function SupportTicketChart() {
  return (
    <div className="bg-white rounded-2xl p-5  flex flex-col items-center">
      

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            startAngle={90}
             endAngle={-270}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <ul className="mt-4 w-full">
        {data.map((item, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="text-xl font-inter">{item.name}</span>
            </div>
            <span className=" text-xl font-inter ">{item.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
