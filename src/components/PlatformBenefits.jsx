import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';

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
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Platform <span className="text-purple-600">Benefits</span></h2>
          <p className="text-lg text-slate-600">See how CampusBazar solves everyday student marketplace problems.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Current Problems */}
          <div className="bg-white rounded-3xl p-8 border border-red-100 shadow-lg shadow-red-500/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-8 -mt-8"></div>
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                <XCircle className="w-6 h-6" />
              </span>
              Current Problems
            </h3>
            <ul className="space-y-5 relative z-10">
              {problems.map((problem, index) => (
                <li key={index} className="flex items-center gap-3 text-slate-600 text-lg">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  {problem}
                </li>
              ))}
            </ul>
          </div>

          {/* CampusBazar Solutions */}
          <div className="bg-gradient-to-br from-purple-600 to-fuchsia-700 rounded-3xl p-8 shadow-xl relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 relative z-10">
              <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                <CheckCircle className="w-6 h-6" />
              </span>
              CampusBazar Solutions
            </h3>
            <ul className="space-y-5 relative z-10">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-center gap-3 text-purple-50 text-lg">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
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
