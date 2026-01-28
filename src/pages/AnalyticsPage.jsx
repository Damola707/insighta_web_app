import React, { useState } from 'react';
import { LineChartCard, BarChartCard } from '../components/Charts';
import { chartData } from '../data/mockData';
import { TrendingUp, PieChart as PieChartIcon, Target, Zap } from 'lucide-react';

export function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const keyMetrics = [
    {
      title: 'Total Revenue',
      value: '$2,543,600',
      change: '+12.5%',
      icon: TrendingUp,
      gradient: 'from-blue-50 to-blue-100'
    },
    {
      title: 'Conversion Rate',
      value: '3.82%',
      change: '+0.45%',
      icon: PieChartIcon,
      gradient: 'from-cyan-50 to-cyan-100'
    },
    {
      title: 'Active Users',
      value: '24,581',
      change: '+8.2%',
      icon: Target,
      gradient: 'from-purple-50 to-purple-100'
    },
    {
      title: 'Growth Rate',
      value: '15.3%',
      change: '+3.1%',
      icon: Zap,
      gradient: 'from-orange-50 to-orange-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
            <TrendingUp size={24} className="text-white" />
          </div>
          <span>Analytics</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Track performance and growth metrics</p>
      </div>

      {/* Period selector */}
      <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg p-2 w-fit border border-gray-200 dark:border-gray-700 shadow-sm">
        {['week', 'month', 'quarter', 'year'].map(period => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-5 py-2.5 rounded-md font-semibold capitalize transition duration-200 ${
              selectedPeriod === period
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-blue-100 hover:to-cyan-100 hover:text-blue-700'
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className={`bg-gradient-to-br ${metric.gradient} rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                </div>
                <div className="w-12 h-12 bg-white dark:bg-gray-800 bg-opacity-50 rounded-lg flex items-center justify-center">
                  <Icon size={24} className="text-gray-700 dark:text-gray-300" />
                </div>
              </div>
              <p className="text-sm font-semibold text-green-600">{metric.change} this period</p>
            </div>
          );
        })}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Daily Revenue</h3>
          <LineChartCard data={chartData.revenue} />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Engagement</h3>
          <BarChartCard data={chartData.users} />
        </div>
      </div>

      {/* Key Metrics and Growth Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:bg-gray-900 -mx-6 px-6 py-2 transition">
              <span className="text-gray-600 dark:text-gray-400">Average Session Duration</span>
              <span className="font-semibold text-gray-900 dark:text-white">4m 32s</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:bg-gray-900 -mx-6 px-6 py-2 transition">
              <span className="text-gray-600 dark:text-gray-400">Bounce Rate</span>
              <span className="font-semibold text-gray-900 dark:text-white">32.5%</span>
            </div>
            <div className="flex justify-between items-center hover:bg-gray-50 dark:bg-gray-900 -mx-6 px-6 py-2 transition">
              <span className="text-gray-600 dark:text-gray-400">Conversion Rate</span>
              <span className="font-semibold text-gray-900 dark:text-white">3.24%</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Growth Trends</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:bg-gray-900 -mx-6 px-6 py-2 transition">
              <span className="text-gray-600 dark:text-gray-400">Month-over-Month</span>
              <span className="font-semibold text-green-600">+12.5%</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:bg-gray-900 -mx-6 px-6 py-2 transition">
              <span className="text-gray-600 dark:text-gray-400">Year-over-Year</span>
              <span className="font-semibold text-green-600">+45.3%</span>
            </div>
            <div className="flex justify-between items-center hover:bg-gray-50 dark:bg-gray-900 -mx-6 px-6 py-2 transition">
              <span className="text-gray-600 dark:text-gray-400">Weekly Average</span>
              <span className="font-semibold text-green-600">+8.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
