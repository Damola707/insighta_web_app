import React, { useState, useMemo } from 'react';
import { DataTable, Pagination, StatusBadge } from '../components/Tables';
import { FilterBar } from '../components/Filters';
import { transactions as mockTransactions } from '../data/mockData';
import { Eye, Edit2, MoreVertical, Download, Wallet } from 'lucide-react';

export function TransactionsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    status: '',
    type: ''
  });

  const filteredData = useMemo(() => {
    return mockTransactions.filter(txn => {
      if (filters.status && txn.status !== filters.status) return false;
      if (filters.type && txn.type !== filters.type) return false;
      return true;
    });
  }, [filters]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page, pageSize]);

  const columns = [
    { 
      key: 'id', 
      label: 'Transaction ID',
      render: (value) => <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{value}</span>
    },
    { 
      key: 'user', 
      label: 'User',
      render: (value) => <span className="font-medium text-gray-900">{value}</span>
    },
    { 
      key: 'amount', 
      label: 'Amount',
      render: (value) => <span className="font-semibold text-gray-900">${value.toLocaleString()}</span>
    },
    { 
      key: 'type', 
      label: 'Type',
      render: (value) => {
        const colors = {
          deposit: 'text-green-700 bg-green-50',
          withdrawal: 'text-red-700 bg-red-50',
          transfer: 'text-blue-700 bg-blue-50'
        };
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[value] || ''}`}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      }
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => <StatusBadge status={value} />
    },
    { 
      key: 'date', 
      label: 'Date',
      render: (value) => <span className="text-gray-600">{value}</span>
    },
  ];

  const filterConfig = [
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      value: filters.status,
      options: ['completed', 'pending', 'failed']
    },
    {
      key: 'type',
      label: 'Type',
      type: 'select',
      value: filters.type,
      options: ['deposit', 'withdrawal', 'transfer']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Wallet size={24} className="text-white" />
            </div>
            <span>Transactions</span>
          </h1>
          <p className="text-gray-600">Manage and view all financial transactions</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition whitespace-nowrap">
          <Download size={18} />
          <span>Export</span>
        </button>
      </div>

      <FilterBar
        filters={filterConfig}
        onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
        onReset={() => setFilters({ status: '', type: '' })}
      />

      <DataTable
        columns={columns}
        data={paginatedData}
        actions={(row) => (
          <div className="flex items-center space-x-3">
            <button className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition" title="View">
              <Eye size={18} />
            </button>
            <button className="text-gray-600 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition" title="Edit">
              <Edit2 size={18} />
            </button>
            <button className="text-gray-600 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition" title="More">
              <MoreVertical size={18} />
            </button>
          </div>
        )}
      />

      <Pagination
        page={page}
        pageSize={pageSize}
        total={filteredData.length}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}

