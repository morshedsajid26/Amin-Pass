"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", tenants: 30 },
  { name: "Feb", tenants: 15 },
  { name: "Mar", tenants: 45 },
  { name: "Apr", tenants: 30 },
  { name: "May", tenants: 70 },
  { name: "Jun", tenants: 25 },
  { name: "July", tenants: 18 },
  { name: "Aug", tenants: 27 },
  { name: "Sep", tenants: 38 },
  { name: "Oct", tenants: 37 },
  { name: "Nov", tenants: 55 },
  { name: "Dec", tenants: 80 },
];

export default function CustomerVisitChart() {
  return (
    <div className="bg-white  dark:bg-[#141414] rounded-2xl p-8">
      
      <ResponsiveContainer width="100%" height={350} style={{ border: 'none' }}>
        <BarChart width={500}
        height={400}
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: -25,
          bottom: 0,
        }}>
          <XAxis dataKey="name"
          axisLine={false}
          tickLine={false}
           tick={{
            fill: '#6D6E73',
            fontSize: 14,
            fontFamily: 'inter'
          }}
          />
          <YAxis 
          axisLine={false}
          tickLine={false}
           tick={{
            fill: '#6D6E73',
            fontSize: 14,
            fontFamily: 'inter'
          }}
           />
          <Tooltip />
          <Bar dataKey="tenants" fill="#D9DFFF" radius={[6, 6, 0, 0] } barSize={60}
           />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
