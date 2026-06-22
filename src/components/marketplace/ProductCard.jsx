import React from 'react';
import { Heart, Eye, MessageSquare, Flag, Share2, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { getFallbackImage } from '../../utils/imageFallback';

const ProductCard = ({ product, onViewDetails, onWishlist, onMessage }) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product._id);

  return (
    <div 
      onClick={() => onViewDetails(product)}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img 
          src={product.img || getFallbackImage(product.category, product.title)} 
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.condition === 'New' && (
            <span className="bg-green-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-sm">
              New
            </span>
          )}
        </div>
        {product.status === 'Sold' && (
          <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center z-10 backdrop-blur-[2px]">
            <span className="bg-red-500 text-white font-black px-4 py-2 rounded-xl text-lg shadow-xl rotate-[-12deg] border-2 border-white">SOLD</span>
          </div>
        )}
        {/* Quick Actions (Hover) */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              toggleWishlist(product);
              if (onWishlist) onWishlist(product._id);
            }}
            className={`p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all ${wishlisted ? 'text-red-500 hover:text-red-600' : 'text-slate-400 hover:text-rose-500'}`}
          >
            <Heart className="w-4 h-4" fill={wishlisted ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <p className="text-xs font-bold text-theme-maroon uppercase tracking-wider">{product.category}</p>
          <div className="flex items-center gap-1 text-xs font-medium text-slate-400">
            <Eye className="w-3.5 h-3.5" /> {product.views}
          </div>
        </div>
        
        <h3 className="font-bold text-slate-900 text-base leading-tight mb-2 line-clamp-2 group-hover:text-theme-maroon transition-colors">
          {product.title}
        </h3>
        
        <div className="flex items-end gap-2 mb-4">
          <span className="text-xl font-black text-slate-900">₹{product.price}</span>
        </div>

        {/* Seller Info */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={(!product.seller?.avatarUrl || product.seller.avatarUrl === 'null' || product.seller.avatarUrl === 'undefined') ? `https://ui-avatars.com/api/?name=${encodeURIComponent(product.seller?.name || 'Seller')}&background=random&color=fff` : product.seller.avatarUrl} 
              className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200" 
              alt="" 
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900 flex items-center gap-1">
                {product.seller?.name}
                {product.seller?.verified && <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />}
              </span>
              <div className="flex items-center gap-1 text-[10px] font-medium text-slate-500">
                <Clock className="w-3 h-3" /> {new Date(product.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); onViewDetails(product); }}
              className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
              title="Report Listing"
            >
              <Flag className="w-4 h-4" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); if (onMessage) onMessage(product); }}
              className="p-2 text-theme-maroon bg-theme-maroon/5 hover:bg-theme-maroon hover:text-white rounded-lg transition-colors"
              title="Message Seller"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
