import React, { useState, useMemo } from 'react';
import { DataTable, Pagination, StatusBadge } from '../components/Tables';
import { FilterBar } from '../components/Filters';
import { users as mockUsers } from '../data/mockData';
import { Mail, MessageSquare, Edit2, Trash2, MoreVertical, UserPlus, Users as UsersIcon, UserCheck, UserX, DollarSign, Calendar, RefreshCw } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function UsersPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    status: '',
    searchTerm: ''
  });

  const filteredData = useMemo(() => {
    return mockUsers.filter(user => {
      if (filters.status && user.status !== filters.status) return false;
      if (filters.searchTerm && !user.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) return false;
      return true;
    });
  }, [filters]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page, pageSize]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalUsers = filteredData.length;
    const activeUsers = filteredData.filter(u => u.status === 'active').length;
    const inactiveUsers = filteredData.filter(u => u.status === 'inactive').length;
    const totalRevenue = filteredData.reduce((sum, user) => sum + user.totalSpent, 0);
    
    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      totalRevenue
    };
  }, [filteredData]);

  const columns = [
    { 
      key: 'name', 
      label: 'User',
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
            {value.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">ID: {row.id}</p>
          </div>
        </div>
      )
    },
    { 
      key: 'email', 
      label: 'Email',
      render: (value) => (
        <a 
          href={`mailto:${value}`} 
          className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition group"
        >
          <Mail size={16} className="group-hover:scale-110 transition-transform" />
          <span>{value}</span>
        </a>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => <StatusBadge status={value} />
    },
    { 
      key: 'joinDate', 
      label: 'Join Date',
      render: (value) => (
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <Calendar size={14} className="text-gray-400" />
          <span>{value}</span>
        </div>
      )
    },
    { 
      key: 'totalSpent', 
      label: 'Total Spent',
      render: (value) => (
        <div className="flex items-center space-x-1">
          <DollarSign size={14} className="text-green-600 dark:text-green-400" />
          <span className="font-semibold text-gray-900 dark:text-white">{value.toLocaleString()}</span>
        </div>
      )
    },
  ];

  const filterConfig = [
    {
      key: 'searchTerm',
      label: 'Search Name',
      type: 'text',
      value: filters.searchTerm,
      placeholder: 'Filter by name...'
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      value: filters.status,
      options: ['active', 'inactive']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <UsersIcon size={24} className="text-white" />
            </div>
            <span>Users</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and monitor user accounts</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg transition whitespace-nowrap font-medium shadow-sm">
            <RefreshCw size={18} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-5 py-2.5 rounded-lg transition whitespace-nowrap shadow-md hover:shadow-lg font-medium">
            <UserPlus size={18} />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <UsersIcon size={16} className="text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Registered accounts</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <UserCheck size={16} className="text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeUsers}</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-semibold">
            {((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}% active rate
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Inactive Users</p>
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <UserX size={16} className="text-red-600 dark:text-red-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inactiveUsers}</p>
          <p className="text-xs text-red-600 dark:text-red-400 mt-1 font-semibold">
            {((stats.inactiveUsers / stats.totalUsers) * 100).toFixed(1)}% inactive
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <DollarSign size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Avg: ${Math.round(stats.totalRevenue / stats.totalUsers).toLocaleString()}/user
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <FilterBar
          filters={filterConfig}
          onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
          onReset={() => setFilters({ status: '', searchTerm: '' })}
        />
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <DataTable
          columns={columns}
          data={paginatedData}
          actions={(row) => (
            <div className="flex items-center space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 p-2 rounded-lg transition"
                    title="Edit user"
                  >
                    <Edit2 size={16} />
                  </button>
                </DialogTrigger>

                <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <DialogHeader>
                    <DialogTitle className="text-gray-900 dark:text-white">Edit User</DialogTitle>
                  </DialogHeader>

                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      // Handle save logic here
                    }}
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Customer Name
                      </label>
                      <input
                        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        defaultValue={row.name}
                        placeholder="Customer Name"
                        name="name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        User ID
                      </label>
                      <input
                        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        defaultValue={row.id}
                        placeholder="User ID"
                        name="userId"
                        disabled
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Total Spent
                      </label>
                      <input
                        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        defaultValue={row.totalSpent}
                        placeholder="Total Spent"
                        name="totalSpent"
                        type="number"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 rounded-lg transition font-medium shadow-md hover:shadow-lg"
                    >
                      Save Changes
                    </button>
                  </form>
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button 
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded-lg transition"
                    title="Delete user"
                  >
                    <Trash2 size={16} />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-gray-900 dark:text-white">Delete User</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                      Are you sure you want to delete user <span className="font-semibold">{row.name}</span> (ID: {row.id})?  
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        // Handle delete logic here
                        console.log('Deleting user:', row.id);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <button
                className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition"
                title="More options"
              >
                <MoreVertical size={16} />
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