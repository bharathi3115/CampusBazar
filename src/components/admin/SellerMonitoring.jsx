import React from "react";
import { Star, Award, TrendingUp, Package } from "lucide-react";

const SellerMonitoring = () => {
  const sellers = [
    { id: 1, name: "John Doe", listings: 25, sold: 18, rating: 4.8, revenue: "₹4,500", rank: 1 },
    { id: 2, name: "Rahul Sharma", listings: 18, sold: 12, rating: 4.5, revenue: "₹3,200", rank: 2 },
    { id: 3, name: "Priya Patel", listings: 15, sold: 10, rating: 4.9, revenue: "₹2,800", rank: 3 },
    { id: 4, name: "Amit Kumar", listings: 8, sold: 5, rating: 4.2, revenue: "₹1,500", rank: 4 }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" /> Top Performing Sellers
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 border-b border-slate-100">
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
          <p className="text-sm font-bold text-amber-800 mb-1">Highest Rated</p>
          <p className="text-xl font-black text-amber-900">Priya Patel (4.9)</p>
        </div>
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
          <p className="text-sm font-bold text-emerald-800 mb-1">Most Sales</p>
          <p className="text-xl font-black text-emerald-900">John Doe (18)</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
          <p className="text-sm font-bold text-blue-800 mb-1">Most Active</p>
          <p className="text-xl font-black text-blue-900">John Doe (25 list)</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
          <p className="text-sm font-bold text-purple-800 mb-1">Total Seller Revenue</p>
          <p className="text-xl font-black text-purple-900">₹12,000+</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-xs border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">Seller Name</th>
              <th className="px-6 py-4 text-center">Total Listings</th>
              <th className="px-6 py-4 text-center">Items Sold</th>
              <th className="px-6 py-4 text-center">Rating</th>
              <th className="px-6 py-4 text-right">Revenue Generated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sellers.map((seller) => (
              <tr key={seller.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${seller.rank === 1 ? "bg-amber-100 text-amber-600" : seller.rank === 2 ? "bg-slate-200 text-slate-600" : seller.rank === 3 ? "bg-orange-100 text-orange-600" : "bg-slate-100 text-slate-500"}`}>
                    #{seller.rank}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-slate-900">{seller.name}</td>
                <td className="px-6 py-4 text-center font-medium text-slate-700">{seller.listings}</td>
                <td className="px-6 py-4 text-center font-medium text-slate-700">{seller.sold}</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-current" /> {seller.rating}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-black text-emerald-600">{seller.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerMonitoring;
