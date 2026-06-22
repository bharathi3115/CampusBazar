import React, { useState } from "react";
import { Heart, TrendingDown, Clock, Tag, MessageSquare, Trash2, Share2, Eye, Users, ShieldCheck, Search, Activity, Sparkles } from "lucide-react";
import ProductCard from "../marketplace/ProductCard";

import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

const Wishlist = ({ setActiveTab }) => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { user } = useAuth();

  const handleMessageSeller = async (product) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/messages/conversation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerId: user._id,
          productId: product._id
        })
      });
      if (res.ok) {
        if (setActiveTab) setActiveTab("messages");
      } else {
        const error = await res.json();
        alert(error.message || "Failed to initiate chat.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  };

  const handleRemove = (id) => {
    removeFromWishlist(id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 pb-12">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">My Wishlist</h1>
          <p className="text-slate-500 font-medium">Keep track of products you're interested in.</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 border-dashed p-16 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-6">
            <Heart className="w-12 h-12 text-rose-300" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 mb-3">Your wishlist is empty</h3>
          <p className="text-slate-500 max-w-md mx-auto mb-8 text-lg">Start exploring the marketplace and save products you're interested in purchasing later.</p>
          <button className="px-8 py-3.5 bg-theme-maroon text-white font-bold rounded-xl hover:bg-theme-dark-maroon shadow-lg transition-all flex items-center gap-2">
            <Search className="w-5 h-5" /> Browse Marketplace
          </button>
        </div>
      </div>
    );
  }

  const priceDrops = wishlist.filter((item) => item.priceDrop);

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">My Wishlist</h1>
        <p className="text-slate-500 font-medium text-lg">Keep track of products you're interested in.</p>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left/Main Column: Wishlist Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">Saved Items</h2>
            <span className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{wishlist.length} Items</span>
          </div>

          <div className="space-y-4">
            {[...wishlist].reverse().map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-theme-maroon/30 hover:shadow-lg transition-all flex flex-col sm:flex-row gap-5 group">
                {/* Image */}
                <div className="relative w-full sm:w-40 h-40 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {/* Badges removed as requested */}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-xs font-bold text-theme-maroon uppercase tracking-wider mb-1 block">{item.category}</span>
                      <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2 group-hover:text-theme-maroon transition-colors">{item.title}</h3>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-black text-slate-900">₹{item.price}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-slate-400" /> Condition: <strong className="text-slate-700">{item.condition}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> Added {item.addedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-slate-400" /> {item.views} Views
                    </span>
                    {item.interestedBuyers > 0 && (
                      <span className="flex items-center gap-1 text-blue-600">
                        <Users className="w-3.5 h-3.5" /> {item.interestedBuyers} Interested
                      </span>
                    )}
                  </div>

                  {/* Actions & Seller */}
                  <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                        <span className="text-xs font-bold text-slate-600">{item.seller?.name ? item.seller.name.charAt(0) : "U"}</span>
                      </div>
                      <span className="text-sm font-bold text-slate-900 flex items-center gap-1">
                        {item.seller?.name || "Unknown Seller"}
                        {item.seller?.verified && <ShieldCheck className="w-3.5 h-3.5 text-blue-500" title="Verified Seller" />}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleMessageSeller(item)}
                        className="flex-1 sm:flex-none p-2.5 bg-theme-maroon text-white hover:bg-theme-dark-maroon rounded-xl transition-colors font-bold text-sm shadow-sm flex items-center justify-center gap-1.5">
                        <MessageSquare className="w-4 h-4" /> <span className="hidden sm:inline">Contact</span>
                      </button>
                      <button
                        className="p-2.5 bg-slate-50 text-slate-600 hover:text-red-500 hover:bg-red-50 border border-slate-200 hover:border-red-200 rounded-xl transition-colors shadow-sm"
                        title="Remove from Wishlist"
                        onClick={() => handleRemove(item._id)}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="space-y-8"></div>
      </div>
    </div>
  );
};

// Needed for Lucide Star since it's not imported at the top
const Star = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default Wishlist;
