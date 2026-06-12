import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import authIllustration from '../assets/auth-illustration.png';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
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
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success -> Redirect to Choose Role
    login({ email: formData.email });
    // In a real app, you'd get the user data from the backend here.
    navigate('/choose-role');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-8 font-sans text-slate-900">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel */}
        <div className="md:w-5/12 bg-theme-dark-maroon text-white flex flex-col justify-end relative overflow-hidden group">
          {/* Background Image */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${authIllustration})` }}
          ></div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 z-0"></div>

          <div className="relative z-10 px-8 lg:px-12 pb-6 lg:pb-8 pt-0 mt-auto w-full flex items-center justify-between gap-4">
            <div className="bg-theme-dark-maroon/80 p-4 rounded-xl backdrop-blur-md border border-white/20 shadow-xl w-max">
              <p className="text-xs text-white/80 font-medium mb-1 uppercase tracking-wider">New Here?</p>
              <Link to="/register" className="text-lg font-bold hover:text-theme-light-maroon transition-colors flex items-center gap-2 w-max">
                Create Profile <span>&rarr;</span>
              </Link>
            </div>

            <div className="bg-theme-dark-maroon/80 px-5 py-3 rounded-xl backdrop-blur-md border border-white/20 shadow-xl w-max">
              <Link to="/" className="text-sm font-bold text-white hover:text-theme-light-maroon transition-colors flex items-center gap-1 w-max uppercase tracking-wider">
                &larr; HOME
              </Link>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="md:w-7/12 p-6 md:p-10 lg:p-12 flex flex-col max-h-[85vh] overflow-y-auto">
          <div className="max-w-xl w-full mx-auto flex-grow flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome Back</h2>
              <p className="text-slate-500">Please enter your details to continue.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                className="w-full bg-theme-maroon text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:bg-theme-dark-maroon hover:shadow-lg hover:shadow-theme-maroon/30 transition-all flex justify-center items-center gap-2 mt-8"
              >
                LOG IN <span>&rarr;</span>
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
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
