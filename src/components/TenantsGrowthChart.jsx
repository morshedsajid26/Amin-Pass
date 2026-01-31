"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";


export default function TenantsGrowthChart({ data = [] }) {

   const chartData = data.map((item) => ({
    name: item.month,
    tenants: item.count,
  }));
  return (
    <div className="bg-white rounded-2xl p-8">
      
      <ResponsiveContainer width="100%" height={300} >
        <BarChart width={500}
        height={400}
        data={chartData}
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
          <Bar dataKey="tenants" fill="#D9DFFF" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
