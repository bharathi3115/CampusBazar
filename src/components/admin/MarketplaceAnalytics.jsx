import React from 'react';
import { BarChart3, TrendingUp, Users, Heart, MessageSquare, Plus } from 'lucide-react';
import CampusInsights from './CampusInsights';

const MarketplaceAnalytics = () => {
  const analytics = [
    { title: 'Listings Created', value: '145', icon: Plus, color: 'text-indigo-600', bg: 'bg-indigo-100', subtitle: 'This Month' },
    { title: 'Items Sold', value: '86', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100', subtitle: 'This Month' },
    { title: 'New Students', value: '124', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100', subtitle: 'Registered' },
    { title: 'Wishlist Adds', value: '350', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-100', subtitle: 'Activity' },
    { title: 'Messages', value: '1,240', icon: MessageSquare, color: 'text-amber-600', bg: 'bg-amber-100', subtitle: 'Exchanged' },
  ];

  const monthlyData = [
    { month: 'Jan', sales: 40 },
    { month: 'Feb', sales: 60 },
    { month: 'Mar', sales: 85 },
    { month: 'Apr', sales: 70 },
    { month: 'May', sales: 90 },
    { month: 'Jun', sales: 120 },
  ];

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

      <CampusInsights />

      {/* KPI Cards */}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Sales Chart (Mock) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-theme-maroon" /> Monthly Sales Trend
            </h3>
            <select className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-64 flex items-end gap-2 sm:gap-4 justify-between pt-10">
            {monthlyData.map((data, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 group">
                <div className="w-full relative bg-slate-100 rounded-t-md flex items-end h-[200px]">
                  <div 
                    className="w-full bg-theme-maroon rounded-t-md group-hover:bg-theme-dark-maroon transition-all relative"
                    style={{ height: `${(data.sales / 120) * 100}%` }}
                  >
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {data.sales} Sales
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-500 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Listings per Category (Mock) */}
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
