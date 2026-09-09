import React, { useState, useEffect, useContext } from 'react';
import {
  Sprout,
  Bell,
  User,
  MapPin,
  Calendar,
  Clock,
  TrendingUp,
  CloudRain,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  CreditCard,
  Scale,
  Sparkles,
  Layers,
  AlertTriangle,
  Play,
  Home,
  MessageSquare,
  Camera,
  Globe,
  CheckCircle2,
  X
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import API from '../services/api';

// Farmer UX Blueprint Modals
import BrandIntroModal from '../components/farmer/BrandIntroModal';
import FarmManagementModal from '../components/farmer/FarmManagementModal';
import SlotBookingWizardModal from '../components/farmer/SlotBookingWizardModal';
import LiveQueueModal from '../components/farmer/LiveQueueModal';
import AiQualityModal from '../components/farmer/AiQualityModal';
import WeatherAdvisoryModal from '../components/farmer/WeatherAdvisoryModal';
import ComplaintsFeedbackModal from '../components/farmer/ComplaintsFeedbackModal';
import ProfileModal from '../components/farmer/ProfileModal';
import MarketTrendsModal from '../components/farmer/MarketTrendsModal';
import CentresMapModal from '../components/farmer/CentresMapModal';
import PaymentsModal from '../components/farmer/PaymentsModal';

export default function FarmerDashboard() {
  const { user } = useContext(AuthContext);
  const { language, setLanguage, t } = useContext(LanguageContext);

  // Active Bottom Navigation Tab: 'home' | 'farm' | 'book' | 'queue' | 'money'
  const [activeNav, setActiveNav] = useState('home');

  // Modal display states
  const [showBrandIntro, setShowBrandIntro] = useState(false);
  const [showFarmModal, setShowFarmModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showQueueModal, setShowQueueModal] = useState(false);
  const [showQualityModal, setShowQualityModal] = useState(false);
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [showComplaintsModal, setShowComplaintsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMarketModal, setShowMarketModal] = useState(false);
  const [showCentresModal, setShowCentresModal] = useState(false);
  const [showPaymentsModal, setShowPaymentsModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Pre-selected parameters for booking wizard
  const [bookingPrefill, setBookingPrefill] = useState({
    cropType: 'Potato',
    quantity: 2000
  });

  // Farm Fields state (Initial matching Section 2 & 3 of PDF: 3.5 Acre, 4 Crops)
  const [fields, setFields] = useState([
    {
      id: 1,
      fieldName: 'North Plot (Potato)',
      cropType: 'Potato',
      area: 1.2,
      expectedYield: 2000,
      plantingDate: '12 August',
      expectedHarvest: '20 September',
      status: 'Growing'
    },
    {
      id: 2,
      fieldName: 'East Wetland (Rice)',
      cropType: 'Rice',
      area: 1.0,
      expectedYield: 1500,
      plantingDate: '01 July',
      expectedHarvest: '15 October',
      status: 'Growing'
    },
    {
      id: 3,
      fieldName: 'South Beds (Tomato)',
      cropType: 'Tomato',
      area: 0.8,
      expectedYield: 1000,
      plantingDate: '18 August',
      expectedHarvest: '30 September',
      status: 'Growing'
    },
    {
      id: 4,
      fieldName: 'Hill Terrace (Onion)',
      cropType: 'Onion',
      area: 0.5,
      expectedYield: 800,
      plantingDate: '10 August',
      expectedHarvest: '05 October',
      status: 'Growing'
    }
  ]);

  // Notifications list
  const [notificationsList, setNotificationsList] = useState([
    {
      id: 1,
      title: 'Queue Progress',
      message: 'Token A-118 is currently serving at Siliguri Centre.',
      time: '5m ago',
      unread: true
    },
    {
      id: 2,
      title: 'Weather Warning',
      message: 'Heavy rain expected tomorrow. Secure harvested potatoes.',
      time: '1h ago',
      unread: true
    },
    {
      id: 3,
      title: 'Mandi Rate Update',
      message: 'Potato rate holding steady at ₹12/kg.',
      time: '3h ago',
      unread: false
    }
  ]);

  // Hydrate with registered profile if available
  useEffect(() => {
    API.get('/farmer/profile')
      .then((res) => {
        if (res.data?.farmerProfile) {
          const fp = res.data.farmerProfile;
          if (fp.savedCrops && fp.savedCrops.length > 0) {
            const mapped = fp.savedCrops.map((c, i) => ({
              id: c._id || i + 1,
              fieldName: c.variety ? `${c.cropType} (${c.variety})` : `${c.cropType} Plot`,
              cropType: c.cropType,
              area: fp.totalFarmArea ? Number((fp.totalFarmArea / fp.savedCrops.length).toFixed(1)) : 1.0,
              expectedYield: c.expectedQuantity || 1500,
              plantingDate: '12 August',
              expectedHarvest: '20 September',
              status: 'Growing'
            }));
            setFields(mapped);
          } else if (fp.mainCrops && fp.mainCrops.length > 0) {
            const cropArea = fp.totalFarmArea ? (fp.totalFarmArea / fp.mainCrops.length).toFixed(1) : 1.0;
            const mapped = fp.mainCrops.map((c, i) => ({
              id: i + 1,
              fieldName: `${c} Plot`,
              cropType: c,
              area: Number(cropArea) || 1.0,
              expectedYield: fp.expectedQuantity ? Math.round(fp.expectedQuantity / fp.mainCrops.length) : 1500,
              plantingDate: '12 August',
              expectedHarvest: '20 September',
              status: 'Growing'
            }));
            setFields(mapped);
          }
        }
      })
      .catch(() => {
        // Fallback to blueprint defaults
      });
  }, []);

  // Calculate totals
  const totalArea = fields.reduce((acc, f) => acc + (parseFloat(f.area) || 0), 0).toFixed(1);
  const totalCropsCount = fields.length;

  // Derive dynamic farmer display data
  const farmerName = user?.name ? user.name.split(' ')[0] : 'Ramesh';
  const farmerFullName = user?.name || 'Ramesh Das';
  const farmerId = user?.farmerProfile?.farmerId || user?.farmerId || 'FMR-001245';

  // Handle adding new field
  const handleAddField = (newField) => {
    setFields((prev) => [newField, ...prev]);
  };

  // Pre-fill crop booking
  const handleSelectCropForBooking = ({ cropType, quantity }) => {
    setBookingPrefill({ cropType, quantity });
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950 pb-24 sm:pb-20">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER BAR (Page 2 Wireframe: FARM PLATFORM 🔔 👤)                   */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-emerald-500/20 px-4 py-3 sm:px-6 shadow-xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-2.5">
            <span className="text-2xl p-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40">
              🌾
            </span>
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-wider uppercase text-white flex items-center gap-1.5">
                {t('appName')}
              </h1>
              <span className="text-[10px] font-mono text-emerald-400 tracking-widest block uppercase">
                UX Architecture Blueprint
              </span>
            </div>
          </div>

          {/* Right Controls: Multilingual Toggle, 2s Story Replay, Bell, Avatar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Multilingual Toggle Pill */}
            <div className="hidden sm:flex items-center bg-slate-800/80 p-0.5 rounded-xl border border-slate-700 text-xs">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  language === 'en' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  language === 'bn' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                বাং
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  language === 'hi' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                हि
              </button>
            </div>

            {/* 2s Brand Story Replay Button */}
            <button
              onClick={() => setShowBrandIntro(true)}
              title="Replay 2-Second Brand Animation"
              className="p-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-sm"
            >
              <Play className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{t('brandStory')}</span>
            </button>

            {/* Notification Bell with Badge & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-all cursor-pointer relative"
              >
                <Bell className="w-4 h-4" />
                {notificationsList.some((n) => n.unread) && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
                )}
                {notificationsList.some((n) => n.unread) && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-amber-400 rounded-full" />
                )}
              </button>

              {/* Notification Drawer */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-emerald-500/30 rounded-2xl p-4 shadow-2xl z-50 animate-fade-in space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Notifications
                    </span>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {notificationsList.map((n) => (
                      <div
                        key={n.id}
                        className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs space-y-0.5"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-emerald-400">{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                        </div>
                        <p className="text-slate-300 text-[11px]">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar Button */}
            <button
              onClick={() => setShowProfileModal(true)}
              className="p-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-400/50 text-emerald-300 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{farmerName}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN HUB CONTENT CONTAINER (Page 2 ASCII Layout)                        */}
      {/* ========================================================================= */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 sm:pt-7 space-y-5">
        {/* Farmer Welcome & ID Banner */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950/70 to-slate-900 border border-emerald-500/30 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>{t('goodMorning')}, {farmerName}</span>
              <span className="animate-wiggle">👋</span>
            </h2>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1 text-xs">
              <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                {t('farmerId')}: {farmerId}
              </span>
              <span className="text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Siliguri, Darjeeling</span>
              </span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Direct Producer
              </span>
            </div>
          </div>

          {/* Quick Language Toggle on Mobile */}
          <div className="sm:hidden flex items-center gap-1 text-xs">
            <span className="text-slate-400 text-[11px] mr-1">Lang:</span>
            {['en', 'bn', 'hi'].map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`px-2 py-1 rounded-lg font-bold text-[11px] ${
                  language === l ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* WIDGET 1: MY FARM (Page 2 ASCII Wireframe)                                */}
        {/* ========================================================================= */}
        <div
          onClick={() => setShowFarmModal(true)}
          className="group p-5 sm:p-6 rounded-3xl bg-slate-900/90 hover:bg-slate-850 border border-emerald-500/30 hover:border-emerald-400/70 shadow-lg transition-all cursor-pointer relative overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌱</span>
              <h3 className="text-base font-extrabold text-white uppercase tracking-wider">
                {t('myFarm')}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
              <span>Manage Fields</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Metrics summary row from PDF: 3.5 Acre | 4 Crops */}
          <div className="pt-4 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                {totalArea}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider">
                {t('acre')}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                {totalCropsCount}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider">
                {t('crops')}
              </span>
            </div>
          </div>

          {/* Quick crops summary list from PDF wireframe: Potato 2,000 KG | Rice 1,500 KG */}
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {fields.slice(0, 2).map((cropItem) => (
              <div
                key={cropItem.id}
                className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span>{cropItem.cropType === 'Potato' ? '🥔' : '🌾'}</span>
                  <span className="font-extrabold text-white">{cropItem.cropType}</span>
                </div>
                <span className="font-bold text-emerald-400 font-mono">
                  {Number(cropItem.expectedYield).toLocaleString()} KG
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* WIDGET 2 & 3: TODAY'S MARKET & WEATHER (Page 2 ASCII Wireframe)           */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* TODAY'S MARKET */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-lg space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📈</span>
                  <h3 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wider">
                    {t('todaysMarket')}
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">
                  APMC Siliguri
                </span>
              </div>

              {/* Wireframe price row: Potato: ₹12/kg | Rice: ₹28/kg */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                  <span className="text-xs text-slate-400 block font-medium">🥔 Potato</span>
                  <span className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5 block">
                    ₹12<span className="text-xs font-normal text-slate-400">/kg</span>
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                  <span className="text-xs text-slate-400 block font-medium">🌾 Rice (Paddy)</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-0.5 block">
                    ₹28<span className="text-xs font-normal text-slate-400">/kg</span>
                  </span>
                </div>
              </div>
            </div>

            {/* [ VIEW ALL ] Button (Page 2 of PDF) */}
            <button
              type="button"
              onClick={() => setShowMarketModal(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-emerald-400 hover:text-emerald-300 font-extrabold text-xs tracking-wider border border-slate-700 hover:border-emerald-500/40 transition-all cursor-pointer uppercase flex items-center justify-center gap-1.5"
            >
              <span>[ {t('viewAll')} ]</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* WEATHER WIDGET */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-lg space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🌦</span>
                  <h3 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wider">
                    {t('weather')}
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">
                  Live Station
                </span>
              </div>

              {/* Wireframe condition: 24°C • Partly Cloudy */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                      24°C
                    </span>
                    <span className="text-xs font-semibold text-emerald-300">
                      • Partly Cloudy
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Humidity 68% • Rain 5mm
                  </span>
                </div>
                <span className="text-4xl">⛅</span>
              </div>

              {/* Preview of tomorrow advisory */}
              <div className="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 flex items-center gap-2 font-medium">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-400" />
                <span>Tomorrow: 22°C 🌧 Heavy Rain Expected</span>
              </div>
            </div>

            {/* [ VIEW DETAILS ] Button (Page 2 of PDF) */}
            <button
              type="button"
              onClick={() => setShowWeatherModal(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-emerald-400 hover:text-emerald-300 font-extrabold text-xs tracking-wider border border-slate-700 hover:border-emerald-500/40 transition-all cursor-pointer uppercase flex items-center justify-center gap-1.5"
            >
              <span>[ {t('viewDetails')} ]</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* WIDGET 4: QUICK ACTIONS (Page 2 ASCII Wireframe)                          */}
        {/* [ Find Centre ] [ Book Slot ] [ Live Queue ] [ Payments ]                 */}
        {/* ========================================================================= */}
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-lg space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <span className="text-xl">⚡</span>
            <h3 className="text-base font-extrabold text-white uppercase tracking-wider">
              {t('quickActions')}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* 1. Find Centre */}
            <button
              type="button"
              onClick={() => setShowCentresModal(true)}
              className="p-4 rounded-2xl bg-gradient-to-b from-slate-850 to-slate-900 hover:from-slate-800 hover:to-slate-850 border border-slate-700 hover:border-emerald-500/50 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 active:scale-95 group shadow-sm"
            >
              <span className="text-3xl p-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                📍
              </span>
              <span className="font-extrabold text-xs sm:text-sm text-white">
                [ {t('findCentre')} ]
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Nearby Mandis
              </span>
            </button>

            {/* 2. Book Slot */}
            <button
              type="button"
              onClick={() => {
                setBookingPrefill({ cropType: 'Potato', quantity: 2000 });
                setShowBookingModal(true);
              }}
              className="p-4 rounded-2xl bg-gradient-to-b from-emerald-950/80 to-slate-900 hover:from-emerald-900/80 hover:to-slate-850 border border-emerald-500/50 hover:border-emerald-400 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 active:scale-95 group shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/30"
            >
              <span className="text-3xl p-2 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 group-hover:scale-110 transition-transform">
                📅
              </span>
              <span className="font-extrabold text-xs sm:text-sm text-emerald-300">
                [ {t('bookSlot')} ]
              </span>
              <span className="text-[10px] text-emerald-400/80 font-medium">
                5-Step Workflow
              </span>
            </button>

            {/* 3. Live Queue */}
            <button
              type="button"
              onClick={() => setShowQueueModal(true)}
              className="p-4 rounded-2xl bg-gradient-to-b from-slate-850 to-slate-900 hover:from-slate-800 hover:to-slate-850 border border-slate-700 hover:border-emerald-500/50 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 active:scale-95 group shadow-sm"
            >
              <span className="text-3xl p-2 rounded-2xl bg-amber-500/10 border border-amber-500/20 group-hover:scale-110 transition-transform">
                🚜
              </span>
              <span className="font-extrabold text-xs sm:text-sm text-white">
                [ {t('liveQueue')} ]
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Token A-124
              </span>
            </button>

            {/* 4. Payments */}
            <button
              type="button"
              onClick={() => setShowPaymentsModal(true)}
              className="p-4 rounded-2xl bg-gradient-to-b from-slate-850 to-slate-900 hover:from-slate-800 hover:to-slate-850 border border-slate-700 hover:border-emerald-500/50 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 active:scale-95 group shadow-sm"
            >
              <span className="text-3xl p-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                💰
              </span>
              <span className="font-extrabold text-xs sm:text-sm text-white">
                [ {t('payments')} ]
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Direct Bank DBT
              </span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* UTILITIES & AUXILIARY SERVICES BAR (Page 4 of PDF)                        */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Utilities & Farmer Services
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              AI & Grievance Support
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* AI Crop Quality Check Banner */}
            <div
              onClick={() => setShowQualityModal(true)}
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 rounded-xl bg-purple-500/10 border border-purple-500/30">
                  🤖
                </span>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {t('aiQualityCheck')}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Pre-grading scanner • Grade A estimate
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>

            {/* Complaints & Feedback System */}
            <div
              onClick={() => setShowComplaintsModal(true)}
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 rounded-xl bg-red-500/10 border border-red-500/30">
                  🚨
                </span>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {t('complaintsFeedback')}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Payment/Centre issues • 5-Star rating
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 3. STICKY BOTTOM TOUCH NAVIGATION (Page 2 Wireframe: Home|Farm|Book|Money) */}
      {/* ========================================================================= */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-emerald-500/20 py-2 px-3 shadow-2xl">
        <div className="max-w-md mx-auto grid grid-cols-5 gap-1 text-center">
          {/* 1. Home */}
          <button
            onClick={() => {
              setActiveNav('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`py-1.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              activeNav === 'home'
                ? 'text-emerald-400 font-extrabold bg-emerald-500/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-[10px] sm:text-xs">{t('home')}</span>
          </button>

          {/* 2. Farm */}
          <button
            onClick={() => {
              setActiveNav('farm');
              setShowFarmModal(true);
            }}
            className={`py-1.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              activeNav === 'farm'
                ? 'text-emerald-400 font-extrabold bg-emerald-500/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span className="text-[10px] sm:text-xs">{t('farm')}</span>
          </button>

          {/* 3. Book */}
          <button
            onClick={() => {
              setActiveNav('book');
              setShowBookingModal(true);
            }}
            className={`py-1.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              activeNav === 'book'
                ? 'text-emerald-400 font-extrabold bg-emerald-500/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span className="text-[10px] sm:text-xs">{t('book')}</span>
          </button>

          {/* 4. Queue */}
          <button
            onClick={() => {
              setActiveNav('queue');
              setShowQueueModal(true);
            }}
            className={`py-1.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              activeNav === 'queue'
                ? 'text-emerald-400 font-extrabold bg-emerald-500/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span className="text-[10px] sm:text-xs">{t('queue')}</span>
          </button>

          {/* 5. Money */}
          <button
            onClick={() => {
              setActiveNav('money');
              setShowPaymentsModal(true);
            }}
            className={`py-1.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              activeNav === 'money'
                ? 'text-emerald-400 font-extrabold bg-emerald-500/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span className="text-[10px] sm:text-xs">{t('money')}</span>
          </button>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 4. MODALS & SUB-SCREENS (Connecting the entire UX Blueprint)              */}
      {/* ========================================================================= */}

      {/* Section 0: Brand Intro Modal */}
      <BrandIntroModal
        isOpen={showBrandIntro}
        onClose={() => setShowBrandIntro(false)}
      />

      {/* Section 3: Farm Management Modal */}
      <FarmManagementModal
        isOpen={showFarmModal}
        onClose={() => {
          setShowFarmModal(false);
          setActiveNav('home');
        }}
        fields={fields}
        onAddField={handleAddField}
        onSelectCropForBooking={handleSelectCropForBooking}
      />

      {/* Section 4: 5-Step Slot Booking Wizard Modal */}
      <SlotBookingWizardModal
        isOpen={showBookingModal}
        onClose={() => {
          setShowBookingModal(false);
          setActiveNav('home');
        }}
        initialCrop={bookingPrefill.cropType}
        initialQuantity={bookingPrefill.quantity}
        onBookingComplete={(booking) => {
          // Add notification
          setNotificationsList((prev) => [
            {
              id: Date.now(),
              title: 'Slot Booked',
              message: `Token #${booking.tokenNumber} reserved at ${booking.centre}.`,
              time: 'Just now',
              unread: true
            },
            ...prev
          ]);
        }}
        onViewLiveQueue={() => {
          setShowBookingModal(false);
          setShowQueueModal(true);
          setActiveNav('queue');
        }}
      />

      {/* Section 5 & Page 4: Live Queue Modal */}
      <LiveQueueModal
        isOpen={showQueueModal}
        onClose={() => {
          setShowQueueModal(false);
          setActiveNav('home');
        }}
      />

      {/* Section 6: AI Crop Quality Check Modal */}
      <AiQualityModal
        isOpen={showQualityModal}
        onClose={() => setShowQualityModal(false)}
      />

      {/* Section 6 & 2: Weather Advisory Modal */}
      <WeatherAdvisoryModal
        isOpen={showWeatherModal}
        onClose={() => setShowWeatherModal(false)}
      />

      {/* Section 6: Complaints & Feedback Modal */}
      <ComplaintsFeedbackModal
        isOpen={showComplaintsModal}
        onClose={() => setShowComplaintsModal(false)}
      />

      {/* Section 6: Profile & Settings Modal */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        farmerData={{
          name: farmerFullName,
          farmerId: farmerId,
          district: user?.farmerProfile?.district || 'Darjeeling',
          state: user?.farmerProfile?.state || 'West Bengal',
          phone: user?.phone || '9876543210'
        }}
      />

      {/* Section 2: Real-time Market Trends Modal */}
      <MarketTrendsModal
        isOpen={showMarketModal}
        onClose={() => setShowMarketModal(false)}
      />

      {/* Section 2: Nearby Centres Map Modal */}
      <CentresMapModal
        isOpen={showCentresModal}
        onClose={() => setShowCentresModal(false)}
        onSelectCentreForBooking={(centre) => {
          setShowCentresModal(false);
          setShowBookingModal(true);
          setActiveNav('book');
        }}
      />

      {/* Section 2 & Page 4: Payments & Disbursements Modal */}
      <PaymentsModal
        isOpen={showPaymentsModal}
        onClose={() => {
          setShowPaymentsModal(false);
          setActiveNav('home');
        }}
      />
    </div>
  );
}