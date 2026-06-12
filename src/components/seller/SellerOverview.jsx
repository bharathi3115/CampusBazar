import React from 'react';
import { 
  Package, CheckCircle, Eye, MessageSquare, Heart, Star,
  PlusCircle, Settings, TrendingUp, DollarSign, Activity, ChevronRight,
  TrendingDown, Box, Clock, Edit, CheckSquare, BarChart2, Zap, Award
} from 'lucide-react';

const SellerOverview = ({ setActiveTab }) => {
  // MOCK DATA for analytics
  const overviewStats = [
    { label: 'Active Listings', value: '18', icon: Package, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Items Sold', value: '45', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Listing Views', value: '4.2k', icon: Eye, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Buyer Inquiries', value: '32', icon: MessageSquare, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: 'Wishlist Saves', value: '156', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-100' },
    { label: 'Seller Rating', value: '4.8/5', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  ];

  const topListings = [
    { name: 'Scientific Calculator', price: '₹500', views: 120, saves: 18, inquiries: 8, status: 'Active', badge: 'Top Viewed' },
    { name: 'Engineering Graphics Book', price: '₹250', views: 95, saves: 12, inquiries: 5, status: 'Active', badge: 'High Demand' },
    { name: 'Physics Lab Coat', price: '₹300', views: 45, saves: 4, inquiries: 1, status: 'Sold', badge: 'Completed' },
  ];

  const interestedBuyers = [
    { name: 'Rahul S.', item: 'Scientific Calculator', message: 'Is the price negotiable?', time: '2 hours ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul' },
    { name: 'Priya M.', item: 'Engineering Book', message: 'Can we meet at the library?', time: '5 hours ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya' },
    { name: 'Akash K.', item: 'Drawing Board', message: 'Is this still available?', time: '1 day ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Akash' },
  ];

  const recentActivity = [
    { type: 'message', text: 'New message from Rahul S. regarding Calculator', time: '2h ago', icon: MessageSquare, color: 'text-blue-500' },
    { type: 'wishlist', text: 'Engineering Book was added to 3 wishlists', time: '5h ago', icon: Heart, color: 'text-rose-500' },
    { type: 'sold', text: 'You successfully sold Physics Lab Coat', time: '1d ago', icon: CheckCircle, color: 'text-green-500' },
    { type: 'update', text: 'You updated the price for Drawing Board', time: '2d ago', icon: Edit, color: 'text-amber-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* 1. Header & Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Seller Dashboard</h1>
        <p className="text-slate-500 font-medium mb-6">Track your listings, monitor performance, and engage with buyers.</p>
        
        {/* Top Overview Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {overviewStats.map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900 leading-tight">{stat.value}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left/Main Column - 2/3 width */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Quick Actions & Performance (Split Row) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setActiveTab('post')} className="flex flex-col items-center justify-center p-4 bg-theme-maroon text-white rounded-xl shadow-md hover:bg-theme-dark-maroon transition-colors gap-2">
                  <PlusCircle className="w-6 h-6" />
                  <span className="text-sm font-bold">Post Listing</span>
                </button>
                <button onClick={() => setActiveTab('listings')} className="flex flex-col items-center justify-center p-4 bg-slate-50 text-slate-700 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors gap-2">
                  <Package className="w-6 h-6" />
                  <span className="text-sm font-bold">Manage Listings</span>
                </button>
                <button onClick={() => setActiveTab('messages')} className="flex flex-col items-center justify-center p-4 bg-slate-50 text-slate-700 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors gap-2">
                  <MessageSquare className="w-6 h-6" />
                  <span className="text-sm font-bold">Respond</span>
                </button>
                <button onClick={() => setActiveTab('analytics')} className="flex flex-col items-center justify-center p-4 bg-slate-50 text-slate-700 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors gap-2">
                  <BarChart2 className="w-6 h-6" />
                  <span className="text-sm font-bold">Analytics</span>
                </button>
              </div>
            </div>

            {/* Seller Performance (Mini) */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl shadow-lg text-white">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" /> Seller Performance
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Estimated Revenue</p>
                  <p className="text-2xl font-black text-white">₹12,450</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Conversion Rate</p>
                  <p className="text-2xl font-black text-white">3.4%</p>
                </div>
              </div>
              <div className="space-y-3 pt-3 border-t border-slate-700">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Revenue This Month</span>
                  <span className="font-bold text-green-400">+₹4,200</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Revenue This Week</span>
                  <span className="font-bold text-green-400">+₹850</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Avg. Product Views</span>
                  <span className="font-bold text-white">234/listing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sales Analytics Overview (Charts Placeholder) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Sales Analytics</h2>
              <select className="bg-slate-50 border border-slate-200 text-sm font-bold text-slate-600 rounded-lg px-3 py-1.5 outline-none focus:border-theme-maroon">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Semester</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fake Chart 1: Views vs Sales */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Activity (Views vs Sales)</h3>
                <div className="h-40 flex items-end gap-2 bg-slate-50 rounded-xl p-4 border border-slate-100">
                  {/* CSS Bars for visual */}
                  {[40, 65, 45, 80, 50, 90, 70].map((h, i) => (
                    <div key={`v-${i}`} className="w-full flex justify-center group relative">
                      <div className="absolute bottom-full mb-2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        Day {i+1}: {h*10} views
                      </div>
                      <div className="w-full max-w-[12px] bg-blue-200 rounded-t-sm" style={{ height: `${h}%` }}></div>
                      <div className="w-full max-w-[12px] bg-theme-maroon rounded-t-sm absolute bottom-0" style={{ height: `${h * 0.3}%` }}></div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-4 mt-3 text-xs font-medium text-slate-500">
                  <span className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-200 rounded-sm"></div> Views</span>
                  <span className="flex items-center gap-1"><div className="w-3 h-3 bg-theme-maroon rounded-sm"></div> Inquiries/Sales</span>
                </div>
              </div>

              {/* Fake Chart 2: Category Performance */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Category Performance</h3>
                <div className="space-y-3">
                  {[
                    { cat: 'Books', pct: 45, color: 'bg-blue-500' },
                    { cat: 'Calculators', pct: 25, color: 'bg-amber-500' },
                    { cat: 'Electronics', pct: 20, color: 'bg-emerald-500' },
                    { cat: 'Others', pct: 10, color: 'bg-slate-400' },
                  ].map((c, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-bold text-slate-700">{c.cat}</span>
                        <span className="font-medium text-slate-500">{c.pct}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className={`${c.color} h-2 rounded-full`} style={{ width: `${c.pct}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Top Performing Listings */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Top Performing Listings</h2>
              <button className="text-theme-maroon text-sm font-bold hover:underline">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 pl-2">Product</th>
                    <th className="pb-3 text-right">Price</th>
                    <th className="pb-3 text-center">Metrics</th>
                    <th className="pb-3 text-center">Status</th>
                    <th className="pb-3 text-right pr-2">Badge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {topListings.map((item, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors group">
                      <td className="py-4 pl-2">
                        <p className="font-bold text-slate-900 text-sm group-hover:text-theme-maroon transition-colors">{item.name}</p>
                      </td>
                      <td className="py-4 text-right font-black text-slate-900 text-sm">{item.price}</td>
                      <td className="py-4">
                        <div className="flex items-center justify-center gap-3 text-xs font-medium text-slate-500">
                          <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-blue-400" />{item.views}</span>
                          <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-rose-400" />{item.saves}</span>
                          <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5 text-amber-400" />{item.inquiries}</span>
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 text-right pr-2">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 px-2 py-1 rounded-md border border-amber-200">
                          <Zap className="w-3 h-3" /> {item.badge}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interested Buyers */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-theme-maroon" /> Interested Buyers
              </h2>
            </div>
            <div className="space-y-4">
              {interestedBuyers.map((buyer, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-slate-100 rounded-xl hover:border-theme-maroon/30 hover:shadow-sm transition-all bg-slate-50">
                  <div className="flex items-center gap-3">
                    <img src={buyer.avatar} alt={buyer.name} className="w-10 h-10 rounded-full bg-white border border-slate-200" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{buyer.name}</h4>
                      <p className="text-xs font-medium text-slate-500">Wants: <span className="font-bold text-theme-maroon">{buyer.item}</span></p>
                    </div>
                  </div>
                  <div className="flex-1 sm:px-6">
                    <p className="text-sm italic text-slate-600 bg-white p-2 rounded-lg border border-slate-100 truncate">"{buyer.message}"</p>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                    <span className="text-xs font-bold text-slate-400">{buyer.time}</span>
                    <button className="px-4 py-2 bg-theme-maroon text-white text-xs font-bold rounded-lg hover:bg-theme-dark-maroon transition-colors shadow-sm">
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column - 1/3 width Sidebar */}
        <div className="space-y-8">
          
          {/* Listing Inventory Overview */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Box className="w-5 h-5 text-slate-500" /> Inventory Overview
            </h2>
            <div className="space-y-3">
              {[
                { label: 'Active Listings', count: 18, color: 'bg-green-500' },
                { label: 'Sold Listings', count: 45, color: 'bg-blue-500' },
                { label: 'Drafts', count: 3, color: 'bg-slate-400' },
                { label: 'Expired', count: 2, color: 'bg-red-400' },
                { label: 'Pending Approval', count: 0, color: 'bg-amber-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${item.color}`}></div>
                    <span className="text-sm font-bold text-slate-700">{item.label}</span>
                  </div>
                  <span className="font-black text-slate-900 bg-white px-2 py-0.5 rounded shadow-sm border border-slate-100">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Seller Achievements */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" /> Seller Achievements
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center justify-center p-3 text-center bg-amber-50 border border-amber-100 rounded-xl">
                <span className="text-2xl mb-1">🏆</span>
                <span className="text-xs font-bold text-amber-700 leading-tight">Top Seller</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 text-center bg-green-50 border border-green-100 rounded-xl">
                <span className="text-2xl mb-1">⚡</span>
                <span className="text-xs font-bold text-green-700 leading-tight">Fast Responder</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 text-center bg-blue-50 border border-blue-100 rounded-xl">
                <span className="text-2xl mb-1">⭐</span>
                <span className="text-xs font-bold text-blue-700 leading-tight">Highly Rated</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 text-center bg-purple-50 border border-purple-100 rounded-xl">
                <span className="text-2xl mb-1">📦</span>
                <span className="text-xs font-bold text-purple-700 leading-tight">25+ Sold</span>
              </div>
            </div>
          </div>

          {/* Recent Seller Activity */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-theme-maroon" /> Recent Activity
            </h2>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent pl-6">
              {recentActivity.map((act, i) => (
                <div key={i} className="relative">
                  <div className={`absolute -left-[30px] p-1 rounded-full bg-white border border-slate-200 ${act.color}`}>
                    <act.icon className="w-3 h-3" />
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-800 mb-1 leading-tight">{act.text}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marketplace Insights (Compact) */}
          <div className="bg-gradient-to-br from-theme-dark-maroon to-theme-maroon p-6 rounded-2xl shadow-lg shadow-theme-maroon/20 text-white relative overflow-hidden group">
            <TrendingUp className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="font-bold text-white mb-4 relative z-10 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" /> Campus Insights
            </h3>
            <div className="space-y-3 relative z-10">
              <div className="flex justify-between items-center border-b border-white/20 pb-2">
                <span className="text-xs font-medium text-white/90">Active Students</span>
                <span className="text-sm font-bold">2,451</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/20 pb-2">
                <span className="text-xs font-medium text-white/90">Items Sold This Week</span>
                <span className="text-sm font-bold">142</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/20 pb-2">
                <span className="text-xs font-medium text-white/90">Popular Category</span>
                <span className="text-sm font-bold text-theme-light-maroon">Books</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-white/90">Marketplace Growth</span>
                <span className="text-sm font-bold text-green-400">+12%</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Simple stub for Users icon not imported
const Users = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export default SellerOverview;
