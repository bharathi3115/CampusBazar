import React from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ananya Gupta",
    department: "BCA Student",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    review: "I purchased semester textbooks at half the original price through CampusBazar. It saved me a lot of money."
  },
  {
    id: 2,
    name: "Rohit Kumar",
    department: "Engineering Student",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    review: "Selling my unused calculator and lab coat was quick and easy. The platform is very convenient."
  },
  {
    id: 3,
    name: "Neha Sharma",
    department: "MBA Student",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    review: "The verification system makes transactions feel much safer than social media groups."
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-purple-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            Student <span className="text-purple-600">Testimonials</span>
          </h2>
          <p className="text-lg text-slate-600">See what verified students are saying about their CampusBazar experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-[2rem] p-8 shadow-lg shadow-slate-200/50 relative group hover:-translate-y-2 transition-transform duration-300">
              <Quote className="absolute top-8 right-8 w-10 h-10 text-purple-100 group-hover:text-purple-200 transition-colors" />

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              <p className="text-slate-700 text-lg leading-relaxed mb-8 relative z-10">"{testimonial.review}"</p>

              <div className="flex items-center gap-4 mt-auto">
                <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover border-2 border-purple-100" />
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500">{testimonial.department}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
