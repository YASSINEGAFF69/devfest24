import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for individual device consumption in kWh
const data = [
  { name: 'Refrigerator', kWh: 50 },
  { name: 'Washing Machine', kWh: 40 },
  { name: 'HVAC', kWh: 130 },
  { name: 'Lights', kWh: 5 },
  { name: 'TV', kWh: 15 },
  { name: 'Dishwasher', kWh: 17 },
];

const CompactDeviceConsumptionChart = () => (
  <ResponsiveContainer width="100%" height={250} >
    <BarChart
      layout="vertical"
      data={data}
      margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis 
        type="number" 
        domain={[0, 2.5]} 
        tick={{ fontSize: 12 }} 
        label={{ value: "kWh", position: "bottom", offset: -10 }} 
      />
      <YAxis 
        dataKey="name" 
        type="category" 
        width={100} 
        tick={{ fontSize: 12 }} 
      />
      <Tooltip />
      <Bar 
        dataKey="kWh" 
        fill="#8884d8" 
        barSize={10} 
        radius={[10, 10, 0, 0]} 
      />
    </BarChart>
  </ResponsiveContainer>
);

export default CompactDeviceConsumptionChart;
