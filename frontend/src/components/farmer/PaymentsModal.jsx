import React, { useContext } from 'react';
import {
  X,
  CreditCard,
  CheckCircle2,
  Download,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';

export default function PaymentsModal({ isOpen, onClose }) {
  const { t } = useContext(LanguageContext);

  if (!isOpen) return null;

  const payments = [
    {
      id: 'TXN-2026-009421',
      bookingId: 'BK-2026-004521',
      token: 'A-124',
      crop: 'Potato',
      weightKg: 1980,
      rate: 12,
      amount: 23760,
      status: 'Paid',
      date: 'Today, 02:45 PM',
      bankRef: 'PFMS/NPCI/SBI998102',
      accountMasked: 'SBI (XXXX 4582)'
    },
    {
      id: 'TXN-2026-008102',
      bookingId: 'BK-2026-003890',
      token: 'A-088',
      crop: 'Rice',
      weightKg: 1500,
      rate: 28,
      amount: 42000,
      status: 'Paid',
      date: '02 Sept 2026',
      bankRef: 'PFMS/NPCI/SBI881920',
      accountMasked: 'SBI (XXXX 4582)'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-emerald-500/30 rounded-3xl p-5 sm:p-7 text-white shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-[11px] font-mono tracking-wider text-emerald-400 font-bold uppercase">
              PDF Section 2 & Page 4: Financials & Disbursements
            </span>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-400" />
              <span>{t('payments')} & Receipts</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bank Direct Settlement Banner */}
        <div className="mt-4 p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="font-extrabold text-white block">
                Direct Benefit Transfer (DBT / PFMS)
              </span>
              <span className="text-slate-400">
                Linked Account: State Bank of India (XXXX 4582) • Status: Active & Verified
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            0% Commission
          </span>
        </div>

        {/* Transactions List */}
        <div className="mt-4 space-y-3 max-h-[380px] overflow-y-auto pr-1">
          {payments.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white text-sm">{p.id}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {p.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Token #{p.token} • {p.crop} ({p.weightKg.toLocaleString()} KG @ ₹{p.rate}/KG)
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-amber-400 font-mono block">
                    ₹{p.amount.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">{p.date}</span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-900 rounded-xl text-[11px] font-mono text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-slate-800">
                <span>Bank Ref: <strong className="text-slate-200">{p.bankRef}</strong></span>
                <button
                  onClick={() => alert(`Downloading official PDF Payment Receipt for ${p.id}`)}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF Receipt</span>
                </button>
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
