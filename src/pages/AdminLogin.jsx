import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ShieldCheck, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import adminIllustration from '../assets/admin-illustration.png';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [globalError, setGlobalError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validatePassword = (pwd) => {
    const isLengthValid = pwd.length >= 8 && pwd.length <= 12;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    return isLengthValid && hasUpper && hasLower && hasNumber && hasSpecial;
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setGlobalError('');
    setSuccessMessage('');
    if (!formData.email) {
      setErrors({ email: 'Email is required to reset password.' });
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMessage(data.message);
      } else {
        setGlobalError(data.message || 'Failed to request password reset.');
      }
    } catch (err) {
      setGlobalError('Network error. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError('');
    setSuccessMessage('');
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Admin email is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must contain 8-12 characters, one uppercase, one lowercase, one number, and one special character.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });
      const data = await res.json();
      
      if (res.ok) {
        if (data.role !== 'admin') {
          setGlobalError('Unauthorized access. Valid admin credentials required.');
          return;
        }
        // Success
        const storage = formData.rememberMe ? localStorage : sessionStorage;
        storage.setItem('isAuthenticated', 'true');
        storage.setItem('user', JSON.stringify(data));
        storage.setItem('role', 'admin');
        navigate('/admin/dashboard');
      } else {
        setGlobalError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setGlobalError('Network error. Please try again.');
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

            {globalError && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{globalError}</p>
              </div>
            )}
            
            {successMessage && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-700">{successMessage}</p>
              </div>
            )}

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
                {errors.password ? (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                ) : formData.password.length > 0 ? (
                  <div className="mt-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Security Checklist</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className={`flex items-center gap-2 text-xs font-bold ${formData.password.length >= 8 && formData.password.length <= 12 ? 'text-theme-maroon' : 'text-slate-400'}`}>
                        {formData.password.length >= 8 && formData.password.length <= 12 ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4 text-red-400" />}
                        8-12 CHARACTERS
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
                  <button type="button" onClick={handleForgotPassword} className="font-bold text-theme-wine hover:text-theme-maroon">
                    Forgot Password?
                  </button>
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
