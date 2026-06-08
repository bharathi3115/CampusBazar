import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Search, Heart, User } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-fuchsia-800 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-purple-500/30">
              <ShoppingCart className="text-white w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl text-slate-900 tracking-tight">Campus<span className="text-purple-600">Bazar</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8 items-center">
            <a href="#" className="text-purple-600 font-semibold border-b-2 border-purple-600 px-1 py-6 transition-all">Home</a>
            <a href="#" className="text-slate-600 hover:text-purple-600 font-medium transition-colors px-1 py-6 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-purple-600 after:transition-all after:duration-300">About Us</a>
            <a href="#" className="text-slate-600 hover:text-purple-600 font-medium transition-colors px-1 py-6 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-purple-600 after:transition-all after:duration-300">Categories</a>
            <a href="#" className="text-slate-600 hover:text-purple-600 font-medium transition-colors px-1 py-6 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-purple-600 after:transition-all after:duration-300">Contact</a>
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="flex items-center gap-2 text-slate-600 font-medium hover:text-purple-600 transition-colors">
              Login
            </button>
            <button className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-purple-700 transition-all transform hover:-translate-y-0.5 shadow-md shadow-purple-500/30">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-500 hover:text-purple-600 rounded-md transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white shadow-xl border-t border-slate-100 animate-in slide-in-from-top-2">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <a href="#" className="block px-3 py-3 text-base font-medium text-purple-600 bg-purple-50 rounded-lg">Home</a>
            <a href="#" className="block px-3 py-3 text-base font-medium text-slate-600 hover:text-purple-600 hover:bg-slate-50 rounded-lg">About Us</a>
            <a href="#" className="block px-3 py-3 text-base font-medium text-slate-600 hover:text-purple-600 hover:bg-slate-50 rounded-lg">Categories</a>
            <a href="#" className="block px-3 py-3 text-base font-medium text-slate-600 hover:text-purple-600 hover:bg-slate-50 rounded-lg">Contact</a>
            <div className="pt-4 flex gap-3">
               <button className="flex-1 border border-purple-200 text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50">Login</button>
               <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg font-medium shadow-md">Sign Up</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
