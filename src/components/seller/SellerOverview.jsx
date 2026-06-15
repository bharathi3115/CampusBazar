import React from 'react';
import { 
  Package, CheckCircle, Eye, MessageSquare, Heart, Star,
  PlusCircle, Settings, TrendingUp, DollarSign, Activity, ChevronRight,
  TrendingDown, Box, Clock, Edit, CheckSquare, BarChart2, Zap, Award
} from 'lucide-react';
import RecentSoldItems from './RecentSoldItems';

import { useAuth } from '../../context/AuthContext';

const SellerOverview = ({ setActiveTab }) => {
  const { user } = useAuth();
  const firstName = user?.name ? user.name.split(' ')[0] : 'User';
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
          
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Welcome back, {firstName}! Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button onClick={() => setActiveTab('post')} className="flex flex-col items-center justify-center p-4 bg-slate-50 text-slate-700 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors gap-2">
                <PlusCircle className="w-6 h-6" />
                <span className="text-sm font-bold text-center">Post Listing</span>
              </button>
              <button onClick={() => setActiveTab('listings')} className="flex flex-col items-center justify-center p-4 bg-slate-50 text-slate-700 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors gap-2">
                <Package className="w-6 h-6" />
                <span className="text-sm font-bold text-center">Manage Listings</span>
              </button>
              <button onClick={() => setActiveTab('buyers')} className="flex flex-col items-center justify-center p-4 bg-slate-50 text-slate-700 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors gap-2">
                <Users className="w-6 h-6" />
                <span className="text-sm font-bold text-center">Buyers</span>
              </button>
              <button onClick={() => setActiveTab('messages')} className="flex flex-col items-center justify-center p-4 bg-slate-50 text-slate-700 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors gap-2">
                <MessageSquare className="w-6 h-6" />
                <span className="text-sm font-bold text-center">Messages</span>
              </button>
            </div>
          </div>





        </div>

        {/* Right Column - 1/3 width Sidebar */}
        <div className="space-y-8">
          






          {/* Marketplace Insights (Compact) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
            <TrendingUp className="absolute -right-4 -bottom-4 w-24 h-24 text-slate-50 group-hover:scale-110 transition-transform duration-500" />
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

      {/* Recent Sold Items */}
      <RecentSoldItems />

      {/* Recent Messages - Wider Horizontal Layout */}
      <div className="mt-6 sm:mt-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-900 text-lg sm:text-xl">Recent Messages</h3>
          <span className="text-sm font-bold text-white bg-theme-maroon px-3 py-1 rounded-full shadow-sm shadow-theme-maroon/20">3 New</span>
        </div>
        <div className="space-y-4">
          {interestedBuyers.map((buyer, i) => {
            const unread = i === 0; // Just to mimic unread behavior
            return (
            <div key={i} className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border ${unread ? 'border-theme-maroon/30 bg-theme-maroon/5' : 'border-slate-100 bg-slate-50 hover:bg-white'} hover:border-theme-maroon/50 hover:shadow-md transition-all cursor-pointer group`}>
              <img src={buyer.avatar} className="w-12 h-12 rounded-full bg-white border-2 border-white shadow-sm flex-shrink-0" alt="" />
              <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6">
                <div className="flex flex-col min-w-0 sm:w-1/4">
                  <h4 className={`text-base ${unread ? 'font-bold text-slate-900' : 'font-bold text-slate-700'} group-hover:text-theme-maroon transition-colors truncate`}>{buyer.name}</h4>
                  <span className="text-xs font-bold text-theme-maroon truncate">[{buyer.item}]</span>
                </div>
                <p className={`text-sm flex-1 truncate ${unread ? 'font-bold text-slate-800' : 'font-medium text-slate-500'}`}>
                  {buyer.message}
                </p>
                <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0 sm:w-24">
                  <span className="text-xs font-bold text-slate-400 whitespace-nowrap">{buyer.time}</span>
                  {unread ? (
                    <span className="w-2.5 h-2.5 bg-theme-maroon rounded-full shadow-sm shadow-theme-maroon/50"></span>
                  ) : (
                    <span className="w-2.5 h-2.5"></span>
                  )}
                </div>
              </div>
            </div>
            );
          })}
        </div>
        <button className="w-full mt-6 py-3.5 bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 hover:text-theme-maroon hover:bg-theme-maroon/5 hover:border-theme-maroon/20 rounded-xl transition-all shadow-sm">
          View All Messages
        </button>
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
