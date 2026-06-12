import React, { useState } from 'react';
import { Heart, TrendingDown, Clock, Tag, MessageSquare, Trash2, Share2, Eye, Users, ShieldCheck, Search, Activity, Sparkles } from 'lucide-react';
import ProductCard from '../marketplace/ProductCard';

const DUMMY_WISHLIST = [
  {
    _id: 'w1',
    title: 'Engineering Graphics Textbook',
    price: 250,
    category: 'Books',
    condition: 'Like New',
    seller: { name: 'Rahul S.', verified: false },
    addedAt: '2 days ago',
    views: 45,
    img: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400&h=400&fit=crop',
    interestedBuyers: 0,
    priceDrop: false
  },
  {
    _id: 'w2',
    title: 'Casio Scientific Calculator',
    price: 500,
    originalPrice: 650,
    category: 'Calculators',
    condition: 'Good',
    seller: { name: 'Priya M.', verified: true },
    addedAt: '5 days ago',
    views: 120,
    img: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?q=80&w=400&h=400&fit=crop',
    interestedBuyers: 4,
    priceDrop: true
  },
  {
    _id: 'w3',
    title: 'Physics Lab Coat',
    price: 300,
    category: 'Lab Equipment',
    condition: 'Excellent',
    seller: { name: 'Prof. Sharma', verified: true },
    addedAt: '1 day ago',
    views: 80,
    img: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400&h=400&fit=crop',
    interestedBuyers: 2,
    priceDrop: false
  },
  {
    _id: 'w4',
    title: 'Mountain Bicycle',
    price: 2800,
    category: 'Bicycles',
    condition: 'Good',
    seller: { name: 'Akash K.', verified: false },
    addedAt: '3 days ago',
    views: 310,
    img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=400&h=400&fit=crop',
    interestedBuyers: 12,
    priceDrop: false
  },
  {
    _id: 'w5',
    title: 'Laptop Cooling Stand',
    price: 450,
    category: 'Electronics',
    condition: 'Like New',
    seller: { name: 'Neha P.', verified: true },
    addedAt: '7 days ago',
    views: 95,
    img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=400&h=400&fit=crop',
    interestedBuyers: 0,
    priceDrop: false
  }
];

const RECOMMENDED_ITEMS = [
  {
    _id: 'r1',
    title: 'Mechanical Engineering Handbook',
    price: 400,
    category: 'Books',
    condition: 'Good',
    seller: { name: 'Vikas T.', verified: true, rating: 4.8 },
    views: 56,
    wishlistCount: 12,
    img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=400&h=400&fit=crop'
  },
  {
    _id: 'r2',
    title: 'Bicycle Helmet',
    price: 600,
    category: 'Bicycles',
    condition: 'New',
    seller: { name: 'Aditi M.', verified: false, rating: 4.5 },
    views: 89,
    wishlistCount: 22,
    img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=400&h=400&fit=crop'
  }
];

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(DUMMY_WISHLIST);

  const handleRemove = (id) => {
    setWishlist(wishlist.filter(item => item._id !== id));
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

  const priceDrops = wishlist.filter(item => item.priceDrop);

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">My Wishlist</h1>
        <p className="text-slate-500 font-medium text-lg">Keep track of products you're interested in.</p>
      </div>

      {/* Top Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="p-4 bg-rose-100 text-rose-600 rounded-xl">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">12</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Items</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="p-4 bg-red-100 text-red-600 rounded-xl">
            <TrendingDown className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">3</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Price Drops</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">5</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Newly Added</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="p-4 bg-green-100 text-green-600 rounded-xl">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">₹2,450</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Potential Savings</p>
          </div>
        </div>
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
            {wishlist.map((item) => (
              <div key={item._id} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-theme-maroon/30 hover:shadow-lg transition-all flex flex-col sm:flex-row gap-5 group">
                {/* Image */}
                <div className="relative w-full sm:w-40 h-40 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 flex flex-col gap-1.5">
                    {item.priceDrop && (
                      <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-sm flex items-center gap-1">
                        <TrendingDown className="w-3 h-3" /> Price Drop
                      </span>
                    )}
                    {item.views > 100 && (
                      <span className="bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-sm flex items-center gap-1">
                        <Star className="w-3 h-3" /> Popular
                      </span>
                    )}
                  </div>
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
                      {item.originalPrice && (
                        <div className="text-sm font-bold text-slate-400 line-through">₹{item.originalPrice}</div>
                      )}
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
                        <span className="text-xs font-bold text-slate-600">{item.seller.name.charAt(0)}</span>
                      </div>
                      <span className="text-sm font-bold text-slate-900 flex items-center gap-1">
                        {item.seller.name}
                        {item.seller.verified && <ShieldCheck className="w-3.5 h-3.5 text-blue-500" title="Verified Seller" />}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button className="flex-1 sm:flex-none p-2.5 bg-theme-maroon text-white hover:bg-theme-dark-maroon rounded-xl transition-colors font-bold text-sm shadow-sm flex items-center justify-center gap-1.5">
                        <MessageSquare className="w-4 h-4" /> <span className="hidden sm:inline">Contact</span>
                      </button>
                      <button className="p-2.5 bg-slate-50 text-slate-600 hover:text-blue-500 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl transition-colors shadow-sm" title="Share">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="p-2.5 bg-slate-50 text-slate-600 hover:text-red-500 hover:bg-red-50 border border-slate-200 hover:border-red-200 rounded-xl transition-colors shadow-sm" title="Remove from Wishlist" onClick={() => handleRemove(item._id)}>
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
        <div className="space-y-8">
          
          {/* Price Drop Alerts */}
          {priceDrops.length > 0 && (
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100 shadow-sm">
              <h3 className="font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-red-500" /> Price Drop Alerts
              </h3>
              <div className="space-y-4">
                {priceDrops.map(item => (
                  <div key={`pd-${item._id}`} className="bg-white p-3 rounded-xl shadow-sm border border-red-100 flex gap-3 cursor-pointer hover:border-red-300 transition-colors">
                    <img src={item.img} alt={item.title} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 truncate">{item.title}</h4>
                      <div className="flex items-center gap-2 text-sm mt-0.5">
                        <span className="font-black text-red-600">₹{item.price}</span>
                        <span className="font-medium text-slate-400 line-through">₹{item.originalPrice}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wishlist Activity */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-extrabold text-slate-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-theme-maroon" /> Recent Activity
            </h3>
            <div className="space-y-5 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent pl-6 md:pl-0">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-red-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute -left-6 md:static"></div>
                <div className="w-[calc(100%-1.5rem)] md:w-[calc(50%-1.5rem)] pb-1">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-900 mb-1">Price decreased on <span className="text-theme-maroon">Calculator</span></p>
                    <time className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">2 hours ago</time>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute -left-6 md:static"></div>
                <div className="w-[calc(100%-1.5rem)] md:w-[calc(50%-1.5rem)] pb-1">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-900 mb-1">Seller updated <span className="text-theme-maroon">Lab Coat</span></p>
                    <time className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">1 day ago</time>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-green-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute -left-6 md:static"></div>
                <div className="w-[calc(100%-1.5rem)] md:w-[calc(50%-1.5rem)] pb-1">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-900 mb-1">Added <span className="text-theme-maroon">Textbook</span> to wishlist</p>
                    <time className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">2 days ago</time>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Recommended Similar Items */}
          <div>
            <h3 className="font-extrabold text-slate-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" /> Recommended For You
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {RECOMMENDED_ITEMS.map(product => (
                <ProductCard 
                  key={product._id} 
                  product={product} 
                  onViewDetails={() => {}} 
                  onWishlist={() => {}} 
                />
              ))}
            </div>
          </div>

        </div>
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
