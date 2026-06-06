import React from 'react';
import { ShieldCheck, CloudUpload, MessageCircle } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Student Registration',
    description: 'Students create accounts using college credentials and become verified users.',
    icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
    color: 'bg-blue-100',
  },
  {
    id: 2,
    title: 'Post or Browse Listings',
    description: 'Students upload products with images, descriptions, pricing, and condition details or browse available listings.',
    icon: <CloudUpload className="w-8 h-8 text-indigo-600" />,
    color: 'bg-indigo-100',
  },
  {
    id: 3,
    title: 'Connect & Exchange',
    description: 'Buyers communicate directly with sellers through the integrated chat system and complete transactions safely.',
    icon: <MessageCircle className="w-8 h-8 text-purple-600" />,
    color: 'bg-purple-100',
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">How <span className="text-blue-600">CampusBazar</span> Works</h2>
          <p className="text-lg text-slate-600">Your campus marketplace journey in three simple steps.</p>
        </div>

        <div className="relative">
          {/* Connecting Line for desktop */}
          <div className="hidden lg:block absolute top-24 left-[15%] right-[15%] h-1 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 -z-10 rounded-full"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <div key={step.id} className="relative flex flex-col items-center text-center group">
                {/* Step Number Badge */}
                <div className="absolute -top-4 -right-2 lg:right-1/4 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg z-20">
                  Step {step.id}
                </div>
                
                {/* Icon Container with animations */}
                <div className={`w-32 h-32 rounded-3xl ${step.color} border-4 border-white shadow-xl shadow-slate-200/50 flex items-center justify-center mb-8 relative z-10 group-hover:-translate-y-2 transition-transform duration-300`}>
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/50 transition-colors"></div>
                  {step.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
                <p className="text-lg text-slate-600 leading-relaxed max-w-sm">{step.description}</p>
                
                {/* Mobile connecting arrow */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden w-1 h-16 bg-gradient-to-b from-blue-200 to-indigo-200 my-8 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
