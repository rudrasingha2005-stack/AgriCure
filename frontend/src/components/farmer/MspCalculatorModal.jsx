import React, { useState, useContext } from 'react';
import { X, Calculator, Sparkles, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { farmerRulebookData } from '../../data/farmerRulebookData';
import { LanguageContext } from '../../context/LanguageContext';

export default function MspCalculatorModal({ isOpen, onClose }) {
  const { t } = useContext(LanguageContext);
  const [selectedCrop, setSelectedCrop] = useState('paddy-common');
  const [quantityQtl, setQuantityQtl] = useState(50);
  const [moisturePct, setMoisturePct] = useState(17.0);
  const [foreignMatterPct, setForeignMatterPct] = useState(1.0);

  if (!isOpen) return null;

  // Derive parameters based on crop selection
  let mspRate = 2369; // Paddy Common
  let baseMoistureLimit = 17.0;
  let maxMoistureAcceptable = 22.0;
  let cropLabel = 'Paddy (Common Grade)';

  if (selectedCrop === 'paddy-grade-a') {
    mspRate = 2389;
    baseMoistureLimit = 17.0;
    maxMoistureAcceptable = 22.0;
    cropLabel = 'Paddy (Grade A)';
  } else if (selectedCrop === 'wheat') {
    mspRate = 2425;
    baseMoistureLimit = 12.0;
    maxMoistureAcceptable = 14.0;
    cropLabel = 'Wheat (Rabi Marketing Season)';
  }

  // Calculate Value Cuts
  const numQuantity = Number(quantityQtl) || 0;
  const numMoisture = Number(moisturePct) || 0;
  
  const grossValuation = numQuantity * mspRate;

  let isRejected = false;
  let moistureExcessPct = 0;
  let deductionPct = 0;
  let deductionPerQtl = 0;
  let totalDeduction = 0;

  if (numMoisture > maxMoistureAcceptable) {
    isRejected = true;
  } else if (numMoisture > baseMoistureLimit) {
    moistureExcessPct = Number((numMoisture - baseMoistureLimit).toFixed(2));
    // Rulebook formula: 1% cut on MSP per 1% (or part) excess
    deductionPct = Math.ceil(moistureExcessPct); 
    deductionPerQtl = (mspRate * deductionPct) / 100;
    totalDeduction = deductionPerQtl * numQuantity;
  }

  const netPayablePerQtl = isRejected ? 0 : mspRate - deductionPerQtl;
  const totalNetPayable = isRejected ? 0 : grossValuation - totalDeduction;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white/95 backdrop-blur-2xl border border-white/80 rounded-3xl p-5 sm:p-7 text-slate-800 shadow-2xl my-auto space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-wider text-amber-800 font-bold uppercase bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                {t('valuationSimulator')}
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                🧮 {t('mspCalculator')}
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

        {/* Form Inputs */}
        <div className="space-y-4 text-xs">
          {/* Crop Selector */}
          <div className="space-y-1">
            <label className="font-extrabold text-slate-800 block">{t('selectCropGrade')}</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="paddy-common">{t('paddyCommon')} — ₹2,369 / Qtl (Kharif 2025-26)</option>
              <option value="paddy-grade-a">{t('paddyGradeA')} — ₹2,389 / Qtl (Kharif 2025-26)</option>
              <option value="wheat">{t('wheat')} — ₹2,425 / Qtl (Rabi 2025-26)</option>
            </select>
          </div>

          {/* Quantity Input */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-extrabold text-slate-800 block">{t('produceQuantity')}</label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={quantityQtl}
                  onChange={(e) => setQuantityQtl(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 font-mono font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <span className="absolute right-3 top-3 font-bold text-slate-400 font-mono">QTL</span>
              </div>
            </div>

            {/* Moisture Parameter Input */}
            <div className="space-y-1">
              <label className="font-extrabold text-slate-800 block">
                {t('grainMoisture')}
                <span className="text-[10px] text-slate-500 font-normal ml-1">({t('baseLimit')} {baseMoistureLimit}%)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="5"
                  max="30"
                  value={moisturePct}
                  onChange={(e) => setMoisturePct(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 font-mono font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <span className="absolute right-3 top-3 font-bold text-slate-400 font-mono">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Calculation Result Breakdown Card */}
        <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 font-mono text-xs">
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="text-slate-600 font-bold">{cropLabel} {t('mspRate')}:</span>
            <span className="font-black text-slate-900">₹{mspRate.toLocaleString()} / QTL</span>
          </div>

          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="text-slate-600 font-bold">{t('estimatedGrossVal')} ({numQuantity} QTL):</span>
            <span className="font-black text-slate-900">₹{grossValuation.toLocaleString()}.00</span>
          </div>

          {/* Moisture Value Cut Status */}
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="text-slate-600 font-bold">{t('moistureDeduction')}:</span>
            {isRejected ? (
              <span className="font-black text-red-600">❌ EXCEEDS CEILING ({numMoisture}%)</span>
            ) : deductionPct > 0 ? (
              <span className="font-black text-amber-700">-₹{totalDeduction.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (-{deductionPct}% cut)</span>
            ) : (
              <span className="font-black text-emerald-700">₹0.00 (Clean Accept ✓)</span>
            )}
          </div>

          {/* Final Net Payable */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex justify-between items-center shadow-md">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold opacity-90 block">{t('netPayable')}:</span>
              <span className="text-xl sm:text-2xl font-black">₹{totalNetPayable.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            {!isRejected && (
              <span className="text-xs bg-white/20 px-2.5 py-1 rounded-lg font-extrabold">
                ₹{netPayablePerQtl.toFixed(2)} / QTL
              </span>
            )}
          </div>
        </div>

        {/* Blueprint Section 8 Mandatory Disclaimer */}
        <p className="text-[11px] text-slate-500 font-medium italic text-center">
          *Final amount determined after actual grading and weighment at the procurement centre as per official DFPD circulars.
        </p>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-all border border-slate-200"
          >
            {t('close')}
          </button>
        </div>

      </div>
    </div>
  );
}
