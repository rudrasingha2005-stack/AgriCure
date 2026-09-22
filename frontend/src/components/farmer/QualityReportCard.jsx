import React, { useContext } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, FileText, MessageSquare } from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';

export default function QualityReportCard({ report, onOpenRulebook, onOpenComplaint }) {
  const { t } = useContext(LanguageContext);

  if (!report) {
    return (
      <div className="p-5 rounded-3xl bg-white border border-slate-200 text-slate-500 text-center font-medium text-xs shadow-xs">
        Quality report is not available yet for this booking.
      </div>
    );
  }

  // Default values matching Paddy specs from Rulebook
  const moistureVal = report.moisturePct || 14.5;
  const moistureLimit = 17.0;
  const isMoistureOk = moistureVal <= moistureLimit;

  const fmVal = report.foreignMatterPct || 0.8;
  const fmLimit = 2.0;
  const isFmOk = fmVal <= fmLimit;

  const damagedVal = report.rottenPct || 1.2;
  const damagedLimit = 5.0;
  const isDamagedOk = damagedVal <= damagedLimit;

  const isAccepted = isMoistureOk && isFmOk && isDamagedOk;

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
            DFPD / FCI Certified Grading Report
          </span>
          <h3 className="text-base font-black text-slate-900 mt-1">
            Quality Inspection Result — {report.grade || 'Grade A'}
          </h3>
        </div>
        <div className={`px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1.5 ${
          isAccepted ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-red-100 text-red-800 border border-red-300'
        }`}>
          {isAccepted ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
          <span>{isAccepted ? 'ACCEPTED' : 'REJECTED'}</span>
        </div>
      </div>

      {/* Itemized Parameter Breakdown */}
      <div className="space-y-2 text-xs">
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div>
            <span className="font-extrabold text-slate-900 block">Moisture Content</span>
            <span className="text-[10px] text-slate-500">Official FAQ Limit: ≤ {moistureLimit}%</span>
          </div>
          <div className="text-right">
            <span className={`font-mono font-black text-sm block ${isMoistureOk ? 'text-emerald-700' : 'text-red-600'}`}>
              {moistureVal}%
            </span>
            <span className="text-[10px] font-bold">{isMoistureOk ? '✓ Within Limit' : '❌ Excess Moisture'}</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div>
            <span className="font-extrabold text-slate-900 block">Foreign Matter (Inorganic + Organic)</span>
            <span className="text-[10px] text-slate-500">Official FAQ Limit: ≤ {fmLimit}%</span>
          </div>
          <div className="text-right">
            <span className={`font-mono font-black text-sm block ${isFmOk ? 'text-emerald-700' : 'text-red-600'}`}>
              {fmVal}%
            </span>
            <span className="text-[10px] font-bold">{isFmOk ? '✓ Within Limit' : '❌ High Foreign Matter'}</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div>
            <span className="font-extrabold text-slate-900 block">Damaged & Discoloured Grains</span>
            <span className="text-[10px] text-slate-500">Official FAQ Limit: ≤ {damagedLimit}%</span>
          </div>
          <div className="text-right">
            <span className={`font-mono font-black text-sm block ${isDamagedOk ? 'text-emerald-700' : 'text-red-600'}`}>
              {damagedVal}%
            </span>
            <span className="text-[10px] font-bold">{isDamagedOk ? '✓ Within Limit' : '❌ Exceeds Defect Ceiling'}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons: [VIEW THIS RULE] & [Raise Complaint] */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 text-xs">
        <button
          onClick={onOpenRulebook}
          className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-extrabold flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-emerald-600" />
          <span>[ {t('viewThisRule')} ]</span>
        </button>

        {onOpenComplaint && (
          <button
            onClick={onOpenComplaint}
            className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-extrabold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-red-600" />
            <span>[ {t('raiseComplaint')} ]</span>
          </button>
        )}
      </div>

    </div>
  );
}
