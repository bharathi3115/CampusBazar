import React, { useEffect } from 'react';
import { X, Heart, MessageSquare, Share2, Flag, ShieldCheck, MapPin, Clock, Eye, ChevronRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { getFallbackImage } from '../../utils/imageFallback';

const ProductDetailsModal = ({ product, isOpen, onClose, setActiveTab, onMessage }) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  
  const [isReporting, setIsReporting] = React.useState(false);
  const [reportReason, setReportReason] = React.useState('');
  const [isSubmittingReport, setIsSubmittingReport] = React.useState(false);

  if (!isOpen || !product) return null;

  // Record view on open (in a real app, we'd trigger an API call here or in the parent before opening)
  
  const handleContactSeller = async () => {
    if (!user) return alert("Please login to message the seller");
    if (onMessage) {
      await onMessage(product);
      onClose();
    }
  };

  const handleReportSubmit = async () => {
    if (!user) return alert("Please login to report a listing");
    if (!reportReason) return alert("Please select a reason");
    
    setIsSubmittingReport(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product._id,
          reporterId: user._id,
          reason: reportReason
        })
      });
      if (res.ok) {
        alert("Report submitted successfully");
        setIsReporting(false);
        setReportReason('');
      } else {
        alert("Failed to submit report");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while submitting report");
    } finally {
      setIsSubmittingReport(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row transform transition-all">
        
        {/* Close Button (Mobile Absolute, Desktop Relative to content) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/50 backdrop-blur-md text-slate-900 hover:bg-white rounded-full shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image Gallery */}
        <div className="w-full md:w-1/2 bg-slate-100 flex-shrink-0 relative h-64 md:h-auto">
          <img 
            src={product.img || getFallbackImage(product.category, product.title)} 
            alt={product.title}
            className="w-full h-full object-cover"
          />
          {product.condition === 'New' && (
            <div className="absolute top-6 left-6 bg-green-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-lg">
              Brand New
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 flex flex-col overflow-y-auto">
          <div className="p-6 sm:p-8 flex-1">
            
            {/* Header */}
            <div className="flex justify-between items-start gap-4 mb-2">
              <span className="text-xs font-bold text-theme-maroon uppercase tracking-wider bg-theme-maroon/5 px-2 py-1 rounded-md">
                {product.category}
              </span>
              <div className="flex items-center gap-3 text-slate-400 text-xs font-bold">
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {product.views} Views</span>
                <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {product.wishlistCount} Saves</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 leading-tight">
              {product.title}
            </h2>

            <div className="flex items-end gap-3 mb-6 pb-6 border-b border-slate-100">
              <span className="text-4xl font-black text-slate-900">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-lg font-bold text-slate-400 line-through mb-1">₹{product.originalPrice}</span>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-900 mb-2">Description</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {product.description || `Excellent condition ${product.title.toLowerCase()}. Barely used and well maintained. Selling because I no longer need it for my current semester. Perfect for anyone looking for a reliable item at a great price.`}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Condition</span>
                <span className="text-sm font-bold text-slate-900">{product.condition}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Posted</span>
                <span className="text-sm font-bold text-slate-900 flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {new Date(product.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Seller Info */}
            <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl mb-8 hover:border-theme-maroon/30 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <img 
                  src={(!product.seller?.avatarUrl || product.seller.avatarUrl === 'null' || product.seller.avatarUrl === 'undefined') ? `https://ui-avatars.com/api/?name=${encodeURIComponent(product.seller?.name || 'Seller')}&background=random&color=fff` : product.seller.avatarUrl} 
                  alt={product.seller?.name}
                  className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200"
                />
                <div>
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-1.5 group-hover:text-theme-maroon transition-colors">
                    {product.seller?.name}
                    {product.seller?.verified && <ShieldCheck className="w-4 h-4 text-blue-500" />}
                  </h4>
                  <p className="text-xs font-medium text-slate-500 flex items-center gap-2">
                    <span className="text-amber-500 font-bold">★ {product.seller?.rating || 'New'}</span>
                    <span>•</span>
                    <span>{product.seller?.listingsCount || 1} Listings</span>
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-theme-maroon transition-colors" />
            </div>

          </div>

          {/* Action Bar (Sticky at bottom of right pane) */}
          <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 mt-auto flex flex-col sm:flex-row gap-3">
            <button 
              onClick={handleContactSeller}
              className="flex-1 bg-theme-maroon text-white font-bold py-3.5 px-6 rounded-xl hover:bg-theme-dark-maroon shadow-lg shadow-theme-maroon/20 flex items-center justify-center gap-2 transition-all"
            >
              <MessageSquare className="w-5 h-5" /> Contact Seller
            </button>
            
            <div className="flex gap-3 relative">
              <button 
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 bg-white border ${isWishlisted(product._id) ? 'border-red-200 text-red-500 hover:text-red-600' : 'border-slate-200 text-slate-700 hover:text-rose-500 hover:border-rose-200'} rounded-xl font-bold shadow-sm flex items-center justify-center transition-all group relative`}
              >
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" fill={isWishlisted(product._id) ? "currentColor" : "none"} />
              </button>
              <button 
                onClick={() => setIsReporting(!isReporting)}
                className={`p-3.5 bg-white border ${isReporting ? 'border-amber-500 text-amber-500' : 'border-slate-200 text-slate-400 hover:text-amber-500 hover:border-amber-200'} rounded-xl font-bold shadow-sm flex items-center justify-center transition-all group`} 
                title="Report Listing"
              >
                <Flag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>

              {isReporting && (
                <div className="absolute bottom-full right-0 mb-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50">
                  <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Flag className="w-4 h-4 text-amber-500" /> Report Listing
                  </h4>
                  <select 
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full text-sm p-2 mb-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-amber-500"
                  >
                    <option value="">Select a reason...</option>
                    <option value="Fake Product">Fake Product</option>
                    <option value="Spam Listing">Spam Listing</option>
                    <option value="Duplicate Listing">Duplicate Listing</option>
                    <option value="Inappropriate Content">Inappropriate Content</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setIsReporting(false)}
                      className="flex-1 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleReportSubmit}
                      disabled={isSubmittingReport}
                      className="flex-1 py-1.5 text-xs font-bold bg-amber-500 text-white hover:bg-amber-600 rounded-lg shadow-sm transition-colors disabled:opacity-50"
                    >
                      {isSubmittingReport ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
