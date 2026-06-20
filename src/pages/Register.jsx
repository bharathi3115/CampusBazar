import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Phone, Hash, Lock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import authIllustration from '../assets/auth-illustration.png';
import { useAuth } from '../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';

const Register = () => {
  const navigate = useNavigate();
  const { login, selectRole } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    rollNumber: '',
    email: '',
    mobile: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState('');

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

  const handleSubmit = async (e) => {
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

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Success -> Redirect to Login
        navigate('/login');
      } else {
        setGlobalError(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setGlobalError('Network error. Please make sure the server is running.');
      console.error('Registration error:', error);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setGlobalError('');
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const googleUser = await res.json();
        
        const fullUser = await login({ 
          email: googleUser.email, 
          name: googleUser.name,
          googleId: googleUser.sub,
          picture: googleUser.picture
        });

        // Redirect based on whether the user has a defined role
        if (fullUser && fullUser.role && (fullUser.role === 'buyer' || fullUser.role === 'seller')) {
          selectRole(fullUser.role);
        } else {
          navigate('/choose-role');
        }
      } catch (err) {
        setGlobalError('Failed to authenticate with Google.');
      }
    },
    onError: () => setGlobalError('Google Sign-In was cancelled or failed.'),
  });

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
              <p className="text-xs text-white/80 font-medium mb-1 uppercase tracking-wider">Already a member?</p>
              <Link to="/login" className="text-lg font-bold hover:text-theme-light-maroon transition-colors flex items-center gap-2 w-max">
                Log In Now <span>&rarr;</span>
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
        <div className="md:w-7/12 p-6 md:p-10 lg:p-16 flex flex-col min-h-[650px] max-h-[85vh] overflow-y-auto">
          <div className="max-w-xl w-full mx-auto flex-grow flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Create Account</h2>
              <p className="text-slate-500">Join the CampusBazar student community.</p>
            </div>

            {globalError && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{globalError}</p>
              </div>
            )}

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
                className="w-full bg-theme-maroon text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:bg-theme-dark-maroon hover:shadow-lg hover:shadow-theme-maroon/30 transition-all flex justify-center items-center gap-2 mt-8"
              >
                CREATE ACCOUNT <span>&rarr;</span>
              </button>
            </form>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
