import { configureStore, createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    dateRange: { start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), end: new Date() },
    selectedMetrics: ['revenue', 'users', 'transactions'],
    filters: {}
  },
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setSelectedMetrics: (state, action) => {
      state.selectedMetrics = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    }
  }
});

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    items: [],
    page: 1,
    pageSize: 10,
    total: 0,
    filters: {}
  },
  reducers: {
    setTransactions: (state, action) => {
      state.items = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setTransactionFilters: (state, action) => {
      state.filters = action.payload;
      state.page = 1;
    }
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    page: 1,
    pageSize: 10,
    total: 0
  },
  reducers: {
    setUsers: (state, action) => {
      state.items = action.payload;
    },
    setUsersPage: (state, action) => {
      state.page = action.payload;
    },
    setUsersPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setUsersTotal: (state, action) => {
      state.total = action.payload;
    }
  }
});

export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice.reducer,
    transactions: transactionsSlice.reducer,
    users: usersSlice.reducer
  }
});

export const { setDateRange, setSelectedMetrics, setFilters } = dashboardSlice.actions;
export const { setTransactions, setPage, setPageSize, setTotal, setTransactionFilters } = transactionsSlice.actions;
export const { setUsers, setUsersPage, setUsersPageSize, setUsersTotal } = usersSlice.actions;
