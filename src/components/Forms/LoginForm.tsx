"use client"
import React, { useState } from 'react';

const LoginForm = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <form 
        onSubmit={handleSubmit} 
        className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-white">Login</h1>
        
        {/* Username / Email Field */}
        <div>
          <label htmlFor="usernameOrEmail" className="block text-sm text-white mb-1">
            Username / Email
          </label>
          <div className="relative">
            <input
              id="usernameOrEmail"
              type="text"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              placeholder="Enter your username or email"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-transparent focus:outline-none focus:border-blue-400 transition-colors"
            />
            {/* Username/Email Status Icon (placeholder) */}
            <span className="absolute right-3 top-3 text-blue-400">
              {/* Replace with appropriate icon */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="5" />
              </svg>
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Please enter a valid username or email address.
          </p>
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm text-white mb-1">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-transparent focus:outline-none focus:border-blue-400 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-blue-400 focus:outline-none"
            >
              {/* Toggle Icon: eye/open eye */}
              {showPassword ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-5-7-9-7zm0 12c-3.31 0-6-3.14-6-5s2.69-5 6-5 6 3.14 6 5-2.69 5-6 5z" />
                  <circle cx="10" cy="10" r="2" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Your password must be at least 8 characters.
          </p>
        </div>

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center text-white text-sm">
            <input 
              type="checkbox" 
              checked={rememberMe} 
              onChange={() => setRememberMe(!rememberMe)} 
              className="form-checkbox h-4 w-4 text-blue-400 mr-2" 
            />
            Remember Me
          </label>
          <a href="/forgot-password" className="text-blue-400 text-sm hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Login Button */}
        <button 
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded hover:from-blue-600 hover:to-purple-600 transition-colors"
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <span className="flex-grow h-px bg-gray-600"></span>
          <span className="px-3 text-white text-sm">or</span>
          <span className="flex-grow h-px bg-gray-600"></span>
        </div>

        {/* Login with Google */}
        <button 
          type="button" 
          className="w-full py-2 border border-blue-400 text-blue-400 font-semibold rounded hover:bg-blue-500 hover:text-white transition-colors"
        >
          Login with Google
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-gray-400 text-sm">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
