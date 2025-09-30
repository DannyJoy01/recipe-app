import React from 'react';
import { Bell, Search, UserRound } from 'lucide-react';

const Header = () => {
  return (
    <header className="p-[18px] bg-gray-900 border-b border-gray-800 text-white shadow-lg flex items-center justify-between fixed left-64 right-0 top-0 z-10">
      {/* Left side: Greeting and User */}
      <div className="flex items-center gap-4">
        <div className="p-2 bg-teal-500/20 text-teal-400 rounded-full">
          <UserRound size={20} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-400">Welcome back,</p>
          <p className="text-xl font-bold text-white tracking-wide">Admin</p>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="hidden md:block flex-1 max-w-lg mx-8 relative">
        <input
          type="text"
          placeholder="Search for users, recipes, and more..."
          className="w-full bg-gray-800 text-gray-200 rounded-2xl py-2 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:shadow-lg focus:bg-gray-700 transition-colors"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      </div>

      {/* Right side: Icons */}
      <div className="flex items-center gap-6">
        <button className="relative text-gray-400 hover:text-teal-400 transition-colors">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="flex items-center gap-2 p-2 bg-gray-800 rounded-xl transition-colors hover:bg-gray-700 cursor-pointer">
          <UserRound className="text-gray-400" size={22} />
          <span className="text-sm font-medium text-gray-300 hidden md:inline">Admin</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
