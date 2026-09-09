import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Sprout,
  ShieldCheck,
  GitFork,
  Tag,
  Lock,
  Mail,
  Phone,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Building2,
  UserCheck,
  Sparkles,
  Smartphone,
  X,
  Check,
  FileCheck,
  Briefcase,
  Tractor,
  Award
} from 'lucide-react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, requestOtp, verifyOtp } = useContext(AuthContext);

  // Active role for main hero login card ('farmer' | 'company' | 'professional')
  const [selectedRole, setSelectedRole] = useState('farmer');

  // Main hero card login mode: 'password' | 'otp'
  const [heroLoginMode, setHeroLoginMode] = useState('password');

  // Hero card inputs
  const [heroIdentifier, setHeroIdentifier] = useState('9876543210');
  const [heroPassword, setHeroPassword] = useState('password123');
  const [heroPhone, setHeroPhone] = useState('9876543210');
  const [heroOtp, setHeroOtp] = useState('');
  const [heroOtpSent, setHeroOtpSent] = useState(false);
  const [heroDemoOtp, setHeroDemoOtp] = useState('');
  const [showHeroPassword, setShowHeroPassword] = useState(false);



  // Forgot Password Flow State (Page 8 of PDF): 'mobile' | 'otp' | 'new_password' | 'updated'
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotStage, setForgotStage] = useState('mobile');
  const [forgotPhone, setForgotPhone] = useState('9876543210');
  const [forgotOtp, setForgotOtp] = useState('');
  const [forgotDemoOtp, setForgotDemoOtp] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [showForgotNewPassword, setShowForgotNewPassword] = useState(false);
  const [showForgotConfirmPassword, setShowForgotConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorBanner, setErrorBanner] = useState('');
  const [successBanner, setSuccessBanner] = useState('');

  // Handle prefilled registration state if redirected from Register
  useEffect(() => {
    if (location.state?.registeredPhone) {
      setHeroIdentifier(location.state.registeredPhone);
      setHeroPhone(location.state.registeredPhone);
      if (location.state.role) setSelectedRole(location.state.role);
      setSuccessBanner('Account registered successfully! Please enter your password to login.');
    }
  }, [location.state]);

  // Update default credentials in hero form when role changes
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (role === 'farmer') {
      setHeroIdentifier('9876543210');
      setHeroPhone('9876543210');
    } else if (role === 'company') {
      setHeroIdentifier('company@test.com');
      setHeroPhone('9876543211');
    } else {
      setHeroIdentifier('pro@test.com');
      setHeroPhone('9876543212');
    }
    setHeroPassword('password123');
    setHeroOtpSent(false);
    setHeroOtp('');
  };

  const navigateAfterLogin = (user) => {
    const role = user?.role || selectedRole;
    if (role === 'farmer') navigate('/farmer');
    else if (role === 'company') navigate('/company');
    else navigate('/professional');
  };

  // Submit password login for Hero card
  const handleHeroPasswordLogin = async (e) => {
    e.preventDefault();
    setErrorBanner('');
    setLoading(true);
    try {
      const user = await login(heroIdentifier.trim(), heroPassword);
      navigateAfterLogin(user);
    } catch (err) {
      setErrorBanner(err.response?.data?.message || 'Login failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Request OTP for Hero card
  const handleHeroRequestOtp = async () => {
    if (!heroPhone || heroPhone.length < 10) {
      setErrorBanner('Please enter a valid 10-digit mobile number.');
      return;
    }
    setErrorBanner('');
    setLoading(true);
    try {
      const res = await requestOtp(heroPhone.trim());
      setHeroOtpSent(true);
      if (res?.demoOtp) {
        setHeroDemoOtp(res.demoOtp);
        setHeroOtp(res.demoOtp); // Auto-fill for seamless testing
      }
      setSuccessBanner(`OTP sent to +91 ${heroPhone}! ${res?.demoOtp ? `(Demo OTP: ${res.demoOtp})` : ''}`);
    } catch (err) {
      setErrorBanner(err.response?.data?.message || 'Failed to send OTP. Please check the mobile number.');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP for Hero card
  const handleHeroVerifyOtp = async (e) => {
    e.preventDefault();
    if (!heroOtp) {
      setErrorBanner('Please enter the 6-digit OTP.');
      return;
    }
    setErrorBanner('');
    setLoading(true);
    try {
      const user = await verifyOtp(heroPhone.trim(), heroOtp.trim());
      navigateAfterLogin(user);
    } catch (err) {
      setErrorBanner(err.response?.data?.message || 'Invalid or expired OTP.');
    } finally {
      setLoading(false);
    }
  };



  // Forgot password flow handlers (Page 8 of PDF)
  const handleForgotSendOtp = async (e) => {
    e.preventDefault();
    setForgotError('');
    const clean = forgotPhone.replace(/\D/g, '');
    if (clean.length < 10) {
      setForgotError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setForgotLoading(true);
    try {
      const res = await API.post('/auth/request-otp', { phone: clean });
      setForgotDemoOtp(res.data?.demoOtp || '');
      setForgotOtp(res.data?.demoOtp || '');
      setForgotStage('otp');
    } catch (err) {
      setForgotError(err.response?.data?.message || 'Failed to send OTP. Please check the mobile number.');
    } finally {
      setForgotLoading(false);
    }
  };

  const handleForgotVerifyOtp = async (e) => {
    e.preventDefault();
    setForgotError('');
    if (!forgotOtp || forgotOtp.length < 6) {
      setForgotError('Please enter the 6-digit OTP.');
      return;
    }
    setForgotLoading(true);
    try {
      const clean = forgotPhone.replace(/\D/g, '');
      await API.post('/auth/verify-otp', { phone: clean, otp: forgotOtp.trim(), forReset: true });
      setForgotStage('new_password');
    } catch (err) {
      setForgotError(err.response?.data?.message || 'Invalid or expired OTP.');
    } finally {
      setForgotLoading(false);
    }
  };

  const handleForgotResetPassword = async (e) => {
    e.preventDefault();
    setForgotError('');
    if (forgotNewPassword.length < 6) {
      setForgotError('Password must be at least 6 characters.');
      return;
    }
    if (forgotNewPassword !== forgotConfirmPassword) {
      setForgotError('Passwords do not match.');
      return;
    }
    setForgotLoading(true);
    try {
      const clean = forgotPhone.replace(/\D/g, '');
      await API.post('/auth/reset-password', {
        phone: clean,
        otp: forgotOtp.trim(),
        newPassword: forgotNewPassword
      });
      setForgotStage('updated');
    } catch (err) {
      setForgotError(err.response?.data?.message || 'Failed to reset password.');
    } finally {
      setForgotLoading(false);
    }
  };

  const handleForgotFinishLogin = () => {
    setHeroIdentifier(forgotPhone);
    setHeroPassword(forgotNewPassword);
    setForgotModalOpen(false);
    setForgotStage('mobile');
    setSuccessBanner('Password updated successfully! You can now click Login.');
  };

  // Quick 1-click test fill
  const quickFill = (role) => {
    handleRoleSelect(role);
    setHeroLoginMode('password');
  };

  // Visual Theme Colors
  const activeColorClasses = {
    farmer: {
      accent: 'emerald',
      border: 'border-emerald-600',
      bgLight: 'bg-emerald-50',
      btn: 'bg-emerald-600 hover:bg-emerald-700',
      text: 'text-emerald-700',
      ring: 'focus:ring-emerald-500'
    },
    company: {
      accent: 'blue',
      border: 'border-blue-600',
      bgLight: 'bg-blue-50',
      btn: 'bg-blue-600 hover:bg-blue-700',
      text: 'text-blue-700',
      ring: 'focus:ring-blue-500'
    },
    professional: {
      accent: 'purple',
      border: 'border-purple-600',
      bgLight: 'bg-purple-50',
      btn: 'bg-purple-600 hover:bg-purple-700',
      text: 'text-purple-700',
      ring: 'focus:ring-purple-500'
    }
  }[selectedRole];

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-800">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER                                                             */}
      {/* ========================================================================= */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 md:px-10 py-3 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-200">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900 leading-none">
                  Agri<span className="text-emerald-600">Procure</span>
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 tracking-normal mt-0.5">
                Direct Farm-to-Company Platform
              </p>
            </div>
          </div>

          {/* Value Props / Trust Highlights */}
          <div className="flex items-center gap-4 sm:gap-8 text-xs">
            {/* Value Prop 1 */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-800 block leading-tight">Verified Users</span>
                <span className="text-[10px] text-slate-500">Trusted & Secure</span>
              </div>
            </div>

            {/* Value Prop 2 */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <GitFork className="w-4 h-4 rotate-90" />
              </div>
              <div>
                <span className="font-bold text-slate-800 block leading-tight">Direct Connection</span>
                <span className="text-[10px] text-slate-500">No Middlemen</span>
              </div>
            </div>

            {/* Value Prop 3 */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-800 block leading-tight">Fair & Transparent</span>
                <span className="text-[10px] text-slate-500">Better Prices</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Global Alerts / Toasts */}
      {(errorBanner || successBanner) && (
        <div className="max-w-4xl mx-auto px-4 pt-4">
          {errorBanner && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center justify-between shadow-sm animate-fade-in">
              <div className="flex items-center gap-2">
                <span>⚠️</span>
                <span>{errorBanner}</span>
              </div>
              <button onClick={() => setErrorBanner('')} className="text-red-400 hover:text-red-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          {successBanner && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between shadow-sm animate-fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{successBanner}</span>
              </div>
              <button onClick={() => setSuccessBanner('')} className="text-emerald-500 hover:text-emerald-700">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TOP HERO SECTION WITH AGRICULTURAL BACKDROP & FLOATING LOGIN CARD      */}
      {/* ========================================================================= */}
      <section className="relative px-4 py-8 md:py-14 overflow-hidden">
        {/* Scenic Farm Background with Farmer & Tractor Atmosphere */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(16, 50, 28, 0.78), rgba(22, 60, 35, 0.65), rgba(30, 45, 60, 0.7)), url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2000&q=80')`
          }}
        >
          {/* Subtle rural overlay details */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Main Dual-Column Floating Login Card */}
          <div className="bg-white/98 backdrop-blur-md rounded-3xl shadow-2xl border border-white/60 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* LEFT COLUMN: Role Selection & Welcome */}
              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100 bg-gradient-to-b from-white to-slate-50/50">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Welcome Back! 👋
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">Login to continue to AgriProcure</p>

                  <div className="mt-6">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                      Login as
                    </label>

                    {/* 3 Role Selection Cards */}
                    <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                      {/* 1. Farmer */}
                      <button
                        type="button"
                        onClick={() => handleRoleSelect('farmer')}
                        className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-between group ${
                          selectedRole === 'farmer'
                            ? 'border-emerald-600 bg-emerald-50/70 shadow-md shadow-emerald-600/10'
                            : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/30'
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                            selectedRole === 'farmer' ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          <span className="text-xl">👨‍🌾</span>
                        </div>
                        <div className="mt-2">
                          <span
                            className={`font-bold text-xs sm:text-sm block leading-tight ${
                              selectedRole === 'farmer' ? 'text-emerald-800' : 'text-slate-800'
                            }`}
                          >
                            Farmer
                          </span>
                          <span className="text-[10px] text-slate-500 block mt-0.5 leading-tight">Sell your produce</span>
                        </div>
                      </button>

                      {/* 2. Company */}
                      <button
                        type="button"
                        onClick={() => handleRoleSelect('company')}
                        className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-between group ${
                          selectedRole === 'company'
                            ? 'border-blue-600 bg-blue-50/70 shadow-md shadow-blue-600/10'
                            : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/30'
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                            selectedRole === 'company' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          <Building2 className="w-6 h-6" />
                        </div>
                        <div className="mt-2">
                          <span
                            className={`font-bold text-xs sm:text-sm block leading-tight ${
                              selectedRole === 'company' ? 'text-blue-800' : 'text-slate-800'
                            }`}
                          >
                            Company
                          </span>
                          <span className="text-[10px] text-slate-500 block mt-0.5 leading-tight">
                            Buy quality produce
                          </span>
                        </div>
                      </button>

                      {/* 3. Professional */}
                      <button
                        type="button"
                        onClick={() => handleRoleSelect('professional')}
                        className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-between group ${
                          selectedRole === 'professional'
                            ? 'border-purple-600 bg-purple-50/70 shadow-md shadow-purple-600/10'
                            : 'border-slate-200 bg-white hover:border-purple-300 hover:bg-purple-50/30'
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                            selectedRole === 'professional'
                              ? 'bg-purple-600 text-white'
                              : 'bg-purple-100 text-purple-700'
                          }`}
                        >
                          <UserCheck className="w-6 h-6" />
                        </div>
                        <div className="mt-2">
                          <span
                            className={`font-bold text-xs sm:text-sm block leading-tight ${
                              selectedRole === 'professional' ? 'text-purple-800' : 'text-slate-800'
                            }`}
                          >
                            Professional
                          </span>
                          <span className="text-[10px] text-slate-500 block mt-0.5 leading-tight">
                            Expert & Services
                          </span>
                        </div>
                      </button>
                    </div>

                    {/* Quick 1-Click Demo Fill Bar */}
                    <div className="mt-5 p-2.5 rounded-xl bg-slate-100/90 border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-1.5">
                      <span className="text-slate-500 font-medium">Quick Demo Test:</span>
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => quickFill('farmer')}
                          className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold hover:bg-emerald-200 text-[11px]"
                        >
                          Farmer
                        </button>
                        <button
                          type="button"
                          onClick={() => quickFill('company')}
                          className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold hover:bg-blue-200 text-[11px]"
                        >
                          Company
                        </button>
                        <button
                          type="button"
                          onClick={() => quickFill('professional')}
                          className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-semibold hover:bg-purple-200 text-[11px]"
                        >
                          Pro
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Left Bottom Security Note */}
                <div className="mt-8 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">Secure Login</span>
                      <span className="text-[10px] text-slate-500">Your data is protected with encryption</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    100% Safe
                  </span>
                </div>
              </div>

              {/* RIGHT COLUMN: Role Login Form */}
              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      Login to your {selectedRole} account
                    </h2>
                    {heroLoginMode === 'otp' && (
                      <button
                        type="button"
                        onClick={() => setHeroLoginMode('password')}
                        className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
                      >
                        Use Password
                      </button>
                    )}
                  </div>

                  {/* Password Login Mode */}
                  {heroLoginMode === 'password' ? (
                    <form onSubmit={handleHeroPasswordLogin} className="space-y-4">
                      {/* Identifier Input */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          {selectedRole === 'farmer'
                            ? 'Mobile Number / Email'
                            : selectedRole === 'company'
                            ? 'Email / Company Email'
                            : 'Professional ID / Email'}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            {selectedRole === 'farmer' ? (
                              <Phone className="w-4 h-4" />
                            ) : selectedRole === 'company' ? (
                              <Mail className="w-4 h-4" />
                            ) : (
                              <User className="w-4 h-4" />
                            )}
                          </div>
                          <input
                            type="text"
                            required
                            placeholder={
                              selectedRole === 'farmer'
                                ? 'Enter Mobile Number / Email'
                                : selectedRole === 'company'
                                ? 'Enter Company Email'
                                : 'Enter Professional ID or Email'
                            }
                            value={heroIdentifier}
                            onChange={(e) => setHeroIdentifier(e.target.value)}
                            className="w-full pl-10 pr-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                          />
                        </div>
                      </div>

                      {/* Password Input */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Lock className="w-4 h-4" />
                          </div>
                          <input
                            type={showHeroPassword ? 'text' : 'password'}
                            required
                            placeholder="Enter your password"
                            value={heroPassword}
                            onChange={(e) => setHeroPassword(e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowHeroPassword(!showHeroPassword)}
                            className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                          >
                            {showHeroPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>

                        {/* Forgot Password Link */}
                        <div className="text-right mt-1.5">
                          <button
                            type="button"
                            onClick={() => setForgotModalOpen(true)}
                            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
                          >
                            Forgot Password?
                          </button>
                        </div>
                      </div>

                      {/* Primary Login Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className={`w-full text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 ${
                          activeColorClasses.btn
                        } ${loading ? 'opacity-70 cursor-wait' : ''}`}
                      >
                        <span>Login</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  ) : (
                    /* OTP Login Mode */
                    <form onSubmit={handleHeroVerifyOtp} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Registered Mobile Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <span className="text-xs font-bold text-slate-500">+91</span>
                          </div>
                          <input
                            type="tel"
                            maxLength={10}
                            required
                            placeholder="10-digit mobile number"
                            value={heroPhone}
                            onChange={(e) => setHeroPhone(e.target.value)}
                            className="w-full pl-12 pr-28 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                          />
                          <button
                            type="button"
                            onClick={handleHeroRequestOtp}
                            disabled={loading}
                            className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs hover:bg-emerald-100 transition-colors border border-emerald-200"
                          >
                            {heroOtpSent ? 'Resend' : 'Send OTP'}
                          </button>
                        </div>
                      </div>

                      {heroOtpSent && (
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Enter 6-Digit OTP</label>
                          <div className="relative">
                            <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                            <input
                              type="text"
                              maxLength={6}
                              required
                              placeholder="Enter received OTP"
                              value={heroOtp}
                              onChange={(e) => setHeroOtp(e.target.value)}
                              className="w-full pl-10 pr-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-mono tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                          </div>
                          {heroDemoOtp && (
                            <p className="text-[11px] text-emerald-700 mt-1">Demo code auto-filled: {heroDemoOtp}</p>
                          )}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading || !heroOtpSent}
                        className={`w-full text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 ${
                          activeColorClasses.btn
                        } ${loading || !heroOtpSent ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        <span>Verify & Login</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  )}

                  {/* OR Divider */}
                  <div className="relative my-4 text-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <span className="relative bg-white px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      OR
                    </span>
                  </div>

                  {/* Login with OTP Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setHeroLoginMode(heroLoginMode === 'password' ? 'otp' : 'password');
                      setErrorBanner('');
                    }}
                    className="w-full border-2 border-emerald-600 text-emerald-800 font-bold py-2.5 px-4 rounded-xl hover:bg-emerald-50/60 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span>{heroLoginMode === 'password' ? 'Login with OTP' : 'Login with Password'}</span>
                  </button>
                </div>

                {/* Create Account Link */}
                <div className="text-center pt-5 mt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-600">
                    New to AgriProcure?{' '}
                    <Link
                      to={`/register?role=${selectedRole}`}
                      className="font-bold text-emerald-700 hover:text-emerald-900 hover:underline"
                    >
                      Create Account
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ========================================================================= */}
      {/* 4. VERIFIED & TRUSTED PLATFORM SECTION                                    */}
      {/* ========================================================================= */}
      <section className="bg-white border-y border-slate-200 py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Description */}
          <div className="max-w-md text-center lg:text-left">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Verified & Trusted Platform</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              All users are verified to ensure a safe and transparent marketplace for everyone.
            </p>
          </div>

          {/* Right 3 Verification Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
            {/* 1. Farmers Verified */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 shadow-inner">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-xs text-slate-900 block">Farmers Verified</span>
                <span className="text-[10px] text-slate-500 block">Aadhaar & land details verification</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full mt-1">
                  <Check className="w-3 h-3" /> Verified
                </span>
              </div>
            </div>

            {/* 2. Companies Verified */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 shrink-0 shadow-inner">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-xs text-slate-900 block">Companies Verified</span>
                <span className="text-[10px] text-slate-500 block">GST & business verification</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full mt-1">
                  <Check className="w-3 h-3" /> Verified
                </span>
              </div>
            </div>

            {/* 3. Professionals Verified */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-11 h-11 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 shrink-0 shadow-inner">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-xs text-slate-900 block">Professionals Verified</span>
                <span className="text-[10px] text-slate-500 block">Qualification & org verification</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full mt-1">
                  <Check className="w-3 h-3" /> Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FOOTER BAR & STATS                                                     */}
      {/* ========================================================================= */}
      <footer className="bg-slate-50 border-t border-slate-200 py-6 px-4 md:px-8 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Stats Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                🌾
              </div>
              <div>
                <span className="font-black text-slate-900 block text-sm leading-tight">10K+</span>
                <span className="text-[10px] text-slate-500">Farmers</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                🏢
              </div>
              <div>
                <span className="font-black text-slate-900 block text-sm leading-tight">500+</span>
                <span className="text-[10px] text-slate-500">Companies</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs">
                👥
              </div>
              <div>
                <span className="font-black text-slate-900 block text-sm leading-tight">100+</span>
                <span className="text-[10px] text-slate-500">Professionals</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-xs">
                📑
              </div>
              <div>
                <span className="font-black text-slate-900 block text-sm leading-tight">50K+</span>
                <span className="text-[10px] text-slate-500">Transactions</span>
              </div>
            </div>
          </div>

          {/* Right Signature */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span>Made with ❤️ for Farmers</span>
            <Sprout className="w-4 h-4 text-emerald-600" />
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 6. FORGOT PASSWORD MODAL (Page 8 of PDF)                                  */}
      {/* ========================================================================= */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setForgotModalOpen(false);
                setForgotStage('mobile');
                setForgotError('');
              }}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6" />
            </div>

            {/* Error Notification */}
            {forgotError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs mb-4 flex items-center gap-2">
                <span>⚠️</span>
                <span>{forgotError}</span>
              </div>
            )}

            {/* STAGE 1: ENTER REGISTERED MOBILE & SEND OTP */}
            {forgotStage === 'mobile' && (
              <div>
                <h3 className="text-xl font-black text-slate-900">RESET PASSWORD</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your registered mobile number to receive a verification OTP.
                </p>

                <form onSubmit={handleForgotSendOtp} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Registered Mobile Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-bold text-xs">
                        +91
                      </div>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        value={forgotPhone}
                        onChange={(e) => setForgotPhone(e.target.value)}
                        className="w-full pl-12 pr-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <span>SEND OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* STAGE 2: ENTER OTP */}
            {forgotStage === 'otp' && (
              <div>
                <h3 className="text-xl font-black text-slate-900">OTP VERIFICATION</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enter the 6-digit OTP sent to <span className="font-bold">+91 {forgotPhone}</span>
                </p>

                <form onSubmit={handleForgotVerifyOtp} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Enter OTP</label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="[ _ ][ _ ][ _ ][ _ ][ _ ][ _ ]"
                      value={forgotOtp}
                      onChange={(e) => setForgotOtp(e.target.value)}
                      className="w-full p-2.5 border border-emerald-300 rounded-xl text-base font-mono tracking-widest text-center focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    {forgotDemoOtp && (
                      <p className="text-[11px] text-emerald-700 mt-1">
                        Demo OTP helper: <span className="font-bold">{forgotDemoOtp}</span> (auto-filled)
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setForgotStage('mobile')}
                      className="w-1/3 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold py-2.5 rounded-xl text-xs"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={forgotLoading}
                      className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md"
                    >
                      VERIFY OTP
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STAGE 3: CREATE NEW PASSWORD */}
            {forgotStage === 'new_password' && (
              <div>
                <h3 className="text-xl font-black text-slate-900">CREATE NEW PASSWORD</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Choose a secure new password for your account.
                </p>

                <form onSubmit={handleForgotResetPassword} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">New Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type={showForgotNewPassword ? 'text' : 'password'}
                        required
                        placeholder="Enter new password"
                        value={forgotNewPassword}
                        onChange={(e) => setForgotNewPassword(e.target.value)}
                        className="w-full pl-9 pr-9 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowForgotNewPassword(!showForgotNewPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                      >
                        {showForgotNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type={showForgotConfirmPassword ? 'text' : 'password'}
                        required
                        placeholder="Re-enter new password"
                        value={forgotConfirmPassword}
                        onChange={(e) => setForgotConfirmPassword(e.target.value)}
                        className="w-full pl-9 pr-9 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowForgotConfirmPassword(!showForgotConfirmPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                      >
                        {showForgotConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors shadow-md"
                  >
                    RESET PASSWORD
                  </button>
                </form>
              </div>
            )}

            {/* STAGE 4: FINALLY - PASSWORD UPDATED */}
            {forgotStage === 'updated' && (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">✓ Password Updated</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Your password has been successfully reset. You can now login with your new credentials.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleForgotFinishLogin}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <span>LOGIN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}