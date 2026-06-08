import React from 'react';
import { ShieldCheck, LayoutList, Search, MessageSquare, Heart, Star, Tag, Leaf } from 'lucide-react';

const features = [
  {
    title: 'Verified Student Community',
    description: 'Only registered students can access the marketplace, creating trust and safety.',
    icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
    bg: 'bg-emerald-50'
  },
  {
    title: 'Product Management System',
    description: 'Students can easily add, edit, update, and remove product listings.',
    icon: <LayoutList className="w-6 h-6 text-purple-600" />,
    bg: 'bg-purple-50'
  },
  {
    title: 'Advanced Search & Filters',
    description: 'Search products using keywords, categories, price ranges, and item conditions.',
    icon: <Search className="w-6 h-6 text-fuchsia-600" />,
    bg: 'bg-fuchsia-50'
  },
  {
    title: 'Integrated Chat System',
    description: 'Buyers and sellers can communicate directly before making purchases.',
    icon: <MessageSquare className="w-6 h-6 text-purple-600" />,
    bg: 'bg-purple-50'
  },
  {
    title: 'Wishlist Functionality',
    description: 'Save interesting products for future purchase consideration.',
    icon: <Heart className="w-6 h-6 text-rose-600" />,
    bg: 'bg-rose-50'
  },
  {
    title: 'Ratings & Reviews',
    description: 'Students can rate and review sellers after successful transactions.',
    icon: <Star className="w-6 h-6 text-amber-600" />,
    bg: 'bg-amber-50'
  },
  {
    title: 'Affordable Student Marketplace',
    description: 'Students can purchase required resources at significantly lower prices.',
    icon: <Tag className="w-6 h-6 text-cyan-600" />,
    bg: 'bg-cyan-50'
  },
  {
    title: 'Eco-Friendly Resource Reuse',
    description: 'Promotes sustainability by reducing waste and encouraging reuse.',
    icon: <Leaf className="w-6 h-6 text-green-600" />,
    bg: 'bg-green-50'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden" id="why-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Why Choose <span className="text-purple-400">CampusBazar</span></h2>
          <p className="text-lg text-slate-300">A comprehensive suite of features designed to build a safe, efficient, and sustainable marketplace.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-slate-800 border border-slate-700 p-6 rounded-2xl hover:bg-slate-700 transition-all duration-300 group hover:-translate-y-1">
              <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-5`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
