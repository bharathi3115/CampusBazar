import React, { useState, useEffect } from "react";
import {
  Package,
  CheckCircle,
  Eye,
  MessageSquare,
  Heart,
  Star,
  PlusCircle,
  Settings,
  TrendingUp,
  DollarSign,
  Activity,
  ChevronRight,
  TrendingDown,
  Box,
  Clock,
  Edit,
  CheckSquare,
  BarChart2,
  Zap,
  Award
} from "lucide-react";
import RecentSoldItems from "./RecentSoldItems";

import { useAuth } from "../../context/AuthContext";

const SellerOverview = ({ setActiveTab }) => {
  const { user } = useAuth();
  const firstName = user?.name ? user.name.split(" ")[0] : "User";

  const [stats, setStats] = useState({
    itemsSold: 0,
    listingViews: 0,
    buyerInquiries: 0,
    wishlistSaves: 0,
    campusInsights: {
      activeStudents: 0,
      itemsSoldThisWeek: 0,
      popularCategory: "Loading..."
    }
  });

  useEffect(() => {
    if (!user) return;
    const fetchSellerData = async () => {
      try {
        // Fetch sales summary
        const salesRes = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/marketplace/seller/sales`);
        const salesData = await salesRes.json();
        const summary = salesData.summary || {};

        // Fetch seller's products to aggregate views and wishlist saves
        const productsRes = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/marketplace/seller/${user._id}/products`);
        const products = await productsRes.json();
        let totalViews = 0;
        let totalWishlistSaves = 0;
        products.forEach((p) => {
          totalViews += p.views || 0;
          totalWishlistSaves += p.wishlistCount || 0;
        });

        // Fetch inquiries (unread messages)
        const msgRes = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/messages/conversations/${user._id}`);
        const convos = await msgRes.json();
        let inquiries = 0;
        convos.forEach((c) => {
          const isMeSeller = c.sellerId?._id === user._id || c.sellerId === user._id;
          inquiries += isMeSeller ? c.unreadBySeller || 0 : 0;
        });

        // Fetch marketplace stats
        const mktStatsRes = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/marketplace/stats`);
        const mktStats = await mktStatsRes.json();

        // Fetch trending categories
        const trendingRes = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/marketplace/trending-categories`);
        const trendingData = await trendingRes.json();
        const topCategory = trendingData.length > 0 ? trendingData[0].name : "N/A";

        setStats({
          itemsSold: summary.totalItemsSold || 0,
          listingViews: totalViews,
          buyerInquiries: inquiries,
          wishlistSaves: totalWishlistSaves,
          campusInsights: {
            activeStudents: mktStats.studentsOnline || 0,
            itemsSoldThisWeek: mktStats.itemsSoldThisWeek || 0,
            popularCategory: topCategory
          }
        });
      } catch (err) {
        console.error("Error fetching seller data:", err);
      }
    };
    fetchSellerData();
  }, [user]);

  const overviewStats = [
    { label: "Items Sold", value: stats.itemsSold.toString(), icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
    { label: "Listing Views", value: stats.listingViews.toString(), icon: Eye, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "Buyer Inquiries", value: stats.buyerInquiries.toString(), icon: MessageSquare, color: "text-amber-600", bg: "bg-amber-100" },
    { label: "Wishlist Saves", value: stats.wishlistSaves.toString(), icon: Heart, color: "text-rose-600", bg: "bg-rose-100" }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* 1. Header & Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-2">
          Welcome back, {firstName}! <span className="text-2xl">👋</span>
        </h1>
        <p className="text-slate-500 font-medium mb-6">Here's what's happening in your campus marketplace today.</p>

        {/* Top Overview Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button
                onClick={() => setActiveTab("post")}
                className="flex flex-col items-center justify-center p-4 bg-slate-50 text-slate-700 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors gap-2">
                <PlusCircle className="w-6 h-6" />
                <span className="text-sm font-bold text-center">Post Listing</span>
              </button>
              <button
                onClick={() => setActiveTab("listings")}
                className="flex flex-col items-center justify-center p-4 bg-slate-50 text-slate-700 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors gap-2">
                <Package className="w-6 h-6" />
                <span className="text-sm font-bold text-center">Manage Listings</span>
              </button>
              <button
                onClick={() => setActiveTab("buyers")}
                className="flex flex-col items-center justify-center p-4 bg-slate-50 text-slate-700 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors gap-2">
                <Users className="w-6 h-6" />
                <span className="text-sm font-bold text-center">Buyers</span>
              </button>
              <button
                onClick={() => setActiveTab("messages")}
                className="flex flex-col items-center justify-center p-4 bg-slate-50 text-slate-700 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors gap-2">
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
                <span className="font-bold text-slate-900">{stats.campusInsights.activeStudents}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-sm font-medium text-slate-500">Items Sold This Week</span>
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

      {/* Recent Sold Items */}
      <RecentSoldItems />
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
