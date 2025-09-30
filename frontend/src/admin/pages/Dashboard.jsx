import React from 'react';
import SideBar from '../components/reusables/SideBar';
import Header from '../components/reusables/Header';
import { Users, BookOpen, Mail, BarChart4, TrendingUp } from 'lucide-react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ icon, label, value, change, changeType }) => (
  <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out group transform hover:-translate-y-1 hover:scale-[1.01] animate-fade-in-up">
    {/* Glow icon top-left */}
    <div className="absolute -top-5 left-4 bg-teal-500/20 text-teal-400 p-3 rounded-xl shadow-md transition-transform group-hover:scale-110 group-hover:rotate-6">
      {icon}
    </div>

    {/* Main content */}
    <div className="pt-8">
      <p className="text-base font-semibold text-gray-300 mb-1">{label}</p>
      <h2 className="text-3xl font-bold text-white">{value}</h2>
    </div>

    {/* Stat change info */}
    <div className="mt-4 flex items-center text-sm">
      {changeType === 'positive' ? (
        <ArrowUpRight className="text-green-400 mr-1" size={16} />
      ) : (
        <ArrowDownRight className="text-red-400 mr-1" size={16} />
      )}
      <span className={`${changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
        {change}
      </span>
    </div>
  </div>
);

const ActivityItem = ({ icon, text, time }) => (
  <li className="flex items-center justify-between bg-gray-700/40 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors">
    <div className="flex items-center gap-2">
      <div className="text-teal-400">{icon}</div>
      <p className="text-sm text-gray-300">{text}</p>
    </div>
    <p className="text-xs text-gray-500">{time}</p>
  </li>
);

const RecentActivity = () => (
  <div className="bg-gray-800 rounded-xl p-4 shadow-sm">
    <h3 className="text-lg font-semibold text-white mb-3">Recent Activity</h3>
    <ul className="space-y-2 text-sm">
      <ActivityItem icon={<TrendingUp size={18} />} text="John created a recipe" time="Just now" />
      <ActivityItem icon={<Users size={18} />} text="Jane signed up" time="10 mins ago" />
      <ActivityItem icon={<BookOpen size={18} />} text="Updated Spicy Tacos" time="1 hour ago" />
      <ActivityItem icon={<Mail size={18} />} text="New message from Feedback" time="2 hrs ago" />
    </ul>
  </div>
);

const Dashboard = () => {
  return (
    <div className="flex bg-gray-900 min-h-screen text-gray-100">
      <SideBar />
      <Header />
      <div className="flex-1 ml-64 flex flex-col min-h-screen pt-24"> {/* 👈 pt-20 to push content below fixed header */}
        <main className="sm:p-5 md:p-6 bg-gray-900 flex-1">
          {/* Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
            <StatCard
              icon={<Users size={20} />}
              label="Users"
              value="1,240"
              change="+10%"
              changeType="positive"
            />
            <StatCard
              icon={<BookOpen size={20} />}
              label="Recipes"
              value="542"
              change="+5"
              changeType="positive"
            />
            <StatCard
              icon={<Mail size={20} />}
              label="Messages"
              value="87"
              change="-2"
              changeType="negative"
            />
            <StatCard
              icon={<BarChart4 size={20} />}
              label="Visits"
              value="32.4K"
              change="+12%"
              changeType="positive"
            />
          </div>

          {/* Overview and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-gray-800 rounded-xl p-4 shadow-sm lg:col-span-2">
              <h3 className="text-lg font-semibold text-white mb-2">Overview</h3>
              <p className="text-sm text-gray-400">
                Traffic increased by <span className="text-teal-400 font-semibold">12%</span> this week.
                Most users are active between <span className="text-white font-medium">2pm - 6pm</span>.
              </p>
              <div className="mt-4 h-48 bg-gray-700 rounded-md flex items-center justify-center text-gray-500 text-sm">
                Chart (Coming soon...)
              </div>
            </div>
            <RecentActivity />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
