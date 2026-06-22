import React from "react";
import { Search, ArrowRight, Tag, BookOpen, Calculator, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="relative overflow-hidden bg-slate-50" id="home">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-theme-light-maroon via-theme-maroon/5 to-theme-burgundy/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-theme-wine/10 to-theme-light-maroon rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Text Content */}
          <div className="space-y-8 text-center lg:text-left lg:mt-12">
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              Buy, Sell & <br />
              Exchange <br />
              <span className="text-theme-maroon">Student Essentials</span>
              <br />
              Within Your Campus
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">Save money, reduce waste, and connect with verified students 🚀🎓📚.</p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
              <button
                onClick={() => navigate("/login")}
                className="bg-theme-maroon text-white px-8 py-3.5 rounded-full font-semibold hover:bg-theme-dark-maroon transition-all transform hover:-translate-y-1 shadow-xl shadow-theme-maroon/30 flex items-center gap-2">
                Browse Products
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate("/login")}
                className="bg-white text-theme-maroon border-2 border-theme-maroon/20 px-8 py-3.5 rounded-full font-semibold hover:border-theme-maroon hover:bg-theme-maroon/5 transition-all transform hover:-translate-y-1 shadow-sm flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Sell an Item
              </button>
            </div>
          </div>

          {/* Illustration/Image Side */}
          <div className="hidden lg:flex justify-center relative">
            <div className="relative w-full max-w-xl aspect-square">
              <div className="absolute inset-0 bg-theme-maroon rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-20 blur-xl"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[550px] h-[550px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white relative z-10 bg-slate-100">
                  {/* Generated realistic student image */}
                  <img src="/campus_outdoor_marketplace.png" alt="Students exchanging materials in college" className="w-full h-full object-cover" />
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
