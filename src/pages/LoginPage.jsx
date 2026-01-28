import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { InsightaLogo } from '../components/Logo';
import { TrendingUp, Users, Zap, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('demo@insighta.com');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  const features = [
    { icon: TrendingUp, label: 'Real-time Analytics', desc: 'Live data insights' },
    { icon: Users, label: 'User Management', desc: 'Complete control' },
    { icon: Zap, label: 'Lightning Fast', desc: 'Optimized performance' },
    { icon: Shield, label: 'Enterprise Security', desc: 'Bank-level protection' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex">
      {/* LEFT PANEL - INFO SECTION */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-16">
            <InsightaLogo size={48} />
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Insighta</span>
          </div>
          
          <div>
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Advanced Analytics &<br />Financial Intelligence
            </h1>
            <p className="text-xl text-blue-100 mb-12 max-w-md leading-relaxed">
              Gain real-time insights into your business with our comprehensive analytics platform designed for modern enterprises.
            </p>

            <div className="space-y-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-4 group cursor-default hover:translate-x-1 transition-transform">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-blue-400/40 group-hover:to-cyan-400/40 transition">
                    <feature.icon size={24} className="text-cyan-300" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{feature.label}</div>
                    <div className="text-sm text-blue-200">{feature.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT PANEL - LOGIN FORM */}
      <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 flex items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <InsightaLogo size={40} />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Insighta</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Advanced Analytics & Financial Dashboard</p>
          </div>

          {/* Welcome section */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Welcome Back</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Sign in to access your dashboard</p>
          </div>

          {/* Error alert */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start space-x-3 animate-shake">
              <div className="w-5 h-5 rounded-full bg-red-200 flex-shrink-0 flex items-center justify-center mt-0.5">
                <span className="text-red-600 text-sm font-bold">!</span>
              </div>
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email input */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 dark:text-white placeholder-gray-500 hover:border-gray-400"
                placeholder="you@example.com"
                disabled={isLoading}
              />
            </div>

            {/* Password input */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 dark:text-white placeholder-gray-500 pr-12 hover:border-gray-400"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-300 transition"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />
                <span className="text-gray-700 dark:text-gray-300">Remember me</span>
              </label>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold transition">
                Forgot password?
              </a>
            </div>

            {/* Sign In Button - Enhanced */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-4 rounded-lg transition-all duration-300 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed mt-8 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/50"
            >
              {/* Animated background on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Button content */}
              <div className="relative flex items-center justify-center space-x-2">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg">Sign In</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 rounded-xl border border-blue-200 hover:border-blue-300 transition">
            <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wider flex items-center space-x-2">
              <Shield size={14} className="text-blue-600" />
              <span>Demo Credentials</span>
            </p>
            <div className="space-y-2 text-xs">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold text-gray-900 dark:text-white">Email:</span>
                <code className="bg-white dark:bg-gray-800 px-3 py-1.5 rounded ml-2 text-blue-600 font-mono font-medium border border-blue-200">demo@insighta.com</code>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold text-gray-900 dark:text-white">Password:</span>
                <code className="bg-white dark:bg-gray-800 px-3 py-1.5 rounded ml-2 text-blue-600 font-mono font-medium border border-blue-200">demo123</code>
              </p>
            </div>
          </div>

          {/* Sign up link */}
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-8">
            Don't have an account? <a href="#" className="text-blue-600 hover:text-blue-700 font-bold transition">Create one</a>
          </p>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 text-center">
              Secured with bank-level encryption • © 2026 Insighta Inc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


