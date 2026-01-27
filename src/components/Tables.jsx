import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function DataTable({ columns, data, actions }) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
              {actions && <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-8 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition duration-150">
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 text-sm text-gray-700">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4 text-sm">
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Pagination({ page, pageSize, total, onPageChange, onPageSizeChange }) {
  const totalPages = Math.ceil(total / pageSize);
  
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 p-4 bg-white rounded-lg border border-gray-100">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <label className="text-sm text-gray-700 whitespace-nowrap">
          Items per page:
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="ml-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition"
          >
            {[5, 10, 25, 50].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </label>
        <span className="text-sm text-gray-600 whitespace-nowrap">
          {total === 0 ? 'No items' : `${Math.min((page - 1) * pageSize + 1, total)} to ${Math.min(page * pageSize, total)} of ${total}`}
        </span>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
          title="Previous page"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex space-x-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-3 py-1 rounded-lg transition font-medium ${
                  page === pageNum
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
          title="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export function StatusBadge({ status }) {
  const statusConfig = {
    completed: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
    failed: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
    active: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
    inactive: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' },
  };

  const config = statusConfig[status] || statusConfig.inactive;
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text} border ${config.border}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
