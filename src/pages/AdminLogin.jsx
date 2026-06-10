import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ShieldCheck } from 'lucide-react';
import adminIllustration from '../assets/admin-illustration.png';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Admin email is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Role-based auth mock
    if (formData.email === 'admin@campus.edu' && formData.password === 'admin') {
      navigate('/admin/dashboard');
    } else {
      setErrors({ email: 'Unauthorized access. Valid admin credentials required.' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-8 font-sans text-slate-900">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Left Panel */}
        <div className="md:w-5/12 bg-theme-dark-maroon text-white flex flex-col justify-end relative overflow-hidden group">
          {/* Background Image */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${adminIllustration})` }}
          ></div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 z-0"></div>

          <div className="relative z-10 px-8 lg:px-12 pb-6 lg:pb-8 pt-0 mt-auto w-full flex items-center justify-between gap-4">
            <div className="bg-theme-dark-maroon/80 px-5 py-3 rounded-xl backdrop-blur-md border border-white/20 shadow-xl w-max">
              <Link to="/" className="text-lg font-bold hover:text-theme-light-maroon transition-colors flex items-center gap-2 w-max">
                Back to Home <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="md:w-7/12 p-6 md:p-10 lg:p-12 flex flex-col max-h-[85vh] overflow-y-auto">
          <div className="max-w-xl w-full mx-auto flex-grow flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-maroon/10 text-theme-maroon font-bold text-xs uppercase tracking-wider w-max mb-6">
              <ShieldCheck className="w-4 h-4" />
              CampusBazaar Administration Portal
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Admin Access</h2>
              <p className="text-slate-500 text-lg">Manage users, listings, reports, and marketplace operations.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Admin Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full pl-11 pr-4 py-3 bg-slate-50 border ${errors.email ? 'border-red-300 focus:ring-red-500' : 'border-slate-100 focus:border-theme-maroon focus:ring-theme-maroon'} rounded-xl text-slate-900 focus:ring-2 focus:outline-none transition-all`}
                    placeholder="admin@campus.edu"
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full pl-11 pr-12 py-3 bg-slate-50 border ${errors.password ? 'border-red-300 focus:ring-red-500' : 'border-slate-100 focus:border-theme-maroon focus:ring-theme-maroon'} rounded-xl text-slate-900 focus:ring-2 focus:outline-none transition-all`}
                    placeholder="Enter your password"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-theme-maroon transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              </div>



              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-theme-maroon focus:ring-theme-maroon border-slate-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-slate-600 font-medium">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-bold text-theme-wine hover:text-theme-maroon">
                    Forgot Password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-theme-dark-maroon text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:bg-theme-maroon hover:shadow-lg hover:shadow-theme-maroon/30 transition-all flex justify-center items-center gap-2 mt-8"
              >
                ADMIN LOGIN <span>&rarr;</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
