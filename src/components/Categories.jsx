import React from 'react';
import laptopImage from '../assets/electronics-laptop.png';
import labCoatImage from '../assets/lab-coat.png';
import stationeryImage from '../assets/stationery.png';
import hostelImage from '../assets/hostel-essentials.png';
import academicBooksImage from '../assets/academic-books.png';
import otherResourcesImage from '../assets/other-resources.png';

const categories = [
  { 
    name: 'Academic Books', 
    desc: 'Engineering, BCA, BSc, MBA, and semester textbooks.', 
    count: '1200+ Listings', 
    image: academicBooksImage, 
  },
  { 
    name: 'Calculators', 
    desc: 'Scientific and programmable calculators.', 
    count: '450+ Listings', 
    image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&q=80&w=600', 
  },
  { 
    name: 'Lab Coats', 
    desc: 'Chemistry, biology, and medical aprons.', 
    count: '320+ Listings', 
    image: labCoatImage, 
  },
  { 
    name: 'Cycles', 
    desc: 'Campus commute bicycles and gear.', 
    count: '180+ Listings', 
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=600', 
  },
  { 
    name: 'Electronics', 
    desc: 'Laptops, tablets, headphones, and parts.', 
    count: '600+ Listings', 
    image: laptopImage, 
  },
  { 
    name: 'Stationery', 
    desc: 'Drafters, drawing boards, and kits.', 
    count: '890+ Listings', 
    image: stationeryImage, 
  },
  { 
    name: 'Hostel Essentials', 
    desc: 'Mattresses, lamps, and organizers.', 
    count: '540+ Listings', 
    image: hostelImage, 
  },
  { 
    name: 'Other Resources', 
    desc: 'Project components and miscellaneous items.', 
    count: '300+ Listings', 
    image: otherResourcesImage, 
  },
];

const Categories = () => {
  return (
    <section className="py-20 bg-white" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured <span className="text-theme-maroon">Categories</span></h2>
          <p className="text-lg text-slate-600">Browse thousands of academic resources organized for easy discovery.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className={`flex flex-col p-6 rounded-3xl bg-white border-2 border-slate-100 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer hover:border-theme-maroon/30 hover:shadow-xl hover:shadow-theme-maroon/10 group`}
            >
              <div className="w-full h-48 mb-6 overflow-hidden rounded-2xl shadow-sm">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="font-bold text-slate-900 text-xl mb-2 group-hover:text-theme-maroon transition-colors">{category.name}</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed flex-grow">{category.desc}</p>
              <div className="mt-auto inline-flex px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg w-max group-hover:bg-theme-maroon/10 group-hover:text-theme-maroon transition-colors">
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

