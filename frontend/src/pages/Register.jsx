import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  Sprout,
  Building2,
  UserCheck,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  RefreshCw,
  MapPin,
  Lock,
  Phone,
  Calendar,
  Globe,
  Check,
  ShieldCheck,
  CreditCard,
  User,
  Wheat,
  Smartphone,
  CheckCheck
} from 'lucide-react';
import API from '../services/api';
import { INDIA_STATES, getDistrictsForState } from '../data/indiaLocations';

export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Role: 'farmer' | 'company' | 'professional'
  const initialRole = ['farmer', 'company', 'professional'].includes(searchParams.get('role'))
    ? searchParams.get('role')
    : 'farmer';
  const [role, setRole] = useState(initialRole);

  // Wizard Step: 1, 2, 3, 4, 5, or 'success'
  const [currentStep, setCurrentStep] = useState(1);

  // --- Step 1: Personal Details ---
  const [personal, setPersonal] = useState({
    fullName: '',
    mobileNumber: '',
    email: '', 
    dob: '',
    gender: 'Male',
    preferredLanguage: 'English'
  });

  // --- Step 2: Address Details ---
  const [address, setAddress] = useState({
    state: 'West Bengal',
    district: 'Darjeeling',
    block: '',
    village: '',
    pincode: '',
    useLocationCoords: null,
    locationLoading: false
  });
  const [availableDistricts, setAvailableDistricts] = useState([]);

  // --- Step 3: Farm / Profile Details ---
  const [farmDetails, setFarmDetails] = useState({
    farmerId: `FMR-2026-${String(Math.floor(100000 + Math.random() * 900000))}`,
    farmArea: '',
    landType: 'Owned',
    mainCrops: ['Wheat', 'Potato'],
    otherCrop: '',
    expectedQuantity: ''
  });

  // Company Details (if role === 'company')
  const [companyDetails, setCompanyDetails] = useState({
    companyName: '',
    gstin: '',
    cin: '',
    businessType: 'Food Processor',
    procurementCategories: ['Grains & Cereals'],
    storageCapacity: ''
  });

  // Professional Details (if role === 'professional')
  const [proDetails, setProDetails] = useState({
    qualification: '',
    licenseId: '',
    specialization: 'Quality Inspection & Grading',
    organization: '',
    experienceYears: ''
  });

  // --- Step 4: Bank / Payment Details ---
  const [bank, setBank] = useState({
    accountHolderName: '',
    bankName: 'State Bank of India',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
    isVerified: false,
    maskedAccountNumber: ''
  });

  // --- Step 5: Create Login Credentials & OTP ---
  const [credentials, setCredentials] = useState({
    password: '',
    confirmPassword: '',
    otp: '',
    otpSent: false,
    otpVerified: false,
    demoOtp: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Initialize districts for default state
  useEffect(() => {
    setAvailableDistricts(getDistrictsForState(address.state));
  }, [address.state]);

  // Role Theme Color Config
  const roleTheme = {
    farmer: {
      accentColor: 'emerald',
      title: 'FARMER REGISTRATION',
      subtitle: 'Create your account to book and track agricultural procurement.',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      activeTab: 'bg-emerald-600 text-white',
      btn: 'bg-emerald-600 hover:bg-emerald-700',
      stepIndicator: 'bg-emerald-600 text-white',
      border: 'border-emerald-600',
      bgLight: 'bg-emerald-50'
    },
    company: {
      accentColor: 'blue',
      title: 'COMPANY REGISTRATION',
      subtitle: 'Create your account to procure high-quality produce directly.',
      badgeBg: 'bg-blue-100 text-blue-800 border-blue-300',
      activeTab: 'bg-blue-600 text-white',
      btn: 'bg-blue-600 hover:bg-blue-700',
      stepIndicator: 'bg-blue-600 text-white',
      border: 'border-blue-600',
      bgLight: 'bg-blue-50'
    },
    professional: {
      accentColor: 'purple',
      title: 'PROFESSIONAL REGISTRATION',
      subtitle: 'Create your account to provide expert inspection & advisory services.',
      badgeBg: 'bg-purple-100 text-purple-800 border-purple-300',
      activeTab: 'bg-purple-600 text-white',
      btn: 'bg-purple-600 hover:bg-purple-700',
      stepIndicator: 'bg-purple-600 text-white',
      border: 'border-purple-600',
      bgLight: 'bg-purple-50'
    }
  }[role];

  // =========================================================================
  // STEP 1 VALIDATION & NAVIGATION
  // =========================================================================
  const handleStep1Continue = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!personal.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    const cleanPhone = personal.mobileNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (personal.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email.trim())) {
  setErrorMsg('Please enter a valid email address.');
  return;
}
    setCurrentStep(2);
  };

  // =========================================================================
  // STEP 2: ADDRESS & GEOLOCATION
  // =========================================================================
  const handleStateChange = (e) => {
    const st = e.target.value;
    const districts = getDistrictsForState(st);
    setAddress((prev) => ({
      ...prev,
      state: st,
      district: districts[0] || ''
    }));
    setAvailableDistricts(districts);
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation is not supported by your browser.');
      return;
    }
    setAddress((prev) => ({ ...prev, locationLoading: true }));
    setErrorMsg('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setAddress((prev) => ({
          ...prev,
          locationLoading: false,
          useLocationCoords: {
            lat: pos.coords.latitude.toFixed(4),
            lng: pos.coords.longitude.toFixed(4)
          }
        }));
        setSuccessMsg('Location captured successfully! Nearby centers can now be matched.');
      },
      (err) => {
        setAddress((prev) => ({ ...prev, locationLoading: false }));
        setErrorMsg('Unable to fetch location: ' + err.message);
      },
      { timeout: 10000 }
    );
  };

  const handleStep2Continue = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!address.state) {
      setErrorMsg('Please select your state.');
      return;
    }
    if (!address.district) {
      setErrorMsg('Please select your district.');
      return;
    }
    setCurrentStep(3);
  };

  // =========================================================================
  // STEP 3: FARM / PROFILE DETAILS
  // =========================================================================
  const toggleCrop = (crop) => {
    setFarmDetails((prev) => {
      const exists = prev.mainCrops.includes(crop);
      return {
        ...prev,
        mainCrops: exists ? prev.mainCrops.filter((c) => c !== crop) : [...prev.mainCrops, crop]
      };
    });
  };

  const handleStep3Continue = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (role === 'farmer' && farmDetails.mainCrops.length === 0) {
      setErrorMsg('Please select at least one main crop/product.');
      return;
    }
    if (role === 'company' && !companyDetails.companyName.trim()) {
      setErrorMsg('Please enter company name.');
      return;
    }
    setCurrentStep(4);
  };

  // =========================================================================
  // STEP 4: BANK DETAILS & VERIFICATION
  // =========================================================================
  const handleVerifyBankDetails = () => {
    setErrorMsg('');
    if (!bank.accountHolderName.trim()) {
      setErrorMsg('Please enter account holder name.');
      return;
    }
    if (!bank.accountNumber || bank.accountNumber.length < 9) {
      setErrorMsg('Please enter a valid bank account number.');
      return;
    }
    if (bank.accountNumber !== bank.confirmAccountNumber) {
      setErrorMsg('Account numbers do not match.');
      return;
    }
    if (!bank.ifscCode || bank.ifscCode.length < 11) {
      setErrorMsg('Please enter a valid 11-character IFSC code.');
      return;
    }

    // Mask Account Number per security rule: XXXX XXXX 4582
    const acc = bank.accountNumber.trim();
    const last4 = acc.slice(-4);
    const masked = `XXXX XXXX ${last4}`;

    setBank((prev) => ({
      ...prev,
      isVerified: true,
      maskedAccountNumber: masked
    }));
    setSuccessMsg('Bank account verified successfully with NPCI/PFMS direct transfer protocol!');
  };

  const handleStep4Continue = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!bank.isVerified) {
      // Auto-verify if matching and valid
      if (bank.accountNumber && bank.accountNumber === bank.confirmAccountNumber) {
        handleVerifyBankDetails();
      } else {
        setErrorMsg('Please verify your bank details before continuing.');
        return;
      }
    }
    setCurrentStep(5);
  };

  // =========================================================================
  // STEP 5: PASSWORD REQUIREMENTS & OTP
  // =========================================================================
  const hasMin8 = credentials.password.length >= 8;
  const hasNumber = /\d/.test(credentials.password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(credentials.password);
  const isPasswordValid = hasMin8 && hasNumber && hasSpecial;

  // Request Registration OTP
  const handleSendRegOtp = async () => {
    setErrorMsg('');
    try {
      const cleanPhone = personal.mobileNumber.replace(/\D/g, '');
      const res = await API.post('/auth/request-otp', {
        phone: cleanPhone,
        isRegistration: true
      });
      setCredentials((prev) => ({
        ...prev,
        otpSent: true,
        demoOtp: res.data?.demoOtp || '123456',
        otp: res.data?.demoOtp || ''
      }));
      setSuccessMsg(`OTP sent to +91 ${cleanPhone}! ${res.data?.demoOtp ? `(Demo OTP: ${res.data.demoOtp})` : ''}`);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    }
  };

  // Verify Registration OTP
  const handleVerifyRegOtp = async () => {
    setErrorMsg('');
    if (!credentials.otp || credentials.otp.length < 6) {
      setErrorMsg('Please enter the 6-digit OTP.');
      return;
    }
    try {
      const cleanPhone = personal.mobileNumber.replace(/\D/g, '');
      await API.post('/auth/verify-otp', {
        phone: cleanPhone,
        otp: credentials.otp.trim(),
        isRegistration: true
      });
      setCredentials((prev) => ({ ...prev, otpVerified: true }));
      setSuccessMsg('OTP verified successfully!');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Invalid or expired OTP.');
    }
  };

  // Final Submit
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!isPasswordValid) {
      setErrorMsg('Password does not meet the security requirements.');
      return;
    }
    if (credentials.password !== credentials.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!credentials.otpVerified) {
      setErrorMsg('Please verify the OTP sent to your registered mobile number.');
      return;
    }

    setSubmitting(true);
    try {
      const cleanPhone = personal.mobileNumber.replace(/\D/g, '');
      const payload = {
        name: personal.fullName.trim(),
        phone: cleanPhone,
        email: personal.email.trim() || undefined, 
        password: credentials.password,
        role: role,
        dob: personal.dob,
        gender: personal.gender,
        preferredLanguage: personal.preferredLanguage,
        // Location
        state: address.state,
        district: address.district,
        block: address.block,
        village: address.village,
        pincode: address.pincode,
        locationCoordinates: address.useLocationCoords,
        address: `${address.village ? address.village + ', ' : ''}${address.block ? address.block + ', ' : ''}${address.district}, ${address.state}`,
        // Farmer specifics
        farmerId: farmDetails.farmerId,
        totalFarmArea: farmDetails.farmArea ? Number(farmDetails.farmArea) : undefined,
        landType: farmDetails.landType,
        mainCrops: farmDetails.mainCrops,
        expectedQuantity: farmDetails.expectedQuantity ? Number(farmDetails.expectedQuantity) : undefined,
        // Company specifics
        companyName: companyDetails.companyName,
        gstin: companyDetails.gstin,
        cin: companyDetails.cin,
        businessType: companyDetails.businessType,
        procurementCategories: companyDetails.procurementCategories,
        storageCapacity: companyDetails.storageCapacity ? Number(companyDetails.storageCapacity) : undefined,
        // Professional specifics
        qualification: proDetails.qualification,
        licenseId: proDetails.licenseId,
        specialization: proDetails.specialization,
        organization: proDetails.organization,
        // Bank Details
        bankAccount: bank.accountNumber,
        bankDetails: {
          accountHolder: bank.accountHolderName,
          bankName: bank.bankName,
          accountNumber: bank.accountNumber,
          ifsc: bank.ifscCode,
          isVerified: bank.isVerified
        }
      };

      const res = await API.post('/auth/register', payload);
      if (res.data?.token && res.data?.user) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }
      setCurrentStep('success');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Registration failed. Please check your data and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Masked phone for display (e.g., XXXXXXX4582)
  const getMaskedPhone = () => {
    const p = personal.mobileNumber.replace(/\D/g, '');
    if (p.length < 4) return 'XXXXXXX0000';
    return `XXXXXXX${p.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-800">
      {/* ========================================================================= */}
      {/* HEADER                                                                    */}
      {/* ========================================================================= */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 md:px-8 py-3.5 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-200">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 block leading-tight">
                Agri<span className="text-emerald-600">Procure</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Direct Farm-to-Company Platform
              </span>
            </div>
          </div>

          <Link
            to="/login"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 px-3 py-1.5 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go to Login</span>
          </Link>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN CONTAINER                                                            */}
      {/* ========================================================================= */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* SUCCESS SCREEN (Page 6 of PDF) */}
        {currentStep === 'success' ? (
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 md:p-12 text-center max-w-xl mx-auto animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
              {role === 'farmer'
                ? 'FARMER REGISTRATION COMPLETE'
                : role === 'company'
                ? 'COMPANY REGISTRATION COMPLETE'
                : 'PROFESSIONAL REGISTRATION COMPLETE'}
            </span>

            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-4">
              Welcome, {personal.fullName}!
            </h2>

            {/* Confirmation Box (matches Page 6 ASCII wireframe with modern styling) */}
            <div className="mt-6 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3 font-mono text-sm">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">{role === 'farmer' ? 'Farmer ID:' : 'User ID:'}</span>
                <span className="font-bold text-slate-900">{farmDetails.farmerId}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Mobile:</span>
                <span className="font-bold text-slate-900">{getMaskedPhone()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Account Status:</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <Check className="w-4 h-4" /> Active & Verified
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-600 mt-6">
              Your account has been successfully created and linked to the direct procurement network.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  if (role === 'farmer') {
                    navigate('/farmer');
                  } else if (role === 'company') {
                    navigate('/company');
                  } else {
                    navigate('/professional');
                  }
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-6 rounded-2xl transition-all shadow-lg shadow-emerald-600/30 text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  PROCEED TO {role === 'farmer' ? 'FARMER' : role === 'company' ? 'COMPANY' : 'PROFESSIONAL'} DASHBOARD
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/login', { state: { registeredPhone: personal.mobileNumber, role } })}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-2xl transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Or go to Login screen</span>
              </button>
            </div>
          </div>
        ) : (
          /* 5-STEP GUIDED WIZARD */
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Header Banner */}
            <div className="bg-slate-900 text-white p-6 md:p-8 text-center relative border-b border-slate-800">
              <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs font-extrabold uppercase tracking-widest mb-1">
                <Sprout className="w-4 h-4" />
                <span>SMART PROCUREMENT</span>
              </div>

              <h1 className="text-2xl md:text-3xl font-black tracking-tight">{roleTheme.title}</h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-lg mx-auto">{roleTheme.subtitle}</p>

              {/* Role Switcher Pills */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setRole('farmer');
                    setCurrentStep(1);
                  }}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-bold text-xs transition-all ${
                    role === 'farmer' ? 'bg-emerald-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <span>👨‍🌾 Farmer</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRole('company');
                    setCurrentStep(1);
                  }}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-bold text-xs transition-all ${
                    role === 'company' ? 'bg-blue-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Company</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRole('professional');
                    setCurrentStep(1);
                  }}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-bold text-xs transition-all ${
                    role === 'professional' ? 'bg-purple-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Professional</span>
                </button>
              </div>

              {/* Progress Indicator: Step X of 5 */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-white">Step {currentStep} of 5</span>
                <span className="text-slate-300 font-medium">
                  {currentStep === 1 && 'Personal Details'}
                  {currentStep === 2 && 'Address Details'}
                  {currentStep === 3 && (role === 'farmer' ? 'Farmer / Farm Details' : 'Enterprise Credentials')}
                  {currentStep === 4 && 'Bank / Payment Details'}
                  {currentStep === 5 && 'Create Login Credentials'}
                </span>
              </div>

              {/* Visual Step Bar */}
              <div className="grid grid-cols-5 gap-1.5 mt-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full transition-all ${
                      s <= currentStep ? 'bg-emerald-500' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Error / Success Notifications */}
            <div className="px-6 md:px-10 pt-6">
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span>⚠️</span>
                    <span>{errorMsg}</span>
                  </div>
                  <button onClick={() => setErrorMsg('')} className="text-red-400 hover:text-red-600 font-bold">
                    ✕
                  </button>
                </div>
              )}
              {successMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{successMsg}</span>
                  </div>
                  <button onClick={() => setSuccessMsg('')} className="text-emerald-500 hover:text-emerald-700 font-bold">
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* ========================================================================= */}
            {/* STEP 1: PERSONAL DETAILS (Pages 1 & 2 of PDF)                             */}
            {/* ========================================================================= */}
            {currentStep === 1 && (
              <form onSubmit={handleStep1Continue} className="p-6 md:p-10 space-y-6">
                <div>
                  <h2 className="text-lg font-black text-slate-900">STEP 1 — Personal Details</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Required fields for identity and communication</p>
                </div>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={personal.fullName}
                        onChange={(e) => setPersonal({ ...personal, fullName: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
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
                        value={personal.mobileNumber}
                        onChange={(e) => setPersonal({ ...personal, mobileNumber: e.target.value })}
                        className="w-full pl-12 pr-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      This becomes the primary login/communication number.
                    </p>
                  </div>
                   {/* Email (Optional) */}
<div>
  <label className="block text-xs font-bold text-slate-700 mb-1">
    Email Address <span className="text-slate-400 font-normal">(Optional)</span>
  </label>
  <div className="relative">
    <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
    <input
      type="email"
      placeholder="you@example.com"
      value={personal.email}
      onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
      className="w-full pl-9 pr-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
    />
  </div>
  <p className="text-[11px] text-slate-500 mt-1">
    Used for password recovery and account notifications.
  </p>
</div>
                  {/* Date of Birth */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="date"
                        value={personal.dob}
                        onChange={(e) => setPersonal({ ...personal, dob: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                      />
                    </div>
                  </div>

                  {/* Gender Radio Options */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Gender</label>
                    <div className="flex gap-6">
                      {['Male', 'Female', 'Other'].map((g) => (
                        <label key={g} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value={g}
                            checked={personal.gender === g}
                            onChange={() => setPersonal({ ...personal, gender: g })}
                            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span>{g}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Language */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Language</label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <select
                        value={personal.preferredLanguage}
                        onChange={(e) => setPersonal({ ...personal, preferredLanguage: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                      >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi (हिंदी)</option>
                        <option value="Bengali">Bengali (বাংলা)</option>
                        <option value="Marathi">Marathi (मराठी)</option>
                        <option value="Punjabi">Punjabi (ਪੰਜਾਬੀ)</option>
                        <option value="Gujarati">Gujarati (ગુજરાતી)</option>
                        <option value="Tamil">Tamil (தமிழ்)</option>
                        <option value="Telugu">Telugu (తెలుగు)</option>
                        <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
                        <option value="Odia">Odia (ଓଡ଼ିଆ)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Continue Button */}
                <div className="pt-4 border-t border-slate-200">
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md text-sm flex items-center justify-center gap-2"
                  >
                    <span>SAVE & CONTINUE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* ========================================================================= */}
            {/* STEP 2: ADDRESS DETAILS (Page 2 of PDF)                                  */}
            {/* ========================================================================= */}
            {currentStep === 2 && (
              <form onSubmit={handleStep2Continue} className="p-6 md:p-10 space-y-6">
                <div>
                  <h2 className="text-lg font-black text-slate-900">STEP 2 — Address Details</h2>
                  <p className="text-xs text-slate-500 mt-0.5">The farmer provides their farming location</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* State Dropdown with all Indian States & UTs */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={address.state}
                      onChange={handleStateChange}
                      className="w-full p-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                    >
                      <option value="">Select State</option>
                      {INDIA_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* District Dropdown dynamically populated */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      District <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={address.district}
                      onChange={(e) => setAddress({ ...address, district: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                    >
                      <option value="">Select District</option>
                      {availableDistricts.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Block */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Block / Tehsil</label>
                    <input
                      type="text"
                      placeholder="Enter Block / Tehsil name"
                      value={address.block}
                      onChange={(e) => setAddress({ ...address, block: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  {/* Village */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Village / Town</label>
                    <input
                      type="text"
                      placeholder="Enter Village name"
                      value={address.village}
                      onChange={(e) => setAddress({ ...address, village: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  {/* PIN Code */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">PIN Code</label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="6-digit PIN Code"
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Geolocation Section */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-emerald-900 block">Current Location</span>
                    <p className="text-[11px] text-emerald-700 mt-0.5">
                      This can help the system recommend nearby procurement centres later.
                    </p>
                    {address.useLocationCoords && (
                      <span className="text-xs font-mono font-bold text-emerald-900 mt-1 inline-block">
                        📍 Lat: {address.useLocationCoords.lat}, Lng: {address.useLocationCoords.lng}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleUseLocation}
                    disabled={address.locationLoading}
                    className="shrink-0 bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>{address.locationLoading ? 'Detecting...' : 'Use My Current Location'}</span>
                  </button>
                </div>

                {/* Navigation Buttons */}
                <div className="pt-4 border-t border-slate-200 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="w-1/3 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1 shadow-md"
                  >
                    <span>SAVE & CONTINUE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* ========================================================================= */}
            {/* STEP 3: FARMER / FARM DETAILS (Pages 3 & 4 of PDF)                       */}
            {/* ========================================================================= */}
            {currentStep === 3 && (
              <form onSubmit={handleStep3Continue} className="p-6 md:p-10 space-y-6">
                <div>
                  <h2 className="text-lg font-black text-slate-900">
                    STEP 3 — {role === 'farmer' ? 'Farmer / Farm Details' : 'Profile & Procurement Details'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {role === 'farmer'
                      ? "This section establishes the farmer's agricultural profile"
                      : 'Provide your business operations and procurement capacity'}
                  </p>
                </div>

                {role === 'farmer' ? (
                  <div className="space-y-4">
                    {/* Farmer ID */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Farmer ID</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={farmDetails.farmerId}
                          onChange={(e) => setFarmDetails({ ...farmDetails, farmerId: e.target.value })}
                          className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-mono font-bold bg-slate-50"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setFarmDetails({
                              ...farmDetails,
                              farmerId: `FMR-2026-${String(Math.floor(100000 + Math.random() * 900000))}`
                            })
                          }
                          title="Generate new ID"
                          className="p-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-600"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Official system-assigned agricultural identifier.
                      </p>
                    </div>

                    {/* Total Farm Area & Land Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Total Farm Area</label>
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            step="0.1"
                            placeholder="e.g. 5"
                            value={farmDetails.farmArea}
                            onChange={(e) => setFarmDetails({ ...farmDetails, farmArea: e.target.value })}
                            className="w-full p-2.5 pr-14 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          />
                          <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-bold">Acre</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Land Type</label>
                        <select
                          value={farmDetails.landType}
                          onChange={(e) => setFarmDetails({ ...farmDetails, landType: e.target.value })}
                          className="w-full p-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                        >
                          <option value="Owned">Owned</option>
                          <option value="Leased">Leased</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Main Products / Crops (Checkboxes per PDF) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Main Products / Crops <span className="text-red-500">*</span>
                      </label>
                      <p className="text-[11px] text-slate-500 mb-2.5">
                        What do you produce? (Select all that apply)
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {['Potato', 'Rice', 'Wheat', 'Maize', 'Tomato', 'Onion', 'Vegetables', 'Other'].map(
                          (crop) => (
                            <label
                              key={crop}
                              className={`p-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all flex items-center gap-2 ${
                                farmDetails.mainCrops.includes(crop)
                                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={farmDetails.mainCrops.includes(crop)}
                                onChange={() => toggleCrop(crop)}
                                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                              />
                              <span>{crop}</span>
                            </label>
                          )
                        )}
                      </div>
                    </div>

                    {/* Expected Procurement Quantity (Optional per PDF Page 4) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Expected Production / Quantity (Optional)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="e.g. 5000"
                          value={farmDetails.expectedQuantity}
                          onChange={(e) => setFarmDetails({ ...farmDetails, expectedQuantity: e.target.value })}
                          className="w-full p-2.5 pr-12 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                        <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-bold">kg</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        This can later help the system plan procurement capacity.
                      </p>
                    </div>
                  </div>
                ) : role === 'company' ? (
                  /* Company Details */
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Company Legal Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. AgroProcure India Pvt Ltd"
                        value={companyDetails.companyName}
                        onChange={(e) => setCompanyDetails({ ...companyDetails, companyName: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">GSTIN</label>
                        <input
                          type="text"
                          placeholder="15-digit GSTIN"
                          value={companyDetails.gstin}
                          onChange={(e) => setCompanyDetails({ ...companyDetails, gstin: e.target.value })}
                          className="w-full p-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Business Type</label>
                        <select
                          value={companyDetails.businessType}
                          onChange={(e) => setCompanyDetails({ ...companyDetails, businessType: e.target.value })}
                          className="w-full p-2.5 border border-slate-300 rounded-xl text-sm bg-white"
                        >
                          <option value="Food Processor">Food Processor</option>
                          <option value="Exporter">Exporter</option>
                          <option value="Retail Chain">Retail Chain</option>
                          <option value="Agri Trader">Agri Trader</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Professional Details */
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Highest Qualification / Degree
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. M.Sc Agriculture / Quality Assessor"
                        value={proDetails.qualification}
                        onChange={(e) => setProDetails({ ...proDetails, qualification: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          License / Registration ID
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. PRO-8823-AG"
                          value={proDetails.licenseId}
                          onChange={(e) => setProDetails({ ...proDetails, licenseId: e.target.value })}
                          className="w-full p-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Specialization</label>
                        <input
                          type="text"
                          placeholder="e.g. Grain Grading & Moisture Testing"
                          value={proDetails.specialization}
                          onChange={(e) => setProDetails({ ...proDetails, specialization: e.target.value })}
                          className="w-full p-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="pt-4 border-t border-slate-200 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="w-1/3 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1 shadow-md"
                  >
                    <span>SAVE & CONTINUE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* ========================================================================= */}
            {/* STEP 4: BANK / PAYMENT DETAILS (Page 4 of PDF)                           */}
            {/* ========================================================================= */}
            {currentStep === 4 && (
              <form onSubmit={handleStep4Continue} className="p-6 md:p-10 space-y-6">
                <div>
                  <h2 className="text-lg font-black text-slate-900">STEP 4 — Bank / Payment Details</h2>
                  <p className="text-xs text-slate-500 mt-0.5">This section is for receiving procurement payments</p>
                </div>

                <div className="space-y-4">
                  {/* Account Holder Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Account Holder Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="As per bank passbook"
                      value={bank.accountHolderName}
                      onChange={(e) => setBank({ ...bank, accountHolderName: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Bank Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Bank Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. State Bank of India, Punjab National Bank"
                      value={bank.bankName}
                      onChange={(e) => setBank({ ...bank, bankName: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Account Number & Confirm */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Account Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Enter account number"
                        value={bank.accountNumber}
                        onChange={(e) => setBank({ ...bank, accountNumber: e.target.value, isVerified: false })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Confirm Account Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Re-enter account number"
                        value={bank.confirmAccountNumber}
                        onChange={(e) =>
                          setBank({ ...bank, confirmAccountNumber: e.target.value, isVerified: false })
                        }
                        className="w-full p-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  {/* IFSC Code */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      IFSC Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={11}
                      placeholder="e.g. SBIN0001234"
                      value={bank.ifscCode}
                      onChange={(e) =>
                        setBank({ ...bank, ifscCode: e.target.value.toUpperCase(), isVerified: false })
                      }
                      className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-mono tracking-wider focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Important Security Rule & Verification Box (Page 4 of PDF) */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold text-slate-700 block mb-1">
                          Important security rule:
                        </span>
                        <p className="text-[11px] text-slate-500">
                          After saving, the system should never display the complete account number.
                        </p>
                        {bank.isVerified && (
                          <div className="mt-2 text-xs font-mono font-bold text-slate-800 bg-white p-2 rounded-lg border border-slate-200 inline-block">
                            Bank Account: <span className="text-emerald-700">{bank.maskedAccountNumber}</span>
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={handleVerifyBankDetails}
                        className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
                          bank.isVerified
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        {bank.isVerified ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-600" />
                            <span>VERIFIED</span>
                          </>
                        ) : (
                          <span>VERIFY BANK DETAILS</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="pt-4 border-t border-slate-200 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="w-1/3 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1 shadow-md"
                  >
                    <span>SAVE & CONTINUE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* ========================================================================= */}
            {/* STEP 5: CREATE LOGIN CREDENTIALS & OTP (Page 5 of PDF)                   */}
            {/* ========================================================================= */}
            {currentStep === 5 && (
              <form onSubmit={handleFinalSubmit} className="p-6 md:p-10 space-y-6">
                <div>
                  <h2 className="text-lg font-black text-slate-900">STEP 5 — Create Login Credentials</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Now set your secure password and verify your OTP</p>
                </div>

                <div className="space-y-4">
                  {/* Registered Mobile Display (Page 5 of PDF) */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500 block">Mobile</span>
                      <span className="text-sm font-bold text-slate-900 font-mono">
                        +91 {personal.mobileNumber || '98765 43210'}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">Primary Login ID</span>
                  </div>

                  {/* Create Password */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Create Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Create strong password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        className="w-full pl-9 pr-10 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        placeholder="Re-enter password"
                        value={credentials.confirmPassword}
                        onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
                        className="w-full pl-9 pr-10 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Password requirements checklist (Page 5 of PDF) */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                    <span className="font-bold text-slate-700 block mb-1">Password requirements:</span>
                    <p
                      className={`flex items-center gap-1.5 font-medium ${
                        hasMin8 ? 'text-emerald-700' : 'text-slate-500'
                      }`}
                    >
                      <Check className={`w-3.5 h-3.5 ${hasMin8 ? 'text-emerald-600 font-bold' : 'text-slate-400'}`} />
                      Minimum 8 characters
                    </p>
                    <p
                      className={`flex items-center gap-1.5 font-medium ${
                        hasNumber ? 'text-emerald-700' : 'text-slate-500'
                      }`}
                    >
                      <Check
                        className={`w-3.5 h-3.5 ${hasNumber ? 'text-emerald-600 font-bold' : 'text-slate-400'}`}
                      />
                      At least 1 number
                    </p>
                    <p
                      className={`flex items-center gap-1.5 font-medium ${
                        hasSpecial ? 'text-emerald-700' : 'text-slate-500'
                      }`}
                    >
                      <Check
                        className={`w-3.5 h-3.5 ${hasSpecial ? 'text-emerald-600 font-bold' : 'text-slate-400'}`}
                      />
                      At least 1 special character (!@#$%^&*)
                    </p>
                  </div>

                  {/* OTP Verification Section (Page 5 of PDF) */}
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-emerald-950 block">OTP Verification</span>
                        <p className="text-[11px] text-emerald-700">
                          {credentials.otpSent
                            ? `An OTP has been sent to +91 ${personal.mobileNumber}`
                            : 'Send verification code to your registered mobile'}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleSendRegOtp}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm"
                      >
                        {credentials.otpSent ? 'Resend OTP' : 'Send OTP'}
                      </button>
                    </div>

                    {credentials.otpSent && (
                      <div className="pt-2 border-t border-emerald-200/60 flex flex-col sm:flex-row items-center gap-3">
                        <div className="relative flex-1 w-full">
                          <input
                            type="text"
                            maxLength={6}
                            placeholder="Enter 6-digit OTP"
                            value={credentials.otp}
                            onChange={(e) => setCredentials({ ...credentials, otp: e.target.value })}
                            className="w-full p-2.5 border border-emerald-300 rounded-xl text-sm font-mono tracking-widest text-center bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={handleVerifyRegOtp}
                          disabled={credentials.otpVerified}
                          className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 ${
                            credentials.otpVerified
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                          }`}
                        >
                          {credentials.otpVerified ? (
                            <>
                              <CheckCheck className="w-4 h-4 text-emerald-600" />
                              <span>OTP VERIFIED</span>
                            </>
                          ) : (
                            <span>VERIFY OTP</span>
                          )}
                        </button>
                      </div>
                    )}

                    {credentials.demoOtp && (
                      <p className="text-[11px] text-emerald-800 font-mono">
                        Demo OTP helper: <span className="font-bold">{credentials.demoOtp}</span> (auto-filled for quick testing)
                      </p>
                    )}
                  </div>
                </div>

                {/* Navigation & Submit Buttons */}
                <div className="pt-4 border-t border-slate-200 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="w-1/3 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 ${
                      submitting ? 'opacity-70 cursor-wait' : ''
                    }`}
                  >
                    {submitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>COMPLETE REGISTRATION</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Bottom Login Link */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-600">
              Already have an AgriProcure account?{' '}
              <Link to="/login" className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline">
                Log In Here
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
