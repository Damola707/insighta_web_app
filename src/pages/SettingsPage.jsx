import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { Save, User, Bell, Palette, Lock, Globe } from 'lucide-react';

export function SettingsPage() {
  const { user } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReport: true,
    language: 'en'
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Save theme separately through ThemeContext
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const settingsTabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white dark:text-white flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
            <Palette size={24} className="text-white" />
          </div>
          <span>Settings</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Manage your account and preferences</p>
      </div>

      {/* Success message */}
      {saved && (
        <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg p-4 flex items-start space-x-3">
          <div className="w-5 h-5 rounded-full bg-green-200 dark:bg-green-700 flex-shrink-0 flex items-center justify-center mt-0.5">
            <span className="text-green-600 dark:text-green-300 text-sm font-bold">✓</span>
          </div>
          <p className="text-green-700 dark:text-green-300 text-sm font-medium">Settings saved successfully!</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar tabs */}
        <aside className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 dark:border-gray-700 p-4 space-y-2 shadow-sm">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium flex items-center space-x-2 transition ${
                    activeTab === tab.id
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700'
                      : 'text-gray-700 dark:text-gray-300 dark:text-gray-300 hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Content area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Account Tab */}
          {activeTab === 'account' && (
            <div className="bg-white dark:bg-gray-800 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 dark:border-gray-700 p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700 dark:border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Lock size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white dark:text-white">Account Information</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Your profile details</p>
                </div>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={user?.name}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 dark:bg-gray-700 text-gray-600 dark:text-gray-400 dark:text-gray-400 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={user?.email}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 dark:bg-gray-700 text-gray-600 dark:text-gray-400 dark:text-gray-400 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300 mb-2">Role</label>
                  <input
                    type="text"
                    value={user?.role}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 dark:bg-gray-700 text-gray-600 dark:text-gray-400 dark:text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white dark:bg-gray-800 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 dark:border-gray-700 p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700 dark:border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Bell size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white dark:text-white">Notification Preferences</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Choose how you want to be notified</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer p-4 hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 rounded-lg transition border border-transparent hover:border-gray-200 dark:border-gray-700 dark:hover:border-gray-600">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                    className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 dark:border-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <div className="flex-1">
                    <span className="font-medium text-gray-900 dark:text-white dark:text-white">Email Notifications</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Receive email updates about your account</p>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer p-4 hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 rounded-lg transition border border-transparent hover:border-gray-200 dark:border-gray-700 dark:hover:border-gray-600">
                  <input
                    type="checkbox"
                    checked={settings.pushNotifications}
                    onChange={(e) => setSettings({...settings, pushNotifications: e.target.checked})}
                    className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 dark:border-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <div className="flex-1">
                    <span className="font-medium text-gray-900 dark:text-white dark:text-white">Push Notifications</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Receive push notifications on your devices</p>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer p-4 hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 rounded-lg transition border border-transparent hover:border-gray-200 dark:border-gray-700 dark:hover:border-gray-600">
                  <input
                    type="checkbox"
                    checked={settings.weeklyReport}
                    onChange={(e) => setSettings({...settings, weeklyReport: e.target.checked})}
                    className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 dark:border-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <div className="flex-1">
                    <span className="font-medium text-gray-900 dark:text-white dark:text-white">Weekly Reports</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Get weekly summary reports via email</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="bg-white dark:bg-gray-800 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 dark:border-gray-700 p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700 dark:border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Palette size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white dark:text-white">Appearance Settings</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Customize how the app looks</p>
                </div>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300 mb-3">Theme</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['light', 'dark', 'auto'].map((themeOption) => (
                      <button
                        key={themeOption}
                        onClick={() => handleThemeChange(themeOption)}
                        className={`p-3 rounded-lg border-2 transition capitalize font-medium ${
                          theme === themeOption
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                            : 'border-gray-200 dark:border-gray-700 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 dark:bg-gray-700 text-gray-700 dark:text-gray-300 dark:text-gray-300 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500'
                        }`}
                      >
                        {themeOption}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300 mb-3">Language</label>
                  <div className="flex items-center space-x-2">
                    <Globe size={18} className="text-gray-600 dark:text-gray-400 dark:text-gray-400" />
                    <select
                      value={settings.language}
                      onChange={(e) => setSettings({...settings, language: e.target.value})}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 dark:bg-gray-700 text-gray-900 dark:text-white dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition hover:border-gray-400 dark:hover:border-gray-500"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save button */}
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 w-full sm:w-auto shadow-md hover:shadow-lg"
          >
            <Save size={18} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}