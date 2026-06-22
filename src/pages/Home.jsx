import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutUs from "../components/AboutUs";
import Categories from "../components/Categories";
import HowItWorks from "../components/HowItWorks";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen font-sans text-slate-900 bg-white">
      <Navbar />
      <Hero />
      <AboutUs />
      <Categories />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
