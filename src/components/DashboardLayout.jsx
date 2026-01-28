import React, { useContext, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { InsightaLogo } from './Logo';
import { Menu, X, BarChart3, TrendingUp, Users, Settings, LogOut, Wallet, ChevronDown, Bell } from 'lucide-react';

export function DashboardLayout() {
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: BarChart3, label: 'Overview', path: '/dashboard' },
    { icon: TrendingUp, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: Wallet, label: 'Transactions', path: '/dashboard/transactions' },
    { icon: Users, label: 'Users', path: '/dashboard/users' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* DESKTOP SIDEBAR */}
      <aside 
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
        className={`hidden md:flex md:flex-col ${sidebarHovered ? 'md:w-64' : 'md:w-20'} bg-gradient-to-b from-gray-900 via-slate-800 to-gray-900 text-white transition-all duration-300 shadow-2xl user-select-none will-change-[width]`}
      >
        {/* Logo section */}
        <div className={`p-4 flex items-center border-b border-gray-700/50 ${sidebarHovered ? 'justify-start' : 'justify-center'}`}>
          {sidebarHovered && (
            <div className="flex items-center space-x-3">
              <InsightaLogo size={40} />
              <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Insighta</span>
            </div>
          )}
          {!sidebarHovered && <InsightaLogo size={56} />}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto flex flex-col items-center md:items-start">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                title={!sidebarHovered ? item.label : ''}
                className={`w-14 md:w-full flex items-center justify-center md:justify-start space-x-3 px-3 py-3 rounded-lg transition duration-200 group cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg'
                    : 'text-gray-400 hover:bg-gradient-to-r hover:from-blue-500/40 hover:to-cyan-500/40 hover:text-white'
                }`}
              >
                <item.icon size={20} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
                {sidebarHovered && <span className="font-medium truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* User profile section */}
        <div className="p-3 border-t border-gray-700/50">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className={`flex items-center rounded-lg hover:bg-gradient-to-r hover:from-blue-500/40 hover:to-cyan-500/40 transition cursor-pointer ${sidebarHovered ? 'w-full px-3 py-3 justify-start space-x-3' : 'w-10 h-10 justify-center'} ${profileOpen ? 'bg-gradient-to-r from-blue-500/40 to-cyan-500/40' : ''}`}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center flex-shrink-0 border-2 border-blue-400 overflow-hidden">
              {user?.avatar ? (
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm font-bold text-white">{user?.name?.charAt(0)?.toUpperCase()}</span>
              )}
            </div>
            {sidebarHovered && (
              <>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-black truncate">{user?.name}</p>
                  <p className="text-xs text-gray-300 truncate">{user?.role}</p>
                </div>
                <ChevronDown size={16} className={`transition flex-shrink-0 ${profileOpen ? 'rotate-180' : ''}`} />
              </>
            )}
          </button>
          
          {profileOpen && sidebarHovered && (
            <button
              onClick={handleLogout}
              className="w-full mt-2 flex items-center justify-start space-x-2 px-4 py-2 text-sm text-gray-400 hover:bg-red-600/10 hover:text-red-400 rounded-lg transition cursor-pointer"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          )}
        </div>
      </aside>

      {/* MOBILE HEADER & CONTENT */}
      <div className="flex flex-col flex-1 md:hidden">
        <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center space-x-2">
              <InsightaLogo size={32} />
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Insighta</span>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition text-blue-600 group relative" title="Notifications">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-gray-100 dark:bg-gray-700 rounded-lg transition text-gray-600 dark:text-gray-400"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <nav className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 space-y-2 bg-gray-50 dark:bg-gray-900">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition ${
                      active
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition mt-4 border-t pt-4"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </nav>
          )}
        </header>

        <main className="flex-1 overflow-auto">
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </div>

      {/* DESKTOP MAIN CONTENT */}
      <main className="hidden md:flex md:flex-col flex-1 overflow-auto">
        <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-30 border-b border-gray-200 dark:border-gray-700">
          <div className="px-8 py-6 flex items-center justify-between h-7">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white"></h1>
              <p className="text-sm text-gray-500 mt-1">Welcome back, {user?.name?.split(' ')[0]}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2.5 bg-blue-50 hover:bg-blue-100 rounded-lg transition text-blue-600 group relative" title="Notifications">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-red-50 hover:text-red-600 rounded-lg transition font-medium"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>
        <div className="p-6 sm:p-8 flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}


