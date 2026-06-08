import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'About Us', id: 'about-us' },
  { label: 'Categories', id: 'categories' },
  { label: 'Items', id: 'items' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'Why Us', id: 'why-us' },
  { label: 'Benefits', id: 'benefits' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // 100px offset to detect active section when it's slightly below the navbar
      const scrollPosition = window.scrollY + 100;

      let currentActive = 'home';
      for (const item of NAV_ITEMS) {
        const section = document.getElementById(item.id);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            currentActive = item.id;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer group"
            onClick={(e) => scrollToSection(e, 'home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-fuchsia-800 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-purple-500/30">
              <ShoppingCart className="text-white w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl text-slate-900 tracking-tight">Campus<span className="text-purple-600">Bazar</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8 items-center">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`px-1 py-6 transition-all relative font-medium
                  ${activeSection === item.id 
                    ? 'text-purple-600 border-b-2 border-purple-600 font-semibold' 
                    : 'text-slate-600 hover:text-purple-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-purple-600 after:transition-all after:duration-300'
                  }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="flex items-center gap-2 text-slate-600 font-medium hover:text-purple-600 transition-colors">
              Login
            </button>
            <button className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-purple-700 transition-all transform hover:-translate-y-0.5 shadow-md shadow-purple-500/30">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-500 hover:text-purple-600 rounded-md transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white shadow-xl border-t border-slate-100 animate-in slide-in-from-top-2">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`block px-3 py-3 text-base font-medium rounded-lg transition-colors
                  ${activeSection === item.id 
                    ? 'text-purple-600 bg-purple-50' 
                    : 'text-slate-600 hover:text-purple-600 hover:bg-slate-50'
                  }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 flex gap-3">
               <button className="flex-1 border border-purple-200 text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50">Login</button>
               <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg font-medium shadow-md">Sign Up</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
