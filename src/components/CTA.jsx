import React from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              Join the Campus Community <br className="hidden md:block" /> Marketplace Today
            </h2>
            <p className="text-lg text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Buy affordable resources, sell unused items, connect with fellow students, and promote sustainable resource sharing through CampusBazar.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-xl flex items-center justify-center gap-2 transform hover:-translate-y-1">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-transparent text-white border-2 border-blue-400 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Browse Marketplace
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
