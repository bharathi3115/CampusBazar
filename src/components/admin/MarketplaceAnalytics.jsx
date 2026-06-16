import React from 'react';
import { BarChart3, TrendingUp, Users, Heart, MessageSquare, Plus } from 'lucide-react';
import CampusInsights from './CampusInsights';

const MarketplaceAnalytics = () => {
  const analytics = [
    { title: 'Listings Created', value: '145', icon: Plus, color: 'text-sky-600', bg: 'bg-sky-100', subtitle: 'This Month' },
    { title: 'Items Sold', value: '86', icon: TrendingUp, color: 'text-sky-600', bg: 'bg-sky-100', subtitle: 'This Month' },
    { title: 'New Students', value: '124', icon: Users, color: 'text-sky-600', bg: 'bg-sky-100', subtitle: 'Registered' },
    { title: 'Wishlist Adds', value: '350', icon: Heart, color: 'text-sky-600', bg: 'bg-sky-100', subtitle: 'Activity' },
    { title: 'Messages', value: '1,240', icon: MessageSquare, color: 'text-sky-600', bg: 'bg-sky-100', subtitle: 'Exchanged' },
  ];

  const monthlyData = [];

  const categoryData = [
    { name: 'Books', percentage: 45, color: 'bg-theme-maroon' },
    { name: 'Electronics', percentage: 25, color: 'bg-blue-500' },
    { name: 'Calculators', percentage: 15, color: 'bg-emerald-500' },
    { name: 'Cycles', percentage: 10, color: 'bg-amber-500' },
    { name: 'Others', percentage: 5, color: 'bg-slate-400' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Marketplace Analytics</h2>
          <p className="text-sm font-medium text-slate-500">Monitor performance and key metrics</p>
        </div>
      </div>

      {/* KPI Cards (Now Top Row) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {analytics.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-800 leading-tight">{stat.value}</h3>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.title}</p>
              <p className="text-[10px] text-slate-400 mt-1">{stat.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <CampusInsights />

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" /> Listings By Category
            </h3>
          </div>
          <div className="space-y-6">
            {categoryData.map((cat, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm font-bold mb-2 text-slate-700">
                  <span>{cat.name}</span>
                  <span>{cat.percentage}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceAnalytics;
