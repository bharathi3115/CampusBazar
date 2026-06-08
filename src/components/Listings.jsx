import React from 'react';
import { Heart, User } from 'lucide-react';

const listings = [
  {
    id: 1,
    title: 'Scientific Calculator FX-991ES',
    price: '₹450',
    condition: 'Excellent',
    seller: 'Priya Patel',
    image: '/realistic_calculator.png',
    tag: 'Calculators'
  },
  {
    id: 2,
    title: 'Used Smartphone - 128GB',
    price: '₹12000',
    condition: 'Good',
    seller: 'Rahul Sharma',
    image: '/realistic_phone.png',
    tag: 'Electronics'
  },
  {
    id: 3,
    title: 'Academic Textbooks Bundle',
    price: '₹800',
    condition: 'Like New',
    seller: 'Arjun Kumar',
    image: '/realistic_books.png',
    tag: 'Academic Books'
  },
  {
    id: 4,
    title: 'Student Laptop - i5 8GB RAM',
    price: '₹25000',
    condition: 'Good',
    seller: 'Akash Verma',
    image: '/realistic_laptop.png',
    tag: 'Electronics'
  },
  {
    id: 5,
    title: 'Mountain Bicycle',
    price: '₹3500',
    condition: 'Fair',
    seller: 'Sneha Reddy',
    image: '/realistic_cycle.png',
    tag: 'Cycles'
  }
];

const Listings = () => {
  return (
    <section className="py-20 bg-slate-50" id="items">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Find Your <span className="text-purple-600">Item</span></h2>
            <p className="text-lg text-slate-600 max-w-2xl">Discover second-hand academic and personal items posted by verified students.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-800 transition-colors">
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
                

              </div>
              
              {/* Content Section */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="text-[10px] font-bold text-purple-600 uppercase tracking-wider mb-1.5">{item.tag}</div>
                <h3 className="font-bold text-slate-900 text-base leading-tight mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
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
