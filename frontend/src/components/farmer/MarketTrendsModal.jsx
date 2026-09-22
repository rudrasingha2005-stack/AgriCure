import React, { useState, useContext } from 'react';
import {
  X,
  TrendingUp,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  BarChart3,
  Scale
} from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';

export default function MarketTrendsModal({ isOpen, onClose }) {
  const { t } = useContext(LanguageContext);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const marketItems = [
    { crop: 'Paddy (Rice)', currentPrice: 23.69, prevPrice: 23.0, msp: 23.69, change: '+3.0%', high: 24.5, low: 23.0, volume: '48,200 KG', emoji: '🌾' },
    { crop: 'Wheat', currentPrice: 24.25, prevPrice: 23.8, msp: 24.25, change: '+1.9%', high: 25.5, low: 23.5, volume: '32,100 KG', emoji: '🌾' }
  ];

  const filtered = marketItems.filter((i) =>
    i.crop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl border border-white/80 rounded-3xl p-5 sm:p-7 text-slate-800 shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-mono tracking-wider text-emerald-700 font-bold uppercase bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              PDF Section 2: Real-time Price Trends & Search
            </span>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 mt-1">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>{t('todaysMarket')}</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder={t('searchMandiPrice')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
          />
        </div>

        {/* Market Rate Cards Grid */}
        <div className="mt-4 space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
          {filtered.map((item) => (
            <div
              key={item.crop}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400/80 shadow-xs hover:shadow-sm transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 rounded-xl bg-slate-50 border border-slate-100">
                  {item.emoji}
                </span>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    {item.crop.includes('Paddy') ? t('paddy') : item.crop.includes('Wheat') ? t('wheat') : item.crop}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span>{t('govtMsp')} <strong className="text-slate-700">₹{item.msp}/kg</strong></span>
                    <span>• {t('volume')} <strong className="text-slate-700">{item.volume}</strong></span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xl font-black text-slate-900 font-mono">
                  ₹{item.currentPrice}/KG
                </div>
                <div
                  className={`text-xs font-extrabold flex items-center justify-end gap-0.5 ${
                    item.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {item.change.startsWith('+') ? (
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  )}
                  <span>{item.change} {t('changeToday')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-all border border-slate-200"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
}
