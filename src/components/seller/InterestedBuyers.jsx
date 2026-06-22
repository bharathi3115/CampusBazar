import React, { useState, useEffect } from 'react';
import { Users, MessageSquare, Star, TrendingUp, Eye, User, Clock, ChevronRight, X, Calendar, MapPin, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const InterestedBuyers = ({ setActiveTab, setSelectedConversationId }) => {
  const { user } = useAuth();
  const [buyers, setBuyers] = useState([]);
  const [selectedBuyer, setSelectedBuyer] = useState(null);

  useEffect(() => {
    if (user?._id) {
      fetchBuyers();
    }
  }, [user]);

  const fetchBuyers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/messages/conversations/${user._id}`);
      if (res.ok) {
        const data = await res.json();
        
        // Filter conversations where the current user is the seller
        const sellerConversations = data.filter(conv => conv.sellerId?._id === user._id);
        
        // Count interactions per buyer to determine 'REPEAT' badge
        const buyerCounts = {};
        sellerConversations.forEach(conv => {
          const bId = conv.buyerId?._id;
          if (bId) {
            buyerCounts[bId] = (buyerCounts[bId] || 0) + 1;
          }
        });

        const formattedBuyers = sellerConversations.map(conv => {
          const b = conv.buyerId;
          const isRepeat = (buyerCounts[b?._id] > 1) || (b?.stats?.itemsBought > 0);
          
          // Format last contact time nicely
          const lastContactDate = new Date(conv.lastMessageAt);
          const now = new Date();
          const diffMs = now - lastContactDate;
          const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
          const diffDays = Math.floor(diffHrs / 24);
          let lastContactStr = 'Just now';
          if (diffDays > 0) lastContactStr = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
          else if (diffHrs > 0) lastContactStr = `${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;

          return {
            id: conv._id,
            conversationId: conv._id,
            buyerId: b?._id,
            name: b?.name || 'Unknown Buyer',
            product: conv.productId?.title || 'Unknown Product',
            lastContact: lastContactStr,
            avatar: (!b?.avatarUrl || b.avatarUrl === 'null' || b.avatarUrl === 'undefined') ? `https://ui-avatars.com/api/?name=${encodeURIComponent(b?.name || b?.email || 'Buyer')}&background=random&color=fff` : b.avatarUrl,
            isRepeat,
            profile: b // store full buyer object for modal
          };
        });
        
        setBuyers(formattedBuyers);
      }
    } catch (err) {
      console.error('Failed to fetch interested buyers', err);
    }
  };

  const handleMessageClick = (conversationId) => {
    if (!conversationId) return;
    if (setSelectedConversationId && setActiveTab) {
      setSelectedConversationId(conversationId);
      setActiveTab('messages');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Interested Buyers</h1>
          <p className="text-slate-500 font-medium mt-1">Manage and engage with students who want to purchase your items.</p>
        </div>
      </div>

      {/* Buyers List */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="space-y-4">
          {buyers.length === 0 ? (
             <div className="text-center py-10 text-slate-500 font-medium">No interested buyers yet.</div>
          ) : (
            buyers.map(buyer => (
              <div key={buyer.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <img src={buyer.avatar} alt={buyer.name} className="w-14 h-14 rounded-full bg-white border-2 border-white shadow-sm flex-shrink-0 object-cover" />
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
                  <button onClick={() => handleMessageClick(buyer.conversationId)} className="flex-1 sm:flex-none px-4 py-2 bg-theme-maroon text-white text-sm font-bold rounded-lg shadow-sm hover:bg-theme-dark-maroon transition-colors flex items-center justify-center gap-2">
                    <MessageSquare className="w-4 h-4" /> Message
                  </button>
                  <button onClick={() => setSelectedBuyer(buyer)} className="flex-1 sm:flex-none px-4 py-2 bg-slate-100 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                    <User className="w-4 h-4" /> Profile
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Profile Modal */}
      {selectedBuyer && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedBuyer(null)}
              className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full text-slate-500 hover:text-slate-900 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="bg-gradient-to-br from-theme-maroon to-theme-dark-maroon p-8 flex flex-col items-center justify-center relative overflow-hidden text-center">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <img 
                src={selectedBuyer.avatar} 
                alt={selectedBuyer.name} 
                className="w-24 h-24 rounded-full border-4 border-white shadow-xl mb-4 relative z-10 object-cover bg-white"
              />
              <h2 className="text-2xl font-black text-white relative z-10">{selectedBuyer.name}</h2>
              <p className="text-theme-maroon-50 font-medium text-sm flex items-center gap-1 relative z-10 opacity-90 mt-1">
                {selectedBuyer.profile?.department || 'Student'}
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Campus</span>
                  <span className="font-bold text-slate-900">{selectedBuyer.profile?.campus || 'Not specified'}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Year</span>
                  <span className="font-bold text-slate-900">{selectedBuyer.profile?.year || 'Not specified'}</span>
                </div>
              </div>
              
              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-theme-maroon" /> Platform Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Items Bought</span>
                    <span className="font-bold text-slate-900">{selectedBuyer.profile?.stats?.itemsBought || 0}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Joined</span>
                    <span className="font-bold text-slate-900">
                      {selectedBuyer.profile?.createdAt ? new Date(selectedBuyer.profile.createdAt).toLocaleDateString() : 'Recently'}
                    </span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  handleMessageClick(selectedBuyer.conversationId);
                  setSelectedBuyer(null);
                }}
                className="w-full bg-theme-maroon text-white font-bold py-3.5 rounded-xl hover:bg-theme-dark-maroon transition-colors shadow-lg shadow-theme-maroon/20 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" /> Start Conversation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterestedBuyers;
