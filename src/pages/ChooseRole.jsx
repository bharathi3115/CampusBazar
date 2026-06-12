import React from 'react';
import { ShoppingCart, Store, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ChooseRole = () => {
  const { selectRole } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-8 font-sans text-slate-900">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col p-8 sm:p-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Welcome to Campus<span className="text-theme-maroon">Bazaar</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            How would you like to use CampusBazaar today? You can always switch your role later from your dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto w-full">
          
          {/* Buyer Card */}
          <div className="group relative bg-white border-2 border-slate-100 rounded-3xl p-8 hover:border-theme-maroon hover:shadow-2xl hover:shadow-theme-maroon/20 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-2 cursor-pointer"
               onClick={() => selectRole('buyer')}>
            <div className="w-16 h-16 bg-theme-maroon/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-theme-maroon group-hover:text-white text-theme-maroon transition-colors duration-300">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Buyer</h2>
            <p className="text-slate-500 mb-8 flex-grow">
              Browse campus listings, save favorites, contact sellers, and purchase student essentials.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'Browse Marketplace',
                'Wishlist Items',
                'Contact Sellers',
                'Purchase History',
                'Recommended Products'
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full bg-slate-100 text-slate-700 font-bold py-4 px-6 rounded-xl group-hover:bg-theme-maroon group-hover:text-white transition-colors duration-300 text-lg shadow-sm">
              Continue as Buyer
            </button>
          </div>

          {/* Seller Card */}
          <div className="group relative bg-white border-2 border-slate-100 rounded-3xl p-8 hover:border-theme-dark-maroon hover:shadow-2xl hover:shadow-theme-dark-maroon/20 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-2 cursor-pointer"
               onClick={() => selectRole('seller')}>
            <div className="w-16 h-16 bg-theme-dark-maroon/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-theme-dark-maroon group-hover:text-white text-theme-dark-maroon transition-colors duration-300">
              <Store className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Seller</h2>
            <p className="text-slate-500 mb-8 flex-grow">
              List products, manage inventory, respond to buyers, and track marketplace activity.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'Post Listings',
                'Manage Products',
                'View Interested Buyers',
                'Listing Analytics',
                'Sales Activity'
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full bg-slate-100 text-slate-700 font-bold py-4 px-6 rounded-xl group-hover:bg-theme-dark-maroon group-hover:text-white transition-colors duration-300 text-lg shadow-sm">
              Continue as Seller
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChooseRole;
