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
    { crop: 'Potato', currentPrice: 12, prevPrice: 11.2, msp: 10.5, change: '+7.1%', high: 13.5, low: 10.8, volume: '24,500 KG', emoji: '🥔' },
    { crop: 'Rice (Paddy)', currentPrice: 28, prevPrice: 27.0, msp: 23.0, change: '+3.7%', high: 29.5, low: 26.5, volume: '48,200 KG', emoji: '🌾' },
    { crop: 'Tomato', currentPrice: 18, prevPrice: 21.0, msp: 14.0, change: '-14.2%', high: 24.0, low: 16.5, volume: '12,800 KG', emoji: '🍅' },
    { crop: 'Onion', currentPrice: 22, prevPrice: 20.5, msp: 18.0, change: '+7.3%', high: 25.0, low: 19.0, volume: '18,400 KG', emoji: '🧅' },
    { crop: 'Wheat', currentPrice: 26.5, prevPrice: 25.8, msp: 24.25, change: '+2.7%', high: 27.5, low: 25.0, volume: '32,100 KG', emoji: '🌾' },
    { crop: 'Maize', currentPrice: 19.5, prevPrice: 19.0, msp: 18.5, change: '+2.6%', high: 21.0, low: 18.0, volume: '9,800 KG', emoji: '🌽' }
  ];

  const filtered = marketItems.filter((i) =>
    i.crop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-emerald-500/30 rounded-3xl p-5 sm:p-7 text-white shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-[11px] font-mono tracking-wider text-emerald-400 font-bold uppercase">
              PDF Section 2: Real-time Price Trends & Search
            </span>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>{t('todaysMarket')}</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search crop mandi price (e.g. Potato, Rice, Tomato)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Market Rate Cards Grid */}
        <div className="mt-4 space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
          {filtered.map((item) => (
            <div
              key={item.crop}
              className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/50 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 rounded-xl bg-slate-900 border border-slate-700">
                  {item.emoji}
                </span>
                <div>
                  <h4 className="font-extrabold text-white text-sm sm:text-base">
                    {item.crop}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span>Govt MSP: <strong>₹{item.msp}/kg</strong></span>
                    <span>• Volume: <strong>{item.volume}</strong></span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xl font-black text-white font-mono">
                  ₹{item.currentPrice}/KG
                </div>
                <div
                  className={`text-xs font-extrabold flex items-center justify-end gap-0.5 ${
                    item.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {item.change.startsWith('+') ? (
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  )}
                  <span>{item.change} today</span>
                </div>
              </div>
            </div>
          ))}
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
