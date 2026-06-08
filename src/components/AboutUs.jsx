import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="about-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">About <span className="text-purple-600">Us</span></h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4 text-center">
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
            CampusBazar is a trusted student marketplace where you can buy, sell, and exchange books, calculators, lab coats, cycles, and other essentials within your college community.
          </p>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            Our platform helps students save money, reduce waste, and connect with verified students through a secure and organized marketplace designed exclusively for campus communities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
