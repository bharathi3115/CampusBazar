import React, { useState, useEffect } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about-us" },
  { label: "Categories", id: "categories" },
  { label: "How It Works", id: "how-it-works" }
];

const ACTION_LINKS = [
  { to: "/register", label: "User" },
  { to: "/admin/login", label: "Admin" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      let currentActive = "home";
      NAV_ITEMS.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section && scrollPosition >= section.offsetTop) currentActive = id;
      });
      setActiveSection(currentActive);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group" onClick={(e) => scrollToSection(e, "home")}>
            <div className="w-10 h-10 bg-theme-maroon rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-theme-maroon/30">
              <ShoppingCart className="text-white w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl text-slate-900 tracking-tight">
              Campus<span className="text-theme-maroon">Bazar</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8 items-center">
            {NAV_ITEMS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => scrollToSection(e, id)}
                className={`px-1 py-6 transition-all relative font-medium ${activeSection === id ? "text-theme-maroon font-semibold" : "text-slate-600 hover:text-theme-dark-maroon"}`}>
                {label}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {ACTION_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-2 bg-theme-maroon text-white px-5 py-2.5 rounded-full font-medium hover:bg-theme-dark-maroon transition-all transform hover:-translate-y-0.5 shadow-md shadow-theme-maroon/30">
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-500 hover:text-theme-dark-maroon rounded-md transition-colors">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white shadow-xl border-t border-slate-100 animate-in slide-in-from-top-2">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {NAV_ITEMS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => scrollToSection(e, id)}
                className={`block px-3 py-3 text-base font-medium rounded-lg transition-colors ${activeSection === id ? "text-theme-maroon bg-theme-maroon/10" : "text-slate-600 hover:text-theme-dark-maroon hover:bg-slate-50"}`}>
                {label}
              </a>
            ))}
            <div className="pt-4 flex gap-3">
              {ACTION_LINKS.map(({ to, label }) => (
                <Link key={to} to={to} className="flex-1 text-center bg-theme-maroon text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-theme-dark-maroon transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
