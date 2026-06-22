import React, { useState, useEffect } from "react";
import { Package, DollarSign, Star, TrendingUp, Eye, Heart, MessageSquare, ChevronRight, CheckCircle } from "lucide-react";

const RecentSoldItems = () => {
  const [salesData, setSalesData] = useState([]);
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalItemsSold: 0,
    averageSellerRating: 0,
    bestSellingProduct: "N/A"
  });
  const [loading, setLoading] = useState(true);

  // Fallback dummy data
  const fallbackSales = [
    {
      _id: "1",
      productName: "Engineering Graphics Textbook",
      productImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400&h=400&fit=crop",
      category: "Books",
      purchasePrice: 250,
      buyerId: { name: "Rahul S." },
      purchaseDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      productId: { views: 45, wishlistCount: 12 },
      status: "Completed"
    },
    {
      _id: "2",
      productName: "Casio Scientific Calculator",
      productImage: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?q=80&w=400&h=400&fit=crop",
      category: "Calculators",
      purchasePrice: 500,
      buyerId: { name: "Priya M." },
      purchaseDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      productId: { views: 120, wishlistCount: 18 },
      status: "Completed"
    },
    {
      _id: "3",
      productName: "Physics Lab Coat",
      productImage: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400&h=400&fit=crop",
      category: "Lab Equipment",
      purchasePrice: 300,
      buyerId: { name: "Akash K." },
      purchaseDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      productId: { views: 85, wishlistCount: 9 },
      status: "Completed"
    },
    {
      _id: "4",
      productName: "Mountain Bicycle",
      productImage: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=400&h=400&fit=crop",
      category: "Bicycles",
      purchasePrice: 3500,
      buyerId: { name: "Neha P." },
      purchaseDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      productId: { views: 210, wishlistCount: 25 },
      status: "Completed"
    }
  ];

  const fallbackSummary = {
    totalRevenue: 4550,
    totalItemsSold: 4,
    averageSellerRating: "4.8",
    bestSellingProduct: "Mountain Bicycle"
  };

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/marketplace/seller/sales`);
        if (!response.ok) {
          throw new Error("Failed to fetch from backend");
        }
        const data = await response.json();
        setSalesData(data.sales || []);
        setSummary(data.summary || fallbackSummary);
      } catch (err) {
        console.warn("Backend unavailable or returned error, using fallback data:", err);
        setSalesData(fallbackSales);
        setSummary(fallbackSummary);
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, []);

  const formatDaysAgo = (dateStr) => {
    const days = Math.floor((new Date() - new Date(dateStr)) / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    if (days < 7) return `${days} days ago`;
    if (days === 7) return "1 week ago";
    return `${days} days ago`;
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-medium">Loading sales data...</div>;
  }

  return (
    <div className="w-full mt-6 sm:mt-8 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900 text-lg sm:text-xl flex items-center gap-2">
            <Package className="w-6 h-6 text-theme-maroon" />
            Recent Sold Items
          </h3>
          <p className="text-sm font-medium text-slate-500 mt-1">Track your latest successful sales and completed transactions.</p>
        </div>
      </div>

      {/* Sold Items List */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        {salesData.length === 0 ? (
          <div className="py-12 text-center text-slate-500 font-medium">
            <Package className="w-12 h-12 mx-auto text-slate-300 mb-4" />
            <p>Your sold items will appear here once you complete your first sale.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {salesData.map((item, i) => (
              <div
                key={item._id || i}
                className="flex flex-col md:flex-row gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-theme-maroon/30 hover:shadow-md transition-all group">
                <div className="relative w-full md:w-32 h-24 flex-shrink-0">
                  <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover rounded-lg border border-slate-200" />
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">SOLD</span>
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-theme-maroon transition-colors line-clamp-1">{item.productName}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-theme-maroon bg-theme-maroon/10 px-2 py-0.5 rounded-md">{item.category}</span>
                        <span className="text-xs font-medium text-slate-500">
                          Sold to: <span className="font-bold text-slate-700">{item.buyerId?.name || "Unknown"}</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-black text-lg text-slate-900">₹{item.purchasePrice}</p>
                      <p className="text-xs font-bold text-slate-400">{formatDaysAgo(item.purchaseDate)}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 mt-3 pt-3 border-t border-slate-200/60">
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                      <div className="flex items-center gap-1.5" title="Total Views">
                        <Eye className="w-4 h-4 text-slate-400" /> {item.productId?.views || 0}
                      </div>
                      <div className="flex items-center gap-1.5" title="Wishlist Saves">
                        <Heart className="w-4 h-4 text-rose-400" /> {item.productId?.wishlistCount || 0}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-theme-maroon hover:bg-theme-maroon/10 rounded-md transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Contact Buyer">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors" title="View Transaction">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors" title="View Buyer Rating">
                        <Star className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <button className="w-full mt-4 py-3 bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 hover:text-theme-maroon hover:bg-theme-maroon/5 hover:border-theme-maroon/20 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2">
          View All Sold Items <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default RecentSoldItems;
