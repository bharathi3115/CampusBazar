import React from "react";
import { UserPlus, PlusSquare, MessageCircle, CheckCircle2 } from "lucide-react";

const steps = [
  { id: 1, title: "Register", description: "Create your student account using your university email.", icon: <UserPlus className="w-6 h-6 text-purple-600" /> },
  { id: 2, title: "List Item", description: "Upload photos, set a price, and describe your item.", icon: <PlusSquare className="w-6 h-6 text-purple-600" /> },
  { id: 3, title: "Connect", description: "Chat securely with interested buyers on campus.", icon: <MessageCircle className="w-6 h-6 text-purple-600" /> },
  { id: 4, title: "Complete", description: "Meet on campus and complete the transaction safely.", icon: <CheckCircle2 className="w-6 h-6 text-purple-600" /> }
];

const features = ["Save Money on Essentials", "Trusted Student Community", "Eco-friendly: Reuse Resources", "Easy & Secure Communication", "Meet Safely on Campus", "No Shipping Fees"];

const Features = () => {
  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* How It Works */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              How It <span className="text-purple-700">Works</span>
            </h2>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              {steps.map((step) => (
                <div key={step.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-purple-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    {step.id}
                  </div>
                  {/* Card */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl bg-white shadow-sm border border-gray-100 group-hover:border-purple-200 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-purple-50 rounded-lg">{step.icon}</div>
                      <h3 className="font-bold text-gray-900 text-lg">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Use Campus Marketplace */}
          <div className="bg-purple-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-purple-800 opacity-50 blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-8">
                Why Use <br />
                <span className="text-purple-300">CampusBazaar?</span>
              </h2>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-400 flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-lg">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="mt-10 w-full bg-white text-purple-900 font-bold py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg text-lg">Join the Community</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
