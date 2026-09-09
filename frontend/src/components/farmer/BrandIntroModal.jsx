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
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cinematic Header Label */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-[11px] font-extrabold tracking-widest uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full">
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
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/20 mx-auto">
              🌾
            </div>
          </div>

          {/* 0.5 sec: "আপনার ফসল," (Your Crop,) */}
          <div
            className={`transition-all duration-500 ${
              seconds >= 0.5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-300 font-serif">
              "আপনার ফসল," <span className="text-sm font-sans font-normal text-slate-300 block sm:inline">(Your Crop,)</span>
            </h2>
          </div>

          {/* 1.0 sec: "আপনার সিদ্ধান্ত।" (Your Decision.) */}
          <div
            className={`transition-all duration-500 ${
              seconds >= 1.0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-amber-300 font-serif">
              "আপনার সিদ্ধান্ত।" <span className="text-sm font-sans font-normal text-slate-300 block sm:inline">(Your Decision.)</span>
            </h3>
          </div>

          {/* 1.5 sec: FARM PLATFORM */}
          <div
            className={`transition-all duration-500 ${
              seconds >= 1.5 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <div className="text-lg sm:text-xl font-extrabold tracking-widest text-white uppercase bg-emerald-800/80 px-4 py-1.5 rounded-xl border border-emerald-500/50 inline-block shadow-md">
              FARM PLATFORM
            </div>
          </div>
        </div>

        {/* Visual Crop Journey Transition (Page 1) */}
        <div className="mt-6 pt-6 border-t border-emerald-500/20 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 text-center">
            Visual Crop Journey Transition
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
              <span className="text-lg block mb-1">🌱 ➔ 🌾</span>
              <span className="font-semibold text-slate-200">Crop grows ➔ Harvested</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
              <span className="text-lg block mb-1">🌾 ➔ 💰</span>
              <span className="font-semibold text-slate-200">Crop sells ➔ Earnings</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
              <span className="text-lg block mb-1">💰 ➔ 👨‍🌾</span>
              <span className="font-semibold text-slate-200">Earnings reach ➔ Farmer</span>
            </div>
          </div>

          {/* Bengali Brand Signature Quote */}
          <div className="p-3.5 rounded-2xl bg-emerald-900/40 border border-emerald-500/40 text-center">
            <p className="text-emerald-200 font-bold text-sm sm:text-base font-serif italic">
              "আপনার ফসলের যাত্রা, এখন আপনার হাতেই।"
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              (Your crop's journey, now in your hands.)
            </p>
          </div>
        </div>

        {/* Replay & Action Controls */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setSeconds(0)}
            className="flex-1 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" /> Replay (2s)
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-emerald-600/30"
          >
            Enter Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
