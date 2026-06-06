import React from 'react';
import { Users, ShoppingBag, Handshake, Heart, LayoutGrid } from 'lucide-react';

const stats = [
  { id: 1, value: '5000+', label: 'Registered Students', icon: <Users className="w-6 h-6 text-blue-100" /> },
  { id: 2, value: '2500+', label: 'Product Listings', icon: <ShoppingBag className="w-6 h-6 text-blue-100" /> },
  { id: 3, value: '1800+', label: 'Successful Exchanges', icon: <Handshake className="w-6 h-6 text-blue-100" /> },
  { id: 4, value: '98%', label: 'Student Satisfaction', icon: <Heart className="w-6 h-6 text-blue-100" /> },
  { id: 5, value: '50+', label: 'Campus Categories', icon: <LayoutGrid className="w-6 h-6 text-blue-100" /> }
];

const Statistics = () => {
  return (
    <section className="py-20 bg-blue-600 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm shadow-inner">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-extrabold text-white mb-1 tracking-tight">{stat.value}</h3>
              <p className="text-blue-100 font-medium text-sm max-w-[120px]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
