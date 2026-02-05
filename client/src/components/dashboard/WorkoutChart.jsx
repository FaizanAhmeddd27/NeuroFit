import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import Card from '../common/Card';

const WorkoutChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-custom-lg border border-gray-100">
          <p className="font-semibold text-gray-900 mb-1">{label}</p>
          <p className="text-blue-600 font-bold">
            {payload[0].value} workouts
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
            Workout Progress
          </h3>
          <p className="text-sm text-gray-600">Last 7 days activity</p>
        </div>
        <div className="px-4 py-2 bg-blue-50 rounded-lg">
          <p className="text-xs font-semibold text-blue-600 uppercase">Trending</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorWorkouts" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#4A90E2" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="date"
            stroke="#6B7280"
            style={{ fontSize: '10px', fontWeight: '500' }}
            tick={{ fontSize: 10 }}
            interval="preserveStartEnd"
          />
          <YAxis
            stroke="#6B7280"
            style={{ fontSize: '10px', fontWeight: '500' }}
            tick={{ fontSize: 10 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#4A90E2"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorWorkouts)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default WorkoutChart;