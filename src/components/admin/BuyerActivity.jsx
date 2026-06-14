import React from 'react';
import { ShoppingBag, Heart, MessageSquare, Activity } from 'lucide-react';

const BuyerActivity = () => {
  const buyers = [
    { id: 1, name: 'Suresh Kumar', purchases: 15, wishlist: 22, messages: 45, score: 98 },
    { id: 2, name: 'Neha Gupta', purchases: 12, wishlist: 18, messages: 32, score: 85 },
    { id: 3, name: 'Vikas Singh', purchases: 8, wishlist: 35, messages: 28, score: 76 },
    { id: 4, name: 'Anjali Sharma', purchases: 5, wishlist: 12, messages: 15, score: 60 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-500" /> Buyer Engagement & Activity
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-xs border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Buyer Name</th>
              <th className="px-6 py-4 text-center">Total Purchases</th>
              <th className="px-6 py-4 text-center">Wishlist Count</th>
              <th className="px-6 py-4 text-center">Messages Sent</th>
              <th className="px-6 py-4 text-right">Activity Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {buyers.map((buyer) => (
              <tr key={buyer.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">{buyer.name}</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold text-emerald-700 bg-emerald-50">
                    <ShoppingBag className="w-3.5 h-3.5" /> {buyer.purchases}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold text-rose-700 bg-rose-50">
                    <Heart className="w-3.5 h-3.5" /> {buyer.wishlist}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold text-blue-700 bg-blue-50">
                    <MessageSquare className="w-3.5 h-3.5" /> {buyer.messages}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${buyer.score > 80 ? 'bg-emerald-500' : buyer.score > 60 ? 'bg-amber-500' : 'bg-slate-300'}`} style={{ width: `${buyer.score}%` }}></div>
                    </div>
                    <span className="font-black text-slate-700">{buyer.score}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuyerActivity;
