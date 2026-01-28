import React, { useState, useMemo } from 'react';
import { DataTable, Pagination, StatusBadge } from '../components/Tables';
import { FilterBar } from '../components/Filters';
import { users as mockUsers } from '../data/mockData';
import { Mail, MessageSquare, Edit2, Trash2, MoreVertical, UserPlus, Users as UsersIcon } from 'lucide-react';
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

  const columns = [
    { 
      key: 'name', 
      label: 'User',
      render: (value) => <span className="font-semibold text-gray-900">{value}</span>
    },
    { 
      key: 'email', 
      label: 'Email',
      render: (value) => (
        <a href={`mailto:${value}`} className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition">
          <Mail size={16} />
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
      render: (value) => <span className="text-gray-600">{value}</span>
    },
    { 
      key: 'totalSpent', 
      label: 'Total Spent',
      render: (value) => <span className="font-semibold text-gray-900">${value.toLocaleString()}</span>
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
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <UsersIcon size={24} className="text-white" />
            </div>
            <span>Users</span>
          </h1>
          <p className="text-gray-600">Manage and monitor user accounts</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition whitespace-nowrap">
          <UserPlus size={18} />
          <span>Add User</span>
        </button>
      </div>

      <FilterBar
        filters={filterConfig}
        onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
        onReset={() => setFilters({ status: '', searchTerm: '' })}
      />

      <DataTable
        columns={columns}
        data={paginatedData}
        actions={(row) => (
          <div className="flex items-center space-x-3">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition"
                  title="Edit"
                >
                  <Edit2 size={16} />
                </button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>

                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Handle save logic here
                  }}
                >
                  <input
                    className="w-full border p-2 rounded"
                    defaultValue={row.name}
                    placeholder="Customer Name"
                    name="name"
                  />

                  <input
                    className="w-full border p-2 rounded"
                    defaultValue={row.id}
                    placeholder="User ID"
                    name="userId"
                  />

                  <input
                    className="w-full border p-2 rounded"
                    defaultValue={row.totalSpent}
                    placeholder="Total Spent"
                    name="totalSpent"
                  />

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                  >
                    Save Changes
                  </button>
                </form>
              </DialogContent>
            </Dialog>
            <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button className="text-red-500 hover:text-red-700 p-1">
                        <Trash2 size={16} />
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Delete User</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete user {row.id} for {row.name}?  
                            This action cannot be undone.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                            // Handle delete logic here
                            console.log('Deleting user:', row.id);
                            }}
                            className="alert-delete-btn"
                        >
                            Delete
                        </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialog>
                      <button
                        className="text-gray-600 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition"
                        title="More"
                      >
                        <MoreVertical size={16} />
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

