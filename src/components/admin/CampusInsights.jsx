import React from 'react';
import { TrendingUp, Award, Zap, Building, Users } from 'lucide-react';

const CampusInsights = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <div className="bg-gradient-to-br from-theme-maroon to-theme-dark-maroon text-white p-5 rounded-2xl shadow-sm relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl"><Award className="w-5 h-5 text-white" /></div>
          <h4 className="font-bold text-sm">Most Popular Category</h4>
        </div>
        <p className="text-2xl font-black relative z-10">Books</p>
        <p className="text-sm text-white/70 mt-1 relative z-10">45% of total sales</p>
      </div>

      <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white p-5 rounded-2xl shadow-sm relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl"><Zap className="w-5 h-5 text-white" /></div>
          <h4 className="font-bold text-sm">Fastest Selling</h4>
        </div>
        <p className="text-2xl font-black relative z-10">Calculators</p>
        <p className="text-sm text-white/70 mt-1 relative z-10">Avg 2 days to sell</p>
      </div>

      <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-5 rounded-2xl shadow-sm relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl"><Building className="w-5 h-5 text-white" /></div>
          <h4 className="font-bold text-sm">Most Active Dept.</h4>
        </div>
        <p className="text-2xl font-black relative z-10">Computer Science</p>
        <p className="text-sm text-white/70 mt-1 relative z-10">320 active users</p>
      </div>

      <div className="bg-gradient-to-br from-amber-500 to-amber-700 text-white p-5 rounded-2xl shadow-sm relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl"><TrendingUp className="w-5 h-5 text-white" /></div>
          <h4 className="font-bold text-sm">Most Active Seller</h4>
        </div>
        <p className="text-2xl font-black relative z-10">John Doe</p>
        <p className="text-sm text-white/70 mt-1 relative z-10">25 listings</p>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white p-5 rounded-2xl shadow-sm relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl"><Users className="w-5 h-5 text-white" /></div>
          <h4 className="font-bold text-sm">Most Active Buyer</h4>
        </div>
        <p className="text-2xl font-black relative z-10">Suresh Kumar</p>
        <p className="text-sm text-white/70 mt-1 relative z-10">15 purchases</p>
      </div>
    </div>
  );
};

export default CampusInsights;
