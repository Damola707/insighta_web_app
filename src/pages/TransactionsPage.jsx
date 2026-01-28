import React, { useState, useMemo } from 'react';
import { DataTable, Pagination, StatusBadge } from '../components/Tables';
import { FilterBar } from '../components/Filters';
import { transactions as mockTransactions } from '../data/mockData';
import { Eye, EyeOff, Edit2, MoreVertical, Download, Wallet, Filter, RefreshCw, TrendingUp, TrendingDown, ArrowUpDown } from 'lucide-react';

export function TransactionsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    status: '',
    type: ''
  });
  // Track which rows have hidden info
  const [hiddenRows, setHiddenRows] = useState(new Set());

  // Toggle visibility for a specific row
  const toggleRowVisibility = (rowId) => {
    setHiddenRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.add(rowId);
      }
      return newSet;
    });
  };

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

  // Calculate statistics
  const stats = useMemo(() => {
    const total = filteredData.reduce((sum, txn) => sum + txn.amount, 0);
    const deposits = filteredData.filter(t => t.type === 'deposit').reduce((sum, txn) => sum + txn.amount, 0);
    const withdrawals = filteredData.filter(t => t.type === 'withdrawal').reduce((sum, txn) => sum + txn.amount, 0);
    const completed = filteredData.filter(t => t.status === 'completed').length;
    
    return {
      total,
      deposits,
      withdrawals,
      completed,
      totalCount: filteredData.length
    };
  }, [filteredData]);

  const columns = [
    { 
      key: 'id', 
      label: 'Transaction ID',
      render: (value, row) => (
        <span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 px-2 py-1 rounded">
          {hiddenRows.has(row.id) ? '••••••' : value}
        </span>
      )
    },
    { 
      key: 'user', 
      label: 'User',
      render: (value, row) => (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
            {hiddenRows.has(row.id) ? '?' : value.charAt(0).toUpperCase()}
          </div>
          <span className="font-medium text-gray-900 dark:text-white">
            {hiddenRows.has(row.id) ? '•••••••' : value}
          </span>
        </div>
      )
    },
    { 
      key: 'amount', 
      label: 'Amount',
      render: (value, row) => (
        <span className="font-semibold text-gray-900 dark:text-white">
          {hiddenRows.has(row.id) ? '$•••••' : `$${value.toLocaleString()}`}
        </span>
      )
    },
    { 
      key: 'type', 
      label: 'Type',
      render: (value, row) => {
        if (hiddenRows.has(row.id)) {
          return (
            <span className="px-3 py-1 rounded-full text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-700">
              •••••••
            </span>
          );
        }
        const typeConfig = {
          deposit: {
            color: 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30',
            icon: <TrendingUp size={14} className="inline mr-1" />
          },
          withdrawal: {
            color: 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30',
            icon: <TrendingDown size={14} className="inline mr-1" />
          },
          transfer: {
            color: 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30',
            icon: <ArrowUpDown size={14} className="inline mr-1" />
          }
        };
        const config = typeConfig[value] || typeConfig.transfer;
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center ${config.color}`}>
            {config.icon}
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      }
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value, row) => {
        if (hiddenRows.has(row.id)) {
          return (
            <span className="px-3 py-1 rounded-full text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-700">
              •••••
            </span>
          );
        }
        return <StatusBadge status={value} />;
      }
    },
    { 
      key: 'date', 
      label: 'Date',
      render: (value, row) => (
        <span className="text-gray-600 dark:text-gray-400 text-sm">
          {hiddenRows.has(row.id) ? '••/••/••••' : value}
        </span>
      )
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <Wallet size={24} className="text-white" />
            </div>
            <span>Transactions</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and view all financial transactions</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg transition whitespace-nowrap font-medium shadow-sm">
            <RefreshCw size={18} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-5 py-2.5 rounded-lg transition whitespace-nowrap shadow-md hover:shadow-lg font-medium">
            <Download size={18} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Volume</p>
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Wallet size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.total.toLocaleString()}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stats.totalCount} transactions</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Deposits</p>
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <TrendingUp size={16} className="text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.deposits.toLocaleString()}</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-semibold">Incoming</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Withdrawals</p>
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <TrendingDown size={16} className="text-red-600 dark:text-red-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.withdrawals.toLocaleString()}</p>
          <p className="text-xs text-red-600 dark:text-red-400 mt-1 font-semibold">Outgoing</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <Filter size={16} className="text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {((stats.completed / stats.totalCount) * 100).toFixed(1)}% success rate
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <FilterBar
          filters={filterConfig}
          onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
          onReset={() => setFilters({ status: '', type: '' })}
        />
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <DataTable
          columns={columns}
          data={paginatedData}
          actions={(row) => (
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => toggleRowVisibility(row.id)}
                className={`p-2 rounded-lg transition ${
                  hiddenRows.has(row.id) 
                    ? 'text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-400' 
                    : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300'
                }`}
                title={hiddenRows.has(row.id) ? 'Show information' : 'Hide information'}
              >
                {hiddenRows.has(row.id) ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              <button 
                className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition" 
                title="Edit transaction"
              >
                <Edit2 size={18} />
              </button>
              <button 
                className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition" 
                title="More options"
              >
                <MoreVertical size={18} />
              </button>
            </div>
          )}
        />
      </div>

      {/* Pagination */}
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