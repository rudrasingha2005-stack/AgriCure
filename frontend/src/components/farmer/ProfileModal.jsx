import React, { useContext } from 'react';
import {
  X,
  User,
  MapPin,
  CreditCard,
  CheckCircle2,
  Globe,
  LogOut,
  ShieldCheck,
  Layers,
  Phone
} from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfileModal({ isOpen, onClose, farmerData }) {
  const { language, setLanguage, t } = useContext(LanguageContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-emerald-500/30 rounded-3xl p-5 sm:p-7 text-white shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-[11px] font-mono tracking-wider text-emerald-400 font-bold uppercase">
              PDF Section 6: Profile & Settings
            </span>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-400" />
              <span>{t('profile')}</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Farmer Identification Card (Page 4) */}
        <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/40 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/30 border border-emerald-400/50 flex items-center justify-center text-2xl font-bold text-emerald-300">
                👨‍🌾
              </div>
              <div>
                <h3 className="text-lg font-black text-white">
                  {farmerData?.name || 'Ramesh Das'}
                </h3>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  ID: {farmerData?.farmerId || 'FMR-001245'}
                </span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{farmerData?.district || 'Darjeeling'}, {farmerData?.state || 'West Bengal'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>+91 {farmerData?.phone || '9876543210'}</span>
            </div>
          </div>
        </div>

        {/* Linked Bank Details (Page 4 of PDF) */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-emerald-400" /> Linked Bank Account
            </span>
            <span className="text-emerald-400 font-extrabold flex items-center gap-1 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" /> NPCI / PFMS Linked
            </span>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl space-y-1 font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Bank Name:</span>
              <span className="text-white font-semibold">State Bank of India (SBI)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Account Number:</span>
              <span className="text-white font-semibold">XXXX XXXX 4582</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>IFSC Code:</span>
              <span className="text-white font-semibold">SBIN0001234</span>
            </div>
          </div>
        </div>

        {/* Multilingual Support Toggle (Page 4 of PDF) */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-400" /> App Language
            </span>
            <span className="text-[11px] text-slate-400 font-medium">Instant toggle</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { code: 'en', label: 'English' },
              { code: 'bn', label: 'বাংলা (Bengali)' },
              { code: 'hi', label: 'हिन्दी (Hindi)' }
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                  language === lang.code
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-400'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-850 border border-slate-700'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Logout Action */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex justify-between items-center">
          <button
            onClick={handleLogout}
            className="py-2 px-4 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('logout')}</span>
          </button>

          <button
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
