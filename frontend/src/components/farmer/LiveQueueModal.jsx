import React, { useState, useContext } from 'react';
import {
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  Bell,
  Scale,
  Sparkles,
  DollarSign,
  FileCheck,
  RefreshCw,
  Volume2,
  ChevronRight
} from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';

export default function LiveQueueModal({ isOpen, onClose }) {
  const { t } = useContext(LanguageContext);

  // Default token from PDF: YOUR TOKEN: A-124
  const userTokenNum = 124;
  const userToken = 'A-124';

  // State of currently serving token (starts at A-118 per PDF)
  const [servingNum, setServingNum] = useState(118);

  // Procurement lifecycle stages (Page 4 of PDF)
  const [currentStage, setCurrentStage] = useState(2); // In-progress stage

  if (!isOpen) return null;

  const servingToken = `A-${servingNum}`;
  const farmersAhead = Math.max(0, userTokenNum - servingNum);
  const estimatedWaitMin = Math.max(0, farmersAhead * 6); // ~6 mins per farmer (6 * 6 = ~36 min)

  // PDF Alert 1: 2 Ahead Alert ("Your turn is near! Token A-124, please prepare your crop.")
  const isTwoAheadAlert = farmersAhead === 2;

  // PDF Alert 2: Turn Arrived ("YOUR TURN! Token A-124, proceed to COUNTER 2.")
  const isTurnArrived = servingNum >= userTokenNum;

  // Simulation controls
  const handleAdvanceQueue = () => {
    if (servingNum < 125) {
      const next = servingNum + 1;
      setServingNum(next);
      if (next >= 124) {
        setCurrentStage(5);
      } else if (next >= 122) {
        setCurrentStage(3);
      } else if (next >= 120) {
        setCurrentStage(2);
      }
    }
  };

  const handleResetQueue = () => {
    setServingNum(118);
    setCurrentStage(2);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-emerald-500/30 rounded-3xl p-5 sm:p-7 text-white shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-[11px] font-mono tracking-wider text-emerald-400 font-bold uppercase">
              PDF Section 5 & Page 4
            </span>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span>🚜</span> {t('liveQueue')} — Siliguri Centre
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
        {/* REAL-TIME ALERTS (Page 3 of PDF)                                          */}
        {/* ========================================================================= */}
        {isTurnArrived ? (
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 text-white font-extrabold text-sm sm:text-base shadow-xl animate-bounce flex items-center gap-3">
            <Volume2 className="w-7 h-7 flex-shrink-0" />
            <div>
              <span className="block text-xs uppercase tracking-widest text-emerald-100">
                Turn Arrived Notification:
              </span>
              <span>"YOUR TURN! Token {userToken}, proceed to COUNTER 2."</span>
            </div>
          </div>
        ) : isTwoAheadAlert ? (
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-extrabold text-sm shadow-xl animate-pulse flex items-center gap-3">
            <Bell className="w-6 h-6 flex-shrink-0" />
            <div>
              <span className="block text-xs uppercase tracking-widest text-amber-100">
                Alert (2 Ahead):
              </span>
              <span>"Your turn is near! Token {userToken}, please prepare your crop."</span>
            </div>
          </div>
        ) : null}

        {/* ========================================================================= */}
        {/* WIREFRAME CARD (Page 3 ASCII Layout)                                      */}
        {/* ========================================================================= */}
        <div className="mt-4 p-6 rounded-3xl bg-slate-950 border border-emerald-500/40 shadow-inner space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                {t('yourToken')}
              </span>
              <span className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono tracking-wider mt-0.5 block">
                {userToken}
              </span>
            </div>
            <div className="sm:text-right">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                {t('currentlyServing')}
              </span>
              <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono block mt-0.5">
                {servingToken}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl">
              <span className="text-xs text-slate-400 block">{t('farmersAhead')}</span>
              <span className="text-2xl font-black text-white font-mono mt-0.5 block">
                {farmersAhead}
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl">
              <span className="text-xs text-slate-400 block">{t('estimatedWait')}</span>
              <span className="text-2xl font-black text-emerald-300 font-mono mt-0.5 block">
                {estimatedWaitMin} MIN
              </span>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-slate-900 border border-slate-800 p-3 rounded-2xl flex items-center justify-center">
              <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                {t('workingNormally')}
              </span>
            </div>
          </div>
        </div>

        {/* Live Simulation Controls */}
        <div className="mt-3 flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
          <span className="text-slate-300 font-medium">
            Live Lifecycle Simulator (Test alerts):
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleAdvanceQueue}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all cursor-pointer"
            >
              Advance Token (+1)
            </button>
            <button
              onClick={handleResetQueue}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl transition-all cursor-pointer"
            >
              Reset (A-118)
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PROCUREMENT OPERATIONS STEPS (Page 4 of PDF)                              */}
        {/* ========================================================================= */}
        <div className="mt-6 pt-5 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-300">
              Procurement Operations Steps (Page 4)
            </h3>
            <span className="text-[11px] font-mono text-emerald-400">
              Stage {currentStage} of 5 Active
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {/* Stage 1 */}
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-sm">1. Arrival & Check</span>
                  <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                    Booking & Token Verification
                  </span>
                </div>
                <p className="text-emerald-400 font-medium">
                  ✓ Scanned at entry, queue status updated to Active.
                </p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>

            {/* Stage 2 */}
            <div
              className={`p-3.5 rounded-2xl border transition-all ${
                currentStage >= 2
                  ? 'bg-slate-800/80 border-slate-700/80'
                  : 'bg-slate-900/40 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-sm">2. Official Weight</span>
                  <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                    Weighing Scale Integration
                  </span>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-slate-300 mt-1">
                Expected: <span className="font-bold text-white">2,000 KG</span> | Actual Weight:{' '}
                <span className="font-bold text-emerald-300">1,980 KG</span>{' '}
                <span className="text-emerald-400 font-bold">✓ Confirmed</span>
              </p>
            </div>

            {/* Stage 3 */}
            <div
              className={`p-3.5 rounded-2xl border transition-all ${
                currentStage >= 3
                  ? 'bg-slate-800/80 border-slate-700/80'
                  : 'bg-slate-900/40 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-sm">3. Quality Grading</span>
                  <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                    Assessment & AI Validation
                  </span>
                </div>
                {currentStage >= 3 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Clock className="w-4 h-4 text-slate-500" />
                )}
              </div>
              <p className="text-slate-300 mt-1">
                Grade: <span className="font-bold text-emerald-300">Grade A</span> | Quality Score:{' '}
                <span className="font-extrabold text-amber-400">87/100</span>
              </p>
            </div>

            {/* Stage 4 */}
            <div
              className={`p-3.5 rounded-2xl border transition-all ${
                currentStage >= 4
                  ? 'bg-slate-800/80 border-slate-700/80'
                  : 'bg-slate-900/40 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-sm">4. Purchase Record</span>
                  <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                    Transaction Logging
                  </span>
                </div>
                {currentStage >= 4 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Clock className="w-4 h-4 text-slate-500" />
                )}
              </div>
              <p className="text-slate-300 mt-1">
                Rate: <span className="font-bold text-white">₹12/KG</span> | Total Purchase Value:{' '}
                <span className="font-black text-amber-400">₹23,760</span> (or ₹6,000 baseline)
              </p>
            </div>

            {/* Stage 5 */}
            <div
              className={`p-3.5 rounded-2xl border transition-all ${
                currentStage >= 5
                  ? 'bg-slate-800/80 border-emerald-500/50'
                  : 'bg-slate-900/40 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-sm">5. Payment Disbursement</span>
                  <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                    Direct Bank Transfer
                  </span>
                </div>
                {currentStage >= 5 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Clock className="w-4 h-4 text-slate-500" />
                )}
              </div>
              <p className="text-slate-300 mt-1">
                Status: <span className="text-emerald-400 font-extrabold">✓ Paid</span> (TXN ID:{' '}
                <span className="font-mono text-white font-bold">TXN-2026-009421</span>)
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex justify-end">
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
