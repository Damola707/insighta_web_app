import React, { useState, useMemo } from 'react';
import { LineChartCard, BarChartCard } from '../components/Charts';
import { chartData } from '../data/mockData';
import { TrendingUp, PieChart as PieChartIcon, Target, Zap } from 'lucide-react';

export function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Data for different periods
  const periodData = {
    week: {
      metrics: {
        revenue: { value: '$487,200', change: '+8.3%' },
        conversionRate: { value: '3.65%', change: '+0.32%' },
        activeUsers: { value: '18,245', change: '+5.7%' },
        growthRate: { value: '12.8%', change: '+2.4%' }
      },
      keyMetrics: {
        sessionDuration: '4m 12s',
        bounceRate: '34.2%',
        conversion: '3.12%'
      },
      growthTrends: {
        weekOverWeek: '+8.3%',
        monthOverMonth: '+6.2%',
        dailyAverage: '+4.1%'
      }
    },
    month: {
      metrics: {
        revenue: { value: '$2,543,600', change: '+12.5%' },
        conversionRate: { value: '3.82%', change: '+0.45%' },
        activeUsers: { value: '24,581', change: '+8.2%' },
        growthRate: { value: '15.3%', change: '+3.1%' }
      },
      keyMetrics: {
        sessionDuration: '4m 32s',
        bounceRate: '32.5%',
        conversion: '3.24%'
      },
      growthTrends: {
        monthOverMonth: '+12.5%',
        yearOverYear: '+45.3%',
        weeklyAverage: '+8.2%'
      }
    },
    quarter: {
      metrics: {
        revenue: { value: '$7,892,400', change: '+18.7%' },
        conversionRate: { value: '4.12%', change: '+0.68%' },
        activeUsers: { value: '31,429', change: '+11.4%' },
        growthRate: { value: '18.9%', change: '+4.2%' }
      },
      keyMetrics: {
        sessionDuration: '4m 58s',
        bounceRate: '29.8%',
        conversion: '3.67%'
      },
      growthTrends: {
        quarterOverQuarter: '+18.7%',
        yearOverYear: '+52.3%',
        monthlyAverage: '+14.2%'
      }
    },
    year: {
      metrics: {
        revenue: { value: '$28,456,800', change: '+45.3%' },
        conversionRate: { value: '4.45%', change: '+1.12%' },
        activeUsers: { value: '42,857', change: '+24.6%' },
        growthRate: { value: '22.7%', change: '+6.8%' }
      },
      keyMetrics: {
        sessionDuration: '5m 15s',
        bounceRate: '27.3%',
        conversion: '4.08%'
      },
      growthTrends: {
        yearOverYear: '+45.3%',
        previousYear: '+38.7%',
        quarterlyAverage: '+18.5%'
      }
    }
  };

  // Get current period data
  const currentData = useMemo(() => periodData[selectedPeriod], [selectedPeriod]);

  const keyMetrics = [
    {
      title: 'Total Revenue',
      value: currentData.metrics.revenue.value,
      change: currentData.metrics.revenue.change,
      icon: TrendingUp,
      gradient: 'from-blue-50 to-blue-100'
    },
    {
      title: 'Conversion Rate',
      value: currentData.metrics.conversionRate.value,
      change: currentData.metrics.conversionRate.change,
      icon: PieChartIcon,
      gradient: 'from-cyan-50 to-cyan-100'
    },
    {
      title: 'Active Users',
      value: currentData.metrics.activeUsers.value,
      change: currentData.metrics.activeUsers.change,
      icon: Target,
      gradient: 'from-purple-50 to-purple-100'
    },
    {
      title: 'Growth Rate',
      value: currentData.metrics.growthRate.value,
      change: currentData.metrics.growthRate.change,
      icon: Zap,
      gradient: 'from-orange-50 to-orange-100'
    }
  ];

  // Growth trends based on selected period
  const getGrowthTrends = () => {
    const trends = currentData.growthTrends;
    const trendKeys = Object.keys(trends);
    
    return trendKeys.map(key => ({
      label: key.split(/(?=[A-Z])/).map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join('-'),
      value: trends[key]
    }));
  };

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
                : 'text-gray-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 hover:text-blue-700 dark:hover:text-blue-400'
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
          const isPositive = metric.change.startsWith('+');
          
          return (
            <div 
              key={index} 
              className={`bg-gradient-to-br ${metric.gradient} dark:from-gray-800 dark:to-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition transform hover:scale-105 duration-200`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                </div>
                <div className="w-12 h-12 bg-white dark:bg-gray-700 bg-opacity-50 dark:bg-opacity-50 rounded-lg flex items-center justify-center">
                  <Icon size={24} className="text-gray-700 dark:text-gray-300" />
                </div>
              </div>
              <p className={`text-sm font-semibold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {metric.change} this period
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Daily Revenue - {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}
          </h3>
          <LineChartCard data={chartData.revenue} />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            User Engagement - {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}
          </h3>
          <BarChartCard data={chartData.users} />
        </div>
      </div>

      {/* Key Metrics and Growth Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 -mx-6 px-6 py-2 transition">
              <span className="text-gray-600 dark:text-gray-400">Average Session Duration</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {currentData.keyMetrics.sessionDuration}
              </span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 -mx-6 px-6 py-2 transition">
              <span className="text-gray-600 dark:text-gray-400">Bounce Rate</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {currentData.keyMetrics.bounceRate}
              </span>
            </div>
            <div className="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-900 -mx-6 px-6 py-2 transition">
              <span className="text-gray-600 dark:text-gray-400">Conversion Rate</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {currentData.keyMetrics.conversion}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Growth Trends</h3>
          <div className="space-y-4">
            {getGrowthTrends().map((trend, index) => (
              <div 
                key={index}
                className={`flex justify-between items-center ${
                  index < getGrowthTrends().length - 1 
                    ? 'pb-4 border-b border-gray-200 dark:border-gray-700' 
                    : ''
                } hover:bg-gray-50 dark:hover:bg-gray-900 -mx-6 px-6 py-2 transition`}
              >
                <span className="text-gray-600 dark:text-gray-400">{trend.label}</span>
                <span className={`font-semibold ${
                  trend.value.startsWith('+') 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {trend.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}