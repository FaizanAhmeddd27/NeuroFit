import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import Card from '../common/Card';

const CalorieChart = ({ data, calorieGoal }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 sm:p-4 rounded-xl shadow-custom-lg border border-gray-100">
          <p className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{label}</p>
          <p className="text-green-600 font-bold text-sm sm:text-base">
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
    <Card className="col-span-full lg:col-span-1">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
            Calorie Intake
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">Daily consumption tracking</p>
        </div>
        <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-green-50 rounded-lg">
          <p className="text-xs font-semibold text-green-600 uppercase">Nutrition</p>
        </div>
      </div>
      
      {/* Chart Container - Scrollable on mobile */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[300px] sm:min-w-full">
          <ResponsiveContainer width="100%" height={250} minWidth={300}>
            <BarChart 
              data={data}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
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
              <ReferenceLine
                y={calorieGoal}
                stroke="#F59E0B"
                strokeDasharray="3 3"
                label={{ 
                  value: 'Goal', 
                  position: 'right', 
                  fill: '#F59E0B',
                  fontSize: 10
                }}
              />
              <Bar
                dataKey="calories"
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export default CalorieChart;