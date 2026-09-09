import React, { useContext } from 'react';
import {
  X,
  CloudRain,
  AlertTriangle,
  Sun,
  Droplets,
  Wind,
  ShieldAlert,
  Thermometer,
  Compass
} from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';

export default function WeatherAdvisoryModal({ isOpen, onClose }) {
  const { t } = useContext(LanguageContext);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-emerald-500/30 rounded-3xl p-5 sm:p-7 text-white shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-[11px] font-mono tracking-wider text-emerald-400 font-bold uppercase">
              PDF Section 6: Agricultural Meteorology
            </span>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span>🌦</span> {t('weatherAdvisory')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* CRITICAL HARVEST WARNING BANNER (Page 4 of PDF)                           */}
        {/* ========================================================================= */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-red-900/60 via-amber-900/40 to-red-900/60 border-2 border-amber-500 text-amber-200 shadow-xl flex items-start gap-3 animate-pulse">
          <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-black text-sm uppercase tracking-wider text-amber-300">
              {t('avoidHarvestRain')}
            </h4>
            <p className="text-xs text-slate-200 mt-1">
              Wet crops suffer rapid mold development, higher dockage penalties, and reduced mandi grading scores.
              Store harvested produce on raised pallets under tarpaulins.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CURRENT & TOMORROW FORECAST (Page 4 of PDF)                               */}
        {/* ========================================================================= */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Current Weather */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Current Condition
              </span>
              <span className="text-2xl">⛅</span>
            </div>

            <div>
              <span className="text-3xl font-black text-white font-mono">24°C</span>
              <span className="text-xs text-slate-400 font-medium block">Partly Cloudy • Darjeeling</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700/60 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Droplets className="w-3.5 h-3.5 text-blue-400" />
                <span>Humidity: <strong>68%</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
                <span>Rain: <strong>5mm</strong></span>
              </div>
            </div>
          </div>

          {/* Tomorrow Weather Alert */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-800/90 to-blue-950/40 border border-blue-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Tomorrow's Forecast
              </span>
              <span className="text-2xl">🌧</span>
            </div>

            <div>
              <span className="text-3xl font-black text-white font-mono">22°C</span>
              <span className="text-xs text-blue-300 font-bold block">
                🌧 Heavy Rain Expected
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700/60 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <CloudRain className="w-3.5 h-3.5 text-blue-400" />
                <span>Precipitation: <strong>85%</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Wind className="w-3.5 h-3.5 text-teal-400" />
                <span>Wind: <strong>18 km/h</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Day Outlook */}
        <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            5-Day Mandi Transport & Field Windows
          </span>
          <div className="grid grid-cols-5 gap-1.5 text-center text-[11px]">
            <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
              <span className="text-slate-400 block">Wed</span>
              <span className="text-lg block my-1">⛅</span>
              <span className="font-bold text-white">24°</span>
            </div>
            <div className="p-2 rounded-xl bg-blue-950/40 border border-blue-500/50">
              <span className="text-blue-300 font-bold block">Thu</span>
              <span className="text-lg block my-1">🌧</span>
              <span className="font-bold text-blue-200">22°</span>
            </div>
            <div className="p-2 rounded-xl bg-blue-950/30 border border-blue-500/30">
              <span className="text-slate-400 block">Fri</span>
              <span className="text-lg block my-1">🌦</span>
              <span className="font-bold text-white">23°</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
              <span className="text-slate-400 block">Sat</span>
              <span className="text-lg block my-1">☀️</span>
              <span className="font-bold text-white">26°</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
              <span className="text-slate-400 block">Sun</span>
              <span className="text-lg block my-1">🌤</span>
              <span className="font-bold text-white">25°</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
