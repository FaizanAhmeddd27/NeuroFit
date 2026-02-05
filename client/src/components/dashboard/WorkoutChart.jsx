import React from 'react';
import {
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
        <div className="bg-white p-3 sm:p-4 rounded-xl shadow-custom-lg border border-gray-100">
          <p className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{label}</p>
          <p className="text-blue-600 font-bold text-sm sm:text-base">
            {payload[0].value} workouts
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-full lg:col-span-1">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
            Workout Progress
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">Last 7 days activity</p>
        </div>
        <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-50 rounded-lg">
          <p className="text-xs font-semibold text-blue-600 uppercase">Trending</p>
        </div>
      </div>
      
      {/* Chart Container - Scrollable on mobile */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[300px] sm:min-w-full">
          <ResponsiveContainer width="100%" height={250} minWidth={300}>
            <AreaChart 
              data={data}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorWorkouts" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4A90E2" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="date"
                stroke="#6B7280"
                style={{ fontSize: '10px', fontWeight: '500' }}
                tick={{ fontSize: 10 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={50}
              />
              <YAxis
                stroke="#6B7280"
                style={{ fontSize: '10px', fontWeight: '500' }}
                tick={{ fontSize: 10 }}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#4A90E2"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorWorkouts)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export default WorkoutChart;