import React from 'react';
import { CreditCard, QrCode, Smartphone, Sparkles, UserCheck, LineChart, Bell } from 'lucide-react';

const enhancements = [
  { title: 'Online Payment Integration', icon: <CreditCard className="w-6 h-6" />, color: 'bg-emerald-100 text-emerald-600' },
  { title: 'QR-Based Student Verification', icon: <QrCode className="w-6 h-6" />, color: 'bg-purple-100 text-purple-600' },
  { title: 'Mobile Application', icon: <Smartphone className="w-6 h-6" />, color: 'bg-purple-100 text-purple-600' },
  { title: 'AI Product Recommendations', icon: <Sparkles className="w-6 h-6" />, color: 'bg-amber-100 text-amber-600' },
  { title: 'Personalized Recommendation Engine', icon: <UserCheck className="w-6 h-6" />, color: 'bg-rose-100 text-rose-600' },
  { title: 'Transaction Analytics Dashboard', icon: <LineChart className="w-6 h-6" />, color: 'bg-cyan-100 text-cyan-600' },
  { title: 'Real-Time Notifications', icon: <Bell className="w-6 h-6" />, color: 'bg-fuchsia-100 text-fuchsia-600' }
];

const FutureEnhancements = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-50 text-fuchsia-700 text-sm font-bold mb-4">
            <Sparkles className="w-4 h-4" /> Roadmap
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Future <span className="text-purple-600">Enhancements</span></h2>
          <p className="text-lg text-slate-600">We are constantly improving. Here is a sneak peek at what is coming next to CampusBazar.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {enhancements.map((item, index) => (
            <div key={index} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-purple-100 transition-all group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color} group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-800 leading-snug">{item.title}</h3>
              <div className="mt-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Coming Soon</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FutureEnhancements;
