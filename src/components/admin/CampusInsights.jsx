import React from 'react';
import { TrendingUp, Award, Zap, Building, Users } from 'lucide-react';

const CampusInsights = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <div className="bg-amber-100 text-slate-800 p-5 rounded-2xl border border-amber-200 shadow-sm relative overflow-hidden group">
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="p-2 bg-white/60 border border-amber-200 rounded-xl"><Award className="w-5 h-5 text-theme-maroon" /></div>
          <h4 className="font-bold text-sm text-slate-700">Most Popular Category</h4>
        </div>
        <p className="text-2xl font-black relative z-10 text-slate-900">Books</p>
        <p className="text-sm text-slate-600 mt-1 relative z-10">45% of total sales</p>
      </div>

      <div className="bg-emerald-100 text-slate-800 p-5 rounded-2xl border border-emerald-200 shadow-sm relative overflow-hidden group">
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="p-2 bg-white/60 border border-emerald-200 rounded-xl"><Zap className="w-5 h-5 text-emerald-600" /></div>
          <h4 className="font-bold text-sm text-slate-700">Fastest Selling</h4>
        </div>
        <p className="text-2xl font-black relative z-10 text-slate-900">Calculators</p>
        <p className="text-sm text-slate-600 mt-1 relative z-10">Avg 2 days to sell</p>
      </div>

      <div className="bg-blue-100 text-slate-800 p-5 rounded-2xl border border-blue-200 shadow-sm relative overflow-hidden group">
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="p-2 bg-white/60 border border-blue-200 rounded-xl"><Building className="w-5 h-5 text-blue-600" /></div>
          <h4 className="font-bold text-sm text-slate-700">Most Active Dept.</h4>
        </div>
        <p className="text-2xl font-black relative z-10 text-slate-900">Computer Science</p>
        <p className="text-sm text-slate-600 mt-1 relative z-10">320 active users</p>
      </div>

      <div className="bg-orange-100 text-slate-800 p-5 rounded-2xl border border-orange-200 shadow-sm relative overflow-hidden group">
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="p-2 bg-white/60 border border-orange-200 rounded-xl"><TrendingUp className="w-5 h-5 text-orange-600" /></div>
          <h4 className="font-bold text-sm text-slate-700">Most Active Seller</h4>
        </div>
        <p className="text-2xl font-black relative z-10 text-slate-900">John Doe</p>
        <p className="text-sm text-slate-600 mt-1 relative z-10">25 listings</p>
      </div>

      <div className="bg-purple-100 text-slate-800 p-5 rounded-2xl border border-purple-200 shadow-sm relative overflow-hidden group">
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="p-2 bg-white/60 border border-purple-200 rounded-xl"><Users className="w-5 h-5 text-purple-600" /></div>
          <h4 className="font-bold text-sm text-slate-700">Most Active Buyer</h4>
        </div>
        <p className="text-2xl font-black relative z-10 text-slate-900">Suresh Kumar</p>
        <p className="text-sm text-slate-600 mt-1 relative z-10">15 purchases</p>
      </div>
    </div>
  );
};

export default CampusInsights;
