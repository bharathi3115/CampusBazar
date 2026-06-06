import React from 'react';
import { Heart, User } from 'lucide-react';

const listings = [
  {
    id: 1,
    title: 'Data Structures Using C',
    price: '₹250',
    condition: 'Good',
    seller: 'Rahul Sharma',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    tag: 'Academic Books'
  },
  {
    id: 2,
    title: 'Scientific Calculator FX-991ES',
    price: '₹450',
    condition: 'Excellent',
    seller: 'Priya Patel',
    image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    tag: 'Calculators'
  },
  {
    id: 3,
    title: 'Engineering Lab Coat',
    price: '₹150',
    condition: 'Good',
    seller: 'Akash Verma',
    image: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    tag: 'Lab Coats'
  },
  {
    id: 4,
    title: 'Mountain Bicycle',
    price: '₹3500',
    condition: 'Fair',
    seller: 'Sneha Reddy',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    tag: 'Cycles'
  },
  {
    id: 5,
    title: 'Programming Fundamentals Book Set',
    price: '₹600',
    condition: 'Like New',
    seller: 'Arjun Kumar',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    tag: 'Academic Books'
  }
];

const Listings = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Latest <span className="text-blue-600">Marketplace Listings</span></h2>
            <p className="text-lg text-slate-600 max-w-2xl">Discover second-hand academic and personal items posted by verified students.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
            View All Listings &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {listings.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Condition Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-white/95 text-slate-800 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm border border-slate-100">
                    {item.condition}
                  </span>
                </div>
                <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm text-slate-400 hover:text-red-500 hover:bg-white transition-all z-10">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
              
              {/* Content Section */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1.5">{item.tag}</div>
                <h3 className="font-bold text-slate-900 text-base leading-tight mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                
                <div className="mb-4">
                  <span className="text-xl font-extrabold text-slate-900">{item.price}</span>
                </div>

                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                    <User className="w-3 h-3 text-slate-400" />
                  </div>
                  <span className="font-medium truncate">{item.seller}</span>
                </div>
                
                <button className="w-full mt-4 bg-slate-50 text-slate-900 text-sm font-bold py-2.5 rounded-lg hover:bg-blue-600 hover:text-white transition-all border border-slate-200 hover:border-blue-600 shadow-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <button className="bg-white border-2 border-slate-200 text-slate-900 font-bold py-3 px-8 rounded-full hover:bg-slate-50 transition-colors w-full">
            View All Listings
          </button>
        </div>
      </div>
    </section>
  );
};

export default Listings;
