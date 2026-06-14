import React from 'react';
import { Users, MessageSquare, Star, TrendingUp, Eye, User, Clock, ChevronRight } from 'lucide-react';

const InterestedBuyers = () => {
  const buyers = [
    {
      id: 1,
      name: 'Rahul S.',
      product: 'Scientific Calculator',
      lastContact: '2 hours ago',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
      isRepeat: true
    },
    {
      id: 2,
      name: 'Priya M.',
      product: 'Engineering Graphics Book',
      lastContact: '5 hours ago',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
      isRepeat: false
    },
    {
      id: 3,
      name: 'Akash K.',
      product: 'Drawing Board',
      lastContact: '1 day ago',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Akash',
      isRepeat: false
    },
    {
      id: 4,
      name: 'Neha P.',
      product: 'Mountain Bicycle',
      lastContact: '2 days ago',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Neha',
      isRepeat: true
    },
    {
      id: 5,
      name: 'David K.',
      product: 'Physics Lab Coat',
      lastContact: '3 days ago',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      isRepeat: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Interested Buyers</h1>
          <p className="text-slate-500 font-medium mt-1">Manage and engage with students who want to purchase your items.</p>
        </div>
      </div>



      {/* Buyers List */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="space-y-4">
          {buyers.map(buyer => (
            <div key={buyer.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all group">
              <div className="flex items-center gap-4">
                <img src={buyer.avatar} alt={buyer.name} className="w-14 h-14 rounded-full bg-white border-2 border-white shadow-sm flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                    {buyer.name}
                    {buyer.isRepeat && <span className="text-[10px] bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-bold">REPEAT</span>}
                  </h4>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
                    <span className="text-sm font-bold text-theme-maroon">Interested in: {buyer.product}</span>
                    <span className="hidden sm:block text-slate-300">•</span>
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3"/> Last contact: {buyer.lastContact}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                <button className="flex-1 sm:flex-none px-4 py-2 bg-theme-maroon text-white text-sm font-bold rounded-lg shadow-sm hover:bg-theme-dark-maroon transition-colors flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Message
                </button>
                <button className="flex-1 sm:flex-none px-4 py-2 bg-slate-100 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                  <User className="w-4 h-4" /> Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterestedBuyers;
