import React from "react";
import { ShoppingCart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 bg-theme-maroon shadow-lg shadow-theme-maroon/20 rounded-xl flex items-center justify-center">
                <ShoppingCart className="text-white w-6 h-6" />
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">
                Campus<span className="text-theme-maroon">Bazar</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              A college-exclusive marketplace platform where students can buy, sell, and exchange academic and personal items safely and affordably.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="hover:text-theme-maroon transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-theme-maroon transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-theme-maroon transition-colors">
                  Browse Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-theme-maroon transition-colors">
                  Sell Item
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li>
                <div className="font-medium text-white mb-1">Support</div>
                <a href="mailto:support@campusbazar.edu" className="text-slate-400 hover:text-theme-maroon transition-colors">
                  support@campusbazar.edu
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© 2026 CampusBazar – Student Marketplace Platform. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
