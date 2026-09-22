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
  Award,
  Globe
} from 'lucide-react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, requestOtp, verifyOtp } = useContext(AuthContext);
  const { language, setLanguage, t } = useContext(LanguageContext);

  // Active role for main hero login card ('farmer' | 'company' | 'professional')
  const [selectedRole, setSelectedRole] = useState('farmer');

  // Main hero card login mode: 'password' | 'otp'
  const [heroLoginMode, setHeroLoginMode] = useState('password');

  // Hero card inputs
  const [heroIdentifier, setHeroIdentifier] = useState('9876543210');
  const [heroPassword, setHeroPassword] = useState('AgriSetu@2025');
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
    setHeroPassword('AgriSetu@2025');
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
      border: 'border-emerald-400 ring-2 ring-emerald-400/40 bg-white/40',
      iconBg: 'bg-emerald-500 text-white',
      titleColor: 'text-emerald-900',
      subtitleColor: 'text-emerald-800',
      badgeText: t('farmerAccountLoaded')
    },
    company: {
      accent: 'blue',
      border: 'border-blue-400 ring-2 ring-blue-400/40 bg-white/40',
      iconBg: 'bg-blue-500 text-white',
      titleColor: 'text-blue-900',
      subtitleColor: 'text-blue-800',
      badgeText: t('governmentAccountLoaded')
    },
    professional: {
      accent: 'purple',
      border: 'border-purple-400 ring-2 ring-purple-400/40 bg-white/40',
      iconBg: 'bg-purple-500 text-white',
      titleColor: 'text-purple-900',
      subtitleColor: 'text-purple-800',
      badgeText: t('professionalAccountLoaded')
    }
  }[selectedRole];

  return (
    <div
      className="min-h-screen font-sans text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-800 relative flex flex-col justify-between overflow-x-hidden"
      style={{
        backgroundImage: `radial-gradient(circle at 90% 40%, rgba(255, 237, 160, 0.45) 0%, rgba(254, 215, 170, 0.25) 25%, transparent 55%), radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 45%), linear-gradient(180deg, rgba(240, 253, 244, 0.2) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(220, 252, 231, 0.25) 100%), url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2400&q=85')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 35%',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Natural depth overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.5px] pointer-events-none" />

      {/* ========================================================================= */}
      {/* 1. TOP HEADER - EXACT MATCH TO SCREENSHOT                                 */}
      {/* ========================================================================= */}
      <header className="relative z-40 px-4 sm:px-8 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-900 border-2 border-amber-400/70 p-0.5 shadow-lg shadow-emerald-900/40 flex items-center justify-center overflow-hidden">
              <img
                src="/agriprocure-logo.png"
                alt="AgriProcure Emblem Logo"
                className="w-full h-full object-contain hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-slate-900 leading-none">
                Agri<span className="text-emerald-700">Setu</span>
              </span>
              <p className="text-[11px] font-medium text-slate-700 tracking-normal mt-0.5">
                {t('directPlatform')}
              </p>
            </div>
          </div>

          {/* Right Header Badges: Language Selector + Verified Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            
            {/* Language Capsule Pill */}
            <div className="flex items-center bg-white/45 backdrop-blur-md p-1 rounded-full border border-white/60 shadow-xs">
              <Globe className="w-3.5 h-3.5 text-slate-600 ml-2 mr-1" />
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full font-bold text-xs transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('bn')}
                className={`px-2.5 py-1 rounded-full font-bold text-xs transition-all cursor-pointer ${
                  language === 'bn'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                বাংলা
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 rounded-full font-bold text-xs transition-all cursor-pointer ${
                  language === 'hi'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                हिन्दी
              </button>
            </div>

            {/* Verified Users Badge */}
            <div className="hidden sm:flex items-center gap-2 bg-white/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/60 shadow-xs">
              <div className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <span className="font-extrabold text-slate-900 block text-xs leading-tight">{t('verifiedUsers')}</span>
                <span className="text-[10px] text-slate-600 font-medium">{t('trustedSecure')}</span>
              </div>
            </div>

            {/* Direct Connection Badge */}
            <div className="hidden sm:flex items-center gap-2 bg-white/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/60 shadow-xs">
              <div className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
                <GitFork className="w-3.5 h-3.5 rotate-90" />
              </div>
              <div className="text-left">
                <span className="font-extrabold text-slate-900 block text-xs leading-tight">{t('directConnection')}</span>
                <span className="text-[10px] text-slate-600 font-medium">{t('noMiddlemen')}</span>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Global Alerts / Toasts */}
      {(errorBanner || successBanner) && (
        <div className="max-w-4xl mx-auto px-4 pt-1 z-30 w-full">
          {errorBanner && (
            <div className="p-3.5 rounded-2xl bg-red-50/90 backdrop-blur-md border border-red-200 text-red-700 text-sm flex items-center justify-between shadow-md animate-fade-in">
              <div className="flex items-center gap-2">
                <span>⚠️</span>
                <span>{errorBanner}</span>
              </div>
              <button onClick={() => setErrorBanner('')} className="text-red-400 hover:text-red-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          {successBanner && (
            <div className="p-3.5 rounded-2xl bg-emerald-50/90 backdrop-blur-md border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between shadow-md animate-fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{successBanner}</span>
              </div>
              <button onClick={() => setSuccessBanner('')} className="text-emerald-500 hover:text-emerald-700 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MAIN CENTER HERO SECTION (Exact Match to Screenshot)                   */}
      {/* ========================================================================= */}
      <main className="relative z-10 px-4 sm:px-6 md:px-12 py-6 md:py-10 max-w-7xl mx-auto w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative">
          
          {/* ===================================================================== */}
          {/* LEFT COLUMN: Welcome Back, 3 Role Cards, Demo Fill, Trust Badges      */}
          {/* ===================================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Heading: Crystal Clear Vibrant Green Font */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-emerald-800 tracking-tight flex items-center gap-2.5 drop-shadow-sm">
                <span>{t('welcomeBack')}</span>
              </h1>
              {/* Subtitle: Crystal Clear Vibrant Green Font */}
              <p className="text-sm sm:text-base font-extrabold text-emerald-700 mt-1">
                {t('loginSubtitle')}
              </p>

              {/* Role Selection Container */}
              <div className="mt-8">
                {/* LOGIN AS Label: Crystal Clear Vibrant Green Font */}
                <label className="text-[11px] font-black uppercase tracking-wider text-emerald-800 block mb-3">
                  {t('loginAs')}
                </label>

                {/* 3 Role Cards */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  
                  {/* Card 1: Farmer */}
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('farmer')}
                    className={`p-3 sm:p-4 rounded-2xl sm:rounded-3xl text-center transition-all flex flex-col items-center justify-between group cursor-pointer backdrop-blur-xl ${
                      selectedRole === 'farmer'
                        ? 'bg-white/45 border-2 border-emerald-400 shadow-xl shadow-emerald-600/20 ring-4 ring-emerald-400/25'
                        : 'bg-white/25 border border-white/50 hover:bg-white/40 shadow-sm'
                    }`}
                  >
                    <div
                      className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105 shadow-md border-2 ${
                        selectedRole === 'farmer'
                          ? 'border-emerald-500 ring-2 ring-emerald-400/40'
                          : 'border-emerald-300'
                      }`}
                    >
                      <img src="/farmer-avatar.png" alt="Farmer Logo" className="w-full h-full object-cover" />
                    </div>
                    <div className="mt-2.5 text-center">
                      <span
                        className={`font-black text-xs sm:text-sm block leading-tight ${
                          selectedRole === 'farmer' ? 'text-emerald-950' : 'text-slate-900'
                        }`}
                      >
                        {t('farmerRole')}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-slate-700 block mt-0.5 leading-tight font-medium">
                        {t('farmerDesc')}
                      </span>
                    </div>
                  </button>

                  {/* Card 2: Government */}
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('company')}
                    className={`p-3 sm:p-4 rounded-2xl sm:rounded-3xl text-center transition-all flex flex-col items-center justify-between group cursor-pointer backdrop-blur-xl ${
                      selectedRole === 'company'
                        ? 'bg-white/45 border-2 border-blue-400 shadow-xl shadow-blue-600/20 ring-4 ring-blue-400/25'
                        : 'bg-white/25 border border-white/50 hover:bg-white/40 shadow-sm'
                    }`}
                  >
                    <div
                      className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105 shadow-md border-2 ${
                        selectedRole === 'company'
                          ? 'border-purple-500 ring-2 ring-purple-400/40'
                          : 'border-purple-300'
                      }`}
                    >
                      <img src="/govt-avatar.png" alt="Government Logo" className="w-full h-full object-cover" />
                    </div>
                    <div className="mt-2.5 text-center">
                      <span
                        className={`font-black text-xs sm:text-sm block leading-tight ${
                          selectedRole === 'company' ? 'text-blue-950' : 'text-slate-900'
                        }`}
                      >
                        {t('governmentRole')}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-slate-700 block mt-0.5 leading-tight font-medium">
                        {t('governmentDesc')}
                      </span>
                    </div>
                  </button>

                  {/* Card 3: Professional Agent */}
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('professional')}
                    className={`p-3 sm:p-4 rounded-2xl sm:rounded-3xl text-center transition-all flex flex-col items-center justify-between group cursor-pointer backdrop-blur-xl ${
                      selectedRole === 'professional'
                        ? 'bg-white/45 border-2 border-purple-400 shadow-xl shadow-purple-600/20 ring-4 ring-purple-400/25'
                        : 'bg-white/25 border border-white/50 hover:bg-white/40 shadow-sm'
                    }`}
                  >
                    <div
                      className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105 shadow-md border-2 ${
                        selectedRole === 'professional'
                          ? 'border-blue-500 ring-2 ring-blue-400/40'
                          : 'border-blue-300'
                      }`}
                    >
                      <img src="/agent-avatar.png" alt="Agent Logo" className="w-full h-full object-cover" />
                    </div>
                    <div className="mt-2.5 text-center">
                      <span
                        className={`font-black text-xs sm:text-sm block leading-tight ${
                          selectedRole === 'professional' ? 'text-purple-950' : 'text-slate-900'
                        }`}
                      >
                        {t('agentRole')}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-slate-700 block mt-0.5 leading-tight font-medium">
                        {t('agentDesc')}
                      </span>
                    </div>
                  </button>

                </div>

                {/* Auto-fill Demo Credentials Capsule Bar */}
                <div className="mt-5 p-2 sm:p-2.5 rounded-full bg-white/35 backdrop-blur-xl border border-white/60 text-xs flex flex-wrap items-center justify-between gap-2 shadow-xs">
                  <span className="text-white font-bold text-[11px] sm:text-xs pl-2">
                    {t('demoCredentials')}
                  </span>
                  <div className="flex gap-1.5 pr-1">
                    <button
                      type="button"
                      onClick={() => quickFill('farmer')}
                      className="px-3 py-1 rounded-full bg-emerald-100/95 text-emerald-800 font-extrabold hover:bg-emerald-200 text-xs shadow-xs border border-emerald-300 cursor-pointer transition-all hover:scale-105"
                    >
                      {t('farmerRole')}
                    </button>
                    <button
                      type="button"
                      onClick={() => quickFill('company')}
                      className="px-3 py-1 rounded-full bg-blue-100/95 text-blue-800 font-extrabold hover:bg-blue-200 text-xs shadow-xs border border-blue-300 cursor-pointer transition-all hover:scale-105"
                    >
                      {t('governmentRole')}
                    </button>
                    <button
                      type="button"
                      onClick={() => quickFill('professional')}
                      className="px-3 py-1 rounded-full bg-purple-100/95 text-purple-800 font-extrabold hover:bg-purple-200 text-xs shadow-xs border border-purple-300 cursor-pointer transition-all hover:scale-105"
                    >
                      {t('agentRole')}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Left Trust Cards */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 bg-white/35 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/60 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-100/90 border border-emerald-300 flex items-center justify-center text-emerald-700">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-slate-900 block leading-tight">{t('secureLogin')}</span>
                  <span className="text-[10px] text-slate-700 font-medium">{t('secureLoginDesc')}</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-900 bg-emerald-100/90 backdrop-blur-md border border-emerald-300 px-3.5 py-1.5 rounded-full shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {t('safe100')}
              </span>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* VERTICAL GLASS DIVIDER (As shown in screenshot)                       */}
          {/* ===================================================================== */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-px bg-white/40 shadow-[0_0_12px_rgba(255,255,255,0.6)] transform -translate-x-1/2" />

          {/* ===================================================================== */}
          {/* RIGHT COLUMN: Frosted Form (Exact Match to Screenshot)                */}
          {/* ===================================================================== */}
          <div className="lg:col-span-6 lg:pl-4">
            <div className="space-y-4 max-w-md mx-auto lg:max-w-none">
              
              {/* Form Title: Green Font for high visibility */}
              <h2 className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight">
                {t('loginSubtitle')}
              </h2>

              {/* Account Loaded Banner */}
              <div className="p-3 rounded-2xl bg-emerald-50/70 backdrop-blur-md border border-emerald-200/80 text-xs flex items-center justify-between text-emerald-900 shadow-xs">
                <div className="flex items-center gap-2 font-bold">
                  <Sprout className="w-4 h-4 text-emerald-600" />
                  <span>{activeColorClasses.badgeText}</span>
                </div>
                <span className="text-[11px] bg-emerald-100 text-emerald-900 font-black px-2.5 py-0.5 rounded-lg border border-emerald-300">
                  {t('ready')}
                </span>
              </div>

              {/* Form Body: Password Mode */}
              {heroLoginMode === 'password' ? (
                <form onSubmit={handleHeroPasswordLogin} className="space-y-4">
                  {/* Mobile / Identifier Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1.5">
                      {selectedRole === 'farmer'
                        ? t('mobileNumber')
                        : selectedRole === 'company'
                        ? t('companyEmail')
                        : t('professionalId')}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        {selectedRole === 'farmer' ? (
                          <Phone className="w-4 h-4 text-slate-500" />
                        ) : selectedRole === 'company' ? (
                          <Mail className="w-4 h-4 text-slate-500" />
                        ) : (
                          <User className="w-4 h-4 text-slate-500" />
                        )}
                      </div>
                      <input
                        type="text"
                        required
                        autoComplete="username"
                        placeholder="9876543210"
                        value={heroIdentifier}
                        onChange={(e) => setHeroIdentifier(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/40 backdrop-blur-xl border border-white/70 rounded-2xl text-sm font-semibold text-slate-900 placeholder:text-slate-500 focus:outline-none focus:bg-white/70 focus:border-emerald-500 transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1.5">{t('password')}</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <Lock className="w-4 h-4 text-slate-500" />
                      </div>
                      <input
                        type={showHeroPassword ? 'text' : 'password'}
                        required
                        autoComplete="current-password"
                        placeholder="••••••••••"
                        value={heroPassword}
                        onChange={(e) => setHeroPassword(e.target.value)}
                        className="w-full pl-10 pr-11 py-3 bg-white/40 backdrop-blur-xl border border-white/70 rounded-2xl text-sm font-semibold text-slate-900 placeholder:text-slate-500 focus:outline-none focus:bg-white/70 focus:border-emerald-500 transition-all shadow-inner"
                      />
                      <button
                        type="button"
                        onClick={() => setShowHeroPassword(!showHeroPassword)}
                        className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-800 cursor-pointer"
                      >
                        {showHeroPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Forgot Password Link */}
                    <div className="text-right mt-1.5">
                      <button
                        type="button"
                        onClick={() => setForgotModalOpen(true)}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-900 hover:underline cursor-pointer"
                      >
                        {t('forgotPassword')}
                      </button>
                    </div>
                  </div>

                  {/* Primary Login with Password Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold py-3.5 px-5 rounded-2xl transition-all shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/45 flex items-center justify-center gap-2 cursor-pointer text-sm mt-2 active:scale-[0.99]"
                  >
                    <span>{t('loginWithPassword')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                /* OTP Login Mode */
                <form onSubmit={handleHeroVerifyOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1.5">
                      {t('mobileNumber')}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-700 font-bold text-xs">
                        +91
                      </div>
                      <input
                        type="tel"
                        maxLength={10}
                        required
                        autoComplete="tel"
                        placeholder="9876543210"
                        value={heroPhone}
                        onChange={(e) => setHeroPhone(e.target.value)}
                        className="w-full pl-12 pr-28 py-3 bg-white/40 backdrop-blur-xl border border-white/70 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:bg-white/70 focus:border-emerald-500 transition-all shadow-inner"
                      />
                      <button
                        type="button"
                        onClick={handleHeroRequestOtp}
                        disabled={loading}
                        className="absolute right-2 top-2 bottom-2 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all shadow-xs cursor-pointer"
                      >
                        {heroOtpSent ? t('resendOtp') : t('sendOtp')}
                      </button>
                    </div>
                  </div>

                  {heroOtpSent && (
                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1.5">{t('enterOtp')}</label>
                      <div className="relative">
                        <Smartphone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          maxLength={6}
                          required
                          placeholder="123456"
                          value={heroOtp}
                          onChange={(e) => setHeroOtp(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white/40 backdrop-blur-xl border border-white/70 rounded-2xl text-base font-mono tracking-widest text-center font-bold text-slate-900 focus:outline-none focus:bg-white/70 focus:border-emerald-500 shadow-inner"
                        />
                      </div>
                      {heroDemoOtp && (
                        <p className="text-[11px] text-emerald-800 font-bold mt-1">Demo code auto-filled: {heroDemoOtp}</p>
                      )}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !heroOtpSent}
                    className="w-full bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold py-3.5 px-5 rounded-2xl transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    <span>{t('verifyOtp')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* OR Divider */}
              <div className="relative my-3 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-400/50"></div>
                </div>
                <span className="relative bg-white/60 backdrop-blur-md px-3 py-0.5 rounded-full text-[11px] font-bold text-slate-600 uppercase tracking-widest border border-white/70 shadow-xs">
                  {t('or')}
                </span>
              </div>

              {/* Login with OTP Button */}
              <button
                type="button"
                onClick={() => {
                  setHeroLoginMode(heroLoginMode === 'password' ? 'otp' : 'password');
                  setErrorBanner('');
                }}
                className="w-full border border-emerald-500/80 bg-white/35 hover:bg-white/60 backdrop-blur-xl text-emerald-950 font-bold py-3 px-4 rounded-2xl transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer shadow-xs"
              >
                <Smartphone className="w-4 h-4 text-emerald-700" />
                <span>{heroLoginMode === 'password' ? t('loginWithOtp') : t('loginWithPassword')}</span>
              </button>

              {/* Footer Register Link */}
              <div className="text-center pt-2">
                <p className="text-xs font-semibold text-slate-800">
                  {t('newToAgriSetu')}{' '}
                  <Link
                    to={`/register?role=${selectedRole}`}
                    className="font-black text-emerald-700 hover:text-emerald-900 hover:underline"
                  >
                    {t('registerNow')}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 3. LIGHT BOTTOM FOOTER                                                    */}
      {/* ========================================================================= */}
      <footer className="relative z-30 py-3 px-4 sm:px-8 text-xs text-slate-700">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 font-semibold">
            <span>{t('verifiedMarketplace')}</span>
            <span className="text-slate-400">•</span>
            <span>{t('directApmc')}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700">
            <span>{t('madeForIndia')}</span>
            <Sprout className="w-3.5 h-3.5 text-emerald-600" />
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
                <h3 className="text-xl font-black text-slate-900">{t('resetPassword')}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {t('forgotMobileDesc')}
                </p>

                <form onSubmit={handleForgotSendOtp} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('registeredMobileNumber')}
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
                    <span>{t('sendOtp')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* STAGE 2: ENTER OTP */}
            {forgotStage === 'otp' && (
              <div>
                <h3 className="text-xl font-black text-slate-900">{t('otpVerification')}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {t('enterOtpSentTo')} <span className="font-bold">+91 {forgotPhone}</span>
                </p>

                <form onSubmit={handleForgotVerifyOtp} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">{t('enterOtp')}</label>
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
                      {t('back')}
                    </button>
                    <button
                      type="submit"
                      disabled={forgotLoading}
                      className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md"
                    >
                      {t('verifyOtp')}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STAGE 3: CREATE NEW PASSWORD */}
            {forgotStage === 'new_password' && (
              <div>
                <h3 className="text-xl font-black text-slate-900">{t('createNewPassword')}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Choose a secure new password for your account.
                </p>

                <form onSubmit={handleForgotResetPassword} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">{t('newPassword')}</label>
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
                    <label className="block text-xs font-bold text-slate-700 mb-1">{t('confirmPassword')}</label>
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
                    {t('resetPassword')}
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
                  <h3 className="text-xl font-black text-slate-900">✓ {t('passwordUpdated')}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Your password has been successfully reset. You can now login with your new credentials.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleForgotFinishLogin}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <span>{t('proceedToLogin')}</span>
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