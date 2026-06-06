import React from 'react';
import { BookOpen, Calculator, Shirt, Bike, Laptop, PenTool, Coffee, Grid } from 'lucide-react';

const categories = [
  { name: 'Academic Books', desc: 'Engineering, BCA, BSc, MBA, and semester textbooks.', count: '1200+ Listings', icon: <BookOpen className="w-8 h-8" />, color: 'text-blue-600', bg: 'bg-blue-50', border: 'hover:border-blue-200', shadow: 'hover:shadow-blue-500/10' },
  { name: 'Calculators', desc: 'Scientific and programmable calculators.', count: '450+ Listings', icon: <Calculator className="w-8 h-8" />, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'hover:border-emerald-200', shadow: 'hover:shadow-emerald-500/10' },
  { name: 'Lab Coats', desc: 'Chemistry, biology, and medical aprons.', count: '320+ Listings', icon: <Shirt className="w-8 h-8" />, color: 'text-purple-600', bg: 'bg-purple-50', border: 'hover:border-purple-200', shadow: 'hover:shadow-purple-500/10' },
  { name: 'Cycles', desc: 'Campus commute bicycles and gear.', count: '180+ Listings', icon: <Bike className="w-8 h-8" />, color: 'text-orange-600', bg: 'bg-orange-50', border: 'hover:border-orange-200', shadow: 'hover:shadow-orange-500/10' },
  { name: 'Electronics', desc: 'Laptops, tablets, headphones, and parts.', count: '600+ Listings', icon: <Laptop className="w-8 h-8" />, color: 'text-rose-600', bg: 'bg-rose-50', border: 'hover:border-rose-200', shadow: 'hover:shadow-rose-500/10' },
  { name: 'Stationery', desc: 'Drafters, drawing boards, and kits.', count: '890+ Listings', icon: <PenTool className="w-8 h-8" />, color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'hover:border-cyan-200', shadow: 'hover:shadow-cyan-500/10' },
  { name: 'Hostel Essentials', desc: 'Mattresses, lamps, and organizers.', count: '540+ Listings', icon: <Coffee className="w-8 h-8" />, color: 'text-amber-600', bg: 'bg-amber-50', border: 'hover:border-amber-200', shadow: 'hover:shadow-amber-500/10' },
  { name: 'Other Resources', desc: 'Project components and miscellaneous items.', count: '300+ Listings', icon: <Grid className="w-8 h-8" />, color: 'text-slate-600', bg: 'bg-slate-100', border: 'hover:border-slate-300', shadow: 'hover:shadow-slate-500/10' },
];

const Categories = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured <span className="text-blue-600">Categories</span></h2>
          <p className="text-lg text-slate-600">Browse thousands of academic resources organized for easy discovery.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className={`flex flex-col p-8 rounded-3xl bg-white border-2 border-slate-100 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer ${category.border} ${category.shadow} hover:shadow-xl group`}
            >
              <div className={`${category.bg} ${category.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                {category.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-xl mb-2">{category.name}</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed flex-grow">{category.desc}</p>
              <div className="mt-auto inline-flex px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg w-max group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                {category.count}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
