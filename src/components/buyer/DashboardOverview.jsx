import React, { useState, useEffect } from 'react';
import { 
  Tag, Package, Heart, MessageSquare, Eye, 
  Search, ShoppingBag, TrendingUp, Clock, ChevronRight
} from 'lucide-react';
import RecentPurchases from './RecentPurchases';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

const DashboardOverview = ({ setActiveTab }) => {
  const { wishlist } = useWishlist();
  const { user } = useAuth();
  const firstName = user?.name ? user.name.split(' ')[0] : 'User';

  const [stats, setStats] = useState({
    activeOrders: 0,
    itemsPurchased: 0,
    unreadMessages: 0,
    profileViews: user?.stats?.profileViews || 0,
    campusInsights: {
      activeStudents: 0,
      itemsSoldThisWeek: 0,
      popularCategory: 'Loading...'
    }
  });

  useEffect(() => {
    if (!user) return;
    const fetchDashboardData = async () => {
      try {
        // Fetch purchases summary
        const purchasesRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/marketplace/purchases?limit=1`);
        const purchasesData = await purchasesRes.json();
        
        // Fetch unread messages
        const msgRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/messages/conversations/${user._id}`);
        const convos = await msgRes.json();
        let unread = 0;
        convos.forEach(c => {
           const isMeBuyer = c.buyerId?._id === user._id || c.buyerId === user._id;
           unread += isMeBuyer ? (c.unreadByBuyer || 0) : (c.unreadBySeller || 0);
        });

        // Fetch marketplace stats
        const mktStatsRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/marketplace/stats`);
        const mktStats = await mktStatsRes.json();

        // Fetch trending categories
        const trendingRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/marketplace/trending-categories`);
        const trendingData = await trendingRes.json();
        const topCategory = trendingData.length > 0 ? trendingData[0].name : 'N/A';

        // Calculate active orders (for now mock or just use purchases this month)
        // Let's use purchases this month as a proxy for active orders
        const activeOrders = purchasesData.summary?.purchasesThisMonth || 0;
        const itemsPurchased = purchasesData.summary?.totalPurchases || 0;

        setStats({
          activeOrders,
          itemsPurchased,
          unreadMessages: unread,
          profileViews: user?.stats?.profileViews || 0,
          campusInsights: {
            activeStudents: mktStats.studentsOnline || 0,
            itemsSoldThisWeek: mktStats.itemsSoldThisWeek || 0,
            popularCategory: topCategory
          }
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    fetchDashboardData();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
      {/* Welcome & Stats Row */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Welcome back, {firstName}! 👋</h1>
        <p className="text-slate-500 font-medium mb-6">Here's what's happening in your campus marketplace today.</p>
        
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: 'Active Orders', value: stats.activeOrders.toString(), icon: Tag, color: 'text-blue-600', bg: 'bg-blue-100' },
            { label: 'Items Purchased', value: stats.itemsPurchased.toString(), icon: Package, color: 'text-green-600', bg: 'bg-green-100' },
            { label: 'Wishlist', value: wishlist.length.toString(), icon: Heart, color: 'text-rose-600', bg: 'bg-rose-100' },
            { label: 'Unread Messages', value: stats.unreadMessages.toString(), icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-100' },
            { label: 'Profile Views', value: stats.profileViews.toString(), icon: Eye, color: 'text-amber-600', bg: 'bg-amber-100', hideOnSm: true }
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
                { id: 'browse', label: 'Marketplace', icon: Search, color: 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200' },
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
                <span className="font-bold text-slate-900">{stats.campusInsights.activeStudents}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-sm font-medium text-slate-500">Items Purchased This Week</span>
                <span className="font-bold text-slate-900">{stats.campusInsights.itemsSoldThisWeek}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-500">Popular Category</span>
                <span className="font-bold text-theme-maroon">{stats.campusInsights.popularCategory}</span>
              </div>
            </div>
          </div>

        </div>
      </div>



      {/* Recent Purchases */}
      <div className="mt-6 sm:mt-8 w-full">
        <RecentPurchases />
      </div>


      
    </div>
  );
};

export default DashboardOverview;
