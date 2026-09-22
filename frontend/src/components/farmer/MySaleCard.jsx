import React, { useContext } from 'react';
import {
  CheckCircle2,
  ChevronRight,
  FileText
} from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';

export default function MySaleCard({
  saleData = {
    crop: 'Paddy (Grade A)',
    season: 'Kharif 2026',
    tokenNumber: '58',
    centreName: 'ABC Procurement Centre (Siliguri)',
    quantityQtl: 50,
    mspRate: 2389,
    expectedGrossValue: 119450,
    steps: {
      booking: true,
      arrival: true,
      queue: true,
      grading: true,
      weighment: false,
      payment: false
    }
  },
  onViewDetails,
  onOpenRulebook
}) {
  const { language, t } = useContext(LanguageContext);

  const mySaleDict = {
    en: {
      singleSource: 'Single Source of Truth',
      selectedCrop: 'SELECTED CROP:',
      activeToken: 'ACTIVE TOKEN:',
      registeredQuantity: 'REGISTERED QUANTITY:',
      currentMspValuation: 'CURRENT MSP VALUATION:',
      procurementLifecycle: 'PROCUREMENT JOURNEY LIFECYCLE STATE:',
      booking: 'BOOKING',
      arrival: 'ARRIVAL',
      queue: 'QUEUE',
      grading: 'GRADING',
      weighment: 'WEIGHMENT',
      payment: 'PAYMENT',
      paddyGradeA: 'Paddy (Grade A)',
      wheatGradeA: 'Wheat (Grade A)',
      token: 'Token',
      qtl: 'QTL'
    },
    bn: {
      singleSource: 'একক সত্যের তথ্য',
      selectedCrop: 'নির্বাচিত ফসল:',
      activeToken: 'সক্রিয় টোকেন:',
      registeredQuantity: 'নিবন্ধিত পরিমাণ:',
      currentMspValuation: 'বর্তমান এমএসপি মূল্য:',
      procurementLifecycle: 'সংগ্রহ যাত্রার জীবনচক্রের অবস্থা:',
      booking: 'বুকিং',
      arrival: 'আগমন',
      queue: 'কিউ',
      grading: 'গ্রেডিং',
      weighment: 'ওজন',
      payment: 'পেমেন্ট',
      paddyGradeA: 'ধান (গ্রেড এ)',
      wheatGradeA: 'গম (গ্রেড এ)',
      token: 'টোকেন',
      qtl: 'কুইন্টাল'
    },
    hi: {
      singleSource: 'सत्य का एकमात्र स्रोत',
      selectedCrop: 'चयनित फसल:',
      activeToken: 'सक्रिय टोकन:',
      registeredQuantity: 'पंजीकृत मात्रा:',
      currentMspValuation: 'वर्तमान एमएसपी मूल्य:',
      procurementLifecycle: 'खरीद यात्रा जीवनचक्र स्थिति:',
      booking: 'बुकिंग',
      arrival: 'आगमन',
      queue: 'कतार',
      grading: 'ग्रेडिंग',
      weighment: 'तौल',
      payment: 'भुगतान',
      paddyGradeA: 'धान (ग्रेड ए)',
      wheatGradeA: 'गेहूं (ग्रेड ए)',
      token: 'टोकन',
      qtl: 'क्विंटल'
    }
  };

  const st = (key) => mySaleDict[language]?.[key] || mySaleDict.en[key] || key;

  const stepsList = [
    { key: 'booking', label: st('booking'), done: saleData.steps.booking },
    { key: 'arrival', label: st('arrival'), done: saleData.steps.arrival },
    { key: 'queue', label: st('queue'), done: saleData.steps.queue },
    { key: 'grading', label: st('grading'), done: saleData.steps.grading },
    { key: 'weighment', label: st('weighment'), done: saleData.steps.weighment },
    { key: 'payment', label: st('payment'), done: saleData.steps.payment }
  ];

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-[#008b5e] text-white shadow-2xl border border-emerald-400/40 space-y-4 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge & Title with AgriProcure Logo */}
      <div className="flex items-center justify-between border-b border-white/20 pb-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-900 border border-amber-400 p-0.5 shadow-sm flex items-center justify-center overflow-hidden">
            <img
              src="/agriprocure-logo.png"
              alt="AgriSetu Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-base sm:text-lg font-black tracking-widest text-white uppercase drop-shadow-sm">
            {t('mySale')}
          </h3>
        </div>
        <span className="text-[10px] font-mono font-bold bg-white/20 text-white px-3.5 py-1 rounded-full border border-white/30 backdrop-blur-md shadow-xs">
          {st('singleSource')}
        </span>
      </div>

      {/* Main Metadata Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs relative z-10">
        <div className="p-3 rounded-2xl bg-[#004d35] border border-emerald-400/30 backdrop-blur-md space-y-0.5 shadow-inner">
          <span className="text-[10px] text-emerald-200/90 uppercase font-bold block">{st('selectedCrop')}</span>
          <span className="font-black text-white text-sm block">🌾 {saleData.crop.includes('Paddy') ? st('paddyGradeA') : saleData.crop.includes('Wheat') ? st('wheatGradeA') : saleData.crop}</span>
          <span className="text-[10px] text-emerald-300 font-mono">{saleData.season}</span>
        </div>

        <div className="p-3 rounded-2xl bg-[#004d35] border border-emerald-400/30 backdrop-blur-md space-y-0.5 shadow-inner">
          <span className="text-[10px] text-emerald-200/90 uppercase font-bold block">{st('activeToken')}</span>
          <span className="font-mono font-black text-amber-300 text-base block">{st('token')} #{saleData.tokenNumber}</span>
          <span className="text-[10px] text-slate-200 font-mono truncate block">{saleData.centreName}</span>
        </div>

        <div className="p-3 rounded-2xl bg-[#004d35] border border-emerald-400/30 backdrop-blur-md space-y-0.5 shadow-inner">
          <span className="text-[10px] text-emerald-200/90 uppercase font-bold block">{st('registeredQuantity')}</span>
          <span className="font-mono font-black text-white text-base block">{saleData.quantityQtl} {st('qtl')}</span>
          <span className="text-[10px] text-emerald-200/70">({saleData.quantityQtl * 100} KG)</span>
        </div>

        <div className="p-3 rounded-2xl bg-[#004d35] border border-emerald-400/30 backdrop-blur-md space-y-0.5 shadow-inner">
          <span className="text-[10px] text-emerald-200/90 uppercase font-bold block">{st('currentMspValuation')}</span>
          <span className="font-mono font-black text-emerald-200 text-base block">₹{saleData.expectedGrossValue.toLocaleString()}</span>
          <span className="text-[10px] text-emerald-300 font-mono">@ ₹{saleData.mspRate}/{st('qtl')}</span>
        </div>
      </div>

      {/* 6-Step Visual Journey Tracker */}
      <div className="space-y-2 pt-1 relative z-10">
        <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-wider block">
          {st('procurementLifecycle')}
        </span>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
          {stepsList.map((step) => (
            <div
              key={step.key}
              className={`p-2 rounded-xl text-center flex flex-col items-center justify-center gap-1 border transition-all ${
                step.done
                  ? 'bg-[#00aa74] border-emerald-300 text-white font-black shadow-md'
                  : 'bg-[#003827]/70 border-emerald-800/60 text-emerald-200/50 font-medium'
              }`}
            >
              <div className="flex items-center justify-center">
                {step.done ? (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border border-emerald-600 block" />
                )}
              </div>
              <span className="text-[9px] font-mono tracking-tighter uppercase">{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/20 text-xs relative z-10">
        <button
          onClick={onOpenRulebook}
          className="text-white hover:text-emerald-100 font-extrabold flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-white" />
          <span>[ {t('viewThisRule')} ]</span>
        </button>

        <button
          onClick={onViewDetails}
          className="w-full sm:w-auto py-2.5 px-6 rounded-full bg-white hover:bg-emerald-50 text-[#004d35] font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xl transform hover:scale-105"
        >
          <span>[ {t('viewDetails')} ]</span>
          <ChevronRight className="w-4 h-4 text-[#004d35]" />
        </button>
      </div>

    </div>
  );
}
