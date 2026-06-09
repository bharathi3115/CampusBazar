import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Phone, Hash, Lock, CheckCircle, XCircle } from 'lucide-react';
import authIllustration from '../assets/auth-illustration.png';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    rollNumber: '',
    email: '',
    mobile: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validatePassword = (pwd) => {
    const minLength = pwd.length >= 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    return minLength && hasUpper && hasLower && hasNumber && hasSpecial;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.rollNumber.trim()) newErrors.rollNumber = 'Roll Number is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password does not meet requirements';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success -> Redirect to Login
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-8 font-sans text-slate-900">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel */}
        <div className="md:w-5/12 bg-theme-dark-maroon text-white flex flex-col justify-end relative overflow-hidden group">
          {/* Background Image */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${authIllustration})` }}
          ></div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          <div className="relative z-10 p-8 lg:p-12 pt-0 mt-auto w-full flex items-center justify-between gap-4">
            <div className="bg-theme-dark-maroon/80 p-4 rounded-xl backdrop-blur-md border border-white/20 shadow-xl w-max">
              <p className="text-xs text-white/80 font-medium mb-1 uppercase tracking-wider">Already a member?</p>
              <Link to="/login" className="text-lg font-bold hover:text-theme-light-maroon transition-colors flex items-center gap-2 w-max">
                Log In Now <span>&rarr;</span>
              </Link>
            </div>

            <Link to="/" className="text-sm font-bold text-white/80 hover:text-white flex items-center gap-1 w-max transition-colors uppercase tracking-wider drop-shadow-md">
              &larr; HOME
            </Link>
          </div>
        </div>

      {/* Right Panel */}
      <div className="md:w-7/12 p-6 md:p-10 lg:p-12 flex flex-col max-h-[85vh] overflow-y-auto">
        <div className="max-w-xl w-full mx-auto flex-grow flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Create Account</h2>
            <p className="text-slate-500">Join the CampusBazar student community.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`block w-full pl-11 pr-4 py-3 bg-slate-50 border ${errors.fullName ? 'border-red-300 focus:ring-red-500' : 'border-slate-100 focus:border-theme-maroon focus:ring-theme-maroon'} rounded-xl text-slate-900 focus:ring-2 focus:outline-none transition-all`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Roll Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Hash className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    className={`block w-full pl-11 pr-4 py-3 bg-slate-50 border ${errors.rollNumber ? 'border-red-300 focus:ring-red-500' : 'border-slate-100 focus:border-theme-maroon focus:ring-theme-maroon'} rounded-xl text-slate-900 focus:ring-2 focus:outline-none transition-all`}
                    placeholder="e.g. 21BCE123"
                  />
                </div>
                {errors.rollNumber && <p className="mt-1 text-xs text-red-500">{errors.rollNumber}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
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
                  placeholder="student@campus.edu"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Mobile Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={`block w-full pl-11 pr-4 py-3 bg-slate-50 border ${errors.mobile ? 'border-red-300 focus:ring-red-500' : 'border-slate-100 focus:border-theme-maroon focus:ring-theme-maroon'} rounded-xl text-slate-900 focus:ring-2 focus:outline-none transition-all`}
                  placeholder="9876543210"
                />
              </div>
              {errors.mobile && <p className="mt-1 text-xs text-red-500">{errors.mobile}</p>}
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
                  placeholder="Create a strong password"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-theme-maroon transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password ? (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              ) : formData.password.length > 0 ? (
                <div className="mt-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Security Checklist</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className={`flex items-center gap-2 text-xs font-bold ${formData.password.length >= 8 ? 'text-theme-maroon' : 'text-slate-400'}`}>
                      {formData.password.length >= 8 ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4 text-red-400" />}
                      8+ CHARACTERS
                    </div>
                    <div className={`flex items-center gap-2 text-xs font-bold ${/[A-Z]/.test(formData.password) ? 'text-theme-maroon' : 'text-slate-400'}`}>
                      {/[A-Z]/.test(formData.password) ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4 text-red-400" />}
                      UPPERCASE
                    </div>
                    <div className={`flex items-center gap-2 text-xs font-bold ${/[a-z]/.test(formData.password) ? 'text-theme-maroon' : 'text-slate-400'}`}>
                      {/[a-z]/.test(formData.password) ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4 text-red-400" />}
                      LOWERCASE
                    </div>
                    <div className={`flex items-center gap-2 text-xs font-bold ${/\d/.test(formData.password) ? 'text-theme-maroon' : 'text-slate-400'}`}>
                      {/\d/.test(formData.password) ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4 text-red-400" />}
                      NUMBER
                    </div>
                    <div className={`flex items-center gap-2 text-xs font-bold ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-theme-maroon' : 'text-slate-400'}`}>
                      {/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4 text-red-400" />}
                      SPECIAL CHAR
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <button
              type="submit"
              className="w-full bg-theme-maroon text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:bg-theme-dark-maroon hover:shadow-lg hover:shadow-theme-maroon/30 transition-all flex justify-center items-center gap-2 mt-4"
            >
              CREATE ACCOUNT <span>&rarr;</span>
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center space-x-4">
            <span className="h-px bg-slate-200 flex-grow"></span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">OR</span>
            <span className="h-px bg-slate-200 flex-grow"></span>
          </div>

          <button
            type="button"
            className="mt-6 w-full bg-white border border-slate-200 text-slate-700 font-bold py-3.5 px-4 rounded-xl hover:bg-slate-50 transition-all flex justify-center items-center gap-3 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Register;
