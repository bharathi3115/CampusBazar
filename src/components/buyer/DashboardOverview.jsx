import React from 'react';
import { 
  Tag, CheckCircle, Heart, MessageSquare, Eye, 
  Search, ShoppingBag, TrendingUp, Clock, ChevronRight
} from 'lucide-react';

const DashboardOverview = ({ setActiveTab }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
      {/* Welcome & Stats Row */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Welcome back, John! 👋</h1>
        <p className="text-slate-500 font-medium mb-6">Here's what's happening in your campus marketplace today.</p>
        
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: 'Active Listings', value: '4', icon: Tag, color: 'text-blue-600', bg: 'bg-blue-100' },
            { label: 'Items Sold', value: '12', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
            { label: 'Wishlist', value: '8', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-100' },
            { label: 'Unread Messages', value: '3', icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-100' },
            { label: 'Profile Views', value: '142', icon: Eye, color: 'text-amber-600', bg: 'bg-amber-100', hideOnSm: true }
          ].map((stat, i) => (
            <div key={i} className={`bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow ${stat.hideOnSm ? 'col-span-2 lg:col-span-1' : ''}`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { id: 'browse', label: 'Browse Marketplace', icon: Search, color: 'bg-theme-maroon text-white hover:bg-theme-dark-maroon shadow-md border border-transparent' },
                { id: 'wishlist', label: 'View Wishlist', icon: Heart, color: 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200' },
                { id: 'messages', label: 'Open Messages', icon: MessageSquare, color: 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200' },
                { id: 'purchases', label: 'My Purchases', icon: ShoppingBag, color: 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200' },
              ].map((action, i) => (
                <button key={i} onClick={() => setActiveTab(action.id)} className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all gap-2 ${action.color}`}>
                  <action.icon className="w-6 h-6" />
                  <span className="text-sm font-bold text-center">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column - Sidebar Widgets */}
        <div className="space-y-6 sm:space-y-8">
          
          {/* Campus Insights */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
            <TrendingUp className="absolute -right-4 -bottom-4 w-32 h-32 text-slate-50 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="font-bold text-slate-900 mb-4 relative z-10 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-theme-maroon" /> Campus Insights
            </h3>
            <div className="space-y-3 relative z-10">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-sm font-medium text-slate-500">Active Students</span>
                <span className="font-bold text-slate-900">2,451</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-sm font-medium text-slate-500">Items Sold This Week</span>
                <span className="font-bold text-slate-900">142</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-500">Popular Category</span>
                <span className="font-bold text-theme-maroon">Books</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Recently Viewed Items - Full Width */}
      <div className="mt-6 sm:mt-8 w-full">
        <div className="mb-6">
          <h3 className="font-bold text-slate-900 text-lg sm:text-xl">Recently Viewed Items</h3>
          <p className="text-sm font-medium text-slate-500 mt-1">Quickly access products you've recently explored.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {[
            { title: 'Physics Book', category: 'Books', price: '₹20', seller: 'John D.', time: 'Viewed 2 hours ago' },
            { title: 'Scientific Calculator', category: 'Electronics', price: '₹15', seller: 'Emma S.', time: 'Viewed 3 hours ago' },
            { title: 'Bicycle', category: 'Transport', price: '₹80', seller: 'Mike T.', time: 'Viewed 1 day ago' },
            { title: 'Laptop Stand', category: 'Accessories', price: '₹12', seller: 'Sarah M.', time: 'Viewed 2 days ago' },
            { title: 'Lab Coat', category: 'Apparel', price: '₹18', seller: 'Prof. Miller', time: 'Viewed 2 days ago' },
            { title: 'Engineering Graphics Textbook', category: 'Books', price: '₹25', seller: 'Alice W.', time: 'Viewed 3 days ago' }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:border-theme-maroon/50 hover:shadow-md transition-all duration-300 p-4 flex flex-col group relative cursor-pointer">
              <button className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors">
                <Heart className="w-4 h-4" />
              </button>
              <div className="pr-8">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-slate-900 text-sm truncate">{item.title}</h4>
                </div>
                <p className="text-xs font-medium text-slate-600 mb-3">
                  <span className="font-bold text-theme-maroon">{item.price}</span> <span className="mx-1 text-slate-300">•</span> {item.seller}
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5" /> <span>{item.time}</span>
                </div>
                <button className="text-xs font-bold text-slate-400 group-hover:text-theme-maroon transition-colors flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Messages - Wider Horizontal Layout */}
      <div className="mt-6 sm:mt-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-900 text-lg sm:text-xl">Recent Messages</h3>
          <span className="text-sm font-bold text-white bg-red-500 px-3 py-1 rounded-full shadow-sm shadow-red-500/20">3 New</span>
        </div>
        <div className="space-y-4">
          {[
            { name: 'Sarah M.', item: 'Calculus Book', msg: 'Is this still available?', time: '10m ago', unread: true },
            { name: 'David K.', item: 'Bicycle', msg: 'Can you do $40?', time: '2h ago', unread: false },
            { name: 'Prof. Miller', item: 'Lab Coat', msg: 'Sure, meet me at the lab.', time: '1d ago', unread: false }
          ].map((chat, i) => (
            <div key={i} className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border ${chat.unread ? 'border-theme-maroon/30 bg-theme-maroon/5' : 'border-slate-100 bg-slate-50 hover:bg-white'} hover:border-theme-maroon/50 hover:shadow-md transition-all cursor-pointer group`}>
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.name}`} className="w-12 h-12 rounded-full bg-white border-2 border-white shadow-sm flex-shrink-0" alt="" />
              <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6">
                <div className="flex flex-col min-w-0 sm:w-1/4">
                  <h4 className={`text-base ${chat.unread ? 'font-bold text-slate-900' : 'font-bold text-slate-700'} group-hover:text-theme-maroon transition-colors truncate`}>{chat.name}</h4>
                  <span className="text-xs font-bold text-theme-maroon truncate">[{chat.item}]</span>
                </div>
                <p className={`text-sm flex-1 truncate ${chat.unread ? 'font-bold text-slate-800' : 'font-medium text-slate-500'}`}>
                  {chat.msg}
                </p>
                <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0 sm:w-24">
                  <span className="text-xs font-bold text-slate-400 whitespace-nowrap">{chat.time}</span>
                  {chat.unread ? (
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-sm shadow-red-500/50"></span>
                  ) : (
                    <span className="w-2.5 h-2.5"></span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-6 py-3.5 bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 hover:text-theme-maroon hover:bg-theme-maroon/5 hover:border-theme-maroon/20 rounded-xl transition-all shadow-sm">
          View All Messages
        </button>
      </div>
      
    </div>
  );
};

export default DashboardOverview;
