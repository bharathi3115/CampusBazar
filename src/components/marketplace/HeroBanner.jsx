import React from "react";
import { Users, Tag, CheckCircle, TrendingUp, Sparkles } from "lucide-react";

const HeroBanner = ({ stats }) => {
  return (
    <div className="relative bg-theme-maroon rounded-3xl overflow-hidden shadow-xl shadow-theme-maroon/20 mb-8 mt-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

      <div className="relative z-10 p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="text-white max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> CampusBazaar Marketplace
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
            Discover What Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">Campus</span> Has To Offer
          </h1>
          <p className="text-theme-maroon-100 text-lg opacity-90 mb-8 max-w-md">
            The easiest way to buy and sell textbooks, electronics, bicycles, and hostel essentials within your college community.
          </p>
          <button className="bg-white text-theme-maroon px-8 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-lg flex items-center gap-2 group">
            Start Exploring <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
          {[
            { label: "Active Listings", value: stats.activeListings || "1,240+", icon: Tag, color: "text-blue-500" },
            { label: "Students Online", value: stats.studentsOnline || "342", icon: Users, color: "text-amber-500" },
            { label: "Verified Sellers", value: stats.verifiedSellers || "89", icon: CheckCircle, color: "text-green-500" },
            { label: "Items Sold This Month", value: stats.itemsSoldThisWeek || "450+", icon: TrendingUp, color: "text-purple-500" }
          ].map((stat, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white/20 transition-colors">
              <stat.icon className={`w-8 h-8 mb-2 ${stat.color} drop-shadow-md`} />
              <span className="text-2xl font-black text-white">{stat.value}</span>
              <span className="text-xs font-bold text-white/80 uppercase tracking-wider mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
