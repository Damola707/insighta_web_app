export const chartData = {
  revenue: [
    { month: 'Jan', value: 4000 },
    { month: 'Feb', value: 3000 },
    { month: 'Mar', value: 2000 },
    { month: 'Apr', value: 2780 },
    { month: 'May', value: 1890 },
    { month: 'Jun', value: 2390 },
  ],
  users: [
    { month: 'Jan', active: 2400, inactive: 1200 },
    { month: 'Feb', active: 1398, inactive: 1221 },
    { month: 'Mar', active: 9800, inactive: 2229 },
    { month: 'Apr', active: 3908, inactive: 2000 },
    { month: 'May', active: 4800, inactive: 2181 },
    { month: 'Jun', active: 3800, inactive: 2500 },
  ]
};

export const transactions = [
  { id: 'TXN001', user: 'John Smith', amount: 2500, status: 'completed', date: '2024-01-20', type: 'deposit' },
  { id: 'TXN002', user: 'Sarah Johnson', amount: 1850, status: 'completed', date: '2024-01-20', type: 'withdrawal' },
  { id: 'TXN003', user: 'Mike Davis', amount: 3200, status: 'pending', date: '2024-01-19', type: 'transfer' },
  { id: 'TXN004', user: 'Emma Wilson', amount: 950, status: 'completed', date: '2024-01-19', type: 'deposit' },
  { id: 'TXN005', user: 'Alex Brown', amount: 2100, status: 'failed', date: '2024-01-18', type: 'withdrawal' },
  { id: 'TXN006', user: 'Lisa Anderson', amount: 1750, status: 'completed', date: '2024-01-18', type: 'transfer' },
  { id: 'TXN007', user: 'Tom Miller', amount: 4200, status: 'completed', date: '2024-01-17', type: 'deposit' },
  { id: 'TXN008', user: 'Rachel Lee', amount: 1350, status: 'pending', date: '2024-01-17', type: 'withdrawal' },
];

export const users = [
  { id: 'USR001', name: 'John Smith', email: 'john@example.com', status: 'active', joinDate: '2023-06-15', totalSpent: 2500 },
  { id: 'USR002', name: 'Sarah Johnson', email: 'sarah@example.com', status: 'active', joinDate: '2023-07-22', totalSpent: 5200 },
  { id: 'USR003', name: 'Mike Davis', email: 'mike@example.com', status: 'inactive', joinDate: '2023-05-10', totalSpent: 1800 },
  { id: 'USR004', name: 'Emma Wilson', email: 'emma@example.com', status: 'active', joinDate: '2023-08-03', totalSpent: 3400 },
  { id: 'USR005', name: 'Alex Brown', email: 'alex@example.com', status: 'active', joinDate: '2023-04-12', totalSpent: 4100 },
];

export const metrics = [
  { label: 'Total Revenue', value: '$125,430', change: '+12.5%', trend: 'up' },
  { label: 'Active Users', value: '8,234', change: '+8.2%', trend: 'up' },
  { label: 'Transactions', value: '2,543', change: '-2.1%', trend: 'down' },
  { label: 'Conversion Rate', value: '3.24%', change: '+0.8%', trend: 'up' },
];
