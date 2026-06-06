import React from 'react';
import { Search, ArrowRight, Tag, BookOpen, Calculator, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-slate-50 min-h-[90vh] flex items-center">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-100/40 via-indigo-100/40 to-purple-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-100/40 to-blue-50/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-32 left-20 hidden lg:flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg shadow-slate-200/50 animate-bounce" style={{animationDuration: '3s'}}>
        <Tag className="w-4 h-4 text-emerald-500" />
        <span className="text-sm font-bold text-slate-700">Save Money</span>
      </div>
      <div className="absolute bottom-32 right-20 hidden lg:flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg shadow-slate-200/50 animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}>
        <Sparkles className="w-4 h-4 text-amber-500" />
        <span className="text-sm font-bold text-slate-700">Verified Students</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            
            <h1 className="text-5xl md:text-6xl lg:text-[4rem] font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              Buy, Sell & Exchange <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Student Essentials</span><br/>
              Within Your Campus
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              CampusBazar is a dedicated student marketplace that helps students buy, sell, and exchange second-hand books, calculators, lab coats, cycles, electronics, and other academic resources safely and affordably.
            </p>
            <p className="text-base text-slate-500 max-w-2xl mx-auto lg:mx-0">
              Reduce unnecessary expenses, promote sustainability, and connect with verified students in your college community.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto lg:mx-0 shadow-2xl shadow-blue-900/5 rounded-full group transition-all duration-300 hover:shadow-blue-900/10">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input 
                type="text" 
                className="block w-full pl-16 pr-40 py-5 rounded-full border-2 border-transparent focus:border-blue-100 focus:ring-4 focus:ring-blue-50 bg-white text-slate-900 placeholder-slate-400 text-lg outline-none transition-all" 
                placeholder="Search books, calculators, cycles, lab coats, electronics..." 
              />
              <div className="absolute inset-y-2 right-2 flex items-center">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg transform active:scale-95 hidden sm:block">
                  Search
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
              <button className="bg-slate-900 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-slate-800 transition-all transform hover:-translate-y-1 shadow-xl shadow-slate-900/20 flex items-center gap-2">
                Browse Products
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white text-blue-600 border-2 border-blue-100 px-8 py-3.5 rounded-full font-semibold hover:border-blue-600 hover:bg-blue-50 transition-all transform hover:-translate-y-1 shadow-sm flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Sell an Item
              </button>
            </div>
          </div>

          {/* Illustration/Image Side */}
          <div className="hidden lg:flex justify-center relative">
            <div className="relative w-full max-w-lg aspect-square">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-indigo-500 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] animate-spin-slow opacity-20 blur-xl"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[400px] h-[400px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white relative z-10 transform -rotate-3 hover:rotate-0 transition-all duration-500 bg-slate-100">
                  {/* Real student image placeholder from Unsplash */}
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Students exchanging materials" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Engineering Physics</p>
                        <p className="text-xs text-slate-500">Exchanged on campus</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-8 top-12 bg-white p-4 rounded-2xl shadow-xl z-20 animate-bounce" style={{animationDuration: '5s'}}>
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <Calculator className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Scientific Calc</p>
                      <p className="text-emerald-600 font-bold text-sm">₹450</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
