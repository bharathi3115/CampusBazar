import React from 'react';
import { XCircle, CheckCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

const problems = [
  'Scattered WhatsApp groups',
  'Telegram marketplace confusion',
  'No centralized platform',
  'Difficult product discovery',
  'Lack of trust',
  'No reviews or ratings'
];

const solutions = [
  'Centralized student marketplace',
  'Organized product categories',
  'Advanced search system',
  'Verified student accounts',
  'Secure communication',
  'Review and rating system'
];

const PlatformBenefits = () => {
  return (
    <section className="py-24 bg-slate-50" id="benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Platform <span className="text-theme-maroon">Benefits</span></h2>
          <p className="text-lg text-slate-600">See how CampusBazar solves everyday student marketplace problems.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Current Problems */}
          <div className="bg-theme-light-maroon border border-theme-maroon/20 rounded-3xl p-8 lg:p-12 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <AlertCircle className="w-8 h-8 text-theme-maroon" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-theme-maroon">Without CampusBazar</h3>
            </div>
            <ul className="space-y-5 relative z-10">
              {problems.map((problem, index) => (
                <li key={index} className="flex items-center gap-3 text-slate-800 text-lg">
                  <XCircle className="w-6 h-6 text-theme-maroon flex-shrink-0 mt-0.5" />
                  {problem}
                </li>
              ))}
            </ul>
          </div>

          {/* CampusBazar Solutions */}
          <div className="bg-slate-50 border border-theme-maroon/20 rounded-3xl p-8 lg:p-12 shadow-lg relative overflow-hidden">
            {/* Decorative background blob */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-theme-maroon/5 rounded-full blur-3xl"></div>
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-theme-maroon" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-theme-maroon">With CampusBazar</h3>
            </div>
            <ul className="space-y-5 relative z-10">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-center gap-3 text-slate-800 text-lg">
                  <CheckCircle2 className="w-6 h-6 text-theme-maroon flex-shrink-0 mt-0.5" />
                  {solution}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformBenefits;
