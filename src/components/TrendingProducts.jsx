import React from 'react';
import { Star, ChevronRight, ChevronLeft } from 'lucide-react';

const trendingProducts = [
  {
    id: 1,
    title: 'Apple iPad Air (4th Gen) 64GB',
    price: '₹32,000',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Electronics'
  },
  {
    id: 2,
    title: 'Concepts of Physics by H.C. Verma Vol 1',
    price: '₹250',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Books'
  },
  {
    id: 3,
    title: 'Drafting Board (A2 Size) + T-Square',
    price: '₹600',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c848?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Stationery'
  },
  {
    id: 4,
    title: 'Study Table Lamp (Rechargeable)',
    price: '₹400',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e9d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Hostel'
  }
];

const TrendingProducts = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Trending <span className="text-blue-600">Products</span></h2>
            <p className="text-slate-600 text-lg">Most viewed and requested items this week.</p>
          </div>
          <div className="hidden md:flex gap-3">
            <button className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Simple grid mimicking a carousel for now */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-slate-100 p-4 hover:shadow-xl hover:border-blue-100 transition-all duration-300 group">
              <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-slate-100">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <button className="bg-white text-slate-900 font-bold px-6 py-2.5 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Quick View
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase">{product.category}</div>
                <h3 className="font-bold text-slate-900 leading-tight line-clamp-1 group-hover:text-blue-600 transition-colors">{product.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-xl text-slate-900">{product.price}</span>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded text-amber-700 text-sm font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {product.rating}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
