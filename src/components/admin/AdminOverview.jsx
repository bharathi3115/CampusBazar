import React, { useState, useEffect } from 'react';
import { Users, ShoppingBag, CheckCircle, DollarSign, Flag, Activity, Clock, Trash2, Edit } from 'lucide-react';

const AdminOverview = () => {
  const [statsData, setStatsData] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [statsRes, activityRes] = await Promise.all([
          fetch('http://localhost:5000/api/admin/stats'),
          fetch('http://localhost:5000/api/admin/recent-activity')
        ]);
        if (statsRes.ok) setStatsData(await statsRes.json());
        if (activityRes.ok) setRecentActivity(await activityRes.json());
      } catch (err) {
        console.error('Failed to fetch admin data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const stats = statsData ? [
    { title: 'Total Students', value: statsData.totalStudents, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100', trend: '' },
    { title: 'Total Listings', value: statsData.totalListings, icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-100', trend: '' },
    { title: 'Active Listings', value: statsData.activeListings, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100', trend: '' },
    { title: 'Items Sold', value: statsData.itemsSold, icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-100', trend: '' },
    { title: 'Reported Listings', value: statsData.reportedListings, icon: Flag, color: 'text-red-600', bg: 'bg-red-100', trend: '' },
    { title: 'Active Users Today', value: statsData.activeUsersToday, icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-100', trend: '' },
  ] : [];

  const getIconForAction = (action) => {
    if (action === 'sold') return DollarSign;
    if (action === 'reported') return Flag;
    if (action === 'removed') return Trash2;
    if (action === 'registered') return Users;
    return ShoppingBag; // posted
  };

  const getColorForAction = (action) => {
    if (action === 'sold') return { text: 'text-emerald-500', bg: 'bg-emerald-50' };
    if (action === 'reported') return { text: 'text-amber-500', bg: 'bg-amber-50' };
    if (action === 'removed') return { text: 'text-red-500', bg: 'bg-red-50' };
    if (action === 'registered') return { text: 'text-purple-500', bg: 'bg-purple-50' };
    return { text: 'text-blue-500', bg: 'bg-blue-50' }; // posted
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Welcome Back, Admin 👋</h1>
        <p className="text-slate-500 font-medium text-lg">Here's an overview of the marketplace activity today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {loading ? (
          <p className="text-slate-500 col-span-3 text-center py-8">Loading stats...</p>
        ) : (
          stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-4 sm:p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer relative overflow-hidden">
              <div className="flex items-center justify-between mb-3 relative z-10">
                <div className={`p-2 rounded-lg ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                {stat.trend && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                    {stat.trend}
                  </span>
                )}
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-slate-800 mb-0.5">{stat.value}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.title}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Activity className="w-5 h-5 text-theme-maroon" /> Recent Activity Feed
          </h2>
        </div>
        <div className="divide-y divide-slate-100">
          {loading ? (
            <p className="text-slate-500 text-center py-8">Loading activity...</p>
          ) : recentActivity.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No recent activity.</p>
          ) : (
            recentActivity.map((activity) => {
              const Icon = getIconForAction(activity.action);
              const colors = getColorForAction(activity.action);
              return (
                <div key={activity.id} className="p-5 hover:bg-slate-50 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-700 font-medium">
                        <span className="font-bold text-slate-900">{activity.user}</span> {activity.action} <span className="font-semibold">{activity.item}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                    <Clock className="w-3.5 h-3.5" /> {activity.relativeTime || activity.time}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
