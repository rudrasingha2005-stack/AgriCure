import React, { useState, useContext } from 'react';
import { X, Archive, Calendar, CheckCircle2, FileText, ExternalLink, Filter } from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';

export default function HistoricalArchiveModal({ isOpen, onClose }) {
  const { t } = useContext(LanguageContext);
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedSeason, setSelectedSeason] = useState('Kharif');
  const [selectedCategory, setSelectedCategory] = useState('msp');

  if (!isOpen) return null;

  const archiveData = {
    '2026-Kharif': {
      msp: [
        { crop: 'Paddy (Common)', rate: 2369, authority: 'CCEA 29 May 2025' },
        { crop: 'Paddy (Grade A)', rate: 2389, authority: 'CCEA 29 May 2025' },
        { crop: 'Wheat', rate: 2425, authority: 'CCEA Oct 2024' }
      ],
      quality: [
        { crop: 'Paddy', moistureLimit: '17.0%', fmLimit: '2.0%', damagedLimit: '5.0%' }
      ],
      transactions: [
        { id: 'TXN-2026-009421', crop: 'Paddy (50 QTL)', amount: 118450, status: 'Paid', date: '18 Sept 2026' }
      ]
    },
    '2025-Kharif': {
      msp: [
        { crop: 'Paddy (Common)', rate: 2300, authority: 'CCEA May 2024' },
        { crop: 'Paddy (Grade A)', rate: 2320, authority: 'CCEA May 2024' }
      ],
      quality: [
        { crop: 'Paddy', moistureLimit: '17.0%', fmLimit: '2.0%', damagedLimit: '5.0%' }
      ],
      transactions: [
        { id: 'TXN-2025-004102', crop: 'Paddy (40 QTL)', amount: 92000, status: 'Paid', date: '15 Oct 2025' }
      ]
    },
    '2024-Kharif': {
      msp: [
        { crop: 'Paddy (Common)', rate: 2183, authority: 'CCEA June 2023' },
        { crop: 'Paddy (Grade A)', rate: 2203, authority: 'CCEA June 2023' }
      ],
      quality: [
        { crop: 'Paddy', moistureLimit: '17.0%', fmLimit: '2.0%', damagedLimit: '5.0%' }
      ],
      transactions: [
        { id: 'TXN-2024-001920', crop: 'Paddy (35 QTL)', amount: 76405, status: 'Paid', date: '20 Oct 2024' }
      ]
    }
  };

  const key = `${selectedYear}-${selectedSeason}`;
  const currentData = archiveData[key] || archiveData['2025-Kharif'];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl border border-white/80 rounded-3xl p-5 sm:p-7 text-slate-800 shadow-2xl my-auto space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-purple-600/20">
              <Archive className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-wider text-purple-800 font-bold uppercase bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                Section 12 & 36 • Blueprint Archive
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                📜 {t('historicalArchive')}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Year & Season Selectors */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <label className="font-extrabold text-slate-700 block mb-1">Select Year:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <div>
            <label className="font-extrabold text-slate-700 block mb-1">Select Season:</label>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900"
            >
              <option value="Kharif">Kharif</option>
              <option value="Rabi">Rabi</option>
            </select>
          </div>

          <div>
            <label className="font-extrabold text-slate-700 block mb-1">Information:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900"
            >
              <option value="msp">MSP Rates</option>
              <option value="quality">Quality Standards</option>
              <option value="transactions">My Transactions</option>
            </select>
          </div>
        </div>

        {/* Display Content */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 min-h-48 space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="font-mono font-bold text-purple-900 text-sm">
              Archive: {selectedSeason} {selectedYear}
            </span>
            <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-md">
              Verified Historical Record
            </span>
          </div>

          {selectedCategory === 'msp' && (
            <div className="space-y-2">
              {currentData.msp.map((m, i) => (
                <div key={i} className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between items-center font-mono">
                  <div>
                    <span className="font-black text-slate-900 block">{m.crop}</span>
                    <span className="text-[10px] text-slate-500">{m.authority}</span>
                  </div>
                  <span className="font-black text-emerald-700 text-sm">₹{m.rate} / Qtl</span>
                </div>
              ))}
            </div>
          )}

          {selectedCategory === 'quality' && (
            <div className="space-y-2">
              {currentData.quality.map((q, i) => (
                <div key={i} className="p-3 rounded-xl bg-white border border-slate-200 space-y-1 font-mono">
                  <span className="font-black text-slate-900 block">{q.crop} Specification ({selectedSeason} {selectedYear})</span>
                  <div className="flex gap-3 text-[11px] text-slate-600">
                    <span>Moisture: <strong>{q.moistureLimit}</strong></span>
                    <span>Foreign Matter: <strong>{q.fmLimit}</strong></span>
                    <span>Damaged: <strong>{q.damagedLimit}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedCategory === 'transactions' && (
            <div className="space-y-2">
              {currentData.transactions.map((t, i) => (
                <div key={i} className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between items-center font-mono">
                  <div>
                    <span className="font-black text-slate-900 block">{t.crop}</span>
                    <span className="text-[10px] text-slate-500">{t.id} • {t.date}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-emerald-700 text-sm block">₹{t.amount.toLocaleString()}</span>
                    <span className="text-[10px] text-emerald-800 font-bold">✓ {t.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-all border border-slate-200"
          >
            Close Archive
          </button>
        </div>

      </div>
    </div>
  );
}
