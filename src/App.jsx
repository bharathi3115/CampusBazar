import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Categories from './components/Categories';
import Listings from './components/Listings';
import HowItWorks from './components/HowItWorks';
import WhyChooseUs from './components/WhyChooseUs';
import PlatformBenefits from './components/PlatformBenefits';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen font-sans text-slate-900 bg-white">
      <Navbar />
      <Hero />
      <AboutUs />
      <Categories />
      <Listings />
      <HowItWorks />
      <WhyChooseUs />
      <PlatformBenefits />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
