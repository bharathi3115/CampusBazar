import React from 'react';
import { Star, Package, DollarSign, Eye, Heart, Award, CheckCircle, Edit3, MapPin, Building, Calendar, ShieldCheck } from 'lucide-react';

const SellerProfile = () => {
  const seller = {
    name: 'John Doe',
    email: 'john@campus.edu',
    department: 'Computer Science',
    college: 'Campus University',
    joined: 'Jan 2025',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random&color=fff',
    bio: 'Hi, I am a 3rd-year CS student. I sell textbooks and electronics in good condition. Open to negotiations but please be reasonable. Meetups usually near the central library.',
    stats: {
      rating: 4.8,
      itemsSold: 24,
      revenue: 18500,
      profileViews: 1245,
      wishlistSaves: 87
    },
    reviews: [
      { id: 1, buyer: 'Priya M.', rating: 5, comment: 'Great seller, quick response.', date: '1 week ago' },
      { id: 2, buyer: 'Akash K.', rating: 5, comment: 'Product was exactly as described.', date: '2 weeks ago' },
      { id: 3, buyer: 'Neha P.', rating: 4, comment: 'Smooth transaction.', date: '1 month ago' }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden relative">
        <div className="h-32 bg-gradient-to-r from-theme-maroon to-rose-600"></div>
        <div className="px-6 sm:px-10 pb-8 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 -mt-16">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
              <div className="relative">
                <img src={seller.avatar} alt={seller.name} className="w-32 h-32 rounded-2xl bg-white border-4 border-white shadow-lg" />
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-xl border-2 border-white shadow-sm" title="Verified Seller">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>
              <div className="text-center sm:text-left mb-2 sm:mb-0">
                <h1 className="text-3xl font-black text-slate-900">{seller.name}</h1>
                <p className="text-slate-500 font-medium">{seller.email}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2">
                  <span className="flex items-center gap-1 text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full"><Building className="w-3 h-3"/> {seller.department}</span>
                  <span className="flex items-center gap-1 text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full"><MapPin className="w-3 h-3"/> {seller.college}</span>
                  <span className="flex items-center gap-1 text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full"><Calendar className="w-3 h-3"/> Since {seller.joined}</span>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-slate-100 text-slate-700 hover:bg-slate-200 px-5 py-2.5 rounded-xl font-bold transition-colors">
              <Edit3 className="w-4 h-4" /> Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
          <Star className="w-6 h-6 text-amber-400 mb-2 fill-amber-400" />
          <p className="text-2xl font-black text-slate-900">{seller.stats.rating}<span className="text-sm font-bold text-slate-400">/5</span></p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Rating</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
          <Package className="w-6 h-6 text-blue-500 mb-2" />
          <p className="text-2xl font-black text-slate-900">{seller.stats.itemsSold}</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Items Sold</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
          <DollarSign className="w-6 h-6 text-emerald-500 mb-2" />
          <p className="text-2xl font-black text-slate-900">₹{seller.stats.revenue.toLocaleString()}</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Revenue</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
          <Eye className="w-6 h-6 text-purple-500 mb-2" />
          <p className="text-2xl font-black text-slate-900">{seller.stats.profileViews.toLocaleString()}</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Profile Views</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center col-span-2 md:col-span-1">
          <Heart className="w-6 h-6 text-rose-500 mb-2" />
          <p className="text-2xl font-black text-slate-900">{seller.stats.wishlistSaves}</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Saves</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Bio & Achievements */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 mb-3 flex items-center gap-2"><User className="w-5 h-5 text-theme-maroon"/> About Me</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{seller.bio}</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-theme-maroon"/> Achievements</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-500"><Award className="w-5 h-5"/></div>
                <div>
                  <p className="font-bold text-sm text-slate-900">Top Rated Seller</p>
                  <p className="text-xs font-medium text-slate-500">Maintained 4.8+ rating for 6 months</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-500"><CheckCircle className="w-5 h-5"/></div>
                <div>
                  <p className="font-bold text-sm text-slate-900">Fast Responder</p>
                  <p className="text-xs font-medium text-slate-500">Replies within 1 hour</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-500"><ShieldCheck className="w-5 h-5"/></div>
                <div>
                  <p className="font-bold text-sm text-slate-900">Verified Student</p>
                  <p className="text-xs font-medium text-slate-500">University email confirmed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Reviews */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2"><Star className="w-5 h-5 text-theme-maroon"/> Recent Reviews</h3>
              <button className="text-sm font-bold text-theme-maroon hover:text-theme-dark-maroon">View All</button>
            </div>
            
            <div className="space-y-4">
              {seller.reviews.map(review => (
                <div key={review.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{review.buyer}</span>
                      <span className="flex items-center text-amber-400">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-slate-400">{review.date}</span>
                  </div>
                  <p className="text-sm text-slate-600">"{review.comment}"</p>
                </div>
              ))}
            </div>
            
            {seller.reviews.length === 0 && (
               <div className="py-8 text-center text-slate-400">No reviews yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
