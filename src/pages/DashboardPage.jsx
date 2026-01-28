import React from 'react';
import { MetricCard, LineChartCard, BarChartCard } from '../components/Charts';
import { metrics, chartData } from '../data/mockData';
import { Activity, Clock, Zap } from 'lucide-react';

export function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Performance Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((metric, idx) => (
            <MetricCard key={idx} {...metric} />
          ))}
        </div>
      </div>

      {/* Charts */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Analytics Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LineChartCard data={chartData.revenue} title="Revenue Trend" />
          <BarChartCard data={chartData.users} title="User Activity" />
        </div>
      </div>

      {/* Status indicators */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow hover:shadow-lg transition border border-blue-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2 uppercase tracking-wider">Peak Activity</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">2:30 PM</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Today</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Activity size={32} className="text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow hover:shadow-lg transition border border-green-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2 uppercase tracking-wider">Response Time</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">245ms</p>
                <p className="text-xs text-green-600 mt-2">↓ 12% from last week</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <Clock size={32} className="text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow hover:shadow-lg transition border border-purple-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2 uppercase tracking-wider">System Uptime</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">99.98%</p>
                <p className="text-xs text-purple-600 mt-2">Excellent</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap size={32} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-lg shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-6">Quick Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-blue-200 text-sm font-semibold mb-2">Total Transactions</p>
            <p className="text-3xl font-bold">2,543</p>
          </div>
          <div>
            <p className="text-blue-200 text-sm font-semibold mb-2">Active Users</p>
            <p className="text-3xl font-bold">1,234</p>
          </div>
          <div>
            <p className="text-blue-200 text-sm font-semibold mb-2">Revenue (Monthly)</p>
            <p className="text-3xl font-bold">$125.4K</p>
          </div>
          <div>
            <p className="text-blue-200 text-sm font-semibold mb-2">Growth Rate</p>
            <p className="text-3xl font-bold text-green-400">↑ 12.5%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

