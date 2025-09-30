// src/components/reusables/SideBar.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  UserRoundCog, 
  UtensilsCrossed,
  MessageCircleMore,
  LogOut,
  ChefHat
} from 'lucide-react';

const navLinks = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Users', icon: UserRoundCog, to: '/dashboard/users' },
  { label: 'Recipes', icon: UtensilsCrossed, to: '/dashboard/recipes' },
  { label: 'Messages', icon: MessageCircleMore, to: '/dashboard/messages' },
];

const SideBar = () => {
  const { pathname } = useLocation();

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed flex flex-col justify-between shadow-lg z-20">
      <div>
        <div className="flex items-center gap-3 p-6 border-b border-gray-800">
          <ChefHat className="text-teal-400" size={28} />
          <h1 className="font-lob text-[24px]">DannysKitchen<span className="text-orange-500">.</span></h1>
        </div>

        <nav className="mt-6 px-4">
          <ul className="space-y-3">
            {navLinks.map(({ label, icon: Icon, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${pathname === to 
                      ? 'bg-gray-800 text-teal-400 shadow-md scale-[1.02]' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white hover:scale-[1.01]'
                    }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="p-6 border-t border-gray-800">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 bg-red-500/20 text-red-400 rounded-xl transition-colors hover:bg-red-500/30"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default SideBar;
