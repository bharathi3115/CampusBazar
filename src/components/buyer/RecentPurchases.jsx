import React, { useState, useEffect } from "react";
import { Package, Star, Calendar, Download, AlertCircle, MessageSquare, Clock, CheckCircle, Hash, ChevronRight } from "lucide-react";

const RecentPurchases = () => {
  const [data, setData] = useState({
    purchases: [],
    summary: {
      totalPurchases: 0,
      totalAmountSpent: 0,
      averageSellerRating: 0,
      purchasesThisMonth: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      // In a real app, we would handle pagination
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/marketplace/purchases?limit=5`);
      if (!response.ok) throw new Error("Failed to fetch purchases");
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
            <CheckCircle className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case "Pending Pickup":
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> Pending Pickup
          </span>
        );
      default:
        return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-50 text-slate-700 border border-slate-200">{status}</span>;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-pulse">
        <div className="h-6 w-48 bg-slate-200 rounded mb-6"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-100 rounded-xl"></div>
          ))}
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-50 rounded-xl border border-slate-100"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-1">
          <Package className="w-6 h-6 text-theme-maroon" />
          Recent Purchases
        </h2>
        <p className="text-sm text-slate-500">Track your latest purchases and transaction history.</p>
      </div>

      {/* Top Purchase Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Total Purchases</div>
          <div className="text-2xl font-black text-slate-900">{data.summary.totalPurchases}</div>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Amount Spent</div>
          <div className="text-2xl font-black text-theme-maroon">₹{data.summary.totalAmountSpent.toLocaleString("en-IN")}</div>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Avg. Seller Rating</div>
          <div className="text-2xl font-black text-slate-900 flex items-center gap-1">
            {data.summary.averageSellerRating} <Star className="w-5 h-5 text-yellow-500 fill-current" />
          </div>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">This Month</div>
          <div className="text-2xl font-black text-slate-900">{data.summary.purchasesThisMonth}</div>
        </div>
      </div>

      {error ? (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium">Error loading purchases: {error}</div>
      ) : data.purchases.length === 0 ? (
        <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 mb-1">No Recent Purchases</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">You haven't purchased any items yet. Start exploring the marketplace to find great deals on campus.</p>
          <button className="px-6 py-2 bg-theme-maroon text-white font-bold rounded-lg hover:bg-red-900 transition-colors">Browse Marketplace</button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.purchases.map((purchase) => (
            <div key={purchase._id} className="group border border-slate-200 rounded-xl p-4 sm:p-5 hover:border-slate-300 hover:shadow-md transition-all bg-white relative overflow-hidden">
              <div className="flex flex-col sm:flex-row gap-5">
                {/* Product Image */}
                <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                  {purchase.productImage ? (
                    <img src={purchase.productImage} alt={purchase.productName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-8 h-8 text-slate-300" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-xs font-bold text-theme-maroon bg-red-50 px-2 py-0.5 rounded uppercase tracking-wider mb-1.5 inline-block">{purchase.category}</span>
                        <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1">{purchase.productName}</h3>
                        <div className="text-sm text-slate-500 flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Hash className="w-3.5 h-3.5" /> ID: {purchase.transactionId}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" /> {formatDate(purchase.purchaseDate)}
                          </span>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-xl font-black text-slate-900 mb-2">₹{purchase.purchasePrice.toLocaleString("en-IN")}</div>
                        {getStatusBadge(purchase.status)}
                      </div>
                    </div>
                  </div>

                  {/* Seller Info & Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-between mt-4 pt-4 border-t border-slate-100 gap-4">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">{purchase.sellerName.charAt(0)}</div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 leading-none mb-1">Seller: {purchase.sellerName}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          {purchase.sellerRating} / 5.0
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors">
                        <MessageSquare className="w-3.5 h-3.5" /> Contact
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors">
                        <Download className="w-3.5 h-3.5" /> Receipt
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-theme-maroon bg-red-50 hover:bg-red-100 rounded-lg transition-colors ml-auto sm:ml-0">
                        Details <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {data.summary.totalPurchases > 5 && (
            <button className="w-full py-3 text-sm font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors">View All Purchases</button>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentPurchases;
