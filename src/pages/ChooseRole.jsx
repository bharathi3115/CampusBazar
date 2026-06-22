import React from "react";
import { ShoppingCart, Store } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const ChooseRole = () => {
  const { selectRole } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-theme-maroon/5 flex items-center justify-center p-4 sm:p-6 font-sans text-slate-900">
      {/* Outer subtle container */}
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-[2rem] shadow-xl shadow-slate-200/50 flex flex-col p-8 sm:p-12 lg:p-16">
        <div className="text-center mb-12 sm:mb-16 mt-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Welcome to Campus<span className="text-theme-maroon">Bazaar</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto">How would you like to use CampusBazaar today? You can always switch your role later from your dashboard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto w-full">
          {/* Buyer Card */}
          <div
            className="group relative bg-white border border-slate-200 rounded-3xl p-8 hover:border-theme-maroon hover:shadow-2xl hover:shadow-theme-maroon/10 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1.5 cursor-pointer"
            onClick={() => selectRole("buyer")}>
            <div className="w-16 h-16 bg-theme-maroon/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-theme-maroon group-hover:text-white text-theme-maroon transition-colors duration-300">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Buyer</h2>
            <p className="text-base text-slate-500 mb-8 flex-grow">Browse campus listings, save favorites, contact sellers, and purchase student essentials.</p>
            <button className="w-full bg-slate-50 border border-slate-100 text-slate-700 font-bold py-3.5 px-6 rounded-xl group-hover:bg-theme-maroon group-hover:border-theme-maroon group-hover:text-white transition-all duration-300 text-lg shadow-sm">
              Continue as Buyer
            </button>
          </div>

          {/* Seller Card */}
          <div
            className="group relative bg-white border border-slate-200 rounded-3xl p-8 hover:border-theme-dark-maroon hover:shadow-2xl hover:shadow-theme-dark-maroon/10 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1.5 cursor-pointer"
            onClick={() => selectRole("seller")}>
            <div className="w-16 h-16 bg-theme-dark-maroon/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-theme-dark-maroon group-hover:text-white text-theme-dark-maroon transition-colors duration-300">
              <Store className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Seller</h2>
            <p className="text-base text-slate-500 mb-8 flex-grow">List products, manage inventory, respond to buyers, and track marketplace activity.</p>
            <button className="w-full bg-slate-50 border border-slate-100 text-slate-700 font-bold py-3.5 px-6 rounded-xl group-hover:bg-theme-dark-maroon group-hover:border-theme-dark-maroon group-hover:text-white transition-all duration-300 text-lg shadow-sm">
              Continue as Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseRole;
