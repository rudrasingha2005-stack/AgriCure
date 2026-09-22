import React, { useState, useEffect, useContext } from 'react';
import { X, Play, Sparkles, Sprout, Wheat, DollarSign, UserCheck } from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';

export default function BrandIntroModal({ isOpen, onClose }) {
  const { t } = useContext(LanguageContext);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setSeconds(0);
      return;
    }
    const timer = setInterval(() => {
      setSeconds((prev) => (prev < 4 ? prev + 0.5 : prev));
    }, 500);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-2xl border border-white/80 rounded-3xl p-6 sm:p-8 text-slate-800 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cinematic Header Label */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-[11px] font-extrabold tracking-widest uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full">
            PDF Section 0: The Unique 2-Second Brand Moment
          </span>
        </div>

        {/* Screen 0A — Brand Message Animation */}
        <div className="min-h-[220px] flex flex-col items-center justify-center text-center space-y-4">
          {/* Logo appears at 0.0s */}
          <div
            className={`transition-all duration-700 transform ${
              seconds >= 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-3xl shadow-lg shadow-emerald-600/30 mx-auto">
              🌾
            </div>
          </div>

          {/* 0.5 sec: "আপনার ফসল," (Your Crop,) */}
          <div
            className={`transition-all duration-500 ${
              seconds >= 0.5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-800 font-serif">
              "আপনার ফসল," <span className="text-sm font-sans font-normal text-slate-500 block sm:inline">(Your Crop,)</span>
            </h2>
          </div>

          {/* 1.0 sec: "আপনার সিদ্ধান্ত।" (Your Decision.) */}
          <div
            className={`transition-all duration-500 ${
              seconds >= 1.0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-amber-700 font-serif">
              "আপনার সিদ্ধান্ত।" <span className="text-sm font-sans font-normal text-slate-500 block sm:inline">(Your Decision.)</span>
            </h3>
          </div>

          {/* 1.5 sec: FARM PLATFORM */}
          <div
            className={`transition-all duration-500 ${
              seconds >= 1.5 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <div className="text-lg sm:text-xl font-extrabold tracking-widest text-white uppercase bg-emerald-700 px-4 py-1.5 rounded-xl border border-emerald-600 inline-block shadow-md">
              FARM PLATFORM
            </div>
          </div>
        </div>

        {/* Visual Crop Journey Transition (Page 1) */}
        <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 text-center">
            {t('cropJourney')}
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-xl">
              <span className="text-lg block mb-1">🌱 ➔ 🌾</span>
              <span className="font-semibold text-slate-700">{t('cropGrows')}</span>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-xl">
              <span className="text-lg block mb-1">🌾 ➔ 💰</span>
              <span className="font-semibold text-slate-700">{t('cropSells')}</span>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-xl">
              <span className="text-lg block mb-1">💰 ➔ 👨‍🌾</span>
              <span className="font-semibold text-slate-700">{t('earningsReach')}</span>
            </div>
          </div>

          {/* Brand Signature Quote */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center">
            <p className="text-emerald-900 font-bold text-sm sm:text-base font-serif italic">
              {t('brandJourneyQuote')}
            </p>
          </div>
        </div>

        {/* Replay & Action Controls */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setSeconds(0)}
            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-slate-200"
          >
            <Play className="w-3.5 h-3.5" /> {t('replay')}
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-600/20"
          >
            {t('enterDashboard')}
          </button>
        </div>
      </div>
    </div>
  );
}
