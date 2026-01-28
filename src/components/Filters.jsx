import React from 'react';
import { Filter, X } from 'lucide-react';

export function FilterBar({ filters, onFilterChange, onReset }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100 p-5 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
        </div>
        <button
          onClick={onReset}
          className="text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 flex items-center space-x-1 px-3 py-1.5 rounded-lg transition whitespace-nowrap"
        >
          <X size={16} />
          <span>Clear All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filters.map((filter) => (
          <div key={filter.key}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {filter.label}
            </label>
            {filter.type === 'select' ? (
              <select
                value={filter.value || ''}
                onChange={(e) => onFilterChange(filter.key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition hover:border-gray-400"
              >
                <option value="">All {filter.label}</option>
                {filter.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={filter.type || 'text'}
                value={filter.value || ''}
                onChange={(e) => onFilterChange(filter.key, e.target.value)}
                placeholder={filter.placeholder}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition hover:border-gray-400"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
