import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';
import Card from '../common/Card';

const CalorieChart = ({ data, calorieGoal }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-custom-lg border border-gray-100">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          <p className="text-green-600 font-bold">
            {payload[0].value} kcal
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Goal: {calorieGoal} kcal
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-full lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            Calorie Intake
          </h3>
          <p className="text-sm text-gray-600">Daily consumption tracking</p>
        </div>
        <div className="px-4 py-2 bg-green-50 rounded-lg">
          <p className="text-xs font-semibold text-green-600 uppercase">Nutrition</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="date"
            stroke="#6B7280"
            style={{ fontSize: '12px', fontWeight: '500' }}
          />
          <YAxis
            stroke="#6B7280"
            style={{ fontSize: '12px', fontWeight: '500' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={calorieGoal}
            stroke="#F59E0B"
            strokeDasharray="3 3"
            label={{ value: 'Goal', position: 'right', fill: '#F59E0B' }}
          />
          <Bar
            dataKey="calories"
            fill="url(#barGradient)"
            radius={[8, 8, 0, 0]}
          />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CalorieChart;