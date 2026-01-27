import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function MetricCard({ label, value, change, trend }) {
  const isPositive = trend === 'up';
  
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 border border-gray-100">
      <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide">{label}</p>
      <p className="text-3xl font-bold text-gray-900 mt-3">{value}</p>
      <div className={`flex items-center mt-4 font-semibold text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        <span className="ml-1">{change}</span>
      </div>
    </div>
  );
}

export function LineChartCard({ data, title }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
          <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#FFF' }}
            cursor={{ stroke: '#3B82F6', strokeWidth: 2 }}
          />
          <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BarChartCard({ data, title }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
          <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#FFF' }}
          />
          <Legend />
          <Bar dataKey="active" fill="#3B82F6" radius={[8, 8, 0, 0]} />
          <Bar dataKey="inactive" fill="#E5E7EB" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
