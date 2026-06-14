import React from 'react';
import { Users, ShoppingBag, CheckCircle, DollarSign, Flag, Activity, Clock, Trash2, Edit } from 'lucide-react';

const AdminOverview = () => {
  const stats = [
    { title: 'Total Students', value: '1,250', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100', trend: '+12%' },
    { title: 'Total Listings', value: '542', icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-100', trend: '+8%' },
    { title: 'Active Listings', value: '487', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100', trend: '+5%' },
    { title: 'Items Sold', value: '1,125', icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-100', trend: '+15%' },
    { title: 'Reported Listings', value: '8', icon: Flag, color: 'text-red-600', bg: 'bg-red-100', trend: '-2%' },
    { title: 'Active Users Today', value: '156', icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-100', trend: '+20%' },
  ];

  const recentActivity = [
    { id: 1, action: 'posted', user: 'John', item: 'Scientific Calculator', time: '10 mins ago', icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 2, action: 'sold', user: 'Rahul', item: 'Bicycle', time: '25 mins ago', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 3, action: 'reported', user: 'Priya', item: 'a listing', time: '1 hour ago', icon: Flag, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 4, action: 'removed', user: 'Admin', item: 'a spam listing', time: '2 hours ago', icon: Trash2, color: 'text-red-500', bg: 'bg-red-50' },
    { id: 5, action: 'registered', user: 'New student', item: 'completed', time: '3 hours ago', icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Welcome Back, Admin 👋</h1>
        <p className="text-slate-500 font-medium text-lg">Here's an overview of the marketplace activity today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {stat.trend}
              </span>
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-slate-800 mb-1">{stat.value}</h3>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Activity className="w-5 h-5 text-theme-maroon" /> Recent Activity Feed
          </h2>
        </div>
        <div className="divide-y divide-slate-100">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="p-5 hover:bg-slate-50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full ${activity.bg} flex items-center justify-center shrink-0`}>
                  <activity.icon className={`w-5 h-5 ${activity.color}`} />
                </div>
                <div>
                  <p className="text-sm text-slate-700 font-medium">
                    <span className="font-bold text-slate-900">{activity.user}</span> {activity.action} <span className="font-semibold">{activity.item}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                <Clock className="w-3.5 h-3.5" /> {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
