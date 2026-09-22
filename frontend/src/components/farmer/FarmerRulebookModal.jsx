import React, { useState, useContext } from 'react';
import {
  X,
  BookOpen,
  ChevronDown,
  ChevronUp,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Globe
} from 'lucide-react';
import { farmerRulebookData } from '../../data/farmerRulebookData';
import { LanguageContext } from '../../context/LanguageContext';

export default function FarmerRulebookModal({ isOpen, onClose, initialSection = null }) {
  const { language, setLanguage, t } = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState(initialSection || 'overview');
  const [expandedExplanations, setExpandedExplanations] = useState({});
  const [selectedCropFilter, setSelectedCropFilter] = useState('Paddy');

  if (!isOpen) return null;

  const currentLang = language || 'en';

  // Helper function to resolve multilingual string/object
  const getT = (item) => {
    if (!item) return '';
    if (typeof item === 'string') return item;
    return item[currentLang] || item.en || '';
  };

  const toggleExplanation = (key) => {
    setExpandedExplanations((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const tabs = farmerRulebookData.tabs[currentLang] || farmerRulebookData.tabs.en;
  const activeSpecs = selectedCropFilter === 'Paddy' 
    ? farmerRulebookData.qualityStandards.paddySpecs 
    : farmerRulebookData.qualityStandards.wheatSpecs;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white/95 backdrop-blur-2xl border border-white/90 rounded-3xl p-4 sm:p-7 text-slate-800 shadow-2xl my-auto max-h-[90vh] flex flex-col">
        
        {/* Header with Title and In-Modal Language Selector */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono tracking-wider text-emerald-800 font-bold uppercase bg-emerald-100/80 px-2.5 py-0.5 rounded-md border border-emerald-200">
                Official Traceable Reference • {farmerRulebookData.version}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                📖 {t('farmerRulebook')}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Selector Selector Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs">
              <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-1" />
              {[
                { code: 'en', label: 'EN' },
                { code: 'bn', label: 'বাংলা' },
                { code: 'hi', label: 'हिंदी' }
              ].map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                    currentLang === l.code ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Section Tabs Bar */}
        <div className="py-3 flex items-center gap-2 overflow-x-auto border-b border-slate-100 flex-shrink-0 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl font-extrabold text-xs whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 border border-slate-200/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="py-4 overflow-y-auto space-y-5 flex-1 pr-1">

          {/* TAB 1: OVERVIEW / CROP SELECTION */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-slate-700">
                <h3 className="font-black text-slate-900 text-sm mb-1">
                  {getT(farmerRulebookData.cropSelection.title)}
                </h3>
                <p>{getT(farmerRulebookData.cropSelection.description)}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Kharif Crops Card */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-black text-slate-900 text-sm flex items-center gap-1.5">
                      {getT(farmerRulebookData.cropSelection.seasons.Kharif.label)}
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                      {getT(farmerRulebookData.cropSelection.seasons.Kharif.period)}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {farmerRulebookData.cropSelection.seasons.Kharif.crops.map((c, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{c.icon}</span>
                          <div>
                            <span className="font-extrabold text-slate-900 block">{getT(c.name)}</span>
                            <span className="text-[10px] text-slate-500">{getT(c.category)}</span>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-emerald-700 font-bold">
                          Years: {c.notifiedYears.join(', ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rabi Crops Card */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-black text-slate-900 text-sm flex items-center gap-1.5">
                      {getT(farmerRulebookData.cropSelection.seasons.Rabi.label)}
                    </span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-md">
                      {getT(farmerRulebookData.cropSelection.seasons.Rabi.period)}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {farmerRulebookData.cropSelection.seasons.Rabi.crops.map((c, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{c.icon}</span>
                          <div>
                            <span className="font-extrabold text-slate-900 block">{getT(c.name)}</span>
                            <span className="text-[10px] text-slate-500">{getT(c.category)}</span>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-amber-700 font-bold">
                          Years: {c.notifiedYears.join(', ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MSP RULES */}
          {activeTab === 'msp' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-slate-700">
                <h3 className="font-black text-slate-900 text-sm mb-1">
                  {getT(farmerRulebookData.mspRules.title)}
                </h3>
                <p>{getT(farmerRulebookData.mspRules.description)}</p>
              </div>

              <div className="space-y-4">
                {farmerRulebookData.mspRules.crops.map((m) => (
                  <div key={m.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                          <span>🌾 {getT(m.cropName)}</span>
                          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                            {getT(m.season)}
                          </span>
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Authority: <strong>{getT(m.issuingAuthority)}</strong>
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-xl font-black text-emerald-700 font-mono">
                          ₹{m.mspCommon.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ {getT(m.unit)}</span>
                        </div>
                        {m.mspGradeA && (
                          <span className="text-xs font-bold text-amber-700 block font-mono">
                            Grade A: ₹{m.mspGradeA.toLocaleString()} / {getT(m.unit)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                        <span className="text-slate-500 font-bold block uppercase text-[10px]">Procurement Window:</span>
                        <span className="font-extrabold text-slate-800">{getT(m.procurementPeriod)}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                        <span className="text-slate-500 font-bold block uppercase text-[10px]">Official Notification Ref:</span>
                        <span className="font-mono text-emerald-800 font-bold">{getT(m.reference)} ({m.documentId})</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: QUALITY STANDARDS */}
          {activeTab === 'quality' && (
            <div className="space-y-4">
              {/* Crop Selector Switcher */}
              <div className="flex items-center justify-between bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700 ml-2">Select Crop Specification:</span>
                <div className="flex gap-1">
                  {['Paddy', 'Wheat'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCropFilter(c)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        selectedCropFilter === c
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {c === 'Paddy' ? '🌾 Paddy (Rice)' : '🌾 Wheat'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-slate-700">
                <h3 className="font-black text-slate-900 text-sm mb-0.5">
                  {getT(activeSpecs.crop)}
                </h3>
                <span className="text-[11px] font-mono text-emerald-800 font-semibold block">
                  Source: {getT(activeSpecs.source)}
                </span>
              </div>

              {/* Quality Parameters Table */}
              <div className="space-y-3">
                {activeSpecs.parameters.map((p) => {
                  const isExpanded = expandedExplanations[p.key];
                  const simpleText = getT(p.simpleExplanation);

                  return (
                    <div
                      key={p.key}
                      className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 shadow-xs transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span className="font-black text-slate-900 text-sm">{getT(p.name)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-mono font-black text-xs rounded-xl border border-emerald-300">
                            Max Limit: {p.limitPct}%
                          </span>
                          <button
                            onClick={() => toggleExplanation(p.key)}
                            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-extrabold rounded-xl flex items-center gap-1 transition-all cursor-pointer"
                          >
                            <Sparkles className="w-3 h-3 text-emerald-600" />
                            <span>{t('explainSimply')}</span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* Interactive Plain Language Explanation Box */}
                      {isExpanded && (
                        <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/90 text-xs text-slate-800 animate-fade-in space-y-1.5 shadow-xs">
                          <div className="font-extrabold text-emerald-900 flex items-center gap-1.5">
                            <span>💡 {t('explainSimply')} ({currentLang.toUpperCase()}):</span>
                          </div>
                          <p className="leading-relaxed">{simpleText}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: DISCOUNT SLABS & VALUE CUTS */}
          {activeTab === 'discounts' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-slate-700">
                <h3 className="font-black text-slate-900 text-sm mb-1">
                  {getT(farmerRulebookData.discountRules.title)}
                </h3>
                <p>{getT(farmerRulebookData.discountRules.description)}</p>
              </div>

              {/* Paddy Moisture Slabs Table */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
                <h4 className="font-black text-slate-900 text-sm border-b border-slate-100 pb-2">
                  🌾 Paddy Moisture Value-Cut Schedule
                </h4>
                <div className="space-y-2">
                  {farmerRulebookData.discountRules.paddyMoistureSlabs.map((s, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                      <span className="font-mono font-black text-slate-900 sm:w-1/3">{s.range}</span>
                      <span className="font-semibold text-slate-700 sm:w-2/3">{getT(s.cut)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formula & Worked Example Box */}
              <div className="p-4.5 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-xs space-y-2">
                <div className="font-black text-amber-950 text-sm flex items-center gap-2">
                  <span>📐 Worked Step-by-Step Calculation Example</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-amber-200/70 font-mono text-[11px] space-y-1 text-slate-800 shadow-xs">
                  <div>Crop: <strong>{getT(farmerRulebookData.discountRules.exampleCalculation.crop)}</strong></div>
                  <div>Measured Moisture: <strong>{farmerRulebookData.discountRules.exampleCalculation.moistureMeasured}%</strong> (Base Limit: {farmerRulebookData.discountRules.exampleCalculation.baseLimit}%)</div>
                  <div>Excess Moisture: <strong>{farmerRulebookData.discountRules.exampleCalculation.excessPct}%</strong></div>
                  <div>Base MSP Rate: <strong>₹{farmerRulebookData.discountRules.exampleCalculation.baseMsp} / Quintal</strong></div>
                  <div className="text-amber-800 font-bold">Applied Deduction: ₹{farmerRulebookData.discountRules.exampleCalculation.baseMsp} x {farmerRulebookData.discountRules.exampleCalculation.valueCutPct}% = -₹{farmerRulebookData.discountRules.exampleCalculation.deductionPerQtl} / Quintal</div>
                  <div className="text-emerald-800 font-black text-xs pt-1">Net Payable Rate: ₹{farmerRulebookData.discountRules.exampleCalculation.netPayablePerQtl} / Quintal</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SELLING JOURNEY */}
          {activeTab === 'process' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-slate-700">
                <h3 className="font-black text-slate-900 text-sm mb-1">
                  {getT(farmerRulebookData.procurementRules.title)}
                </h3>
                <p>{getT(farmerRulebookData.procurementRules.description)}</p>
              </div>

              <div className="space-y-2.5">
                {farmerRulebookData.procurementRules.steps.map((s) => (
                  <div key={s.step} className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-start gap-3 shadow-xs">
                    <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-xs flex-shrink-0">
                      {s.step}
                    </span>
                    <div>
                      <h4 className="font-black text-slate-900 text-xs">{getT(s.title)}</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">{getT(s.desc)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: RIGHTS & RESPONSIBILITIES */}
          {activeTab === 'rights' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-3">
                  <h3 className="font-black text-emerald-950 text-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    {getT(farmerRulebookData.rightsAndResponsibilities.rightsTitle)}
                  </h3>
                  <div className="space-y-2 text-xs">
                    {(farmerRulebookData.rightsAndResponsibilities.rights[currentLang] || farmerRulebookData.rightsAndResponsibilities.rights.en).map((r, i) => (
                      <div key={i} className="flex items-start gap-2 text-slate-800 font-medium">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="font-black text-slate-900 text-sm flex items-center gap-1.5">
                    📋 {getT(farmerRulebookData.rightsAndResponsibilities.responsibilitiesTitle)}
                  </h3>
                  <div className="space-y-2 text-xs">
                    {(farmerRulebookData.rightsAndResponsibilities.responsibilities[currentLang] || farmerRulebookData.rightsAndResponsibilities.responsibilities.en).map((r, i) => (
                      <div key={i} className="flex items-start gap-2 text-slate-700">
                        <span className="text-slate-500 font-bold">•</span>
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: GOVERNMENT CITATIONS & ORDERS */}
          {activeTab === 'citations' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-black text-slate-900 text-sm mb-1">
                    {getT(farmerRulebookData.governmentGuidelines.title)}
                  </h3>
                  <p>{getT(farmerRulebookData.governmentGuidelines.description)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => window.open('/govt-order-kms-2025-26.pdf', '_blank')}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md whitespace-nowrap"
                >
                  <FileText className="w-4 h-4" />
                  <span>{getT(farmerRulebookData.governmentGuidelines.pdfButtonText)}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {farmerRulebookData.governmentGuidelines.citations.map((c, i) => (
                  <div
                    key={i}
                    onClick={() => window.open('/govt-order-kms-2025-26.pdf', '_blank')}
                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 shadow-xs hover:shadow-md transition-all space-y-2 text-xs cursor-pointer group"
                  >
                    <div className="flex justify-between items-start border-b border-slate-100 pb-2">
                      <span className="font-black text-slate-900 text-sm group-hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                        📄 {getT(c.issuingAuthority)}
                      </span>
                      <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {c.documentRef}
                      </span>
                    </div>
                    <p className="text-slate-600">{getT(c.summary)}</p>
                    <div className="flex justify-between items-center text-[11px] pt-1">
                      <span className="font-mono text-slate-500">Effective: {getT(c.effectiveDate)}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open('/govt-order-kms-2025-26.pdf', '_blank');
                        }}
                        className="text-emerald-700 font-extrabold underline flex items-center gap-1 hover:text-emerald-900"
                      >
                        <span>{getT(farmerRulebookData.governmentGuidelines.pdfButtonText)}</span> <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between flex-shrink-0 text-xs">
          <span className="text-slate-500 font-medium">
            Rulebook Reference Version: <strong>{farmerRulebookData.version}</strong>
          </span>
          <button
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer transition-all border border-slate-200"
          >
            Close Rulebook
          </button>
        </div>

      </div>
    </div>
  );
}
