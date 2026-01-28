import React from 'react';
import { MetricCard, LineChartCard, BarChartCard } from '../components/Charts';
import { metrics, chartData } from '../data/mockData';
import { Activity, Clock, Zap, TrendingUp, Users, DollarSign, BarChart3 } from 'lucide-react';

export function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Key Metrics */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Metrics</h2>
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
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg shadow hover:shadow-lg transition border border-blue-200 dark:border-blue-700 p-6 transform hover:scale-105 duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2 uppercase tracking-wider">Peak Activity</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">2:30 PM</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Today</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <Activity size={32} className="text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg shadow hover:shadow-lg transition border border-green-200 dark:border-green-700 p-6 transform hover:scale-105 duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2 uppercase tracking-wider">Response Time</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">245ms</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-2">↓ 12% from last week</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                <Clock size={32} className="text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg shadow hover:shadow-lg transition border border-purple-200 dark:border-purple-700 p-6 transform hover:scale-105 duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2 uppercase tracking-wider">System Uptime</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">99.98%</p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">Excellent</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Zap size={32} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 dark:from-slate-800 dark:to-blue-800 rounded-lg shadow-lg p-8 text-white border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Quick Overview</h2>
          <div className="px-3 py-1 bg-blue-600 rounded-full text-xs font-semibold">
            Last 30 days
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-blue-200 text-sm font-semibold">Total Transactions</p>
              <div className="w-10 h-10 bg-blue-600/30 rounded-lg flex items-center justify-center">
                <BarChart3 size={20} className="text-blue-300" />
              </div>
            </div>
            <p className="text-3xl font-bold">2,543</p>
            <p className="text-xs text-green-400 mt-2">↑ 8.2% vs last month</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-blue-200 text-sm font-semibold">Active Users</p>
              <div className="w-10 h-10 bg-cyan-600/30 rounded-lg flex items-center justify-center">
                <Users size={20} className="text-cyan-300" />
              </div>
            </div>
            <p className="text-3xl font-bold">1,234</p>
            <p className="text-xs text-green-400 mt-2">↑ 12.5% vs last month</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-blue-200 text-sm font-semibold">Revenue (Monthly)</p>
              <div className="w-10 h-10 bg-emerald-600/30 rounded-lg flex items-center justify-center">
                <DollarSign size={20} className="text-emerald-300" />
              </div>
            </div>
            <p className="text-3xl font-bold">$125.4K</p>
            <p className="text-xs text-green-400 mt-2">↑ 18.7% vs last month</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-blue-200 text-sm font-semibold">Growth Rate</p>
              <div className="w-10 h-10 bg-purple-600/30 rounded-lg flex items-center justify-center">
                <TrendingUp size={20} className="text-purple-300" />
              </div>
            </div>
            <p className="text-3xl font-bold text-green-400">↑ 12.5%</p>
            <p className="text-xs text-blue-200 mt-2">Above target</p>
          </div>
        </div>
      </div>

      {/* Recent Activity or Additional Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">New user registration</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Payment received</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Report generated</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Performing</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Premium Plan</span>
              </div>
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">+45%</span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Enterprise Plan</span>
              </div>
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">+32%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Basic Plan</span>
              </div>
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">+28%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}